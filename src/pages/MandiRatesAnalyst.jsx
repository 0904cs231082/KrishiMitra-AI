import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownUp,
  BarChart3,
  CalendarDays,
  ChevronDown,
  IndianRupee,
  MapPin,
  RefreshCw,
  Search,
  Store,
  TrendingUp,
  Wheat,
  X,
} from "lucide-react";

import { getMandiPrices } from "../api/mandiApi";

function MandiRatesAnalyst() {
  const [mandiData, setMandiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedMarket, setSelectedMarket] = useState("All");
  const [sortBy, setSortBy] = useState("modal");

  const fetchMandiData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const data = await getMandiPrices("Madhya Pradesh");

      setMandiData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Mandi rates load nahi ho paaye. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMandiData();
  }, []);

  // Unique crops
  const crops = useMemo(() => {
    return [
      "All",
      ...new Set(
        mandiData
          .map((item) => item.commodity)
          .filter(Boolean)
          .sort()
      ),
    ];
  }, [mandiData]);

  // Unique markets
  const markets = useMemo(() => {
    return [
      "All",
      ...new Set(
        mandiData
          .map((item) => item.market)
          .filter(Boolean)
          .sort()
      ),
    ];
  }, [mandiData]);

  // Filter + search + sorting
  const filteredData = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    const result = mandiData.filter((item) => {
      const matchesSearch =
        !searchText ||
        item.commodity?.toLowerCase().includes(searchText) ||
        item.market?.toLowerCase().includes(searchText) ||
        item.district?.toLowerCase().includes(searchText) ||
        item.variety?.toLowerCase().includes(searchText);

      const matchesCrop =
        selectedCrop === "All" ||
        item.commodity === selectedCrop;

      const matchesMarket =
        selectedMarket === "All" ||
        item.market === selectedMarket;

      return matchesSearch && matchesCrop && matchesMarket;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "modal") {
        return Number(b.modal_price || 0) - Number(a.modal_price || 0);
      }

      if (sortBy === "max") {
        return Number(b.max_price || 0) - Number(a.max_price || 0);
      }

      if (sortBy === "min") {
        return Number(b.min_price || 0) - Number(a.min_price || 0);
      }

      if (sortBy === "crop") {
        return (a.commodity || "").localeCompare(
          b.commodity || ""
        );
      }

      return 0;
    });
  }, [
    mandiData,
    search,
    selectedCrop,
    selectedMarket,
    sortBy,
  ]);

  // Summary calculations
  const totalCrops = new Set(
    mandiData.map((item) => item.commodity).filter(Boolean)
  ).size;

  const totalMarkets = new Set(
    mandiData.map((item) => item.market).filter(Boolean)
  ).size;

  const highestModal = mandiData.reduce(
    (highest, item) => {
      const currentPrice = Number(item.modal_price || 0);

      if (currentPrice > highest.price) {
        return {
          price: currentPrice,
          crop: item.commodity || "Unknown",
        };
      }

      return highest;
    },
    { price: 0, crop: "—" }
  );

  const latestDate =
    mandiData
      .map((item) => item.arrival_date)
      .filter(Boolean)
      .sort()
      .reverse()[0] || "—";

  const clearFilters = () => {
    setSearch("");
    setSelectedCrop("All");
    setSelectedMarket("All");
    setSortBy("modal");
  };

  const hasFilters =
    search ||
    selectedCrop !== "All" ||
    selectedMarket !== "All";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <BarChart3 size={22} />
              </div>

              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                LIVE MARKET DATA
              </span>
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Mandi Rates Analyst
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Madhya Pradesh ki mandi prices ko search,
              filter aur compare karein.
            </p>
          </div>

          <button
            onClick={() => fetchMandiData(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-emerald-300 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
          >
            <RefreshCw
              size={17}
              className={refreshing ? "animate-spin" : ""}
            />
            {refreshing ? "Refreshing..." : "Refresh Rates"}
          </button>
        </div>

        {/* Summary Cards */}
        {!loading && !error && (
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <SummaryCard
              icon={<Wheat size={20} />}
              title="Crops"
              value={totalCrops}
              subtitle="Unique commodities"
            />

            <SummaryCard
              icon={<Store size={20} />}
              title="Mandis"
              value={totalMarkets}
              subtitle="Markets available"
            />

            <SummaryCard
              icon={<TrendingUp size={20} />}
              title="Highest Modal"
              value={
                highestModal.price
                  ? `₹${highestModal.price.toLocaleString("en-IN")}`
                  : "—"
              }
              subtitle={highestModal.crop}
            />

            <SummaryCard
              icon={<CalendarDays size={20} />}
              title="Latest Data"
              value={latestDate}
              subtitle="Arrival date"
            />
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">

            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search crop, mandi, district..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>

            {/* Crop */}
            <FilterSelect
              value={selectedCrop}
              onChange={setSelectedCrop}
              options={crops}
            />

            {/* Market */}
            <FilterSelect
              value={selectedMarket}
              onChange={setSelectedMarket}
              options={markets}
            />

            {/* Sort */}
            <div className="relative">
              <ArrowDownUp
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-8 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950"
              >
                <option value="modal">Sort: Modal Price</option>
                <option value="max">Sort: Max Price</option>
                <option value="min">Sort: Min Price</option>
                <option value="crop">Sort: Crop Name</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-red-300 hover:text-red-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-red-500 dark:hover:text-red-400"
              >
                <X size={16} />
                Clear
              </button>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing{" "}
              <strong className="text-slate-700 dark:text-slate-200">
                {filteredData.length}
              </strong>{" "}
              records
            </span>

            <span className="hidden sm:block">
              State: Madhya Pradesh
            </span>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="text-center">
              <RefreshCw
                size={32}
                className="mx-auto mb-3 animate-spin text-emerald-500"
              />

              <p className="font-semibold">
                Loading mandi rates...
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Latest available market data fetch ho raha hai.
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
            <p className="font-semibold text-red-700 dark:text-red-400">
              {error}
            </p>

            <button
              onClick={() => fetchMandiData()}
              className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredData.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <Search
              size={38}
              className="mx-auto mb-4 text-slate-400"
            />

            <h2 className="text-lg font-bold">
              No mandi data found
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Search ya filters change karke dobara try karein.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Desktop Table */}
        {!loading && !error && filteredData.length > 0 && (
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                  <tr>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Commodity
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Market
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Variety
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Min
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Max
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                      Modal
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredData.map((item, index) => (
                    <tr
                      key={`${item.market}-${item.commodity}-${index}`}
                      className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold">
                          {item.commodity || "—"}
                        </div>

                        {item.district && (
                          <div className="mt-1 text-xs text-slate-500">
                            {item.district}
                          </div>
                        )}
                      </td>

                      <td className="px-5 py-4 text-sm">
                        {item.market || "—"}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {item.variety || "—"}
                      </td>

                      <td className="px-5 py-4 text-sm">
                        ₹{Number(item.min_price || 0).toLocaleString("en-IN")}
                      </td>

                      <td className="px-5 py-4 text-sm">
                        ₹{Number(item.max_price || 0).toLocaleString("en-IN")}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-lg bg-emerald-100 px-3 py-1.5 font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                          ₹
                          {Number(
                            item.modal_price || 0
                          ).toLocaleString("en-IN")}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {item.arrival_date || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mobile Cards */}
        {!loading && !error && filteredData.length > 0 && (
          <div className="space-y-3 md:hidden">
            {filteredData.map((item, index) => (
              <div
                key={`${item.market}-${item.commodity}-${index}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold">
                      {item.commodity || "—"}
                    </h3>

                    <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin size={13} />
                      {item.market || "Unknown Market"}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-500">
                      Modal
                    </p>

                    <p className="font-bold text-emerald-600 dark:text-emerald-400">
                      ₹
                      {Number(
                        item.modal_price || 0
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <PriceBox
                    label="Min"
                    value={item.min_price}
                  />

                  <PriceBox
                    label="Max"
                    value={item.max_price}
                  />

                  <PriceBox
                    label="Modal"
                    value={item.modal_price}
                    highlight
                  />
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <span>
                    Variety: {item.variety || "—"}
                  </span>

                  <span>
                    {item.arrival_date || "—"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Insight */}
        {!loading && !error && mandiData.length > 0 && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <div className="flex gap-3">
              <div className="mt-0.5 shrink-0 rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <IndianRupee size={18} />
              </div>

              <div>
                <h3 className="font-bold text-emerald-800 dark:text-emerald-300">
                  Market Insight
                </h3>

                <p className="mt-1 text-sm leading-6 text-emerald-700 dark:text-emerald-400">
                  Modal price ko market comparison ke liye
                  primary reference ke roop me use karein.
                  Actual selling price quality, quantity,
                  variety aur local market conditions ke
                  according change ho sakta hai.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Source note */}
        <p className="mt-5 text-center text-xs leading-5 text-slate-400">
          Mandi data external public API se load ho raha hai.
          Prices ko actual sale decision se pehle local mandi
          aur official market information se verify karein.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------
   Summary Card
---------------------------------- */

function SummaryCard({ icon, title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center gap-2">
        <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          {icon}
        </div>

        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {title}
        </span>
      </div>

      <p className="truncate text-xl font-bold sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
        {subtitle}
      </p>
    </div>
  );
}

/* ---------------------------------
   Filter Select
---------------------------------- */

function FilterSelect({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-9 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "All" ? "All" : option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

/* ---------------------------------
   Mobile Price Box
---------------------------------- */

function PriceBox({ label, value, highlight = false }) {
  return (
    <div
      className={`rounded-xl p-2.5 ${
        highlight
          ? "bg-emerald-50 dark:bg-emerald-500/10"
          : "bg-slate-50 dark:bg-slate-950"
      }`}
    >
      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 text-sm font-bold ${
          highlight
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-slate-800 dark:text-slate-200"
        }`}
      >
        ₹{Number(value || 0).toLocaleString("en-IN")}
      </p>
    </div>
  );
}

export default MandiRatesAnalyst;