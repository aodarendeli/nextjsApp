import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/next-intl.config';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/utils/seo';
import styles from './page.module.css';

export type Locale = (typeof locales)[number];
type Props = { params: { locale: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return buildPageMetadata({
    locale,
    href: '/fiyatlar',
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: t('meta_keywords'),
  });
}

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default async function PricingPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pricing' });

  const webPlans = [
    {
      badge: t('web_basic_badge'),
      title: t('web_basic_title'),
      price: t('web_basic_price'),
      desc: t('web_basic_desc'),
      delivery: t('web_basic_delivery'),
      features: [t('web_basic_f1'), t('web_basic_f2'), t('web_basic_f3'), t('web_basic_f4'), t('web_basic_f5'), t('web_basic_f6')],
      popular: false,
      cta: t('get_started'),
      href: '/teklif-al' as const,
    },
    {
      badge: t('web_ecom_badge'),
      title: t('web_ecom_title'),
      price: t('web_ecom_price'),
      desc: t('web_ecom_desc'),
      delivery: t('web_ecom_delivery'),
      features: [t('web_ecom_f1'), t('web_ecom_f2'), t('web_ecom_f3'), t('web_ecom_f4'), t('web_ecom_f5'), t('web_ecom_f6')],
      popular: true,
      cta: t('get_started'),
      href: '/teklif-al' as const,
    },
    {
      badge: t('web_custom_badge'),
      title: t('web_custom_title'),
      price: t('web_custom_price'),
      desc: t('web_custom_desc'),
      delivery: t('web_custom_delivery'),
      features: [t('web_custom_f1'), t('web_custom_f2'), t('web_custom_f3'), t('web_custom_f4'), t('web_custom_f5'), t('web_custom_f6')],
      popular: false,
      cta: t('contact_us'),
      href: '/iletisim' as const,
    },
  ];

  const socialPlans = [
    {
      badge: t('social_starter_badge'),
      title: t('social_starter_title'),
      price: t('social_starter_price'),
      period: t('social_starter_period'),
      features: [t('social_starter_f1'), t('social_starter_f2'), t('social_starter_f3'), t('social_starter_f4')],
      popular: false,
    },
    {
      badge: t('social_growth_badge'),
      title: t('social_growth_title'),
      price: t('social_growth_price'),
      period: t('social_growth_period'),
      features: [t('social_growth_f1'), t('social_growth_f2'), t('social_growth_f3'), t('social_growth_f4'), t('social_growth_f5'), t('social_growth_f6')],
      popular: true,
    },
    {
      badge: t('social_pro_badge'),
      title: t('social_pro_title'),
      price: t('social_pro_price'),
      period: '',
      features: [t('social_pro_f1'), t('social_pro_f2'), t('social_pro_f3'), t('social_pro_f4'), t('social_pro_f5'), t('social_pro_f6')],
      popular: false,
    },
  ];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <span className="badge animate-fade-up">{t('hero_badge')}</span>
          <h1 className={`${styles.heroTitle} animate-fade-up delay-1`}>
            {t('hero_title')}
          </h1>
          <p className={`${styles.heroSub} animate-fade-up delay-2`}>{t('hero_sub')}</p>
        </div>
      </section>

      {/* Web plans */}
      <section className="section">
        <div className="container">
          <h2 className={styles.sectionTitle} data-reveal>{t('web_section')}</h2>
          <div className={styles.plansGrid}>
            {webPlans.map(({ badge, title, price, desc, delivery, features, popular, cta, href }, i) => (
              <div key={title} className={`${styles.planCard} ${popular ? styles.planCardPopular : ''}`} style={{ '--d': i } as React.CSSProperties} data-reveal>
                {popular && <div className={styles.popularTag}>{t('popular')}</div>}
                <div className={styles.planBadge}>{badge}</div>
                <h3 className={styles.planTitle}>{title}</h3>
                <div className={styles.planPrice}>{price}</div>
                <p className={styles.planDesc}>{desc}</p>
                <div className={styles.planDelivery}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {t('delivery')}: <strong>{delivery}</strong>
                </div>
                <ul className={styles.featureList}>
                  {features.map((f) => (
                    <li key={f} className={styles.featureItem}>
                      <span className={styles.check}><Check /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={href} className={`btn ${popular ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social media plans */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className={styles.sectionTitle} data-reveal>{t('social_section')}</h2>
          <div className={styles.plansGrid}>
            {socialPlans.map(({ badge, title, price, period, features, popular }, i) => (
              <div key={title} className={`${styles.planCard} ${popular ? styles.planCardPopular : ''}`} style={{ '--d': i } as React.CSSProperties} data-reveal>
                {popular && <div className={styles.popularTag}>{t('popular')}</div>}
                <div className={styles.planBadge}>{badge}</div>
                <h3 className={styles.planTitle}>{title}</h3>
                <div className={styles.planPrice}>
                  {price}
                  {period && <span className={styles.planPeriod}>{period}</span>}
                </div>
                <ul className={styles.featureList}>
                  {features.map((f) => (
                    <li key={f} className={styles.featureItem}>
                      <span className={styles.check}><Check /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/teklif-al" className={`btn ${popular ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
                  {price === t('social_pro_price') ? t('contact_us') : t('get_started')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile & Automation note */}
      <section className={styles.mobileSection}>
        <div className="container">
          <div className={styles.mobileGrid}>
            {[
              { emoji: '📱', label: t('mobile_section'), note: t('mobile_start'), color: '#8b5cf6' },
              { emoji: '⚙️', label: 'Otomasyon', note: t('auto_start'), color: '#10b981' },
            ].map(({ emoji, label, note, color }) => (
              <div key={label} className={styles.mobileCard} data-reveal>
                <div className={styles.mobileEmoji}>{emoji}</div>
                <div>
                  <h3 className={styles.mobileTitle}>{label}</h3>
                  <p className={styles.mobileNote}>{note}</p>
                  <p className={styles.mobileSub}>{t('mobile_note')}</p>
                </div>
                <Link href="/teklif-al" className="btn btn-outline" style={{ whiteSpace: 'nowrap' }}>
                  {t('quote_btn')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-band" data-reveal="zoom">
            <h2>{t('cta_title')}</h2>
            <p>{t('cta_sub')}</p>
            <div className="cta-band-actions">
              <Link href="/iletisim" className="btn btn-light">
                {t('cta_btn')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
