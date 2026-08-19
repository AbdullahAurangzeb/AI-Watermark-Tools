import React, { useState, useEffect, useRef } from 'react';
import { Link, useRouter } from '../../router/RouterContext';
import { 
  Menu, 
  X, 
  Shield, 
  ArrowRight, 
  FileText, 
  Layers, 
  ChevronDown, 
  Sliders, 
  Sparkles,
  Bot,
  Zap,
  Eraser,
  ExternalLink,
  BookOpen,
  Info
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { BrandLogo, ProviderLogo } from '../ui/BrandLogo';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileToolsExpanded, setMobileToolsExpanded] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentPath } = useRouter();

  // Close mobile menu and dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  }, [currentPath]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toolItems = [
    {
      label: 'Claude AI Text Watermark Remover',
      shortLabel: 'Claude Tool',
      to: '/claude-ai-text-watermark-remover',
      description: 'Clean Claude markdown, hidden zero-width chars & spaces',
      provider: 'claude' as const,
      tag: 'Anthropic',
      tagVariant: 'amber' as const,
    },
    {
      label: 'ChatGPT AI Text Watermark Remover',
      shortLabel: 'ChatGPT Tool',
      to: '/chatgpt-ai-text-watermark-remover',
      description: 'Detect zero-width spaces (U+200B) & copy artifacts',
      provider: 'chatgpt' as const,
      tag: 'OpenAI',
      tagVariant: 'success' as const,
    },
    {
      label: 'Universal Watermark Remover',
      shortLabel: 'Universal Tool',
      to: '/ai-text-watermark-remover',
      description: 'Comprehensive inspection for all AI model outputs',
      provider: 'general' as const,
      tag: 'All Models',
      tagVariant: 'purple' as const,
    },
    {
      label: 'AI Text Cleaner & Formatter',
      shortLabel: 'AI Text Cleaner',
      to: '/ai-text-cleaner',
      description: 'Standardize whitespace, tabs, and layout anomalies',
      provider: 'general' as const,
      tag: 'Sanitizer',
      tagVariant: 'default' as const,
    },
    {
      label: 'Invisible Character Remover',
      shortLabel: 'Invisible Unicode',
      to: '/invisible-character-remover',
      description: 'Find zero-width non-joiners, word joiners, & BOMs',
      provider: 'invisible' as const,
      tag: 'Unicode',
      tagVariant: 'purple' as const,
    },
  ];

  const isToolActive = toolItems.some((t) => currentPath === t.to);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center group shrink-0"
            aria-label="AI Watermark Tools Home"
          >
            <BrandLogo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            <Link
              to="/"
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                currentPath === '/'
                  ? 'bg-slate-100 text-slate-950 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* Product Tools Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onMouseEnter={() => setToolsDropdownOpen(true)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                  isToolActive || toolsDropdownOpen
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                aria-expanded={toolsDropdownOpen}
              >
                <span>Product Tools</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    toolsDropdownOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Desktop Dropdown Flyout */}
              {toolsDropdownOpen && (
                <div
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                  className="absolute left-0 top-full mt-2 w-96 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between border-b border-slate-100 mb-1">
                    <span>Product Tools & Cleaners</span>
                    <Badge variant="purple" size="sm">Free</Badge>
                  </div>

                  {toolItems.map((tool) => {
                    const isSelected = currentPath === tool.to;
                    return (
                      <Link
                        key={tool.to}
                        to={tool.to}
                        onClick={() => setToolsDropdownOpen(false)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                          isSelected
                            ? 'bg-indigo-50/80 border border-indigo-200'
                            : 'hover:bg-slate-50 border border-transparent'
                        }`}
                      >
                        <ProviderLogo provider={tool.provider} size="sm" className="mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-sm font-bold text-slate-900 truncate">
                              {tool.shortLabel}
                            </span>
                            <Badge variant={tool.tagVariant} size="sm" className="py-0 px-1.5 text-[9px]">
                              {tool.tag}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {tool.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}

                  <div className="pt-2 mt-1 border-t border-slate-100 px-2 pb-1 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Shield className="w-3.5 h-3.5 text-emerald-600" />
                      Client-side processing
                    </span>
                    <Link
                      to="/ai-text-watermark-remover"
                      onClick={() => setToolsDropdownOpen(false)}
                      className="font-bold text-indigo-600 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Tool Links for Rapid Access */}
            <Link
              to="/claude-ai-text-watermark-remover"
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentPath === '/claude-ai-text-watermark-remover'
                  ? 'bg-amber-50 text-amber-900 font-semibold'
                  : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50/50'
              }`}
            >
              <ProviderLogo provider="claude" size="sm" className="w-5 h-5 rounded-md" />
              <span>Claude</span>
            </Link>

            <Link
              to="/chatgpt-ai-text-watermark-remover"
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentPath === '/chatgpt-ai-text-watermark-remover'
                  ? 'bg-emerald-50 text-emerald-900 font-semibold'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
              }`}
            >
              <ProviderLogo provider="chatgpt" size="sm" className="w-5 h-5 rounded-md" />
              <span>ChatGPT</span>
            </Link>

            <Link
              to="/ai-text-cleaner"
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                currentPath === '/ai-text-cleaner'
                  ? 'bg-slate-100 text-slate-950 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Cleaner
            </Link>

            <Link
              to="/blog"
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                currentPath.startsWith('/blog')
                  ? 'bg-slate-100 text-slate-950 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Blog
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                currentPath === '/about'
                  ? 'bg-slate-100 text-slate-950 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-500 font-medium px-2.5 py-1 bg-slate-50 rounded-full border border-slate-200">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Free & Local</span>
            </div>
            <Button
              to="/ai-text-watermark-remover"
              size="sm"
              variant="primary"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Try for Free
            </Button>
          </div>

          {/* Mobile Right Actions & Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              to="/ai-text-watermark-remover"
              size="sm"
              variant="primary"
              className="text-xs px-2.5 py-1.5 sm:px-3 sm:py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Try for Free
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Robust full overlay on mobile) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-white/98 backdrop-blur-xl border-t border-slate-200 z-50 flex flex-col justify-between overflow-y-auto overscroll-contain animate-in fade-in duration-150">
          <div className="p-4 sm:p-6 space-y-6">
            
            {/* Mobile Tools Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Product Tools
                </span>
                <button
                  type="button"
                  onClick={() => setMobileToolsExpanded(!mobileToolsExpanded)}
                  className="text-xs text-indigo-600 font-semibold flex items-center gap-1"
                >
                  <span>{mobileToolsExpanded ? 'Collapse' : 'Expand'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileToolsExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {mobileToolsExpanded && (
                <div className="grid grid-cols-1 gap-2">
                  {toolItems.map((tool) => {
                    const isSelected = currentPath === tool.to;
                    return (
                      <Link
                        key={tool.to}
                        to={tool.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-300 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <ProviderLogo provider={tool.provider} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-900">
                              {tool.shortLabel}
                            </span>
                            <Badge variant={tool.tagVariant} size="sm" className="text-[10px]">
                              {tool.tag}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {tool.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Page Links */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
                Navigation
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-sm font-semibold transition-colors ${
                    currentPath === '/'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Home</span>
                </Link>

                <Link
                  to="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-sm font-semibold transition-colors ${
                    currentPath.startsWith('/blog')
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  <span>Articles & Blog</span>
                </Link>

                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-sm font-semibold transition-colors ${
                    currentPath === '/about'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <Info className="w-4 h-4 text-blue-500" />
                  <span>About</span>
                </Link>

                <Link
                  to="/privacy"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-sm font-semibold transition-colors ${
                    currentPath === '/privacy'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <Shield className="w-4 h-4 text-amber-500" />
                  <span>Privacy Policy</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Mobile Bottom Launch Action */}
          <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/80 space-y-3 shrink-0">
            <Button
              to="/ai-text-watermark-remover"
              size="lg"
              variant="primary"
              className="w-full justify-center text-sm font-bold shadow-md"
              onClick={() => setMobileMenuOpen(false)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Try for Free
            </Button>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Free • Client-Side Processing • No Account</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
