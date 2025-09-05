'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQualificationStore } from '@/store/qualification-store';
import CostCalculator from './CostCalculator';
import UpsellSection from './UpsellSection';
import { cn } from '@/lib/utils';
import { 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Clock,
  DollarSign,
  Users
} from 'lucide-react';

const BUSINESS_TYPES = [
  { value: 'healthcare', label: 'Healthcare & Allied Health', icon: '🏥' },
  { value: 'professional', label: 'Professional Services', icon: '💼' },
  { value: 'ecommerce', label: 'E-commerce / Online Business', icon: '🛒' },
  { value: 'other', label: 'Other', icon: '🏢' }
];

const ADMIN_HOURS = [
  { value: '0-5', label: 'Less than 5 hours', savings: 260 },
  { value: '5-10', label: '5-10 hours', savings: 520 },
  { value: '10-20', label: '10-20 hours', savings: 1040 },
  { value: '20-40', label: '20-40 hours', savings: 2080 },
  { value: '40+', label: 'More than 40 hours', savings: 4160 }
];

const TIMELINES = [
  { value: 'urgent', label: 'This week (urgent)', icon: '🚨' },
  { value: '2weeks', label: 'Within 2 weeks', icon: '⏱️' },
  { value: 'month', label: 'Within a month', icon: '📅' },
  { value: 'exploring', label: 'Just exploring options', icon: '🔍' }
];

// Healthcare-specific challenges (structured)
const HEALTHCARE_CHALLENGES = [
  'Medicare/DVA claiming backlog',
  'Appointment scheduling chaos',
  'Patient documentation overload',
  'Insurance pre-approvals delays',
  'Referral coordination issues',
  'Reception phone management'
];

export default function UnifiedForm() {
  const { updateFormData, calculateScore } = useQualificationStore();
  
  const [formData, setFormData] = useState({
    businessType: '',
    otherBusinessType: '',
    adminHoursPerWeek: '',
    hasCurrentSupport: '',
    mainChallenges: '',
    selectedChallenges: [] as string[],
    timeline: '',
    agreedToFullTime: false,
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [estimatedSavings, setEstimatedSavings] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-calculate savings when admin hours change
  useEffect(() => {
    const hours = ADMIN_HOURS.find(h => h.value === formData.adminHoursPerWeek);
    if (hours) {
      setEstimatedSavings(hours.savings);
    }
  }, [formData.adminHoursPerWeek]);

  // Update global store when form data changes
  useEffect(() => {
    updateFormData({
      ...formData,
      estimatedSavings
    });
  }, [formData, estimatedSavings]);

  // Progress calculation
  const getProgress = () => {
    let filledFields = 0;
    const totalFields = 7; // Total required fields
    
    if (formData.businessType) filledFields++;
    if (formData.adminHoursPerWeek) filledFields++;
    if (formData.hasCurrentSupport) filledFields++;
    if (formData.mainChallenges || formData.selectedChallenges.length > 0) filledFields++;
    if (formData.timeline) filledFields++;
    if (formData.name && formData.email && formData.phone) filledFields++;
    if (formData.agreedToFullTime) filledFields++;
    
    return Math.round((filledFields / totalFields) * 100);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.businessType) newErrors.businessType = 'Please select your business type';
    if (!formData.adminHoursPerWeek) newErrors.adminHours = 'Please select your admin hours';
    if (!formData.hasCurrentSupport) newErrors.support = 'Please tell us about your current support';
    if (!formData.timeline) newErrors.timeline = 'Please select your timeline';
    if (!formData.agreedToFullTime) newErrors.commitment = 'Please confirm full-time commitment';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-field');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit to API
      const response = await fetch('/api/qualification/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          estimatedSavings,
          score: calculateScore(),
          submittedAt: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section 1: Business Information
  const renderBusinessSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          About Your Business
        </h2>
        <p className="text-gray-600">
          Let's understand your needs better
        </p>
      </div>

      {/* Business Type */}
      <div className={cn("space-y-3", errors.businessType && "error-field")}>
        <label className="block text-sm font-medium text-gray-700">
          What type of business do you run? *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {BUSINESS_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setFormData({ ...formData, businessType: type.value })}
              className={cn(
                "p-4 rounded-lg border-2 text-left transition-all",
                formData.businessType === type.value
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 bg-white"
              )}
            >
              <span className="text-2xl mr-2">{type.icon}</span>
              <span className="text-gray-900">{type.label}</span>
            </button>
          ))}
        </div>
        {formData.businessType === 'other' && (
          <input
            type="text"
            placeholder="Please specify your business type..."
            value={formData.otherBusinessType}
            onChange={(e) => setFormData({ ...formData, otherBusinessType: e.target.value })}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        )}
        {errors.businessType && (
          <p className="text-red-600 text-sm">{errors.businessType}</p>
        )}
      </div>

      {/* Admin Hours */}
      <div className={cn("space-y-3", errors.adminHours && "error-field")}>
        <label className="block text-sm font-medium text-gray-700">
          How many hours of admin work do you currently have per week? *
        </label>
        <div className="space-y-2">
          {ADMIN_HOURS.map((hours) => (
            <button
              key={hours.value}
              type="button"
              onClick={() => setFormData({ ...formData, adminHoursPerWeek: hours.value })}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all flex items-center justify-between",
                formData.adminHoursPerWeek === hours.value
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 bg-white"
              )}
            >
              <span className="text-gray-900">{hours.label}</span>
              {formData.adminHoursPerWeek === hours.value && (
                <span className="text-green-600 font-semibold">
                  Save ${hours.savings}/month
                </span>
              )}
            </button>
          ))}
        </div>
        {errors.adminHours && (
          <p className="text-red-600 text-sm">{errors.adminHours}</p>
        )}
      </div>

      {/* Live Savings Calculator */}
      {formData.adminHoursPerWeek && (
        <CostCalculator 
          adminHours={formData.adminHoursPerWeek}
          businessType={formData.businessType}
        />
      )}
    </motion.div>
  );

  // Section 2: Current Situation
  const renderSituationSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 mt-12"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Current Situation
        </h2>
        <p className="text-gray-600">
          Help us understand where you're at
        </p>
      </div>

      {/* Current Support */}
      <div className={cn("space-y-3", errors.support && "error-field")}>
        <label className="block text-sm font-medium text-gray-700">
          Do you currently have admin support? *
        </label>
        <div className="space-y-2">
          {[
            { value: 'none', label: 'No, we handle everything ourselves' },
            { value: 'some', label: 'Yes, but we need more help' },
            { value: 'replace', label: 'Yes, but looking to switch providers' }
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData({ ...formData, hasCurrentSupport: option.value })}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                formData.hasCurrentSupport === option.value
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 bg-white"
              )}
            >
              <span className="text-gray-900">{option.label}</span>
            </button>
          ))}
        </div>
        {errors.support && (
          <p className="text-red-600 text-sm">{errors.support}</p>
        )}
      </div>

      {/* Main Challenges - Adaptive based on business type */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          What's your biggest challenge right now?
          {formData.businessType === 'healthcare' && ' (Select all that apply)'}
        </label>
        
        {formData.businessType === 'healthcare' ? (
          // Structured options for healthcare
          <div className="space-y-2">
            {HEALTHCARE_CHALLENGES.map((challenge) => (
              <label
                key={challenge}
                className={cn(
                  "flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all",
                  formData.selectedChallenges.includes(challenge)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 bg-white"
                )}
              >
                <input
                  type="checkbox"
                  checked={formData.selectedChallenges.includes(challenge)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...formData.selectedChallenges, challenge]
                      : formData.selectedChallenges.filter(c => c !== challenge);
                    setFormData({ ...formData, selectedChallenges: updated });
                  }}
                  className="w-5 h-5 text-blue-600 rounded mr-3"
                />
                <span className="text-gray-900">{challenge}</span>
              </label>
            ))}
          </div>
        ) : (
          // Free text for other business types
          <textarea
            placeholder="Tell us about your main admin challenges..."
            value={formData.mainChallenges}
            onChange={(e) => setFormData({ ...formData, mainChallenges: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-black"
            rows={4}
          />
        )}
      </div>
    </motion.div>
  );

  // Section 3: Timeline & Commitment
  const renderTimelineSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 mt-12"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600">
          Let's understand your timeline
        </p>
      </div>

      {/* Timeline */}
      <div className={cn("space-y-3", errors.timeline && "error-field")}>
        <label className="block text-sm font-medium text-gray-700">
          When do you need support? *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {TIMELINES.map((timeline) => (
            <button
              key={timeline.value}
              type="button"
              onClick={() => setFormData({ ...formData, timeline: timeline.value })}
              className={cn(
                "p-4 rounded-lg border-2 text-left transition-all",
                formData.timeline === timeline.value
                  ? "border-blue-500 bg-blue-50"
                  : timeline.value === 'urgent'
                  ? "border-red-200 hover:border-red-400 bg-white"
                  : "border-gray-200 hover:border-blue-300 bg-white"
              )}
            >
              <span className="text-xl mr-2">{timeline.icon}</span>
              <span className="text-gray-900">{timeline.label}</span>
            </button>
          ))}
        </div>
        {errors.timeline && (
          <p className="text-red-600 text-sm">{errors.timeline}</p>
        )}
      </div>

      {/* Full-time Commitment Statement */}
      <div className={cn(
        "bg-blue-50 border-2 rounded-lg p-6",
        errors.commitment ? "border-red-400" : "border-blue-200"
      )}>
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              Important: Full-Time Commitment Only
            </h3>
            <p className="text-gray-700 mb-4">
              We exclusively offer full-time VA services (40 hours/week). This ensures:
            </p>
            <ul className="space-y-1 text-gray-600 mb-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Dedicated team members who know your business inside-out</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Career development opportunities reducing turnover</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Consistent availability and reliable support</span>
              </li>
            </ul>
            <p className="text-sm text-gray-600 mb-4">
              We'll help you grow into needing full-time support if you're not there yet.
            </p>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreedToFullTime}
                onChange={(e) => setFormData({ ...formData, agreedToFullTime: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="font-medium text-gray-900">
                Yes, we understand and are ready for full-time support
              </span>
            </label>
            {errors.commitment && (
              <p className="text-red-600 text-sm mt-2">{errors.commitment}</p>
            )}
          </div>
        </div>
      </div>

      {/* Privacy Statement */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-green-900 mb-1">Your Data is Safe</h4>
            <p className="text-sm text-green-800">
              We maintain ISO 27001 certification and follow Australian privacy laws. 
              All team members sign comprehensive NDAs and undergo security training.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Section 4: Contact Information
  const renderContactSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 mt-12"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Let's Connect!
        </h2>
        <p className="text-gray-600">
          We'll reach out within 24 hours with your custom proposal
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={cn(errors.name && "error-field")}>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={cn(
              "w-full p-3 border-2 rounded-lg focus:outline-none transition-colors text-black",
              errors.name 
                ? "border-red-400 focus:border-red-500" 
                : "border-gray-200 focus:border-blue-500"
            )}
            placeholder="John Smith"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-black"
            placeholder="Your Business Name"
          />
        </div>

        <div className={cn(errors.email && "error-field")}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={cn(
              "w-full p-3 border-2 rounded-lg focus:outline-none transition-colors text-black",
              errors.email 
                ? "border-red-400 focus:border-red-500" 
                : "border-gray-200 focus:border-blue-500"
            )}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className={cn(errors.phone && "error-field")}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={cn(
              "w-full p-3 border-2 rounded-lg focus:outline-none transition-colors text-black",
              errors.phone 
                ? "border-red-400 focus:border-red-500" 
                : "border-gray-200 focus:border-blue-500"
            )}
            placeholder="0400 000 000"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!formData.agreedToFullTime || isSubmitting}
        className={cn(
          "w-full py-4 px-8 rounded-lg font-semibold text-white transition-all",
          formData.agreedToFullTime && !isSubmitting
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        )}
      >
        {isSubmitting ? 'Submitting...' : 'Get Your Custom Proposal'}
      </button>

      {/* Trust indicators */}
      <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          200+ Happy Clients
        </span>
        <span className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          90% Retention Rate
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          24hr Response Time
        </span>
      </div>
    </motion.div>
  );

  // Post-submission Summary
  const renderSummary = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-8"
    >
      <div className="text-center">
        <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Perfect Match Found!
        </h2>
        <p className="text-lg text-gray-600">
          We've identified the ideal team for your needs
        </p>
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          Your Personalized Summary:
        </h3>
        <div className="space-y-3 text-left max-w-lg mx-auto text-black">
          <p className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span>
              Based on your <strong>{formData.adminHoursPerWeek}</strong> hours of admin work per week
            </span>
          </p>
          <p className="flex items-start gap-2">
            <DollarSign className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="font-semibold">
              You'll save approximately ${estimatedSavings}/month
            </span>
          </p>
          {formData.businessType === 'healthcare' && (
            <p className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>
                Specialized healthcare team with Medicare/DVA experience
              </span>
            </p>
          )}
          {formData.timeline === 'urgent' && (
            <p className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="font-semibold">
                Fast-track onboarding available - start within 7 days
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="text-gray-600">
        <p className="font-semibold mb-4">What happens next?</p>
        <ol className="space-y-2 text-left max-w-md mx-auto">
          <li className="flex items-start gap-2">
            <span className="font-semibold text-blue-600">1.</span>
            <span>Our specialist will call you within 24 hours</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-blue-600">2.</span>
            <span>We'll discuss your specific needs in detail</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-blue-600">3.</span>
            <span>You'll receive a custom proposal within 48 hours</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-blue-600">4.</span>
            <span>Start with your new team member in as little as 7 days</span>
          </li>
        </ol>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      {!isSubmitted && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">{getProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getProgress()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          {renderBusinessSection()}
          {renderSituationSection()}
          {renderTimelineSection()}
          {renderContactSection()}
        </form>
      ) : (
        <>
          {renderSummary()}
          <UpsellSection 
            businessType={formData.businessType}
            challenges={formData.selectedChallenges}
          />
        </>
      )}
    </div>
  );
}