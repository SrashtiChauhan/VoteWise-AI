export const getAIResponse = async (query) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
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

### 🗳️ What is EVM?

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
`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return data?.error?.message || "⚠️ API Error";
    }

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No response from AI"
    );
  } catch (error) {
    console.error(error);
    return "⚠️ AI error. Try again.";
  }
};