import React, { useState, useEffect, useRef } from 'react';
import { Film, Landmark, Cpu, Trophy, Coins, CheckCircle2, ArrowUpRight } from 'lucide-react';
import type { Market } from '../../types/market';
import { useRouter } from '../../context/RouterContext';

interface MarketCardProps {
  market: Market;
}

// Category Lucide Icon Mapper (Strictly NO consumer emojis)
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'entertainment':
      return <Film className="h-3.5 w-3.5 text-omx-text-secondary" />;
    case 'macro & politics':
    case 'macro':
      return <Landmark className="h-3.5 w-3.5 text-omx-text-secondary" />;
    case 'technology':
      return <Cpu className="h-3.5 w-3.5 text-omx-text-secondary" />;
    case 'sports':
      return <Trophy className="h-3.5 w-3.5 text-omx-text-secondary" />;
    case 'crypto':
      return <Coins className="h-3.5 w-3.5 text-omx-text-secondary" />;
    default:
      return <Film className="h-3.5 w-3.5 text-omx-text-secondary" />;
  }
};

const formatVolume = (vol: number): string => {
  if (vol >= 1_000_000) return `$${(vol / 1_000_000).toFixed(1)}M`;
  if (vol >= 1_000) return `$${(vol / 1_000).toFixed(1)}K`;
  return `$${vol}`;
};

export const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
  const { navigate } = useRouter();
  const isResolved = market.status === 'RESOLVED';
  const isNewMarket = market.volume24h === 0;

  const [priceFlash, setPriceFlash] = useState<'UP' | 'DOWN' | null>(null);
  const prevProbRef = useRef(market.impliedProbabilityYes);

  useEffect(() => {
    if (prevProbRef.current !== market.impliedProbabilityYes) {
      setPriceFlash(market.impliedProbabilityYes > prevProbRef.current ? 'UP' : 'DOWN');
      prevProbRef.current = market.impliedProbabilityYes;
      const timer = setTimeout(() => setPriceFlash(null), 600);
      return () => clearTimeout(timer);
    }
  }, [market.impliedProbabilityYes]);

  const handleCardClick = () => {
    navigate(`/markets/${market.id}`);
  };

  const handleOutcomeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // M12 Invariant: Navigates normally to Market Detail page without query parameter pre-staging
    navigate(`/markets/${market.id}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className={`group relative flex flex-col justify-between rounded-xl border border-omx-border bg-omx-card p-5 shadow-omx-card transition-all duration-150 hover:border-omx-border-strong hover:shadow-lg cursor-pointer min-w-0 overflow-hidden ${
        isResolved ? 'opacity-85' : ''
      }`}
    >
      {/* 1. Context & Metadata Header */}
      <div className="flex items-center justify-between gap-2 text-xs text-omx-text-muted mb-3 min-w-0">
        <div className="flex items-center space-x-1.5 min-w-0 truncate">
          {getCategoryIcon(market.category)}
          <span className="font-medium text-omx-text-secondary truncate">{market.category}</span>
          <span className="text-omx-border-strong shrink-0">·</span>
          <span className="font-mono text-xs truncate">Closes {market.closingDate}</span>
        </div>

        {/* Status indicator: Static green beacon for LIVE; clean badge for RESOLVED */}
        {isResolved ? (
          <span className="inline-flex items-center space-x-1 rounded-full border border-omx-border bg-omx-bg px-2 py-0.5 text-xs font-mono font-semibold text-omx-text-secondary shrink-0">
            <CheckCircle2 className="h-3 w-3 text-omx-yes" />
            <span>RESOLVED</span>
          </span>
        ) : (
          <span className="inline-flex items-center space-x-1.5 text-xs font-mono text-omx-text-muted shrink-0">
            <span className="h-2 w-2 rounded-full bg-omx-yes" />
            <span>LIVE</span>
          </span>
        )}
      </div>

      {/* 2. The Market Question (Clamped to 2 lines in Sora) */}
      <div className="mb-4">
        <h3 className="font-sora font-semibold text-sm leading-snug text-omx-text line-clamp-2 group-hover:text-omx-brand transition-colors">
          {market.question}
        </h3>
      </div>

      {/* 3. Dual / Multi Probability Bar & Metrics */}
      {market.outcomeType === 'multi' && market.outcomes && market.outcomes.length > 0 ? (
        <div className="space-y-2 mb-4">
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-omx-elevated border border-omx-border/60 flex">
            {market.outcomes.map((opt, i) => {
              const colors = ['bg-indigo-500', 'bg-slate-400', 'bg-emerald-500', 'bg-amber-500'];
              return (
                <div
                  key={opt.id}
                  style={{ width: `${opt.probability}%` }}
                  className={`h-full ${colors[i % colors.length]} transition-all duration-300`}
                  title={`${opt.label}: ${opt.probability}%`}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-omx-text-secondary gap-1">
            {market.outcomes.slice(0, 3).map((opt) => (
              <span key={opt.id} className="truncate">
                <span className="font-semibold text-omx-text">{opt.label}</span> {opt.probability}%
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2 mb-4">
          {/* Proportional Odds Progress Bar (h-2 with subtle 50% toss-up baseline) */}
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-omx-elevated border border-omx-border/60 flex">
            <div
              style={{ width: `${market.impliedProbabilityYes}%` }}
              className="h-full bg-omx-yes transition-[width] duration-300 ease-out"
            />
            <div
              style={{ width: `${market.impliedProbabilityNo}%` }}
              className="h-full bg-omx-no transition-[width] duration-300 ease-out"
            />
            {/* Subtle 50% Toss-up center notch indicator */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-omx-card z-10 pointer-events-none opacity-80"
              title="50% Toss-up baseline"
            />
          </div>

          {/* Paired Odds + Cent Price Values */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span
              className={`font-bold text-omx-yes flex items-center space-x-1 px-1.5 py-0.5 rounded transition-all duration-200 ${
                priceFlash === 'UP' ? 'bg-emerald-500/25 scale-105' : ''
              }`}
            >
              <span>▲ {market.impliedProbabilityYes}% YES</span>
              <span className="text-omx-text-muted font-normal text-xs">· {market.yesPrice}¢</span>
            </span>
            <span
              className={`font-bold text-omx-no flex items-center space-x-1 px-1.5 py-0.5 rounded transition-all duration-200 ${
                priceFlash === 'DOWN' ? 'bg-rose-500/25 scale-105' : ''
              }`}
            >
              <span className="text-omx-text-muted font-normal text-xs">{market.noPrice}¢ ·</span>
              <span>▼ {market.impliedProbabilityNo}% NO</span>
            </span>
          </div>
        </div>
      )}

      {/* 4. Action Area */}
      <div className="mb-4">
        {isResolved ? (
          <div className="flex items-center justify-between rounded-lg border border-omx-border bg-omx-bg px-3 py-2.5 text-xs">
            <span className="font-mono font-bold text-omx-yes">
              Settled: YES ($1.00 Payout)
            </span>
            <span className="text-omx-text-secondary flex items-center space-x-1 text-xs font-medium group-hover:text-omx-text">
              <span>View Details</span>
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        ) : market.outcomeType === 'multi' && market.outcomes && market.outcomes.length > 0 ? (
          <button
            type="button"
            onClick={handleOutcomeClick}
            className="w-full flex min-h-[44px] items-center justify-between rounded-lg border border-omx-border-strong/70 bg-omx-elevated px-3 py-2 text-xs font-sora font-semibold text-omx-text hover:border-omx-brand hover:text-omx-brand transition-all cursor-pointer"
          >
            <span>View {market.outcomes.length} Options</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-omx-text-secondary" />
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleOutcomeClick}
              className="flex min-h-[44px] items-center justify-center space-x-1.5 rounded-lg border border-omx-yes/40 bg-omx-yes-bg/40 px-3 py-2 text-xs font-sora font-semibold text-omx-yes hover:border-omx-yes hover:bg-omx-yes-bg transition-all cursor-pointer"
            >
              <span>▲ YES</span>
              <span className="font-mono font-bold">{market.yesPrice}¢</span>
            </button>
            <button
              type="button"
              onClick={handleOutcomeClick}
              className="flex min-h-[44px] items-center justify-center space-x-1.5 rounded-lg border border-omx-no/40 bg-omx-no-bg/40 px-3 py-2 text-xs font-sora font-semibold text-omx-no hover:border-omx-no hover:bg-omx-no-bg transition-all cursor-pointer"
            >
              <span>▼ NO</span>
              <span className="font-mono font-bold">{market.noPrice}¢</span>
            </button>
          </div>
        )}
      </div>

      {/* 5. Settlement Proof & Liquidity Footer (Un-truncated Resolution Source - File 01 C1) */}
      <div className="border-t border-omx-border/80 pt-3 text-xs space-y-1.5 min-w-0">
        <div className="flex items-center justify-between text-omx-text-secondary font-mono">
          {isNewMarket ? (
            <span className="text-omx-text-muted italic">New market · 50% baseline</span>
          ) : (
            <>
              <span>{formatVolume(market.volume24h)} 24h vol</span>
              <span className="text-omx-text-muted">
                {market.predictorsCount.toLocaleString()} predictions
              </span>
            </>
          )}
        </div>

        {/* Never cut off resolution source with truncate - trust anchor */}
        <div className="text-[11px] text-omx-text-secondary/90 leading-snug pt-0.5">
          <span className="font-semibold text-omx-text">Source: </span>
          <span>{market.resolutionSource}</span>
        </div>
      </div>
    </article>
  );
};
