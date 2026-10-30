import { PageMetadata } from './metadata';
import { SITE_NAME } from './site';

/**
 * Build-time renderer for the SEO <head> block.
 *
 * The same PageMetadata that applyDocumentSeo() writes into the live DOM is
 * serialized here into static HTML, so each route's initial HTML response
 * already carries its own title, description, canonical, Open Graph, Twitter,
 * and JSON-LD before JavaScript runs. Element shapes match what
 * applyDocumentSeo() looks up, so the client updates these tags in place
 * instead of duplicating them.
 */

export const SEO_BLOCK_START = '<!-- SEO:START -->';
export const SEO_BLOCK_END = '<!-- SEO:END -->';
export const JSON_LD_SCRIPT_ID = 'page-json-ld';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeJsonForScript(json: string): string {
  return json.replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

export function renderSeoHead(meta: PageMetadata, indent = '    '): string {
  const lines: string[] = [];
  const name = (key: string, content: string) =>
    lines.push(`<meta name="${key}" content="${escapeHtml(content)}" />`);
  const property = (key: string, content: string) =>
    lines.push(`<meta property="${key}" content="${escapeHtml(content)}" />`);

  lines.push(`<title>${escapeHtml(meta.title)}</title>`);
  name('description', meta.description);
  name('robots', meta.robots);
  lines.push(`<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`);

  property('og:title', meta.ogTitle);
  property('og:description', meta.ogDescription);
  property('og:type', meta.ogType);
  property('og:url', meta.ogUrl);
  property('og:site_name', meta.ogSiteName || SITE_NAME);
  if (meta.ogImage) {
    property('og:image', meta.ogImage);
    property('og:image:type', meta.ogImageType || 'image/jpeg');
    if (meta.ogImageWidth && meta.ogImageHeight) {
      property('og:image:width', String(meta.ogImageWidth));
      property('og:image:height', String(meta.ogImageHeight));
    }
    property('og:image:alt', meta.ogImageAlt || `${SITE_NAME} logo`);
  }

  name('twitter:card', meta.twitterCard);
  name('twitter:title', meta.twitterTitle);
  name('twitter:description', meta.twitterDescription);
  if (meta.twitterImage) {
    name('twitter:image', meta.twitterImage);
    name('twitter:image:alt', meta.ogImageAlt || `${SITE_NAME} logo`);
  }

  if (meta.structuredData && meta.structuredData.length > 0) {
    const data = meta.structuredData;
    const payload =
      data.length === 1
        ? { '@context': 'https://schema.org', ...data[0] }
        : { '@context': 'https://schema.org', '@graph': data };
    lines.push(
      `<script id="${JSON_LD_SCRIPT_ID}" type="application/ld+json">${escapeJsonForScript(
        JSON.stringify(payload)
      )}</script>`
    );
  }

  return [SEO_BLOCK_START, ...lines, SEO_BLOCK_END].map((line) => `${indent}${line}`).join('\n').trimStart();
}

/** Replace the marked SEO block inside an HTML document. Throws if markers are missing. */
export function injectSeoHead(html: string, meta: PageMetadata): string {
  const start = html.indexOf(SEO_BLOCK_START);
  const end = html.indexOf(SEO_BLOCK_END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error('SEO block markers not found in index.html');
  }
  return html.slice(0, start) + renderSeoHead(meta) + html.slice(end + SEO_BLOCK_END.length);
}
