import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, DollarSign, Wallet } from 'lucide-react';
import type { Market, TradeAction, TradeMode, TradeOutcome } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useTrade } from '../../context/TradeContext';

interface TradeOrderSlipProps {
  market: Market;
  onTradeComplete?: () => void;
  className?: string;
}

export const TradeOrderSlip: React.FC<TradeOrderSlipProps> = ({
  market,
  onTradeComplete,
  className = '',
}) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const { balance, executeDemoTrade, getPosition } = useTrade();

  // Slip state
  const [tradeMode, setTradeMode] = useState<TradeMode>('DEMO');
  const [tradeAction, setTradeAction] = useState<TradeAction>('BUY');
  const [outcome, setOutcome] = useState<TradeOutcome>('YES');
  const [amount, setAmount] = useState<string>('50');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  const priceInCents = outcome === 'YES' ? market.yesPrice : market.noPrice;
  const priceInDollars = priceInCents / 100;
  const numAmount = parseFloat(amount) || 0;

  // Owned position
  const existingPosition = getPosition(market.id, outcome);
  const ownedShares = existingPosition ? existingPosition.shares : 0;

  // Calculations
  const calculatedShares = priceInDollars > 0 && numAmount > 0 ? numAmount / priceInDollars : 0;
  const potentialReturn =
    priceInCents > 0 ? ((100 - priceInCents) / priceInCents) * 100 : 0;
  const maxPayout = calculatedShares * 1.0; // each winning share pays $1.00

  const handleQuickAmount = (val: number) => {
    setAmount(val.toString());
    setFeedback(null);
  };

  const handleMaxAmount = () => {
    if (tradeAction === 'BUY') {
      setAmount(Math.floor(balance).toString());
    } else {
      const maxSellDollar = +(ownedShares * priceInDollars).toFixed(2);
      setAmount(maxSellDollar.toString());
    }
    setFeedback(null);
  };

  const handleExecute = () => {
    setFeedback(null);

    if (tradeMode === 'REAL') {
      setFeedback({
        type: 'error',
        message: 'Real money trading is gated in this environment. Please switch to Demo mode.',
      });
      return;
    }

    if (numAmount <= 0) {
      setFeedback({
        type: 'error',
        message: 'Please enter a valid amount greater than $0.',
      });
      return;
    }

    if (tradeAction === 'BUY' && numAmount > balance) {
      setFeedback({
        type: 'error',
        message: `Insufficient balance. Available: $${balance.toFixed(2)} USDC`,
      });
      return;
    }

    if (tradeAction === 'SELL' && ownedShares <= 0) {
      setFeedback({
        type: 'error',
        message: `You do not own any ${outcome} shares to sell in this market.`,
      });
      return;
    }

    const result = executeDemoTrade({
      marketId: market.id,
      marketTitle: market.title,
      category: market.category,
      categoryIcon: market.categoryIcon,
      action: tradeAction,
      outcome,
      amount: numAmount,
      price: priceInCents,
    });

    if (result.success) {
      setFeedback({
        type: 'success',
        message: result.message,
      });
      if (onTradeComplete) {
        onTradeComplete();
      }
    } else {
      setFeedback({
        type: 'error',
        message: result.message,
      });
    }
  };

  return (
    <div
      className={`rounded-omx-xl bg-omx-card border border-omx-border p-4 sm:p-5 space-y-4 shadow-xl ${className}`}
    >
      {/* 1. Real / Demo Segmented Mode Switch */}
      <div className="flex items-center justify-between">
        <div className="flex rounded-omx-md border border-omx-border bg-omx-muted p-0.5 w-full">
          <button
            onClick={() => {
              setTradeMode('REAL');
              setFeedback(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-omx-sm transition-all ${
              tradeMode === 'REAL'
                ? 'bg-omx-card text-omx-text shadow-sm'
                : 'text-omx-text-muted hover:text-omx-text'
            }`}
          >
            Real
          </button>
          <button
            onClick={() => {
              setTradeMode('DEMO');
              setFeedback(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-omx-sm transition-all ${
              tradeMode === 'DEMO'
                ? 'bg-[#f23064] text-white shadow-sm'
                : 'text-omx-text-muted hover:text-omx-text'
            }`}
          >
            Demo
          </button>
        </div>
      </div>

      {/* 2. Demo or Real Mode Banner */}
      {tradeMode === 'DEMO' ? (
        <div className="p-2.5 rounded-omx-md bg-[#f23064]/10 border border-[#f23064]/30 text-[10px] sm:text-[11px] font-bold text-[#f23064] text-center uppercase tracking-wide leading-tight">
          DEMO TRADING MODE — TRADING WITH 10,000 USDC IN VIRTUAL FUNDS, NOT REAL MONEY
        </div>
      ) : (
        <div className="p-2.5 rounded-omx-md bg-amber-500/10 border border-amber-500/30 text-[10px] sm:text-[11px] font-bold text-amber-500 text-center uppercase tracking-wide leading-tight">
          REAL TRADING MODE — REQUIRES KYC VERIFICATION AND REAL FUNDS. EXECUTION GATED IN SANDBOX.
        </div>
      )}

      {/* 3. Buy / Sell Tabs */}
      <div className="flex rounded-omx-md border border-omx-border bg-omx-muted p-0.5">
        <button
          onClick={() => {
            setTradeAction('BUY');
            setFeedback(null);
          }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-omx-sm transition-all ${
            tradeAction === 'BUY'
              ? 'bg-omx-card text-omx-text shadow-sm'
              : 'text-omx-text-muted hover:text-omx-text'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => {
            setTradeAction('SELL');
            setFeedback(null);
          }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-omx-sm transition-all ${
            tradeAction === 'SELL'
              ? 'bg-omx-card text-omx-text shadow-sm'
              : 'text-omx-text-muted hover:text-omx-text'
          }`}
        >
          Sell
        </button>
      </div>

      {/* 4. Outcome Selection (YES / NO cards) */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            setOutcome('YES');
            setFeedback(null);
          }}
          className={`p-3.5 rounded-omx-lg border text-center transition-all ${
            outcome === 'YES'
              ? 'bg-emerald-500/15 border-emerald-500 shadow-md ring-1 ring-emerald-500'
              : 'bg-omx-muted/50 border-omx-border hover:border-emerald-500/50'
          }`}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-omx-text-secondary">
            YES
          </div>
          <div className="text-xl font-extrabold font-mono text-emerald-500 mt-1">
            {market.yesPrice}¢
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setOutcome('NO');
            setFeedback(null);
          }}
          className={`p-3.5 rounded-omx-lg border text-center transition-all ${
            outcome === 'NO'
              ? 'bg-[#f23064]/15 border-[#f23064] shadow-md ring-1 ring-[#f23064]'
              : 'bg-omx-muted/50 border-omx-border hover:border-[#f23064]/50'
          }`}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-omx-text-secondary">
            NO
          </div>
          <div className="text-xl font-extrabold font-mono text-[#f23064] mt-1">
            {market.noPrice}¢
          </div>
        </button>
      </div>

      {/* 5. Amount Input & Quick Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-omx-text-secondary">
          <span className="font-semibold">Amount</span>
          {isAuthenticated && (
            <span className="flex items-center gap-1 font-mono text-[11px] text-omx-text-muted">
              <Wallet className="w-3 h-3" />
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC
            </span>
          )}
        </div>

        <div className="relative flex items-center">
          <DollarSign className="absolute left-3 w-4 h-4 text-omx-text-muted pointer-events-none" />
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setFeedback(null);
            }}
            placeholder="0"
            className="w-full pl-8 pr-4 py-2.5 bg-omx-muted/70 focus:bg-omx-card text-omx-text font-mono font-bold text-sm rounded-omx-md border border-omx-border focus:border-[#f23064]/80 outline-none transition-all"
          />
        </div>

        {/* Quick Amount Buttons */}
        <div className="flex items-center gap-2">
          {[10, 50, 100].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => handleQuickAmount(val)}
              className="flex-1 py-1 text-xs font-mono font-semibold rounded-omx-sm border border-omx-border bg-omx-muted/40 hover:bg-omx-hover text-omx-text-secondary hover:text-omx-text transition-colors"
            >
              ${val}
            </button>
          ))}
          <button
            type="button"
            onClick={handleMaxAmount}
            className="flex-1 py-1 text-xs font-mono font-semibold rounded-omx-sm border border-omx-border bg-omx-muted/40 hover:bg-omx-hover text-omx-text-secondary hover:text-omx-text transition-colors"
          >
            Max
          </button>
        </div>
      </div>

      {/* 6. Trade Calculations / Estimates */}
      <div className="p-3 rounded-omx-md bg-omx-muted/40 border border-omx-border space-y-2 text-xs font-mono">
        <div className="flex items-center justify-between text-omx-text-secondary">
          <span>Avg Price</span>
          <span className="font-semibold text-omx-text">{priceInCents.toFixed(1)}¢</span>
        </div>
        <div className="flex items-center justify-between text-omx-text-secondary">
          <span>Shares</span>
          <span className="font-semibold text-omx-text">{calculatedShares.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-omx-text-secondary">
          <span>Potential Return</span>
          <span className="font-semibold text-emerald-500">
            +{potentialReturn.toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center justify-between text-omx-text-secondary pt-1 border-t border-omx-border">
          <span className="font-bold text-omx-text">Max Payout</span>
          <span className="font-bold text-emerald-500">${maxPayout.toFixed(2)}</span>
        </div>
        {tradeAction === 'SELL' && isAuthenticated && (
          <div className="flex items-center justify-between text-omx-text-muted pt-1 border-t border-omx-border">
            <span>You Own</span>
            <span className="font-bold text-omx-text">{ownedShares.toFixed(2)} shares</span>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-3 rounded-omx-md text-xs font-medium flex items-start gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-500'
              : 'bg-[#f23064]/15 border border-[#f23064]/30 text-[#f23064]'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* 7. Action / Execution Button Area */}
      {!isAuthenticated ? (
        /* Observed Unauthenticated State */
        <div className="p-4 rounded-omx-lg bg-omx-card/80 border border-omx-border text-center space-y-3">
          <div>
            <h4 className="text-sm font-bold text-omx-text">Sign in to start trading</h4>
            <p className="text-xs text-omx-text-muted mt-1 leading-relaxed">
              Create a free account to buy and sell shares on this market.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openAuthModal('signup')}
            className="w-full py-2.5 rounded-omx-md text-xs font-bold text-white bg-gradient-to-r from-[#f23064] to-[#9333ea] hover:opacity-95 shadow-md transition-opacity"
          >
            Sign Up to Trade
          </button>
          <div>
            <button
              type="button"
              onClick={() => openAuthModal('signin')}
              className="text-xs font-semibold text-omx-text-secondary hover:text-omx-text transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      ) : (
        /* Authenticated Execution Button */
        <button
          type="button"
          onClick={handleExecute}
          disabled={tradeMode === 'REAL'}
          className={`w-full py-3 rounded-omx-md text-xs font-bold text-white shadow-lg transition-all ${
            tradeMode === 'REAL'
              ? 'bg-omx-muted text-omx-text-muted cursor-not-allowed'
              : outcome === 'YES'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:opacity-95'
              : 'bg-gradient-to-r from-[#f23064] to-pink-600 hover:opacity-95'
          }`}
        >
          {tradeMode === 'REAL'
            ? 'Real Trading Unavailable in Sandbox'
            : tradeAction === 'BUY'
            ? `Buy ${outcome} Shares`
            : `Sell ${outcome} Shares`}
        </button>
      )}
    </div>
  );
};
