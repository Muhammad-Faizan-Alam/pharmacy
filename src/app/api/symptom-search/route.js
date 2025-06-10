export async function POST(req) {
  const body = await req.json();
  const { symptomText } = body;

  if (!symptomText) {
    return new Response(JSON.stringify({ error: "Symptom text is required" }), { status: 400 });
  }
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant who suggests medicines based on symptoms. Just sugest medicines in maximum 4, 5 lines, don't use bold text, just normal and at the end you can say (in new line after giving): search in Saydaliyya e-Pharmacy Store!" },
          { role: "user", content: `A user has these symptoms: ${symptomText}. Suggest relevant medicines from the e-pharmacy.` }
        ]
      })
    });

    const data = await response.json();
    return new Response(JSON.stringify({ result: data.choices[0].message.content }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}