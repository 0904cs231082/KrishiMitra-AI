import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ onSettingsOpen,  isMobileSidebarOpen,
  setIsMobileSidebarOpen, }) {
  return (
    <div className="min-h-screen bg-slate-50">
     <Navbar
  onSettingsOpen={onSettingsOpen}
  onMenuOpen={() => setIsMobileSidebarOpen(true)}
/>

      <div className="flex">
       <Sidebar
  onSettingsOpen={onSettingsOpen}
  isMobileSidebarOpen={isMobileSidebarOpen}
  onMobileClose={() => setIsMobileSidebarOpen(false)}
/>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;