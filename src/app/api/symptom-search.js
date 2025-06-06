export default async function handler(req, res) {
  const { symptomText } = req.body;

  if (!symptomText) {
    return res.status(400).json({ error: "Symptom text is required" });
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
          {
            role: "system",
            content: "You are a helpful assistant who suggests medicines based on symptoms."
          },
          {
            role: "user",
            content: `A user has these symptoms: ${symptomText}. Suggest relevant medicines from the e-pharmacy.`
          }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ result: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}