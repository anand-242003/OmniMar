import React from 'react';
import { Briefcase, ArrowUpRight } from 'lucide-react';
import { useTrade } from '../../context/TradeContext';
import type { Market } from '../../types/market';

interface ActivePositionCardProps {
  market: Market;
}

export const ActivePositionCard: React.FC<ActivePositionCardProps> = ({ market }) => {
  const { positions, cashOutPosition } = useTrade();

  const currentPositions = positions.filter((p) => p.marketId === market.id);

  if (currentPositions.length === 0) return null;

  return (
    <div id="active-positions-section" className="rounded-xl border border-omx-border bg-omx-card p-4 space-y-3">
      <div className="flex items-center space-x-2 text-xs font-semibold text-omx-text">
        <Briefcase className="h-4 w-4 text-omx-brand" />
        <span>Your Active Positions in This Market</span>
      </div>

      <div className="space-y-2.5">
        {currentPositions.map((pos) => {
          const currentPrice = pos.outcome === 'YES' ? market.yesPrice : market.noPrice;
          const grossValue = (pos.shares * currentPrice) / 100;
          const isProfitable = grossValue >= pos.totalCostUsdc;

          return (
            <div
              key={pos.id}
              className="rounded-lg border border-omx-border-subtle bg-omx-bg/60 p-3 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-sora font-bold px-2 py-0.5 rounded text-[11px] ${
                    pos.outcome === 'YES' ? 'bg-omx-yes-bg text-omx-yes' : 'bg-omx-no-bg text-omx-no'
                  }`}
                >
                  {pos.outcome} · {pos.shares.toFixed(2)} Shares
                </span>
                <span className="font-mono text-omx-text-secondary">
                  Avg Cost: {pos.avgPriceCents.toFixed(1)}¢
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] border-t border-omx-border pt-1.5">
                <div>
                  <span className="text-omx-text-muted block">Invested:</span>
                  <span className="text-omx-text font-semibold">${pos.totalCostUsdc.toFixed(2)}</span>
                </div>
                <div className="text-right">
                  <span className="text-omx-text-muted block">Current Value:</span>
                  <span className={`font-semibold ${isProfitable ? 'text-omx-yes' : 'text-omx-no'}`}>
                    ${grossValue.toFixed(2)} ({isProfitable ? '+' : ''}
                    {(((grossValue - pos.totalCostUsdc) / pos.totalCostUsdc) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-omx-border pt-2">
                <span className="text-[11px] text-omx-text-muted">
                  Pays ${pos.potentialPayoutUsdc.toFixed(2)} on resolution
                </span>
                <button
                  onClick={() => cashOutPosition(pos.id, currentPrice)}
                  className="flex items-center space-x-1 rounded-md bg-omx-elevated border border-omx-border hover:border-omx-border-strong px-2.5 py-1 text-[11px] font-medium text-omx-text transition-colors"
                >
                  <span>Cash Out</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
