import React from 'react';

/**
 * Skeleton loader for Leaderboard rows that smoothly morphs into real forecaster rankings.
 */
export const LeaderboardRowSkeleton: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-between p-4 border-b border-omx-border bg-omx-card/40 animate-pulse select-none gap-4"
    >
      <div className="flex items-center space-x-3.5 min-w-0">
        <div className="h-5 w-6 rounded bg-omx-border/80" />
        <div className="h-10 w-10 rounded-full bg-omx-border shrink-0" />
        <div className="space-y-1.5 min-w-0">
          <div className="h-4 w-32 rounded bg-omx-border" />
          <div className="h-3 w-20 rounded bg-omx-border/60" />
        </div>
      </div>

      <div className="hidden sm:flex items-center space-x-8">
        <div className="h-4 w-16 rounded bg-omx-border/70" />
        <div className="h-4 w-14 rounded bg-omx-border/70" />
        <div className="h-4 w-16 rounded bg-omx-border/70" />
      </div>

      <div className="h-5 w-20 rounded bg-omx-border font-mono shrink-0" />
    </div>
  );
};
