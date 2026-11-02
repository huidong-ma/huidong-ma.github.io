export type Locale = 'zh' | 'en';

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface PersonalInfo {
  name: LocalizedText;
  englishName: string;
  title: LocalizedText;
  affiliation?: LocalizedText;
  location: LocalizedText;
  avatarUrl: string;
  bioSummary: LocalizedText;
  detailedBio: LocalizedText;
  cvUrl?: string;
}

export interface SocialLinks {
  github?: string;
  scholar?: string;
  researchgate?: string;
  linkedin?: string;
  orcid?: string;
  email?: string;
  blog?: string;
  twitter?: string;
  website?: string;
}

export interface ResearchInterest {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  keywords?: string[];
  icon?: string;
}

export interface NewsItem {
  date?: string; // 仅用于页面显示，不影响顺序。
  content: LocalizedText;
  link?: string;
  tag?: LocalizedText;
}

export interface EducationItem {
  id: string;
  institution: LocalizedText;
  degree: LocalizedText;
  major: LocalizedText;
  period: string;
  advisor?: LocalizedText;
  location?: LocalizedText;
  logoUrl?: string;
  description?: LocalizedText;
}

export interface ExperienceItem {
  id: string;
  organization: LocalizedText;
  role: LocalizedText;
  period: string;
  location?: LocalizedText;
  description?: LocalizedText;
  logoUrl?: string;
  highlights?: LocalizedText[];
}

export interface ProjectItem {
  id: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  period?: string;
  collaborators?: LocalizedText;
  description: LocalizedText;
  imageUrl?: string;
  projectUrl?: string;
  codeUrl?: string;
  demoUrl?: string;
  tags?: string[];
}

export interface PublicationItem {
  title: string | LocalizedText;
  authors: string[];
  venue: string | LocalizedText; // e.g. "NeurIPS 2025 (Oral)"
  venueFullName?: string; // e.g. "Advances in Neural Information Processing Systems" (hover tooltip)
  abstract?: string;
  paperUrl?: string;
  codeUrl?: string;
  dataUrl?: string;
  projectUrl?: string;
  bibtex?: string;
  highlight?: boolean;
  award?: string | LocalizedText;
  ccf?: string; // e.g. "CCF-A"
  casTier?: string | LocalizedText; // e.g. { zh: '中科院1区 (Top)', en: 'CAS Tier 1 (Top)' } - 唯一支持中英翻译
  jcr?: string; // e.g. "JCR Q1" or "Q1" - 固定展示，无需翻译
  impactFactor?: string | number | LocalizedText; // e.g. "IF 23.6" or "23.6" - 固定以 IF 开头，无需翻译
  tags?: (string | LocalizedText)[]; // Additional evaluation tags
}

export interface HonorItem {
  name: LocalizedText;
  date?: string; // 仅用于页面显示，不影响顺序。
  issuer: LocalizedText;
  description?: LocalizedText;
}

export interface ServiceItem {
  role: LocalizedText;
  organization: LocalizedText;
  period?: string; // 仅用于页面显示，不影响顺序。
  type?: 'review' | 'chair' | 'committee' | 'teaching' | 'other';
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: LocalizedText;
  date?: string;
  location?: LocalizedText;
  coordinates?: string;
  caption?: LocalizedText;
}

export interface MusicTrack {
  id: string;
  title: LocalizedText | string;
  artist: LocalizedText | string;
  album?: LocalizedText | string;
  year?: string;
  duration?: string;
  audioUrl: string;
  coverUrl?: string;
  lyrics?: string;
  genre?: LocalizedText | string;
  description?: LocalizedText | string;
}

export interface SectionVisibility {
  about?: boolean;
  interests?: boolean;
  news?: boolean;
  education?: boolean;
  experience?: boolean;
  projects?: boolean;
  publications?: boolean;
  honors?: boolean;
  services?: boolean;
  gallery?: boolean;
  music?: boolean;
}

export interface SiteData {
  enabledSections?: SectionVisibility;
  profile: PersonalInfo;
  socials: SocialLinks;
  researchInterests?: ResearchInterest[];
  news?: NewsItem[];
  education?: EducationItem[];
  experience?: ExperienceItem[];
  projects?: ProjectItem[];
  publications?: PublicationItem[];
  honors?: HonorItem[];
  services?: ServiceItem[];
  gallery?: GalleryItem[];
  music?: MusicTrack[];
}
