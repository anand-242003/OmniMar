import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Scale, Sparkles, BarChart2 } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useTrade } from '../context/TradeContext';
import { MARKETS } from '../data/markets';
import { MarketCard } from '../components/market/MarketCard';
import { HomeHero } from '../components/home/HomeHero';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const { balance } = useTrade();

  // Featured Market of the Day
  const featuredMarket = MARKETS[0];
  // Top 3 active secondary markets
  const topMarkets = MARKETS.slice(1, 4);

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-7xl mx-auto w-full space-y-16">
      {/* 1. Hero Section: Product Definition & Core Model */}
      <HomeHero />

      {/* 2. 3-Step "How It Works" Educational Architecture */}
      <section aria-labelledby="how-it-works-heading" className="space-y-6">
        <div className="text-center space-y-1">
          <h2 id="how-it-works-heading" className="font-sora text-xl sm:text-2xl font-bold text-omx-text">
            How OmniMarketX Works
          </h2>
          <p className="text-xs sm:text-sm text-omx-text-secondary">
            Binary contracts governed by verifiable real-world outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-6 space-y-3.5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-omx-bg border border-omx-border font-mono font-bold text-sm text-omx-brand">
              01
            </div>
            <h3 className="font-sora font-bold text-base text-omx-text">Identify the Proposition</h3>
            <p className="text-xs text-omx-text-secondary leading-relaxed">
              Explore concrete propositions backed by named resolution sources and objective verification criteria. No vague speculation.
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-6 space-y-3.5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-omx-bg border border-omx-border font-mono font-bold text-sm text-omx-brand">
              02
            </div>
            <h3 className="font-sora font-bold text-base text-omx-text">Stake YES or NO</h3>
            <p className="text-xs text-omx-text-secondary leading-relaxed">
              Share prices range from 1¢ to 99¢, directly reflecting probability consensus. Back YES if you expect the outcome, or NO to counter it.
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-6 space-y-3.5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-omx-bg border border-omx-border font-mono font-bold text-sm text-omx-brand">
              03
            </div>
            <h3 className="font-sora font-bold text-base text-omx-text">Redeem at $1.00</h3>
            <p className="text-xs text-omx-text-secondary leading-relaxed">
              When reality confirms the outcome, winning contracts settle at exactly $1.00 per share. Net profit equals $1.00 minus your entry cost.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Featured Market of the Day */}
      {featuredMarket && (
        <section id="featured-market" aria-labelledby="featured-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-omx-brand" />
              <h2 id="featured-heading" className="font-sora text-lg sm:text-xl font-bold text-omx-text">
                Featured Market of the Day
              </h2>
            </div>
            <span className="text-xs font-mono font-medium text-omx-text-secondary">
              24h Vol: ${featuredMarket.volume24h.toLocaleString()}
            </span>
          </div>

          <div className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5">
                <span className="rounded-md border border-omx-border bg-omx-bg px-2.5 py-1 text-xs font-medium text-omx-text-secondary">
                  {featuredMarket.category}
                </span>
                <span className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>LIVE TRADING</span>
                </span>
              </div>
              <span className="text-xs font-mono text-omx-text-muted">
                Resolves {featuredMarket.closingDate}
              </span>
            </div>

            <h3 className="font-sora text-xl sm:text-2xl font-bold text-omx-text leading-snug">
              {featuredMarket.question}
            </h3>

            {/* Implied Probability & Visual Odds Track */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-emerald-700 dark:text-emerald-400">
                  ▲ {featuredMarket.impliedProbabilityYes}% YES · {featuredMarket.yesPrice}¢
                </span>
                <span className="text-rose-700 dark:text-rose-400">
                  {featuredMarket.noPrice}¢ · {featuredMarket.impliedProbabilityNo}% NO ▼
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-omx-bg flex overflow-hidden border border-omx-border">
                <div
                  className="bg-emerald-500 transition-all duration-300"
                  style={{ width: `${featuredMarket.impliedProbabilityYes}%` }}
                />
                <div
                  className="bg-rose-500 transition-all duration-300"
                  style={{ width: `${featuredMarket.impliedProbabilityNo}%` }}
                />
              </div>
            </div>

            {/* Resolution Authority & Direct Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-omx-border/70">
              <p className="text-xs text-omx-text-secondary max-w-md">
                <span className="font-semibold text-omx-text">Resolution source:</span> {featuredMarket.resolutionSource}
              </p>

              <div className="grid grid-cols-2 gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate(`/markets/${featuredMarket.id}`)}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-sora font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  Back YES {featuredMarket.yesPrice}¢
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/markets/${featuredMarket.id}`)}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 font-sora font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  Back NO {featuredMarket.noPrice}¢
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. High-Conviction Markets Grid */}
      <section aria-labelledby="top-markets-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <h2 id="top-markets-heading" className="font-sora text-xl sm:text-2xl font-bold text-omx-text">
              High-Conviction Markets
            </h2>
            <p className="text-xs sm:text-sm text-omx-text-secondary">
              Active propositions with significant 24h liquidity and participant consensus.
            </p>
          </div>
          <button
            onClick={() => navigate('/markets')}
            className="self-start sm:self-auto flex items-center space-x-1 text-xs font-sora font-semibold text-[#f23064] hover:underline cursor-pointer"
          >
            <span>View all 8 markets</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {topMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </section>

      {/* 5. Institutional Discipline & Trust Pillars */}
      <section className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-8 sm:p-10 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-sora text-xl sm:text-2xl font-bold text-omx-text">
            Engineered for Forecaster Credibility
          </h2>
          <p className="text-xs sm:text-sm text-omx-text-secondary">
            Built on mathematical principles of prediction markets, without speculative fog.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="space-y-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-omx-bg border border-omx-border text-omx-brand mx-auto sm:mx-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-sora font-bold text-sm text-omx-text">Verifiable Resolution</h3>
            <p className="text-xs text-omx-text-secondary leading-relaxed">
              Every proposition defines transparent empirical settlement criteria and authoritative public records before order intake.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-omx-bg border border-omx-border text-omx-brand mx-auto sm:mx-0">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="font-sora font-bold text-sm text-omx-text">Zero-Sum Payouts</h3>
            <p className="text-xs text-omx-text-secondary leading-relaxed">
              Contracts are bound strictly between 0¢ and 100¢. No casino house edge, no algorithmic price manipulation.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-omx-bg border border-omx-border text-omx-brand mx-auto sm:mx-0">
              <BarChart2 className="h-5 w-5" />
            </div>
            <h3 className="font-sora font-bold text-sm text-omx-text">Practice Sandbox Included</h3>
            <p className="text-xs text-omx-text-secondary leading-relaxed">
              Start with <span className="font-mono font-semibold text-omx-text">$10,000.00</span> in virtual sandbox balance to test your theses before committing real capital.
            </p>
          </div>
        </div>

        {/* Sandbox Status Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-omx-border/70 text-xs">
          <div className="flex items-center space-x-2 text-omx-text-secondary">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>
              Your virtual sandbox wallet is active with{' '}
              <strong className="font-mono text-omx-text font-bold">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </strong>
            </span>
          </div>

          <button
            onClick={() => navigate('/markets')}
            className="w-full sm:w-auto flex items-center justify-center space-x-1.5 rounded-lg bg-omx-brand px-4 py-2 font-sora font-semibold text-white hover:bg-omx-brand/90 transition-colors cursor-pointer"
          >
            <span>Start Practicing Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>
    </main>
  );
};
