import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Shield, Lock, CheckCircle2 } from 'lucide-react';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { SEOHead } from '../components/seo/SEOHead';

export function PrivacyPage() {
  return (
    <div className="flex-1 w-full py-10 md:py-16">
      <SEOHead
        title="Privacy Policy – AI Watermark Tools"
        description="Our privacy policy details how AI Watermark Tools handles client-side data processing and advertising cookies."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="space-y-3">
          <Badge variant="purple" size="md">Privacy Policy</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: March 2026 • Effective Immediately
          </p>
        </div>

        <Card variant="default" className="p-6 sm:p-8 bg-white border border-slate-200 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Core Privacy Commitment</span>
            </p>
            <p className="text-xs text-emerald-800 leading-relaxed">
              All deterministic text analysis and cleaning features operate 100% locally within your browser client. We do not transmit, log, sell, or store the text you paste into our local tools.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Information We Do NOT Collect</h2>
            <p>
              Unlike conventional SaaS platforms:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
              <li>We do <strong>not</strong> require user registration, passwords, or personal accounts.</li>
              <li>We do <strong>not</strong> store or log user-submitted input text into permanent databases.</li>
              <li>We do <strong>not</strong> require payment information, credit cards, or billing addresses.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. How Text is Processed</h2>
            <p>
              When you paste text into our analyzer and cleaning utilities:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
              <li><strong>Local Cleaning & Analysis:</strong> Executed strictly in browser RAM via JavaScript string evaluation. When you close the tab, all clipboard and input data is cleared immediately.</li>
              <li><strong>Optional AI Rewriting:</strong> If you explicitly choose to invoke optional AI rewriting, only the selected snippet is sent to the configured AI API proxy to generate the revision, and is not retained for model training.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Google AdSense, Cookies & Third-Party Advertising</h2>
            <p>
              We use third-party advertising companies, specifically <strong>Google AdSense</strong> and Google Ad Manager, to serve advertisements when you visit our website. These companies may use cookies, web beacons, and similar technologies to collect non-personally identifiable information (such as your IP address, browser type, referring pages, and interaction data) to serve personalized and non-personalized advertisements based on your prior visits to this website and other websites across the internet.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
              <p className="font-semibold text-slate-900">Important Disclosures regarding Google Advertising Policies:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.</li>
                <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold underline">Google Ads Settings</a>.</li>
                <li>Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold underline">www.aboutads.info</a> or <a href="https://youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold underline">Your Online Choices</a>.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. CCPA / CPRA & GDPR Privacy Rights</h2>
            <p>
              Under California Consumer Privacy Act (CCPA) and European General Data Protection Regulation (GDPR), users have rights to data transparency, access, and deletion. Because our core text cleaning utilities execute 100% locally within your client browser and do not collect, store, or sell personal identifiers or user documents, we do not maintain personal profiles or sell consumer data.
            </p>
            <p className="text-sm text-slate-600">
              For any advertising cookies set by third-party ad networks, you can exercise your consent choices at any time via the cookie management settings or the industry opt-out links listed above.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Log Files & Server Metrics</h2>
            <p>
              Like most standard web services, our servers automatically log basic anonymous HTTP request metadata (such as browser user agent, requested URLs, timestamp, and HTTP response codes) solely for DDoS mitigation, system reliability, and network diagnostic purposes. These logs are routinely cycled and never combined with text processed in our client-side tools.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">6. Third-Party Links</h2>
            <p>
              Our website may contain links to external sites. We are not responsible for the content, security practices, or privacy policies of third-party platforms.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">7. Contact Regarding Privacy</h2>
            <p>
              If you have any questions, concerns, or data inquiries regarding this Privacy Policy, please reach out via our contact page or email us directly at <strong>contact@aiwatermarktools.com</strong>.
            </p>
          </div>

        </Card>

        <AdPlaceholder slot="in-content" />

      </div>
    </div>
  );
}
