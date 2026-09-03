import React, { useState } from 'react';
import { X, Shield, ArrowRight, Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [email, setEmail] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email.trim());
    } else {
      login('trader@omnimarketx.com');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeAuthModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-[400px] bg-omx-card border border-omx-border rounded-omx-xl shadow-omx-lg p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-omx-sm text-omx-text-muted hover:text-omx-text hover:bg-omx-muted transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Icon & Heading */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-omx-lg bg-gradient-to-br from-[#f23064] via-[#ff4f55] to-[#5430d9] text-white font-bold text-xl mb-3 shadow-omx-glow">
            M
          </div>
          <h2 className="text-xl font-bold text-omx-text tracking-tight">Log in or sign up</h2>
          <p className="text-sm text-omx-text-secondary mt-1">Choose a sign in method</p>
        </div>

        {/* Email Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              className="w-full px-3.5 py-2.5 bg-omx-muted/80 focus:bg-omx-card text-omx-text placeholder:text-omx-text-muted text-sm rounded-omx-md border border-omx-border focus:border-[#f23064]/70 outline-none transition-all"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-omx-md bg-gradient-to-r from-[#f23064] via-[#ff4f55] to-[#ff6b1a] text-white text-sm font-semibold hover:opacity-95 active:opacity-90 transition-all shadow-sm"
          >
            <span>Submit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-omx-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-omx-card px-2 text-omx-text-muted font-medium">or</span>
          </div>
        </div>

        {/* Social / Wallet Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => login('google.user@example.com')}
            type="button"
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-omx-md border border-omx-border bg-omx-muted/50 hover:bg-omx-hover text-omx-text text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => login('apple.user@example.com')}
            type="button"
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-omx-md border border-omx-border bg-omx-muted/50 hover:bg-omx-hover text-omx-text text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.88-.9.04-1.99.6-2.63 1.35-.58.67-.99 1.74-.86 2.78.99.08 2.02-.5 2.57-1.25z" />
            </svg>
            <span>Continue with Apple</span>
          </button>

          <button
            onClick={() => login('wallet.user@example.com')}
            type="button"
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-omx-md border border-omx-border bg-omx-muted/50 hover:bg-omx-hover text-omx-text text-sm font-medium transition-colors"
          >
            <Wallet className="w-4 h-4 text-purple-400" />
            <span>Continue with a wallet</span>
          </button>
        </div>

        {/* Privy Security Footer */}
        <div className="mt-6 pt-4 border-t border-omx-border flex items-center justify-center gap-1.5 text-xs text-omx-text-muted">
          <Shield className="w-3.5 h-3.5 text-omx-text-muted" />
          <span>Protected by</span>
          <span className="font-semibold text-omx-text-secondary">privy</span>
        </div>
      </div>
    </div>
  );
};
