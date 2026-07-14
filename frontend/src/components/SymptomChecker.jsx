import { useState, useRef, useEffect } from "react";

const SymptomChecker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hi! I'm **MediBot**, your AI symptom checker.\n\nDescribe your symptoms and I'll suggest possible conditions and whether you should see a doctor.\n\n⚠️ *This is not a medical diagnosis. Always consult a doctor.*",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/symptoms/check`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            symptoms: trimmed,
            history: messages.map((m) => ({
              role: m.role,
              content: m.text,
            })),
          }),
        },
      );

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.response },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Sorry, I couldn't process that. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ Connection error. Please check your internet and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        text: "👋 Hi! I'm **MediBot**, your AI symptom checker.\n\nDescribe your symptoms and I'll suggest possible conditions and whether you should see a doctor.\n\n⚠️ *This is not a medical diagnosis. Always consult a doctor.*",
      },
    ]);
  };

  // Render markdown-like text (bold, italic, line breaks)
  const renderText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j}>{part.slice(2, -2)}</strong>;
            } else if (part.startsWith("*") && part.endsWith("*")) {
              return <em key={j}>{part.slice(1, -1)}</em>;
            }
            return <span key={j}>{part}</span>;
          })}
          {i < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 flex flex-col items-center justify-center bg-teal-400 text-black rounded-full shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
          style={{ width: "80px", height: "200px" }}
          title="AI Symptom Checker"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-red-800 opacity-25 animate-ping" />

          {/* Stethoscope icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 relative z-10 mb-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
            <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
            <circle cx="20" cy="10" r="2" />
          </svg>

          <span className="text-[11px] font-semibold relative z-10 text-center leading-tight px-2">
            Check Your Specialist with AI ☺
          </span>
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 ${
            isMinimized ? "w-72 h-14" : "w-80 sm:w-96 h-[560px]"
          }`}
          style={{ maxHeight: "90vh" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-teal-600 text-white px-4 py-3 rounded-t-2xl flex-shrink-0">
            <div className="flex items-center gap-2">
              {/* Bot avatar */}
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                  <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                  <circle cx="20" cy="10" r="2" />
                </svg>
              </div>
              <div clas>
                <p className="font-semibold text-sm leading-tight">MediBot</p>
                <p className="text-[10px] text-white/70 leading-tight">
                  AI Symptom Checker
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Reset */}
              <button
                onClick={resetChat}
                title="Reset chat"
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              {/* Minimize */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand" : "Minimize"}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {isMinimized ? (
                    <path d="M18 15l-6-6-6 6" />
                  ) : (
                    <path d="M6 9l6 6 6-6" />
                  )}
                </svg>
              </button>
              {/* Close */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                title="Close"
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 bg-gray-950 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                          <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                          <circle cx="20" cy="10" r="2" />
                        </svg>
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-white rounded-tr-sm"
                          : "bg-white text-gray-700 rounded-tl-sm shadow-sm border border-gray-100"
                      }`}
                    >
                      {renderText(msg.text)}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <div className="flex justify-start">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                        <circle cx="20" cy="10" r="2" />
                      </svg>
                    </div>
                    <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Disclaimer strip */}
              <div className="px-3 py-1.5 bg-amber-50 border-t border-amber-100 flex-shrink-0">
                <p className="text-[10px] text-amber-600 text-center">
                  ⚠️ For informational purposes only — not a substitute for
                  professional medical advice
                </p>
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-gray-100 rounded-b-2xl flex-shrink-0">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your symptoms..."
                    rows={1}
                    className="flex-1 resize-none border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all max-h-24 overflow-y-auto"
                    style={{ lineHeight: "1.4" }}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height =
                        Math.min(e.target.scrollHeight, 96) + "px";
                    }}
                    disabled={loading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className="w-9 h-9 bg-slate-500 text-white rounded-xl flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0 hover:scale-105 active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m22 2-7 20-4-9-9-4 20-7z" />
                      <path d="M22 2 11 13" />
                    </svg>
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-1.5 text-center">
                  Press Enter to send · Shift+Enter for new line
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SymptomChecker;
