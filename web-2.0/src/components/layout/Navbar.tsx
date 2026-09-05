import React, { useState } from 'react';
import { Sun, Moon, RotateCcw, User as UserIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useTrade } from '../../context/TradeContext';
import { useRouter } from '../../context/RouterContext';
import { useAnimatedNumber } from '../../hooks/useAnimatedNumber';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { accountMode, setAccountMode, balance, resetDemoBalance } = useTrade();
  const { currentPath, navigate, openAuthModal } = useRouter();

  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isModeTransitioning, setIsModeTransitioning] = useState(false);

  // Animated counting balance for smooth numerical tweening (Motion Requirement 4)
  const animatedBalance = useAnimatedNumber(balance, 450);

  const isHome = currentPath === '/' || currentPath === '/home';
  const isMarkets = currentPath.startsWith('/markets');
  const isTrending = currentPath.startsWith('/trending');
  const isSocial = currentPath.startsWith('/social');
  const isGroups = currentPath.startsWith('/groups');
  const isLeaderboard = currentPath.startsWith('/leaderboard');

  const handleModeClick = (mode: 'real' | 'demo') => {
    if (mode === accountMode) return;
    setIsModeTransitioning(true);
    const res = setAccountMode(mode);
    if (!res.allowed) {
      setIsModeTransitioning(false);
      openAuthModal({
        route: currentPath,
        action: 'generic',
        actionLabel: 'switch to Real Money Trading',
      });
      return;
    }
    setTimeout(() => {
      setIsModeTransitioning(false);
    }, 300);
  };

  const handleOpenAuthModal = () => {
    openAuthModal({
      route: currentPath,
      action: 'generic',
      actionLabel: 'save your progress and access real trading',
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-omx-border bg-omx-bg/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-omx-brand rounded-md cursor-pointer"
            aria-label="OmniMarketX Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-[#f23064] to-[#ff6b1a] shadow-sm">
              <span className="font-sora font-extrabold text-white text-base">OX</span>
            </div>
            <div>
              <span className="font-sora font-bold text-lg tracking-tight text-omx-text">
                OmniMarket<span className="text-[#f23064]">X</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            <button
              onClick={() => navigate('/')}
              className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer ${
                isHome ? 'text-omx-text font-semibold' : 'text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              Home
              {isHome && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#f23064] rounded-full" />}
            </button>
            <button
              onClick={() => navigate('/markets')}
              className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer ${
                isMarkets ? 'text-omx-text font-semibold' : 'text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              Markets
              {isMarkets && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#f23064] rounded-full" />}
            </button>
            <button
              onClick={() => navigate('/trending')}
              className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer ${
                isTrending ? 'text-omx-text font-semibold' : 'text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              Trending
              {isTrending && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#f23064] rounded-full" />}
            </button>
            <button
              onClick={() => navigate('/social')}
              className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer ${
                isSocial ? 'text-omx-text font-semibold' : 'text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              Social
              {isSocial && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#f23064] rounded-full" />}
            </button>
            <button
              onClick={() => navigate('/groups')}
              className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer ${
                isGroups ? 'text-omx-text font-semibold' : 'text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              Groups
              {isGroups && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#f23064] rounded-full" />}
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer ${
                isLeaderboard ? 'text-omx-text font-semibold' : 'text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              Leaderboard
              {isLeaderboard && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#f23064] rounded-full" />}
            </button>
          </nav>
        </div>

        {/* Right Action Utilities */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Two-state segmented control [ Real | Demo ] */}
          <div className="hidden sm:flex items-center rounded-xl border border-omx-border bg-omx-card p-0.5 text-xs font-sora font-semibold shrink-0">
            <button
              type="button"
              onClick={() => handleModeClick('real')}
              className={`flex items-center space-x-1 rounded-lg px-2 sm:px-2.5 py-1 text-xs transition-all cursor-pointer ${
                accountMode === 'real'
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'text-omx-text-secondary hover:text-omx-text'
              }`}
              aria-pressed={accountMode === 'real'}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${accountMode === 'real' ? 'bg-white' : 'bg-emerald-500'}`} />
              <span>Real</span>
            </button>
            <button
              type="button"
              onClick={() => handleModeClick('demo')}
              className={`flex items-center space-x-1 rounded-lg px-2 sm:px-2.5 py-1 text-xs transition-all cursor-pointer ${
                accountMode === 'demo'
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'text-omx-text-secondary hover:text-omx-text'
              }`}
              aria-pressed={accountMode === 'demo'}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${accountMode === 'demo' ? 'bg-white' : 'bg-indigo-500'}`} />
              <span>Demo</span>
            </button>
          </div>

          {/* Mode-Aware Balance Capsule with 3D Flip & Cross-fade Transition */}
          <div className="perspective-container hidden sm:block">
            <div
              className={`mode-flip-box ${
                isModeTransitioning ? 'mode-flip-transitioning' : 'mode-flip-settled'
              }`}
            >
            {accountMode === 'demo' ? (
              <div
                onClick={() => navigate('/portfolio')}
                className="flex items-center space-x-1.5 sm:space-x-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2 sm:px-2.5 py-1.5 text-xs hover:border-indigo-500 hover:bg-indigo-500/20 transition-colors cursor-pointer"
                title="View Demo Portfolio & Virtual Positions"
              >
                <span className="font-mono font-semibold text-indigo-700 dark:text-indigo-300 tabular-nums">
                  ${animatedBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsResetDialogOpen(true);
                  }}
                  title="Reset virtual balance to $10,000.00 (requires confirmation)"
                  className="text-indigo-400 hover:text-indigo-200 transition-colors p-0.5 rounded focus:outline-none cursor-pointer"
                  aria-label="Reset virtual demo balance"
                >
                  <RotateCcw className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => navigate('/wallet')}
                className="flex items-center space-x-1.5 sm:space-x-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 sm:px-2.5 py-1.5 text-xs hover:border-emerald-500 hover:bg-emerald-500/20 transition-colors cursor-pointer"
                title="View Real Wallet & USDC Balances"
              >
                <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-300 tabular-nums">
                  ${animatedBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hidden sm:inline">USDC</span>
              </div>
            )}
            </div>
          </div>

          {/* Dark/Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-omx-border bg-omx-card text-omx-text-secondary hover:text-omx-text hover:bg-omx-elevated transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-omx-brand shrink-0"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Auth / User Status Button */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <div
                onClick={() => navigate('/settings')}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#f23064] to-[#ff6b1a] text-xs font-bold text-white cursor-pointer"
                title="Account Settings"
              >
                {user.avatarInitials || 'U'}
              </div>
              <button
                onClick={logout}
                className="hidden sm:inline-block text-xs text-omx-text-secondary hover:text-omx-text transition-colors cursor-pointer"
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              onClick={handleOpenAuthModal}
              className="flex items-center space-x-1.5 rounded-xl bg-omx-brand hover:bg-omx-brand/90 px-3.5 py-2 text-xs font-sora font-semibold text-white transition-all cursor-pointer shadow-xs"
            >
              <UserIcon className="h-3.5 w-3.5 shrink-0" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Demo Reset Confirmation Modal (File 01 B9) */}
      {isResetDialogOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
        >
          <div className="w-full max-w-sm rounded-2xl border border-omx-border-strong/80 bg-omx-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-sora font-bold text-sm text-omx-text">Reset Demo Portfolio?</h4>
                <p className="text-xs text-omx-text-secondary">Simulated Sandbox Environment</p>
              </div>
            </div>

            <p className="text-xs text-omx-text-secondary leading-relaxed">
              This will restore your virtual balance to <span className="font-mono font-bold text-omx-text">$10,000.00</span> and wipe all simulated practice positions and order history.
            </p>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsResetDialogOpen(false)}
                className="rounded-xl border border-omx-border px-3.5 py-2 text-xs font-sora font-semibold text-omx-text-secondary hover:text-omx-text transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetDemoBalance();
                  setIsResetDialogOpen(false);
                }}
                className="rounded-xl bg-rose-600 hover:bg-rose-500 px-4 py-2 text-xs font-sora font-semibold text-white transition-colors cursor-pointer shadow-xs"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
