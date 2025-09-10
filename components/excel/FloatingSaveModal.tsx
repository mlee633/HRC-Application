"use client"

import { useMemo, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export type PatientPayload = {
  patientId?: string
  name: string
  age: number
  sex: "M" | "F" | "Other"
  ethnicity?: string
  dateOfParticipation: string
  overallMRCI?: number
  severityMRCI?: "Low" | "Moderate" | "High"
}

export type MedPayload = {
  name: string
  dosageForm?: string
  frequency?: string
  instructions?: string[]
  category?: string
  strength?: string
  dose?: string
  atc?: string
}

type Props = {
  currentPatient: PatientPayload
  meds: MedPayload[]
  onSavePdf: () => void
  className?: string
}

export default function FloatingSaveModal({ currentPatient, meds, onSavePdf, className }: Props) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  const summary = useMemo(
    () => ({
      name: currentPatient.name || "—",
      patientId: currentPatient.patientId || "—",
      age: Number.isFinite(currentPatient.age) ? currentPatient.age : "—",
      sex: currentPatient.sex || "—",
      mrci: currentPatient.overallMRCI ?? "—",
      severity: currentPatient.severityMRCI ?? "—",
      medsCount: meds?.length ?? 0,
    }),
    [currentPatient, meds],
  )

  const appendExcel = async (download: boolean) => {
    setBusy(true)
    try {
      const res = await fetch("/api/excel/append", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient: currentPatient, meds }),
      })
      const data = await res.json()
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Append failed")

      if (download) {
        const dl = await fetch("/api/excel/file")
        if (!dl.ok) throw new Error("Workbook not found")
        const blob = await dl.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "Data_MCI.xlsx"
        a.click()
        URL.revokeObjectURL(url)
      }

      setOpen(false)
    } catch (e: any) {
      alert(e?.message ?? "Save failed")
    } finally {
      setBusy(false)
    }
  }

  const handleAppendOnly = () => appendExcel(false)
  const handleAppendAndDownload = () => appendExcel(true)

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            disabled={busy}
            aria-busy={busy}
            className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-full px-5 py-3 font-medium 
                       hover:from-slate-600 hover:to-slate-700 transition-all duration-200 focus:outline-none 
                       focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 
                       disabled:opacity-70 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {busy ? "Working…" : "Save Options"}
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Save options</DialogTitle>
            <DialogDescription>Choose how you’d like to save or export this assessment.</DialogDescription>
          </DialogHeader>

          <div className="rounded-md border bg-muted/30 p-4 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-gray-500">Patient:</span> {summary.name}
              </div>
              <div>
                <span className="text-gray-500">ID:</span> {summary.patientId}
              </div>
              <div>
                <span className="text-gray-500">Age:</span> {summary.age}
              </div>
              <div>
                <span className="text-gray-500">Sex:</span> {summary.sex}
              </div>
              <div>
                <span className="text-gray-500">Overall MRCI:</span> {summary.mrci}
              </div>
              <div>
                <span className="text-gray-500">Severity:</span> {summary.severity}
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Medications:</span> {summary.medsCount}
              </div>
            </div>
          </div>

          <Separator className="my-3" />

          <div className="space-y-2">
            <button
              type="button"
              disabled={busy}
              onClick={onSavePdf}
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 
                         text-left hover:bg-gray-50 disabled:opacity-70"
            >
              Save as PDF
            </button>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={busy}
                onClick={handleAppendOnly}
                className="flex-1 rounded-md border border-gray-200 bg-white px-4 py-2 
                           text-left hover:bg-gray-50 disabled:opacity-70"
              >
                Append to Excel
              </button>

              <button
                type="button"
                disabled={busy}
                onClick={handleAppendAndDownload}
                className="flex-1 rounded-md border border-gray-200 bg-white px-4 py-2 
                           text-left hover:bg-gray-50 disabled:opacity-70"
              >
                Append & Download
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
