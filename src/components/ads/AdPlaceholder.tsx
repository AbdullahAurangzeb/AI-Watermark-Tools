import React from 'react';

interface AdPlaceholderProps {
  slot?: 'hero-banner' | 'in-content' | 'tool-bottom' | 'sidebar' | 'footer-banner';
  className?: string;
  label?: string;
}

export function AdPlaceholder({
  slot = 'in-content',
  className = '',
  label = 'Advertisement',
}: AdPlaceholderProps) {
  // Height and aspect styles based on standard IAB ad units (leaderboard, banner, rectangle)
  const slotStyles = {
    'hero-banner': 'h-24 md:h-28 max-w-4xl',
    'in-content': 'h-32 md:h-40 max-w-3xl',
    'tool-bottom': 'h-28 md:h-32 max-w-4xl',
    'sidebar': 'h-64 md:h-80 w-full max-w-xs',
    'footer-banner': 'h-24 md:h-28 max-w-4xl',
  }[slot];

  return (
    <div
      id={`ad-slot-${slot}`}
      className={`my-8 mx-auto w-full flex flex-col items-center justify-center ${className}`}
      aria-label="Advertising Space"
    >
      <div className="w-full flex justify-between items-center text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5 px-2">
        <span>{label}</span>
        <span className="text-[10px] text-slate-300 font-normal">Ad Placement Zone</span>
      </div>
      <div
        className={`w-full ${slotStyles} rounded-xl border border-dashed border-slate-200 bg-slate-50/70 flex flex-col items-center justify-center p-4 text-center text-slate-400 transition-colors hover:border-slate-300`}
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
          <svg
            className="w-4 h-4 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="18" height="14" x="3" y="5" rx="2" strokeWidth="1.5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 9h10M7 12h6M7 15h3" />
          </svg>
          <span>Reserved Ad Slot ({slot})</span>
        </div>
        <p className="text-[11px] text-slate-400/80 max-w-md">
          Configured for responsive Google AdSense display unit. Non-intrusive container.
        </p>
      </div>
    </div>
  );
}
