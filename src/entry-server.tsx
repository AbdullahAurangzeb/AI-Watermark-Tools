import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import App from './App.tsx';

/**
 * Build-time entry: renders a route's full page body to HTML so crawlers that
 * do not execute JavaScript (most AI answer engines) still see the content.
 * Bundled by `vite build --ssr` and consumed by scripts/prerender.ts.
 */
export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>
  );
}
