import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label="Anasayfa">
            <span className="footer-logo-mark">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5v14M7 8h10M5 11.5c2.1 0 3.5-1.4 5-3.5 1.5 2.1 2.9 3.5 5 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M5.5 11.5c0 2 1.6 3.5 3.5 3.5s3.5-1.5 3.5-3.5M12.5 11.5c0 2 1.6 3.5 3.5 3.5s3.5-1.5 3.5-3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <span className="footer-logo-text">
              <strong>Tazminat Hesaplama</strong>
              <small>Turk Is Hukuku Rehberi</small>
            </span>
          </Link>
          <p>
            4857 sayili Is Kanunu&apos;na gore kidem, ihbar ve yillik izin odemeleri icin ucretsiz hesaplama
            araci. Veriler tarayiciniz disina cikmaz.
          </p>
          <div className="footer-social">
            <a
              className="social-linkedin"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.94 8.5a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24ZM5.5 9.75h2.88V18H5.5V9.75Zm4.7 0h2.76v1.13h.04c.39-.73 1.33-1.5 2.73-1.5 2.92 0 3.46 1.92 3.46 4.42V18h-2.88v-3.72c0-.89-.02-2.03-1.24-2.03-1.24 0-1.43.97-1.43 1.97V18H10.2V9.75Z" />
              </svg>
            </a>
            <a
              className="social-facebook"
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.3c0-.9.3-1.5 1.5-1.5h1.5V5.1c-.3 0-1.1-.1-2.1-.1-2.1 0-3.4 1.2-3.4 3.6V11H8.5v3h2.4v7h2.6Z" />
              </svg>
            </a>
            <a
              className="social-youtube"
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.58 7.19a2.98 2.98 0 0 0-2.1-2.1C17.62 4.5 12 4.5 12 4.5s-5.62 0-7.48.59a2.98 2.98 0 0 0-2.1 2.1C1.83 9.05 1.83 12 1.83 12s0 2.95.59 4.81a2.98 2.98 0 0 0 2.1 2.1c1.86.59 7.48.59 7.48.59s5.62 0 7.48-.59a2.98 2.98 0 0 0 2.1-2.1c.59-1.86.59-4.81.59-4.81s0-2.95-.59-4.81ZM10.2 15.2V8.8L15.8 12l-5.6 3.2Z" />
              </svg>
            </a>
            <a
              className="social-instagram"
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.4" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              className="social-twitter"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.62 6.46c-.63.28-1.3.47-2 .55a3.5 3.5 0 0 0 1.53-1.93 7.03 7.03 0 0 1-2.22.85 3.49 3.49 0 0 0-5.95 3.18 9.9 9.9 0 0 1-7.19-3.64 3.49 3.49 0 0 0 1.08 4.66 3.46 3.46 0 0 1-1.58-.44v.04a3.49 3.49 0 0 0 2.8 3.42 3.6 3.6 0 0 1-.92.12c-.22 0-.44-.02-.65-.06a3.49 3.49 0 0 0 3.25 2.42A7 7 0 0 1 4 17.54a9.86 9.86 0 0 0 5.35 1.57c6.42 0 9.93-5.32 9.93-9.93 0-.15 0-.3-.01-.45a7.1 7.1 0 0 0 1.75-1.81l-.4-.46Z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-links">
          <h4>ARACLAR</h4>
          <ul>
            <li>
              <Link href="/#hesapla">Kidem Tazminati Hesaplama</Link>
            </li>
            <li>
              <Link href="/ihbar-tazminati-hesaplama">Ihbar Tazminati Hesaplama</Link>
            </li>
            <li>
              <Link href="/yillik-izin-ucreti-hesaplama">Yillik Izin Ucreti Hesaplama</Link>
            </li>
            <li>
              <Link href="/#hesapla">Detayli Hesaplayici</Link>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>BILGI</h4>
          <ul>
            <li>
              <Link href="/kidem-tazminati-nedir">Kidem Tazminati Nedir?</Link>
            </li>
            <li>
              <Link href="/ihbar-sureleri">Ihbar Sureleri</Link>
            </li>
            <li>
              <Link href="/tazminat-tavani-2024">2024 Tavan Tutarlari</Link>
            </li>
            <li>
              <Link href="/is-kanunu">Is Kanunu Ozeti</Link>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>YASAL</h4>
          <ul>
            <li>
              <Link href="/gizlilik-politikasi">Gizlilik Politikasi</Link>
            </li>
            <li>
              <Link href="/kullanim-sartlari">Kullanim Sartlari</Link>
            </li>
            <li>
              <Link href="/yasal-uyari">Yasal Uyari</Link>
            </li>
            <li>
              <Link href="/contact">Iletisim</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bar">
        <span>© {year} Tazminat Hesaplama. Tum haklari saklidir.</span>
        <span className="footer-pill">🇹🇷 Turkiye Is Hukuku&apos;na Gore</span>
      </div>
    </footer>
  );
}
