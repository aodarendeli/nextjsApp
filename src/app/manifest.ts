import { MetadataRoute } from 'next';
import { SITE_NAME } from '@/constants/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Dijital Ajans`,
    short_name: SITE_NAME,
    description: 'Web tasarım, mobil uygulama ve sosyal medya yönetimi ajansı.',
    start_url: '/tr',
    display: 'standalone',
    background_color: '#0b0b14',
    theme_color: '#6366f1',
    icons: [
      { src: '/icon', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
