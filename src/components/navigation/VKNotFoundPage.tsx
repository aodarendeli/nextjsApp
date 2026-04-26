import Link from 'next/link';
import './style.css';

export default function VKNotFoundPage() {
  return (
    <div className="notfound_container">
      <div className="notfound_blob1" />
      <div className="notfound_blob2" />

      <div className="notfound_inner">
        <div className="notfound_code">404</div>
        <h1 className="notfound_title">Sayfa Bulunamadı</h1>
        <p className="notfound_sub">Aradığınız sayfa mevcut değil veya taşınmış olabilir. Anasayfaya dönün ve doğru linki arayın.</p>

        <Link href="/" className="notfound_btn">
          <span>Anasayfaya Dön</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
