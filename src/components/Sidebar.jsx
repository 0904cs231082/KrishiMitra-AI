import { Settings, X } from "lucide-react";
import { NavLink } from "react-router-dom";

import { mainNavigation } from "../data/navigation";

function Sidebar({
  onSettingsOpen,
  isMobileSidebarOpen,
  onMobileClose,
}) {
  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="
          hidden
          h-[calc(100vh-4rem)]
          w-64
          shrink-0
          flex-col
          border-r border-slate-200
          bg-white
          dark:border-slate-700
          dark:bg-slate-900
          lg:flex
        "
      >
        {/* Sidebar Header */}
        <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {mainNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-green-50 text-green-700 shadow-sm dark:bg-green-950/40 dark:text-green-400"
                      : "text-slate-600 hover:bg-green-50 hover:text-green-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-green-400"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={20}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />

                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="border-t border-slate-100 p-3 dark:border-slate-800">
          <button
            onClick={onSettingsOpen}
            className="
              group flex w-full items-center gap-3
              rounded-xl px-3 py-3
              text-sm font-medium
              text-slate-600
              transition-all duration-200
              hover:bg-slate-100
              hover:text-slate-900
              dark:text-slate-300
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <Settings
              size={20}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:rotate-45"
            />

            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}

      {isMobileSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={onMobileClose}
            className="
              fixed inset-0 z-40
              bg-slate-950/40
              backdrop-blur-sm
              lg:hidden
            "
          />

          {/* Mobile Drawer */}
          <aside
            className="
               fixed left-0 top-0 z-50
    flex h-screen w-72 flex-col
    border-r border-slate-200
    bg-white
    shadow-2xl

    transform
    transition-transform
    duration-300
    ease-out

    dark:border-slate-800
    dark:bg-slate-900
    lg:hidden
            "
          >
            {/* Mobile Header */}
            <div
              className="
                flex items-center justify-between
                border-b border-slate-100
                px-5 py-4
                dark:border-slate-800
              "
            >
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  KrishiMitra
                </p>

                <p className="text-[10px] font-medium text-green-600 dark:text-green-400">
                  AI Farming Assistant
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onMobileClose}
                className="
                  rounded-xl p-2
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                  dark:hover:bg-slate-800
                  dark:hover:text-white
                "
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
              {mainNavigation.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onMobileClose}
                    className={({ isActive }) =>
                      `group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                          : "text-slate-600 hover:bg-green-50 hover:text-green-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-green-400"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={20}
                          strokeWidth={isActive ? 2.2 : 1.8}
                          className="transition-transform duration-200 group-hover:scale-110"
                        />

                        <span>{item.name}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Mobile Settings */}
            <div className="border-t border-slate-100 p-3 dark:border-slate-800">
              <button
                onClick={() => {
                  onMobileClose();
                  onSettingsOpen();
                }}
                className="
                  group flex w-full items-center gap-3
                  rounded-xl px-3 py-3
                  text-sm font-medium
                  text-slate-600
                  transition-all duration-200
                  hover:bg-slate-100
                  hover:text-slate-900
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                  dark:hover:text-white
                "
              >
                <Settings
                  size={20}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:rotate-45"
                />

                <span>Settings</span>
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

export default Sidebar;