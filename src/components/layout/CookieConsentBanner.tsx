import React, { useState, useEffect } from 'react';
import { Shield, Check, X } from 'lucide-react';
import { Link } from '../../router/RouterContext';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('aiwt_cookie_consent');
      if (!consent) {
        // Show after brief subtle delay so page loads cleanly
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore localstorage errors
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('aiwt_cookie_consent', 'accepted');
    } catch {}
    setIsVisible(false);
  };

  const handleDeclineNonEssential = () => {
    try {
      localStorage.setItem('aiwt_cookie_consent', 'essential_only');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      id="cookie-consent-banner"
      role="region"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
            <Shield className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-xs text-slate-600 leading-relaxed max-w-4xl">
            <p className="font-bold text-slate-900 text-xs sm:text-sm">
              We respect your privacy & browser data
            </p>
            <p>
              We and our advertising partners (including Google AdSense) use cookies and standard web technologies to analyze traffic and provide personalized advertisements. Your submitted text is processed <strong>100% locally in your browser</strong> and never stored. Review our{' '}
              <Link to="/privacy" className="text-indigo-600 font-semibold underline hover:text-indigo-800">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="/terms" className="text-indigo-600 font-semibold underline hover:text-indigo-800">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={handleDeclineNonEssential}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accept All</span>
          </button>
        </div>

      </div>
    </div>
  );
}
