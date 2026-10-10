'use client';

import { useEffect, useRef } from 'react';
import styles from './article.module.css';

/** Thin bar under the header that fills as the article is read. */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    let frame = 0;
    const update = () => {
      const rect = target.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <div className={styles.progress} aria-hidden="true">
      <div ref={bar} className={styles.progressBar} />
    </div>
  );
}
