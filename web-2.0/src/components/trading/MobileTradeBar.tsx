import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import type { Market } from '../../types/market';
import type { Outcome } from '../../types/trade';
import { TradeOrderSlip } from './TradeOrderSlip';

interface MobileTradeBarProps {
  market: Market;
}

export const MobileTradeBar: React.FC<MobileTradeBarProps> = ({ market }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stagedOutcome, setStagedOutcome] = useState<Outcome>('YES');
  const touchStartY = useRef<number | null>(null);

  const handleOpenOutcome = (outcome: Outcome) => {
    setStagedOutcome(outcome);
    setIsOpen(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current !== null) {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchEndY - touchStartY.current;
      // If dragged down by more than 50px, dismiss drawer
      if (deltaY > 50) {
        setIsOpen(false);
      }
      touchStartY.current = null;
    }
  };

  return (
    <>
      {/* Refinement 12: Sticky Mobile Bar pinned to bottom-0 with safe-area padding (NO double bottom navigation!) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-omx-border bg-omx-card/95 backdrop-blur-md px-4 pt-2 pb-[max(0.625rem,env(safe-area-inset-bottom,0px))] shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-omx-text">
              YES {market.yesPrice}¢ · NO {market.noPrice}¢
            </span>
            <span className="text-[10px] text-omx-text-muted">
              {market.impliedProbabilityYes}% implied consensus
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleOpenOutcome('YES')}
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              className="rounded-xl bg-omx-yes px-4 py-2.5 text-xs font-sora font-bold text-white shadow-sm active:scale-95 transition-transform cursor-pointer"
            >
              Predict YES
            </button>
            <button
              type="button"
              onClick={() => handleOpenOutcome('NO')}
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              className="rounded-xl bg-omx-no px-4 py-2.5 text-xs font-sora font-bold text-white shadow-sm active:scale-95 transition-transform cursor-pointer"
            >
              Predict NO
            </button>
          </div>
        </div>
      </div>

      {/* Refinement 13: Slide-Up Half-Sheet Drawer with Close Button, Backdrop Tap, and Drag-Down Dismissal */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Trade order drawer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-t-2xl border-t border-omx-border bg-omx-card p-4 shadow-2xl max-h-[88vh] overflow-y-auto"
          >
            {/* Sheet Drag Handle & Close (Touch gesture listener for drag-down dismissal) */}
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="flex items-center justify-between pb-3 border-b border-omx-border mb-3 cursor-grab active:cursor-grabbing select-none"
            >
              <div className="flex items-center space-x-2">
                <span className="h-1.5 w-10 rounded-full bg-omx-border-strong mx-auto block" />
                <span className="font-sora font-bold text-xs text-omx-text">Trade Desk</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-omx-text-secondary hover:text-omx-text hover:bg-omx-elevated transition-colors"
                aria-label="Close trade sheet"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Render Trade Order Slip Inside Drawer with Staged Outcome */}
            <TradeOrderSlip
              market={market}
              stagedOutcome={stagedOutcome}
              onPositionPlaced={() => {
                // Keep open to let user review confirmation receipt
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
