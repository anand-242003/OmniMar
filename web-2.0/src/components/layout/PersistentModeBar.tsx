import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTrade } from '../../context/TradeContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';

/**
 * Persistent, non-dismissible Demo Mode Bar (File 04 §3 & File 03 §4).
 * Pinned at the very top of the viewport above the navbar.
 * Stays present for the entire session while in Demo mode with NO close 'X' button.
 */
export const PersistentModeBar: React.FC = () => {
  const { accountMode, setAccountMode } = useTrade();
  const { isAuthenticated } = useAuth();
  const { currentPath, openAuthModal } = useRouter();

  if (accountMode !== 'demo') {
    return null;
  }

  const handleSwitchToReal = () => {
    if (!isAuthenticated) {
      openAuthModal({
        route: currentPath,
        action: 'generic',
        actionLabel: 'access Real Money Trading (KYC required)',
      });
      return;
    }
    setAccountMode('real');
  };

  return (
    <div
      role="status"
      aria-label="Demo Trading Mode Active"
      className="sticky top-0 z-50 w-full border-b border-indigo-500/30 bg-indigo-950/95 text-indigo-200 backdrop-blur-md px-4 py-1.5 transition-colors"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 text-xs font-sora min-w-0">
        <div className="flex items-center space-x-2.5 min-w-0 truncate">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>

          <span className="font-bold text-white uppercase tracking-wider shrink-0 text-[11px] sm:text-xs">
            Demo Mode
          </span>

          <span className="hidden sm:inline text-indigo-300/90 truncate">
            — Trading with $10,000 virtual funds (simulated execution · zero financial liability)
          </span>
          <span className="sm:hidden text-indigo-300/90 truncate">
            — $10K virtual funds
          </span>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={handleSwitchToReal}
            className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1 text-[11px] sm:text-xs font-semibold text-white transition-colors cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Sparkles className="h-3 w-3 text-amber-300 shrink-0" />
            <span>Switch to Real</span>
            <ArrowRight className="h-3 w-3 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
