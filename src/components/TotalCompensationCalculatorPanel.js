"use client";

import { useEffect, useRef, useState } from "react";
import CalcCta from "@/components/common/CalcCta";
import SeveranceBreakdownTable from "@/components/calculator/SeveranceBreakdownTable";
import ResultPdfTemplate from "@/components/ResultPdfTemplate";
import ResultShareBar from "@/components/ResultShareBar";
import { useCalculatorShare } from "@/hooks/useCalculatorShare";
import { buildTotalCompensationShareReport } from "@/utils/shareReport";
import { buildCompensationPayload } from "@/utils/buildCompensationPayload";
import {
  BONUS_PAYMENTS_PER_YEAR,
  calculateTotalCompensation,
  CONFIG,
  TR,
  validateForm
} from "@/utils/helpers";

const EXAMPLE_FORM = {
  startDate: "2020-06-08",
  endDate: "2025-06-07",
  grossSalary: "30.000,00",
  reason: "haksiz_fesih",
  weeklyDays: "5",
  unusedLeaveDays: "0",
  overtime: "",
  otherReceivables: "",
  performanceBonus: "5.000,00",
  mealAllowance: "2.000,00",
  travelAllowance: "1.000,00"
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

const SALARY_CHIPS = ["22.104,67", "25.000,00", "30.000,00", "40.000,00", "50.000,00", "64.948,77"];

function formatDuration(s) {
  return `${s.yil} yıl ${s.ay} ay ${s.gun} gün`;
}

export default function TotalCompensationCalculatorPanel() {
  const [activeTab, setActiveTab] = useState("standart");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const pdfRef = useRef(null);
  const resultsRef = useRef(null);
  const pendingScrollToResults = useRef(false);

  useEffect(() => {
    if (!result || !pendingScrollToResults.current) return undefined;
    pendingScrollToResults.current = false;
    const timer = window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [result]);

  useEffect(() => {
    setForm((prev) => {
      if (prev.endDate) return prev;
      return { ...prev, endDate: new Date().toISOString().split("T")[0] };
    });
  }, []);

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
    const calc = calculateTotalCompensation(payload);
    setResult(calc.error ? null : calc);
    if (!calc.error) pendingScrollToResults.current = true;
  };

  const clear = () => {
    setForm({ ...initialForm, endDate: new Date().toISOString().split("T")[0] });
    setErrors({});
    setResult(null);
  };

  const fillExample = () => {
    setForm({ ...EXAMPLE_FORM });
    setErrors({});
    setActiveTab("standart");
    const calc = calculateTotalCompensation(buildCompensationPayload(EXAMPLE_FORM));
    setResult(calc.error ? null : calc);
    if (!calc.error) pendingScrollToResults.current = true;
  };

  const { pdfLoading, shareNative, shareWhatsApp, shareEmail, downloadPdf } = useCalculatorShare({
    form,
    result,
    activeTab,
    buildReport: buildTotalCompensationShareReport,
    pdfRef,
    pdfFilename: "toplam-tazminat-hesaplama-raporu.pdf",
    shareSubject: "Toplam Tazminat Hesaplama Sonuçları"
  });

  const moneyBlur = (key) => (e) => {
    const n = TR.parseMoney(e.target.value);
    if (n > 0) onChange(key, TR.money(n));
  };

  return (
    <section className="section calc-section" id="hesapla">
      <div className="container calc-wrap scroll-reveal scroll-reveal--up">
        <h2 className="calc-section-heading">Toplam Tazminat Hesaplayıcısı</h2>
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
                  id="tazminat-giris"
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
                  onBlur={moneyBlur("grossSalary")}
                  placeholder="30.000,00"
                />
                <div className="chips calc-chips">
                  {SALARY_CHIPS.map((m) => (
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
              <label>
                Performans Bonusu (₺)
                <input
                  type="text"
                  value={form.performanceBonus}
                  onChange={(e) => onChange("performanceBonus", e.target.value)}
                  onBlur={moneyBlur("performanceBonus")}
                  placeholder="5.000,00"
                />
                <small className="calc-field-hint">
                  Yıllık prim ödemesi (ör. 5.000 TL × {BONUS_PAYMENTS_PER_YEAR} = 15.000 TL bonus)
                </small>
              </label>
              <label>
                Aylık Yemek Yardımı (₺)
                <input
                  type="text"
                  value={form.mealAllowance}
                  onChange={(e) => onChange("mealAllowance", e.target.value)}
                  onBlur={moneyBlur("mealAllowance")}
                  placeholder="2.000,00"
                />
              </label>
              <label>
                Aylık Ulaşım Ödeneği (₺)
                <input
                  type="text"
                  value={form.travelAllowance}
                  onChange={(e) => onChange("travelAllowance", e.target.value)}
                  onBlur={moneyBlur("travelAllowance")}
                  placeholder="1.000,00"
                />
              </label>
              {activeTab === "detayli" && (
                <>
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
                Toplam Tazminatı Hesapla
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
              <h3>Hesaplama Sonuçları</h3>
              <p className="result-period">
                {result.iseGirisTarihi} - {result.istenCikisTarihi} / {formatDuration(result.calismaSuresi)}
              </p>
              {result.tavanUygulandi && (
                <p className="result-note">
                  Kıdem tazminatında tavan (₺{TR.money(result.tavanTutari)}) uygulanmıştır.
                </p>
              )}
              {result.compensationWarning && (
                <p className="result-warning" role="alert">
                  {result.compensationWarning}
                </p>
              )}
              {result.eligNote && <p className="result-note">{result.eligNote}</p>}
            </div>
            <div className="result-cards scroll-reveal-stagger">
              <article>
                <h4>Kıdem Tazminatı (Net)</h4>
                <strong>₺{TR.money(result.netKidemTazminati)}</strong>
              </article>
              <article>
                <h4>İhbar Tazminatı (Net)</h4>
                <strong>₺{TR.money(result.netIhbarTazminati)}</strong>
              </article>
              <article>
                <h4>Toplam Tazminat Değeri</h4>
                <strong>₺{TR.money(result.toplamTazminatDegeri)}</strong>
              </article>
            </div>

            <SeveranceBreakdownTable result={result} activeTab={activeTab} variant="total" />

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
            <ResultPdfTemplate form={form} result={result} activeTab={activeTab} variant="total" />
          </div>
        )}
      </div>
    </section>
  );
}
