export type SocialLink = {
  label: string;
  href: string;
};

export type SiteHighlight = {
  label: string;
  value: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  githubUsername: string;
  keywords: string[];
  profile: {
    experienceYears: number;
    headlineStats: Array<{
      label: string;
      value: string;
    }>;
    strengths: Array<{
      title: string;
      description: string;
    }>;
  };
  heroTagline: string;
  heroDescription: string;
  highlights: SiteHighlight[];
  author: {
    name: string;
    role: string;
    motto: string;
    avatar: string;
    avatarAlt?: string;
    github: string;
  };
  navigation: Array<{
    label: string;
    href: string;
  }>;
  socialLinks: SocialLink[];
  about: {
    intro: string;
    details: string[];
    techStack: string[];
    currently: string[];
  };
};

export type PostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  category: string;
  tags: string[];
  cover?: string;
  draft?: boolean;
  featured?: boolean;
};

export type TocHeading = {
  level: number;
  text: string;
  slug: string;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
  readingTime: string;
};

export type PostDetail = PostSummary & {
  content: string;
  toc: TocHeading[];
};

export type CategoryCount = {
  label: string;
  slug: string;
  count: number;
};

export type TagCount = {
  label: string;
  slug: string;
  count: number;
};

export type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  language: string | null;
};

export type ProjectOverride = {
  repo: string;
  name: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  featured?: boolean;
  pinnedOrder?: number;
};

export type Project = ProjectOverride & {
  htmlUrl: string;
  homepage?: string;
  stars: number;
  updatedAt?: string;
  source: "github" | "local";
};
