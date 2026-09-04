export interface ActivityItem {
  id: string;
  type: 'TRADE' | 'CASHOUT' | 'THESIS' | 'GUILD' | 'FAUCET';
  title: string;
  description: string;
  timestamp: string;
  timeAgo: string;
  metadata?: {
    orderNumber?: string;
    marketId?: string;
    amount?: number;
    outcome?: string;
    groupId?: string;
  };
}

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'TRADE',
    title: 'Executed YES Prediction',
    description: 'Staked $250.00 on "Will the Federal Reserve cut the federal funds target rate at the September 2026 FOMC meeting?" at 72¢/share.',
    timestamp: '2026-09-03T18:45:00Z',
    timeAgo: '15m ago',
    metadata: {
      orderNumber: 'OMX-7412',
      marketId: 'will-fed-cut-rates-september-2026',
      amount: 250.0,
      outcome: 'YES',
    },
  },
  {
    id: 'act-2',
    type: 'THESIS',
    title: 'Published Forecast Thesis',
    description: 'Shared empirical thesis on Take-Two FY27 marketing window in Community & Pulse.',
    timestamp: '2026-09-03T16:15:00Z',
    timeAgo: '2h ago',
    metadata: {
      marketId: 'will-gta-vi-release-before-december-2026',
    },
  },
  {
    id: 'act-3',
    type: 'GUILD',
    title: 'Joined Forecaster Guild',
    description: 'Became an active member of "Macro & Central Bank Forecasters" guild.',
    timestamp: '2026-09-03T14:30:00Z',
    timeAgo: '4h ago',
    metadata: {
      groupId: 'grp-macro',
    },
  },
  {
    id: 'act-4',
    type: 'FAUCET',
    title: 'Sandbox Faucet Allocation',
    description: 'Received $10,000.00 initial practice USDC sandbox allocation for risk-free forecasting.',
    timestamp: '2026-09-03T09:00:00Z',
    timeAgo: '9h ago',
    metadata: {
      amount: 10000.0,
    },
  },
];
