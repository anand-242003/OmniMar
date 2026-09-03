import React, { useState, useMemo } from 'react';
import { LayoutGrid, List, Search, Check } from 'lucide-react';
import { MARKETS } from '../data/markets';
import type { MarketSortOption, QuickFilterOption } from '../types';
import { CategoryPills } from '../components/market/CategoryPills';
import { MarketCard } from '../components/market/MarketCard';

export const MarketsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<MarketSortOption>('Volume');
  const [quickFilter, setQuickFilter] = useState<QuickFilterOption>('ALL');

  const filteredMarkets = useMemo(() => {
    let list = [...MARKETS];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter(
        (m) => m.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Inline search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q)
      );
    }

    // Quick filter
    if (quickFilter === 'HIGH VOLUME') {
      list = list.filter((m) => m.volume > 0);
    } else if (quickFilter === 'RISING') {
      list = list.filter((m) => m.isRising || m.delta > 0);
    } else if (quickFilter === 'FALLING') {
      list = list.filter((m) => m.isFalling || m.delta < 0);
    } else if (quickFilter === 'NEW') {
      list = list.filter((m) => m.isNew);
    } else if (quickFilter === 'CLOSING SOON') {
      list = list.filter((m) => m.isClosingSoon);
    } else if (quickFilter === 'FAVORITES') {
      list = list.filter((m) => m.isFavorite);
    }

    // Sorting
    if (sortBy === 'Volume') {
      list.sort((a, b) => b.volume - a.volume);
    } else if (sortBy === 'Newest') {
      list.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === 'Probability') {
      list.sort((a, b) => b.probability - a.probability);
    }

    return list;
  }, [selectedCategory, searchQuery, quickFilter, sortBy]);

  const quickFilterOptions: QuickFilterOption[] = [
    'HIGH VOLUME',
    'RISING',
    'FALLING',
    'NEW',
    'CLOSING SOON',
    'FAVORITES',
  ];

  const sortOptions: MarketSortOption[] = ['Volume', 'Newest', 'Probability'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header with Breadcrumb, Title & Search/View Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-omx-text-muted font-medium uppercase tracking-wider mb-1">
            Browse
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-omx-text">
            Markets
          </h1>
          <p className="text-sm text-omx-text-secondary mt-1">
            Explore all prediction markets. Trade on what you know.
          </p>
        </div>

        {/* Inline Search & View Toggle */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-omx-text-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search markets..."
              className="w-44 sm:w-60 pl-9 pr-8 py-2 bg-omx-muted/80 focus:bg-omx-card text-omx-text placeholder:text-omx-text-muted text-xs rounded-omx-md border border-omx-border focus:border-[#f23064]/60 outline-none transition-all"
            />
            <div className="absolute right-2.5 px-1.5 py-0.5 rounded border border-omx-border bg-omx-card/60 text-[10px] font-mono text-omx-text-muted pointer-events-none">
              /
            </div>
          </div>

          <div className="flex items-center rounded-omx-md border border-omx-border bg-omx-muted p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-omx-sm transition-colors ${
                viewMode === 'grid'
                  ? 'bg-omx-card text-[#f23064] shadow-sm'
                  : 'text-omx-text-muted hover:text-omx-text'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-omx-sm transition-colors ${
                viewMode === 'list'
                  ? 'bg-omx-card text-[#f23064] shadow-sm'
                  : 'text-omx-text-muted hover:text-omx-text'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div>
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Layout Grid: Left Market Catalog + Right Rail Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Column (8 or 9 cols on desktop) */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* Sub-bar: Count & Sort Toggle */}
          <div className="flex items-center justify-between text-xs text-omx-text-secondary border-b border-omx-border pb-3">
            <span className="font-mono font-medium">
              {filteredMarkets.length} markets
            </span>

            <div className="flex items-center gap-2">
              <span className="text-omx-text-muted">Sort:</span>
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSortBy(opt)}
                  className={`font-semibold transition-colors ${
                    sortBy === opt ? 'text-[#f23064]' : 'text-omx-text-secondary hover:text-omx-text'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Markets Content */}
          {filteredMarkets.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredMarkets.map((market) => (
                  <MarketCard key={market.id} market={market} viewMode="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMarkets.map((market) => (
                  <MarketCard key={market.id} market={market} viewMode="list" />
                ))}
              </div>
            )
          ) : (
            <div className="p-12 text-center rounded-omx-xl bg-omx-card border border-omx-border text-omx-text-muted text-sm">
              No markets found matching the active filters.
            </div>
          )}
        </div>

        {/* Right Rail: Quick Filters & Sort Card (Desktop) */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-5">
          {/* Quick Filters Card */}
          <div className="p-4 rounded-omx-xl bg-omx-card border border-omx-border space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-omx-text">
              Quick Filters
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {quickFilterOptions.map((filter) => {
                const isActive = quickFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setQuickFilter(isActive && filter !== 'ALL' ? 'ALL' : filter)}
                    className={`px-2.5 py-1 rounded-omx-sm text-[11px] font-bold tracking-wide transition-all border ${
                      isActive
                        ? 'bg-[#f23064]/15 border-[#f23064] text-[#f23064]'
                        : 'bg-omx-muted/60 border-omx-border text-omx-text-secondary hover:text-omx-text hover:bg-omx-hover'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Card */}
          <div className="p-4 rounded-omx-xl bg-omx-card border border-omx-border space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-omx-text mb-3">
              Sort
            </h3>
            <div className="space-y-1">
              {sortOptions.map((opt) => {
                const isSelected = sortBy === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-omx-md text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#f23064]/10 text-omx-text font-semibold'
                        : 'text-omx-text-secondary hover:text-omx-text hover:bg-omx-hover'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#f23064]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
