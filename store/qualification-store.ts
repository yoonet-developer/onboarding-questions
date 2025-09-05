import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface QualificationState {
  formData: UnifiedFormData;
  sessionId: string;
  startedAt: Date;
  completedAt?: Date;
  
  // Actions
  updateFormData: (data: Partial<UnifiedFormData>) => void;
  resetForm: () => void;
  calculateScore: () => number;
  markCompleted: () => void;
}

export const useQualificationStore = create<QualificationState>()(
  persist(
    (set, get) => ({
      formData: {},
      sessionId: generateSessionId(),
      startedAt: new Date(),
      
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data }
        })),
      
      resetForm: () =>
        set(() => ({
          formData: {},
          sessionId: generateSessionId(),
          startedAt: new Date(),
          completedAt: undefined
        })),
        
      calculateScore: () => {
        const { formData } = get();
        let score = 50; // Base score
        
        // Business type scoring
        if (formData.businessType === 'healthcare') score += 20;
        if (formData.businessType === 'ecommerce') score += 15;
        if (formData.businessType === 'professional') score += 10;
        
        // Admin hours scoring (more hours = higher score)
        const hoursScore = {
          '0-5': 5,
          '5-10': 10,
          '10-20': 15,
          '20-40': 20,
          '40+': 25
        };
        score += hoursScore[formData.adminHoursPerWeek as keyof typeof hoursScore] || 0;
        
        // Timeline scoring
        if (formData.timeline === 'urgent') score += 20;
        if (formData.timeline === '2weeks') score += 15;
        if (formData.timeline === 'month') score += 10;
        
        // Support situation
        if (formData.hasCurrentSupport === 'replace') score += 15;
        if (formData.hasCurrentSupport === 'some') score += 10;
        
        // Commitment
        if (formData.agreedToFullTime) score += 10;
        
        return Math.min(score, 100);
      },
      
      markCompleted: () =>
        set(() => ({
          completedAt: new Date()
        }))
    }),
    {
      name: 'yoonet-unified-qualification',
      partialize: (state) => ({
        formData: state.formData,
        sessionId: state.sessionId
      })
    }
  )
);

function generateSessionId(): string {
  return `unified_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}