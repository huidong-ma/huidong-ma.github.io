import React, { useState, useEffect } from 'react';
import { Copy, Check, X, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AbstractModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  abstract: string;
}

export const AbstractModal: React.FC<AbstractModalProps> = ({
  isOpen,
  onClose,
  title,
  abstract,
}) => {
  const { locale } = useLanguage();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(abstract);
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
      aria-labelledby="abstract-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border-0 p-6 flex flex-col gap-4 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-zinc-100 font-semibold text-base">
            <FileText className="w-4 h-4 text-blue-500" />
            <h3 id="abstract-modal-title">
              {locale === 'zh' ? '论文摘要 (Abstract)' : 'Abstract'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs font-medium text-slate-500 dark:text-zinc-400 line-clamp-2">
          {title}
        </p>

        <div className="p-4 bg-slate-50 dark:bg-zinc-950/80 rounded-xl border border-slate-200/90 dark:border-zinc-800 text-sm leading-relaxed text-slate-700 dark:text-zinc-300 select-all max-h-72 overflow-y-auto custom-scrollbar">
          {abstract}
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-150 active:scale-95 shadow-xs focus-visible:outline-2 focus-visible:outline-blue-500"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{locale === 'zh' ? '已复制摘要' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{locale === 'zh' ? '复制摘要' : 'Copy Abstract'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
