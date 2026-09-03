import React from 'react';
import { RoutePlaceholder } from '../components/common/RoutePlaceholder';

export const HomePage: React.FC = () => {
  return (
    <RoutePlaceholder
      title="Home"
      path="/home"
      description="The World’s Leading Social Prediction Market.™ — Trade What Matters."
    />
  );
};
