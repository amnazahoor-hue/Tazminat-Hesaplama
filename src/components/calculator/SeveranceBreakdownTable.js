import { SEVERANCE_DAYS_DIVISOR, TR } from "@/utils/helpers";

/**
 * @param {{
 *   result: import("@/utils/compensationEngine").CompensationResult & Record<string, unknown>,
 *   activeTab: string,
 *   variant?: "severance" | "total",
 *   showWageRows?: boolean
 * }} props
 */
export default function SeveranceBreakdownTable({
  result,
  activeTab,
  variant = "severance",
  showWageRows = true
}) {
  const isTotal = variant === "total";
  const integrated = result.entegreBrutMaas;
  const severanceBase = result.kidemBazTutari;
  const dailyWage = result.gunlukUcret;
  const weeklyWage = result.haftalikUcret;
  const divisorLabel = String(SEVERANCE_DAYS_DIVISOR).replace(".", ",");

  return (
    <div className="result-table-wrap">
      <table className="result-breakdown-table">
        <thead>
          <tr>
            <th>Kalem</th>
            <th>Hesaplama</th>
            <th>Tutar</th>
          </tr>
        </thead>
        <tbody>
          {showWageRows && (
            <>
              <tr>
                <td data-label="Kalem">Entegre Brüt Maaş (Giydirilmiş)</td>
                <td data-label="Hesaplama">
                  ₺{TR.money(result.brutMaas)} + ₺{TR.money(result.wages?.monthlyMeal ?? result.monthlyMeal)} + ₺
                  {TR.money(result.wages?.monthlyTravel ?? result.monthlyTravel)} + (₺
                  {TR.money(result.wages?.annualBonus ?? result.bonuslar)} / 12)
                </td>
                <td data-label="Tutar">₺{TR.money(integrated)}</td>
              </tr>
              <tr>
                <td data-label="Kalem">Günlük Ücret</td>
                <td data-label="Hesaplama">₺{TR.money(integrated)} / 30</td>
                <td data-label="Tutar">₺{TR.money(dailyWage)}</td>
              </tr>
              <tr>
                <td data-label="Kalem">Haftalık Ücret</td>
                <td data-label="Hesaplama">₺{TR.money(integrated)} × 12 / 52</td>
                <td data-label="Tutar">₺{TR.money(weeklyWage)}</td>
              </tr>
            </>
          )}

          {isTotal && (
            <>
              <tr className="result-sub-row result-sub-row--muted">
                <td colSpan={3}>
                  <em>Bilgi amaçlı — çıkış ödeme paketine dahil değil</em>
                </td>
              </tr>
              <tr className="result-sub-row">
                <td>Maaş (yıllık)</td>
                <td>₺{TR.money(result.brutMaas)} × 12 ay</td>
                <td>₺{TR.money(result.yillikMaas)}</td>
              </tr>
              {result.bonuslar > 0 && (
                <tr className="result-sub-row">
                  <td>Bonuslar (yıllık)</td>
                  <td>
                    ₺{TR.money(result.performanceBonus)} × {result.bonusPaymentsPerYear} ödeme
                  </td>
                  <td>₺{TR.money(result.bonuslar)}</td>
                </tr>
              )}
              {result.yillikYemek > 0 && (
                <tr className="result-sub-row">
                  <td>Yemek harcırahı (yıllık)</td>
                  <td>₺{TR.money(result.monthlyMeal)} × 12 ay</td>
                  <td>₺{TR.money(result.yillikYemek)}</td>
                </tr>
              )}
              {result.yillikUlasim > 0 && (
                <tr className="result-sub-row">
                  <td>Ulaşım ödeneği (yıllık)</td>
                  <td>₺{TR.money(result.monthlyTravel)} × 12 ay</td>
                  <td>₺{TR.money(result.yillikUlasim)}</td>
                </tr>
              )}
            </>
          )}

          <tr>
            <td data-label="Kalem">Kıdem Tazminatı (Brüt)</td>
            <td data-label="Hesaplama">
              (₺{TR.money(severanceBase)} × {result.totalDays} gün) / {divisorLabel}
              {result.tavanUygulandi ? " — tavan uygulandı" : ""}
            </td>
            <td data-label="Tutar">₺{TR.money(result.brutKidemTazminati)}</td>
          </tr>
          {result.kidemDamgaVergisi > 0 && (
            <tr className="result-sub-row">
              <td data-label="Kalem">Kıdem — Damga Vergisi (%0,759)</td>
              <td data-label="Hesaplama">Brüt kıdem üzerinden</td>
              <td data-label="Tutar">-₺{TR.money(result.kidemDamgaVergisi)}</td>
            </tr>
          )}
          <tr>
            <td data-label="Kalem">Kıdem Tazminatı (Net)</td>
            <td data-label="Hesaplama">Brüt − damga vergisi</td>
            <td data-label="Tutar">₺{TR.money(result.netKidemTazminati)}</td>
          </tr>
          <tr>
            <td data-label="Kalem">İhbar Tazminatı (Brüt)</td>
            <td data-label="Hesaplama">
              ₺{TR.money(dailyWage)} × {result.ihbarSuresi} gün ({result.ihbarSuresiLabel})
            </td>
            <td data-label="Tutar">₺{TR.money(result.brutIhbarTazminati)}</td>
          </tr>
          {result.ihbarDamgaVergisi > 0 && (
            <tr className="result-sub-row">
              <td data-label="Kalem">İhbar — Damga Vergisi (%0,759)</td>
              <td data-label="Hesaplama">Brüt ihbar üzerinden</td>
              <td data-label="Tutar">-₺{TR.money(result.ihbarDamgaVergisi)}</td>
            </tr>
          )}
          {result.ihbarGelirVergisi > 0 && (
            <tr className="result-sub-row">
              <td data-label="Kalem">İhbar — Gelir Vergisi (%15)</td>
              <td data-label="Hesaplama">Brüt ihbar üzerinden</td>
              <td data-label="Tutar">-₺{TR.money(result.ihbarGelirVergisi)}</td>
            </tr>
          )}
          <tr>
            <td data-label="Kalem">İhbar Tazminatı (Net)</td>
            <td data-label="Hesaplama">Brüt − damga − gelir vergisi</td>
            <td data-label="Tutar">₺{TR.money(result.netIhbarTazminati)}</td>
          </tr>

          {(activeTab === "detayli" || isTotal) && result.ekAlacaklarToplami > 0 && (
            <>
              <tr className="result-sub-row result-sub-row--muted">
                <td colSpan={3}>
                  <em>Ek alacaklar — çıkış ödeme paketine dahil değil</em>
                </td>
              </tr>
              {result.unusedLeaveDays > 0 && (
                <tr className="result-sub-row">
                  <td>Kullanılmamış İzin</td>
                  <td>
                    ₺{TR.money(dailyWage)} × {result.unusedLeaveDays} gün
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
            </>
          )}

          <tr className="result-total-row">
            <td data-label="Kalem">{isTotal ? "Toplam Tazminat Değeri" : "Toplam Tazminat (Net)"}</td>
            <td data-label="Hesaplama">Net kıdem + net ihbar</td>
            <td data-label="Tutar">
              ₺{TR.money(isTotal ? result.toplamTazminatDegeri : result.toplamTazminat)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
