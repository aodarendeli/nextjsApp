import { Fragment, type ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { WHATSAPP_URL } from '@/constants/contact';
import type { Block } from '@/content/blog';
import styles from './article.module.css';

/** Renders **bold** segments; everything else is plain text. */
function inline(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>
  );
}

type CtaLabels = { title: string; text: string; button: string; secondary: string };

export default function ArticleBody({ blocks, cta }: { blocks: Block[]; cta: CtaLabels }) {
  return (
    <div className={styles.prose}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return <p key={i}>{inline(block.text)}</p>;
          case 'h2':
            return (
              <h2 key={i} id={block.id}>
                <a href={`#${block.id}`} className={styles.anchor} aria-hidden="true">#</a>
                {block.text}
              </h2>
            );
          case 'h3':
            return <h3 key={i}>{inline(block.text)}</h3>;
          case 'ul':
            return <ul key={i}>{block.items.map((item, j) => <li key={j}>{inline(item)}</li>)}</ul>;
          case 'ol':
            return <ol key={i}>{block.items.map((item, j) => <li key={j}>{inline(item)}</li>)}</ol>;
          case 'tip':
            return (
              <aside key={i} className={styles.tip}>
                <span className={styles.tipIcon} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0012 2z" /></svg>
                </span>
                <div>
                  <p className={styles.tipTitle}>{block.title}</p>
                  <p>{inline(block.text)}</p>
                </div>
              </aside>
            );
          case 'table':
            return (
              <div key={i} className={styles.tableWrap}>
                <table>
                  <thead><tr>{block.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r}>{row.map((cell, c) => <td key={c}>{inline(cell)}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'cta':
            return (
              <div key={i} className={styles.inlineCta}>
                <div>
                  <p className={styles.inlineCtaTitle}>{cta.title}</p>
                  <p className={styles.inlineCtaText}>{cta.text}</p>
                </div>
                <div className={styles.inlineCtaActions}>
                  <Link href="/teklif-al" className="btn btn-light">{cta.button}</Link>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-glass">{cta.secondary}</a>
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
