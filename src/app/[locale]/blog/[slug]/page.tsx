import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { ORGANIZATION, SITE_NAME, SITE_URL } from '@/constants/seo';
import { absoluteUrl, buildArticleMetadata, postUrl } from '@/utils/seo';
import {
  findPostIdBySlug,
  formatPostDate,
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  getSlug,
  toSummary,
  type BlogLocale,
} from '@/content/blog';
import ArticleBody from '@/components/blog/ArticleBody';
import CategoryIcon from '@/components/blog/CategoryIcon';
import PostCard from '@/components/blog/PostCard';
import ReadingProgress from '@/components/blog/ReadingProgress';
import ShareButtons from '@/components/blog/ShareButtons';
import TableOfContents from '@/components/blog/TableOfContents';
import styles from './page.module.css';

type Props = { params: { locale: BlogLocale; slug: string } };

export const dynamicParams = true;

export function generateStaticParams() {
  return getAllSlugs().map(({ locale, slug }) => ({ locale, slug }));
}

const slugsFor = (id: string) =>
  Object.fromEntries(routing.locales.map((l) => [l, getSlug(l, id)])) as Record<BlogLocale, string>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.locale, params.slug);
  if (!post) return { robots: { index: false } };
  return buildArticleMetadata({
    locale: params.locale,
    slugs: slugsFor(post.id),
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    published: post.published,
    updated: post.updated,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = params;
  setRequestLocale(locale);

  const post = getPostBySlug(locale, slug);
  if (!post) {
    // A slug from the other language (e.g. after switching locale) goes to this language's version.
    const id = findPostIdBySlug(slug);
    if (id) redirect({ href: { pathname: '/blog/[slug]', params: { slug: getSlug(locale, id) } }, locale });
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'blog' });
  const categoryLabel = t(`category_${post.category}`);
  const url = postUrl(locale, post.slug);
  const headings = post.blocks.flatMap((b) => (b.type === 'h2' ? [{ id: b.id, text: b.text }] : []));
  const related = getRelatedPosts(post, locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.description,
        keywords: post.keywords.join(', '),
        articleSection: categoryLabel,
        inLanguage: locale === 'tr' ? 'tr-TR' : 'en',
        datePublished: post.published,
        dateModified: post.updated ?? post.published,
        mainEntityOfPage: url,
        url,
        image: `${SITE_URL}/${locale}/opengraph-image`,
        author: { '@type': 'Organization', name: t('author'), url: SITE_URL },
        publisher: { '@id': `${SITE_URL}/#organization`, '@type': 'Organization', name: ORGANIZATION.name, logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon` } },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t('breadcrumb_home'), item: absoluteUrl(locale, '/') },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl(locale, '/blog') },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className={styles.page} style={{ '--accent': post.color } as React.CSSProperties}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress targetId="article-body" />

      {/* ── Header ── */}
      <header className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={`container ${styles.heroInner}`}>
          <nav className={`${styles.breadcrumb} animate-fade-up`} aria-label="Breadcrumb">
            <Link href="/">{t('breadcrumb_home')}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog">Blog</Link>
            <span aria-hidden="true">/</span>
            <span className={styles.crumbCurrent}>{categoryLabel}</span>
          </nav>

          <span className={`${styles.category} animate-fade-up delay-1`}>
            <CategoryIcon category={post.category} size={16} />
            {categoryLabel}
          </span>
          <h1 className={`${styles.title} animate-fade-up delay-2`}>{post.title}</h1>
          <p className={`${styles.lead} animate-fade-up delay-3`}>{post.excerpt}</p>

          <div className={`${styles.byline} animate-fade-up delay-4`}>
            <span className={styles.avatar}>F</span>
            <div className={styles.bylineText}>
              <strong>{t('author')}</strong>
              <span>
                <time dateTime={post.published}>{formatPostDate(post.published, locale)}</time>
                <span className={styles.sep} />
                {post.readMinutes} {t('min_read')}
                {post.updated && (
                  <>
                    <span className={styles.sep} />
                    {t('updated')}: <time dateTime={post.updated}>{formatPostDate(post.updated, locale)}</time>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className={`container ${styles.layout}`}>
        <aside className={styles.sidebar}>
          <div className={styles.sticky}>
            <Link href="/blog" className={styles.back}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              {t('back_to_blog')}
            </Link>
            <TableOfContents headings={headings} title={t('toc_title')} />
            <ShareButtons url={url} title={post.title} labels={{ share: t('share_title'), copy: t('copy_link'), copied: t('copied') }} />
          </div>
        </aside>

        <article id="article-body" className={styles.article}>
          <ArticleBody
            blocks={post.blocks}
            cta={{ title: t('inline_cta_title'), text: t('inline_cta_text'), button: t('inline_cta_btn'), secondary: t('inline_cta_secondary') }}
          />

          <footer className={styles.articleFooter}>
            <div className={styles.authorCard}>
              <span className={styles.authorAvatar}>F</span>
              <div>
                <strong>{t('author')}</strong>
                <p>{t('author_role')} · {SITE_NAME}</p>
              </div>
            </div>
            <div className={styles.mobileShare}>
              <ShareButtons url={url} title={post.title} labels={{ share: t('share_title'), copy: t('copy_link'), copied: t('copied') }} />
            </div>
          </footer>
        </article>
      </div>

      {/* ── Related ── */}
      <section className={styles.related}>
        <div className="container">
          <h2 className={styles.relatedTitle} data-reveal>{t('related_title')}</h2>
          <div className={styles.relatedGrid}>
            {related.map((p, i) => (
              <PostCard
                key={p.id}
                post={toSummary(p)}
                index={i}
                date={formatPostDate(p.published, locale)}
                categoryLabel={t(`category_${p.category}`)}
                readLabel={t('min_read')}
                moreLabel={t('read_more')}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
