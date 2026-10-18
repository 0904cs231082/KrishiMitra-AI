import { useEffect, useState } from "react";
import {
  getCurrentWeather,
  getWeatherForecast,
} from "../api/weatherApi";

import {
  AlertTriangle,
  CloudRain,
  CloudSun,
  Droplets,
  Gauge,
  MapPin,
  Sprout,
  Sun,
  Wind,
} from "lucide-react";

function WeatherPlanner() {
  // ==============================
  // WEATHER STATES
  // ==============================

  const [weather, setWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // FETCH WEATHER API
  // ==============================

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError("");

        // Current weather
        const currentData = await getCurrentWeather("Gwalior");

        // 5-day forecast
        const forecastData = await getWeatherForecast("Gwalior", 5);

        setWeather(currentData);
        setCurrentForecast(forecastData);
      } catch (error) {
        console.error("Weather API Error:", error);

        setError(
          error.message || "Unable to fetch weather data."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  // ==============================
  // LOADING UI
  // ==============================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />

          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Weather data loading...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Please wait
          </p>
        </div>
      </div>
    );
  }

  // ==============================
  // ERROR UI
  // ==============================

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm dark:border-red-900 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40">
            <AlertTriangle
              size={24}
              className="text-red-600 dark:text-red-400"
            />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            Unable to load weather
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="
              mt-5 rounded-xl
              bg-green-600 px-4 py-2.5
              text-sm font-semibold text-white
              transition hover:bg-green-700
            "
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ==============================
  // API DATA
  // ==============================

  const current = weather?.current;
  const location = weather?.location;

  const forecastDays =
    currentForecast?.forecast?.forecastday || [];

  // ==============================
  // UV TEXT
  // ==============================

  const getUVText = (uv) => {
    if (uv === undefined || uv === null) return "N/A";

    if (uv <= 2) return "Low";
    if (uv <= 5) return "Moderate";
    if (uv <= 7) return "High";
    if (uv <= 10) return "Very High";

    return "Extreme";
  };

  // ==============================
  // WEATHER ICON
  // ==============================

  const getWeatherIcon = (conditionText) => {
    const condition = conditionText?.toLowerCase() || "";

    if (
      condition.includes("rain") ||
      condition.includes("drizzle") ||
      condition.includes("shower")
    ) {
      return CloudRain;
    }

    if (
      condition.includes("sunny") ||
      condition.includes("clear")
    ) {
      return Sun;
    }

    return CloudSun;
  };

  // ==============================
  // FARMING ADVICE
  // ==============================

  const rainChance =
    forecastDays?.[0]?.day?.daily_chance_of_rain || 0;

  const tomorrowRainChance =
    forecastDays?.[1]?.day?.daily_chance_of_rain || 0;

  const getFarmingAdvice = () => {
    if (rainChance >= 60) {
      return {
        title: "Rainy conditions expected",
        description:
          "Aaj rain probability zyada hai. Field work aur irrigation activities ko weather ke according plan karein.",
      };
    }

    if (rainChance >= 30) {
      return {
        title: "Moderate rain possibility",
        description:
          "Aaj rain possibility moderate hai. Farming activities karte waqt weather conditions ko monitor karein.",
      };
    }

    return {
      title: "Good day for field activities",
      description:
        "Aaj rain probability relatively low hai. Morning mein field inspection aur necessary farming activities kar sakte hain.",
    };
  };

  const farmingAdvice = getFarmingAdvice();

  // ==============================
  // FARMING ACTIVITIES
  // ==============================

  const farmingActivities = [
    {
      title: "Irrigation",
      status: rainChance >= 50 ? "Avoid Today" : "Recommended",
      description:
        rainChance >= 50
          ? "Rain probability zyada hai, isliye irrigation ko postpone karna useful ho sakta hai."
          : "Rain probability low hai, isliye crop requirement ke according irrigation ki ja sakti hai.",
      icon: Droplets,
      iconBg:
        rainChance >= 50
          ? "bg-orange-50 dark:bg-orange-950/40"
          : "bg-blue-50 dark:bg-blue-950/40",
      iconColor:
        rainChance >= 50
          ? "text-orange-600 dark:text-orange-400"
          : "text-blue-600 dark:text-blue-400",
    },

    {
      title: "Spraying",
      status: rainChance >= 40 ? "Avoid Today" : "Suitable",
      description:
        rainChance >= 40
          ? "Rain possibility ke wajah se spraying ko avoid ya postpone karna better ho sakta hai."
          : "Rain probability relatively low hai. Spraying ko local crop requirements ke according plan karein.",
      icon: Sprout,
      iconBg:
        rainChance >= 40
          ? "bg-orange-50 dark:bg-orange-950/40"
          : "bg-green-50 dark:bg-green-950/40",
      iconColor:
        rainChance >= 40
          ? "text-orange-600 dark:text-orange-400"
          : "text-green-600 dark:text-green-400",
    },

    {
      title: "Field Work",
      status: rainChance >= 60 ? "Be Careful" : "Suitable",
      description:
        rainChance >= 60
          ? "Rain possibility high hai. Field work ko weather conditions ke according adjust karein."
          : "Current weather conditions ke according morning hours mein field work kiya ja sakta hai.",
      icon: Wind,
      iconBg: "bg-green-50 dark:bg-green-950/40",
      iconColor: "text-green-600 dark:text-green-400",
    },
  ];

  // ==============================
  // UI
  // ==============================

  return (
    <div className="min-h-full bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      {/* ================= HEADER ================= */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-green-600 dark:text-green-400">
            Smart Weather Planner
          </p>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Weather
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Weather conditions ke basis par apni farming activities
            plan karein.
          </p>
        </div>

        {/* Location */}
        <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          <MapPin
            size={17}
            className="text-green-600 dark:text-green-400"
          />

          {location?.name}, {location?.region}
        </div>
      </div>

      {/* ================= CURRENT WEATHER ================= */}

      <div className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
          {/* MAIN WEATHER */}

          <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 p-6 dark:from-green-950/30 dark:via-slate-900 dark:to-blue-950/30 sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Today's Weather
                </p>

                {/* REAL TEMPERATURE */}

                <h2 className="mt-2 text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {Math.round(current?.temp_c)}°
                </h2>

                {/* REAL CONDITION */}

                <p className="mt-2 text-base font-medium text-slate-700 dark:text-slate-200">
                  {current?.condition?.text}
                </p>

                {/* REAL FEELS LIKE */}

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Feels like {Math.round(current?.feelslike_c)}°
                </p>
              </div>

              {/* REAL WEATHER ICON */}

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-800">
                {(() => {
                  const WeatherIcon = getWeatherIcon(
                    current?.condition?.text
                  );

                  return (
                    <WeatherIcon
                      size={48}
                      strokeWidth={1.5}
                      className="text-blue-500"
                    />
                  );
                })()}
              </div>
            </div>

            {/* WEATHER DETAILS */}

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {/* Humidity */}

              <div>
                <p className="text-xs text-slate-400">
                  Humidity
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {current?.humidity}%
                </p>
              </div>

              {/* Wind */}

              <div>
                <p className="text-xs text-slate-400">
                  Wind
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {current?.wind_kph} km/h
                </p>
              </div>

              {/* Rain Chance */}

              <div>
                <p className="text-xs text-slate-400">
                  Rain Chance
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {rainChance}%
                </p>
              </div>

              {/* UV */}

              <div>
                <p className="text-xs text-slate-400">
                  UV Index
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {getUVText(current?.uv)}
                </p>
              </div>
            </div>
          </div>

          {/* ================= FARMING ADVICE ================= */}

          <div className="border-t border-slate-200 p-6 dark:border-slate-800 lg:border-l lg:border-t-0 sm:p-8">
            <div className="flex items-center gap-2">
              <Sprout
                size={19}
                className="text-green-600 dark:text-green-400"
              />

              <h3 className="font-bold text-slate-900 dark:text-white">
                Farming Advice
              </h3>
            </div>

            {/* Dynamic Advice */}

            <div className="mt-5 rounded-2xl bg-green-50 p-4 dark:bg-green-950/30">
              <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                {farmingAdvice.title}
              </p>

              <p className="mt-2 text-sm leading-6 text-green-700 dark:text-green-400">
                {farmingAdvice.description}
              </p>
            </div>

            {/* Tomorrow Rain Warning */}

            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-orange-50 p-4 dark:bg-orange-950/30">
              <AlertTriangle
                size={19}
                className="mt-0.5 shrink-0 text-orange-600 dark:text-orange-400"
              />

              <p className="text-sm leading-6 text-orange-800 dark:text-orange-300">
                {tomorrowRainChance >= 50
                  ? `Kal rain probability ${tomorrowRainChance}% hai. Irrigation aur spraying ka plan weather ke according adjust karein.`
                  : `Kal rain probability ${tomorrowRainChance}% hai. Farming activities ko forecast ke according plan karein.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 5 DAY FORECAST ================= */}

      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            5-Day Forecast
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Aane wale days ka weather forecast
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {forecastDays.map((item, index) => {
            const Icon = getWeatherIcon(
              item?.day?.condition?.text
            );

            const date = new Date(item.date);

            const dayName =
              index === 0
                ? "Today"
                : index === 1
                ? "Tomorrow"
                : date.toLocaleDateString("en-IN", {
                    weekday: "long",
                  });

            const formattedDate = date.toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
              }
            );

            return (
              <div
                key={item.date}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {dayName}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {formattedDate}
                    </p>
                  </div>

                  <Icon
                    size={25}
                    strokeWidth={1.7}
                    className="text-blue-500"
                  />
                </div>

                {/* MAX TEMPERATURE */}

                <p className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
                  {Math.round(item?.day?.maxtemp_c)}°
                </p>

                {/* CONDITION */}

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {item?.day?.condition?.text}
                </p>

                {/* RAIN */}

                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                  <CloudRain size={14} />

                  {item?.day?.daily_chance_of_rain}% rain
                </div>

                {/* MIN TEMP */}

                <p className="mt-2 text-xs text-slate-400">
                  Min: {Math.round(item?.day?.mintemp_c)}°
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= FARMING PLANNER ================= */}

      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Farming Planner
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Weather ke according recommended activities
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {farmingActivities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${activity.iconBg} ${activity.iconColor}`}
                  >
                    <Icon size={21} />
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      activity.status === "Avoid Today"
                        ? "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400"
                        : activity.status === "Be Careful"
                        ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400"
                        : "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
                  {activity.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {activity.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= WEATHER PARAMETERS ================= */}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="mb-5 flex items-center gap-2">
          <Gauge
            size={19}
            className="text-green-600 dark:text-green-400"
          />

          <h2 className="font-bold text-slate-900 dark:text-white">
            Weather Parameters
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {/* Pressure */}

          <div>
            <p className="text-xs text-slate-400">
              Pressure
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {current?.pressure_mb} hPa
            </p>
          </div>

          {/* Visibility */}

          <div>
            <p className="text-xs text-slate-400">
              Visibility
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {current?.vis_km} km
            </p>
          </div>

          {/* Wind Direction */}

          <div>
            <p className="text-xs text-slate-400">
              Wind Direction
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {current?.wind_dir}
            </p>
          </div>

          {/* Dew Point */}

          <div>
            <p className="text-xs text-slate-400">
              Dew Point
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {current?.dewpoint_c}°
            </p>
          </div>
        </div>
      </div>

      {/* ================= LAST UPDATED ================= */}

      <div className="mt-5 text-right">
        <p className="text-xs text-slate-400">
          Last updated:{" "}
          {current?.last_updated || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default WeatherPlanner;