import { Question, QuestionOption } from './types';

export const BUSINESS_TYPE_OPTIONS: QuestionOption[] = [
  {
    value: 'healthcare',
    label: 'Healthcare & Allied Health Practice',
    icon: '🏥',
    internalNote: 'HIGH PRIORITY - Route to specialized track',
    scoreModifier: 30
  },
  {
    value: 'ecommerce',
    label: 'E-commerce or Digital Agency',
    icon: '📱',
    internalNote: 'HIGH PRIORITY - Route to digital track',
    scoreModifier: 25
  },
  {
    value: 'accounting',
    label: 'Accounting or Bookkeeping Firm',
    icon: '📊',
    internalNote: 'MEDIUM PRIORITY - Check for Xero/MYOB',
    scoreModifier: 20
  },
  {
    value: 'marketing',
    label: 'Marketing or Creative Agency',
    icon: '🎯',
    internalNote: 'HIGH PRIORITY - Route to creative track',
    scoreModifier: 25
  },
  {
    value: 'trades',
    label: 'Trades & Construction',
    icon: '🏗️',
    internalNote: 'MEDIUM PRIORITY - Basic admin support',
    scoreModifier: 10
  },
  {
    value: 'financial',
    label: 'Financial Advisory or Legal Services',
    icon: '💼',
    internalNote: 'REDIRECT to alternative solution',
    scoreModifier: -50
  },
  {
    value: 'other',
    label: 'Other Professional Services',
    icon: '🏢',
    internalNote: 'QUALIFY FURTHER',
    scoreModifier: 10
  }
];

export const TEAM_SIZE_OPTIONS: QuestionOption[] = [
  {
    value: 'solo',
    label: 'Solo founder wearing too many hats',
    icon: '👤',
    internalNote: 'High touch, needs hand-holding',
    scoreModifier: 5
  },
  {
    value: 'small',
    label: 'Small team drowning in admin (2-5 people)',
    icon: '👥',
    internalNote: 'Sweet spot - urgent need',
    scoreModifier: 10
  },
  {
    value: 'growing',
    label: 'Growing fast, need to scale smart (6-15 people)',
    icon: '🚀',
    internalNote: 'Best lifetime value',
    scoreModifier: 15
  },
  {
    value: 'established',
    label: 'Established, looking to optimise (16-50 people)',
    icon: '🏢',
    internalNote: 'Needs ROI focus',
    scoreModifier: 10
  },
  {
    value: 'corporate',
    label: 'Corporate team (50+ people)',
    icon: '🏛️',
    internalNote: 'Check for owner involvement',
    scoreModifier: -15
  }
];

export const TIMELINE_OPTIONS: QuestionOption[] = [
  {
    value: 'urgent',
    label: 'We need help urgently',
    icon: '🚨',
    internalNote: 'HOT LEAD - Offer fast track',
    scoreModifier: 20
  },
  {
    value: 'asap',
    label: 'As soon as possible',
    icon: '⏱️',
    internalNote: 'WARM LEAD',
    scoreModifier: 15
  },
  {
    value: 'weeks',
    label: '3-6 weeks',
    icon: '📅',
    internalNote: 'NORMAL PROCESS',
    scoreModifier: 10
  },
  {
    value: 'exploring',
    label: 'Exploring options for down-the-track',
    icon: '🔍',
    internalNote: 'NURTURE TRACK',
    scoreModifier: 5
  },
  {
    value: 'research',
    label: 'Just researching',
    icon: '💭',
    internalNote: 'EDUCATION TRACK',
    scoreModifier: 0
  }
];

export const PAIN_POINTS = {
  healthcare: [
    'Medicare/DVA claiming',
    'Appointment scheduling chaos',
    'Patient notes and documentation',
    'Insurance pre-approvals',
    'Practice software data entry',
    'Referral letters and coordination',
    'Recall and reminder systems',
    'New patient intake and forms',
    'Telehealth admin and setup',
    'Clinical audit preparation',
    'Billing and payment follow-ups',
    'Reception and phone management'
  ],
  ecommerce: [
    'Customer service across multiple channels',
    'Social media engagement and content creation',
    'Order processing and inventory management',
    'Campaign reporting and analytics',
    'Product listing updates',
    'Returns and refunds processing',
    'Email marketing campaigns',
    'Review management and responses',
    'Marketplace synchronization',
    'Live chat support coverage'
  ],
  accounting: [
    'Data entry and reconciliations',
    'BAS and compliance documentation',
    'Client communication and follow-ups',
    'Tax season workload surge',
    'Payroll processing',
    'Invoice creation and chasing',
    'Receipt and expense management',
    'Financial report preparation',
    'Bank feed categorization',
    'Client onboarding paperwork'
  ],
  default: [
    'Administrative tasks overload',
    'Customer service and support',
    'Data entry and management',
    'Process documentation',
    'Email and calendar management',
    'Report generation',
    'Database maintenance',
    'Quality control and checking'
  ]
};

export const PRACTICE_SYSTEMS = [
  'Best Practice',
  'Medical Director',
  'Cliniko',
  'Halaxy',
  'SimplePractice',
  'Power Diary',
  'Other/Custom system',
  'We use paper... help!'
];

export const SECURITY_CONCERNS = [
  'AHPRA requirements',
  'Patient privacy',
  'Medicare compliance',
  'Clinical documentation standards'
];

export const INTEGRATION_APPROACHES = [
  'An extension of our team',
  'A service provided to our business that we interact with regularly',
  'An external service that performs work based on a process with minimal interaction'
];

export const WORKING_HOURS_OPTIONS = [
  'I\'m Australian and need to match my hours',
  'I\'m New Zealand and need to match my hours',
  'I\'m Australian and I\'m flexible on when the team works',
  'I\'m New Zealand and I\'m flexible on when the team works'
];

export const PATIENT_VOLUME_OPTIONS = [
  'Under 50',
  '50-200',
  '200-500',
  '500+'
];

export const PLATFORM_OPTIONS = [
  'Shopify only',
  'WooCommerce',
  'Amazon + own store',
  'Multiple marketplaces (3+)',
  'Custom platform',
  'It\'s complicated...'
];

export const ORDER_VOLUME_OPTIONS = [
  'Startup (under 100/month)',
  'Growing (100-500/month)',
  'Scaling (500-2000/month)',
  'Established (2000+/month)'
];

export const BOTTLENECK_OPTIONS = [
  'Response time to inquiries',
  'Order status updates',
  'Returns/refunds process',
  'Product questions',
  'Technical support'
];

export const SOFTWARE_OPTIONS = [
  'Xero',
  'MYOB',
  'QuickBooks',
  'ATO Portal',
  'Excel/Google Sheets',
  'Other'
];

export const SERVICE_TYPES = [
  'Bookkeeping',
  'BAS Agent services',
  'Tax returns',
  'Payroll',
  'Advisory/CFO services'
];

export const PEAK_SEASON_OPTIONS = [
  'Work 80-hour weeks',
  'Turn away clients',
  'Hire expensive temps',
  'Miss deadlines',
  'We don\'t handle it well'
];

export const TEAM_PHILOSOPHY_OPTIONS: QuestionOption[] = [
  {
    value: 'family',
    label: 'Extension of our family - their success is our success',
    scoreModifier: 10
  },
  {
    value: 'partners',
    label: 'Professional partners who happen to be remote',
    scoreModifier: 7
  },
  {
    value: 'resources',
    label: 'Cost-effective resources to get work done',
    scoreModifier: 3
  },
  {
    value: 'cheap',
    label: 'Cheap labour to save money',
    scoreModifier: -10
  }
];

export const INVESTMENT_PRIORITIES = [
  'Long-term staff who know our business',
  'Lowest possible price',
  'Cultural fit with our team',
  'Investment in staff development',
  'Quick scaling up/down'
];

export const COMMUNITY_IMPACT_OPTIONS: QuestionOption[] = [
  {
    value: 'matters',
    label: 'Yes, and it matters to me where and how they work',
    scoreModifier: 10
  },
  {
    value: 'curious',
    label: 'I hadn\'t thought about it, tell me more',
    scoreModifier: 5
  },
  {
    value: 'not-concerned',
    label: 'Not really my concern if the work gets done',
    scoreModifier: -10
  }
];

export const PREVIOUS_EXPERIENCE_OPTIONS = [
  'No, this would be our first time',
  'Yes, but disappointed with high turnover',
  'Yes, but lacked personal connection',
  'Currently using freelancers (Upwork/Fiverr)',
  'Currently with another BPO',
  'Previously tried - didn\'t work out'
];

export const STARTING_TEAM_OPTIONS = [
  'Just 1 dedicated person to start',
  '2-3 person team',
  '4-6 person team',
  'Build as we go',
  'Not sure yet'
];

export const BUDGET_REALITY_OPTIONS: QuestionOption[] = [
  {
    value: 'aligned',
    label: 'That\'s what we budgeted',
    scoreModifier: 15
  },
  {
    value: 'higher-but-worth',
    label: 'Higher than expected but worth it for quality',
    scoreModifier: 10
  },
  {
    value: 'under-1000',
    label: 'We were hoping for under $1,000/month',
    scoreModifier: -5
  },
  {
    value: 'need-education',
    label: 'Need to understand the value better',
    scoreModifier: 0
  }
];

export const SKILL_PRIORITIES = {
  healthcare: [
    'Medical terminology knowledge',
    'Appointment scheduling',
    'Patient communication',
    'Insurance/Medicare processing',
    'Practice software expertise'
  ],
  ecommerce: [
    'E-commerce platform expertise',
    'Customer service excellence',
    'Social media management',
    'Order processing',
    'Content creation'
  ],
  accounting: [
    'Xero/MYOB proficiency',
    'Data entry accuracy',
    'Tax knowledge',
    'Client communication',
    'Compliance documentation'
  ],
  default: [
    'Customer service excellence',
    'Data entry accuracy',
    'Email management',
    'Phone communication',
    'Administrative support'
  ]
};

export const SCORING_THRESHOLDS = {
  hot: 70,
  warm: 50,
  nurture: 30,
  redirect: 0
};

export const REDIRECT_MESSAGE = {
  financial: 'We specialise in healthcare, digital, and creative businesses. For financial services support, we recommend exploring specialised providers.',
  cheap: 'Based on your priorities, you might find better matches with platforms like Upwork or Onlinejobs.ph for lowest-price options.',
  corporate: 'For corporate-scale operations, consider providers like Cloudstaff or Acquire BPO who specialise in large teams.'
};