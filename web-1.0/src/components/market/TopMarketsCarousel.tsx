import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Market } from '../../types';
import { MarketCard } from './MarketCard';
import { useRouter } from '../../context/RouterContext';

interface TopMarketsCarouselProps {
  markets: Market[];
}

export const TopMarketsCarousel: React.FC<TopMarketsCarouselProps> = ({ markets }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { navigate } = useRouter();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-omx-text flex items-center gap-2">
          <span>🔥</span>
          <span>Top Markets</span>
        </h2>
        <button
          onClick={() => navigate('/markets')}
          className="text-xs font-semibold text-[#f23064] hover:underline"
        >
          View All
        </button>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Scroll Left Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute -left-3.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-omx-card border border-omx-border shadow-omx-md flex items-center justify-center text-omx-text hover:bg-omx-hover transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 overflow-x-auto scrollbar-none py-1 px-0.5 scroll-smooth"
        >
          {markets.map((market) => (
            <div key={market.id} className="w-[300px] flex-shrink-0">
              <MarketCard market={market} />
            </div>
          ))}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-omx-card border border-omx-border shadow-omx-md flex items-center justify-center text-omx-text hover:bg-omx-hover transition-all opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
