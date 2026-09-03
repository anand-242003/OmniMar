import React from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-64 max-w-[80vw] h-full bg-omx-sidebar border-r border-omx-border shadow-omx-lg z-10 animate-in slide-in-from-left duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-3 p-1.5 rounded-omx-sm text-omx-text-muted hover:text-omx-text hover:bg-omx-muted transition-colors z-20"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        <Sidebar onNavigate={onClose} />
      </div>
    </div>
  );
};
