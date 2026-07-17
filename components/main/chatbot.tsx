"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Types ─── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/* ─── Suggested prompts & Hardcoded Answers ─── */
const PREDEFINED_QA = [
  {
    q: "What are your skills?",
    a: "I specialize in AI & Data Science with Python, PyTorch, and Scikit-Learn. I also build full-stack apps using React, Next.js, and Tailwind CSS."
  },
  {
    q: "What are your projects?",
    a: "I've built several projects including CodeSentinel AI (vulnerability detection), a Heart Disease Prediction model, SentimentIQ, and a FaceID Attendance system!"
  },
  {
    q: "What is your experience?",
    a: "I'm currently an AI & Data Science engineering student (Class of 2027) and I've worked as a Python/ML Intern at R3 Systems."
  },
  {
    q: "How can I contact you?",
    a: "You can reach me via email at vaibhavbhoyate976@gmail.com, WhatsApp at +91 8830269849, or find me on GitHub @vaibhavv-labs!"
  }
];

/* ─── Icons ─── */
const BotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <path d="M8 12h.01" />
    <path d="M12 12h.01" />
    <path d="M16 12h.01" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

/* ─── Typing dots animation ─── */
const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-purple-400"
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
    <span className="text-xs text-gray-500 ml-2">Thinking...</span>
  </div>
);

/* ─── Main Component ─── */
export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ─── Auto-scroll ─── */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  /* ─── Send message ─── */
  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    const match = PREDEFINED_QA.find(
      (qa) => qa.q.toLowerCase() === text.trim().toLowerCase()
    );

    if (match) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), role: "assistant", content: match.a },
        ]);
        setIsLoading(false);
      }, 600);
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok && data.response) {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, something went wrong. Please try again!",
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Network error. Please check your connection and try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ─── Floating Toggle Button ─── */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(112,66,248,0.4)] border border-purple-500/30 transition-colors duration-300"
        style={{
          background: "linear-gradient(135deg, #7042f8 0%, #00d8ff 100%)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-white"
            >
              <CloseIcon />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-white"
            >
              <BotIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-[998] w-[350px] max-w-[calc(100vw-2rem)] h-[420px] max-h-[calc(100vh-8rem)] rounded-2xl overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(112,66,248,0.15)] border border-[#7042f830]"
            style={{
              background: "linear-gradient(180deg, rgba(13,9,37,0.97) 0%, rgba(3,0,20,0.98) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* ── Header ── */}
            <div className="relative px-5 py-4 border-b border-[#7042f825] flex items-center gap-3 shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-cyan-500/10 pointer-events-none" />
              <div className="relative w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-cyan-500/20 border border-purple-500/30">
                <BotIcon />
              </div>
              <div className="relative">
                <h3 className="text-white font-bold text-[13px] leading-tight">
                  Ask about Vaibhav
                </h3>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-purple-400">
                  AI Assistant
                </span>
              </div>
              <div className="relative ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                  Online
                </span>
              </div>
            </div>

            {/* ── Messages Area ── */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 scrollbar-thin scrollbar-thumb-purple-900/40 scrollbar-track-transparent flex flex-col">
              
              {/* Initial Welcome Message (Always at top) */}
              <div className="flex justify-start">
                <div className="max-w-[85%] px-4 py-3 text-[13px] leading-relaxed bg-[#7042f815] border border-[#7042f830] text-gray-300 rounded-2xl rounded-tl-sm shadow-[0_0_15px_rgba(112,66,248,0.05)]">
                  Hi, I&apos;m Vaibhav&apos;s assistant. Ask me about his skills, projects, experience, or services — or say you&apos;d like to book a meeting.
                </div>
              </div>

              {/* Message bubbles */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl rounded-br-sm shadow-[0_4px_15px_rgba(112,66,248,0.25)]"
                        : "bg-[#7042f812] border border-[#7042f825] text-gray-300 rounded-2xl rounded-tl-sm shadow-[0_0_15px_rgba(112,66,248,0.05)]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#7042f812] border border-[#7042f825] rounded-2xl rounded-tl-sm shadow-[0_0_15px_rgba(112,66,248,0.05)]">
                    <TypingIndicator />
                  </div>
                </div>
              )}


              <div ref={messagesEndRef} className="h-1" />
            </div>

            {/* ── Fixed Chips & Input ── */}
            <div className="shrink-0 border-t border-[#7042f820] bg-transparent">
              <div className="grid grid-cols-2 gap-1.5 px-4 pt-3 pb-1">
                {PREDEFINED_QA.map((qa) => (
                  <button
                    key={qa.q}
                    onClick={() => sendMessage(qa.q)}
                    className="text-[11px] font-medium px-2 py-1.5 rounded-full border border-[#7042f840] bg-[#7042f810] text-purple-300 hover:bg-[#7042f825] hover:border-purple-500/50 transition-all duration-200 hover:shadow-[0_0_12px_rgba(112,66,248,0.15)] whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {qa.q}
                  </button>
                ))}
              </div>
              <form
                onSubmit={handleSubmit}
                className="px-4 pb-4 pt-2 flex items-center gap-2.5"
              >
                <div className="flex-1 flex items-center bg-[#1a1040]/60 border border-[#7042f830] rounded-full px-3.5 py-2 focus-within:border-purple-500/50 focus-within:shadow-[0_0_15px_rgba(112,66,248,0.1)] transition-all duration-300">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    disabled={isLoading}
                    className="w-full bg-transparent text-[13px] text-white placeholder-gray-500 outline-none disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-cyan-500 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(112,66,248,0.3)] transition-all duration-200"
                  aria-label="Send message"
                >
                  <SendIcon />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
