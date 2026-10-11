import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildPageMetadata } from '@/utils/seo';

type Props = { params: { locale: (typeof routing.locales)[number] } };

// The page itself is a client component, so its metadata lives here.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return buildPageMetadata({
    locale,
    href: '/iletisim',
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
