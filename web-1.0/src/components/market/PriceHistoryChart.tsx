import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import type { Market } from '../../types';

interface PriceHistoryChartProps {
  market: Market;
}

type TimeFrame = '1D' | '1W' | '1M' | 'ALL';

interface ChartPoint {
  time: string;
  yes: number;
  no: number;
}

export const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ market }) => {
  const [timeframe, setTimeframe] = useState<TimeFrame>('1W');

  // Generate deterministic chart points based on market ID, base probability, and timeframe
  const data = useMemo<ChartPoint[]>(() => {
    const baseProb = market.probability;
    const delta = market.delta;

    if (timeframe === '1D') {
      const hours = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'];
      return hours.map((hour, idx) => {
        const factor = idx / (hours.length - 1);
        const shift = delta * factor;
        const yesVal = Math.round(baseProb - delta + shift);
        return {
          time: hour,
          yes: yesVal,
          no: 100 - yesVal,
        };
      });
    }

    if (timeframe === '1W') {
      const days = ['Aug 21', 'Aug 22', 'Aug 23', 'Aug 24', 'Aug 25', 'Aug 26', 'Aug 27'];
      return days.map((day, idx) => {
        // Deterministic variation using sparkline data if available
        const sparkIdx = Math.min(idx, market.sparkline.length - 1);
        const sparkVal = market.sparkline[sparkIdx] || baseProb;
        return {
          time: day,
          yes: sparkVal,
          no: +(100 - sparkVal).toFixed(1),
        };
      });
    }

    if (timeframe === '1M') {
      const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      return weeks.map((week, idx) => {
        const factor = (idx - 1.5) * 0.5;
        const yesVal = +(baseProb + factor).toFixed(1);
        return {
          time: week,
          yes: yesVal,
          no: +(100 - yesVal).toFixed(1),
        };
      });
    }

    // 'ALL'
    const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep'];
    return months.map((month, idx) => {
      const factor = (idx - 2) * 0.2;
      const yesVal = +(baseProb + factor).toFixed(1);
      return {
        time: month,
        yes: yesVal,
        no: +(100 - yesVal).toFixed(1),
      };
    });
  }, [market.id, market.probability, market.delta, market.sparkline, timeframe]);

  // Determine Y-axis domain boundaries cleanly around data
  const yValues = data.flatMap((d) => [d.yes, d.no]);
  const minVal = Math.max(0, Math.floor(Math.min(...yValues) - 2));
  const maxVal = Math.min(100, Math.ceil(Math.max(...yValues) + 2));

  const timeframes: TimeFrame[] = ['1D', '1W', '1M', 'ALL'];

  return (
    <div className="p-4 sm:p-5 rounded-omx-xl bg-omx-card border border-omx-border space-y-4">
      {/* Header: Title, Legend, and Timeframe controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-omx-text">Price History</h2>
          <div className="flex items-center gap-3 mt-1 text-xs">
            <span className="flex items-center gap-1.5 text-omx-text-secondary font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              YES
            </span>
            <span className="flex items-center gap-1.5 text-omx-text-secondary font-medium">
              <span className="w-2 h-2 rounded-full bg-[#f23064] inline-block" />
              NO
            </span>
          </div>
        </div>

        {/* Timeframe Buttons */}
        <div className="flex items-center gap-1 bg-omx-muted/60 p-0.5 rounded-omx-md border border-omx-border self-start sm:self-auto">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 text-xs font-bold rounded-omx-sm transition-all ${
                timeframe === tf
                  ? 'bg-[#f23064] text-white shadow-sm'
                  : 'text-omx-text-secondary hover:text-omx-text hover:bg-omx-hover'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 5, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255, 255, 255, 0.07)"
            />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8b8b9e', fontSize: 11 }}
            />
            <YAxis
              domain={[minVal, maxVal]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8b8b9e', fontSize: 11 }}
              tickFormatter={(val) => `${val}%`}
              width={42}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-2.5 rounded-omx-md bg-omx-card border border-omx-border shadow-xl text-xs space-y-1 z-50">
                      <div className="font-mono text-omx-text-muted text-[10px]">
                        {payload[0].payload.time}
                      </div>
                      <div className="flex items-center justify-between gap-3 text-emerald-500 font-mono font-bold">
                        <span>YES:</span>
                        <span>{payload[0].value}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-[#f23064] font-mono font-bold">
                        <span>NO:</span>
                        <span>{payload[1]?.value}%</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="yes"
              stroke="#00d26a"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#00d26a' }}
            />
            <Line
              type="monotone"
              dataKey="no"
              stroke="#f23064"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#f23064' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
