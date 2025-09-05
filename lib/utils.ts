import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(d);
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-AU', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(d);
}

export function getDynamicPainPoints(businessType: string): string[] {
  const painPoints: Record<string, string[]> = {
    healthcare: [
      'Patient admin is stealing time from patient care',
      'Drowning in appointment scheduling and follow-ups',
      'Medicare/insurance claims are a nightmare',
      'Practice management software needs constant attention'
    ],
    ecommerce: [
      'Customer service across multiple channels',
      'Social media engagement and content creation',
      'Order processing and inventory management',
      'Campaign reporting and analytics'
    ],
    accounting: [
      'Data entry and reconciliations in Xero/MYOB',
      'BAS and compliance documentation',
      'Client communication and follow-ups',
      'Tax season is breaking our team'
    ],
    marketing: [
      'Content creation and scheduling',
      'Campaign management across platforms',
      'Client reporting and analytics',
      'Creative asset management'
    ],
    trades: [
      'Quote and invoice management',
      'Scheduling and dispatch',
      'Supplier coordination',
      'Compliance documentation'
    ]
  };

  return painPoints[businessType] || painPoints.default || [
    'Administrative tasks taking too much time',
    'Customer service and support',
    'Data entry and management',
    'Process optimization needed'
  ];
}

export function getSkillPriorities(businessType: string): string[] {
  const skills: Record<string, string[]> = {
    healthcare: [
      'Medical terminology knowledge',
      'Appointment scheduling',
      'Patient communication',
      'Insurance/Medicare processing',
      'Practice software expertise',
      'Clinical documentation',
      'Telehealth support',
      'Prescription management'
    ],
    ecommerce: [
      'E-commerce platform expertise',
      'Customer service excellence',
      'Social media management',
      'Order processing',
      'Content creation',
      'Inventory management',
      'Email marketing',
      'Product listing optimization'
    ],
    accounting: [
      'Xero/MYOB proficiency',
      'Data entry accuracy',
      'Tax knowledge',
      'Client communication',
      'Compliance documentation',
      'Financial reporting',
      'Payroll processing',
      'BAS preparation'
    ],
    marketing: [
      'Social media management',
      'Content creation',
      'Graphic design basics',
      'Campaign management',
      'Analytics and reporting',
      'Email marketing',
      'SEO/SEM knowledge',
      'Client communication'
    ]
  };

  return skills[businessType] || [
    'Customer service excellence',
    'Data entry accuracy',
    'Email management',
    'Phone communication',
    'Administrative support',
    'Document management',
    'Calendar management',
    'Basic reporting'
  ];
}

export function getProgressPercentage(currentStage: number, totalStages: number = 4): number {
  return Math.round((currentStage / totalStages) * 100);
}

export function getStageTitle(stage: number): string {
  const titles: Record<number, string> = {
    1: 'Initial Qualification',
    2: 'Understanding Your Needs',
    3: 'Finding Your Fit',
    4: 'Final Details'
  };
  return titles[stage] || 'Qualification';
}

export function getTimeToComplete(responses: number): string {
  const avgTimePerQuestion = 15; // seconds
  const totalQuestions = 15;
  const remainingQuestions = totalQuestions - responses;
  const remainingSeconds = remainingQuestions * avgTimePerQuestion;
  
  if (remainingSeconds < 60) {
    return 'Less than 1 minute';
  } else if (remainingSeconds < 120) {
    return 'About 1 minute';
  } else {
    return `About ${Math.ceil(remainingSeconds / 60)} minutes`;
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Australian phone number validation
  const phoneRegex = /^(\+?61|0)[2-478][\d]{8}$/;
  const cleanedPhone = phone.replace(/[\s()-]/g, '');
  return phoneRegex.test(cleanedPhone);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}