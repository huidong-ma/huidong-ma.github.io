import React from 'react';
import {
  MapPin,
  Mail,
  Github,
  GraduationCap,
  Linkedin,
  Globe,
  FileDown,
  Building,
} from 'lucide-react';
import { SiteData } from '../types/site';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';
import { TiltCard } from './TiltCard';

interface ProfileSidebarProps {
  data: SiteData;
  activeSection: string;
  navItems: { id: string; label: string }[];
  onNavigate: (id: string) => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  data,
  activeSection,
  navItems,
  onNavigate,
}) => {
  const { t, locale } = useLanguage();
  const { profile, socials } = data;

  const initials = locale === 'zh'
    ? t(profile.name).slice(0, 2)
    : (profile.englishName || t(profile.name)).split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <aside className="w-full lg:w-80 xl:w-84 shrink-0 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-5.5rem)] lg:overflow-x-hidden lg:overflow-y-auto custom-scrollbar">
      <div className="space-y-5 pb-6">
        {/* Profile Card with 3D Tilt and interactive spotlight */}
        <TiltCard
          maxTilt={2}
          scale={1.005}
          className="p-6 rounded-2xl border-0 bg-white/80 dark:bg-zinc-900/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_2px_8px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_28px_-4px_rgba(0,0,0,0.45),0_2px_8px_-2px_rgba(0,0,0,0.3)] backdrop-blur-md flex flex-col items-center text-center transition-all hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_36px_-4px_rgba(0,0,0,0.55)]"
        >
          {/* Avatar with square rounded corners, centered */}
          <div className="relative mb-5 group/avatar cursor-default mx-auto">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden ring-2 ring-slate-200/80 dark:ring-zinc-700/80 group-hover/avatar:ring-blue-500/80 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900 shadow-sm transition-all duration-300 group-hover/avatar:scale-105 group-hover/avatar:shadow-md">
              <ImageWithFallback
                src={profile.avatarUrl}
                alt={t(profile.name)}
                fallbackType="avatar"
                initials={initials}
                className="w-full h-full object-cover transition-transform duration-300 group-hover/avatar:scale-105"
              />
            </div>
            {/* Subtle floating aura on hover */}
            <div className="absolute inset-0 rounded-2xl bg-blue-500/10 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Name & Titles - Centered */}
          <div className="w-full flex flex-col items-center text-center">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-center">
              {t(profile.name)}
            </h1>

            {profile.title && (
              <p className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 mt-2 leading-snug text-center">
                {t(profile.title)}
              </p>
            )}

            {profile.affiliation && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600 dark:text-zinc-400 mt-1.5 hover:text-slate-900 dark:hover:text-zinc-200 transition-colors text-center">
                <Building className="w-3.5 h-3.5 shrink-0 text-slate-400 dark:text-zinc-500 group-hover:text-blue-500 transition-colors" />
                <span>{t(profile.affiliation)}</span>
              </div>
            )}

            {profile.location && t(profile.location) && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 mt-1 hover:text-slate-900 dark:hover:text-zinc-200 transition-colors text-center">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400 dark:text-zinc-500 group-hover:text-red-500 transition-colors" />
                <span>{t(profile.location)}</span>
              </div>
            )}
          </div>

          {/* Bio Summary - Centered */}
          {profile.bioSummary && (
            <p className="text-xs text-slate-600 dark:text-zinc-400 mt-4 leading-relaxed border-t border-slate-100 dark:border-zinc-800/80 pt-3 text-center w-full hover:text-slate-800 dark:hover:text-zinc-200 transition-colors">
              {t(profile.bioSummary)}
            </p>
          )}

          {/* CV Action Button */}
          {profile.cvUrl && (
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl text-slate-700 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xs"
            >
              <FileDown className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
              <span>{locale === 'zh' ? '下载个人简历 (CV)' : 'Download CV'}</span>
            </a>
          )}

          {/* Social Links Row - Centered with unified square sizes and blue hover glow */}
          <div className="w-full mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800/80">
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {socials.email && (
                <a
                  href={socials.email.startsWith('mailto:') ? socials.email : `mailto:${socials.email}`}
                  aria-label="Email"
                  title="Email"
                  className="cursor-pointer w-8.5 h-8.5 inline-flex items-center justify-center rounded-lg text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:-translate-y-0.5 hover:scale-110 active:scale-95 transition-all duration-200 shadow-2xs hover:shadow-sm hover:shadow-blue-500/20 shrink-0 select-none"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                </a>
              )}

              {socials.scholar && (
                <a
                  href={socials.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Scholar"
                  title="Google Scholar"
                  className="cursor-pointer w-8.5 h-8.5 inline-flex items-center justify-center rounded-lg text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:-translate-y-0.5 hover:scale-110 active:scale-95 transition-all duration-200 shadow-2xs hover:shadow-sm hover:shadow-blue-500/20 shrink-0 select-none"
                >
                  <GraduationCap className="w-4 h-4 shrink-0" />
                </a>
              )}

              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub"
                  className="cursor-pointer w-8.5 h-8.5 inline-flex items-center justify-center rounded-lg text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:-translate-y-0.5 hover:scale-110 active:scale-95 transition-all duration-200 shadow-2xs hover:shadow-sm hover:shadow-blue-500/20 shrink-0 select-none"
                >
                  <Github className="w-4 h-4 shrink-0" />
                </a>
              )}

              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                  className="cursor-pointer w-8.5 h-8.5 inline-flex items-center justify-center rounded-lg text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:-translate-y-0.5 hover:scale-110 active:scale-95 transition-all duration-200 shadow-2xs hover:shadow-sm hover:shadow-blue-500/20 shrink-0 select-none"
                >
                  <Linkedin className="w-4 h-4 shrink-0" />
                </a>
              )}

              {socials.orcid && (
                <a
                  href={socials.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ORCID Profile"
                  title="ORCID"
                  className="cursor-pointer w-8.5 h-8.5 inline-flex items-center justify-center rounded-lg text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:-translate-y-0.5 hover:scale-110 active:scale-95 transition-all duration-200 shadow-2xs hover:shadow-sm hover:shadow-blue-500/20 shrink-0 select-none"
                >
                  <span className="font-mono text-xs font-bold leading-none select-none">iD</span>
                </a>
              )}

              {socials.researchgate && (
                <a
                  href={socials.researchgate}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ResearchGate Profile"
                  title="ResearchGate"
                  className="cursor-pointer w-8.5 h-8.5 inline-flex items-center justify-center rounded-lg text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:-translate-y-0.5 hover:scale-110 active:scale-95 transition-all duration-200 shadow-2xs hover:shadow-sm hover:shadow-blue-500/20 shrink-0 select-none"
                >
                  <span className="font-mono text-xs font-bold leading-none select-none">RG</span>
                </a>
              )}

              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter Profile"
                  title="X (Twitter)"
                  className="cursor-pointer w-8.5 h-8.5 inline-flex items-center justify-center rounded-lg text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:-translate-y-0.5 hover:scale-110 active:scale-95 transition-all duration-200 shadow-2xs hover:shadow-sm hover:shadow-blue-500/20 shrink-0 select-none"
                >
                  <span className="font-bold text-xs leading-none select-none">𝕏</span>
                </a>
              )}

              {socials.blog && (
                <a
                  href={socials.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Personal Blog"
                  title="Blog"
                  className="cursor-pointer w-8.5 h-8.5 inline-flex items-center justify-center rounded-lg text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:-translate-y-0.5 hover:scale-110 active:scale-95 transition-all duration-200 shadow-2xs hover:shadow-sm hover:shadow-blue-500/20 shrink-0 select-none"
                >
                  <Globe className="w-4 h-4 shrink-0" />
                </a>
              )}
            </div>
          </div>
        </TiltCard>

        {/* Desktop Table of Contents (TOC) with interactive hover */}
        <div className="hidden lg:block p-5 rounded-2xl border-0 bg-white/80 dark:bg-zinc-900/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_2px_8px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_28px_-4px_rgba(0,0,0,0.45),0_2px_8px_-2px_rgba(0,0,0,0.3)] backdrop-blur-md">
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-3 text-center">
            {locale === 'zh' ? '目录导航' : 'Contents'}
          </p>
          <nav aria-label="Sidebar Table of Contents" className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`cursor-pointer w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition-all duration-200 text-left select-none ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/80 dark:bg-blue-950/50 translate-x-1 shadow-2xs'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100/70 dark:hover:bg-zinc-800/60 hover:translate-x-1'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 ml-2 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};
