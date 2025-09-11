// // lib/excelServer.ts
// import ExcelJS from "exceljs";
// import fs from "node:fs/promises";
// import path from "node:path";

// export const DATA_DIR = path.join(process.cwd(), "data");
// export const DATA_PATH = path.join(DATA_DIR, "Data_MCI.xlsx");

// export async function ensureDataDir() {
//   await fs.mkdir(DATA_DIR, { recursive: true });
// }

// export async function loadWorkbook(): Promise<ExcelJS.Workbook> {
//   const wb = new ExcelJS.Workbook();
//   try {
//     await wb.xlsx.readFile(DATA_PATH); // simpler & reliable on Node
//     return wb;
//   } catch {
//     return wb; // fresh workbook on first run
//   }
// }

// export async function saveWorkbook(wb: ExcelJS.Workbook) {
//   await wb.xlsx.writeFile(DATA_PATH); // atomic overwrite of the file with all rows
// }



// Trying to make it work for Vercel
import ExcelJS from "exceljs";

// In-memory workbook cache
let workbookCache: ExcelJS.Workbook | null = null;

export async function loadWorkbook(): Promise<ExcelJS.Workbook> {
  if (workbookCache) {
    return workbookCache;
  }

  const wb = new ExcelJS.Workbook();

  if (wb.worksheets.length === 0) {
    wb.addWorksheet("Data_Rx");
    wb.addWorksheet("Data_Meds");
  }

  workbookCache = wb;
  return wb;
}

export async function saveWorkbook(wb: ExcelJS.Workbook) {
  workbookCache = wb;
}

export async function getWorkbookBuffer(
  wb: ExcelJS.Workbook
): Promise<Buffer> {
  const arrayBuffer = await wb.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer);
}
