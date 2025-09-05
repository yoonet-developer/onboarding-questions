'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Clock } from 'lucide-react';

interface CostCalculatorProps {
  adminHours: string;
  businessType: string;
}

export default function CostCalculator({ adminHours, businessType }: CostCalculatorProps) {
  // Calculate savings based on admin hours
  const calculateSavings = () => {
    const hourRanges = {
      '0-5': { avg: 3, savings: 260 },
      '5-10': { avg: 7.5, savings: 520 },
      '10-20': { avg: 15, savings: 1040 },
      '20-40': { avg: 30, savings: 2080 },
      '40+': { avg: 45, savings: 4160 }
    };
    
    return hourRanges[adminHours as keyof typeof hourRanges] || { avg: 0, savings: 0 };
  };
  
  const { avg, savings } = calculateSavings();
  const annualSavings = savings * 12;
  const hoursFreed = avg * 4; // Hours freed per month
  
  // Industry-specific messaging
  const getIndustryMessage = () => {
    switch(businessType) {
      case 'healthcare':
        return 'Redirect this time to patient care and growing your practice';
      case 'ecommerce':
        return 'Focus on product development and growing your sales';
      case 'professional':
        return 'Bill more client hours and expand your services';
      default:
        return 'Invest this time in strategic growth and innovation';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-lg p-6"
    >
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-green-600" />
        Your Potential Savings
      </h3>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600">${savings}</p>
          <p className="text-sm text-gray-600">Per Month</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">${annualSavings}</p>
          <p className="text-sm text-gray-600">Per Year</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-600">{hoursFreed}hrs</p>
          <p className="text-sm text-gray-600">Time Freed/Month</p>
        </div>
      </div>
      
      <div className="bg-white/50 rounded p-3 text-center">
        <p className="text-sm text-gray-700">
          <TrendingUp className="w-4 h-4 inline mr-1 text-green-600" />
          {getIndustryMessage()}
        </p>
      </div>
    </motion.div>
  );
}