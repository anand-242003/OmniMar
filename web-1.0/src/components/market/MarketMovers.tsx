import React from 'react';
import type { Market } from '../../types';
import { useRouter } from '../../context/RouterContext';

interface MarketMoversProps {
  markets: Market[];
}

export const MarketMovers: React.FC<MarketMoversProps> = ({ markets }) => {
  const { navigate } = useRouter();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-omx-text">Market Movers</h2>
        <button
          onClick={() => navigate('/markets')}
          className="text-xs font-semibold text-[#f23064] hover:underline"
        >
          View All
        </button>
      </div>

      {/* Movers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {markets.slice(0, 6).map((market) => (
          <div
            key={market.id}
            onClick={() => navigate(`/markets/${market.id}`)}
            className="flex items-center justify-between p-3.5 rounded-omx-xl bg-omx-card border border-omx-border hover:border-omx-border-strong cursor-pointer group transition-all"
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="w-8 h-8 rounded-full bg-omx-muted border border-omx-border flex items-center justify-center text-sm flex-shrink-0">
                {market.categoryIcon || '📊'}
              </div>
              <h4 className="text-xs font-semibold text-omx-text group-hover:text-[#f23064] transition-colors line-clamp-2">
                {market.title}
              </h4>
            </div>

            <div className="flex-shrink-0 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-mono text-[11px] font-semibold">
              ↑ {market.delta >= 0 ? `+${market.delta.toFixed(2)}%` : `${market.delta.toFixed(2)}%`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
