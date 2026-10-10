import { ImageResponse } from 'next/og';

export const alt = 'FreeStudio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The bundled OG font only covers basic Latin, so these strings avoid Turkish-specific letters.
const COPY = {
  tr: { tagline: 'Dijital Ajans', services: 'Web Sitesi · Mobil Uygulama · Sosyal Medya · SEO' },
  en: { tagline: 'Digital Agency', services: 'Websites · Mobile Apps · Social Media · SEO' },
} as const;

export default function OpengraphImage({ params }: { params: { locale: string } }) {
  const copy = params.locale === 'en' ? COPY.en : COPY.tr;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0b0b14 0%, #1a1238 55%, #2a1b5c 100%)',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 60,
              fontWeight: 700,
            }}
          >
            F
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>FreeStudio</div>
        </div>
        <div style={{ marginTop: 48, fontSize: 52, fontWeight: 700, color: '#c4b5fd' }}>{copy.tagline}</div>
        <div style={{ marginTop: 20, fontSize: 34, color: '#d4d4f0' }}>{copy.services}</div>
        <div style={{ marginTop: 'auto', fontSize: 28, color: '#8b8bb0' }}>freestudio.site</div>
      </div>
    ),
    size
  );
}
