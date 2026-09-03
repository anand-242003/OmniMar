import React from 'react';
import { RoutePlaceholder } from '../components/common/RoutePlaceholder';

export const SettingsPage: React.FC = () => {
  return (
    <RoutePlaceholder
      title="Settings"
      path="/settings"
      description="Account preferences, notification alerts, appearance theme, and linked security."
      isProtected={true}
    />
  );
};
