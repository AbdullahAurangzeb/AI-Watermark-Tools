/**
 * Post-build step: fills each route's dist/<route>/index.html with the
 * server-rendered page body, and writes sitemap.xml, robots.txt and llms.txt.
 *
 * Runs after `vite build` (client + route head tags) and
 * `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
 * Crawlers that do not run JavaScript (GPTBot, ClaudeBot, PerplexityBot, ...)
 * then see the full headings, copy, FAQs and links instead of an empty #root.
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { buildLlmsTxt } from '../src/seo/llms';
import { SITEMAP_ENTRIES, SITE_URL, buildRobotsTxt, buildSitemapXml } from '../src/seo/site';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const EMPTY_ROOT = '<div id="root"></div>';

async function main() {
  const entry = path.join(ssrDir, 'entry-server.js');
  if (!fs.existsSync(entry)) {
    throw new Error(`[prerender] Missing ${entry}. Run the SSR build first.`);
  }
  const { render } = (await import(pathToFileURL(entry).href)) as { render: (path: string) => string };

  for (const { path: route } of SITEMAP_ENTRIES) {
    const file =
      route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.replace(/^\//, ''), 'index.html');
    const html = fs.readFileSync(file, 'utf8');
    if (html.split(EMPTY_ROOT).length !== 2) {
      throw new Error(`[prerender] Expected exactly one empty #root in ${file}`);
    }
    fs.writeFileSync(file, html.replace(EMPTY_ROOT, `<div id="root">${render(route)}</div>`));
  }

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemapXml(SITE_URL));
  fs.writeFileSync(path.join(distDir, 'robots.txt'), buildRobotsTxt(SITE_URL));
  fs.writeFileSync(path.join(distDir, 'llms.txt'), buildLlmsTxt());

  fs.rmSync(ssrDir, { recursive: true, force: true });
  console.log(`[prerender] rendered ${SITEMAP_ENTRIES.length} routes; wrote sitemap.xml, robots.txt, llms.txt`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
