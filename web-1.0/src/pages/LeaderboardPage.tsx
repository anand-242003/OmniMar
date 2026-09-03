import React from 'react';
import { RoutePlaceholder } from '../components/common/RoutePlaceholder';

export const LeaderboardPage: React.FC = () => {
  return (
    <RoutePlaceholder
      title="Leaderboard"
      path="/leaderboard"
      description="Compete with top predictors on OmniMarketX for monthly reward pools ($250,000)."
    />
  );
};
