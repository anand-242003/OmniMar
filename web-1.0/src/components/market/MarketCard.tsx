import React, { useState } from 'react';
import { Star } from 'lucide-react';
import type { Market } from '../../types';
import { useRouter } from '../../context/RouterContext';

interface MarketCardProps {
  market: Market;
  viewMode?: 'grid' | 'list';
}

export const MarketCard: React.FC<MarketCardProps> = ({
  market,
  viewMode = 'grid',
}) => {
  const { navigate } = useRouter();
  const [isFavorite, setIsFavorite] = useState(market.isFavorite || false);

  const handleCardClick = () => {
    navigate(`/markets/${market.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleTradeClick = (e: React.MouseEvent, _outcome: 'YES' | 'NO') => {
    e.stopPropagation();
    navigate(`/markets/${market.id}`);
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className="w-full flex items-center justify-between p-4 bg-omx-card border border-omx-border hover:border-omx-border-strong rounded-omx-xl transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-4">
          <div className="w-9 h-9 rounded-full bg-omx-muted border border-omx-border flex items-center justify-center text-base flex-shrink-0">
            {market.categoryIcon || '📊'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-omx-text-muted">
                {market.category}
              </span>
              <span className="text-xs text-omx-text-muted">·</span>
              <span className="text-xs text-omx-text-muted">Vol ${market.volume.toLocaleString()}</span>
              <span className="text-xs text-omx-text-muted">·</span>
              <span className="text-xs text-omx-text-muted">{market.traders} traders</span>
            </div>
            <h4 className="text-sm font-semibold text-omx-text group-hover:text-[#f23064] transition-colors truncate">
              {market.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right">
            <span className="text-lg font-bold font-mono text-omx-text">
              {market.probability}%
            </span>
            <div className="text-[11px] text-emerald-500 font-mono">
              ↑ {market.delta >= 0 ? `+${market.delta.toFixed(1)}%` : `${market.delta.toFixed(1)}%`}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => handleTradeClick(e, 'YES')}
              className="px-3 py-1.5 rounded-omx-md text-xs font-bold font-mono bg-omx-yes-bg text-omx-yes border border-omx-yes-border hover:opacity-90 transition-opacity"
            >
              YES {market.yesPrice}¢
            </button>
            <button
              onClick={(e) => handleTradeClick(e, 'NO')}
              className="px-3 py-1.5 rounded-omx-md text-xs font-bold font-mono bg-omx-no-bg text-omx-no border border-omx-no-border hover:opacity-90 transition-opacity"
            >
              NO {market.noPrice}¢
            </button>
            <button
              onClick={handleFavoriteClick}
              className="p-1 text-omx-text-muted hover:text-amber-400 transition-colors"
              aria-label="Favorite"
            >
              <Star
                className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid Card View (Default)
  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col justify-between p-4 bg-omx-card border border-omx-border hover:border-omx-border-strong rounded-omx-xl transition-all cursor-pointer group shadow-sm hover:shadow-omx-md min-w-[280px]"
    >
      {/* Top Header: Category Tag & Favorite Star */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-omx-sm bg-omx-muted text-[10px] font-bold tracking-wider uppercase text-omx-text-secondary border border-omx-border">
            <span>{market.categoryIcon}</span>
            <span>{market.category}</span>
          </span>
          <button
            onClick={handleFavoriteClick}
            className="p-1 text-omx-text-muted hover:text-amber-400 transition-colors"
            aria-label="Favorite"
          >
            <Star
              className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`}
            />
          </button>
        </div>

        {/* Title Row */}
        <div className="flex items-start gap-2.5 mb-4">
          <div className="w-6 h-6 rounded-full bg-omx-muted flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
            {market.categoryIcon || '📊'}
          </div>
          <h3 className="text-sm font-semibold text-omx-text group-hover:text-[#f23064] transition-colors line-clamp-2 min-h-[40px] leading-snug">
            {market.title}
          </h3>
        </div>
      </div>

      {/* Metrics Section */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-2xl font-bold font-mono tracking-tight text-emerald-500">
            {market.probability}%
          </span>
          <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            ↑ {market.delta >= 0 ? `${market.delta}%` : `${market.delta}%`}
          </span>
        </div>

        {/* Probability Progress Bar */}
        <div className="w-full h-1 bg-omx-muted rounded-full overflow-hidden mb-3.5">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${market.probability}%` }}
          />
        </div>

        {/* Volume & Traders Row */}
        <div className="flex items-center justify-between text-xs text-omx-text-muted font-mono mb-3 pt-1 border-t border-omx-border">
          <span>Vol ${market.volume.toLocaleString()}</span>
          <span>{market.traders} traders</span>
        </div>

        {/* Quick Trade Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={(e) => handleTradeClick(e, 'YES')}
            className="w-full py-2 px-3 rounded-omx-md text-xs font-bold font-mono bg-omx-yes-bg text-omx-yes border border-omx-yes-border hover:opacity-90 active:scale-[0.98] transition-all text-center"
          >
            YES {market.yesPrice}¢
          </button>
          <button
            onClick={(e) => handleTradeClick(e, 'NO')}
            className="w-full py-2 px-3 rounded-omx-md text-xs font-bold font-mono bg-omx-no-bg text-omx-no border border-omx-no-border hover:opacity-90 active:scale-[0.98] transition-all text-center"
          >
            NO {market.noPrice}¢
          </button>
        </div>
      </div>
    </div>
  );
};
