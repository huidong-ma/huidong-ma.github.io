import React, { useState, useRef } from 'react';
import {
  MapPin,
  Calendar,
  Maximize2,
} from 'lucide-react';
import { GalleryAlbum, GalleryItem, GalleryPhoto } from '../types/site';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';
import { LightboxModal } from './LightboxModal';

interface GalleryProps {
  albums?: GalleryAlbum[];
  items?: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ albums = [], items = [] }) => {
  const { t } = useLanguage();

  // If albums are provided, use them; otherwise, wrap legacy flat items into a default album
  const resolvedAlbums: GalleryAlbum[] = React.useMemo(() => {
    if (albums && albums.length > 0) {
      return albums;
    }
    if (items && items.length > 0) {
      return [
        {
          id: 'default-album',
          title: { zh: '精选相册', en: 'Selected Moments' },
          location: items[0].location,
          date: items[0].date,
          coverPhotoId: items[0].id,
          photos: items,
        },
      ];
    }
    return [];
  }, [albums, items]);

  // Lightbox state: active photos list, photo index, and album title
  const [lightboxState, setLightboxState] = useState<{
    photos: GalleryPhoto[];
    photoIndex: number;
    albumTitle: string;
  } | null>(null);

  if (resolvedAlbums.length === 0) return null;

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Album Rows Container - Clean, without top filter bar */}
      <div className="space-y-4 sm:space-y-5">
        {resolvedAlbums.map((album) => (
          <AlbumRow
            key={album.id}
            album={album}
            onOpenLightbox={(photos, photoIndex) =>
              setLightboxState({
                photos,
                photoIndex,
                albumTitle: t(album.title),
              })
            }
          />
        ))}
      </div>

      {/* Global Lightbox Viewer with x/n counter */}
      {lightboxState && (
        <LightboxModal
          items={lightboxState.photos as GalleryItem[]}
          currentIndex={lightboxState.photoIndex}
          isOpen={true}
          albumTitle={lightboxState.albumTitle}
          onClose={() => setLightboxState(null)}
          onNavigate={(newIdx) =>
            setLightboxState((prev) =>
              prev ? { ...prev, photoIndex: newIdx } : null
            )
          }
        />
      )}
    </div>
  );
};

// ============================================================================
// ============================================================================
// Multi-Photo Stacked Album Cover
// - Artistically composed of real photographs from the album (Paper Print Stack)
// - Layer 3 (-9° left tilt), Layer 2 (+8° right tilt), Layer 1 (-1.5° hero tilt)
// - Interactive hover fan-out: photos smoothly spread apart revealing album glimpses
// - Gradient scrim at bottom with Album Title, Location, and Date
// - Equal dimensions: h-48 md:h-44 lg:h-48 aspect-[4/3] matching right-side carousel
// ============================================================================
interface AlbumStackedCoverProps {
  album: GalleryAlbum;
  photos: GalleryPhoto[];
  onOpenCover: () => void;
}

const AlbumStackedCover: React.FC<AlbumStackedCoverProps> = ({
  album,
  photos,
  onOpenCover,
}) => {
  const { t, locale } = useLanguage();

  // Distinct photo layers from the album
  // Hero (front): photos[0] (signature shot)
  // Layer 2 (back-right): photos[1]
  // Layer 3 (back-left): photos[2]
  // Layer 4 (deep background peek): photos[3]
  const heroPhoto = photos[0] || null;
  const rightPhoto = photos.length > 1 ? photos[1] : heroPhoto;
  const leftPhoto = photos.length > 2 ? photos[2] : (photos.length > 1 ? photos[1] : heroPhoto);
  const backPhoto = photos.length > 3 ? photos[3] : null;
  const totalCount = photos.length;

  return (
    <div
      onClick={onOpenCover}
      className="cursor-pointer relative w-full sm:w-auto h-48 md:h-44 lg:h-48 aspect-[4/3] shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-slate-200/90 via-slate-100 to-slate-200/80 dark:from-zinc-900 dark:via-zinc-850 dark:to-zinc-950 shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.45)] ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] group/cover select-none"
      title={t(album.title)}
    >
      {/* Background Soft Texture and Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/[0.02] to-black/[0.08] dark:to-black/35 pointer-events-none" />

      {/* Layer 4: Deep Background Peek (if 4+ photos exist) */}
      {backPhoto && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[68%] rotate-1 group-hover/cover:-translate-y-[74%] group-hover/cover:rotate-2 transition-all duration-500 ease-out w-[62%] aspect-[4/3] rounded-lg overflow-hidden p-1 bg-white/90 dark:bg-zinc-800/90 shadow-md ring-1 ring-black/5 dark:ring-white/10 opacity-60 group-hover/cover:opacity-80">
          <ImageWithFallback
            src={backPhoto.imageUrl}
            alt=""
            className="w-full h-full object-cover rounded-md pointer-events-none select-none brightness-[0.9]"
          />
        </div>
      )}

      {/* Layer 3: Back-Left Photo Card (Angles left, fans out further on hover) */}
      {leftPhoto && (
        <div className="absolute left-1/2 top-1/2 -translate-x-[64%] -translate-y-[58%] -rotate-9 group-hover/cover:-rotate-14 group-hover/cover:-translate-x-[70%] group-hover/cover:-translate-y-[62%] transition-all duration-500 ease-out w-[68%] aspect-[4/3] rounded-lg overflow-hidden p-1 bg-white/95 dark:bg-zinc-800/95 shadow-[0_4px_14px_rgba(0,0,0,0.16)] dark:shadow-[0_6px_18px_rgba(0,0,0,0.55)] ring-1 ring-black/5 dark:ring-white/10 opacity-75 group-hover/cover:opacity-95">
          <ImageWithFallback
            src={leftPhoto.imageUrl}
            alt=""
            className="w-full h-full object-cover rounded-md pointer-events-none select-none brightness-[0.92] group-hover/cover:brightness-100 transition-all"
          />
        </div>
      )}

      {/* Layer 2: Back-Right Photo Card (Angles right, fans out further on hover) */}
      {rightPhoto && (
        <div className="absolute left-1/2 top-1/2 -translate-x-[36%] -translate-y-[54%] rotate-8 group-hover/cover:rotate-13 group-hover/cover:-translate-x-[30%] group-hover/cover:-translate-y-[58%] transition-all duration-500 ease-out w-[68%] aspect-[4/3] rounded-lg overflow-hidden p-1 bg-white/95 dark:bg-zinc-800/95 shadow-[0_6px_16px_rgba(0,0,0,0.18)] dark:shadow-[0_8px_22px_rgba(0,0,0,0.6)] ring-1 ring-black/5 dark:ring-white/10 opacity-80 group-hover/cover:opacity-95">
          <ImageWithFallback
            src={rightPhoto.imageUrl}
            alt=""
            className="w-full h-full object-cover rounded-md pointer-events-none select-none brightness-[0.94] group-hover/cover:brightness-100 transition-all"
          />
        </div>
      )}

      {/* Layer 1: Front Hero Signature Photo Card (Prism / Fine-art border) */}
      {heroPhoto && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[46%] -rotate-1.5 group-hover/cover:rotate-0 group-hover/cover:scale-[1.03] transition-all duration-500 ease-out w-[76%] aspect-[4/3] rounded-lg overflow-hidden p-1.5 bg-white dark:bg-zinc-800 shadow-[0_10px_24px_-4px_rgba(0,0,0,0.28)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.7)] ring-1 ring-black/10 dark:ring-white/15 z-20">
          <ImageWithFallback
            src={heroPhoto.imageUrl}
            alt={t(album.title)}
            className="w-full h-full object-cover rounded-md pointer-events-none select-none transition-transform duration-500 ease-out group-hover/cover:scale-104"
          />
        </div>
      )}

      {/* Top Floating Badge: Stacked Pill indicating album & photo count */}
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/95 text-[10px] font-medium tracking-wide z-30 pointer-events-none shadow-xs border border-white/10">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span>
          {locale === 'zh' ? `${totalCount} 张全辑` : `${totalCount} Photos`}
        </span>
      </div>

      {/* Top Right Hover Zoom Icon */}
      <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/50 backdrop-blur-md text-white/95 flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity pointer-events-none z-30 border border-white/10">
        <Maximize2 className="w-3.5 h-3.5" />
      </div>

      {/* Bottom Gradient Scrim & Information */}
      <div className="absolute inset-x-0 bottom-0 p-3 pt-12 bg-gradient-to-t from-black/92 via-black/60 to-transparent flex flex-col justify-end text-white pointer-events-none z-30">
        <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white drop-shadow-xs line-clamp-1 group-hover/cover:text-blue-300 transition-colors">
          {t(album.title)}
        </h3>

        <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-white/80">
          {album.location && (
            <span className="inline-flex items-center gap-0.5 truncate">
              <MapPin className="w-2.5 h-2.5 text-red-400 shrink-0" />
              <span className="truncate">{t(album.location)}</span>
            </span>
          )}
          {album.location && album.date && (
            <span className="text-white/40" aria-hidden="true">
              ·
            </span>
          )}
          {album.date && (
            <span className="font-mono tabular-nums shrink-0 text-white/70">
              {album.date}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Single Album Row Component
// Left: Multi-Photo Stacked Cover (Artistic Polaroid/Print fan-out composite)
// Right: 3D Stacked Cover Flow Carousel (Contains ALL photos including cover)
// ============================================================================
interface AlbumRowProps {
  album: GalleryAlbum;
  onOpenLightbox: (photos: GalleryPhoto[], photoIndex: number) => void;
}

const AlbumRow: React.FC<AlbumRowProps> = ({ album, onOpenLightbox }) => {
  // Keep the selected cover first while reusing the original photo records.
  const allAlbumPhotos = React.useMemo(() => {
    const photos = album.photos || [];
    const coverIndex = photos.findIndex((photo) => photo.id === album.coverPhotoId);
    if (coverIndex <= 0) return photos;
    return [photos[coverIndex], ...photos.slice(0, coverIndex), ...photos.slice(coverIndex + 1)];
  }, [album.photos, album.coverPhotoId]);

  return (
    <div className="group relative rounded-2xl border-0 bg-white/85 dark:bg-zinc-900/85 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06),0_2px_6px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.45),0_2px_6px_-2px_rgba(0,0,0,0.3)] backdrop-blur-md p-3 sm:p-4 transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.09)] dark:hover:shadow-[0_8px_34px_-4px_rgba(0,0,0,0.55)]">
      <div className="flex flex-col md:flex-row gap-3.5 sm:gap-4 items-center">
        {/* ================================================================ */}
        {/* LEFT: 艺术多图堆叠封面 (由专辑内相片有机叠构，悬停扇形散开)        */}
        {/* ================================================================ */}
        <AlbumStackedCover
          album={album}
          photos={allAlbumPhotos}
          onOpenCover={() => onOpenLightbox(allAlbumPhotos, 0)}
        />

        {/* Vertical Hairline Divider on Desktop */}
        <div className="hidden md:block w-px self-stretch bg-slate-200/60 dark:bg-zinc-800/60 my-0.5" />

        {/* ================================================================ */}
        {/* RIGHT: 照片堆叠动画区域 (包含原本的专辑照片与全辑所有相片)       */}
        {/* ================================================================ */}
        <div className="relative flex-1 min-w-0 w-full h-48 md:h-44 lg:h-48 flex items-center justify-center">
          <StackedPhotoCarousel
            photos={allAlbumPhotos}
            allAlbumPhotos={allAlbumPhotos}
            onOpenLightbox={onOpenLightbox}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3D Stacked Cover Flow Carousel
// - Height strictly matches album cover: h-48 md:h-44 lg:h-48 aspect-[4/3]
// - 1:1 Real-time continuous scrubbing during drag & quick flick support
// - Left drag reveals right photo; Right drag reveals left photo
// - On mouse/touch release, snaps to whichever card is closest to the center line
// - Single click on center card reliably opens LightboxModal
// - Single click on left/right side cards smoothly flips and centers that card
// - Zero bottom progress bar / dots clutter
// ============================================================================
interface StackedPhotoCarouselProps {
  photos: GalleryPhoto[];
  allAlbumPhotos: GalleryPhoto[];
  onOpenLightbox: (photos: GalleryPhoto[], photoIndex: number) => void;
}

const DRAG_THRESHOLD = 10; // 10px threshold ensures micro-movements stay clicks while drags initiate smoothly
const CARD_SPACING = 132; // Optimal horizontal offset for equal-height cards

const StackedPhotoCarousel: React.FC<StackedPhotoCarouselProps> = ({
  photos,
  allAlbumPhotos,
  onOpenLightbox,
}) => {
  const { t, locale } = useLanguage();
  // Default active index to the center photo (e.g. index 2 for 5 photos)
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    return photos.length > 2 ? Math.min(2, Math.floor(photos.length / 2)) : 0;
  });

  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [animDuration, setAnimDuration] = useState<string>('0.62s');

  const containerRef = useRef<HTMLDivElement>(null);

  // References for drag and pointer tracking
  const pointerStartRef = useRef<{
    x: number;
    y: number;
    time: number;
    initialIndex: number;
  } | null>(null);

  const moveHistoryRef = useRef<Array<{ x: number; time: number }>>([]);
  const isDraggingRef = useRef<boolean>(false);
  const dragDistanceRef = useRef<number>(0);
  const suppressClickUntilRef = useRef<number>(0);

  // Pointer Down (Mouse or Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only accept primary mouse click (button 0) or touch/pen
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    const now = Date.now();
    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: now,
      initialIndex: activeIndex,
    };
    moveHistoryRef.current = [{ x: e.clientX, time: now }];
    isDraggingRef.current = false;
    dragDistanceRef.current = 0;
  };

  // Real-time drag tracking with moving velocity buffer
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerStartRef.current) return;

    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;
    const dist = Math.hypot(deltaX, deltaY);
    dragDistanceRef.current = dist;

    // Record touch/mouse trajectory in a moving 100ms window
    const now = Date.now();
    moveHistoryRef.current.push({ x: e.clientX, time: now });
    moveHistoryRef.current = moveHistoryRef.current.filter((pt) => now - pt.time <= 100);

    // Only engage drag if horizontal movement is clearly intentional (> 10px)
    if (!isDraggingRef.current && dist > DRAG_THRESHOLD) {
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        // Predominantly vertical scrolling on touch devices -> release gesture
        pointerStartRef.current = null;
        return;
      }
      isDraggingRef.current = true;
      setIsDragging(true);
    }

    if (isDraggingRef.current) {
      // Resistance/damping at boundary edges
      let damped = deltaX;
      const initialIdx = pointerStartRef.current.initialIndex;
      if (
        (initialIdx === 0 && deltaX > 0) ||
        (initialIdx === photos.length - 1 && deltaX < 0)
      ) {
        damped = deltaX * 0.28;
      }
      setDragOffset(damped);
    }
  };

  // Pointer Up / Cancel / Release: Inertial momentum glide & gradual deceleration
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerStartRef.current) return;

    const deltaX = e.clientX - pointerStartRef.current.x;
    const initialIdx = pointerStartRef.current.initialIndex;
    const wasDrag = isDraggingRef.current;
    const totalDist = dragDistanceRef.current;
    const now = Date.now();

    // Calculate real-time release flick velocity (px/ms) from recent history window
    let releaseVelocity = 0;
    const history = moveHistoryRef.current;
    if (history.length >= 2) {
      const oldest = history[0];
      const dt = now - oldest.time;
      if (dt > 8) {
        releaseVelocity = (e.clientX - oldest.x) / dt;
      }
    }

    pointerStartRef.current = null;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (wasDrag && totalDist > DRAG_THRESHOLD) {
      // Intentional drag gesture completed -> suppress trailing click
      suppressClickUntilRef.current = Date.now() + 160;

      // Inertial momentum projection:
      // Even if user only dragged a short distance, the momentum carries forward,
      // continues sliding across cards, and decelerates naturally to the closest center page.
      const MOMENTUM_COEFF = 280; // projected distance multiplier based on velocity
      const projectedDistance = deltaX + releaseVelocity * MOMENTUM_COEFF;

      let cardStep = -projectedDistance / CARD_SPACING;

      // Positive directional commitment:
      // If user dragged in a direction (> 18px) or released with flick velocity (> 0.14 px/ms),
      // guarantee that it continues flipping at least 1 card in that direction.
      if (deltaX < -18 || releaseVelocity < -0.14) {
        cardStep = Math.max(1, Math.round(cardStep));
      } else if (deltaX > 18 || releaseVelocity > 0.14) {
        cardStep = Math.min(-1, Math.round(cardStep));
      } else {
        cardStep = Math.round(cardStep);
      }

      // Cap continuous coasting up to 2 cards per swipe for controlled elegance
      cardStep = Math.max(-2, Math.min(2, cardStep));

      const targetIndex = Math.max(0, Math.min(photos.length - 1, initialIdx + cardStep));
      const stepMagnitude = Math.abs(targetIndex - initialIdx);

      // Organic deceleration curve: longer duration with gradual tail for "慢慢停下来"
      if (stepMagnitude >= 2) {
        setAnimDuration('0.75s');
      } else if (stepMagnitude === 1) {
        setAnimDuration('0.62s');
      } else {
        setAnimDuration('0.48s');
      }

      setActiveIndex(targetIndex);
      setDragOffset(0);
    } else {
      // Natural tap or click: reset offset and allow click to fire unimpeded
      setDragOffset(0);
      suppressClickUntilRef.current = 0;
    }
  };

  // Card Click Handler: reliable click routing
  const handleCardClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();

    // Ignore click if an intentional drag gesture just concluded
    if (Date.now() < suppressClickUntilRef.current) {
      return;
    }

    if (index === activeIndex) {
      // 1. Single click on center card -> Open LightboxModal
      onOpenLightbox(allAlbumPhotos, index);
    } else {
      // 2. Single click on left or right side card -> Smoothly flip and bring it to center
      setAnimDuration('0.55s');
      setActiveIndex(index);
    }
  };

  // Track click fallback: clicking left or right empty area also navigates smoothly
  const handleTrackClick = (e: React.MouseEvent) => {
    if (Date.now() < suppressClickUntilRef.current) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - (rect.left + rect.width / 2);

    setAnimDuration('0.55s');
    if (clickX < -70) {
      setActiveIndex((prev) => Math.max(0, prev - 1));
    } else if (clickX > 70) {
      setActiveIndex((prev) => Math.min(photos.length - 1, prev + 1));
    }
  };

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    setAnimDuration('0.5s');
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(photos.length - 1, prev + 1));
    }
  };

  if (!photos || photos.length === 0) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={handleTrackClick}
      className="relative w-full h-full flex items-center justify-center overflow-hidden touch-pan-y select-none outline-none focus-visible:ring-1 focus-visible:ring-blue-500/30 rounded-xl cursor-pointer"
      style={{ perspective: '1100px' }}
      aria-label={locale === 'zh' ? '照片专辑轮播' : 'Photo album carousel'}
    >
      {/* 3D Stack Track */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        {photos.map((photo, index) => {
          // Continuous 1:1 real-time card X offset relative to container center
          const cardX = (index - activeIndex) * CARD_SPACING + dragOffset;
          const distFromCenter = Math.abs(cardX);
          const normalizedDist = distFromCenter / CARD_SPACING;
          const sign = Math.sign(cardX);

          // Render visible cards up to ~3.5 spacing distance
          if (normalizedDist > 3.4) return null;

          // 3D Scale and Depth Curve (without preserve-3d raycast interference):
          // Center card: scale 1.0, rotateY 0deg, zIndex 40, opacity 1.0
          // Side cards: scale descends to 0.72, rotateY angles toward center, zIndex descends
          const scale = Math.max(0.72, 1 - normalizedDist * 0.13);
          const rotateY = -sign * Math.min(normalizedDist * 16, 26);
          // Instant zIndex prevents old-card residue while keeping cards clickable
          const zIndex = Math.round(40 - Math.min(normalizedDist * 8, 30));
          const opacity = Math.max(0.44, 1 - normalizedDist * 0.26);

          const isCenter = index === activeIndex && Math.abs(dragOffset) < 30;

          return (
            <div
              key={photo.id || index}
              onClick={(e) => handleCardClick(index, e)}
              style={{
                transform: `translateX(${cardX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                zIndex,
                opacity,
                transition: isDragging
                  ? 'none'
                  : `transform ${animDuration} cubic-bezier(0.14, 0.96, 0.26, 1), opacity 0.38s ease`,
              }}
              className={`absolute h-48 md:h-44 lg:h-48 aspect-[4/3] rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_22px_rgba(0,0,0,0.55)] group/photo select-none bg-slate-100 dark:bg-zinc-800 transition-shadow cursor-pointer pointer-events-auto ${
                isCenter
                  ? 'ring-1 ring-black/10 dark:ring-white/15'
                  : 'hover:brightness-105 hover:shadow-lg'
              }`}
              title={t(photo.title)}
            >
              {/* Photo Image */}
              <ImageWithFallback
                src={photo.imageUrl}
                alt={t(photo.title)}
                className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-500 ease-out group-hover/photo:scale-106"
              />

              {/* Hover Zoom Icon on Center Card */}
              {isCenter && (
                <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/50 text-white/95 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-all duration-200 scale-90 group-hover/photo:scale-100 shadow-sm pointer-events-none z-10">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Side Card subtle indicator overlay */}
              {!isCenter && (
                <div className="absolute inset-0 bg-black/10 dark:bg-black/25 group-hover/photo:bg-transparent transition-colors pointer-events-none" />
              )}

              {/* Photos bottom text overlay: appears on hover for center card */}
              <div
                className={`absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-black/90 via-black/55 to-transparent flex flex-col justify-end text-white transition-opacity duration-200 pointer-events-none ${
                  isCenter ? 'opacity-0 group-hover/photo:opacity-100' : 'opacity-0'
                }`}
              >
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow-xs line-clamp-1">
                  {t(photo.title)}
                </p>

                <div className="flex items-center justify-between gap-1 mt-0.5 text-[11px] text-white/80">
                  {photo.location ? (
                    <span className="inline-flex items-center gap-0.5 truncate">
                      <MapPin className="w-2.5 h-2.5 text-red-400 shrink-0" />
                      <span className="truncate">{t(photo.location)}</span>
                    </span>
                  ) : (
                    <span />
                  )}
                  {photo.date && (
                    <span className="font-mono tabular-nums shrink-0 text-white/70">
                      {photo.date}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
