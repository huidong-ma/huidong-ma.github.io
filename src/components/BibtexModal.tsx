import React, { useState } from 'react';
import { Copy, Check, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BibtexModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  bibtex: string;
}

export const BibtexModal: React.FC<BibtexModalProps> = ({
  isOpen,
  onClose,
  title,
  bibtex,
}) => {
  const { locale } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bibtex-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border-0 p-6 flex flex-col gap-4 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3
            id="bibtex-modal-title"
            className="text-base font-semibold text-slate-900 dark:text-zinc-100 line-clamp-1"
          >
            {locale === 'zh' ? '引用格式 (BibTeX)' : 'BibTeX Citation'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2">
          {title}
        </p>

        <div className="relative">
          <pre className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-200 dark:border-zinc-800/80 text-xs font-mono text-slate-800 dark:text-zinc-300 overflow-x-auto whitespace-pre leading-relaxed select-all">
            {bibtex}
          </pre>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{locale === 'zh' ? '已复制到剪贴板' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{locale === 'zh' ? '复制 BibTeX' : 'Copy BibTeX'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
