import React, { useState } from 'react';
import {
  Wallet as WalletIcon,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrade } from '../context/TradeContext';
import { useRouter } from '../context/RouterContext';
import { ProtectedShield } from '../components/common/ProtectedShield';

export const WalletPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { balance, trades } = useTrade();
  const { navigate } = useRouter();
  const [selectedWalletTab, setSelectedWalletTab] = useState<'demo' | 'real'>('demo');
  const [showRealModal, setShowRealModal] = useState(false);

  if (!isAuthenticated) {
    return <ProtectedShield route="wallet" />;
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-150 pb-12">
      {/* Breadcrumbs & Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-omx-text-muted mb-1.5 font-medium">
          <span
            onClick={() => navigate('/home')}
            className="hover:text-omx-text cursor-pointer transition-colors"
          >
            Home
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-omx-text font-semibold">Wallet</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-omx-text">Wallet</h1>
            <p className="text-sm text-omx-text-secondary mt-1">
              Manage your USDC balances (Real & Demo) and view transaction history.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Simulated Privy Vault
            </span>
          </div>
        </div>
      </div>

      {/* Real / Demo Toggle Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-omx-lg bg-omx-muted border border-omx-border w-fit">
        <button
          onClick={() => setSelectedWalletTab('demo')}
          className={`px-4 py-2 rounded-omx-md text-xs font-bold transition-all ${
            selectedWalletTab === 'demo'
              ? 'bg-[#f23064] text-white shadow-sm'
              : 'text-omx-text-secondary hover:text-omx-text'
          }`}
        >
          Demo Balance (Active)
        </button>
        <button
          onClick={() => setSelectedWalletTab('real')}
          className={`px-4 py-2 rounded-omx-md text-xs font-bold transition-all ${
            selectedWalletTab === 'real'
              ? 'bg-omx-card text-omx-text shadow-sm border border-omx-border'
              : 'text-omx-text-secondary hover:text-omx-text'
          }`}
        >
          Real Balance (Sandbox)
        </button>
      </div>

      {/* Active Balance Card View */}
      {selectedWalletTab === 'demo' ? (
        <div className="rounded-omx-xl border border-omx-border bg-omx-card p-6 shadow-sm space-y-6">
          {/* Top Banner Notice */}
          <div className="p-3.5 rounded-omx-md bg-gradient-to-r from-[#f23064]/10 via-[#ff6b1a]/10 to-transparent border border-[#f23064]/20 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-omx-text">
              <span className="text-base">🎮</span>
              <span>
                <strong>DEMO TRADING MODE</strong> — Trading with 10,000 USDC in virtual funds, not real money.
              </span>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-omx-yes/10 text-omx-yes border border-omx-yes/20">
              No Real Risk
            </span>
          </div>

          {/* Balance Display */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
            <div>
              <span className="text-xs font-semibold text-omx-text-muted uppercase tracking-wider block mb-1">
                Virtual Available Cash
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-omx-text font-mono tracking-tight">
                  ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-sm font-semibold text-omx-text-muted">USDC</span>
              </div>
              <p className="text-xs text-omx-text-secondary mt-1">
                Virtual funds for practice trading and market forecasting.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/markets')}
                className="px-5 py-2.5 rounded-omx-md text-sm font-semibold text-white bg-gradient-to-r from-[#f23064] via-[#ff4f55] to-[#ff6b1a] hover:opacity-95 active:scale-[0.98] transition-all shadow-sm"
              >
                Trade Markets
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-omx-xl border border-omx-border bg-omx-card p-6 shadow-sm space-y-6">
          {/* Real Money Safe Guard Notice */}
          <div className="p-3.5 rounded-omx-md bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-500">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <strong>SAFE RECONSTRUCTION ENVIRONMENT:</strong> Real-money payment gateways (Stripe, MoonPay,
              Coinbase On-Ramp) and external Web3 wallet transfers are non-operational in web-1.0. All transactions
              must be executed using Demo virtual funds.
            </div>
          </div>

          {/* Balance Display */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
            <div>
              <span className="text-xs font-semibold text-omx-text-muted uppercase tracking-wider block mb-1">
                Real Available Cash
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-omx-text-muted font-mono tracking-tight">
                  $0.00
                </span>
                <span className="text-sm font-semibold text-omx-text-muted">USDC</span>
              </div>
              <p className="text-xs text-omx-text-muted mt-1">
                Real fiat on-ramp disabled per reconstruction safety boundaries.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowRealModal(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-omx-md text-xs font-semibold border border-omx-border bg-omx-muted hover:bg-omx-hover text-omx-text transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-omx-text-muted" />
                Deposit Funds
              </button>
              <button
                onClick={() => setShowRealModal(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-omx-md text-xs font-semibold border border-omx-border bg-omx-muted hover:bg-omx-hover text-omx-text transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-omx-text-muted" />
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction History Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-omx-text">Transaction History</h3>
          <span className="text-xs text-omx-text-muted">
            {trades.length} {trades.length === 1 ? 'record' : 'records'}
          </span>
        </div>

        {trades.length === 0 ? (
          <div className="w-full rounded-omx-xl border border-omx-border bg-omx-card p-10 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-omx-muted flex items-center justify-center text-omx-text-muted mb-3 border border-omx-border">
              <WalletIcon className="w-5 h-5 text-omx-text-muted" />
            </div>
            <h4 className="text-sm font-bold text-omx-text">No wallet transactions yet</h4>
            <p className="text-xs text-omx-text-secondary max-w-sm mt-1">
              Your trade executions and virtual fund movements will appear in this audit log.
            </p>
          </div>
        ) : (
          <div className="rounded-omx-xl border border-omx-border bg-omx-card overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-omx-muted/50 border-b border-omx-border text-omx-text-muted uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Transaction / Market</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4 text-right">Shares</th>
                    <th className="py-3 px-4 text-right">Price</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-omx-border">
                  {trades.map((trade) => {
                    const formattedDate = new Date(trade.timestamp).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <tr key={trade.id} className="hover:bg-omx-hover/60 transition-colors">
                        {/* Transaction ID & Market */}
                        <td className="py-3 px-4 max-w-[280px]">
                          <div
                            onClick={() => navigate(`/markets/${trade.marketId}`)}
                            className="cursor-pointer group"
                          >
                            <span className="font-semibold text-omx-text group-hover:text-[#f23064] transition-colors truncate block">
                              {trade.marketTitle}
                            </span>
                            <span className="text-[10px] text-omx-text-muted font-mono">
                              #tr_{trade.id.slice(0, 8)}
                            </span>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold font-mono border ${
                              trade.outcome === 'YES'
                                ? 'bg-emerald-500/10 text-omx-yes border-emerald-500/20'
                                : 'bg-rose-500/10 text-omx-no border-rose-500/20'
                            }`}
                          >
                            {trade.action} {trade.outcome}
                          </span>
                        </td>

                        {/* Shares */}
                        <td className="py-3 px-4 text-right font-mono font-medium text-omx-text whitespace-nowrap">
                          {trade.shares.toFixed(2)}
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4 text-right font-mono text-omx-text-secondary whitespace-nowrap">
                          {trade.price}¢
                        </td>

                        {/* Amount */}
                        <td className="py-3 px-4 text-right font-mono font-bold whitespace-nowrap">
                          <span className={trade.action === 'BUY' ? 'text-omx-text' : 'text-omx-yes'}>
                            {trade.action === 'BUY' ? '-' : '+'}${trade.amount.toFixed(2)} USDC
                          </span>
                        </td>

                        {/* Timestamp */}
                        <td className="py-3 px-4 text-omx-text-muted whitespace-nowrap font-mono text-[11px]">
                          {formattedDate}
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-omx-yes border border-emerald-500/20">
                            Completed
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Safe Modal for Real Money Notice */}
      {showRealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowRealModal(false)}
          />
          <div className="relative w-full max-w-md bg-omx-card border border-omx-border rounded-omx-xl p-6 shadow-omx-lg z-10 space-y-4">
            <div className="flex items-center gap-3 text-amber-500">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-base font-bold text-omx-text">Real Money On-Ramp Safe Mode</h3>
            </div>
            <p className="text-xs text-omx-text-secondary leading-relaxed">
              Per OmniMarketX reconstruction boundaries, real-money transactions (MoonPay, Stripe, Coinbase, and real
              crypto deposits/withdrawals) are strictly disabled to prevent accidental financial operations.
            </p>
            <p className="text-xs text-omx-text-muted">
              Please use the Demo environment with your 10,000 USDC virtual balance.
            </p>
            <button
              onClick={() => setShowRealModal(false)}
              className="w-full py-2.5 rounded-omx-md text-xs font-semibold bg-omx-muted hover:bg-omx-hover text-omx-text border border-omx-border transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
