// eslint-disable-next-line react-refresh/only-export-components
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AccountMode, DemoPosition, DemoTrade, Outcome, TradeAction, TradeReceipt, WalletState } from '../types/trade';
import { useAuth } from './AuthContext';

interface TradeContextType {
  accountMode: AccountMode;
  setAccountMode: (mode: AccountMode) => { allowed: boolean; error?: string };
  balance: number;
  positions: DemoPosition[];
  trades: DemoTrade[];
  demoWallet: WalletState;
  realWallet: WalletState;
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
  topUpFaucet: (amount?: number) => void;
  depositRealFunds: (amount: number) => { success: boolean; error?: string };
  withdrawRealFunds: (amount: number) => { success: boolean; error?: string };
}

const INITIAL_DEMO_BALANCE = 10000.00; // $10,000.00 Virtual USDC

const DEFAULT_DEMO_WALLET: WalletState = {
  balance: INITIAL_DEMO_BALANCE,
  positions: [],
  trades: [],
};

const DEFAULT_REAL_WALLET: WalletState = {
  balance: 0.00,
  positions: [],
  trades: [],
};

const TradeContext = createContext<TradeContextType | undefined>(undefined);

export const TradeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  // Mode state: 'real' | 'demo' (default 'demo')
  const [accountMode, setAccountModeState] = useState<AccountMode>(() => {
    const saved = localStorage.getItem('omx_account_mode_v2');
    if (saved === 'real' || saved === 'demo') return saved;
    return 'demo';
  });

  // Demo wallet state
  const [demoWallet, setDemoWallet] = useState<WalletState>(() => {
    const saved = localStorage.getItem('omx_demo_wallet_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_DEMO_WALLET;
  });

  // Real wallet state
  const [realWallet, setRealWallet] = useState<WalletState>(() => {
    const saved = localStorage.getItem('omx_real_wallet_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_REAL_WALLET;
  });

  // Sync mode to localStorage and body tag
  useEffect(() => {
    localStorage.setItem('omx_account_mode_v2', accountMode);
    if (accountMode === 'demo') {
      document.documentElement.classList.add('mode-demo');
      document.documentElement.classList.remove('mode-real');
    } else {
      document.documentElement.classList.add('mode-real');
      document.documentElement.classList.remove('mode-demo');
    }
  }, [accountMode]);

  // Sync wallets to storage
  useEffect(() => {
    localStorage.setItem('omx_demo_wallet_v2', JSON.stringify(demoWallet));
  }, [demoWallet]);

  useEffect(() => {
    localStorage.setItem('omx_real_wallet_v2', JSON.stringify(realWallet));
  }, [realWallet]);

  // If user is guest, cannot stay in real mode
  useEffect(() => {
    if (!isAuthenticated && accountMode === 'real') {
      setAccountModeState('demo');
    }
  }, [isAuthenticated, accountMode]);

  // Handle account-specific wallet save/restore (Guest merge vs returning user restore)
  useEffect(() => {
    if (!user || user.isGuest) return;

    const userStoreKey = `omx_user_wallets_${user.id}`;
    const saved = localStorage.getItem(userStoreKey);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.demoWallet) setDemoWallet(parsed.demoWallet);
        if (parsed.realWallet) setRealWallet(parsed.realWallet);
      } catch {
        // ignore
      }
    } else {
      // First time saving for this new user — merge active guest demoWallet
      localStorage.setItem(userStoreKey, JSON.stringify({ demoWallet, realWallet }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Save changes under user account store when logged in
  useEffect(() => {
    if (user && !user.isGuest) {
      const userStoreKey = `omx_user_wallets_${user.id}`;
      localStorage.setItem(userStoreKey, JSON.stringify({ demoWallet, realWallet }));
    }
  }, [user, demoWallet, realWallet]);

  // Active wallet values based on accountMode
  const activeWallet = accountMode === 'demo' ? demoWallet : realWallet;
  const balance = activeWallet.balance;
  const positions = activeWallet.positions;
  const trades = activeWallet.trades;

  const setAccountMode = (mode: AccountMode): { allowed: boolean; error?: string } => {
    if (mode === 'real' && !isAuthenticated) {
      return {
        allowed: false,
        error: 'AUTH_REQUIRED',
      };
    }
    setAccountModeState(mode);
    return { allowed: true };
  };

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

    if (accountMode === 'real' && !isAuthenticated) {
      return { success: false, error: 'Please sign in to place real-money predictions.' };
    }

    const currentBal = accountMode === 'demo' ? demoWallet.balance : realWallet.balance;

    if (dollarStake > currentBal) {
      return {
        success: false,
        error: `Insufficient ${accountMode === 'demo' ? 'demo' : 'real'} balance ($${currentBal.toFixed(2)} available).`,
      };
    }

    const pricePerShare = priceCents / 100;
    const calculatedShares = dollarStake / pricePerShare;
    const potentialPayout = calculatedShares * 1.00;
    const potentialProfit = potentialPayout - dollarStake;
    const roiPercentage = ((potentialProfit / dollarStake) * 100);

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

    const updateWallet = (prev: WalletState): WalletState => {
      const newBal = Math.max(0, prev.balance - dollarStake);
      const existingIdx = prev.positions.findIndex(p => p.marketId === marketId && p.outcome === outcome);

      let updatedPositions: DemoPosition[];
      if (existingIdx >= 0) {
        const existing = prev.positions[existingIdx];
        const combinedShares = existing.shares + calculatedShares;
        const combinedCost = existing.totalCostUsdc + dollarStake;
        const weightedAvgPrice = (combinedCost / combinedShares) * 100;
        const combinedPayout = combinedShares * 1.00;
        const combinedProfit = combinedPayout - combinedCost;
        const combinedValue = (combinedShares * priceCents) / 100;

        const updatedPos: DemoPosition = {
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

        const clone = [...prev.positions];
        clone[existingIdx] = updatedPos;
        updatedPositions = clone;
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
        updatedPositions = [newPos, ...prev.positions];
      }

      return {
        balance: newBal,
        positions: updatedPositions,
        trades: [newTrade, ...prev.trades],
      };
    };

    if (accountMode === 'demo') {
      setDemoWallet(updateWallet);
    } else {
      setRealWallet(updateWallet);
    }

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
    const targetWallet = accountMode === 'demo' ? demoWallet : realWallet;
    const pos = targetWallet.positions.find(p => p.id === positionId);
    if (!pos) return { success: false, proceeds: 0 };

    const grossValue = (pos.shares * currentPriceCents) / 100;
    const netProceeds = Number((grossValue * 0.98).toFixed(2));

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

    const updateWallet = (prev: WalletState): WalletState => ({
      balance: prev.balance + netProceeds,
      positions: prev.positions.filter(p => p.id !== positionId),
      trades: [exitTrade, ...prev.trades],
    });

    if (accountMode === 'demo') {
      setDemoWallet(updateWallet);
    } else {
      setRealWallet(updateWallet);
    }

    return { success: true, proceeds: netProceeds };
  };

  const resetDemoBalance = () => {
    setDemoWallet(DEFAULT_DEMO_WALLET);
  };

  const topUpFaucet = (amount: number = 1000) => {
    setDemoWallet(prev => ({
      ...prev,
      balance: prev.balance + amount,
    }));
  };

  const depositRealFunds = (amount: number): { success: boolean; error?: string } => {
    if (amount <= 0) return { success: false, error: 'Deposit amount must be greater than $0.00' };
    if (!isAuthenticated) return { success: false, error: 'Must be signed in to deposit funds.' };

    const depositTrade: DemoTrade = {
      id: 'dep_' + Math.random().toString(36).substring(2, 9),
      orderNumber: `DEP-${Math.floor(1000 + Math.random() * 9000)}`,
      marketId: 'treasury-deposit',
      marketQuestion: 'Treasury Deposit via USDC / Bank',
      action: 'BUY',
      outcome: 'YES',
      stakeUsdc: amount,
      shares: amount,
      priceCents: 100,
      potentialPayoutUsdc: amount,
      potentialProfitUsdc: 0,
      timestamp: new Date().toISOString(),
      sharedToFeed: false,
    };

    setRealWallet(prev => ({
      ...prev,
      balance: prev.balance + amount,
      trades: [depositTrade, ...prev.trades],
    }));

    return { success: true };
  };

  const withdrawRealFunds = (amount: number): { success: boolean; error?: string } => {
    if (amount <= 0) return { success: false, error: 'Withdrawal amount must be greater than $0.00' };
    if (!isAuthenticated) return { success: false, error: 'Must be signed in to withdraw funds.' };
    if (amount > realWallet.balance) return { success: false, error: 'Insufficient real USDC balance.' };

    const withdrawalTrade: DemoTrade = {
      id: 'wth_' + Math.random().toString(36).substring(2, 9),
      orderNumber: `WTH-${Math.floor(1000 + Math.random() * 9000)}`,
      marketId: 'treasury-withdrawal',
      marketQuestion: 'Treasury Withdrawal to USDC Address',
      action: 'SELL',
      outcome: 'YES',
      stakeUsdc: amount,
      shares: amount,
      priceCents: 100,
      potentialPayoutUsdc: 0,
      potentialProfitUsdc: 0,
      timestamp: new Date().toISOString(),
      sharedToFeed: false,
    };

    setRealWallet(prev => ({
      ...prev,
      balance: prev.balance - amount,
      trades: [withdrawalTrade, ...prev.trades],
    }));

    return { success: true };
  };

  return (
    <TradeContext.Provider
      value={{
        accountMode,
        setAccountMode,
        balance,
        positions,
        trades,
        demoWallet,
        realWallet,
        executeTrade,
        resetDemoBalance,
        cashOutPosition,
        topUpFaucet,
        depositRealFunds,
        withdrawRealFunds,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTrade = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error('useTrade must be used within a TradeProvider');
  }
  return context;
};
