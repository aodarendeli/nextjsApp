import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { SITE_NAME, SITE_URL } from '@/constants/seo';

type Locale = (typeof routing.locales)[number];
/** Static (non-dynamic) routes only; blog posts use the article helpers below. */
export type AppPathname = Exclude<keyof typeof routing.pathnames, `${string}[${string}]${string}`>;

export function absoluteUrl(locale: Locale, href: AppPathname): string {
  const path = getPathname({ locale, href });
  return SITE_URL + (path === '/' ? '' : path);
}

/** hreflang map for a route, including x-default (Turkish). */
export function languageAlternates(href: AppPathname): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale === 'tr' ? 'tr-TR' : 'en'] = absoluteUrl(locale, href);
  }
  languages['x-default'] = absoluteUrl(routing.defaultLocale, href);
  return languages;
}

type PageMetaInput = {
  locale: Locale;
  href: AppPathname;
  title: string;
  description: string;
  keywords?: string;
};

/** Title, description, canonical, hreflang, Open Graph and Twitter tags for one page. */
export function buildPageMetadata({ locale, href, title, description, keywords }: PageMetaInput): Metadata {
  const url = absoluteUrl(locale, href);
  // Page-level openGraph replaces the parent's, so the generated image must be listed explicitly.
  const image = { url: `${SITE_URL}/${locale}/opengraph-image`, width: 1200, height: 630, alt: SITE_NAME };
  return {
    title,
    description,
    keywords: keywords?.split(',').map((k) => k.trim()),
    alternates: {
      canonical: url,
      languages: languageAlternates(href),
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: locale === 'tr' ? ['en_US'] : ['tr_TR'],
      url,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}

export function postUrl(locale: Locale, slug: string): string {
  return SITE_URL + getPathname({ locale, href: { pathname: '/blog/[slug]', params: { slug } } });
}

type ArticleMetaInput = {
  locale: Locale;
  slugs: Record<Locale, string>;
  title: string;
  description: string;
  keywords: string[];
  published: string;
  updated?: string;
};

export function buildArticleMetadata({ locale, slugs, title, description, keywords, published, updated }: ArticleMetaInput): Metadata {
  const url = postUrl(locale, slugs[locale]);
  const image = { url: `${SITE_URL}/${locale}/opengraph-image`, width: 1200, height: 630, alt: SITE_NAME };
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l === 'tr' ? 'tr-TR' : 'en'] = postUrl(l, slugs[l]);
  languages['x-default'] = postUrl(routing.defaultLocale, slugs[routing.defaultLocale]);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url, languages },
    openGraph: {
      type: 'article',
      siteName: SITE_NAME,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      url,
      title,
      description,
      publishedTime: published,
      modifiedTime: updated ?? published,
      authors: [SITE_NAME],
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}
