import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_TEL, SOCIAL_LINKS, WHATSAPP_URL } from '@/constants/contact';
import { formatPostDate, getPosts, type BlogLocale } from '@/content/blog';
import BackToTop from './BackToTop';
import styles from './styles.module.css';

const SOCIAL_ICONS: Record<(typeof SOCIAL_LINKS)[number]['label'], JSX.Element> = {
  Instagram: <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.9 1.4 1.4 0 000-2.9z" />,
  LinkedIn: <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4a2.1 2.1 0 110-4.1 2.1 2.1 0 010 4.1zm1.8 13.1H3.6V9h3.5v11.5z" />,
  X: <path d="M18.2 2.3h3.3l-7.2 8.3 8.5 11.2h-6.7l-5.2-6.8-6 6.8H1.7l7.7-8.8L1.3 2.3h6.8l4.7 6.2 5.4-6.2zm-1.1 17.5h1.8L7.1 4.1H5.1l12 15.7z" />,
  YouTube: <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />,
};

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 012.2 12C2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 7 2.9a9.8 9.8 0 012.9 7c0 5.4-4.4 9.7-9.9 9.7z" /></svg>
);

const SERVICE_LINKS = [
  { key: 'web_dev', hash: 'web' },
  { key: 'mobile_app', hash: 'mobile' },
  { key: 'social_media', hash: 'social' },
  { key: 'digital_marketing', hash: 'ads' },
  { key: 'seo', hash: 'seo' },
  { key: 'automation', hash: 'auto' },
] as const;

export default function Footer() {
  const t      = useTranslations('footer');
  const locale = useLocale() as BlogLocale;
  const year   = new Date().getFullYear();
  const latest = getPosts(locale).slice(0, 3);
  const socials = SOCIAL_LINKS.filter((s) => s.href);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Contact strip */}
        <div className={styles.contactStrip}>
          <div className={styles.stripText} data-reveal>
            <h2 className={styles.stripTitle}>{t('cta_title')}</h2>
            <p className={styles.stripSub}>{t('cta_sub')}</p>
          </div>
          <div className={styles.tiles}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.tile} style={{ '--accent': '#25d366', '--d': 0 } as React.CSSProperties} data-reveal>
              <span className={styles.tileIcon}><WhatsAppIcon /></span>
              <span className={styles.tileLabel}>{t('whatsapp')}</span>
              <span className={styles.tileValue}><span className={styles.statusDot} />{t('response')}</span>
              <span className={styles.tileArrow} aria-hidden="true">↗</span>
            </a>
            <a href={`tel:${PHONE_TEL}`} className={styles.tile} style={{ '--accent': '#7c7ff6', '--d': 1 } as React.CSSProperties} data-reveal>
              <span className={styles.tileIcon}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" /></svg>
              </span>
              <span className={styles.tileLabel}>{t('phone_label')}</span>
              <span className={styles.tileValue}>{PHONE_DISPLAY}</span>
              <span className={styles.tileArrow} aria-hidden="true">↗</span>
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.tile} style={{ '--accent': '#22d3ee', '--d': 2 } as React.CSSProperties} data-reveal>
              <span className={styles.tileIcon}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></svg>
              </span>
              <span className={styles.tileLabel}>{t('email_label')}</span>
              <span className={styles.tileValue}>{CONTACT_EMAIL}</span>
              <span className={styles.tileArrow} aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className={styles.grid}>

          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoIcon}>F</div>
              <span className={styles.logoText}>
                <span className={styles.logoFree}>Free</span>
                <span className={styles.logoStudio}>Studio</span>
              </span>
            </Link>
            <p className={styles.tagline}>{t('tagline')}</p>
            <div className={styles.hours}>
              <span className={styles.hoursIcon}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </span>
              <div>
                <strong>{t('hours_title')}</strong>
                <span>{t('hours')} · {t('location')}</span>
              </div>
            </div>
            <Link href="/teklif-al" className={styles.brandCta}>
              {t('cta_btn')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            {socials.length > 0 && (
              <div className={styles.socials}>
                {socials.map(({ href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label={label}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">{SOCIAL_ICONS[label]}</svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <nav className={styles.col} aria-label={t('services_title')}>
            <span className={styles.colTitle}>{t('services_title')}</span>
            {SERVICE_LINKS.map(({ key, hash }) => (
              <Link key={key} href={{ pathname: '/hizmetler', hash }} className={styles.colLink}>{t(key)}</Link>
            ))}
          </nav>

          {/* Company */}
          <nav className={styles.col} aria-label={t('company_title')}>
            <span className={styles.colTitle}>{t('company_title')}</span>
            <Link href="/hakkimizda" className={styles.colLink}>{t('about')}</Link>
            <Link href="/fiyatlar"   className={styles.colLink}>{t('pricing')}</Link>
            <Link href="/blog"       className={styles.colLink}>{t('blog')}</Link>
            <Link href="/iletisim"   className={styles.colLink}>{t('contact')}</Link>
            <Link href="/teklif-al"  className={styles.colLink}>{t('get_quote')}</Link>
          </nav>

          {/* Latest posts */}
          <div className={styles.col}>
            <span className={styles.colTitle}>{t('latest_title')}</span>
            {latest.map((post) => (
              <Link key={post.id} href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }} className={styles.postLink} style={{ '--accent': post.color } as React.CSSProperties}>
                <span className={styles.postTitle}>{post.title}</span>
                <span className={styles.postDate}>{formatPostDate(post.published, locale)}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Wordmark */}
        <div className={styles.wordmark} aria-hidden="true">FreeStudio</div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>{t('copyright', { year })}</p>
          <p className={styles.madeIn}>{t('made_in')}</p>
          <BackToTop label={t('back_to_top')} />
        </div>
      </div>
    </footer>
  );
}
