import { useState } from "react";
import { Check, Globe2, Languages } from "lucide-react";

function Language() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    {
      name: "English",
      description: "Use KrishiMitra in English",
    },
    {
      name: "हिंदी",
      description: "KrishiMitra को हिंदी में इस्तेमाल करें",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <Globe2
              size={22}
              className="text-green-600 dark:text-green-400"
            />

            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              KrishiMitra AI
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Language
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Choose your preferred language for the application.
          </p>
        </div>

        {/* Language Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="border-b border-slate-100 p-5 dark:border-slate-800 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
                <Languages size={21} />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  App Language
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Select the language you want to use.
                </p>
              </div>
            </div>
          </div>

          {/* Language Options */}
          <div className="p-4 sm:p-6">
            <div className="space-y-3">
              {languages.map((language) => {
                const isSelected =
                  selectedLanguage === language.name;

                return (
                  <button
                    key={language.name}
                    onClick={() =>
                      setSelectedLanguage(language.name)
                    }
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-green-500 bg-green-50 shadow-sm dark:border-green-500 dark:bg-green-950/30"
                        : "border-slate-200 bg-white hover:border-green-300 hover:bg-green-50/50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-green-700 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                          isSelected
                            ? "bg-green-600 text-white"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {language.name === "English"
                          ? "EN"
                          : "हि"}
                      </div>

                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            isSelected
                              ? "text-green-700 dark:text-green-400"
                              : "text-slate-800 dark:text-white"
                          }`}
                        >
                          {language.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {language.description}
                        </p>
                      </div>
                    </div>

                    {/* Selected Check */}
                    {isSelected && (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-white">
                        <Check size={16} strokeWidth={2.5} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
            Language support
          </p>

          <p className="mt-1 text-xs leading-5 text-blue-700 dark:text-blue-400">
            More Indian languages can be added in future versions
            of KrishiMitra AI.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Language;