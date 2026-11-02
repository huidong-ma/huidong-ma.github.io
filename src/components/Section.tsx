import React, { useState } from 'react';
import { Hash, Check } from 'lucide-react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  count?: number;
}

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
  className = '',
  count,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section
      id={id}
      data-section={id}
      className={`scroll-mt-24 pt-6 pb-8 ${className}`}
    >
      <div className="flex items-baseline justify-between mb-6 group/sectionHeader">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 flex items-center gap-2.5">
          <span className="group-hover/sectionHeader:text-blue-600 dark:group-hover/sectionHeader:text-blue-400 transition-colors">
            {title}
          </span>
          {typeof count === 'number' && (
            <span className="text-xs font-normal tabular-nums text-slate-400 dark:text-zinc-500 group-hover/sectionHeader:text-blue-500/80 transition-colors">
              ({count})
            </span>
          )}

          {/* Interactive anchor link button on hover */}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label={`Copy link to ${title} section`}
            title={copied ? 'Link copied!' : 'Copy section link'}
            className="p-1 rounded text-slate-300 dark:text-zinc-600 hover:text-blue-600 dark:hover:text-blue-400 opacity-0 group-hover/sectionHeader:opacity-100 transition-all hover:scale-110"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Hash className="w-4 h-4" />
            )}
          </button>
        </h2>
      </div>
      <div>{children}</div>
    </section>
  );
};
