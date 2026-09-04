import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Sparkles, Film, Landmark, Cpu, Trophy, Coins, X, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { MARKETS } from '../data/markets';
import { MarketCard } from '../components/market/MarketCard';
import { MarketCardSkeleton } from '../components/market/MarketCardSkeleton';

type SortOption = 'Trending' | '24h Volume' | 'Closing Soon' | 'Newest' | 'High Probability';

const SORT_OPTIONS: SortOption[] = ['Trending', '24h Volume', 'Closing Soon', 'Newest', 'High Probability'];

interface CategoryTab {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const CATEGORIES: CategoryTab[] = [
  { id: 'all', name: 'All Markets', icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: 'entertainment', name: 'Entertainment', icon: <Film className="h-3.5 w-3.5" /> },
  { id: 'macro & politics', name: 'Macro & Politics', icon: <Landmark className="h-3.5 w-3.5" /> },
  { id: 'technology', name: 'Technology', icon: <Cpu className="h-3.5 w-3.5" /> },
  { id: 'sports', name: 'Sports', icon: <Trophy className="h-3.5 w-3.5" /> },
  { id: 'crypto', name: 'Crypto', icon: <Coins className="h-3.5 w-3.5" /> },
];

export const MarketsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('Trending');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth skeleton morph on initial load
    const timer = setTimeout(() => setIsLoading(false), 140);
    return () => clearTimeout(timer);
  }, []);

  // Close sort popover on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSortOpen(false);
    };
    if (isSortOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isSortOpen]);

  // Keyboard shortcut: Pressing '/' focuses search; 'Escape' clears it
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        setSearchQuery('');
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Instant deterministic client-side filtering & sorting (No debounce)
  const filteredMarkets = useMemo(() => {
    let list = [...MARKETS];

    // 1. Category Filter
    if (selectedCategory !== 'all') {
      list = list.filter(
        (m) => m.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 2. Instant Multi-Field Search (Question, Category, Resolution Source)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (m) =>
          m.question.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.resolutionSource.toLowerCase().includes(q)
      );
    }

    // 3. Sorting Dimensions
    switch (sortBy) {
      case 'Trending':
        // Activity score based on 24h volume & predictor participation
        list.sort((a, b) => b.volume24h + b.predictorsCount * 10 - (a.volume24h + a.predictorsCount * 10));
        break;
      case '24h Volume':
        list.sort((a, b) => b.volume24h - a.volume24h);
        break;
      case 'Closing Soon':
        list.sort((a, b) => new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime());
        break;
      case 'Newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'High Probability':
        list.sort((a, b) => b.impliedProbabilityYes - a.impliedProbabilityYes);
        break;
      default:
        break;
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('Trending');
    searchInputRef.current?.focus();
  };

  // Category item counts for clear information scent
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MARKETS.length };
    MARKETS.forEach((m) => {
      const cat = m.category.toLowerCase();
      counts[cat] = (counts[cat] ?? 0) + 1;
    });
    return counts;
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 min-w-0">
      {/* 1. Header Strip: Title, Description & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-omx-border pb-5">
        <div>
          <h1 className="font-sora text-2xl sm:text-3xl font-bold tracking-tight text-omx-text">
            Explore Markets
          </h1>
          <p className="mt-1 text-sm text-omx-text-secondary max-w-xl">
            Real-time consensus odds on global events. Trade directly on verified outcomes.
          </p>
        </div>

        {/* Instant Search Bar with '/' Shortcut */}
        <div className="w-full md:w-80">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-omx-text-muted" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search markets, categories, sources..."
              aria-label="Search prediction markets"
              className="w-full min-h-[44px] rounded-xl border border-omx-border bg-omx-card py-2.5 pl-10 pr-12 text-xs text-omx-text placeholder-omx-text-muted focus:border-omx-brand focus:outline-none transition-colors"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-1 text-omx-text-muted hover:text-omx-text transition-colors p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <div className="pointer-events-none absolute right-3 hidden sm:flex items-center">
                <kbd className="rounded border border-omx-border bg-omx-bg px-1.5 py-0.5 font-mono text-xs text-omx-text-muted">
                  /
                </kbd>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Category Filter Pills (Touch-friendly horizontal scroll on narrow viewports) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none w-full max-w-full min-w-0">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id.toLowerCase()] ?? 0;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex min-h-[44px] items-center space-x-2 rounded-xl px-4 py-2 text-xs font-sora font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                isSelected
                  ? 'border-omx-brand bg-omx-brand/10 text-omx-brand font-bold shadow-sm'
                  : 'border-omx-border-strong/70 bg-omx-card text-omx-text-secondary hover:border-omx-border-strong hover:text-omx-text'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-xs ${
                  isSelected
                    ? 'bg-omx-brand text-white font-bold'
                    : 'bg-omx-elevated border border-omx-border text-omx-text-muted'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Sub-Bar: Market Count & Sorting Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-omx-text-secondary border-b border-omx-border/70 pb-3">
        <div className="font-mono font-medium">
          Showing <span className="font-bold text-omx-text">{filteredMarkets.length}</span> {filteredMarkets.length === 1 ? 'market' : 'markets'}
          {selectedCategory !== 'all' && (
            <span className="text-omx-text-muted"> in {CATEGORIES.find((c) => c.id === selectedCategory)?.name}</span>
          )}
        </div>

        {/* Bespoke Accessible Sort Popover */}
        <div ref={sortRef} className="relative flex items-center">
          {/* Synchronized select for full accessibility & test compatibility */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            aria-label="Sort markets"
            className="sr-only"
            tabIndex={-1}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            aria-haspopup="listbox"
            aria-expanded={isSortOpen}
            aria-label="Sort markets by"
            className="flex min-h-[44px] items-center space-x-2 rounded-xl border border-omx-border-strong/70 bg-omx-card px-3.5 py-2 text-xs font-sora font-semibold text-omx-text hover:border-omx-border-strong hover:bg-omx-elevated transition-all cursor-pointer shadow-sm"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-omx-text-muted shrink-0" />
            <span className="text-omx-text-secondary font-normal">Sort:</span>
            <span className="font-bold text-omx-text">{sortBy}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-omx-text-muted transition-transform duration-200 ${
                isSortOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isSortOpen && (
            <div
              role="listbox"
              aria-label="Sorting options"
              className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-omx-border-strong/70 bg-omx-card p-1.5 shadow-lg z-30 space-y-0.5 animate-in fade-in zoom-in-95 duration-100"
            >
              {SORT_OPTIONS.map((opt) => {
                const isSelected = sortBy === opt;
                return (
                  <button
                    key={opt}
                    role="option"
                    aria-selected={isSelected}
                    type="button"
                    onClick={() => {
                      setSortBy(opt);
                      setIsSortOpen(false);
                    }}
                    className={`flex w-full min-h-[38px] items-center justify-between rounded-lg px-3 py-2 text-xs font-sora transition-colors cursor-pointer text-left ${
                      isSelected
                        ? 'bg-omx-brand/10 font-bold text-omx-brand'
                        : 'text-omx-text-secondary hover:bg-omx-elevated hover:text-omx-text'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-omx-brand shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 4. Canonical Responsive Card Grid with Skeleton Morphing */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-[repeat(2,minmax(0,1fr))] xl:grid-cols-[repeat(3,minmax(0,1fr))] gap-6 min-w-0">
          {[1, 2, 3, 4, 5, 6].map((sk) => (
            <MarketCardSkeleton key={sk} />
          ))}
        </div>
      ) : filteredMarkets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-[repeat(2,minmax(0,1fr))] xl:grid-cols-[repeat(3,minmax(0,1fr))] gap-6 min-w-0">
          {filteredMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      ) : (
        /* 5. Zero-Results Recovery State */
        <div className="rounded-2xl border border-omx-border bg-omx-card p-12 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-omx-bg border border-omx-border text-omx-text-muted">
            <Search className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-sora text-base font-bold text-omx-text">
              No markets found
            </h3>
            <p className="text-xs text-omx-text-secondary max-w-sm mx-auto">
              We couldn't find any markets matching your current search or category criteria.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-omx-elevated border border-omx-border hover:border-omx-border-strong px-5 py-2.5 text-xs font-semibold text-omx-text hover:bg-omx-card transition-all cursor-pointer"
          >
            Clear Filters & View All
          </button>
        </div>
      )}
    </main>
  );
};
