import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";

const HOME_PATH = "/kidem-tazminati-hesaplamasi";

const FOOTER_LINKS = {
  tools: [
    { href: `${HOME_PATH}#hesapla`, label: "Kıdem Tazminatı Hesaplama" },
    { href: "/ihbar-tazminati-hesaplama", label: "İhbar Tazminatı Hesaplama" },
    { href: "/yillik-izin-ucreti-hesaplama", label: "Yıllık İzin Ücreti Hesaplama" }
  ],
  guides: [
    { href: "/toplam-tazminat-hesaplama-kilavuzu", label: "Toplam Tazminat Kılavuzu" },
    { href: "/ihbar-tazminati-nedir", label: "İhbar Tazminatı Nedir?" },
    { href: "/kidem-tazminati-tavani-turkiye-2026", label: "Kıdem Tazminatı Tavanı 2026" },
    { href: "/kidem-tazminati-nedir", label: "Kıdem Tazminatı Nedir?" }
  ],
  info: [
    { href: "/ihbar-sureleri", label: "İhbar Süreleri" },
    { href: "/is-kanunu", label: "İş Kanunu Özeti" }
  ],
  legal: [
    { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
    { href: "/kullanim-sartlari", label: "Kullanım Şartları" },
    { href: "/yasal-uyari", label: "Yasal Uyarı" },
    { href: "/contact", label: "İletişim" }
  ]
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <span className="footer-bg-glow footer-bg-glow--left" aria-hidden="true" />
      <span className="footer-bg-glow footer-bg-glow--right" aria-hidden="true" />
      <span className="footer-bg-mesh" aria-hidden="true" />

      <div className="footer-cta-band scroll-reveal scroll-reveal--up" data-scroll-reveal>
        <span className="footer-cta-shine" aria-hidden="true" />
        <span className="footer-cta-glow footer-cta-glow--lime" aria-hidden="true" />
        <span className="footer-cta-glow footer-cta-glow--white" aria-hidden="true" />
        <div className="container footer-cta-inner">
          <div className="footer-cta-copy">
            <span className="footer-cta-tag">Ücretsiz Hesaplayıcı</span>
            <h3>Kıdem tazminatınızı birkaç dakikada tahmin edin</h3>
            <p>Veriler tarayıcınızda kalır; hızlı, güvenli ve 4857 sayılı İş Kanunu&apos;na göre.</p>
          </div>
          <Link href={`${HOME_PATH}#hesapla`} className="footer-cta-btn">
            Şimdi Hesapla
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="container footer-main scroll-reveal scroll-reveal--up" data-scroll-reveal>
        <div className="footer-brand footer-brand-panel">
          <Link href={HOME_PATH} className="footer-logo" aria-label="Anasayfaya dön">
            <span className="footer-logo-mark">
              <Image src="/logo.png" alt="Tazminat Hesaplama logosu" width={38} height={38} />
            </span>
            <span className="footer-logo-text">
              <strong>Tazminat Hesaplama</strong>
              <small>Türk İş Hukuku Rehberi</small>
            </span>
          </Link>
          <p>
            4857 sayılı İş Kanunu&apos;na göre kıdem, ihbar ve yıllık izin ödemeleri için ücretsiz hesaplama aracı.
            Veriler tarayıcınız dışına çıkmaz.
          </p>
          <div className="footer-trust-row">
            <span className="footer-trust-badge">
              <Sparkles size={14} aria-hidden="true" />
              Ücretsiz
            </span>
            <span className="footer-trust-badge">
              <ShieldCheck size={14} aria-hidden="true" />
              Güvenli
            </span>
            <span className="footer-trust-badge">İş Kanunu 4857</span>
          </div>
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

        <div className="footer-columns scroll-reveal-stagger">
        <div className="footer-links footer-links-panel">
          <h4>ARAÇLAR</h4>
          <ul>
            {FOOTER_LINKS.tools.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>
                  <ChevronRight size={14} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links footer-links-panel">
          <h4>REHBERLER</h4>
          <ul>
            {FOOTER_LINKS.guides.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>
                  <ChevronRight size={14} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links footer-links-panel">
          <h4>BİLGİ</h4>
          <ul>
            {FOOTER_LINKS.info.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>
                  <ChevronRight size={14} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links footer-links-panel">
          <h4>YASAL</h4>
          <ul>
            {FOOTER_LINKS.legal.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>
                  <ChevronRight size={14} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>

      <div className="container footer-bar">
        <span className="footer-bar-line" aria-hidden="true" />
        <span className="footer-bar-copy">© {year} Tazminat Hesaplama. Tüm hakları saklıdır.</span>
      </div>
    </footer>
  );
}
