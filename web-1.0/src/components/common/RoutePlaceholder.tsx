import React from 'react';

interface RoutePlaceholderProps {
  title: string;
  path: string;
  description?: string;
  isProtected?: boolean;
}

export const RoutePlaceholder: React.FC<RoutePlaceholderProps> = ({
  title,
  path,
  description = 'Routing established in Milestone 1. Page surface implementation scheduled for subsequent milestone.',
  isProtected = false,
}) => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-150">
      {/* Page Title & Breadcrumb Shell */}
      <div>
        <div className="text-xs text-omx-text-muted font-medium mb-1 tracking-wide uppercase">
          {path} {isProtected && <span className="ml-1.5 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[10px] font-semibold border border-amber-500/20">Protected Surface</span>}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-omx-text">{title}</h1>
        <p className="text-sm text-omx-text-secondary mt-1">{description}</p>
      </div>

      {/* Skeleton / Layout Shell Box */}
      <div className="w-full rounded-omx-xl border border-omx-border bg-omx-card/60 p-8 sm:p-12 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-omx-lg bg-omx-muted flex items-center justify-center text-omx-text-muted mb-4 border border-omx-border">
          <span className="font-mono text-xs font-semibold">{path.slice(0, 3).toUpperCase()}</span>
        </div>
        <h3 className="text-base font-semibold text-omx-text">
          {title} Route Active
        </h3>
        <p className="text-xs text-omx-text-muted max-w-md mt-2">
          This surface is registered in the routing architecture. Full UI components, data fixtures, and interaction patterns will be loaded in the corresponding milestone.
        </p>
      </div>
    </div>
  );
};
