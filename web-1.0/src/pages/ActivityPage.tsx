import React from 'react';
import { RoutePlaceholder } from '../components/common/RoutePlaceholder';

export const ActivityPage: React.FC = () => {
  return (
    <RoutePlaceholder
      title="Activity"
      path="/activity"
      description="Trading activity log, order fills, and market resolution history."
      isProtected={true}
    />
  );
};
