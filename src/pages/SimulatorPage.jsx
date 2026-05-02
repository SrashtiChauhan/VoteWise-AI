import { useState } from "react";
import EVM from "../components/Simulator/EVM";
import { motion } from "framer-motion";

export default function SimulatorPage() {
  const [votes, setVotes] = useState({
    "Party A": 0,
    "Party B": 0,
    NOTA: 0,
  });

  const totalVotes =
    votes["Party A"] + votes["Party B"] + votes["NOTA"];

  const winner = Object.entries(votes).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-10">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Voting Simulator
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Experience a real election voting flow
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* LEFT → EVM */}
        <div className="lg:col-span-2 flex justify-center">
          <div className="w-full max-w-xl">
            <EVM votes={votes} setVotes={setVotes} />
          </div>
        </div>

        {/* RIGHT → RESULTS */}
        <div className="sticky top-28">

          <div className="p-6 rounded-2xl 
          bg-white dark:bg-[#0f172a]
          border border-gray-200 dark:border-gray-700
          shadow-sm">

            <h3 className="text-lg font-semibold mb-5 text-gray-800 dark:text-white">
              Live Results
            </h3>

            <div className="space-y-5">

              {Object.entries(votes).map(([party, count]) => {
                const percent =
                  totalVotes === 0
                    ? 0
                    : (count / totalVotes) * 100;

                const isWinner = party === winner && totalVotes > 0;

                return (
                  <div key={party}>

                    {/* TOP */}
                    <div className="flex justify-between text-sm mb-1">
                      <span
                        className={`${
                          isWinner
                            ? "text-green-500 font-semibold"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {party} {isWinner && "🏆"}
                      </span>

                      <span className="text-blue-500 font-semibold">
                        {count}
                      </span>
                    </div>

                    {/* BAR */}
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}