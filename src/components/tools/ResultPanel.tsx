import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Copy, Download, Check, Sparkles, Sliders } from 'lucide-react';

interface ResultPanelProps {
  cleanedText: string;
  charactersRemoved: number;
  onRewriteClick?: () => void;
}

export function ResultPanel({
  cleanedText,
  charactersRemoved,
  onRewriteClick,
}: ResultPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!cleanedText) return;
    navigator.clipboard.writeText(cleanedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!cleanedText) return;
    const blob = new Blob([cleanedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cleaned-ai-text-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Badge variant="success" size="md">
            Cleaned Text Output
          </Badge>
          <span className="text-xs text-slate-500 font-medium">
            {cleanedText.length.toLocaleString()} characters ({cleanedText.trim() ? cleanedText.trim().split(/\s+/).length : 0} words)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copied ? 'Copied!' : 'Copy Result'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleDownload}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Download TXT
          </Button>
        </div>
      </div>

      {/* Output Content Container */}
      <div className="relative">
        <textarea
          readOnly
          value={cleanedText}
          rows={11}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5 text-sm sm:text-base text-slate-900 leading-relaxed font-sans focus:outline-none resize-y"
          aria-label="Cleaned text result output"
        />
      </div>

      {/* Footer Info & AI Rewrite Suggestion */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-500">
        <p className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Purged {charactersRemoved} invisible/formatting artifact(s). Ready for publishing.</span>
        </p>

        {onRewriteClick && (
          <button
            type="button"
            onClick={onRewriteClick}
            className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Optional AI Rewriting Available →</span>
          </button>
        )}
      </div>
    </div>
  );
}
