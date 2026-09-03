import React, { useState, useEffect } from 'react';
import {
  BarChart2,
  Image as ImageIcon,
  Vote,
  Heart,
  MessageSquare,
  Repeat2,
  Bookmark,
  Share2,
  MoreHorizontal,
  Plus,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrade } from '../context/TradeContext';
import { useRouter } from '../context/RouterContext';
import {
  STORIES_FIXTURES,
  TRENDING_HASHTAGS_FIXTURES,
  SOCIAL_POSTS_FIXTURES,
  type SocialPost,
} from '../data/social';

export const SocialPage: React.FC = () => {
  const { user } = useAuth();
  const { predictions } = useTrade();
  const { navigate } = useRouter();

  const [activeTab, setActiveTab] = useState<'for_you' | 'following' | 'top' | 'latest'>('for_you');
  const [postContent, setPostContent] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState<'BULLISH' | 'BEARISH' | null>(null);

  // Local storage for user created posts and likes
  const [localPosts, setLocalPosts] = useState<SocialPost[]>(() => {
    try {
      const saved = localStorage.getItem('omx_social_posts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('omx_liked_posts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('omx_social_posts', JSON.stringify(localPosts));
    } catch (e) {
      console.warn('Failed to save social posts:', e);
    }
  }, [localPosts]);

  useEffect(() => {
    try {
      localStorage.setItem('omx_liked_posts', JSON.stringify(likedPosts));
    } catch (e) {
      console.warn('Failed to save liked posts:', e);
    }
  }, [likedPosts]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    const newPost: SocialPost = {
      id: `user-post-${Date.now()}`,
      authorName: user?.name || 'Demo Trader',
      authorHandle: `@${user?.username || 'demotrader'}`,
      authorInitials: user?.name ? user.name.slice(0, 2).toUpperCase() : 'DE',
      timestamp: new Date().toISOString(),
      timeAgo: 'Just now',
      content: postContent.trim(),
      sentiment: selectedSentiment || undefined,
      likesCount: 0,
      commentsCount: 0,
      repostsCount: 0,
      category: 'latest',
    };

    setLocalPosts([newPost, ...localPosts]);
    setPostContent('');
    setSelectedSentiment(null);
  };

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Convert TradeContext predictions to social feed cards
  const tradePredictionPosts: SocialPost[] = predictions.map((pred) => ({
    id: `trade-pred-${pred.id}`,
    authorName: pred.authorName || user?.name || 'Demo Trader',
    authorHandle: pred.authorHandle || `@${user?.username || 'demotrader'}`,
    authorInitials: user?.name ? user.name.slice(0, 2).toUpperCase() : 'DE',
    timestamp: pred.timestamp,
    timeAgo: 'Recent',
    content: pred.text,
    marketId: pred.marketId,
    marketTitle: pred.marketTitle,
    predictedOutcome: pred.outcome,
    sentiment: pred.outcome === 'YES' ? 'BULLISH' : 'BEARISH',
    likesCount: 5,
    commentsCount: 1,
    repostsCount: 0,
    category: 'for_you',
  }));

  // Merge posts based on active tab
  const allPosts = [...localPosts, ...tradePredictionPosts, ...SOCIAL_POSTS_FIXTURES];

  const filteredPosts = allPosts.filter((post) => {
    if (activeTab === 'for_you') return true;
    if (activeTab === 'following') return post.category === 'following' || post.id.startsWith('user-post');
    if (activeTab === 'top') return post.likesCount > 15 || post.category === 'top';
    if (activeTab === 'latest') return true;
    return true;
  });

  return (
    <div className="flex gap-6 pb-12 animate-in fade-in duration-150">
      {/* Main Feed Column */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-omx-text">Social</h1>
          <p className="text-sm text-omx-text-secondary mt-1">
            What predictors are saying and betting on right now.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2">
          {(
            [
              { id: 'for_you', label: 'For You' },
              { id: 'following', label: 'Following' },
              { id: 'top', label: 'Top' },
              { id: 'latest', label: 'Latest' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-omx-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'border border-[#f23064] text-[#f23064] bg-[#f23064]/10 shadow-sm'
                  : 'border border-omx-border bg-omx-card text-omx-text-secondary hover:text-omx-text hover:border-omx-border/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stories Bar */}
        <div className="flex items-center gap-4 overflow-x-auto py-2 px-1 scrollbar-none">
          {STORIES_FIXTURES.map((story) => (
            <div
              key={story.id}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
            >
              <div className="relative">
                <div
                  className={`w-14 h-14 rounded-full p-0.5 transition-transform group-hover:scale-105 ${
                    story.isCurrentUser
                      ? 'border-2 border-dashed border-omx-border'
                      : 'bg-gradient-to-tr from-[#f23064] via-[#ff6b1a] to-purple-500'
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-omx-card flex items-center justify-center text-omx-text font-bold text-sm">
                    {story.initials}
                  </div>
                </div>
                {story.isCurrentUser && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#f23064] text-white flex items-center justify-center text-[10px] font-bold border-2 border-omx-card">
                    <Plus className="w-3 h-3" />
                  </div>
                )}
              </div>
              <span className="text-[11px] font-medium text-omx-text-muted group-hover:text-omx-text transition-colors truncate max-w-[64px]">
                {story.name}
              </span>
            </div>
          ))}
        </div>

        {/* Create Post Box */}
        <div className="rounded-omx-xl border border-omx-border bg-omx-card p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'DE'}
            </div>
            <div className="flex-1">
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What's on your mind?"
                rows={2}
                className="w-full bg-transparent text-sm text-omx-text placeholder-omx-text-muted outline-none resize-none"
              />
            </div>
          </div>

          {/* Sentiment Selection & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-omx-border/70">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setSelectedSentiment((prev) => (prev === 'BULLISH' ? null : 'BULLISH'))}
                className={`px-2.5 py-1 rounded text-xs font-bold font-mono transition-all border ${
                  selectedSentiment === 'BULLISH'
                    ? 'bg-emerald-500/20 text-omx-yes border-emerald-500/40 shadow-sm'
                    : 'bg-omx-muted text-omx-text-muted border-omx-border hover:text-omx-text'
                }`}
              >
                ● BULLISH
              </button>
              <button
                type="button"
                onClick={() => setSelectedSentiment((prev) => (prev === 'BEARISH' ? null : 'BEARISH'))}
                className={`px-2.5 py-1 rounded text-xs font-bold font-mono transition-all border ${
                  selectedSentiment === 'BEARISH'
                    ? 'bg-rose-500/20 text-omx-no border-rose-500/40 shadow-sm'
                    : 'bg-omx-muted text-omx-text-muted border-omx-border hover:text-omx-text'
                }`}
              >
                ● BEARISH
              </button>
              <button
                type="button"
                className="flex items-center gap-1 text-xs text-omx-text-muted hover:text-omx-text transition-colors"
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Market</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1 text-xs text-omx-text-muted hover:text-omx-text transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Image</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1 text-xs text-omx-text-muted hover:text-omx-text transition-colors"
              >
                <Vote className="w-3.5 h-3.5" />
                <span>Poll</span>
              </button>
            </div>

            <button
              onClick={handleCreatePost}
              disabled={!postContent.trim()}
              className="px-5 py-2 rounded-omx-md text-xs font-semibold text-white bg-gradient-to-r from-[#f23064] via-[#ff4f55] to-[#ff6b1a] hover:opacity-95 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              Post
            </button>
          </div>
        </div>

        {/* Social Posts Stream */}
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            const isLiked = likedPosts[post.id];
            const currentLikes = post.likesCount + (isLiked ? 1 : 0);

            return (
              <div
                key={post.id}
                className="rounded-omx-xl border border-omx-border bg-omx-card p-5 shadow-sm space-y-3.5 hover:border-omx-border/80 transition-colors"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-900 to-indigo-950 border border-purple-800/60 flex items-center justify-center text-purple-300 font-bold text-xs">
                      {post.authorInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-omx-text">{post.authorName}</span>
                        <span className="text-xs text-omx-text-muted font-mono">
                          {post.authorHandle} · {post.timeAgo}
                        </span>
                      </div>
                      {post.sentiment && (
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold font-mono border mt-0.5 ${
                            post.sentiment === 'BULLISH'
                              ? 'bg-emerald-500/10 text-omx-yes border-emerald-500/20'
                              : 'bg-rose-500/10 text-omx-no border-rose-500/20'
                          }`}
                        >
                          {post.sentiment}
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="text-omx-text-muted hover:text-omx-text transition-colors p-1">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <p className="text-sm text-omx-text leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Attached Market Preview if exists */}
                {post.marketTitle && post.marketId && (
                  <div
                    onClick={() => navigate(`/markets/${post.marketId}`)}
                    className="p-3 rounded-omx-md border border-omx-border bg-omx-muted hover:bg-omx-hover cursor-pointer transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">📊</span>
                      <span className="text-xs font-semibold text-omx-text line-clamp-1">
                        {post.marketTitle}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-omx-text-muted flex-shrink-0" />
                  </div>
                )}

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-omx-border/60 text-xs text-omx-text-muted">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      isLiked ? 'text-[#f23064]' : 'hover:text-[#f23064]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#f23064]' : ''}`} />
                    <span>{currentLikes}</span>
                  </button>

                  <button className="flex items-center gap-1.5 hover:text-omx-text transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount}</span>
                  </button>

                  <button className="flex items-center gap-1.5 hover:text-omx-text transition-colors">
                    <Repeat2 className="w-4 h-4" />
                    <span>{post.repostsCount}</span>
                  </button>

                  <button className="hover:text-omx-text transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button className="hover:text-omx-text transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Rail: Trending Hashtags */}
      <div className="hidden xl:block w-72 flex-shrink-0 space-y-4">
        <div className="rounded-omx-xl border border-omx-border bg-omx-card p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#f23064]" />
            <h3 className="text-sm font-bold text-omx-text">Trending Hashtags</h3>
          </div>

          <div className="space-y-3.5 divide-y divide-omx-border/60">
            {TRENDING_HASHTAGS_FIXTURES.map((item, idx) => (
              <div
                key={item.tag}
                className={`flex items-center justify-between gap-3 cursor-pointer group ${
                  idx > 0 ? 'pt-3' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
                    #
                  </div>
                  <div>
                    <p className="text-xs font-bold text-omx-text group-hover:text-[#f23064] transition-colors">
                      {item.tag}
                    </p>
                    <p className="text-[11px] text-omx-text-muted">{item.postsCount} posts</p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-emerald-400">{item.delta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
