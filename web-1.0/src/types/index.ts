export type Theme = 'dark' | 'light';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl?: string;
  virtualBalance: number; // in USDC (default 10,000)
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

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Market {
  id: string;
  title: string;
  category: string;
  categoryIcon: string;
  probability: number;
  delta: number;
  yesPrice: number; // in cents, e.g. 50 or 49.5
  noPrice: number;  // in cents, e.g. 50 or 50.5
  volume: number;
  traders: number;
  closesDate: string;
  createdAt: string;
  sparkline: number[];
  isTopMarket?: boolean;
  isMovers?: boolean;
  isRising?: boolean;
  isFalling?: boolean;
  isNew?: boolean;
  isClosingSoon?: boolean;
  isFavorite?: boolean;
  description?: string;
  resolutionCriteria?: string;
  resolutionSource?: string;
  detailsCreatedDate?: string;
}

export type MarketSortOption = 'Volume' | 'Newest' | 'Probability';

export type QuickFilterOption =
  | 'ALL'
  | 'HIGH VOLUME'
  | 'RISING'
  | 'FALLING'
  | 'NEW'
  | 'CLOSING SOON'
  | 'FAVORITES';

export type TradeOutcome = 'YES' | 'NO';
export type TradeAction = 'BUY' | 'SELL';
export type TradeMode = 'REAL' | 'DEMO';

export interface DemoPosition {
  id: string;
  marketId: string;
  marketTitle: string;
  category: string;
  categoryIcon: string;
  outcome: TradeOutcome;
  shares: number;
  avgPrice: number; // in cents
  totalInvested: number; // in dollars (USDC)
  currentPrice: number; // in cents
  currentValue: number; // in dollars
  pnl: number;
  pnlPercent: number;
  updatedAt: string;
}

export interface DemoTrade {
  id: string;
  marketId: string;
  marketTitle: string;
  action: TradeAction;
  outcome: TradeOutcome;
  amount: number; // in USDC
  shares: number;
  price: number; // in cents
  timestamp: string;
}

export interface SocialPredictionEvent {
  id: string;
  authorName: string;
  authorHandle: string;
  avatarUrl?: string;
  marketId: string;
  marketTitle: string;
  outcome: TradeOutcome;
  text: string;
  timestamp: string;
}

export interface SearchPostResult {
  id: string;
  authorName: string;
  authorHandle: string;
  initials: string;
  marketTitle: string;
  outcome: 'YES' | 'NO';
  timestamp: string;
}
