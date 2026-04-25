import { MetadataRoute } from 'next';

type SitemapItem = {
  url: string;
  lastModified: string;
  changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'];
  priority: number;
  translations: Record<string, string>;
};

//TODO OZGUR DARENDELİ BURASI BACKENDDEN GELİCEK.
const sitemapItems: SitemapItem[] = [
  {
    url: '/',
    translations: {
      en: '/en',
      tr: '/tr',
    },
    lastModified: '2024-12-15T10:00:00Z',
    changeFrequency: 'yearly',
    priority: 1,
  },
  {
    url: '/about',
    translations: {
      en: '/en/about',
      tr: '/tr/hakkimizda',
    },
    lastModified: '2024-12-15T10:00:00Z',
    changeFrequency: 'yearly',
    priority: 0.8,
  },
  {
    url: '/contact',
    translations: {
      en: '/en/contact',
      tr: '/tr/iletisim',
    },
    lastModified: '2024-12-15T10:00:00Z',
    changeFrequency: 'yearly',
    priority: 0.8,
  },
  {
    url: '/blog/blogen1',
    translations: {
      en: '/en/blog/blogen1',
      tr: '/tr/blog/blogtr1',
    },
    lastModified: '2025-07-06T12:00:00Z',
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    url: '/blog/blogen2',
    translations: {
      en: '/en/blog/blogen2',
      tr: '/tr/blog/blogtr2',
    },
    lastModified: '2025-06-25T15:30:00Z',
    changeFrequency: 'monthly',
    priority: 0.6,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  const entries = sitemapItems.flatMap(
    ({ lastModified, changeFrequency, priority, translations }) => {
      return Object.values(translations).map((path) => ({
        url: baseUrl + path,
        lastModified: new Date(lastModified),
        changeFrequency,
        priority,
      }));
    }
  );

  return entries;
}
