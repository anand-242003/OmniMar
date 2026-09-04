import React, { useState } from 'react';
import { Briefcase, ArrowUpRight, ArrowDownRight, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';
import { useTrade } from '../context/TradeContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { AuthGate } from '../components/common/AuthGate';

export const PortfolioPage: React.FC = () => {
  const { accountMode, balance, positions, cashOutPosition, executeTrade } = useTrade();
  const { isAuthenticated } = useAuth();
  const { navigate } = useRouter();

  const [notification, setNotification] = useState<string | null>(null);

  // Compute Aggregate Metrics
  const totalPositionsValue = positions.reduce((acc, p) => acc + p.currentValueUsdc, 0);
  const totalCostBasis = positions.reduce((acc, p) => acc + p.totalCostUsdc, 0);
  const totalPnlUsdc = totalPositionsValue - totalCostBasis;
  const totalPnlPercent = totalCostBasis > 0 ? (totalPnlUsdc / totalCostBasis) * 100 : 0;
  const totalPortfolioValue = balance + totalPositionsValue;

  // Exposure calculations (STYLE.md: "At risk" / "Exposure" — not "Invested")
  const capitalAtRisk = positions.reduce((acc, p) => acc + p.totalCostUsdc, 0);
  const worstCase = balance; // all positions resolve $0
  const bestCase = balance + positions.reduce((acc, p) => acc + p.potentialPayoutUsdc, 0);

  // Concentration: find category with most at-risk capital
  const categoryRisk: Record<string, number> = {};
  positions.forEach((p) => {
    // positions don't store category directly — derive from marketQuestion keyword heuristic
    const cat = p.marketQuestion?.toLowerCase().includes('bitcoin') || p.marketQuestion?.toLowerCase().includes('crypto')
      ? 'Crypto'
      : p.marketQuestion?.toLowerCase().includes('entertainment') || p.marketQuestion?.toLowerCase().includes('gta') || p.marketQuestion?.toLowerCase().includes('film')
      ? 'Entertainment'
      : p.marketQuestion?.toLowerCase().includes('fed') || p.marketQuestion?.toLowerCase().includes('fomc') || p.marketQuestion?.toLowerCase().includes('rate')
      ? 'Macroeconomics'
      : p.marketQuestion?.toLowerCase().includes('spacex') || p.marketQuestion?.toLowerCase().includes('ai') || p.marketQuestion?.toLowerCase().includes('tech')
      ? 'Technology'
      : 'Other';
    categoryRisk[cat] = (categoryRisk[cat] ?? 0) + p.totalCostUsdc;
  });
  const dominantCategory = Object.entries(categoryRisk).sort((a, b) => b[1] - a[1])[0];
  const concentrationWarning =
    capitalAtRisk > 0 && dominantCategory && dominantCategory[1] / capitalAtRisk > 0.5
      ? `${Math.round((dominantCategory[1] / capitalAtRisk) * 100)}% of at-risk capital is in ${dominantCategory[0]} markets.`
      : null;

  // Handle Cash Out
  const handleCashOut = (positionId: string, currentPriceCents: number) => {
    const result = cashOutPosition(positionId, currentPriceCents);
    if (result.success) {
      setNotification(`Successfully cashed out position for $${result.proceeds.toFixed(2)} USDC.`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  // Seed Initial Demo Position for exploration if empty
  const handleSeedPractice = () => {
    executeTrade({
      marketId: 'will-fed-cut-rates-september-2026',
      marketQuestion: 'Will the Federal Reserve cut the federal funds target rate at the September 2026 FOMC meeting?',
      action: 'BUY',
      outcome: 'YES',
      dollarStake: 250.0,
      priceCents: 72,
    });
    setNotification('Initialized practice position: $250.00 on FOMC Rate Cut (72¢ YES).');
    setTimeout(() => setNotification(null), 4000);
  };

  // Real Mode Auth Gate
  if (accountMode === 'real' && !isAuthenticated) {
    return (
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full space-y-8 min-w-0">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Briefcase className="h-4 w-4" />
            </div>
            <h1 className="font-sora text-2xl sm:text-3xl font-extrabold tracking-tight text-omx-text">
              Real Portfolio & Open Exposure
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-omx-text-secondary">
            Verified real-money prediction contract holdings, settlement histories, and risk exposure.
          </p>
        </div>

        <AuthGate
          variant="page"
          pageTitle="Real Money Portfolio"
          pageDescription="Sign in or create an account to view your verified USDC holdings, live performance metrics, and settle real-money positions."
        />
      </main>
    );
  }

  const isDemo = accountMode === 'demo';

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full space-y-8 min-w-0">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center space-x-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isDemo ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
              <Briefcase className="h-4 w-4" />
            </div>
            <h1 className="font-sora text-2xl sm:text-3xl font-extrabold tracking-tight text-omx-text">
              {isDemo ? 'Demo Portfolio & Open Exposure' : 'Real Portfolio & Open Exposure'}
            </h1>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
              isDemo 
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' 
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
            }`}>
              {isDemo ? 'Virtual' : 'Verified USDC'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-omx-text-secondary">
            {isDemo 
              ? 'Valuation of practice prediction contracts, virtual P&L, and simulated liquidity settlement.'
              : 'Live valuation of held real USDC prediction contracts, verified P&L, and liquidity settlement.'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => navigate('/wallet')}
            className={`flex items-center space-x-1.5 rounded-xl border px-3.5 py-2 text-xs font-sora font-semibold transition-colors cursor-pointer ${
              isDemo
                ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20'
                : 'border-omx-border bg-omx-card text-omx-text hover:border-omx-brand hover:text-omx-brand'
            }`}
          >
            <Wallet className="h-3.5 w-3.5" />
            <span>{isDemo ? 'Manage Demo Balance' : 'Manage Real Wallet'}</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs font-sora font-medium text-emerald-800 dark:text-emerald-300 flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* 2. Unified Capital & Exposure Command Bar */}
      <section aria-label="Portfolio valuation summary" className="w-full min-w-0 space-y-4">
        {/* Main Capital Overview Card */}
        <div className="rounded-2xl border border-omx-border bg-omx-card p-6 shadow-sm min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Net Worth & Balance Details (7 cols) */}
            <div className="lg:col-span-7 space-y-4 min-w-0">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-xs font-sora font-semibold text-omx-text-muted uppercase tracking-wider">
                  Total Portfolio Net Worth
                </span>
                <div
                  className={`inline-flex items-center space-x-1 rounded-full px-2.5 py-0.5 text-xs font-mono font-bold ${
                    totalPnlUsdc >= 0
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {totalPnlUsdc >= 0 ? <ArrowUpRight className="h-3 w-3 inline" /> : <ArrowDownRight className="h-3 w-3 inline" />}
                  <span>{totalPnlUsdc >= 0 ? '+' : ''}${totalPnlUsdc.toFixed(2)}</span>
                  <span>({totalPnlPercent >= 0 ? '+' : ''}{totalPnlPercent.toFixed(1)}%)</span>
                </div>
              </div>

              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-omx-text tracking-tight">
                ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-sora pt-1">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
                  <span className="text-omx-text-secondary">Available Cash:</span>
                  <span className="font-mono font-bold text-omx-text">
                    ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className={`rounded px-1.5 py-0.5 font-mono text-xs font-semibold ${
                    isDemo ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {isDemo ? 'Demo Virtual' : 'Real USDC'}
                  </span>
                </div>

                <span className="hidden sm:inline text-omx-border-strong">·</span>

                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-omx-text-secondary">Held Contracts:</span>
                  <span className="font-mono font-bold text-omx-text">
                    ${totalPositionsValue.toFixed(2)}
                  </span>
                  <span className="text-omx-text-muted text-xs">
                    ({positions.length} active)
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Capital Allocation & Visual Meter (5 cols) */}
            <div className="lg:col-span-5 rounded-xl border border-omx-border bg-omx-elevated/60 p-4 space-y-3 min-w-0">
              <div className="flex items-center justify-between text-xs font-sora">
                <span className="font-semibold text-omx-text-secondary">Capital Allocation</span>
                <span className="font-mono text-omx-text-muted">
                  {totalPortfolioValue > 0 ? Math.round((capitalAtRisk / totalPortfolioValue) * 100) : 0}% at risk
                </span>
              </div>

              {/* Allocation Bar: Cash vs Active Contracts */}
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-omx-border flex">
                <div
                  style={{ width: `${totalPortfolioValue > 0 ? (balance / totalPortfolioValue) * 100 : 100}%` }}
                  className="h-full bg-indigo-500 transition-all duration-300"
                  title="Available Cash"
                />
                <div
                  style={{ width: `${totalPortfolioValue > 0 ? (totalPositionsValue / totalPortfolioValue) * 100 : 0}%` }}
                  className="h-full bg-emerald-500 transition-all duration-300"
                  title="At-Risk Contract Positions"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-omx-text-muted pt-0.5">
                <div className="flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span>Liquid Cash: ${balance.toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Staked: ${capitalAtRisk.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Exposure Summary Horizon (Shown when positions exist) */}
        {positions.length > 0 && (
          <div className="rounded-2xl border border-omx-border bg-omx-card p-5 shadow-sm space-y-4 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-omx-border/70 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-sora font-bold uppercase tracking-wider text-omx-text">
                  Exposure Horizon & Settlement Limits
                </span>
                <span className="rounded-full bg-omx-elevated border border-omx-border px-2 py-0.5 font-mono text-xs text-omx-text-secondary">
                  {positions.length} open position{positions.length !== 1 ? 's' : ''}
                </span>
              </div>
              <span className="text-xs text-omx-text-muted font-sora">
                Binary $1.00 contract resolution rule
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-omx-border bg-omx-elevated/40 p-3.5 space-y-1">
                <span className="text-xs text-omx-text-secondary font-sora font-medium">Capital at Risk</span>
                <div className="font-mono font-extrabold text-xl text-omx-text">
                  ${capitalAtRisk.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <span className="text-xs text-omx-text-muted">Total open acquisition cost</span>
              </div>

              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3.5 space-y-1">
                <span className="text-xs text-rose-700 dark:text-rose-400 font-sora font-medium">Worst Case Floor</span>
                <div className="font-mono font-extrabold text-xl text-rose-700 dark:text-rose-400">
                  ${worstCase.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <span className="text-xs text-omx-text-muted">If all held contracts settle at $0.00</span>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 space-y-1">
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-sora font-medium">Best Case Payout</span>
                <div className="font-mono font-extrabold text-xl text-emerald-700 dark:text-emerald-400">
                  ${bestCase.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <span className="text-xs text-omx-text-muted">If all held contracts settle at $1.00</span>
              </div>
            </div>

            {concentrationWarning && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-900 dark:text-amber-300 font-sora flex items-center space-x-2">
                <span className="shrink-0 font-bold text-sm">⚠</span>
                <span><strong>Sector Concentration Alert:</strong> {concentrationWarning}</span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 4. Open Positions Table & Mobile Cards */}
      <section aria-label="Open positions list" className="space-y-4 w-full min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="font-sora font-bold text-lg text-omx-text">
              Open Positions
            </h2>
            <span className="rounded-full bg-omx-elevated border border-omx-border px-2.5 py-0.5 font-mono text-xs font-bold text-omx-text">
              {positions.length}
            </span>
          </div>

          {positions.length === 0 && (
            <button
              type="button"
              onClick={handleSeedPractice}
              className="text-xs font-sora font-semibold text-omx-brand hover:underline cursor-pointer"
            >
              + Seed Sample Practice Position
            </button>
          )}
        </div>

        {positions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-omx-border-strong bg-omx-card p-10 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-omx-bg border border-omx-border text-omx-text-muted">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="font-sora font-bold text-sm text-omx-text">No active positions yet</h3>
              <p className="text-xs text-omx-text-secondary leading-relaxed">
                Explore active markets, form a thesis, and place your first demo prediction to see your exposure here.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/markets')}
                className="flex items-center space-x-1.5 rounded-xl bg-omx-brand px-4 py-2.5 text-xs font-sora font-bold text-white hover:bg-omx-brand/90 transition-colors cursor-pointer shadow-sm"
              >
                <span>Explore Active Markets</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={handleSeedPractice}
                className="rounded-xl border border-omx-border bg-omx-bg px-4 py-2.5 text-xs font-sora font-semibold text-omx-text hover:border-omx-brand hover:text-omx-brand transition-colors cursor-pointer"
              >
                Seed Sample Practice Position
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop View Table (Hidden on Mobile) */}
            <div className="hidden sm:block overflow-x-auto rounded-2xl border border-omx-border bg-omx-card shadow-sm scrollbar-none">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="border-b border-omx-border bg-omx-bg/60 text-xs font-sora font-semibold text-omx-text-muted uppercase tracking-wider">
                    <th className="py-3.5 px-4">Proposition</th>
                    <th className="py-3.5 px-4">Side</th>
                    <th className="py-3.5 px-4 text-right">Contracts</th>
                    <th className="py-3.5 px-4 text-right">Avg Entry → Live</th>
                    <th className="py-3.5 px-4 text-right">Current Value</th>
                    <th className="py-3.5 px-4 text-right">Unrealized P&L</th>
                    <th className="py-3.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-omx-border/60 text-xs">
                  {positions.map((pos) => (
                    <tr key={pos.id} className="hover:bg-omx-hover transition-colors">
                      <td className="py-3.5 px-4 max-w-xs">
                        <button
                          type="button"
                          onClick={() => navigate(`/markets/${pos.marketId}`)}
                          className="font-sora font-semibold text-omx-text hover:text-omx-brand transition-colors text-left line-clamp-2 cursor-pointer"
                        >
                          {pos.marketQuestion}
                        </button>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-sora font-bold ${
                            pos.outcome === 'YES'
                              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          {pos.outcome}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-medium text-omx-text">
                        {pos.shares.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono">
                        <span className="text-omx-text-muted">{pos.avgPriceCents}¢</span>
                        <span className="text-omx-text-secondary mx-1">→</span>
                        <span className="font-bold text-omx-text">{pos.currentPriceCents}¢</span>
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-bold text-omx-text">
                        ${pos.currentValueUsdc.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-bold">
                        <div
                          className={`flex items-center justify-end space-x-0.5 ${
                            pos.pnlUsdc >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                          }`}
                        >
                          {pos.pnlUsdc >= 0 ? (
                            <ArrowUpRight className="h-3 w-3 inline" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 inline" />
                          )}
                          <span>{pos.pnlUsdc >= 0 ? '+' : ''}${pos.pnlUsdc.toFixed(2)}</span>
                        </div>
                        <span className="text-xs text-omx-text-muted">
                          ({pos.pnlPercentage >= 0 ? '+' : ''}{pos.pnlPercentage.toFixed(1)}%)
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleCashOut(pos.id, pos.currentPriceCents)}
                          className="rounded-lg border border-omx-border bg-omx-bg hover:border-rose-500 hover:text-rose-600 px-3 py-1.5 text-xs font-sora font-semibold text-omx-text transition-colors cursor-pointer"
                        >
                          Cash Out
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View: Dedicated Responsive Cards (<640px) */}
            <div className="sm:hidden space-y-3">
              {positions.map((pos) => (
                <div
                  key={pos.id}
                  className="rounded-2xl border border-omx-border bg-omx-card p-4 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/markets/${pos.marketId}`)}
                      className="font-sora font-semibold text-xs text-omx-text text-left line-clamp-2 hover:text-omx-brand"
                    >
                      {pos.marketQuestion}
                    </button>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-sora font-bold shrink-0 ${
                        pos.outcome === 'YES'
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {pos.outcome}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono border-t border-b border-omx-border/60 py-2.5">
                    <div>
                      <span className="text-omx-text-muted block text-xs">Contracts</span>
                      <span className="font-bold text-omx-text">{pos.shares.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-omx-text-muted block text-xs">Price (Entry → Live)</span>
                      <span>{pos.avgPriceCents}¢ → <strong>{pos.currentPriceCents}¢</strong></span>
                    </div>
                    <div>
                      <span className="text-omx-text-muted block text-xs">Current Value</span>
                      <span className="font-bold text-omx-text">${pos.currentValueUsdc.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-omx-text-muted block text-xs">Unrealized P&L</span>
                      <span className={`font-bold ${pos.pnlUsdc >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                        {pos.pnlUsdc >= 0 ? '+' : ''}${pos.pnlUsdc.toFixed(2)} ({pos.pnlPercentage >= 0 ? '+' : ''}{pos.pnlPercentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-omx-text-muted font-sora">
                      Cost Basis: ${pos.totalCostUsdc.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCashOut(pos.id, pos.currentPriceCents)}
                      className="rounded-lg border border-omx-border bg-omx-bg hover:border-rose-500 hover:text-rose-600 px-3 py-1.5 text-xs font-sora font-semibold text-omx-text transition-colors cursor-pointer"
                    >
                      Cash Out
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};
