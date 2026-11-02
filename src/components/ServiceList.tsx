import React from 'react';
import { BookmarkCheck, ChevronRight } from 'lucide-react';
import { ServiceItem } from '../types/site';
import { useLanguage } from '../context/LanguageContext';

interface ServiceListProps {
  services: ServiceItem[];
}

export const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  const { t } = useLanguage();

  if (!services || services.length === 0) return null;

  return (
    <div className="space-y-2">
      {services.map((item) => (
        <div
          key={`${item.role.en || item.role.zh}:${item.organization.en || item.organization.zh}:${item.period ?? ''}`}
          className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 p-3.5 rounded-xl border-0 bg-white/70 dark:bg-zinc-900/70 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04),0_1px_4px_-1px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_14px_-2px_rgba(0,0,0,0.4),0_1px_4px_-1px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_-2px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_6px_24px_-2px_rgba(0,0,0,0.55)] hover:bg-white/95 dark:hover:bg-zinc-900/95 transition-all duration-200 hover:translate-x-1.5 cursor-default min-h-[48px]"
        >
          {/* Subtle Left Accent Indicator on Hover */}
          <div className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

          <div className="flex-1 flex items-start gap-2">
            <BookmarkCheck className="w-4 h-4 text-slate-400 dark:text-zinc-500 group-hover:text-blue-500 group-hover:scale-110 transition-all shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {t(item.role)}
              </span>
              <span className="text-slate-600 dark:text-zinc-400 ml-2 text-xs sm:text-sm group-hover:text-slate-800 dark:group-hover:text-zinc-200 transition-colors">
                — {t(item.organization)}
              </span>
            </div>
          </div>

          {item.period && (
            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto ml-6 sm:ml-0">
              <span className="text-xs font-mono tabular-nums text-slate-400 dark:text-zinc-500 group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
                {item.period}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
