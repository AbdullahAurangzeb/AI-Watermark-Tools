import React, { useState } from 'react';
import { Link, useRouter } from '../router/RouterContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { TextTool } from '../components/tools/TextTool';
import { SEOHead } from '../components/seo/SEOHead';
import { BLOG_POSTS } from '../data/blogData';
import { BrandLogo, ProviderLogo } from '../components/ui/BrandLogo';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  FileCode, 
  Search, 
  Eraser, 
  Sliders, 
  Lock, 
  CheckCircle2, 
  ChevronDown, 
  AlertTriangle,
  Bot,
  Zap,
  BookOpen
} from 'lucide-react';

export function HomePage() {
  const { navigate } = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedProvider, setSelectedProvider] = useState<'general' | 'claude' | 'chatgpt' | 'invisible'>('general');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const homeFaqs = [
    {
      question: 'What is an AI text watermark remover and cleaner?',
      answer: 'An AI text watermark remover is a utility designed to inspect, detect, and remove invisible Unicode characters, formatting artifacts, non-standard whitespace, and copy-paste remnants introduced when copying text from AI assistants like ChatGPT, Claude, and Gemini.',
    },
    {
      question: 'How do invisible characters get into AI text?',
      answer: 'Web interfaces and dynamic Markdown editors frequently insert zero-width spaces (U+200B), non-breaking spaces (U+00A0), and directional markers for cursor tracking and typography. When copied to the clipboard, these invisible characters remain inside your text.',
    },
    {
      question: 'Can this tool guarantee bypassing AI detectors?',
      answer: 'No. We pride ourselves on complete technical honesty. While our tool cleans all invisible characters and normalizes formatting, statistical AI detectors evaluate probabilistic token choices and sentence complexity rather than just hidden glyphs. We do not make false claims of 100% detector bypass.',
    },
    {
      question: 'Is text processing private and secure?',
      answer: 'Yes! All analysis and deterministic cleaning take place 100% locally in your browser environment. Your text is never stored in a database or permanently logged on our servers.',
    },
    {
      question: 'Is AI Watermark Tools free to use?',
      answer: 'Yes, all tools on our platform are 100% free with no sign-up, no subscriptions, and no credit caps.',
    },
  ];

  return (
    <div className="flex-1 w-full py-8 md:py-12">
      <SEOHead
        title="AI Watermark Tools – Free AI Text Watermark Remover & Cleaner"
        description="Free online AI text watermark remover and cleaner. Detect invisible Unicode characters, formatting artifacts, zero-width spaces, and clean AI-generated text locally in browser."
      />
      
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5 mb-10">
        
        <div className="inline-flex items-center justify-center">
          <Badge variant="purple" size="md" dot>
            Free Online Text Analysis & Cleaning Suite
          </Badge>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight">
          AI Text Watermark Remover & Cleaner
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Analyze, clean, and rewrite AI-generated text with free online text tools.
        </p>

        {/* Quick Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Zero Sign-up Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-indigo-600" />
            <span>100% Client-Side Privacy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Instant Unicode Cleaning</span>
          </div>
        </div>

      </div>

      {/* Two Primary Tool Cards Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Claude Tool */}
          <div
            onClick={() => navigate('/claude-ai-text-watermark-remover')}
            className="p-6 sm:p-8 rounded-2xl flex flex-col justify-between border-2 border-slate-200 hover:border-amber-500 hover:shadow-md transition-all group bg-white cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <ProviderLogo provider="claude" size="md" className="group-hover:scale-105 transition-transform" />
                <Badge variant="amber" size="sm">Anthropic Claude</Badge>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Claude AI Text Watermark Remover
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Analyze and clean Claude-generated text for invisible characters, formatting artifacts, unusual whitespace, and other detectable text artifacts.
                </p>
              </div>

              <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Cleans Claude markdown & non-breaking spaces</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Preserves foreign scripts & code blocks</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2">
              <Button
                to="/claude-ai-text-watermark-remover"
                variant="primary"
                size="md"
                className="w-full justify-between group-hover:bg-amber-600"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Use Claude Tool
              </Button>
            </div>
          </div>

          {/* Card 2: ChatGPT Tool */}
          <div
            onClick={() => navigate('/chatgpt-ai-text-watermark-remover')}
            className="p-6 sm:p-8 rounded-2xl flex flex-col justify-between border-2 border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group bg-white cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <ProviderLogo provider="chatgpt" size="md" className="group-hover:scale-105 transition-transform" />
                <Badge variant="success" size="sm">OpenAI ChatGPT</Badge>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  ChatGPT AI Text Watermark Remover
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Analyze and clean ChatGPT-generated text for invisible characters, formatting artifacts, unusual whitespace, and other detectable text artifacts.
                </p>
              </div>

              <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Strips zero-width spaces (U+200B) & BOM</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Removes irregular spaces and sticky tabs</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2">
              <Button
                to="/chatgpt-ai-text-watermark-remover"
                variant="primary"
                size="md"
                className="w-full justify-between group-hover:bg-emerald-600"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Use ChatGPT Tool
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Model Mode Preset Selector on Homepage */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-200">
          <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>Select Workspace Preset:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedProvider('general')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedProvider === 'general'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Universal Remover
            </button>
            <button
              type="button"
              onClick={() => setSelectedProvider('claude')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedProvider === 'claude'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Claude Preset
            </button>
            <button
              type="button"
              onClick={() => setSelectedProvider('chatgpt')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedProvider === 'chatgpt'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ChatGPT Preset
            </button>
            <button
              type="button"
              onClick={() => setSelectedProvider('invisible')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedProvider === 'invisible'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Invisible Unicode
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Tool Workspace on Homepage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <TextTool
          key={selectedProvider}
          toolName={
            selectedProvider === 'claude'
              ? 'Claude AI Text Watermark Remover'
              : selectedProvider === 'chatgpt'
              ? 'ChatGPT AI Text Watermark Remover'
              : selectedProvider === 'invisible'
              ? 'Invisible Character Remover'
              : 'AI Text Watermark Remover & Cleaner'
          }
          provider={selectedProvider}
        />
      </div>

      {/* Ad Placement: Below Main Tool */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <AdPlaceholder slot="tool-bottom" />
      </div>

      {/* Comprehensive Explanatory Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16 mt-12">
        
        {/* Section: How It Works */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How AI Text Cleaning Works
            </h2>
            <p className="text-sm text-slate-500">
              Deterministic, browser-based inspection engineered for total text preservation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="default" className="p-5 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-semibold text-slate-900 text-base">Paste Input</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Paste your AI prose directly from ChatGPT, Claude, Gemini, or any web text editor.
              </p>
            </Card>

            <Card variant="default" className="p-5 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-semibold text-slate-900 text-base">Detect Artifacts</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Inspect zero-width spaces, Byte Order Marks, non-breaking spaces, and hidden codes.
              </p>
            </Card>

            <Card variant="default" className="p-5 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-semibold text-slate-900 text-base">Purge & Clean</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Clean text deterministically without altering vocabulary, syntax, or formatting.
              </p>
            </Card>

            <Card variant="default" className="p-5 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="font-semibold text-slate-900 text-base">Export Result</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Copy cleaned plain text or download a sanitized .txt file with one click.
              </p>
            </Card>
          </div>
        </section>

        {/* Section: Key Features */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Comprehensive Detection & Cleaning Features
            </h2>
            <p className="text-sm text-slate-500">
              Built for writers, students, engineers, and researchers seeking pristine text hygiene.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default" className="p-6 space-y-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 w-fit">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Invisible Character Detection</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Find and purge zero-width spaces (U+200B), non-joiners (U+200C), joiners (U+200D), and byte order marks (U+FEFF).
              </p>
            </Card>

            <Card variant="default" className="p-6 space-y-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 w-fit">
                <FileCode className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Whitespace Normalization</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Detect and standardize sticky non-breaking spaces (U+00A0), multiple space sequences, and erratic tabulations.
              </p>
            </Card>

            <Card variant="default" className="p-6 space-y-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">International Script Safe</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Conservative filtering guarantees Arabic, Urdu, Chinese, Japanese, Cyrillic, and emojis remain untouched.
              </p>
            </Card>

            <Card variant="default" className="p-6 space-y-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 w-fit">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Statistical Analysis</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Real-time counts for characters, words, lines, reading time, and detected artifact metrics.
              </p>
            </Card>

            <Card variant="default" className="p-6 space-y-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 w-fit">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Optional AI Rewriting</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Restructure and rephrase sentences naturally while preserving your exact original meaning and tone.
              </p>
            </Card>

            <Card variant="default" className="p-6 space-y-3">
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 w-fit">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">100% Privacy by Design</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Your content is processed client-side. No accounts, no database records, no telemetry tracking.
              </p>
            </Card>
          </div>
        </section>

        {/* Ad Placement: In-Content */}
        <AdPlaceholder slot="in-content" />

        {/* Section: Technical Honesty & Limitations */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white space-y-4">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <h2 className="text-lg font-bold">
              Our Commitment to Technical Honesty
            </h2>
          </div>
          <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <p>
              Many tools on the internet claim to "make AI text 100% undetectable" or guarantee a bypass for all AI content detectors. These claims are fundamentally false and misleading.
            </p>
            <p>
              <strong>What our tools actually do:</strong> We perform rigorous deterministic analysis to detect and remove invisible Unicode characters, zero-width spaces, byte order marks, and irregular formatting artifacts that get embedded when copying AI text from web interfaces.
            </p>
          </div>
        </section>

        {/* Section: FAQ */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500">
              Everything you need to know about AI text watermarking and cleaning.
            </p>
          </div>

          <div className="space-y-3">
            {homeFaqs.map((faq, index) => {
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

        {/* Section: Latest Articles */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Latest Research & Articles</h2>
              <p className="text-xs text-slate-500 mt-0.5">Explore our engineering guides and Unicode breakdown articles.</p>
            </div>
            <Link to="/blog" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BLOG_POSTS.slice(0, 2).map((post) => (
              <Card
                key={post.slug}
                variant="default"
                hoverEffect
                className="p-6 flex flex-col justify-between space-y-4 bg-white border border-slate-200 group"
              >
                <div className="space-y-2.5">
                  <Badge variant="purple" size="sm">{post.category}</Badge>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{post.readTime}</span>
                  <Link to={`/blog/${post.slug}`} className="font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}
