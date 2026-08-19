import { TextAnalysis, DetectedCharacter } from '../../types';
import { UNICODE_ARTIFACT_MAP } from './unicode';

/**
 * Deterministic text analyzer.
 * Scans text codepoint by codepoint without modifying or altering the original string.
 */
export function analyzeText(text: string): TextAnalysis {
  if (!text || text.length === 0) {
    return {
      characterCount: 0,
      wordCount: 0,
      lineCount: 0,
      readingTimeMinutes: 0,
      invisibleCharacterCount: 0,
      whitespaceIssueCount: 0,
      artifactCount: 0,
      detectedCharacters: [],
      hasIssues: false,
    };
  }

  const characterCount = text.length;
  const lines = text.split(/\r\n|\r|\n/);
  const lineCount = lines.length;
  
  // Calculate word count accurately handling Unicode word boundaries
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  let invisibleCharacterCount = 0;
  let whitespaceIssueCount = 0;
  let artifactCount = 0;

  const detectedMap = new Map<number, { definition: any; positions: number[]; count: number }>();

  // Codepoint iteration
  for (let i = 0; i < text.length; i++) {
    const codePoint = text.codePointAt(i);
    if (!codePoint) continue;

    const artifactDef = UNICODE_ARTIFACT_MAP.get(codePoint);

    if (artifactDef) {
      if (artifactDef.category === 'invisible') {
        invisibleCharacterCount++;
      } else if (artifactDef.category === 'whitespace') {
        whitespaceIssueCount++;
      } else {
        artifactCount++;
      }

      const existing = detectedMap.get(codePoint);
      if (existing) {
        existing.count++;
        existing.positions.push(i);
      } else {
        detectedMap.set(codePoint, {
          definition: artifactDef,
          positions: [i],
          count: 1,
        });
      }
    }

    // Check for high-surrogate codepoints taking 2 UTF-16 units
    if (codePoint > 0xffff) {
      i++; // Skip the surrogate pair trail
    }
  }

  // Detect consecutive space clusters (3 or more spaces in a row)
  const consecutiveSpaceMatches = text.match(/[ ]{3,}/g);
  if (consecutiveSpaceMatches) {
    whitespaceIssueCount += consecutiveSpaceMatches.length;
  }

  // Detect orphaned markdown remnants (e.g. trailing unclosed ``` or unmatched formatting)
  const codeBlockMatch = text.match(/```/g);
  if (codeBlockMatch && codeBlockMatch.length % 2 !== 0) {
    artifactCount += 1;
  }

  const detectedCharacters: DetectedCharacter[] = Array.from(detectedMap.values()).map(
    ({ definition, positions, count }) => ({
      codePoint: definition.hex,
      name: definition.name,
      category: definition.category,
      count,
      positions,
    })
  );

  const totalIssues = invisibleCharacterCount + whitespaceIssueCount + artifactCount;

  return {
    characterCount,
    wordCount,
    lineCount,
    readingTimeMinutes,
    invisibleCharacterCount,
    whitespaceIssueCount,
    artifactCount,
    detectedCharacters,
    hasIssues: totalIssues > 0,
  };
}
