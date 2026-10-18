import { useEffect, useMemo, useState } from "react";
import {
  Bookmark,
  Search,
  Trash2,
  Sparkles,
  CloudSun,
  Sprout,
  TrendingUp,
  FileText,
} from "lucide-react";

import {
  getSavedItems,
  removeSavedItem,
  clearSavedItems,
} from "../utils/savedStorage";

const typeIcons = {
  "AI Assistant": Sparkles,
  Weather: CloudSun,
  "My Crops": Sprout,
  "Mandi Rates": TrendingUp,
  General: FileText,
};

function Saved() {
  const [savedItems, setSavedItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    setSavedItems(getSavedItems());
  }, []);

  const types = useMemo(() => {
    const uniqueTypes = [
      ...new Set(savedItems.map((item) => item.type)),
    ];

    return ["All", ...uniqueTypes];
  }, [savedItems]);

  const filteredItems = useMemo(() => {
    return savedItems.filter((item) => {
      const matchesSearch =
        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.content
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        selectedType === "All" ||
        item.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [savedItems, search, selectedType]);

  const handleRemove = (id) => {
    const updatedItems = removeSavedItem(id);
    setSavedItems(updatedItems);
  };

  const handleClearAll = () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove all saved items?"
    );

    if (!confirmed) return;

    clearSavedItems();
    setSavedItems([]);
  };

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <section className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Bookmark size={21} />
              </div>

              <h1 className="text-2xl font-bold sm:text-3xl">
                Saved
              </h1>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Keep useful farming information saved for later.
            </p>
          </div>

          {savedItems.length > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/40 dark:bg-slate-900 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>

        {/* Search + Filters */}
        {savedItems.length > 0 && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              
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
                  placeholder="Search saved items..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              {/* Type filters */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                      selectedType === type
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {savedItems.length === 0 && (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Bookmark size={34} />
            </div>

            <h2 className="mb-2 text-xl font-bold">
              Nothing saved yet
            </h2>

            <p className="max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              Save useful AI answers, weather information,
              crop advice, or mandi information here so you
              can easily find them later.
            </p>
          </div>
        )}

        {/* No Search Results */}
        {savedItems.length > 0 && filteredItems.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
            <Search
              size={32}
              className="mx-auto mb-3 text-slate-400"
            />

            <h2 className="mb-1 font-semibold">
              No saved items found
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Try another search or category.
            </p>
          </div>
        )}

        {/* Saved Cards */}
        {filteredItems.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => {
              const Icon =
                typeIcons[item.type] || FileText;

              return (
                <article
                  key={item.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <Icon size={19} />
                      </div>

                      <div>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          {item.type}
                        </span>

                        <h3 className="mt-0.5 line-clamp-2 text-sm font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      title="Remove from saved"
                      className="rounded-lg p-2 text-slate-400 opacity-100 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <p className="mb-4 line-clamp-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item.content}
                  </p>

                  <div className="border-t border-slate-100 pt-3 text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
                    Saved on {formatDate(item.createdAt)}
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

export default Saved;