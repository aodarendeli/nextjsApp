'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './page.module.css';

const SERVICES = ['svc_web', 'svc_ecom', 'svc_mobile', 'svc_social', 'svc_auto', 'svc_marketing', 'svc_seo', 'svc_other'] as const;
const BUDGETS   = ['budget_1', 'budget_2', 'budget_3', 'budget_4', 'budget_5'] as const;
const TIMELINES = ['timeline_1', 'timeline_2', 'timeline_3', 'timeline_4'] as const;

export default function QuotePage() {
  const t = useTranslations('quote');
  const [step, setStep]         = useState(1);
  const [service, setService]   = useState('');
  const [budget, setBudget]     = useState('');
  const [timeline, setTimeline] = useState('');
  const [details, setDetails]   = useState('');
  const [contact, setContact]   = useState({ name: '', email: '', phone: '', company: '' });
  const [done, setDone]         = useState(false);
  const [loading, setLoading]   = useState(false);

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.successWrap}>
            <div className={styles.successIcon}>🎉</div>
            <h1 className={styles.successTitle}>{t('success_title')}</h1>
            <p className={styles.successMsg}>{t('success_msg')}</p>
            <Link href="/" className="btn btn-primary">{t('success_btn')}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className="container">
        <div className={styles.header}>
          <span className="badge">{t('hero_badge')}</span>
          <h1 className={styles.title}>{t('hero_title')}</h1>
          <p className={styles.sub}>{t('hero_sub')}</p>
        </div>

        {/* Steps indicator */}
        <div className={styles.steps}>
          {[1, 2, 3].map((s) => (
            <div key={s} className={styles.stepWrap}>
              <div className={`${styles.stepDot} ${step >= s ? styles.stepActive : ''}`}>
                {step > s ? '✓' : s}
              </div>
              <span className={`${styles.stepLabel} ${step >= s ? styles.stepLabelActive : ''}`}>
                {t(`step_${s}` as 'step_1' | 'step_2' | 'step_3')}
              </span>
              {s < 3 && <div className={`${styles.stepLine} ${step > s ? styles.stepLineActive : ''}`} />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className={styles.card}>
          {step === 1 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>{t('service_label')}</h2>
              <div className={styles.serviceGrid}>
                {SERVICES.map((key) => (
                  <button
                    key={key}
                    className={`${styles.serviceBtn} ${service === key ? styles.serviceBtnActive : ''}`}
                    onClick={() => setService(key)}
                  >
                    {t(key)}
                  </button>
                ))}
              </div>
              <h2 className={styles.stepTitle} style={{ marginTop: '32px' }}>{t('budget_label')}</h2>
              <div className={styles.radioGroup}>
                {BUDGETS.map((key) => (
                  <label key={key} className={`${styles.radioLabel} ${budget === key ? styles.radioActive : ''}`}>
                    <input type="radio" name="budget" value={key} checked={budget === key} onChange={() => setBudget(key)} className={styles.radioInput} />
                    {t(key)}
                  </label>
                ))}
              </div>
              <div className={styles.btnRow}>
                <span />
                <button
                  className="btn btn-primary"
                  onClick={() => setStep(2)}
                  disabled={!service || !budget}
                >
                  {t('next_btn')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>{t('timeline_label')}</h2>
              <div className={styles.radioGroup}>
                {TIMELINES.map((key) => (
                  <label key={key} className={`${styles.radioLabel} ${timeline === key ? styles.radioActive : ''}`}>
                    <input type="radio" name="timeline" value={key} checked={timeline === key} onChange={() => setTimeline(key)} className={styles.radioInput} />
                    {t(key)}
                  </label>
                ))}
              </div>
              <h2 className={styles.stepTitle} style={{ marginTop: '32px' }}>{t('details_label')}</h2>
              <textarea
                rows={5}
                className={styles.textarea}
                placeholder={t('details_placeholder')}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
              <div className={styles.btnRow}>
                <button className="btn btn-ghost" onClick={() => setStep(1)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  {t('back_btn')}
                </button>
                <button className="btn btn-primary" onClick={() => setStep(3)} disabled={!timeline}>
                  {t('next_btn')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>{t('step_3')}</h2>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('name_label')}</label>
                  <input type="text" required className={styles.input} placeholder={t('name_placeholder')} value={contact.name} onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('email_label')}</label>
                  <input type="email" required className={styles.input} placeholder={t('email_placeholder')} value={contact.email} onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('phone_label')}</label>
                  <input type="tel" className={styles.input} placeholder={t('phone_placeholder')} value={contact.phone} onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('company_label')}</label>
                  <input type="text" className={styles.input} placeholder={t('company_placeholder')} value={contact.company} onChange={(e) => setContact((p) => ({ ...p, company: e.target.value }))} />
                </div>
              </div>
              <div className={styles.btnRow}>
                <button className="btn btn-ghost" onClick={() => setStep(2)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  {t('back_btn')}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={submit}
                  disabled={!contact.name || !contact.email || loading}
                >
                  {loading ? t('submitting') : t('submit_btn')}
                  {!loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
