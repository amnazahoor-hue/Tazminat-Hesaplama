import { TR } from "@/utils/helpers";
import { formatDurationText, REASON_LABELS } from "@/utils/shareReport";

export default function ResultPdfTemplate({ form, result, activeTab }) {
  if (!result) return null;

  const reasonLabel = REASON_LABELS[form.reason] || form.reason;
  const weeklyLabel = form.weeklyDays === "6" ? "6 gün" : "5 gün";
  return (
    <div className="pdf-report-template" aria-hidden="true">
      <div className="pdf-report-sheet">
        <header className="pdf-report-header">
          <div className="pdf-report-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" width={52} height={52} />
            <div>
              <strong>Tazminat Hesaplama</strong>
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
                <td>Kıdem Tazminatı</td>
                <td>
                  ₺{TR.money(Math.min(result.brutMaas, result.tavanTutari))} x {result.totalYears.toFixed(2)} yıl
                </td>
                <td>₺{TR.money(result.kidemTazminati)}</td>
              </tr>
              <tr>
                <td>İhbar Tazminatı</td>
                <td>
                  (₺{TR.money(result.brutMaas)} / 30) x {result.ihbarSuresi} gün
                </td>
                <td>₺{TR.money(result.ihbarTazminati)}</td>
              </tr>
              {activeTab === "detayli" && result.unusedLeaveDays > 0 && (
                <tr>
                  <td>Kullanılmamış İzin</td>
                  <td>
                    (₺{TR.money(result.brutMaas)} / 30) x {result.unusedLeaveDays} gün
                  </td>
                  <td>₺{TR.money(result.unusedLeavePay)}</td>
                </tr>
              )}
              <tr className="is-total-row">
                <td>Toplam</td>
                <td />
                <td>₺{TR.money(result.toplamTazminat)}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <footer className="pdf-report-footer">
          <p>
            Hayır, hesaplayıcı sonuçları yalnızca bilgilendirme amaçlıdır. Yasal olarak kabul edilmemelidirler. Çalışanlar
            nihai ödemelerini İK departmanlarından ve işverenlerinden teyit etmelidir.
          </p>
        </footer>
      </div>
    </div>
  );
}
