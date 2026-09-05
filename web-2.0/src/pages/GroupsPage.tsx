import React, { useState, useMemo } from 'react';
import { Users, ArrowRight, Check, Lock, MessageSquare, Send } from 'lucide-react';
import { INITIAL_GROUPS, type Group, type GroupDiscussion } from '../data/groups';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';

type CategoryFilter = 'All' | 'Macroeconomics' | 'Technology & AI' | 'Entertainment' | 'Crypto' | 'Sports';

export const GroupsPage: React.FC = () => {
  const { navigate, openAuthModal, currentPath } = useRouter();
  const { isAuthenticated } = useAuth();

  const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [expandedDiscussion, setExpandedDiscussion] = useState<string | null>(null);
  const [newThreadContent, setNewThreadContent] = useState<Record<string, string>>({});

  // Toggle Join Status
  const handleToggleJoin = (groupId: string) => {
    setGroups(
      groups.map((g) => {
        if (g.id === groupId) {
          const isJoined = !g.isJoined;
          return {
            ...g,
            isJoined,
            memberCount: isJoined ? g.memberCount + 1 : g.memberCount - 1,
          };
        }
        return g;
      })
    );
  };

  // Post new thread in a group discussion
  const handlePostThread = (groupId: string) => {
    const content = (newThreadContent[groupId] ?? '').trim();
    if (!content) return;
    setGroups(
      groups.map((g) => {
        if (g.id !== groupId) return g;
        const newThread: GroupDiscussion = {
          id: `thread-${Date.now()}`,
          authorName: 'You',
          authorInitials: 'YO',
          authorRole: 'Member',
          content,
          timeAgo: 'Just now',
          likesCount: 0,
        };
        return { ...g, discussions: [newThread, ...(g.discussions ?? [])] };
      })
    );
    setNewThreadContent((prev) => ({ ...prev, [groupId]: '' }));
  };

  // Filter Groups
  const filteredGroups = useMemo(() => {
    if (selectedCategory === 'All') return groups;
    return groups.filter((g) => g.category === selectedCategory);
  }, [groups, selectedCategory]);

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full space-y-8">
      {/* 1. Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Users className="h-4 w-4" />
          </div>
          <h1 className="font-sora text-2xl sm:text-3xl font-extrabold tracking-tight text-omx-text">
            Forecaster Guilds & Groups
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-omx-text-secondary max-w-2xl">
          Topical forecasting clubs sharing empirical data, quantitative models, and collective consensus across active prediction propositions.
        </p>
      </div>

      {/* 2. Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none w-full max-w-full min-w-0">
        {(['All', 'Macroeconomics', 'Technology & AI', 'Entertainment', 'Crypto', 'Sports'] as CategoryFilter[]).map(
          (cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`flex min-h-[44px] items-center space-x-2 rounded-xl px-4 py-2 text-xs font-sora font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                  isSelected
                    ? 'border-omx-brand bg-omx-brand/10 text-omx-brand font-bold shadow-sm'
                    : 'border-omx-border-strong/70 bg-omx-card text-omx-text-secondary hover:border-omx-border-strong hover:text-omx-text'
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          }
        )}
      </div>

      {/* 3. Groups Grid */}
      <section aria-label="Forecaster guilds list" className="w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
          {filteredGroups.map((group) => (
            <article
              key={group.id}
              className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-5 sm:p-6 shadow-sm space-y-5 transition-all hover:border-omx-border-strong flex flex-col justify-between min-w-0 overflow-hidden"
            >
              <div className="space-y-4 min-w-0">
                {/* Header: Avatar, Name & Category */}
                <div className="flex items-start justify-between gap-3 min-w-0">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-omx-bg border border-omx-border font-sora font-bold text-xs sm:text-sm text-omx-brand shrink-0">
                      {group.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-sora font-bold text-sm sm:text-base text-omx-text leading-snug break-words">
                        {group.name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-omx-text-secondary mt-0.5">
                        <span className="font-medium text-omx-brand">{group.category}</span>
                        <span>·</span>
                        <span className="font-mono">{group.memberCount.toLocaleString()} members</span>
                      </div>
                    </div>
                  </div>

                  {/* Join / Joined / Sign In Button */}
                  {group.isJoined ? (
                    <button
                      type="button"
                      onClick={() => handleToggleJoin(group.id)}
                      className="min-h-[38px] px-3.5 sm:px-4 py-1.5 rounded-xl text-xs font-sora font-bold transition-all cursor-pointer flex items-center space-x-1.5 shrink-0 border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Joined</span>
                    </button>
                  ) : !isAuthenticated ? (
                    <button
                      type="button"
                      onClick={() =>
                        openAuthModal({
                          route: currentPath,
                          action: 'generic',
                          actionLabel: `join ${group.name}`,
                        })
                      }
                      className="min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-sora font-semibold transition-all cursor-pointer flex items-center space-x-2 shrink-0 border border-omx-border-strong bg-omx-bg hover:border-omx-brand hover:bg-omx-brand/5 hover:text-omx-brand text-omx-text shadow-xs active:scale-[0.98] group/btn"
                      title="Sign in to join guild"
                      aria-label={`Sign in to join ${group.name}`}
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-omx-brand/10 text-omx-brand group-hover/btn:bg-omx-brand group-hover/btn:text-white transition-colors">
                        <Lock className="h-3 w-3" />
                      </span>
                      <span className="whitespace-nowrap font-medium">Sign in to Join</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggleJoin(group.id)}
                      className="min-h-[38px] px-4 py-1.5 rounded-xl text-xs font-sora font-bold transition-all cursor-pointer flex items-center space-x-1.5 shrink-0 border border-omx-border bg-omx-bg hover:border-omx-brand hover:text-omx-brand text-omx-text shadow-xs active:scale-[0.98]"
                    >
                      <span>Join Guild</span>
                    </button>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-omx-text-secondary leading-relaxed">
                  {group.description}
                </p>

                {/* Curated Market Proposition Preview */}
                {group.featuredMarketQuestion && (
                  <div className="rounded-xl border border-omx-border bg-omx-bg p-3.5 space-y-2">
                    <div className="text-[11px] font-semibold text-omx-text-muted uppercase tracking-wider">
                      Featured Guild Market
                    </div>
                    <p className="font-sora text-xs font-semibold text-omx-text line-clamp-2">
                      {group.featuredMarketQuestion}
                    </p>
                    {group.featuredMarketId && (
                      <button
                        type="button"
                        onClick={() => navigate(`/markets/${group.featuredMarketId}`)}
                        className="flex items-center space-x-1 text-xs font-sora font-bold text-omx-brand hover:underline cursor-pointer pt-1"
                      >
                        <span>Trade This Market</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Member Discussion Panel */}
                {group.isJoined ? (
                  /* === MEMBER VIEW: real discussion threads === */
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setExpandedDiscussion(expandedDiscussion === group.id ? null : group.id)}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <div className="flex items-center space-x-1.5">
                        <MessageSquare className="h-3.5 w-3.5 text-omx-brand" />
                        <span className="text-xs font-sora font-bold text-omx-text">
                          Member Discussion
                        </span>
                        <span className="text-[11px] font-mono text-omx-text-secondary">
                          ({(group.discussions?.length ?? 0)} threads)
                        </span>
                      </div>
                      <span className="text-[11px] text-omx-brand font-semibold">
                        {expandedDiscussion === group.id ? 'Collapse ↑' : 'Expand ↓'}
                      </span>
                    </button>

                    {expandedDiscussion === group.id && (
                      <div className="space-y-3">
                        {/* Thread list */}
                        {(group.discussions ?? []).slice(0, 4).map((thread) => (
                          <div
                            key={thread.id}
                            className="rounded-xl border border-omx-border bg-omx-bg p-3 space-y-1.5"
                          >
                            <div className="flex items-center space-x-2">
                              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-omx-card border border-omx-border text-[10px] font-bold text-omx-brand shrink-0">
                                {thread.authorInitials}
                              </div>
                              <span className="font-sora font-semibold text-xs text-omx-text">
                                {thread.authorName}
                              </span>
                              <span className="text-[11px] text-omx-text-muted">
                                {thread.authorRole} · {thread.timeAgo}
                              </span>
                            </div>
                            <p className="text-xs text-omx-text-secondary leading-relaxed pl-8">
                              {thread.content}
                            </p>
                          </div>
                        ))}

                        {/* Compose new thread */}
                        <div className="flex items-end space-x-2 pt-1">
                          <textarea
                            rows={2}
                            value={newThreadContent[group.id] ?? ''}
                            onChange={(e) =>
                              setNewThreadContent((prev) => ({ ...prev, [group.id]: e.target.value }))
                            }
                            placeholder="Add your analysis or question..."
                            className="flex-1 rounded-xl border border-omx-border bg-omx-bg px-3 py-2 text-xs text-omx-text placeholder-omx-text-muted focus:border-omx-brand focus:outline-none resize-none leading-relaxed"
                          />
                          <button
                            type="button"
                            onClick={() => handlePostThread(group.id)}
                            disabled={!(newThreadContent[group.id] ?? '').trim()}
                            className="flex items-center justify-center h-9 w-9 rounded-xl bg-omx-brand text-white hover:bg-omx-brand/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
                            aria-label="Post thread"
                          >
                            <Send className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* === NON-MEMBER VIEW: locked discussion preview === */
                  <div
                    onClick={() => {
                      if (!isAuthenticated) {
                        openAuthModal({
                          route: currentPath,
                          action: 'generic',
                          actionLabel: `join ${group.name}`,
                        });
                      } else {
                        handleToggleJoin(group.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (!isAuthenticated) {
                          openAuthModal({
                            route: currentPath,
                            action: 'generic',
                            actionLabel: `join ${group.name}`,
                          });
                        } else {
                          handleToggleJoin(group.id);
                        }
                      }
                    }}
                    className="rounded-xl border border-dashed border-omx-border-strong/70 bg-omx-bg/60 hover:bg-omx-card hover:border-omx-brand/50 p-4 flex items-center justify-between gap-3 cursor-pointer transition-all group/disc"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-omx-brand/10 text-omx-brand group-hover/disc:bg-omx-brand group-hover/disc:text-white shrink-0 transition-colors">
                        <Lock className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-sora font-semibold text-omx-text group-hover/disc:text-omx-brand transition-colors">
                          Member Discussion
                        </p>
                        <p className="text-[11px] text-omx-text-secondary mt-0.5 truncate">
                          Join to read {group.discussions?.length ?? 0} member analyses on this market
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-sora font-semibold text-omx-brand shrink-0 group-hover/disc:underline">
                      {isAuthenticated ? 'Join' : 'Sign In'} →
                    </span>
                  </div>
                )}
              </div>

              {/* Footer Meta */}
              <div className="pt-3 border-t border-omx-border/60 flex items-center justify-between text-xs text-omx-text-secondary font-mono">
                <span>Weekly Volume: ${group.weeklyVolume.toLocaleString()}</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Active Consensus</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};
