import React from 'react';
import { Home, BarChart3, Flame, MessageSquare, Users, Briefcase } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const MobileTabBar: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  const isHome = currentPath === '/' || currentPath === '/home';
  const isMarkets = currentPath.startsWith('/markets');
  const isTrending = currentPath.startsWith('/trending');
  const isSocial = currentPath.startsWith('/social');
  const isGroups = currentPath.startsWith('/groups');
  const isPortfolio = currentPath.startsWith('/portfolio');

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-omx-border bg-omx-bg/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile Navigation"
    >
      <div className="flex h-14 items-center justify-around px-2">
        {/* Home Tab */}
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer ${
            isHome ? 'text-[#f23064] font-semibold' : 'text-omx-text-secondary'
          }`}
        >
          <Home className="h-4 w-4" />
          <span className="text-xs mt-1">Home</span>
        </button>

        {/* Markets Tab */}
        <button
          onClick={() => navigate('/markets')}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer ${
            isMarkets ? 'text-[#f23064] font-semibold' : 'text-omx-text-secondary'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span className="text-xs mt-1">Markets</span>
        </button>

        {/* Trending Tab */}
        <button
          onClick={() => navigate('/trending')}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer ${
            isTrending ? 'text-[#f23064] font-semibold' : 'text-omx-text-secondary'
          }`}
        >
          <Flame className="h-4 w-4" />
          <span className="text-xs mt-1">Trending</span>
        </button>

        {/* Social Tab */}
        <button
          onClick={() => navigate('/social')}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer ${
            isSocial ? 'text-[#f23064] font-semibold' : 'text-omx-text-secondary'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span className="text-xs mt-1">Social</span>
        </button>

        {/* Groups Tab */}
        <button
          onClick={() => navigate('/groups')}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer ${
            isGroups ? 'text-[#f23064] font-semibold' : 'text-omx-text-secondary'
          }`}
        >
          <Users className="h-4 w-4" />
          <span className="text-xs mt-1">Groups</span>
        </button>

        {/* Portfolio Tab */}
        <button
          onClick={() => navigate('/portfolio')}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer ${
            isPortfolio ? 'text-[#f23064] font-semibold' : 'text-omx-text-secondary'
          }`}
        >
          <Briefcase className="h-4 w-4" />
          <span className="text-xs mt-1">Portfolio</span>
        </button>
      </div>
    </nav>
  );
};
