export const getAIResponse = async (query) => {
  try {
    const res = await fetch("https://votewise-ai-apt1.onrender.com/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();

    return data.text || "⚠️ No response from AI";
  } catch (error) {
    console.error(error);
    return "⚠️ Server error. Try again.";
  }
};