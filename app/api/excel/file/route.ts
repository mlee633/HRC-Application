// app/api/excel/file/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { ensureDataDir } from "@/lib/excelServer";
import fs from "node:fs/promises";
import path from "node:path";

const DATA_PATH = path.join(process.cwd(), "data", "Data_MCI.xlsx");

export async function GET(_req: NextRequest) {
  await ensureDataDir();
  try {
    const stat = await fs.stat(DATA_PATH);
    const buffer = await fs.readFile(DATA_PATH);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Length": String(stat.size),
        "Content-Disposition": `attachment; filename="Data_MCI.xlsx"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new NextResponse("Workbook not found. Append a row first.", { status: 404 });
  }
}
