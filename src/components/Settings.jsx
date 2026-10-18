import { NavLink } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  Globe,
  HelpCircle,
  Info,
  Moon,
  ShieldCheck,
  Sprout,
  Sun,
  User,
  X,
} from "lucide-react";

function Settings({ isOpen, onClose, theme, setTheme }) {
  if (!isOpen) return null;

  const settingsItems = [
    {
      icon: User,
      title: "Account",
      description: "Profile aur account information",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Alerts aur farming updates",
    },
    {
      icon: Globe,
      title: "Language",
      description: "App language preferences",
    },
    {
      icon: ShieldCheck,
      title: "Privacy & Security",
      description: "Account privacy aur security",
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "Help center aur support",
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px]"
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-xs font-medium text-green-600">
              KrishiMitra AI
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Settings
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close settings"
          >
            <X size={21} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Account Card */}
          <div className="mb-5 rounded-2xl border border-green-100 bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
                P
              </div>

              <div className="min-w-0">
                <h3 className="truncate font-bold text-slate-900">
                  Farmer Account
                </h3>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                  farmer@example.com
                </p>
              </div>
            </div>

           <NavLink
              to="/account"
                                onClick={onClose}
                   className="
                       mt-4 flex w-full items-center justify-between
                     rounded-xl bg-white px-3 py-2.5
                 text-sm font-semibold text-green-700
                 transition hover:bg-green-100
                       dark:bg-slate-800
                     dark:text-green-400
                   dark:hover:bg-slate-700
                 "
              > 
                 <span>View Account</span>
                         <ChevronRight size={17} />
                 </NavLink>
          </div>

          {/* Appearance */}
          <div className="mb-5">
            <h3 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Appearance
            </h3>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Sun size={19} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    Theme
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Choose your preferred appearance
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                <button
                   onClick={() => setTheme("light")}
                 className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                       theme === "light"
                      ? "bg-white text-slate-700 shadow-sm"
                       : "text-slate-500 hover:text-slate-700"
                   }`}
                            >
            <Sun size={15} />
                     Light
                </button>

               <button
  onClick={() => setTheme("dark")}
  className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
    theme === "dark"
      ? "bg-white text-slate-700 shadow-sm"
      : "text-slate-500 hover:text-slate-700"
  }`}
>
  <Moon size={15} />
  Dark
</button>
              </div>
            </div>
          </div>

          {/* Settings List */}
          <div className="mb-5">
            <h3 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Preferences
            </h3>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {settingsItems.map((item, index) => {
                const Icon = item.icon;

                return (
                 <NavLink
  key={item.title}
  to={
    item.title === "Account"
      ? "/account"
      : item.title === "Notifications"
      ? "/notifications"
      :  item.title === "Language"
      ? "/language"
      : item.title === "Privacy & Security"
      ? "/privacy-security"
      : item.title === "Help & Support"
      ? "/help-support"
      : "#"
  }
  onClick={(e) => {
    if (item.title !== "Account" && item.title !== "Notifications"  && item.title !== "Language" 
      && item.title !== "Privacy & Security" && item.title !== "Help & Support"
    ) {
      e.preventDefault();
    }

    if (
      item.title === "Account" ||
      item.title === "Notifications" ||
      item.title === "Language"  ||
      item.title === "Privacy & Security" ||
       item.title === "Help & Support"
    ) {
      onClose();
    }
  }}
  className={`flex w-full items-center gap-3 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
    index !== settingsItems.length - 1
      ? "border-b border-slate-100 dark:border-slate-700"
      : ""
  }`}
>
  <div
    className="
      flex h-10 w-10 shrink-0 items-center justify-center
      rounded-xl bg-slate-50 text-slate-600
      dark:bg-slate-700 dark:text-slate-300
    "
  >
    <Icon size={19} />
  </div>

  <div className="min-w-0 flex-1">
    <p className="text-sm font-semibold text-slate-800 dark:text-white">
      {item.title}
    </p>

    <p className="mt-0.5 truncate text-xs text-slate-400 dark:text-slate-400">
      {item.description}
    </p>
  </div>

  <ChevronRight
    size={17}
    className="shrink-0 text-slate-300 dark:text-slate-500"
  />
</NavLink>
                );
              })}
            </div>
          </div>

          {/* Government Schemes */}
          <NavLink
  to="/sarkari-yojana"
  onClick={onClose}
  className="mb-5 flex w-full items-center gap-3 rounded-2xl border border-green-100 bg-green-50 p-4 text-left transition hover:bg-green-100 dark:border-green-900/50 dark:bg-green-950/20 dark:hover:bg-green-950/40"
>
  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm dark:bg-slate-900 dark:text-green-400">
    <Sprout size={21} />
  </div>

  <div className="flex-1">
    <p className="text-sm font-bold text-green-900 dark:text-green-300">
      Sarkari Yojana Guide
    </p>

    <p className="mt-1 text-xs leading-5 text-green-700 dark:text-green-400">
      Farmers ke liye government schemes aur benefits explore karein.
    </p>
  </div>

  <ChevronRight
    size={18}
    className="text-green-600 dark:text-green-400"
  />
</NavLink>

          {/* App Info */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start gap-3">
              <Info
                size={18}
                className="mt-0.5 shrink-0 text-slate-400"
              />

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  KrishiMitra AI
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Version 1.0.0
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Smart agriculture assistance for farmers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Settings;