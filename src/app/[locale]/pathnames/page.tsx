import { Locale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props) {
  return {
    title: 'ozgur darendei test',
  };
}

export default function PathnamesPage({ params }: Props) {
  const { locale } = params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('header');
  console.log('!!! pathnames', t('cards'));

  return <div>{t('cards')}</div>;
}
