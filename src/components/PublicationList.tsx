import React, { useState } from 'react';
import { FileText, FileDown, Github, Quote, Award } from 'lucide-react';
import { PublicationItem } from '../types/site';
import { useLanguage } from '../context/LanguageContext';
import { BibtexModal } from './BibtexModal';
import { AbstractModal } from './AbstractModal';
import { TiltCard } from './TiltCard';

interface PublicationListProps {
  publications: PublicationItem[];
  userName?: string;
  userEnglishName?: string;
}

// Built-in dictionary of well-known academic conferences and journals
const VENUE_FULL_NAMES: Record<string, string> = {
  NeurIPS: 'Advances in Neural Information Processing Systems',
  NIPS: 'Advances in Neural Information Processing Systems',
  ICLR: 'International Conference on Learning Representations',
  ICML: 'International Conference on Machine Learning',
  CVPR: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition',
  ICCV: 'IEEE/CVF International Conference on Computer Vision',
  ECCV: 'European Conference on Computer Vision',
  ACL: 'Association for Computational Linguistics',
  EMNLP: 'Conference on Empirical Methods in Natural Language Processing',
  NAACL: 'North American Chapter of the Association for Computational Linguistics',
  COLING: 'International Conference on Computational Linguistics',
  AAAI: 'AAAI Conference on Artificial Intelligence',
  IJCAI: 'International Joint Conference on Artificial Intelligence',
  KDD: 'ACM SIGKDD Conference on Knowledge Discovery and Data Mining',
  SIGMOD: 'ACM SIGMOD International Conference on Management of Data',
  VLDB: 'International Conference on Very Large Data Bases',
  ICDE: 'IEEE International Conference on Data Engineering',
  WWW: 'The Web Conference (World Wide Web)',
  SIGIR: 'ACM SIGIR Conference on Research and Development in Information Retrieval',
  CIKM: 'ACM International Conference on Information and Knowledge Management',
  WSDM: 'ACM International Conference on Web Search and Data Mining',
  OSDI: 'USENIX Symposium on Operating Systems Design and Implementation',
  SOSP: 'ACM Symposium on Operating Systems Principles',
  NSDI: 'USENIX Symposium on Networked Systems Design and Implementation',
  USENIX: 'USENIX Annual Technical Conference',
  ATC: 'USENIX Annual Technical Conference',
  EuroSys: 'European Conference on Computer Systems',
  FAST: 'USENIX Conference on File and Storage Technologies',
  ISCA: 'ACM/IEEE International Symposium on Computer Architecture',
  MICRO: 'IEEE/ACM International Symposium on Microarchitecture',
  HPCA: 'IEEE International Symposium on High-Performance Computer Architecture',
  ASPLOS: 'ACM International Conference on Architectural Support for Programming Languages and Operating Systems',
  SIGCOMM: 'ACM Special Interest Group on Data Communication',
  INFOCOM: 'IEEE International Conference on Computer Communications',
  MobiCom: 'ACM International Conference on Mobile Computing and Networking',
  CCS: 'ACM Conference on Computer and Communications Security',
  'IEEE S&P': 'IEEE Symposium on Security and Privacy',
  NDSS: 'Network and Distributed System Security Symposium',
  'IEEE TC': 'IEEE Transactions on Computers',
  'IEEE TPAMI': 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
  'IEEE TIP': 'IEEE Transactions on Image Processing',
  'IEEE TIT': 'IEEE Transactions on Information Theory',
  'IEEE TSP': 'IEEE Transactions on Signal Processing',
  'IEEE TNNLS': 'IEEE Transactions on Neural Networks and Learning Systems',
  'IEEE TKDE': 'IEEE Transactions on Knowledge and Data Engineering',
  'IEEE TDSC': 'IEEE Transactions on Dependable and Secure Computing',
  'IEEE TIFS': 'IEEE Transactions on Information Forensics and Security',
  'ACM TOG': 'ACM Transactions on Graphics',
  'ACM TODS': 'ACM Transactions on Database Systems',
  'ACM TOCS': 'ACM Transactions on Computer Systems',
  SIGGRAPH: 'ACM SIGGRAPH Conference on Computer Graphics and Interactive Techniques',
};

// Helper to resolve the full venue title from custom input or dictionary
const resolveVenueFullName = (venueAbbr: string, customFullName?: string): string => {
  if (customFullName && customFullName.trim()) return customFullName.trim();
  if (!venueAbbr) return '';
  for (const [key, fullName] of Object.entries(VENUE_FULL_NAMES)) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped}([^a-zA-Z0-9]|$)`, 'i');
    if (regex.test(venueAbbr)) {
      return fullName;
    }
  }
  return '';
};

export const PublicationList: React.FC<PublicationListProps> = ({
  publications,
  userName = '[你的姓名]',
  userEnglishName = '[Your Name]',
}) => {
  const { t, locale } = useLanguage();
  const [activeBibtex, setActiveBibtex] = useState<{ title: string; bibtex: string } | null>(null);
  const [activeAbstract, setActiveAbstract] = useState<{ title: string; abstract: string } | null>(null);

  if (!publications || publications.length === 0) return null;

  // Check if an author string corresponds to the website owner
  const normalizeAuthorName = (name: string): string =>
    name.replace(/[†‡*\[\]]/g, '').trim().replace(/\s+/g, ' ').toLowerCase();

  const isUserAuthor = (author: string): boolean => {
    const cleanAuthor = normalizeAuthorName(author);
    return [userName, userEnglishName].some((name) => {
      const cleanName = normalizeAuthorName(name);
      return cleanName.length > 0 && cleanAuthor === cleanName;
    });
  };

  // Ensure title, venue, and awards are always in English regardless of site language setting
  const getEnglishText = (val: string | { zh: string; en: string } | undefined): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val.en || val.zh || '';
  };

  // Transparent button style: no default background, former background on hover, compact spacing
  const actionBtnClass =
    'cursor-pointer inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium text-slate-600 dark:text-zinc-400 bg-transparent hover:bg-slate-100 dark:hover:bg-zinc-800/90 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150 active:scale-95 select-none';

  return (
    <>
      <div className="space-y-3.5">
        {publications.map((pub) => {
          const title = getEnglishText(pub.title);
          const venue = getEnglishText(pub.venue);
          const award = getEnglishText(pub.award);
          const venueFullName = resolveVenueFullName(venue, pub.venueFullName);

          return (
            <TiltCard
              key={title}
              maxTilt={2}
              scale={1.006}
              className="p-4 sm:p-4.5 rounded-xl border-0 transition-all cursor-default bg-white/80 dark:bg-zinc-900/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06),0_2px_6px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.45),0_2px_6px_-2px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_28px_-4px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.55)]"
            >
              {/* LINE 1: Title (Always English) */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[15px] sm:text-base font-bold text-slate-900 dark:text-zinc-100 leading-snug tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {title}
                </h3>
              </div>

              {/* LINE 2: Authors (Always English, Owner Highlighted) */}
              <div className="text-xs sm:text-[13px] text-slate-600 dark:text-zinc-300 mt-1.5 leading-relaxed">
                {pub.authors.map((author, index) => {
                  const isCurrent = isUserAuthor(author);
                  const trimmedAuthor = author.trim();
                  const authorName = trimmedAuthor.replace(/[†‡*]+$/, '').trimEnd();
                  const authorMarkers = trimmedAuthor.match(/[†‡*]+$/)?.[0];
                  return (
                    <React.Fragment key={index}>
                      {index > 0 && <span className="mr-1.5 text-slate-400">,</span>}
                      <span
                        className={`inline-block whitespace-nowrap transition-colors cursor-text ${
                          isCurrent
                            ? 'font-semibold text-slate-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400'
                            : 'hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <span className={isCurrent ? 'underline decoration-blue-500/80 underline-offset-2' : undefined}>
                          {authorName}
                        </span>
                        {authorMarkers && (
                          <sup className="ml-px text-[0.75em] leading-none">{authorMarkers}</sup>
                        )}
                      </span>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* LINE 3: Compact height, Left is Venue & Academic Badges, Right is Action Buttons */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-h-7">
                {/* Left: Abbreviated Venue & Academic Metric Badges (CCF, CAS Tier, IF, Award) */}
                <div className="flex items-center flex-wrap gap-1.5 text-xs font-medium text-slate-700 dark:text-zinc-300">
                  {/* Venue (always English abbreviation) with Full Name Tooltip on hover */}
                  <div className="relative group/venue inline-flex items-center">
                    <span
                      title={venueFullName || venue}
                      className={`font-bold text-slate-900 dark:text-zinc-100 group-hover:text-blue-600/90 dark:group-hover:text-blue-400/90 transition-colors ${
                        venueFullName
                          ? 'cursor-help'
                          : 'cursor-default'
                      }`}
                    >
                      {venue}
                    </span>

                    {/* Floating Full Name Tooltip */}
                    {venueFullName && (
                      <div
                        role="tooltip"
                        className="absolute bottom-full left-0 sm:left-1/2 sm:-translate-x-1/2 mb-2 hidden group-hover/venue:flex flex-col items-center pointer-events-none z-50 transition-all duration-200"
                      >
                        <div className="bg-slate-900/95 dark:bg-zinc-800/95 text-white dark:text-zinc-100 text-xs font-normal leading-snug px-3 py-1.5 rounded-lg shadow-xl shadow-black/25 backdrop-blur-md whitespace-normal min-w-44 max-w-xs sm:max-w-sm text-center border border-slate-700/60 dark:border-zinc-700/80">
                          <div className="text-[10px] font-bold tracking-wider uppercase text-blue-400 dark:text-blue-300 mb-0.5">
                            Full Name
                          </div>
                          <div className="font-medium text-slate-100 dark:text-zinc-200 text-xs">
                            {venueFullName}
                          </div>
                        </div>
                        {/* Downward triangle caret pointing directly to the abbreviation */}
                        <div className="w-2 h-2 bg-slate-900/95 dark:bg-zinc-800/95 rotate-45 -mt-1 border-r border-b border-slate-700/60 dark:border-zinc-700/80 shadow-sm"></div>
                      </div>
                    )}
                  </div>

                  {/* 1. CCF Recommendation Class (e.g. CCF-A) - 无中文翻译 */}
                  {pub.ccf && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold font-mono tracking-tight bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-0 shadow-2xs not-italic select-none">
                      {pub.ccf}
                    </span>
                  )}

                  {/* 2. CAS Division / Tier (中科院分区) - 唯一支持中英文对照翻译 */}
                  {pub.casTier && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-0 shadow-2xs not-italic select-none">
                      {t(pub.casTier)}
                    </span>
                  )}

                  {/* 3. JCR Partition (JCR分区, e.g. JCR Q1) - 无中文翻译 */}
                  {pub.jcr && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-0 shadow-2xs not-italic select-none">
                      {pub.jcr.startsWith('JCR') ? pub.jcr : `JCR ${pub.jcr.trim()}`}
                    </span>
                  )}

                  {/* 4. Impact Factor (影响因子, 统一 IF 前缀) - 无中文翻译 */}
                  {pub.impactFactor !== undefined && pub.impactFactor !== null && pub.impactFactor !== '' && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-0 shadow-2xs not-italic select-none">
                      {(() => {
                        const raw =
                          typeof pub.impactFactor === 'object' && pub.impactFactor !== null
                            ? (pub.impactFactor.en || pub.impactFactor.zh || '')
                            : String(pub.impactFactor);
                        const cleaned = raw.replace(/^(影响因子|Impact Factor|IF)[:\s]*/i, '').trim();
                        return cleaned ? `IF ${cleaned}` : raw;
                      })()}
                    </span>
                  )}

                  {/* Custom Evaluation Tags */}
                  {pub.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-0 shadow-2xs not-italic select-none"
                    >
                      {typeof tag === 'string' ? tag : t(tag)}
                    </span>
                  ))}

                  {/* Award Badge (e.g. Best Paper) */}
                  {award && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded border-0 shadow-2xs not-italic select-none">
                      <Award className="w-3 h-3 shrink-0" />
                      <span>{award}</span>
                    </span>
                  )}
                </div>

                {/* Right: Buttons: Abstract (摘要), Paper (论文), Code (代码), BibTeX (引用) */}
                <div className="flex items-center flex-wrap gap-0.5 sm:gap-1 shrink-0">
                  {/* 1. Abstract / 摘要 */}
                  {pub.abstract && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveAbstract({
                          title,
                          abstract: pub.abstract!,
                        })
                      }
                      aria-label="View and copy abstract"
                      className={actionBtnClass}
                    >
                      <FileText className="w-3 h-3" />
                      <span>{locale === 'zh' ? '摘要' : 'Abstract'}</span>
                    </button>
                  )}

                  {/* 2. Paper / 论文 */}
                  {pub.paperUrl && (
                    <a
                      href={pub.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Download or read paper"
                      className={actionBtnClass}
                    >
                      <FileDown className="w-3 h-3" />
                      <span>{locale === 'zh' ? '论文' : 'Paper'}</span>
                    </a>
                  )}

                  {/* 3. Code / 代码 */}
                  {pub.codeUrl && (
                    <a
                      href={pub.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View source code on GitHub"
                      className={actionBtnClass}
                    >
                      <Github className="w-3 h-3" />
                      <span>{locale === 'zh' ? '代码' : 'Code'}</span>
                    </a>
                  )}

                  {/* 4. BibTeX / 引用 */}
                  {pub.bibtex && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveBibtex({
                          title,
                          bibtex: pub.bibtex!,
                        })
                      }
                      aria-label="View and copy BibTeX citation"
                      className={actionBtnClass}
                    >
                      <Quote className="w-3 h-3" />
                      <span>{locale === 'zh' ? '引用' : 'Cite'}</span>
                    </button>
                  )}
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Abstract Modal with Copy capability */}
      {activeAbstract && (
        <AbstractModal
          isOpen={true}
          onClose={() => setActiveAbstract(null)}
          title={activeAbstract.title}
          abstract={activeAbstract.abstract}
        />
      )}

      {/* BibTeX Modal with Copy capability */}
      {activeBibtex && (
        <BibtexModal
          isOpen={true}
          onClose={() => setActiveBibtex(null)}
          title={activeBibtex.title}
          bibtex={activeBibtex.bibtex}
        />
      )}
    </>
  );
};
