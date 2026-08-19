import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '5mb' }));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Text Rewriter Status / Availability Endpoint
app.get('/api/rewrite/status', (req: Request, res: Response) => {
  res.json({
    available: false,
    hasApiKey: false,
    isLimitReached: false,
    isComingSoon: true,
    message: 'AI Rewriting feature is coming soon.',
  });
});

// AI Text Rewriter API Endpoint
app.post('/api/rewrite', async (req: Request, res: Response) => {
  return res.json({
    success: false,
    isComingSoon: true,
    error: 'AI Rewriter is currently in preview and coming soon. All core watermark removal tools remain 100% free and active.',
  });
});

// Dynamic XML Sitemap
app.get('/sitemap.xml', (req: Request, res: Response) => {
  const host = process.env.APP_URL || `http://localhost:${PORT}`;
  const today = new Date().toISOString().split('T')[0];

  const routes = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
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
    { path: '/blog', priority: '0.8', changefreq: 'daily' },
    { path: '/blog/does-chatgpt-watermark-text', priority: '0.7', changefreq: 'monthly' },
    { path: '/blog/does-claude-watermark-text', priority: '0.7', changefreq: 'monthly' },
    { path: '/blog/what-are-invisible-unicode-characters', priority: '0.7', changefreq: 'monthly' },
    { path: '/blog/ai-text-formatting-artifacts-explained', priority: '0.7', changefreq: 'monthly' },
    { path: '/blog/unicode-normalization-forms-nfc-nfd-explained', priority: '0.7', changefreq: 'monthly' },
    { path: '/blog/complete-guide-to-safe-ai-text-editing', priority: '0.7', changefreq: 'monthly' },
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${host}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.send(sitemapXml);
});

// Dynamic robots.txt
app.get('/robots.txt', (req: Request, res: Response) => {
  const host = process.env.APP_URL || `http://localhost:${PORT}`;
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${host}/sitemap.xml
`;
  res.setHeader('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

// Vite middleware & Static SPA serving
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Watermark Tools server listening on http://0.0.0.0:${PORT}`);
  });
}

start();
