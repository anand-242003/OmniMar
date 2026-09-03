import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Compass, AlertCircle } from 'lucide-react';
import type { Market } from '../../types/market';
import type { Outcome, TradeReceipt } from '../../types/trade';
import { useTrade } from '../../context/TradeContext';
import { useRouter } from '../../context/RouterContext';

interface TradeOrderSlipProps {
  market: Market;
  stagedOutcome?: Outcome;
  onPositionPlaced?: () => void;
}

export const TradeOrderSlip: React.FC<TradeOrderSlipProps> = ({
  market,
  stagedOutcome,
  onPositionPlaced,
}) => {
  const { balance, executeTrade } = useTrade();
  const { navigate } = useRouter();

  const [outcome, setOutcome] = useState<Outcome>(stagedOutcome || 'YES');
  const [dollarInput, setDollarInput] = useState<string>('25.00');
  const [shareToFeed, setShareToFeed] = useState<boolean>(true);
  const [receipt, setReceipt] = useState<TradeReceipt | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync with staged outcome prop if updated externally from header odds display
  useEffect(() => {
    if (stagedOutcome) {
      setOutcome(stagedOutcome);
      setReceipt(null);
    }
  }, [stagedOutcome]);

  const priceCents = outcome === 'YES' ? market.yesPrice : market.noPrice;

  const parsedAmount = parseFloat(dollarInput) || 0;
  const calculatedShares = parsedAmount > 0 ? parsedAmount / (priceCents / 100) : 0;
  const potentialPayout = calculatedShares * 1.0;
  const potentialProfit = potentialPayout - parsedAmount;
  const roiPercent = parsedAmount > 0 ? (potentialProfit / parsedAmount) * 100 : 0;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(val)) {
      setDollarInput(val);
      setErrorMessage(null);
    }
  };

  const handleQuickAmount = (amount: number) => {
    setDollarInput(amount.toFixed(2));
    setErrorMessage(null);
  };

  const handleMaxAmount = () => {
    const maxAffordable = Math.floor(balance);
    setDollarInput(maxAffordable.toFixed(2));
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (parsedAmount <= 0) {
      setErrorMessage('Please enter an amount greater than $0.00');
      return;
    }

    if (parsedAmount > balance) {
      setErrorMessage(`Insufficient balance ($${balance.toFixed(2)} available).`);
      return;
    }

    const res = executeTrade({
      marketId: market.id,
      marketQuestion: market.question,
      action: 'BUY',
      outcome,
      dollarStake: parsedAmount,
      priceCents,
      shareToFeed,
    });

    if (res.success && res.receipt) {
      setReceipt(res.receipt);
      if (onPositionPlaced) onPositionPlaced();
    } else if (res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleViewPosition = () => {
    const posElem = document.getElementById('active-positions-section');
    if (posElem) {
      posElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // State: Confirmed Trade Receipt State (Refinement 10 & 11)
  if (receipt) {
    return (
      <div className="rounded-xl border border-omx-border-strong bg-omx-card p-5 shadow-omx-card space-y-4">
        {/* Prioritized Outcome Confirmation Header */}
        <div className="flex items-center space-x-2 text-omx-yes">
          <CheckCircle2 className="h-5 w-5" />
          <h3 className="font-sora font-bold text-base text-omx-text tracking-tight">
            Prediction Confirmed
          </h3>
        </div>

        {/* Outcome & Financial Summary Card */}
        <div className="rounded-lg border border-omx-border bg-omx-bg p-4 space-y-3 text-xs">
          {/* Dominant Selected Outcome */}
          <div className="flex items-center justify-between">
            <span
              className={`font-sora font-bold px-2.5 py-1 rounded-md text-sm ${
                receipt.outcome === 'YES' ? 'bg-omx-yes-bg text-omx-yes' : 'bg-omx-no-bg text-omx-no'
              }`}
            >
              {receipt.outcome} · {receipt.priceCents}¢
            </span>
            <span className="font-mono text-xs text-omx-text-secondary">
              Price locked at {receipt.priceCents}¢
            </span>
          </div>

          <div className="border-t border-omx-border pt-2.5 space-y-2">
            <div className="flex items-center justify-between text-omx-text-secondary">
              <span>Your Stake</span>
              <span className="font-mono font-semibold text-omx-text">${receipt.stakeUsdc.toFixed(2)} USDC</span>
            </div>

            <div className="flex items-center justify-between text-omx-text-secondary">
              <span>Shares Owned</span>
              <span className="font-mono font-semibold text-omx-text">{receipt.shares.toFixed(2)} shares</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="font-medium text-omx-text">Potential Payout</span>
              <div className="text-right">
                <span className="font-mono font-bold text-omx-yes text-base block">
                  ${receipt.potentialPayoutUsdc.toFixed(2)}
                </span>
                <span className="font-mono text-[11px] text-omx-yes">
                  (+${receipt.potentialProfitUsdc.toFixed(2)} profit · +{receipt.roiPercentage}%)
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Order Metadata */}
          <div className="border-t border-omx-border/60 pt-2 flex items-center justify-between text-[11px] text-omx-text-muted font-mono">
            <span>Order Reference</span>
            <span className="font-semibold text-omx-text-secondary">{receipt.orderNumber}</span>
          </div>
        </div>

        {/* Explicit Action Pathways */}
        <div className="space-y-2 pt-1">
          {/* Primary Action: View Position */}
          <button
            type="button"
            onClick={handleViewPosition}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-omx-elevated border border-omx-border hover:border-omx-border-strong py-2.5 text-xs font-semibold text-omx-text hover:bg-omx-card transition-all cursor-pointer"
          >
            <TrendingUp className="h-3.5 w-3.5 text-omx-brand" />
            <span>View Position</span>
          </button>

          {/* Secondary Action: Explore Markets */}
          <button
            type="button"
            onClick={() => navigate('/markets/will-gta-vi-release-before-december-2026')}
            className="w-full flex items-center justify-center space-x-2 rounded-xl border border-omx-border py-2 text-xs font-medium text-omx-text-secondary hover:text-omx-text hover:bg-omx-elevated transition-colors cursor-pointer"
          >
            <Compass className="h-3.5 w-3.5 text-omx-text-secondary" />
            <span>Explore More Markets</span>
          </button>

          {/* Tertiary Action: Make another prediction on this market */}
          <button
            type="button"
            onClick={() => setReceipt(null)}
            className="w-full text-center text-[11px] text-omx-text-muted hover:text-omx-text-secondary transition-colors pt-1 block cursor-pointer"
          >
            Make another prediction on this market
          </button>
        </div>
      </div>
    );
  }

  // Active Trade Form State (Refinements 04, 05, 06, 09, 18)
  return (
    <div className="rounded-xl border border-omx-border bg-omx-card p-5 shadow-omx-card space-y-4">
      {/* Header: Clean title + Sandbox indicator (Refinement 04: NO Buy/Sell toggle) */}
      <div className="flex items-center justify-between">
        <span className="font-sora font-bold text-sm text-omx-text">
          Choose Your Prediction
        </span>

        <span className="inline-flex items-center space-x-1.5 rounded-full border border-omx-sandbox/30 bg-omx-sandbox-bg px-2.5 py-0.5 text-[11px] font-medium text-omx-sandbox">
          <span className="h-1.5 w-1.5 rounded-full bg-omx-sandbox" />
          <span>Practice Sandbox</span>
        </span>
      </div>

      {/* Outcome Selection Pills (Refinement 05: Explicit Price + Probability Hierarchy) */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* YES Pill */}
        <button
          type="button"
          onClick={() => {
            setOutcome('YES');
            setErrorMessage(null);
          }}
          className={`relative flex flex-col items-start rounded-xl p-3 text-left transition-all border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-omx-yes ${
            outcome === 'YES'
              ? 'border-omx-yes bg-omx-yes-bg text-omx-text shadow-sm'
              : 'border-omx-border bg-omx-bg hover:border-omx-border-strong text-omx-text-secondary'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-sora text-xs font-bold text-omx-yes tracking-wider">▲ YES</span>
            <span className="font-mono text-base font-bold text-omx-yes">{market.yesPrice}¢</span>
          </div>
          <span className="font-mono text-[11px] text-omx-text-muted mt-1">
            ~{market.impliedProbabilityYes}% implied probability
          </span>
        </button>

        {/* NO Pill */}
        <button
          type="button"
          onClick={() => {
            setOutcome('NO');
            setErrorMessage(null);
          }}
          className={`relative flex flex-col items-start rounded-xl p-3 text-left transition-all border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-omx-no ${
            outcome === 'NO'
              ? 'border-omx-no bg-omx-no-bg text-omx-text shadow-sm'
              : 'border-omx-border bg-omx-bg hover:border-omx-border-strong text-omx-text-secondary'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-sora text-xs font-bold text-omx-no tracking-wider">▼ NO</span>
            <span className="font-mono text-base font-bold text-omx-no">{market.noPrice}¢</span>
          </div>
          <span className="font-mono text-[11px] text-omx-text-muted mt-1">
            ~{market.impliedProbabilityNo}% implied probability
          </span>
        </button>
      </div>

      {/* Dollar-First Stake Input Area */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <label htmlFor="stakeAmountInput" className="font-medium text-omx-text-secondary">
            Your Stake Amount
          </label>
          <span className="font-mono text-[11px] text-omx-text-muted">
            Available: ${balance.toFixed(2)} USDC
          </span>
        </div>

        <div className="relative rounded-xl border border-omx-border-strong bg-omx-bg focus-within:border-omx-brand transition-colors">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="font-mono text-base font-bold text-omx-text-secondary">$</span>
          </div>
          <input
            id="stakeAmountInput"
            type="text"
            inputMode="decimal"
            value={dollarInput}
            onChange={handleAmountChange}
            placeholder="0.00"
            className="w-full rounded-xl bg-transparent py-2.5 pl-8 pr-16 font-mono text-base font-bold text-omx-text placeholder-omx-text-muted focus:outline-none"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="font-mono text-xs font-semibold text-omx-text-muted">USDC</span>
          </div>
        </div>

        {/* Secondary Contract Share Calculation (Refinement 05 & 09) */}
        <div className="mt-1.5 flex items-center justify-between text-[11px]">
          <span className="font-mono text-omx-text-secondary">
            ≈ {calculatedShares > 0 ? calculatedShares.toFixed(2) : '0.00'} shares @ {priceCents}¢
          </span>
          <span className="text-omx-text-muted">Price locked at {priceCents}¢</span>
        </div>

        {/* Quick Amount Chips */}
        <div className="grid grid-cols-4 gap-1.5 mt-2">
          {[10, 25, 50].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => handleQuickAmount(amt)}
              className="rounded-lg border border-omx-border bg-omx-bg py-1 text-xs font-mono font-medium text-omx-text-secondary hover:text-omx-text hover:border-omx-border-strong transition-colors cursor-pointer"
            >
              ${amt}
            </button>
          ))}
          <button
            type="button"
            onClick={handleMaxAmount}
            className="rounded-lg border border-omx-border bg-omx-bg py-1 text-xs font-mono font-medium text-omx-text-secondary hover:text-omx-text hover:border-omx-border-strong transition-colors cursor-pointer"
          >
            Max
          </button>
        </div>
      </div>

      {/* Complete Risk & Return Communication (Fintech Transparency with aria-live="polite") */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="rounded-xl border border-omx-border bg-omx-bg/70 p-3.5 space-y-2 text-xs"
      >
        <div className="flex items-center justify-between text-omx-text-secondary">
          <span>Your Stake</span>
          <span className="font-mono font-semibold text-omx-text">${parsedAmount.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between text-omx-text-secondary">
          <span>Potential payout if {outcome} wins</span>
          <span className="font-mono font-bold text-omx-yes text-sm">
            ${potentialPayout.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-omx-text">Potential profit</span>
          <span className="font-mono font-bold text-omx-yes">
            +${potentialProfit > 0 ? potentialProfit.toFixed(2) : '0.00'} ({parsedAmount > 0 ? roiPercent.toFixed(1) : '0.0'}%)
          </span>
        </div>

        {/* Explicit Downside Communication (Fintech Transparency, Non-Alarmist) */}
        <div className="flex items-center justify-between border-t border-omx-border/70 pt-2 text-[11px] text-omx-text-muted">
          <span>If {outcome} does not resolve true</span>
          <span className="font-mono font-medium text-omx-text-secondary">
            $0.00 payout (-${parsedAmount.toFixed(2)} loss)
          </span>
        </div>
      </div>

      {/* Error Message if invalid */}
      {errorMessage && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-400 flex items-center space-x-2">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Opt-in Social Share Checkbox */}
      <div className="flex items-center space-x-2 text-xs text-omx-text-secondary">
        <input
          type="checkbox"
          id="shareToFeed"
          checked={shareToFeed}
          onChange={(e) => setShareToFeed(e.target.checked)}
          className="rounded border-omx-border bg-omx-bg text-omx-brand focus:ring-omx-brand cursor-pointer"
        />
        <label htmlFor="shareToFeed" className="cursor-pointer select-none">
          Share prediction to public community feed
        </label>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className={`w-full flex items-center justify-center space-x-2 rounded-xl py-3 text-sm font-sora font-bold text-white shadow-sm transition-all active:scale-[0.99] cursor-pointer ${
          outcome === 'YES'
            ? 'bg-omx-yes hover:bg-emerald-600'
            : 'bg-omx-no hover:bg-rose-600'
        }`}
      >
        <span>
          Predict {outcome} — ${parsedAmount.toFixed(2)}
        </span>
        <ArrowRight className="h-4 w-4" />
      </button>

      {/* Simplified Trust Note */}
      <div className="flex items-center justify-center space-x-1.5 text-[11px] text-omx-text-muted">
        <ShieldCheck className="h-3.5 w-3.5 text-omx-yes" />
        <span>Price locked at {priceCents}¢ · Winning share pays $1.00</span>
      </div>
    </div>
  );
};
