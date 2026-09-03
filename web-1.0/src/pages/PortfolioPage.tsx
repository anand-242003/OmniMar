import React from 'react';
import { RoutePlaceholder } from '../components/common/RoutePlaceholder';

export const PortfolioPage: React.FC = () => {
  return (
    <RoutePlaceholder
      title="Portfolio"
      path="/portfolio"
      description="Track your open prediction positions, share values, and unrealized profit & loss."
      isProtected={true}
    />
  );
};
