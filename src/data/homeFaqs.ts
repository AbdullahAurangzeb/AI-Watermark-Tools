import { FAQItem } from '../types';

export const HOME_FAQS: FAQItem[] = [
  {
    question: 'What is an AI text watermark remover and cleaner?',
    answer:
      'It is a browser utility that inspects copied or AI-generated text for invisible Unicode characters, zero-width spaces, non-breaking spaces, and formatting artifacts, then removes those cataloged issues without rewriting your sentences.',
  },
  {
    question: 'How do invisible characters get into AI text?',
    answer:
      'Web interfaces and markdown editors often insert zero-width spaces (U+200B), non-breaking spaces (U+00A0), and related markers for layout or cursor handling. Those characters can remain in the clipboard after you copy from ChatGPT, Claude, or similar tools.',
  },
  {
    question: 'Can I clean ChatGPT text and Claude text here?',
    answer:
      'Yes. The homepage workspace can scan general, ChatGPT, Claude, or invisible-character presets. Dedicated pages explain ChatGPT text cleaning and Claude text cleaning in more detail.',
  },
  {
    question: 'What are zero-width characters?',
    answer:
      'Zero-width characters occupy a position in the string but have no visible width. The most common example is the zero-width space (U+200B). They can break search matching and change character counts even though you cannot see them.',
  },
  {
    question: 'Can this tool guarantee bypassing AI detectors?',
    answer:
      'No. Cleaning hidden characters and normalizing whitespace is text hygiene. Statistical AI detectors evaluate writing patterns such as word choice and sentence variation. We do not claim 100% detector bypass or “human” scores.',
  },
  {
    question: 'Is text processing private?',
    answer:
      'Cleaning and analysis run in your browser. Pasted text is not stored in a database. Optional rewriting, if you use that separate feature, is a different request.',
  },
  {
    question: 'Is AI Watermark Tools free to use?',
    answer:
      'Yes. The core cleaning tools are free, with no sign-up, subscription, or usage cap.',
  },
];
