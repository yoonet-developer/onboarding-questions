import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Get client information
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ipAddress = forwardedFor?.split(',')[0].trim() || realIp || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || '';
    
    // Calculate score
    const score = calculateQualificationScore(data);
    
    // Save to database
    const result = await sql`
      INSERT INTO leads (
        name, email, phone, company,
        business_type, other_business_type, admin_hours_per_week,
        has_current_support, main_challenges, selected_challenges,
        timeline, agreed_to_full_time,
        estimated_savings, qualification_score,
        form_data_json, source, ip_address, user_agent, referrer_url
      ) VALUES (
        ${data.name},
        ${data.email},
        ${data.phone},
        ${data.company || null},
        ${data.businessType},
        ${data.otherBusinessType || null},
        ${data.adminHoursPerWeek},
        ${data.hasCurrentSupport},
        ${data.mainChallenges || null},
        ${data.selectedChallenges && data.selectedChallenges.length > 0 ? data.selectedChallenges : null},
        ${data.timeline},
        ${data.agreedToFullTime || false},
        ${data.estimatedSavings || 0},
        ${score},
        ${JSON.stringify(data)},
        'unified-form',
        ${ipAddress}::inet,
        ${userAgent},
        ${referrer}
      )
      RETURNING id, created_at
    `;
    
    const leadData = result.rows[0];
    
    // Send Slack notification
    await sendSlackNotification(data, leadData.id, score);
    
    console.log(`New lead saved: ID ${leadData.id}, Score: ${score}`);
    
    return NextResponse.json({ 
      success: true, 
      score,
      estimatedSavings: data.estimatedSavings,
      message: 'Your information has been received. We\'ll contact you within 24 hours.'
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'There was an error. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function sendSlackNotification(data: any, leadId: string, score: number) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.log('Slack webhook URL not configured');
    return;
  }

  // Determine priority and emoji
  const getPriority = (score: number) => {
    if (score >= 80) return { level: 'HOT LEAD', emoji: '🔥', color: '#ff0000' };
    if (score >= 65) return { level: 'WARM LEAD', emoji: '⚡', color: '#ff8c00' };
    if (score >= 50) return { level: 'QUALIFIED', emoji: '✅', color: '#32cd32' };
    return { level: 'FOLLOW UP', emoji: '📝', color: '#4169e1' };
  };

  const priority = getPriority(score);
  
  // Format challenges for display
  const challenges = data.selectedChallenges?.length > 0 
    ? data.selectedChallenges.join(', ')
    : data.mainChallenges || 'Not specified';

  const slackMessage = {
    text: `${priority.emoji} New ${priority.level} - Score: ${score}/100`,
    attachments: [
      {
        color: priority.color,
        title: `${data.name} from ${data.company || 'Unknown Company'}`,
        fields: [
          {
            title: 'Contact Info',
            value: `Email: ${data.email}\nPhone: ${data.phone}`,
            short: true
          },
          {
            title: 'Business Details',
            value: `Type: ${data.businessType}\nAdmin Hours: ${data.adminHoursPerWeek}/week\nTimeline: ${data.timeline}`,
            short: true
          },
          {
            title: 'Key Challenges',
            value: challenges.length > 100 ? challenges.substring(0, 100) + '...' : challenges,
            short: false
          },
          {
            title: 'Qualification Score',
            value: `${score}/100 - ${priority.level}`,
            short: true
          },
          {
            title: 'Estimated Savings',
            value: `$${data.estimatedSavings}/month`,
            short: true
          }
        ],
        footer: `Lead #${leadId} | Submitted via ${data.source || 'qualification form'}`,
        ts: Math.floor(Date.now() / 1000)
      }
    ]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage)
    });

    if (response.ok) {
      console.log('Slack notification sent successfully');
    } else {
      console.error('Failed to send Slack notification:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
}

function calculateQualificationScore(data: any): number {
  let score = 50;
  
  // Business type scoring
  if (data.businessType === 'healthcare') score += 20;
  if (data.businessType === 'ecommerce') score += 15;
  if (data.businessType === 'professional') score += 10;
  
  // Admin hours scoring
  const hoursScore: Record<string, number> = {
    '0-5': 5, '5-10': 10, '10-20': 15, '20-40': 20, '40+': 25
  };
  score += hoursScore[data.adminHoursPerWeek] || 0;
  
  // Timeline scoring
  if (data.timeline === 'urgent') score += 20;
  if (data.timeline === '2weeks') score += 15;
  if (data.timeline === 'month') score += 10;
  
  // Support situation
  if (data.hasCurrentSupport === 'replace') score += 15;
  if (data.hasCurrentSupport === 'some') score += 10;
  
  // Commitment bonus
  if (data.agreedToFullTime) score += 10;
  
  return Math.min(score, 100);
}