import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { SEOHead } from '../components/seo/SEOHead';

export function TermsPage() {
  return (
    <div className="flex-1 w-full py-10 md:py-16">
      <SEOHead
        title="Terms of Service – AI Watermark Tools"
        description="Terms of service and user agreement for utilizing AI Watermark Tools utilities."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="space-y-3">
          <Badge variant="purple" size="md">Legal Agreement</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: March 2026
          </p>
        </div>

        <Card variant="default" className="p-6 sm:p-8 bg-white border border-slate-200 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing or using <strong>AI Watermark Tools</strong> (the "Service"), you agree to be bound by these Terms of Service. If you do not agree with any portion of these terms, please do not use our services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Permitted Use</h2>
            <p>
              The Service provides free text analysis, Unicode inspection, and text normalization tools. You agree to use the Service in compliance with all applicable laws and regulations. You may not use the Service for any malicious purpose, including attempting to disrupt site operations or scrape the infrastructure at unreasonable rates.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Intellectual Property</h2>
            <p>
              You retain all rights and ownership over any text you input or process through our utilities. We claim no intellectual property rights or ownership over your content.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Disclaimer of Warranties</h2>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. We do not warrant that the text cleaning functions will be error-free, uninterrupted, or fulfill specific third-party academic, legal, or publication requirements.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Limitation of Liability</h2>
            <p>
              Under no circumstances shall AI Watermark Tools or its operators be liable for any indirect, incidental, consequential, or punitive damages resulting from the use or inability to use the Service.
            </p>
          </div>

        </Card>

        <AdPlaceholder slot="in-content" />

      </div>
    </div>
  );
}
