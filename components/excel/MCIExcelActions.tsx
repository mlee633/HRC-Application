// components/excel/MCIExcelActions.tsx
"use client";

import { useState } from "react";

type PatientPayload = {
  patientId?: string
  name: string
  age: number
  sex: "M" | "F" | "Other"
  ethnicity?: string
  dateOfParticipation: string
  overallMRCI?: number
  severityMRCI?: "Low" | "Moderate" | "High"
}

type MedPayload = {
  name: string
  dosageForm?: string
  frequency?: string
  instructions?: string[]
  category?: string
  strength?: string
  dose?: string
  atc?: string
}

export default function MCIExcelActions({
  currentPatient,
  meds,                 // NEW
}: {
  currentPatient: PatientPayload
  meds: MedPayload[]
}) {
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const appendRow = async () => {
    setBusy(true); setMsg(null)
    try {
      const res = await fetch("/api/excel/append", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient: currentPatient, meds }), // send meds!
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || "Append failed")
      setMsg(`Saved ${currentPatient.name} (${data.patientId}), meds: ${data.medsAdded}`)
    } catch (e: any) {
      setMsg(e?.message ?? "Unknown error")
    } finally {
      setBusy(false)
    }
  }

  const download = async () => {
    const res = await fetch("/api/excel/file")
    if (!res.ok) { alert("No workbook yet. Append a row first."); return }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Data_MCI.xlsx"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-2">
      <button className="btn" disabled={busy} onClick={appendRow}>
        {busy ? "Appending…" : "Append to Data_Rx + Data_Meds"}
      </button>
      <button className="btn" onClick={download}>Download Excel</button>
      {msg && <span className="text-sm opacity-70">{msg}</span>}
    </div>
  )
}
