import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Link } from '../router/RouterContext';
import { Sparkles, Shield, Cpu, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { SEOHead } from '../components/seo/SEOHead';
import { BrandLogo } from '../components/ui/BrandLogo';

export function AboutPage() {
  return (
    <div className="flex-1 w-full py-10 md:py-16">
      <SEOHead
        title="About AI Watermark Tools – Transparent AI Text Engineering"
        description="Learn about AI Watermark Tools, our privacy-first client-side architecture, and our commitment to honest, technical text hygiene."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <BrandLogo size="lg" showText={false} className="shadow-md" />
          </div>
          <Badge variant="purple" size="md">About AI Watermark Tools</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Transparent, Honest Text Engineering
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We provide free, client-side text utilities to inspect, clean, and normalize AI-generated content without false hype or inflated marketing claims.
          </p>
        </div>

        {/* Mission & Philosophy */}
        <Card variant="default" className="p-8 space-y-6 bg-white border border-slate-200">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              With the explosion of Large Language Models such as ChatGPT, Claude, and Gemini, millions of individuals and teams interact with generated text daily. However, copying text from web applications frequently transfers invisible Unicode control codes, non-breaking spaces, zero-width characters, and markdown remnants into production documents, codebases, and CMS systems.
            </p>
            <p className="text-slate-600 leading-relaxed">
              <strong>AI Watermark Tools</strong> was built to provide a reliable, deterministic, browser-based solution that strips these unwanted artifacts while safely preserving multi-language writing systems, emojis, and paragraph typography.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Client-Side Privacy</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Deterministic text analysis and cleaning execute entirely inside your browser.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Technical Honesty</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We reject "100% AI undetectable" scams. We focus on real Unicode and formatting hygiene.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Zero Friction</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                No sign-up forms, no subscription paywalls, and no credit meters.
              </p>
            </div>
          </div>
        </Card>

        {/* Ad Placeholder */}
        <AdPlaceholder slot="in-content" />

        {/* Core Principles */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Our Core Principles</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900">1. Conservative Unicode Sanitization</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Many crude cleaners simply strip all non-ASCII characters, ruining Arabic, Persian, Chinese, Japanese, and international text. Our cleaning engine specifically targets only documented invisible control codepoints.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900">2. Respect for User Data</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We believe utility tools should not hoard user data. We do not require accounts, we do not store submitted text, and we do not build tracking dossiers.
              </p>
            </div>
          </div>
        </div>

        {/* Quick CTA */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Ready to analyze your text?</h3>
            <p className="text-sm text-slate-400">Launch the free browser workspace now.</p>
          </div>
          <Link
            to="/ai-text-watermark-remover"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors shrink-0"
          >
            <span>Open Tool</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
