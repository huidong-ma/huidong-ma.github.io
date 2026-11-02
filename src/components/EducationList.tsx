import React from 'react';
import { MapPin, GraduationCap } from 'lucide-react';
import { EducationItem } from '../types/site';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';
import { TiltCard } from './TiltCard';

interface EducationListProps {
  education: EducationItem[];
}

export const EducationList: React.FC<EducationListProps> = ({ education }) => {
  const { t } = useLanguage();

  if (!education || education.length === 0) return null;

  return (
    <div className="space-y-4">
      {education.map((item) => (
        <TiltCard
          key={item.id}
          maxTilt={2.5}
          scale={1.01}
          className="p-4 sm:p-5 rounded-xl border-0 bg-white/80 dark:bg-zinc-900/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06),0_2px_6px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.45),0_2px_6px_-2px_rgba(0,0,0,0.3)] transition-all hover:shadow-[0_8px_28px_-4px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.55)] cursor-default"
        >
          <div className="flex gap-4 items-start">
            {/* Logo or placeholder with hover physics */}
            <div className="shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2">
              <ImageWithFallback
                src={item.logoUrl}
                alt={t(item.institution)}
                fallbackType="logo"
                initials={t(item.institution).slice(0, 2)}
                className="w-11 h-11 object-contain p-1 rounded-xl bg-white dark:bg-zinc-800 shadow-xs"
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2">
                <h3 className="font-semibold text-slate-900 dark:text-zinc-100 text-[15px] truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {t(item.institution)}
                </h3>
                <span className="text-xs font-mono tabular-nums text-slate-400 dark:text-zinc-500 shrink-0 group-hover:text-slate-600 dark:group-hover:text-zinc-300 transition-colors">
                  {item.period}
                </span>
              </div>

              <div className="text-sm font-medium text-slate-700 dark:text-zinc-300 mt-1 flex items-center flex-wrap">
                <span>{t(item.degree)}</span>
                {item.major && (
                  <>
                    <span className="mx-1.5 text-slate-400" aria-hidden="true">·</span>
                    <span className="text-slate-600 dark:text-zinc-400 group-hover:text-slate-800 dark:group-hover:text-zinc-200 transition-colors">
                      {t(item.major)}
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500 dark:text-zinc-400">
                {item.advisor && (
                  <span className="inline-flex items-center gap-1 group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    <span>{t(item.advisor)}</span>
                  </span>
                )}
                {item.location && (
                  <span className="inline-flex items-center gap-1 group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
                    <MapPin className="w-3 h-3 text-slate-400 group-hover:text-red-500 transition-colors group-hover:animate-bounce" />
                    <span>{t(item.location)}</span>
                  </span>
                )}
              </div>

              {item.description && (
                <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
                  {t(item.description)}
                </p>
              )}
            </div>
          </div>
        </TiltCard>
      ))}
    </div>
  );
};
