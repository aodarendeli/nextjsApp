import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  pathnames: {
    '/': '/',
    '/hizmetler': {
      en: '/services',
    },
    '/fiyatlar': {
      en: '/pricing',
    },
    '/hakkimizda': {
      en: '/about',
    },
    '/blog': {
      en: '/blog',
    },
    '/blog/[slug]': {
      en: '/blog/[slug]',
    },
    '/iletisim': {
      en: '/contact',
    },
    '/teklif-al': {
      en: '/get-quote',
    },
  },
});
