import React from 'react';
import { RoutePlaceholder } from '../components/common/RoutePlaceholder';

export const WalletPage: React.FC = () => {
  return (
    <RoutePlaceholder
      title="Wallet"
      path="/wallet"
      description="Manage your USDC balances (Real & Demo), deposits, withdrawals, and transaction history."
      isProtected={true}
    />
  );
};
