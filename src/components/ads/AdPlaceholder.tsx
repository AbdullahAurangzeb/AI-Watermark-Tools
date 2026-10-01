import React from 'react';

interface AdPlaceholderProps {
  slot?: 'hero-banner' | 'in-content' | 'tool-bottom' | 'sidebar' | 'footer-banner';
  className?: string;
  label?: string;
}

/**
 * Reserves page layout for a future Google AdSense unit without rendering
 * visible "Advertisement" placeholder boxes. Until AdSense is approved and
 * real ad units are wired in here, this renders nothing: a site showing
 * empty dashed "ad slot" placeholders on every page reads as unfinished to
 * both visitors and reviewers. Swap the null return for the actual
 * <ins class="adsbygoogle"> unit once approved, keyed by `slot`.
 */
export function AdPlaceholder(_props: AdPlaceholderProps) {
  return null;
}
