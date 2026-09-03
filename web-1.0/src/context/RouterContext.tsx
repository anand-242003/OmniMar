import React, { createContext, useContext, useEffect, useState } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  marketId?: string;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      return p === '/' ? '/home' : p;
    }
    return '/home';
  });

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      const resolved = path === '/' ? '/home' : path;
      if (window.location.pathname !== resolved) {
        window.history.pushState({}, '', resolved);
      }
      setCurrentPath(resolved);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      setCurrentPath(p === '/' ? '/home' : p);
    };

    window.addEventListener('popstate', handlePopState);

    // Normalize root to /home if needed
    if (window.location.pathname === '/') {
      window.history.replaceState({}, '', '/home');
      setCurrentPath('/home');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Extract marketId if path is /markets/:id
  let marketId: string | undefined;
  if (currentPath.startsWith('/markets/')) {
    const id = currentPath.replace('/markets/', '');
    if (id) {
      marketId = id;
    }
  }

  return (
    <RouterContext.Provider value={{ currentPath, navigate, marketId }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
