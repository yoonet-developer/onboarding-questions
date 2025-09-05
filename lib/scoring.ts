// Import UnifiedFormData from qualification-store instead
interface UnifiedFormData {
  // Core business info
  businessType?: string;
  otherBusinessType?: string;
  adminHoursPerWeek?: string;
  
  // Current situation
  hasCurrentSupport?: string;
  mainChallenges?: string;
  selectedChallenges?: string[];
  
  // Timeline & commitment
  timeline?: string;
  agreedToFullTime?: boolean;
  
  // Contact info
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  
  // Calculated fields
  estimatedSavings?: number;
  qualificationScore?: number;
}

export function calculateQualificationScore(formData: UnifiedFormData): number {
  let score = 50; // Base score to match your store logic
  
  // Business type scoring (simplified to match your new structure)
  const businessTypeScores: Record<string, number> = {
    healthcare: 20,
    ecommerce: 15,
    professional: 10,
    accounting: 10,
    marketing: 10,
    trades: 5,
    other: 5
  };
  
  if (formData.businessType) {
    score += businessTypeScores[formData.businessType] || 0;
  }

  // Admin hours scoring (matches your store logic)
  const hoursScores: Record<string, number> = {
    '0-5': 5,
    '5-10': 10,
    '10-20': 15,
    '20-40': 20,
    '40+': 25
  };

  if (formData.adminHoursPerWeek) {
    score += hoursScores[formData.adminHoursPerWeek] || 0;
  }

  // Timeline scoring (matches your store logic)
  const timelineScores: Record<string, number> = {
    urgent: 20,
    '2weeks': 15,
    month: 10,
    quarter: 5,
    research: 0
  };

  if (formData.timeline) {
    score += timelineScores[formData.timeline] || 0;
  }

  // Support situation scoring
  const supportScores: Record<string, number> = {
    replace: 15,
    some: 10,
    none: 5
  };

  if (formData.hasCurrentSupport) {
    score += supportScores[formData.hasCurrentSupport] || 0;
  }

  // Commitment bonus
  if (formData.agreedToFullTime) {
    score += 10;
  }

  // Challenge complexity bonus
  if (formData.selectedChallenges && formData.selectedChallenges.length > 0) {
    score += Math.min(formData.selectedChallenges.length * 2, 10);
  }

  return Math.min(score, 100);
}

export function getQualificationCategory(score: number): 'hot' | 'warm' | 'nurture' | 'redirect' {
  if (score >= 80) return 'hot';
  if (score >= 65) return 'warm';
  if (score >= 50) return 'nurture';
  return 'redirect';
}

interface QualificationResult {
  score: number;
  category: 'hot' | 'warm' | 'nurture' | 'redirect';
  headline: string;
  body: string;
  ctaText?: string;
  ctaAction?: string;
  recommendations: string[];
}

export function generateQualificationResult(formData: UnifiedFormData): QualificationResult {
  const score = calculateQualificationScore(formData);
  const category = getQualificationCategory(score);

  // Generate results based on category
  switch (category) {
    case 'hot':
      return generateHotLeadResult(formData, score);
    case 'warm':
      return generateWarmLeadResult(formData, score);
    case 'nurture':
      return generateNurtureLeadResult(formData, score);
    default:
      return generateRedirectResult(formData, score);
  }
}

function generateHotLeadResult(formData: UnifiedFormData, score: number): QualificationResult {
  const industry = formData.businessType === 'healthcare' ? 'Healthcare' : 
                   formData.businessType === 'ecommerce' ? 'E-commerce' :
                   formData.businessType === 'professional' ? 'Professional Services' : 'Business';

  return {
    score,
    category: 'hot',
    headline: "Perfect! You're exactly who we built Yoonet for",
    body: `Based on your answers, here's why we're confident we can transform your ${industry.toLowerCase()} operations:

✅ Your ${industry} Needs: Our Balanga team has deep experience with the specific challenges you're facing.
✅ Your Timeline: We can move quickly to get you the support you need.
✅ Your Commitment: You understand the value of dedicated, full-time support.

Your dedicated Client Success Manager can show you:
• How similar businesses reduced admin time by 60%
• Our unique Balanga advantage (better lifestyle = better performance)
• Exactly how we'll handle your specific pain points`,
    ctaText: 'Book Your Strategy Call',
    ctaAction: 'calendar',
    recommendations: [
      'Prepare a list of your most time-consuming tasks',
      'Think about your ideal team structure',
      'Consider which processes you want to delegate first'
    ]
  };
}

function generateWarmLeadResult(formData: UnifiedFormData, score: number): QualificationResult {
  return {
    score,
    category: 'warm',
    headline: "Great match! Let's explore how we can help",
    body: `You're exactly the type of business we love working with. Based on your needs, we can create a customised solution that:

• Addresses your immediate challenges
• Scales with your growth plans
• Integrates seamlessly with your existing operations
• Delivers measurable ROI within 60 days

Our approach is different because we invest in our team's success, which translates directly to your success.`,
    ctaText: 'Get Your Custom Proposal',
    ctaAction: 'proposal',
    recommendations: [
      'Review our case studies for similar businesses',
      'Calculate your potential time savings',
      'Consider starting with a pilot program'
    ]
  };
}

function generateNurtureLeadResult(formData: UnifiedFormData, score: number): QualificationResult {
  return {
    score,
    category: 'nurture',
    headline: "Let's make sure you choose the right partner",
    body: `Outsourcing is a big decision, and we want to make sure you have all the information you need.

Here's what sets professional BPOs apart from freelancer marketplaces:

The Hidden Costs of Cheap:
• Unincorporated operators = your legal liability
• No backup when someone's sick
• Constant retraining from turnover
• No data security guarantees

The Yoonet Difference:
• Incorporated and insured for your protection
• University partnership for continuous talent pipeline
• 90% staff retention vs 30% industry average
• Direct investment in the Balanga community`,
    ctaText: 'Download Our Free Guide',
    ctaAction: 'download',
    recommendations: [
      'Download: "Why Paying $500/month More Saves You $50,000/year"',
      'Read our Balanga community impact report',
      'Schedule a no-pressure consultation when ready'
    ]
  };
}

function generateRedirectResult(formData: UnifiedFormData, score: number): QualificationResult {
  return {
    score,
    category: 'redirect',
    headline: "We might not be the right fit, and that's okay",
    body: `Based on your priorities, these providers might better match your needs:

• For lowest price: Try Upwork or Onlinejobs.ph
• For larger scale operations: Consider Cloudstaff or Acquire BPO
• For specific industry needs: Look for specialised providers

We believe in finding the right match for everyone. Good luck with your search!`,
    recommendations: [
      'Define your non-negotiable requirements',
      'Research provider track records',
      'Always check incorporation and insurance status'
    ]
  };
}