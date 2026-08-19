import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (to: string, replace?: boolean) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function normalizePath(pathname: string): string {
  if (!pathname || pathname === '') return '/';
  
  // Strip hash prefix if passed like '#/path' or '#path'
  let clean = pathname;
  if (clean.startsWith('#/')) {
    clean = clean.slice(1);
  } else if (clean.startsWith('#') && clean.length > 1) {
    clean = '/' + clean.slice(1);
  }

  // Strip query parameters
  const queryIdx = clean.indexOf('?');
  if (queryIdx !== -1) {
    clean = clean.substring(0, queryIdx);
  }

  // Remove trailing slash except for root
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  return clean || '/';
}

function getInitialPath(): string {
  if (typeof window !== 'undefined') {
    if (window.location.hash && window.location.hash.length > 1) {
      return normalizePath(window.location.hash);
    }
    return normalizePath(window.location.pathname);
  }
  return '/';
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleLocationChange = () => {
      let path = '/';
      if (window.location.hash && window.location.hash.length > 1) {
        path = normalizePath(window.location.hash);
      } else {
        path = normalizePath(window.location.pathname);
      }
      setCurrentPath(path);
      try {
        window.scrollTo(0, 0);
      } catch {
        // Safe fallback
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Update dynamic route parameters when path changes
  useEffect(() => {
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      setParams({ slug });
    } else {
      setParams({});
    }
  }, [currentPath]);

  const navigate = (to: string, replace = false) => {
    const normalized = normalizePath(to);
    
    // Always update React state first so UI updates immediately
    setCurrentPath(normalized);

    // Try synchronizing with browser history safely
    try {
      if (typeof window !== 'undefined' && window.history) {
        if (replace) {
          window.history.replaceState({}, '', normalized);
        } else {
          window.history.pushState({}, '', normalized);
        }
      }
    } catch {
      // Fallback for sandboxed iframes: update hash
      try {
        window.location.hash = normalized === '/' ? '' : '#' + normalized;
      } catch {
        // Silent catch
      }
    }

    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  key?: React.Key;
  to: string;
  className?: string;
  activeClassName?: string;
  children: ReactNode;
  replace?: boolean;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Link({
  to,
  className = '',
  activeClassName = '',
  children,
  replace = false,
  onClick,
  ...rest
}: LinkProps) {
  const { currentPath, navigate } = useRouter();
  const normalizedTo = normalizePath(to);
  const isActive = currentPath === normalizedTo || (normalizedTo !== '/' && currentPath.startsWith(normalizedTo + '/'));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    // Allow standard browser behavior for new tabs or modifier keys
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || rest.target === '_blank') {
      return;
    }
    e.preventDefault();
    navigate(to, replace);
  };

  const combinedClassName = `${className} ${isActive && activeClassName ? activeClassName : ''}`.trim();

  return (
    <a
      href={to}
      onClick={handleClick}
      className={combinedClassName}
      aria-current={isActive ? 'page' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
