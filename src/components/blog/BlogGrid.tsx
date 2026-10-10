'use client';

import { useEffect, useState } from 'react';
import type { BlogCategory, PostSummary as Post } from '@/content/blog';
import PostCard from './PostCard';
import styles from './blog.module.css';

type Labels = {
  all: string;
  categories: Record<BlogCategory, string>;
  readLabel: string;
  moreLabel: string;
  featured: string;
  empty: string;
};

type Props = { posts: Post[]; dates: Record<string, string>; labels: Labels };

export default function BlogGrid({ posts, dates, labels }: Props) {
  const [active, setActive] = useState<BlogCategory | 'all'>('all');
  const visible = active === 'all' ? posts : posts.filter((p) => p.category === active);
  const categories = (Object.keys(labels.categories) as BlogCategory[]).filter((c) => posts.some((p) => p.category === c));

  // Cards rendered after a filter change must not wait for the scroll observer.
  useEffect(() => {
    document.querySelectorAll(`.${styles.grid} [data-reveal]`).forEach((el) => el.classList.add('is-visible'));
  }, [active]);

  return (
    <>
      <div className={styles.filters} role="tablist">
        {(['all', ...categories] as const).map((cat) => {
          const count = cat === 'all' ? posts.length : posts.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              className={`${styles.filter} ${active === cat ? styles.filterActive : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat === 'all' ? labels.all : labels.categories[cat]}
              <span className={styles.filterCount}>{count}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>{labels.empty}</p>
      ) : (
        <div key={active} className={styles.grid}>
          {visible.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              index={i}
              date={dates[post.id]}
              categoryLabel={labels.categories[post.category]}
              readLabel={labels.readLabel}
              moreLabel={labels.moreLabel}
              featured={active === 'all' && i === 0 ? labels.featured : undefined}
            />
          ))}
        </div>
      )}
    </>
  );
}
