"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import CalcCta from "@/components/common/CalcCta";
import { IMAGES } from "@/config/images";
import { TAZMINAT_HESAPLAMA_PATH } from "@/config/site";
import GuidePageEnd from "@/components/guide/GuidePageEnd";
import HowStepsCarousel from "@/components/HowStepsCarousel";
import ResultPdfTemplate from "@/components/ResultPdfTemplate";
import ResultShareBar from "@/components/ResultShareBar";
import { useCalculatorShare } from "@/hooks/useCalculatorShare";
import { buildShareReport } from "@/utils/shareReport";
import TickMark from "@/components/common/TickMark";
import SummaryShowcaseIllustration from "@/components/SummaryShowcaseIllustration";
import { ShieldCheck, Sparkles } from "lucide-react";
import SeveranceBreakdownTable from "@/components/calculator/SeveranceBreakdownTable";
import {
  BONUS_PAYMENTS_PER_YEAR,
  calculateCompensation,
  CONFIG,
  TR,
  validateForm
} from "@/utils/helpers";

const SEVERANCE_EXAMPLE = {
  startDate: "2020-06-08",
  endDate: "2025-06-07",
  grossSalary: "30.000,00",
  reason: "haksiz_fesih",
  weeklyDays: "5",
  unusedLeaveDays: "0",
  overtime: "",
  otherReceivables: "",
  performanceBonus: "",
  mealAllowance: "",
  travelAllowance: ""
};

const initialForm = {
  startDate: "",
  endDate: "",
  grossSalary: "",
  reason: "haksiz_fesih",
  weeklyDays: "5",
  unusedLeaveDays: "0",
  overtime: "",
  otherReceivables: "",
  performanceBonus: "",
  mealAllowance: "",
  travelAllowance: ""
};

const faqItems = [
  {
    id: "q1",
    question: "Kıdem tazminatı ve ihbar tazminatı nasıl hesaplanır?",
    answer:
      "İşten ayrılma tazminatı genellikle çalışanın 30 günlük brüt ücretinin, tamamlanan toplam hizmet yılıyla çarpılmasıyla hesaplanır. İhbar tazminatı ise haftalık maaş ve yasal olarak zorunlu olan 2, 4, 6 veya 8 haftalık ihbar süresi esas alınarak hesaplanır."
  },
  {
    id: "q2",
    question: "2026 yılı için tazminat hesaplamasında tavan değeri nedir?",
    answer:
      "2026 kıdem tazminatı tavanı, bu sınırın üzerindeki tazminat hesaplamalarının iş hukuku düzenlemelerine ve Resmî Gazete güncellemelerine göre sınırlandırıldığı anlamına gelir."
  },
  {
    id: "q3",
    question: "Net maaştan kıdem tazminatını nasıl hesaplayabilirim?",
    answer:
      "Çalışanın net maaşını brüt maaş karşılığına çevirin. Ardından, kıdem tazminatı brüt maaşa dayalı tazminat formülü ve yasal kesintiler kullanılarak hesaplanır."
  },
  {
    id: "q4",
    question: "Brüt maaştan kıdem tazminatı nasıl hesaplanır?",
    answer: "Brüt maaşa dayalı kıdem tazminatı, çalışanın brüt maaşının toplam hizmet yılı ile çarpılmasıyla hesaplanır."
  },
  {
    id: "q5",
    question: "Tazminatımdan ne kadar vergi kesilecek?",
    answer:
      "Birçok durumda, kıdem tazminatından %0,759 oranında vergi kesilir. Ayrıca ihbar tazminatı ve diğer tazminatlar da gelir vergisi kesintilerinin bir parçasıdır."
  },
  {
    id: "q6",
    question: "Seyahat ve yemek ödenekleri maaşıma dahil mi?",
    answer: "Evet, seyahat ödenekleri, yemek ödemeleri, ikramiyeler ve teşvik ödemeleri genellikle brüt ücrete dahildir."
  },
  {
    id: "q7",
    question: "İhbar süresi nedir?",
    answer:
      "İhbar süreleri, çalışanın toplam hizmet yılına bağlı olarak, yasal olarak zorunlu olan işten çıkarma öncesi sürelerdir."
  },
  {
    id: "q8",
    question: "Kendi isteğimle ayrılırsam tazminat alabilir miyim?",
    answer:
      "Çalışanlar, emeklilik, askerlik hizmeti veya yasal olarak korunan diğer işten çıkarma durumlarında kıdem tazminatı alabilirler."
  },
  {
    id: "q9",
    question: "Kıdem tazminatı ve ihbar tazminatı aynı anda alınabilir mi?",
    answer:
      "Evet. Çalışanlar, iş kanunları kapsamında hak kazanmaları durumunda hem kıdem tazminatını hem de ihbar tazminatını birlikte alabilirler."
  },
  {
    id: "q10",
    question: "Tazminat hesaplama aracı ne kadar doğru?",
    answer:
      "Bir kıdem tazminatı hesaplayıcısı, sağladığınız doğru iş bilgilerine dayanarak tahmini sonuçlar verir. Ancak nihai tazminat, yasal koşullara bağlı olarak değişebilir."
  },
  {
    id: "q11",
    question: "Tazminatımı ne zaman almalıyım?",
    answer:
      "Tazminat tutarı genellikle çalışana mümkün olan en kısa sürede ödenir ve çalışan yeni bir iş bulana kadar geçerlidir."
  },
  {
    id: "q12",
    question: "Araçtan elde edilen sonuçlar resmi olarak kabul ediliyor mu?",
    answer:
      "Hayır, hesaplayıcı sonuçları yalnızca bilgilendirme amacıyla verilen tahminlerdir. Yasal olarak kabul edilmemelidirler. Çalışanlar nihai ödemelerini İK departmanlarından ve işverenlerinden teyit etmelidir."
  }
];

const HERO_CAROUSEL_IMAGES = [
  IMAGES.home.heroCarouselLira,
  IMAGES.home.heroCarousel1,
  IMAGES.home.heroCarousel2,
  IMAGES.home.heroCarousel3
];

function formatDuration(s) {
  return `${s.yil} yıl ${s.ay} ay ${s.gun} gün`;
}

function ContentSection({ id, alt, children, reveal = "up" }) {
  return (
    <section className={`section content-section${alt ? " alt" : ""}`} id={id}>
      <div className={`container scroll-reveal scroll-reveal--${reveal}`}>{children}</div>
    </section>
  );
}

export default function CompensationCalculator() {
  const [activeTab, setActiveTab] = useState("standart");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [openFaq, setOpenFaq] = useState("");
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const pdfRef = useRef(null);
  const resultsRef = useRef(null);
  const gerekliGirisRef = useRef(null);
  const pendingScrollToResults = useRef(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % HERO_CAROUSEL_IMAGES.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!result || !pendingScrollToResults.current) return undefined;
    pendingScrollToResults.current = false;
    const timer = window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [result]);

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

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    }),
    []
  );
  const faqLeftColumn = useMemo(() => faqItems.filter((_, index) => index % 2 === 0), []);
  const faqRightColumn = useMemo(() => faqItems.filter((_, index) => index % 2 === 1), []);

  const renderFaqItem = (faq, index) => {
    const isOpen = openFaq === faq.id;
    const buttonId = `faq-button-${faq.id}`;
    const panelId = `faq-panel-${faq.id}`;
    const faqNumber = String(index + 1).padStart(2, "0");
    return (
      <article className={`faq-item${isOpen ? " is-open" : ""}`} key={faq.id}>
        <h3>
          <button
            id={buttonId}
            type="button"
            className="faq-trigger"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => setOpenFaq((prev) => (prev === faq.id ? "" : faq.id))}
          >
            <span className="faq-trigger-main">
              <span className="faq-num" aria-hidden="true">
                {faqNumber}
              </span>
              <span className="faq-question-text">{faq.question}</span>
            </span>
            <span className="faq-toggle" aria-hidden="true">
              +
            </span>
          </button>
        </h3>
        <div
          id={panelId}
          className="faq-content"
          role="region"
          aria-labelledby={buttonId}
          aria-hidden={!isOpen}
        >
          <div className="faq-content-inner">
            <p>{faq.answer}</p>
          </div>
        </div>
      </article>
    );
  };

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      startDate: form.startDate,
      endDate: form.endDate,
      grossSalary: TR.parseMoney(form.grossSalary),
      reason: form.reason,
      weeklyDays: parseInt(form.weeklyDays, 10),
      unusedLeaveDays: parseInt(form.unusedLeaveDays || "0", 10),
      overtime: TR.parseMoney(form.overtime),
      otherReceivables: TR.parseMoney(form.otherReceivables),
      performanceBonus: TR.parseMoney(form.performanceBonus),
      mealAllowance: TR.parseMoney(form.mealAllowance),
      travelAllowance: TR.parseMoney(form.travelAllowance),
      bonusPaymentsPerYear: BONUS_PAYMENTS_PER_YEAR
    };
    const v = validateForm(payload);
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    if (
      payload.grossSalary < CONFIG.MIN_WAGE_2024 &&
      !window.confirm(
        `Girilen maaş asgari ücretin (₺${TR.money(CONFIG.MIN_WAGE_2024)}) altında. Devam edilsin mi?`
      )
    ) {
      return;
    }
    const calc = calculateCompensation(payload);
    setResult(calc.error ? null : calc);
    if (!calc.error) pendingScrollToResults.current = true;
  };

  const clear = () => {
    setForm({ ...initialForm, endDate: new Date().toISOString().split("T")[0] });
    setErrors({});
    setResult(null);
  };

  const fillExample = () => {
    setForm({ ...SEVERANCE_EXAMPLE });
    setErrors({});
    setActiveTab("standart");
    const payload = {
      startDate: SEVERANCE_EXAMPLE.startDate,
      endDate: SEVERANCE_EXAMPLE.endDate,
      grossSalary: TR.parseMoney(SEVERANCE_EXAMPLE.grossSalary),
      reason: SEVERANCE_EXAMPLE.reason,
      weeklyDays: 5,
      unusedLeaveDays: 0,
      overtime: 0,
      otherReceivables: 0,
      performanceBonus: 0,
      mealAllowance: 0,
      travelAllowance: 0,
      bonusPaymentsPerYear: BONUS_PAYMENTS_PER_YEAR
    };
    const calc = calculateCompensation(payload);
    setResult(calc.error ? null : calc);
    if (!calc.error) pendingScrollToResults.current = true;
  };

  const { pdfLoading, copy, shareWhatsApp, shareEmail, downloadPdf } = useCalculatorShare({
    form,
    result,
    activeTab,
    buildReport: buildShareReport,
    pdfRef,
    pdfFilename: "tazminat-hesaplama-raporu.pdf"
  });

  useEffect(() => {
    setForm((prev) => {
      if (prev.endDate) return prev;
      return { ...prev, endDate: new Date().toISOString().split("T")[0] };
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const giris = params.get("giris");
    const cikis = params.get("cikis");
    const maas = params.get("maas");
    if (!giris && !cikis && !maas) return;

    const parseDdMmYyyy = (v) => {
      if (!v) return "";
      if (v.includes("-")) return v;
      const parts = v.split(".");
      if (parts.length !== 3) return "";
      const [dd, mm, yyyy] = parts;
      return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    };

    const startDate = parseDdMmYyyy(giris);
    const endDate = parseDdMmYyyy(cikis);
    const grossSalary = maas || "";
    setForm((prev) => ({
      ...prev,
      startDate: startDate || prev.startDate,
      endDate: endDate || prev.endDate,
      grossSalary: grossSalary || prev.grossSalary
    }));

    const payload = {
      startDate,
      endDate,
      grossSalary: TR.parseMoney(grossSalary),
      reason: "haksiz_fesih",
      weeklyDays: 5,
      unusedLeaveDays: 0,
      overtime: 0,
      otherReceivables: 0
    };
    const v = validateForm(payload);
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    const calc = calculateCompensation(payload);
    setErrors({});
    setResult(calc.error ? null : calc);
  }, []);

  return (
    <>
      <section className="hero-shell landing-frame">
        <div className="landing-frame-inner">
          <div className="hero-card">
            <div className="hero-grid">
              <div className="hero-content scroll-reveal scroll-reveal--left scroll-reveal--instant">
                <h1>Kıdem Tazminatı Hesaplayıcısı ve Kıdem Tazminatı Hakkında Kapsamlı Kılavuz</h1>
                <p className="hero-copy">
                  İşten ayrılma tazminatını anlamak hem çalışanlar hem de işverenler için çok önemlidir. Hak ettiğiniz
                  tazminatı doğru bir şekilde tahmin etmek için İşten Ayrılma Tazminatı Hesaplayıcımızı kullanın ve
                  işten ayrılma tazminatının nasıl hesaplandığını öğrenmek için kapsamlı kılavuzumuzu inceleyin.
                </p>
                <span className="hero-divider" aria-hidden="true" />
                <CalcCta
                  href="#hesapla"
                  size="large"
                  className="hero-calc-cta"
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById("hesapla")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Hesapla
                </CalcCta>
              </div>
              <div className="hero-visual scroll-reveal scroll-reveal--right scroll-reveal--instant" aria-hidden="true">
                <div className="hero-visual-stage">
                  <div className="hero-visual-bg" aria-hidden="true">
                    <span className="hero-visual-bg-mesh" />
                    <svg className="hero-visual-bg-art hero-visual-bg-art--base" viewBox="0 0 520 520" fill="none" aria-hidden="true">
                      <defs>
                        <radialGradient id="hero-bg-glow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#c6f24e" stopOpacity="0.28" />
                          <stop offset="42%" stopColor="#7c3aed" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="hero-bg-arc" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#c6f24e" stopOpacity="0.85" />
                          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
                        </linearGradient>
                        <linearGradient id="hero-bg-panel" x1="72" y1="88" x2="188" y2="204" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ffffff" stopOpacity="0.2" />
                          <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
                        </linearGradient>
                        <filter id="hero-bg-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
                          <feGaussianBlur stdDeviation="6" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <circle cx="260" cy="260" r="236" fill="url(#hero-bg-glow)" />
                      <circle cx="260" cy="260" r="214" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="5 11" />
                      <circle cx="260" cy="260" r="182" stroke="rgba(198,242,78,0.24)" strokeWidth="1.5" strokeDasharray="9 15" />
                      <circle cx="260" cy="260" r="148" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
                      <path d="M96 338 C168 246, 352 246, 424 338" stroke="url(#hero-bg-arc)" strokeWidth="2.5" strokeLinecap="round" opacity="0.62" />
                      <path d="M124 182 C206 108, 314 108, 396 182" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M148 404 C204 360, 316 360, 372 404" stroke="rgba(198,242,78,0.28)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 8" />
                      <g filter="url(#hero-bg-soft-glow)">
                        <rect x="72" y="88" width="116" height="132" rx="18" fill="url(#hero-bg-panel)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                        <rect x="88" y="104" width="84" height="28" rx="8" fill="rgba(255,255,255,0.14)" />
                        <rect x="96" y="144" width="18" height="44" rx="5" fill="rgba(198,242,78,0.55)" />
                        <rect x="120" y="156" width="18" height="32" rx="5" fill="rgba(255,255,255,0.28)" />
                        <rect x="144" y="136" width="18" height="52" rx="5" fill="rgba(124,58,237,0.45)" />
                        <rect x="168" y="148" width="18" height="40" rx="5" fill="rgba(255,255,255,0.22)" />
                        <path d="M92 196h76" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
                      </g>
                      <g filter="url(#hero-bg-soft-glow)">
                        <rect x="344" y="108" width="108" height="124" rx="18" fill="url(#hero-bg-panel)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                        <rect x="360" y="124" width="76" height="22" rx="7" fill="rgba(79,70,229,0.35)" />
                        <rect x="360" y="156" width="56" height="7" rx="3.5" fill="rgba(255,255,255,0.24)" />
                        <rect x="360" y="170" width="68" height="7" rx="3.5" fill="rgba(255,255,255,0.18)" />
                        <rect x="360" y="184" width="44" height="7" rx="3.5" fill="rgba(255,255,255,0.14)" />
                        <circle cx="384" cy="206" r="10" fill="rgba(198,242,78,0.75)" />
                        <path d="M380 206l3 3 7-7" stroke="#1a2e05" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <g className="hero-bg-float-card">
                        <rect x="356" y="332" width="92" height="92" rx="20" fill="rgba(79,70,229,0.28)" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
                        <rect x="374" y="352" width="56" height="40" rx="10" fill="rgba(255,255,255,0.12)" />
                        <path d="M382 378h18M382 368h40" stroke="rgba(255,255,255,0.42)" strokeWidth="2" strokeLinecap="round" />
                        <text x="402" y="386" textAnchor="middle" fill="#c6f24e" fontSize="16" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
                          ₺
                        </text>
                      </g>
                      <circle cx="108" cy="372" r="6" fill="#c6f24e" opacity="0.85" />
                      <circle cx="418" cy="78" r="5" fill="#c6f24e" opacity="0.7" />
                      <circle cx="458" cy="278" r="4" fill="#ffffff" opacity="0.5" />
                      <circle cx="62" cy="242" r="3.5" fill="#ffffff" opacity="0.4" />
                    </svg>
                    <svg className="hero-visual-bg-art hero-visual-bg-art--orbit" viewBox="0 0 520 520" fill="none" aria-hidden="true">
                      <g className="hero-bg-orbit hero-bg-orbit--outer">
                        <circle cx="260" cy="260" r="198" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 12" />
                        <g className="hero-bg-orbit-item hero-bg-orbit-item--1">
                          <circle cx="260" cy="62" r="18" fill="rgba(255,255,255,0.1)" stroke="rgba(198,242,78,0.35)" strokeWidth="1.5" />
                          <text x="260" y="67" textAnchor="middle" fill="#c6f24e" fontSize="14" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
                            ₺
                          </text>
                        </g>
                        <g className="hero-bg-orbit-item hero-bg-orbit-item--2">
                          <rect x="442" y="246" width="36" height="36" rx="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                          <path d="M452 260h16M452 268h10" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" />
                        </g>
                        <g className="hero-bg-orbit-item hero-bg-orbit-item--3">
                          <circle cx="78" cy="260" r="18" fill="rgba(124,58,237,0.28)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
                          <path d="M72 260h12M78 254v12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                        </g>
                      </g>
                      <g className="hero-bg-orbit hero-bg-orbit--inner">
                        <circle cx="260" cy="260" r="156" stroke="rgba(198,242,78,0.14)" strokeWidth="1" strokeDasharray="6 10" />
                        <g className="hero-bg-orbit-item hero-bg-orbit-item--4">
                          <rect x="246" y="418" width="28" height="28" rx="8" fill="rgba(198,242,78,0.22)" stroke="rgba(198,242,78,0.45)" strokeWidth="1.5" />
                          <path d="M254 432l4 4 8-9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <g className="hero-bg-orbit-item hero-bg-orbit-item--5">
                          <circle cx="104" cy="104" r="16" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                          <text x="104" y="109" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
                            4857
                          </text>
                        </g>
                      </g>
                      <path
                        className="hero-bg-flow-line"
                        d="M130 130 C210 180, 310 120, 390 170 S430 300, 360 380"
                        stroke="rgba(198,242,78,0.35)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="6 10"
                      />
                    </svg>
                    <span className="hero-visual-bg-ring hero-visual-bg-ring--1" />
                    <span className="hero-visual-bg-ring hero-visual-bg-ring--2" />
                    <span className="hero-visual-bg-ring hero-visual-bg-ring--3" />
                  </div>
                  <span className="hero-deco hero-deco--halo" aria-hidden="true" />
                  <span className="hero-deco hero-deco--orbit" aria-hidden="true" />
                  <span className="hero-deco hero-deco--orbit hero-deco--orbit-2" aria-hidden="true" />
                  <span className="hero-deco hero-deco--spark hero-deco--spark-1" aria-hidden="true" />
                  <span className="hero-deco hero-deco--spark hero-deco--spark-2" aria-hidden="true" />
                  <span className="hero-deco hero-deco--spark hero-deco--spark-3" aria-hidden="true" />
                  <span className="hero-deco hero-deco--badge" aria-hidden="true">
                    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                      <rect x="8" y="10" width="32" height="28" rx="6" stroke="#4f46e5" strokeWidth="2.5" />
                      <path d="M16 20h16M16 26h10" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="34" cy="30" r="6" fill="#c6f24e" stroke="#9acd32" strokeWidth="1.5" />
                    </svg>
                  </span>

                  <svg className="hero-deco hero-deco--arrow" viewBox="0 0 160 320" aria-hidden="true">
                    <defs>
                      <linearGradient id="hero-deco-arrow-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#c6f24e" />
                        <stop offset="55%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                      <filter id="hero-deco-arrow-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <path
                      d="M42 286 C 108 228, 126 128, 72 42"
                      fill="none"
                      stroke="url(#hero-deco-arrow-grad)"
                      strokeWidth="11"
                      strokeLinecap="round"
                      filter="url(#hero-deco-arrow-glow)"
                    />
                    <path
                      d="M72 42 L58 66 M72 42 L90 50"
                      fill="none"
                      stroke="url(#hero-deco-arrow-grad)"
                      strokeWidth="9"
                      strokeLinecap="round"
                    />
                    <text
                      x="112"
                      y="178"
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="800"
                      letterSpacing="3"
                      transform="rotate(90 112 178)"
                    >
                      TAZMİNAT
                    </text>
                  </svg>

                  <div className="hero-deco hero-deco--grid" aria-hidden="true">
                    <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
                      <rect x="10" y="10" width="22" height="22" rx="5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                      <rect x="40" y="10" width="22" height="22" rx="5" fill="rgba(238,242,255,0.9)" stroke="rgba(79,70,229,0.35)" strokeWidth="2.5" />
                      <rect x="10" y="40" width="22" height="22" rx="5" fill="rgba(238,242,255,0.9)" stroke="rgba(79,70,229,0.35)" strokeWidth="2.5" />
                      <rect x="40" y="40" width="22" height="22" rx="5" fill="#c6f24e" stroke="#9acd32" strokeWidth="2.5" />
                    </svg>
                  </div>

                  <div className="hero-deco hero-deco--chip" aria-hidden="true">
                    <span className="hero-deco-chip-ring" />
                    <span className="hero-deco-chip-mark">₺</span>
                    <span className="hero-deco-chip-text">Hesaplama</span>
                  </div>

                  <div className="hero-carousel-unit">
                    <div className="hero-carousel-frame">
                      <div className="hero-carousel-ring">
                        <div className="hero-carousel">
                          {HERO_CAROUSEL_IMAGES.map((src, index) => (
                            <div
                              key={src}
                              className={`hero-carousel-slide${activeHeroSlide === index ? " is-active" : ""}`}
                            >
                              <Image
                                src={src}
                                alt=""
                                fill
                                sizes="(max-width: 900px) 84vw, 480px"
                                priority={index === 0}
                                className="hero-carousel-img"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hero-slider-dots" aria-hidden="true">
                      {HERO_CAROUSEL_IMAGES.map((src, index) => (
                        <span key={src} className={activeHeroSlide === index ? "is-active" : ""} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section calc-section" id="hesapla">
        <div className="container calc-wrap scroll-reveal scroll-reveal--up">
          <div className="calc-panel scroll-reveal scroll-reveal--scale" data-scroll-reveal>
            <div className="calc-panel-top" aria-hidden="true" />
            <div className="calc-panel-head">
              <div className="tabs calc-tabs" role="tablist" aria-label="Hesaplama modu">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "standart"}
                  className={activeTab === "standart" ? "active" : ""}
                  onClick={() => setActiveTab("standart")}
                >
                  Standart
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "detayli"}
                  className={activeTab === "detayli" ? "active" : ""}
                  onClick={() => setActiveTab("detayli")}
                >
                  Detaylı
                </button>
              </div>
            </div>

            <form className="calc-form" onSubmit={submit}>
              <div className="calc-fields grid">
              <label>
                İşe Giriş Tarihi
                <input
                  id="giris"
                  type="date"
                  value={form.startDate}
                  onChange={(e) => onChange("startDate", e.target.value)}
                />
                {errors.giris && <small className="error">{errors.giris}</small>}
              </label>
              <label>
                İşten Çıkış Tarihi
                <input type="date" value={form.endDate} onChange={(e) => onChange("endDate", e.target.value)} />
                {errors.cikis && <small className="error">{errors.cikis}</small>}
              </label>
              <label className="full calc-salary-block">
                Son Brüt Aylık Maaş (₺)
                <input
                  type="text"
                  className="calc-salary-input"
                  value={form.grossSalary}
                  onChange={(e) => onChange("grossSalary", e.target.value)}
                  onBlur={(e) => {
                    const n = TR.parseMoney(e.target.value);
                    if (n > 0) onChange("grossSalary", TR.money(n));
                  }}
                  placeholder="28.000,00"
                />
                <div className="chips calc-chips">
                  {["17.002,12", "20.000,00", "25.000,00", "30.000,00", "40.000,00", "50.000,00"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`chip${form.grossSalary === m ? " is-active" : ""}`}
                      onClick={() => onChange("grossSalary", m)}
                    >
                      ₺{m}
                    </button>
                  ))}
                </div>
                {errors.maas && <small className="error">{errors.maas}</small>}
              </label>
              <label>
                İşten Ayrılma Nedeni
                <select value={form.reason} onChange={(e) => onChange("reason", e.target.value)}>
                  <option value="haksiz_fesih">İşveren tarafından haksız fesih</option>
                  <option value="istifa_haksiz">İstifa - haklı neden olmaksızın</option>
                  <option value="istifa_hakli">İstifa - haklı nedenle</option>
                  <option value="emeklilik">Emeklilik / Askerlik / Evlilik</option>
                  <option value="belirli_sureli">Belirli süreli sözleşme sonu</option>
                  <option value="anlasma">Karşılıklı anlaşma (ikale)</option>
                  <option value="olum">Vefat</option>
                </select>
              </label>
              <label>
                Haftalık Çalışma Günü
                <select value={form.weeklyDays} onChange={(e) => onChange("weeklyDays", e.target.value)}>
                  <option value="5">5 gün</option>
                  <option value="6">6 gün</option>
                </select>
              </label>
              {activeTab === "detayli" && (
                <>
                  <label>
                    Performans Bonusu (₺)
                    <input
                      type="text"
                      value={form.performanceBonus}
                      onChange={(e) => onChange("performanceBonus", e.target.value)}
                      onBlur={(e) => {
                        const n = TR.parseMoney(e.target.value);
                        if (n > 0) onChange("performanceBonus", TR.money(n));
                      }}
                      placeholder="5.000,00"
                    />
                    <small className="calc-field-hint">
                      Düzenlenmiş brüt maaşa dahil edilir (yıllık prim / {BONUS_PAYMENTS_PER_YEAR})
                    </small>
                  </label>
                  <label>
                    Aylık Yemek Yardımı (₺)
                    <input
                      type="text"
                      value={form.mealAllowance}
                      onChange={(e) => onChange("mealAllowance", e.target.value)}
                      onBlur={(e) => {
                        const n = TR.parseMoney(e.target.value);
                        if (n > 0) onChange("mealAllowance", TR.money(n));
                      }}
                      placeholder="2.000,00"
                    />
                  </label>
                  <label>
                    Aylık Ulaşım Ödeneği (₺)
                    <input
                      type="text"
                      value={form.travelAllowance}
                      onChange={(e) => onChange("travelAllowance", e.target.value)}
                      onBlur={(e) => {
                        const n = TR.parseMoney(e.target.value);
                        if (n > 0) onChange("travelAllowance", TR.money(n));
                      }}
                      placeholder="1.000,00"
                    />
                  </label>
                  <label>
                    Kullanılmamış Yıllık İzin (gün)
                    <input
                      type="number"
                      min={0}
                      value={form.unusedLeaveDays}
                      onChange={(e) => onChange("unusedLeaveDays", e.target.value)}
                    />
                  </label>
                  <label>
                    Fazla Mesai Alacağı (₺)
                    <input type="text" value={form.overtime} onChange={(e) => onChange("overtime", e.target.value)} />
                  </label>
                  <label className="full">
                    Diğer Alacaklar (₺)
                    <input
                      type="text"
                      value={form.otherReceivables}
                      onChange={(e) => onChange("otherReceivables", e.target.value)}
                    />
                  </label>
                </>
              )}
              </div>
              <div className="calc-actions actions">
                <CalcCta as="button" type="submit" size="large" className="calc-form-cta">
                  Tazminatı Hesapla
                </CalcCta>
                <div className="calc-secondary-actions">
                  <button type="button" onClick={fillExample}>
                    Örnek Doldur
                  </button>
                  <button type="button" onClick={clear}>
                    Temizle
                  </button>
                  <button type="button" onClick={() => window.print()}>
                    Yazdır
                  </button>
                  <button type="button" onClick={copy} disabled={!result}>
                    Sonucu Kopyala
                  </button>
                </div>
              </div>
            </form>
          </div>

          {result && (
            <div
              id="calc-results"
              className="calc-results results scroll-reveal scroll-reveal--up"
              data-scroll-reveal
              ref={resultsRef}
            >
              <div className="result-results-top" aria-hidden="true" />
              <div className="result-results-head">
                <h3>Hesaplama Sonuçları</h3>
                <p className="result-period">
                  {result.iseGirisTarihi} - {result.istenCikisTarihi} / {formatDuration(result.calismaSuresi)}
                </p>
                {result.tavanUygulandi && (
                  <p className="result-note">
                    Kıdem tazminatında 2026 tavanı (₺{TR.money(result.tavanTutari)}) uygulanmıştır.
                  </p>
                )}
                <p className="result-note">{result.eligNote}</p>
              </div>
              <div className="result-cards scroll-reveal-stagger">
                <article>
                  <h4>Kıdem Tazminatı</h4>
                  <strong>₺{TR.money(result.kidemTazminati)}</strong>
                </article>
                <article>
                  <h4>İhbar Tazminatı</h4>
                  <strong>₺{TR.money(result.ihbarTazminati)}</strong>
                </article>
                <article>
                  <h4>Toplam Tazminat</h4>
                  <strong>₺{TR.money(result.toplamTazminat)}</strong>
                </article>
              </div>

              <SeveranceBreakdownTable result={result} activeTab={activeTab} />

              <ResultShareBar
                onWhatsApp={shareWhatsApp}
                onPdf={downloadPdf}
                onEmail={shareEmail}
                pdfLoading={pdfLoading}
              />
            </div>
          )}

          {result && (
            <div ref={pdfRef}>
              <ResultPdfTemplate form={form} result={result} activeTab={activeTab} />
            </div>
          )}
        </div>
      </section>

      <section className="section content-section" id="tazminat-turleri">
        <div className="intro-section-bg" aria-hidden="true">
          <Image
            src={IMAGES.home.introSeveranceBg}
            alt=""
            fill
            unoptimized
            className="intro-section-image"
            sizes="100vw"
          />
          <span className="intro-section-overlay" />
        </div>

        <div className="container scroll-reveal scroll-reveal--up">
          <div className="intro-section">
            <div className="intro-showcase">
            <div className="intro-showcase-copy scroll-reveal scroll-reveal--left" data-scroll-reveal>
              <span className="section-tag">Tanım</span>
              <h2>İşten Çıkarma Tazminatı Nedir?</h2>
              <p>
                İşten çıkarma tazminatı, belirli yasal veya sözleşmesel koşullar altında iş ilişkisinin sona ermesi
                durumunda işveren tarafından çalışana ödenen mali tazminattır. Birçok ülkede, işten çıkarma tazminatı
                hesaplaması iş kanunları, iş sözleşmeleri, toplu iş sözleşmeleri ve şirket politikaları tarafından
                düzenlenir.
              </p>
              <p>
                Çalışanlar, işten çıkarma, emeklilik, işten çıkarılma, iş gücü azaltımı, askerlik hizmeti, istifa veya
                işten ayrılma durumlarında işten çıkarma tazminatı alabilirler. Geçerli yasa ve iş şartlarına bağlı olarak,
                çalışanlar ayrıca ihbar tazminatı ve diğer çalışan alacaklarına da hak kazanabilirler. Ancak politikalar
                şirketten şirkete biraz farklılık gösterebilir. Tüm bu ödemeler için hesaplamaları hesaplayıcımızı
                kullanarak yapabilirsiniz.
              </p>
            </div>
            <div className="intro-sticky-board scroll-reveal scroll-reveal--right" data-scroll-reveal>
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
            <Image
              src={IMAGES.home.freeCalcOffice}
              alt="Ofiste laptop ile kıdem tazminatı görüşmesi yapan iş insanları"
              width={612}
              height={612}
              priority
              unoptimized
              className="free-calc-image"
            />
          </div>
          <div className="free-calc-copy">
            <span className="section-tag">Hesaplayıcı</span>
            <h2>Ücretsiz Kıdem Tazminatı Hesaplayıcısı</h2>
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
                <span className="section-tag">Kullanıcılar</span>
                <h2>İşten ayrılma tazminatını kimler kullanabilir?</h2>
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
                <h3>İşten Çıkarma Tazminatınızı Anında Hesaplayın</h3>
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
          <h3 className="required-inputs-heading">Hesap Makinesi İçin Gerekli Girişler</h3>
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
              <span className="section-tag section-tag--light">Kullanım</span>
              <h2 className="how-steps-title">Kıdem Tazminatı Hesaplayıcısı Nasıl Kullanılır?</h2>
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
                <span className="section-tag">Sonuçlar</span>
                <h3>İşten Çıkarma Tazminatınızın Sonuçlarını Anlamak</h3>
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
                  <Image
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
                <span className="section-tag">Vergi Tahmini</span>
                <h3>Vergi Tahmini ve Nihai Ödeme</h3>
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
                  <Image
                    src={IMAGES.home.featureTaxCoin}
                    alt="Türk lira parası ve maaş hesaplaması"
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
              <Image
                src={IMAGES.home.employerWhyCalculatorBg}
                alt=""
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
                <span className="section-tag section-tag--light">İşverenler</span>
                <h2>İşverenler Neden Kıdem Tazminatı Öder?</h2>
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
              <span className="section-tag">Karşılaştırma</span>
              <h2>Kıdem Tazminatı ile İşten Çıkarma Tazminatı Arasındaki Fark</h2>
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
                <Image
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
                <h3>İşten Çıkarma Tazminat Paketine Neler Dahildir?</h3>
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
              <span className="section-tag">Hesaplama</span>
              <h2>Kıdem Tazminatı Nasıl Hesaplanır?</h2>
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
              <h3>Standart Kıdem Tazminatı Formülü</h3>
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
              </ul>
            </section>

            <div className="calc-guide-duo">
              <section className="calc-guide-panel">
                <h3>Haftalık Maaş ve Günlük Ücret Hesaplamaları</h3>
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
                  <h3>Temel Kıdem Tazminatı Hesaplaması</h3>
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

                <section className="calc-guide-panel">
                  <h3>Bildirim süresi</h3>
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
                <span className="section-tag">Faktörler</span>
                <h2>Kıdem Tazminatını Etkileyen Faktörler</h2>
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
              <span className="section-tag">Faydalar</span>
              <h2>İşten ayrılma tazminatı hesaplayıcımızı kullanmanın faydaları nelerdir?</h2>
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
                    <span className="section-tag section-tag--light">Özet</span>
                    <h2>Özet</h2>
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

      <section className="section faq-section" id="sss">
        <div className="faq-showcase">
          <span className="faq-showcase-glow faq-showcase-glow--left" aria-hidden="true" />
          <span className="faq-showcase-glow faq-showcase-glow--right" aria-hidden="true" />
          <div className="page-content-wrap faq-wrap scroll-reveal scroll-reveal--up">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <header className="faq-head">
              <span className="section-tag">SSS</span>
              <h2>Sıkça Sorulan Sorular</h2>
            </header>

            <div className="faq-list">
              <div className="faq-col">
                {faqLeftColumn.map((faq, columnIndex) => renderFaqItem(faq, columnIndex * 2))}
              </div>
              <div className="faq-col">
                {faqRightColumn.map((faq, columnIndex) => renderFaqItem(faq, columnIndex * 2 + 1))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <GuidePageEnd
        href={TAZMINAT_HESAPLAMA_PATH}
        title="Toplam Tazminat Hesaplama Kılavuzu"
        description="Kıdem, ihbar, izin ve brüt maaş dahil toplam tazminat hesaplama adımları ve örnekler."
        linkLabel="Toplam Tazminat Kılavuzu"
      />
    </>
  );
}
