import React from 'react';
import { Link } from '../../router/RouterContext';
import { Sparkles, Shield, CheckCircle2, Heart } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-100">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center group">
              <BrandLogo size="md" />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Free, transparent text analysis and deterministic cleaning utilities. Detect invisible Unicode characters, formatting artifacts, zero-width characters, and normalize AI-generated text locally in your browser.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Client-side Processing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Zero Data Retention</span>
              </div>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Product Tools
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/claude-ai-text-watermark-remover"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Claude AI Text Watermark Remover
                </Link>
              </li>
              <li>
                <Link
                  to="/chatgpt-ai-text-watermark-remover"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  ChatGPT AI Text Watermark Remover
                </Link>
              </li>
              <li>
                <Link
                  to="/ai-text-watermark-remover"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  AI Text Watermark Remover
                </Link>
              </li>
              <li>
                <Link
                  to="/ai-text-cleaner"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  AI Text Cleaner
                </Link>
              </li>
              <li>
                <Link
                  to="/invisible-character-remover"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Invisible Character Remover
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company & Resources */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Company & Resources
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Blog & Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Ethics */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Legal & Policies
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Technical Disclaimer
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AI Watermark Tools. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with technical transparency & privacy in mind</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
