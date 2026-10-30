import { getMetadataForPath } from './metadata';
import { SITE_NAME, SITEMAP_ENTRIES, SITE_URL, canonicalUrl } from './site';

/**
 * /llms.txt (https://llmstxt.org): a plain-markdown map of the site for LLMs
 * and AI answer engines. Built from the same metadata as the HTML head and the
 * sitemap, so titles, descriptions and URLs never drift from the live pages.
 */

const TOOL_PATHS = [
  '/ai-text-cleaner',
  '/invisible-character-remover',
  '/chatgpt-ai-text-watermark-remover',
  '/claude-ai-text-watermark-remover',
  '/ai-text-watermark-remover',
];

const INFO_PATHS = ['/about', '/contact', '/privacy', '/terms', '/disclaimer'];

function link(path: string): string {
  const meta = getMetadataForPath(path);
  return `- [${meta.title}](${canonicalUrl(path)}): ${meta.description}`;
}

export function buildLlmsTxt(): string {
  const guidePaths = SITEMAP_ENTRIES.map((entry) => entry.path).filter((path) =>
    path.startsWith('/blog/')
  );

  return `# ${SITE_NAME}

> ${SITE_NAME} (${SITE_URL}/) is a free, browser-based utility that finds and removes invisible Unicode characters, zero-width spaces, non-breaking spaces, byte order marks, and copy-paste formatting artifacts from AI-generated text (ChatGPT, Claude, Gemini and others) without rewriting the wording.

Key facts:

- Free to use, no sign-up. Text is processed in the browser.
- Removes: zero-width space (U+200B), word joiner (U+2060), byte order mark (U+FEFF) and soft hyphen (U+00AD).
- Converts to a normal space: non-breaking space (U+00A0), narrow no-break space (U+202F) and typographic spaces (U+2000–U+200A, U+205F). Collapses runs of spaces and trims trailing spaces; keeps indentation and paragraph breaks.
- Reports but keeps: zero-width joiner (U+200D) and non-joiner (U+200C), bidirectional marks, and ideographic space, because emoji and scripts such as Persian and Urdu rely on them.
- Never rewrites letters, numbers, punctuation, emoji or wording. It works on characters, not writing style, so it does not establish or remove a statistical watermark and does not change how AI detectors score the text.

## Tools

${TOOL_PATHS.map(link).join('\n')}

## Guides

${guidePaths.map(link).join('\n')}

## Optional

${[...INFO_PATHS, '/blog'].map(link).join('\n')}
`;
}
