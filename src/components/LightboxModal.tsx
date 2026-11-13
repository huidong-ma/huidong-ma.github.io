import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { GalleryPhoto } from '../types/site';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';

interface LightboxModalProps {
  items: GalleryPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  albumTitle?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  albumTitle,
}) => {
  const { t } = useLanguage();
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Lock body scroll and register keyboard listener
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top action bar: counter and close button */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-2.5 pointer-events-auto">
          {albumTitle && (
            <span className="text-xs font-medium text-white/90 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/10">
              {albumTitle}
            </span>
          )}
          <span className="text-xs font-mono font-semibold text-white/95 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 tabular-nums">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox (Esc)"
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors pointer-events-auto focus-visible:outline-2 focus-visible:outline-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Buttons */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image (Left arrow)"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10 focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image (Right arrow)"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10 focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Content Container */}
      <div
        className="max-w-4xl max-h-[90vh] flex flex-col items-center justify-center pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-h-[72vh] flex items-center justify-center overflow-hidden rounded-xl bg-black/20">
          <ImageWithFallback
            src={currentItem.imageUrl}
            alt={t(currentItem.title)}
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg"
          />
        </div>

        {/* Caption & Metadata */}
        <div className="w-full mt-4 text-center text-white px-4">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-base font-semibold tracking-wide">
              {t(currentItem.title)}
            </h3>
            <span className="text-xs font-mono font-medium text-white/60 tabular-nums">
              ({currentIndex + 1}/{items.length})
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-1 text-xs text-white/70">
            {currentItem.date && (
              <span className="inline-flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3 text-white/50" />
                <span>{currentItem.date}</span>
              </span>
            )}
            {currentItem.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-white/50" />
                <span>{t(currentItem.location)}</span>
              </span>
            )}
            {currentItem.coordinates && (
              <span className="font-mono text-white/50">
                ({currentItem.coordinates})
              </span>
            )}
          </div>

          {currentItem.caption && (
            <p className="mt-2 text-xs text-white/80 max-w-xl mx-auto leading-relaxed">
              {t(currentItem.caption)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
