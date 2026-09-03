export type Theme = 'dark' | 'light';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl?: string;
  virtualBalance: number; // in USDC
  realBalance: number;
}

export type RoutePath =
  | '/'
  | '/home'
  | '/markets'
  | `/markets/${string}`
  | '/trending'
  | '/activity'
  | '/leaderboard'
  | '/social'
  | '/groups'
  | '/portfolio'
  | '/wallet'
  | '/settings';

export interface NavItem {
  label: string;
  path: string;
  iconName: string;
}
