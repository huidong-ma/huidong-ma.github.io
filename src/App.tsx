import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { siteData } from './data/siteData';
import { Header } from './components/Header';
import { ProfileSidebar } from './components/ProfileSidebar';
import { Section } from './components/Section';
import { MarkdownRenderer } from './components/MarkdownRenderer';
import { ResearchInterests } from './components/ResearchInterests';
import { NewsTimeline } from './components/NewsTimeline';
import { EducationList } from './components/EducationList';
import { ExperienceList } from './components/ExperienceList';
import { ProjectList } from './components/ProjectList';
import { PublicationList } from './components/PublicationList';
import { HonorsList } from './components/HonorsList';
import { ServiceList } from './components/ServiceList';
import { Gallery } from './components/Gallery';
import { MusicSection } from './components/MusicSection';
import { InteractiveBackground } from './components/InteractiveBackground';
import { ScrollReveal } from './components/ScrollReveal';
import { ArrowUp } from 'lucide-react';

const MainContent: React.FC = () => {
  const { t, locale } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('about');

  // Helper to check whether a section is enabled and has content
  const isSectionVisible = useCallback((key: 'about' | 'interests' | 'news' | 'education' | 'experience' | 'projects' | 'publications' | 'honors' | 'services' | 'gallery' | 'music', hasContent: boolean): boolean => {
    if (siteData.enabledSections && siteData.enabledSections[key] !== undefined) {
      return Boolean(siteData.enabledSections[key] && hasContent);
    }
    return hasContent;
  }, []);

  // Compute available navigation items dynamically based on visibility switches and data
  const navItems = useMemo(() => {
    const items: { id: string; label: string }[] = [];

    // 1. About
    if (isSectionVisible('about', Boolean(siteData.profile.detailedBio))) {
      items.push({
        id: 'about',
        label: locale === 'zh' ? '关于我' : 'About',
      });
    }

    // 2. Research Interests
    if (isSectionVisible('interests', Boolean(siteData.researchInterests && siteData.researchInterests.length > 0))) {
      items.push({
        id: 'interests',
        label: locale === 'zh' ? '研究兴趣' : 'Interests',
      });
    }

    // 3. News
    if (isSectionVisible('news', Boolean(siteData.news && siteData.news.length > 0))) {
      items.push({
        id: 'news',
        label: locale === 'zh' ? '最新动态' : 'News',
      });
    }

    // 4. Education
    if (isSectionVisible('education', Boolean(siteData.education && siteData.education.length > 0))) {
      items.push({
        id: 'education',
        label: locale === 'zh' ? '教育背景' : 'Education',
      });
    }

    // 5. Experience
    if (isSectionVisible('experience', Boolean(siteData.experience && siteData.experience.length > 0))) {
      items.push({
        id: 'experience',
        label: locale === 'zh' ? '工作经历' : 'Experience',
      });
    }

    // 6. Projects
    if (isSectionVisible('projects', Boolean(siteData.projects && siteData.projects.length > 0))) {
      items.push({
        id: 'projects',
        label: locale === 'zh' ? '项目经历' : 'Projects',
      });
    }

    // 7. Publications
    if (isSectionVisible('publications', Boolean(siteData.publications && siteData.publications.length > 0))) {
      items.push({
        id: 'publications',
        label: locale === 'zh' ? '论文与作品' : 'Publications',
      });
    }

    // 8. Honors
    if (isSectionVisible('honors', Boolean(siteData.honors && siteData.honors.length > 0))) {
      items.push({
        id: 'honors',
        label: locale === 'zh' ? '荣誉奖项' : 'Honors',
      });
    }

    // 9. Service
    if (isSectionVisible('services', Boolean(siteData.services && siteData.services.length > 0))) {
      items.push({
        id: 'services',
        label: locale === 'zh' ? '专业服务' : 'Service',
      });
    }

    // 10. Gallery
    if (isSectionVisible('gallery', Boolean((siteData.albums && siteData.albums.length > 0) || (siteData.gallery && siteData.gallery.length > 0)))) {
      items.push({
        id: 'gallery',
        label: locale === 'zh' ? '相册足迹' : 'Gallery',
      });
    }

    // 11. Music
    if (isSectionVisible('music', Boolean(siteData.music && siteData.music.length > 0))) {
      items.push({
        id: 'music',
        label: locale === 'zh' ? '音乐天地' : 'Music',
      });
    }

    return items;
  }, [locale, isSectionVisible]);

  // Set up IntersectionObserver to update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollPosition) {
          setActiveSection(sec.id);
          return;
        }
      }
      if (sections.length > 0) {
        setActiveSection(sections[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = useCallback((id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-blue-500/20 selection:text-blue-600 dark:selection:text-blue-400">
      {/* Interactive Particle Network, Mouse Halo & Scroll Parallax Canvas (Permanently Active) */}
      <InteractiveBackground enabled={true} />

      {/* Top Header Bar */}
      <Header
        data={siteData}
        activeSection={activeSection}
        navItems={navItems}
        onNavigate={scrollToSection}
      />

      {/* Main Content Layout Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-16 z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left Column: Fixed/Sticky Profile Sidebar */}
          <ProfileSidebar
            data={siteData}
            activeSection={activeSection}
            navItems={navItems}
            onNavigate={scrollToSection}
          />

          {/* Right Column: Structured Vertical Content Area */}
          <div className="flex-1 w-full min-w-0 space-y-2">
            {/* 1. About Me */}
            {isSectionVisible('about', Boolean(siteData.profile.detailedBio)) && (
              <ScrollReveal>
                <Section id="about" title={locale === 'zh' ? '关于我' : 'About Me'}>
                  <div className="p-5 sm:p-6 rounded-2xl border-0 bg-white/80 dark:bg-zinc-900/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_2px_8px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_28px_-4px_rgba(0,0,0,0.45),0_2px_8px_-2px_rgba(0,0,0,0.3)] backdrop-blur-md transition-shadow hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.09)] dark:hover:shadow-[0_8px_36px_-4px_rgba(0,0,0,0.55)]">
                    <MarkdownRenderer content={t(siteData.profile.detailedBio)} />
                  </div>
                </Section>
              </ScrollReveal>
            )}

            {/* 2. Research Interests */}
            {isSectionVisible('interests', Boolean(siteData.researchInterests && siteData.researchInterests.length > 0)) && (
              <ScrollReveal delay={0.05}>
                <Section
                  id="interests"
                  title={locale === 'zh' ? '研究兴趣与方向' : 'Research Interests'}
                >
                  <ResearchInterests interests={siteData.researchInterests!} />
                </Section>
              </ScrollReveal>
            )}

            {/* 3. News & Updates */}
            {isSectionVisible('news', Boolean(siteData.news && siteData.news.length > 0)) && (
              <ScrollReveal delay={0.05}>
                <Section
                  id="news"
                  title={locale === 'zh' ? '最新动态' : 'Recent News'}
                  count={siteData.news!.length}
                >
                  <NewsTimeline news={siteData.news!} />
                </Section>
              </ScrollReveal>
            )}

            {/* 4. Education */}
            {isSectionVisible('education', Boolean(siteData.education && siteData.education.length > 0)) && (
              <ScrollReveal delay={0.05}>
                <Section
                  id="education"
                  title={locale === 'zh' ? '教育背景' : 'Education'}
                >
                  <EducationList education={siteData.education!} />
                </Section>
              </ScrollReveal>
            )}

            {/* 5. Experience */}
            {isSectionVisible('experience', Boolean(siteData.experience && siteData.experience.length > 0)) && (
              <ScrollReveal delay={0.05}>
                <Section
                  id="experience"
                  title={locale === 'zh' ? '工作与学术经历' : 'Experience'}
                >
                  <ExperienceList experience={siteData.experience!} />
                </Section>
              </ScrollReveal>
            )}

            {/* 6. Projects */}
            {isSectionVisible('projects', Boolean(siteData.projects && siteData.projects.length > 0)) && (
              <ScrollReveal delay={0.05}>
                <Section
                  id="projects"
                  title={locale === 'zh' ? '精选项目' : 'Selected Projects'}
                  count={siteData.projects!.length}
                >
                  <ProjectList projects={siteData.projects!} />
                </Section>
              </ScrollReveal>
            )}

            {/* 7. Publications */}
            {isSectionVisible('publications', Boolean(siteData.publications && siteData.publications.length > 0)) && (
              <ScrollReveal delay={0.05}>
                <Section
                  id="publications"
                  title={locale === 'zh' ? '代表性论文与出版物' : 'Publications'}
                  count={siteData.publications!.length}
                >
                  <PublicationList
                    publications={siteData.publications!}
                    userName={t(siteData.profile.name)}
                    userEnglishName={siteData.profile.englishName}
                  />
                </Section>
              </ScrollReveal>
            )}

            {/* 8. Honors & Awards */}
            {isSectionVisible('honors', Boolean(siteData.honors && siteData.honors.length > 0)) && (
              <ScrollReveal delay={0.05}>
                <Section
                  id="honors"
                  title={locale === 'zh' ? '荣誉与奖项' : 'Honors & Awards'}
                  count={siteData.honors!.length}
                >
                  <HonorsList honors={siteData.honors!} />
                </Section>
              </ScrollReveal>
            )}

            {/* 9. Professional Services */}
            {isSectionVisible('services', Boolean(siteData.services && siteData.services.length > 0)) && (
              <ScrollReveal delay={0.05}>
                <Section
                  id="services"
                  title={locale === 'zh' ? '专业服务与兼职' : 'Professional Service'}
                >
                  <ServiceList services={siteData.services!} />
                </Section>
              </ScrollReveal>
            )}

            {/* 10. Gallery */}
            {isSectionVisible('gallery', Boolean((siteData.albums && siteData.albums.length > 0) || (siteData.gallery && siteData.gallery.length > 0))) && (
              <ScrollReveal delay={0.05}>
                <Section
                  id="gallery"
                  title={locale === 'zh' ? '相册足迹' : 'Gallery & Moments'}
                  count={siteData.albums ? siteData.albums.length : (siteData.gallery ? siteData.gallery.length : 0)}
                >
                  <Gallery albums={siteData.albums} items={siteData.gallery} />
                </Section>
              </ScrollReveal>
            )}

            {/* 11. Music & Audio */}
            {isSectionVisible('music', Boolean(siteData.music && siteData.music.length > 0)) && (
              <ScrollReveal delay={0.05}>
                <Section
                  id="music"
                  title={locale === 'zh' ? '音乐天地与原声' : 'Music & Audio'}
                  count={siteData.music!.length}
                >
                  <MusicSection tracks={siteData.music!} />
                </Section>
              </ScrollReveal>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-0 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_-4px_24px_-4px_rgba(0,0,0,0.4)] py-8 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xs text-xs text-slate-500 dark:text-zinc-500 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} {t(siteData.profile.name)}.</span>
            <span>{locale === 'zh' ? '保留所有权利。' : 'All rights reserved.'}</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>{locale === 'zh' ? '最后更新于 2026年10月' : 'Last updated: Oct 2026'}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{locale === 'zh' ? '回到顶部' : 'Back to top'}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
