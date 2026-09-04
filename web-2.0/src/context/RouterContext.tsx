import React, { createContext, useContext, useEffect, useState } from 'react';

export interface PendingReturn {
  route: string;
  action: 'trade' | 'join-group' | 'post' | 'generic';
  actionLabel: string; // "place this prediction" / "join this group"
  tradeState?: {
    marketId: string;
    outcome: string;
    amount: number;
  };
  groupId?: string;
}

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  marketId: string;
  pendingIntent: { marketId: string; outcome: string; amount: number } | null;
  setPendingIntent: (intent: { marketId: string; outcome: string; amount: number } | null) => void;
  pendingReturn: PendingReturn | null;
  setPendingReturn: (r: PendingReturn | null) => void;
  isAuthModalOpen: boolean;
  openAuthModal: (pending?: PendingReturn) => void;
  closeAuthModal: () => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const pathname = window.location.pathname;
    if (pathname) {
      return pathname;
    }
    return '/';
  });

  const [pendingIntent, setPendingIntent] = useState<{ marketId: string; outcome: string; amount: number } | null>(null);
  const [pendingReturn, setPendingReturn] = useState<PendingReturn | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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

  const openAuthModal = (pending?: PendingReturn) => {
    if (pending) {
      setPendingReturn(pending);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Extract marketId if on a market detail route
  let marketId = 'will-gta-vi-release-before-december-2026';
  if (currentPath.startsWith('/markets/')) {
    const id = currentPath.replace('/markets/', '').split('/')[0];
    if (id) marketId = id;
  }

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        navigate,
        marketId,
        pendingIntent,
        setPendingIntent,
        pendingReturn,
        setPendingReturn,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
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
