"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import AppImage from "@/components/common/AppImage";
import Link from "next/link";
import CalcCta from "@/components/common/CalcCta";
import { H2, H3, H4 } from "@/components/common/Heading";
import { TAZMINAT_HESAPLAMA_PATH } from "@/config/site";
import { DISABLE_AUTO_INTERNAL_LINKS } from "@/config/internalLinks";
import { InternalLink } from "@/utils/linkInternalTerms";
import { IMAGES, IMAGE_ALTS, getImageMeta } from "@/config/images";
import TickMark from "@/components/common/TickMark";
import { ShieldCheck, Sparkles } from "lucide-react";
import { HOME_FAQ_ITEMS } from "@/data/homeFaqItems";

const HowStepsCarousel = dynamic(() => import("@/components/HowStepsCarousel"));
const FaqAccordion = dynamic(() => import("@/components/common/FaqAccordion"));
const SummaryShowcaseIllustration = dynamic(() => import("@/components/SummaryShowcaseIllustration"));

function ContentSection({ id, alt, children, reveal = "up" }) {
  return (
    <section className={`section content-section${alt ? " alt" : ""}`} id={id}>
      <div className={`container scroll-reveal scroll-reveal--${reveal}`}>{children}</div>
    </section>
  );
}

export default function HomeBelowFoldContent() {
  const gerekliGirisRef = useRef(null);

  useEffect(() => {
    const node = gerekliGirisRef.current;
    if (!node) return undefined;

    const reveal = () => node.classList.add("is-revealed");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="section content-section" id="tazminat-turleri">
        <div className="intro-section-bg" aria-hidden="true">
          <AppImage
            src={IMAGES.home.introSeveranceBg}
            alt={IMAGE_ALTS.introSeveranceBg}
            fill
            sizes="(min-width: 821px) 100vw, 1px"
            className="intro-section-image"
          />
          <span className="intro-section-overlay" />
        </div>

        <div className="container scroll-reveal scroll-reveal--up">
          <div className="intro-section">
            <div className="intro-showcase">
            <div className="intro-showcase-top-image" aria-hidden="true">
              <AppImage
                src={IMAGES.home.introSeveranceBg}
                alt={IMAGE_ALTS.introSeveranceBg}
                fill
                sizes="(max-width: 820px) calc(100vw - 32px), 1px"
                className="intro-showcase-top-image__img"
              />
            </div>
            <div className="intro-showcase-copy scroll-reveal scroll-reveal--left scroll-reveal--instant" data-scroll-reveal>
              <H2>Kıdem Tazminatı: Anlamı, Uygunluk Şartları ve Hesaplanması</H2>
              <p>
                İşten çıkarma tazminatı, belirli yasal veya sözleşmesel koşullar altında iş ilişkisinin sona ermesi
                durumunda işveren tarafından çalışana ödenen mali tazminattır. Birçok ülkede, işten çıkarma tazminatı
                hesaplaması iş kanunları, iş sözleşmeleri, toplu iş sözleşmeleri ve şirket politikaları tarafından
                düzenlenir.
              </p>
              <p>
                Çalışanlar, işten çıkarma, emeklilik, işten çıkarılma, iş gücü azaltımı, askerlik hizmeti, istifa veya
                işten ayrılma durumlarında işten çıkarma tazminatı alabilirler. Geçerli yasa ve iş şartlarına bağlı
                olarak, çalışanlar ayrıca ihbar tazminatı ve diğer çalışan alacaklarına da hak kazanabilirler. Ancak
                politikalar şirketten şirkete biraz farklılık gösterebilir.
              </p>
              <p>
                Tüm bu ödemeler için hesaplamaları hesaplayıcımızı kullanarak yapabilirsiniz. Detaylı{" "}
                <InternalLink href={TAZMINAT_HESAPLAMA_PATH}>tazminat hesaplaması</InternalLink> için rehber
                sayfamıza da göz atabilirsiniz.
              </p>
              <p>
                Haklarınızı kolayca öğrenmek için Kıdem Tazminatı Hesaplama aracımızı kullanabilir ve tazminat
                tutarınızı hızlıca hesaplayabilirsiniz.
              </p>
            </div>
            <div className="intro-sticky-board scroll-reveal scroll-reveal--right scroll-reveal--instant" data-scroll-reveal>
              <ul className="intro-points-list" aria-label="Hesaplama türleri">
                <li>İşten çıkarma tazminatı hesaplaması</li>
                <li>İhbar tazminatı hesaplaması</li>
                <li>İhbar süresi hesaplaması</li>
                <li>Çalışan ücreti hesaplaması</li>
                <li>Emeklilik tazminatı hesaplaması</li>
                <li>İşten ayrılma tazminatı hesaplaması</li>
                <li>Kıdem hesaplaması</li>
                <li>Net maaş üzerinden işten çıkarma tazminatı hesaplaması</li>
                <li>İşten çıkarma ve ihbar tazminatı birleşik hesaplaması</li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </section>

      <ContentSection alt id="ucretsiz-hesaplayici">
        <div className="free-calc-showcase scroll-reveal-stagger">
          <div className="free-calc-visual">
            <AppImage
              src={IMAGES.home.freeCalcOffice}
              alt={IMAGE_ALTS.freeCalcOffice}
              width={612}
              height={612}
              unoptimized
              className="free-calc-image"
            />
          </div>
          <div className="free-calc-copy">
            <H2>Ücretsiz Kıdem Tazminatı Hesaplayıcısı</H2>
            <p>
              Bu çevrimiçi kıdem tazminatı hesaplayıcısı, çalışanların, insan kaynakları uzmanlarının ve işverenlerin
              maaş, hizmet süresi, yaş, şirket politikası ve diğer önemli faktörlere dayanarak kıdem tazminatını hızlı
              bir şekilde tahmin etmelerine yardımcı olur. İster işten çıkarılma, ister işten atılma veya gönüllü ayrılma
              ile karşı karşıya olun, bu araç potansiyel kıdem tazminatı paketinizin anlık bir tahminini sunar.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="aninda-hesapla">
        <div className="guide-unified-showcase scroll-reveal-stagger">
          <div className="guide-block guide-block--audience">
            <div className="audience-showcase-panel">
              <span className="audience-deco audience-deco--blob" aria-hidden="true" />
              <span className="audience-deco audience-deco--wave" aria-hidden="true" />
              <header className="audience-head">
                <H2>İşten Çıkarma Tazminatı Hesaplayıcısından Kimler Yararlanabilir?</H2>
                <p className="audience-lead">Bu çevrimiçi kıdem tazminatı hesaplayıcısı yardımcı olur.</p>
              </header>
              <ul className="audience-cards scroll-reveal-stagger">
                <li className="audience-card audience-card--1">
                  <span className="audience-card-shine" aria-hidden="true" />
                  <span className="audience-card-index" aria-hidden="true">01</span>
                  <span className="audience-card-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
                      <path d="M12 14v2" />
                      <rect x="9.5" y="16" width="5" height="4" rx="1" />
                    </svg>
                  </span>
                  <strong className="audience-card-title">Çalışanlar</strong>
                  <span className="audience-card-accent" aria-hidden="true" />
                </li>
                <li className="audience-card audience-card--2">
                  <span className="audience-card-shine" aria-hidden="true" />
                  <span className="audience-card-index" aria-hidden="true">02</span>
                  <span className="audience-card-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <strong className="audience-card-title">İnsan Kaynakları Uzmanları</strong>
                  <span className="audience-card-accent" aria-hidden="true" />
                </li>
                <li className="audience-card audience-card--3">
                  <span className="audience-card-shine" aria-hidden="true" />
                  <span className="audience-card-index" aria-hidden="true">03</span>
                  <span className="audience-card-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21h18" />
                      <path d="M6 21V9l6-4 6 4v12" />
                      <path d="M10 12h4" />
                      <path d="M10 16h4" />
                    </svg>
                  </span>
                  <strong className="audience-card-title">İşverenler</strong>
                  <span className="audience-card-accent" aria-hidden="true" />
                </li>
              </ul>
              <p className="audience-copy">
                Bu hesaplayıcı, maaş, hizmet süresi, yaş, şirket politikası ve diğer önemli faktörlere dayanarak kıdem
                tazminatınızı hızlı bir şekilde tahmin eder. İster işten çıkarılma, ister işten atılma veya gönüllü ayrılma
                ile karşı karşıya olun, bu araç potansiyel kıdem tazminatı paketinizin anlık bir tahminini sunar.
              </p>
            </div>
          </div>

          <div className="guide-block guide-block--instant">
            <div className="instant-calc-showcase">
              <div className="instant-calc-copy-card scroll-reveal scroll-reveal--left" data-scroll-reveal>
                <H3>İşten Çıkarma Tazminatınızı Anında Hesaplayın</H3>
                <p>
                  Hesap makinesi veya bir araç kullanmadan kıdem tazminatını manuel olarak hesaplamak zordur. Bu yöntemde
                  hatalar ve yanlışlıklar olma olasılığı yüksektir; ayrıca gelişmiş hesaplamalar için nihai formüle ve ödemeye
                  çeşitli terimler ve değişkenler dahil edilir. İşte burada kıdem tazminatı hesaplayıcısının sihri devreye
                  giriyor. Hesaplayıcı aşağıdaki hususları tahmin etmenize yardımcı olabilir:
                </p>
              </div>
              <div className="instant-calc-list-panel">
                <ul className="instant-calc-points scroll-reveal-stagger">
                  <li>Toplam kıdem tazminatı tutarı</li>
                  <li>Haftalık ve iki haftalık kıdem tazminatı</li>
                  <li>İşten çıkarma tazminatı tahminleri</li>
                  <li>Kıdem tazminatından vergi kesintileri</li>
                  <li>Ek ödemeler ve yan haklar</li>
                  <li>Maksimum kıdem tazminatı limitleri</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="guide-block guide-block--inputs">
            <div className="required-inputs-showcase" ref={gerekliGirisRef}>
          <H3 className="required-inputs-heading">Hesap Makinesi İçin Gerekli Girişler</H3>
          <p className="required-inputs-intro">
            İşten çıkarılmanız veya işten atılmanız durumunda alacağınız kıdem tazminatını belirlerken bazı faktörler
            önemlidir. Daha iyi bir tazminat alabilmeniz için her zaman doğru bilgiler vermeniz çok önemlidir.
            Hesaplama cihazına girilebilecek yaygın bilgiler şunlardır:
          </p>

          <div className="required-inputs-diagram">
            <svg
              className="required-inputs-connectors"
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="req-conn-1" x1="408" y1="250" x2="338" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-2" x1="408" y1="250" x2="338" y2="145" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-3" x1="408" y1="250" x2="338" y2="250" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-4" x1="408" y1="250" x2="338" y2="355" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-5" x1="408" y1="250" x2="338" y2="460" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#65a30d" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-6" x1="592" y1="250" x2="662" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-7" x1="592" y1="250" x2="662" y2="180" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-8" x1="592" y1="250" x2="662" y2="320" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-9" x1="592" y1="250" x2="662" y2="460" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path className="required-inputs-connector required-inputs-connector--1" d="M408 250 H362 V40 H338" stroke="url(#req-conn-1)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--2" d="M408 250 H362 V145 H338" stroke="url(#req-conn-2)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--3" d="M408 250 H338" stroke="url(#req-conn-3)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--4" d="M408 250 H362 V355 H338" stroke="url(#req-conn-4)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--5" d="M408 250 H362 V460 H338" stroke="url(#req-conn-5)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--6" d="M592 250 H638 V40 H662" stroke="url(#req-conn-6)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--7" d="M592 250 H638 V180 H662" stroke="url(#req-conn-7)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--8" d="M592 250 H638 V320 H662" stroke="url(#req-conn-8)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--9" d="M592 250 H638 V460 H662" stroke="url(#req-conn-9)" strokeWidth="2" />
              </g>
            </svg>

            <div className="required-inputs-hub" aria-hidden="true">
              <svg className="required-inputs-hub-art" viewBox="0 0 280 280" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="req-hub-calc" x1="88" y1="84" x2="192" y2="196" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4f46e5" />
                    <stop offset="1" stopColor="#7c3aed" />
                  </linearGradient>
                  <linearGradient id="req-hub-screen" x1="108" y1="98" x2="172" y2="126" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#eef2ff" />
                    <stop offset="1" stopColor="#f8f9ff" />
                  </linearGradient>
                  <filter id="req-hub-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#4f46e5" floodOpacity="0.22" />
                  </filter>
                </defs>
                <circle className="required-inputs-hub-glow" cx="140" cy="140" r="126" stroke="rgba(124, 58, 237, 0.12)" strokeWidth="2" />
                <circle cx="140" cy="140" r="110" stroke="rgba(79, 70, 229, 0.14)" strokeWidth="1.5" />
                <circle cx="140" cy="140" r="94" stroke="rgba(124, 58, 237, 0.2)" strokeWidth="1" />
                <g filter="url(#req-hub-shadow)">
                  <rect x="98" y="104" width="84" height="96" rx="12" fill="url(#req-hub-calc)" />
                  <rect x="108" y="114" width="64" height="22" rx="5" fill="url(#req-hub-screen)" />
                  <text x="140" y="129" textAnchor="middle" fill="#4f46e5" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                    ₺
                  </text>
                  <rect x="112" y="144" width="11" height="11" rx="2.5" fill="rgba(255,255,255,0.3)" />
                  <rect x="127" y="144" width="11" height="11" rx="2.5" fill="rgba(255,255,255,0.3)" />
                  <rect x="142" y="144" width="11" height="11" rx="2.5" fill="rgba(255,255,255,0.3)" />
                  <rect x="157" y="144" width="11" height="11" rx="2.5" fill="rgba(255,255,255,0.3)" />
                  <rect x="112" y="159" width="11" height="11" rx="2.5" fill="rgba(255,255,255,0.22)" />
                  <rect x="127" y="159" width="11" height="11" rx="2.5" fill="rgba(255,255,255,0.22)" />
                  <rect x="142" y="159" width="11" height="11" rx="2.5" fill="rgba(255,255,255,0.22)" />
                  <rect x="157" y="159" width="11" height="11" rx="2.5" fill="#c6f24e" fillOpacity="0.9" />
                  <rect x="112" y="174" width="26" height="11" rx="2.5" fill="rgba(255,255,255,0.2)" />
                  <rect x="142" y="174" width="26" height="11" rx="2.5" fill="rgba(255,255,255,0.2)" />
                </g>
                <g className="required-inputs-hub-coin required-inputs-hub-coin--1">
                  <circle cx="46" cy="56" r="14" fill="#eef2ff" stroke="#4f46e5" strokeWidth="1.4" />
                  <text x="46" y="60.5" textAnchor="middle" fill="#4f46e5" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                    ₺
                  </text>
                </g>
                <g className="required-inputs-hub-coin required-inputs-hub-coin--2">
                  <circle cx="234" cy="224" r="14" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="1.4" />
                  <text x="234" y="228.5" textAnchor="middle" fill="#7c3aed" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                    ₺
                  </text>
                </g>
                <circle className="required-inputs-hub-spark" cx="234" cy="56" r="3.5" fill="#c6f24e" />
                <circle className="required-inputs-hub-spark required-inputs-hub-spark--delay" cx="46" cy="224" r="3" fill="#c6f24e" fillOpacity="0.88" />
                <circle cx="140" cy="32" r="2.5" fill="#c6f24e" fillOpacity="0.72" />
              </svg>
            </div>

            <ul className="required-inputs-branch required-inputs-branch--left scroll-reveal-stagger">
              <li className="required-inputs-item required-inputs-item--1">
                <span className="required-inputs-item-text">Yıllık maaş veya saatlik ücret</span>
                <span className="required-inputs-item-icon" aria-hidden="true" />
              </li>
              <li className="required-inputs-item required-inputs-item--2">
                <span className="required-inputs-item-text">Haftalık kazanç</span>
                <span className="required-inputs-item-icon" aria-hidden="true" />
              </li>
              <li className="required-inputs-item required-inputs-item--3">
                <span className="required-inputs-item-text">Hizmet süresi (yıl ve ay)</span>
                <span className="required-inputs-item-icon" aria-hidden="true" />
              </li>
              <li className="required-inputs-item required-inputs-item--4">
                <span className="required-inputs-item-text">Çalışanın yaşı</span>
                <span className="required-inputs-item-icon" aria-hidden="true" />
              </li>
              <li className="required-inputs-item required-inputs-item--5">
                <span className="required-inputs-item-text">İstihdam türü ve pozisyonu</span>
                <span className="required-inputs-item-icon" aria-hidden="true" />
              </li>
            </ul>

            <ul className="required-inputs-branch required-inputs-branch--right scroll-reveal-stagger">
              <li className="required-inputs-item required-inputs-item--6">
                <span className="required-inputs-item-icon" aria-hidden="true" />
                <span className="required-inputs-item-text">Şirketin kıdem tazminatı politikası</span>
              </li>
              <li className="required-inputs-item required-inputs-item--7">
                <span className="required-inputs-item-icon" aria-hidden="true" />
                <span className="required-inputs-item-text">İhbar süresi detayları</span>
              </li>
              <li className="required-inputs-item required-inputs-item--8">
                <span className="required-inputs-item-icon" aria-hidden="true" />
                <span className="required-inputs-item-text">Bonuslar veya kullanılmayan yıllık izin ödemeleri</span>
              </li>
              <li className="required-inputs-item required-inputs-item--9">
                <span className="required-inputs-item-icon" aria-hidden="true" />
                <span className="required-inputs-item-text">Kıdem tazminatı paketine dahil olan ek haklar</span>
              </li>
            </ul>
          </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="nasil-hesaplanir">
        <div className="how-steps-showcase">
          <header className="how-steps-head scroll-reveal scroll-reveal--up" data-scroll-reveal>
            <span className="how-steps-head-glow how-steps-head-glow--left" aria-hidden="true" />
            <span className="how-steps-head-glow how-steps-head-glow--right" aria-hidden="true" />
            <div className="how-steps-head-inner">
              <H2 className="how-steps-title">Kıdem Tazminatı Hesaplayıcısı Nasıl Kullanılır?</H2>
              <p className="how-steps-lead">
                Bu kıdem tazminatı hesaplayıcısını kolayca kullanabilirsiniz ve sadece birkaç adım gerektirir. Araç,
                finansal veya hukuki uzmanlığa ihtiyaç duymadan kullanıcılara hızlı sonuçlar vermek üzere tasarlanmıştır.
              </p>
              <p className="how-steps-sub">İşten ayrılma tazminatınızı hesaplamak için şu adımları izleyin:</p>
            </div>
          </header>

          <div className="how-steps-body scroll-reveal scroll-reveal--scale" data-scroll-reveal>
          <HowStepsCarousel />

          <p className="how-steps-outro scroll-reveal scroll-reveal--up" data-scroll-reveal>
            Tüm adımları tamamladıktan sonra, hesap makinesi tahmini kıdem tazminatınız, toplam çalışma süreniz,
            nihai ödemeniz ve vergi kesintileriniz gibi tüm verilerinizi gösterir.
          </p>
          </div>

          <div className="how-feature-cards scroll-reveal-stagger">
            <article className="how-feature-card">
              <div className="how-feature-card-content">
                <H3>İşten Çıkarma Tazminatınızın Sonuçlarını Anlamak</H3>
                <p>
                  Hesaplamadan sonra, her sonucun ne anlama geldiğini anlamak önemlidir. Kıdem tazminatı paketleri genellikle
                  nihai ödeme tutarınızı etkileyebilecek çeşitli tazminat bileşenlerini içerir. Sonuçlarınız şunları
                  içerebilir:
                </p>
                <ul className="how-feature-list">
                  <li>Maaş ve hizmet süresine göre hesaplanan temel kıdem tazminatı</li>
                  <li>Yaş faktörleri dikkate alınarak hesaplanan ayarlanmış kıdem tazminatı</li>
                  <li>Tahmini işten çıkarma tazminatı</li>
                  <li>Haftalık veya iki haftalık ödeme tutarları</li>
                  <li>Maksimum ödeme limitleri</li>
                  <li>Toplam kıdem tazminatı haftası sayısı</li>
                  <li>Ek haklar veya birikmiş ödemeler</li>
                </ul>
                <p className="how-feature-card-foot">
                  Haklarınızı doğru bir şekilde anladığınızda, rollerinizi ve sorumluluklarınızı, ayrıca kıdem tazminatı
                  paketlerinizi daha verimli bir şekilde öğrenebilirsiniz.
                </p>
              </div>
              <div className="how-feature-card-visual">
                <div className="how-feature-card-art how-feature-card-art--photo">
                  <AppImage
                    src={IMAGES.home.featureResultsSalary}
                    alt="Maaş bordrosu ve nakit ödeme belgeleri"
                    width={600}
                    height={400}
                    unoptimized
                    className="how-feature-card-art-image"
                  />
                </div>
              </div>
            </article>

            <article className="how-feature-card how-feature-card--reverse">
              <div className="how-feature-card-content">
                <H3>Vergi Tahmini ve Nihai Ödeme</H3>
                <p>
                  Kıdem tazminatı birçok ülkede genellikle vergilendirilebilir gelir olarak kabul edilir; bu da kesintilerin
                  aslında alacağınız tutarı azaltabileceği anlamına gelir. Hesaplayıcımız vergileri tahmin etmenize ve
                  kesintilerden sonra beklenen nihai ödemeniz hakkında daha net bir tablo sunmanıza yardımcı olur.
                </p>
                <p className="how-feature-card-lead">Vergi tahminleri şunları içerebilir:</p>
                <ul className="how-feature-list">
                  <li>Federal gelir vergisi stopajı</li>
                  <li>Eyalet veya yerel vergiler</li>
                  <li>Sosyal güvenlik veya maaş kesintileri</li>
                  <li>Emeklilik katkı paylarının etkileri</li>
                  <li>İşten çıkarma tazminatlarının vergi uygulaması</li>
                </ul>
              </div>
              <div className="how-feature-card-visual">
                <div className="how-feature-card-art how-feature-card-art--photo">
                  <AppImage
                    src={IMAGES.home.featureTaxWallet}
                    alt="Kırmızı cüzdandan Türk Lirası banknotları çıkaran kişi"
                    width={600}
                    height={400}
                    unoptimized
                    className="how-feature-card-art-image"
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="isverenler-neden">
        <div className="employer-why">
          <div className="employer-why-panel">
            <div className="employer-why-panel-media" aria-hidden="true">
              <AppImage
                src={IMAGES.home.employerWhyCalculatorBg}
                alt={IMAGE_ALTS.employerWhyCalculatorBg}
                fill
                unoptimized
                className="employer-why-panel-image"
                sizes="100vw"
              />
            </div>
            <span className="employer-why-panel-overlay" aria-hidden="true" />
            <span className="employer-why-panel-mesh" aria-hidden="true" />
            <span className="employer-why-panel-glow employer-why-panel-glow--left" aria-hidden="true" />
            <span className="employer-why-panel-glow employer-why-panel-glow--right" aria-hidden="true" />

            <div className="employer-why-container employer-why-stack">
              <header className="employer-why-header scroll-reveal scroll-reveal--up" data-scroll-reveal>
                <H2>İşverenler Neden Kıdem Tazminatı Öder?</H2>
                <p className="employer-why-intro">
                  İşverenler, iş kanunlarına uymak, yasal anlaşmazlıkları azaltmak ve çalışanları iş değiştirme
                  süreçlerinde desteklemek için kıdem tazminatı öderler. Birçok durumda, kıdem tazminatı çalışanlar için
                  isteğe bağlı bir hak olmaktan ziyade yasal bir yükümlülüktür.
                </p>
              </header>

              <div className="employer-why-features">
                <p className="employer-why-features-heading">
                  Kıdem tazminatı paketleri işverenlere şu konularda yardımcı olur:
                </p>
                <ul className="employer-why-features-grid scroll-reveal-stagger">
                  <li>
                    <TickMark className="employer-why-check" />
                    <strong>İş mahkemesi uyuşmazlıklarını azaltın</strong>
                  </li>
                  <li>
                    <TickMark className="employer-why-check" />
                    <strong>Şirketin itibarını koruyun</strong>
                  </li>
                  <li>
                    <TickMark className="employer-why-check" />
                    <strong>Yasal uyumluluğu sağlayın</strong>
                  </li>
                  <li>
                    <TickMark className="employer-why-check" />
                    <strong>İş gücü yeniden yapılandırmasını destekleyin</strong>
                  </li>
                  <li>
                    <TickMark className="employer-why-check" />
                    <strong>Çalışanların daha sorunsuz ayrılmasını kolaylaştırın</strong>
                  </li>
                  <li>
                    <TickMark className="employer-why-check" />
                    <strong>İşten çıkarma taleplerini verimli bir şekilde çözün</strong>
                  </li>
                </ul>
              </div>

              <p className="employer-why-body scroll-reveal scroll-reveal--up" data-scroll-reveal>
                Çalışanlar için kıdem tazminatı, yeni iş fırsatları ararken geçici mali destek sağlar. Ayrıca, ilgili
                kuruluşa uzun süre hizmet eden çalışanları da telafi edebilir. Bu nedenle, onlara yönelik bir tür takdir
                göstergesidir. Birçok şirket artık aşağıdaki işlemleri gerçekleştirmek için otomatik çalışan tazminatı
                hesaplama sistemleri ve e-devlet tazminat araçları kullanmaktadır:
              </p>

              <div className="employer-why-checklist-wrap">
                <ul
                  className="employer-why-features-grid employer-why-checklist scroll-reveal-stagger"
                  aria-label="Hesaplama türleri"
                >
                  <li>
                    <TickMark className="employer-why-check" />
                    <strong>İşten çıkarma tazminatı + ihbar süresi hesaplamaları</strong>
                  </li>
                  <li>
                    <TickMark className="employer-why-check" />
                    <strong>İhbar süresi hesaplamaları</strong>
                  </li>
                  <li>
                    <TickMark className="employer-why-check" />
                    <strong>Hizmet süresi hesaplamaları</strong>
                  </li>
                  <li>
                    <TickMark className="employer-why-check" />
                    <strong>Çalışma süresi hesaplamaları</strong>
                  </li>
                  <li>
                    <TickMark className="employer-why-check" />
                    <strong>Kıdem tazminatı hesaplamaları</strong>
                  </li>
                  <li>
                    <TickMark className="employer-why-check" />
                    <strong>Çalışan alacakları hesaplamaları</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="kidem-fark-paket">
        <div className="diff-showcase">
          <div className="diff-showcase-container">
          <div className="diff-showcase-layout">
            <div className="diff-showcase-main scroll-reveal scroll-reveal--left" data-scroll-reveal>
              <span className="diff-showcase-main-glow" aria-hidden="true" />
              <H2>Kıdem Tazminatı ile İşten Çıkarma Tazminatı Arasındaki Fark</H2>
              <p>
                İki terim de yaklaşık olarak aynı kabul edilir, ancak bu doğru değildir. Kıdem tazminatı genellikle
                kıdem, hizmet süresi ve fesih koşullarına dayalı tazminatı ifade eder. İşten çıkarma tazminatı ise
                özellikle bir çalışanın yeniden yapılanma, iş pozisyonunun ortadan kaldırılması veya operasyonel
                değişiklikler nedeniyle işini kaybetmesi durumunda geçerlidir.
              </p>
              <p className="diff-showcase-lead">Temel farklılıklar şunlardır:</p>
              <div
                className="diff-comparison-table scroll-reveal scroll-reveal--scale"
                data-scroll-reveal
                role="table"
                aria-label="Kıdem tazminatı ve işten çıkarma ücreti karşılaştırması"
              >
                <div className="diff-comparison-table-head" role="row">
                  <div className="diff-comparison-table-axis" role="columnheader">
                    <span className="diff-comparison-table-axis-title">Temel farklılıklar</span>
                  </div>
                  <div className="diff-comparison-table-col diff-comparison-table-col--highlight" role="columnheader">
                    <span className="diff-comparison-table-badge">Kıdem</span>
                    <span className="diff-comparison-table-col-icon diff-comparison-table-col-icon--kidem" aria-hidden="true" />
                    <span className="diff-comparison-table-col-title">Kıdem tazminatı</span>
                  </div>
                  <div className="diff-comparison-table-col" role="columnheader">
                    <span className="diff-comparison-table-col-icon diff-comparison-table-col-icon--severance" aria-hidden="true" />
                    <span className="diff-comparison-table-col-title">İşten Çıkarma Ücreti</span>
                  </div>
                </div>

                <div className="diff-comparison-table-body scroll-reveal-stagger">
                  <div className="diff-comparison-table-row" role="row">
                    <div className="diff-comparison-table-axis" role="rowheader">
                      <span className="diff-comparison-table-num">01</span>
                    </div>
                    <div className="diff-comparison-table-cell diff-comparison-table-cell--highlight" role="cell">
                      <TickMark className="diff-comparison-check" size="sm" />
                      <span>Hizmet yılına göre</span>
                    </div>
                    <div className="diff-comparison-table-cell" role="cell">
                      <TickMark className="diff-comparison-check" size="sm" />
                      <span>İşin ortadan kaldırılmasına dayalı</span>
                    </div>
                  </div>

                  <div className="diff-comparison-table-row" role="row">
                    <div className="diff-comparison-table-axis" role="rowheader">
                      <span className="diff-comparison-table-num">02</span>
                    </div>
                    <div className="diff-comparison-table-cell diff-comparison-table-cell--highlight" role="cell">
                      <TickMark className="diff-comparison-check" size="sm" />
                      <span>Birden fazla fesih senaryosu için geçerlidir.</span>
                    </div>
                    <div className="diff-comparison-table-cell" role="cell">
                      <TickMark className="diff-comparison-check" size="sm" />
                      <span>Esas olarak iş gücü azaltımları için geçerlidir.</span>
                    </div>
                  </div>

                  <div className="diff-comparison-table-row" role="row">
                    <div className="diff-comparison-table-axis" role="rowheader">
                      <span className="diff-comparison-table-num">03</span>
                    </div>
                    <div className="diff-comparison-table-cell diff-comparison-table-cell--highlight" role="cell">
                      <TickMark className="diff-comparison-check" size="sm" />
                      <span>İhbar tazminatı içerebilir</span>
                    </div>
                    <div className="diff-comparison-table-cell" role="cell">
                      <TickMark className="diff-comparison-check" size="sm" />
                      <span>Çoğunlukla işten çıkarılma tazminatlarını içerir.</span>
                    </div>
                  </div>

                  <div className="diff-comparison-table-row" role="row">
                    <div className="diff-comparison-table-axis" role="rowheader">
                      <span className="diff-comparison-table-num">04</span>
                    </div>
                    <div className="diff-comparison-table-cell diff-comparison-table-cell--highlight" role="cell">
                      <TickMark className="diff-comparison-check" size="sm" />
                      <span>İş kanunları ve sözleşmeleriyle yönetilir.</span>
                    </div>
                    <div className="diff-comparison-table-cell" role="cell">
                      <TickMark className="diff-comparison-check" size="sm" />
                      <span>Temelde yeniden yapılandırma politikalarıyla ilgili.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="diff-showcase-aside scroll-reveal scroll-reveal--right" data-scroll-reveal>
              <div className="diff-showcase-visual">
                <AppImage
                  src={IMAGES.home.diffPurpleSalary}
                  alt="Maaş ve tazminat ödemesi görseli"
                  fill
                  unoptimized
                  className="diff-showcase-visual-image"
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
                <span className="diff-showcase-visual-overlay" aria-hidden="true" />
                <span className="diff-showcase-visual-badge" aria-hidden="true">
                  ₺
                </span>
              </div>

              <article className="diff-package-card scroll-reveal scroll-reveal--up" data-scroll-reveal>
                <span className="diff-package-card-accent" aria-hidden="true" />
                <H3>İşten Çıkarma Tazminat Paketine Neler Dahildir?</H3>
                <p>
                  İşten ayrılma tazminatı paketi, kıdem tazminatının ötesinde birden fazla finansal bileşeni içerebilir.
                  Nihai paket, iş kanunlarına, şirket politikasına, iş sözleşmelerine ve fesih nedenine bağlıdır.
                </p>
                <p className="diff-package-lead">Tipik bir işten ayrılma tazminatı paketi şunları içerebilir:</p>
                <ul className="diff-package-list scroll-reveal-stagger">
                  <li>
                    <TickMark className="diff-package-check" size="sm" />
                    <span>İşten ayrılma tazminatı</span>
                  </li>
                  <li>
                    <TickMark className="diff-package-check" size="sm" />
                    <span>İhbar tazminatı</span>
                  </li>
                  <li>
                    <TickMark className="diff-package-check" size="sm" />
                    <span>Kullanılmayan yıllık izin tazminatı</span>
                  </li>
                  <li>
                    <TickMark className="diff-package-check" size="sm" />
                    <span>Bonus ödemeleri</span>
                  </li>
                  <li>
                    <TickMark className="diff-package-check" size="sm" />
                    <span>Teşvik ödemeleri</span>
                  </li>
                  <li>
                    <TickMark className="diff-package-check" size="sm" />
                    <span>Emeklilik tazminatı</span>
                  </li>
                  <li>
                    <TickMark className="diff-package-check" size="sm" />
                    <span>Ek çalışan alacakları</span>
                  </li>
                </ul>
                <p className="diff-package-foot">
                  Tavan tutarları genellikle Resmî Gazete güncellemelerinden ve hükümetin işgücü düzenlemelerinden
                  alınır. Güvenilir kıdem tazminatı hesaplayıcımız, tazminat tahmininizin güncel yasal standartları ve
                  çalışma kurallarını yansıtmasını sağlamaya yardımcı olur.
                </p>
              </article>
            </div>
          </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="kidem-hesaplama-rehber">
        <div className="calc-guide-showcase">
          <div className="page-content-wrap calc-guide-stack scroll-reveal-stagger">
            <section className="calc-guide-panel calc-guide-panel--hero">
              <H2>Kıdem Tazminatı Nasıl Hesaplanır?</H2>
              <p>
                İşten ayrılma tazminatı hesaplaması, hizmet süresi, brüt maaş, ihbar süresi hakları, ek haklar ve
                geçerli yasal tavanlar dahil olmak üzere birçok önemli faktöre dayanmaktadır. İşverenler genellikle
                tazminatı, iş kanunları, iş sözleşmeleri ve şirket politikaları kapsamında belirlenen formülleri
                kullanarak hesaplarlar.
              </p>
              <p className="calc-guide-lead">
                Gelişmiş işten ayrılma tazminatı hesaplayıcımız aşağıdaki işlemleri otomatik olarak gerçekleştirir:
              </p>
              <ul className="calc-guide-check-grid scroll-reveal-stagger">
                <li>
                  <TickMark className="calc-guide-check" size="sm" />
                  <span>İşten ayrılma tazminatı hesaplaması</span>
                </li>
                <li>
                  <TickMark className="calc-guide-check" size="sm" />
                  <span>İhbar tazminatı hesaplaması</span>
                </li>
                <li>
                  <TickMark className="calc-guide-check" size="sm" />
                  <span>İhbar süresi hesaplaması</span>
                </li>
                <li>
                  <TickMark className="calc-guide-check" size="sm" />
                  <span>Kıdem hesaplaması</span>
                </li>
                <li>
                  <TickMark className="calc-guide-check" size="sm" />
                  <span>Emeklilik tazminatı hesaplaması</span>
                </li>
                <li>
                  <TickMark className="calc-guide-check" size="sm" />
                  <span>Net maaş tazminatı hesaplaması</span>
                </li>
                <li>
                  <TickMark className="calc-guide-check" size="sm" />
                  <span>İşten ayrılma tazminatı hesaplaması</span>
                </li>
                <li>
                  <TickMark className="calc-guide-check" size="sm" />
                  <span>Çalışan alacakları hesaplaması</span>
                </li>
              </ul>
              <p>
                Bu araç, çalışanların doğru tazminat tutarlarını anında tahmin etmelerine yardımcı olmak için
                güncellenmiş kıdem tazminatı hesaplama 2025 ve kıdem tazminatı hesaplama 2026 kurallarını
                desteklemektedir.
              </p>
            </section>

            <section className="calc-guide-panel">
              <H3>Standart Kıdem Tazminatı Formülü</H3>
              <p>
                Standart kıdem tazminatı formülü genellikle çalışanın brüt aylık maaşı ve toplam hizmet yılı
                kullanılarak hesaplanır. En yaygın kıdem tazminatı formülü şöyledir:
              </p>
              <p className="formula-text">Kıdem Tazminatı = 30 Günlük Brüt Ücret × Tam Hizmet Yılı</p>
              <p>
                Çalışanlar genellikle çalıştıkları her tamamlanmış yıl için 30 günlük brüt maaşa eşit tazminat
                kazanırlar. Bazı sistemlerde, tazminat hesaplamalarında şunlar kullanılabilir:
              </p>
              <ul className="calc-guide-mod-grid scroll-reveal-stagger">
                <li>
                  <TickMark className="calc-guide-check" size="sm" />
                  <span>İşten Çıkarma Tazminatı Hesaplaması (Mod 1)</span>
                </li>
                <li>
                  <TickMark className="calc-guide-check" size="sm" />
                  <span>İşten Çıkarma Tazminatı Hesaplaması (Mod 2)</span>
                </li>
                <li>
                  <TickMark className="calc-guide-check" size="sm" />
                  <span>Kıdem + İhbar Süresi Birleşik Hesaplaması (Mod 3)</span>
                </li>
                <li>
                  <TickMark className="calc-guide-check" size="sm" />
                  <span>Net Maaş Tazminatı Hesaplaması (Mod 4)</span>
                </li>
                <li>
                  <TickMark className="calc-guide-check" size="sm" />
                  <span>Brüt Maaş Tazminatı Hesaplaması (Mod 5)</span>
                </li>
                <li>
                  <TickMark className="calc-guide-check" size="sm" />
                  <span>Kıdem Tazminatı Tavanı Uygulamalı Hesaplama (Mod 6)</span>
                </li>
              </ul>
            </section>

            <div className="calc-guide-duo">
              <section className="calc-guide-panel">
                <H3>Haftalık Maaş ve Günlük Ücret Hesaplamaları</H3>
                <p>
                  İşten ayrılma tazminatı ve ihbar tazminatını doğru hesaplamak için, çalışanın aylık maaşı öncelikle
                  haftalık ve günlük ücret değerlerine dönüştürülmelidir. Günlük ücret hesaplamaları, ihbar tazminatı
                  hesaplamaları, kısmi hizmet süreleri, çıkış ücreti hesaplamaları, tazminat faizi hesaplamaları ve
                  çalışma süresi hesaplamaları için önemlidir. Standart günlük ücret formülü şöyledir:
                </p>
                <p className="formula-text">Günlük Ücret = Aylık Brüt Maaş / 30</p>
                <p>Haftalık ücret hesaplamaları genellikle ihbar süresi hesaplamalarında kullanılır:</p>
                <p className="formula-text">Haftalık Ücret = Aylık Brüt Maaş × 12 / 52</p>
                <p className="calc-guide-lead">Bu değerler şunların belirlenmesine yardımcı olur:</p>
                <ul className="calc-guide-check-grid calc-guide-check-grid--compact scroll-reveal-stagger">
                  <li>
                    <TickMark className="calc-guide-check" size="sm" />
                    <span>İhbar süresi</span>
                  </li>
                  <li>
                    <TickMark className="calc-guide-check" size="sm" />
                    <span>Çalışan ihbar süreleri</span>
                  </li>
                  <li>
                    <TickMark className="calc-guide-check" size="sm" />
                    <span>İhbar günü hesaplamaları</span>
                  </li>
                  <li>
                    <TickMark className="calc-guide-check" size="sm" />
                    <span>İstifa ihbarı hesaplamaları</span>
                  </li>
                  <li>
                    <TickMark className="calc-guide-check" size="sm" />
                    <span>İşten çıkarma sırasında tazminat</span>
                  </li>
                  <li>
                    <TickMark className="calc-guide-check" size="sm" />
                    <span>Haftalık ücret hesaplamaları</span>
                  </li>
                </ul>
              </section>

              <div className="calc-guide-duo-side">
                <section className="calc-guide-panel">
                  <H3>Bildirim Süresi</H3>
                  <p>
                    Uygun ihbar yapılmadan işten çıkarılan çalışanlar, yasal ihbar sürelerine göre ihbar tazminatına hak
                    kazanabilirler. İş Kanunu&apos;nun 17. maddesi uyarınca ihbar süreleri genellikle şunlardır:
                  </p>
                  <ul className="calc-guide-week-grid scroll-reveal-stagger">
                    <li>2 hafta</li>
                    <li>4 hafta</li>
                    <li>6 hafta</li>
                    <li>8 hafta</li>
                  </ul>
                  <p>
                    Bu ihbar süreleri, toplam çalışma süresine bağlıdır ve doğru ihbar süresi hesaplaması ve ihbar
                    tazminatı hesaplaması için gereklidir.
                  </p>
                </section>

                <section className="calc-guide-panel">
                  <H3>Temel Kıdem Tazminatı Hesaplaması</H3>
                  <p>
                    İşten ayrılma tazminatı, çalışanın brüt kazanç maaşı üzerinden hesaplanır. Bu, işveren tarafından
                    sağlanan düzenli ücret ve tekrarlayan yan hakları içerir. İşten ayrılma tazminatı, aylık maaş ve
                    seyahat ödenekleri, yemek ödemeleri, ikramiyeler, primler, teşvik ödemeleri ve düzenli sosyal
                    haklar kapsar.
                  </p>
                  <p>
                    Toplam hizmet süresi daha sonra düzeltilmiş brüt ücretle çarpılarak temel tazminat tutarı belirlenir.
                    Doğru sonuçları belirleyebilmek için her zaman maaşınız ve diğer iş detaylarınızla ilgili doğru
                    verileri kullanın.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="kidem-etkileyen-faktorler">
        <div className="factors-showcase">
          <span className="factors-showcase-glow factors-showcase-glow--lime" aria-hidden="true" />
          <span className="factors-showcase-glow factors-showcase-glow--purple" aria-hidden="true" />
          <div className="page-content-wrap">
            <div className="factors-showcase-shell">
              <header className="factors-showcase-head scroll-reveal scroll-reveal--left" data-scroll-reveal>
                <H2>Kıdem Tazminatını Etkileyen Faktörler</H2>
                <p>İşte kıdem tazminatının hesaplanmasında önemli rol oynayan bazı faktörler.</p>
              </header>

              <ul className="factors-showcase-grid scroll-reveal-stagger">
                <li>
                  <TickMark className="factors-showcase-check" size="sm" />
                  <span>İşten ayrılma tazminatı hesaplaması</span>
                </li>
                <li>
                  <TickMark className="factors-showcase-check" size="sm" />
                  <span>İhbar tazminatı hesaplaması</span>
                </li>
                <li>
                  <TickMark className="factors-showcase-check" size="sm" />
                  <span>Kıdem hesaplaması</span>
                </li>
                <li>
                  <TickMark className="factors-showcase-check" size="sm" />
                  <span>Çalışan alacakları hesaplaması</span>
                </li>
                <li>
                  <TickMark className="factors-showcase-check" size="sm" />
                  <span>Emeklilik tazminatı hesaplaması</span>
                </li>
                <li>
                  <TickMark className="factors-showcase-check" size="sm" />
                  <span>İşten çıkarma tazminatı</span>
                </li>
                <li>
                  <TickMark className="factors-showcase-check" size="sm" />
                  <span>İhbar süresi hesaplaması</span>
                </li>
                <li>
                  <TickMark className="factors-showcase-check" size="sm" />
                  <span>Hizmet süresi hesaplaması</span>
                </li>
                <li>
                  <TickMark className="factors-showcase-check" size="sm" />
                  <span>Yıllık izin ücreti hesaplaması</span>
                </li>
              </ul>

              <p className="factors-showcase-foot scroll-reveal scroll-reveal--up" data-scroll-reveal>
                Bu değişkenler, çalışanların mevcut 2025 ve 2026 kıdem tazminatı düzenlemeleri kapsamında alacakları
                tazminatı doğru bir şekilde tahmin etmelerine yardımcı olur.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="hesaplayici-faydalari">
        <div className="benefits-showcase">
          <div className="page-content-wrap">
            <header className="benefits-showcase-head scroll-reveal scroll-reveal--left" data-scroll-reveal>
              <H2>İşten Ayrılma Tazminatı Hesaplayıcımızı Kullanmanın Faydaları Nelerdir?</H2>
              <p className="benefits-showcase-lead">Dönüştürücümüzü kullanmanız için bazı nedenler şunlardır:</p>
            </header>

            <div className="benefits-points-panel">
              <ul className="benefits-points scroll-reveal-stagger">
                <li>
                  <TickMark className="benefits-point-marker" size="sm" />
                  <span className="benefits-point-text">Doğru ve Anında</span>
                </li>
                <li>
                  <TickMark className="benefits-point-marker" size="sm" />
                  <span className="benefits-point-text">Kullanımı Kolay</span>
                </li>
                <li>
                  <TickMark className="benefits-point-marker" size="sm" />
                  <span className="benefits-point-text">Çalışanlar ve İK Ekipleri için Uygun</span>
                </li>
                <li>
                  <TickMark className="benefits-point-marker" size="sm" />
                  <span className="benefits-point-text">Ücretsiz Çevrimiçi Kıdem Tazminatı Tahmin Aracı</span>
                </li>
                <li>
                  <TickMark className="benefits-point-marker" size="sm" />
                  <span className="benefits-point-text">Hızlı ve Güvenilir bir araç</span>
                </li>
                <li>
                  <TickMark className="benefits-point-marker" size="sm" />
                  <span className="benefits-point-text">Güvenli ve Gizli Hesaplama</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="ozet">
        <div className="summary-showcase">
          <span className="summary-showcase-glow summary-showcase-glow--left" aria-hidden="true" />
          <span className="summary-showcase-glow summary-showcase-glow--right" aria-hidden="true" />
          <div className="page-content-wrap">
            <article className="summary-showcase-shell scroll-reveal scroll-reveal--scale" data-scroll-reveal>
              <span className="summary-showcase-shine" aria-hidden="true" />
              <span className="summary-showcase-mesh" aria-hidden="true" />

              <div className="summary-showcase-layout scroll-reveal-stagger">
                <div className="summary-showcase-content">
                  <header className="summary-showcase-head">
                    <H2>Özet</H2>
                  </header>

                  <div className="summary-showcase-glass">
                    <span className="summary-showcase-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                        <path d="M16 13H8" />
                        <path d="M16 17H8" />
                        <path d="M10 9H8" />
                      </svg>
                    </span>
                    <p>
                      Çalışanlar, kıdem tazminatı paketini kabul etmeden önce kıdem tazminatı hesaplamalarını, vergi
                      kesintilerini, tazminat haklarını ve ihbar tazminatını dikkatlice incelemelidir. Adil bir tazminat
                      almak ve kıdem tazminatından sonraki mali adımları (işsizlik ödeneği, emeklilik planlaması ve
                      gelecekteki iş fırsatları dahil) planlamak için yasal veya mali danışmanlık almalıdır.
                    </p>
                  </div>

                  <div className="summary-showcase-trust">
                    <span className="summary-showcase-trust-item">
                      <Sparkles size={14} aria-hidden="true" />
                      Ücretsiz
                    </span>
                    <span className="summary-showcase-trust-item">
                      <ShieldCheck size={14} aria-hidden="true" />
                      Güvenli
                    </span>
                    <span className="summary-showcase-trust-item">İş Kanunu 4857</span>
                  </div>

                  <CalcCta href="#hesapla" className="summary-showcase-cta">
                    Şimdi Hesapla
                  </CalcCta>
                </div>

                <div className="summary-showcase-visual">
                  <SummaryShowcaseIllustration />
                </div>
              </div>
            </article>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="sss">
        <div className="faq-showcase">
          <span className="faq-showcase-glow faq-showcase-glow--left" aria-hidden="true" />
          <span className="faq-showcase-glow faq-showcase-glow--right" aria-hidden="true" />
          <div className="faq-wrap">
            <header className="faq-head">
              <H2>Sıkça Sorulan Sorular</H2>
            </header>

            <FaqAccordion items={HOME_FAQ_ITEMS} variant="home" linkExcludeKeys={DISABLE_AUTO_INTERNAL_LINKS} />
          </div>
        </div>
      </ContentSection>
    </>
  );
}
