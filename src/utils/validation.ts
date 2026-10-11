// Shared by the client forms and the /api routes so both sides agree on what is valid.

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export const isValidEmail = (value: string) => {
  const v = value.trim();
  return v.length <= 254 && EMAIL_RE.test(v) && !v.includes('..');
};

// Accepts Turkish numbers written as 05xx xxx xx xx, 5xx..., +90 5xx..., 0090 5xx...
// (spaces, dashes, dots and parentheses are ignored). Also allows landlines (2xx, 3xx, 4xx).
export const normalizePhone = (value: string) => {
  let digits = value.replace(/[\s\-().]/g, '');
  if (digits.startsWith('+90')) digits = digits.slice(3);
  else if (digits.startsWith('0090')) digits = digits.slice(4);
  else if (digits.startsWith('90') && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = digits.slice(1);
  return digits;
};

export const isValidPhone = (value: string) => /^[2-5]\d{9}$/.test(normalizePhone(value));

export const formatPhone = (value: string) => {
  const d = normalizePhone(value);
  if (d.length !== 10) return value.trim();
  return `0${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`;
};

export const LIMITS = { name: 100, subject: 150, company: 150, message: 5000 } as const;

export type FieldError =
  | 'required'
  | 'email_invalid'
  | 'phone_invalid'
  | 'name_short'
  | 'message_short'
  | 'too_long';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function validateContact(p: ContactPayload) {
  const errors: Partial<Record<keyof ContactPayload, FieldError>> = {};
  const name = p.name.trim();
  if (!name) errors.name = 'required';
  else if (name.length < 2) errors.name = 'name_short';
  else if (name.length > LIMITS.name) errors.name = 'too_long';

  if (!p.email.trim()) errors.email = 'required';
  else if (!isValidEmail(p.email)) errors.email = 'email_invalid';

  if (p.phone.trim() && !isValidPhone(p.phone)) errors.phone = 'phone_invalid';

  if (p.subject.trim().length > LIMITS.subject) errors.subject = 'too_long';

  const message = p.message.trim();
  if (!message) errors.message = 'required';
  else if (message.length < 10) errors.message = 'message_short';
  else if (message.length > LIMITS.message) errors.message = 'too_long';

  return errors;
}

export interface QuoteContact {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export function validateQuoteContact(c: QuoteContact) {
  const errors: Partial<Record<keyof QuoteContact, FieldError>> = {};
  const name = c.name.trim();
  if (!name) errors.name = 'required';
  else if (name.length < 2) errors.name = 'name_short';
  else if (name.length > LIMITS.name) errors.name = 'too_long';

  if (!c.email.trim()) errors.email = 'required';
  else if (!isValidEmail(c.email)) errors.email = 'email_invalid';

  if (!c.phone.trim()) errors.phone = 'required';
  else if (!isValidPhone(c.phone)) errors.phone = 'phone_invalid';

  if (c.company.trim().length > LIMITS.company) errors.company = 'too_long';

  return errors;
}
