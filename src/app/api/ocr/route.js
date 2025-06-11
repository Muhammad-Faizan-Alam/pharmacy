function fallbackExtractMedicines(text) {
    const lines = text.split('\n');
    const medicines = [];
    const regex = /^([\w\s]+)\s+(\d+)$/i;
    for (const line of lines) {
        const match = line.match(regex);
        if (match) {
            medicines.push({ name: match[1].trim(), quantity: parseInt(match[2], 10) });
        }
    }
    return medicines;
}
export async function POST(req) {
    try {
        const { ocrText } = await req.json();
        const systemPrompt = `
            You are an assistant that extracts medicine names and their quantities from OCR text of a prescription.
            Return a JSON array of objects with 'name' and 'quantity' fields.
            If a quantity is missing, set it to 1.
            If nothing is found, return an empty array [].
            Example input: "Panadol 15\nAsprin 891"
            Example output: [{"name": "Panadol", "quantity": 15}, {"name": "Asprin", "quantity": 891}]
            Only output the JSON array, nothing else.
`;

        const gptResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: `Extract medicines and quantities from this text:\n${ocrText}` }
                ]
            })
        });

        const gptData = await gptResponse.json();
        console.log("GPT response:", gptData);

        let medicines = [];
        try {
            medicines = JSON.parse(gptData.choices[0].message.content);
            if (!Array.isArray(medicines) || medicines.length === 0) {
                medicines = fallbackExtractMedicines(ocrText);
            }
        } catch {
            medicines = fallbackExtractMedicines(ocrText);
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