import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from 'next-intl';

type Props = {
    params: { locale: Locale; cityName: string };
};

export async function generateMetadata({ params }: Props) {
    const t = await getTranslations({ locale: params.locale, namespace: 'contact' });

    return {
        title: `${t('contact')} - ${params.cityName}`,
    };
}

export default async function CityContactPage({ params }: Props) {
    const { locale, cityName } = params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'contact' });

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>{t('contact')} - {cityName}</h1>
            <p> city:{cityName}</p>
        </div>
    );
}
