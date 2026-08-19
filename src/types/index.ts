export type RoutePath =
  | '/'
  | '/claude-ai-text-watermark-remover'
  | '/chatgpt-ai-text-watermark-remover'
  | '/ai-text-watermark-remover'
  | '/ai-text-cleaner'
  | '/invisible-character-remover'
  | '/about'
  | '/contact'
  | '/privacy'
  | '/terms'
  | '/disclaimer'
  | '/blog'
  | `/blog/${string}`;

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface ToolConfig {
  id: string;
  name: string;
  provider?: 'claude' | 'chatgpt' | 'general' | 'invisible';
  route: RoutePath;
  pageTitle: string;
  metaDescription: string;
  h1: string;
  heroBadge?: string;
  leadParagraph: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  features: ToolFeature[];
  detectionCapabilities: {
    title: string;
    items: string[];
  }[];
  faqs: FAQItem[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  publishedDate: string;
  author: string;
  category: string;
  content: string;
  tags: string[];
}

export interface DetectedCharacter {
  codePoint: string;
  name: string;
  category: string;
  count: number;
  positions: number[];
}

export interface TextAnalysis {
  characterCount: number;
  wordCount: number;
  lineCount: number;
  readingTimeMinutes: number;
  invisibleCharacterCount: number;
  whitespaceIssueCount: number;
  artifactCount: number;
  detectedCharacters: DetectedCharacter[];
  hasIssues: boolean;
}

export interface CleaningChange {
  type: string;
  description: string;
  count: number;
}

export interface CleaningResult {
  originalText: string;
  cleanedText: string;
  charactersRemoved: number;
  changes: CleaningChange[];
}

export type RewriteMode = 'light' | 'balanced' | 'strong';

export interface RewriteInput {
  text: string;
  mode: RewriteMode;
}

export interface RewriteResult {
  rewrittenText: string;
  mode: RewriteMode;
  provider: string;
}
