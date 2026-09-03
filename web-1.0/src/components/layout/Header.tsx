import React, { useState } from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTrade } from '../../context/TradeContext';
import { useRouter } from '../../context/RouterContext';
import { SearchInput } from './SearchInput';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { isAuthenticated, user, openAuthModal, logout } = useAuth();
  const { balance } = useTrade();
  const { navigate } = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-20 h-16 w-full bg-omx-bg/85 backdrop-blur-md border-b border-omx-border px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Left side: Mobile menu toggle + Mobile brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-omx-md text-omx-text-secondary hover:text-omx-text hover:bg-omx-hover transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => navigate('/home')}
          className="lg:hidden flex items-center gap-2 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-omx-md bg-gradient-to-br from-[#f23064] to-[#ff6b1a] flex items-center justify-center text-white font-bold text-sm shadow-sm">
            M
          </div>
          <span className="font-bold text-base tracking-tight text-omx-text">
            Omni<span className="text-[#f23064]">Market</span>X
          </span>
        </div>
      </div>

      {/* Center: Search input shell */}
      <div className="flex-1 flex justify-center max-w-xl">
        <SearchInput />
      </div>

      {/* Right side: Auth Controls */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {!isAuthenticated ? (
          <>
            <button
              onClick={() => openAuthModal('signin')}
              className="text-sm font-medium text-omx-text hover:text-[#f23064] transition-colors px-2 py-1.5"
            >
              Sign In
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className="px-4 py-2 rounded-omx-md text-sm font-semibold text-white bg-gradient-to-r from-[#f23064] via-[#ff4f55] to-[#ff6b1a] hover:opacity-95 active:opacity-90 transition-all shadow-sm"
            >
              Sign Up
            </button>
          </>
        ) : (
          <div className="relative">
            <div className="flex items-center gap-3">
              {/* Virtual Balance badge */}
              <div
                onClick={() => navigate('/wallet')}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-omx-md bg-omx-card border border-omx-border cursor-pointer hover:border-[#f23064]/40 transition-colors text-xs font-mono"
              >
                <span className="text-omx-text-muted">Virtual:</span>
                <span className="font-semibold text-omx-yes">
                  ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-omx-text-muted">USDC</span>
              </div>

              {/* User Profile Button */}
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 rounded-full border border-omx-border hover:border-[#f23064]/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  {user?.name?.slice(0, 2).toUpperCase() || 'DT'}
                </div>
              </button>
            </div>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-omx-card border border-omx-border rounded-omx-md shadow-omx-lg py-1 z-50">
                <div className="px-3 py-2 border-b border-omx-border">
                  <p className="text-xs font-semibold text-omx-text truncate">{user?.name}</p>
                  <p className="text-[11px] text-omx-text-muted truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    navigate('/portfolio');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-omx-text hover:bg-omx-hover transition-colors"
                >
                  Portfolio
                </button>
                <button
                  onClick={() => {
                    navigate('/wallet');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-omx-text hover:bg-omx-hover transition-colors"
                >
                  Wallet
                </button>
                <button
                  onClick={() => {
                    navigate('/activity');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-omx-text hover:bg-omx-hover transition-colors"
                >
                  Activity
                </button>
                <button
                  onClick={() => {
                    navigate('/settings');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-omx-text hover:bg-omx-hover transition-colors"
                >
                  Settings
                </button>
                <div className="border-t border-omx-border mt-1 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-omx-hover transition-colors flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
