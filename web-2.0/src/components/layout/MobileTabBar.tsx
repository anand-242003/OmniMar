import React from 'react';
import { BarChart3, MessageSquare, Users, Briefcase } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const MobileTabBar: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  const isMarkets = currentPath.startsWith('/markets');

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-omx-border bg-omx-bg/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile Navigation"
    >
      <div className="flex h-14 items-center justify-around px-2">
        {/* Markets Tab */}
        <button
          onClick={() => navigate('/markets/will-gta-vi-release-before-december-2026')}
          className={`flex flex-col items-center justify-center flex-1 py-1 ${
            isMarkets ? 'text-[#f23064] font-semibold' : 'text-omx-text-secondary'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span className="text-[11px] mt-1">Markets</span>
        </button>

        {/* Social Tab */}
        <button
          onClick={() => alert('Social feed available in Slice 2')}
          className="flex flex-col items-center justify-center flex-1 py-1 text-omx-text-secondary"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="text-[11px] mt-1">Social</span>
        </button>

        {/* Groups Tab */}
        <button
          onClick={() => alert('Groups available in Slice 2')}
          className="flex flex-col items-center justify-center flex-1 py-1 text-omx-text-secondary"
        >
          <Users className="h-4 w-4" />
          <span className="text-[11px] mt-1">Groups</span>
        </button>

        {/* Portfolio Tab */}
        <button
          onClick={() => alert('Portfolio available in Slice 2')}
          className="flex flex-col items-center justify-center flex-1 py-1 text-omx-text-secondary"
        >
          <Briefcase className="h-4 w-4" />
          <span className="text-[11px] mt-1">Portfolio</span>
        </button>
      </div>
    </nav>
  );
};
