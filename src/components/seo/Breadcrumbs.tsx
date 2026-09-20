import React from 'react';
import { Link, useRouter } from '../../router/RouterContext';
import { getMetadataForPath } from '../../seo/metadata';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs() {
  const { currentPath } = useRouter();
  const meta = getMetadataForPath(currentPath);
  const items = meta.breadcrumbs;

  if (!items || items.length < 2) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.path}-${item.name}`} className="flex items-center gap-1 min-w-0">
              {index > 0 && (
                <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" aria-hidden="true" />
              )}
              {isLast ? (
                <span className="text-slate-700 font-medium truncate" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="hover:text-slate-900 transition-colors truncate">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
