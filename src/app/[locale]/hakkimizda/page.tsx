import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/next-intl.config';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import styles from './page.module.css';

export type Locale = (typeof locales)[number];
type Props = { params: { locale: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'about' });
  return { title: t('title') };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });

  const values = [
    { title: t('val_1_title'), desc: t('val_1_desc'), icon: '🔍' },
    { title: t('val_2_title'), desc: t('val_2_desc'), icon: '🎯' },
    { title: t('val_3_title'), desc: t('val_3_desc'), icon: '💡' },
    { title: t('val_4_title'), desc: t('val_4_desc'), icon: '🤝' },
    { title: t('val_5_title'), desc: t('val_5_desc'), icon: '🎨' },
    { title: t('val_6_title'), desc: t('val_6_desc'), icon: '💬' },
  ];

  const team = [
    { name: t('member_1_name'), role: t('member_1_role'), initials: 'AÖ', color: '#6366f1' },
    { name: t('member_2_name'), role: t('member_2_role'), initials: 'SK', color: '#8b5cf6' },
    { name: t('member_3_name'), role: t('member_3_role'), initials: 'MD', color: '#06b6d4' },
    { name: t('member_4_name'), role: t('member_4_role'), initials: 'ZA', color: '#f59e0b' },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className="container">
          <div className={styles.heroInner}>
            <span className="badge animate-fade-up">{t('hero_badge')}</span>
            <h1 className={`${styles.heroTitle} animate-fade-up delay-1`}>{t('hero_title')}</h1>
            <p className={`${styles.heroSub} animate-fade-up delay-2`}>{t('hero_sub')}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyVisual}>
              <div className={styles.storyCard}>
                <div className={styles.storyLogo}>FS</div>
                <div className={styles.storyCardText}>
                  <span className={styles.storyYear}>2019</span>
                  <span className={styles.storyYearLabel}>Kuruluş Yılı</span>
                </div>
              </div>
              <div className={styles.storyStats}>
                {[{ val: '150+', label: 'Proje' }, { val: '50+', label: 'Müşteri' }, { val: '%98', label: 'Memnuniyet' }].map(({ val, label }) => (
                  <div key={label} className={styles.storyStat}>
                    <span className={styles.storyStatVal}>{val}</span>
                    <span className={styles.storyStatLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.storyContent}>
              <span className="badge">{t('story_badge')}</span>
              <h2 className={styles.storyTitle}>{t('story_title')}</h2>
              <p className={styles.storyP}>{t('story_p1')}</p>
              <p className={styles.storyP}>{t('story_p2')}</p>
              <p className={styles.storyP}>{t('story_p3')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.valuesSec}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="badge">{t('values_badge')}</span>
            <h2 className="section-heading">{t('values_title')}</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map(({ title, desc, icon }) => (
              <div key={title} className={`${styles.valCard} card`}>
                <div className={styles.valIcon}>{icon}</div>
                <h3 className={styles.valTitle}>{title}</h3>
                <p className={styles.valDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="badge">{t('team_badge')}</span>
            <h2 className="section-heading">{t('team_title')}</h2>
            <p className="section-sub">{t('team_sub')}</p>
          </div>
          <div className={styles.teamGrid}>
            {team.map(({ name, role, initials, color }) => (
              <div key={name} className={`${styles.teamCard} card`}>
                <div className={styles.teamAvatar} style={{ background: `${color}20`, color }}>{initials}</div>
                <h3 className={styles.teamName}>{name}</h3>
                <p className={styles.teamRole}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaBlob} />
        <div className="container">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>{t('cta_title')}</h2>
            <p className={styles.ctaSub}>{t('cta_sub')}</p>
            <Link href="/iletisim" className="btn btn-primary">
              {t('cta_btn')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
