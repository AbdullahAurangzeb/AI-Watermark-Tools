import { CleaningResult, CleaningChange } from '../../types';

export interface CleaningOptions {
  removeZeroWidthSpaces?: boolean;
  normalizeWhitespace?: boolean;
  normalizeNBSP?: boolean;
  removeBOM?: boolean;
  cleanMarkdownRemnants?: boolean;
  preserveEmojis?: boolean;
  preserveInternationalScripts?: boolean;
}

export const DEFAULT_CLEANING_OPTIONS: CleaningOptions = {
  removeZeroWidthSpaces: true,
  normalizeWhitespace: true,
  normalizeNBSP: true,
  removeBOM: true,
  cleanMarkdownRemnants: false,
  preserveEmojis: true,
  preserveInternationalScripts: true,
};

/**
 * Deterministic, non-destructive text cleaner.
 * Purges strictly cataloged unwanted artifacts while safely preserving
 * global languages (Arabic, Urdu, Chinese, Japanese, Cyrillic, etc.), emojis,
 * and standard paragraph structures.
 */
export function cleanText(
  text: string,
  options: CleaningOptions = DEFAULT_CLEANING_OPTIONS
): CleaningResult {
  if (!text) {
    return {
      originalText: '',
      cleanedText: '',
      charactersRemoved: 0,
      changes: [],
    };
  }

  const opts = { ...DEFAULT_CLEANING_OPTIONS, ...options };
  const changes: CleaningChange[] = [];
  let result = text;

  // 1. Remove Byte Order Mark (U+FEFF)
  if (opts.removeBOM && result.includes('\uFEFF')) {
    const count = (result.match(/\uFEFF/g) || []).length;
    result = result.replace(/\uFEFF/g, '');
    changes.push({
      type: 'BOM Removal',
      description: 'Stripped Zero Width No-Break Space / Byte Order Mark (U+FEFF)',
      count,
    });
  }

  // 2. Remove Zero Width Spaces and specific invisible control codes (U+200B, U+2060, U+180E, U+00AD)
  if (opts.removeZeroWidthSpaces) {
    // Note: We preserve U+200D (ZWJ) if inside emoji sequences to avoid breaking composite emojis
    const zwspCount = (result.match(/\u200B/g) || []).length;
    if (zwspCount > 0) {
      result = result.replace(/\u200B/g, '');
      changes.push({
        type: 'Zero-Width Space',
        description: 'Purged Zero Width Space characters (U+200B)',
        count: zwspCount,
      });
    }

    const wordJoinerCount = (result.match(/\u2060/g) || []).length;
    if (wordJoinerCount > 0) {
      result = result.replace(/\u2060/g, '');
      changes.push({
        type: 'Word Joiner',
        description: 'Purged Word Joiner characters (U+2060)',
        count: wordJoinerCount,
      });
    }

    const softHyphenCount = (result.match(/\u00AD/g) || []).length;
    if (softHyphenCount > 0) {
      result = result.replace(/\u00AD/g, '');
      changes.push({
        type: 'Soft Hyphen',
        description: 'Removed Soft Hyphen tokens (U+00AD)',
        count: softHyphenCount,
      });
    }
  }

  // 3. Normalize Non-Breaking Spaces (U+00A0 and U+202F) to standard spaces
  if (opts.normalizeNBSP) {
    const nbspMatches = (result.match(/[\u00A0\u202F]/g) || []).length;
    if (nbspMatches > 0) {
      result = result.replace(/[\u00A0\u202F]/g, ' ');
      changes.push({
        type: 'NBSP Normalization',
        description: 'Converted Non-Breaking Spaces (U+00A0 / U+202F) to standard spaces',
        count: nbspMatches,
      });
    }
  }

  // 4. Normalize typographical spaces (En Quad, Em Quad, Thin Space, Hair Space, etc.)
  // Except Ideographic full-width space U+3000 which is part of standard CJK Japanese/Chinese text
  if (opts.normalizeWhitespace) {
    const typoSpacesRegex = /[\u2000-\u200A\u205F]/g;
    const typoCount = (result.match(typoSpacesRegex) || []).length;
    if (typoCount > 0) {
      result = result.replace(typoSpacesRegex, ' ');
      changes.push({
        type: 'Typographical Space Normalization',
        description: 'Normalized special width spaces (U+2000 - U+200A) to standard spaces',
        count: typoCount,
      });
    }

    // Collapse multiple consecutive spaces (3 or more) to a clean double or single space
    const multiSpaceRegex = /[ ]{3,}/g;
    let multiSpaceMatches = 0;
    result = result.replace(multiSpaceRegex, (match) => {
      multiSpaceMatches += match.length - 1;
      return ' ';
    });
    if (multiSpaceMatches > 0) {
      changes.push({
        type: 'Excessive Whitespace Collapse',
        description: 'Collapsed redundant whitespace sequences',
        count: multiSpaceMatches,
      });
    }

    // Clean trailing spaces at the end of lines
    const trailingSpaceRegex = /[ \t]+$/gm;
    const trailingCount = (result.match(trailingSpaceRegex) || []).length;
    if (trailingCount > 0) {
      result = result.replace(trailingSpaceRegex, '');
      changes.push({
        type: 'Trailing Whitespace Cleanup',
        description: 'Stripped trailing spaces from line ends',
        count: trailingCount,
      });
    }
  }

  const charactersRemoved = Math.max(0, text.length - result.length);

  return {
    originalText: text,
    cleanedText: result,
    charactersRemoved,
    changes,
  };
}
