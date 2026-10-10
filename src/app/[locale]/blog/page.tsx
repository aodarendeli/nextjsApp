import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/next-intl.config';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/utils/seo';
import { formatPostDate, getPosts, toSummary } from '@/content/blog';
import BlogGrid from '@/components/blog/BlogGrid';
import styles from './page.module.css';

export type Locale = (typeof locales)[number];
type Props = { params: { locale: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return buildPageMetadata({
    locale,
    href: '/blog',
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });

  const posts = getPosts(locale);
  const dates = Object.fromEntries(posts.map((p) => [p.id, formatPostDate(p.published, locale)]));

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <span className="badge animate-fade-up">{t('hero_badge')}</span>
            <h1 className={`${styles.heroTitle} animate-fade-up delay-1`}>{t('hero_title')}</h1>
            <p className={`${styles.heroSub} animate-fade-up delay-2`}>{t('hero_sub')}</p>
          </div>
        </div>
      </section>

      <section className={styles.listSec}>
        <div className="container">
          <BlogGrid
            posts={posts.map(toSummary)}
            dates={dates}
            labels={{
              all: t('all'),
              categories: {
                web: t('category_web'),
                mobile: t('category_mobile'),
                marketing: t('category_marketing'),
                automation: t('category_automation'),
                seo: t('category_seo'),
              },
              readLabel: t('min_read'),
              moreLabel: t('read_more'),
              featured: t('featured'),
              empty: t('empty'),
            }}
          />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band" data-reveal="zoom">
            <h2>{t('cta_title')}</h2>
            <p>{t('cta_sub')}</p>
            <div className="cta-band-actions">
              <Link href="/teklif-al" className="btn btn-light">
                {t('cta_btn')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/iletisim" className="btn btn-glass">{t('cta_secondary')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
