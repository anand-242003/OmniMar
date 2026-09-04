import React, { useState, useMemo } from 'react';
import { Flame, TrendingUp, Zap, Clock, ArrowUpRight, Sparkles } from 'lucide-react';
import { MARKETS } from '../data/markets';
import { MarketCard } from '../components/market/MarketCard';

type TrendingFilter = 'all' | 'movers' | 'volume' | 'closing';

export const TrendingPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<TrendingFilter>('all');

  // Compute platform pulse stats
  const totalVolume = useMemo(() => {
    return MARKETS.reduce((acc, m) => acc + m.volume24h, 0);
  }, []);

  const totalPredictors = useMemo(() => {
    return MARKETS.reduce((acc, m) => acc + m.predictorsCount, 0);
  }, []);

  // Filter and rank trending markets
  const trendingMarkets = useMemo(() => {
    let list = [...MARKETS].filter((m) => m.status === 'ACTIVE');

    if (activeFilter === 'volume') {
      return list.sort((a, b) => b.volume24h - a.volume24h);
    }
    if (activeFilter === 'closing') {
      // Prioritize markets closing soonest (2026 dates)
      return list.sort((a, b) => a.closingDate.localeCompare(b.closingDate));
    }
    if (activeFilter === 'movers') {
      // Top probability delta
      return list.sort((a, b) => Math.abs(b.impliedProbabilityYes - 50) - Math.abs(a.impliedProbabilityYes - 50));
    }

    // Default: Sort by 24h volume
    return list.sort((a, b) => b.volume24h - a.volume24h);
  }, [activeFilter]);

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full space-y-8">
      {/* 1. Header & Context */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
            <Flame className="h-4 w-4" />
          </div>
          <h1 className="font-sora text-2xl sm:text-3xl font-extrabold tracking-tight text-omx-text">
            Trending & Velocity
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-omx-text-secondary max-w-2xl">
          Real-time momentum, 24-hour volume surges, and significant probability shifts across active prediction propositions.
        </p>
      </div>

      {/* 2. Platform Velocity Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: 24h Volume */}
        <div className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-omx-text-muted">
            <span>24h Platform Volume</span>
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-omx-text">
            ${totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            +18.4% velocity vs prior 24h
          </div>
        </div>

        {/* Metric 2: Active Participants */}
        <div className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-omx-text-muted">
            <span>Active Forecasters</span>
            <Zap className="h-3.5 w-3.5 text-omx-brand" />
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-omx-text">
            {totalPredictors.toLocaleString()}
          </div>
          <div className="text-[11px] text-omx-text-secondary font-mono">
            Across {MARKETS.length} verified global markets
          </div>
        </div>

        {/* Metric 3: Top Volatility Mover */}
        <div className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-omx-text-muted">
            <span>Top Probability Mover</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <div className="font-sora text-sm font-bold text-omx-text truncate">
            Take-Two GTA VI Release
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
            65% YES (▲ +8% in last 7 days)
          </div>
        </div>
      </div>

      {/* 3. Filter Navigation Strip */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none w-full">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`flex min-h-[44px] items-center space-x-2 rounded-xl px-4 py-2 text-xs font-sora font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
            activeFilter === 'all'
              ? 'border-omx-brand bg-omx-brand/10 text-omx-brand font-bold shadow-sm'
              : 'border-omx-border-strong/70 bg-omx-card text-omx-text-secondary hover:border-omx-border-strong hover:text-omx-text'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>All Trending</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('volume')}
          className={`flex min-h-[44px] items-center space-x-2 rounded-xl px-4 py-2 text-xs font-sora font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
            activeFilter === 'volume'
              ? 'border-omx-brand bg-omx-brand/10 text-omx-brand font-bold shadow-sm'
              : 'border-omx-border-strong/70 bg-omx-card text-omx-text-secondary hover:border-omx-border-strong hover:text-omx-text'
          }`}
        >
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Highest Volume</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('movers')}
          className={`flex min-h-[44px] items-center space-x-2 rounded-xl px-4 py-2 text-xs font-sora font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
            activeFilter === 'movers'
              ? 'border-omx-brand bg-omx-brand/10 text-omx-brand font-bold shadow-sm'
              : 'border-omx-border-strong/70 bg-omx-card text-omx-text-secondary hover:border-omx-border-strong hover:text-omx-text'
          }`}
        >
          <Zap className="h-3.5 w-3.5" />
          <span>Biggest Consensus Shifts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('closing')}
          className={`flex min-h-[44px] items-center space-x-2 rounded-xl px-4 py-2 text-xs font-sora font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
            activeFilter === 'closing'
              ? 'border-omx-brand bg-omx-brand/10 text-omx-brand font-bold shadow-sm'
              : 'border-omx-border-strong/70 bg-omx-card text-omx-text-secondary hover:border-omx-border-strong hover:text-omx-text'
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          <span>Closing Soon</span>
        </button>
      </div>

      {/* 4. Canonical Responsive Card Grid */}
      <section aria-label="Trending markets list">
        <div className="grid grid-cols-1 md:grid-cols-[repeat(2,minmax(0,1fr))] xl:grid-cols-[repeat(3,minmax(0,1fr))] gap-6 min-w-0">
          {trendingMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </section>
    </main>
  );
};
