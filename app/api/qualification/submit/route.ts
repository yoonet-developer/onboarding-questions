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
        ${data.selectedChallenges ? JSON.stringify(data.selectedChallenges) : null}::text[],
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
    
    console.log(`New lead saved: ID ${result.rows[0].id}, Score: ${score}`);
    
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