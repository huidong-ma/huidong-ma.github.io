import React from 'react';
import { Award, ChevronRight } from 'lucide-react';
import { HonorItem } from '../types/site';
import { useLanguage } from '../context/LanguageContext';

interface HonorsListProps {
  honors: HonorItem[];
}

export const HonorsList: React.FC<HonorsListProps> = ({ honors }) => {
  const { t } = useLanguage();

  if (!honors || honors.length === 0) return null;

  return (
    <div className="space-y-2">
      {honors.map((honor) => (
        <div
          key={`${honor.name.en || honor.name.zh}:${honor.issuer.en || honor.issuer.zh}:${honor.date ?? ''}`}
          className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 p-3.5 rounded-xl border-0 bg-white/70 dark:bg-zinc-900/70 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04),0_1px_4px_-1px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_14px_-2px_rgba(0,0,0,0.4),0_1px_4px_-1px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_-2px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_6px_24px_-2px_rgba(0,0,0,0.55)] hover:bg-white/95 dark:hover:bg-zinc-900/95 transition-all duration-200 hover:translate-x-1.5 cursor-default min-h-[48px]"
        >
          {/* Subtle Left Accent Indicator on Hover */}
          <div className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-slate-400 dark:text-zinc-500 group-hover:text-amber-500 group-hover:scale-110 transition-all shrink-0" />
              <span className="font-semibold text-slate-800 dark:text-zinc-200 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {t(honor.name)}
              </span>
              {honor.issuer && t(honor.issuer) && (
                <span className="text-xs text-slate-500 dark:text-zinc-400 group-hover:text-slate-600 dark:group-hover:text-zinc-300 transition-colors">
                  — {t(honor.issuer)}
                </span>
              )}
            </div>

            {honor.description && (
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 ml-6 group-hover:text-slate-600 dark:group-hover:text-zinc-300 transition-colors">
                {t(honor.description)}
              </p>
            )}
          </div>

          {honor.date && (
            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto ml-6 sm:ml-0">
              <span className="text-xs font-mono tabular-nums text-slate-400 dark:text-zinc-500 group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
                {honor.date}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
