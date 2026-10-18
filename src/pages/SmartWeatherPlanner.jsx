import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CloudRain,
  CloudSun,
  Droplets,
  Gauge,
  Leaf,
  MapPin,
  RefreshCw,
  Search,
  Sprout,
  Sun,
  Thermometer,
  Umbrella,
  Wind,
  CheckCircle2,
  AlertTriangle,
  Info,
  CalendarDays,
} from "lucide-react";

import {
  getCurrentWeather,
  getWeatherForecast,
} from "../api/weatherApi";

const DEFAULT_LOCATION = "Gwalior";

const activityOptions = [
  {
    id: "irrigation",
    name: "Irrigation",
    icon: Droplets,
  },
  {
    id: "spraying",
    name: "Spraying",
    icon: Leaf,
  },
  {
    id: "sowing",
    name: "Sowing",
    icon: Sprout,
  },
  {
    id: "harvesting",
    name: "Harvesting",
    icon: CalendarDays,
  },
];

function getDayName(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
  });
}

function getFormattedDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function getRainLevel(chance) {
  if (chance >= 70) {
    return {
      label: "High",
      className:
        "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
    };
  }

  if (chance >= 40) {
    return {
      label: "Moderate",
      className:
        "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    };
  }

  return {
    label: "Low",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  };
}

function getActivityAdvice(activity, weather, forecast) {
  if (!weather || !forecast) {
    return {
      type: "info",
      title: "Weather data required",
      message: "Fetch weather data to generate activity recommendations.",
    };
  }

  const today = forecast.forecast?.forecastday?.[0];

  const rainChance = today?.day?.daily_chance_of_rain ?? 0;
  const maxTemp = today?.day?.maxtemp_c ?? 0;
  const humidity = weather.current?.humidity ?? 0;
  const wind = weather.current?.wind_kph ?? 0;

  if (activity === "irrigation") {
    if (rainChance >= 70) {
      return {
        type: "warning",
        title: "Irrigation may be avoidable",
        message:
          "High rain probability is expected. Check soil moisture before starting irrigation and avoid unnecessary watering.",
      };
    }

    if (maxTemp >= 35) {
      return {
        type: "warning",
        title: "Monitor soil moisture",
        message:
          "High temperature can increase water demand. Check the soil condition and irrigate according to crop requirement.",
      };
    }

    return {
      type: "success",
      title: "Irrigation window looks reasonable",
      message:
        "No major rain signal is detected. Still check actual soil moisture before irrigation.",
    };
  }

  if (activity === "spraying") {
    if (rainChance >= 50) {
      return {
        type: "warning",
        title: "Avoid spraying before likely rain",
        message:
          "Rain probability is significant. Spraying may be less effective if rain occurs soon after application.",
      };
    }

    if (wind >= 25) {
      return {
        type: "warning",
        title: "Wind is relatively strong",
        message:
          "Strong wind can increase spray drift. Consider a calmer period and follow the product label.",
      };
    }

    if (maxTemp >= 35) {
      return {
        type: "warning",
        title: "High temperature",
        message:
          "Avoid unnecessary spraying during very hot conditions. Follow the pesticide/fertilizer label and local advice.",
      };
    }

    return {
      type: "success",
      title: "Weather conditions look suitable",
      message:
        "Current weather does not show a major rain or wind warning. Always follow the product label before spraying.",
    };
  }

  if (activity === "sowing") {
    if (rainChance >= 50) {
      return {
        type: "info",
        title: "Rain may support soil moisture",
        message:
          "Rain may improve soil moisture, but check field conditions and soil workability before sowing.",
      };
    }

    return {
      type: "info",
      title: "Check soil moisture first",
      message:
        "Rain probability is relatively low. Confirm adequate soil moisture and suitable field conditions before sowing.",
    };
  }

  if (activity === "harvesting") {
    if (rainChance >= 50) {
      return {
        type: "warning",
        title: "Rain risk detected",
        message:
          "Consider checking the forecast before harvesting. Rain can affect field access and harvested produce.",
      };
    }

    if (humidity >= 80) {
      return {
        type: "warning",
        title: "High humidity",
        message:
          "High humidity can slow drying. Plan harvesting and post-harvest handling carefully.",
      };
    }

    return {
      type: "success",
      title: "No major weather warning",
      message:
        "Weather conditions do not show a major rain warning. Check crop maturity and field conditions before harvesting.",
    };
  }

  return {
    type: "info",
    title: "Weather insight",
    message: "Review the latest weather before starting field activities.",
  };
}

function AdviceBox({ advice }) {
  const styles = {
    success: {
      wrapper:
        "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/20",
      icon: "text-emerald-600 dark:text-emerald-400",
      Icon: CheckCircle2,
    },
    warning: {
      wrapper:
        "border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/20",
      icon: "text-amber-600 dark:text-amber-400",
      Icon: AlertTriangle,
    },
    info: {
      wrapper:
        "border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/20",
      icon: "text-blue-600 dark:text-blue-400",
      Icon: Info,
    },
  };

  const style = styles[advice.type] || styles.info;
  const Icon = style.Icon;

  return (
    <div className={`rounded-2xl border p-4 ${style.wrapper}`}>
      <div className="flex gap-3">
        <Icon className={`mt-0.5 shrink-0 ${style.icon}`} size={20} />

        <div>
          <h3 className="font-semibold">{advice.title}</h3>

          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {advice.message}
          </p>
        </div>
      </div>
    </div>
  );
}

function SmartWeatherPlanner() {
  const navigate = useNavigate();

  const [locationInput, setLocationInput] = useState(DEFAULT_LOCATION);
  const [location, setLocation] = useState(DEFAULT_LOCATION);

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const [selectedActivity, setSelectedActivity] =
    useState("irrigation");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async (searchLocation = location) => {
    if (!searchLocation.trim()) {
      setError("Please enter a location.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const cleanLocation = searchLocation.trim();

      const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(cleanLocation),
        getWeatherForecast(cleanLocation, 5),
      ]);

      setWeather(currentData);
      setForecast(forecastData);
      setLocation(cleanLocation);
    } catch (err) {
      console.error("Smart Weather Planner error:", err);

      setWeather(null);
      setForecast(null);
      setError(
        "Unable to fetch weather. Please check the location and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(DEFAULT_LOCATION);
  }, []);

  const todayForecast = forecast?.forecast?.forecastday?.[0];

  const rainChance =
    todayForecast?.day?.daily_chance_of_rain ?? 0;

  const rainLevel = getRainLevel(rainChance);

  const averageRainChance = useMemo(() => {
    const days = forecast?.forecast?.forecastday || [];

    if (!days.length) return 0;

    const total = days.reduce(
      (sum, day) => sum + (day.day.daily_chance_of_rain || 0),
      0
    );

    return Math.round(total / days.length);
  }, [forecast]);

  const activityAdvice = useMemo(() => {
    return getActivityAdvice(
      selectedActivity,
      weather,
      forecast
    );
  }, [selectedActivity, weather, forecast]);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeather(locationInput);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/ai-tools")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft size={18} />
          Back to AI Tools
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
              <CloudSun size={22} />
            </div>

            <span className="text-sm font-semibold text-sky-600 dark:text-sky-400">
              Weather Intelligence
            </span>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Smart Weather Planner
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
                Check live weather and use forecast conditions to plan
                irrigation, spraying, sowing and harvesting activities.
              </p>
            </div>

            <button
              type="button"
              onClick={() => fetchWeather(location)}
              disabled={loading}
              className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-emerald-300 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800 dark:hover:text-emerald-400"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Location Search */}
        <form
          onSubmit={handleSearch}
          className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <MapPin
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={locationInput}
                onChange={(event) =>
                  setLocationInput(event.target.value)
                }
                placeholder="Enter city or location..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Search size={17} />
              Search Weather
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Example: Gwalior, Morena, Indore, Bhopal
          </p>
        </form>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
            <div className="flex items-start gap-3">
              <AlertTriangle
                size={20}
                className="mt-0.5 shrink-0 text-red-600 dark:text-red-400"
              />

              <div>
                <h3 className="font-semibold text-red-700 dark:text-red-400">
                  Weather unavailable
                </h3>

                <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => fetchWeather(locationInput)}
                  className="mt-3 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && !weather && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600 dark:border-slate-700 dark:border-t-emerald-400" />

            <h3 className="mt-4 font-semibold">
              Fetching weather data...
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Please wait a moment.
            </p>
          </div>
        )}

        {/* Main Weather Content */}
        {weather && forecast && (
          <>
            {/* Current Weather */}
            <div className="mb-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">

              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 p-6 text-white shadow-sm sm:p-7">
                <div className="flex flex-col justify-between gap-8 sm:flex-row">

                  <div>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <MapPin size={16} />
                      {weather.location?.name},{" "}
                      {weather.location?.region}
                    </div>

                    <div className="mt-5 flex items-center gap-4">
                      <img
                        src={`https:${weather.current?.condition?.icon}`}
                        alt={weather.current?.condition?.text}
                        className="h-20 w-20"
                      />

                      <div>
                        <div className="text-5xl font-bold">
                          {Math.round(weather.current?.temp_c)}
                          <span className="text-2xl">°C</span>
                        </div>

                        <p className="mt-1 text-sm text-white/80">
                          {weather.current?.condition?.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end text-sm text-white/80">
                    Updated{" "}
                    {weather.current?.last_updated
                      ? weather.current.last_updated.split(" ")[1]
                      : "--"}
                  </div>
                </div>
              </div>

              {/* Weather Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  icon={Thermometer}
                  title="Feels Like"
                  value={`${Math.round(
                    weather.current?.feelslike_c ?? 0
                  )}°C`}
                />

                <MetricCard
                  icon={Droplets}
                  title="Humidity"
                  value={`${weather.current?.humidity ?? 0}%`}
                />

                <MetricCard
                  icon={Wind}
                  title="Wind"
                  value={`${Math.round(
                    weather.current?.wind_kph ?? 0
                  )} km/h`}
                />

                <MetricCard
                  icon={Gauge}
                  title="Pressure"
                  value={`${Math.round(
                    weather.current?.pressure_mb ?? 0
                  )} mb`}
                />
              </div>
            </div>

            {/* Smart Summary */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <SummaryCard
                icon={CloudRain}
                title="Today's Rain Chance"
                value={`${rainChance}%`}
                badge={rainLevel.label}
                badgeClass={rainLevel.className}
              />

              <SummaryCard
                icon={CloudRain}
                title="5-Day Avg. Rain Chance"
                value={`${averageRainChance}%`}
              />

              <SummaryCard
                icon={Sun}
                title="Today's Max Temp"
                value={`${Math.round(
                  todayForecast?.day?.maxtemp_c ?? 0
                )}°C`}
              />
            </div>

            {/* Activity Planner */}
            <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <div className="mb-5">
                <h2 className="text-lg font-bold">
                  Farming Activity Planner
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Select an activity to get a weather-based planning
                  suggestion.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {activityOptions.map((activity) => {
                  const Icon = activity.icon;
                  const active =
                    selectedActivity === activity.id;

                  return (
                    <button
                      key={activity.id}
                      type="button"
                      onClick={() =>
                        setSelectedActivity(activity.id)
                      }
                      className={`rounded-xl border p-4 text-left transition-all ${
                        active
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "border-slate-200 bg-slate-50 hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-emerald-800"
                      }`}
                    >
                      <Icon size={20} />

                      <p className="mt-3 text-sm font-semibold">
                        {activity.name}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5">
                <AdviceBox advice={activityAdvice} />
              </div>
            </section>

            {/* Forecast */}
            <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <div className="mb-5">
                <h2 className="text-lg font-bold">
                  5-Day Weather Forecast
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Plan field activities using upcoming weather conditions.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {forecast.forecast.forecastday.map((day) => {
                  const chance =
                    day.day.daily_chance_of_rain || 0;

                  const level = getRainLevel(chance);

                  return (
                    <div
                      key={day.date}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">
                            {getDayName(day.date)}
                          </p>

                          <p className="text-xs text-slate-400">
                            {getFormattedDate(day.date)}
                          </p>
                        </div>

                        <img
                          src={`https:${day.day.condition.icon}`}
                          alt={day.day.condition.text}
                          className="h-12 w-12"
                        />
                      </div>

                      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                        {day.day.condition.text}
                      </p>

                      <div className="mt-4 flex items-end gap-2">
                        <span className="text-xl font-bold">
                          {Math.round(day.day.maxtemp_c)}°
                        </span>

                        <span className="text-sm text-slate-400">
                          {Math.round(day.day.mintemp_c)}°
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Umbrella size={14} />
                          Rain
                        </span>

                        <span
                          className={`rounded-full px-2 py-1 text-[11px] font-semibold ${level.className}`}
                        >
                          {chance}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Weather Planning Insights */}
            <section className="mb-6 grid gap-5 lg:grid-cols-2">

              <PlanningCard
                title="Rain Planning"
                icon={CloudRain}
                condition={
                  rainChance >= 70
                    ? "High rain probability"
                    : rainChance >= 40
                    ? "Moderate rain probability"
                    : "Low rain probability"
                }
                description={
                  rainChance >= 70
                    ? "Check drainage and soil moisture. Avoid unnecessary irrigation and consider postponing activities affected by rain."
                    : rainChance >= 40
                    ? "Monitor the forecast before irrigation or spraying. Field conditions may change."
                    : "Rain risk is currently relatively low. Check soil moisture before irrigation."
                }
              />

              <PlanningCard
                title="Heat & Wind Planning"
                icon={Wind}
                condition={
                  (weather.current?.temp_c ?? 0) >= 35
                    ? "High temperature"
                    : (weather.current?.wind_kph ?? 0) >= 25
                    ? "Strong wind"
                    : "No major warning"
                }
                description={
                  (weather.current?.temp_c ?? 0) >= 35
                    ? "Monitor crops for heat stress and check soil moisture regularly."
                    : (weather.current?.wind_kph ?? 0) >= 25
                    ? "Avoid activities where strong wind could create spray drift or safety problems."
                    : "Current temperature and wind do not show a major planning warning."
                }
              />

            </section>

            {/* Data Source */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start gap-3">
                <Info
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <div>
                  <p className="text-sm font-semibold">
                    Weather information
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Weather data is fetched from WeatherAPI.com. Farming
                    suggestions are rule-based guidance generated from the
                    returned weather conditions. Always consider actual field
                    conditions, crop stage and local agricultural advice.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        <Icon size={18} />
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-lg font-bold">
        {value}
      </p>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  value,
  badge,
  badgeClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
          <Icon size={18} />
        </div>

        {badge && (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}
          >
            {badge}
          </span>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-xl font-bold">
        {value}
      </p>
    </div>
  );
}

function PlanningCard({
  title,
  icon: Icon,
  condition,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          <Icon size={20} />
        </div>

        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h3 className="mt-1 font-semibold">
            {condition}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
}

export default SmartWeatherPlanner;