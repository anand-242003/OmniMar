import React, { createContext, useContext, useState, useEffect } from 'react';
import type { DemoPosition, DemoTrade, SocialPredictionEvent, TradeAction, TradeOutcome } from '../types';

interface ExecuteTradeParams {
  marketId: string;
  marketTitle: string;
  category: string;
  categoryIcon: string;
  action: TradeAction;
  outcome: TradeOutcome;
  amount: number; // in USDC
  price: number;  // in cents (e.g. 50 or 49.5)
}

interface TradeResult {
  success: boolean;
  message: string;
  shares?: number;
}

interface TradeContextType {
  balance: number; // in USDC
  positions: DemoPosition[];
  trades: DemoTrade[];
  predictions: SocialPredictionEvent[];
  executeDemoTrade: (params: ExecuteTradeParams) => TradeResult;
  getPosition: (marketId: string, outcome: TradeOutcome) => DemoPosition | undefined;
  getMarketPositions: (marketId: string) => DemoPosition[];
  resetDemoTrading: () => void;
}

const TradeContext = createContext<TradeContextType | undefined>(undefined);

const BALANCE_KEY = 'omx_demo_balance';
const POSITIONS_KEY = 'omx_demo_positions';
const TRADES_KEY = 'omx_demo_trades';
const PREDICTIONS_KEY = 'omx_social_predictions';

const INITIAL_BALANCE = 10000; // 10,000 USDC default virtual balance

export const TradeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Balance
  const [balance, setBalance] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(BALANCE_KEY);
      if (saved !== null) {
        const parsed = parseFloat(saved);
        if (!isNaN(parsed)) return parsed;
      }
    }
    return INITIAL_BALANCE;
  });

  // Positions
  const [positions, setPositions] = useState<DemoPosition[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(POSITIONS_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  // Trades
  const [trades, setTrades] = useState<DemoTrade[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(TRADES_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  // Social Predictions
  const [predictions, setPredictions] = useState<SocialPredictionEvent[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(PREDICTIONS_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  // Persist state updates to localStorage
  useEffect(() => {
    localStorage.setItem(BALANCE_KEY, balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem(POSITIONS_KEY, JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    localStorage.setItem(TRADES_KEY, JSON.stringify(trades));
  }, [trades]);

  useEffect(() => {
    localStorage.setItem(PREDICTIONS_KEY, JSON.stringify(predictions));
  }, [predictions]);

  const getPosition = (marketId: string, outcome: TradeOutcome): DemoPosition | undefined => {
    return positions.find((p) => p.marketId === marketId && p.outcome === outcome);
  };

  const getMarketPositions = (marketId: string): DemoPosition[] => {
    return positions.filter((p) => p.marketId === marketId);
  };

  const executeDemoTrade = ({
    marketId,
    marketTitle,
    category,
    categoryIcon,
    action,
    outcome,
    amount,
    price,
  }: ExecuteTradeParams): TradeResult => {
    if (amount <= 0) {
      return { success: false, message: 'Trade amount must be greater than zero.' };
    }

    const priceInDollars = price / 100;
    if (priceInDollars <= 0) {
      return { success: false, message: 'Invalid outcome price.' };
    }

    if (action === 'BUY') {
      if (amount > balance) {
        return {
          success: false,
          message: `Insufficient virtual balance. You have $${balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} USDC available.`,
        };
      }

      const sharesToReceive = amount / priceInDollars;
      const newBalance = balance - amount;
      setBalance(newBalance);

      // Update or insert position
      setPositions((prev) => {
        const existingIdx = prev.findIndex(
          (p) => p.marketId === marketId && p.outcome === outcome
        );

        if (existingIdx >= 0) {
          const existing = prev[existingIdx];
          const updatedShares = existing.shares + sharesToReceive;
          const updatedInvested = existing.totalInvested + amount;
          const updatedAvgPrice = (updatedInvested / updatedShares) * 100;
          const updatedValue = updatedShares * priceInDollars;
          const updatedPnl = updatedValue - updatedInvested;
          const updatedPnlPercent = (updatedPnl / updatedInvested) * 100;

          const updated: DemoPosition = {
            ...existing,
            shares: updatedShares,
            totalInvested: updatedInvested,
            avgPrice: updatedAvgPrice,
            currentPrice: price,
            currentValue: updatedValue,
            pnl: updatedPnl,
            pnlPercent: updatedPnlPercent,
            updatedAt: new Date().toISOString(),
          };

          const next = [...prev];
          next[existingIdx] = updated;
          return next;
        } else {
          const newPos: DemoPosition = {
            id: `pos_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            marketId,
            marketTitle,
            category,
            categoryIcon,
            outcome,
            shares: sharesToReceive,
            avgPrice: price,
            totalInvested: amount,
            currentPrice: price,
            currentValue: amount,
            pnl: 0,
            pnlPercent: 0,
            updatedAt: new Date().toISOString(),
          };
          return [newPos, ...prev];
        }
      });

      // Record trade in history
      const newTrade: DemoTrade = {
        id: `trd_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        marketId,
        marketTitle,
        action: 'BUY',
        outcome,
        amount,
        shares: sharesToReceive,
        price,
        timestamp: new Date().toISOString(),
      };
      setTrades((prev) => [newTrade, ...prev]);

      // Produce observed Social Prediction event:
      // "🎮 Demo Prediction — I predicted YES on [Market Title]"
      const predictionText = `🎮 Demo Prediction — I predicted ${outcome} on "${marketTitle}"`;
      const newPrediction: SocialPredictionEvent = {
        id: `pred_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        authorName: 'Demo Trader',
        authorHandle: '@demotrader',
        marketId,
        marketTitle,
        outcome,
        text: predictionText,
        timestamp: new Date().toISOString(),
      };
      setPredictions((prev) => [newPrediction, ...prev]);

      return {
        success: true,
        message: `Purchased ${sharesToReceive.toFixed(2)} ${outcome} shares for $${amount.toFixed(
          2
        )} USDC!`,
        shares: sharesToReceive,
      };
    } else {
      // SELL ACTION
      const existingPos = getPosition(marketId, outcome);
      if (!existingPos || existingPos.shares <= 0) {
        return {
          success: false,
          message: `You do not own any ${outcome} shares in this market to sell.`,
        };
      }

      // If user inputs dollar amount, calculate shares; cannot sell more than owned
      const requestedShares = amount / priceInDollars;
      const sharesToSell = Math.min(requestedShares, existingPos.shares);
      const proceeds = sharesToSell * priceInDollars;

      const newBalance = balance + proceeds;
      setBalance(newBalance);

      setPositions((prev) => {
        const existingIdx = prev.findIndex(
          (p) => p.marketId === marketId && p.outcome === outcome
        );
        if (existingIdx < 0) return prev;

        const existing = prev[existingIdx];
        const remainingShares = existing.shares - sharesToSell;

        if (remainingShares <= 0.0001) {
          // Position fully closed
          return prev.filter((_, idx) => idx !== existingIdx);
        } else {
          const ratio = remainingShares / existing.shares;
          const remainingInvested = existing.totalInvested * ratio;
          const updatedValue = remainingShares * priceInDollars;
          const updatedPnl = updatedValue - remainingInvested;
          const updatedPnlPercent = (updatedPnl / remainingInvested) * 100;

          const updated: DemoPosition = {
            ...existing,
            shares: remainingShares,
            totalInvested: remainingInvested,
            currentPrice: price,
            currentValue: updatedValue,
            pnl: updatedPnl,
            pnlPercent: updatedPnlPercent,
            updatedAt: new Date().toISOString(),
          };
          const next = [...prev];
          next[existingIdx] = updated;
          return next;
        }
      });

      // Record SELL trade in history
      const sellTrade: DemoTrade = {
        id: `trd_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        marketId,
        marketTitle,
        action: 'SELL',
        outcome,
        amount: proceeds,
        shares: sharesToSell,
        price,
        timestamp: new Date().toISOString(),
      };
      setTrades((prev) => [sellTrade, ...prev]);

      return {
        success: true,
        message: `Sold ${sharesToSell.toFixed(2)} ${outcome} shares for $${proceeds.toFixed(
          2
        )} USDC!`,
        shares: sharesToSell,
      };
    }
  };

  const resetDemoTrading = () => {
    setBalance(INITIAL_BALANCE);
    setPositions([]);
    setTrades([]);
    setPredictions([]);
    localStorage.removeItem(BALANCE_KEY);
    localStorage.removeItem(POSITIONS_KEY);
    localStorage.removeItem(TRADES_KEY);
    localStorage.removeItem(PREDICTIONS_KEY);
  };

  return (
    <TradeContext.Provider
      value={{
        balance,
        positions,
        trades,
        predictions,
        executeDemoTrade,
        getPosition,
        getMarketPositions,
        resetDemoTrading,
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
