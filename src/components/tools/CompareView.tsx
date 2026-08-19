import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Copy, Download, Check, ArrowRight, Eye, Code2 } from 'lucide-react';

interface CompareViewProps {
  originalText: string;
  cleanedText: string;
  charactersRemoved: number;
}

export function CompareView({
  originalText,
  cleanedText,
  charactersRemoved,
}: CompareViewProps) {
  const [copied, setCopied] = useState(false);
  const [showCodepoints, setShowCodepoints] = useState(false);

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

  // Helper to render visible markers for zero-width characters in debug mode
  const renderInspectText = (str: string) => {
    if (!showCodepoints) return str;
    return str
      .replace(/\u200B/g, '⦗ZWSP⦘')
      .replace(/\u200C/g, '⦗ZWNJ⦘')
      .replace(/\u200D/g, '⦗ZWJ⦘')
      .replace(/\u2060/g, '⦗WJ⦘')
      .replace(/\uFEFF/g, '⦗BOM⦘')
      .replace(/\u00A0/g, '⦗NBSP⦘');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-100/70 border border-slate-200">
        <div className="flex items-center gap-3">
          <Badge variant={charactersRemoved > 0 ? 'success' : 'neutral'} size="md">
            {charactersRemoved > 0 ? `${charactersRemoved} Artifacts Purged` : '0 Artifacts Detected'}
          </Badge>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Original ({originalText.length}) → Cleaned ({cleanedText.length})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCodepoints(!showCodepoints)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              showCodepoints
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{showCodepoints ? 'Hide Codepoints' : 'Highlight Hidden Marks'}</span>
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copied ? 'Copied!' : 'Copy Cleaned'}
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

      {/* Side-by-Side (Desktop) / Stacked (Mobile) Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Original Text Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Original Input</span>
            </span>
            <span className="font-mono text-slate-400 font-normal">
              {originalText.length} chars
            </span>
          </div>

          <div className="w-full h-80 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-wrap select-text">
            {renderInspectText(originalText) || (
              <span className="text-slate-400 italic">No text provided.</span>
            )}
          </div>
        </div>

        {/* Cleaned Text Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Sanitized Output</span>
            </span>
            <span className="font-mono text-emerald-600 font-normal">
              {cleanedText.length} chars
            </span>
          </div>

          <div className="w-full h-80 overflow-y-auto rounded-xl border-2 border-emerald-500/40 bg-white p-4 text-xs sm:text-sm text-slate-900 leading-relaxed font-sans whitespace-pre-wrap select-text shadow-xs">
            {renderInspectText(cleanedText) || (
              <span className="text-slate-400 italic">Cleaned text will appear here.</span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
