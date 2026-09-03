export interface LeaderboardTrader {
  id: string;
  rank: number;
  name: string;
  handle: string;
  avatarInitials: string;
  avatarBg: string;
  pnl: number; // in USDC
  pnlPercent: number;
  winRate: number; // percentage (0-100)
  totalTrades: number;
  timeframe: 'daily' | 'weekly' | 'monthly' | 'all_time';
  category: string;
}

export const LEADERBOARD_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'gaming', label: '🎮 Gaming' },
  { id: 'crypto', label: '₿ Crypto' },
  { id: 'politics', label: '🗳️ Politics' },
  { id: 'sports', label: '⚽ Sports' },
  { id: 'economy', label: '💰 Economy' },
  { id: 'entertainment', label: '🎬 Entertainment' },
  { id: 'tech', label: '🤖 Tech' },
];

export const LEADERBOARD_FIXTURES: LeaderboardTrader[] = [
  // All Time Rankings
  {
    id: 'trader-1',
    rank: 1,
    name: 'AlphaOracle',
    handle: '@alphaoracle',
    avatarInitials: 'AO',
    avatarBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    pnl: 48920.5,
    pnlPercent: 244.6,
    winRate: 84,
    totalTrades: 312,
    timeframe: 'all_time',
    category: 'all',
  },
  {
    id: 'trader-2',
    rank: 2,
    name: 'Dragon Emperor',
    handle: '@dragonemperor',
    avatarInitials: 'DE',
    avatarBg: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    pnl: 34180.0,
    pnlPercent: 170.9,
    winRate: 79,
    totalTrades: 245,
    timeframe: 'all_time',
    category: 'all',
  },
  {
    id: 'trader-3',
    rank: 3,
    name: 'Sanskari Vibe',
    handle: '@sanskarivibe',
    avatarInitials: 'SV',
    avatarBg: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    pnl: 22840.25,
    pnlPercent: 114.2,
    winRate: 72,
    totalTrades: 189,
    timeframe: 'all_time',
    category: 'all',
  },
  {
    id: 'trader-4',
    rank: 4,
    name: 'Vimal Prakash yadav',
    handle: '@vimalprakash',
    avatarInitials: 'VP',
    avatarBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    pnl: 18450.0,
    pnlPercent: 92.3,
    winRate: 68,
    totalTrades: 154,
    timeframe: 'all_time',
    category: 'all',
  },
  {
    id: 'trader-5',
    rank: 5,
    name: 'Ashwani Kumar',
    handle: '@ashwanikumar',
    avatarInitials: 'AK',
    avatarBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    pnl: 15200.75,
    pnlPercent: 76.0,
    winRate: 65,
    totalTrades: 128,
    timeframe: 'all_time',
    category: 'all',
  },

  // Weekly Rankings
  {
    id: 'trader-w1',
    rank: 1,
    name: 'MacroWhale',
    handle: '@macrowhale',
    avatarInitials: 'MW',
    avatarBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    pnl: 8450.0,
    pnlPercent: 84.5,
    winRate: 91,
    totalTrades: 38,
    timeframe: 'weekly',
    category: 'all',
  },
  {
    id: 'trader-w2',
    rank: 2,
    name: 'Dragon Emperor',
    handle: '@dragonemperor',
    avatarInitials: 'DE',
    avatarBg: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    pnl: 6120.0,
    pnlPercent: 61.2,
    winRate: 82,
    totalTrades: 29,
    timeframe: 'weekly',
    category: 'all',
  },
  {
    id: 'trader-w3',
    rank: 3,
    name: 'Sudip Paul',
    handle: '@sudippaul',
    avatarInitials: 'SP',
    avatarBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    pnl: 4350.0,
    pnlPercent: 43.5,
    winRate: 75,
    totalTrades: 22,
    timeframe: 'weekly',
    category: 'all',
  },

  // Daily Rankings
  {
    id: 'trader-d1',
    rank: 1,
    name: 'SpeedPredictor',
    handle: '@speedpredictor',
    avatarInitials: 'SP',
    avatarBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    pnl: 2400.0,
    pnlPercent: 48.0,
    winRate: 100,
    totalTrades: 12,
    timeframe: 'daily',
    category: 'all',
  },
  {
    id: 'trader-d2',
    rank: 2,
    name: 'Sanskari Vibe',
    handle: '@sanskarivibe',
    avatarInitials: 'SV',
    avatarBg: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    pnl: 1850.0,
    pnlPercent: 37.0,
    winRate: 85,
    totalTrades: 14,
    timeframe: 'daily',
    category: 'all',
  },
];
