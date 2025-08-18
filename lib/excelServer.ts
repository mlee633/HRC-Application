// lib/excelServer.ts
import ExcelJS from "exceljs";
import fs from "node:fs/promises";
import path from "node:path";

export const DATA_DIR = path.join(process.cwd(), "data");
export const DATA_PATH = path.join(DATA_DIR, "Data_MCI.xlsx");

export async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function loadWorkbook(): Promise<ExcelJS.Workbook> {
  const wb = new ExcelJS.Workbook();
  try {
    await wb.xlsx.readFile(DATA_PATH); // simpler & reliable on Node
    return wb;
  } catch {
    return wb; // fresh workbook on first run
  }
}

export async function saveWorkbook(wb: ExcelJS.Workbook) {
  await wb.xlsx.writeFile(DATA_PATH); // atomic overwrite of the file with all rows
}