'use client';

import { useEffect, useState } from 'react';
import styles from './article.module.css';

type Heading = { id: string; text: string };

export default function TableOfContents({ headings, title }: { headings: Heading[]; title: string }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-100px 0px -65% 0px' }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className={styles.toc} aria-label={title}>
      <p className={styles.tocTitle}>{title}</p>
      <ol className={styles.tocList}>
        {headings.map(({ id, text }, i) => (
          <li key={id}>
            <a href={`#${id}`} className={`${styles.tocLink} ${active === id ? styles.tocActive : ''}`}>
              <span className={styles.tocNum}>{String(i + 1).padStart(2, '0')}</span>
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
