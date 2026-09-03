import React from 'react';
import {
  Home,
  Wallet,
  BarChart3,
  Flame,
  Activity,
  Trophy,
  Globe,
  Users,
  BarChart2,
  Settings,
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { ThemeSwitcher } from './ThemeSwitcher';

interface SidebarProps {
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const { currentPath, navigate } = useRouter();

  const navItems = [
    { label: 'Home', path: '/home', icon: Home },
    { label: 'Wallet', path: '/wallet', icon: Wallet },
    { label: 'Markets', path: '/markets', icon: BarChart3 },
    { label: 'Trending', path: '/trending', icon: Flame },
    { label: 'Activity', path: '/activity', icon: Activity },
    { label: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { label: 'Social', path: '/social', icon: Globe },
    { label: 'Groups', path: '/groups', icon: Users },
    { label: 'Portfolio', path: '/portfolio', icon: BarChart2 },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  const isItemActive = (path: string) => {
    if (path === '/home') {
      return currentPath === '/' || currentPath === '/home';
    }
    if (path === '/markets') {
      return currentPath.startsWith('/markets');
    }
    return currentPath === path;
  };

  return (
    <aside className="w-60 flex-shrink-0 h-screen sticky top-0 flex flex-col justify-between bg-omx-sidebar border-r border-omx-border px-4 py-5 select-none z-30">
      {/* Logo Top */}
      <div>
        <div
          onClick={() => handleNavClick('/home')}
          className="flex items-center gap-2.5 px-2 cursor-pointer mb-6 group"
        >
          <div className="w-8 h-8 rounded-omx-md bg-gradient-to-br from-[#f23064] via-[#ff4f55] to-[#ff6b1a] flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:shadow-omx-glow transition-all">
            M
          </div>
          <span className="font-bold text-lg tracking-tight text-omx-text">
            Omni<span className="text-[#f23064]">Market</span>X
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-omx-md text-sm font-medium transition-all text-left ${
                  active
                    ? 'bg-[#f23064]/10 text-[#f23064] shadow-sm font-semibold'
                    : 'text-omx-text-secondary hover:text-omx-text hover:bg-omx-hover'
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] transition-colors ${
                    active ? 'text-[#f23064]' : 'text-omx-text-muted group-hover:text-omx-text'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Theme Switcher */}
      <div className="pt-4 border-t border-omx-border">
        <ThemeSwitcher />
      </div>
    </aside>
  );
};
