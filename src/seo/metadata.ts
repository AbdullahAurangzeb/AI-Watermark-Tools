import { BLOG_POSTS } from '../data/blogData';
import { HOME_FAQS } from '../data/homeFaqs';
import { TOOL_CONFIGS } from '../data/toolConfigs';
import { BlogPost, FAQItem, ToolConfig } from '../types';
import {
  DEFAULT_ROBOTS,
  NOINDEX_ROBOTS,
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_TWITTER_CARD,
  SITE_URL,
  canonicalUrl,
  normalizeSeoPath,
} from './site';

export type OgType = 'website' | 'article';

export type JsonLd = Record<string, unknown>;

export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogType: OgType;
  ogUrl: string;
  ogSiteName: string;
  ogImage?: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage?: string;
  robots: string;
  structuredData?: JsonLd[];
  breadcrumbs: { name: string; path: string }[];
}

interface PageSeoConfig {
  title: string;
  description: string;
  ogType?: OgType;
  breadcrumbName: string;
}

const PAGE_SEO: Record<string, PageSeoConfig> = {
  '/': {
    title: 'AI Watermark Tools – Free AI Text Cleaner & Watermark Remover',
    description:
      'Free online AI text cleaner and watermark remover. Clean invisible characters, Unicode artifacts, zero-width spaces, and unwanted formatting from AI-generated text.',
    breadcrumbName: 'Home',
  },
  '/chatgpt-ai-text-watermark-remover': {
    title: 'ChatGPT Watermark Remover – Clean ChatGPT Text Online',
    description:
      'Free ChatGPT text cleaner. Inspect copied ChatGPT text for invisible characters, zero-width spaces, and formatting artifacts, then clean it in your browser.',
    breadcrumbName: 'ChatGPT AI Text Watermark Remover',
  },
  '/claude-ai-text-watermark-remover': {
    title: 'Claude AI Text Cleaner – Remove Hidden Text Artifacts',
    description:
      'Clean Claude-generated text by detecting and removing invisible characters, unusual whitespace, formatting artifacts, and other text artifacts online.',
    breadcrumbName: 'Claude AI Text Watermark Remover',
  },
  '/ai-text-watermark-remover': {
    title: 'AI Text Watermark Remover – Clean AI-Generated Text',
    description:
      'Analyze and clean AI-generated text by removing invisible Unicode characters, zero-width spaces, unwanted formatting, and other detectable text artifacts.',
    breadcrumbName: 'AI Text Watermark Remover',
  },
  '/ai-text-cleaner': {
    title: 'AI Text Cleaner – Clean AI-Generated Text Online',
    description:
      'Clean AI-generated text online by removing hidden Unicode characters, zero-width spaces, unwanted whitespace, and formatting artifacts.',
    breadcrumbName: 'AI Text Cleaner',
  },
  '/invisible-character-remover': {
    title: 'Invisible Character Remover – Clean Hidden Unicode Text',
    description:
      'Remove invisible characters, zero-width spaces, hidden Unicode characters, non-breaking spaces, and other unwanted text artifacts with this free online cleaner.',
    breadcrumbName: 'Invisible Character Remover',
  },
  '/blog': {
    title: 'AI Text & Unicode Guides – AI Watermark Tools Blog',
    description:
      'Guides about AI-generated text, invisible Unicode characters, text cleaning, formatting artifacts, ChatGPT, Claude, and safe AI text editing.',
    breadcrumbName: 'Blog',
  },
  '/about': {
    title: 'About AI Watermark Tools',
    description:
      'Learn about AI Watermark Tools and our approach to free, browser-based text analysis, Unicode cleaning, and AI-generated text utilities.',
    breadcrumbName: 'About',
  },
  '/contact': {
    title: 'Contact AI Watermark Tools',
    description:
      'Contact AI Watermark Tools with questions, feedback, suggestions, or issues related to our online AI text cleaning and analysis tools.',
    breadcrumbName: 'Contact',
  },
  '/privacy': {
    title: 'Privacy Policy – AI Watermark Tools',
    description:
      'Read the AI Watermark Tools privacy policy and learn how website visits, analytics, and information submitted through the website are handled.',
    breadcrumbName: 'Privacy Policy',
  },
  '/terms': {
    title: 'Terms of Service – AI Watermark Tools',
    description:
      'Read the terms and conditions governing the use of AI Watermark Tools and its online text cleaning and analysis services.',
    breadcrumbName: 'Terms of Service',
  },
  '/disclaimer': {
    title: 'Disclaimer – AI Watermark Tools',
    description:
      'Read the AI Watermark Tools disclaimer covering tool functionality, text analysis, accuracy, limitations, and responsible use.',
    breadcrumbName: 'Disclaimer',
  },
};

const BLOG_SEO: Record<string, PageSeoConfig> = {
  'does-chatgpt-watermark-text': {
    title: 'Does ChatGPT Watermark Text? What You Should Know',
    description:
      'Does ChatGPT watermark text? Learn about claims surrounding AI text watermarks, hidden characters, formatting artifacts, and how to inspect ChatGPT-generated text.',
    ogType: 'article',
    breadcrumbName: 'Does ChatGPT Watermark Text?',
  },
  'does-claude-watermark-text': {
    title: 'Does Claude Watermark Text? What We Know',
    description:
      'Learn whether Claude adds watermarks or detectable text artifacts and how invisible characters, Unicode, and formatting can affect AI-generated text.',
    ogType: 'article',
    breadcrumbName: 'Does Claude Watermark Text?',
  },
  'what-are-invisible-unicode-characters': {
    title: 'What Are Invisible Unicode Characters? Complete Guide',
    description:
      'Learn what invisible Unicode characters are, including zero-width spaces and other hidden characters, why they appear, and how to identify and clean them.',
    ogType: 'article',
    breadcrumbName: 'What Are Invisible Unicode Characters?',
  },
  'ai-text-formatting-artifacts-explained': {
    title: 'AI Text Formatting Artifacts Explained',
    description:
      'Learn how formatting artifacts, unusual whitespace, hidden characters, and Unicode characters can appear in AI-generated text and how to clean them.',
    ogType: 'article',
    breadcrumbName: 'AI Text Formatting Artifacts Explained',
  },
  'unicode-normalization-forms-nfc-nfd-explained': {
    title: 'Unicode Normalization Explained: NFC vs NFD',
    description:
      'Learn how Unicode normalization works, including NFC and NFD, why normalization matters for text processing, and how Unicode characters can affect copied text.',
    ogType: 'article',
    breadcrumbName: 'Unicode Normalization Explained',
  },
  'complete-guide-to-safe-ai-text-editing': {
    title: 'Complete Guide to Safe AI Text Editing',
    description:
      'Learn how to inspect, clean, normalize, and edit AI-generated text while preserving its meaning, formatting, Unicode characters, and important content.',
    ogType: 'article',
    breadcrumbName: 'Complete Guide to Safe AI Text Editing',
  },
  'how-to-clean-chatgpt-text': {
    title: 'How to Clean ChatGPT Text: Hidden Characters & Artifacts',
    description:
      'Learn how to clean copied ChatGPT text: inspect invisible Unicode characters, zero-width spaces, unusual whitespace, and formatting artifacts without rewriting the words.',
    ogType: 'article',
    breadcrumbName: 'How to Clean ChatGPT Text',
  },
  'how-to-remove-invisible-characters': {
    title: 'How to Remove Invisible Characters From Text',
    description:
      'Learn what invisible Unicode characters are, why they appear in copied text, and how to detect and remove zero-width spaces, NBSP, and BOM without damaging useful text.',
    ogType: 'article',
    breadcrumbName: 'How to Remove Invisible Characters',
  },
  'zero-width-space-u200b-explained': {
    title: 'Zero Width Space (U+200B): What It Is and How to Remove It',
    description:
      'What U+200B (ZERO WIDTH SPACE) is, why it is invisible, when it is useful, when copied text picks it up accidentally, and how to detect and remove it.',
    ogType: 'article',
    breadcrumbName: 'Zero Width Space (U+200B)',
  },
  'how-to-detect-hidden-unicode-characters': {
    title: 'How to Detect Hidden Unicode Characters in Text',
    description:
      'How to inspect text for hidden Unicode characters, zero-width spaces, and unusual whitespace that copy and paste can preserve, with practical detection checks.',
    ogType: 'article',
    breadcrumbName: 'How to Detect Hidden Unicode Characters',
  },
  'how-to-clean-ai-generated-text': {
    title: 'How to Clean AI-Generated Text Without Changing Meaning',
    description:
      'Clean AI-generated text without rewriting it: remove invisible characters, Unicode leftovers, and formatting artifacts while preserving the original wording.',
    ogType: 'article',
    breadcrumbName: 'How to Clean AI-Generated Text',
  },
};

function organizationLd(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: SITE_LOGO_URL,
    },
  };
}

function websiteLd(description: string): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

function softwareApplicationLd(name: string, description: string, url: string): JsonLd {
  return {
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    url,
    description,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

function faqPageLd(faqs: FAQItem[]): JsonLd {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function breadcrumbLd(items: { name: string; path: string }[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

function webPageLd(name: string, description: string, url: string): JsonLd {
  return {
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
}

function blogPostingLd(post: BlogPost, url: string, seoDescription: string): JsonLd {
  return {
    '@type': 'BlogPosting',
    headline: post.title,
    description: seoDescription,
    url,
    datePublished: post.publishedDate,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

function resolveToolConfig(path: string): ToolConfig | undefined {
  return Object.values(TOOL_CONFIGS).find((tool) => tool.route === path);
}

function withDefaults(
  path: string,
  config: PageSeoConfig,
  structuredData: JsonLd[],
  breadcrumbs: { name: string; path: string }[]
): PageMetadata {
  const canonical = canonicalUrl(path);
  const ogType = config.ogType ?? 'website';

  return {
    title: config.title,
    description: config.description,
    canonical,
    ogTitle: config.title,
    ogDescription: config.description,
    ogType,
    ogUrl: canonical,
    ogSiteName: SITE_NAME,
    ogImage: SITE_LOGO_URL,
    twitterCard: SITE_TWITTER_CARD,
    twitterTitle: config.title,
    twitterDescription: config.description,
    twitterImage: SITE_LOGO_URL,
    robots: DEFAULT_ROBOTS,
    structuredData,
    breadcrumbs,
  };
}

function notFoundMetadata(path: string): PageMetadata {
  const canonical = canonicalUrl(path);
  return {
    title: 'Page Not Found – AI Watermark Tools',
    description: 'The requested page could not be found on AI Watermark Tools.',
    canonical,
    ogTitle: 'Page Not Found – AI Watermark Tools',
    ogDescription: 'The requested page could not be found on AI Watermark Tools.',
    ogType: 'website',
    ogUrl: canonical,
    ogSiteName: SITE_NAME,
    ogImage: SITE_LOGO_URL,
    twitterCard: SITE_TWITTER_CARD,
    twitterTitle: 'Page Not Found – AI Watermark Tools',
    twitterDescription: 'The requested page could not be found on AI Watermark Tools.',
    twitterImage: SITE_LOGO_URL,
    robots: NOINDEX_ROBOTS,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Page Not Found', path },
    ],
  };
}

function structuredDataForPath(
  path: string,
  config: PageSeoConfig,
  breadcrumbs: { name: string; path: string }[]
): JsonLd[] {
  const url = canonicalUrl(path);

  if (path === '/') {
    return [
      organizationLd(),
      websiteLd(config.description),
      softwareApplicationLd(SITE_NAME, config.description, url),
      faqPageLd(HOME_FAQS),
    ];
  }

  const tool = resolveToolConfig(path);
  if (tool) {
    return [
      organizationLd(),
      softwareApplicationLd(tool.name, config.description, url),
      faqPageLd(tool.faqs),
      breadcrumbLd(breadcrumbs),
    ];
  }

  if (path === '/blog') {
    return [
      organizationLd(),
      {
        '@type': 'Blog',
        name: 'AI Text & Unicode Guides',
        description: config.description,
        url,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      breadcrumbLd(breadcrumbs),
    ];
  }

  return [organizationLd(), webPageLd(config.breadcrumbName, config.description, url), breadcrumbLd(breadcrumbs)];
}

export function getMetadataForPath(path: string): PageMetadata {
  const normalized = normalizeSeoPath(path);

  if (normalized.startsWith('/blog/') && normalized !== '/blog') {
    const slug = normalized.slice('/blog/'.length);
    const seo = BLOG_SEO[slug];
    const post = BLOG_POSTS.find((item) => item.slug === slug);

    if (!seo || !post) {
      return notFoundMetadata(normalized);
    }

    const url = canonicalUrl(normalized);
    const breadcrumbs = [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: seo.breadcrumbName, path: normalized },
    ];
    const structured: JsonLd[] = [
      organizationLd(),
      blogPostingLd(post, url, seo.description),
      breadcrumbLd(breadcrumbs),
    ];
    if (post.faqs && post.faqs.length > 0) {
      structured.push(faqPageLd(post.faqs));
    }
    return withDefaults(normalized, seo, structured, breadcrumbs);
  }

  const config = PAGE_SEO[normalized];
  if (!config) {
    return notFoundMetadata(normalized);
  }

  const breadcrumbs =
    normalized === '/'
      ? [{ name: 'Home', path: '/' }]
      : [
          { name: 'Home', path: '/' },
          { name: config.breadcrumbName, path: normalized },
        ];

  return withDefaults(normalized, config, structuredDataForPath(normalized, config, breadcrumbs), breadcrumbs);
}

export const DEFAULT_DOCUMENT_METADATA = getMetadataForPath('/');
