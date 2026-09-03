import React from 'react';

export const LiveMarketPulse: React.FC = () => {
  return (
    <div className="p-5 rounded-omx-xl bg-omx-card border border-omx-border">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-omx-text-muted mb-2">
        Live Market Pulse
      </div>

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold text-emerald-500">Low Volatility</h3>
        <div className="w-14 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
          <div className="w-3 h-full bg-emerald-500 rounded-full" />
        </div>
      </div>

      <p className="text-xs text-omx-text-secondary leading-relaxed mb-6">
        Markets are calm right now. No unusual activity detected.
      </p>

      {/* Semi-circular gauge */}
      <div className="relative flex flex-col items-center justify-center pt-2">
        <svg viewBox="0 0 200 105" className="w-48 overflow-visible">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="var(--color-omx-border)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Active arc: 0/100, so minimal accent */}
          <path
            d="M 20 100 A 80 80 0 0 1 30 92"
            fill="none"
            stroke="#10b981"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute bottom-2 flex items-baseline gap-1">
          <span className="text-3xl font-extrabold font-mono text-omx-text">0</span>
          <span className="text-xs font-mono text-omx-text-muted">/100</span>
        </div>
      </div>
    </div>
  );
};
