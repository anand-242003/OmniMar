export interface SocialPost {
  id: string;
  authorName: string;
  authorHandle: string;
  authorInitials: string;
  authorRole: string;
  timestamp: string;
  timeAgo: string;
  content: string;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  marketId?: string;
  marketQuestion?: string;
  marketCategory?: string;
  marketOddsYes?: number;      // Current consensus (live-ish)
  oddsAtPost?: number;          // Historical — probability at time post was made
  predictedOutcome?: 'YES' | 'NO';
  positionStatus?: 'OPEN' | 'CLOSED' | 'SETTLED';
  settledOutcome?: 'WON' | 'LOST';
  isDemo?: boolean;             // True when prediction is in the sandbox/demo context
  likesCount: number;
  isLiked?: boolean;
  commentsCount: number;
}

export const INITIAL_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'sp-1',
    authorName: 'Dr. Elena Rostova',
    authorHandle: '@erostova_macro',
    authorInitials: 'ER',
    authorRole: 'Senior Macroeconomist',
    timestamp: '2026-09-03T18:30:00Z',
    timeAgo: '2h ago',
    content: 'Labor cooling in the August payroll numbers reinforces the September 25bps cut thesis. Core PCE trend supports easing without destabilizing inflation expectations.',
    sentiment: 'BULLISH',
    marketId: 'will-fed-cut-rates-september-2026',
    marketQuestion: 'Will the Federal Reserve cut the federal funds target rate at the September 2026 FOMC meeting?',
    marketCategory: 'Macro & Politics',
    oddsAtPost: 68,
    marketOddsYes: 72,
    predictedOutcome: 'YES',
    positionStatus: 'OPEN',
    isDemo: false,
    likesCount: 38,
    isLiked: false,
    commentsCount: 9,
  },
  {
    id: 'sp-2',
    authorName: 'Marcus Vance',
    authorHandle: '@marcus_v',
    authorInitials: 'MV',
    authorRole: 'Gaming Industry Analyst',
    timestamp: '2026-09-03T16:15:00Z',
    timeAgo: '4h ago',
    content: 'Take-Two reiterated their FY27 marketing budget allocation on the latest investor call. Historically, Rockstar requires a 6-month ramp post-Trailer 2, making late October 2026 the highest probability window.',
    sentiment: 'BULLISH',
    marketId: 'will-gta-vi-release-before-december-2026',
    marketQuestion: 'Will Grand Theft Auto VI officially release worldwide before December 1, 2026?',
    marketCategory: 'Entertainment',
    oddsAtPost: 65,
    marketOddsYes: 65,
    predictedOutcome: 'YES',
    positionStatus: 'SETTLED',
    settledOutcome: 'WON',
    isDemo: true,
    likesCount: 54,
    isLiked: true,
    commentsCount: 16,
  },
  {
    id: 'sp-3',
    authorName: 'Sarah Jenkins',
    authorHandle: '@sjenkins_aero',
    authorInitials: 'SJ',
    authorRole: 'Space Systems Engineer',
    timestamp: '2026-09-03T12:45:00Z',
    timeAgo: '8h ago',
    content: 'The thermal protection tile upgrades on Starship Flight 6 showed zero burn-through on reentry flaps. Booster catch trajectory is locked down, but orbital ship catch still has significant aero loads to solve.',
    sentiment: 'BEARISH',
    marketId: 'spacex-starship-orbital-catch-2026',
    marketQuestion: 'Will SpaceX successfully catch the Starship upper stage with the Mechazilla tower in 2026?',
    marketCategory: 'Technology',
    oddsAtPost: 48,
    marketOddsYes: 42,
    predictedOutcome: 'NO',
    positionStatus: 'SETTLED',
    settledOutcome: 'LOST',
    isDemo: false,
    likesCount: 29,
    isLiked: false,
    commentsCount: 7,
  },
  {
    id: 'sp-4',
    authorName: 'David Chen',
    authorHandle: '@dchen_crypto',
    authorInitials: 'DC',
    authorRole: 'Digital Asset Strategist',
    timestamp: '2026-09-02T21:00:00Z',
    timeAgo: '1d ago',
    content: 'Institutional ETF net inflows reached new quarterly records while liquid exchange balances hit 6-year lows. $150k target before year-end requires sustained sovereign reserve accumulation.',
    sentiment: 'NEUTRAL',
    marketId: 'bitcoin-reach-150k-by-end-of-2026',
    marketQuestion: 'Will Bitcoin reach or exceed $150,000 before December 31, 2026?',
    marketCategory: 'Crypto',
    oddsAtPost: 41,
    marketOddsYes: 38,
    predictedOutcome: 'YES',
    positionStatus: 'CLOSED',
    isDemo: true,
    likesCount: 47,
    isLiked: false,
    commentsCount: 12,
  },
];
