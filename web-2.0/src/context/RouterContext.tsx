import React, { createContext, useContext, useEffect, useState } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  marketId: string;
  pendingIntent: { marketId: string; outcome: 'YES' | 'NO'; amount: number } | null;
  setPendingIntent: (intent: { marketId: string; outcome: 'YES' | 'NO'; amount: number } | null) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/markets/')) {
      return pathname;
    }
    return '/markets/will-gta-vi-release-before-december-2026';
  });

  const [pendingIntent, setPendingIntent] = useState<{ marketId: string; outcome: 'YES' | 'NO'; amount: number } | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Extract marketId if on a market detail route
  let marketId = 'will-gta-vi-release-before-december-2026';
  if (currentPath.startsWith('/markets/')) {
    const id = currentPath.replace('/markets/', '').split('/')[0];
    if (id) marketId = id;
  }

  return (
    <RouterContext.Provider value={{ currentPath, navigate, marketId, pendingIntent, setPendingIntent }}>
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
