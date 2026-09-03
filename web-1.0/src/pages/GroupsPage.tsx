import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  GROUP_CATEGORIES,
  GROUPS_FIXTURES,
  TOP_GROUPS_FIXTURES,
  ACTIVE_DISCUSSIONS_FIXTURES,
  type Group,
} from '../data/groups';

export const GroupsPage: React.FC = () => {
  const { isAuthenticated, openAuthModal } = useAuth();

  const [activeTab, setActiveTab] = useState<'discover' | 'my_groups' | 'popular'>('discover');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [newGroupCategory, setNewGroupCategory] = useState('ENTERTAINMENT');

  // Local storage for joined groups
  const [joinedGroupIds, setJoinedGroupIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('omx_joined_groups');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Local user created groups
  const [localGroups, setLocalGroups] = useState<Group[]>(() => {
    try {
      const saved = localStorage.getItem('omx_local_groups');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('omx_joined_groups', JSON.stringify(joinedGroupIds));
    } catch (e) {
      console.warn('Failed to save joined groups:', e);
    }
  }, [joinedGroupIds]);

  useEffect(() => {
    try {
      localStorage.setItem('omx_local_groups', JSON.stringify(localGroups));
    } catch (e) {
      console.warn('Failed to save local groups:', e);
    }
  }, [localGroups]);

  const toggleJoin = (groupId: string) => {
    if (!isAuthenticated) {
      openAuthModal('signin');
      return;
    }
    setJoinedGroupIds((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const created: Group = {
      id: `grp-custom-${Date.now()}`,
      name: newGroupName.trim(),
      description: newGroupDesc.trim() || 'Community predictor discussions and insights.',
      category: newGroupCategory,
      categoryIcon: '👥',
      memberCount: 1,
      avatarLetter: newGroupName.trim().slice(0, 1).toUpperCase(),
      avatarBg: 'bg-rose-950 text-rose-400 border-rose-800',
    };

    setLocalGroups([created, ...localGroups]);
    setJoinedGroupIds((prev) => [...prev, created.id]);
    setNewGroupName('');
    setNewGroupDesc('');
    setShowCreateModal(false);
  };

  const allGroups = [...localGroups, ...GROUPS_FIXTURES];

  const filteredGroups = allGroups.filter((grp) => {
    // Tab filter
    if (activeTab === 'my_groups' && !joinedGroupIds.includes(grp.id)) {
      return false;
    }
    // Category filter
    if (selectedCategory !== 'all') {
      const catMatch = grp.category.toLowerCase().includes(selectedCategory.toLowerCase());
      if (!catMatch) return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        grp.name.toLowerCase().includes(q) ||
        grp.description.toLowerCase().includes(q) ||
        grp.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex gap-6 pb-12 animate-in fade-in duration-150">
      {/* Main Groups Column */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-[#f23064]" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-omx-text">Groups</h1>
          </div>
          <p className="text-sm text-omx-text-secondary mt-1">
            Join communities, share insights and grow together.
          </p>
        </div>

        {/* Action Row: Tabs, Search & Create */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {(
              [
                { id: 'discover', label: 'Discover' },
                { id: 'my_groups', label: 'My Groups' },
                { id: 'popular', label: 'Popular' },
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

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-omx-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search groups by name..."
                className="w-full pl-8 pr-7 py-2 text-xs bg-omx-card border border-omx-border rounded-omx-md text-omx-text placeholder-omx-text-muted outline-none focus:border-[#f23064]/60 transition-colors"
              />
              <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-omx-text-muted font-mono bg-omx-muted px-1.5 py-0.5 rounded border border-omx-border">
                /
              </kbd>
            </div>

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  openAuthModal('signin');
                } else {
                  setShowCreateModal(true);
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-omx-md text-xs font-semibold text-white bg-gradient-to-r from-[#f23064] via-[#ff4f55] to-[#ff6b1a] hover:opacity-95 active:scale-[0.98] transition-all shadow-sm whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Group</span>
            </button>
          </div>
        </div>

        {/* Featured Groups Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-omx-text">Featured Groups</h3>
          <p className="text-xs text-omx-text-muted italic">No featured groups right now.</p>
        </div>

        {/* All Groups Section */}
        <div className="rounded-omx-xl border border-omx-border bg-omx-card p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-omx-text">All Groups</h3>
              <p className="text-xs text-omx-text-muted">
                {filteredGroups.length} {filteredGroups.length === 1 ? 'group' : 'groups'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-omx-md border border-omx-border bg-omx-muted text-xs text-omx-text font-medium cursor-pointer">
                <span>Newest</span>
                <ChevronDown className="w-3.5 h-3.5 text-omx-text-muted" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-omx-md border border-omx-border bg-omx-muted text-xs text-omx-text font-medium hover:bg-omx-hover transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5 text-omx-text-muted" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {GROUP_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'border-[#f23064] text-[#f23064] bg-[#f23064]/10 font-bold'
                    : 'border-omx-border bg-omx-muted text-omx-text-secondary hover:text-omx-text'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Group Items List */}
          {filteredGroups.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <Users className="w-8 h-8 text-omx-text-muted mb-2" />
              <p className="text-sm font-semibold text-omx-text">No groups found</p>
              <p className="text-xs text-omx-text-muted mt-0.5">
                {activeTab === 'my_groups'
                  ? "You haven't joined any groups yet. Explore available groups to get started!"
                  : 'Try adjusting your category filter or search query.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredGroups.map((grp) => {
                const isJoined = joinedGroupIds.includes(grp.id);
                const currentMemberCount = grp.memberCount + (isJoined ? 1 : 0);

                return (
                  <div
                    key={grp.id}
                    className="p-4 sm:p-5 rounded-omx-lg border border-omx-border bg-omx-muted/40 hover:bg-omx-muted/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                          grp.avatarBg || 'bg-indigo-950 text-indigo-400 border-indigo-800'
                        }`}
                      >
                        {grp.avatarLetter}
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-bold text-sm sm:text-base text-omx-text">
                          {grp.name}
                        </h4>
                        <p className="text-xs text-omx-text-secondary leading-snug">
                          {grp.description}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-omx-card border border-omx-border text-omx-text">
                            {grp.categoryIcon} {grp.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5 pt-2 sm:pt-0 border-t sm:border-t-0 border-omx-border/60">
                      <div className="text-right">
                        <span className="text-lg font-bold font-mono text-omx-text block">
                          {currentMemberCount}
                        </span>
                        <span className="text-[10px] text-omx-text-muted uppercase tracking-wider block">
                          Members
                        </span>
                      </div>

                      <button
                        onClick={() => toggleJoin(grp.id)}
                        className={`px-5 py-2 rounded-omx-md text-xs font-semibold transition-all ${
                          isJoined
                            ? 'border border-emerald-500/30 bg-emerald-500/10 text-omx-yes hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30'
                            : 'bg-gradient-to-r from-[#f23064] via-[#ff4f55] to-[#ff6b1a] text-white hover:opacity-95 active:scale-[0.98] shadow-sm'
                        }`}
                      >
                        {isJoined ? 'Joined' : 'Join'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Rail: Discussions & Top Groups */}
      <div className="hidden xl:block w-72 flex-shrink-0 space-y-4">
        {/* User Membership Status */}
        <div className="rounded-omx-xl border border-omx-border bg-omx-card p-5 shadow-sm text-center">
          <p className="text-xs font-semibold text-omx-text-muted uppercase">My Group Status</p>
          <div className="my-2">
            <span className="text-2xl font-bold font-mono text-omx-text">
              {joinedGroupIds.length}
            </span>
            <span className="text-xs text-omx-text-muted ml-1">Joined</span>
          </div>
          <p className="text-[11px] text-omx-text-secondary">
            {joinedGroupIds.length === 0
              ? "You haven't joined any groups yet."
              : `Active member in ${joinedGroupIds.length} prediction communities.`}
          </p>
        </div>

        {/* Top Groups This Week */}
        <div className="rounded-omx-xl border border-omx-border bg-omx-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-omx-text">Top Groups (This Week)</h3>
            <span className="text-xs font-semibold text-[#f23064] cursor-pointer hover:underline">
              View all
            </span>
          </div>

          <div className="space-y-3">
            {TOP_GROUPS_FIXTURES.map((grp, idx) => (
              <div key={grp.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold font-mono text-omx-text-muted w-3">
                    {idx + 1}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center font-bold text-xs">
                    {grp.avatarLetter}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-omx-text leading-tight">{grp.name}</p>
                    <p className="text-[10px] text-omx-text-muted">{grp.memberCount} members</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-400 font-mono">{grp.delta}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Discussions */}
        <div className="rounded-omx-xl border border-omx-border bg-omx-card p-5 shadow-sm">
          <h3 className="text-sm font-bold text-omx-text mb-3">Active Discussions</h3>
          <div className="space-y-3 divide-y divide-omx-border/60">
            {ACTIVE_DISCUSSIONS_FIXTURES.map((disc, idx) => (
              <div key={disc.id} className={`flex items-start gap-2.5 ${idx > 0 ? 'pt-3' : ''}`}>
                <div className="w-6 h-6 rounded-full bg-purple-950 text-purple-400 border border-purple-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  {disc.avatarLetter}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-omx-text truncate hover:text-[#f23064] cursor-pointer transition-colors">
                    {disc.title}
                  </p>
                  <p className="text-[10px] text-omx-text-muted truncate">{disc.groupName}</p>
                </div>
                <span className="text-[10px] text-omx-text-muted flex items-center gap-0.5">
                  <MessageSquare className="w-3 h-3" /> {disc.commentsCount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Local Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="relative w-full max-w-md bg-omx-card border border-omx-border rounded-omx-xl p-6 shadow-omx-lg z-10 space-y-4">
            <h3 className="text-base font-bold text-omx-text">Create Prediction Group</h3>
            <form onSubmit={handleCreateGroup} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-omx-text mb-1">Group Name</label>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="e.g. AI Frontier Forecasters"
                  required
                  className="w-full px-3 py-2 text-xs bg-omx-muted text-omx-text border border-omx-border rounded-omx-md outline-none focus:border-[#f23064]/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-omx-text mb-1">Description</label>
                <textarea
                  value={newGroupDesc}
                  onChange={(e) => setNewGroupDesc(e.target.value)}
                  placeholder="What topics will this group focus on?"
                  rows={2}
                  className="w-full px-3 py-2 text-xs bg-omx-muted text-omx-text border border-omx-border rounded-omx-md outline-none focus:border-[#f23064]/60 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-omx-text mb-1">Category</label>
                <select
                  value={newGroupCategory}
                  onChange={(e) => setNewGroupCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-omx-muted text-omx-text border border-omx-border rounded-omx-md outline-none"
                >
                  <option value="ENTERTAINMENT">🎬 Entertainment</option>
                  <option value="CRYPTO">₿ Crypto</option>
                  <option value="POLITICS">🗳️ Politics</option>
                  <option value="TECH">🤖 Tech</option>
                  <option value="SPORTS">⚽ Sports</option>
                  <option value="ECONOMY">💰 Economy</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-omx-border">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-omx-md text-xs font-semibold text-omx-text-secondary hover:text-omx-text"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-omx-md text-xs font-semibold text-white bg-gradient-to-r from-[#f23064] via-[#ff4f55] to-[#ff6b1a] hover:opacity-95"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
