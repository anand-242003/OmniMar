// eslint-disable-next-line react-refresh/only-export-components
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';

export type KycStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED';
export type AuthProviderType = 'email' | 'google' | 'apple' | 'wallet';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarInitials: string;
  isGuest: boolean;
  provider?: AuthProviderType;
  kycStatus: KycStatus;
}

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  authNotice: string | null;
  clearAuthNotice: () => void;
  loginAsGuest: () => void;
  // loginWithEmail now handled via components, but we keep signature for compat
  loginWithEmail: (email: string) => { isNewUser: boolean };
  loginWithOAuth: (provider: 'google' | 'apple' | 'wallet') => { isNewUser: boolean };
  setKycStatus: (status: KycStatus) => void;
  logout: () => void;
}

const GUEST_USER: User = {
  id: 'guest-session',
  email: 'guest@sandbox.local',
  name: 'Guest Forecaster',
  avatarInitials: 'GF',
  isGuest: true,
  kycStatus: 'UNVERIFIED',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ready, authenticated, user: privyUser, logout: privyLogout } = usePrivy();
  
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('omx_auth_user_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return GUEST_USER;
  });

  const [authNotice, setAuthNotice] = useState<string | null>(null);

  // Sync Privy state with our local User object
  useEffect(() => {
    if (ready && authenticated && privyUser) {
      let email = 'user@example.com';
      let provider: AuthProviderType = 'wallet';
      let name = 'Trader';
      
      if (privyUser.email) {
        email = privyUser.email.address;
        provider = 'email';
        name = email.split('@')[0];
      } else if (privyUser.google) {
        email = privyUser.google.email || 'googleuser@example.com';
        provider = 'google';
        name = privyUser.google.name || 'Google User';
      } else if (privyUser.apple) {
        email = privyUser.apple.email || 'appleuser@example.com';
        provider = 'apple';
        name = 'Apple User';
      } else if (privyUser.wallet) {
        email = `${privyUser.wallet.address.slice(0, 6)}...${privyUser.wallet.address.slice(-4)}`;
        provider = 'wallet';
        name = email;
      }
      
      const loggedInUser: User = {
        id: privyUser.id,
        email,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        avatarInitials: provider === 'wallet' ? '0X' : name.substring(0, 2).toUpperCase(),
        isGuest: false,
        provider,
        kycStatus: user.kycStatus || 'UNVERIFIED',
      };
      
      setUser(loggedInUser);
    } else if (ready && !authenticated) {
      // If privy is ready and not authenticated, ensure we revert to guest if we were a real user
      if (!user.isGuest) {
        setUser(GUEST_USER);
      }
    }
  }, [ready, authenticated, privyUser]);

  useEffect(() => {
    localStorage.setItem('omx_auth_user_v2', JSON.stringify(user));
  }, [user]);

  const clearAuthNotice = () => setAuthNotice(null);

  const getKnownAccounts = (): Record<string, User> => {
    try {
      const db = localStorage.getItem('omx_known_accounts_v2');
      return db ? JSON.parse(db) : {};
    } catch {
      return {};
    }
  };

  const saveAccount = (u: User) => {
    const db = getKnownAccounts();
    db[u.email.toLowerCase()] = u;
    localStorage.setItem('omx_known_accounts_v2', JSON.stringify(db));
  };

  const loginWithEmail = (_email: string): { isNewUser: boolean } => {
    return { isNewUser: false }; // Actually handled by useLoginWithEmail hook in UI
  };

  const loginWithOAuth = (_provider: 'google' | 'apple' | 'wallet'): { isNewUser: boolean } => {
    // We let the UI components handle the actual Privy calls
    return { isNewUser: false }; 
  };

  const setKycStatus = (status: KycStatus) => {
    setUser((prev) => {
      const updated = { ...prev, kycStatus: status };
      if (!updated.isGuest) {
        saveAccount(updated);
      }
      return updated;
    });
  };

  const loginAsGuest = () => {
    setUser(GUEST_USER);
  };

  const logout = () => {
    privyLogout();
    setUser(GUEST_USER);
    setAuthNotice('Logged out. Switched back to Guest Demo Mode.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !user.isGuest,
        authNotice,
        clearAuthNotice,
        loginAsGuest,
        loginWithEmail,
        loginWithOAuth,
        setKycStatus,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
