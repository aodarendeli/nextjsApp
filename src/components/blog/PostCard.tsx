import { Link } from '@/i18n/navigation';
import type { PostSummary as Post } from '@/content/blog';
import CategoryIcon from './CategoryIcon';
import styles from './blog.module.css';

type Props = {
  post: Post;
  date: string;
  categoryLabel: string;
  readLabel: string;
  moreLabel: string;
  featured?: string;
  index?: number;
};

export default function PostCard({ post, date, categoryLabel, readLabel, moreLabel, featured, index = 0 }: Props) {
  return (
    <Link
      href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
      className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}
      style={{ '--accent': post.color, '--d': index % 3 } as React.CSSProperties}
      data-reveal
    >
      <div className={styles.thumb}>
        <span className={styles.thumbRing} />
        <span className={styles.thumbRing2} />
        <span className={styles.thumbIcon}>
          <CategoryIcon category={post.category} size={featured ? 40 : 30} />
        </span>
        {featured && <span className={styles.featuredTag}>★ {featured}</span>}
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.cat}>{categoryLabel}</span>
          <span className={styles.dot} />
          <time dateTime={post.published}>{date}</time>
          <span className={styles.dot} />
          <span>{post.readMinutes} {readLabel}</span>
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <span className={styles.more}>
          {moreLabel}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </span>
      </div>
    </Link>
  );
}
