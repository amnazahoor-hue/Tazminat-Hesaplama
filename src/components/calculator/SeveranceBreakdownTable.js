import { TR } from "@/utils/helpers";

export default function SeveranceBreakdownTable({ result, activeTab, showWageRows = true }) {
  const kidemBase = result.kidemBazTutari ?? Math.min(result.brutMaas, result.tavanTutari);
  const dailyWage = result.gunlukUcret ?? result.brutMaas / 30;

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
                <td data-label="Kalem">Düzenlenmiş Brüt Maaş</td>
                <td data-label="Hesaplama">Maaş + ödenekler + prim (aylık)</td>
                <td data-label="Tutar">₺{TR.money(result.duzenlenmisBrutMaas ?? result.brutMaas)}</td>
              </tr>
              <tr>
                <td data-label="Kalem">Günlük Ücret</td>
                <td data-label="Hesaplama">₺{TR.money(result.duzenlenmisBrutMaas ?? result.brutMaas)} / 30</td>
                <td data-label="Tutar">₺{TR.money(dailyWage)}</td>
              </tr>
              <tr>
                <td data-label="Kalem">Haftalık Ücret</td>
                <td data-label="Hesaplama">₺{TR.money(result.duzenlenmisBrutMaas ?? result.brutMaas)} × 12 / 52</td>
                <td data-label="Tutar">₺{TR.money(result.haftalikUcret ?? (result.brutMaas * 12) / 52)}</td>
              </tr>
            </>
          )}
          <tr>
            <td data-label="Kalem">Kıdem Tazminatı</td>
            <td data-label="Hesaplama">
              30 günlük brüt (₺{TR.money(kidemBase)}) × {result.totalYears.toFixed(2)} yıl
            </td>
            <td data-label="Tutar">₺{TR.money(result.kidemTazminati)}</td>
          </tr>
          <tr>
            <td data-label="Kalem">İhbar Tazminatı</td>
            <td data-label="Hesaplama">
              ₺{TR.money(dailyWage)} × {result.ihbarSuresi} gün ({result.ihbarSuresiLabel || ""})
            </td>
            <td data-label="Tutar">₺{TR.money(result.ihbarTazminati)}</td>
          </tr>
          {activeTab === "detayli" && result.unusedLeaveDays > 0 && (
            <tr>
              <td data-label="Kalem">Kullanılmamış İzin</td>
              <td data-label="Hesaplama">
                ₺{TR.money(dailyWage)} × {result.unusedLeaveDays} gün
              </td>
              <td data-label="Tutar">₺{TR.money(result.unusedLeavePay)}</td>
            </tr>
          )}
          {activeTab === "detayli" && result.overtime > 0 && (
            <tr>
              <td data-label="Kalem">Fazla Mesai</td>
              <td data-label="Hesaplama">Belirtilen tutar</td>
              <td data-label="Tutar">₺{TR.money(result.overtime)}</td>
            </tr>
          )}
          {activeTab === "detayli" && result.otherReceivables > 0 && (
            <tr>
              <td data-label="Kalem">Diğer Alacaklar</td>
              <td data-label="Hesaplama">Belirtilen tutar</td>
              <td data-label="Tutar">₺{TR.money(result.otherReceivables)}</td>
            </tr>
          )}
          <tr className="result-total-row">
            <td data-label="Kalem">Toplam Tazminat</td>
            <td data-label="Hesaplama">Kıdem + İhbar + diğer alacaklar</td>
            <td data-label="Tutar">₺{TR.money(result.toplamTazminat)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
