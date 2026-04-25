import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/next-intl.config';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import styles from './page.module.css';

export type Locale = (typeof locales)[number];
type Props = { params: { locale: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return { title: t('title') };
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default async function ServicesPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'services' });

  const services = [
    {
      badge: t('web_badge'),
      title: t('web_title'),
      desc: t('web_desc'),
      features: [t('web_f1'), t('web_f2'), t('web_f3'), t('web_f4'), t('web_f5'), t('web_f6')],
      color: '#6366f1',
      icon: 'web',
    },
    {
      badge: t('mobile_badge'),
      title: t('mobile_title'),
      desc: t('mobile_desc'),
      features: [t('mobile_f1'), t('mobile_f2'), t('mobile_f3'), t('mobile_f4'), t('mobile_f5'), t('mobile_f6')],
      color: '#8b5cf6',
      icon: 'mobile',
    },
    {
      badge: t('marketing_badge'),
      title: t('marketing_title'),
      desc: t('marketing_desc'),
      features: [t('marketing_f1'), t('marketing_f2'), t('marketing_f3'), t('marketing_f4'), t('marketing_f5'), t('marketing_f6')],
      color: '#06b6d4',
      icon: 'ads',
    },
    {
      badge: t('social_badge'),
      title: t('social_title'),
      desc: t('social_desc'),
      features: [t('social_f1'), t('social_f2'), t('social_f3'), t('social_f4'), t('social_f5'), t('social_f6')],
      color: '#f59e0b',
      icon: 'social',
    },
    {
      badge: t('auto_badge'),
      title: t('auto_title'),
      desc: t('auto_desc'),
      features: [t('auto_f1'), t('auto_f2'), t('auto_f3'), t('auto_f4'), t('auto_f5'), t('auto_f6')],
      color: '#10b981',
      icon: 'auto',
    },
    {
      badge: t('seo_badge'),
      title: t('seo_title'),
      desc: t('seo_desc'),
      features: [t('seo_f1'), t('seo_f2'), t('seo_f3'), t('seo_f4'), t('seo_f5'), t('seo_f6')],
      color: '#f43f5e',
      icon: 'seo',
    },
  ];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className="container">
          <span className="badge animate-fade-up">{t('hero_badge')}</span>
          <h1 className={`${styles.heroTitle} animate-fade-up delay-1`}>{t('hero_title')}</h1>
          <p className={`${styles.heroSub} animate-fade-up delay-2`}>{t('hero_sub')}</p>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <div className={styles.servicesStack}>
            {services.map(({ badge, title, desc, features, color, icon }, idx) => (
              <div key={title} className={`${styles.svcRow} ${idx % 2 === 1 ? styles.svcRowReverse : ''}`}>
                <div className={styles.svcVisual}>
                  <div className={styles.svcIconBig} style={{ background: `${color}15`, borderColor: `${color}25` }}>
                    <div style={{ color }}>
                      <BigServiceIcon name={icon} />
                    </div>
                  </div>
                  <span className="badge" style={{ alignSelf: 'flex-start', borderColor: `${color}40`, background: `${color}12`, color }}>{badge}</span>
                </div>
                <div className={styles.svcInfo}>
                  <h2 className={styles.svcTitle}>{title}</h2>
                  <p className={styles.svcDesc}>{desc}</p>
                  <ul className={styles.featureList}>
                    {features.map((f) => (
                      <li key={f} className={styles.featureItem}>
                        <span className={styles.checkIcon} style={{ color }}>
                          <CheckIcon />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/teklif-al" className="btn btn-primary" style={{ width: 'fit-content' }}>
                    {t('cta_btn')}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaBlob} />
        <div className="container">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>{t('cta_title')}</h2>
            <p className={styles.ctaSub}>{t('cta_sub')}</p>
            <Link href="/teklif-al" className="btn btn-primary">
              {t('cta_btn')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function BigServiceIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    web: <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    mobile: <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1"/></svg>,
    ads: <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    social: <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>,
    auto: <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
    seo: <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  };
  return icons[name] ?? null;
}
