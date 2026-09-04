export interface GroupDiscussion {
  id: string;
  authorName: string;
  authorInitials: string;
  authorRole: string;
  content: string;
  timeAgo: string;
  likesCount: number;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  category: 'Macroeconomics' | 'Technology & AI' | 'Entertainment' | 'Crypto' | 'Sports';
  memberCount: number;
  initials: string;
  isJoined?: boolean;
  featuredMarketId?: string;
  featuredMarketQuestion?: string;
  weeklyVolume: number;
  discussions?: GroupDiscussion[];
}

export const INITIAL_GROUPS: Group[] = [
  {
    id: 'grp-macro',
    name: 'Macro & Central Bank Forecasters',
    description: 'Empirical analysis on FOMC rate decisions, inflation telemetry, and sovereign bond spreads.',
    category: 'Macroeconomics',
    memberCount: 342,
    initials: 'MC',
    isJoined: false,
    featuredMarketId: 'will-fed-cut-rates-september-2026',
    featuredMarketQuestion: 'Will the Federal Reserve cut the federal funds target rate at the September 2026 FOMC meeting?',
    weeklyVolume: 42800,
    discussions: [
      {
        id: 'disc-macro-1',
        authorName: 'Dr. Elena Rostova',
        authorInitials: 'ER',
        authorRole: 'Senior Macroeconomist',
        content: 'August payroll revisions confirm the labor cooling trend. The 3-month moving average for core PCE is now below the implicit 2.5% threshold Powell referenced in July. I see 25bps as locked in — the debate is about forward guidance language.',
        timeAgo: '3h ago',
        likesCount: 21,
      },
      {
        id: 'disc-macro-2',
        authorName: 'James Okafor',
        authorInitials: 'JO',
        authorRole: 'Fixed Income Strategist',
        content: 'Fed funds futures pricing 94% probability of cut as of this morning. Any sustained hawkish repricing needs a CPI surprise above 0.4% MoM — currently tracking at 0.2%. The asymmetric risk now is NO if a geopolitical shock pushes energy prices.',
        timeAgo: '5h ago',
        likesCount: 14,
      },
      {
        id: 'disc-macro-3',
        authorName: 'Priya Nair',
        authorInitials: 'PN',
        authorRole: 'Rates Analyst',
        content: 'Interesting — I\'m tracking the SOFR curve. 3-month SOFR is pricing exactly 25bps of cuts by FOMC day, no more. This suggests the market is not pricing a 50bps surprise. Resolution source is the official FOMC statement — clear.',
        timeAgo: '1d ago',
        likesCount: 9,
      },
    ],
  },
  {
    id: 'grp-ai-systems',
    name: 'Frontier AI & Compute Guild',
    description: 'Tracking frontier model benchmarks, AI hardware silicon yields, and sovereign regulatory compliance.',
    category: 'Technology & AI',
    memberCount: 512,
    initials: 'FA',
    isJoined: false,
    featuredMarketId: 'eu-ai-act-first-major-fine-2026',
    featuredMarketQuestion: 'Will the EU AI Office issue its first enforcement fine exceeding €10M before December 31, 2026?',
    weeklyVolume: 31500,
    discussions: [
      {
        id: 'disc-ai-1',
        authorName: 'Marcus Vance',
        authorInitials: 'MV',
        authorRole: 'AI Policy Analyst',
        content: 'The EU AI Office has 3 open investigations as of Q3. Any one of them could result in a fine by Q4. The bottleneck is the appeals process — companies have 30 days. If a fine is issued in October, it could still be contested before December.',
        timeAgo: '6h ago',
        likesCount: 18,
      },
      {
        id: 'disc-ai-2',
        authorName: 'Sarah Jenkins',
        authorInitials: 'SJ',
        authorRole: 'Regulatory Compliance Lead',
        content: 'Key question is whether the fine must be paid or just issued. Resolution source states "enforce" — I read that as issued + not successfully appealed. This lowers the probability significantly given timelines.',
        timeAgo: '1d ago',
        likesCount: 11,
      },
      {
        id: 'disc-ai-3',
        authorName: 'Dr. Elena Rostova',
        authorInitials: 'ER',
        authorRole: 'Senior Macroeconomist',
        content: 'From a political economy lens: the EU has strong incentives to make an example before the US election creates further geopolitical uncertainty. Expect a symbolic first fine — likely against a well-resourced US provider who can handle the PR.',
        timeAgo: '2d ago',
        likesCount: 7,
      },
    ],
  },
  {
    id: 'grp-space-aero',
    name: 'Aerospace & Orbital Dynamics',
    description: 'Technical telemetry, launch cadence metrics, and propulsion engineering for orbital propositions.',
    category: 'Technology & AI',
    memberCount: 285,
    initials: 'AO',
    isJoined: false,
    featuredMarketId: 'spacex-starship-orbital-catch-2026',
    featuredMarketQuestion: 'Will SpaceX successfully catch the Starship upper stage with the Mechazilla tower in 2026?',
    weeklyVolume: 19400,
    discussions: [
      {
        id: 'disc-space-1',
        authorName: 'Sarah Jenkins',
        authorInitials: 'SJ',
        authorRole: 'Space Systems Engineer',
        content: 'Booster catch is solved. The orbital ship catch is a different aerodynamic challenge entirely — the vehicle is 14x heavier and the TPS tiles create asymmetric drag that the catch mechanism has never seen in simulation at re-entry velocity. 58% NO feels about right.',
        timeAgo: '4h ago',
        likesCount: 32,
      },
      {
        id: 'disc-space-2',
        authorName: 'David Chen',
        authorInitials: 'DC',
        authorRole: 'Propulsion Engineer',
        content: 'Flight 7 manifest shows a raptor 3 production upgrade for upper stage that wasn\'t in the original 2026 cadence. SpaceX tends to solve hard problems faster than expected. But "successfully catch" per resolution source requires first attempt success — not just catching eventually.',
        timeAgo: '8h ago',
        likesCount: 19,
      },
    ],
  },
  {
    id: 'grp-boxoffice',
    name: 'Entertainment Analytics Club',
    description: 'Box office multiplier projections, commercial studio release windows, and gaming franchise sales.',
    category: 'Entertainment',
    memberCount: 194,
    initials: 'EA',
    isJoined: false,
    featuredMarketId: 'will-gta-vi-release-before-december-2026',
    featuredMarketQuestion: 'Will Grand Theft Auto VI officially release worldwide before December 1, 2026?',
    weeklyVolume: 24600,
    discussions: [
      {
        id: 'disc-ent-1',
        authorName: 'Marcus Vance',
        authorInitials: 'MV',
        authorRole: 'Gaming Industry Analyst',
        content: 'Take-Two\'s FY27 fiscal year starts in April 2027. They need GTA VI shipments in the current fiscal year for revenue recognition. October or November 2026 is mathematically required given their public guidance. I have this at 65% YES.',
        timeAgo: '2h ago',
        likesCount: 41,
      },
      {
        id: 'disc-ent-2',
        authorName: 'Priya Nair',
        authorInitials: 'PN',
        authorRole: 'Media Analyst',
        content: 'Physical distribution logistics are the hidden risk — global retail pre-load requires 6 weeks minimum. If there\'s no confirmed ship date announced by September 15, a November release becomes logistically implausible without skipping physical entirely.',
        timeAgo: '1d ago',
        likesCount: 27,
      },
    ],
  },
  {
    id: 'grp-crypto-macro',
    name: 'Digital Assets & Liquidity',
    description: 'Cross-chain liquidity depth, institutional ETF reserves, and layer-1 gas dynamics.',
    category: 'Crypto',
    memberCount: 460,
    initials: 'DA',
    isJoined: false,
    featuredMarketId: 'bitcoin-reach-150k-by-end-of-2026',
    featuredMarketQuestion: 'Will Bitcoin reach or exceed $150,000 before December 31, 2026?',
    weeklyVolume: 51200,
    discussions: [
      {
        id: 'disc-crypto-1',
        authorName: 'David Chen',
        authorInitials: 'DC',
        authorRole: 'Digital Asset Strategist',
        content: 'Institutional ETF net inflows at quarterly highs; exchange BTC reserves at 6-year lows. The supply shock thesis is real — but $150k requires a 67% run from current prices. Historical halving cycles suggest a Q4 2026 peak is plausible but not guaranteed.',
        timeAgo: '1h ago',
        likesCount: 38,
      },
      {
        id: 'disc-crypto-2',
        authorName: 'James Okafor',
        authorInitials: 'JO',
        authorRole: 'Quant Trader',
        content: 'On-chain realized volatility is compressing — BTC tends to trend hard after volatility squeezes. I\'m watching the 90-day realized vol. If we stay below 40% through October, a late-year momentum move becomes more likely. Market is underpriced at 38% in my model.',
        timeAgo: '4h ago',
        likesCount: 23,
      },
    ],
  },
  {
    id: 'grp-premier-league',
    name: 'Football Quantitative Models',
    description: 'Expected goals (xG) metrics, squad depth analytics, and European title run simulations.',
    category: 'Sports',
    memberCount: 230,
    initials: 'FQ',
    isJoined: false,
    featuredMarketId: 'arsenal-win-premier-league-2026',
    featuredMarketQuestion: 'Will Arsenal F.C. win the English Premier League title for the 2025/2026 season?',
    weeklyVolume: 18200,
    discussions: [
      {
        id: 'disc-sports-1',
        authorName: 'Marcus Vance',
        authorInitials: 'MV',
        authorRole: 'Sports Analyst',
        content: 'Arsenal\'s xG differential over the last 10 games is +1.3 per game — top in the league. Their attacking depth post-Saka return and the defensive stability from Raya have stabilized. The question is fixture congestion in November when they have UCL + PL clash.',
        timeAgo: '3h ago',
        likesCount: 16,
      },
      {
        id: 'disc-sports-2',
        authorName: 'Priya Nair',
        authorInitials: 'PN',
        authorRole: 'Statistical Modeller',
        content: 'Running a Monte Carlo over remaining fixtures: Arsenal wins title in 47% of simulations. That\'s higher than the market at 38%. The underpricing is likely because bettors remember the 2022-23 collapse — but this squad has different depth.',
        timeAgo: '6h ago',
        likesCount: 12,
      },
    ],
  },
];
