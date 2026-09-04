import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { TradeProvider } from './context/TradeContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/layout/Navbar';
import { MobileTabBar } from './components/layout/MobileTabBar';
import { MarketDetailPage } from './pages/MarketDetailPage';
import { MarketsPage } from './pages/MarketsPage';
import { HomePage } from './pages/HomePage';
import { TrendingPage } from './pages/TrendingPage';
import { SocialPage } from './pages/SocialPage';
import { GroupsPage } from './pages/GroupsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { WalletPage } from './pages/WalletPage';
import { ActivityPage } from './pages/ActivityPage';
import { SettingsPage } from './pages/SettingsPage';

import { PersistentModeBar } from './components/layout/PersistentModeBar';
import { AuthModal } from './components/layout/AuthModal';
import { GlobalToast } from './components/layout/GlobalToast';

import { PrivyProvider } from '@privy-io/react-auth';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();
  const isMarketDetail = currentPath.startsWith('/markets/') && currentPath !== '/markets/';
  const isMarkets = currentPath.startsWith('/markets');
  const isTrending = currentPath.startsWith('/trending');
  const isSocial = currentPath.startsWith('/social');
  const isGroups = currentPath.startsWith('/groups');
  const isLeaderboard = currentPath.startsWith('/leaderboard');
  const isPortfolio = currentPath.startsWith('/portfolio');
  const isWallet = currentPath.startsWith('/wallet');
  const isActivity = currentPath.startsWith('/activity');
  const isSettings = currentPath.startsWith('/settings');

  const renderContent = () => {
    if (isMarketDetail) return <MarketDetailPage />;
    if (isMarkets) return <MarketsPage />;
    if (isTrending) return <TrendingPage />;
    if (isSocial) return <SocialPage />;
    if (isGroups) return <GroupsPage />;
    if (isLeaderboard) return <LeaderboardPage />;
    if (isPortfolio) return <PortfolioPage />;
    if (isWallet) return <WalletPage />;
    if (isActivity) return <ActivityPage />;
    if (isSettings) return <SettingsPage />;
    return <HomePage />;
  };

  return (
    <div className="flex min-h-screen flex-col bg-omx-bg text-omx-text antialiased transition-colors selection:bg-omx-hover selection:text-omx-text">
      <PersistentModeBar />
      <Navbar />
      {renderContent()}
      <AuthModal />
      <GlobalToast />
      {/* Hide global mobile tabs on Market Detail to prioritize sticky trade bar */}
      {!isMarketDetail && <MobileTabBar />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID || 'cmtmsyxql01pk0ci6i5im3ubc'}
      config={{
        loginMethods: ['email', 'wallet', 'google', 'apple'],
        appearance: {
          theme: 'light',
          accentColor: '#f23064', // matching primary CTA red/pink
          logo: 'https://omnimarketx.com/logo.png', // Optional placeholder
        },
      }}
    >
      <ThemeProvider>
        <AuthProvider>
          <TradeProvider>
            <RouterProvider>
              <AppContent />
            </RouterProvider>
          </TradeProvider>
        </AuthProvider>
      </ThemeProvider>
    </PrivyProvider>
  );
};

export default App;
