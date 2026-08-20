import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

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
  const host =
    process.env.APP_URL || 'https://www.aiwatermarktools.tech';

  const today = new Date().toISOString().split('T')[0];

  const routes = [
    {
      path: '/',
      priority: '1.0',
      changefreq: 'weekly',
    },

    // Main AI Text Tools
    {
      path: '/claude-ai-text-watermark-remover',
      priority: '0.9',
      changefreq: 'weekly',
    },
    {
      path: '/chatgpt-ai-text-watermark-remover',
      priority: '0.9',
      changefreq: 'weekly',
    },
    {
      path: '/ai-text-watermark-remover',
      priority: '0.8',
      changefreq: 'weekly',
    },
    {
      path: '/ai-text-cleaner',
      priority: '0.8',
      changefreq: 'weekly',
    },
    {
      path: '/invisible-character-remover',
      priority: '0.8',
      changefreq: 'weekly',
    },

    // Important Website Pages
    {
      path: '/about',
      priority: '0.5',
      changefreq: 'monthly',
    },
    {
      path: '/contact',
      priority: '0.5',
      changefreq: 'monthly',
    },
    {
      path: '/privacy',
      priority: '0.5',
      changefreq: 'monthly',
    },
    {
      path: '/terms',
      priority: '0.5',
      changefreq: 'monthly',
    },
    {
      path: '/disclaimer',
      priority: '0.5',
      changefreq: 'monthly',
    },

    // Blog
    {
      path: '/blog',
      priority: '0.8',
      changefreq: 'weekly',
    },

    // Blog Posts
    {
      path: '/blog/does-chatgpt-watermark-text',
      priority: '0.7',
      changefreq: 'monthly',
    },
    {
      path: '/blog/does-claude-watermark-text',
      priority: '0.7',
      changefreq: 'monthly',
    },
    {
      path: '/blog/what-are-invisible-unicode-characters',
      priority: '0.7',
      changefreq: 'monthly',
    },
    {
      path: '/blog/ai-text-formatting-artifacts-explained',
      priority: '0.7',
      changefreq: 'monthly',
    },
    {
      path: '/blog/unicode-normalization-forms-nfc-nfd-explained',
      priority: '0.7',
      changefreq: 'monthly',
    },
    {
      path: '/blog/complete-guide-to-safe-ai-text-editing',
      priority: '0.7',
      changefreq: 'monthly',
    },
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${host}${route.path === '/' ? '/' : route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.status(200);
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.send(sitemapXml);
});

// ----------------------------------------------------
// Robots.txt
// ----------------------------------------------------

app.get('/robots.txt', (_req: Request, res: Response) => {
  const host =
    process.env.APP_URL || 'https://www.aiwatermarktools.tech';

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${host}/sitemap.xml
`;

  res.status(200);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(robotsTxt);
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