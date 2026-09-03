import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarInitials: string;
  isGuest: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginAsGuest: () => void;
  loginWithEmail: (email: string) => void;
  logout: () => void;
}

const GUEST_USER: User = {
  id: 'guest-session',
  email: 'guest@sandbox.local',
  name: 'Demo Forecaster',
  avatarInitials: 'DF',
  isGuest: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('omx_auth_user_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    // Default to Guest User so any visitor can immediately trade in sandbox!
    return GUEST_USER;
  });

  const loginAsGuest = () => {
    setUser(GUEST_USER);
    localStorage.setItem('omx_auth_user_v2', JSON.stringify(GUEST_USER));
  };

  const loginWithEmail = (email: string) => {
    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email,
      name: email.split('@')[0],
      avatarInitials: email.substring(0, 2).toUpperCase(),
      isGuest: false,
    };
    setUser(newUser);
    localStorage.setItem('omx_auth_user_v2', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(GUEST_USER); // Revert to guest demo sandbox
    localStorage.setItem('omx_auth_user_v2', JSON.stringify(GUEST_USER));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user ? !user.isGuest : false,
        loginAsGuest,
        loginWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
