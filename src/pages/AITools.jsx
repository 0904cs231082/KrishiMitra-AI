import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  CloudSun,
  TrendingUp,
  FlaskConical,
  ArrowRight,
  Sparkles,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  Clock3,
  BarChart3,
  X,
  Sprout,
  BrainCircuit,
} from "lucide-react";

const tools = [
  {
    id: "leaf-disease",
    title: "Leaf Disease Identifier",
    shortTitle: "Disease Identifier",
    description:
      "Upload a crop leaf image and analyze visible symptoms with possible disease information and basic recommendations.",
    icon: Leaf,
    category: "Crop Health",
    badge: "AI Vision",
    status: "Available",
    path: "/ai-tools/leaf-disease",
    color: "emerald",
    features: [
      "Image upload",
      "Disease analysis",
      "Confidence result",
      "Basic recommendations",
    ],
  },
  {
    id: "weather-planner",
    title: "Smart Weather Planner",
    shortTitle: "Weather Planner",
    description:
      "Use live weather and forecast data to plan irrigation, spraying, sowing and harvesting activities.",
    icon: CloudSun,
    category: "Planning",
    badge: "Live API",
    status: "Available",
    path: "/ai-tools/weather-planner",
    color: "sky",
    features: [
      "Live weather",
      "5-day forecast",
      "Rain analysis",
      "Farming suggestions",
    ],
  },
  {
    id: "mandi-analyst",
    title: "Mandi Rates Analyst",
    shortTitle: "Mandi Analyst",
    description:
      "Explore mandi prices, compare crop rates and understand minimum, maximum and modal market prices.",
    icon: TrendingUp,
    category: "Market",
    badge: "Live Data",
    status: "Available",
    path: "/ai-tools/mandi-analyst",
    color: "blue",
    features: [
      "Live mandi rates",
      "Crop search",
      "Price comparison",
      "Market insights",
    ],
  },
  {
    id: "soil-calculator",
    title: "Soil & Fertilizer Calculator",
    description:
      "Calculate basic fertilizer requirements using crop, field area and soil-related inputs.",
    icon: FlaskConical,
    category: "Crop Management",
    badge: "Calculator",
    status: "Available",
    path: "/ai-tools/soil-calculator",
    color: "amber",
    features: [
      "Area calculation",
      "Crop selection",
      "Fertilizer estimation",
      "Result summary",
    ],
  },
];

const categories = [
  "All",
  "Crop Health",
  "Planning",
  "Market",
  "Crop Management",
];

const colorClasses = {
  emerald: {
    icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    hover:
      "hover:border-emerald-300 dark:hover:border-emerald-800",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  },

  sky: {
    icon: "bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
    hover: "hover:border-sky-300 dark:hover:border-sky-800",
    badge:
      "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  },

  blue: {
    icon: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    hover:
      "hover:border-blue-300 dark:hover:border-blue-800",
    badge:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  },

  amber: {
    icon: "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    hover:
      "hover:border-amber-300 dark:hover:border-amber-800",
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  },
};

function AITools() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory =
        selectedCategory === "All" ||
        tool.category === selectedCategory;

      const matchesSearch =
        !query ||
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        tool.badge.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 shadow-sm dark:border-emerald-900/40 dark:from-emerald-950/30 dark:via-slate-900 dark:to-sky-950/20 sm:p-8 lg:p-10">

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />

          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-500/10" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                  <BrainCircuit size={21} />
                </div>

                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  KrishiMitra Intelligence
                </span>
              </div>

              <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                Smart tools for smarter farming
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                Use AI-powered and data-driven tools to understand crop
                health, weather conditions, mandi prices and fertilizer
                requirements.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-500"
                  />
                  Farmer focused
                </div>

                <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                  <Sparkles
                    size={15}
                    className="text-amber-500"
                  />
                  Smart insights
                </div>

                <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                  <BarChart3
                    size={15}
                    className="text-blue-500"
                  />
                  Data driven
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="hidden lg:flex">
              <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-emerald-200 bg-white/80 shadow-xl dark:border-emerald-800 dark:bg-slate-900/80">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Sprout size={54} />
                </div>

                <div className="absolute -right-3 top-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sky-500 shadow-md dark:bg-slate-800">
                  <CloudSun size={22} />
                </div>

                <div className="absolute -bottom-2 -left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-500 shadow-md dark:bg-slate-800">
                  <TrendingUp size={22} />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =====================================================
            STATS
        ====================================================== */}
        <section className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <StatCard
            icon={Sparkles}
            label="Smart Tools"
            value="4"
          />

          <StatCard
            icon={CheckCircle2}
            label="Available"
            value="4"
          />

          <StatCard
            icon={BarChart3}
            label="Data Tools"
            value="2"
          />

          <StatCard
            icon={Leaf}
            label="Crop Tools"
            value="2"
          />

        </section>

        {/* =====================================================
            SEARCH + FILTER
        ====================================================== */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search AI tools..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* Filter label */}
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <SlidersHorizontal size={17} />
              <span>Filter by category</span>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => {
              const active = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Explore AI Tools
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Choose a tool according to your farming requirement.
            </p>
          </div>

          <p className="text-xs font-medium text-slate-400">
            {filteredTools.length}{" "}
            {filteredTools.length === 1 ? "tool" : "tools"} found
          </p>
        </div>

        {/* =====================================================
            TOOL GRID
        ====================================================== */}
        {filteredTools.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">

            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              const colors = colorClasses[tool.color];

              return (
                <article
                  key={tool.id}
                  className={`group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 ${colors.hover} sm:p-6`}
                >

                  {/* Card top */}
                  <div className="flex items-start justify-between gap-4">

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${colors.icon}`}
                    >
                      <Icon size={24} />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${colors.badge}`}
                    >
                      {tool.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="mt-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold">
                        {tool.title}
                      </h3>

                      <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {tool.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {tool.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {tool.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        <CheckCircle2
                          size={14}
                          className="shrink-0 text-emerald-500"
                        />

                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">

                    <span className="text-xs font-medium text-slate-400">
                      {tool.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => navigate(tool.path)}
                      className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98]"
                    >
                      Open Tool

                      <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </article>
              );
            })}

          </div>
        ) : (
          /* =====================================================
             EMPTY SEARCH STATE
          ====================================================== */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <Search size={25} />
            </div>

            <h3 className="mt-4 text-lg font-bold">
              No tools found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              We couldn't find any tool matching your search or selected
              category.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">

          <div className="mb-6">
            <h2 className="text-lg font-bold">
              How KrishiMitra AI Tools work
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Simple workflow designed for everyday farming decisions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">

            <StepCard
              number="01"
              title="Choose a tool"
              description="Select the tool according to the problem or farming activity you want to understand."
            />

            <StepCard
              number="02"
              title="Provide information"
              description="Enter your location, upload an image or provide the required crop and field information."
            />

            <StepCard
              number="03"
              title="Get insights"
              description="Review the available data, analysis and recommendations before making a field decision."
            />

          </div>
        </section>

        {/* =====================================================
            DISCLAIMER
        ====================================================== */}
        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">

          <div className="flex items-start gap-3">
            <InfoIcon />

            <div>
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                Important farming note
              </h3>

              <p className="mt-1 text-xs leading-5 text-amber-700/80 dark:text-amber-200/70 sm:text-sm">
                KrishiMitra AI tools are designed to provide decision-support
                information. Results can depend on data quality, weather
                conditions, crop stage and field conditions. For important
                agricultural decisions, also consider local agricultural
                guidance and actual field observations.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          <Icon size={18} />
        </div>

        <span className="text-xl font-bold">
          {value}
        </span>
      </div>

      <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </div>
  );
}

/* ============================================================
   STEP CARD
============================================================ */

function StepCard({ number, title, description }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
        {number}
      </span>

      <h3 className="mt-2 font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   INFO ICON
============================================================ */

function InfoIcon() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
      <Clock3 size={18} />
    </div>
  );
}

export default AITools;