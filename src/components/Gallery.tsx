import React, { useState } from 'react';
import { MapPin, Maximize2, Calendar } from 'lucide-react';
import { GalleryItem } from '../types/site';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';
import { LightboxModal } from './LightboxModal';
import { TiltCard } from './TiltCard';

interface GalleryProps {
  items: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <TiltCard
            key={item.id}
            maxTilt={3}
            scale={1.02}
            className="group rounded-2xl overflow-hidden border-0 bg-white/80 dark:bg-zinc-900/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06),0_2px_6px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.45),0_2px_6px_-2px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_32px_-4px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_10px_36px_-4px_rgba(0,0,0,0.6)] transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            {/* Image Container with 4:3 Aspect Ratio */}
            <div className="aspect-4/3 w-full overflow-hidden relative">
              <ImageWithFallback
                src={item.imageUrl}
                alt={t(item.title)}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
              />

              {/* Hover Dark Gradient Scrim - only appears on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                aria-hidden="true"
              />

              {/* Hover Top-Right Zoom Action Indicator */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white/90 backdrop-blur-xs opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0 shadow-md">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Hover Bottom Information Overlay - only visible when hovering */}
              <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end text-white opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 ease-out pointer-events-none">
                {/* Title */}
                <h4 className="text-sm font-semibold tracking-wide text-white drop-shadow-xs line-clamp-1">
                  {t(item.title)}
                </h4>

                {/* Location & Date */}
                <div className="flex items-center justify-between gap-2 mt-1.5 text-xs text-white/80 font-medium">
                  {item.location ? (
                    <span className="inline-flex items-center gap-1 line-clamp-1">
                      <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                      <span className="truncate">{t(item.location)}</span>
                    </span>
                  ) : (
                    <span />
                  )}

                  {item.date && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-white/70 shrink-0">
                      <Calendar className="w-3 h-3 text-blue-400" />
                      <span className="tabular-nums">{item.date}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {selectedIndex !== null && (
        <LightboxModal
          items={items}
          currentIndex={selectedIndex}
          isOpen={true}
          onClose={() => setSelectedIndex(null)}
          onNavigate={(newIdx) => setSelectedIndex(newIdx)}
        />
      )}
    </>
  );
};
