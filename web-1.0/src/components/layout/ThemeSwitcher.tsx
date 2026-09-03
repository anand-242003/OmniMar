import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-omx-md border border-omx-border bg-omx-card text-omx-text hover:bg-omx-hover transition-colors text-sm font-medium"
        aria-label="Theme Switcher"
      >
        <div className="flex items-center gap-2.5">
          {theme === 'dark' ? (
            <Moon className="w-4 h-4 text-omx-text-secondary" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
          <span className="capitalize">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-omx-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-1.5 w-full bg-omx-card border border-omx-border rounded-omx-md shadow-omx-lg py-1 z-50 overflow-hidden">
          <button
            onClick={() => {
              setTheme('dark');
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-sm text-omx-text hover:bg-omx-hover transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Moon className="w-4 h-4 text-omx-text-secondary" />
              <span>Dark</span>
            </div>
            {theme === 'dark' && <Check className="w-3.5 h-3.5 text-[#f23064]" />}
          </button>
          <button
            onClick={() => {
              setTheme('light');
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-sm text-omx-text hover:bg-omx-hover transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Light</span>
            </div>
            {theme === 'light' && <Check className="w-3.5 h-3.5 text-[#f23064]" />}
          </button>
        </div>
      )}
    </div>
  );
};
