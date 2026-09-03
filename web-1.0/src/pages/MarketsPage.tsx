import React from 'react';
import { RoutePlaceholder } from '../components/common/RoutePlaceholder';

export const MarketsPage: React.FC = () => {
  return (
    <RoutePlaceholder
      title="Markets"
      path="/markets"
      description="Explore all prediction markets. Trade on what you know."
    />
  );
};
