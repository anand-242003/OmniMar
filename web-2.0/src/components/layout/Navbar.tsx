import React, { useState } from 'react';
import { Sun, Moon, RotateCcw, ShieldCheck, User as UserIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useTrade } from '../../context/TradeContext';
import { useRouter } from '../../context/RouterContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, loginWithEmail, logout } = useAuth();
  const { balance, resetDemoBalance } = useTrade();
  const { navigate } = useRouter();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      loginWithEmail(emailInput.trim());
      setShowAuthModal(false);
      setEmailInput('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-omx-border bg-omx-bg/95 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand (Refinement 01: Removed WEB-2.0 badge) */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate('/markets/will-gta-vi-release-before-december-2026')}
              className="flex items-center space-x-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-omx-brand rounded-md"
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
            <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
              <button
                onClick={() => navigate('/markets/will-gta-vi-release-before-december-2026')}
                className="relative px-3.5 py-2 text-sm font-medium text-omx-text hover:text-omx-text transition-colors rounded-md"
              >
                Markets
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#f23064] rounded-full" />
              </button>
              <button
                onClick={() => alert('Social feed will be available in Slice 2')}
                className="px-3.5 py-2 text-sm font-medium text-omx-text-secondary hover:text-omx-text transition-colors rounded-md"
              >
                Social
              </button>
              <button
                onClick={() => alert('Groups will be available in Slice 2')}
                className="px-3.5 py-2 text-sm font-medium text-omx-text-secondary hover:text-omx-text transition-colors rounded-md"
              >
                Groups
              </button>
              <button
                onClick={() => alert('Leaderboard will be available in Slice 2')}
                className="px-3.5 py-2 text-sm font-medium text-omx-text-secondary hover:text-omx-text transition-colors rounded-md"
              >
                Leaderboard
              </button>
            </nav>
          </div>

          {/* Right Action Utilities (Refinement 17: Streamlined Mobile Header) */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Restrained Sandbox Practice Capsule */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 rounded-lg border border-omx-border bg-omx-card px-2.5 sm:px-3 py-1.5 text-xs">
              <span className="h-2 w-2 rounded-full bg-omx-sandbox shrink-0" />
              <span className="font-medium text-omx-text-secondary hidden md:inline">Sandbox</span>
              <span className="font-mono font-semibold text-omx-text">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <button
                onClick={resetDemoBalance}
                title="Reset virtual balance to $10,000.00"
                className="ml-0.5 text-omx-text-secondary hover:text-omx-text transition-colors p-0.5 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-omx-border"
                aria-label="Reset virtual demo balance"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-omx-border bg-omx-card text-omx-text-secondary hover:text-omx-text hover:bg-omx-elevated transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-omx-brand shrink-0"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Auth / Guest Status Button (Hidden on very narrow mobile to prioritize brand & balance per Refinement 17) */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#f23064] to-[#ff6b1a] text-xs font-bold text-white">
                  {user?.avatarInitials || 'U'}
                </div>
                <button
                  onClick={logout}
                  className="hidden sm:inline-block text-xs text-omx-text-secondary hover:text-omx-text transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="hidden sm:flex items-center space-x-1.5 rounded-lg border border-omx-border bg-omx-card px-3 py-1.5 text-xs font-medium text-omx-text hover:bg-omx-elevated transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-omx-brand"
              >
                <UserIcon className="h-3.5 w-3.5 text-omx-text-secondary" />
                <span>Guest (Save Progress)</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Guest Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-xl border border-omx-border bg-omx-card p-6 shadow-omx-modal animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sora font-bold text-base text-omx-text">Save Your Predictions</h3>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-omx-text-secondary hover:text-omx-text"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-omx-text-secondary mb-4 leading-relaxed">
              Your practice predictions are active now. Enter your email to save positions across devices and track your win rate.
            </p>
            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-omx-text-secondary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full rounded-lg border border-omx-border bg-omx-bg px-3 py-2 text-sm text-omx-text placeholder-omx-text-muted focus:border-omx-brand focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#f23064] py-2.5 text-xs font-semibold text-white hover:bg-[#ff4f55] transition-colors"
              >
                Continue with Email
              </button>
            </form>
            <div className="mt-4 flex items-center justify-center space-x-1.5 text-[11px] text-omx-text-muted">
              <ShieldCheck className="h-3.5 w-3.5 text-omx-yes" />
              <span>Passwordless verification · No real funds required</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
