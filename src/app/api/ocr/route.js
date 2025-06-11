import { NextResponse } from "next/server";
import Tesseract from "tesseract.js";

export async function POST(req) {
  try {
    const { ocrText } = await req.json();

    const gptResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an assistant that extracts medicine names and their quantities from OCR text of a prescription. Return a JSON array of objects with 'name' and 'quantity' fields. Only output the JSON." },
          { role: "user", content: `Extract medicines and quantities from this text:\n${ocrText}` }
        ]
      })
    });

    const gptData = await gptResponse.json();
    let medicines = [];
    try {
      medicines = JSON.parse(gptData.choices[0].message.content);
    } catch {
      medicines = [];
    }

    return Response.json({
      medicines,
      message: medicines.length
        ? "Medicines extracted successfully"
        : "No medicines detected. Check prescription format or improve parsing.",
      raw_text: ocrText
    });
  } catch (err) {
    console.error("OCR error:", err);
    return Response.json({ error: "OCR failed or invalid image" }, { status: 500 });
  }
}