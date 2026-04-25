import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { VKLocaleSwitcherSelect } from './VKLocaleSwticher';

const VKLocaleSwitcher = () => {
  const t = useTranslations('switcher');
  const locale = useLocale();

  return (
    <VKLocaleSwitcherSelect defaultValue={locale}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {t('locale', { locale: cur })}
        </option>
      ))}
    </VKLocaleSwitcherSelect>
  );
};

export { VKLocaleSwitcher };
