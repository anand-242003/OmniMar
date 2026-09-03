import React, { useState } from 'react';
import {
  ChevronRight,
  User,
  Moon,
  Sun,
  Bell,
  Shield,
  LogOut,
  Check,
  Smartphone,
  Mail,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from '../context/RouterContext';
import { ProtectedShield } from '../components/common/ProtectedShield';

export const SettingsPage: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { navigate } = useRouter();

  // Local settings state
  const [displayName, setDisplayName] = useState(user?.name || 'Demo Trader');
  const [isSaved, setIsSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    resolutions: true,
    tradeFills: true,
    predictions: true,
    marketing: false,
  });

  if (!isAuthenticated) {
    return <ProtectedShield route="settings" />;
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-150 max-w-4xl pb-12">
      {/* Breadcrumbs & Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-omx-text-muted mb-1.5 font-medium">
          <span
            onClick={() => navigate('/home')}
            className="hover:text-omx-text cursor-pointer transition-colors"
          >
            Home
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-omx-text font-semibold">Settings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-omx-text">Settings</h1>
        <p className="text-sm text-omx-text-secondary mt-1">
          Manage your account profile, theme appearance, notifications, and security.
        </p>
      </div>

      {/* 1. Profile Information */}
      <div className="rounded-omx-xl border border-omx-border bg-omx-card p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-omx-border pb-3">
          <User className="w-4 h-4 text-[#f23064]" />
          <h2 className="text-base font-bold text-omx-text">Profile Information</h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-semibold text-omx-text-muted uppercase">Avatar</p>
              <p className="text-xs text-omx-text-secondary">
                Deterministic demo identity avatar based on user profile.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-omx-text mb-1.5">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-omx-muted text-omx-text rounded-omx-md border border-omx-border focus:border-[#f23064]/70 outline-none text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-omx-text mb-1.5">Username</label>
              <input
                type="text"
                value={`@${user?.username || 'demotrader'}`}
                disabled
                className="w-full px-3.5 py-2.5 bg-omx-muted/50 text-omx-text-muted rounded-omx-md border border-omx-border text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-omx-text mb-1.5">Email Address</label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={user?.email || 'demo@omnimarketx.com'}
                  disabled
                  className="w-full px-3.5 py-2.5 bg-omx-muted/50 text-omx-text-muted rounded-omx-md border border-omx-border text-sm cursor-not-allowed"
                />
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-omx-yes text-xs font-semibold border border-emerald-500/20 whitespace-nowrap">
                  Verified
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-omx-text mb-1.5">Privy User DID</label>
              <input
                type="text"
                value="did:privy:usr_demo_88f92a1c"
                disabled
                className="w-full px-3.5 py-2.5 bg-omx-muted/50 text-omx-text-muted rounded-omx-md border border-omx-border text-sm font-mono cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            {isSaved && (
              <span className="text-xs font-semibold text-omx-yes flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved successfully
              </span>
            )}
            <button
              type="submit"
              className="px-4 py-2 rounded-omx-md text-xs font-semibold text-white bg-gradient-to-r from-[#f23064] via-[#ff4f55] to-[#ff6b1a] hover:opacity-95 active:scale-[0.98] transition-all shadow-sm"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* 2. Appearance & Theme */}
      <div className="rounded-omx-xl border border-omx-border bg-omx-card p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-omx-border pb-3">
          <Moon className="w-4 h-4 text-[#f23064]" />
          <h2 className="text-base font-bold text-omx-text">Appearance & Theme</h2>
        </div>

        <p className="text-xs text-omx-text-secondary">
          Customize the interface look and feel. Settings persist across page visits.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Dark Mode Card */}
          <div
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-omx-lg border cursor-pointer transition-all flex items-center justify-between ${
              theme === 'dark'
                ? 'border-[#f23064] bg-[#090426] text-white shadow-md ring-2 ring-[#f23064]/30'
                : 'border-omx-border bg-omx-muted hover:border-omx-border/80 text-omx-text'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-200">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Dark Theme</p>
                <p className="text-xs opacity-70">Deep purple & space tones</p>
              </div>
            </div>
            {theme === 'dark' && <Check className="w-4 h-4 text-[#f23064]" />}
          </div>

          {/* Light Mode Card */}
          <div
            onClick={() => setTheme('light')}
            className={`p-4 rounded-omx-lg border cursor-pointer transition-all flex items-center justify-between ${
              theme === 'light'
                ? 'border-[#f23064] bg-white text-slate-900 shadow-md ring-2 ring-[#f23064]/30'
                : 'border-omx-border bg-omx-muted hover:border-omx-border/80 text-omx-text'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-amber-500">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Light Theme</p>
                <p className="text-xs opacity-70">Crisp light mode</p>
              </div>
            </div>
            {theme === 'light' && <Check className="w-4 h-4 text-[#f23064]" />}
          </div>
        </div>
      </div>

      {/* 3. Notification Preferences */}
      <div className="rounded-omx-xl border border-omx-border bg-omx-card p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-omx-border pb-3">
          <Bell className="w-4 h-4 text-[#f23064]" />
          <h2 className="text-base font-bold text-omx-text">Notification Preferences</h2>
        </div>

        <div className="space-y-3 divide-y divide-omx-border">
          <div className="pt-2 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-omx-text">Market Resolution Alerts</p>
              <p className="text-xs text-omx-text-secondary">
                Receive notifications when markets you hold shares in are resolved.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.resolutions}
              onChange={() => toggleNotification('resolutions')}
              className="w-4 h-4 accent-[#f23064] cursor-pointer"
            />
          </div>

          <div className="pt-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-omx-text">Trade Execution & Order Fills</p>
              <p className="text-xs text-omx-text-secondary">
                Instant confirmation when your demo orders are placed and filled.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.tradeFills}
              onChange={() => toggleNotification('tradeFills')}
              className="w-4 h-4 accent-[#f23064] cursor-pointer"
            />
          </div>

          <div className="pt-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-omx-text">Community Prediction Feed</p>
              <p className="text-xs text-omx-text-secondary">
                Alerts when other predictors reply to or like your shared predictions.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.predictions}
              onChange={() => toggleNotification('predictions')}
              className="w-4 h-4 accent-[#f23064] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 4. Security & Connected Providers */}
      <div className="rounded-omx-xl border border-omx-border bg-omx-card p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-omx-border pb-3">
          <Shield className="w-4 h-4 text-[#f23064]" />
          <h2 className="text-base font-bold text-omx-text">Security & Connected Accounts</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-omx-md bg-omx-muted border border-omx-border">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-omx-text-muted" />
              <div>
                <p className="text-xs font-semibold text-omx-text">Privy Passwordless Authentication</p>
                <p className="text-[11px] text-omx-text-muted">Managed identity provider</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-omx-yes border border-emerald-500/20">
              Connected
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-omx-md bg-omx-muted border border-omx-border">
            <div className="flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-omx-text-muted" />
              <div>
                <p className="text-xs font-semibold text-omx-text">Web3 Crypto Wallet</p>
                <p className="text-[11px] text-omx-text-muted">MetaMask / Phantom / WalletConnect</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-omx-card text-omx-text-muted border border-omx-border">
              Not Connected
            </span>
          </div>
        </div>
      </div>

      {/* 5. Danger Zone / Logout */}
      <div className="rounded-omx-xl border border-rose-500/20 bg-rose-500/5 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-omx-no">Account Session</h3>
          <p className="text-xs text-omx-text-secondary mt-0.5">
            Log out of your simulated session. Your virtual demo trading history will remain preserved locally.
          </p>
        </div>
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-omx-md text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 active:scale-[0.98] transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          Log Out
        </button>
      </div>
    </div>
  );
};
