import { useTranslations } from 'next-intl';
import { PHONE_TEL, WHATSAPP_URL } from '@/constants/contact';
import styles from './FloatingContact.module.css';

/** Fixed quick-contact buttons: call on the left, WhatsApp on the right. */
export default function FloatingContact() {
  const t = useTranslations('header');

  return (
    <>
      <a href={`tel:${PHONE_TEL}`} className={`${styles.fab} ${styles.call}`} aria-label={t('float_call')}>
        <span className={styles.icon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
          </svg>
        </span>
        <span className={styles.label}>{t('float_call')}</span>
      </a>

      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${styles.fab} ${styles.whatsapp}`} aria-label={t('float_whatsapp')}>
        <span className={styles.label}>{t('float_whatsapp')}</span>
        <span className={styles.icon}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 012.2 12C2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 7 2.9a9.8 9.8 0 012.9 7c0 5.4-4.4 9.7-9.9 9.7z" />
          </svg>
        </span>
      </a>
    </>
  );
}
