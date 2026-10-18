import {
  User,
  Mail,
  Phone,
  MapPin,
  Sprout,
  Pencil,
  ShieldCheck,
} from "lucide-react";

function Account() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-6 transition-colors duration-300 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-6">
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            KrishiMitra AI
          </p>

          <div className="mt-1 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                My Account
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Manage your profile and farming information.
              </p>
            </div>

            <button
              className="
                flex items-center gap-2 rounded-xl
                bg-green-600 px-4 py-2.5
                text-sm font-semibold text-white
                transition-all duration-200
                hover:bg-green-700 hover:shadow-md
                dark:bg-green-500 dark:hover:bg-green-600
              "
            >
              <Pencil size={17} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div
          className="
            mb-6 overflow-hidden rounded-2xl
            border border-slate-200
            bg-white shadow-sm
            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <div className="border-b border-slate-100 p-6 dark:border-slate-800">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              {/* Avatar */}
              <div
                className="
                  flex h-20 w-20 shrink-0
                  items-center justify-center
                  rounded-2xl
                  bg-green-100
                  text-green-700
                  dark:bg-green-950/50
                  dark:text-green-400
                "
              >
                <User size={38} strokeWidth={1.7} />
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Farmer Account
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  KrishiMitra AI Farmer
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className="
                      rounded-full
                      bg-green-50 px-3 py-1
                      text-xs font-semibold text-green-700
                      dark:bg-green-950/40
                      dark:text-green-400
                    "
                  >
                    Farmer
                  </span>

                  <span
                    className="
                      flex items-center gap-1
                      rounded-full
                      bg-slate-100 px-3 py-1
                      text-xs font-medium text-slate-500
                      dark:bg-slate-800
                      dark:text-slate-400
                    "
                  >
                    <ShieldCheck size={13} />
                    Account Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-6">
            <h3 className="mb-4 text-sm font-bold text-slate-900 dark:text-white">
              Personal Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Email */}
              <div
                className="
                  flex items-center gap-3 rounded-xl
                  border border-slate-200
                  bg-slate-50 p-4
                  dark:border-slate-700
                  dark:bg-slate-800
                "
              >
                <div
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-white text-slate-600
                    dark:bg-slate-700
                    dark:text-slate-300
                  "
                >
                  <Mail size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Email Address
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                    farmer@example.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div
                className="
                  flex items-center gap-3 rounded-xl
                  border border-slate-200
                  bg-slate-50 p-4
                  dark:border-slate-700
                  dark:bg-slate-800
                "
              >
                <div
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-white text-slate-600
                    dark:bg-slate-700
                    dark:text-slate-300
                  "
                >
                  <Phone size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Phone Number
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    +91 XXXXX XXXXX
                  </p>
                </div>
              </div>

              {/* Location */}
              <div
                className="
                  flex items-center gap-3 rounded-xl
                  border border-slate-200
                  bg-slate-50 p-4
                  dark:border-slate-700
                  dark:bg-slate-800
                "
              >
                <div
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-white text-slate-600
                    dark:bg-slate-700
                    dark:text-slate-300
                  "
                >
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Gwalior, Madhya Pradesh
                  </p>
                </div>
              </div>

              {/* Farming Type */}
              <div
                className="
                  flex items-center gap-3 rounded-xl
                  border border-slate-200
                  bg-slate-50 p-4
                  dark:border-slate-700
                  dark:bg-slate-800
                "
              >
                <div
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-white text-green-600
                    dark:bg-slate-700
                    dark:text-green-400
                  "
                >
                  <Sprout size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Farming Type
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Crop Farming
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Farming Summary */}
        <div
          className="
            rounded-2xl
            border border-slate-200
            bg-white p-6 shadow-sm
            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <div className="mb-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Farming Summary
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Your farming information at a glance.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">

            {/* Total Land */}
            <div
              className="
                rounded-xl border border-slate-200
                bg-slate-50 p-4
                dark:border-slate-700
                dark:bg-slate-800
              "
            >
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Total Land
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                3 Acres
              </p>
            </div>

            {/* Active Crops */}
            <div
              className="
                rounded-xl border border-slate-200
                bg-slate-50 p-4
                dark:border-slate-700
                dark:bg-slate-800
              "
            >
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Active Crops
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                2
              </p>
            </div>

            {/* Account Type */}
            <div
              className="
                rounded-xl border border-slate-200
                bg-slate-50 p-4
                dark:border-slate-700
                dark:bg-slate-800
              "
            >
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Account Type
              </p>

              <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
                Farmer
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Account;