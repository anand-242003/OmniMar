import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronRight, PieChart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrade } from '../context/TradeContext';
import { useRouter } from '../context/RouterContext';
import { ProtectedShield } from '../components/common/ProtectedShield';
import { MARKETS } from '../data/markets';
import type { Market } from '../types';

export const PortfolioPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { balance, positions } = useTrade();
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'closed'>('active');

  if (!isAuthenticated) {
    return <ProtectedShield route="portfolio" />;
  }

  // Calculate portfolio totals
  const enrichedPositions = positions.map((pos) => {
    const market = MARKETS.find((m: Market) => m.id === pos.marketId);
    const currentPrice = market
      ? pos.outcome === 'YES'
        ? market.probability
        : 100 - market.probability
      : pos.avgPrice;

    const currentValue = (pos.shares * currentPrice) / 100;
    const pnl = currentValue - pos.totalInvested;
    const pnlPercent = pos.totalInvested > 0 ? (pnl / pos.totalInvested) * 100 : 0;

    return {
      ...pos,
      marketTitle: market ? market.title : pos.marketTitle,
      marketIcon: market ? market.categoryIcon : '📊',
      category: market ? market.category : 'General',
      currentPrice,
      currentValue,
      pnl,
      pnlPercent,
    };
  });

  const totalInvested = enrichedPositions.reduce((acc, p) => acc + p.totalInvested, 0);
  const totalCurrentValue = enrichedPositions.reduce((acc, p) => acc + p.currentValue, 0);
  const totalPnl = totalCurrentValue - totalInvested;
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;
  const portfolioValue = balance + totalCurrentValue;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-150 pb-12">
      {/* Breadcrumbs & Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-omx-text-muted mb-1.5 font-medium">
          <span
            onClick={() => navigate('/home')}
            className="hover:text-omx-text cursor-pointer transition-colors"
          >
            Home
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-omx-text font-semibold">Portfolio</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-omx-text">Portfolio</h1>
            <p className="text-sm text-omx-text-secondary mt-1">
              Track your open prediction positions, share values, and unrealized profit & loss.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-omx-yes border border-emerald-500/20">
              Demo Portfolio Active
            </span>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Portfolio Value */}
        <div className="rounded-omx-xl border border-omx-border bg-omx-card p-5 flex flex-col justify-between shadow-sm">
          <span className="text-xs font-semibold text-omx-text-muted uppercase tracking-wider">
            Total Portfolio Value
          </span>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-bold text-omx-text font-mono tracking-tight">
              ${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="ml-1.5 text-xs text-omx-text-muted">USDC</span>
          </div>
          <span className="text-xs text-omx-text-muted">Cash + Open Positions</span>
        </div>

        {/* Available Cash Balance */}
        <div className="rounded-omx-xl border border-omx-border bg-omx-card p-5 flex flex-col justify-between shadow-sm">
          <span className="text-xs font-semibold text-omx-text-muted uppercase tracking-wider">
            Available Cash
          </span>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-bold text-omx-yes font-mono tracking-tight">
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="ml-1.5 text-xs text-omx-text-muted">USDC</span>
          </div>
          <span className="text-xs text-omx-text-muted">Virtual demo trading balance</span>
        </div>

        {/* Invested Balance */}
        <div className="rounded-omx-xl border border-omx-border bg-omx-card p-5 flex flex-col justify-between shadow-sm">
          <span className="text-xs font-semibold text-omx-text-muted uppercase tracking-wider">
            Invested Balance
          </span>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-bold text-omx-text font-mono tracking-tight">
              ${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="ml-1.5 text-xs text-omx-text-muted">USDC</span>
          </div>
          <span className="text-xs text-omx-text-muted">
            {positions.length} Active {positions.length === 1 ? 'Position' : 'Positions'}
          </span>
        </div>

        {/* Unrealized P&L */}
        <div className="rounded-omx-xl border border-omx-border bg-omx-card p-5 flex flex-col justify-between shadow-sm">
          <span className="text-xs font-semibold text-omx-text-muted uppercase tracking-wider">
            Unrealized Profit / Loss
          </span>
          <div className="my-2 flex items-baseline gap-2">
            <span
              className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${
                totalPnl >= 0 ? 'text-omx-yes' : 'text-omx-no'
              }`}
            >
              {totalPnl >= 0 ? '+' : ''}
              ${totalPnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center ${
                totalPnl >= 0
                  ? 'bg-emerald-500/10 text-omx-yes border border-emerald-500/20'
                  : 'bg-rose-500/10 text-omx-no border border-rose-500/20'
              }`}
            >
              {totalPnl >= 0 ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {Math.abs(totalPnlPercent).toFixed(1)}%
            </span>
          </div>
          <span className="text-xs text-omx-text-muted">Across all open positions</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-omx-border pt-2">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'active'
              ? 'border-[#f23064] text-[#f23064]'
              : 'border-transparent text-omx-text-secondary hover:text-omx-text'
          }`}
        >
          Active Positions ({positions.length})
        </button>
        <button
          onClick={() => setActiveTab('closed')}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'closed'
              ? 'border-[#f23064] text-[#f23064]'
              : 'border-transparent text-omx-text-secondary hover:text-omx-text'
          }`}
        >
          Closed Positions (0)
        </button>
      </div>

      {/* Positions Content */}
      {activeTab === 'active' ? (
        positions.length === 0 ? (
          <div className="w-full rounded-omx-xl border border-omx-border bg-omx-card p-12 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-omx-muted flex items-center justify-center text-omx-text-muted mb-4 border border-omx-border">
              <PieChart className="w-6 h-6 text-omx-text-muted" />
            </div>
            <h3 className="text-lg font-bold text-omx-text">No active positions</h3>
            <p className="text-sm text-omx-text-secondary max-w-md mt-1 mb-6">
              You haven't placed any predictions yet. Explore open markets and start trading with your virtual demo funds.
            </p>
            <button
              onClick={() => navigate('/markets')}
              className="px-6 py-2.5 rounded-omx-md text-sm font-semibold text-white bg-gradient-to-r from-[#f23064] via-[#ff4f55] to-[#ff6b1a] hover:opacity-95 active:scale-[0.98] transition-all shadow-sm"
            >
              Explore Markets
            </button>
          </div>
        ) : (
          <div className="rounded-omx-xl border border-omx-border bg-omx-card overflow-hidden shadow-sm">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-omx-muted/50 border-b border-omx-border text-xs text-omx-text-muted uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Market</th>
                    <th className="py-3 px-4">Outcome</th>
                    <th className="py-3 px-4 text-right">Shares</th>
                    <th className="py-3 px-4 text-right">Avg Entry</th>
                    <th className="py-3 px-4 text-right">Current</th>
                    <th className="py-3 px-4 text-right">Invested</th>
                    <th className="py-3 px-4 text-right">Current Value</th>
                    <th className="py-3 px-4 text-right">P&L</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-omx-border">
                  {enrichedPositions.map((pos) => (
                    <tr
                      key={`${pos.marketId}-${pos.outcome}`}
                      className="hover:bg-omx-hover/60 transition-colors"
                    >
                      {/* Market Info */}
                      <td className="py-4 px-4 max-w-[280px]">
                        <div
                          onClick={() => navigate(`/markets/${pos.marketId}`)}
                          className="flex items-center gap-2.5 cursor-pointer group"
                        >
                          <span className="text-xl flex-shrink-0">{pos.marketIcon}</span>
                          <span className="font-semibold text-omx-text group-hover:text-[#f23064] transition-colors line-clamp-2">
                            {pos.marketTitle}
                          </span>
                        </div>
                      </td>

                      {/* Outcome Badge */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold font-mono border ${
                            pos.outcome === 'YES'
                              ? 'bg-emerald-500/10 text-omx-yes border-emerald-500/20'
                              : 'bg-rose-500/10 text-omx-no border-rose-500/20'
                          }`}
                        >
                          ● {pos.outcome}
                        </span>
                      </td>

                      {/* Shares */}
                      <td className="py-4 px-4 text-right font-mono font-medium text-omx-text whitespace-nowrap">
                        {pos.shares.toFixed(2)}
                      </td>

                      {/* Avg Entry Price */}
                      <td className="py-4 px-4 text-right font-mono text-omx-text-secondary whitespace-nowrap">
                        {pos.avgPrice.toFixed(1)}¢
                      </td>

                      {/* Current Price */}
                      <td className="py-4 px-4 text-right font-mono font-semibold text-omx-text whitespace-nowrap">
                        {pos.currentPrice}¢
                      </td>

                      {/* Invested Amount */}
                      <td className="py-4 px-4 text-right font-mono text-omx-text-secondary whitespace-nowrap">
                        ${pos.totalInvested.toFixed(2)}
                      </td>

                      {/* Current Value */}
                      <td className="py-4 px-4 text-right font-mono font-bold text-omx-text whitespace-nowrap">
                        ${pos.currentValue.toFixed(2)}
                      </td>

                      {/* P&L */}
                      <td className="py-4 px-4 text-right font-mono whitespace-nowrap">
                        <span
                          className={`font-semibold ${
                            pos.pnl >= 0 ? 'text-omx-yes' : 'text-omx-no'
                          }`}
                        >
                          {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)}
                          <span className="text-xs ml-1 font-normal opacity-80">
                            ({pos.pnlPercent >= 0 ? '+' : ''}
                            {pos.pnlPercent.toFixed(1)}%)
                          </span>
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/markets/${pos.marketId}`)}
                          className="px-3 py-1.5 rounded-omx-md text-xs font-semibold border border-omx-border bg-omx-card hover:bg-omx-hover text-omx-text transition-colors"
                        >
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden divide-y divide-omx-border">
              {enrichedPositions.map((pos) => (
                <div key={`${pos.marketId}-${pos.outcome}`} className="p-4 space-y-3">
                  <div
                    onClick={() => navigate(`/markets/${pos.marketId}`)}
                    className="flex items-start gap-2.5 cursor-pointer"
                  >
                    <span className="text-2xl flex-shrink-0">{pos.marketIcon}</span>
                    <div>
                      <h4 className="font-semibold text-sm text-omx-text leading-snug">
                        {pos.marketTitle}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold font-mono border ${
                            pos.outcome === 'YES'
                              ? 'bg-emerald-500/10 text-omx-yes border-emerald-500/20'
                              : 'bg-rose-500/10 text-omx-no border-rose-500/20'
                          }`}
                        >
                          {pos.outcome}
                        </span>
                        <span className="text-xs text-omx-text-muted">
                          {pos.shares.toFixed(2)} shares @ {pos.avgPrice.toFixed(1)}¢
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-omx-border/60 text-xs font-mono">
                    <div>
                      <span className="text-omx-text-muted block text-[10px] uppercase">Invested</span>
                      <span className="font-semibold text-omx-text">${pos.totalInvested.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-omx-text-muted block text-[10px] uppercase">Current Value</span>
                      <span className="font-bold text-omx-text">${pos.currentValue.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-omx-text-muted block text-[10px] uppercase">Current Price</span>
                      <span className="text-omx-text">{pos.currentPrice}¢</span>
                    </div>
                    <div>
                      <span className="text-omx-text-muted block text-[10px] uppercase">P&L</span>
                      <span className={`font-bold ${pos.pnl >= 0 ? 'text-omx-yes' : 'text-omx-no'}`}>
                        {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)} ({pos.pnlPercent >= 0 ? '+' : ''}
                        {pos.pnlPercent.toFixed(1)}%)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/markets/${pos.marketId}`)}
                    className="w-full py-2 rounded-omx-md text-xs font-semibold border border-omx-border bg-omx-muted hover:bg-omx-hover text-omx-text transition-colors"
                  >
                    View Market & Trade
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="w-full rounded-omx-xl border border-omx-border bg-omx-card p-12 flex flex-col items-center justify-center text-center shadow-sm">
          <h3 className="text-base font-bold text-omx-text">No closed positions</h3>
          <p className="text-xs text-omx-text-secondary max-w-sm mt-1">
            Positions will appear here once the prediction market resolves or you sell all held shares.
          </p>
        </div>
      )}
    </div>
  );
};
