import React, { useState } from 'react';
import { Wallet, PlusCircle, RotateCcw, ArrowRight, ShieldCheck, CheckCircle2, FileText, Info, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useTrade } from '../context/TradeContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { AuthGate } from '../components/common/AuthGate';

export const WalletPage: React.FC = () => {
  const { accountMode, balance, trades, topUpFaucet, resetDemoBalance, depositRealFunds, withdrawRealFunds } = useTrade();
  const { user, isAuthenticated } = useAuth();
  const { navigate } = useRouter();

  const [notification, setNotification] = useState<string | null>(null);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('250.00');
  const [withdrawAmount, setWithdrawAmount] = useState('100.00');
  const [withdrawAddress, setWithdrawAddress] = useState('0x71C...b489');

  const handleTopUp = () => {
    topUpFaucet(1000);
    setNotification('Added $1,000.00 virtual USDC faucet funds to your demo treasury.');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleReset = () => {
    resetDemoBalance();
    setNotification('Reset demo balance to default $10,000.00 virtual USDC.');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(depositAmount);
    if (amt > 0) {
      depositRealFunds(amt);
      setShowDepositModal(false);
      setNotification(`Successfully deposited $${amt.toFixed(2)} USDC into your real wallet.`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(withdrawAmount);
    if (amt > 0 && amt <= balance) {
      const res = withdrawRealFunds(amt);
      if (res.success) {
        setShowWithdrawModal(false);
        setNotification(`Successfully initiated withdrawal of $${amt.toFixed(2)} USDC to ${withdrawAddress}.`);
        setTimeout(() => setNotification(null), 4000);
      }
    }
  };

  // Real Mode Auth Gate
  if (accountMode === 'real' && !isAuthenticated) {
    return (
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full space-y-8 min-w-0">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Wallet className="h-4 w-4" />
            </div>
            <h1 className="font-sora text-2xl sm:text-3xl font-extrabold tracking-tight text-omx-text">
              Real Treasury & Custody Wallet
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-omx-text-secondary">
            Deposit USDC, manage verified bank withdrawals, and review regulatory settlement receipts.
          </p>
        </div>

        <AuthGate
          variant="page"
          pageTitle="Real Money Treasury"
          pageDescription="Sign in or register to manage your real USDC balance, verify KYC credentials, make instant deposits, and withdraw directly to your wallet or bank account."
        />
      </main>
    );
  }

  const isDemo = accountMode === 'demo';

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full space-y-8 min-w-0">
      {/* 1. Header */}
      <div className="space-y-1.5 min-w-0">
        <div className="flex items-center space-x-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            isDemo ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'
          }`}>
            <Wallet className="h-4 w-4" />
          </div>
          <h1 className="font-sora text-2xl sm:text-3xl font-extrabold tracking-tight text-omx-text">
            {isDemo ? 'Demo Treasury & Practice Capital' : 'Real Money Treasury & Custody'}
          </h1>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold ${
            isDemo 
              ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' 
              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
          }`}>
            {isDemo ? 'Virtual Sandbox' : 'Verified Real Capital'}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-omx-text-secondary">
          {isDemo
            ? 'Virtual USDC liquidity management, transaction receipts, and practice faucet mechanics.'
            : 'Institutional-grade USDC custody, real-capital deposits, instant withdrawals, and regulatory compliance.'}
        </p>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs font-sora font-medium text-emerald-800 dark:text-emerald-300 flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* KYC / Compliance Strip for Real Mode */}
      {!isDemo && user && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
            <div>
              <span className="font-sora font-bold text-omx-text block">Identity & Compliance: Tier 2 Verified</span>
              <span className="text-omx-text-secondary">
                Account authenticated via {user.email || user.name} · Direct USDC Polygon & Arbitrum rails active
              </span>
            </div>
          </div>
          <span className="self-start sm:self-auto rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
            KYC VERIFIED
          </span>
        </div>
      )}

      {/* 2. Primary Balance Hero */}
      <section
        aria-label={isDemo ? 'Demo Treasury Hero' : 'Real Treasury Hero'}
        className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 ${
          isDemo ? 'border-indigo-500/30 bg-omx-card' : 'border-emerald-500/30 bg-omx-card'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 min-w-0">
            <div className="flex items-center space-x-2">
              <span className={`h-2.5 w-2.5 rounded-full animate-pulse ${isDemo ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
              <span className={`text-xs font-sora font-bold uppercase tracking-wider ${
                isDemo ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-400'
              }`}>
                {isDemo ? 'Virtual Practice Treasury' : 'Liquid Real USDC Balance'}
              </span>
            </div>
            <div className="font-mono text-3xl sm:text-5xl font-black text-omx-text tracking-tight">
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-base sm:text-lg font-bold text-omx-text-muted ml-2">
                {isDemo ? 'Demo USDC' : 'USDC'}
              </span>
            </div>
            <p className="text-xs text-omx-text-secondary">
              {isDemo
                ? 'Zero financial liability. All orders execute in a mathematically calibrated sandbox engine.'
                : '1:1 USD-backed stablecoin reserves. Protected by smart contract vaults and bank-grade custody.'}
            </p>
          </div>

          {/* Mode Actions */}
          {isDemo ? (
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleTopUp}
                className="flex min-h-[44px] items-center space-x-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-sora font-bold text-white hover:bg-indigo-500 transition-colors cursor-pointer shadow-sm ring-1 ring-indigo-500/50"
              >
                <PlusCircle className="h-4 w-4" />
                <span>+$1,000.00 Faucet</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex min-h-[44px] items-center space-x-2 rounded-xl border border-omx-border bg-omx-bg px-4 py-2 text-xs font-sora font-semibold text-omx-text hover:border-omx-border-strong transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5 text-omx-text-muted" />
                <span>Reset to $10K</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/portfolio')}
                className="flex min-h-[44px] items-center space-x-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-sora font-bold text-indigo-700 dark:text-indigo-400 hover:bg-indigo-500/20 transition-colors cursor-pointer"
              >
                <span>View Portfolio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowDepositModal(true)}
                className="flex min-h-[44px] items-center space-x-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-sora font-bold text-white hover:bg-emerald-500 transition-colors cursor-pointer shadow-sm ring-1 ring-emerald-500/50"
              >
                <ArrowDownLeft className="h-4 w-4" />
                <span>Deposit USDC</span>
              </button>

              <button
                type="button"
                onClick={() => setShowWithdrawModal(true)}
                className="flex min-h-[44px] items-center space-x-2 rounded-xl border border-omx-border bg-omx-bg px-4 py-2 text-xs font-sora font-semibold text-omx-text hover:border-omx-border-strong transition-colors cursor-pointer"
              >
                <ArrowUpRight className="h-4 w-4 text-omx-text-muted" />
                <span>Withdraw</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/portfolio')}
                className="flex min-h-[44px] items-center space-x-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-sora font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer"
              >
                <span>View Portfolio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Mathematical Redemption Logic */}
      <section aria-label="Settlement mechanics" className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-4 w-4 text-omx-brand" />
          <h2 className="font-sora font-bold text-sm text-omx-text">
            Contract Settlement Architecture ($1.00 Rule)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
          <div className="rounded-xl border border-omx-border bg-omx-bg p-4 space-y-2">
            <span className="font-sora font-bold text-omx-text block">1. Entry Price</span>
            <p className="text-omx-text-secondary leading-relaxed">
              When you buy YES at 65¢, you pay $0.65 per contract. The market probability directly corresponds to current consensus (65%).
            </p>
          </div>

          <div className="rounded-xl border border-omx-border bg-omx-bg p-4 space-y-2">
            <span className="font-sora font-bold text-omx-text block">2. Early Cash Out</span>
            <p className="text-omx-text-secondary leading-relaxed">
              If the probability shifts to 80¢ before the event concludes, you can liquidate your position early to lock in a +15¢ per share gain.
            </p>
          </div>

          <div className="rounded-xl border border-omx-border bg-omx-bg p-4 space-y-2">
            <span className="font-sora font-bold text-omx-text block">3. Final Resolution</span>
            <p className="text-omx-text-secondary leading-relaxed">
              When the resolution source confirms the outcome, every winning contract pays exactly $1.00. Losing contracts expire at $0.00.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Transaction Receipts Ledger */}
      <section aria-label="Simulated transaction ledger" className="space-y-4 w-full min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-omx-text-muted" />
            <h2 className="font-sora font-bold text-base text-omx-text">
              {isDemo ? 'Demo Transaction Receipts' : 'Verified Settlement Ledger'} ({trades.length})
            </h2>
          </div>
        </div>

        {trades.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-omx-border-strong/70 bg-omx-card p-8 text-center space-y-2">
            <Info className="h-5 w-5 text-omx-text-muted mx-auto" />
            <p className="font-sora font-semibold text-xs text-omx-text">No Transactions Yet</p>
            <p className="text-xs text-omx-text-secondary max-w-sm mx-auto">
              {isDemo
                ? 'Simulated orders and cash out receipts will appear in this demo ledger.'
                : 'Verified real deposits, withdrawals, and contract settlements will appear here.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-omx-border-strong/70 bg-omx-card shadow-sm scrollbar-none">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-omx-border bg-omx-bg/60 text-[11px] font-sora font-semibold text-omx-text-muted uppercase tracking-wider">
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Market / Item</th>
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4 text-right">Price</th>
                  <th className="py-3.5 px-4 text-right">Stake / Value</th>
                  <th className="py-3.5 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-omx-border/60 text-xs">
                {trades.map((t) => (
                  <tr key={t.id} className="hover:bg-omx-hover transition-colors">
                    <td className={`py-3.5 px-4 font-mono font-bold ${isDemo ? 'text-indigo-400' : 'text-emerald-400'}`}>
                      {t.orderNumber}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-omx-text">
                      {t.marketQuestion}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-sora font-bold ${
                          t.action === 'BUY'
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                            : 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400'
                        }`}
                      >
                        {t.action} {t.outcome}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-omx-text">
                      {t.priceCents}¢
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-omx-text">
                      ${t.stakeUsdc.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right text-omx-text-muted text-[11px]">
                      {new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Quick Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-omx-border bg-omx-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-500">
                <ArrowDownLeft className="h-5 w-5" />
                <h3 className="font-sora font-bold text-base text-omx-text">Deposit Real USDC</h3>
              </div>
              <button
                onClick={() => setShowDepositModal(false)}
                className="text-omx-text-muted hover:text-omx-text text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-omx-text-secondary">
              Add verified funds to your real trading balance via instant ACH, debit card, or crypto wallet.
            </p>
            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-omx-text-secondary block mb-1">
                  Deposit Amount (USDC)
                </label>
                <div className="relative rounded-xl border border-omx-border bg-omx-bg">
                  <span className="absolute left-3 top-2.5 font-mono text-base font-bold text-omx-text-secondary">$</span>
                  <input
                    type="text"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full rounded-xl bg-transparent py-2.5 pl-8 pr-4 font-mono text-base font-bold text-omx-text focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[50, 100, 250, 500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDepositAmount(amt.toFixed(2))}
                      className="rounded-lg border border-omx-border bg-omx-bg py-1 text-xs font-mono font-semibold text-omx-text hover:border-emerald-500 cursor-pointer"
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-[11px] text-emerald-600 dark:text-emerald-400 space-y-1">
                <div className="flex items-center space-x-1.5 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Instant Availability · Zero Fee Protocol</span>
                </div>
                <p className="text-omx-text-muted">USDC deposited is immediately available for real predictions.</p>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDepositModal(false)}
                  className="flex-1 rounded-xl border border-omx-border py-2.5 text-xs font-semibold text-omx-text hover:bg-omx-hover cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-sora font-bold text-white transition-colors cursor-pointer shadow-sm"
                >
                  Confirm Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-omx-border bg-omx-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-omx-brand">
                <ArrowUpRight className="h-5 w-5" />
                <h3 className="font-sora font-bold text-base text-omx-text">Withdraw USDC</h3>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-omx-text-muted hover:text-omx-text text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-omx-text-secondary">
              Transfer your verified USDC profits back to your connected Web3 address or bank account.
            </p>
            <form onSubmit={handleWithdraw} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-omx-text-secondary block mb-1">
                  Withdrawal Amount (Available: ${balance.toFixed(2)} USDC)
                </label>
                <div className="relative rounded-xl border border-omx-border bg-omx-bg">
                  <span className="absolute left-3 top-2.5 font-mono text-base font-bold text-omx-text-secondary">$</span>
                  <input
                    type="text"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full rounded-xl bg-transparent py-2.5 pl-8 pr-4 font-mono text-base font-bold text-omx-text focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-omx-text-secondary block mb-1">
                  Destination Address
                </label>
                <input
                  type="text"
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  className="w-full rounded-xl border border-omx-border bg-omx-bg py-2.5 px-3 font-mono text-xs text-omx-text focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 rounded-xl border border-omx-border py-2.5 text-xs font-semibold text-omx-text hover:bg-omx-hover cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={parseFloat(withdrawAmount) > balance || parseFloat(withdrawAmount) <= 0}
                  className="flex-1 rounded-xl bg-omx-brand hover:bg-omx-brand-hover disabled:opacity-50 py-2.5 text-xs font-sora font-bold text-white transition-colors cursor-pointer shadow-sm"
                >
                  Confirm Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
