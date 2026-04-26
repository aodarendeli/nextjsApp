import { notFound } from 'next/navigation';
import { Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import VKProvider from '@/providers/VKProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import Footer from '@/components/footer';
import Header from '@/components/header';
import '../globals.css';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return { title: t('hometitle') };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html className="h-full" lang={locale} data-theme="dark">
      <head>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('fs-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}` }} />
      </head>
      <body className={`${inter.className} flex h-full flex-col`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <VKProvider>
            <ThemeProvider>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </ThemeProvider>
          </VKProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
