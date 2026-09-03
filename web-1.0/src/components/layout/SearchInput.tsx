import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { MARKETS, SEARCH_POSTS } from '../../data/markets';
import { useRouter } from '../../context/RouterContext';

export const SearchInput: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigate } = useRouter();

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredMarkets = query.trim()
    ? MARKETS.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredPosts = query.trim()
    ? SEARCH_POSTS.filter(
        (p) =>
          p.marketTitle.toLowerCase().includes(query.toLowerCase()) ||
          p.authorName.toLowerCase().includes(query.toLowerCase()) ||
          p.snippet.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectMarket = (id: string) => {
    navigate(`/markets/${id}`);
    setIsOpen(false);
    setQuery('');
  };

  const hasResults = filteredMarkets.length > 0 || filteredPosts.length > 0;

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3.5 w-4 h-4 text-omx-text-muted pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder="Search markets, events, users"
          className="w-full pl-10 pr-10 py-2 bg-omx-muted/80 hover:bg-omx-muted focus:bg-omx-card text-omx-text placeholder:text-omx-text-muted text-sm rounded-omx-md border border-omx-border focus:border-[#f23064]/60 focus:ring-1 focus:ring-[#f23064]/40 outline-none transition-all"
        />

        {query ? (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 p-0.5 rounded text-omx-text-muted hover:text-omx-text transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <div className="absolute right-3 px-1.5 py-0.5 rounded border border-omx-border bg-omx-card/60 text-[11px] font-mono text-omx-text-muted pointer-events-none">
            /
          </div>
        )}
      </div>

      {/* Autocomplete Dropdown matching search_results_1788425481871.png */}
      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 mt-1.5 w-full bg-omx-card/95 backdrop-blur-md border border-omx-border rounded-omx-xl shadow-omx-lg py-2 z-50 max-h-[420px] overflow-y-auto">
          {hasResults ? (
            <>
              {/* Markets Section */}
              {filteredMarkets.length > 0 && (
                <div>
                  <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-omx-text-muted">
                    Markets
                  </div>
                  {filteredMarkets.slice(0, 4).map((market) => (
                    <div
                      key={market.id}
                      onClick={() => handleSelectMarket(market.id)}
                      className="px-3.5 py-2.5 flex items-center gap-3 hover:bg-omx-hover cursor-pointer transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-omx-muted border border-omx-border flex items-center justify-center text-sm flex-shrink-0">
                        {market.categoryIcon || '📊'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-omx-text group-hover:text-[#f23064] transition-colors line-clamp-1">
                          {market.title}
                        </p>
                        <p className="text-[11px] text-omx-text-muted flex items-center gap-1 mt-0.5">
                          <span>{market.categoryIcon}</span>
                          <span>{market.category}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Posts Section */}
              {filteredPosts.length > 0 && (
                <div className="border-t border-omx-border mt-2 pt-2">
                  <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-omx-text-muted">
                    Posts
                  </div>
                  {filteredPosts.slice(0, 4).map((post) => (
                    <div
                      key={post.id}
                      onClick={() => {
                        setIsOpen(false);
                        navigate('/social');
                      }}
                      className="px-3.5 py-2.5 flex items-start gap-3 hover:bg-omx-hover cursor-pointer transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-purple-600/30 text-purple-400 border border-purple-500/20 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                        {post.authorInitials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-omx-text">
                          {post.authorName}
                        </p>
                        <p className="text-[11px] text-omx-text-secondary line-clamp-2 mt-0.5 leading-snug">
                          {post.snippet}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="px-4 py-6 text-center text-xs text-omx-text-muted">
              No markets or posts matching "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};
