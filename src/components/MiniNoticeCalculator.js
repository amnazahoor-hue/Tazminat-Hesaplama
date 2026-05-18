"use client";

import { useMemo, useState } from "react";
import { calculateNoticePay, TR } from "@/utils/helpers";

export default function MiniNoticeCalculator() {
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    grossSalary: "28.000,00",
    weeklyDays: "5"
  });

  const result = useMemo(() => {
    const grossSalary = TR.parseMoney(form.grossSalary);
    if (!form.startDate || !form.endDate || !grossSalary) return null;
    const r = calculateNoticePay({
      startDate: form.startDate,
      endDate: form.endDate,
      grossSalary
    });
    if (r.error) return null;
    return r;
  }, [form]);

  return (
    <section className="mini-tool">
      <h1>Ihbar Tazminati Hesaplama</h1>
      <p>Ihbar suresi ve ihbar tazminatini kideme gore hizlica hesaplayin.</p>
      <div className="mini-grid">
        <label>
          Ise Giris Tarihi
          <input type="date" value={form.startDate} onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))} />
        </label>
        <label>
          Isten Cikis Tarihi
          <input type="date" value={form.endDate} onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))} />
        </label>
        <label>
          Brut Aylik Maas (₺)
          <input type="text" value={form.grossSalary} onChange={(e) => setForm((p) => ({ ...p, grossSalary: e.target.value }))} />
        </label>
        <label>
          Haftalik Calisma Gunu
          <select value={form.weeklyDays} onChange={(e) => setForm((p) => ({ ...p, weeklyDays: e.target.value }))}>
            <option value="5">5 gun</option>
            <option value="6">6 gun</option>
          </select>
        </label>
      </div>
      {result && (
        <div className="mini-result">
          <p>Ihbar Suresi: <strong>{result.noticeLabel} ({result.noticeDays} gun)</strong></p>
          <p>Ihbar Tazminati: <strong>₺{TR.money(result.noticePay)}</strong></p>
        </div>
      )}

      <table className="mini-table">
        <thead>
          <tr>
            <th>Kidem</th>
            <th>Ihbar Suresi</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>0-6 ay</td><td>2 hafta</td></tr>
          <tr><td>6-18 ay</td><td>4 hafta</td></tr>
          <tr><td>18-36 ay</td><td>6 hafta</td></tr>
          <tr><td>36 ay uzeri</td><td>8 hafta</td></tr>
        </tbody>
      </table>
    </section>
  );
}
