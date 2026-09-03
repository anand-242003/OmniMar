import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send } from 'lucide-react';
import type { Market, MarketDiscussion } from '../../types/market';
import { useAuth } from '../../context/AuthContext';

interface CommunityDiscussionProps {
  market: Market;
}

export const CommunityDiscussion: React.FC<CommunityDiscussionProps> = ({ market }) => {
  const { user } = useAuth();
  const [discussions, setDiscussions] = useState<MarketDiscussion[]>(market.discussions);
  const [commentText, setCommentText] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState<'BULLISH' | 'BEARISH'>('BULLISH');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newDisc: MarketDiscussion = {
      id: 'disc-' + Date.now(),
      author: {
        name: user?.name || 'Guest Predictor',
        handle: user?.name.toLowerCase().replace(/\s+/g, '_') || 'guest',
        initials: user?.avatarInitials || 'GP',
        winRate: 72,
        totalPredictions: 14,
        badge: 'Verified Predictor',
      },
      sentiment: selectedSentiment,
      outcome: selectedSentiment === 'BULLISH' ? 'YES' : 'NO',
      entryPrice: selectedSentiment === 'BULLISH' ? market.yesPrice : market.noPrice,
      content: commentText.trim(),
      timestamp: 'Just now',
      likes: 1,
      commentsCount: 0,
    };

    setDiscussions([newDisc, ...discussions]);
    setCommentText('');
  };

  return (
    <div className="border-t border-omx-border pt-6 mt-6 space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4 text-[#f23064]" />
          <h2 className="font-sora font-bold text-base text-omx-text tracking-tight">
            Forecaster Debates & Commentary
          </h2>
          <span className="rounded-full border border-omx-border bg-omx-card px-2 py-0.5 text-xs text-omx-text-secondary font-mono">
            {discussions.length}
          </span>
        </div>
      </div>

      {/* Post Comment Input */}
      <form onSubmit={handleSubmit} className="rounded-xl border border-omx-border bg-omx-card p-3.5 space-y-3">
        <textarea
          rows={2}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Share your prediction rationale with the community..."
          className="w-full rounded-lg border border-omx-border bg-omx-bg p-2.5 text-xs text-omx-text placeholder-omx-text-muted focus:border-omx-brand focus:outline-none resize-none"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={() => setSelectedSentiment('BULLISH')}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                selectedSentiment === 'BULLISH'
                  ? 'border border-omx-yes/50 bg-omx-yes-bg text-omx-yes'
                  : 'text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              ▲ BULLISH (YES)
            </button>
            <button
              type="button"
              onClick={() => setSelectedSentiment('BEARISH')}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                selectedSentiment === 'BEARISH'
                  ? 'border border-omx-no/50 bg-omx-no-bg text-omx-no'
                  : 'text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              ▼ BEARISH (NO)
            </button>
          </div>

          <button
            type="submit"
            disabled={!commentText.trim()}
            className="flex items-center space-x-1.5 rounded-lg bg-[#f23064] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#ff4f55] disabled:opacity-40 transition-colors"
          >
            <span>Post</span>
            <Send className="h-3 w-3" />
          </button>
        </div>
      </form>

      {/* Discussion Thread List */}
      <div className="space-y-3">
        {discussions.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-omx-border bg-omx-card p-3.5 space-y-2.5 text-xs"
          >
            {/* Header: Author + Badge + Sentiment + Timestamp */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-omx-elevated font-mono font-bold text-[11px] text-omx-text border border-omx-border">
                  {item.author.initials}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-semibold text-omx-text">{item.author.name}</span>
                    {item.author.badge && (
                      <span className="rounded border border-omx-border px-1.5 py-0.2 text-[10px] text-omx-text-secondary font-medium">
                        {item.author.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-omx-text-muted">
                    @{item.author.handle} · {item.author.winRate}% win rate
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    item.sentiment === 'BULLISH'
                      ? 'border border-omx-yes/30 bg-omx-yes-bg text-omx-yes'
                      : 'border border-omx-no/30 bg-omx-no-bg text-omx-no'
                  }`}
                >
                  {item.sentiment === 'BULLISH' ? '▲ BULLISH' : '▼ BEARISH'} @ {item.entryPrice}¢
                </span>
                <span className="text-[11px] text-omx-text-muted">{item.timestamp}</span>
              </div>
            </div>

            {/* Content Body */}
            <p className="text-omx-text-secondary leading-relaxed">
              {item.content}
            </p>

            {/* Footer Metrics */}
            <div className="flex items-center space-x-4 pt-1 text-[11px] text-omx-text-muted">
              <button className="flex items-center space-x-1 hover:text-omx-text transition-colors">
                <ThumbsUp className="h-3 w-3" />
                <span>{item.likes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-omx-text transition-colors">
                <MessageSquare className="h-3 w-3" />
                <span>{item.commentsCount} replies</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
