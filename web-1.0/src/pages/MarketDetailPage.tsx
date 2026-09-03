import React from 'react';
import { useRouter } from '../context/RouterContext';
import { RoutePlaceholder } from '../components/common/RoutePlaceholder';

export const MarketDetailPage: React.FC = () => {
  const { marketId } = useRouter();

  return (
    <RoutePlaceholder
      title={`Market Detail: ${marketId || 'Selected Market'}`}
      path={`/markets/${marketId || ':id'}`}
      description="Interactive price history chart, resolution details, and Trade Order Slip."
    />
  );
};
