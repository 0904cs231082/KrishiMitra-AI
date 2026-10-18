import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  Bell,
  KeyRound,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

function PrivacySecurity() {
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck
              size={22}
              className="text-green-600 dark:text-green-400"
            />

            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              KrishiMitra AI
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Privacy & Security
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage your privacy, security and account preferences.
          </p>
        </div>

        {/* Security Status */}
        <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900/50 dark:bg-green-950/20">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-green-900 dark:text-green-300">
                Account Security
              </h2>

              <p className="mt-1 text-xs text-green-700 dark:text-green-400">
                Your account security settings are currently active.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <section className="mb-5">
          <h2 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Privacy
          </h2>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

            {/* Profile Visibility */}
            <div className="flex items-center gap-4 border-b border-slate-100 p-4 dark:border-slate-800">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <Eye size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  Profile Visibility
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Control whether your farming profile is visible.
                </p>
              </div>

              <button
                onClick={() =>
                  setProfileVisibility(!profileVisibility)
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  profileVisibility
                    ? "bg-green-600"
                    : "bg-slate-300 dark:bg-slate-700"
                }`}
                aria-label="Toggle profile visibility"
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    profileVisibility
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Notifications */}
            <div className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                <Bell size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  Notification Privacy
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Allow farming alerts and important updates.
                </p>
              </div>

              <button
                onClick={() =>
                  setNotifications(!notifications)
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  notifications
                    ? "bg-green-600"
                    : "bg-slate-300 dark:bg-slate-700"
                }`}
                aria-label="Toggle notifications"
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    notifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mb-5">
          <h2 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Security
          </h2>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

            {/* Password */}
            <button className="flex w-full items-center gap-4 border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
                <KeyRound size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  Change Password
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Update your account password.
                </p>
              </div>

              <ChevronRight
                size={18}
                className="text-slate-400"
              />
            </button>

            {/* Login Security */}
            <button className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
                <Lock size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  Login & Security
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Manage login sessions and account security.
                </p>
              </div>

              <ChevronRight
                size={18}
                className="text-slate-400"
              />
            </button>
          </div>
        </section>

        {/* Data Privacy */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex gap-3">
            <ShieldCheck
              size={19}
              className="mt-0.5 shrink-0 text-slate-400"
            />

            <div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                Your Data
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                KrishiMitra AI will use your farming information only
                to provide relevant agriculture assistance and
                personalized recommendations.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PrivacySecurity;