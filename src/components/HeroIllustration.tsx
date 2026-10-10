import styles from './HeroIllustration.module.css';

type Labels = {
  traffic: string;
  rating: string;
  delivered: string;
  followers: string;
};

/** Decorative hero composition: website mockup, phone with a social post and floating stat chips. */
export default function HeroIllustration({ labels, className = '' }: { labels: Labels; className?: string }) {
  return (
    <div className={`${styles.wrap} ${className}`} aria-hidden="true">
      <div className={styles.ring} />
      <div className={styles.glow} />

      {/* Browser window */}
      <div className={styles.browser}>
        <div className={styles.toolbar}>
          <span className={styles.dot} style={{ background: '#ff6b6b' }} />
          <span className={styles.dot} style={{ background: '#ffc94d' }} />
          <span className={styles.dot} style={{ background: '#4ade80' }} />
          <div className={styles.url}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
            freestudio.site
          </div>
        </div>
        <div className={styles.page}>
          <div className={styles.navRow}>
            <span className={styles.logoMark} />
            <span className={styles.line} style={{ width: 34 }} />
            <span className={styles.line} style={{ width: 34 }} />
            <span className={styles.line} style={{ width: 34 }} />
            <span className={styles.pill} />
          </div>
          <div className={styles.heroRow}>
            <div className={styles.heroText}>
              <span className={styles.h1} />
              <span className={styles.h1b} />
              <span className={styles.line} style={{ width: '90%' }} />
              <span className={styles.line} style={{ width: '70%' }} />
              <div className={styles.btns}>
                <span className={styles.btnA} />
                <span className={styles.btnB} />
              </div>
            </div>
            <div className={styles.chart}>
              {[38, 52, 46, 64, 58, 78, 92].map((h, i) => (
                <span key={i} className={styles.bar} style={{ height: `${h}%`, animationDelay: `${600 + i * 90}ms` }} />
              ))}
            </div>
          </div>
          <div className={styles.cardsRow}>
            {['#5b5bf0', '#8b5cf6', '#06b6d4'].map((c) => (
              <div key={c} className={styles.miniCard}>
                <span className={styles.miniIcon} style={{ background: `${c}22`, color: c }} />
                <span className={styles.line} style={{ width: '80%' }} />
                <span className={styles.lineFaint} style={{ width: '60%' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className={styles.phone}>
        <div className={styles.notch} />
        <div className={styles.screen}>
          <div className={styles.postHead}>
            <span className={styles.avatar} />
            <div className={styles.postMeta}>
              <span className={styles.line} style={{ width: 54 }} />
              <span className={styles.lineFaint} style={{ width: 34 }} />
            </div>
          </div>
          <div className={styles.postImg}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/></svg>
          </div>
          <div className={styles.postActions}>
            <svg className={styles.heart} width="16" height="16" viewBox="0 0 24 24" fill="#f43f5e"><path d="M12 21s-7.5-4.6-10-9.3C.3 8.2 2.4 4 6.3 4c2.2 0 3.7 1.3 4.7 2.7C12 5.3 13.5 4 15.7 4 19.6 4 21.7 8.2 20 11.7 17.5 16.4 12 21 12 21z"/></svg>
            <span className={styles.line} style={{ width: 40 }} />
          </div>
          <span className={styles.lineFaint} style={{ width: '85%' }} />
          <span className={styles.lineFaint} style={{ width: '60%' }} />
        </div>
      </div>

      {/* Floating chips */}
      <div className={`${styles.chip} ${styles.chipTraffic}`}>
        <span className={styles.chipIcon} style={{ background: '#dcfce7', color: '#16a34a' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8M15 7h6v6"/></svg>
        </span>
        <div>
          <strong>+248%</strong>
          <span>{labels.traffic}</span>
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chipRating}`}>
        <span className={styles.chipIcon} style={{ background: '#fef3c7', color: '#d97706' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21.2l1.6-7L2 9.5l7.1-.6z"/></svg>
        </span>
        <div>
          <strong>%98</strong>
          <span>{labels.rating}</span>
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chipFollowers}`}>
        <div className={styles.avatars}>
          <span style={{ background: '#a5b4fc' }} />
          <span style={{ background: '#f9a8d4' }} />
          <span style={{ background: '#67e8f9' }} />
        </div>
        <div>
          <strong>+1.2K</strong>
          <span>{labels.followers}</span>
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chipDone}`}>
        <span className={styles.check}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <span className={styles.doneText}>{labels.delivered}</span>
      </div>
    </div>
  );
}
