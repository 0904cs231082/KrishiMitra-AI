import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  LockKeyhole,
  Phone,
  RefreshCw,
  User,
} from "lucide-react";
import { saveLoggedInUser } from "../utils/authStorage";

function generateMathQuestion() {
  const first = Math.floor(Math.random() * 8) + 2;
  const second = Math.floor(Math.random() * 8) + 2;

  return {
    first,
    second,
    answer: first + second,
  };
}

function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [mathAnswer, setMathAnswer] = useState("");

  const [question, setQuestion] = useState(() =>
    generateMathQuestion()
  );

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const questionText = useMemo(() => {
    return `${question.first} + ${question.second} = ?`;
  }, [question]);

  const refreshQuestion = () => {
    setQuestion(generateMathQuestion());
    setMathAnswer("");
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const cleanName = name.trim();
    const cleanMobile = mobile.trim();
    const cleanAnswer = mathAnswer.trim();

    if (!cleanName) {
      setError("Please enter your name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!cleanAnswer) {
      setError("Please solve the verification question.");
      return;
    }

    if (Number(cleanAnswer) !== question.answer) {
      setError("Incorrect answer. Please try again.");
      setMathAnswer("");
      return;
    }

    setIsLoading(true);

    const user = saveLoggedInUser({
      name: cleanName,
      mobile: cleanMobile,
    });

    if (user) {
      setTimeout(() => {
        navigate("/dashboard", {
          replace: true,
        });
      }, 500);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-900/20" />

          <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-green-200/40 blur-3xl dark:bg-green-900/20" />

          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-100/30 blur-3xl dark:bg-lime-900/10" />
        </div>

        {/* Main card */}
        <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
          <div className="grid md:grid-cols-2">
            {/* Left branding section */}
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-lime-600 p-10 text-white md:flex md:flex-col md:justify-between lg:p-12">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
              <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-black/10" />

              <div className="relative">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                    <Leaf className="h-7 w-7" />
                  </div>

                  <div>
                    <h1 className="text-xl font-bold">
                      KrishiMitra
                    </h1>

                    <p className="text-xs text-white/75">
                      AI for Smarter Farming
                    </p>
                  </div>
                </div>

                <h2 className="max-w-md text-4xl font-bold leading-tight lg:text-5xl">
                  Your smart farming companion.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-6 text-white/80 lg:text-base">
                  Get useful farming insights, weather information,
                  mandi rates and AI-powered assistance — all in one
                  place.
                </p>
              </div>

              <div className="relative mt-10 space-y-3">
                {[
                  "AI-powered farming assistance",
                  "Weather & crop insights",
                  "Mandi price information",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-white/90"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right login section */}
            <div className="p-6 sm:p-8 lg:p-12">
              {/* Mobile logo */}
              <div className="mb-8 flex items-center gap-3 md:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <Leaf className="h-6 w-6" />
                </div>

                <div>
                  <h1 className="font-bold text-slate-900 dark:text-white">
                    KrishiMitra
                  </h1>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    AI for Smarter Farming
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <p className="mb-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Welcome to KrishiMitra
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Let's get started
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Enter your details to access your personalized
                  farming assistant.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Your Name
                  </label>

                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your name"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800"
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Mobile Number
                  </label>

                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={mobile}
                      onChange={(event) => {
                        const value = event.target.value.replace(
                          /\D/g,
                          ""
                        );

                        setMobile(value);
                        setError("");
                      }}
                      placeholder="10-digit mobile number"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800"
                    />
                  </div>
                </div>

                {/* Human verification */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Human Verification
                    </label>

                    <button
                      type="button"
                      onClick={refreshQuestion}
                      className="flex items-center gap-1 text-xs font-medium text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      New question
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-12 min-w-[125px] items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
                      {questionText}
                    </div>

                    <input
                      type="number"
                      value={mathAnswer}
                      onChange={(event) => {
                        setMathAnswer(event.target.value);
                        setError("");
                      }}
                      placeholder="Answer"
                      className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-emerald-600/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      Opening KrishiMitra...
                    </>
                  ) : (
                    <>
                      Continue to KrishiMitra
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Privacy note */}
              <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Your basic profile information is stored locally on
                  this device. No account is created on a server.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;