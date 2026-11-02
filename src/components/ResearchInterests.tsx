import React from 'react';
import { Compass } from 'lucide-react';
import { ResearchInterest } from '../types/site';
import { useLanguage } from '../context/LanguageContext';
import { TiltCard } from './TiltCard';

interface ResearchInterestsProps {
  interests: ResearchInterest[];
}

export const ResearchInterests: React.FC<ResearchInterestsProps> = ({ interests }) => {
  const { t } = useLanguage();

  if (!interests || interests.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {interests.map((interest) => (
        <TiltCard
          key={interest.id}
          maxTilt={3}
          scale={1.01}
          className="p-5 rounded-xl border-0 bg-white/80 dark:bg-zinc-900/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06),0_2px_6px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.45),0_2px_6px_-2px_rgba(0,0,0,0.3)] transition-all hover:shadow-[0_8px_28px_-4px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.55)] cursor-default"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Compass className="w-4 h-4 text-blue-500 opacity-70 group-hover:rotate-45 group-hover:opacity-100 transition-all duration-300" />
            <h3 className="text-[15px] font-semibold text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {t(interest.title)}
            </h3>
          </div>

          {interest.description && (
            <p className="text-xs text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
              {t(interest.description)}
            </p>
          )}

          {interest.keywords && interest.keywords.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-slate-400 dark:text-zinc-500 mt-3 pt-2.5 border-t border-slate-100 dark:border-zinc-800/80 font-mono">
              {interest.keywords.map((kw, idx) => (
                <React.Fragment key={kw}>
                  {idx > 0 && <span aria-hidden="true" className="text-slate-300 dark:text-zinc-700">·</span>}
                  <span className="hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 inline-block transition-transform cursor-pointer">
                    {kw}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}
        </TiltCard>
      ))}
    </div>
  );
};
