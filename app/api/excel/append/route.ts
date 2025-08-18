// app/api/excel/append/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { dataRxHeaders, normalizePatient, toDataRxRow, PatientSchema } from "@/lib/dataRx";
import { ensureDataDir, loadWorkbook, saveWorkbook } from "@/lib/excelServer";

const SHEET_NAME = "Data_Rx";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json(); // expects { patient: {...} }
    const parsed = PatientSchema.parse(json.patient);
    const normalized = normalizePatient(parsed);
    const rowObj = toDataRxRow(normalized);

    await ensureDataDir();
    const wb = await loadWorkbook();

    // get or create sheet (DO NOT set ws.columns here)
    const ws = wb.getWorksheet(SHEET_NAME) ?? wb.addWorksheet(SHEET_NAME);

    // If sheet is brand new (no rows), write a header row ONCE.
    if (ws.rowCount === 0) {
      ws.addRow([...dataRxHeaders]);
    }

    // Build an array of values in the exact header order and append.
    const values = dataRxHeaders.map((h) => rowObj[h] ?? "");
    ws.addRow(values);

    await saveWorkbook(wb);
    return NextResponse.json({ ok: true, patientId: normalized.patientId });
  } catch (err: any) {
    console.error("Append failed:", err);
    return NextResponse.json({ ok: false, error: err?.message ?? "Unknown error" }, { status: 400 });
  }
}
