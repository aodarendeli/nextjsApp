'use client';

import styles from './styles.module.css';

export default function BackToTop({ label }: { label: string }) {
  return (
    <button type="button" className={styles.toTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={label}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}
