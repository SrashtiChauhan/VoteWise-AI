import { useState } from "react";
import { getAIResponse } from "../utils/ai";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function JourneyPage() {
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  //  CLEAN AI TEXT (remove markdown junk)
  const cleanText = (text) => {
    return text
      .replace(/###/g, "")
      .replace(/\*\*/g, "")
      .replace(/🔹|👉|•/g, "")
      .replace(/\n/g, " ")
      .trim();
  };

  //  GENERATE JOURNEY
  const generateJourney = async () => {
    if (!age || !state) return;

    setLoading(true);
    setSteps([]);

    const prompt = `
Explain a personalized voting journey for a ${age}-year-old voter from ${state}.

Return ONLY numbered steps like:
1. Title - explanation
2. Title - explanation

Keep it clean and structured.
`;

    const response = await getAIResponse(prompt);

    // PARSE STEPS
    const parsed = response
      .split(/\d+\.\s/)
      .filter((step) => step.trim() !== "")
      .map((step) => cleanText(step));

    setSteps(parsed);
    setLoading(false);
  };

  return (
    <div className="pt-24 px-6 flex justify-center">
      <div className="w-full max-w-2xl">

        {/* 🔹 HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Personalized Voting Journey
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Step-by-step guidance tailored for you
          </p>
        </div>

        {/* 🔹 FORM */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] shadow-lg border border-gray-200 dark:border-gray-700">

          <div className="space-y-4">
            <input
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 rounded-lg border 
              bg-gray-50 dark:bg-gray-800 
              text-gray-800 dark:text-white
              focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              placeholder="Enter your state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-3 rounded-lg border 
              bg-gray-50 dark:bg-gray-800 
              text-gray-800 dark:text-white
              focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              onClick={generateJourney}
              className="w-full py-3 rounded-lg text-white font-medium
              bg-gradient-to-r from-blue-500 to-purple-500
              hover:opacity-90 transition"
            >
              Generate Journey
            </button>
          </div>
        </div>

        {/* 🔹 LOADING */}
        {loading && (
          <div className="flex items-center justify-center mt-8 gap-2 text-gray-500 dark:text-gray-300">
            <Loader2 className="animate-spin" size={18} />
            Generating your journey...
          </div>
        )}

        {/* RESULTS */}
        <div className="mt-10 space-y-6">

          {steps.map((step, i) => {
            const parts = step.split("-");
            const title = parts[0];
            const desc = parts.slice(1).join("-");

            //  INTRO CARD (FIRST STEP)
            if (i === 0) {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl 
                  bg-gradient-to-r from-blue-500/10 to-purple-500/10
                  border border-blue-400/30 shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              );
            }

            // 🔹 NORMAL STEPS
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-white dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700 shadow"
              >
                <div className="flex gap-4 items-start">

                  {/* STEP NUMBER */}
                  <div className="w-9 h-9 flex items-center justify-center 
                  rounded-full text-white font-semibold
                  bg-gradient-to-r from-blue-500 to-purple-500">
                    {i}
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {desc}
                    </p>
                  </div>

                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </div>
  );
}