import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { TradeProvider } from './context/TradeContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/layout/Navbar';
import { MobileTabBar } from './components/layout/MobileTabBar';
import { MarketDetailPage } from './pages/MarketDetailPage';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();
  const isMarketDetail = currentPath.startsWith('/markets/');

  return (
    <div className="flex min-h-screen flex-col bg-omx-bg text-omx-text antialiased transition-colors selection:bg-omx-hover selection:text-omx-text">
      <Navbar />
      <MarketDetailPage />
      {/* Refinement 12: Hide global mobile tabs on Market Detail to prioritize sticky trade bar at bottom-0 */}
      {!isMarketDetail && <MobileTabBar />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TradeProvider>
          <RouterProvider>
            <AppContent />
          </RouterProvider>
        </TradeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
