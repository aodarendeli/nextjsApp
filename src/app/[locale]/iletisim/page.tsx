'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function ContactPage() {
  const t = useTranslations('contact');

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[FreeStudio] Contact form submitted:', form);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.blob1} />
        <div className="container">
          <div className={styles.heroInner}>
            <span className="badge animate-fade-up">{t('hero_badge')}</span>
            <h1 className={`${styles.heroTitle} animate-fade-up delay-1`}>{t('hero_title')}</h1>
            <p className={`${styles.heroSub} animate-fade-up delay-2`}>{t('hero_sub')}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.mainGrid}>
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>{t('form_title')}</h2>
              {sent ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>✓</div>
                  <h3 className={styles.successTitle}>{t('success_title')}</h3>
                  <p className={styles.successMsg}>{t('success_msg')}</p>
                  <button className="btn btn-outline" onClick={() => setSent(false)}>Yeni Mesaj Gönder</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t('name_label')}</label>
                      <input type="text" name="name" required className={styles.input} placeholder={t('name_placeholder')} value={form.name} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t('email_label')}</label>
                      <input type="email" name="email" required className={styles.input} placeholder={t('email_placeholder')} value={form.email} onChange={handleChange} />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t('phone_label')}</label>
                      <input type="tel" name="phone" className={styles.input} placeholder={t('phone_placeholder')} value={form.phone} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t('subject_label')}</label>
                      <input type="text" name="subject" className={styles.input} placeholder={t('subject_placeholder')} value={form.subject} onChange={handleChange} />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t('message_label')}</label>
                    <textarea name="message" required rows={5} className={styles.textarea} placeholder={t('message_placeholder')} value={form.message} onChange={handleChange} />
                  </div>
                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
                    {loading ? t('sending') : t('send_btn')}
                    {!loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>}
                  </button>
                </form>
              )}
            </div>

            <div className={styles.infoCol}>
              <h2 className={styles.infoTitle}>{t('info_title')}</h2>
              <div className={styles.infoCards}>
                {[
                  { icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, label: 'Telefon', value: t('phone'), href: 'tel:+902120000000', color: '#6366f1' },
                  { icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>, label: 'E-posta', value: t('email'), href: 'mailto:info@freestudio.com.tr', color: '#8b5cf6' },
                  { icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: 'Adres', value: t('address'), href: undefined, color: '#06b6d4' },
                  { icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: 'Çalışma Saatleri', value: t('hours'), href: undefined, color: '#f59e0b' },
                ].map(({ icon, label, value, href, color }) => (
                  <a key={label} href={href ?? '#'} className={styles.infoCard} style={{ textDecoration: 'none', cursor: href ? 'pointer' : 'default' }}>
                    <div className={styles.infoIcon} style={{ background: `${color}15`, color }}>{icon}</div>
                    <div>
                      <p className={styles.infoLabel}>{label}</p>
                      <p className={styles.infoValue}>{value}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className={styles.responseTime}>
                <div className={styles.rtDot} />
                <span>{t('response_time')}</span>
              </div>
              <a href="https://wa.me/902120000000" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {/* {t('whatsapp')} */}
                test ozgur232
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
