import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  CloudSun,
  FlaskConical,
  Leaf,
  Loader2,
  Send,
  Sparkles,
  Sprout,
  User,
  X,
  Trash2,
  Wheat,
} from "lucide-react";

import { askGemini } from "../api/aiApi";

import {
  getSavedItems,
  saveItem,
  removeSavedItem,
} from "../utils/savedStorage";

function AIAssistant() {
  const [question, setQuestion] = useState("");

  /* =========================
     CHAT MESSAGES
  ========================= */

  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem(
        "krishimitra-ai-chat"
      );

      return savedMessages
        ? JSON.parse(savedMessages)
        : [];
    } catch (error) {
      console.error(
        "Unable to load chat history:",
        error
      );

      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const chatEndRef = useRef(null);

  /* =========================
     SAVED MESSAGE IDS
  ========================= */

  const [savedIds, setSavedIds] = useState(() => {
    try {
      return getSavedItems().map(
        (item) => item.id
      );
    } catch (error) {
      console.error(
        "Unable to load saved items:",
        error
      );

      return [];
    }
  });

  /* =========================
     SUGGESTIONS
  ========================= */

  const suggestions = [
    {
      title: "Crop Disease",
      text: "Mere crop ke leaves par yellow spots hai?",
      icon: Leaf,
    },

    {
      title: "Weather",
      text: "Mere area ka weather farming ke liye kaisa hai?",
      icon: CloudSun,
    },

    {
      title: "Fertilizers",
      text: "Wheat ke liye kaun sa fertilizer use karna chahiye?",
      icon: FlaskConical,
    },

    {
      title: "Crop Advice",
      text: "Meri crop ki growth achhi kaise ho sakti hai?",
      icon: Sprout,
    },
  ];

  /* =========================
     SAVE CHAT HISTORY
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "krishimitra-ai-chat",
      JSON.stringify(messages)
    );
  }, [messages]);

  /* =========================
     AUTO SCROLL
  ========================= */

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  /* =========================
     FILTER SUGGESTIONS
  ========================= */

  const filteredSuggestions = suggestions.filter(
    (item) =>
      item.text
        .toLowerCase()
        .includes(question.toLowerCase())
  );

  /* =========================
     SELECT SUGGESTION
  ========================= */

  const handleSuggestionClick = (text) => {
    setQuestion(text);
    setError("");
  };

  /* =========================
     CLEAR INPUT
  ========================= */

  const handleClear = () => {
    setQuestion("");
    setError("");
  };

  /* =========================
     CLEAR CHAT
  ========================= */

  const handleClearChat = () => {
    setMessages([]);
    setError("");

    localStorage.removeItem(
      "krishimitra-ai-chat"
    );
  };

  /* =========================
     SAVE / UNSAVE AI MESSAGE
  ========================= */

  const handleSaveMessage = (message) => {
    if (!message?.id || !message?.text) {
      return;
    }

    const isSaved = savedIds.includes(message.id);

    /* -------------------------
       UNSAVE
    ------------------------- */

    if (isSaved) {
      const updatedItems = removeSavedItem(
        message.id
      );

      setSavedIds(
        updatedItems.map(
          (item) => item.id
        )
      );

      return;
    }

    /* -------------------------
       SAVE
    ------------------------- */

    const updatedItems = saveItem({
      id: message.id,

      title: "AI Assistant Response",

      content: message.text,

      type: "AI Assistant",

      createdAt: message.createdAt,
    });

    setSavedIds(
      updatedItems.map(
        (item) => item.id
      )
    );
  };

  /* =========================
     SEND QUESTION
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedQuestion =
      question.trim();

    if (
      !trimmedQuestion ||
      isLoading
    ) {
      return;
    }

    setError("");

    /* -------------------------
       USER MESSAGE
    ------------------------- */

    const userMessage = {
      id: `${Date.now()}-user`,

      role: "user",

      text: trimmedQuestion,

      createdAt:
        new Date().toISOString(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setQuestion("");

    setIsLoading(true);

    try {
      /* -------------------------
         GEMINI API CALL
      ------------------------- */

      const answer = await askGemini(
        trimmedQuestion
      );

      /* -------------------------
         AI MESSAGE
      ------------------------- */

      const aiMessage = {
        id: `${Date.now()}-ai`,

        role: "assistant",

        text: answer,

        createdAt:
          new Date().toISOString(),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } catch (error) {
      console.error(
        "AI response error:",
        error
      );

      setError(
        error?.message ||
          "Unable to get AI response."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const hasMessages =
    messages.length > 0;

  return (
    <div className="min-h-full bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <section className="mb-8">
          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <Bot size={25} />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                Your Farming Assistant
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                KrishiMitra AI
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                Ask questions about crops,
                diseases, weather, fertilizers,
                irrigation and farming.
              </p>
            </div>

          </div>
        </section>

        {/* =========================
            AI INPUT CARD
        ========================= */}

        <section className="mb-8 overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 shadow-sm dark:border-green-900/40 dark:from-green-950/40 dark:via-slate-900 dark:to-emerald-950/30">

          <div className="p-5 sm:p-8">

            <div className="mb-6 flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-md shadow-green-200 dark:shadow-green-950">
                  <Sparkles size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">
                    Ask KrishiMitra
                  </h2>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Get smart farming guidance
                  </p>
                </div>

              </div>

              {hasMessages && (
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                >
                  <Trash2 size={15} />

                  <span className="hidden sm:inline">
                    Clear Chat
                  </span>
                </button>
              )}

            </div>

            {/* =========================
                ERROR
            ========================= */}

            {error && (
              <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20">

                <div className="flex-1">
                  <p className="text-sm font-medium text-red-700 dark:text-red-400">
                    AI response failed
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-600 dark:text-red-400/80">
                    {error}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setError("")}
                  className="text-red-400 hover:text-red-600"
                >
                  <X size={17} />
                </button>

              </div>
            )}

            {/* =========================
                INPUT
            ========================= */}

            <form onSubmit={handleSubmit}>

              <div className="group flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition-all duration-300 focus-within:border-green-400 focus-within:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-green-500">

                <div className="ml-3 shrink-0 text-slate-400 group-focus-within:text-green-600">
                  <Sparkles size={20} />
                </div>

                <input
                  type="text"
                  value={question}
                  onChange={(e) =>
                    setQuestion(
                      e.target.value
                    )
                  }
                  placeholder="Ask anything about your farming..."
                  disabled={isLoading}
                  className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed dark:text-slate-200"
                />

                {question &&
                  !isLoading && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      <X size={18} />
                    </button>
                  )}

                <button
                  type="submit"
                  disabled={
                    !question.trim() ||
                    isLoading
                  }
                  className="flex shrink-0 items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {isLoading ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      <span className="hidden sm:inline">
                        Thinking
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">
                        Ask AI
                      </span>

                      <Send size={17} />
                    </>
                  )}

                </button>

              </div>

            </form>

            {/* =========================
                AUTO SUGGESTIONS
            ========================= */}

            {question &&
              !isLoading &&
              filteredSuggestions.length >
                0 && (
                <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">

                  <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Suggested Questions
                    </p>
                  </div>

                  <div className="p-2">

                    {filteredSuggestions.map(
                      (item) => {
                        const Icon =
                          item.icon;

                        return (
                          <button
                            key={
                              item.title
                            }
                            type="button"
                            onClick={() =>
                              handleSuggestionClick(
                                item.text
                              )
                            }
                            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-green-50 dark:hover:bg-green-950/30"
                          >

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition group-hover:bg-green-100 group-hover:text-green-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-green-900/40 dark:group-hover:text-green-400">
                              <Icon
                                size={17}
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                                {item.title}
                              </p>

                              <p className="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">
                                {item.text}
                              </p>
                            </div>

                            <ArrowRight
                              size={16}
                              className="text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-green-600"
                            />

                          </button>
                        );
                      }
                    )}

                  </div>
                </div>
              )}

          </div>
        </section>

        {/* =========================
            CONVERSATION
        ========================= */}

        {hasMessages && (
          <section className="mb-8">

            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Conversation
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your farming questions and AI responses.
              </p>
            </div>

            <div className="space-y-5">

              {messages.map(
                (message) => {

                  const isUser =
                    message.role ===
                    "user";

                  const isSaved =
                    savedIds.includes(
                      message.id
                    );

                  return (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        isUser
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      {/* AI ICON */}

                      {!isUser && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                          <Bot size={18} />
                        </div>
                      )}

                      <div
                        className={`max-w-[90%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
                          isUser
                            ? "rounded-br-md bg-green-600 text-white"
                            : "rounded-bl-md border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                        }`}
                      >

                        {/* MESSAGE */}

                        <p className="whitespace-pre-line text-sm leading-6">
                          {message.text}
                        </p>

                        {/* =========================
                            AI MESSAGE FOOTER
                        ========================= */}

                        {!isUser && (
                          <div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800">

                            <div className="flex flex-wrap items-center justify-between gap-3">

                              {/* AI LABEL */}

                              <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                                <CheckCircle2
                                  size={13}
                                />

                                KrishiMitra AI
                              </div>

                              {/* SAVE BUTTON */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleSaveMessage(
                                    message
                                  )
                                }
                                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                                  isSaved
                                    ? "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                                    : "text-slate-500 hover:bg-slate-100 hover:text-green-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-green-400"
                                }`}
                              >

                                {isSaved ? (
                                  <>
                                    <BookmarkCheck
                                      size={15}
                                    />

                                    Saved
                                  </>
                                ) : (
                                  <>
                                    <Bookmark
                                      size={15}
                                    />

                                    Save
                                  </>
                                )}

                              </button>

                            </div>

                          </div>
                        )}

                      </div>

                      {/* USER ICON */}

                      {isUser && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          <User size={18} />
                        </div>
                      )}

                    </div>
                  );
                }
              )}

              {/* =========================
                  LOADING
              ========================= */}

              {isLoading && (
                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <Bot size={18} />
                  </div>

                  <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-5 py-4 dark:border-slate-700 dark:bg-slate-900">

                    <div className="flex items-center gap-1.5">

                      <span className="h-2 w-2 animate-bounce rounded-full bg-green-500" />

                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-green-500"
                        style={{
                          animationDelay:
                            "120ms",
                        }}
                      />

                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-green-500"
                        style={{
                          animationDelay:
                            "240ms",
                        }}
                      />

                    </div>

                  </div>
                </div>
              )}

              <div
                ref={chatEndRef}
              />

            </div>
          </section>
        )}

        {/* =========================
            QUICK QUESTIONS
        ========================= */}

        <section>

          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              What can I help you with?
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Choose a topic or ask your own question.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {suggestions.map(
              (item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() =>
                      handleSuggestionClick(
                        item.text
                      )
                    }
                    className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-800"
                  >

                    <div className="mb-4 flex items-center justify-between">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:group-hover:bg-green-900/50">
                        <Icon size={21} />
                      </div>

                      <ArrowRight
                        size={17}
                        className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-green-600"
                      />

                    </div>

                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {item.text}
                    </p>

                  </button>
                );
              }
            )}

          </div>

        </section>

        {/* =========================
            EMPTY STATE
        ========================= */}

        {!hasMessages && (
          <section className="mt-8">

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 sm:p-8">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <Wheat size={23} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Your AI farming assistant is ready
                  </h3>

                  <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Ask about crop health,
                    weather, fertilizer,
                    crop growth or mandi
                    prices.
                  </p>
                </div>

              </div>

            </div>

          </section>
        )}

        {/* =========================
            DISCLAIMER
        ========================= */}

        <p className="mt-8 text-center text-xs leading-5 text-slate-400 dark:text-slate-500">
          KrishiMitra AI provides general farming
          guidance. For important crop, fertilizer
          or pesticide decisions, verify
          recommendations with local agricultural
          experts and soil-test results.
        </p>

      </div>
    </div>
  );
}

export default AIAssistant;