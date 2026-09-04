import React from 'react';

/**
 * Skeleton loader for Social post theses that smoothly morphs into real community analyses.
 */
export const SocialFeedSkeleton: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="rounded-2xl border border-omx-border-strong/70 bg-omx-card p-5 shadow-sm space-y-4 animate-pulse select-none"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-omx-border shrink-0" />
          <div className="space-y-1.5">
            <div className="h-4 w-32 rounded bg-omx-border" />
            <div className="h-3 w-20 rounded bg-omx-border/60" />
          </div>
        </div>
        <div className="h-5 w-16 rounded-full bg-omx-border/60" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-omx-border" />
        <div className="h-4 w-5/6 rounded bg-omx-border" />
      </div>

      <div className="rounded-xl border border-omx-border bg-omx-bg p-3.5 space-y-2">
        <div className="h-3 w-28 rounded bg-omx-border/70" />
        <div className="h-4 w-3/4 rounded bg-omx-border" />
      </div>

      <div className="flex items-center space-x-6 pt-1">
        <div className="h-4 w-12 rounded bg-omx-border/60" />
        <div className="h-4 w-12 rounded bg-omx-border/60" />
      </div>
    </div>
  );
};
