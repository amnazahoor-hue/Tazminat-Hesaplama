import { TR } from "@/utils/helpers";

export default function SeveranceBreakdownTable({ result, activeTab, showWageRows = true }) {
  const kidemBase = result.kidemBazTutari ?? Math.min(result.brutMaas, result.tavanTutari);
  const dailyWage = result.gunlukUcret ?? result.brutMaas / 30;

  return (
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
          {showWageRows && (
            <>
              <tr>
                <td>Düzenlenmiş Brüt Maaş</td>
                <td>Maaş + ödenekler + prim (aylık)</td>
                <td>₺{TR.money(result.duzenlenmisBrutMaas ?? result.brutMaas)}</td>
              </tr>
              <tr>
                <td>Günlük Ücret</td>
                <td>₺{TR.money(result.duzenlenmisBrutMaas ?? result.brutMaas)} / 30</td>
                <td>₺{TR.money(dailyWage)}</td>
              </tr>
              <tr>
                <td>Haftalık Ücret</td>
                <td>₺{TR.money(result.duzenlenmisBrutMaas ?? result.brutMaas)} × 12 / 52</td>
                <td>₺{TR.money(result.haftalikUcret ?? (result.brutMaas * 12) / 52)}</td>
              </tr>
            </>
          )}
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
          {activeTab === "detayli" && result.overtime > 0 && (
            <tr>
              <td>Fazla Mesai</td>
              <td>Belirtilen tutar</td>
              <td>₺{TR.money(result.overtime)}</td>
            </tr>
          )}
          {activeTab === "detayli" && result.otherReceivables > 0 && (
            <tr>
              <td>Diğer Alacaklar</td>
              <td>Belirtilen tutar</td>
              <td>₺{TR.money(result.otherReceivables)}</td>
            </tr>
          )}
          <tr className="result-total-row">
            <td>Toplam Tazminat</td>
            <td>Kıdem + İhbar + diğer alacaklar</td>
            <td>₺{TR.money(result.toplamTazminat)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
