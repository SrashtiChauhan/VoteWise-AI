import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import SimulatorPage from "./pages/SimulatorPage";
import TimelinePage from "./pages/TimelinePage";
import JourneyPage from "./pages/JourneyPage";



function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition duration-300">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/journey" element={<JourneyPage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;