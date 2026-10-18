import { useState } from "react";
import {
  HelpCircle,
  Search,
  MessageCircle,
  BookOpen,
  Mail,
  ChevronDown,
  ChevronRight,
  Bug,
  Lightbulb,
} from "lucide-react";

function HelpSupport() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How can I use the AI Assistant?",
      answer:
        "AI Assistant me apna farming related question type karein. KrishiMitra AI aapko crop, weather, soil aur farming related guidance provide karega.",
    },
    {
      question: "How can I check Mandi Rates?",
      answer:
        "Sidebar ya navigation se Mandi Rates open karein. Yahan crops ke market prices aur market related information dekhi ja sakti hai.",
    },
    {
      question: "Can I add my crops?",
      answer:
        "Yes. My Crops section se aap apne crops add aur manage kar sakte hain. Future version me crop tracking aur reminders bhi add kiye ja sakte hain.",
    },
    {
      question: "Is the weather information live?",
      answer:
        "Current demo version me weather information static hai. Future version me live weather API integrate ki jayegi.",
    },
    {
      question: "How can I change the application theme?",
      answer:
        "Settings open karke Appearance section me Light ya Dark theme select karein.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <HelpCircle
              size={22}
              className="text-green-600 dark:text-green-400"
            />

            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              KrishiMitra AI
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Help & Support
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Find answers, get help and share your feedback.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              How can we help you?
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Search for questions related to KrishiMitra AI.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-green-400 focus-within:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-green-500 dark:focus-within:bg-slate-800">
            <Search
              size={19}
              className="shrink-0 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your question..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Support Options */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* FAQ */}
          <button className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-700">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
              <BookOpen size={21} />
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              FAQs
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Common questions and answers.
            </p>

            <ChevronRight
              size={17}
              className="mt-3 text-slate-400 transition-transform group-hover:translate-x-1"
            />
          </button>

          {/* Contact */}
          <button className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <MessageCircle size={21} />
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Contact Support
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Get assistance from our support team.
            </p>

            <ChevronRight
              size={17}
              className="mt-3 text-slate-400 transition-transform group-hover:translate-x-1"
            />
          </button>

          {/* Email */}
          <button className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-purple-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-purple-700">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
              <Mail size={21} />
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Email Us
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Send us your query by email.
            </p>

            <ChevronRight
              size={17}
              className="mt-3 text-slate-400 transition-transform group-hover:translate-x-1"
            />
          </button>

          {/* Feedback */}
          <button className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-orange-700">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              <Lightbulb size={21} />
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Feedback
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Share your ideas and suggestions.
            </p>

            <ChevronRight
              size={17}
              className="mt-3 text-slate-400 transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* FAQ Section */}
        <section className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Quick answers to common questions.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={faq.question}
                    className="border-b border-slate-100 last:border-b-0 dark:border-slate-800"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between gap-4 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    >
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {faq.question}
                      </span>

                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4">
                        <p className="rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center">
                <Search
                  size={28}
                  className="mx-auto text-slate-300 dark:text-slate-600"
                />

                <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  No results found
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Try searching with different keywords.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Report Problem */}
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5 dark:border-red-900/40 dark:bg-red-950/20 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm dark:bg-slate-900 dark:text-red-400">
              <Bug size={21} />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-bold text-red-900 dark:text-red-300">
                Found a problem?
              </h3>

              <p className="mt-1 text-xs leading-5 text-red-700 dark:text-red-400">
                Report bugs or technical problems so we can improve
                KrishiMitra AI.
              </p>
            </div>

            <button className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-red-700">
              Report Problem
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HelpSupport;