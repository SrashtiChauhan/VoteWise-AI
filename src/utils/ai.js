export const getAIResponse = async (query) => {
  try {
    const res = await fetch("http://localhost:5000/api/ai", {
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