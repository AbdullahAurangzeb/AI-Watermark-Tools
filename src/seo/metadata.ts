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
      'Clean ChatGPT-generated text by removing invisible characters, unwanted whitespace, formatting artifacts, and detectable Unicode text artifacts with a free online tool.',
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
  structuredData: JsonLd[]
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
  };
}

function structuredDataForPath(path: string, config: PageSeoConfig): JsonLd[] {
  const url = canonicalUrl(path);
  const crumbs = [{ name: 'Home', path: '/' }];

  if (path === '/') {
    return [
      organizationLd(),
      websiteLd(config.description),
      softwareApplicationLd(SITE_NAME, config.description, url),
      faqPageLd(HOME_FAQS),
    ];
  }

  if (path !== '/') {
    crumbs.push({ name: config.breadcrumbName, path });
  }

  const tool = resolveToolConfig(path);
  if (tool) {
    return [
      organizationLd(),
      softwareApplicationLd(tool.name, config.description, url),
      faqPageLd(tool.faqs),
      breadcrumbLd(crumbs),
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
      breadcrumbLd(crumbs),
    ];
  }

  return [organizationLd(), webPageLd(config.breadcrumbName, config.description, url), breadcrumbLd(crumbs)];
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
    return withDefaults(normalized, seo, [
      organizationLd(),
      blogPostingLd(post, url, seo.description),
      breadcrumbLd([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: normalized },
      ]),
    ]);
  }

  const config = PAGE_SEO[normalized];
  if (!config) {
    return notFoundMetadata(normalized);
  }

  return withDefaults(normalized, config, structuredDataForPath(normalized, config));
}

export const DEFAULT_DOCUMENT_METADATA = getMetadataForPath('/');
