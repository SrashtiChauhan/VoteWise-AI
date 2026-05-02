import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.options("/api/ai", cors());
app.use(express.json());

app.post("/api/ai", async (req, res) => {
  try {
    const { query } = req.body;

    console.log("API KEY:", process.env.GEMINI_API_KEY); // debug

    const prompt = `
You are an Election AI Assistant 🇮.

Explain clearly in simple steps.

Question: ${query}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("Gemini response:", data); // debug

    if (!response.ok) {
      return res.json({
        text: data?.error?.message || "⚠️ API Error",
      });
    }

    res.json({
      text:
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No response from AI",
    });
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({
      text: "⚠️ Server error. Try again.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});