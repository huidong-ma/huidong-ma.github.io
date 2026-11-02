import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'avatar' | 'photo' | 'logo';
  initials?: string;
  fallbackText?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = '',
  fallbackType = 'photo',
  initials = 'YN',
  fallbackText,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const isSrcEmpty = !src || src.trim() === '' || src === '[头像图片 URL 或本地路径]';

  if (isSrcEmpty || hasError) {
    if (fallbackType === 'avatar') {
      return (
        <div
          aria-label={alt || 'Avatar placeholder'}
          className={`flex items-center justify-center font-semibold bg-gradient-to-tr from-slate-200 via-blue-50 to-indigo-100 dark:from-zinc-800 dark:via-zinc-800 dark:to-blue-950 text-blue-700 dark:text-blue-300 border border-slate-200/80 dark:border-zinc-700/80 select-none ${className}`}
        >
          <span className="tracking-wider text-xl uppercase font-bold">
            {initials.slice(0, 2)}
          </span>
        </div>
      );
    }

    if (fallbackType === 'logo') {
      return (
        <div
          aria-label={alt || 'Logo placeholder'}
          className={`flex items-center justify-center bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700/60 rounded-lg text-xs font-medium select-none ${className}`}
        >
          <span>{fallbackText || initials.slice(0, 2) || 'ORG'}</span>
        </div>
      );
    }

    // Photo placeholder
    return (
      <div
        aria-label={alt || 'Photo placeholder'}
        className={`flex flex-col items-center justify-center bg-slate-100 dark:bg-zinc-800/80 text-slate-400 dark:text-zinc-500 border border-slate-200/60 dark:border-zinc-700/60 ${className}`}
      >
        <svg
          className="w-8 h-8 mb-1.5 opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {fallbackText && (
          <span className="text-xs px-2 text-center line-clamp-1">{fallbackText}</span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
