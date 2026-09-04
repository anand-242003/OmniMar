import React, { useState, useMemo, useEffect } from 'react';
import { MessageSquare, Heart, Share2, Send, TrendingUp, TrendingDown, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { INITIAL_SOCIAL_POSTS, type SocialPost } from '../data/social';
import { MARKETS } from '../data/markets';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { AuthGate } from '../components/common/AuthGate';
import { SocialFeedSkeleton } from '../components/social/SocialFeedSkeleton';

export const SocialPage: React.FC = () => {
  const { navigate } = useRouter();
  const { user } = useAuth();

  const [posts, setPosts] = useState<SocialPost[]>(INITIAL_SOCIAL_POSTS);
  const [filter, setFilter] = useState<'ALL' | 'BULLISH' | 'BEARISH' | 'MARKETS'>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 140);
    return () => clearTimeout(timer);
  }, [filter]);

  // Composer Form State
  const [newContent, setNewContent] = useState('');
  const [newSentiment, setNewSentiment] = useState<'BULLISH' | 'BEARISH' | 'NEUTRAL'>('BULLISH');
  const [selectedMarketId, setSelectedMarketId] = useState<string>('');

  // Handle Post Creation
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const attachedMarket = MARKETS.find((m) => m.id === selectedMarketId);

    const post: SocialPost = {
      id: `sp-${Date.now()}`,
      authorName: user?.email ? user.email.split('@')[0] : 'Guest Forecaster',
      authorHandle: `@${user?.email ? user.email.split('@')[0].toLowerCase() : 'guest_trader'}`,
      authorInitials: user?.avatarInitials || 'GT',
      authorRole: 'Independent Analyst',
      timestamp: new Date().toISOString(),
      timeAgo: 'Just now',
      content: newContent.trim(),
      sentiment: newSentiment,
      marketId: attachedMarket?.id,
      marketQuestion: attachedMarket?.question,
      marketCategory: attachedMarket?.category,
      oddsAtPost: attachedMarket?.impliedProbabilityYes,
      marketOddsYes: attachedMarket?.impliedProbabilityYes,
      predictedOutcome: newSentiment === 'BULLISH' ? 'YES' : newSentiment === 'BEARISH' ? 'NO' : undefined,
      positionStatus: 'OPEN',
      isDemo: true,  // All sandbox-created posts are Demo
      likesCount: 0,
      isLiked: false,
      commentsCount: 0,
    };

    setPosts([post, ...posts]);
    setNewContent('');
    setSelectedMarketId('');
  };

  // Toggle Like Action
  const handleToggleLike = (postId: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : p.likesCount - 1,
          };
        }
        return p;
      })
    );
  };

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    if (filter === 'BULLISH') return posts.filter((p) => p.sentiment === 'BULLISH');
    if (filter === 'BEARISH') return posts.filter((p) => p.sentiment === 'BEARISH');
    if (filter === 'MARKETS') return posts.filter((p) => Boolean(p.marketId));
    return posts;
  }, [posts, filter]);

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Feed & Composer (8 Cols on Desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10 text-[#f23064]">
                <MessageSquare className="h-4 w-4" />
              </div>
              <h1 className="font-sora text-2xl sm:text-3xl font-extrabold tracking-tight text-omx-text">
                Community & Pulse
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-omx-text-secondary">
              Empirical hypotheses, prediction rationales, and community debate on active propositions.
            </p>
          </div>

          {/* Hypothesis Composer wrapped in AuthGate inline variant */}
          <AuthGate
            variant="inline"
            inlineMessage="Sign in to publish a forecast thesis"
            actionLabel="publish this forecast thesis"
          >
            <form
              onSubmit={handleCreatePost}
              className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-5 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between text-xs font-sora font-semibold text-omx-text">
                <span>Publish a Forecast Thesis</span>
                <span className="text-[11px] font-normal text-omx-text-muted">Public Community Feed</span>
              </div>

              <textarea
                required
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Share your reasoning, empirical evidence, or counter-thesis..."
                className="w-full rounded-xl border border-omx-border bg-omx-bg p-3 text-xs sm:text-sm text-omx-text placeholder-omx-text-muted focus:border-omx-brand focus:outline-none resize-none leading-relaxed"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Sentiment Selector */}
                  <div className="flex rounded-lg border border-omx-border bg-omx-bg p-0.5 text-xs font-sora">
                    <button
                      type="button"
                      onClick={() => setNewSentiment('BULLISH')}
                      className={`flex items-center space-x-1 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
                        newSentiment === 'BULLISH'
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold'
                          : 'text-omx-text-muted hover:text-omx-text'
                      }`}
                    >
                      <TrendingUp className="h-3 w-3" />
                      <span>Bullish YES</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewSentiment('BEARISH')}
                      className={`flex items-center space-x-1 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
                        newSentiment === 'BEARISH'
                          ? 'bg-rose-500/20 text-rose-700 dark:text-rose-400 font-bold'
                          : 'text-omx-text-muted hover:text-omx-text'
                      }`}
                    >
                      <TrendingDown className="h-3 w-3" />
                      <span>Bearish NO</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewSentiment('NEUTRAL')}
                      className={`flex items-center space-x-1 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
                        newSentiment === 'NEUTRAL'
                          ? 'bg-omx-card text-omx-text font-bold'
                          : 'text-omx-text-muted hover:text-omx-text'
                      }`}
                    >
                      <Minus className="h-3 w-3" />
                      <span>Neutral</span>
                    </button>
                  </div>

                  {/* Attach Market Select */}
                  <select
                    value={selectedMarketId}
                    onChange={(e) => setSelectedMarketId(e.target.value)}
                    className="rounded-lg border border-omx-border bg-omx-bg px-2.5 py-1 text-xs text-omx-text focus:outline-none cursor-pointer max-w-[180px] truncate"
                    aria-label="Attach a prediction market"
                  >
                    <option value="">Attach Market (Optional)</option>
                    {MARKETS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.question}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="flex min-h-[38px] items-center justify-center space-x-1.5 rounded-xl bg-omx-brand px-4 py-2 text-xs font-sora font-bold text-white hover:bg-omx-brand/90 transition-colors cursor-pointer shadow-sm shrink-0"
                >
                  <span>Publish</span>
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </form>
          </AuthGate>

          {/* Feed Filter Strip */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setFilter('ALL')}
              className={`min-h-[36px] rounded-lg px-3 py-1.5 text-xs font-sora font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                filter === 'ALL'
                  ? 'border-omx-brand bg-omx-brand/10 text-omx-brand font-bold'
                  : 'border-omx-border-strong/70 bg-omx-card text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              All Hypotheses ({posts.length})
            </button>
            <button
              onClick={() => setFilter('BULLISH')}
              className={`min-h-[36px] rounded-lg px-3 py-1.5 text-xs font-sora font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                filter === 'BULLISH'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'border-omx-border-strong/70 bg-omx-card text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              Bullish Theses
            </button>
            <button
              onClick={() => setFilter('BEARISH')}
              className={`min-h-[36px] rounded-lg px-3 py-1.5 text-xs font-sora font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                filter === 'BEARISH'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400 font-bold'
                  : 'border-omx-border-strong/70 bg-omx-card text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              Bearish Theses
            </button>
            <button
              onClick={() => setFilter('MARKETS')}
              className={`min-h-[36px] rounded-lg px-3 py-1.5 text-xs font-sora font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                filter === 'MARKETS'
                  ? 'border-omx-brand bg-omx-brand/10 text-omx-brand font-bold'
                  : 'border-omx-border-strong/70 bg-omx-card text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              With Attached Market
            </button>
          </div>

          {/* Posts List with Skeleton Morphing */}
          <div className="space-y-4">
            {isLoading ? (
              <>
                <SocialFeedSkeleton />
                <SocialFeedSkeleton />
                <SocialFeedSkeleton />
              </>
            ) : (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className={`rounded-2xl border border-omx-border-strong/70 bg-omx-card p-5 sm:p-6 shadow-sm space-y-4 transition-all hover:border-omx-border-strong animate-in fade-in duration-200 ${
                    post.isDemo ? 'border-l-2 border-l-indigo-400' : ''
                  }`}
                >
                {/* Author Info & Sentiment Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-omx-bg border border-omx-border font-sora font-bold text-xs text-omx-brand">
                      {post.authorInitials}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-sora font-bold text-sm text-omx-text">{post.authorName}</span>
                        <span className="text-xs text-omx-text-muted">{post.authorHandle}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] text-omx-text-secondary">
                        <span>{post.authorRole}</span>
                        <span>·</span>
                        <span>{post.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge + Demo Badge */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {post.positionStatus && (
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-sora font-bold border ${
                          post.positionStatus === 'OPEN'
                            ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20'
                            : post.positionStatus === 'CLOSED'
                            ? 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
                            : post.settledOutcome === 'WON'
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                        }`}
                      >
                        {post.positionStatus === 'SETTLED'
                          ? `SETTLED — ${post.settledOutcome ?? ''}`
                          : post.positionStatus}
                      </span>
                    )}
                    {post.isDemo && (
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-sora font-bold bg-indigo-500/8 text-indigo-600 dark:text-indigo-400 border border-indigo-400/20">
                        Demo
                      </span>
                    )}
                  </div>
                </div>

                {/* Content + Sentiment */}
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-omx-text leading-relaxed">{post.content}</p>
                  {/* Sentiment pill — secondary signal below content */}
                  <span
                    className={`inline-flex items-center space-x-1 rounded-full px-2.5 py-0.5 text-[10px] font-sora font-semibold border ${
                      post.sentiment === 'BULLISH'
                        ? 'bg-emerald-500/8 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                        : post.sentiment === 'BEARISH'
                        ? 'bg-rose-500/8 text-rose-700 dark:text-rose-400 border-rose-500/20'
                        : 'bg-omx-bg text-omx-text-muted border-omx-border'
                    }`}
                  >
                    {post.sentiment === 'BULLISH' && <TrendingUp className="h-2.5 w-2.5" />}
                    {post.sentiment === 'BEARISH' && <TrendingDown className="h-2.5 w-2.5" />}
                    {post.sentiment === 'NEUTRAL' && <Minus className="h-2.5 w-2.5" />}
                    <span>{post.sentiment}</span>
                  </span>
                </div>

                {/* Attached Market Embed */}
                {post.marketId && post.marketQuestion && (
                  <div className={`rounded-xl border bg-omx-bg p-3.5 space-y-2.5 ${
                    post.isDemo ? 'border-indigo-400/25' : 'border-omx-border'
                  }`}>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-omx-text-muted uppercase tracking-wide">
                        {post.marketCategory}
                      </span>
                      <div className="flex items-center space-x-2 font-mono">
                        {post.oddsAtPost !== undefined && post.oddsAtPost !== post.marketOddsYes && (
                          <span className="text-omx-text-muted">
                            Posted {post.oddsAtPost}% YES
                          </span>
                        )}
                        {post.marketOddsYes !== undefined && (
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">
                            {post.oddsAtPost !== undefined && post.oddsAtPost !== post.marketOddsYes ? '· Current ' : ''}{post.marketOddsYes}% YES
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="font-sora font-semibold text-xs sm:text-sm text-omx-text leading-snug">
                      {post.marketQuestion}
                    </p>

                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[11px] text-omx-text-muted">Direct Resolution Market</span>
                      <button
                        type="button"
                        onClick={() => navigate(`/markets/${post.marketId}`)}
                        className="flex items-center space-x-1 text-xs font-sora font-bold text-omx-brand hover:underline cursor-pointer"
                      >
                        <span>Investigate Market</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Engagement Bar */}
                <div className="flex items-center space-x-6 pt-2 border-t border-omx-border/60 text-xs text-omx-text-secondary">
                  <button
                    type="button"
                    onClick={() => handleToggleLike(post.id)}
                    aria-label={post.isLiked ? 'Unlike post' : 'Like post'}
                    className={`flex items-center space-x-1.5 transition-colors cursor-pointer ${
                      post.isLiked ? 'text-rose-600 font-bold' : 'hover:text-omx-text'
                    }`}
                  >
                    <Heart className={`h-3.5 w-3.5 ${post.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{post.likesCount}</span>
                  </button>

                  <div className="flex items-center space-x-1.5">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{post.commentsCount} comments</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert('Post link copied to clipboard')}
                    className="flex items-center space-x-1 hover:text-omx-text transition-colors cursor-pointer"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </article>
            )))}
          </div>
        </div>

        {/* Right Column: Credibility Sidebar (4 Cols on Desktop) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Top Forecasters */}
          <div className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-5 shadow-sm space-y-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-omx-brand" />
              <h2 className="font-sora font-bold text-sm text-omx-text">Top Forecasters This Month</h2>
            </div>

            <div className="space-y-3 divide-y divide-omx-border/60">
              <div className="pt-2 first:pt-0 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                    ER
                  </div>
                  <div>
                    <div className="font-sora font-bold text-xs text-omx-text">Dr. Elena Rostova</div>
                    <div className="text-[11px] text-omx-text-muted">Macro Specialist</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">78.4% Win</div>
                  <div className="text-[10px] text-omx-text-muted">42 verified</div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400 font-bold text-xs flex items-center justify-center">
                    MV
                  </div>
                  <div>
                    <div className="font-sora font-bold text-xs text-omx-text">Marcus Vance</div>
                    <div className="text-[11px] text-omx-text-muted">Entertainment / Gaming</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">74.1% Win</div>
                  <div className="text-[10px] text-omx-text-muted">31 verified</div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                    SJ
                  </div>
                  <div>
                    <div className="font-sora font-bold text-xs text-omx-text">Sarah Jenkins</div>
                    <div className="text-[11px] text-omx-text-muted">Aerospace / Defense</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">71.8% Win</div>
                  <div className="text-[10px] text-omx-text-muted">28 verified</div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/leaderboard')}
              className="w-full text-center text-xs font-sora font-semibold text-omx-brand hover:underline pt-2 block"
            >
              View Full Leaderboard →
            </button>
          </div>

          {/* Guidelines Capsule */}
          <div className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-5 shadow-sm space-y-2 text-xs">
            <h3 className="font-sora font-bold text-omx-text">Forecasting Standard</h3>
            <p className="text-omx-text-secondary leading-relaxed">
              OmniMarketX promotes evidence-grounded hypotheses over speculation. Attach named resolution sources and empirical citations to earn forecaster credibility badges.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
};
