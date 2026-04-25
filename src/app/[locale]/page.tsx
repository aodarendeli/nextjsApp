import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/next-intl.config';
import { Link } from '@/i18n/navigation';
import styles from './home.module.css';

export type Locale = (typeof locales)[number];
type Props = { params: { locale: Locale } };

export default async function IndexPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });

  const services = [
    { icon: 'web',    title: t('svc_web_title'),        desc: t('svc_web_desc'),        color: '#6366f1' },
    { icon: 'mobile', title: t('svc_mobile_title'),     desc: t('svc_mobile_desc'),     color: '#8b5cf6' },
    { icon: 'ads',    title: t('svc_marketing_title'),  desc: t('svc_marketing_desc'),  color: '#06b6d4' },
    { icon: 'social', title: t('svc_social_title'),     desc: t('svc_social_desc'),     color: '#f59e0b' },
    { icon: 'auto',   title: t('svc_automation_title'), desc: t('svc_automation_desc'), color: '#10b981' },
    { icon: 'seo',    title: t('svc_seo_title'),        desc: t('svc_seo_desc'),        color: '#f43f5e' },
  ];

  const stats = [
    { val: t('stats_1_val'), label: t('stats_1_label') },
    { val: t('stats_2_val'), label: t('stats_2_label') },
    { val: t('stats_3_val'), label: t('stats_3_label') },
    { val: t('stats_4_val'), label: t('stats_4_label') },
  ];

  const process = [
    { n: '01', title: t('process_1_title'), desc: t('process_1_desc') },
    { n: '02', title: t('process_2_title'), desc: t('process_2_desc') },
    { n: '03', title: t('process_3_title'), desc: t('process_3_desc') },
    { n: '04', title: t('process_4_title'), desc: t('process_4_desc') },
  ];

  const pricing = [
    { title: t('pricing_web_title'),    price: t('pricing_web_price'),    desc: t('pricing_web_desc'),    popular: false },
    { title: t('pricing_ecom_title'),   price: t('pricing_ecom_price'),   desc: t('pricing_ecom_desc'),   popular: true  },
    { title: t('pricing_custom_title'), price: t('pricing_custom_price'), desc: t('pricing_custom_desc'), popular: false },
  ];

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBlob1} />
        <div className={styles.heroBlob2} />
        <div className={styles.gridOverlay} />
        <div className="container">
          <div className={styles.heroContent}>
            <span className={`badge animate-fade-up`}>{t('hero_badge')}</span>
            <h1 className={`${styles.heroTitle} animate-fade-up delay-1`}>
              {t('hero_title_1')}<br />
              <span className="gradient-text">{t('hero_title_2')}</span>
            </h1>
            <p className={`${styles.heroSub} animate-fade-up delay-2`}>{t('hero_sub')}</p>
            <div className={`${styles.heroBtns} animate-fade-up delay-3`}>
              <Link href="/teklif-al" className="btn btn-primary">
                {t('hero_cta_primary')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/hizmetler" className="btn btn-outline">{t('hero_cta_secondary')}</Link>
            </div>
            <div className={`${styles.heroStats} animate-fade-up delay-4`}>
              {[
                { val: t('hero_stat_1_val'), label: t('hero_stat_1_label') },
                { val: t('hero_stat_2_val'), label: t('hero_stat_2_label') },
                { val: t('hero_stat_3_val'), label: t('hero_stat_3_label') },
              ].map(({ val, label }) => (
                <div key={label} className={styles.heroStat}>
                  <span className={styles.heroStatVal}>{val}</span>
                  <span className={styles.heroStatLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating cards */}
          <div className={`${styles.heroVisual} animate-fade delay-3`}>
            <div className={`${styles.floatCard} ${styles.floatCard1} animate-float`}>
              <div className={styles.floatCardDot} style={{ background: '#10b981' }} />
              <span>Web Projesi Teslim Edildi</span>
              <strong>+₺0 Gizli Ücret</strong>
            </div>
            <div className={`${styles.floatCard} ${styles.floatCard2} animate-float`} style={{ animationDelay: '1s' }}>
              <div className={styles.floatCardDot} style={{ background: '#6366f1' }} />
              <span>Müşteri Memnuniyeti</span>
              <strong>%98 Olumlu</strong>
            </div>
            <div className={`${styles.floatCard} ${styles.floatCard3} animate-float`} style={{ animationDelay: '2s' }}>
              <div className={styles.floatCardDot} style={{ background: '#f59e0b' }} />
              <span>Aktif Proje</span>
              <strong>12 Devam Ediyor</strong>
            </div>
            <div className={styles.heroGlowCircle} />
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className={`section ${styles.servicesSec}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="badge">{t('services_badge')}</span>
            <h2 className="section-heading">{t('services_title')}</h2>
            <p className="section-sub">{t('services_sub')}</p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map(({ icon, title, desc, color }) => (
              <Link href="/hizmetler" key={title} className={`${styles.svcCard} card`}>
                <div className={styles.svcIcon} style={{ background: `${color}1a`, color }}>
                  <ServiceIcon name={icon} />
                </div>
                <h3 className={styles.svcTitle}>{title}</h3>
                <p className={styles.svcDesc}>{desc}</p>
                <span className={styles.svcArrow} style={{ color }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className={styles.statsSec}>
        <div className={styles.statsBlob} />
        <div className="container">
          <span className="badge" style={{ marginBottom: '32px', display: 'inline-flex' }}>{t('stats_badge')}</span>
          <div className={styles.statsGrid}>
            {stats.map(({ val, label }) => (
              <div key={label} className={styles.statItem}>
                <span className={styles.statVal}>{val}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="badge">{t('process_badge')}</span>
            <h2 className="section-heading">{t('process_title')}</h2>
            <p className="section-sub">{t('process_sub')}</p>
          </div>
          <div className={styles.processGrid}>
            {process.map(({ n, title, desc }, i) => (
              <div key={n} className={styles.processItem}>
                <div className={styles.processNum}>{n}</div>
                {i < process.length - 1 && <div className={styles.processLine} />}
                <h3 className={styles.processTitle}>{title}</h3>
                <p className={styles.processDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing teaser ── */}
      <section className={`section ${styles.pricingSec}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="badge">{t('pricing_badge')}</span>
            <h2 className="section-heading">{t('pricing_title')}</h2>
            <p className="section-sub">{t('pricing_sub')}</p>
          </div>
          <div className={styles.pricingGrid}>
            {pricing.map(({ title, price, desc, popular }) => (
              <div key={title} className={`${styles.pricingCard} card ${popular ? styles.pricingCardPopular : ''}`}>
                {popular && <div className={styles.popularBadge}>⭐ En Popüler</div>}
                <h3 className={styles.pricingTitle}>{title}</h3>
                <div className={styles.pricingPrice}>{price}</div>
                <p className={styles.pricingDesc}>{desc}</p>
                <Link
                  href={price === t('pricing_custom_price') ? '/teklif-al' : '/fiyatlar'}
                  className={`btn ${popular ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {price === t('pricing_custom_price') ? t('pricing_custom_price') : 'Hemen Başla'}
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.pricingFooter}>
            <Link href="/fiyatlar" className="btn btn-ghost">
              {t('pricing_cta')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSec}>
        <div className={styles.ctaBlob1} />
        <div className={styles.ctaBlob2} />
        <div className="container">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>
              {t('cta_title_1')}{' '}
              <span className="gradient-text">{t('cta_title_2')}</span>
            </h2>
            <p className={styles.ctaSub}>{t('cta_sub')}</p>
            <div className={styles.ctaBtns}>
              <Link href="/teklif-al" className="btn btn-primary">
                {t('cta_primary')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/iletisim" className="btn btn-outline">{t('cta_secondary')}</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    web: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    mobile: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1"/>
      </svg>
    ),
    ads: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    social: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
      </svg>
    ),
    auto: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
    seo: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  };
  return icons[name] ?? null;
}
