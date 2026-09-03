import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { AppLayout } from './components/layout/AppLayout';

import { HomePage } from './pages/HomePage';
import { MarketsPage } from './pages/MarketsPage';
import { MarketDetailPage } from './pages/MarketDetailPage';
import { TrendingPage } from './pages/TrendingPage';
import { ActivityPage } from './pages/ActivityPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { SocialPage } from './pages/SocialPage';
import { GroupsPage } from './pages/GroupsPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { WalletPage } from './pages/WalletPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  const renderRoute = () => {
    if (currentPath === '/' || currentPath === '/home') {
      return <HomePage />;
    }
    if (currentPath === '/markets') {
      return <MarketsPage />;
    }
    if (currentPath.startsWith('/markets/')) {
      return <MarketDetailPage />;
    }
    if (currentPath === '/trending') {
      return <TrendingPage />;
    }
    if (currentPath === '/activity') {
      return <ActivityPage />;
    }
    if (currentPath === '/leaderboard') {
      return <LeaderboardPage />;
    }
    if (currentPath === '/social') {
      return <SocialPage />;
    }
    if (currentPath === '/groups') {
      return <GroupsPage />;
    }
    if (currentPath === '/portfolio') {
      return <PortfolioPage />;
    }
    if (currentPath === '/wallet') {
      return <WalletPage />;
    }
    if (currentPath === '/settings') {
      return <SettingsPage />;
    }
    return <HomePage />;
  };

  return <AppLayout>{renderRoute()}</AppLayout>;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
