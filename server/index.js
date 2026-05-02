import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ai", async (req, res) => {
  try {
    const { query } = req.body;

    
    const prompt = `
You are an Election AI Assistant 🇮.

Your job:
Explain answers in a clean, structured, and professional way like ChatGPT.

Follow these rules STRICTLY:

1. Start with a clear title (use emoji + bold heading)
2. Use short paragraphs (max 2 lines)
3. Use bullet points for clarity
4. Use meaningful emojis only (not too many)
5. Highlight important words using **bold**
6. Keep tone simple, helpful, and modern
7. Avoid long blocks of text
8. End with a short helpful summary

Format example:

###  What is EVM?

**Electronic Voting Machine (EVM)** is used to record votes digitally.

🔹 **Key Points**
- Easy to use
- No paper required
- Fast counting

🔹 **Steps**
1. Verify identity
2. Press button
3. Confirm vote

🔹 **Benefits**
- Fast ⚡
- Accurate ✅
- Secure 🔒

👉 Keep answer clean, readable, and visually appealing.

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

    if (!response.ok) {
      console.error(data);
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
    console.error(error);
    res.status(500).json({
      text: "⚠️ Server error. Try again.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});