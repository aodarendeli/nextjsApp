import { useTranslations } from 'next-intl';
import Link from 'next/link';
import './style.css';

export default function VKNotFoundPage() {
  const t = useTranslations('header');
  return (
    <div>
      <div
        style={{ textAlign: 'center' }}
      >
        <div>
          <h1>404: Sayfa Bulunamadı.</h1>
          <h3>Aradığınız sayfa yok ya da bulunamadı.</h3>
          <div className="notfound_link">
            <Link href="/">Anasayfaya dön</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
