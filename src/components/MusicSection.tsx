import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Repeat, Repeat1, Shuffle, Disc } from 'lucide-react';
import { MusicTrack, LocalizedText } from '../types/site';
import { useLanguage } from '../context/LanguageContext';

interface MusicSectionProps {
  tracks: MusicTrack[];
}

type PlayMode = 'all' | 'one' | 'shuffle';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Fixed text helper: Keeps song title, artist, and album permanently fixed (never changes on locale switch)
function getFixedText(value?: string | LocalizedText): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  // If it's a localized object, keep it consistent without changing across locales
  return value.zh || value.en || '';
}

export const MusicSection: React.FC<MusicSectionProps> = ({ tracks }) => {
  const { locale } = useLanguage();
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playMode, setPlayMode] = useState<PlayMode>('all');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeIndex = tracks.findIndex((tr) => tr.id === activeTrackId);
  const activeTrack = tracks[activeIndex] || null;

  // Single button mode cycle: all -> one -> shuffle -> all
  const cycleMode = () => {
    setPlayMode((prev) => {
      if (prev === 'all') return 'one';
      if (prev === 'one') return 'shuffle';
      return 'all';
    });
  };

  // Play next track according to playMode
  const playNext = (manual = false) => {
    if (tracks.length === 0) return;

    if (!manual && playMode === 'one' && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      return;
    }

    let nextIdx = 0;
    if (playMode === 'shuffle' && tracks.length > 1) {
      do {
        nextIdx = Math.floor(Math.random() * tracks.length);
      } while (nextIdx === activeIndex);
    } else {
      nextIdx = (activeIndex + 1) % tracks.length;
    }

    const nextTrack = tracks[nextIdx];
    if (nextTrack) {
      setActiveTrackId(nextTrack.id);
      if (audioRef.current) {
        audioRef.current.src = nextTrack.audioUrl;
        audioRef.current.load();
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => playNext(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [activeIndex, playMode, tracks]);

  // Master Play button in the top header
  const handleHeaderPlay = () => {
    const audio = audioRef.current;
    if (!audio || tracks.length === 0) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (activeTrack) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      let targetIdx = 0;
      if (playMode === 'shuffle' && tracks.length > 1) {
        targetIdx = Math.floor(Math.random() * tracks.length);
      }
      const targetTrack = tracks[targetIdx];
      setActiveTrackId(targetTrack.id);
      audio.src = targetTrack.audioUrl;
      audio.load();
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTogglePlay = (track: MusicTrack) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (activeTrackId === track.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      setActiveTrackId(track.id);
      audio.src = track.audioUrl;
      audio.load();
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>, trackId: string) => {
    e.stopPropagation();
    if (activeTrackId !== trackId || !audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = pct * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!tracks || tracks.length === 0) return null;

  return (
    <div className="w-full">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Unified Music Card Container with Soft Dimensional Shadow */}
      <div className="rounded-2xl border-0 bg-white/80 dark:bg-zinc-900/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_2px_8px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_28px_-4px_rgba(0,0,0,0.45),0_2px_8px_-2px_rgba(0,0,0,0.3)] backdrop-blur-md overflow-hidden transition-shadow hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.09)] dark:hover:shadow-[0_8px_36px_-4px_rgba(0,0,0,0.55)]">
        {/* TOP HEADER MODULE: Left Play Button & Right Mode Switch Button */}
        <div className="px-4 sm:px-5 py-3 border-b border-slate-100 dark:border-zinc-800/80 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-zinc-900/50">
          {/* Left: Play button that plays the list according to current mode */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={handleHeaderPlay}
              aria-label={isPlaying ? 'Pause playback' : 'Play all tracks'}
              className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 dark:text-zinc-400 bg-transparent hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150 active:scale-95 select-none"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">{locale === 'zh' ? '暂停播放' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 ml-0.5" />
                  <span>{locale === 'zh' ? '播放全部' : 'Play All'}</span>
                </>
              )}
            </button>

            {/* Currently playing snippet (if active) */}
            {activeTrack && isPlaying && (
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium truncate hidden sm:inline">
                {getFixedText(activeTrack.title)}
              </span>
            )}
          </div>

          {/* Right: Single Mode Button that cycles through (全部循环 -> 单曲循环 -> 随机播放) */}
          <button
            type="button"
            onClick={cycleMode}
            title={locale === 'zh' ? '点击切换播放模式 (全部循环 / 单曲循环 / 随机播放)' : 'Click to cycle playback mode'}
            className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 dark:text-zinc-400 bg-transparent hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150 active:scale-95 select-none shrink-0"
          >
            {playMode === 'all' && (
              <>
                <Repeat className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{locale === 'zh' ? '全部循环' : 'Repeat All'}</span>
              </>
            )}
            {playMode === 'one' && (
              <>
                <Repeat1 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{locale === 'zh' ? '单曲循环' : 'Repeat One'}</span>
              </>
            )}
            {playMode === 'shuffle' && (
              <>
                <Shuffle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{locale === 'zh' ? '随机播放' : 'Shuffle'}</span>
              </>
            )}
          </button>
        </div>

        {/* SONGS LIST: Tightly stacked rows with smooth hover animations */}
        <div className="divide-y divide-slate-100 dark:divide-zinc-800/60">
          {tracks.map((track) => {
            const isCurrent = activeTrackId === track.id;
            const isCurrentPlaying = isCurrent && isPlaying;
            const progressPct = isCurrent && duration > 0 ? (currentTime / duration) * 100 : 0;
            const title = getFixedText(track.title);
            const artist = getFixedText(track.artist);
            const album = getFixedText(track.album);

            return (
              <div
                key={track.id}
                onClick={() => handleTogglePlay(track)}
                className={`group relative flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 transition-all duration-200 ease-out cursor-pointer select-none ${
                  isCurrent
                    ? 'bg-blue-50/50 dark:bg-blue-950/25'
                    : 'hover:bg-slate-50/90 dark:hover:bg-zinc-800/40 hover:pl-6'
                }`}
              >
                {/* Glowing Left Accent on Hover / Playing */}
                <div
                  className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-blue-500 transition-opacity duration-200 ${
                    isCurrentPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />

                {/* Left: Play button in front, Song Title, Artist & Album */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* Front Play Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePlay(track);
                    }}
                    aria-label={isCurrentPlaying ? `Pause ${title}` : `Play ${title}`}
                    className={`cursor-pointer w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-150 active:scale-95 select-none ${
                      isCurrentPlaying
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/60 hover:bg-slate-100 dark:hover:bg-zinc-800'
                        : 'bg-transparent text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 group-hover:scale-105'
                    }`}
                  >
                    {isCurrentPlaying ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    )}
                  </button>

                  {/* Details: Only Song Title, Artist Name, and Album Name (Fixed text) */}
                  <div className="min-w-0 flex-1">
                    {/* Song Title & Equalizer Wave */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-semibold tracking-tight truncate transition-colors ${
                          isCurrent
                            ? 'text-blue-600 dark:text-blue-400 font-bold'
                            : 'text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        }`}
                      >
                        {title}
                      </span>

                      {/* Micro Equalizer when playing */}
                      {isCurrentPlaying && (
                        <span className="flex items-end gap-0.5 h-3 shrink-0" aria-hidden="true">
                          <span className="w-0.5 h-full bg-blue-500 animate-[bounce_0.6s_ease-in-out_infinite]" />
                          <span className="w-0.5 h-2 bg-blue-500 animate-[bounce_0.8s_ease-in-out_infinite]" />
                          <span className="w-0.5 h-2.5 bg-blue-500 animate-[bounce_0.7s_ease-in-out_infinite]" />
                        </span>
                      )}
                    </div>

                    {/* Artist & Album */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 mt-0.5 truncate">
                      <span className="truncate group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
                        {artist}
                      </span>

                      {album && (
                        <>
                          <span className="text-slate-300 dark:text-zinc-600 select-none">·</span>
                          <span className="inline-flex items-center gap-1 text-slate-400 dark:text-zinc-500 truncate group-hover:text-slate-600 dark:group-hover:text-zinc-400 transition-colors">
                            <Disc className="w-3 h-3 shrink-0 opacity-70" />
                            <span className="truncate">{album}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Duration Only (No trailing buttons) */}
                <div className="shrink-0 text-right">
                  <span className="text-xs font-mono tabular-nums text-slate-400 dark:text-zinc-500 group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors">
                    {isCurrent && isPlaying
                      ? `${formatTime(currentTime)} / ${formatTime(duration || 0)}`
                      : track.duration || '--:--'}
                  </span>
                </div>

                {/* Active Playing Row Progress Bar */}
                {isCurrent && (
                  <div
                    onClick={(e) => handleSeek(e, track.id)}
                    title="Click to seek"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-100 dark:bg-blue-950/80 cursor-pointer"
                  >
                    <div
                      className="h-full bg-blue-500 transition-all duration-100 ease-linear"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
