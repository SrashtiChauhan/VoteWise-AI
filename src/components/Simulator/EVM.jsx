import { useState } from "react";
import { CheckCircle, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

export default function EVM({ votes, setVotes }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showFP, setShowFP] = useState(false);

  const candidates = [
    { name: "Party A", color: "bg-orange-500" },
    { name: "Party B", color: "bg-green-500" },
    { name: "NOTA", color: "bg-gray-500" },
  ];

  const handleVote = () => {
    if (!selected || submitted) return;

    setShowFP(true);

    setTimeout(() => {
      setVotes((prev) => ({
        ...prev,
        [selected]: prev[selected] + 1,
      }));

      setSubmitted(true);
      setShowFP(false);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full p-6 rounded-2xl 
      bg-white dark:bg-[#0f172a]
      border border-gray-200 dark:border-gray-700 
      shadow-sm"
    >

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-center mb-5 text-gray-800 dark:text-white">
        Electronic Voting Machine
      </h2>

      {/* STATUS LIGHT */}
      <div className="flex justify-end mb-3">
        <div
          className={`w-3 h-3 rounded-full ${
            submitted ? "bg-green-500" : "bg-red-500"
          }`}
        />
      </div>

      {/* CANDIDATES */}
      <div className="space-y-3">
        {candidates.map((c, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.96 }}
            disabled={submitted}
            onClick={() => setSelected(c.name)}
            className={`w-full flex justify-between items-center p-4 rounded-lg border transition-all duration-200
              
              ${
                selected === c.name
                  ? "bg-blue-100 dark:bg-blue-600 border-blue-500"
                  : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              }

              ${
                submitted
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${c.color}`} />
              <span className="font-medium text-gray-800 dark:text-white">
                {c.name}
              </span>
            </div>

            {selected === c.name && (
              <CheckCircle size={18} className="text-blue-500" />
            )}
          </motion.button>
        ))}
      </div>

      {/* FINGERPRINT ANIMATION */}
      {showFP && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex justify-center mt-5 text-blue-500"
        >
          <Fingerprint size={40} />
        </motion.div>
      )}

      {/* VOTE BUTTON */}
      <button
        onClick={handleVote}
        disabled={!selected || submitted}
        className="mt-6 w-full py-2 rounded-lg text-white transition
        bg-gradient-to-r from-blue-500 to-purple-500
        hover:opacity-90 disabled:opacity-50"
      >
        Cast Vote
      </button>

      {/* SUCCESS MESSAGE */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 p-3 rounded-lg text-center 
          bg-green-100 dark:bg-green-900/40 
          text-green-700 dark:text-green-300"
        >
          Vote recorded successfully
        </motion.div>
      )}

      {/* RESET */}
      {submitted && (
        <button
          onClick={() => {
            setSelected(null);
            setSubmitted(false);
          }}
          className="mt-3 w-full text-sm text-gray-500 hover:text-blue-500"
        >
          Reset Machine
        </button>
      )}

    </motion.div>
  );
}