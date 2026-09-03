export interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryIcon: string;
  memberCount: number;
  avatarLetter: string;
  avatarBg?: string;
  featured?: boolean;
}

export interface GroupDiscussion {
  id: string;
  title: string;
  groupName: string;
  commentsCount: number;
  timeAgo: string;
  avatarLetter: string;
}

export const GROUP_CATEGORIES = [
  { id: 'all', label: 'All Groups' },
  { id: 'gaming', label: '🎮 Gaming' },
  { id: 'crypto', label: '₿ Crypto' },
  { id: 'politics', label: '🗳️ Politics' },
  { id: 'sports', label: '⚽ Sports' },
  { id: 'economy', label: '💰 Economy' },
  { id: 'entertainment', label: '🎬 Entertainment' },
  { id: 'tech', label: '🤖 Tech' },
];

export const GROUPS_FIXTURES: Group[] = [
  {
    id: 'grp-entertainment',
    name: 'Entertainment predictions insights',
    description: 'Talking about entertainment markets, box office tracking, and awards.',
    category: 'ENTERTAINMENT',
    categoryIcon: '🎬',
    memberCount: 29,
    avatarLetter: 'E',
    avatarBg: 'bg-indigo-950 text-indigo-400 border-indigo-800',
  },
  {
    id: 'grp-crypto',
    name: 'Crypto Forecasters Elite',
    description: 'Analysis on Bitcoin halving cycles, ETF flows, and decentralized derivatives.',
    category: 'CRYPTO',
    categoryIcon: '₿',
    memberCount: 142,
    avatarLetter: 'C',
    avatarBg: 'bg-amber-950 text-amber-400 border-amber-800',
  },
  {
    id: 'grp-politics',
    name: 'Politics & Strategy',
    description: 'Elections, legislative odds, and policy forecasts around the world.',
    category: 'POLITICS',
    categoryIcon: '🗳️',
    memberCount: 64,
    avatarLetter: 'P',
    avatarBg: 'bg-purple-950 text-purple-400 border-purple-800',
  },
  {
    id: 'grp-tech',
    name: 'Tech & AI Horizons',
    description: 'Frontier AI models, chip architecture, and mega-cap earnings predictions.',
    category: 'TECH',
    categoryIcon: '🤖',
    memberCount: 88,
    avatarLetter: 'T',
    avatarBg: 'bg-cyan-950 text-cyan-400 border-cyan-800',
  },
  {
    id: 'grp-sports',
    name: 'Global Sports Betting Analysis',
    description: 'Premier League, ICC World Cup, Formula 1 and championship prediction lines.',
    category: 'SPORTS',
    categoryIcon: '⚽',
    memberCount: 95,
    avatarLetter: 'S',
    avatarBg: 'bg-emerald-950 text-emerald-400 border-emerald-800',
  },
];

export const TOP_GROUPS_FIXTURES = [
  {
    id: 'grp-entertainment',
    name: 'Entertainment...',
    memberCount: 29,
    delta: '+24',
    avatarLetter: 'E',
  },
  {
    id: 'grp-crypto',
    name: 'Crypto Forecasters...',
    memberCount: 142,
    delta: '+18',
    avatarLetter: 'C',
  },
  {
    id: 'grp-sports',
    name: 'Global Sports...',
    memberCount: 95,
    delta: '+12',
    avatarLetter: 'S',
  },
];

export const ACTIVE_DISCUSSIONS_FIXTURES: GroupDiscussion[] = [
  {
    id: 'disc-1',
    title: 'Ramayana movie',
    groupName: 'Entertainment...',
    commentsCount: 2,
    timeAgo: '2h',
    avatarLetter: 'E',
  },
  {
    id: 'disc-2',
    title: 'Welcome to OmniMarketX',
    groupName: 'Entertainment...',
    commentsCount: 5,
    timeAgo: '1d',
    avatarLetter: 'E',
  },
  {
    id: 'disc-3',
    title: 'Trending',
    groupName: 'Land of Politics · 3w',
    commentsCount: 8,
    timeAgo: '3w',
    avatarLetter: 'L',
  },
];
