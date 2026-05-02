import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Landmark } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat" },
    { name: "Simulator", path: "/simulator" },
    { name: "Timeline", path: "/timeline" },
    { name: "Journey", path: "/journey" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">

      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">

        <h1 className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-purple-400">
          <Landmark size={22} />
          VoteWise AI
        </h1>

        <div className="flex items-center gap-6 text-sm font-medium">

          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className="relative group"
              >
                <span
                  className={`transition ${
                    active
                      ? "text-blue-600 dark:text-purple-400"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {item.name}
                </span>

                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-blue-500 dark:bg-purple-400 transition-all duration-300
                  ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            );
          })}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:scale-105 transition"
          >
            {darkMode ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-gray-700" />
            )}
          </button>

        </div>
      </div>
    </div>
  );
}