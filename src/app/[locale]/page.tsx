import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/next-intl.config';
import { Link } from '@/i18n/navigation';
import ServiceIcon from '@/components/ServiceIcon';
import HeroIllustration from '@/components/HeroIllustration';
import CountUp from '@/components/ui/CountUp';
import styles from './home.module.css';

export type Locale = (typeof locales)[number];
type Props = { params: { locale: Locale } };

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);

export default async function IndexPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });

  const services = [
    { icon: 'web',    title: t('svc_web_title'),        desc: t('svc_web_desc'),        color: '#5b5bf0' },
    { icon: 'mobile', title: t('svc_mobile_title'),     desc: t('svc_mobile_desc'),     color: '#8b5cf6' },
    { icon: 'social', title: t('svc_social_title'),     desc: t('svc_social_desc'),     color: '#f59e0b' },
    { icon: 'ads',    title: t('svc_marketing_title'),  desc: t('svc_marketing_desc'),  color: '#06b6d4' },
    { icon: 'seo',    title: t('svc_seo_title'),        desc: t('svc_seo_desc'),        color: '#f43f5e' },
    { icon: 'auto',   title: t('svc_automation_title'), desc: t('svc_automation_desc'), color: '#10b981' },
  ];

  const marquee = [
    t('svc_web_title'), 'Next.js', t('svc_mobile_title'), 'React Native', t('svc_social_title'), 'Instagram',
    t('svc_marketing_title'), 'Google Ads', 'Meta Ads', t('svc_seo_title'), t('svc_automation_title'), 'n8n',
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
    { title: t('pricing_web_title'),    price: t('pricing_web_price'),    desc: t('pricing_web_desc'),    popular: false, custom: false },
    { title: t('pricing_ecom_title'),   price: t('pricing_ecom_price'),   desc: t('pricing_ecom_desc'),   popular: true,  custom: false },
    { title: t('pricing_custom_title'), price: t('pricing_custom_price'), desc: t('pricing_custom_desc'), popular: false, custom: true  },
  ];

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={`blob ${styles.heroBlob1}`} />
        <div className={`blob ${styles.heroBlob2}`} />
        <div className={styles.gridOverlay} />
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <span className="badge animate-fade-up">{t('hero_badge')}</span>
            <h1 className={`${styles.heroTitle} animate-fade-up delay-1`}>
              {t('hero_title_1')}{' '}
              <span className={styles.heroAccent}>
                <span className="gradient-text">{t('hero_title_2')}</span>
                <svg className={styles.underline} viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 9 C 80 2, 220 2, 298 8" />
                </svg>
              </span>
            </h1>
            <p className={`${styles.heroSub} animate-fade-up delay-2`}>{t('hero_sub')}</p>
            <div className={`${styles.heroBtns} animate-fade-up delay-3`}>
              <Link href="/teklif-al" className="btn btn-primary">
                {t('hero_cta_primary')}
                <Arrow />
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
                  <span className={styles.heroStatVal}><CountUp target={val} /></span>
                  <span className={styles.heroStatLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.heroVisual}>
            <HeroIllustration
              labels={{
                traffic: t('illu_traffic'),
                rating: t('illu_rating'),
                delivered: t('illu_delivered'),
                followers: t('illu_followers'),
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <section className={styles.marqueeSec} aria-label={t('services_title')}>
        <p className={styles.marqueeLabel}>{t('trust_label')}</p>
        <div className="marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-track" aria-hidden={copy === 1}>
              {marquee.map((item, i) => (
                <span key={`${copy}-${i}`} className={styles.marqueeItem}>
                  <span className={styles.marqueeDot} style={{ background: services[i % services.length].color }} />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="badge">{t('services_badge')}</span>
            <h2 className="section-heading">{t('services_title')}</h2>
            <p className="section-sub">{t('services_sub')}</p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map(({ icon, title, desc, color }, i) => (
              <Link
                href="/hizmetler"
                key={title}
                className={`${styles.svcCard} card`}
                style={{ '--accent': color, '--d': i % 3 } as React.CSSProperties}
                data-reveal
              >
                <div className={styles.svcTop}>
                  <div className={styles.svcIcon}>
                    <ServiceIcon name={icon} />
                  </div>
                  <span className={styles.svcNum}>0{i + 1}</span>
                </div>
                <h3 className={styles.svcTitle}>{title}</h3>
                <p className={styles.svcDesc}>{desc}</p>
                <span className={styles.svcArrow}>
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className={styles.statsSec}>
        <div className="container">
          <div className={styles.statsCard} data-reveal="zoom">
            <span className={`badge ${styles.statsBadge}`}>{t('stats_badge')}</span>
            <div className={styles.statsGrid}>
              {stats.map(({ val, label }) => (
                <div key={label} className={styles.statItem}>
                  <span className={styles.statVal}><CountUp target={val} /></span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="badge">{t('process_badge')}</span>
            <h2 className="section-heading">{t('process_title')}</h2>
            <p className="section-sub">{t('process_sub')}</p>
          </div>
          <div className={styles.processGrid}>
            <div className={styles.processLine} data-reveal />
            {process.map(({ n, title, desc }, i) => (
              <div key={n} className={styles.processItem} style={{ '--d': i } as React.CSSProperties} data-reveal>
                <div className={styles.processNum}>{n}</div>
                <h3 className={styles.processTitle}>{title}</h3>
                <p className={styles.processDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing teaser ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="badge">{t('pricing_badge')}</span>
            <h2 className="section-heading">{t('pricing_title')}</h2>
            <p className="section-sub">{t('pricing_sub')}</p>
          </div>
          <div className={styles.pricingGrid}>
            {pricing.map(({ title, price, desc, popular, custom }, i) => (
              <div
                key={title}
                className={`${styles.pricingCard} ${popular ? styles.pricingCardPopular : ''}`}
                style={{ '--d': i } as React.CSSProperties}
                data-reveal
              >
                {popular && <div className={styles.popularBadge}>★ {t('pricing_popular')}</div>}
                <h3 className={styles.pricingTitle}>{title}</h3>
                <div className={styles.pricingPrice}>{price}</div>
                <p className={styles.pricingDesc}>{desc}</p>
                <Link
                  href={custom ? '/teklif-al' : '/fiyatlar'}
                  className={`btn ${popular ? 'btn-primary' : 'btn-outline'} ${styles.pricingBtn}`}
                >
                  {custom ? t('pricing_custom_price') : t('pricing_start')}
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.pricingFooter}>
            <Link href="/fiyatlar" className="btn btn-ghost">
              {t('pricing_cta')}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div className="container">
          <div className="cta-band" data-reveal="zoom">
            <h2>
              {t('cta_title_1')}{' '}
              <span className="gradient-text">{t('cta_title_2')}</span>
            </h2>
            <p>{t('cta_sub')}</p>
            <div className="cta-band-actions">
              <Link href="/teklif-al" className="btn btn-light">
                {t('cta_primary')}
                <Arrow />
              </Link>
              <Link href="/iletisim" className="btn btn-glass">{t('cta_secondary')}</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
