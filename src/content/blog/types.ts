export type BlogLocale = 'tr' | 'en';
export type BlogCategory = 'web' | 'mobile' | 'marketing' | 'automation' | 'seo';

/** Inline text supports **bold** only. */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'tip'; title: string; text: string }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'cta' };

export type PostContent = {
  slug: string;
  title: string;
  excerpt: string;
  /** Meta description, ≤ 160 chars. */
  description: string;
  keywords: string[];
  blocks: Block[];
};

export type PostMeta = {
  id: string;
  category: BlogCategory;
  /** ISO date (YYYY-MM-DD). */
  published: string;
  updated?: string;
  color: string;
};

export type Post = PostMeta & PostContent & { readMinutes: number };

/** Lightweight shape for listing cards (no article body). */
export type PostSummary = Omit<Post, 'blocks' | 'keywords' | 'description'>;
