import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, Mail, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRouter, type PendingReturn } from '../../context/RouterContext';
import { usePrivy, useLoginWithEmail } from '@privy-io/react-auth';

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  pendingReturn?: PendingReturn | null;
  onJoinGroup?: (groupId: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  pendingReturn: propsPendingReturn,
  onJoinGroup,
}) => {
  const { authNotice, clearAuthNotice } = useAuth();
  const { login: privyLogin } = usePrivy();
  
  const { sendCode, loginWithCode } = useLoginWithEmail({
    onComplete: () => {
      setIsSubmitting(false);
      finalizeLogin();
    },
    onError: (error) => {
      setIsSubmitting(false);
      setAuthError(typeof error === 'string' ? error : String(error));
    }
  });

  const {
    currentPath,
    navigate,
    pendingReturn: contextPendingReturn,
    setPendingReturn,
    setPendingIntent,
    isAuthModalOpen,
    closeAuthModal,
  } = useRouter();

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : isAuthModalOpen;
  const activePending = propsPendingReturn !== undefined ? propsPendingReturn : contextPendingReturn;

  const [step, setStep] = useState<'SELECT' | 'OTP'>('SELECT');
  const [emailInput, setEmailInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  const [recentProvider, setRecentProvider] = useState<string | null>(() => {
    return localStorage.getItem('omx_recent_auth_provider');
  });

  // Trap focus on open and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleDismiss();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const _actionLabel = activePending?.actionLabel ?? 'continue';

  const handleDismiss = () => {
    setEmailInput('');
    setOtpInput('');
    setStep('SELECT');
    setAuthError(null);
    clearAuthNotice();
    if (propsOnClose) {
      propsOnClose();
    } else {
      closeAuthModal();
    }
  };

  const finalizeLogin = () => {
    if (activePending) {
      if (activePending.action === 'trade' && activePending.tradeState) {
        setPendingIntent({
          marketId: activePending.tradeState.marketId,
          outcome: activePending.tradeState.outcome,
          amount: activePending.tradeState.amount,
        });
      }
      if (activePending.action === 'join-group' && activePending.groupId && onJoinGroup) {
        onJoinGroup(activePending.groupId);
      }
      if (activePending.route && activePending.route !== currentPath) {
        navigate(activePending.route);
      }
      setPendingReturn(null);
    }

    setEmailInput('');
    setOtpInput('');
    setStep('SELECT');
    setAuthError(null);
    if (propsOnClose) {
      propsOnClose();
    } else {
      closeAuthModal();
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      await sendCode({ email: emailInput });
      setIsSubmitting(false);
      setStep('OTP');
    } catch (err: any) {
      setIsSubmitting(false);
      setAuthError(err.message || 'Failed to send code');
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpInput.trim()) return;
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      await loginWithCode({ code: otpInput });
      localStorage.setItem('omx_recent_auth_provider', 'email');
      setRecentProvider('email');
      // finalizeLogin will be called by onLoginSuccess callback
    } catch (err: any) {
      setIsSubmitting(false);
      setAuthError(err.message || 'Invalid or expired code');
    }
  };

  const handleOAuthClick = (provider: 'google' | 'apple' | 'wallet') => {
    setAuthError(null);
    
    if (provider === 'wallet') {
      privyLogin({ loginMethods: ['wallet'] });
      localStorage.setItem('omx_recent_auth_provider', 'wallet');
      setRecentProvider('wallet');
      finalizeLogin();
    } else if (provider === 'google') {
      privyLogin({ loginMethods: ['google'] });
      localStorage.setItem('omx_recent_auth_provider', 'google');
      setRecentProvider('google');
      finalizeLogin();
    } else if (provider === 'apple') {
      privyLogin({ loginMethods: ['apple'] });
      localStorage.setItem('omx_recent_auth_provider', 'apple');
      setRecentProvider('apple');
      finalizeLogin();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="w-full max-w-[420px] rounded-2xl border border-gray-100 bg-white p-7 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative min-w-0 transition-all">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute right-5 top-5 shrink-0 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors p-1.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
          aria-label="Close sign in modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6 mt-2 space-y-2">
          <h3
            id="auth-modal-title"
            className="font-semibold text-[22px] text-slate-900 leading-snug tracking-tight"
          >
            Sign in or Register
          </h3>
            <p className="text-[14px] text-slate-500 leading-relaxed px-2">
              {activePending?.action === 'trade'
                ? 'Sign in to confirm and save your prediction contract.'
                : activePending?.action === 'join-group'
                ? 'Join this forecaster guild to read member research.'
                : `Sign in to ${_actionLabel} and sync your positions across devices.`}
            </p>
        </div>

        {/* Notice banner if guest merge or restore triggered */}
        {authNotice && (
          <div className="mb-4 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-xs text-indigo-700 flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-500" />
            <span>{authNotice}</span>
          </div>
        )}
        
        {authError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 flex items-center space-x-2">
            <X className="h-4 w-4 shrink-0 text-red-500" />
            <span>{authError}</span>
          </div>
        )}

        {step === 'SELECT' ? (
          <div className="space-y-3.5">
            {/* 1. Google One-Tap / OAuth */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleOAuthClick('google')}
              className="w-full relative flex h-[48px] items-center justify-center space-x-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-[15px] font-medium text-slate-700 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
              {recentProvider === 'google' && (
                <span className="absolute right-4 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-medium text-emerald-600">
                  Recent
                </span>
              )}
            </button>

            {/* 2. Apple OAuth */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleOAuthClick('apple')}
              className="w-full flex h-[48px] items-center justify-center space-x-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-[15px] font-medium text-slate-700 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              <svg className="h-[18px] w-[18px] shrink-0 fill-current mb-0.5" viewBox="0 0 384 512">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <span>Continue with Apple</span>
            </button>

            {/* 3. Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-4 text-[13px] font-mono text-slate-400">
                or with email OTP
              </span>
            </div>

            {/* 4. Email OTP Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="auth-email"
                  className="block text-[13px] font-medium text-slate-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="auth-email"
                    type="email"
                    required
                    placeholder="forecaster@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-[15px] text-slate-800 placeholder-slate-400 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !emailInput}
                className="w-full flex h-[48px] items-center justify-center space-x-2 rounded-xl bg-[#e61e54] py-2.5 text-[15px] font-semibold text-white hover:bg-[#d4174b] transition-colors cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Verification Code'}</span>
                {!isSubmitting && <ArrowRight className="h-4 w-4 ml-1" />}
              </button>
            </form>

            {/* 5. Web3 Wallet Option */}
            <div className="pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleOAuthClick('wallet')}
                className="w-full flex h-[48px] items-center justify-center space-x-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-[15px] font-medium text-slate-600 transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                <Wallet className="h-[18px] w-[18px] text-slate-400" />
                <span>Connect Ethereum / Web3 Wallet</span>
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={handleOtpVerify} className="space-y-6 pt-2">
            <div className="text-center space-y-2 mb-2">
               <h4 className="font-semibold text-lg text-slate-800">Enter the verification code</h4>
               <p className="text-sm text-slate-500">
                 We sent a verification code to<br/>
                 <span className="font-medium text-slate-700">{emailInput}</span>
               </p>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <input
                  id="auth-otp"
                  type="text"
                  required
                  maxLength={6}
                  autoFocus
                  placeholder="000000"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 font-mono text-center text-xl tracking-[0.5em] text-slate-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSubmitting || otpInput.length < 6}
                className="w-full flex h-[48px] items-center justify-center space-x-2 rounded-xl bg-[#e61e54] py-2.5 text-[15px] font-semibold text-white hover:bg-[#d4174b] transition-colors cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Verifying...' : 'Verify & Sign In'}</span>
                {!isSubmitting && <ArrowRight className="h-4 w-4 ml-1" />}
              </button>

              <button
                type="button"
                onClick={() => setStep('SELECT')}
                className="w-full text-center text-[14px] text-slate-500 hover:text-slate-700 py-2 transition-colors font-medium"
              >
                Go back and change email
              </button>
            </div>
          </form>
        )}

        {/* Footer Trust Line */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-center space-x-1.5 text-[13px] text-slate-500">
          <ShieldCheck className="h-[18px] w-[18px] text-emerald-500 shrink-0" />
          <span>Protected by Privy · Bank-grade passwordless security</span>
        </div>
      </div>
    </div>
  );
};

