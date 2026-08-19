import { useEffect } from 'react';
import { useRouter } from '../../router/RouterContext';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  schema?: Record<string, any>;
}

export function SEOHead({
  title = 'AI Watermark Tools – Free AI Text Watermark Remover & Cleaner',
  description = 'Free online AI text watermark remover and cleaner. Detect invisible Unicode characters, formatting artifacts, zero-width spaces, and clean AI-generated text locally in browser.',
  canonical,
  schema,
}: SEOProps) {
  const { currentPath } = useRouter();

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical || window.location.origin + currentPath);

    // Add / update JSON-LD Schema
    const existingSchema = document.getElementById('page-json-ld');
    if (existingSchema) {
      existingSchema.remove();
    }

    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'AI Watermark Tools',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description: description,
    };

    const script = document.createElement('script');
    script.id = 'page-json-ld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema || defaultSchema);
    document.head.appendChild(script);
  }, [title, description, canonical, schema, currentPath]);

  return null;
}
