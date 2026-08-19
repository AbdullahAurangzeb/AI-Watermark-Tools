import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { SEOHead } from '../components/seo/SEOHead';

export function DisclaimerPage() {
  return (
    <div className="flex-1 w-full py-10 md:py-16">
      <SEOHead
        title="Technical & AI Disclaimer – AI Watermark Tools"
        description="Transparent explanation of deterministic text cleaning vs. probabilistic AI detection capabilities and limitations."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="space-y-3">
          <Badge variant="amber" size="md">Technical Transparency</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Technical & AI Disclaimer
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: March 2026
          </p>
        </div>

        <Card variant="default" className="p-6 sm:p-8 bg-white border border-slate-200 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-sm space-y-2">
            <p className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Notice on AI Detection & "Watermark Removal"</span>
            </p>
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>AI Watermark Tools</strong> provides deterministic cleaning of invisible Unicode characters, formatting artifacts, and unusual whitespace anomalies. We do NOT guarantee that text processed through our tools will bypass probabilistic AI classifiers or achieve specific AI detection scores.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Understanding Probabilistic vs. Structural Artifacts</h2>
            <p>
              AI content detectors (such as Turnitin, GPTZero, Originality.ai, and CopyLeaks) operate using complex statistical models that measure <em>perplexity</em> (word unpredictability) and <em>burstiness</em> (sentence length variation).
            </p>
            <p>
              Our utilities focus on removing **concrete formatting and character-level artifacts**, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
              <li>Zero Width Spaces (\`U+200B\`) and Byte Order Marks (\`U+FEFF\`)</li>
              <li>Non-breaking spaces (\`U+00A0\`) and irregular whitespace clusters</li>
              <li>Zero Width Joiners (\`U+200D\`) and Non-Joiners (\`U+200C\`)</li>
              <li>Orphaned Markdown and web rendering delimiters</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. No Deceptive Guarantees</h2>
            <p>
              We explicitly repudiate and refuse to make fraudulent marketing claims such as:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-rose-700 font-medium">
              <li>"100% Undetectable AI Content"</li>
              <li>"Guaranteed AI Detector Bypass"</li>
              <li>"Turn AI Text into 100% Human Score Instantly"</li>
            </ul>
            <p className="text-sm text-slate-600">
              Anyone claiming a magic one-click solution to permanently evade all probabilistic text classifiers is engaging in misleading advertising.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Responsible & Ethical Use</h2>
            <p>
              Users are responsible for ensuring that their use of AI text generation and text normalization complies with their institution’s academic integrity policies, employer guidelines, and applicable copyright laws.
            </p>
          </div>

        </Card>

        <AdPlaceholder slot="in-content" />

      </div>
    </div>
  );
}
