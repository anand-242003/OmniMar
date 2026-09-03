import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Market } from '../../types';
import { TradeOrderSlip } from './TradeOrderSlip';

interface MobileTradeDrawerProps {
  market: Market;
}

export const MobileTradeDrawer: React.FC<MobileTradeDrawerProps> = ({ market }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 1. Sticky Bottom Action Bar (<1024px) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-omx-bg/95 backdrop-blur-md border-t border-omx-border shadow-2xl flex items-center gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 py-3 px-4 rounded-omx-md font-mono font-bold text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all flex items-center justify-between"
        >
          <span>Trade YES</span>
          <span>{market.yesPrice}¢</span>
        </button>

        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 py-3 px-4 rounded-omx-md font-mono font-bold text-xs bg-[#f23064]/20 text-[#f23064] border border-[#f23064]/40 hover:bg-[#f23064]/30 transition-all flex items-center justify-between"
        >
          <span>Trade NO</span>
          <span>{market.noPrice}¢</span>
        </button>
      </div>

      {/* 2. Slide-up Bottom Sheet Modal */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="relative z-10 w-full max-h-[85vh] overflow-y-auto bg-omx-bg border-t border-omx-border rounded-t-2xl p-4 sm:p-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Header Handle & Close button */}
            <div className="flex items-center justify-between pb-3 border-b border-omx-border mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f23064]" />
                <span className="text-xs font-bold text-omx-text">Trade Market</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-omx-text-muted hover:text-omx-text hover:bg-omx-muted transition-colors"
                aria-label="Close trade slip"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Trade Order Slip */}
            <TradeOrderSlip
              market={market}
              onTradeComplete={() => {
                // Keep open or auto-dismiss after small delay
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
