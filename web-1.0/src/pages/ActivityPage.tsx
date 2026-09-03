import React, { useState } from 'react';
import {
  Activity as ActivityIcon,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Clock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrade } from '../context/TradeContext';
import { useRouter } from '../context/RouterContext';
import { ProtectedShield } from '../components/common/ProtectedShield';

export const ActivityPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { trades, predictions } = useTrade();
  const { navigate } = useRouter();
  const [filter, setFilter] = useState<'all' | 'trades' | 'predictions'>('all');

  if (!isAuthenticated) {
    return <ProtectedShield route="activity" />;
  }

  // Combine and sort chronological events
  const tradeEvents = trades.map((t) => ({
    id: `trade_${t.id}`,
    type: 'trade' as const,
    timestamp: t.timestamp,
    title: `${t.action === 'BUY' ? 'Bought' : 'Sold'} ${t.shares.toFixed(2)} ${t.outcome} shares`,
    marketTitle: t.marketTitle,
    marketId: t.marketId,
    amount: t.amount,
    action: t.action,
    outcome: t.outcome,
    shares: t.shares,
    price: t.price,
  }));

  const predictionEvents = predictions.map((p) => ({
    id: `pred_${p.id}`,
    type: 'prediction' as const,
    timestamp: p.timestamp,
    title: p.text,
    marketTitle: p.marketTitle,
    marketId: p.marketId,
    amount: 0,
    action: 'BUY' as const,
    outcome: p.outcome,
    shares: 0,
    price: 0,
  }));

  const allEvents = [...tradeEvents, ...predictionEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const filteredEvents = allEvents.filter((item) => {
    if (filter === 'trades') return item.type === 'trade';
    if (filter === 'predictions') return item.type === 'prediction';
    return true;
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-150 pb-12">
      {/* Breadcrumbs & Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-omx-text-muted mb-1.5 font-medium">
          <span
            onClick={() => navigate('/home')}
            className="hover:text-omx-text cursor-pointer transition-colors"
          >
            Home
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-omx-text font-semibold">Activity</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-omx-text">Activity</h1>
            <p className="text-sm text-omx-text-secondary mt-1">
              Real-time audit log of your orders, demo trade executions, and market activity.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-omx-lg bg-omx-muted border border-omx-border">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-omx-md text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-omx-card text-omx-text shadow-sm border border-omx-border'
                  : 'text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              All ({allEvents.length})
            </button>
            <button
              onClick={() => setFilter('trades')}
              className={`px-3 py-1.5 rounded-omx-md text-xs font-semibold transition-all ${
                filter === 'trades'
                  ? 'bg-omx-card text-omx-text shadow-sm border border-omx-border'
                  : 'text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              Trades ({tradeEvents.length})
            </button>
            <button
              onClick={() => setFilter('predictions')}
              className={`px-3 py-1.5 rounded-omx-md text-xs font-semibold transition-all ${
                filter === 'predictions'
                  ? 'bg-omx-card text-omx-text shadow-sm border border-omx-border'
                  : 'text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              Predictions ({predictionEvents.length})
            </button>
          </div>
        </div>
      </div>

      {/* Events Stream */}
      {filteredEvents.length === 0 ? (
        <div className="w-full rounded-omx-xl border border-omx-border bg-omx-card p-12 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-omx-muted flex items-center justify-center text-omx-text-muted mb-4 border border-omx-border">
            <ActivityIcon className="w-6 h-6 text-omx-text-muted" />
          </div>
          <h3 className="text-lg font-bold text-omx-text">No activity recorded</h3>
          <p className="text-sm text-omx-text-secondary max-w-md mt-1 mb-6">
            Your trade executions and community prediction events will appear here as you trade in demo mode.
          </p>
          <button
            onClick={() => navigate('/markets')}
            className="px-6 py-2.5 rounded-omx-md text-sm font-semibold text-white bg-gradient-to-r from-[#f23064] via-[#ff4f55] to-[#ff6b1a] hover:opacity-95 active:scale-[0.98] transition-all shadow-sm"
          >
            Explore Markets
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEvents.map((evt) => {
            const formattedDate = new Date(evt.timestamp).toLocaleString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            if (evt.type === 'trade') {
              return (
                <div
                  key={evt.id}
                  className="rounded-omx-xl border border-omx-border bg-omx-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-omx-border/80 transition-colors shadow-sm"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border ${
                        evt.outcome === 'YES'
                          ? 'bg-emerald-500/10 text-omx-yes border-emerald-500/20'
                          : 'bg-rose-500/10 text-omx-no border-rose-500/20'
                      }`}
                    >
                      {evt.outcome === 'YES' ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <TrendingDown className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-omx-muted text-omx-text border border-omx-border">
                          🎮 DEMO TRADE
                        </span>
                        <span
                          className={`text-xs font-bold font-mono px-2 py-0.5 rounded border ${
                            evt.outcome === 'YES'
                              ? 'bg-emerald-500/10 text-omx-yes border-emerald-500/20'
                              : 'bg-rose-500/10 text-omx-no border-rose-500/20'
                          }`}
                        >
                          {evt.action} {evt.outcome}
                        </span>
                        <span className="text-[11px] text-omx-text-muted font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formattedDate}
                        </span>
                      </div>

                      <h4
                        onClick={() => navigate(`/markets/${evt.marketId}`)}
                        className="font-semibold text-sm sm:text-base text-omx-text hover:text-[#f23064] cursor-pointer transition-colors mt-1.5 leading-snug"
                      >
                        {evt.marketTitle}
                      </h4>

                      <p className="text-xs text-omx-text-secondary mt-1">
                        {evt.shares.toFixed(2)} shares filled @ {evt.price}¢
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-omx-border/60">
                    <span className="text-sm sm:text-base font-bold font-mono text-omx-text">
                      {evt.action === 'BUY' ? '-' : '+'}${evt.amount.toFixed(2)} USDC
                    </span>
                    <span className="text-[11px] font-semibold text-omx-yes flex items-center gap-1 mt-0.5">
                      ● Filled
                    </span>
                  </div>
                </div>
              );
            }

            // Prediction event
            return (
              <div
                key={evt.id}
                className="rounded-omx-xl border border-omx-border bg-omx-card/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-omx-border/80 transition-colors shadow-sm"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        COMMUNITY EVENT
                      </span>
                      <span className="text-[11px] text-omx-text-muted font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formattedDate}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-omx-text mt-1.5">{evt.title}</p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-omx-border/60">
                  <button
                    onClick={() => navigate(`/markets/${evt.marketId}`)}
                    className="px-3 py-1.5 rounded-omx-md text-xs font-semibold border border-omx-border bg-omx-muted hover:bg-omx-hover text-omx-text transition-colors"
                  >
                    View Market
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
