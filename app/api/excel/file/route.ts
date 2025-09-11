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

    const wb = new ExcelJS.Workbook();
    const sheet = wb.addWorksheet("Patient Data");

    // ----------------------------
    // Patient info block
    // ----------------------------
    const patientInfo = [
      ["Patient Name", patient.name],
      ["Age", patient.age?.toString() || ""],
      ["Sex", patient.sex || ""],
      ["Ethnicity", patient.ethnicity || ""],
      ["Date of Participation", patient.dateOfParticipation || ""],
      ["Overall MRCI", patient.overallMRCI?.toString() || ""],
      ["Severity (MRCI)", patient.severityMRCI || ""],
    ];

    patientInfo.forEach((row) => sheet.addRow(row));
    sheet.addRow([]); // blank line

    // Style patient info block
    for (let i = 1; i <= patientInfo.length; i++) {
      const labelCell = sheet.getRow(i).getCell(1);
      labelCell.font = { bold: true };
      labelCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD9D9D9" }, // light gray background
      };
      labelCell.alignment = { vertical: "middle", horizontal: "left" };
    }

    // ----------------------------
    // Medication table
    // ----------------------------
    const headerRowIndex = patientInfo.length + 2; // after patient info + blank row
    const headers = ["Medication Name", "Dosage Form", "Frequency", "Special Instructions"];
    sheet.addRow(headers);

    // Set column widths
    sheet.getColumn(1).width = 25;
    sheet.getColumn(2).width = 25;
    sheet.getColumn(3).width = 20;
    sheet.getColumn(4).width = 50;

    // Style header row
    const headerRow = sheet.getRow(headerRowIndex);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF1F497D" }, // dark blue
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
      sheet.addRow([
        med.name || "",
        med.dosageForm || "",
        med.frequency || "",
        (med.instructions || []).join(", "),
      ]);
    });

    // Style medication rows
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
        row.height = 30; // auto-expand a bit
      }
    });

    // ----------------------------
    // Send file
    // ----------------------------
    const buffer = await wb.xlsx.writeBuffer();

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
