import React, { useState } from 'react';
import { Share2, Star, ChevronRight, Check } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { MARKETS } from '../data/markets';
import { PriceHistoryChart } from '../components/market/PriceHistoryChart';
import { TradeOrderSlip } from '../components/market/TradeOrderSlip';
import { MobileTradeDrawer } from '../components/market/MobileTradeDrawer';

export const MarketDetailPage: React.FC = () => {
  const { marketId, navigate } = useRouter();

  // Find target market or fallback to Ramayana / first market
  const market =
    MARKETS.find((m) => m.id === marketId) ||
    MARKETS.find((m) => m.id === 'will-ramayana-part-one-gross-1500cr') ||
    MARKETS[0];

  const [isFavorite, setIsFavorite] = useState(market.isFavorite || false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-8 animate-in fade-in duration-200">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-omx-text-muted">
        <button
          onClick={() => navigate('/home')}
          className="hover:text-omx-text transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => navigate('/markets')}
          className="hover:text-omx-text transition-colors"
        >
          Markets
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="flex items-center gap-1 text-omx-text-secondary font-medium">
          <span>{market.categoryIcon}</span>
          <span>{market.category}</span>
        </span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-omx-text truncate max-w-[200px] sm:max-w-xs">
          {market.title}
        </span>
      </nav>

      {/* Main Grid: Left Column (Content) + Right Column (Sticky Order Slip) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Header Card: Icon, Category, Title, Action buttons */}
          <div className="flex items-start gap-4 p-4 sm:p-5 rounded-omx-xl bg-omx-card border border-omx-border">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-omx-lg bg-gradient-to-br from-[#f23064]/20 to-purple-600/20 border border-omx-border flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
              {market.categoryIcon || '📊'}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-omx-text-secondary">
                  {market.categoryIcon} {market.category.toUpperCase()}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleShare}
                    className="p-1.5 rounded-omx-md text-omx-text-muted hover:text-omx-text hover:bg-omx-hover transition-colors relative"
                    title="Share market"
                    aria-label="Share market"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-1.5 rounded-omx-md text-omx-text-muted hover:text-omx-text hover:bg-omx-hover transition-colors"
                    title="Toggle favorite"
                    aria-label="Toggle favorite"
                  >
                    <Star
                      className={`w-4 h-4 transition-colors ${
                        isFavorite ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-omx-text mt-1.5 leading-snug">
                {market.title}
              </h1>
            </div>
          </div>

          {/* 3 Metric Cards Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-omx-lg bg-omx-card border border-omx-border">
              <div className="text-xs text-omx-text-muted font-medium">Volume</div>
              <div className="text-base sm:text-xl font-bold font-mono text-omx-text mt-1">
                ${market.volume.toLocaleString()}
              </div>
            </div>

            <div className="p-3.5 rounded-omx-lg bg-omx-card border border-omx-border">
              <div className="text-xs text-omx-text-muted font-medium">Traders</div>
              <div className="text-base sm:text-xl font-bold font-mono text-omx-text mt-1">
                {market.traders} traders
              </div>
            </div>

            <div className="p-3.5 rounded-omx-lg bg-omx-card border border-omx-border">
              <div className="text-xs text-omx-text-muted font-medium">Closes</div>
              <div className="text-base sm:text-xl font-bold text-omx-text mt-1 truncate">
                {market.closesDate}
              </div>
            </div>
          </div>

          {/* Large Probability Display Banner */}
          <div className="p-4 sm:p-5 rounded-omx-xl bg-omx-card border border-omx-border flex items-center justify-between">
            <div className="text-3xl sm:text-4xl font-black font-mono text-[#f23064] tracking-tight">
              {market.probability}%
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm font-mono font-bold">
              <span className="flex items-center gap-1.5 text-emerald-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                YES {market.yesPrice}¢
              </span>
              <span className="flex items-center gap-1.5 text-[#f23064]">
                <span className="w-2 h-2 rounded-full bg-[#f23064] inline-block" />
                NO {market.noPrice}¢
              </span>
            </div>
          </div>

          {/* Price History Chart */}
          <PriceHistoryChart market={market} />

          {/* Market Details & Resolution Criteria Card */}
          <div className="p-4 sm:p-6 rounded-omx-xl bg-omx-card border border-omx-border space-y-4">
            <h2 className="text-base font-bold text-omx-text">Market Details</h2>

            <div className="divide-y divide-omx-border text-xs sm:text-sm">
              <div className="py-3 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6">
                <span className="w-32 text-omx-text-muted font-medium flex-shrink-0">
                  Resolution
                </span>
                <span className="text-omx-text leading-relaxed">
                  {market.resolutionCriteria ||
                    market.description ||
                    'Resolves according to official verified reporting upon market close.'}
                </span>
              </div>

              <div className="py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                <span className="w-32 text-omx-text-muted font-medium flex-shrink-0">
                  Resolution Source
                </span>
                <span className="text-omx-text font-medium">
                  {market.resolutionSource || 'Official verified reporting.'}
                </span>
              </div>

              <div className="py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                <span className="w-32 text-omx-text-muted font-medium flex-shrink-0">
                  Category
                </span>
                <span className="text-omx-text font-medium flex items-center gap-1">
                  <span>{market.categoryIcon}</span>
                  <span>{market.category}</span>
                </span>
              </div>

              <div className="py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                <span className="w-32 text-omx-text-muted font-medium flex-shrink-0">
                  Created
                </span>
                <span className="text-omx-text font-mono">
                  {market.detailsCreatedDate || market.createdAt || 'Aug 27, 2026'}
                </span>
              </div>

              <div className="py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                <span className="w-32 text-omx-text-muted font-medium flex-shrink-0">
                  Closes
                </span>
                <span className="text-omx-text font-mono">{market.closesDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Desktop Trade Order Slip (hidden on <1024px) */}
        <div className="hidden lg:block lg:col-span-4 sticky top-20">
          <TradeOrderSlip market={market} />
        </div>
      </div>

      {/* Mobile Trade Drawer (<1024px) */}
      <MobileTradeDrawer market={market} />
    </div>
  );
};
