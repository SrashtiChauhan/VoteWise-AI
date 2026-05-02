import { useState } from "react";
import { getAIResponse } from "../utils/ai";
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function JourneyPage() {
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateJourney = async () => {
    if (!age || !state) return;

    setLoading(true);
    setSteps([]);

    const prompt = `
Explain a personalized voting journey for a ${age}-year-old voter from ${state}.

Return response ONLY in numbered steps format like:
1. Step title - short explanation
2. Step title - explanation
    `;

    const response = await getAIResponse(prompt);

    // 🔥 Convert AI response → array
    const parsed = response
      .split("\n")
      .filter((line) => line.trim() !== "");

    setSteps(parsed);
    setLoading(false);
  };

  return (
    <div className="pt-24 px-6 flex justify-center">

      <div className="w-full max-w-2xl">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Personalized Voting Journey
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Get step-by-step guidance tailored for you
          </p>
        </div>

        {/* FORM CARD */}
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

        {/* LOADING */}
        {loading && (
          <div className="flex items-center justify-center mt-8 gap-2 text-gray-500 dark:text-gray-300">
            <Loader2 className="animate-spin" size={18} />
            Generating your journey...
          </div>
        )}

        {/* RESULT TIMELINE */}
        <div className="mt-10 space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl 
              bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 shadow"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Sparkles size={16} className="text-blue-500" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {step}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}