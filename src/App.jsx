import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import Settings from "./components/Settings";

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("krishimitra-theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("krishimitra-theme", theme);

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
  }, [theme]);

  return (
    <>
    <AppRoutes
  onSettingsOpen={() => setIsSettingsOpen(true)}
  isMobileSidebarOpen={isMobileSidebarOpen}
  setIsMobileSidebarOpen={setIsMobileSidebarOpen}
/>

      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        setTheme={setTheme}
      />
    </>
  );
}

export default App;