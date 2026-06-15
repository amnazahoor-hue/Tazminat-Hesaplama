"use client";

import { useEffect, useRef, useState } from "react";
import CalcCta from "@/components/common/CalcCta";
import ResultPdfTemplate from "@/components/ResultPdfTemplate";
import ResultShareBar from "@/components/ResultShareBar";
import { useCalculatorShare } from "@/hooks/useCalculatorShare";
import { buildTotalCompensationShareReport } from "@/utils/shareReport";
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

  const buildPayload = () => ({
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
  });

  const submit = (e) => {
    e.preventDefault();
    const payload = buildPayload();
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
    const payload = {
      startDate: EXAMPLE_FORM.startDate,
      endDate: EXAMPLE_FORM.endDate,
      grossSalary: TR.parseMoney(EXAMPLE_FORM.grossSalary),
      reason: EXAMPLE_FORM.reason,
      weeklyDays: 5,
      unusedLeaveDays: 0,
      overtime: 0,
      otherReceivables: 0,
      performanceBonus: TR.parseMoney(EXAMPLE_FORM.performanceBonus),
      mealAllowance: TR.parseMoney(EXAMPLE_FORM.mealAllowance),
      travelAllowance: TR.parseMoney(EXAMPLE_FORM.travelAllowance),
      bonusPaymentsPerYear: BONUS_PAYMENTS_PER_YEAR
    };
    const calc = calculateTotalCompensation(payload);
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
                  Kıdem tazminatında 2026 tavanı (₺{TR.money(result.tavanTutari)}) uygulanmıştır.
                </p>
              )}
            </div>
            <div className="result-cards scroll-reveal-stagger">
              <article>
                <h4>Maaş (Yıllık)</h4>
                <strong>₺{TR.money(result.yillikMaas)}</strong>
              </article>
              <article>
                <h4>Kıdem Tazminatı</h4>
                <strong>₺{TR.money(result.kidemTazminati)}</strong>
              </article>
              <article>
                <h4>Toplam Tazminat Değeri</h4>
                <strong>₺{TR.money(result.toplamTazminatDegeri)}</strong>
              </article>
            </div>

            <div className="result-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Kalem</th>
                    <th>Hesaplama</th>
                    <th>Tutar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="result-sub-row">
                    <td>Günlük Ücret</td>
                    <td>₺{TR.money(result.duzenlenmisBrutMaas)} / 30</td>
                    <td>₺{TR.money(result.gunlukUcret)}</td>
                  </tr>
                  <tr className="result-sub-row">
                    <td>Haftalık Ücret</td>
                    <td>₺{TR.money(result.duzenlenmisBrutMaas)} × 12 / 52</td>
                    <td>₺{TR.money(result.haftalikUcret)}</td>
                  </tr>
                  <tr>
                    <td>Maaş</td>
                    <td>₺{TR.money(result.brutMaas)} x 12 ay</td>
                    <td>₺{TR.money(result.yillikMaas)}</td>
                  </tr>
                  {result.bonuslar > 0 && (
                    <tr>
                      <td>Bonuslar</td>
                      <td>
                        ₺{TR.money(result.performanceBonus)} x {result.bonusPaymentsPerYear} ödeme
                      </td>
                      <td>₺{TR.money(result.bonuslar)}</td>
                    </tr>
                  )}
                  {result.yillikYemek > 0 && (
                    <tr>
                      <td>Yemek Harcırahı</td>
                      <td>₺{TR.money(result.monthlyMeal)} x 12 ay</td>
                      <td>₺{TR.money(result.yillikYemek)}</td>
                    </tr>
                  )}
                  {result.yillikUlasim > 0 && (
                    <tr>
                      <td>Ulaşım Ödeneği</td>
                      <td>₺{TR.money(result.monthlyTravel)} x 12 ay</td>
                      <td>₺{TR.money(result.yillikUlasim)}</td>
                    </tr>
                  )}
                  <tr>
                    <td>Kıdem Tazminatı</td>
                    <td>
                      30 günlük brüt (₺{TR.money(result.kidemBazTutari ?? Math.min(result.brutMaas, result.tavanTutari))}) ×{" "}
                      {result.totalYears.toFixed(2)} yıl
                    </td>
                    <td>₺{TR.money(result.kidemTazminati)}</td>
                  </tr>
                  <tr className="result-total-row">
                    <td>Toplam Tazminat Değeri</td>
                    <td>Maaş + Bonuslar + Ödenekler + Kıdem</td>
                    <td>₺{TR.money(result.toplamTazminatDegeri)}</td>
                  </tr>
                  {result.ihbarTazminati > 0 && (
                    <tr className="result-sub-row">
                      <td>İhbar Tazminatı</td>
                      <td>
                        ₺{TR.money(result.gunlukUcret)} × {result.ihbarSuresi} gün ({result.ihbarSuresiLabel})
                      </td>
                      <td>₺{TR.money(result.ihbarTazminati)}</td>
                    </tr>
                  )}
                  {activeTab === "detayli" && result.unusedLeaveDays > 0 && (
                    <tr className="result-sub-row">
                      <td>Kullanılmamış İzin</td>
                      <td>
                        ₺{TR.money(result.gunlukUcret)} × {result.unusedLeaveDays} gün
                      </td>
                      <td>₺{TR.money(result.unusedLeavePay)}</td>
                    </tr>
                  )}
                  {result.overtime > 0 && (
                    <tr className="result-sub-row">
                      <td>Fazla Mesai</td>
                      <td>Belirtilen tutar</td>
                      <td>₺{TR.money(result.overtime)}</td>
                    </tr>
                  )}
                  {result.otherReceivables > 0 && (
                    <tr className="result-sub-row">
                      <td>Diğer Alacaklar</td>
                      <td>Belirtilen tutar</td>
                      <td>₺{TR.money(result.otherReceivables)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

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
