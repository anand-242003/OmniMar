export interface ChartPoint {
  timestamp: string;
  displayTime: string;
  yesPrice: number; // in cents (e.g. 65)
  noPrice: number;  // in cents (e.g. 35)
  probabilityYes: number; // percentage (e.g. 65)
  volume: number; // volume in USDC
}

export interface MarketDiscussion {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar?: string;
    initials: string;
    winRate: number; // percentage (e.g. 74)
    totalPredictions: number;
    badge?: 'Top 1% Forecaster' | 'Verified Predictor' | 'Macro Analyst';
  };
  sentiment: 'BULLISH' | 'BEARISH';
  outcome: 'YES' | 'NO';
  entryPrice: number; // in cents
  content: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
}

export type MarketOutcomeType = 'binary' | 'multi';

export interface MultiOutcomeOption {
  id: string;
  label: string;
  priceCents: number; // in cents (e.g. 33)
  probability: number; // percentage (e.g. 33)
}

export interface Market {
  id: string;
  question: string;
  category: string;
  categoryIcon: string;
  status: 'ACTIVE' | 'RESOLVED' | 'CLOSING_SOON';
  outcomeType: MarketOutcomeType;
  outcomes?: MultiOutcomeOption[];
  yesPrice: number; // in cents (e.g. 65 for 65¢)
  noPrice: number;  // in cents (e.g. 35 for 35¢)
  impliedProbabilityYes: number; // 65
  impliedProbabilityNo: number;  // 35
  volume24h: number; // in USDC
  totalVolume: number; // in USDC
  predictorsCount: number;
  closingDate: string; // e.g. "Nov 8, 2026"
  createdAt: string;
  description: string;
  resolutionCriteria: string;
  resolutionSource: string;
  history: {
    '1D': ChartPoint[];
    '1W': ChartPoint[];
    '1M': ChartPoint[];
    'ALL': ChartPoint[];
  };
  discussions: MarketDiscussion[];
}
