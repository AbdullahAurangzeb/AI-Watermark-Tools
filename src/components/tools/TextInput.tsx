import React, { useRef, useState } from 'react';
import { 
  Clipboard, 
  RotateCcw, 
  Upload, 
  FileText, 
  AlertCircle, 
  Sparkles, 
  Layers,
  Bot,
  Check
} from 'lucide-react';
import { Badge } from '../ui/Badge';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSampleLoad?: (sampleText: string) => void;
  provider?: 'claude' | 'chatgpt' | 'general' | 'invisible';
}

export const SAMPLE_TEXTS = {
  chatgpt: `Artificial Intelligence is transforming text processing.\u200B ChatGPT outputs frequently\u00A0contain hidden zero-width spaces\u200B and non-breaking spaces\u00A0introduced during markdown rendering.   These repeated spaces and invisible markers \uFEFFcan cause parsing anomalies in downstream databases.`,
  claude: `Anthropic's Claude generates nuanced and articulate analysis.\u200B However, copying structured markdown tables and code blocks\u00A0can inject trailing non-breaking spaces\u00A0and invisible zero-width separators\u2060 into production documents.`,
  unicode: `Scanner test sample containing:\uFEFF
1. Zero Width Space: [test\u200Bword]
2. Zero Width Non-Joiner: [anti\u200Cpattern]
3. Word Joiner: [fixed\u2060token]
4. Non-Breaking Space: [isolated\u00A0space]
5. Multilingual test: مرحبا بالعالم • 你好世界 • こんにちは • 🚀✨`,
};

export function TextInput({
  value,
  onChange,
  placeholder = 'Paste your AI-generated text here...',
  onSampleLoad,
  provider = 'general',
}: TextInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pasteNotice, setPasteNotice] = useState<string | null>(null);

  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).filter(Boolean).length : 0;
  const lineCount = value ? value.split(/\r\n|\r|\n/).length : 0;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const isOverLimit = charCount > 100000;

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          onChange(text);
          setPasteNotice('Pasted successfully from clipboard!');
          setTimeout(() => setPasteNotice(null), 2500);
          return;
        }
      }
      throw new Error('Clipboard read not permitted in this frame');
    } catch {
      // Fallback focus for manual paste
      textareaRef.current?.focus();
      setPasteNotice('Please press Ctrl+V (or Cmd+V on Mac) to paste, or click a Sample below.');
      setTimeout(() => setPasteNotice(null), 4000);
    }
  };

  const handleClear = () => {
    onChange('');
    setPasteNotice(null);
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        onChange(content);
        setPasteNotice(`Loaded "${file.name}" (${content.length} characters)`);
        setTimeout(() => setPasteNotice(null), 3000);
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const loadSample = (type: 'chatgpt' | 'claude' | 'unicode') => {
    const text = SAMPLE_TEXTS[type];
    onChange(text);
    if (onSampleLoad) onSampleLoad(text);
    setPasteNotice(`Loaded ${type.toUpperCase()} test sample text.`);
    setTimeout(() => setPasteNotice(null), 2500);
  };

  return (
    <div
      className={`relative w-full space-y-3 ${
        isDragging ? 'ring-2 ring-indigo-500 rounded-2xl bg-indigo-50/20' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Top Meta & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-medium pb-1">
        
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="flex items-center gap-1.5">
            <strong className="text-slate-900 font-bold text-sm">{charCount.toLocaleString()}</strong>
            <span className="text-slate-500">Characters</span>
          </span>
          <span className="flex items-center gap-1.5">
            <strong className="text-slate-900 font-bold text-sm">{wordCount.toLocaleString()}</strong>
            <span className="text-slate-500">Words</span>
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <strong className="text-slate-900 font-bold text-sm">{lineCount}</strong>
            <span className="text-slate-500">Lines</span>
          </span>
          <span className="hidden md:inline text-slate-400">
            ~{readTimeMinutes} min read
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Paste button */}
          <button
            type="button"
            onClick={handlePaste}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-colors font-semibold text-xs cursor-pointer"
            title="Paste text from clipboard"
          >
            <Clipboard className="w-3.5 h-3.5 text-indigo-600" />
            <span>Paste</span>
          </button>

          {/* Upload file button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-colors font-semibold text-xs cursor-pointer"
            title="Upload text or markdown file"
          >
            <Upload className="w-3.5 h-3.5 text-indigo-600" />
            <span>Upload File</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.text"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
            }}
          />

          {/* Clear button */}
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors font-semibold text-xs cursor-pointer"
              title="Clear input text"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

      </div>

      {/* Quick Sample Presets (Always visible) */}
      <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
        <span className="text-slate-500 font-semibold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Try Sample Text:</span>
        </span>

        <button
          type="button"
          onClick={() => loadSample('chatgpt')}
          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50/50 text-slate-700 font-medium transition-all shadow-2xs cursor-pointer flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>ChatGPT Sample</span>
        </button>

        <button
          type="button"
          onClick={() => loadSample('claude')}
          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50/50 text-slate-700 font-medium transition-all shadow-2xs cursor-pointer flex items-center gap-1"
        >
          <Bot className="w-3 h-3 text-amber-600" />
          <span>Claude Sample</span>
        </button>

        <button
          type="button"
          onClick={() => loadSample('unicode')}
          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50/50 text-slate-700 font-medium transition-all shadow-2xs cursor-pointer flex items-center gap-1"
        >
          <Layers className="w-3 h-3 text-indigo-600" />
          <span>Zero-Width Unicode Sample</span>
        </button>
      </div>

      {/* Notification Toast */}
      {pasteNotice && (
        <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>{pasteNotice}</span>
        </div>
      )}

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={11}
          className="w-full rounded-xl border border-slate-200/90 bg-white p-4 sm:p-5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-sans leading-relaxed resize-y transition-all shadow-2xs"
          aria-label="AI Text Input Area"
        />

        {/* Drag over overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-indigo-50/90 rounded-xl border-2 border-dashed border-indigo-400 flex flex-col items-center justify-center pointer-events-none text-indigo-900">
            <Upload className="w-8 h-8 text-indigo-600 mb-2 animate-bounce" />
            <p className="font-semibold text-sm">Drop your .txt or .md file here</p>
          </div>
        )}
      </div>

      {/* Limit Warning */}
      {isOverLimit && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Your text exceeds 100,000 characters. Large documents will still be processed locally, but may take a few extra moments.
          </span>
        </div>
      )}
    </div>
  );
}
