import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { absoluteUrl, languageAlternates, postUrl, type AppPathname } from '@/utils/seo';
import { getPosts, getSlug } from '@/content/blog';

const PAGES: { href: AppPathname; priority: number; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
  { href: '/', priority: 1, changeFrequency: 'weekly' },
  { href: '/hizmetler', priority: 0.9, changeFrequency: 'monthly' },
  { href: '/fiyatlar', priority: 0.8, changeFrequency: 'monthly' },
  { href: '/teklif-al', priority: 0.8, changeFrequency: 'yearly' },
  { href: '/hakkimizda', priority: 0.7, changeFrequency: 'yearly' },
  { href: '/iletisim', priority: 0.7, changeFrequency: 'yearly' },
  { href: '/blog', priority: 0.6, changeFrequency: 'weekly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = PAGES.flatMap(({ href, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, href),
      lastModified,
      changeFrequency,
      priority: locale === routing.defaultLocale ? priority : Math.round(priority * 0.8 * 10) / 10,
      alternates: { languages: languageAlternates(href) },
    }))
  );

  const posts = getPosts(routing.defaultLocale).flatMap((post) => {
    const languages: Record<string, string> = {};
    for (const l of routing.locales) languages[l === 'tr' ? 'tr-TR' : 'en'] = postUrl(l, getSlug(l, post.id));
    languages['x-default'] = postUrl(routing.defaultLocale, getSlug(routing.defaultLocale, post.id));
    return routing.locales.map((locale) => ({
      url: postUrl(locale, getSlug(locale, post.id)),
      lastModified: new Date(post.updated ?? post.published),
      changeFrequency: 'monthly' as const,
      priority: locale === routing.defaultLocale ? 0.7 : 0.6,
      alternates: { languages },
    }));
  });

  return [...pages, ...posts];
}
