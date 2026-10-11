import { NextResponse } from 'next/server';
import { formatPhone, validateContact, type ContactPayload } from '@/utils/validation';
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
    console.warn('[contact] honeypot triggered, message dropped', clientIp(req));
    return NextResponse.json({ ok: true });
  }

  const str = (v: unknown) => (typeof v === 'string' ? v : '');
  const payload: ContactPayload = {
    name: str(body.name),
    email: str(body.email),
    phone: str(body.phone),
    subject: str(body.subject),
    message: str(body.message),
  };

  const errors = validateContact(payload);
  if (Object.keys(errors).length) return NextResponse.json({ error: 'validation', errors }, { status: 422 });

  if (isRateLimited(clientIp(req))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  if (!isMailConfigured()) {
    console.error('[contact] SMTP env vars are missing');
    return NextResponse.json({ error: 'mail_not_configured' }, { status: 500 });
  }

  try {
    await sendFormMail({
      subject: `İletişim Formu: ${payload.subject.trim() || payload.name.trim()}`,
      replyTo: payload.email.trim(),
      rows: [
        ['Ad Soyad', payload.name.trim()],
        ['E-posta', payload.email.trim()],
        ['Telefon', payload.phone.trim() ? formatPhone(payload.phone) : ''],
        ['Konu', payload.subject.trim()],
        ['Mesaj', payload.message.trim()],
      ],
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed', err);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}
