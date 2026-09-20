import { FAQItem } from '../types';

export const HOME_FAQS: FAQItem[] = [
  {
    question: 'What is an AI text watermark remover and cleaner?',
    answer:
      'An AI text watermark remover is a utility designed to inspect, detect, and remove invisible Unicode characters, formatting artifacts, non-standard whitespace, and copy-paste remnants introduced when copying text from AI assistants like ChatGPT, Claude, and Gemini.',
  },
  {
    question: 'How do invisible characters get into AI text?',
    answer:
      'Web interfaces and dynamic Markdown editors frequently insert zero-width spaces (U+200B), non-breaking spaces (U+00A0), and directional markers for cursor tracking and typography. When copied to the clipboard, these invisible characters remain inside your text.',
  },
  {
    question: 'Can this tool guarantee bypassing AI detectors?',
    answer:
      'No. We pride ourselves on complete technical honesty. While our tool cleans all invisible characters and normalizes formatting, statistical AI detectors evaluate probabilistic token choices and sentence complexity rather than just hidden glyphs. We do not make false claims of 100% detector bypass.',
  },
  {
    question: 'Is text processing private and secure?',
    answer:
      'Yes! All analysis and deterministic cleaning take place 100% locally in your browser environment. Your text is never stored in a database or permanently logged on our servers.',
  },
  {
    question: 'Is AI Watermark Tools free to use?',
    answer:
      'Yes, all tools on our platform are 100% free with no sign-up, no subscriptions, and no credit caps.',
  },
];
