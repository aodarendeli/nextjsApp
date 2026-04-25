import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/next-intl.config';
import type { Metadata } from 'next';
import styles from './page.module.css';

export type Locale = (typeof locales)[number];
type Props = { params: { locale: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' });
  return { title: t('title') };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });

  const posts = [
    { key: '1', category: t('post_1_category'), title: t('post_1_title'), excerpt: t('post_1_excerpt'), date: t('post_1_date'), read: t('post_1_read'), color: '#6366f1' },
    { key: '2', category: t('post_2_category'), title: t('post_2_title'), excerpt: t('post_2_excerpt'), date: t('post_2_date'), read: t('post_2_read'), color: '#8b5cf6' },
    { key: '3', category: t('post_3_category'), title: t('post_3_title'), excerpt: t('post_3_excerpt'), date: t('post_3_date'), read: t('post_3_read'), color: '#10b981' },
    { key: '4', category: t('post_4_category'), title: t('post_4_title'), excerpt: t('post_4_excerpt'), date: t('post_4_date'), read: t('post_4_read'), color: '#f59e0b' },
    { key: '5', category: t('post_5_category'), title: t('post_5_title'), excerpt: t('post_5_excerpt'), date: t('post_5_date'), read: t('post_5_read'), color: '#f43f5e' },
    { key: '6', category: t('post_6_category'), title: t('post_6_title'), excerpt: t('post_6_excerpt'), date: t('post_6_date'), read: t('post_6_read'), color: '#06b6d4' },
  ];

  const categories = [t('all'), t('category_web'), t('category_mobile'), t('category_marketing'), t('category_automation'), t('category_seo')];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.blob1} />
        <div className="container">
          <div className={styles.heroInner}>
            <span className="badge animate-fade-up">{t('hero_badge')}</span>
            <h1 className={`${styles.heroTitle} animate-fade-up delay-1`}>{t('hero_title')}</h1>
            <p className={`${styles.heroSub} animate-fade-up delay-2`}>{t('hero_sub')}</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '0 0 16px' }}>
        <div className="container">
          <div className={styles.cats}>
            {categories.map((cat, i) => (
              <button key={cat} className={`${styles.catBtn} ${i === 0 ? styles.catActive : ''}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className={styles.grid}>
            {posts.map(({ key, category, title, excerpt, date, read, color }) => (
              <article key={key} className={`${styles.postCard} card`}>
                <div className={styles.postThumb} style={{ background: `${color}15` }}>
                  <div className={styles.postThumbInner} style={{ color }}>
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  </div>
                </div>
                <div className={styles.postContent}>
                  <div className={styles.postMeta}>
                    <span className={styles.postCat} style={{ color, background: `${color}12` }}>{category}</span>
                    <span className={styles.postDate}>{date}</span>
                  </div>
                  <h2 className={styles.postTitle}>{title}</h2>
                  <p className={styles.postExcerpt}>{excerpt}</p>
                  <div className={styles.postFooter}>
                    <span className={styles.readTime}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {read} {t('min_read')}
                    </span>
                    <button className={styles.readMore}>
                      {t('read_more')}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <div className={styles.nlBlob} />
        <div className="container">
          <div className={styles.nlInner}>
            <h2 className={styles.nlTitle}>{t('coming_soon')}</h2>
            <p className={styles.nlSub}>{t('coming_soon_sub')}</p>
            <div className={styles.nlForm}>
              <input type="email" className={styles.nlInput} placeholder={t('subscribe_placeholder')} />
              <button className="btn btn-primary">{t('subscribe_btn')}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
