import React, { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const GlobalToast: React.FC = () => {
  const { authNotice, clearAuthNotice } = useAuth();

  useEffect(() => {
    if (!authNotice) return;
    const timer = setTimeout(() => {
      clearAuthNotice();
    }, 5000);
    return () => clearTimeout(timer);
  }, [authNotice, clearAuthNotice]);

  if (!authNotice) return null;

  const isRestored = authNotice.includes('restored');

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <div className="flex items-start justify-between gap-3 rounded-2xl border border-indigo-500/30 bg-omx-card/95 backdrop-blur-md p-4 shadow-xl text-omx-text">
        <div className="flex items-start space-x-3 min-w-0">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
            {isRestored ? <Info className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
          </div>
          <div className="space-y-0.5 min-w-0">
            <div className="font-sora font-semibold text-xs text-omx-text">
              {isRestored ? 'Account Restored' : 'Account Connected'}
            </div>
            <p className="text-xs text-omx-text-secondary leading-relaxed break-words">
              {authNotice}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearAuthNotice}
          className="shrink-0 p-1 text-omx-text-muted hover:text-omx-text transition-colors rounded-lg cursor-pointer focus:outline-none"
          aria-label="Dismiss toast"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
