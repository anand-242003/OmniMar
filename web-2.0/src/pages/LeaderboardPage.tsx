import React, { useState, useEffect, useMemo } from 'react';
import { Trophy, Award, ShieldCheck, ChevronRight, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { REAL_LEADERBOARD_FIXTURES, PRACTICE_LEADERBOARD_FIXTURES } from '../data/leaderboard';
import { LeaderboardRowSkeleton } from '../components/leaderboard/LeaderboardRowSkeleton';
import { useAuth } from '../context/AuthContext';
import { useTrade } from '../context/TradeContext';
import { useRouter } from '../context/RouterContext';

export const LeaderboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { accountMode } = useTrade();
  const { navigate, openAuthModal, currentPath } = useRouter();
  const [timeframe, setTimeframe] = useState<'30d' | 'all' | '7d'>('30d');
  const [isLoading, setIsLoading] = useState(true);

  // Trigger skeleton loader on mount and timeframe changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(timer);
  }, [timeframe, accountMode]);

  const isDemo = accountMode === 'demo';
  const fixtures = isDemo ? PRACTICE_LEADERBOARD_FIXTURES : REAL_LEADERBOARD_FIXTURES;

  const sortedFixtures = useMemo(() => {
    const list = [...fixtures];
    if (timeframe === '7d') {
      // 7-day sprint ranks by high-velocity winRate
      return list.sort((a, b) => b.winRate - a.winRate).map((f, i) => ({
        ...f,
        currentRank: i + 1,
        rankDelta: f.rank - (i + 1),
      }));
    } else if (timeframe === 'all') {
      // All-time ranks by cumulative audited net profit
      return list.sort((a, b) => b.netProfit - a.netProfit).map((f, i) => ({
        ...f,
        currentRank: i + 1,
        rankDelta: f.rank - (i + 1),
      }));
    }
    return list.map((f) => ({
      ...f,
      currentRank: f.rank,
      rankDelta: 0,
    }));
  }, [fixtures, timeframe]);

  const topThree = sortedFixtures.slice(0, 3);

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full space-y-8 min-w-0">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center space-x-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              isDemo ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              <Trophy className="h-4 w-4" />
            </div>
            <h1 className="font-sora text-2xl sm:text-3xl font-extrabold tracking-tight text-omx-text">
              {isDemo ? 'Practice Forecasters Arena' : 'Verified Real-Capital Arena'}
            </h1>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold ${
              isDemo 
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' 
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
            }`}>
              {isDemo ? 'Demo Leaderboard' : 'Verified Real Money'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-omx-text-secondary">
            {isDemo
              ? 'Verifiable practice forecasting performance calibrated by Brier accuracy scores and simulated ROI.'
              : 'Verifiable real-capital forecasting calibrated by Brier accuracy scores and audited on-chain USDC returns.'}
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex rounded-xl border border-omx-border-strong/70 bg-omx-card p-1 text-xs font-sora font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setTimeframe('30d')}
            className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
              timeframe === '30d'
                ? isDemo ? 'bg-indigo-600 text-white font-bold shadow-sm' : 'bg-omx-brand text-white font-bold shadow-sm'
                : 'text-omx-text-secondary hover:text-omx-text'
            }`}
          >
            30-Day Season
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('all')}
            className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
              timeframe === 'all'
                ? isDemo ? 'bg-indigo-600 text-white font-bold shadow-sm' : 'bg-omx-brand text-white font-bold shadow-sm'
                : 'text-omx-text-secondary hover:text-omx-text'
            }`}
          >
            All-Time
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('7d')}
            className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
              timeframe === '7d'
                ? isDemo ? 'bg-indigo-600 text-white font-bold shadow-sm' : 'bg-omx-brand text-white font-bold shadow-sm'
                : 'text-omx-text-secondary hover:text-omx-text'
            }`}
          >
            7-Day Sprint
          </button>
        </div>
      </div>

      {/* Mode Segregation Notice Banner per Amendment 1 */}
      <div className={`rounded-2xl border p-4 text-xs flex items-center justify-between gap-3 ${
        isDemo 
          ? 'border-indigo-500/30 bg-indigo-500/5 text-indigo-400' 
          : 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400'
      }`}>
        <div className="flex items-center space-x-2.5">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <span className="font-medium">
            {isDemo
              ? 'Practice rankings are strictly segregated: Demo trades never appear on or affect the verified real-money leaderboard.'
              : 'Audited Real-Capital Rankings: $250,000 seasonal rewards pool. Demo trades are strictly excluded from ranking calculations.'}
          </span>
        </div>
        {!isDemo && !isAuthenticated && (
          <button
            type="button"
            onClick={() => openAuthModal({ route: currentPath, action: 'generic', actionLabel: 'qualify for real leaderboard' })}
            className="rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 font-sora font-semibold text-xs transition-colors shrink-0 cursor-pointer"
          >
            Sign In to Rank
          </button>
        )}
      </div>

      {/* 2. Top 3 Podium Cards */}
      <section aria-label="Top 3 forecasters podium" className="w-full min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 min-w-0">
          {topThree.map((forecaster, idx) => {
            const rankLabel = idx === 0 ? '1st Place' : idx === 1 ? '2nd Place' : '3rd Place';
            const badgeColor =
              idx === 0
                ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30'
                : idx === 1
                ? 'bg-slate-400/15 text-slate-700 dark:text-slate-300 border-slate-400/30'
                : 'bg-amber-700/15 text-amber-800 dark:text-amber-500 border-amber-700/30';

            return (
              <article
                key={forecaster.id}
                className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-6 shadow-sm space-y-4 relative overflow-hidden transition-all hover:border-omx-border-strong flex flex-col justify-between"
              >
                <div className="space-y-3 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center space-x-1 rounded-full px-2.5 py-0.5 text-xs font-sora font-bold border ${badgeColor}`}
                    >
                      <Award className="h-3 w-3" />
                      <span>{rankLabel}</span>
                    </span>
                    <span className="text-[11px] font-mono text-omx-text-muted">Rank #{forecaster.rank}</span>
                  </div>

                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-omx-bg border border-omx-border font-sora font-bold text-sm text-omx-brand shrink-0">
                      {forecaster.avatarInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-sora font-bold text-sm sm:text-base text-omx-text truncate">
                        {forecaster.name}
                      </h2>
                      <p className="text-xs text-omx-text-muted truncate">{forecaster.handle}</p>
                      <span className="text-[11px] font-medium text-omx-brand mt-0.5 block">
                        {forecaster.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics Matrix */}
                <div className="pt-3 border-t border-omx-border/60 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-omx-text-muted block">Win Rate</span>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                      {forecaster.winRate}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-omx-text-muted block">Brier Score</span>
                    <span className="font-mono font-bold text-omx-text text-sm">
                      {forecaster.brierScore.toFixed(3)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-omx-text-muted block">
                      {isDemo ? 'Net Practice P&L' : 'Verified USDC P&L'}
                    </span>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      +${forecaster.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-omx-text-muted block">Predictions</span>
                    <span className="font-mono font-bold text-omx-text">
                      {forecaster.predictionsCount} {isDemo ? 'practice' : 'verified'}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. Standing Banner */}
      <section
        aria-label="Your standing"
        className={`rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isDemo ? 'border-indigo-500/30 bg-indigo-500/5' : 'border-emerald-500/30 bg-emerald-500/5'
        }`}
      >
        <div className="flex items-center space-x-3.5 min-w-0">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl font-sora font-bold text-xs shrink-0 ${
            isDemo ? 'bg-indigo-500/15 text-indigo-400' : 'bg-emerald-500/15 text-emerald-400'
          }`}>
            {user?.avatarInitials || 'GT'}
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="font-sora font-bold text-sm text-omx-text">Your Standing</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-sora font-semibold ${
                isDemo ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {isDemo ? 'Practice Sandbox Tier' : (isAuthenticated ? 'Verified Real Tier' : 'Unauthenticated')}
              </span>
            </div>
            <p className="text-xs text-omx-text-secondary mt-0.5">
              {isDemo
                ? 'Complete 5 practice predictions to establish your simulated Brier calibration score.'
                : (isAuthenticated
                  ? 'Place verified predictions to climb the audited 30-Day Season leaderboard.'
                  : 'Sign in with Google, Apple, or Web3 to submit verified orders and qualify for the prize pool.')}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/markets')}
          className={`flex items-center justify-center space-x-1 rounded-xl px-4 py-2 text-xs font-sora font-bold text-white transition-colors cursor-pointer shrink-0 shadow-sm ${
            isDemo ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-emerald-600 hover:bg-emerald-500'
          }`}
        >
          <span>Find Prediction Markets</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </section>

      {/* 4. Complete Rankings Table */}
      <section aria-label="Forecaster leaderboard table" className="space-y-3 w-full min-w-0">
        <h2 className="font-sora font-bold text-lg text-omx-text">
          {isDemo ? 'Practice Season Forecasters' : 'Verified Real Forecasters'}
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-omx-border-strong/70 bg-omx-card shadow-sm scrollbar-none">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-omx-border bg-omx-bg/60 text-[11px] font-sora font-semibold text-omx-text-muted uppercase tracking-wider">
                <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                <th className="py-3.5 px-4">Forecaster</th>
                <th className="py-3.5 px-4">Primary Category</th>
                <th className="py-3.5 px-4 text-right">Brier Score</th>
                <th className="py-3.5 px-4 text-right">Win Rate</th>
                <th className="py-3.5 px-4 text-right">Predictions</th>
                <th className="py-3.5 px-4 text-right">{isDemo ? 'Simulated P&L' : 'Verified P&L'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-omx-border/60 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-0">
                    <div className="space-y-0">
                      {[1, 2, 3, 4, 5].map((sk) => (
                        <LeaderboardRowSkeleton key={sk} />
                      ))}
                    </div>
                  </td>
                </tr>
              ) : (
                sortedFixtures.map((forecaster) => (
                  <tr
                    key={forecaster.id}
                    className="hover:bg-omx-hover transition-all duration-300 ease-out transform animate-in fade-in slide-in-from-bottom-1"
                  >
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1.5 font-mono font-bold text-omx-text">
                        <span>#{forecaster.currentRank}</span>
                        {forecaster.rankDelta > 0 && (
                          <span className="inline-flex items-center text-[10px] font-bold text-emerald-500" title={`Climbed ${forecaster.rankDelta} positions`}>
                            <ArrowUp className="h-3 w-3" />
                            <span>{forecaster.rankDelta}</span>
                          </span>
                        )}
                        {forecaster.rankDelta < 0 && (
                          <span className="inline-flex items-center text-[10px] font-bold text-rose-500" title={`Dropped ${Math.abs(forecaster.rankDelta)} positions`}>
                            <ArrowDown className="h-3 w-3" />
                            <span>{Math.abs(forecaster.rankDelta)}</span>
                          </span>
                        )}
                        {forecaster.rankDelta === 0 && (
                          <span className="inline-flex items-center text-[10px] text-omx-text-muted opacity-50" title="Rank unchanged">
                            <Minus className="h-2.5 w-2.5" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-omx-bg border border-omx-border font-sora font-bold text-xs text-omx-brand">
                          {forecaster.avatarInitials}
                        </div>
                        <div>
                          <div className="font-sora font-bold text-omx-text">{forecaster.name}</div>
                          <div className="text-[11px] text-omx-text-muted">{forecaster.handle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-omx-text-secondary">
                      {forecaster.category}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-omx-text">
                      {forecaster.brierScore.toFixed(3)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {forecaster.winRate}%
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-omx-text">
                      {forecaster.predictionsCount}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      +${forecaster.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Educational Framework: Calibration Science */}
      <section
        aria-label="Calibration score explanation"
        className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-6 space-y-3"
      >
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-4 w-4 text-omx-brand" />
          <h3 className="font-sora font-bold text-sm text-omx-text">
            Scientific Calibration vs Casual Gambling
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-omx-text-secondary leading-relaxed max-w-4xl">
          Unlike speculative platforms that reward reckless leverage, OmniMarketX evaluates forecasters using mathematical Brier calibration. A score of 0.000 represents perfect predictive prescience, whereas 0.250 represents pure chance. Top forecasters consistently calibrate their implied probabilities to real-world outcomes over large sample sizes.
        </p>
      </section>
    </main>
  );
};
