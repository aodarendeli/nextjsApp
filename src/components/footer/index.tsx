import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './styles.module.css';

export default function Footer() {
  const t    = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>

          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoIcon}>FS</div>
              <span className={styles.logoText}>
                <span className={styles.logoFree}>Free</span>
                <span className={styles.logoStudio}>Studio</span>
              </span>
            </Link>
            <p className={styles.tagline}>{t('tagline')}</p>
            <div className={styles.socials}>
              {[
                { href: '#', label: 'Instagram', icon: (
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                )},
                { href: '#', label: 'LinkedIn', icon: (
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                )},
                { href: '#', label: 'Twitter/X', icon: (
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                )},
                { href: '#', label: 'YouTube', icon: (
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                )},
              ].map(({ href, label, icon }) => (
                <a key={label} href={href} className={styles.socialBtn} aria-label={label}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className={styles.col}>
            <span className={styles.colTitle}>{t('services_title')}</span>
            <Link href="/hizmetler" className={styles.colLink}>{t('web_dev')}</Link>
            <Link href="/hizmetler" className={styles.colLink}>{t('mobile_app')}</Link>
            <Link href="/hizmetler" className={styles.colLink}>{t('digital_marketing')}</Link>
            <Link href="/hizmetler" className={styles.colLink}>{t('social_media')}</Link>
            <Link href="/hizmetler" className={styles.colLink}>{t('automation')}</Link>
            <Link href="/hizmetler" className={styles.colLink}>{t('seo')}</Link>
          </div>

          {/* Company */}
          <div className={styles.col}>
            <span className={styles.colTitle}>{t('company_title')}</span>
            <Link href="/hakkimizda" className={styles.colLink}>{t('about')}</Link>
            <Link href="/blog"       className={styles.colLink}>{t('blog')}</Link>
            <Link href="/fiyatlar"   className={styles.colLink}>{t('pricing')}</Link>
            <Link href="/iletisim"   className={styles.colLink}>{t('contact')}</Link>
            <Link href="/teklif-al"  className={styles.colLink}>{t('get_quote')}</Link>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <span className={styles.colTitle}>{t('contact_title')}</span>
            <a href="tel:+902120000000" className={styles.contactItem}>
              <span className={styles.contactIcon}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </span>
              +90 (212) 000 00 00
            </a>
            <a href="mailto:info@freestudio.com.tr" className={styles.contactItem}>
              <span className={styles.contactIcon}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
              </span>
              info@freestudio.com.tr
            </a>
            <span className={styles.contactItem}>
              <span className={styles.contactIcon}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              İstanbul, Türkiye
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>{t('copyright', { year })}</p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>{t('privacy')}</a>
            <a href="#" className={styles.bottomLink}>{t('terms')}</a>
            <a href="#" className={styles.bottomLink}>{t('cookie')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
