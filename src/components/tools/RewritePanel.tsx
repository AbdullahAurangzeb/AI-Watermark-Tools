import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  Sparkles, 
  Sliders, 
  Copy, 
  Download, 
  Check, 
  RotateCcw, 
  Zap, 
  Briefcase, 
  GraduationCap, 
  Palette, 
  MessageSquare, 
  Feather, 
  ArrowRight, 
  AlertCircle,
  Clock,
  ShieldCheck,
  Info
} from 'lucide-react';
import { 
  rewriteTextWithAI, 
  getRewriteStatus, 
  RewriteOptions, 
  RewriteResult, 
  RewriteStatus 
} from '../../lib/api/rewriter';

interface RewritePanelProps {
  initialText: string;
  onApplyResult?: (newText: string) => void;
}

const STYLES: { id: RewriteOptions['style']; label: string; description: string; icon: any }[] = [
  {
    id: 'natural',
    label: 'Natural / Humanize',
    description: 'Rhythmic sentence variety & organic phrasing',
    icon: Feather,
  },
  {
    id: 'concise',
    label: 'Concise & Tight',
    description: 'Removes fluff, filler, and repetitive phrases',
    icon: Zap,
  },
  {
    id: 'formal',
    label: 'Professional & Formal',
    description: 'Corporate tone for executives & business reports',
    icon: Briefcase,
  },
  {
    id: 'academic',
    label: 'Scholarly & Academic',
    description: 'Rigorous analytical framing & precision vocabulary',
    icon: GraduationCap,
  },
  {
    id: 'creative',
    label: 'Dynamic & Creative',
    description: 'Engaging cadence & expressive sentence structure',
    icon: Palette,
  },
  {
    id: 'casual',
    label: 'Casual & Friendly',
    description: 'Conversational peer-to-peer tone',
    icon: MessageSquare,
  },
];

export function RewritePanel({ initialText, onApplyResult }: RewritePanelProps) {
  const [selectedStyle, setSelectedStyle] = useState<RewriteOptions['style']>('natural');
  const [intensity, setIntensity] = useState<RewriteOptions['intensity']>('medium');
  const [copied, setCopied] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* Coming Soon Announcement Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-purple-50/70 to-slate-50 border border-indigo-200/80 text-indigo-950 space-y-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
            <span className="font-bold text-sm text-indigo-950">
              AI Intelligent Text Rewriter & Stylist
            </span>
          </div>
          <Badge variant="purple" size="sm" dot>
            Coming Soon (In Preview)
          </Badge>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
          We are preparing our standalone natural humanizer engine that restructures monotonous sentence patterns, introduces natural flow variations, and adapts tone across multiple styles.
        </p>
        <div className="pt-2 border-t border-indigo-100 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Free & Active: All Claude, ChatGPT, and Invisible Character Cleaners</span>
          </div>
          <span className="text-[11px] text-slate-400">Zero API fees &bull; 100% client-side privacy</span>
        </div>
      </div>

      {/* Preview Configuration Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>Tone & Stylistic Nuance (Upcoming Modes)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore the styles that will be supported in the upcoming release.
            </p>
          </div>

          {/* Intensity Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs opacity-75">
            <span className="text-[11px] text-slate-500 font-semibold px-2">Rewrite Variation:</span>
            {(['low', 'medium', 'high'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setIntensity(lvl)}
                className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-colors ${
                  intensity === lvl
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Style Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {STYLES.map((style) => {
            const Icon = style.icon;
            const isSelected = selectedStyle === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => setSelectedStyle(style.id)}
                className={`text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate flex items-center justify-between">
                    <span>{style.label}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {style.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Trigger Button */}
        <div className="flex flex-wrap items-center justify-between pt-2 gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              disabled
              leftIcon={<Clock className="w-4 h-4 text-indigo-600" />}
              className="bg-indigo-50/50 border-indigo-200 text-indigo-950 font-semibold cursor-not-allowed opacity-90"
            >
              AI Rewriting — Coming Soon
            </Button>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Selected style: <strong>{selectedStyle}</strong>
            </span>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Use the <strong>Diff Comparison</strong> and <strong>Cleaned Text</strong> tabs to inspect and strip watermarks instantly.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
