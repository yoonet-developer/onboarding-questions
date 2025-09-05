'use client';

import { motion } from 'framer-motion';
import { Rocket, Code, Zap, Users, ArrowRight, Sparkles, Database, Shield } from 'lucide-react';

interface UpsellSectionProps {
  businessType: string;
  challenges: string[];
}

export default function UpsellSection({ businessType, challenges }: UpsellSectionProps) {
  const getRelevantServices = () => {
    const services = [];
    
    // Business-specific services
    if (businessType === 'healthcare') {
      services.push({
        icon: <Code className="w-6 h-6 text-blue-600" />,
        title: 'Cliniko Extensions',
        description: 'Custom integrations and features for your practice management system'
      });
      services.push({
        icon: <Database className="w-6 h-6 text-indigo-600" />,
        title: 'Patient Data Analytics',
        description: 'Insights to improve patient retention and clinic efficiency'
      });
    }
    
    if (businessType === 'ecommerce') {
      services.push({
        icon: <Sparkles className="w-6 h-6 text-yellow-600" />,
        title: 'E-commerce Automation',
        description: 'Automate inventory, pricing, and customer communications'
      });
    }
    
    // Challenge-specific services
    if (challenges.some(c => c.toLowerCase().includes('appointment') || c.toLowerCase().includes('scheduling'))) {
      services.push({
        icon: <Zap className="w-6 h-6 text-yellow-600" />,
        title: 'Smart Scheduling System',
        description: 'AI-powered appointment optimization reducing no-shows by 40%'
      });
    }
    
    if (challenges.some(c => c.toLowerCase().includes('medicare') || c.toLowerCase().includes('claiming'))) {
      services.push({
        icon: <Shield className="w-6 h-6 text-green-600" />,
        title: 'Medicare Automation',
        description: 'Automated claiming and reconciliation saving 15+ hours weekly'
      });
    }
    
    // Universal services
    services.push({
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: 'Team Training Programs',
      description: 'Upskill your entire team with our specialized training'
    });
    
    if (services.length < 4) {
      services.push({
        icon: <Rocket className="w-6 h-6 text-orange-600" />,
        title: 'Business Process Optimization',
        description: 'Streamline operations for maximum efficiency and growth'
      });
    }
    
    return services.slice(0, 4); // Return max 4 services
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🚀 But That's Not All We Do...
        </h2>
        <p className="text-gray-600">
          Beyond VAs, we're your complete business transformation partner
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {getRelevantServices().map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-3">
              {service.icon}
              <div>
                <h3 className="font-semibold text-gray-900">{service.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          Ask your specialist about these services during your consultation call
        </p>
        <button className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
          Learn More About Our Full Services
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}