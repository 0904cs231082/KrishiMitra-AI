import {
  Bell,
  CloudRain,
  TrendingUp,
  Sprout,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  CheckCheck,
} from "lucide-react";
import { useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "weather",
      title: "Rain expected tomorrow",
      message:
        "Light rainfall is expected in your area. Plan irrigation accordingly.",
      time: "10 minutes ago",
      unread: true,
      icon: CloudRain,
    },
    {
      id: 2,
      type: "market",
      title: "Wheat mandi rate updated",
      message:
        "Wheat modal price has changed. Check the latest mandi rates.",
      time: "1 hour ago",
      unread: true,
      icon: TrendingUp,
    },
    {
      id: 3,
      type: "crop",
      title: "Crop health reminder",
      message:
        "Your wheat crop may need a health check. Open My Crops for details.",
      time: "3 hours ago",
      unread: false,
      icon: Sprout,
    },
    {
      id: 4,
      type: "alert",
      title: "Farming activity reminder",
      message:
        "Your planned field activity is scheduled for today.",
      time: "Yesterday",
      unread: false,
      icon: AlertTriangle,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const removeNotification = (id) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-6 transition-colors duration-300 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-green-600 dark:text-green-400">
              KrishiMitra AI
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              Notifications
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Important farming alerts and updates.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="
                flex items-center justify-center gap-2
                rounded-xl border border-slate-200
                bg-white px-4 py-2.5
                text-sm font-semibold text-slate-700
                transition-all duration-200
                hover:border-green-200
                hover:bg-green-50
                hover:text-green-700
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-300
                dark:hover:border-green-900
                dark:hover:bg-green-950/40
                dark:hover:text-green-400
              "
            >
              <CheckCheck size={17} />
              Mark all as read
            </button>
          )}
        </div>

        {/* Summary */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">

          <div
            className="
              rounded-2xl border border-slate-200
              bg-white p-4 shadow-sm
              dark:border-slate-700 dark:bg-slate-900
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-xl bg-green-50 text-green-600
                  dark:bg-green-950/40 dark:text-green-400
                "
              >
                <Bell size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Total Notifications
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {notifications.length}
                </p>
              </div>
            </div>
          </div>

          <div
            className="
              rounded-2xl border border-slate-200
              bg-white p-4 shadow-sm
              dark:border-slate-700 dark:bg-slate-900
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-xl bg-orange-50 text-orange-600
                  dark:bg-orange-950/40 dark:text-orange-400
                "
              >
                <AlertTriangle size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Unread
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {unreadCount}
                </p>
              </div>
            </div>
          </div>

          <div
            className="
              rounded-2xl border border-slate-200
              bg-white p-4 shadow-sm
              dark:border-slate-700 dark:bg-slate-900
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-xl bg-blue-50 text-blue-600
                  dark:bg-blue-950/40 dark:text-blue-400
                "
              >
                <CheckCircle2 size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Read
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {notifications.length - unreadCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notification List */}
        <div
          className="
            overflow-hidden rounded-2xl
            border border-slate-200
            bg-white shadow-sm
            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const Icon = notification.icon;

              return (
                <div
                  key={notification.id}
                  className={`
                    group flex gap-4 p-5
                    transition-colors duration-200
                    hover:bg-slate-50
                    dark:hover:bg-slate-800/60
                    ${
                      notification.unread
                        ? "bg-green-50/40 dark:bg-green-950/10"
                        : ""
                    }
                    ${
                      notification.id !==
                      notifications[notifications.length - 1].id
                        ? "border-b border-slate-100 dark:border-slate-800"
                        : ""
                    }
                  `}
                >
                  {/* Icon */}
                  <div
                    className="
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-green-50 text-green-600
                      dark:bg-green-950/40
                      dark:text-green-400
                    "
                  >
                    <Icon size={20} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                          {notification.title}
                        </h3>

                        {notification.unread && (
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                        )}
                      </div>

                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {notification.time}
                      </span>
                    </div>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {notification.message}
                    </p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="
                      self-start rounded-lg p-2
                      text-slate-400
                      opacity-100
                      transition-all duration-200
                      hover:bg-red-50
                      hover:text-red-500
                      sm:opacity-0
                      sm:group-hover:opacity-100
                      dark:hover:bg-red-950/30
                      dark:hover:text-red-400
                    "
                    aria-label="Remove notification"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              );
            })
          ) : (
            /* Empty State */
            <div className="flex min-h-80 flex-col items-center justify-center p-6 text-center">
              <div
                className="
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl bg-green-50
                  text-green-600
                  dark:bg-green-950/40
                  dark:text-green-400
                "
              >
                <CheckCircle2 size={27} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-800 dark:text-white">
                You're all caught up!
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                There are no new notifications right now.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Notifications;