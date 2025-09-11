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

    if (!patient?.patientId || !patient?.name) {
      return new NextResponse("Patient ID and name are required", { status: 400 });
    }

    // Create workbook & sheet
    const wb = new ExcelJS.Workbook();
    const sheet = wb.addWorksheet("Patient Data");

    // ----------------------------
    // Patient info section
    // ----------------------------
    const patientInfo = [
      ["Patient ID", patient.patientId],
      ["Patient Name", patient.name],
      ["Age", patient.age?.toString() || ""],
      ["Sex", patient.sex || ""],
      ["Ethnicity", patient.ethnicity || ""],
      ["Date of Participation", patient.dateOfParticipation || ""],
      ["Overall MRCI", patient.overallMRCI?.toString() || ""],
      ["Severity (MRCI)", patient.severityMRCI || ""],
    ];

    patientInfo.forEach((row) => sheet.addRow(row));
    sheet.addRow([]); // blank line after patient info

    // Style first column (labels) bold
    for (let i = 1; i <= patientInfo.length; i++) {
      const cell = sheet.getRow(i).getCell(1);
      cell.font = { bold: true };
    }

    // ----------------------------
    // Medication table
    // ----------------------------
    sheet.columns = [
      { header: "Medication Name", key: "name", width: 25 },
      { header: "Dosage Form", key: "dosageForm", width: 20 },
      { header: "Frequency", key: "frequency", width: 15 },
      { header: "Special Instructions", key: "instructions", width: 40 },
    ];

    // Header row (after patient info + blank)
    const headerRowIndex = patientInfo.length + 2; // e.g. row 10
    const headerRow = sheet.getRow(headerRowIndex);

    headerRow.eachCell((cell) => {
      cell.font = { bold: true, size: 12, color: { argb: "FFFFFFFF" } }; // white bold text
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF1F497D" }, // dark blue background
      };
      cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Add medication rows
    meds.forEach((med: any) => {
      sheet.addRow({
        name: med.name || "",
        dosageForm: med.dosageForm || "",
        frequency: med.frequency || "",
        instructions: (med.instructions || []).join(", "),
      });
    });

    // Style data rows
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber > headerRowIndex) {
        row.eachCell((cell) => {
          cell.alignment = { vertical: "top", horizontal: "left", wrapText: true };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      }
    });

    // ----------------------------
    // Export as buffer
    // ----------------------------
    const buffer = await wb.xlsx.writeBuffer();

    // Safe filename
    const safeName = patient.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${patient.patientId}_${safeName}_excel.xlsx"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Excel generation error:", err);
    return new NextResponse("Error generating workbook", { status: 500 });
  }
}
