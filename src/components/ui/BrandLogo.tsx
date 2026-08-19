import React from 'react';
import appLogo from '@/src/assets/images/website_logo_1787080090142.jpg';
import claudeLogo from '@/src/assets/images/claude_logo_1787079507325.jpg';
import chatgptLogo from '@/src/assets/images/chatgpt_logo_1787079519757.jpg';

// Generated asset paths
export const APP_LOGO_SRC = appLogo;
export const CLAUDE_LOGO_SRC = claudeLogo;
export const CHATGPT_LOGO_SRC = chatgptLogo;

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export function BrandLogo({
  size = 'md',
  showText = true,
  className = '',
}: BrandLogoProps) {
  const sizeClasses = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-9 h-9 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
    xl: 'w-16 h-16 rounded-2xl',
  }[size];

  const textSizeClasses = {
    sm: 'text-sm font-bold',
    md: 'text-base font-bold',
    lg: 'text-xl font-extrabold',
    xl: 'text-2xl font-extrabold',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${sizeClasses} overflow-hidden shadow-xs border border-indigo-100 bg-slate-900 shrink-0 flex items-center justify-center`}>
        <img
          src={APP_LOGO_SRC}
          alt="AI Watermark Tools Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses} tracking-tight text-slate-900 leading-tight`}>
            AI Watermark Tools
          </span>
          <span className="text-[10px] font-semibold text-indigo-600 tracking-wider uppercase">
            Analysis & Cleaner Suite
          </span>
        </div>
      )}
    </div>
  );
}

interface ProviderLogoProps {
  provider: 'claude' | 'chatgpt' | 'general' | 'invisible';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProviderLogo({
  provider,
  size = 'md',
  className = '',
}: ProviderLogoProps) {
  const sizeClasses = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
  }[size];

  if (provider === 'claude') {
    return (
      <div className={`${sizeClasses} overflow-hidden shadow-xs border border-amber-200/80 bg-amber-50 shrink-0 ${className}`}>
        <img
          src={CLAUDE_LOGO_SRC}
          alt="Anthropic Claude AI Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (provider === 'chatgpt') {
    return (
      <div className={`${sizeClasses} overflow-hidden shadow-xs border border-emerald-200/80 bg-emerald-50 shrink-0 ${className}`}>
        <img
          src={CHATGPT_LOGO_SRC}
          alt="OpenAI ChatGPT Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses} overflow-hidden shadow-xs border border-indigo-200/80 bg-indigo-50 shrink-0 ${className}`}>
      <img
        src={APP_LOGO_SRC}
        alt="AI Text Watermark Remover Logo"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
