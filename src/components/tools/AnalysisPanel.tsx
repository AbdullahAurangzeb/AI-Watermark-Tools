import React from 'react';
import { TextAnalysis } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { 
  Layers, 
  FileCode, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Code, 
  Search 
} from 'lucide-react';

interface AnalysisPanelProps {
  analysis: TextAnalysis;
  onCleanClick?: () => void;
}

export function AnalysisPanel({ analysis, onCleanClick }: AnalysisPanelProps) {
  const {
    characterCount,
    wordCount,
    lineCount,
    invisibleCharacterCount,
    whitespaceIssueCount,
    artifactCount,
    detectedCharacters,
    hasIssues,
  } = analysis;

  return (
    <div className="space-y-6">
      
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        <Card variant="default" className="p-4 space-y-1">
          <div className="text-xs text-slate-500 font-medium">Characters</div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {characterCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">Total string length</div>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <div className="text-xs text-slate-500 font-medium">Words</div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {wordCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">Word tokens</div>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <div className="text-xs text-slate-500 font-medium">Lines</div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lineCount}
          </div>
          <div className="text-[11px] text-slate-400">Paragraphs/breaks</div>
        </Card>

        <Card
          variant="default"
          className={`p-4 space-y-1 ${
            invisibleCharacterCount > 0 ? 'bg-indigo-50/50 border-indigo-200' : ''
          }`}
        >
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Invisible Chars</span>
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className={`text-xl sm:text-2xl font-extrabold ${invisibleCharacterCount > 0 ? 'text-indigo-600' : 'text-slate-900'}`}>
            {invisibleCharacterCount}
          </div>
          <div className="text-[11px] text-slate-400">Zero-width & joiners</div>
        </Card>

        <Card
          variant="default"
          className={`p-4 space-y-1 ${
            whitespaceIssueCount > 0 ? 'bg-amber-50/50 border-amber-200' : ''
          }`}
        >
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Whitespace</span>
            <FileCode className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className={`text-xl sm:text-2xl font-extrabold ${whitespaceIssueCount > 0 ? 'text-amber-600' : 'text-slate-900'}`}>
            {whitespaceIssueCount}
          </div>
          <div className="text-[11px] text-slate-400">NBSP & extra spaces</div>
        </Card>

        <Card
          variant="default"
          className={`p-4 space-y-1 ${
            artifactCount > 0 ? 'bg-rose-50/50 border-rose-200' : ''
          }`}
        >
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Artifacts</span>
            <Sliders className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className={`text-xl sm:text-2xl font-extrabold ${artifactCount > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
            {artifactCount}
          </div>
          <div className="text-[11px] text-slate-400">Formatting tags</div>
        </Card>

      </div>

      {/* Issues State Alert */}
      {!hasIssues ? (
        <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-emerald-950">
                No unwanted text artifacts detected.
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
                The scanner found zero invisible Unicode codepoints, zero-width characters, or irregular whitespace anomalies in this text.
              </p>
            </div>
          </div>
          <Badge variant="success" size="md">
            Clean Formatting
          </Badge>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-indigo-950">
                {invisibleCharacterCount + whitespaceIssueCount + artifactCount} text artifact(s) identified.
              </h3>
              <p className="text-xs text-indigo-800 leading-relaxed mt-0.5">
                Invisible Unicode characters, non-breaking spaces, or formatting remnants were located and can be purged safely.
              </p>
            </div>
          </div>
          {onCleanClick && (
            <button
              type="button"
              onClick={onCleanClick}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shrink-0 shadow-xs"
            >
              Clean Text Now
            </button>
          )}
        </div>
      )}

      {/* Detected Characters Breakdown Table */}
      {detectedCharacters.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-600" />
              <span>Detailed Character Codepoint Map</span>
            </h3>
            <span className="text-xs text-slate-400">
              {detectedCharacters.length} distinct artifact type(s)
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Codepoint</th>
                  <th className="py-3 px-4">Character Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">Occurrences</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                {detectedCharacters.map((char, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-indigo-600">
                      {char.codePoint}
                    </td>
                    <td className="py-3 px-4 font-sans font-medium text-slate-900">
                      {char.name}
                    </td>
                    <td className="py-3 px-4 font-sans">
                      <Badge
                        variant={
                          char.category === 'invisible'
                            ? 'purple'
                            : char.category === 'whitespace'
                            ? 'amber'
                            : 'neutral'
                        }
                        size="sm"
                      >
                        {char.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-sans font-bold text-slate-900">
                      {char.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Technical Honesty Note */}
      <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
        <strong>Technical Transparency:</strong> This deterministic analysis checks for character-level artifacts. An absence of invisible Unicode characters does not guarantee that statistical/probabilistic AI detectors will classify text as human-authored.
      </div>

    </div>
  );
}
