import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import type { Market } from '../../types/market';
import { useTheme } from '../../context/ThemeContext';

interface ProbabilityChartProps {
  market: Market;
}

type TimeRange = '1D' | '1W' | '1M' | 'ALL';

export const ProbabilityChart: React.FC<ProbabilityChartProps> = ({ market }) => {
  const [range, setRange] = useState<TimeRange>('1W');
  const { theme } = useTheme();

  const data = market.history[range] || market.history['1W'];
  const isDark = theme === 'dark';

  const strokeColor = isDark ? '#10b981' : '#059669'; // Emerald
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <div className="rounded-xl border border-omx-border bg-omx-card p-4 sm:p-5">
      {/* Chart Header: Title & Timeframe Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="text-xs font-medium text-omx-text-secondary uppercase tracking-wider">
            Consensus History
          </div>
          <div className="flex items-baseline space-x-2 mt-0.5">
            <span className="font-mono text-xl font-bold text-omx-text">
              {market.yesPrice}¢
            </span>
            <span className="font-mono text-xs font-semibold text-omx-yes">
              ~{market.impliedProbabilityYes}% Chance
            </span>
          </div>
        </div>

        {/* Timeframe Range Pills */}
        <div className="flex items-center space-x-1 rounded-lg border border-omx-border bg-omx-bg p-0.5 self-start sm:self-auto">
          {(['1D', '1W', '1M', 'ALL'] as TimeRange[]).map((t) => (
            <button
              key={t}
              onClick={() => setRange(t)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                range === t
                  ? 'bg-omx-card text-omx-text shadow-sm'
                  : 'text-omx-text-secondary hover:text-omx-text'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas (Recharts) */}
      <div className="h-[240px] sm:h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            {/* Subtle 1px dotted horizontal gridlines */}
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />

            {/* X-Axis */}
            <XAxis
              dataKey="displayTime"
              tick={{ fontSize: 11, fill: textColor, fontFamily: 'Geist Mono, monospace' }}
              axisLine={false}
              tickLine={false}
              dy={6}
            />

            {/* Explicit Y-Axis Units: Honest 0-100% Domain with 50% Toss-Up Baseline */}
            <YAxis
              domain={[0, 100]}
              ticks={[25, 50, 75]}
              tickFormatter={(val) => `${val}%`}
              tick={{ fontSize: 11, fill: textColor, fontFamily: 'Geist Mono, monospace' }}
              axisLine={false}
              tickLine={false}
              dx={-4}
            />

            {/* Custom Tooltip */}
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pt = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-omx-border-strong bg-omx-elevated p-2.5 shadow-omx-card text-xs">
                      <div className="font-mono text-omx-text-muted text-[11px] mb-1">
                        {pt.displayTime}
                      </div>
                      <div className="flex items-center justify-between gap-4 font-mono">
                        <span className="text-omx-yes font-bold">YES {pt.yesPrice}¢</span>
                        <span className="text-omx-text-secondary">{pt.probabilityYes}% prob</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 font-mono mt-0.5">
                        <span className="text-omx-no font-bold">NO {pt.noPrice}¢</span>
                        <span className="text-omx-text-secondary">{100 - pt.probabilityYes}% prob</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Pure, crisp line path (NO area gradients per M10.1 critique!) */}
            <Line
              type="monotone"
              dataKey="probabilityYes"
              stroke={strokeColor}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: strokeColor, strokeWidth: 2, stroke: isDark ? '#110a36' : '#ffffff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-omx-border pt-2 text-[11px] text-omx-text-muted">
        <span>Y-axis reflects implied consensus probability</span>
        <span>Updated 2 minutes ago</span>
      </div>
    </div>
  );
};
