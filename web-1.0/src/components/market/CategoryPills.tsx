import React from 'react';
import { CATEGORIES } from '../../data/categories';

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  className?: string;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none ${className}`}>
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-omx-md text-xs font-semibold whitespace-nowrap transition-all border ${
              isSelected
                ? 'bg-[#f23064]/10 border-[#f23064] text-[#f23064] shadow-sm'
                : 'border-omx-border bg-omx-card text-omx-text hover:bg-omx-hover hover:border-omx-border-strong'
            }`}
          >
            {cat.icon && <span>{cat.icon}</span>}
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
