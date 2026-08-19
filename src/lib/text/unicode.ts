export interface UnicodeArtifactDefinition {
  codePoint: number;
  hex: string;
  name: string;
  category: 'invisible' | 'whitespace' | 'format' | 'control';
  description: string;
  safeToRemove: boolean;
}

/**
 * Catalog of known invisible, zero-width, non-standard whitespace,
 * and formatting artifacts commonly encountered in AI-generated and web-copied text.
 */
export const INVISIBLE_UNICODE_CHARACTERS: UnicodeArtifactDefinition[] = [
  {
    codePoint: 0x200B,
    hex: 'U+200B',
    name: 'Zero Width Space (ZWSP)',
    category: 'invisible',
    description: 'Invisible space used for line break boundaries without creating a visible space.',
    safeToRemove: true,
  },
  {
    codePoint: 0x200C,
    hex: 'U+200C',
    name: 'Zero Width Non-Joiner (ZWNJ)',
    category: 'invisible',
    description: 'Suppresses ligature connection between adjacent characters.',
    safeToRemove: true,
  },
  {
    codePoint: 0x200D,
    hex: 'U+200D',
    name: 'Zero Width Joiner (ZWJ)',
    category: 'invisible',
    description: 'Connects characters or emoji sequences (e.g. combined family or skin tone emojis).',
    safeToRemove: false, // Must be conditionally preserved for emojis
  },
  {
    codePoint: 0x2060,
    hex: 'U+2060',
    name: 'Word Joiner (WJ)',
    category: 'invisible',
    description: 'Zero width character that prevents a line break from occurring at its position.',
    safeToRemove: true,
  },
  {
    codePoint: 0xFEFF,
    hex: 'U+FEFF',
    name: 'Zero Width No-Break Space / Byte Order Mark (BOM)',
    category: 'invisible',
    description: 'Invisible byte order mark or zero-width non-breaking space.',
    safeToRemove: true,
  },
  {
    codePoint: 0x00AD,
    hex: 'U+00AD',
    name: 'Soft Hyphen (SHY)',
    category: 'invisible',
    description: 'Invisible hyphenation opportunity indicator inserted by renderers.',
    safeToRemove: true,
  },
  {
    codePoint: 0x200E,
    hex: 'U+200E',
    name: 'Left-to-Right Mark (LRM)',
    category: 'format',
    description: 'Invisible directional formatting character for bidirectional text.',
    safeToRemove: false, // Preserved in bidirectional contexts
  },
  {
    codePoint: 0x200F,
    hex: 'U+200F',
    name: 'Right-to-Left Mark (RLM)',
    category: 'format',
    description: 'Invisible directional formatting character for bidirectional text.',
    safeToRemove: false, // Preserved in bidirectional contexts
  },
  {
    codePoint: 0x202A,
    hex: 'U+202A',
    name: 'Left-to-Right Embedding (LRE)',
    category: 'format',
    description: 'Directional embedding formatting code.',
    safeToRemove: true,
  },
  {
    codePoint: 0x202B,
    hex: 'U+202B',
    name: 'Right-to-Left Embedding (RLE)',
    category: 'format',
    description: 'Directional embedding formatting code.',
    safeToRemove: true,
  },
  {
    codePoint: 0x202C,
    hex: 'U+202C',
    name: 'Pop Directional Formatting (PDF)',
    category: 'format',
    description: 'Terminates the scope of the last directional embedding or override.',
    safeToRemove: true,
  },
  {
    codePoint: 0x202D,
    hex: 'U+202D',
    name: 'Left-to-Right Override (LRO)',
    category: 'format',
    description: 'Directional override formatting code.',
    safeToRemove: true,
  },
  {
    codePoint: 0x202E,
    hex: 'U+202E',
    name: 'Right-to-Left Override (RLO)',
    category: 'format',
    description: 'Directional override formatting code often abused for spoofing.',
    safeToRemove: true,
  },
  {
    codePoint: 0x180E,
    hex: 'U+180E',
    name: 'Mongolian Vowel Separator',
    category: 'invisible',
    description: 'Invisible character previously categorized as space.',
    safeToRemove: true,
  },
];

export const UNUSUAL_WHITESPACE_CHARACTERS: UnicodeArtifactDefinition[] = [
  {
    codePoint: 0x00A0,
    hex: 'U+00A0',
    name: 'Non-Breaking Space (NBSP)',
    category: 'whitespace',
    description: 'Space character that prevents automatic line breaks at its position.',
    safeToRemove: true,
  },
  {
    codePoint: 0x2000,
    hex: 'U+2000',
    name: 'En Quad',
    category: 'whitespace',
    description: 'Typographical space equal to 1 en width.',
    safeToRemove: true,
  },
  {
    codePoint: 0x2001,
    hex: 'U+2001',
    name: 'Em Quad',
    category: 'whitespace',
    description: 'Typographical space equal to 1 em width.',
    safeToRemove: true,
  },
  {
    codePoint: 0x2002,
    hex: 'U+2002',
    name: 'En Space',
    category: 'whitespace',
    description: 'Space equal to nominal en width.',
    safeToRemove: true,
  },
  {
    codePoint: 0x2003,
    hex: 'U+2003',
    name: 'Em Space',
    category: 'whitespace',
    description: 'Space equal to nominal em width.',
    safeToRemove: true,
  },
  {
    codePoint: 0x2004,
    hex: 'U+2004',
    name: 'Three-Per-Em Space',
    category: 'whitespace',
    description: 'Space equal to 1/3 em width.',
    safeToRemove: true,
  },
  {
    codePoint: 0x2005,
    hex: 'U+2005',
    name: 'Four-Per-Em Space',
    category: 'whitespace',
    description: 'Space equal to 1/4 em width.',
    safeToRemove: true,
  },
  {
    codePoint: 0x2006,
    hex: 'U+2006',
    name: 'Six-Per-Em Space',
    category: 'whitespace',
    description: 'Space equal to 1/6 em width.',
    safeToRemove: true,
  },
  {
    codePoint: 0x2007,
    hex: 'U+2007',
    name: 'Figure Space',
    category: 'whitespace',
    description: 'Space equal in width to tabular digits in fixed-pitch fonts.',
    safeToRemove: true,
  },
  {
    codePoint: 0x2008,
    hex: 'U+2008',
    name: 'Punctuation Space',
    category: 'whitespace',
    description: 'Space equal in width to narrow punctuation marks.',
    safeToRemove: true,
  },
  {
    codePoint: 0x2009,
    hex: 'U+2009',
    name: 'Thin Space',
    category: 'whitespace',
    description: 'Space equal to 1/5 or 1/6 em width.',
    safeToRemove: true,
  },
  {
    codePoint: 0x200A,
    hex: 'U+200A',
    name: 'Hair Space',
    category: 'whitespace',
    description: 'Extremely thin typographical space.',
    safeToRemove: true,
  },
  {
    codePoint: 0x202F,
    hex: 'U+202F',
    name: 'Narrow No-Break Space (NNBSP)',
    category: 'whitespace',
    description: 'Narrow space that prevents wrapping.',
    safeToRemove: true,
  },
  {
    codePoint: 0x205F,
    hex: 'U+205F',
    name: 'Medium Mathematical Space (MMSP)',
    category: 'whitespace',
    description: 'Space used in mathematical formulas.',
    safeToRemove: true,
  },
  {
    codePoint: 0x3000,
    hex: 'U+3000',
    name: 'Ideographic Space',
    category: 'whitespace',
    description: 'Full-width space used in East Asian scripts (CJK).',
    safeToRemove: false, // Preserve in CJK contexts unless explicitly requested
  },
];

// Map lookup by codepoint for O(1) matching
export const UNICODE_ARTIFACT_MAP = new Map<number, UnicodeArtifactDefinition>();

[...INVISIBLE_UNICODE_CHARACTERS, ...UNUSUAL_WHITESPACE_CHARACTERS].forEach((item) => {
  UNICODE_ARTIFACT_MAP.set(item.codePoint, item);
});
