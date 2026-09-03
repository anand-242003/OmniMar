import React, { useState } from 'react';
import { MARKETS } from '../data/markets';
import { CategoryPills } from '../components/market/CategoryPills';
import { Sparkline } from '../components/market/Sparkline';
import { LiveMarketPulse } from '../components/trending/LiveMarketPulse';
import { TopVolumeMoversRail } from '../components/trending/TopVolumeMoversRail';
import { useRouter } from '../context/RouterContext';

export const TrendingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { navigate } = useRouter();

  const filteredMarkets = selectedCategory === 'all'
    ? MARKETS
    : MARKETS.filter(
        (m) => m.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  // Ranked by volume then delta
  const rankedMarkets = [...filteredMarkets]
    .sort((a, b) => b.volume - a.volume || b.probability - a.probability)
    .slice(0, 10);

  const handleTradeClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/markets/${id}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-omx-text">
          Trending
        </h1>
        <p className="text-sm text-omx-text-secondary mt-1">
          Real-time ranking of the most active markets.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div>
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Grid: Left Ranked Markets + Right Rail Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Column (8 cols on desktop) */}
        <div className="lg:col-span-8 rounded-omx-xl bg-omx-card border border-omx-border overflow-hidden">
          {/* Section Header */}
          <div className="p-4 sm:p-5 border-b border-omx-border">
            <h2 className="text-base font-bold text-omx-text">Top Trending Markets</h2>
            <p className="text-xs text-omx-text-muted mt-0.5">
              {rankedMarkets.length} markets sorted by volume
            </p>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-omx-border">
            {rankedMarkets.map((market, index) => (
              <div
                key={market.id}
                onClick={() => navigate(`/markets/${market.id}`)}
                className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:bg-omx-hover transition-colors cursor-pointer group"
              >
                {/* Left: Rank, Icon, Title, Metadata */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="w-5 text-center font-mono text-sm font-bold text-omx-text-muted flex-shrink-0">
                    {index + 1}
                  </span>

                  <div className="w-9 h-9 rounded-full bg-omx-muted border border-omx-border flex items-center justify-center text-sm flex-shrink-0">
                    {market.categoryIcon || '📊'}
                  </div>

                  <div className="min-w-0 flex-1 pr-2">
                    <h3 className="text-xs sm:text-sm font-semibold text-omx-text group-hover:text-[#f23064] transition-colors line-clamp-1">
                      {market.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-omx-text-muted font-mono">
                      <span className="font-bold tracking-wider uppercase text-omx-text-secondary">
                        {market.category}
                      </span>
                      <span>·</span>
                      <span>${market.volume.toLocaleString()} vol</span>
                      <span>·</span>
                      <span>{market.traders} traders</span>
                    </div>
                  </div>
                </div>

                {/* Right: Sparkline, Probability, Quick Trade Chips */}
                <div className="flex items-center justify-between sm:justify-end gap-3.5 flex-shrink-0 pl-8 sm:pl-0">
                  {/* Deterministic Sparkline */}
                  <div className="hidden sm:block">
                    <Sparkline data={market.sparkline} />
                  </div>

                  {/* Probability & Delta */}
                  <div className="text-right min-w-[54px]">
                    <div className="text-sm font-bold font-mono text-emerald-500">
                      {market.probability}%
                    </div>
                    <div className="text-[10px] font-mono text-emerald-500">
                      {market.delta >= 0 ? `+${market.delta.toFixed(1)}%` : `${market.delta.toFixed(1)}%`}
                    </div>
                  </div>

                  {/* Quick Action Chips */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleTradeClick(e, market.id)}
                      className="px-2.5 py-1 rounded-omx-md text-[11px] font-bold font-mono bg-omx-yes-bg text-omx-yes border border-omx-yes-border hover:opacity-90 transition-opacity"
                    >
                      YES {market.yesPrice}¢
                    </button>
                    <button
                      onClick={(e) => handleTradeClick(e, market.id)}
                      className="px-2.5 py-1 rounded-omx-md text-[11px] font-bold font-mono bg-omx-no-bg text-omx-no border border-omx-no-border hover:opacity-90 transition-opacity"
                    >
                      NO {market.noPrice}¢
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Market Pulse + Top Volume Movers (4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-5">
          <LiveMarketPulse />
          <TopVolumeMoversRail markets={MARKETS} />
        </div>
      </div>
    </div>
  );
};
