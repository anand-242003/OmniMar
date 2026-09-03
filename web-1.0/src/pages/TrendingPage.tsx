import React from 'react';
import { RoutePlaceholder } from '../components/common/RoutePlaceholder';

export const TrendingPage: React.FC = () => {
  return (
    <RoutePlaceholder
      title="Trending"
      path="/trending"
      description="Real-time ranking of the most active markets and platform volatility meter."
    />
  );
};
