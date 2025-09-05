'use client';

import UnifiedForm from '@/components/qualification/UnifiedForm';
import { ArrowLeft, Shield, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useQualificationStore } from '@/store/qualification-store';

export default function QualificationPage() {
  const { resetForm } = useQualificationStore();
  
  const handleClearCache = () => {
    // Clear all localStorage
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
      resetForm();
      // Force reload to reset everything
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Yoonet</span>
            </Link>
            <div className="flex items-center gap-6">
              {/* Clear Cache Button - Remove this in production */}
              <button
                onClick={handleClearCache}
                className="px-3 py-1.5 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700"
              >
                Clear Data
              </button>
              <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Secure
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  200+ Clients
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  90% Retention
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Perfect VA Team
          </h1>
          <p className="text-lg text-gray-600">
            Takes just 2 minutes • Get instant cost savings estimate
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <UnifiedForm />
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © 2024 Yoonet. Building better teams in Balanga.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Terms of Service
              </a>
              <a href="tel:1300966638" className="text-gray-600 hover:text-gray-900">
                1300 YOONET
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}