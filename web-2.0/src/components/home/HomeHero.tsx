import React from 'react';
import { ArrowRight, ShieldCheck, Wallet, Briefcase } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { useTrade } from '../../context/TradeContext';
import { PredictionGlobe } from './PredictionGlobe';

export const HomeHero: React.FC = () => {
  const { navigate } = useRouter();
  const { accountMode } = useTrade();

  return (
    <section
      aria-label="Hero Introduction"
      className="relative pt-4 sm:pt-8 pb-8 lg:pb-14 w-full min-w-0 overflow-x-clip"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-w-0">
        {/* Left Column: Primary Proposition & Actions (~45% on Desktop) */}
        <div className="lg:col-span-5 space-y-6 min-w-0 text-left z-10">
          {/* Positioning Eyebrow Capsule */}
          <div className="inline-flex items-center space-x-2 rounded-full border border-omx-border-strong/70 bg-omx-card px-3.5 py-1.5 text-xs font-sora font-semibold text-omx-text shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>The Credible Forecaster's Arena</span>
            <span className="hidden sm:inline text-omx-text-muted">·</span>
            <span className="hidden sm:inline text-omx-text-secondary">Binary Probability Engine</span>
          </div>

          {/* High-Confidence Proposition Headline */}
          <h1 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-omx-text leading-[1.12]">
            Trade on real-world outcomes.
          </h1>

          {/* Plain-English Mathematical Explanation */}
          <p className="text-sm sm:text-base text-omx-text-secondary leading-relaxed max-w-xl">
            Back YES or NO on events that matter. Prices reflect the market's implied probability, and winning shares settle at{' '}
            <span className="font-mono font-bold text-omx-text">$1.00</span>.
          </p>

          {/* Two Clear, Purposeful CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={() => navigate('/markets')}
              className="flex min-h-[48px] items-center justify-center space-x-2 rounded-xl bg-[#f23064] hover:bg-[#e11d48] px-6 py-3.5 text-sm font-sora font-bold text-white shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <span>Explore Markets</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {accountMode === 'demo' ? (
              <button
                type="button"
                onClick={() => navigate('/portfolio')}
                className="flex min-h-[48px] items-center justify-center space-x-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:border-indigo-500 hover:bg-indigo-500/20 px-5 py-3.5 text-sm font-sora font-semibold text-indigo-700 dark:text-indigo-300 transition-all cursor-pointer"
              >
                <Briefcase className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>View Practice Portfolio</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate('/wallet')}
                className="flex min-h-[48px] items-center justify-center space-x-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-500 hover:bg-emerald-500/20 px-5 py-3.5 text-sm font-sora font-semibold text-emerald-700 dark:text-emerald-300 transition-all cursor-pointer"
              >
                <Wallet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Manage Real Wallet</span>
              </button>
            )}
          </div>

          {/* Restrained Credibility & Reassurance Signal */}
          <div className="flex items-center space-x-2 text-xs text-omx-text-secondary pt-1">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Practice with $10,000 demo USDC · Zero financial risk · Instant guest access</span>
          </div>
        </div>

        {/* Right Column: The OmniMarketX Prediction Globe (~55% on Desktop) */}
        <div className="lg:col-span-7 relative w-full min-w-0 flex items-center justify-center lg:justify-end overflow-visible">
          <PredictionGlobe />
        </div>
      </div>
    </section>
  );
};
