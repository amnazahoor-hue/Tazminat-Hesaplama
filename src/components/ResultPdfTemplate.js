import { TR } from "@/utils/helpers";
import { formatDurationText, REASON_LABELS } from "@/utils/shareReport";

const TITLES = {
  severance: "Kıdem Tazminatı Hesaplama",
  total: "Toplam Tazminat Hesaplama"
};

function PdfDisclaimer() {
  return (
    <footer className="pdf-report-footer">
      <p>
        Hayır, hesaplayıcı sonuçları yalnızca bilgilendirme amaçlıdır. Yasal olarak kabul edilmemelidirler. Çalışanlar
        nihai ödemelerini İK departmanlarından ve işverenlerinden teyit etmelidir.
      </p>
    </footer>
  );
}

function SeveranceBreakdown({ result, activeTab, dailyWage, kidemBase }) {
  return (
    <>
      <tr>
        <td>Düzenlenmiş Brüt Maaş</td>
        <td>Maaş + ödenekler + prim</td>
        <td>₺{TR.money(result.duzenlenmisBrutMaas ?? result.brutMaas)}</td>
      </tr>
      <tr>
        <td>Günlük Ücret</td>
        <td>Brüt / 30</td>
        <td>₺{TR.money(dailyWage)}</td>
      </tr>
      <tr>
        <td>Haftalık Ücret</td>
        <td>Brüt × 12 / 52</td>
        <td>₺{TR.money(result.haftalikUcret ?? (result.brutMaas * 12) / 52)}</td>
      </tr>
      <tr>
        <td>Kıdem Tazminatı</td>
        <td>
          30 günlük brüt (₺{TR.money(kidemBase)}) × {result.totalYears.toFixed(2)} yıl
        </td>
        <td>₺{TR.money(result.kidemTazminati)}</td>
      </tr>
      <tr>
        <td>İhbar Tazminatı</td>
        <td>
          ₺{TR.money(dailyWage)} × {result.ihbarSuresi} gün ({result.ihbarSuresiLabel || ""})
        </td>
        <td>₺{TR.money(result.ihbarTazminati)}</td>
      </tr>
      {activeTab === "detayli" && result.unusedLeaveDays > 0 && (
        <tr>
          <td>Kullanılmamış İzin</td>
          <td>
            ₺{TR.money(dailyWage)} × {result.unusedLeaveDays} gün
          </td>
          <td>₺{TR.money(result.unusedLeavePay)}</td>
        </tr>
      )}
      <tr className="is-total-row">
        <td>Toplam</td>
        <td />
        <td>₺{TR.money(result.toplamTazminat)}</td>
      </tr>
    </>
  );
}

function TotalCompensationBreakdown({ result }) {
  const kidemBase = result.kidemBazTutari ?? Math.min(result.brutMaas, result.tavanTutari);
  return (
    <>
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
          30 günlük brüt (₺{TR.money(kidemBase)}) × {result.totalYears.toFixed(2)} yıl
        </td>
        <td>₺{TR.money(result.kidemTazminati)}</td>
      </tr>
      <tr className="is-total-row">
        <td>Toplam Tazminat Değeri</td>
        <td>Maaş + Bonuslar + Ödenekler + Kıdem</td>
        <td>₺{TR.money(result.toplamTazminatDegeri)}</td>
      </tr>
      {result.ihbarTazminati > 0 && (
        <tr>
          <td>İhbar Tazminatı</td>
          <td>
            ₺{TR.money(result.gunlukUcret)} × {result.ihbarSuresi} gün ({result.ihbarSuresiLabel})
          </td>
          <td>₺{TR.money(result.ihbarTazminati)}</td>
        </tr>
      )}
    </>
  );
}

export default function ResultPdfTemplate({ form, result, activeTab, variant = "severance" }) {
  if (!result) return null;

  const isTotal = variant === "total";
  const reasonLabel = REASON_LABELS[form.reason] || form.reason;
  const weeklyLabel = form.weeklyDays === "6" ? "6 gün" : "5 gün";
  const kidemBase = result.kidemBazTutari ?? Math.min(result.brutMaas, result.tavanTutari);
  const dailyWage = result.gunlukUcret ?? result.brutMaas / 30;
  const showBenefits = isTotal || activeTab === "detayli";

  return (
    <div className="pdf-report-template" aria-hidden="true">
      <div className="pdf-report-sheet">
        <header className="pdf-report-header">
          <div className="pdf-report-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.webp" alt="" width={52} height={52} />
            <div>
              <strong>{TITLES[variant]}</strong>
            </div>
          </div>
        </header>

        <section className="pdf-report-block">
          <table className="pdf-report-table">
            <tbody>
              <tr>
                <td>İşe Giriş Tarihi</td>
                <td>{result.iseGirisTarihi}</td>
              </tr>
              <tr>
                <td>İşten Çıkış Tarihi</td>
                <td>{result.istenCikisTarihi}</td>
              </tr>
              <tr>
                <td>Son Brüt Aylık Maaş (₺)</td>
                <td>₺{form.grossSalary || TR.money(result.brutMaas)}</td>
              </tr>
              <tr>
                <td>İşten Ayrılma Nedeni</td>
                <td>{reasonLabel}</td>
              </tr>
              <tr>
                <td>Haftalık Çalışma Günü</td>
                <td>{weeklyLabel}</td>
              </tr>
              {showBenefits && (
                <>
                  <tr>
                    <td>Performans Bonusu (₺)</td>
                    <td>₺{form.performanceBonus || TR.money(0)}</td>
                  </tr>
                  <tr>
                    <td>Aylık Yemek Yardımı (₺)</td>
                    <td>₺{form.mealAllowance || TR.money(0)}</td>
                  </tr>
                  <tr>
                    <td>Aylık Ulaşım Ödeneği (₺)</td>
                    <td>₺{form.travelAllowance || TR.money(0)}</td>
                  </tr>
                </>
              )}
              {activeTab === "detayli" && (
                <>
                  <tr>
                    <td>Kullanılmamış Yıllık İzin (gün)</td>
                    <td>{form.unusedLeaveDays || "0"}</td>
                  </tr>
                  <tr>
                    <td>Fazla Mesai Alacağı (₺)</td>
                    <td>₺{form.overtime || TR.money(0)}</td>
                  </tr>
                  <tr>
                    <td>Diğer Alacaklar (₺)</td>
                    <td>₺{form.otherReceivables || TR.money(0)}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </section>

        <section className="pdf-report-block">
          <h4>Hesaplama Sonuçları</h4>
          <p className="pdf-report-period">
            {result.iseGirisTarihi} - {result.istenCikisTarihi} / {formatDurationText(result.calismaSuresi)}
          </p>
          <div className="pdf-report-cards">
            {isTotal ? (
              <>
                <article>
                  <span>Maaş (Yıllık)</span>
                  <strong>₺{TR.money(result.yillikMaas)}</strong>
                </article>
                <article>
                  <span>Kıdem Tazminatı</span>
                  <strong>₺{TR.money(result.kidemTazminati)}</strong>
                </article>
                <article className="is-total">
                  <span>Toplam Tazminat Değeri</span>
                  <strong>₺{TR.money(result.toplamTazminatDegeri)}</strong>
                </article>
              </>
            ) : (
              <>
                <article>
                  <span>Kıdem Tazminatı</span>
                  <strong>₺{TR.money(result.kidemTazminati)}</strong>
                </article>
                <article>
                  <span>İhbar Tazminatı</span>
                  <strong>₺{TR.money(result.ihbarTazminati)}</strong>
                </article>
                <article className="is-total">
                  <span>Toplam Tazminat</span>
                  <strong>₺{TR.money(result.toplamTazminat)}</strong>
                </article>
              </>
            )}
          </div>
          <table className="pdf-report-breakdown">
            <thead>
              <tr>
                <th>Kalem</th>
                <th>Hesaplama</th>
                <th>Tutar</th>
              </tr>
            </thead>
            <tbody>
              {isTotal ? (
                <TotalCompensationBreakdown result={result} />
              ) : (
                <SeveranceBreakdown result={result} activeTab={activeTab} dailyWage={dailyWage} kidemBase={kidemBase} />
              )}
            </tbody>
          </table>
        </section>

        <PdfDisclaimer />
      </div>
    </div>
  );
}
