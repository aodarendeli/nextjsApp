'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ServiceIcon from '@/components/ServiceIcon';
import { validateQuoteContact, LIMITS, type FieldError, type QuoteContact } from '@/utils/validation';
import styles from './page.module.css';

const SERVICES = [
  { key: 'svc_web', icon: 'web', color: '#5b5bf0' },
  { key: 'svc_ecom', icon: 'cart', color: '#8b5cf6' },
  { key: 'svc_mobile', icon: 'mobile', color: '#0ea5e9' },
  { key: 'svc_social', icon: 'social', color: '#f59e0b' },
  { key: 'svc_auto', icon: 'auto', color: '#10b981' },
  { key: 'svc_marketing', icon: 'ads', color: '#06b6d4' },
  { key: 'svc_seo', icon: 'seo', color: '#f43f5e' },
  { key: 'svc_other', icon: 'plus', color: '#64748b' },
] as const;
const BUDGETS   = ['budget_1', 'budget_2', 'budget_3', 'budget_4', 'budget_5'] as const;
const TIMELINES = ['timeline_1', 'timeline_2', 'timeline_3', 'timeline_4'] as const;
const TOTAL_STEPS = 3;

type ChoiceField = 'service' | 'budget' | 'timeline';
type ServiceKey = (typeof SERVICES)[number]['key'];

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const Check = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
);

export default function QuotePage() {
  const t = useTranslations('quote');
  const [step, setStep]         = useState(1);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [service, setService]   = useState<ServiceKey | ''>('');
  const [budget, setBudget]     = useState('');
  const [timeline, setTimeline] = useState('');
  const [details, setDetails]   = useState('');
  const [choiceErrors, setChoiceErrors] = useState<Partial<Record<ChoiceField, boolean>>>({});
  const [shakeKey, setShakeKey] = useState(0);
  const [contact, setContact]   = useState<QuoteContact>({ name: '', email: '', phone: '', company: '' });
  const [errors, setErrors]     = useState<Partial<Record<keyof QuoteContact, FieldError>>>({});
  const [touched, setTouched]   = useState<Partial<Record<keyof QuoteContact, boolean>>>({});
  const [website, setWebsite]   = useState('');
  const [done, setDone]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [submitError, setSubmitError] = useState('');

  const sectionRefs = {
    service: useRef<HTMLDivElement>(null),
    budget: useRef<HTMLDivElement>(null),
    timeline: useRef<HTMLDivElement>(null),
  };
  const cardRef = useRef<HTMLDivElement>(null);

  const goTo = (next: number) => {
    setDirection(next > step ? 'forward' : 'back');
    setStep(next);
    setChoiceErrors({});
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /** Flags every missing choice on the current step, shakes it and scrolls to the first one. */
  const requireChoices = (required: Partial<Record<ChoiceField, string>>) => {
    const missing = (Object.keys(required) as ChoiceField[]).filter((f) => !required[f]);
    if (!missing.length) return true;
    setChoiceErrors(Object.fromEntries(missing.map((f) => [f, true])));
    setShakeKey((k) => k + 1);
    sectionRefs[missing[0]].current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  };

  const pick = (field: ChoiceField, setter: (v: string) => void, value: string) => {
    setter(value);
    setChoiceErrors((prev) => ({ ...prev, [field]: false }));
  };

  const updateContact = (name: keyof QuoteContact, value: string) => {
    const next = { ...contact, [name]: value };
    setContact(next);
    if (touched[name]) setErrors(validateQuoteContact(next));
  };

  const blur = (name: keyof QuoteContact) => {
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors(validateQuoteContact(contact));
  };

  const fieldError = (name: keyof QuoteContact) =>
    touched[name] && errors[name] ? t(`err_${errors[name]}` as 'err_required') : '';

  const submit = async () => {
    setSubmitError('');
    const errs = validateQuoteContact(contact);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, company: true });
    if (Object.keys(errs).length) {
      setShakeKey((k) => k + 1);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: service ? t(service) : '',
          budget: budget ? t(budget as (typeof BUDGETS)[number]) : '',
          timeline: timeline ? t(timeline as (typeof TIMELINES)[number]) : '',
          details,
          contact,
          fs_hp_check: website,
        }),
      });
      if (res.ok) {
        setDone(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (res.status === 422 && data.errors) setErrors(data.errors);
      else setSubmitError(t(res.status === 429 ? 'err_rate_limited' : 'err_send_failed'));
    } catch {
      setSubmitError(t('err_send_failed'));
    } finally {
      setLoading(false);
    }
  };

  const errorClass = (field: ChoiceField) => (choiceErrors[field] ? styles.groupError : '');

  const ChoiceError = ({ field, message }: { field: ChoiceField; message: string }) =>
    choiceErrors[field] ? (
      <p className={styles.choiceError} role="alert">
        <AlertIcon />
        {message}
      </p>
    ) : null;

  if (done) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.successWrap}>
            <div className={styles.successIcon}>
              <svg viewBox="0 0 52 52" aria-hidden="true">
                <circle cx="26" cy="26" r="24" />
                <path d="M15 27l7 7 15-15" />
              </svg>
            </div>
            <h1 className={styles.successTitle}>{t('success_title')}</h1>
            <p className={styles.successMsg}>{t('success_msg')}</p>
            <Link href="/" className="btn btn-primary">{t('success_btn')}</Link>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge animate-fade-up">{t('hero_badge')}</span>
          <h1 className={`${styles.title} animate-fade-up delay-1`}>{t('hero_title')}</h1>
          <p className={`${styles.sub} animate-fade-up delay-2`}>{t('hero_sub')}</p>
        </div>

        {/* Steps indicator */}
        <div className={`${styles.steps} animate-fade-up delay-3`}>
          <div className={styles.stepTrack}>
            <div className={styles.stepTrackFill} style={{ width: `${progress}%` }} />
          </div>
          {[1, 2, 3].map((s) => (
            <div key={s} className={`${styles.stepWrap} ${step >= s ? styles.stepActive : ''} ${step === s ? styles.stepCurrent : ''}`}>
              <span className={styles.stepDot}>{step > s ? <Check /> : s}</span>
              <span className={styles.stepLabel}>{t(`step_${s}` as 'step_1' | 'step_2' | 'step_3')}</span>
            </div>
          ))}
        </div>

        {/* Step content */}
        <div ref={cardRef} className={`${styles.card} animate-fade-up delay-4`}>
          <div className={styles.cardTop}>
            <span className={styles.stepCounter}>{t('step_counter', { current: step, total: TOTAL_STEPS })}</span>
            <div className={styles.progressBar}><span style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} /></div>
          </div>

          <div key={step} className={`${styles.stepContent} ${direction === 'back' ? styles.fromLeft : styles.fromRight}`}>
            {step === 1 && (
              <>
                <div
                  ref={sectionRefs.service}
                  key={`service-${choiceErrors.service ? shakeKey : 0}`}
                  className={`${styles.group} ${errorClass('service')}`}
                >
                  <h2 className={styles.stepTitle}>{t('service_label')}</h2>
                  <div className={styles.serviceGrid} role="radiogroup" aria-label={t('service_label')}>
                    {SERVICES.map(({ key, icon, color }) => {
                      const active = service === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          className={`${styles.serviceBtn} ${active ? styles.serviceBtnActive : ''}`}
                          style={{ '--accent': color } as React.CSSProperties}
                          onClick={() => pick('service', (v) => setService(v as ServiceKey), key)}
                        >
                          <span className={styles.serviceIcon}><ServiceIcon name={icon} /></span>
                          <span className={styles.serviceName}>{t(key)}</span>
                          <span className={styles.serviceCheck}><Check size={11} /></span>
                        </button>
                      );
                    })}
                  </div>
                  <ChoiceError field="service" message={t('err_select_service')} />
                </div>

                <div
                  ref={sectionRefs.budget}
                  key={`budget-${choiceErrors.budget ? shakeKey : 0}`}
                  className={`${styles.group} ${errorClass('budget')}`}
                >
                  <h2 className={styles.stepTitle}>{t('budget_label')}</h2>
                  <div className={styles.chipGroup} role="radiogroup" aria-label={t('budget_label')}>
                    {BUDGETS.map((key) => (
                      <label key={key} className={`${styles.chip} ${budget === key ? styles.chipActive : ''}`}>
                        <input type="radio" name="budget" value={key} checked={budget === key} onChange={() => pick('budget', setBudget, key)} className={styles.radioInput} />
                        <span className={styles.radioDot} />
                        {t(key)}
                      </label>
                    ))}
                  </div>
                  <ChoiceError field="budget" message={t('err_select_budget')} />
                </div>

                <div className={styles.btnRow}>
                  <span />
                  <button type="button" className="btn btn-primary" onClick={() => requireChoices({ service, budget }) && goTo(2)}>
                    {t('next_btn')}
                    <ArrowRight />
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div
                  ref={sectionRefs.timeline}
                  key={`timeline-${choiceErrors.timeline ? shakeKey : 0}`}
                  className={`${styles.group} ${errorClass('timeline')}`}
                >
                  <h2 className={styles.stepTitle}>{t('timeline_label')}</h2>
                  <div className={styles.chipGroup} role="radiogroup" aria-label={t('timeline_label')}>
                    {TIMELINES.map((key) => (
                      <label key={key} className={`${styles.chip} ${timeline === key ? styles.chipActive : ''}`}>
                        <input type="radio" name="timeline" value={key} checked={timeline === key} onChange={() => pick('timeline', setTimeline, key)} className={styles.radioInput} />
                        <span className={styles.radioDot} />
                        {t(key)}
                      </label>
                    ))}
                  </div>
                  <ChoiceError field="timeline" message={t('err_select_timeline')} />
                </div>

                <div className={styles.group}>
                  <h2 className={styles.stepTitle}>
                    {t('details_label')} <span className={styles.optional}>{t('optional')}</span>
                  </h2>
                  <textarea
                    rows={5}
                    maxLength={LIMITS.message}
                    className={styles.textarea}
                    placeholder={t('details_placeholder')}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>

                <div className={styles.btnRow}>
                  <button type="button" className="btn btn-ghost" onClick={() => goTo(1)}>
                    <ArrowLeft />
                    {t('back_btn')}
                  </button>
                  <button type="button" className="btn btn-primary" onClick={() => requireChoices({ timeline }) && goTo(3)}>
                    {t('next_btn')}
                    <ArrowRight />
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className={styles.summary}>
                  <span className={styles.summaryLabel}>{t('summary_label')}</span>
                  <div className={styles.summaryChips}>
                    {service && <span className={styles.summaryChip}>{t(service)}</span>}
                    {budget && <span className={styles.summaryChip}>{t(budget as (typeof BUDGETS)[number])}</span>}
                    {timeline && <span className={styles.summaryChip}>{t(timeline as (typeof TIMELINES)[number])}</span>}
                  </div>
                  <button type="button" className={styles.summaryEdit} onClick={() => goTo(1)}>{t('edit_btn')}</button>
                </div>

                <h2 className={styles.stepTitle}>{t('step_3')}</h2>
                <div key={`contact-${shakeKey}`} className={`${styles.formGrid} ${Object.keys(errors).length && shakeKey ? styles.shake : ''}`}>
                  {/* Honeypot: hidden from users, catches bots */}
                  <input type="text" name="fs_hp_check" tabIndex={-1} autoComplete="new-password" data-lpignore="true" data-1p-ignore="true" aria-hidden="true" className={styles.honeypot} value={website} onChange={(e) => setWebsite(e.target.value)} />
                  <div className={styles.formGroup}>
                    <label htmlFor="q-name" className={styles.label}>{t('name_label')} *</label>
                    <input id="q-name" type="text" autoComplete="name" maxLength={LIMITS.name} className={`${styles.input} ${fieldError('name') ? styles.inputError : ''}`} placeholder={t('name_placeholder')} value={contact.name} onChange={(e) => updateContact('name', e.target.value)} onBlur={() => blur('name')} aria-invalid={!!fieldError('name')} />
                    {fieldError('name') && <span className={styles.errorText}><AlertIcon />{fieldError('name')}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="q-email" className={styles.label}>{t('email_label')} *</label>
                    <input id="q-email" type="email" autoComplete="email" inputMode="email" className={`${styles.input} ${fieldError('email') ? styles.inputError : ''}`} placeholder={t('email_placeholder')} value={contact.email} onChange={(e) => updateContact('email', e.target.value)} onBlur={() => blur('email')} aria-invalid={!!fieldError('email')} />
                    {fieldError('email') && <span className={styles.errorText}><AlertIcon />{fieldError('email')}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="q-phone" className={styles.label}>{t('phone_label')} *</label>
                    <input id="q-phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={20} className={`${styles.input} ${fieldError('phone') ? styles.inputError : ''}`} placeholder={t('phone_placeholder')} value={contact.phone} onChange={(e) => updateContact('phone', e.target.value)} onBlur={() => blur('phone')} aria-invalid={!!fieldError('phone')} />
                    {fieldError('phone') && <span className={styles.errorText}><AlertIcon />{fieldError('phone')}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="q-company" className={styles.label}>{t('company_label')}</label>
                    <input id="q-company" type="text" autoComplete="organization" maxLength={LIMITS.company} className={`${styles.input} ${fieldError('company') ? styles.inputError : ''}`} placeholder={t('company_placeholder')} value={contact.company} onChange={(e) => updateContact('company', e.target.value)} onBlur={() => blur('company')} aria-invalid={!!fieldError('company')} />
                    {fieldError('company') && <span className={styles.errorText}><AlertIcon />{fieldError('company')}</span>}
                  </div>
                </div>
                {submitError && <div className={styles.submitError} role="alert"><AlertIcon />{submitError}</div>}
                <div className={styles.btnRow}>
                  <button type="button" className="btn btn-ghost" onClick={() => goTo(2)}>
                    <ArrowLeft />
                    {t('back_btn')}
                  </button>
                  <button type="button" className="btn btn-primary" onClick={submit} disabled={loading}>
                    {loading && <span className={styles.spinner} />}
                    {loading ? t('submitting') : t('submit_btn')}
                    {!loading && <Check size={16} />}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
