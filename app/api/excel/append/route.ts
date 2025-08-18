// app/api/excel/append/route.ts
export const runtime = "nodejs";

import { MedicationSchema, type MedicationRowInput } from "@/lib/dataRx";

import { NextRequest, NextResponse } from "next/server";
import {
  dataRxHeaders,
  medsHeaders,
  normalizePatient,
  toDataRxRow,
  PatientSchema,
  toMedsRows,
} from "@/lib/dataRx";
import { ensureDataDir, loadWorkbook, saveWorkbook } from "@/lib/excelServer";

const SHEET_PATIENTS = "Data_Rx";
const SHEET_MEDS = "Data_Meds";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json(); // expects { patient: {...}, meds?: [...] }
    const parsedPatient = PatientSchema.parse(json.patient);
    const normalized = normalizePatient(parsedPatient);

    const medsInput = Array.isArray(json.meds) ? json.meds : [];
    
    const parsedMeds = (medsInput as MedicationRowInput[]).map((m) =>
      MedicationSchema.parse(m)
    );

    const patientRowObj = toDataRxRow(normalized);
    const medRows = toMedsRows(normalized.patientId, parsedMeds);

    await ensureDataDir();
    const wb = await loadWorkbook();

    // --- Patients sheet ---
    const wsP = wb.getWorksheet(SHEET_PATIENTS) ?? wb.addWorksheet(SHEET_PATIENTS);
    if (wsP.rowCount === 0) wsP.addRow([...dataRxHeaders]);
    wsP.addRow(dataRxHeaders.map((h) => patientRowObj[h] ?? ""));

    // --- Meds sheet ---
    const wsM = wb.getWorksheet(SHEET_MEDS) ?? wb.addWorksheet(SHEET_MEDS);
    if (wsM.rowCount === 0) wsM.addRow([...medsHeaders]);
    for (const r of medRows) {
      wsM.addRow(medsHeaders.map((h) => r[h] ?? ""));
    }

    await saveWorkbook(wb);
    return NextResponse.json({ ok: true, patientId: normalized.patientId, medsAdded: medRows.length });
  } catch (err: any) {
    console.error("Append failed:", err);
    return NextResponse.json({ ok: false, error: err?.message ?? "Unknown error" }, { status: 400 });
  }
}
