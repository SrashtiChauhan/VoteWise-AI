import Navbar from "../components/Navbar";

export default function Layout({ children, darkMode, setDarkMode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] transition">
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="pt-20 px-4 md:px-6 max-w-7xl mx-auto">
        {children}
      </div>

    </div>
  );
}