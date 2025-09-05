export type BusinessType = 
  | 'healthcare'
  | 'ecommerce'
  | 'accounting'
  | 'marketing'
  | 'trades'
  | 'financial'
  | 'other';

export type TeamSize = 
  | 'solo'
  | 'small'
  | 'growing'
  | 'established'
  | 'corporate';

export type Timeline = 
  | 'urgent'
  | 'asap'
  | 'weeks'
  | 'months'
  | 'research';

export type WorkingHours = 
  | 'australian'
  | 'overlap'
  | '24/7'
  | 'flexible';

export type BudgetExpectation = 
  | 'aligned'
  | 'higher-but-worth'
  | 'under-1000'
  | 'need-education';

export interface QualificationResponse {
  questionId: string;
  answer: string | string[];
  scoreImpact: number;
  timestamp: Date;
}

export interface Lead {
  id: string;
  businessType?: BusinessType;
  businessSize?: TeamSize;
  industrySpecificData: Record<string, any>;
  qualificationScore: number;
  stageCompleted: number;
  responses: QualificationResponse[];
  createdDate: Date;
  lastActive: Date;
  email?: string;
  name?: string;
  phone?: string;
  company?: string;
}

export interface Question {
  id: string;
  stage: number;
  text: string;
  type: 'single' | 'multiple' | 'ranking' | 'text';
  options?: QuestionOption[];
  conditions?: QuestionCondition[];
  nextQuestion?: string;
  scoringRules?: ScoringRule[];
}

export interface QuestionOption {
  value: string;
  label: string;
  icon?: string;
  internalNote?: string;
  routeTo?: string;
  scoreModifier?: number;
}

export interface QuestionCondition {
  field: string;
  operator: 'equals' | 'contains' | 'in' | 'notEquals';
  value: any;
  action: 'show' | 'hide' | 'route';
  target?: string;
}

export interface ScoringRule {
  condition: QuestionCondition;
  points: number;
}

export interface QualificationResult {
  score: number;
  category: 'hot' | 'warm' | 'nurture' | 'redirect';
  headline: string;
  body: string;
  ctaText?: string;
  ctaAction?: string;
  recommendations?: string[];
}

export interface FormData {
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
  
  // Legacy fields (for backward compatibility during transition)
  painPoints?: string[];
  adminTasks?: string[];
  securityConcerns?: string[];
  integrationApproach?: string;
  addNote?: boolean;
  noteType?: string;
  writtenNote?: string;
}