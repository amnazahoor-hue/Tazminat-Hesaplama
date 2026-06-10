import { CONFIG } from "@/utils/helpers";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Tazminat Tavani 2024 | Tazminat Hesaplama",
  description: "2019-2024 kidem tazminati tavani tablosu ve guncel donem tavan aciklamalari.",
  path: "/tazminat-tavani-2024",
  keywords: ["kidem tavani 2024", "tazminat tavani", "guncel kidem tavani"]
});

const ROWS = [
  ["2019", "6.017,60"],
  ["2020", "6.730,15"],
  ["2021", "8.284,51"],
  ["2022", "15.371,40"],
  ["2023", "23.489,83"],
  ["2024", "41.828,42"]
];

export default function CeilingPage() {
  return (
    <section className="legal-page legal-guide container">
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", path: "/" },
          { name: "Tazminat Tavani 2024", path: "/tazminat-tavani-2024" }
        ]}
      />
      <header className="legal-hero">
        <span className="legal-hero-tag">GUNCEL TAVAN</span>
        <h1>Kidem Tazminati Tavani 2024</h1>
        <p>Son Guncelleme: {CONFIG.CEILING.lastUpdated}</p>
        <p>
          Mevcut kidem tazminati tavani:{" "}
          <strong>
            ₺
            {CONFIG.CEILING.current.toLocaleString("tr-TR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </strong>
        </p>
        <p>Tavan, memur maas katsayisi ve ilgili mali donem parametrelerine gore belirlenir.</p>
      </header>

      <table className="mini-table" id="tavan">
        <thead>
          <tr>
            <th>Yil</th>
            <th>Tavan Tutari (₺)</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(([year, amount]) => (
            <tr key={year} className={year === "2024" ? "highlight-row" : ""}>
              <td>{year}</td>
              <td>{amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
