import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { locale } = useLanguage();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? locale === 'zh'
            ? '当前为暗色模式，点击切换为浅色模式'
            : 'Dark mode active, click to switch to Light mode'
          : locale === 'zh'
          ? '当前为浅色模式，点击切换为暗色模式'
          : 'Light mode active, click to switch to Dark mode'
      }
      title={
        isDark
          ? locale === 'zh'
            ? '暗色模式 (点击切换为浅色)'
            : 'Dark Theme (Click for Light)'
          : locale === 'zh'
          ? '浅色模式 (点击切换为暗色)'
          : 'Light Theme (Click for Dark)'
      }
      className="p-2 rounded-lg text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-500"
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-blue-400 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 rotate-0 hover:rotate-45" />
      )}
    </button>
  );
};
