import React from 'react';

/**
 * Skeleton loader for MarketCard that smoothly morphs into real content.
 * Follows exact geometry and spacing of MarketCard.
 */
export const MarketCardSkeleton: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col justify-between rounded-xl border border-omx-border bg-omx-card p-5 shadow-omx-card min-w-0 overflow-hidden animate-pulse select-none"
    >
      {/* 1. Header Skeleton */}
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 w-28 rounded-md bg-omx-border" />
        <div className="h-3.5 w-20 rounded-md bg-omx-border/70" />
      </div>

      {/* 2. Title Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-5 w-full rounded-md bg-omx-border" />
        <div className="h-5 w-3/4 rounded-md bg-omx-border" />
      </div>

      {/* 3. Odds Bar Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-2.5 w-full rounded-full bg-omx-border/80" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 rounded bg-omx-border/60" />
          <div className="h-4 w-20 rounded bg-omx-border/60" />
        </div>
      </div>

      {/* 4. Action Buttons Skeleton */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="h-11 rounded-lg bg-omx-border/60" />
        <div className="h-11 rounded-lg bg-omx-border/60" />
      </div>

      {/* 5. Footer Skeleton */}
      <div className="border-t border-omx-border/70 pt-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="h-3.5 w-16 rounded bg-omx-border/70" />
          <div className="h-3.5 w-24 rounded bg-omx-border/60" />
        </div>
        <div className="h-3 w-4/5 rounded bg-omx-border/50" />
      </div>
    </div>
  );
};
