const SYSTEM_PROMPT = `You are MediBot, a friendly and knowledgeable AI medical assistant integrated into Prescripto, a doctor appointment booking platform.

Your role is to:
1. Listen carefully to the user's described symptoms
2. Ask relevant follow-up questions (age, duration of symptoms, severity, any existing conditions)
3. Suggest possible conditions that match the symptoms (always mention 2-4 possibilities, from most to least likely)
4. Recommend the appropriate type of specialist doctor they should see and in my option list there are only few and they are general physician,dermatologist,neurologist,gynecologist,pediatricians,gastroenterologist...suggest only with these specialist
5. Indicate urgency level: 🟢 Non-urgent | 🟡 See a doctor soon | 🔴 Seek immediate care

Formatting rules:
- Use **bold** for important terms
- Use clear sections with emoji headings
- Keep responses concise and easy to understand
- Use plain language — avoid heavy medical jargon

Always end with a reminder that this is not a medical diagnosis and they should book an appointment with a qualified doctor.

IMPORTANT RESTRICTIONS:
- Never prescribe specific medications or dosages
- Never tell users to ignore serious symptoms
- For emergencies (chest pain, difficulty breathing, stroke symptoms, severe bleeding), immediately tell them to call emergency services (112 in India)
- Do not discuss topics unrelated to health and symptoms
- Always be empathetic and reassuring`;

// Free models to try in order — if one is rate limited, next is used
const FREE_MODELS = ["openai/gpt-oss-20b:free"];

const callOpenRouter = async (model, messages) => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Prescripto Symptom Checker",
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    },
  );

  const data = await response.json();
  return { ok: response.ok, data, status: response.status };
};

export const checkSymptoms = async (req, res) => {
  try {
    const { symptoms, history = [] } = req.body;

    if (!symptoms || symptoms.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please describe your symptoms",
      });
    }

    // Build conversation history
    const conversationMessages = history
      .filter((msg) => msg.role === "user" || msg.role === "assistant")
      .slice(-10)
      .map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

    conversationMessages.push({ role: "user", content: symptoms });

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationMessages,
    ];

    // Try each free model until one works
    let lastError = null;
    for (const model of FREE_MODELS) {
      const { ok, data } = await callOpenRouter(model, messages);

      if (ok && data.choices?.[0]?.message?.content) {
        console.log(`✅ Responded using model: ${model}`);
        return res.json({
          success: true,
          response: data.choices[0].message.content,
        });
      }

      // If rate limited or not found, try next model
      const errorCode = data?.error?.code;
      if (errorCode === 429 || errorCode === 404) {
        console.log(
          `⚠️ Model ${model} unavailable (${errorCode}), trying next...`,
        );
        lastError = data?.error?.message;
        console.log(JSON.stringify(data, null, 2));
        continue;
      }

      // Any other error — stop and report
      console.error("OpenRouter error:", data);
      return res.status(500).json({
        success: false,
        message: "AI service error. Please try again.",
      });
    }

    // All models failed
    console.error("All models exhausted. Last error:", lastError);
    return res.status(429).json({
      success: false,
      message:
        "All free AI models are busy right now. Please try again in a few seconds.",
    });
  } catch (error) {
    console.error("Symptom checker error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to analyze symptoms. Please try again.",
    });
  }
};
