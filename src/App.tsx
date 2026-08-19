/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from './router/RouterContext';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { ClaudeToolPage } from './pages/ClaudeToolPage';
import { ChatGPTToolPage } from './pages/ChatGPTToolPage';
import { GeneralToolPage } from './pages/GeneralToolPage';
import { CleanerToolPage } from './pages/CleanerToolPage';
import { InvisibleCharToolPage } from './pages/InvisibleCharToolPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { Button } from './components/ui/Button';
import { Link } from './router/RouterContext';
import { ArrowLeft, Home } from 'lucide-react';

function PageRouter() {
  const { currentPath } = useRouter();

  if (currentPath === '/') {
    return <HomePage />;
  }
  if (currentPath === '/claude-ai-text-watermark-remover') {
    return <ClaudeToolPage />;
  }
  if (currentPath === '/chatgpt-ai-text-watermark-remover') {
    return <ChatGPTToolPage />;
  }
  if (currentPath === '/ai-text-watermark-remover') {
    return <GeneralToolPage />;
  }
  if (currentPath === '/ai-text-cleaner') {
    return <CleanerToolPage />;
  }
  if (currentPath === '/invisible-character-remover') {
    return <InvisibleCharToolPage />;
  }
  if (currentPath === '/about') {
    return <AboutPage />;
  }
  if (currentPath === '/contact') {
    return <ContactPage />;
  }
  if (currentPath === '/privacy') {
    return <PrivacyPage />;
  }
  if (currentPath === '/terms') {
    return <TermsPage />;
  }
  if (currentPath === '/disclaimer') {
    return <DisclaimerPage />;
  }
  if (currentPath === '/blog') {
    return <BlogIndexPage />;
  }
  if (currentPath.startsWith('/blog/')) {
    return <BlogPostPage />;
  }

  // 404 Fallback
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-extrabold text-2xl mb-4">
        404
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h1>
      <p className="text-slate-500 max-w-sm mb-6">
        The requested URL was not found on this server. Explore our free text cleaning utilities.
      </p>
      <Button to="/" variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
        Back to Home
      </Button>
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppLayout>
        <PageRouter />
      </AppLayout>
    </RouterProvider>
  );
}
