import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import type { Market } from '../../types/market';

interface ResolutionRulesProps {
  market: Market;
}

export const ResolutionRules: React.FC<ResolutionRulesProps> = ({ market }) => {
  return (
    <div className="border-t border-omx-border pt-6 mt-6 space-y-4">
      {/* Section Header */}
      <div className="flex items-center space-x-2">
        <ShieldCheck className="h-4 w-4 text-omx-yes" />
        <h2 className="font-sora font-bold text-base text-omx-text tracking-tight">
          Settlement Rules & Verification Criteria
        </h2>
      </div>

      {/* Rules Explanation */}
      <div className="rounded-xl border border-omx-border-subtle bg-omx-card/60 p-4 space-y-3 text-xs leading-relaxed text-omx-text-secondary">
        <div>
          <span className="font-semibold text-omx-text block mb-1">Contract Conditions:</span>
          {market.resolutionCriteria}
        </div>

        <div className="border-t border-omx-border pt-3">
          <span className="font-semibold text-omx-text block mb-1">Official Resolution Source:</span>
          <p className="text-omx-text">
            {market.resolutionSource}
          </p>
        </div>

        <div className="flex items-start space-x-2 border-t border-omx-border pt-3 text-[11px] text-omx-text-muted">
          <Info className="h-3.5 w-3.5 shrink-0 text-omx-text-secondary mt-0.5" />
          <span>
            Binary contracts settle immediately upon official confirmation. Each share held in the winning outcome receives exactly $1.00 USDC in gross payout. Losing shares settle to $0.00.
          </span>
        </div>
      </div>
    </div>
  );
};
