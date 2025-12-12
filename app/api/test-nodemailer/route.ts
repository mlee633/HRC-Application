import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // set ?to=<your email> in the URL; defaults to your gmail user
  const to = searchParams.get("to") || process.env.GMAIL_USER || "";

  try {
    // Optional: verify SMTP login first
    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"MCI Alerts" <${process.env.GMAIL_USER}>`,
      to,
      subject: "Test email from MCI app",
      text: "If you received this, Nodemailer + Gmail SMTP are working.",
    });

    return NextResponse.json({ ok: true, accepted: info.accepted, rejected: info.rejected, messageId: info.messageId });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
