export interface SocialStory {
  id: string;
  name: string;
  initials: string;
  isCurrentUser?: boolean;
  avatarGradient?: string;
}

export interface TrendingHashtag {
  tag: string;
  postsCount: number;
  delta: string;
}

export interface SocialPost {
  id: string;
  authorName: string;
  authorHandle: string;
  authorInitials: string;
  timestamp: string;
  timeAgo: string;
  content: string;
  sentiment?: 'BULLISH' | 'BEARISH';
  marketId?: string;
  marketTitle?: string;
  predictedOutcome?: 'YES' | 'NO';
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  isLiked?: boolean;
  category: 'for_you' | 'following' | 'top' | 'latest';
}

export const STORIES_FIXTURES: SocialStory[] = [
  {
    id: 'story-user',
    name: 'Your Story',
    initials: 'Y',
    isCurrentUser: true,
  },
  {
    id: 'story-anant',
    name: 'Anant',
    initials: 'AS',
    avatarGradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'story-jayraj',
    name: 'Jayraj',
    initials: 'JD',
    avatarGradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'story-bala',
    name: 'Bala',
    initials: 'BB',
    avatarGradient: 'from-fuchsia-500 to-rose-600',
  },
  {
    id: 'story-siva',
    name: 'Siva',
    initials: 'SK',
    avatarGradient: 'from-rose-500 to-orange-500',
  },
];

export const TRENDING_HASHTAGS_FIXTURES: TrendingHashtag[] = [
  { tag: '#omnimarketx', postsCount: 8, delta: '+0%' },
  { tag: '#futurefoundry', postsCount: 7, delta: '+0%' },
  { tag: '#producttesting', postsCount: 4, delta: '+0%' },
  { tag: '#predictionmarket', postsCount: 4, delta: '+0%' },
  { tag: '#fintech', postsCount: 3, delta: '+0%' },
  { tag: '#productthinking', postsCount: 1, delta: '+0%' },
  { tag: '#startups', postsCount: 1, delta: '+0%' },
  { tag: '#trading', postsCount: 1, delta: '+0%' },
  { tag: '#learning', postsCount: 1, delta: '+0%' },
];

export const SOCIAL_POSTS_FIXTURES: SocialPost[] = [
  {
    id: 'sp-1',
    authorName: 'Sanskari Vibe',
    authorHandle: '@sanskarivibe',
    authorInitials: 'SV',
    timestamp: '2026-08-28T10:00:00.000Z',
    timeAgo: '6d',
    content: "I think platform is new... But i like social concept with markets... Have same issue but i hope in future it will fixed... Can't wait to trade 😊",
    sentiment: 'BEARISH',
    likesCount: 16,
    commentsCount: 4,
    repostsCount: 1,
    category: 'for_you',
  },
  {
    id: 'sp-2',
    authorName: 'Dragon Emperor',
    authorHandle: '@dragonemperor',
    authorInitials: 'DE',
    timestamp: '2026-08-30T14:30:00.000Z',
    timeAgo: '4d',
    content: 'Ramayana has monumental hype across domestic and overseas diaspora markets. ₹1,500 Cr is achievable with IMAX screen count and holiday window!',
    sentiment: 'BULLISH',
    marketId: 'will-ramayana-part-one-gross-1500cr',
    marketTitle: 'Will Ramayana: Part One gross at least ₹1,500 crore worldwide?',
    predictedOutcome: 'YES',
    likesCount: 42,
    commentsCount: 11,
    repostsCount: 5,
    category: 'top',
  },
  {
    id: 'sp-3',
    authorName: 'Vimal Prakash yadav',
    authorHandle: '@vimalprakash',
    authorInitials: 'VP',
    timestamp: '2026-08-29T11:15:00.000Z',
    timeAgo: '5d',
    content: 'Avengers: Doomsday box office projections look massive with Downey Jr. return. Opening weekend numbers will be historic.',
    sentiment: 'BULLISH',
    marketId: 'will-avengers-doomsday-gross-1b-opening-weekend',
    marketTitle: 'Will Avengers: Doomsday earn at least $1 billion worldwide during its opening weekend?',
    predictedOutcome: 'YES',
    likesCount: 24,
    commentsCount: 8,
    repostsCount: 3,
    category: 'for_you',
  },
  {
    id: 'sp-4',
    authorName: 'Ashwani Kumar',
    authorHandle: '@ashwanikumar',
    authorInitials: 'AK',
    timestamp: '2026-08-31T09:40:00.000Z',
    timeAgo: '3d',
    content: 'Macro indicators suggesting rate cuts will be postponed until late Q4. Positioning cautious on banking indexes.',
    sentiment: 'BEARISH',
    marketId: 'will-rbi-cut-repo-rate-in-next-mpc-meeting',
    marketTitle: 'Will RBI cut repo rate in next MPC meeting?',
    predictedOutcome: 'NO',
    likesCount: 19,
    commentsCount: 6,
    repostsCount: 2,
    category: 'latest',
  },
  {
    id: 'sp-5',
    authorName: 'Sudip Paul',
    authorHandle: '@sudippaul',
    authorInitials: 'SP',
    timestamp: '2026-09-01T16:20:00.000Z',
    timeAgo: '2d',
    content: 'Testing the demo trade engine on politics markets. Instant fills and very clean order slip UX!',
    likesCount: 9,
    commentsCount: 2,
    repostsCount: 0,
    category: 'following',
  },
];
