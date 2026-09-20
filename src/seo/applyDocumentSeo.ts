import { JsonLd, PageMetadata } from './metadata';
import { SITE_NAME } from './site';

const JSON_LD_ID = 'page-json-ld';

function setMetaByAttr(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function setJsonLd(data: JsonLd[] | undefined) {
  const existing = document.getElementById(JSON_LD_ID);
  if (existing) {
    existing.remove();
  }

  if (!data || data.length === 0) {
    return;
  }

  const payload =
    data.length === 1
      ? { '@context': 'https://schema.org', ...data[0] }
      : { '@context': 'https://schema.org', '@graph': data };

  const script = document.createElement('script');
  script.id = JSON_LD_ID;
  script.type = 'application/ld+json';
  script.text = JSON.stringify(payload);
  document.head.appendChild(script);
}

export function applyDocumentSeo(meta: PageMetadata) {
  document.title = meta.title;

  setMetaByAttr('name', 'description', meta.description);
  setMetaByAttr('name', 'robots', meta.robots);

  setCanonical(meta.canonical);

  setMetaByAttr('property', 'og:title', meta.ogTitle);
  setMetaByAttr('property', 'og:description', meta.ogDescription);
  setMetaByAttr('property', 'og:type', meta.ogType);
  setMetaByAttr('property', 'og:url', meta.ogUrl);
  setMetaByAttr('property', 'og:site_name', meta.ogSiteName || SITE_NAME);

  if (meta.ogImage) {
    setMetaByAttr('property', 'og:image', meta.ogImage);
    setMetaByAttr('property', 'og:image:type', 'image/jpeg');
    setMetaByAttr('property', 'og:image:alt', `${SITE_NAME} logo`);
  }

  setMetaByAttr('name', 'twitter:card', meta.twitterCard);
  setMetaByAttr('name', 'twitter:title', meta.twitterTitle);
  setMetaByAttr('name', 'twitter:description', meta.twitterDescription);

  if (meta.twitterImage) {
    setMetaByAttr('name', 'twitter:image', meta.twitterImage);
  }

  setJsonLd(meta.structuredData);
}
