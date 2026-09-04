import React, { useState, useMemo } from 'react';
import { History, TrendingUp, MessageSquare, Users, Wallet, ArrowRight, Clock } from 'lucide-react';
import { INITIAL_ACTIVITIES, type ActivityItem } from '../data/activity';
import { useTrade } from '../context/TradeContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { AuthGate } from '../components/common/AuthGate';

type ActivityFilter = 'ALL' | 'TRADE' | 'THESIS' | 'GUILD' | 'FAUCET';

export const ActivityPage: React.FC = () => {
  const { accountMode, trades } = useTrade();
  const { isAuthenticated } = useAuth();
  const { navigate } = useRouter();
  const [filter, setFilter] = useState<ActivityFilter>('ALL');

  // Real Mode Auth Gate
  if (accountMode === 'real' && !isAuthenticated) {
    return (
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full space-y-8 min-w-0">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <History className="h-4 w-4" />
            </div>
            <h1 className="font-sora text-2xl sm:text-3xl font-extrabold tracking-tight text-omx-text">
              Real Activity & Order History
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-omx-text-secondary">
            Verified real-money order settlements, liquidity provisions, and regulatory audit trail.
          </p>
        </div>

        <AuthGate
          variant="page"
          pageTitle="Real Activity History"
          pageDescription="Sign in or register to inspect your verified real-money orders, settlement receipts, transaction timestamps, and portfolio actions."
        />
      </main>
    );
  }

  const isDemo = accountMode === 'demo';

  // Convert live trades from TradeContext into dynamic ActivityItems
  const dynamicTradeActivities: ActivityItem[] = useMemo(() => {
    return trades.map((t) => ({
      id: `act-dyn-${t.id}`,
      type: t.action === 'BUY' ? 'TRADE' : 'CASHOUT',
      title: t.action === 'BUY' 
        ? `${isDemo ? '[Demo] ' : ''}Executed ${t.outcome} Prediction` 
        : `${isDemo ? '[Demo] ' : ''}Cashed Out ${t.outcome} Contract`,
      description: `Staked $${t.stakeUsdc.toFixed(2)} on "${t.marketQuestion}" at ${t.priceCents}¢/share.`,
      timestamp: t.timestamp,
      timeAgo: 'Just now',
      metadata: {
        orderNumber: t.orderNumber,
        marketId: t.marketId,
        amount: t.stakeUsdc,
        outcome: t.outcome,
      },
    }));
  }, [trades, isDemo]);

  // Combine and sort activities
  const allActivities = useMemo(() => {
    return [...dynamicTradeActivities, ...INITIAL_ACTIVITIES];
  }, [dynamicTradeActivities]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    if (filter === 'ALL') return allActivities;
    if (filter === 'TRADE') return allActivities.filter((a) => a.type === 'TRADE' || a.type === 'CASHOUT');
    return allActivities.filter((a) => a.type === filter);
  }, [allActivities, filter]);

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full space-y-8 min-w-0">
      {/* 1. Header */}
      <div className="space-y-1.5 min-w-0">
        <div className="flex items-center space-x-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            isDemo ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'
          }`}>
            <History className="h-4 w-4" />
          </div>
          <h1 className="font-sora text-2xl sm:text-3xl font-extrabold tracking-tight text-omx-text">
            {isDemo ? 'Demo Activity & Practice Audit Trail' : 'Real Activity & Audit Trail'}
          </h1>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold ${
            isDemo 
              ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' 
              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
          }`}>
            {isDemo ? 'Demo Mode' : 'Verified Real Capital'}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-omx-text-secondary">
          {isDemo
            ? 'Chronological log of practice prediction orders, virtual settlements, and community actions.'
            : 'Chronological audit log of verified real-money prediction orders, on-chain settlements, and guild actions.'}
        </p>
      </div>

      {/* 2. Filter Strip */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none w-full max-w-full min-w-0">
        {[
          { id: 'ALL', label: `All Activity (${allActivities.length})` },
          { id: 'TRADE', label: 'Orders & Settlements' },
          { id: 'THESIS', label: 'Theses Published' },
          { id: 'GUILD', label: 'Guild Actions' },
          { id: 'FAUCET', label: 'Treasury & Faucet' },
        ].map((tab) => {
          const isSelected = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as ActivityFilter)}
              className={`flex min-h-[44px] items-center space-x-2 rounded-xl px-4 py-2 text-xs font-sora font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                isSelected
                  ? 'border-omx-brand bg-omx-brand/10 text-omx-brand font-bold shadow-sm'
                  : 'border-omx-border-strong/70 bg-omx-card text-omx-text-secondary hover:border-omx-border-strong hover:text-omx-text'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Chronological Activity Feed */}
      <section aria-label="Chronological activity list" className="space-y-4 w-full min-w-0">
        <div className="rounded-2xl border border-omx-border-strong/70 bg-omx-card divide-y divide-omx-border/60 shadow-sm overflow-hidden">
          {filteredActivities.map((act) => {
            const isTrade = act.type === 'TRADE' || act.type === 'CASHOUT';
            const isThesis = act.type === 'THESIS';
            const isGuild = act.type === 'GUILD';
            const isFaucet = act.type === 'FAUCET';

            return (
              <article
                key={act.id}
                className="p-5 sm:p-6 transition-colors hover:bg-omx-hover flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-4 min-w-0 flex-1">
                  {/* Icon Indicator */}
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 mt-0.5 ${
                      isTrade
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                        : isThesis
                        ? 'bg-pink-500/10 text-pink-700 dark:text-pink-400 border border-pink-500/20'
                        : isGuild
                        ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20'
                        : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {isTrade && <TrendingUp className="h-4 w-4" />}
                    {isThesis && <MessageSquare className="h-4 w-4" />}
                    {isGuild && <Users className="h-4 w-4" />}
                    {isFaucet && <Wallet className="h-4 w-4" />}
                  </div>

                  {/* Body Content */}
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-sora font-bold text-sm text-omx-text leading-snug">
                        {act.title}
                      </h2>
                      {act.metadata?.orderNumber && (
                        <span className="font-mono text-xs font-bold text-omx-brand bg-omx-brand/10 px-2 py-0.5 rounded">
                          {act.metadata.orderNumber}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-omx-text-secondary leading-relaxed">
                      {act.description}
                    </p>

                    <div className="flex items-center space-x-2 text-[11px] text-omx-text-muted pt-0.5">
                      <Clock className="h-3 w-3" />
                      <span>{act.timeAgo}</span>
                      <span>·</span>
                      <span>{new Date(act.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Contextual Action Link */}
                <div className="flex items-center justify-end shrink-0 sm:pl-4">
                  {act.metadata?.marketId && (
                    <button
                      type="button"
                      onClick={() => navigate(`/markets/${act.metadata!.marketId}`)}
                      className="flex items-center space-x-1 text-xs font-sora font-bold text-omx-brand hover:underline cursor-pointer"
                    >
                      <span>View Market</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {act.metadata?.groupId && (
                    <button
                      type="button"
                      onClick={() => navigate('/groups')}
                      className="flex items-center space-x-1 text-xs font-sora font-bold text-omx-brand hover:underline cursor-pointer"
                    >
                      <span>View Guild</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {isThesis && (
                    <button
                      type="button"
                      onClick={() => navigate('/social')}
                      className="flex items-center space-x-1 text-xs font-sora font-bold text-omx-brand hover:underline cursor-pointer"
                    >
                      <span>View Community</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {isFaucet && (
                    <button
                      type="button"
                      onClick={() => navigate('/wallet')}
                      className="flex items-center space-x-1 text-xs font-sora font-bold text-omx-brand hover:underline cursor-pointer"
                    >
                      <span>View Treasury</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};
