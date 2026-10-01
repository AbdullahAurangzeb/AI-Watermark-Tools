import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {getMetadataForPath} from './src/seo/metadata';
import {injectSeoHead} from './src/seo/renderHead';
import {SITEMAP_ENTRIES} from './src/seo/site';

/**
 * Writes route-specific SEO tags into the HTML that is served before JavaScript runs.
 *
 * - index.html (homepage) gets its head block generated from src/seo/metadata.ts.
 * - After the build, every other public route in SITEMAP_ENTRIES gets its own
 *   dist/<route>/index.html: the same app shell, with that route's title,
 *   description, canonical, Open Graph/Twitter tags, and JSON-LD.
 *
 * The React app, routing, and GA4 snippet are unchanged; on the client,
 * applyDocumentSeo() keeps updating these same tags during navigation.
 */
function seoHeadPlugin(): Plugin {
  let outDir = 'dist';
  let root = process.cwd();

  return {
    name: 'seo-head-prerender',
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return injectSeoHead(html, getMetadataForPath('/'));
      },
    },
    closeBundle() {
      const shellPath = path.join(outDir, 'index.html');
      if (!fs.existsSync(shellPath)) return;
      const shell = fs.readFileSync(shellPath, 'utf8');

      let written = 0;
      for (const entry of SITEMAP_ENTRIES) {
        if (entry.path === '/') continue;
        const meta = getMetadataForPath(entry.path);
        if (meta.robots.startsWith('noindex')) {
          throw new Error(`[seo-head-prerender] Sitemap route has no metadata: ${entry.path}`);
        }
        const target = path.join(outDir, entry.path.replace(/^\//, ''), 'index.html');
        fs.mkdirSync(path.dirname(target), {recursive: true});
        fs.writeFileSync(target, injectSeoHead(shell, meta));
        written++;
      }
      console.log(`[seo-head-prerender] wrote route HTML for ${written} routes (root: ${path.relative(process.cwd(), root) || '.'})`);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), seoHeadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify; file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
