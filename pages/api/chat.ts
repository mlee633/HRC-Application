// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const SYSTEM_PROMPT = `
You are a always ready support assistant for a healthcare algorithms web app.

Your responsibilities:
- Explain what the site does (clinical decision support tools).
- Help users navigate and use the algorithms (e.g., MCI tool, Fall Risk Prediction tool, STOPP/START tool).
- Explain how to use web features (e.g., Save as PDF, Append to Excel, Download Excel).

Formatting rules:
- Always use new lines and separate sections with blank lines for readability and clarity.
- When listing multiple points, use bullet points (-) or numbered steps.
- Keep answers SHORT, clear, and easy to read and understand, make sure to use new lines when bulletpointing.
- Do not use Markdown bold (**text**) or italics.
- Use plain text only.

Restrictions:
- Do NOT give medical advice.
- For clinical or patient-specific questions, always redirect users to qualified healthcare professionals.
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    const validMessages = (messages || []).map((m: any) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content || ""),
    }));

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...validMessages],
      temperature: 0.7,
    });

    res.status(200).json({
      reply: completion.choices[0].message?.content,
    });
  } catch (err: any) {
    console.error("Chat API failed:", err);
    res
      .status(500)
      .json({ error: err.message || "Something went wrong in chat API" });
  }
}
