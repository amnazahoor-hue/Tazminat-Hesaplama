"use client";

import { useMemo, useState } from "react";
import { calculateUnusedLeavePay, TR } from "@/utils/helpers";

export default function MiniLeaveCalculator() {
  const [form, setForm] = useState({
    serviceYears: "5",
    unusedLeaveDays: "14",
    grossSalary: "28.000,00"
  });

  const result = useMemo(() => {
    const grossSalary = TR.parseMoney(form.grossSalary);
    const unusedLeaveDays = parseInt(form.unusedLeaveDays || "0", 10);
    if (!grossSalary || unusedLeaveDays < 0) return null;
    return calculateUnusedLeavePay({ grossSalary, unusedLeaveDays });
  }, [form]);

  return (
    <section className="mini-tool">
      <h1>Yillik Izin Ucreti Hesaplama</h1>
      <p>Kullanilmayan yillik izin ucretini aninda hesaplayin.</p>
      <div className="mini-grid">
        <label>
          Hizmet Yili (referans)
          <input type="number" value={form.serviceYears} onChange={(e) => setForm((p) => ({ ...p, serviceYears: e.target.value }))} />
        </label>
        <label>
          Kullanilmayan Izin Gunu
          <input type="number" value={form.unusedLeaveDays} onChange={(e) => setForm((p) => ({ ...p, unusedLeaveDays: e.target.value }))} />
        </label>
        <label>
          Brut Aylik Maas (₺)
          <input type="text" value={form.grossSalary} onChange={(e) => setForm((p) => ({ ...p, grossSalary: e.target.value }))} />
        </label>
      </div>

      {result && (
        <div className="mini-result">
          <p>Gunluk Brut: <strong>₺{TR.money(result.dailyGross)}</strong></p>
          <p>Izin Ucreti: <strong>₺{TR.money(result.amount)}</strong></p>
          <p>Formul: <code>(Brut Aylik / 30) x Kullanilmayan Gun</code></p>
        </div>
      )}

      <table className="mini-table">
        <thead>
          <tr>
            <th>Kidem</th>
            <th>Asgari Yillik Izin</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1-5 yil</td><td>14 gun</td></tr>
          <tr><td>5-15 yil</td><td>20 gun</td></tr>
          <tr><td>15+ yil</td><td>26 gun</td></tr>
        </tbody>
      </table>
    </section>
  );
}
