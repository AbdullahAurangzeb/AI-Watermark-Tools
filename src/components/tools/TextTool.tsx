import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { TextInput, SAMPLE_TEXTS } from './TextInput';
import { AnalysisPanel } from './AnalysisPanel';
import { CleaningReport } from './CleaningReport';
import { CompareView } from './CompareView';
import { ResultPanel } from './ResultPanel';
import { RewritePanel } from './RewritePanel';
import { analyzeText } from '../../lib/text/analyzer';
import { cleanText } from '../../lib/text/cleaner';
import { TextAnalysis, CleaningResult } from '../../types';
import { 
  Sparkles, 
  Search, 
  Eraser, 
  Sliders, 
  Copy, 
  Download, 
  Columns, 
  Check, 
  AlertCircle, 
  FileText, 
  Layers, 
  ShieldCheck, 
  Info,
  Wand2
} from 'lucide-react';

interface TextToolProps {
  key?: React.Key;
  toolName?: string;
  provider?: 'claude' | 'chatgpt' | 'general' | 'invisible';
  placeholder?: string;
}

export function TextTool({
  toolName = 'AI Text Watermark Remover & Cleaner',
  provider = 'general',
  placeholder = 'Paste your AI-generated text here...',
}: TextToolProps) {
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'editor' | 'analysis' | 'compare' | 'cleaned' | 'rewrite'>('editor');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'info' | 'success' | 'warning'; text: string } | null>(null);

  const [analysisResult, setAnalysisResult] = useState<TextAnalysis | null>(null);
  const [cleaningResult, setCleaningResult] = useState<CleaningResult | null>(null);

  // Auto-clear status message after 4s
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const getEffectiveSample = () => {
    if (provider === 'chatgpt') return SAMPLE_TEXTS.chatgpt;
    if (provider === 'claude') return SAMPLE_TEXTS.claude;
    return SAMPLE_TEXTS.unicode;
  };

  const handleAnalyze = () => {
    let textToAnalyze = inputText;
    if (!textToAnalyze.trim()) {
      textToAnalyze = getEffectiveSample();
      setInputText(textToAnalyze);
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      const analysis = analyzeText(textToAnalyze);
      setAnalysisResult(analysis);
      setIsAnalyzing(false);
      setActiveTab('analysis');
      setStatusMessage({
        type: 'success',
        text: analysis.hasIssues
          ? `Analysis complete: ${analysis.invisibleCharacterCount + analysis.whitespaceIssueCount + analysis.artifactCount} artifact(s) detected.`
          : 'Analysis complete: No unwanted artifacts detected.',
      });
    }, 150);
  };

  const handleClean = () => {
    let textToClean = inputText;
    if (!textToClean.trim()) {
      textToClean = getEffectiveSample();
      setInputText(textToClean);
    }

    setIsCleaning(true);
    setTimeout(() => {
      const result = cleanText(textToClean);
      setCleaningResult(result);
      const analysis = analyzeText(result.cleanedText);
      setAnalysisResult(analysis);
      setIsCleaning(false);
      setActiveTab('compare');
      setStatusMessage({
        type: 'success',
        text: result.charactersRemoved > 0
          ? `Text cleaned successfully! Removed ${result.charactersRemoved} artifact(s).`
          : 'Text cleaned: String is already free of unwanted artifacts.',
      });
    }, 150);
  };

  const handleCopyCleaned = () => {
    const textToCopy = cleaningResult?.cleanedText || inputText;
    if (!textToCopy) {
      setStatusMessage({ type: 'warning', text: 'Nothing to copy. Enter text or load a sample first.' });
      return;
    }
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setStatusMessage({ type: 'success', text: 'Copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCleaned = () => {
    const textToDownload = cleaningResult?.cleanedText || inputText;
    if (!textToDownload) {
      setStatusMessage({ type: 'warning', text: 'Nothing to download. Enter text or load a sample first.' });
      return;
    }
    const blob = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cleaned-ai-text-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMessage({ type: 'success', text: 'Download initiated.' });
  };

  const providerBadgeText = {
    claude: 'Optimized for Claude Text Artifacts',
    chatgpt: 'Optimized for ChatGPT Text Artifacts',
    invisible: 'Deep Unicode & Zero-Width Scanner',
    general: 'Universal AI Artifact Detection',
  }[provider];

  return (
    <div id="tool-workspace" className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Main Workspace Card */}
      <Card variant="elevated" className="p-4 sm:p-6 lg:p-8 bg-white border border-slate-200/90 shadow-sm rounded-2xl">
        
        {/* Workspace Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                {toolName} Workspace
              </h2>
              <p className="text-xs text-slate-500">
                Deterministic text analysis, artifact detection, and local cleaning
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="purple" size="sm" dot>
              {providerBadgeText}
            </Badge>
          </div>
        </div>

        {/* Status Toast Banner */}
        {statusMessage && (
          <div
            className={`mb-4 p-3.5 rounded-xl flex items-center gap-2.5 text-xs font-medium transition-all ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : statusMessage.type === 'warning'
                ? 'bg-amber-50 text-amber-900 border border-amber-200'
                : 'bg-indigo-50 text-indigo-900 border border-indigo-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Tab Navigation Header */}
        <div className="flex items-center gap-1 sm:gap-2 pb-4 border-b border-slate-100 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'editor'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Editor & Input</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (!analysisResult) {
                handleAnalyze();
              } else {
                setActiveTab('analysis');
              }
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'analysis'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Analysis Report</span>
            {analysisResult && analysisResult.hasIssues && (
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              if (!cleaningResult) {
                handleClean();
              } else {
                setActiveTab('compare');
              }
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'compare'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Columns className="w-4 h-4" />
            <span>Diff Comparison</span>
            {cleaningResult && (
              <Badge variant="success" size="sm" className="py-0 px-1.5 text-[10px]">
                -{cleaningResult.charactersRemoved}
              </Badge>
            )}
          </button>

          {cleaningResult && (
            <button
              type="button"
              onClick={() => setActiveTab('cleaned')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'cleaned'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Cleaned Text</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('rewrite')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'rewrite'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>AI Rewrite</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
              activeTab === 'rewrite' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'
            }`}>
              Soon
            </span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="pt-4">
          
          {/* Tab 1: Editor & Input Panel */}
          {activeTab === 'editor' && (
            <div className="space-y-6">
              <TextInput
                value={inputText}
                onChange={setInputText}
                placeholder={placeholder}
                provider={provider}
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleAnalyze}
                    isLoading={isAnalyzing}
                    leftIcon={<Search className="w-4 h-4" />}
                  >
                    Analyze Text
                  </Button>

                  <Button
                    variant="secondary"
                    size="md"
                    onClick={handleClean}
                    isLoading={isCleaning}
                    leftIcon={<Eraser className="w-4 h-4" />}
                  >
                    Clean Text
                  </Button>

                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setActiveTab('rewrite')}
                    leftIcon={<Wand2 className="w-4 h-4 text-indigo-600" />}
                  >
                    Rewrite with AI
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyCleaned}
                    leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadCleaned}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download TXT
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Analysis Report Panel */}
          {activeTab === 'analysis' && (
            <div className="space-y-6">
              {analysisResult ? (
                <AnalysisPanel
                  analysis={analysisResult}
                  onCleanClick={handleClean}
                />
              ) : (
                <div className="py-12 text-center space-y-3">
                  <Search className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-medium text-slate-600">
                    No active analysis yet. Click below to analyze text immediately.
                  </p>
                  <Button variant="primary" size="sm" onClick={handleAnalyze}>
                    Analyze Now
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Diff Comparison Panel */}
          {activeTab === 'compare' && (
            <div className="space-y-6">
              {cleaningResult ? (
                <>
                  <CleaningReport result={cleaningResult} />
                  <CompareView
                    originalText={cleaningResult.originalText}
                    cleanedText={cleaningResult.cleanedText}
                    charactersRemoved={cleaningResult.charactersRemoved}
                  />
                </>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <Columns className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-medium text-slate-600">
                    No cleaning operation performed yet. Click below to clean text and generate a diff.
                  </p>
                  <Button variant="secondary" size="sm" onClick={handleClean}>
                    Clean Text Now
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Cleaned Result Panel */}
          {activeTab === 'cleaned' && (
            <div className="space-y-6">
              {cleaningResult ? (
                <ResultPanel
                  cleanedText={cleaningResult.cleanedText}
                  charactersRemoved={cleaningResult.charactersRemoved}
                  onRewriteClick={() => setActiveTab('rewrite')}
                />
              ) : (
                <div className="py-12 text-center space-y-3">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-medium text-slate-600">
                    Cleaned text is empty. Run "Clean Text" first.
                  </p>
                  <Button variant="secondary" size="sm" onClick={handleClean}>
                    Clean Text Now
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Tab 5: AI Rewrite Panel */}
          {activeTab === 'rewrite' && (
            <div className="space-y-6">
              <RewritePanel
                initialText={cleaningResult?.cleanedText || inputText || getEffectiveSample()}
                onApplyResult={(newText) => {
                  setInputText(newText);
                  setActiveTab('editor');
                  setStatusMessage({
                    type: 'success',
                    text: 'Applied rewritten text to main editor.',
                  });
                }}
              />
            </div>
          )}

        </div>

      </Card>

      {/* Privacy Guarantee Note */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-100/70 border border-slate-200/80 text-xs text-slate-600">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800 font-semibold">Privacy Guaranteed:</strong> Text entered into the workspace is analyzed and cleaned locally in your browser memory. Optional AI rewriting is proxied securely through our backend without persistent database logging.
        </div>
      </div>

    </div>
  );
}
