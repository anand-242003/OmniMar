import React from 'react';
import { RoutePlaceholder } from '../components/common/RoutePlaceholder';

export const SocialPage: React.FC = () => {
  return (
    <RoutePlaceholder
      title="Social"
      path="/social"
      description="What predictors are saying, sentiment tags (BULLISH / BEARISH), and community discussions."
    />
  );
};
