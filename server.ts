import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { buildRobotsTxt, buildSitemapXml, getPublicSiteUrl } from './src/seo/site';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// ----------------------------------------------------
// Basic middleware
// ----------------------------------------------------

app.use(express.json({ limit: '5mb' }));

// ----------------------------------------------------
// Health check
// ----------------------------------------------------

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// ----------------------------------------------------
// AI Text Rewriter Status
// ----------------------------------------------------

app.get('/api/rewrite/status', (_req: Request, res: Response) => {
  res.json({
    available: false,
    hasApiKey: false,
    isLimitReached: false,
    isComingSoon: true,
    message: 'AI Rewriting feature is coming soon.',
  });
});

// ----------------------------------------------------
// AI Text Rewriter API
// ----------------------------------------------------

app.post('/api/rewrite', async (_req: Request, res: Response) => {
  return res.json({
    success: false,
    isComingSoon: true,
    error:
      'AI Rewriter is currently in preview and coming soon. All core watermark removal tools remain 100% free and active.',
  });
});

// ----------------------------------------------------
// XML Sitemap
// ----------------------------------------------------

app.get('/sitemap.xml', (_req: Request, res: Response) => {
  const host = getPublicSiteUrl(process.env.APP_URL);
  const today = new Date().toISOString().split('T')[0];

  res.status(200);
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.send(buildSitemapXml(host, today));
});

// ----------------------------------------------------
// Robots.txt
// ----------------------------------------------------

app.get('/robots.txt', (_req: Request, res: Response) => {
  const host = getPublicSiteUrl(process.env.APP_URL);

  res.status(200);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(buildRobotsTxt(host));
});

// ----------------------------------------------------
// Server startup
// ----------------------------------------------------

async function start() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // ------------------------------------------------
    // Development
    // ------------------------------------------------

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // ------------------------------------------------
    // Production
    // ------------------------------------------------

    const distPath = path.resolve(process.cwd(), 'dist');
    const indexPath = path.join(distPath, 'index.html');

    console.log(`[Production] Serving static files from: ${distPath}`);
    console.log(`[Production] SPA entry point: ${indexPath}`);

    // Serve assets, CSS, JS, images, etc.
    app.use(
      express.static(distPath, {
        index: false,
        redirect: false,
      })
    );

    // ------------------------------------------------
    // SPA FALLBACK
    //
    // IMPORTANT:
    // This sends index.html for React routes such as:
    //
    // /claude-ai-text-watermark-remover
    // /chatgpt-ai-text-watermark-remover
    // /blog
    // /blog/some-post
    // /about
    // etc.
    // ------------------------------------------------

    app.use((req: Request, res: Response, next: NextFunction) => {
      // Never send index.html for API requests
      if (req.path.startsWith('/api/')) {
        return next();
      }

      // These are handled explicitly above
      if (
        req.path === '/sitemap.xml' ||
        req.path === '/robots.txt'
      ) {
        return next();
      }

      // Only handle GET/HEAD browser navigation requests
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        return next();
      }

      res.sendFile(indexPath, (error) => {
        if (error) {
          console.error(
            `[SPA Fallback] Failed to serve index.html for ${req.path}`,
            error
          );

          if (!res.headersSent) {
            res.status(500).send('Application failed to load.');
          }
        }
      });
    });
  }

  // ----------------------------------------------------
  // 404 handler
  // ----------------------------------------------------

  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: 'Not Found',
      path: req.path,
    });
  });

  // ----------------------------------------------------
  // Start server
  // ----------------------------------------------------

  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `AI Watermark Tools server listening on http://0.0.0.0:${PORT}`
    );
  });
}

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});