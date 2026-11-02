import React, { useState } from 'react';
import { Languages, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ThemeToggle } from './ThemeToggle';
import { SiteData } from '../types/site';

interface HeaderProps {
  data: SiteData;
  activeSection: string;
  navItems: { id: string; label: string }[];
  onNavigate: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  data,
  activeSection,
  navItems,
  onNavigate,
}) => {
  const { locale, toggleLocale, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const displayName = locale === 'zh' ? t(data.profile.name) : (data.profile.englishName || t(data.profile.name));

  return (
    <header className="sticky top-0 z-40 w-full border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Left: Brand / Name wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('about');
            }}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            {displayName}
          </a>
        </div>

        {/* Right: Controls (Language, Theme, Mobile Menu) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={locale === 'zh' ? 'Switch to English' : '切换为中文'}
            className="cursor-pointer flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500"
          >
            <Languages className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
            <span className="font-mono">{locale === 'zh' ? 'EN' : '中'}</span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile navigation"
            aria-expanded={mobileMenuOpen}
            className="cursor-pointer lg:hidden p-2 rounded-lg text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer for small screens */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-1 animate-in slide-in-from-top-2 duration-150 shadow-xl">
          <p className="text-[11px] font-mono text-slate-400 dark:text-zinc-500 px-3 py-1 uppercase tracking-wider">
            {locale === 'zh' ? '页面目录' : 'Navigation'}
          </p>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full cursor-pointer flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/60 dark:bg-blue-950/40'
                    : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
