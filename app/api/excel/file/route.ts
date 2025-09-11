// // app/api/excel/file/route.ts
// THIS VERSION IS WHEN YOU ARE USING IT LOCALLY - NOT ON VERCEL

// export const runtime = "nodejs";

// import { NextRequest, NextResponse } from "next/server";
// import { ensureDataDir } from "@/lib/excelServer";
// import fs from "node:fs/promises";
// import path from "node:path";

// const DATA_PATH = path.join(process.cwd(), "data", "Data_MCI.xlsx");

// export async function GET(_req: NextRequest) {
//   await ensureDataDir();
//   try {
//     const stat = await fs.stat(DATA_PATH);
//     const buffer = await fs.readFile(DATA_PATH);
//     return new NextResponse(new Uint8Array(buffer), {
//       headers: {
//         "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         "Content-Length": String(stat.size),
//         "Content-Disposition": `attachment; filename="Data_MCI.xlsx"`,
//         "Cache-Control": "no-store",
//       },
//     });
//   } catch {
//     return new NextResponse("Workbook not found. Append a row first.", { status: 404 });
//   }
// }


// ------------------------------------------------------------------------------ //
// Trying to make it work for Vercel
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { patient, meds } = body;

    if (!patient?.id || !patient?.name) {
      return new NextResponse("Patient id and name are required", {
        status: 400,
      });
    }

    // Build workbook in memory
    const wb = new ExcelJS.Workbook();
    const sheet = wb.addWorksheet("Data");

    // Add patient info
    sheet.addRow(["Patient ID", "Patient Name"]);
    sheet.addRow([patient.id, patient.name]);
    sheet.addRow([]);

    // Add medication table
    sheet.addRow(["Drug", "Dose", "Route", "Instructions"]);
    meds.forEach((med: any) => {
      sheet.addRow([med.drug, med.dose, med.route, med.instructions]);
    });

    const buffer = await wb.xlsx.writeBuffer();

    // Clean filename
    const safeName = patient.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${patient.id}_${safeName}_excel.xlsx"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Excel generation error:", err);
    return new NextResponse("Error generating workbook", { status: 500 });
  }
}

