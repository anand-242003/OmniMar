import React, { useState } from 'react';
import { Settings, Sun, Moon, Bell, Database, Trash2, CheckCircle2, User, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useTrade } from '../context/TradeContext';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { positions, trades, resetDemoBalance } = useTrade();

  // Notification Preferences State
  const [notifyResolution, setNotifyResolution] = useState(true);
  const [notifyConsensusShifts, setNotifyConsensusShifts] = useState(true);
  const [notifyGuilds, setNotifyGuilds] = useState(false);

  // Status Notification
  const [toast, setToast] = useState<string | null>(null);

  const handleClearCache = () => {
    resetDemoBalance();
    setToast('Local simulation cache and positions have been reset.');
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto w-full space-y-8 min-w-0">
      {/* 1. Header */}
      <div className="space-y-1.5 min-w-0">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Settings className="h-4 w-4" />
          </div>
          <h1 className="font-sora text-2xl sm:text-3xl font-extrabold tracking-tight text-omx-text">
            Preferences & Settings
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-omx-text-secondary">
          Display theme, notifications, sandbox data diagnostics, and session security.
        </p>
      </div>

      {/* Notification Toast */}
      {toast && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs font-sora font-medium text-emerald-800 dark:text-emerald-300 flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* 2. Theme & Display Section */}
      <section aria-label="Display theme options" className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4 text-omx-brand" />
          <h2 className="font-sora font-bold text-base text-omx-text">Display Theme</h2>
        </div>
        <p className="text-xs text-omx-text-secondary">
          Choose your visual experience. Light mode is the canonical research interface for OmniMarketX.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Light Mode Selection */}
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-2 flex flex-col justify-between ${
              theme === 'light'
                ? 'border-omx-brand bg-omx-brand/5 ring-2 ring-omx-brand/20'
                : 'border-omx-border hover:border-omx-border-strong'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-amber-500" />
                <span className="font-sora font-bold text-sm text-omx-text">Light Theme (Default)</span>
              </div>
              {theme === 'light' && <Check className="h-4 w-4 text-omx-brand" />}
            </div>
            <p className="text-xs text-omx-text-muted leading-relaxed">
              Clean, crisp financial terminal aesthetic with dark charcoal typography and high contrast legibility.
            </p>
          </button>

          {/* Dark Mode Selection */}
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-2 flex flex-col justify-between ${
              theme === 'dark'
                ? 'border-omx-brand bg-omx-brand/5 ring-2 ring-omx-brand/20'
                : 'border-omx-border hover:border-omx-border-strong'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Moon className="h-4 w-4 text-indigo-400" />
                <span className="font-sora font-bold text-sm text-omx-text">Dark Theme</span>
              </div>
              {theme === 'dark' && <Check className="h-4 w-4 text-omx-brand" />}
            </div>
            <p className="text-xs text-omx-text-muted leading-relaxed">
              Restrained low-glare dark canvas for nighttime trading and prolonged research sessions.
            </p>
          </button>
        </div>
      </section>

      {/* 3. Account & Identity Section */}
      <section aria-label="Account details" className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-omx-brand" />
          <h2 className="font-sora font-bold text-base text-omx-text">Forecaster Profile</h2>
        </div>

        <div className="rounded-xl border border-omx-border bg-omx-bg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-omx-card border border-omx-border font-sora font-bold text-xs text-omx-brand">
              {user?.avatarInitials || 'GT'}
            </div>
            <div>
              <span className="font-sora font-bold text-sm text-omx-text block">
                {isAuthenticated ? user?.email : 'Guest Forecaster'}
              </span>
              <span className="text-[11px] text-omx-text-muted font-mono">
                {isAuthenticated ? 'Verified Account' : 'Sandbox Session (OMX-GUEST-491)'}
              </span>
            </div>
          </div>

          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3.5 py-1.5 text-xs font-sora font-bold text-rose-700 dark:text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              Sandbox Progress Stored Locally
            </span>
          )}
        </div>
      </section>

      {/* 4. Notification Preferences */}
      <section aria-label="Notification alerts" className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Bell className="h-4 w-4 text-omx-brand" />
          <h2 className="font-sora font-bold text-base text-omx-text">Notification Alerts</h2>
        </div>

        <div className="space-y-3 divide-y divide-omx-border/60 text-xs">
          <div className="pt-2 first:pt-0 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-sora font-semibold text-omx-text block">Market Resolution Notifications</span>
              <span className="text-omx-text-muted">Receive alerts when held contracts settle at $1.00 or $0.00.</span>
            </div>
            <input
              type="checkbox"
              checked={notifyResolution}
              onChange={(e) => setNotifyResolution(e.target.checked)}
              className="h-4 w-4 rounded border-omx-border text-omx-brand focus:ring-omx-brand cursor-pointer"
              aria-label="Toggle market resolution notifications"
            />
          </div>

          <div className="pt-3 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-sora font-semibold text-omx-text block">Consensus Shift Alerts</span>
              <span className="text-omx-text-muted">Notify when implied probability moves more than 10% in 24 hours.</span>
            </div>
            <input
              type="checkbox"
              checked={notifyConsensusShifts}
              onChange={(e) => setNotifyConsensusShifts(e.target.checked)}
              className="h-4 w-4 rounded border-omx-border text-omx-brand focus:ring-omx-brand cursor-pointer"
              aria-label="Toggle consensus shift alerts"
            />
          </div>

          <div className="pt-3 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-sora font-semibold text-omx-text block">Guild Discussion Digest</span>
              <span className="text-omx-text-muted">Weekly digest of top community forecast theses.</span>
            </div>
            <input
              type="checkbox"
              checked={notifyGuilds}
              onChange={(e) => setNotifyGuilds(e.target.checked)}
              className="h-4 w-4 rounded border-omx-border text-omx-brand focus:ring-omx-brand cursor-pointer"
              aria-label="Toggle guild discussion digest"
            />
          </div>
        </div>
      </section>

      {/* 5. Local State & Cache Management */}
      <section aria-label="Cache and data management" className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Database className="h-4 w-4 text-omx-brand" />
          <h2 className="font-sora font-bold text-base text-omx-text">Local Cache & Diagnostics</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="rounded-xl border border-omx-border bg-omx-bg p-3">
            <span className="text-[10px] text-omx-text-muted block">Active Positions</span>
            <span className="font-mono font-bold text-sm text-omx-text">{positions.length}</span>
          </div>
          <div className="rounded-xl border border-omx-border bg-omx-bg p-3">
            <span className="text-[10px] text-omx-text-muted block">Logged Trades</span>
            <span className="font-mono font-bold text-sm text-omx-text">{trades.length}</span>
          </div>
          <div className="rounded-xl border border-omx-border bg-omx-bg p-3 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-omx-text-muted block">Engine Status</span>
            <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">Online 2.0</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-omx-text-muted">Reset simulation positions and cash ledger to default.</span>
          <button
            type="button"
            onClick={handleClearCache}
            className="flex items-center space-x-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-xs font-sora font-bold text-rose-700 dark:text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Reset Local Cache</span>
          </button>
        </div>
      </section>
    </main>
  );
};
