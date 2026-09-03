import React from 'react';
import { Calendar, CheckCircle2, DollarSign, Users, Film, Landmark, Cpu, Trophy } from 'lucide-react';
import type { Market } from '../../types/market';
import type { Outcome } from '../../types/trade';

interface MarketHeaderProps {
  market: Market;
  onSelectOutcome?: (outcome: Outcome) => void;
}

export const MarketHeader: React.FC<MarketHeaderProps> = ({ market, onSelectOutcome }) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'entertainment':
        return <Film className="h-3.5 w-3.5 text-omx-brand" />;
      case 'macro':
        return <Landmark className="h-3.5 w-3.5 text-omx-sandbox" />;
      case 'technology':
      case 'crypto':
        return <Cpu className="h-3.5 w-3.5 text-sky-400" />;
      case 'sports':
        return <Trophy className="h-3.5 w-3.5 text-amber-400" />;
      default:
        return <Film className="h-3.5 w-3.5 text-omx-text-secondary" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Category, Status & Resolution Timing Meta */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center space-x-1.5 rounded-full border border-omx-border bg-omx-card px-2.5 py-1 font-medium text-omx-text">
          {getCategoryIcon(market.category)}
          <span>{market.category}</span>
        </span>

        {/* Refinement 03: Static Semantic Status Indicator (NO animate-pulse) */}
        <span className="inline-flex items-center space-x-1.5 rounded-full border border-omx-yes/30 bg-omx-yes-bg px-2.5 py-1 font-semibold text-omx-yes text-[11px] uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-omx-yes" />
          <span>Active Prediction</span>
        </span>

        <span className="inline-flex items-center space-x-1.5 text-omx-text-secondary">
          <Calendar className="h-3.5 w-3.5 text-omx-text-muted" />
          <span>Closes {market.closingDate}</span>
        </span>
      </div>

      {/* Dominant Market Question (Sora 24px/32px Bold) */}
      <h1 className="font-sora text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-omx-text leading-snug">
        {market.question}
      </h1>

      {/* Refinement 02: Compact, High-Information Market Odds Display (Stages Order Slip on Click) */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="button"
          onClick={() => onSelectOutcome?.('YES')}
          title="Click to stage YES in Trade Slip"
          className="flex items-center space-x-2.5 rounded-lg border border-omx-yes/35 bg-omx-yes-bg/30 px-3.5 py-2 text-xs hover:border-omx-yes hover:bg-omx-yes-bg/50 transition-all text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-omx-yes"
        >
          <span className="font-sora font-bold text-omx-yes">▲ YES</span>
          <span className="font-mono font-bold text-base text-omx-text group-hover:text-omx-yes transition-colors">
            {market.yesPrice}¢
          </span>
          <span className="text-omx-text-secondary font-mono text-[11px]">
            (~{market.impliedProbabilityYes}% implied probability)
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSelectOutcome?.('NO')}
          title="Click to stage NO in Trade Slip"
          className="flex items-center space-x-2.5 rounded-lg border border-omx-no/35 bg-omx-no-bg/30 px-3.5 py-2 text-xs hover:border-omx-no hover:bg-omx-no-bg/50 transition-all text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-omx-no"
        >
          <span className="font-sora font-bold text-omx-no">▼ NO</span>
          <span className="font-mono font-bold text-base text-omx-text group-hover:text-omx-no transition-colors">
            {market.noPrice}¢
          </span>
          <span className="text-omx-text-secondary font-mono text-[11px]">
            (~{market.impliedProbabilityNo}% implied probability)
          </span>
        </button>

        <span className="text-xs text-omx-text-muted hidden md:inline">
          • Each winning share settles to $1.00 USDC
        </span>
      </div>

      {/* Market Supporting Metrics & Consumer Resolution Source */}
      <div className="flex flex-wrap items-center gap-y-2 gap-x-6 border-y border-omx-border py-2.5 text-xs text-omx-text-secondary">
        <div className="flex items-center space-x-1.5">
          <DollarSign className="h-3.5 w-3.5 text-omx-text-muted" />
          <span>24h Vol:</span>
          <span className="font-mono font-semibold text-omx-text">
            ${market.volume24h.toLocaleString()} USDC
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <span>Total Vol:</span>
          <span className="font-mono font-semibold text-omx-text">
            ${market.totalVolume.toLocaleString()} USDC
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <Users className="h-3.5 w-3.5 text-omx-text-muted" />
          <span>Predictors:</span>
          <span className="font-mono font-semibold text-omx-text">
            {market.predictorsCount.toLocaleString()}
          </span>
        </div>

        {/* Refinement 07 & 08: Consumer Language + Full Resolution Source (NO truncation) */}
        <div className="flex items-center space-x-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-omx-yes shrink-0" />
          <span>Resolution source:</span>
          <span className="font-medium text-omx-text">
            {market.resolutionSource}
          </span>
        </div>
      </div>

      {/* Plain-English Description */}
      <p className="text-sm text-omx-text-secondary leading-relaxed pt-1">
        {market.description}
      </p>
    </div>
  );
};
