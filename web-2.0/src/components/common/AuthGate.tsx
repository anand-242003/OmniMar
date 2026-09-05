import React from 'react';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';

interface AuthGateProps {
  variant: 'page' | 'inline';
  title?: string;
  pageTitle?: string;
  description?: string;
  pageDescription?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  inlineMessage?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Canonical <AuthGate> component per File 04 §6.
 *
 * Replaces ad-hoc "sign in required" handling with two consistent variants:
 *   - variant="page": Full-page centered state for protected destinations (Wallet, Portfolio, Activity in Real mode, Settings).
 *   - variant="inline": Disabled/locked control overlay for actions on browsable pages (Social compose, Group join, Real trade submit).
 */
export const AuthGate: React.FC<AuthGateProps> = ({
  variant,
  title,
  pageTitle,
  description,
  pageDescription,
  icon,
  actionLabel = 'continue',
  inlineMessage = 'Sign in required',
  children,
  className = '',
}) => {
  const displayTitle = pageTitle || title || 'Sign in required';
  const displayDescription = pageDescription || description || 'Sign in to access your account details, manage your wallet, and track your predictions.';
  const { isAuthenticated } = useAuth();
  const { currentPath, openAuthModal } = useRouter();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (variant === 'page') {
    return (
      <div className={`flex flex-col items-center justify-center py-16 px-4 text-center min-w-0 ${className}`}>
        <div className="w-full max-w-md rounded-2xl border border-omx-border-strong/80 bg-omx-card p-8 shadow-sm space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-omx-brand/10 border border-omx-brand/20 text-omx-brand">
            {icon || <Lock className="h-7 w-7" />}
          </div>

          <div className="space-y-2">
            <h2 className="font-sora text-xl font-bold tracking-tight text-omx-text">
              {displayTitle}
            </h2>
            <p className="text-xs sm:text-sm text-omx-text-secondary leading-relaxed">
              {displayDescription}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() =>
                openAuthModal({
                  route: currentPath,
                  action: 'generic',
                  actionLabel,
                })
              }
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-omx-brand py-3 text-xs sm:text-sm font-sora font-semibold text-white hover:bg-omx-brand/90 transition-all cursor-pointer shadow-sm"
            >
              <span>Sign In to Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-omx-text-muted">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>Protected by Privy · Passwordless verification</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Inline variant
  const handleInlineClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openAuthModal({
      route: currentPath,
      action: 'generic',
      actionLabel,
    });
  };

  return (
    <div
      onClick={handleInlineClick}
      className={`relative group cursor-pointer select-none ${className}`}
      title={inlineMessage}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openAuthModal({
            route: currentPath,
            action: 'generic',
            actionLabel,
          });
        }
      }}
      aria-label={`${inlineMessage} — Click to sign in`}
    >
      {/* Dimmed interactive children */}
      <div className="opacity-50 pointer-events-none filter blur-[0.2px] transition-opacity group-hover:opacity-40">
        {children}
      </div>

      {/* Floating inline lock pill */}
      <div className="absolute inset-0 flex items-center justify-center p-2 pointer-events-none">
        <div className="flex items-center space-x-1.5 rounded-full border border-omx-border bg-omx-bg/95 backdrop-blur-md px-3 py-1.5 text-xs font-sora font-semibold text-omx-text shadow-md group-hover:border-omx-brand group-hover:text-omx-brand transition-all whitespace-nowrap">
          <Lock className="h-3.5 w-3.5 text-omx-brand shrink-0" />
          <span>{inlineMessage}</span>
        </div>
      </div>
    </div>
  );
};
