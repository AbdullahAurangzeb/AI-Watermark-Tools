/**
 * Plain-language description of what the shared cleaner (src/lib/text/cleaner.ts)
 * and analyzer (src/lib/text/analyzer.ts) actually do with default options.
 *
 * Keep this file in sync with the implementation. Page copy should never claim
 * more than what is listed here.
 */

export interface CleanerBehaviorGroup {
  title: string;
  summary: string;
  items: string[];
}

export const CLEANER_BEHAVIOR: CleanerBehaviorGroup[] = [
  {
    title: 'Removed',
    summary: 'Hidden characters that rarely belong in plain text.',
    items: [
      'Zero width space (U+200B)',
      'Word joiner (U+2060)',
      'Byte order mark / zero width no-break space (U+FEFF)',
      'Soft hyphen (U+00AD)',
    ],
  },
  {
    title: 'Converted to a normal space',
    summary: 'Space characters that look ordinary but behave differently.',
    items: [
      'Non-breaking space (U+00A0) and narrow no-break space (U+202F)',
      'Typographic spaces such as en, em, thin, and hair spaces (U+2000–U+200A)',
      'Medium mathematical space (U+205F)',
    ],
  },
  {
    title: 'Whitespace tidied',
    summary: 'Spacing leftovers from copy and paste.',
    items: [
      'Runs of three or more spaces between words are collapsed to one space',
      'Trailing spaces and tabs at the end of a line are removed',
      'Leading indentation, line breaks, and paragraph breaks are kept as they are',
    ],
  },
  {
    title: 'Reported, but left in place',
    summary: 'Characters that can be legitimate, so the cleaner does not delete them automatically.',
    items: [
      'Zero width joiner (U+200D), used in emoji sequences and some scripts',
      'Zero width non-joiner (U+200C), used in Persian, Urdu, and other scripts',
      'Left-to-right and right-to-left marks (U+200E, U+200F) and other bidirectional controls (U+202A–U+202E)',
      'Ideographic space (U+3000) used in Chinese and Japanese text',
      'An unclosed ``` code fence (flagged in the analysis only)',
    ],
  },
];

export const CLEANER_NEVER_CHANGES =
  'Letters in any script, numbers, punctuation, emoji, and your wording are never rewritten. Cleaning works on characters, not on writing style, so it does not establish or remove a statistical watermark and does not change how AI detectors score the text.';
