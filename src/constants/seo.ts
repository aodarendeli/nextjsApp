import { CONTACT_EMAIL, PHONE_TEL, SOCIAL_LINKS } from './contact';

// Canonical production origin. Override with NEXT_PUBLIC_SITE_URL (no trailing slash).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://freestudio.site').replace(/\/$/, '');
export const SITE_NAME = 'FreeStudio';

// Social profiles shown to Google as `sameAs` (filled in via SOCIAL_LINKS in constants/contact.ts).
export const SOCIAL_PROFILES: string[] = SOCIAL_LINKS.map((s) => s.href).filter(Boolean);

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: 'Free Studio A.Ş',
  email: CONTACT_EMAIL,
  telephone: PHONE_TEL,
  foundingDate: '2019',
  country: 'TR',
};
