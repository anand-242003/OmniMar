import React, { useState } from 'react';
import {
  Trophy,
  Crown,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import {
  LEADERBOARD_CATEGORIES,
  LEADERBOARD_FIXTURES,
} from '../data/leaderboard';
import { MARKETS } from '../data/markets';

export const LeaderboardPage: React.FC = () => {
  const { navigate } = useRouter();

  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'all_time'>('all_time');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTraders = LEADERBOARD_FIXTURES.filter((t) => {
    if (t.timeframe !== timeframe) return false;
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    return true;
  });

  const topThree = filteredTraders.slice(0, 3);
  const remainingTraders = filteredTraders.slice(3);

  // Trending markets for right rail
  const trendingMarkets = MARKETS.slice(0, 3);

  return (
    <div className="flex gap-6 pb-12 animate-in fade-in duration-150">
      {/* Main Leaderboard Column */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Header & Reward Pool Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-omx-text">
                Leaderboard
              </h1>
            </div>
            <p className="text-sm text-omx-text-secondary mt-1">
              Compete with the best predictors on OmniMarket X.
            </p>
          </div>

          {/* $250,000 Monthly Rewards Card */}
          <div className="rounded-omx-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-transparent p-4 sm:p-5 flex items-center gap-3.5 shadow-sm">
            <div className="w-11 h-11 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-omx-text-muted uppercase tracking-wider block">
                Monthly rewards
              </span>
              <span className="text-2xl font-black text-omx-text font-mono tracking-tight block">
                $250,000
              </span>
            </div>
          </div>
        </div>

        {/* Timeframe Selector Tabs */}
        <div className="flex items-center gap-2">
          {(
            [
              { id: 'daily', label: 'Daily' },
              { id: 'weekly', label: 'Weekly' },
              { id: 'monthly', label: 'Monthly' },
              { id: 'all_time', label: 'All Time' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeframe(tab.id)}
              className={`px-4 py-2 rounded-omx-lg text-xs font-bold transition-all ${
                timeframe === tab.id
                  ? 'border border-[#f23064] text-[#f23064] bg-[#f23064]/10 shadow-sm'
                  : 'border border-omx-border bg-omx-card text-omx-text-secondary hover:text-omx-text hover:border-omx-border/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Filter Pills & Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {LEADERBOARD_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'border-[#f23064] text-[#f23064] bg-[#f23064]/10 font-bold'
                    : 'border-omx-border bg-omx-card text-omx-text-secondary hover:text-omx-text'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-omx-md border border-omx-border bg-omx-card text-xs text-omx-text font-medium cursor-pointer">
              <span>Highest ROI</span>
              <ChevronDown className="w-3.5 h-3.5 text-omx-text-muted" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-omx-md border border-omx-border bg-omx-card text-xs text-omx-text font-medium hover:bg-omx-hover transition-colors">
              <SlidersHorizontal className="w-3.5 h-3.5 text-omx-text-muted" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main Rankings Area */}
        {filteredTraders.length === 0 ? (
          /* Observed Empty State (matches monthly screenshot) */
          <div className="w-full rounded-omx-xl border border-omx-border bg-omx-card p-16 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-omx-muted flex items-center justify-center text-omx-text-muted mb-4 border border-omx-border">
              <Trophy className="w-7 h-7 text-omx-text-muted" />
            </div>
            <h3 className="text-base font-bold text-omx-text">No ranked traders yet</h3>
            <p className="text-xs text-omx-text-secondary max-w-sm mt-1">
              Try a different period or category — rankings refresh as trades settle.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top 3 Podium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topThree.map((trader) => {
                const isFirst = trader.rank === 1;
                const isSecond = trader.rank === 2;

                return (
                  <div
                    key={trader.id}
                    className={`rounded-omx-xl border p-5 flex flex-col items-center text-center relative overflow-hidden transition-all ${
                      isFirst
                        ? 'border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-omx-card to-omx-card shadow-md md:-translate-y-2'
                        : isSecond
                        ? 'border-slate-400/30 bg-omx-card shadow-sm'
                        : 'border-amber-700/30 bg-omx-card shadow-sm'
                    }`}
                  >
                    {/* Crown or Rank Badge */}
                    <div className="mb-2">
                      {isFirst ? (
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
                          <Crown className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-omx-muted border border-omx-border text-omx-text font-black text-xs flex items-center justify-center">
                          #{trader.rank}
                        </div>
                      )}
                    </div>

                    {/* Avatar */}
                    <div
                      className={`w-14 h-14 rounded-full border flex items-center justify-center text-base font-bold mb-2 ${trader.avatarBg}`}
                    >
                      {trader.avatarInitials}
                    </div>

                    <h4 className="font-bold text-sm text-omx-text">{trader.name}</h4>
                    <span className="text-xs text-omx-text-muted font-mono">{trader.handle}</span>

                    {/* Stats */}
                    <div className="w-full mt-4 pt-3 border-t border-omx-border/60 grid grid-cols-2 gap-2 text-center text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-omx-text-muted uppercase block">P&L</span>
                        <span className="font-bold text-omx-yes">
                          +${trader.pnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-omx-text-muted uppercase block">Win Rate</span>
                        <span className="font-bold text-omx-text">{trader.winRate}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rankings Table */}
            {remainingTraders.length > 0 && (
              <div className="rounded-omx-xl border border-omx-border bg-omx-card overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-omx-muted/50 border-b border-omx-border text-omx-text-muted uppercase font-semibold">
                      <tr>
                        <th className="py-3 px-4 w-12 text-center">Rank</th>
                        <th className="py-3 px-4">Predictor</th>
                        <th className="py-3 px-4 text-right">Profit & Loss</th>
                        <th className="py-3 px-4 text-right">Win Rate</th>
                        <th className="py-3 px-4 text-right">Total Trades</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-omx-border">
                      {remainingTraders.map((trader) => (
                        <tr
                          key={trader.id}
                          className="hover:bg-omx-hover/60 transition-colors"
                        >
                          <td className="py-3.5 px-4 text-center font-bold font-mono text-omx-text-muted">
                            #{trader.rank}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${trader.avatarBg}`}
                              >
                                {trader.avatarInitials}
                              </div>
                              <div>
                                <span className="font-bold text-omx-text block leading-tight">
                                  {trader.name}
                                </span>
                                <span className="text-[11px] text-omx-text-muted font-mono">
                                  {trader.handle}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono">
                            <span className="font-bold text-omx-yes block">
                              +${trader.pnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                            <span className="text-[10px] text-emerald-500/80">
                              (+{trader.pnlPercent.toFixed(1)}%)
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-semibold text-omx-text">
                            {trader.winRate}%
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono text-omx-text-secondary">
                            {trader.totalTrades}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Rail: Fastest Rising & Trending Now */}
      <div className="hidden xl:block w-72 flex-shrink-0 space-y-4">
        {/* Fastest Rising Card */}
        <div className="rounded-omx-xl border border-omx-border bg-omx-card p-5 shadow-sm text-center">
          <h3 className="text-sm font-bold text-omx-text mb-3 text-left">Fastest Rising</h3>
          <div className="py-6 space-y-1">
            <p className="text-xs font-semibold text-omx-text">No data yet</p>
            <p className="text-[11px] text-omx-text-muted">
              Check back later to see the fastest-rising predictors.
            </p>
          </div>
        </div>

        {/* Trending Now Card */}
        <div className="rounded-omx-xl border border-omx-border bg-omx-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-omx-text">Trending Now</h3>
            <span
              onClick={() => navigate('/trending')}
              className="text-xs font-semibold text-[#f23064] cursor-pointer hover:underline"
            >
              View all
            </span>
          </div>

          <div className="space-y-3 divide-y divide-omx-border/60">
            {trendingMarkets.map((market, idx) => (
              <div
                key={market.id}
                onClick={() => navigate(`/markets/${market.id}`)}
                className={`flex items-start justify-between gap-3 cursor-pointer group ${
                  idx > 0 ? 'pt-3' : ''
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    {market.categoryIcon || '📊'}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-omx-text group-hover:text-[#f23064] transition-colors line-clamp-2 leading-snug">
                      {market.title}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-emerald-400 flex-shrink-0">
                  {market.probability}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
