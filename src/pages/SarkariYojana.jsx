import { useMemo, useState } from "react";
import {
  Search,
  Sprout,
  Landmark,
  IndianRupee,
  Users,
  Tractor,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

function SarkariYojana() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const schemes = [
    {
      id: 1,
      title: "PM-KISAN",
      category: "Financial Support",
      description:
        "Eligible farmer families can receive financial assistance under the PM-KISAN scheme.",
      benefit: "Financial assistance",
      eligibility: "Eligible farmer families",
      icon: IndianRupee,
    },
    {
      id: 2,
      title: "PM Fasal Bima Yojana",
      category: "Crop Insurance",
      description:
        "Crop insurance support for farmers against specified crop losses and risks.",
      benefit: "Crop insurance",
      eligibility: "Eligible farmers",
      icon: Sprout,
    },
    {
      id: 3,
      title: "Kisan Credit Card",
      category: "Financial Support",
      description:
        "Credit facility designed to help farmers meet agricultural and related financial requirements.",
      benefit: "Agricultural credit",
      eligibility: "Eligible farmers",
      icon: Landmark,
    },
    {
      id: 4,
      title: "PM Krishi Sinchayee Yojana",
      category: "Irrigation",
      description:
        "Support related to improving irrigation coverage and efficient water use in agriculture.",
      benefit: "Irrigation support",
      eligibility: "Eligible farmers / beneficiaries",
      icon: Sprout,
    },
    {
      id: 5,
      title: "Agriculture Mechanization Support",
      category: "Farm Equipment",
      description:
        "Government support related to agricultural machinery and farm mechanization.",
      benefit: "Farm equipment support",
      eligibility: "Eligible farmers / groups",
      icon: Tractor,
    },
    {
      id: 6,
      title: "Farmer Welfare Programs",
      category: "Farmer Welfare",
      description:
        "Explore government programs designed to support farmers and rural communities.",
      benefit: "Farmer welfare",
      eligibility: "Depends on scheme",
      icon: Users,
    },
  ];

  const categories = [
    "All",
    "Financial Support",
    "Crop Insurance",
    "Irrigation",
    "Farm Equipment",
    "Farmer Welfare",
  ];

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchesSearch =
        scheme.title.toLowerCase().includes(search.toLowerCase()) ||
        scheme.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || scheme.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <Landmark
              size={22}
              className="text-green-600 dark:text-green-400"
            />

            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              KrishiMitra AI
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Sarkari Yojana Guide
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Farmers ke liye available government schemes, benefits aur
            eligibility information ek jagah explore karein.
          </p>
        </div>

        {/* Search */}
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-green-400 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-green-500">
            <Search
              size={19}
              className="shrink-0 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search government schemes..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  active
                    ? "bg-green-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-green-300 hover:text-green-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-green-700 dark:hover:text-green-400"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Important Note */}
        <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
          <div className="flex gap-3">
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
            />

            <div>
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                Important
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-700 dark:text-blue-400">
                Scheme eligibility, benefits aur application rules
                scheme aur time ke according change ho sakte hain.
                Application se pehle official government information
                verify karein.
              </p>
            </div>
          </div>
        </div>

        {/* Schemes */}
        {filteredSchemes.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredSchemes.map((scheme) => {
              const Icon = scheme.icon;

              return (
                <div
                  key={scheme.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-700"
                >
                  {/* Icon + Category */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
                      <Icon size={22} />
                    </div>

                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {scheme.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-5">
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      {scheme.title}
                    </h2>

                    <p className="mt-2 min-h-[60px] text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {scheme.description}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs text-slate-400">
                        Benefit
                      </span>

                      <span className="text-right text-xs font-semibold text-slate-700 dark:text-slate-200">
                        {scheme.benefit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs text-slate-400">
                        Eligibility
                      </span>

                      <span className="text-right text-xs font-semibold text-slate-700 dark:text-slate-200">
                        {scheme.eligibility}
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-700">
                    View Details
                    <ChevronRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <Search
              size={30}
              className="mx-auto text-slate-300 dark:text-slate-600"
            />

            <h3 className="mt-3 text-sm font-bold text-slate-800 dark:text-white">
              No schemes found
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Try a different search or category.
            </p>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <ExternalLink size={18} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-800 dark:text-white">
              Official information
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Future version me har scheme ke official government
              portal ka direct link provide kiya jayega.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SarkariYojana;