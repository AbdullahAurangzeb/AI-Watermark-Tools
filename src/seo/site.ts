export const SITE_NAME = 'AI Watermark Tools';
export const SITE_URL = 'https://www.aiwatermarktools.tech';
export const SITE_TWITTER_CARD = 'summary_large_image';
export const DEFAULT_ROBOTS = 'index, follow';
export const NOINDEX_ROBOTS = 'noindex, follow';

/** Production-safe brand image copied into /public. */
export const SITE_LOGO_PATH = '/logo.jpg';
export const SITE_FAVICON_PATH = '/favicon.ico';

export const SITE_LOGO_URL = `${SITE_URL}${SITE_LOGO_PATH}`;

export type SitemapChangefreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export interface SitemapEntry {
  path: string;
  priority: string;
  changefreq: SitemapChangefreq;
}

/**
 * Canonical public routes for sitemap generation.
 * Paths must match production URLs (www + https, no trailing slash except home).
 */
export const SITEMAP_ENTRIES: SitemapEntry[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/claude-ai-text-watermark-remover', priority: '0.9', changefreq: 'weekly' },
  { path: '/chatgpt-ai-text-watermark-remover', priority: '0.9', changefreq: 'weekly' },
  { path: '/ai-text-watermark-remover', priority: '0.8', changefreq: 'weekly' },
  { path: '/ai-text-cleaner', priority: '0.8', changefreq: 'weekly' },
  { path: '/invisible-character-remover', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact', priority: '0.5', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
  { path: '/terms', priority: '0.5', changefreq: 'monthly' },
  { path: '/disclaimer', priority: '0.5', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog/does-chatgpt-watermark-text', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/does-claude-watermark-text', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/what-are-invisible-unicode-characters', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/ai-text-formatting-artifacts-explained', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/unicode-normalization-forms-nfc-nfd-explained', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/complete-guide-to-safe-ai-text-editing', priority: '0.7', changefreq: 'monthly' },
];

export function normalizeSeoPath(pathname: string): string {
  if (!pathname || pathname === '') return '/';

  let clean = pathname;
  if (clean.startsWith('#/')) {
    clean = clean.slice(1);
  } else if (clean.startsWith('#') && clean.length > 1) {
    clean = '/' + clean.slice(1);
  }

  const queryIdx = clean.indexOf('?');
  if (queryIdx !== -1) {
    clean = clean.substring(0, queryIdx);
  }

  const hashIdx = clean.indexOf('#');
  if (hashIdx !== -1) {
    clean = clean.substring(0, hashIdx);
  }

  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }

  return clean || '/';
}

export function canonicalUrl(path: string): string {
  const normalized = normalizeSeoPath(path);
  if (normalized === '/') {
    return `${SITE_URL}/`;
  }
  return `${SITE_URL}${normalized}`;
}

/**
 * Never emit localhost or placeholder APP_URL values in sitemap/robots.
 * Production discovery files always use the canonical www HTTPS host.
 */
export function getPublicSiteUrl(_envUrl?: string): string {
  return SITE_URL;
}

export function buildSitemapXml(host: string = SITE_URL, lastmod?: string): string {
  const origin = host.replace(/\/+$/, '');
  const loc = (path: string) => `${origin}${path === '/' ? '/' : path}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_ENTRIES.map(
    (route) => `  <url>
    <loc>${loc(route.path)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  ).join('\n')}
</urlset>`;
}

export function buildRobotsTxt(host: string = SITE_URL): string {
  const origin = host.replace(/\/+$/, '');
  return `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${origin}/sitemap.xml
`;
}
