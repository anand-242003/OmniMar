import React, { useState } from 'react';
import { HomeHero } from '../components/home/HomeHero';
import { CategoryPills } from '../components/market/CategoryPills';
import { TopMarketsCarousel } from '../components/market/TopMarketsCarousel';
import { MarketMovers } from '../components/market/MarketMovers';
import { HomeValueProp } from '../components/home/HomeValueProp';
import { MARKETS } from '../data/markets';

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredMarkets = selectedCategory === 'all'
    ? MARKETS
    : MARKETS.filter(
        (m) => m.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  const topMarkets = filteredMarkets.filter((m) => m.isTopMarket !== false);
  const moversMarkets = filteredMarkets.filter((m) => m.isMovers !== false);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Hero Section */}
      <HomeHero />

      {/* 2. Category Filter Pills */}
      <div>
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* 3. Top Markets Carousel */}
      <TopMarketsCarousel markets={topMarkets.length > 0 ? topMarkets : filteredMarkets} />

      {/* 4. Market Movers Section */}
      <MarketMovers markets={moversMarkets.length > 0 ? moversMarkets : filteredMarkets} />

      {/* 5. Value Proposition 4-Column Banner */}
      <HomeValueProp />
    </div>
  );
};
