import React, { createContext, useContext, useEffect, useState } from 'react';
import type { DemoPosition, DemoTrade, Outcome, TradeAction, TradeReceipt } from '../types/trade';

interface TradeContextType {
  balance: number;
  positions: DemoPosition[];
  trades: DemoTrade[];
  executeTrade: (params: {
    marketId: string;
    marketQuestion: string;
    action: TradeAction;
    outcome: Outcome;
    dollarStake: number;
    priceCents: number;
    shareToFeed?: boolean;
  }) => { success: boolean; receipt?: TradeReceipt; error?: string };
  resetDemoBalance: () => void;
  cashOutPosition: (positionId: string, currentPriceCents: number) => { success: boolean; proceeds: number };
}

const INITIAL_BALANCE = 10000.00; // $10,000.00 Virtual USDC

const TradeContext = createContext<TradeContextType | undefined>(undefined);

export const TradeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('omx_balance_v2');
    if (saved) {
      const num = parseFloat(saved);
      if (!isNaN(num)) return num;
    }
    return INITIAL_BALANCE;
  });

  const [positions, setPositions] = useState<DemoPosition[]>(() => {
    const saved = localStorage.getItem('omx_positions_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  const [trades, setTrades] = useState<DemoTrade[]>(() => {
    const saved = localStorage.getItem('omx_trades_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('omx_balance_v2', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('omx_positions_v2', JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    localStorage.setItem('omx_trades_v2', JSON.stringify(trades));
  }, [trades]);

  const executeTrade = ({
    marketId,
    marketQuestion,
    action,
    outcome,
    dollarStake,
    priceCents,
    shareToFeed = false,
  }: {
    marketId: string;
    marketQuestion: string;
    action: TradeAction;
    outcome: Outcome;
    dollarStake: number;
    priceCents: number;
    shareToFeed?: boolean;
  }): { success: boolean; receipt?: TradeReceipt; error?: string } => {
    if (dollarStake <= 0) {
      return { success: false, error: 'Please enter a valid dollar amount greater than $0.' };
    }

    if (dollarStake > balance) {
      return {
        success: false,
        error: `Insufficient demo balance ($${balance.toFixed(2)} available). Reset your demo funds or enter a smaller amount.`,
      };
    }

    const pricePerShare = priceCents / 100; // e.g. 0.65
    // Exact contract share calculation
    const calculatedShares = dollarStake / pricePerShare;
    // Each winning share settles to exactly $1.00 at resolution
    const potentialPayout = calculatedShares * 1.00;
    const potentialProfit = potentialPayout - dollarStake;
    const roiPercentage = ((potentialProfit / dollarStake) * 100);

    // Deduct stake from virtual balance
    const newBalance = Math.max(0, balance - dollarStake);
    setBalance(newBalance);

    // Generate clean consumer order number (NO raw hexadecimal hashes per M10.1!)
    const orderNumber = `OMX-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString();

    const newTrade: DemoTrade = {
      id: 'trd_' + Math.random().toString(36).substring(2, 9),
      orderNumber,
      marketId,
      marketQuestion,
      action,
      outcome,
      stakeUsdc: Number(dollarStake.toFixed(2)),
      shares: Number(calculatedShares.toFixed(4)),
      priceCents,
      potentialPayoutUsdc: Number(potentialPayout.toFixed(2)),
      potentialProfitUsdc: Number(potentialProfit.toFixed(2)),
      timestamp,
      sharedToFeed: shareToFeed,
    };

    setTrades(prev => [newTrade, ...prev]);

    // Update or create position
    setPositions(prev => {
      const existingIndex = prev.findIndex(p => p.marketId === marketId && p.outcome === outcome);
      if (existingIndex >= 0) {
        const existing = prev[existingIndex];
        const combinedShares = existing.shares + calculatedShares;
        const combinedCost = existing.totalCostUsdc + dollarStake;
        const weightedAvgPrice = (combinedCost / combinedShares) * 100;
        const combinedPayout = combinedShares * 1.00;
        const combinedProfit = combinedPayout - combinedCost;
        const combinedValue = (combinedShares * priceCents) / 100;

        const updated: DemoPosition = {
          ...existing,
          shares: Number(combinedShares.toFixed(4)),
          avgPriceCents: Number(weightedAvgPrice.toFixed(1)),
          totalCostUsdc: Number(combinedCost.toFixed(2)),
          currentPriceCents: priceCents,
          currentValueUsdc: Number(combinedValue.toFixed(2)),
          potentialPayoutUsdc: Number(combinedPayout.toFixed(2)),
          potentialProfitUsdc: Number(combinedProfit.toFixed(2)),
          pnlUsdc: Number((combinedValue - combinedCost).toFixed(2)),
          pnlPercentage: Number((((combinedValue - combinedCost) / combinedCost) * 100).toFixed(1)),
        };

        const clone = [...prev];
        clone[existingIndex] = updated;
        return clone;
      } else {
        const newPos: DemoPosition = {
          id: 'pos_' + Math.random().toString(36).substring(2, 9),
          marketId,
          marketQuestion,
          outcome,
          shares: Number(calculatedShares.toFixed(4)),
          avgPriceCents: priceCents,
          totalCostUsdc: Number(dollarStake.toFixed(2)),
          currentPriceCents: priceCents,
          currentValueUsdc: Number(dollarStake.toFixed(2)),
          potentialPayoutUsdc: Number(potentialPayout.toFixed(2)),
          potentialProfitUsdc: Number(potentialProfit.toFixed(2)),
          pnlUsdc: 0.00,
          pnlPercentage: 0.0,
          acquiredAt: timestamp,
        };
        return [newPos, ...prev];
      }
    });

    const receipt: TradeReceipt = {
      orderNumber,
      marketId,
      marketQuestion,
      outcome,
      stakeUsdc: Number(dollarStake.toFixed(2)),
      shares: Number(calculatedShares.toFixed(2)),
      priceCents,
      potentialPayoutUsdc: Number(potentialPayout.toFixed(2)),
      potentialProfitUsdc: Number(potentialProfit.toFixed(2)),
      roiPercentage: Number(roiPercentage.toFixed(1)),
      timestamp,
    };

    return { success: true, receipt };
  };

  const cashOutPosition = (positionId: string, currentPriceCents: number): { success: boolean; proceeds: number } => {
    const pos = positions.find(p => p.id === positionId);
    if (!pos) return { success: false, proceeds: 0 };

    // 2% liquidity fee deduction per M10.1
    const grossValue = (pos.shares * currentPriceCents) / 100;
    const netProceeds = Number((grossValue * 0.98).toFixed(2));

    setBalance(prev => prev + netProceeds);
    setPositions(prev => prev.filter(p => p.id !== positionId));

    const exitTrade: DemoTrade = {
      id: 'trd_' + Math.random().toString(36).substring(2, 9),
      orderNumber: `OMX-${Math.floor(1000 + Math.random() * 9000)}`,
      marketId: pos.marketId,
      marketQuestion: pos.marketQuestion,
      action: 'SELL',
      outcome: pos.outcome,
      stakeUsdc: netProceeds,
      shares: pos.shares,
      priceCents: currentPriceCents,
      potentialPayoutUsdc: 0,
      potentialProfitUsdc: 0,
      timestamp: new Date().toISOString(),
      sharedToFeed: false,
    };
    setTrades(prev => [exitTrade, ...prev]);

    return { success: true, proceeds: netProceeds };
  };

  const resetDemoBalance = () => {
    setBalance(INITIAL_BALANCE);
    setPositions([]);
    setTrades([]);
    localStorage.removeItem('omx_positions_v2');
    localStorage.removeItem('omx_trades_v2');
    localStorage.setItem('omx_balance_v2', INITIAL_BALANCE.toString());
  };

  return (
    <TradeContext.Provider
      value={{
        balance,
        positions,
        trades,
        executeTrade,
        resetDemoBalance,
        cashOutPosition,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

export const useTrade = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error('useTrade must be used within a TradeProvider');
  }
  return context;
};
