import React from 'react';
import { ExternalLink } from 'lucide-react';
import { NewsItem } from '../types/site';
import { useLanguage } from '../context/LanguageContext';

interface NewsTimelineProps {
  news: NewsItem[];
}

export const NewsTimeline: React.FC<NewsTimelineProps> = ({ news }) => {
  const { t } = useLanguage();

  if (!news || news.length === 0) return null;

  const isLongList = news.length > 5;

  return (
    <div
      className={`space-y-3 ${
        isLongList ? 'max-h-96 overflow-y-auto pr-2 custom-scrollbar' : ''
      }`}
    >
      {news.map((item) => (
        <div
          key={`${item.date ?? ''}:${item.content.en || item.content.zh}`}
          className="group relative flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 p-3.5 rounded-xl border-0 bg-white/70 dark:bg-zinc-900/70 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04),0_1px_4px_-1px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_14px_-2px_rgba(0,0,0,0.4),0_1px_4px_-1px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_-2px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_6px_24px_-2px_rgba(0,0,0,0.55)] hover:bg-white/95 dark:hover:bg-zinc-900/95 transition-all duration-200 hover:translate-x-1 cursor-default min-h-[58px]"
        >
          {/* Glowing Left Indicator on Hover */}
          <div className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

          {/* Date & Tag: grouped together as a whole, vertically centered */}
          {(item.date || item.tag) && (
            <div className="shrink-0 flex flex-col justify-center sm:w-28 text-xs font-mono tabular-nums text-slate-400 dark:text-zinc-500">
              {item.date && (
                <span className="font-semibold text-slate-600 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-zinc-600 group-hover:bg-blue-500 group-hover:scale-125 transition-all shrink-0" />
                  {item.date}
                </span>
              )}
              {item.tag && (
                <span className={`text-[11px] text-blue-600/80 dark:text-blue-400/80 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors leading-none ${item.date ? 'mt-1 pl-3' : ''}`}>
                  {t(item.tag)}
                </span>
              )}
            </div>
          )}

          {/* Right Content: vertically centered with the card container */}
          <div className="flex-1 flex items-center text-slate-700 dark:text-zinc-300 leading-relaxed text-sm group-hover:text-slate-900 dark:group-hover:text-zinc-100 transition-colors">
            <div>
              <span>{t(item.content)}</span>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.date ? `Open link for update ${item.date}` : 'Open update link'}
                  className="inline-flex items-center gap-1 ml-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline hover:scale-105 transition-transform align-baseline group/link"
                >
                  <span>[Link]</span>
                  <ExternalLink className="w-3 h-3 inline group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
