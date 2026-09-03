import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value?: string;
  onChange?: (val: string) => void;
  onFocus?: () => void;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value = '',
  onChange,
  onFocus,
  className = '',
}) => {
  return (
    <div className={`relative flex items-center w-full max-w-md ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-omx-text-muted pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        placeholder="Search markets, events, users"
        className="w-full pl-10 pr-9 py-2 bg-omx-muted/80 hover:bg-omx-muted focus:bg-omx-card text-omx-text placeholder:text-omx-text-muted text-sm rounded-omx-md border border-omx-border focus:border-[#f23064]/60 focus:ring-1 focus:ring-[#f23064]/40 outline-none transition-all"
      />
      <div className="absolute right-3 px-1.5 py-0.5 rounded border border-omx-border bg-omx-card/60 text-[11px] font-mono text-omx-text-muted pointer-events-none">
        /
      </div>
    </div>
  );
};
