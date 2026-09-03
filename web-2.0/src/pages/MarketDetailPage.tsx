import React, { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { MARKETS } from '../data/markets';
import { useRouter } from '../context/RouterContext';
import { MarketHeader } from '../components/market/MarketHeader';
import { ProbabilityChart } from '../components/market/ProbabilityChart';
import { ResolutionRules } from '../components/market/ResolutionRules';
import { CommunityDiscussion } from '../components/market/CommunityDiscussion';
import { TradeOrderSlip } from '../components/trading/TradeOrderSlip';
import { MobileTradeBar } from '../components/trading/MobileTradeBar';
import { ActivePositionCard } from '../components/trading/ActivePositionCard';
import type { Outcome } from '../types/trade';

export const MarketDetailPage: React.FC = () => {
  const { marketId, navigate } = useRouter();
  const [stagedOutcome, setStagedOutcome] = useState<Outcome>('YES');

  // Find requested market or default to first
  const market = MARKETS.find((m) => m.id === marketId) || MARKETS[0];

  return (
    <div className="min-h-screen bg-omx-bg pb-20 md:pb-16 text-omx-text">
      {/* Breadcrumb Navigation Row */}
      <div className="border-b border-omx-border bg-omx-card/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5">
          <nav className="flex items-center space-x-2 text-xs text-omx-text-secondary">
            <button
              onClick={() => navigate('/markets/will-gta-vi-release-before-december-2026')}
              className="flex items-center space-x-1 hover:text-omx-text transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Markets</span>
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-omx-text-muted" />
            <span className="font-medium text-omx-text">{market.category}</span>
            <ChevronRight className="h-3.5 w-3.5 text-omx-text-muted" />
            <span className="truncate max-w-[200px] sm:max-w-md text-omx-text-muted">
              {market.question}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content Area: 2-Column Asymmetric Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Research Desk (65% / 7-8 columns) */}
          <section className="lg:col-span-7 xl:col-span-8 space-y-6">
            <MarketHeader market={market} onSelectOutcome={(o) => setStagedOutcome(o)} />
            <ProbabilityChart market={market} />
            <ResolutionRules market={market} />
            <CommunityDiscussion market={market} />
            {/* Active Position Card also visible on mobile/tablet below research */}
            <div className="lg:hidden">
              <ActivePositionCard market={market} />
            </div>
          </section>

          {/* Right Column: Sticky Trading Desk (35% / 4-5 columns) */}
          <aside className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-20 space-y-4">
            <TradeOrderSlip market={market} stagedOutcome={stagedOutcome} />
            <ActivePositionCard market={market} />
          </aside>
        </div>
      </main>

      {/* Mobile Sticky Trade Bar (Refinement 12: Bottom-0, NO double chrome!) */}
      <MobileTradeBar market={market} />
    </div>
  );
};
