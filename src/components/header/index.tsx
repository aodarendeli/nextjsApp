'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter as useNextRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import styles from './styles.module.css';

const navItems = [
  { key: 'home',     href: '/'          },
  { key: 'services', href: '/hizmetler' },
  { key: 'pricing',  href: '/fiyatlar'  },
  { key: 'about',    href: '/hakkimizda'},
  { key: 'blog',     href: '/blog'      },
  { key: 'contact',  href: '/iletisim'  },
] as const;

export default function Header() {
  const t       = useTranslations('header');
  const locale  = useLocale();
  const router  = useRouter();
  const pathname = usePathname();
  const params   = useParams();
  const nextRouter = useNextRouter();

  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const switchLocale = (next: 'tr' | 'en') => {
    // Pages publish their translated URL as an hreflang link; this also covers blog posts whose slugs differ per language.
    const alternate = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${next === 'tr' ? 'tr-TR' : 'en'}"]`);
    if (alternate) {
      const url = new URL(alternate.href);
      nextRouter.replace(url.pathname + window.location.hash);
      return;
    }
    // @ts-expect-error -- params always match the current pathname
    router.replace({ pathname, params }, { locale: next });
  };

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));

  const headerClass = [styles.header, scrolled ? styles.scrolled : ''].join(' ');
  const burgerClass = [styles.burger,  open    ? styles.open    : ''].join(' ');
  const drawerClass = [styles.drawer,  open    ? styles.open    : ''].join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>F</div>
            <span className={styles.logoText}>
              <span className={styles.logoFree}>Free</span>
              <span className={styles.logoStudio}>Studio</span>
            </span>
          </Link>
          {/* Desktop nav */}
          <nav className={styles.nav}>
            {navItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={`${styles.navLink} ${isActive(href) ? styles.active : ''}`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className={styles.right}>
            {/* Language switcher */}
            <div className={styles.langSwitch}>
              {(['tr', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  className={`${styles.langBtn} ${locale === lang ? styles.activeLang : ''}`}
                  onClick={() => switchLocale(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA */}
            <Link href="/teklif-al" className={styles.ctaBtn}>
              {t('get_quote')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>

            {/* Burger */}
            <button
              className={burgerClass}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t('menu_close') : t('menu_open')}
              aria-expanded={open}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={drawerClass} aria-hidden={!open}>
        {navItems.map(({ key, href }, i) => (
          <Link
            key={key}
            href={href}
            className={`${styles.drawerLink} ${isActive(href) ? styles.drawerLinkActive : ''}`}
            style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
          >
            {t(key)}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        ))}

        <div className={styles.drawerDivider} />

        <div className={styles.drawerBottom}>
          <div className={styles.drawerLangRow}>
            {(['tr', 'en'] as const).map((lang) => (
              <button
                key={lang}
                className={`${styles.drawerLangBtn} ${locale === lang ? styles.activeLang : ''}`}
                onClick={() => switchLocale(lang)}
              >
                {lang === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
              </button>
            ))}
          </div>

          <Link href="/teklif-al" className={styles.drawerCtaBtn}>
            {t('get_quote')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
