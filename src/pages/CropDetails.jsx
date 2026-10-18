import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Sprout,
  MapPin,
  CalendarDays,
  Ruler,
  TrendingUp,
  Pencil,
  CloudSun,
  Droplets,
  Wind,
  ThermometerSun,
  RefreshCw,
  AlertCircle,
  Umbrella,
  CheckCircle2,
  Info,
  TriangleAlert,
} from "lucide-react";

import {
  getCurrentWeather,
  getWeatherForecast,
} from "../api/weatherApi";

function CropDetails() {
  const { cropId } = useParams();
  const navigate = useNavigate();

  // ========================================
  // CROP DATA FROM LOCAL STORAGE
  // ========================================

  const crops = useMemo(() => {
    try {
      const savedCrops = localStorage.getItem("krishimitra-crops");

      return savedCrops ? JSON.parse(savedCrops) : [];
    } catch (error) {
      console.error("Unable to load crops:", error);
      return [];
    }
  }, []);

  const crop = crops.find(
    (item) => String(item.id) === String(cropId)
  );

  // ========================================
  // WEATHER STATES
  // ========================================

  const [weather, setWeather] = useState(null);

  const [forecast, setForecast] = useState(null);

  const [weatherLoading, setWeatherLoading] = useState(false);

  const [weatherError, setWeatherError] = useState("");

  // ========================================
  // FETCH CURRENT + FORECAST WEATHER
  // ========================================

  const fetchCropWeather = async () => {
    if (!crop?.location) return;

    try {
      setWeatherLoading(true);
      setWeatherError("");

      /*
        Dono APIs ko parallel me call kar rahe hain.

        1. Current Weather
        2. 5 Day Forecast
      */

      const [currentWeather, forecastWeather] =
        await Promise.all([
          getCurrentWeather(crop.location),
          getWeatherForecast(crop.location, 5),
        ]);

      setWeather(currentWeather);

      setForecast(forecastWeather);
    } catch (error) {
      console.error("Crop weather error:", error);

      setWeatherError(
        "Unable to load weather for this crop location."
      );
    } finally {
      setWeatherLoading(false);
    }
  };

  // ========================================
  // FETCH WEATHER WHEN PAGE LOADS
  // ========================================

  useEffect(() => {
    fetchCropWeather();
  }, [crop?.location]);

  // ========================================
  // CROP NOT FOUND
  // ========================================

  if (!crop) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
            <AlertCircle size={28} />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Crop Not Found
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            The selected crop could not be found.
          </p>

          <button
            onClick={() => navigate("/my-crops")}
            className="mt-6 rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white transition hover:bg-green-700"
          >
            Back to My Crops
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 p-4 transition-colors duration-300 dark:bg-slate-950 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-7xl">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="mb-6">

          <button
            onClick={() => navigate("/my-crops")}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400"
          >
            <ArrowLeft size={18} />
            Back to My Crops
          </button>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400">
                <Sprout size={28} />
              </div>

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                    {crop.name}
                  </h1>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-400">
                    {crop.status}
                  </span>

                </div>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {crop.variety}
                </p>

              </div>

            </div>

            <button
              onClick={() => navigate("/my-crops")}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-green-300 hover:text-green-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-green-700 dark:hover:text-green-400"
            >
              <Pencil size={16} />
              Edit Crop
            </button>

          </div>

        </div>

        {/* ========================================
            CROP INFORMATION
        ======================================== */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <InfoCard
            icon={<Ruler size={20} />}
            title="Total Area"
            value={`${crop.area} Acres`}
          />

          <InfoCard
            icon={<CalendarDays size={20} />}
            title="Sowing Date"
            value={crop.sowingDate}
          />

          <InfoCard
            icon={<MapPin size={20} />}
            title="Location"
            value={crop.location}
          />

          <InfoCard
            icon={<Sprout size={20} />}
            title="Variety"
            value={crop.variety}
          />

        </div>

        {/* ========================================
            MAIN GRID
        ======================================== */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ========================================
              LEFT SIDE
          ======================================== */}

          <div className="space-y-6 lg:col-span-2">

            {/* ========================================
                GROWTH PROGRESS
            ======================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">

              <div className="mb-4 flex items-center justify-between">

                <div>

                  <h2 className="font-bold text-slate-900 dark:text-white">
                    Growth Progress
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Current crop growth status
                  </p>

                </div>

                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  {crop.progress}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">

                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-500"
                  style={{
                    width: `${crop.progress}%`,
                  }}
                />

              </div>

            </div>

            {/* ========================================
                WEATHER SECTION
            ======================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">

              {/* Weather Header */}

              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                <div>

                  <div className="flex items-center gap-2">

                    <CloudSun
                      size={22}
                      className="text-blue-500"
                    />

                    <h2 className="font-bold text-slate-900 dark:text-white">
                      Live Crop Weather
                    </h2>

                  </div>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Weather for {crop.location}
                  </p>

                </div>

                <button
                  onClick={fetchCropWeather}
                  disabled={weatherLoading}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:text-blue-400"
                >

                  <RefreshCw
                    size={16}
                    className={
                      weatherLoading
                        ? "animate-spin"
                        : ""
                    }
                  />

                  Refresh

                </button>

              </div>

              {/* ========================================
                  LOADING
              ======================================== */}

              {weatherLoading && (
                <div className="flex min-h-48 items-center justify-center">

                  <div className="text-center">

                    <RefreshCw
                      size={30}
                      className="mx-auto animate-spin text-green-600"
                    />

                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                      Loading crop weather...
                    </p>

                  </div>

                </div>
              )}

              {/* ========================================
                  ERROR
              ======================================== */}

              {!weatherLoading && weatherError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center dark:border-red-900/50 dark:bg-red-950/20">

                  <AlertCircle
                    size={28}
                    className="mx-auto text-red-500"
                  />

                  <p className="mt-2 font-medium text-red-700 dark:text-red-400">
                    {weatherError}
                  </p>

                  <button
                    onClick={fetchCropWeather}
                    className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Try Again
                  </button>

                </div>
              )}

              {/* ========================================
                  WEATHER DATA
              ======================================== */}

              {!weatherLoading &&
                !weatherError &&
                weather && (
                  <div>

                    {/* Current Weather */}

                    <div className="mb-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">

                      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                        <div>

                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {weather.location.name},{" "}
                            {weather.location.region}
                          </p>

                          <div className="mt-2 flex items-center gap-3">

                            <span className="text-4xl font-bold text-slate-900 dark:text-white">
                              {Math.round(
                                weather.current.temp_c
                              )}
                              °C
                            </span>

                            <div>

                              <p className="font-semibold text-slate-800 dark:text-slate-200">
                                {weather.current.condition.text}
                              </p>

                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Feels like{" "}
                                {Math.round(
                                  weather.current.feelslike_c
                                )}
                                °C
                              </p>

                            </div>

                          </div>

                        </div>

                        <img
                          src={`https:${weather.current.condition.icon}`}
                          alt={weather.current.condition.text}
                          className="h-16 w-16"
                        />

                      </div>

                    </div>

                    {/* Weather Parameters */}

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                      <WeatherStat
                        icon={<Droplets size={20} />}
                        title="Humidity"
                        value={`${weather.current.humidity}%`}
                      />

                      <WeatherStat
                        icon={<Wind size={20} />}
                        title="Wind"
                        value={`${weather.current.wind_kph} km/h`}
                      />

                      <WeatherStat
                        icon={<ThermometerSun size={20} />}
                        title="Feels Like"
                        value={`${Math.round(
                          weather.current.feelslike_c
                        )}°C`}
                      />

                    </div>

                    {/* ========================================
                        5 DAY FORECAST
                    ======================================== */}

                    {forecast?.forecast?.forecastday?.length > 0 && (
                      <div className="mt-8">

                        <div className="mb-4 flex items-center justify-between">

                          <div>

                            <h3 className="font-bold text-slate-900 dark:text-white">
                              5-Day Forecast
                            </h3>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              Weather outlook for your crop location
                            </p>

                          </div>

                          <Umbrella
                            size={20}
                            className="text-blue-500"
                          />

                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">

                          {forecast.forecast.forecastday.map(
                            (day) => (
                              <ForecastCard
                                key={day.date}
                                day={day}
                              />
                            )
                          )}

                        </div>

                      </div>
                    )}

                    {/* ========================================
                        WEATHER BASED FARMING ADVICE
                    ======================================== */}

                    <FarmingAdvice
                      crop={crop}
                      weather={weather}
                      forecast={forecast}
                    />

                  </div>
                )}

            </div>

          </div>

          {/* ========================================
              RIGHT SIDE
          ======================================== */}

          <div className="space-y-6">

            {/* Crop Status */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <h2 className="font-bold text-slate-900 dark:text-white">
                Crop Status
              </h2>

              <div className="mt-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400">
                  <TrendingUp size={20} />
                </div>

                <div>

                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {crop.status}
                  </p>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Growth is currently at{" "}
                    {crop.progress}%
                  </p>

                </div>

              </div>

            </div>

            {/* Quick Actions */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <h2 className="font-bold text-slate-900 dark:text-white">
                Quick Actions
              </h2>

              <div className="mt-4 space-y-2">

                <button
                  onClick={fetchCropWeather}
                  className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                >

                  <CloudSun
                    size={18}
                    className="text-blue-500"
                  />

                  Refresh Weather

                </button>

                <button
                  onClick={() => navigate("/mandi-rates")}
                  className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                >

                  <TrendingUp
                    size={18}
                    className="text-green-500"
                  />

                  Check Mandi Rates

                </button>

              </div>

            </div>

            {/* AI Insights */}

            <div className="rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900/50 dark:bg-green-950/20">

              <div className="flex items-center gap-2">

                <Sprout
                  size={20}
                  className="text-green-600 dark:text-green-400"
                />

                <h2 className="font-bold text-green-800 dark:text-green-300">
                  AI Crop Insights
                </h2>

              </div>

              <p className="mt-3 text-sm leading-6 text-green-700 dark:text-green-400">
                AI-based crop recommendations will be
                available here. We will connect this
                section with crop, weather and mandi
                data in the next stages.
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

/* =====================================================
   INFO CARD
===================================================== */

function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-1 truncate text-sm font-bold text-slate-900 dark:text-white">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

/* =====================================================
   WEATHER STAT
===================================================== */

function WeatherStat({ icon, title, value }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">

      <div className="flex items-center gap-3">

        <div className="text-blue-500">
          {icon}
        </div>

        <div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-1 font-bold text-slate-900 dark:text-white">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

/* =====================================================
   FORECAST CARD
===================================================== */

function ForecastCard({ day }) {
  const date = new Date(day.date);

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/60">

      {/* Date */}

      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        {date.toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })}
      </p>

      {/* Weather Icon */}

      <img
        src={`https:${day.day.condition.icon}`}
        alt={day.day.condition.text}
        className="mx-auto my-3 h-12 w-12"
      />

      {/* Condition */}

      <p className="min-h-10 text-center text-xs text-slate-500 dark:text-slate-400">
        {day.day.condition.text}
      </p>

      {/* Temperature */}

      <div className="mt-3 flex items-center justify-center gap-2">

        <span className="font-bold text-slate-900 dark:text-white">
          {Math.round(day.day.maxtemp_c)}°
        </span>

        <span className="text-sm text-slate-400">
          {Math.round(day.day.mintemp_c)}°
        </span>

      </div>

      {/* Rain */}

      <div className="mt-3 flex items-center justify-center gap-1 text-xs text-blue-600 dark:text-blue-400">

        <Umbrella size={14} />

        <span>
          {day.day.daily_chance_of_rain}% rain
        </span>

      </div>

    </div>
  );
}

/* =====================================================
   FARMING ADVICE
===================================================== */

function FarmingAdvice({ crop, weather, forecast }) {

  const currentTemp = weather?.current?.temp_c ?? 0;

  const humidity = weather?.current?.humidity ?? 0;

  const windSpeed = weather?.current?.wind_kph ?? 0;

  const forecastDays =
    forecast?.forecast?.forecastday || [];

  const rainChances = forecastDays.map(
    (day) => day.day.daily_chance_of_rain || 0
  );

  const highestRainChance =
    rainChances.length > 0
      ? Math.max(...rainChances)
      : 0;

  const averageRainChance =
    rainChances.length > 0
      ? Math.round(
          rainChances.reduce(
            (total, value) => total + value,
            0
          ) / rainChances.length
        )
      : 0;

  const advice = [];

  /* --------------------------------
     RAIN ADVICE
  -------------------------------- */

  if (highestRainChance >= 70) {

    advice.push({
      type: "warning",
      icon: <TriangleAlert size={18} />,
      title: "Rain Alert",
      message:
        "High chance of rain is expected in the coming days. Avoid unnecessary irrigation and check your field for waterlogging.",
    });

  } else if (highestRainChance >= 40) {

    advice.push({
      type: "info",
      icon: <Info size={18} />,
      title: "Possible Rain",
      message:
        "There is a moderate chance of rain in the forecast. Monitor the weather before irrigation or spraying.",
    });

  } else {

    advice.push({
      type: "success",
      icon: <CheckCircle2 size={18} />,
      title: "Low Rain Chance",
      message:
        "The forecast shows a relatively low chance of rain. Check soil moisture before deciding on irrigation.",
    });

  }

  /* --------------------------------
     TEMPERATURE ADVICE
  -------------------------------- */

  if (currentTemp >= 35) {

    advice.push({
      type: "warning",
      icon: <ThermometerSun size={18} />,
      title: "High Temperature",
      message:
        "Temperature is high. Monitor the crop for heat stress and check soil moisture regularly.",
    });

  } else if (currentTemp <= 10) {

    advice.push({
      type: "warning",
      icon: <ThermometerSun size={18} />,
      title: "Low Temperature",
      message:
        "Temperature is relatively low. Monitor the crop for cold stress, especially during early morning hours.",
    });

  } else {

    advice.push({
      type: "success",
      icon: <CheckCircle2 size={18} />,
      title: "Temperature",
      message:
        "Current temperature is within a moderate range. Continue regular crop monitoring.",
    });

  }

  /* --------------------------------
     HUMIDITY ADVICE
  -------------------------------- */

  if (humidity >= 80) {

    advice.push({
      type: "warning",
      icon: <Droplets size={18} />,
      title: "High Humidity",
      message:
        "Humidity is high. Monitor the crop closely for fungal disease symptoms and avoid unnecessary irrigation.",
    });

  } else if (humidity <= 35) {

    advice.push({
      type: "info",
      icon: <Droplets size={18} />,
      title: "Low Humidity",
      message:
        "Humidity is low. Monitor soil moisture and watch the crop for signs of moisture stress.",
    });

  }

  /* --------------------------------
     WIND ADVICE
  -------------------------------- */

  if (windSpeed >= 30) {

    advice.push({
      type: "warning",
      icon: <Wind size={18} />,
      title: "Strong Wind",
      message:
        "Wind speed is high. Avoid spraying pesticides or fertilizers during strong winds.",
    });

  }

  return (
    <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900/50 dark:bg-green-950/20 sm:p-6">

      {/* Header */}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <div className="flex items-center gap-2">

            <Sprout
              size={22}
              className="text-green-600 dark:text-green-400"
            />

            <h3 className="font-bold text-green-900 dark:text-green-300">
              Farming Advice
            </h3>

          </div>

          <p className="mt-1 text-sm text-green-700 dark:text-green-400">
            Weather-based suggestions for your {crop.name}.
          </p>

        </div>

        <div className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-green-700 shadow-sm dark:bg-slate-900 dark:text-green-400">
          Avg. rain chance: {averageRainChance}%
        </div>

      </div>

      {/* Advice Cards */}

      <div className="mt-5 space-y-3">

        {advice.map((item, index) => (
          <AdviceCard
            key={`${item.title}-${index}`}
            type={item.type}
            icon={item.icon}
            title={item.title}
            message={item.message}
          />
        ))}

      </div>

      {/* Disclaimer */}

      <div className="mt-5 border-t border-green-200 pt-4 dark:border-green-900/50">

        <p className="text-xs leading-5 text-green-700 dark:text-green-400">
          These suggestions are based on current weather
          conditions and forecast data. Always consider
          your field conditions and local agricultural
          guidance before taking action.
        </p>

      </div>

    </div>
  );
}

/* =====================================================
   ADVICE CARD
===================================================== */

function AdviceCard({
  type,
  icon,
  title,
  message,
}) {

  const styles = {
    success: {
      container:
        "border-green-200 bg-white dark:border-green-900/50 dark:bg-slate-900",
      icon:
        "bg-green-100 text-green-600 dark:bg-green-950/50 dark:text-green-400",
      title:
        "text-green-800 dark:text-green-300",
      text:
        "text-slate-600 dark:text-slate-400",
    },

    warning: {
      container:
        "border-amber-200 bg-white dark:border-amber-900/50 dark:bg-slate-900",
      icon:
        "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
      title:
        "text-amber-800 dark:text-amber-300",
      text:
        "text-slate-600 dark:text-slate-400",
    },

    info: {
      container:
        "border-blue-200 bg-white dark:border-blue-900/50 dark:bg-slate-900",
      icon:
        "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
      title:
        "text-blue-800 dark:text-blue-300",
      text:
        "text-slate-600 dark:text-slate-400",
    },
  };

  const style = styles[type] || styles.info;

  return (
    <div
      className={`rounded-xl border p-4 ${style.container}`}
    >

      <div className="flex gap-3">

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.icon}`}
        >
          {icon}
        </div>

        <div>

          <h4
            className={`text-sm font-bold ${style.title}`}
          >
            {title}
          </h4>

          <p
            className={`mt-1 text-sm leading-6 ${style.text}`}
          >
            {message}
          </p>

        </div>

      </div>

    </div>
  );
}

export default CropDetails;