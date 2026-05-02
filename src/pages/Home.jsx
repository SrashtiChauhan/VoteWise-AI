import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Map, Cpu, Brain } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "AI Chat",
      desc: "Ask anything about elections",
      icon: <MessageCircle size={26} />,
      route: "/chat",
    },
    {
      title: "Timeline",
      desc: "Step-by-step election process",
      icon: <Map size={26} />,
      route: "/timeline",
    },
    {
      title: "Simulator",
      desc: "Try voting in a demo environment",
      icon: <Cpu size={26} />,
      route: "/simulator",
    },
    {
      title: "Journey",
      desc: "Personalized voting guide",
      icon: <Brain size={26} />,
      route: "/journey",
    },
  ];

  return (
    <div className="pt-28 px-6 text-center max-w-7xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-gray-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-500">
          Election Education Assistant
        </h1>

        <p className="mt-4 text-gray-500 dark:text-gray-300 text-lg">
          Learn how elections work step-by-step in an interactive way
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              onClick={() => navigate(card.route)}
              className="group cursor-pointer p-8 bg-white dark:bg-gray-800 
              rounded-2xl border border-gray-200 dark:border-gray-700
              shadow-sm hover:shadow-md 
              hover:-translate-y-1 transition-all duration-300"
            >

              <div className="mb-4 flex justify-center text-blue-500 dark:text-purple-400">
                {card.icon}
              </div>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {card.title}
              </h2>

              <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm">
                {card.desc}
              </p>

              <div className="mt-6 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="text-sm text-blue-500 dark:text-purple-400">
                  Explore
                </span>
                <span className="transform group-hover:translate-x-1 transition">
                  →
                </span>
              </div>

            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}