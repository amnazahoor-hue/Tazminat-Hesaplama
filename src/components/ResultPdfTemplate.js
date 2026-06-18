import { SEVERANCE_DAYS_DIVISOR, TR } from "@/utils/helpers";
import { getImageMeta, IMAGES } from "@/config/images";
import { formatDurationText, REASON_LABELS } from "@/utils/shareReport";

const TITLES = {
  severance: "Kıdem Tazminatı Hesaplama",
  total: "Toplam Tazminat Hesaplama"
};

function PdfDisclaimer() {
  return (
    <footer className="pdf-report-footer">
      <p>
        Hesaplayıcı sonuçları yalnızca bilgilendirme amaçlıdır. Yasal olarak bağlayıcı değildir. Çalışanlar nihai
        ödemelerini İK departmanlarından ve işverenlerinden teyit etmelidir.
      </p>
    </footer>
  );
}

export default function ResultPdfTemplate({ form, result, activeTab, variant = "severance" }) {
  if (!result) return null;

  const logoMeta = getImageMeta(IMAGES.logo);

  const isTotal = variant === "total";
  const reasonLabel = REASON_LABELS[form.reason] || form.reason;
  const weeklyLabel = form.weeklyDays === "6" ? "6 gün" : "5 gün";
  const divisorLabel = String(SEVERANCE_DAYS_DIVISOR).replace(".", ",");
  const showBenefits = isTotal || activeTab === "detayli";

  return (
    <div className="pdf-report-template" aria-hidden="true">
      <div className="pdf-report-sheet">
        <header className="pdf-report-header">
          <div className="pdf-report-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGES.logo}
              alt={logoMeta?.alt ?? "Tazminat Hesaplama logosu"}
              title={logoMeta?.title ?? "Tazminat Hesaplama"}
              width={52}
              height={52}
            />
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
            </tbody>
          </table>
        </section>

        <section className="pdf-report-block">
          <h4>Hesaplama Sonuçları</h4>
          <p className="pdf-report-period">
            {result.iseGirisTarihi} - {result.istenCikisTarihi} / {formatDurationText(result.calismaSuresi)} (
            {result.totalDays} gün)
          </p>
          {result.compensationWarning && <p className="pdf-report-warning">{result.compensationWarning}</p>}
          <div className="pdf-report-cards">
            <article>
              <span>Kıdem (Net)</span>
              <strong>₺{TR.money(result.netKidemTazminati)}</strong>
            </article>
            <article>
              <span>İhbar (Net)</span>
              <strong>₺{TR.money(result.netIhbarTazminati)}</strong>
            </article>
            <article className="is-total">
              <span>{isTotal ? "Toplam Tazminat Değeri" : "Toplam Tazminat (Net)"}</span>
              <strong>₺{TR.money(isTotal ? result.toplamTazminatDegeri : result.toplamTazminat)}</strong>
            </article>
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
              <tr>
                <td>Entegre Brüt Maaş</td>
                <td>Maaş + ödenekler + (yıllık prim / 12)</td>
                <td>₺{TR.money(result.entegreBrutMaas)}</td>
              </tr>
              <tr>
                <td>Günlük Ücret</td>
                <td>₺{TR.money(result.entegreBrutMaas)} / 30</td>
                <td>₺{TR.money(result.gunlukUcret)}</td>
              </tr>
              <tr>
                <td>Kıdem (Brüt)</td>
                <td>
                  (₺{TR.money(result.kidemBazTutari)} × {result.totalDays} gün) / {divisorLabel}
                </td>
                <td>₺{TR.money(result.brutKidemTazminati)}</td>
              </tr>
              <tr>
                <td>Kıdem (Net)</td>
                <td>Brüt − %0,759 damga</td>
                <td>₺{TR.money(result.netKidemTazminati)}</td>
              </tr>
              <tr>
                <td>İhbar (Brüt)</td>
                <td>
                  ₺{TR.money(result.gunlukUcret)} × {result.ihbarSuresi} gün
                </td>
                <td>₺{TR.money(result.brutIhbarTazminati)}</td>
              </tr>
              <tr>
                <td>İhbar (Net)</td>
                <td>Brüt − damga − %15 gelir</td>
                <td>₺{TR.money(result.netIhbarTazminati)}</td>
              </tr>
              <tr className="is-total-row">
                <td>Toplam</td>
                <td>Net kıdem + net ihbar</td>
                <td>₺{TR.money(isTotal ? result.toplamTazminatDegeri : result.toplamTazminat)}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <PdfDisclaimer />
      </div>
    </div>
  );
}
