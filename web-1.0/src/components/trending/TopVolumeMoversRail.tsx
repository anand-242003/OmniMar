import React from 'react';
import type { Market } from '../../types';
import { useRouter } from '../../context/RouterContext';

interface TopVolumeMoversRailProps {
  markets: Market[];
}

export const TopVolumeMoversRail: React.FC<TopVolumeMoversRailProps> = ({ markets }) => {
  const { navigate } = useRouter();

  return (
    <div className="p-5 rounded-omx-xl bg-omx-card border border-omx-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-omx-text">Top Volume Movers</h3>
        <button
          onClick={() => navigate('/markets')}
          className="text-xs font-semibold text-[#f23064] hover:underline"
        >
          View all
        </button>
      </div>

      <div className="space-y-3.5">
        {markets.slice(0, 5).map((market) => (
          <div
            key={market.id}
            onClick={() => navigate(`/markets/${market.id}`)}
            className="flex items-center justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
                {market.title.slice(0, 1)}
              </div>
              <p className="text-xs font-medium text-omx-text group-hover:text-[#f23064] transition-colors line-clamp-2 leading-tight">
                {market.title}
              </p>
            </div>
            <span className="text-xs font-bold font-mono text-emerald-500 flex-shrink-0">
              {market.probability}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
