import { motion } from "framer-motion";
import { CheckCircle, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

export default function TimelineItem({
  step,
  index,
  active,
  completed,
  onHover,
}) {
  const [loading, setLoading] = useState(false);
  const [aiText, setAiText] = useState("");

  const handleAI = async (e) => {
    e.stopPropagation();
    setLoading(true);

    // fake AI response (replace later with real API)
    setTimeout(() => {
      setAiText(
        `${step.title} is an important phase where ${step.description.toLowerCase()} This ensures a fair and transparent election process.`
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      onMouseEnter={onHover}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div
        className={`p-6 rounded-2xl transition-all duration-300
        ${
          active
            ? "bg-white dark:bg-[#0f172a] shadow-xl border border-blue-500/30"
            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {index + 1}. {step.title}
          </h3>

          {completed && (
            <CheckCircle size={20} className="text-green-500" />
          )}
        </div>

        {/* DESCRIPTION */}
        {active && (
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            {step.description}
          </p>
        )}

        {/* AI BUTTON */}
        {active && (
          <button
            onClick={handleAI}
            className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg 
            bg-blue-100 dark:bg-blue-900/30 
            text-blue-600 dark:text-blue-400 text-sm"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Sparkles size={16} />
            )}
            Explain with AI
          </button>
        )}

        {/* AI RESPONSE */}
        {aiText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 rounded-lg 
            bg-gray-100 dark:bg-gray-900 
            text-sm text-gray-700 dark:text-gray-300"
          >
            {aiText}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}