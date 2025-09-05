import { FormData, QualificationResult } from './types';
import { SCORING_THRESHOLDS, REDIRECT_MESSAGE } from './constants';

export function calculateQualificationScore(formData: FormData): number {
  let score = 0;

  // Base scores by business type
  const businessTypeScores: Record<string, number> = {
    healthcare: 30,
    ecommerce: 25,
    accounting: 20,
    marketing: 25,
    trades: 10,
    financial: -50,
    other: 10
  };
  
  if (formData.businessType) {
    score += businessTypeScores[formData.businessType] || 0;
  }

  // Team size modifiers
  const teamSizeScores: Record<string, number> = {
    solo: 5,
    small: 10,
    growing: 15,
    established: 10,
    corporate: -15
  };

  if (formData.teamSize) {
    score += teamSizeScores[formData.teamSize] || 0;
  }

  // Timeline urgency
  const timelineScores: Record<string, number> = {
    yesterday: 10,
    month: 5,
    quarter: 0,
    research: -5
  };

  if (formData.timeline) {
    score += timelineScores[formData.timeline] || 0;
  }

  // Cultural alignment
  if (formData.teamPhilosophy) {
    const philosophyScores: Record<string, number> = {
      family: 20,
      partners: 15,
      resources: 5,
      cheap: -20
    };
    score += philosophyScores[formData.teamPhilosophy] || 0;
  }

  // Budget alignment
  if (formData.budgetReality) {
    const budgetScores: Record<string, number> = {
      aligned: 15,
      'higher-but-worth': 10,
      'under-1000': -5,
      'need-education': 0
    };
    score += budgetScores[formData.budgetReality] || 0;
  }

  // Community impact
  if (formData.communityImpact) {
    const impactScores: Record<string, number> = {
      matters: 10,
      curious: 5,
      'not-concerned': -25
    };
    score += impactScores[formData.communityImpact] || 0;
  }

  // Previous experience bonus
  if (formData.previousExperience) {
    if (formData.previousExperience.includes('disappointed') || 
        formData.previousExperience.includes('lacked')) {
      score += 10; // Bad previous experience = opportunity
    }
  }

  // Specific industry bonuses
  if (formData.businessType === 'healthcare' && formData.patientVolume) {
    const volumeScores: Record<string, number> = {
      '150-300 (established)': 10,
      '300+ (multi-practitioner)': 15
    };
    score += volumeScores[formData.patientVolume] || 0;
  }

  if (formData.businessType === 'ecommerce' && formData.orderVolume) {
    const volumeScores: Record<string, number> = {
      'Scaling (500-2000/month)': 10,
      'Established (2000+/month)': 15
    };
    score += volumeScores[formData.orderVolume] || 0;
  }

  return Math.max(0, score);
}

export function getQualificationCategory(score: number): 'hot' | 'warm' | 'nurture' | 'redirect' {
  if (score >= SCORING_THRESHOLDS.hot) return 'hot';
  if (score >= SCORING_THRESHOLDS.warm) return 'warm';
  if (score >= SCORING_THRESHOLDS.nurture) return 'nurture';
  return 'redirect';
}

export function generateQualificationResult(formData: FormData): QualificationResult {
  const score = calculateQualificationScore(formData);
  const category = getQualificationCategory(score);

  // Handle special redirects
  if (formData.businessType === 'financial') {
    return {
      score,
      category: 'redirect',
      headline: "We might not be the right fit, and that's okay",
      body: REDIRECT_MESSAGE.financial,
      recommendations: [
        'Consider specialised financial services BPOs',
        'Look for providers with specific compliance expertise'
      ]
    };
  }

  if (formData.teamPhilosophy === 'cheap' || formData.communityImpact === 'not-concerned') {
    return {
      score,
      category: 'redirect',
      headline: "We might not be the right fit, and that's okay",
      body: REDIRECT_MESSAGE.cheap,
      recommendations: [
        'Try Upwork or Onlinejobs.ph for budget options',
        'Consider freelancer marketplaces'
      ]
    };
  }

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

function generateHotLeadResult(formData: FormData, score: number): QualificationResult {
  const industry = formData.businessType === 'healthcare' ? 'Healthcare' : 
                   formData.businessType === 'ecommerce' ? 'E-commerce' :
                   formData.businessType === 'accounting' ? 'Accounting' : 'Business';

  return {
    score,
    category: 'hot',
    headline: "Perfect! You're exactly who we built Yoonet for",
    body: `Based on your answers, here's why we're confident we can transform your ${industry.toLowerCase()} business:

✅ Your ${industry} Expertise Need: Our Balanga team has deep experience with the specific tools and processes you use.
✅ Your Team Philosophy: Like you, we believe offshore staff are partners, not just resources. Our 90% retention rate proves this works.
✅ Your Growth Stage: At your size, you need a partner who can scale with you. Our University partnership ensures quality talent as you grow.

Your dedicated Client Success Manager can show you:
• How similar ${industry.toLowerCase()} businesses reduced admin time by 60%
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

function generateWarmLeadResult(formData: FormData, score: number): QualificationResult {
  return {
    score,
    category: 'warm',
    headline: "Great match! Let's explore how we can help",
    body: `You're exactly the type of business we love working with. Based on your needs, we can create a customised solution that:

• Addresses your immediate pain points
• Scales with your growth plans
• Integrates seamlessly with your existing team
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

function generateNurtureLeadResult(formData: FormData, score: number): QualificationResult {
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

function generateRedirectResult(formData: FormData, score: number): QualificationResult {
  return {
    score,
    category: 'redirect',
    headline: "We might not be the right fit, and that's okay",
    body: `Based on your priorities, these providers might better match your needs:

• For lowest price: Try Upwork or Onlinejobs.ph
• For financial services: Consider specialised providers
• For corporate scale: Look at Cloudstaff or Acquire BPO

We believe in finding the right match for everyone. Good luck with your search!`,
    recommendations: [
      'Define your non-negotiable requirements',
      'Research provider track records',
      'Always check incorporation and insurance status'
    ]
  };
}