import { useEffect } from 'react';
import { useRouter } from '../../router/RouterContext';
import { applyDocumentSeo } from '../../seo/applyDocumentSeo';
import { getMetadataForPath, PageMetadata } from '../../seo/metadata';

type SEOHeadProps = Partial<Pick<PageMetadata, 'title' | 'description' | 'canonical' | 'robots'>>;

export function SEOHead(overrides: SEOHeadProps = {}) {
  const { currentPath } = useRouter();

  useEffect(() => {
    const meta = {
      ...getMetadataForPath(currentPath),
      ...Object.fromEntries(
        Object.entries(overrides).filter(([, value]) => value !== undefined)
      ),
    } as PageMetadata;

    if (overrides.title) {
      meta.ogTitle = overrides.title;
      meta.twitterTitle = overrides.title;
    }
    if (overrides.description) {
      meta.ogDescription = overrides.description;
      meta.twitterDescription = overrides.description;
    }
    if (overrides.canonical) {
      meta.ogUrl = overrides.canonical;
    }

    applyDocumentSeo(meta);
  }, [currentPath, overrides.title, overrides.description, overrides.canonical, overrides.robots]);

  return null;
}
