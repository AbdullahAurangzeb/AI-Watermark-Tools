import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsentBanner } from './CookieConsentBanner';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  );
}
