import { NextResponse } from 'next/server';
import { formatPhone, LIMITS, validateQuoteContact, type QuoteContact } from '@/utils/validation';
import { isMailConfigured, sendFormMail } from '@/utils/mailer';
import { clientIp, isRateLimited } from '@/utils/rateLimit';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields, humans don't. Pretend success.
  if (typeof body.fs_hp_check === 'string' && body.fs_hp_check) {
    console.warn('[quote] honeypot triggered, message dropped', clientIp(req));
    return NextResponse.json({ ok: true });
  }

  const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
  const c = (body.contact ?? {}) as Record<string, unknown>;
  const contact: QuoteContact = {
    name: typeof c.name === 'string' ? c.name : '',
    email: typeof c.email === 'string' ? c.email : '',
    phone: typeof c.phone === 'string' ? c.phone : '',
    company: typeof c.company === 'string' ? c.company : '',
  };
  const service = str(body.service);
  const budget = str(body.budget);
  const timeline = str(body.timeline);
  const details = str(body.details, LIMITS.message);

  const errors = validateQuoteContact(contact);
  if (!service || !budget || !timeline || Object.keys(errors).length) {
    return NextResponse.json({ error: 'validation', errors }, { status: 422 });
  }

  if (isRateLimited(clientIp(req))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  if (!isMailConfigured()) {
    console.error('[quote] SMTP env vars are missing');
    return NextResponse.json({ error: 'mail_not_configured' }, { status: 500 });
  }

  try {
    await sendFormMail({
      subject: `Teklif Talebi: ${service} — ${contact.name.trim()}`,
      replyTo: contact.email.trim(),
      rows: [
        ['Ad Soyad', contact.name.trim()],
        ['E-posta', contact.email.trim()],
        ['Telefon', formatPhone(contact.phone)],
        ['Şirket', contact.company.trim()],
        ['Hizmet', service],
        ['Bütçe', budget],
        ['Başlangıç', timeline],
        ['Detaylar', details],
      ],
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[quote] send failed', err);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}
