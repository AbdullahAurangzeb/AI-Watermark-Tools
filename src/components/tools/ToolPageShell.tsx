import React, { useState } from 'react';
import { ToolConfig } from '../../types';
import { TextTool } from './TextTool';
import { AdPlaceholder } from '../ads/AdPlaceholder';
import { SEOHead } from '../seo/SEOHead';
import { Breadcrumbs } from '../seo/Breadcrumbs';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Link } from '../../router/RouterContext';
import { ProviderLogo } from '../ui/BrandLogo';
import { 
  Sparkles, 
  Shield, 
  Search, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle, 
  ArrowRight,
  ChevronDown,
  Layers,
  FileCode,
  Sliders,
  ShieldCheck,
  Download
} from 'lucide-react';

interface ToolPageShellProps {
  config: ToolConfig;
}

export function ToolPageShell({ config }: ToolPageShellProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getFeatureIcon = (name: string) => {
    switch (name) {
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-600" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-emerald-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      case 'Search': return <Search className="w-5 h-5 text-purple-600" />;
      case 'Download': return <Download className="w-5 h-5 text-slate-700" />;
      case 'Eraser': return <Sliders className="w-5 h-5 text-amber-600" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="flex-1 w-full py-8 md:py-12">
      <SEOHead />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs />
      </div>
      
      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 mb-8">
        <div className="flex items-center justify-center gap-3">
          <ProviderLogo provider={config.provider} size="lg" className="shadow-md" />
        </div>

        {config.heroBadge && (
          <div className="inline-flex items-center justify-center">
            <Badge variant={config.provider === 'claude' ? 'amber' : config.provider === 'chatgpt' ? 'success' : 'purple'} size="md" dot>
              {config.heroBadge}
            </Badge>
          </div>
        )}
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {config.h1}
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {config.leadParagraph}
        </p>

        {/* Key trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% Free & No Sign-up</span>
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span>Private Client-Side Processing</span>
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Unicode & Emoji Safe</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Tool Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <TextTool
          toolName={config.name}
          provider={config.provider}
        />
      </div>

      {/* Ad Placement 1 */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <AdPlaceholder slot="tool-bottom" />
      </div>

      {/* Structured SEO & Explanatory Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16 mt-12">

        {config.explainerSections && config.explainerSections.length > 0 && (
          <section className="space-y-8">
            {config.explainerSections.map((section) => (
              <div key={section.heading} className="space-y-3">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-2 text-sm text-slate-600 pt-1">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}
        
        {/* Section: Features & Capabilities */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Core Capabilities of {config.name}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Deterministic, non-destructive text analysis engineered for high precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.features.map((feature, i) => (
              <Card key={i} variant="default" className="p-5 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100/80">
                    {getFeatureIcon(feature.iconName)}
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-11">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Section: How It Works */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              How to use {config.name}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              A short, transparent workflow that runs in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(config.howToSteps ?? [
              {
                title: 'Paste Content',
                description: 'Paste your AI-generated text or copy-paste snippet into the browser workspace.',
              },
              {
                title: 'Deep Scan',
                description: 'The scanner checks every Unicode codepoint for zero-width characters and abnormal whitespace.',
              },
              {
                title: 'Deterministic Clean',
                description: 'Unwanted artifacts are safely purged while keeping linguistic tokens and emojis untouched.',
              },
              {
                title: 'Copy & Export',
                description: 'Export your cleaned, normalized plain text with one-click copy or TXT file download.',
              },
            ]).map((step, index) => (
              <div key={step.title} className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-sm flex items-center justify-center">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: What This Tool Detects */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              What This Tool Detects
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Catalog of invisible Unicode control characters and formatting anomalies inspected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.detectionCapabilities.map((cat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3">
                <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  {cat.title}
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Ad Placement 2: In-Content */}
        <AdPlaceholder slot="in-content" />

        {/* Section: Limitations & Technical Honesty */}
        <section className="space-y-4 p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-lg font-bold tracking-tight">
              Important Technical Limitations & Transparency
            </h2>
          </div>
          <div className="space-y-2 text-sm leading-relaxed text-amber-900">
            <p>
              <strong>What this tool does:</strong>{' '}
              {config.limitations?.does ??
                'Detects and removes invisible Unicode control characters, zero-width spaces, byte-order marks (BOM), non-breaking spaces (NBSP), and formatting artifacts introduced during generation and clipboard transfer.'}
            </p>
            <p>
              <strong>What this tool does NOT do:</strong>{' '}
              {config.limitations?.doesNot ??
                'We do NOT make false claims of "100% undetectable AI text" or guaranteed bypass of probabilistic AI classifiers. Probabilistic detectors analyze sentence structure, vocabulary distribution, and perplexity. Our tool delivers deterministic text hygiene and formatting artifact removal.'}
            </p>
          </div>
        </section>

        {/* Section: FAQs */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Clear answers regarding {config.name}, privacy, and Unicode cleaning.
            </p>
          </div>

          <div className="space-y-3">
            {config.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-indigo-600 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Related Tools & Internal Links */}
        {config.relatedTools && config.relatedTools.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">
              Related text tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {config.relatedTools
                .filter((tool) => tool.to !== config.route)
                .slice(0, 3)
                .map((tool) => (
                  <Link
                    key={tool.to}
                    to={tool.to}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-xs transition-all group"
                  >
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 flex items-center justify-between gap-2">
                      <span>{tool.title}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5 shrink-0" />
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{tool.description}</p>
                  </Link>
                ))}
            </div>
          </section>
        )}

        {config.relatedGuides && config.relatedGuides.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              Related guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.relatedGuides.map((guide) => (
                <Link
                  key={guide.to}
                  to={guide.to}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-xs transition-all group"
                >
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{guide.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>

    </div>
  );
}
