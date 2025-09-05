// Simplified constants for the unified form

export const BUSINESS_TYPES = [
  { value: 'healthcare', label: 'Healthcare & Allied Health', priority: 'high' },
  { value: 'professional', label: 'Professional Services', priority: 'medium' },
  { value: 'ecommerce', label: 'E-commerce / Online Business', priority: 'high' },
  { value: 'other', label: 'Other', priority: 'low' }
];

export const ADMIN_HOUR_RANGES = [
  { value: '0-5', hours: 3, monthlySavings: 260, label: 'Less than 5 hours' },
  { value: '5-10', hours: 7.5, monthlySavings: 520, label: '5-10 hours' },
  { value: '10-20', hours: 15, monthlySavings: 1040, label: '10-20 hours' },
  { value: '20-40', hours: 30, monthlySavings: 2080, label: '20-40 hours' },
  { value: '40+', hours: 45, monthlySavings: 4160, label: 'More than 40 hours' }
];

export const TIMELINES = [
  { value: 'urgent', label: 'This week (urgent)', scoreMod: 20 },
  { value: '2weeks', label: 'Within 2 weeks', scoreMod: 15 },
  { value: 'month', label: 'Within a month', scoreMod: 10 },
  { value: 'exploring', label: 'Just exploring options', scoreMod: 5 }
];

export const SUPPORT_STATUS = [
  { value: 'none', label: 'No, we handle everything ourselves', scoreMod: 5 },
  { value: 'some', label: 'Yes, but we need more help', scoreMod: 10 },
  { value: 'replace', label: 'Yes, but looking to switch providers', scoreMod: 15 }
];

// Healthcare-specific challenges (for structured options)
export const HEALTHCARE_CHALLENGES = [
  'Medicare/DVA claiming backlog',
  'Appointment scheduling chaos',
  'Patient documentation overload',
  'Insurance pre-approvals delays',
  'Referral coordination issues',
  'Reception phone management'
];

// VA Rate calculations
export const VA_RATES = {
  australianAdminRate: 30, // AUD per hour
  vaRate: 15, // AUD per hour
  markup: 1.2 // 20% markup for calculations
};

// Privacy and compliance statements
export const PRIVACY_STATEMENT = `
We maintain ISO 27001 certification and follow Australian privacy laws. 
All team members sign comprehensive NDAs and undergo security training.
Your data is encrypted and never shared with third parties.
`;

export const FULL_TIME_COMMITMENT_STATEMENT = `
We exclusively offer full-time VA services (40 hours/week) to ensure:
• Dedicated team members who know your business inside-out
• Career development opportunities reducing turnover
• Consistent availability and reliable support

We'll help you grow into needing full-time support if you're not there yet.
`;

// Keep some original constants for backward compatibility
export const PREVIOUS_EXPERIENCE_OPTIONS = [
  'Never - this would be our first time',
  'Yes, but I was disappointed with the results',
  'Currently with another BPO',
  'Had great success in the past'
];

export const PAIN_POINTS = {
  healthcare: HEALTHCARE_CHALLENGES,
  default: [
    'Administrative tasks overload',
    'Customer service and support',
    'Data entry and management',
    'Process documentation',
    'Email and calendar management'
  ]
};