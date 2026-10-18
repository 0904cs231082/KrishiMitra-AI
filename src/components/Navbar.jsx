import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
} from "lucide-react";

function Navbar({ onSettingsOpen, onMenuOpen }) {
  return (
    <header
      className="
        sticky top-0 z-40
        border-b border-slate-200
        bg-white/90
        backdrop-blur-xl
        dark:border-slate-700
        dark:bg-slate-900/90
      "
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left Section */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu Button */}
          <button
          onClick={onMenuOpen}
            className="
              rounded-xl p-2
              text-slate-600
              transition-all duration-200
              hover:bg-slate-100
              hover:text-slate-900
              dark:text-slate-300
              dark:hover:bg-slate-800
              dark:hover:text-white
              lg:hidden
            "
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">

            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl
                bg-green-600
                text-white
                shadow-sm
              "
            >
              🌾
            </div>

            <div className="hidden sm:block">
              <h1
                className="
                  text-lg font-bold tracking-tight
                  text-slate-800
                  dark:text-white
                "
              >
                KrishiMitra
              </h1>

              <p className="text-[10px] font-medium text-green-600 dark:text-green-400">
                AI Farming Assistant
              </p>
            </div>

          </div>
        </div>

        {/* AI Search */}
        <div className="mx-4 hidden max-w-xl flex-1 md:block">
          <div
            className="
              group flex items-center gap-3
              rounded-2xl
              border border-slate-200
              bg-slate-50
              px-4 py-2.5
              transition-all duration-300
              focus-within:border-green-400
              focus-within:bg-white
              focus-within:shadow-md
              dark:border-slate-700
              dark:bg-slate-800
              dark:focus-within:border-green-500
              dark:focus-within:bg-slate-800
            "
          >
            <Search
              size={19}
              className="
                text-slate-400
                transition-colors
                group-focus-within:text-green-600
                dark:group-focus-within:text-green-400
              "
            />

            <input
              type="text"
              placeholder="Ask KrishiMitra AI..."
              className="
                w-full
                bg-transparent
                text-sm
                text-slate-700
                outline-none
                placeholder:text-slate-400
                dark:text-slate-200
                dark:placeholder:text-slate-500
              "
            />

            <span
              className="
                hidden
                rounded-md
                border border-slate-200
                bg-white
                px-2 py-1
                text-[10px]
                text-slate-400
                lg:block
                dark:border-slate-600
                dark:bg-slate-700
                dark:text-slate-300
              "
            >
              AI
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2">

          {/* Notification */}
          <button
            className="
              relative rounded-xl p-2.5
              text-slate-500
              transition-all duration-200
              hover:bg-green-50
              hover:text-green-600
              dark:text-slate-300
              dark:hover:bg-green-950/40
              dark:hover:text-green-400
            "
          >
            <Bell size={20} />

            {/* Notification Dot */}
            <span
              className="
                absolute right-2 top-2
                h-2 w-2
                rounded-full
                bg-red-500
                ring-2 ring-white
                dark:ring-slate-900
              "
            />
          </button>

          {/* Settings */}
          <button
            onClick={onSettingsOpen}
            className="
              rounded-xl p-2.5
              text-slate-500
              transition-all duration-200
              hover:bg-green-50
              hover:text-green-600
              dark:text-slate-300
              dark:hover:bg-green-950/40
              dark:hover:text-green-400
            "
          >
            <Settings size={20} />
          </button>

          {/* User */}
          <button
            className="
              hidden
              items-center gap-2
              rounded-xl
              p-1.5 pr-3
              transition-all duration-200
              hover:bg-slate-100
              dark:hover:bg-slate-800
              sm:flex
            "
          >
            <div
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-lg
                bg-green-100
                text-gray-700
                dark:bg-green-950/50
                dark:text-green-400
              "
            >
              <User size={17} />
            </div>

            <span
              className="
                text-sm font-medium
                text-slate-700
                dark:text-slate-200
              "
            >
              Farmer
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}

export default Navbar;