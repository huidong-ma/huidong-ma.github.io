import React from 'react';
import { ExternalLink, Github, Monitor } from 'lucide-react';
import { ProjectItem } from '../types/site';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';
import { TiltCard } from './TiltCard';

interface ProjectListProps {
  projects: ProjectItem[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const { t, locale } = useLanguage();

  if (!projects || projects.length === 0) return null;

  return (
    <div className="space-y-6">
      {projects.map((project) => {
        const hasImage = Boolean(project.imageUrl && project.imageUrl.trim().length > 0);

        return (
          <TiltCard
            key={project.id}
            maxTilt={2.5}
            scale={1.01}
            className="p-5 rounded-xl border-0 bg-white/80 dark:bg-zinc-900/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06),0_2px_6px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.45),0_2px_6px_-2px_rgba(0,0,0,0.3)] transition-all hover:shadow-[0_8px_28px_-4px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.55)] cursor-default"
          >
            <div className={`flex flex-col ${hasImage ? 'md:flex-row gap-5' : 'gap-3'}`}>
              {/* Optional Project Thumbnail with zoom on card hover */}
              {hasImage && (
                <div className="shrink-0 w-full md:w-52 h-34 rounded-lg overflow-hidden border-0 shadow-xs bg-slate-100 dark:bg-zinc-800 relative">
                  <ImageWithFallback
                    src={project.imageUrl}
                    alt={t(project.title)}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300" />
                </div>
              )}

              {/* Project Body */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {t(project.title)}
                  </h3>
                  {project.period && (
                    <span className="text-xs font-mono tabular-nums text-slate-400 dark:text-zinc-500 shrink-0 group-hover:text-slate-600 dark:group-hover:text-zinc-300 transition-colors">
                      {project.period}
                    </span>
                  )}
                </div>

                {project.subtitle && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
                    {t(project.subtitle)}
                  </p>
                )}

                {project.collaborators && (
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    {t(project.collaborators)}
                  </p>
                )}

                <p className="text-sm text-slate-600 dark:text-zinc-300 mt-2 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-zinc-200 transition-colors">
                  {t(project.description)}
                </p>

                {/* Tags rendered with individual interactive hover states */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 dark:text-zinc-500 mt-3 font-mono">
                    {project.tags.map((tag, idx) => (
                      <React.Fragment key={tag}>
                        {idx > 0 && <span aria-hidden="true" className="text-slate-300 dark:text-zinc-700">/</span>}
                        <span className="hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 inline-block transition-transform cursor-pointer">
                          {tag}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* Links: transparent by default, subtle hover background */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 dark:text-zinc-400 bg-transparent hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150 active:scale-95 select-none"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{locale === 'zh' ? '项目主页' : 'Project Page'}</span>
                    </a>
                  )}

                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 dark:text-zinc-400 bg-transparent hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150 active:scale-95 select-none"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>{locale === 'zh' ? '源代码' : 'Source Code'}</span>
                    </a>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 dark:text-zinc-400 bg-transparent hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150 active:scale-95 select-none"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>{locale === 'zh' ? '在线演示' : 'Live Demo'}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </TiltCard>
        );
      })}
    </div>
  );
};
