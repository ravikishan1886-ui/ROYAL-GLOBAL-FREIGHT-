import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: { name: string; path: string; onClick?: () => void }[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  if (!items || items.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-3 px-4 sm:px-8 max-w-7xl mx-auto w-full text-xs font-['Inter',sans-serif] ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1.5 text-slate-500">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx === 0 ? (
                <button
                  onClick={item.onClick}
                  className="flex items-center gap-1 text-slate-500 hover:text-[#C8A45D] transition cursor-pointer"
                  title="Home"
                >
                  <Home className="w-3.5 h-3.5 text-[#C8A45D]" />
                  <span className="sr-only">Home</span>
                </button>
              ) : null}

              {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />}

              {isLast ? (
                <span className="font-semibold text-[#071B36] truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                idx > 0 && (
                  <button
                    onClick={item.onClick}
                    className="hover:text-[#C8A45D] transition cursor-pointer"
                  >
                    {item.name}
                  </button>
                )
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
