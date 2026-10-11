import { notFound } from 'next/navigation';
import { Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { routing } from '@/i18n/routing';
import VKProvider from '@/providers/VKProvider';
import RevealObserver from '@/components/ui/RevealObserver';
import FloatingContact from '@/components/ui/FloatingContact';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { ORGANIZATION, SITE_NAME, SITE_URL, SOCIAL_PROFILES } from '@/constants/seo';
import { absoluteUrl, buildPageMetadata } from '@/utils/seo';
import '../globals.css';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-sans', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const viewport: Viewport = { themeColor: '#ffffff', colorScheme: 'light' };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const page = buildPageMetadata({
    locale,
    href: '/',
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: t('meta_keywords'),
  });

  return {
    ...page,
    metadataBase: new URL(SITE_URL),
    title: { default: t('meta_title'), template: `%s | ${SITE_NAME}` },
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: ORGANIZATION.legalName,
    formatDetection: { telephone: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    },
  };
}

async function buildJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const home = absoluteUrl(locale, '/');
  const orgId = `${SITE_URL}/#organization`;
  const services = ['web', 'mobile', 'social', 'marketing', 'seo', 'automation'].map((key) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: t(`svc_${key}_title`),
      description: t(`svc_${key}_desc`),
      provider: { '@id': orgId },
      areaServed: { '@type': 'Country', name: 'Türkiye' },
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': orgId,
        name: ORGANIZATION.name,
        legalName: ORGANIZATION.legalName,
        url: SITE_URL,
        logo: `${SITE_URL}/icon`,
        image: `${home}/opengraph-image`,
        description: t('meta_description'),
        email: ORGANIZATION.email,
        telephone: ORGANIZATION.telephone,
        foundingDate: ORGANIZATION.foundingDate,
        address: { '@type': 'PostalAddress', addressCountry: ORGANIZATION.country },
        areaServed: { '@type': 'Country', name: 'Türkiye' },
        priceRange: '₺₺',
        knowsLanguage: ['tr', 'en'],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: ORGANIZATION.telephone,
          email: ORGANIZATION.email,
          contactType: 'customer service',
          availableLanguage: ['Turkish', 'English'],
        },
        ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t('services_title'),
          itemListElement: services,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: locale === 'tr' ? 'tr-TR' : 'en',
        publisher: { '@id': orgId },
      },
    ],
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const jsonLd = await buildJsonLd(locale);

  return (
    <html className={`${inter.variable} ${jakarta.variable}`} lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <VKProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingContact />
            <RevealObserver />
          </VKProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
