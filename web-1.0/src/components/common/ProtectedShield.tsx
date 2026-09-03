import React from 'react';
import { Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export type ProtectedRouteType = 'portfolio' | 'wallet' | 'activity' | 'settings';

interface ProtectedShieldProps {
  route: ProtectedRouteType;
}

const SHIELD_SUBTITLES: Record<ProtectedRouteType, string> = {
  portfolio: 'Sign in to view your positions and trade history.',
  wallet: 'Sign in to deposit, withdraw, and manage your balance.',
  activity: 'Sign in to view your trading activity.',
  settings: 'Sign in to manage your account, security, and preferences.',
};

export const ProtectedShield: React.FC<ProtectedShieldProps> = ({ route }) => {
  const { openAuthModal } = useAuth();

  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 py-12 animate-in fade-in duration-200">
      {/* Shield Icon */}
      <div className="mb-4 text-omx-text-muted/70">
        <Shield className="w-14 h-14 stroke-[1.5]" />
      </div>

      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-omx-text mb-2">
        Sign in required
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-omx-text-secondary max-w-md mb-6">
        {SHIELD_SUBTITLES[route]}
      </p>

      {/* Sign In CTA Button */}
      <button
        onClick={() => openAuthModal('signin')}
        className="px-6 py-2.5 rounded-omx-md border border-omx-border bg-omx-card hover:bg-omx-hover active:scale-[0.98] text-sm font-semibold text-omx-text transition-all shadow-sm"
      >
        Sign In
      </button>
    </div>
  );
};
