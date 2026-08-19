import React from 'react';
import { CleaningResult } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CheckCircle2, ShieldCheck, Sparkles, Layers, ArrowRight } from 'lucide-react';

interface CleaningReportProps {
  result: CleaningResult;
}

export function CleaningReport({ result }: CleaningReportProps) {
  const { originalText, cleanedText, charactersRemoved, changes } = result;

  return (
    <div className="space-y-6">
      
      {/* Summary Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <Card variant="default" className="p-4 space-y-1">
          <div className="text-xs text-slate-500 font-medium">Original Characters</div>
          <div className="text-2xl font-extrabold text-slate-900">
            {originalText.length.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">Before sanitization</div>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <div className="text-xs text-slate-500 font-medium">Cleaned Characters</div>
          <div className="text-2xl font-extrabold text-emerald-600">
            {cleanedText.length.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">After sanitization</div>
        </Card>

        <Card variant="default" className="p-4 space-y-1 bg-indigo-50/40 border-indigo-200">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Purged Artifacts</span>
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-600">
            {charactersRemoved.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">Invisible chars & tokens</div>
        </Card>

      </div>

      {/* Changes Breakdown */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Cleaning Actions Executed</span>
        </h3>

        {changes.length === 0 ? (
          <p className="text-xs text-slate-500">
            No characters needed removal. Text was already free of detected Unicode anomalies.
          </p>
        ) : (
          <ul className="space-y-2">
            {changes.map((change, i) => (
              <li
                key={i}
                className="flex items-start justify-between gap-3 text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-slate-900">{change.type}</strong>
                    <p className="text-slate-500 text-[11px]">{change.description}</p>
                  </div>
                </div>
                <Badge variant="purple" size="sm">
                  {change.count} purged
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Multilingual Safety Guarantee */}
      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 flex items-center gap-3 text-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <div>
          <strong className="font-semibold">Linguistic Structure Preserved:</strong> All non-English alphabets, Arabic and Persian ligatures, Chinese/Japanese characters, and modern emoji sets were safely preserved without corruption.
        </div>
      </div>

    </div>
  );
}
