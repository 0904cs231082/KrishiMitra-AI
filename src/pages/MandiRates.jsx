import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  ChevronDown,
  MapPin,
  Search,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

import { getMandiPrices } from "../api/mandiApi";

function MandiRates() {
  const [search, setSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("All Crops");

  const [mandiData, setMandiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // Fetch Mandi Data
  // --------------------------------------------------
  async function fetchMandiData() {
    try {
      setLoading(true);
      setError("");

      console.log("Fetching mandi data...");

      const data = await getMandiPrices("Madhya Pradesh");

      console.log("Mandi data received:", data);

      setMandiData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Mandi API Error:", error);

      setError(
        error.message || "Unable to fetch mandi prices"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMandiData();
  }, []);

  // --------------------------------------------------
  // Crop Options
  // --------------------------------------------------
  const cropOptions = useMemo(() => {
    const crops = mandiData
      .map((item) => item.commodity)
      .filter(Boolean);

    return ["All Crops", ...new Set(crops)];
  }, [mandiData]);

  // --------------------------------------------------
  // Filter Data
  // --------------------------------------------------
  const filteredRates = useMemo(() => {
    return mandiData.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.commodity?.toLowerCase().includes(searchText) ||
        item.market?.toLowerCase().includes(searchText) ||
        item.district?.toLowerCase().includes(searchText);

      const matchesCrop =
        selectedCrop === "All Crops" ||
        item.commodity === selectedCrop;

      return matchesSearch && matchesCrop;
    });
  }, [mandiData, search, selectedCrop]);

  // --------------------------------------------------
  // Summary Data
  // --------------------------------------------------
  const totalCrops = new Set(
    mandiData
      .map((item) => item.commodity)
      .filter(Boolean)
  ).size;

  const totalMandis = new Set(
    mandiData
      .map((item) => item.market)
      .filter(Boolean)
  ).size;

  const topRate =
    mandiData.length > 0
      ? Math.max(
          ...mandiData.map(
            (item) => Number(item.modal_price) || 0
          )
        )
      : 0;

  const latestDate =
    mandiData.length > 0
      ? mandiData.reduce((latest, item) => {
          if (!item.arrival_date) return latest;

          return item.arrival_date > latest
            ? item.arrival_date
            : latest;
        }, "")
      : "";

  // --------------------------------------------------
  // Loading State
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-green-600 dark:border-slate-700 dark:border-t-green-500" />

          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Mandi prices loading...
          </p>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Madhya Pradesh mandi data fetch ho raha hai
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Error State
  // --------------------------------------------------
  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm dark:border-red-900/50 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            !
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            Unable to load mandi data
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {error}
          </p>

          <button
            onClick={fetchMandiData}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Empty State
  // --------------------------------------------------
  if (mandiData.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
        <div className="text-center">
          <TrendingUp className="mx-auto text-slate-300 dark:text-slate-700" size={40} />

          <h2 className="mt-4 text-lg font-bold text-slate-800 dark:text-white">
            No mandi data found
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Currently no mandi records are available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">

      {/* --------------------------------------------------
          Header
      -------------------------------------------------- */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <p className="mb-1 text-sm font-medium text-green-600 dark:text-green-400">
            Mandi Market
          </p>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Mandi Rates
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Madhya Pradesh ki different mandis mein crops ke
            current market rates compare karein.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <MapPin
            size={17}
            className="text-green-600 dark:text-green-400"
          />

          Madhya Pradesh
        </div>
      </div>

      {/* --------------------------------------------------
          Summary Cards
      -------------------------------------------------- */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Crops */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Tracked Crops
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {totalCrops}
          </h2>

          <p className="mt-1 text-xs text-green-600 dark:text-green-400">
            Market data available
          </p>
        </div>

        {/* Mandis */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Active Mandis
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {totalMandis}
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Market locations
          </p>
        </div>

        {/* Highest Modal */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Highest Modal Rate
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            ₹{topRate.toLocaleString("en-IN")}
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Among available records
          </p>
        </div>

        {/* Updated */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Latest Data
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
            {latestDate || "N/A"}
          </h2>

          <p className="mt-1 text-xs text-green-600 dark:text-green-400">
            Arrival date
          </p>
        </div>
      </div>

      {/* --------------------------------------------------
          Search + Filter
      -------------------------------------------------- */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">

        <div className="flex flex-col gap-3 lg:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search crop, mandi or district..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-green-500 dark:focus:bg-slate-800 dark:focus:ring-green-900/30"
            />
          </div>

          {/* Crop Filter */}
          <div className="relative">
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-green-500 dark:focus:ring-green-900/30 lg:w-56"
            >
              {cropOptions.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* --------------------------------------------------
          Result Count
      -------------------------------------------------- */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {filteredRates.length}
          </span>{" "}
          market records
        </p>

        <button
          onClick={fetchMandiData}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-green-600 transition hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {/* --------------------------------------------------
          Market Table
      -------------------------------------------------- */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

        <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Crop Market Rates
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Prices are shown per quintal
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <CalendarDays size={15} />

              Latest available data
            </div>
          </div>
        </div>

        {/* --------------------------------------------------
            Desktop Table
        -------------------------------------------------- */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-800/50">

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Crop
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Mandi
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  District
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Min Price
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Max Price
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Modal Price
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRates.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                >

                  {/* Crop */}
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">
                      {item.commodity || "N/A"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                      {item.variety || "N/A"}
                    </p>
                  </td>

                  {/* Mandi */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {item.market || "N/A"}
                    </p>
                  </td>

                  {/* District */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                      <MapPin
                        size={14}
                        className="text-green-600 dark:text-green-400"
                      />

                      {item.district || "N/A"}
                    </div>
                  </td>

                  {/* Min */}
                  <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                    ₹
                    {Number(item.min_price || 0).toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  {/* Max */}
                  <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                    ₹
                    {Number(item.max_price || 0).toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  {/* Modal */}
                  <td className="px-5 py-4">
                    <span className="font-bold text-slate-900 dark:text-white">
                      ₹
                      {Number(item.modal_price || 0).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {item.arrival_date || "N/A"}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --------------------------------------------------
            Mobile Cards
        -------------------------------------------------- */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800 md:hidden">

          {filteredRates.map((item) => (
            <div
              key={item.id}
              className="p-5"
            >

              {/* Top */}
              <div className="flex items-start justify-between gap-3">

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {item.commodity || "N/A"}
                  </h3>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin size={13} />

                    {item.market || "N/A"}
                  </div>

                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    {item.district || "N/A"}
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-400">
                  {item.arrival_date || "N/A"}
                </div>
              </div>

              {/* Prices */}
              <div className="mt-5 grid grid-cols-3 gap-3">

                {/* Min */}
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    Min
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    ₹
                    {Number(item.min_price || 0).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>

                {/* Modal */}
                <div className="rounded-xl bg-green-50 p-3 dark:bg-green-900/20">
                  <p className="text-[11px] text-green-600 dark:text-green-400">
                    Modal
                  </p>

                  <p className="mt-1 text-sm font-bold text-green-700 dark:text-green-400">
                    ₹
                    {Number(item.modal_price || 0).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>

                {/* Max */}
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    Max
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    ₹
                    {Number(item.max_price || 0).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>

              </div>

              {/* Variety */}
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400 dark:text-slate-500">
                  Variety
                </span>

                <span className="font-medium text-slate-600 dark:text-slate-300">
                  {item.variety || "N/A"}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* --------------------------------------------------
            Empty Search Result
        -------------------------------------------------- */}
        {filteredRates.length === 0 && (
          <div className="px-5 py-12 text-center">

            <TrendingUp
              size={32}
              className="mx-auto text-slate-300 dark:text-slate-700"
            />

            <h3 className="mt-3 font-semibold text-slate-700 dark:text-slate-200">
              No market data found
            </h3>

            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
              Search kisi aur crop, mandi ya district ke naam se karein.
            </p>

          </div>
        )}
      </div>

      {/* --------------------------------------------------
          AI Insight
      -------------------------------------------------- */}
      <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5 dark:border-green-900/40 dark:bg-green-950/30">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm dark:bg-slate-900 dark:text-green-400">
            <TrendingUp size={20} />
          </div>

          <div>
            <h3 className="font-bold text-green-900 dark:text-green-300">
              KrishiMitra Market Insight
            </h3>

            <p className="mt-1 text-sm leading-6 text-green-800 dark:text-green-400">
              Ye rates available mandi records se liye gaye hain.
              Crop quality, mandi location aur latest market conditions
              ko consider karke hi farming/market decision lein.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default MandiRates;