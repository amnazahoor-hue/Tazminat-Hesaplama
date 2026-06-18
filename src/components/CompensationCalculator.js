"use client";

import dynamic from "next/dynamic";
import AppImage from "@/components/common/AppImage";
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import CalcCta from "@/components/common/CalcCta";
import { H1, H2, H3, H4 } from "@/components/common/Heading";
import { getImageMeta, IMAGES, IMAGE_ALTS } from "@/config/images";
import ResultShareBar from "@/components/ResultShareBar";
import { useCalculatorShare } from "@/hooks/useCalculatorShare";
import { buildShareReport } from "@/utils/shareReport";
import SeveranceBreakdownTable from "@/components/calculator/SeveranceBreakdownTable";
import { buildCompensationPayload } from "@/utils/buildCompensationPayload";
import HomeBelowFoldContent from "@/components/home/HomeBelowFoldContent";
import {
  BONUS_PAYMENTS_PER_YEAR,
  calculateCompensation,
  CONFIG,
  TR,
  validateForm
} from "@/utils/helpers";

const ResultPdfTemplate = dynamic(() => import("@/components/ResultPdfTemplate"), { ssr: false });
const HeroDesktopVisual = dynamic(() => import("@/components/home/HeroDesktopVisual"), { ssr: false });

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

const HERO_CAROUSEL_IMAGES = [
  IMAGES.home.heroCarouselLira,
  IMAGES.home.heroCarousel1,
  IMAGES.home.heroCarousel2,
  IMAGES.home.heroCarousel3
];

function formatDuration(s) {
  return `${s.yil} yıl ${s.ay} ay ${s.gun} gün`;
}

export default function CompensationCalculator() {
  const [activeTab, setActiveTab] = useState("standart");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [showDesktopHero, setShowDesktopHero] = useState(false);
  const pdfRef = useRef(null);
  const resultsRef = useRef(null);
  const pendingScrollToResults = useRef(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 821px)");
    const update = () => setShowDesktopHero(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let intervalId;

    const startCarousel = () => {
      intervalId = window.setInterval(() => {
        setActiveHeroSlide((current) => (current + 1) % HERO_CAROUSEL_IMAGES.length);
      }, 3000);
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    let idleId;
    let startTimer;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(startCarousel, { timeout: 5000 });
    } else {
      startTimer = window.setTimeout(startCarousel, 4000);
    }

    return () => {
      if (idleId) window.cancelIdleCallback(idleId);
      if (startTimer) window.clearTimeout(startTimer);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!result || !pendingScrollToResults.current) return undefined;
    pendingScrollToResults.current = false;
    const timer = window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [result]);

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    const payload = buildCompensationPayload(form);
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
    const payload = buildCompensationPayload(SEVERANCE_EXAMPLE);
    const calc = calculateCompensation(payload);
    setResult(calc.error ? null : calc);
    if (!calc.error) pendingScrollToResults.current = true;
  };

  const { pdfLoading, shareNative, shareWhatsApp, shareEmail, downloadPdf } = useCalculatorShare({
    form,
    result,
    activeTab,
    buildReport: buildShareReport,
    pdfRef,
    pdfFilename: "tazminat-hesaplama-raporu.pdf",
    shareSubject: "Tazminat Hesaplama Sonuçları"
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
              <div className="hero-head scroll-reveal scroll-reveal--left scroll-reveal--instant">
                <H1>Kıdem Tazminatı Hesaplayıcısı: Açıklama, Kullanım ve Önemi</H1>
              </div>
              <div className="hero-foot scroll-reveal scroll-reveal--left scroll-reveal--instant">
                <p className="hero-copy">
                  Kıdem tazminatı, Türkiye&apos;de en az 1 yıl hizmet vermiş çalışanlar için yasal bir haktır. 2026
                  tavanına göre hak ettiğiniz tazminatı tahmin etmek için resmi kıdem tazminatı hesaplayıcımızı kullanın
                  ve formüller ve gerçek örneklerle dolu kapsamlı kılavuzumuzu inceleyin. Kıdem tazminatı hem çalışanlar
                  hem de işverenler için önemlidir.
                </p>
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
                <div className="hero-visual-mobile">
                  <AppImage
                    src={HERO_CAROUSEL_IMAGES[activeHeroSlide]}
                    alt={getImageMeta(HERO_CAROUSEL_IMAGES[activeHeroSlide])?.alt}
                    title={getImageMeta(HERO_CAROUSEL_IMAGES[activeHeroSlide])?.title}
                    width={280}
                    height={280}
                    sizes="280px"
                    priority
                    className="hero-visual-mobile-img"
                  />
                  <div className="hero-slider-dots hero-slider-dots--mobile" aria-hidden="true">
                    {HERO_CAROUSEL_IMAGES.map((src, index) => (
                      <span key={src} className={activeHeroSlide === index ? "is-active" : ""} />
                    ))}
                  </div>
                </div>
                {showDesktopHero ? (
                  <HeroDesktopVisual
                    carouselImages={HERO_CAROUSEL_IMAGES}
                    activeHeroSlide={activeHeroSlide}
                  />
                ) : (
                  <div className="hero-visual-stage hero-visual-stage--desktop" aria-hidden="true" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section calc-section" id="hesapla">
        <div className="container calc-wrap scroll-reveal scroll-reveal--up">
          <H2 className="calc-section-heading">Kıdem Tazminatı Hesaplayıcısı</H2>
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
                <H3>Hesaplama Sonuçları</H3>
                <p className="result-period">
                  {result.iseGirisTarihi} - {result.istenCikisTarihi} / {formatDuration(result.calismaSuresi)}
                </p>
                {result.tavanUygulandi && (
                  <p className="result-note">
                    Kıdem tazminatında 2026 tavanı (₺{TR.money(result.tavanTutari)}) uygulanmıştır.
                  </p>
                )}
                {result.compensationWarning && (
                  <p className="result-warning" role="alert">
                    {result.compensationWarning}
                  </p>
                )}
                <p className="result-note">{result.eligNote}</p>
              </div>
              <div className="result-cards scroll-reveal-stagger">
                <article>
                  <H4>Kıdem Tazminatı (Net)</H4>
                  <strong>₺{TR.money(result.netKidemTazminati)}</strong>
                </article>
                <article>
                  <H4>İhbar Tazminatı (Net)</H4>
                  <strong>₺{TR.money(result.netIhbarTazminati)}</strong>
                </article>
                <article>
                  <H4>Toplam Tazminat (Net)</H4>
                  <strong>₺{TR.money(result.toplamTazminat)}</strong>
                </article>
              </div>

              <SeveranceBreakdownTable result={result} activeTab={activeTab} />

              <ResultShareBar
                onShare={shareNative}
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


      <HomeBelowFoldContent />
    </>
  );
}