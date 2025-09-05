import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Calculate qualification score
    const score = calculateQualificationScore(data);
    
    // Process form submission
    const submission = {
      ...data,
      submittedAt: new Date().toISOString(),
      source: 'unified-form',
      score,
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };
    
    // TODO: Save to database
    // await saveToDatabase(submission);
    
    // TODO: Send to CRM (HubSpot, Salesforce, etc.)
    // await sendToCRM(submission);
    
    // TODO: Send notification email to sales team
    // await sendNotificationEmail(submission);
    
    // TODO: Send confirmation email to lead
    // await sendConfirmationEmail(data.email, data.name);
    
    // Log submission for now
    console.log('Form submission received:', submission);
    
    return NextResponse.json({ 
      success: true, 
      score,
      estimatedSavings: data.estimatedSavings,
      message: 'Your information has been received. We\'ll contact you within 24 hours.'
    });
  } catch (error) {
    console.error('Error processing submission:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'There was an error processing your submission. Please try again.' 
      },
      { status: 500 }
    );
  }
}

function calculateQualificationScore(data: any): number {
  let score = 50; // Base score
  
  // Business type scoring
  const businessTypeScores: Record<string, number> = {
    'healthcare': 20,
    'ecommerce': 15,
    'professional': 10,
    'other': 5
  };
  score += businessTypeScores[data.businessType] || 0;
  
  // Admin hours scoring (more hours = higher score)
  const hoursScores: Record<string, number> = {
    '0-5': 5,
    '5-10': 10,
    '10-20': 15,
    '20-40': 20,
    '40+': 25
  };
  score += hoursScores[data.adminHoursPerWeek] || 0;
  
  // Timeline scoring (urgency = higher score)
  const timelineScores: Record<string, number> = {
    'urgent': 20,
    '2weeks': 15,
    'month': 10,
    'exploring': 5
  };
  score += timelineScores[data.timeline] || 0;
  
  // Support situation scoring
  const supportScores: Record<string, number> = {
    'replace': 15,  // Looking to switch = high intent
    'some': 10,     // Need more help = medium intent
    'none': 5       // No support yet = lower intent
  };
  score += supportScores[data.hasCurrentSupport] || 0;
  
  // Commitment bonus
  if (data.agreedToFullTime) {
    score += 10;
  }
  
  // Contact completeness bonus
  if (data.name && data.email && data.phone) {
    score += 5;
  }
  
  // Company name bonus (shows seriousness)
  if (data.company) {
    score += 3;
  }
  
  // Challenges specified bonus
  if ((data.selectedChallenges && data.selectedChallenges.length > 0) || 
      (data.mainChallenges && data.mainChallenges.length > 20)) {
    score += 5;
  }
  
  return Math.min(score, 100); // Cap at 100
}

// Placeholder functions for future implementation
async function saveToDatabase(submission: any) {
  // TODO: Implement database storage
  // Example: await prisma.lead.create({ data: submission });
}

async function sendToCRM(submission: any) {
  // TODO: Implement CRM integration
  // Example for HubSpot:
  // await fetch('https://api.hubspot.com/contacts/v1/contact', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     properties: [
  //       { property: 'email', value: submission.email },
  //       { property: 'firstname', value: submission.name },
  //       { property: 'phone', value: submission.phone },
  //       { property: 'company', value: submission.company },
  //       { property: 'lead_score', value: submission.score }
  //     ]
  //   })
  // });
}

async function sendNotificationEmail(submission: any) {
  // TODO: Implement email notification to sales team
  // Example using SendGrid or AWS SES
}

async function sendConfirmationEmail(email: string, name: string) {
  // TODO: Implement confirmation email to lead
  // Example using email service provider
}