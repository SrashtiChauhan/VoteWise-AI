import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/ai", async (req, res) => {
  try {
    const { query } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        text: "❌ API key missing in server",
      });
    }

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
              parts: [{ text: query }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini Error:", data);
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
    console.error("SERVER ERROR:", error);
    res.status(500).json({
      text: "⚠️ Server error. Try again.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});