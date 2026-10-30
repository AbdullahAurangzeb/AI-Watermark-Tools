import React, { useState } from 'react';
import { Link, useRouter } from '../router/RouterContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { TextTool } from '../components/tools/TextTool';
import { SEOHead } from '../components/seo/SEOHead';
import { BLOG_POSTS } from '../data/blogData';
import { HOME_FAQS } from '../data/homeFaqs';
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

  return (
    <div className="flex-1 w-full py-8 md:py-12">
      <SEOHead />
      
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
          Free browser-based tools to inspect and clean AI-generated text. Remove invisible Unicode characters, zero-width spaces, unusual whitespace, and formatting artifacts from ChatGPT, Claude, and other copied text.
        </p>

        {/* Quick Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Zero Sign-up Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-indigo-600" />
            <span>Text Cleaned in Your Browser</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Instant Unicode Cleaning</span>
          </div>
        </div>

        {/* Primary CTA: start cleaning on this page, or jump to the most-used tool */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() =>
              document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          >
            Paste &amp; clean text now
          </Button>
          <Link
            to="/invisible-character-remover"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
          >
            Only need to find hidden characters?
          </Link>
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
                  <Link to="/claude-ai-text-watermark-remover">
                    Claude AI Text Watermark Remover
                  </Link>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Analyze and clean Claude-generated text for invisible characters, formatting artifacts, unusual whitespace, and other detectable text artifacts.
                </p>
              </div>

              <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Normalizes non-breaking &amp; odd spaces in Claude copies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Keeps non-Latin scripts, emoji &amp; wording intact</span>
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
                  <Link to="/chatgpt-ai-text-watermark-remover">
                    ChatGPT AI Text Watermark Remover
                  </Link>
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
                  <span>Converts non-breaking &amp; odd spaces to normal ones</span>
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

      {/* Remaining major tools */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/ai-text-cleaner"
            className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-md transition-all group"
          >
            <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600">AI Text Cleaner</h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              General cleanup for AI drafts: hidden characters and copy-paste spacing, without rewriting.
            </p>
          </Link>
          <Link
            to="/invisible-character-remover"
            className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-md transition-all group"
          >
            <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600">Invisible Character Remover</h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Find and remove zero-width spaces and other hidden Unicode characters in any copied text.
            </p>
          </Link>
          <Link
            to="/ai-text-watermark-remover"
            className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-md transition-all group"
          >
            <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600">AI Text Watermark Remover</h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Universal scan for text from mixed or unknown AI sources, with watermark limitations explained.
            </p>
          </Link>
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
      <div id="workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 scroll-mt-24">
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

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default" className="p-6 space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Who these tools are for</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Writers, students, developers, and editors who copy text from ChatGPT, Claude, or other assistants and need the result to behave like ordinary plain text. If search, diffs, CMS fields, or code parsers act strangely after a paste, hidden characters or unusual whitespace are a common cause.
            </p>
          </Card>
          <Card variant="default" className="p-6 space-y-3">
            <h2 className="text-xl font-bold text-slate-900">What we can detect and clean</h2>
            <ul className="text-sm text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Invisible Unicode characters and zero-width spaces</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Non-breaking spaces and unusual whitespace</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Formatting artifacts from chat UIs and markdown views</span>
              </li>
            </ul>
            <p className="text-xs text-slate-500 leading-relaxed">
              We do not claim guaranteed AI-detector bypass or that every AI draft contains a removable watermark.
            </p>
          </Card>
        </section>

        {/* Section: What "AI watermark" can mean, and which tool fits */}
        <section className="space-y-6" aria-labelledby="watermark-meanings-heading">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 id="watermark-meanings-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              What “AI watermark” can mean, and what these tools clean
            </h2>
            <p className="text-sm text-slate-500">
              The same phrase is used for four different things. Only some of them live in the characters of your text.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card variant="default" className="p-5 space-y-2">
              <h3 className="text-base font-bold text-slate-900">Invisible Unicode characters</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Zero-width spaces, byte-order marks, and similar code points that can ride along with copied text. These are
                real characters, so they can be found and removed with the{' '}
                <Link to="/invisible-character-remover" className="text-indigo-600 font-semibold hover:underline">
                  invisible character remover
                </Link>
                .
              </p>
            </Card>
            <Card variant="default" className="p-5 space-y-2">
              <h3 className="text-base font-bold text-slate-900">Formatting and copy-paste artifacts</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Non-breaking spaces, odd spacing, and markdown leftovers from chat interfaces. The{' '}
                <Link to="/ai-text-cleaner" className="text-indigo-600 font-semibold hover:underline">
                  AI text cleaner
                </Link>{' '}
                normalizes these without rewriting your sentences. For replies copied from ChatGPT, the{' '}
                <Link to="/chatgpt-ai-text-watermark-remover" className="text-indigo-600 font-semibold hover:underline">
                  ChatGPT text cleaner
                </Link>{' '}
                explains the usual suspects.
              </p>
            </Card>
            <Card variant="default" className="p-5 space-y-2">
              <h3 className="text-base font-bold text-slate-900">Statistical watermarks</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A researched technique where a model’s word choices follow a hidden pattern. It is not a character you can
                delete, and these tools neither detect nor remove it. Read{' '}
                <Link to="/blog/does-chatgpt-watermark-text" className="text-indigo-600 font-semibold hover:underline">
                  whether ChatGPT watermarks text
                </Link>{' '}
                for the details.
              </p>
            </Card>
            <Card variant="default" className="p-5 space-y-2">
              <h3 className="text-base font-bold text-slate-900">AI detection</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Detectors are separate classifiers that score writing patterns. Cleaning hidden characters does not change
                your wording, so it should not be expected to change a detector result. If your text comes from several
                assistants, start with the{' '}
                <Link to="/ai-text-watermark-remover" className="text-indigo-600 font-semibold hover:underline">
                  universal AI text watermark remover
                </Link>{' '}
                and its limitations section.
              </p>
            </Card>
          </div>
        </section>
        
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
                Remove cataloged hidden characters and normalize odd spaces without altering your wording.
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
                Report zero-width spaces, joiners, direction marks, and byte order marks; remove the ones that rarely belong in plain text (U+200B, U+2060, U+FEFF, U+00AD).
              </p>
            </Card>

            <Card variant="default" className="p-6 space-y-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 w-fit">
                <FileCode className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Whitespace Normalization</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Convert non-breaking (U+00A0) and typographic spaces to normal spaces, collapse long space runs, and trim trailing spaces.
              </p>
            </Card>

            <Card variant="default" className="p-6 space-y-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">International Script Safe</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Conservative rules leave Arabic, Urdu, Chinese, Japanese, Cyrillic, and emoji untouched, including the joiners they rely on.
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
              <h3 className="text-base font-bold text-slate-900">Optional AI Rewriting (Coming Soon)</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                A separate, opt-in rewriting feature is in preview. Cleaning never rewrites your text.
              </p>
            </Card>

            <Card variant="default" className="p-6 space-y-3">
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 w-fit">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Privacy by Design</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Pasted text is analyzed and cleaned in your browser and is not stored. No account needed. The site uses
                Google Analytics for anonymous page-view statistics.
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
              <strong>What our tools actually do:</strong> We perform deterministic, character-level analysis to detect invisible Unicode characters and unusual whitespace, remove the supported ones, and normalize spacing artifacts that can come along when copying text from web interfaces.
            </p>
            <p>
              <strong>What they do not do:</strong> They do not detect or remove statistical watermarks, do not rewrite your text, and do not promise any AI-detector outcome.
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
            {HOME_FAQS.map((faq, index) => {
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
                    aria-controls={`home-faq-answer-${index}`}
                  >
                    <span className="text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>
                  <div id={`home-faq-answer-${index}`} hidden={!isOpen} className="px-4 sm:px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
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
            {BLOG_POSTS.slice(0, 4).map((post) => (
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
