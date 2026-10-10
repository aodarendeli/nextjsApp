import nodemailer from 'nodemailer';
import { CONTACT_EMAIL } from '@/constants/contact';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const isMailConfigured = () =>
  Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

export async function sendFormMail(opts: {
  subject: string;
  replyTo: string;
  rows: [label: string, value: string][];
}) {
  const rows = opts.rows.filter(([, v]) => v.trim());
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="font-weight:bold;vertical-align:top;border-bottom:1px solid #eee">${escapeHtml(k)}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join('')}</table>`;

  await getTransporter().sendMail({
    from: `"FreeStudio Web" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO || CONTACT_EMAIL,
    replyTo: opts.replyTo,
    subject: opts.subject.replace(/[\r\n]+/g, ' '),
    text,
    html,
  });
}
