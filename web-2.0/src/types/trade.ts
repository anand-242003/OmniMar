export type Outcome = 'YES' | 'NO';
export type TradeAction = 'BUY' | 'SELL';

export interface DemoPosition {
  id: string;
  marketId: string;
  marketQuestion: string;
  outcome: Outcome;
  shares: number;          // e.g. 38.4615
  avgPriceCents: number;   // e.g. 65 (cents)
  totalCostUsdc: number;   // e.g. 25.00
  currentPriceCents: number; // live price in cents
  currentValueUsdc: number;  // (shares * currentPriceCents) / 100
  potentialPayoutUsdc: number; // shares * $1.00
  potentialProfitUsdc: number; // potentialPayoutUsdc - totalCostUsdc
  pnlUsdc: number;          // currentValueUsdc - totalCostUsdc
  pnlPercentage: number;
  acquiredAt: string;
}

export interface DemoTrade {
  id: string;
  orderNumber: string; // e.g. "OMX-9821" (Clean consumer ID per M10.1, no hex hashes!)
  marketId: string;
  marketQuestion: string;
  action: TradeAction;
  outcome: Outcome;
  stakeUsdc: number;
  shares: number;
  priceCents: number;
  potentialPayoutUsdc: number;
  potentialProfitUsdc: number;
  timestamp: string;
  sharedToFeed: boolean;
}

export interface TradeReceipt {
  orderNumber: string;
  marketId: string;
  marketQuestion: string;
  outcome: Outcome;
  stakeUsdc: number;
  shares: number;
  priceCents: number;
  potentialPayoutUsdc: number;
  potentialProfitUsdc: number;
  roiPercentage: number;
  timestamp: string;
}
