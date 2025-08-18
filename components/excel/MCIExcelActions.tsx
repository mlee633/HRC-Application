// components/excel/MCIExcelActions.tsx
"use client";

import { useState } from "react";

type PatientPayload = {
  patientId?: string;
  name: string;
  age: number;
  sex: "M" | "F" | "Other";
  ethnicity?: string;
  dateOfParticipation?: string;
  overallMRCI?: number;
  severityMRCI?: string;
};

export default function MCIExcelActions({
  currentPatient,
}: {
  currentPatient: PatientPayload; // construct this from your form + MCI result
}) {
  const [busy, setBusy] = useState(false);
  const [lastId, setLastId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const appendRow = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/excel/append", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient: currentPatient }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Append failed");
      setLastId(data.patientId);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setBusy(false);
    }
  };

  const download = async () => {
    const res = await fetch("/api/excel/file");
    if (!res.ok) {
      alert("No workbook yet. Append a row first.");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Data_MCI.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2 items-center">
      <button className="btn" disabled={busy} onClick={appendRow}>
        {busy ? "Appending…" : "Append to Data_Rx"}
      </button>
      <button className="btn" onClick={download}>
        Download Excel
      </button>
      {lastId && <span className="text-sm opacity-70">Saved Patient ID: {lastId}</span>}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
