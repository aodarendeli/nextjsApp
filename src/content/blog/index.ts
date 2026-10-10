import type { Block, BlogLocale, Post, PostContent, PostMeta, PostSummary } from './types';
import { trPosts } from './tr';
import { enPosts } from './en';

export type { Block, BlogCategory, BlogLocale, Post, PostSummary } from './types';

// Newest first.
const META: PostMeta[] = [
  { id: 'google-vs-meta', category: 'marketing', published: '2026-09-16', color: '#06b6d4' },
  { id: 'technical-seo', category: 'seo', published: '2026-08-05', updated: '2026-10-10', color: '#f43f5e' },
  { id: 'instagram-reach', category: 'marketing', published: '2026-06-17', color: '#f59e0b' },
  { id: 'n8n-automation', category: 'automation', published: '2026-05-20', color: '#10b981' },
  { id: 'rn-vs-flutter', category: 'mobile', published: '2026-04-08', color: '#8b5cf6' },
  { id: 'website-cost', category: 'web', published: '2026-03-12', color: '#5b5bf0' },
];

const CONTENT: Record<BlogLocale, Record<string, PostContent>> = { tr: trPosts, en: enPosts };

const WORDS_PER_MINUTE = 200;

function blockText(block: Block): string {
  switch (block.type) {
    case 'p':
    case 'h2':
    case 'h3':
      return block.text;
    case 'tip':
      return `${block.title} ${block.text}`;
    case 'ul':
    case 'ol':
      return block.items.join(' ');
    case 'table':
      return [...block.head, ...block.rows.flat()].join(' ');
    default:
      return '';
  }
}

function readMinutes(blocks: Block[]): number {
  const words = blocks.map(blockText).join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function build(meta: PostMeta, locale: BlogLocale): Post {
  const content = CONTENT[locale][meta.id];
  return { ...meta, ...content, readMinutes: readMinutes(content.blocks) };
}

export function getPosts(locale: BlogLocale): Post[] {
  return META.map((meta) => build(meta, locale));
}

export function getPostBySlug(locale: BlogLocale, slug: string): Post | undefined {
  const meta = META.find((m) => CONTENT[locale][m.id].slug === slug);
  return meta && build(meta, locale);
}

/** Finds a post by a slug from any locale, e.g. after switching language on an article page. */
export function findPostIdBySlug(slug: string): string | undefined {
  return META.find((m) => (Object.keys(CONTENT) as BlogLocale[]).some((l) => CONTENT[l][m.id].slug === slug))?.id;
}

export function getSlug(locale: BlogLocale, id: string): string {
  return CONTENT[locale][id].slug;
}

export function getRelatedPosts(post: Post, locale: BlogLocale, count = 3): Post[] {
  const others = getPosts(locale).filter((p) => p.id !== post.id);
  return [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, count);
}

export function getAllSlugs(): { locale: BlogLocale; slug: string; id: string }[] {
  return (Object.keys(CONTENT) as BlogLocale[]).flatMap((locale) =>
    META.map((m) => ({ locale, slug: CONTENT[locale][m.id].slug, id: m.id }))
  );
}

export function formatPostDate(iso: string, locale: BlogLocale): string {
  return new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${iso}T12:00:00Z`)
  );
}

export function postMeta(id: string): PostMeta | undefined {
  return META.find((m) => m.id === id);
}

export function toSummary({ blocks: _blocks, keywords: _keywords, description: _description, ...rest }: Post): PostSummary {
  return rest;
}
