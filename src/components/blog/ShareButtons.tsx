'use client';

import { useState } from 'react';
import styles from './article.module.css';

type Props = { url: string; title: string; labels: { share: string; copy: string; copied: string } };

export default function ShareButtons({ url, title, labels }: Props) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(`${title} ${url}`);
  const enc = encodeURIComponent(url);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${text}`, icon: <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 012.2 12C2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 7 2.9a9.8 9.8 0 012.9 7c0 5.4-4.4 9.7-9.9 9.7z" />, fill: true },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc}`, icon: <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4a2.1 2.1 0 110-4.1 2.1 2.1 0 010 4.1zm1.8 13.1H3.6V9h3.5v11.5z" />, fill: true },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${text}`, icon: <path d="M18.2 2.3h3.3l-7.2 8.3 8.5 11.2h-6.7l-5.2-6.8-6 6.8H1.7l7.7-8.8L1.3 2.3h6.8l4.7 6.2 5.4-6.2zm-1.1 17.5h1.8L7.1 4.1H5.1l12 15.7z" />, fill: true },
  ];

  return (
    <div className={styles.share}>
      <p className={styles.shareTitle}>{labels.share}</p>
      <div className={styles.shareRow}>
        {links.map(({ label, href, icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles.shareBtn} aria-label={label}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">{icon}</svg>
          </a>
        ))}
        <button type="button" onClick={copy} className={`${styles.shareBtn} ${styles.copyBtn} ${copied ? styles.copied : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {copied ? <polyline points="20 6 9 17 4 12" /> : <><path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7" /></>}
          </svg>
          <span>{copied ? labels.copied : labels.copy}</span>
        </button>
      </div>
    </div>
  );
}
