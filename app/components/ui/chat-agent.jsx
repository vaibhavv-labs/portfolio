"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot } from 'lucide-react';

const QUICK_REPLIES = [
  'What are your skills?',
  'Tell me about your projects',
  'What is your experience?',
  'How can I contact you?'
];

const INSTANT_ANSWERS = {
  'What are your skills?': "Vaibhav works primarily with Python, Machine Learning, Scikit-Learn, and NLP, backed by Pandas, NumPy, SQL, MongoDB, OpenCV, Streamlit, and Hugging Face.",
  'Tell me about your projects': "His top projects are the Autonomous Business Platform with automated agent workflows, Logic Coach for coding practice, CodeSentinel AI for vulnerability scanning, and SentimentIQ for brand analytics. Live demos are ready to test right on this site.",
  'What is your experience?': "Vaibhav worked as a Software Intern at R3 Systems India focusing on Python and ML pipelines. He is currently pursuing his B.E. in AI and Data Science at SPPU with an 8.6 CGPA.",
  'How can I contact you?': "You can email him directly at vaibhavbhoyate976@gmail.com, reach out on LinkedIn, or message him on WhatsApp at +91 8830269849."
};

const INSTANT_NAV = {
  'What are your skills?': 'skills',
  'Tell me about your projects': 'projects',
  'What is your experience?': 'experience',
  'How can I contact you?': 'contact',
};

export default function ChatAgent({
  isDarkMode,
  themeClasses,
  onNavigate,
  accentColor = '#10b981',
  isOpen: externalOpen,
  open: legacyOpen,
  onOpenChange,
  onToggle
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = externalOpen !== undefined || legacyOpen !== undefined;
  const open = isControlled ? (externalOpen ?? legacyOpen) : internalOpen;

  const toggle = () => {
    const nextVal = !open;
    if (onToggle) onToggle();
    if (onOpenChange) onOpenChange(nextVal);
    if (!isControlled) setInternalOpen(nextVal);
  };

  const close = () => {
    if (onToggle && open) onToggle();
    if (onOpenChange) onOpenChange(false);
    if (!isControlled) setInternalOpen(false);
  };

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hey! I'm VISION, Vaibhav's portfolio assistant. Ask me about his projects, technical stack, or background." },
  ]);
  const scrollRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, isLoading]);

  const respond = async (text) => {
    const newMessages = [...messages, { role: 'user', text }];
    setMessages(newMessages);

    // Instant answers
    if (INSTANT_ANSWERS[text]) {
      setMessages((prev) => [...prev, { role: 'bot', text: INSTANT_ANSWERS[text] }]);
      if (INSTANT_NAV[text] && onNavigate) {
        setTimeout(() => onNavigate(INSTANT_NAV[text]), 400);
      }
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Backend Error:", data.error);
        throw new Error(data.error || "Failed to fetch");
      }
      
      const rawText = data.text || "Sorry, I couldn't generate a response.";
      const cleanText = rawText
        .replace(/^[\s]*[-*•]\s+/gm, '')
        .replace(/\n+[-*•]\s+/g, ', ')
        .replace(/\s*—\s*/g, ', ')
        .replace(/\s*–\s*/g, ', ')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\n{2,}/g, ' ')
        .trim();

      setMessages((prev) => [...prev, { role: 'bot', text: cleanText }]);

      const lower = text.toLowerCase();
      if (onNavigate) {
        if (lower.includes('project')) setTimeout(() => onNavigate('projects'), 400);
        else if (lower.includes('skill')) setTimeout(() => onNavigate('skills'), 400);
        else if (lower.includes('experience') || lower.includes('education')) setTimeout(() => onNavigate('experience'), 400);
        else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email')) setTimeout(() => onNavigate('contact'), 400);
        else if (lower.includes('certificate')) setTimeout(() => onNavigate('certificates'), 400);
      }
    } catch (error) {
      console.error("Chat Agent Error:", error.message);
      setMessages((prev) => [...prev, { role: 'bot', text: `System Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    respond(trimmed);
    setInput('');
  };

  return (
    <>
      {/* Floating orb is desktop-only; on phones the orb is integrated into the bento grid tile */}
      <div className={`hidden sm:flex fixed bottom-6 right-6 z-[60] flex-col items-end gap-3 ${open ? '' : 'animate-gentle-float'}`}>
        <button
          onClick={toggle}
          aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
          style={{ '--orb-color': accentColor }}
          className="ai-orb relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white transition-transform hover:scale-105 active:scale-95 shadow-2xl"
        >
          <span className="ai-orb-shine" aria-hidden="true" />
          {open ? <X size={22} className="relative z-10" /> : <Bot size={22} className="relative z-10" />}
        </button>
      </div>

      {/* Backdrop for mobile when chat is opened from bento tile */}
      {open && (
        <div
          onClick={close}
          className="sm:hidden fixed inset-0 z-[59] bg-black/60 backdrop-blur-[2px] touch-none"
          aria-hidden="true"
        />
      )}

      {/* Chat Window Panel */}
      {open && (
        <div
          className={`fixed bottom-3 right-3 left-3 sm:bottom-24 sm:right-6 sm:left-auto z-[60] sm:w-[22rem] h-[min(78svh,36rem)] sm:h-[28rem] rounded-[1.75rem] shadow-2xl flex flex-col overflow-hidden border ${
            isDarkMode ? 'bg-[#0f0f0f]/95 border-white/10 text-white' : 'bg-white/95 border-neutral-200 text-neutral-900'
          }`}
        >
          {/* Header */}
          <div className={`px-5 py-4 flex items-center gap-3 border-b ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
            <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Bot size={18} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>VISION AI</p>
              <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Portfolio Assistant</p>
            </div>
            <button
              onClick={close}
              aria-label="Close chat assistant"
              className={`w-9 h-9 inline-flex items-center justify-center rounded-full transition-colors ${
                isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-300' : 'bg-neutral-900/5 hover:bg-neutral-900/10 text-neutral-700'
              }`}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-emerald-500 text-black font-semibold'
                      : isDarkMode
                      ? 'bg-white/5 border border-white/5 text-gray-200'
                      : 'bg-neutral-100 border border-neutral-200 text-neutral-800'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed flex items-center gap-2 ${
                isDarkMode ? 'bg-white/5 border border-white/5 text-gray-400' : 'bg-neutral-100 border border-neutral-200 text-neutral-500'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs">Thinking...</span>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          <div className="px-5 pb-3 flex flex-wrap gap-1.5">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => respond(q)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all ${
                  isDarkMode
                    ? 'border-white/10 text-gray-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300'
                    : 'border-neutral-200 text-neutral-600 hover:border-emerald-500/50 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className={`px-4 py-3 flex items-center gap-2 border-t ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, experience..."
              className={`flex-1 rounded-full px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-emerald-500/40 border transition-colors ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400'
              }`}
            />
            <button
              type="submit"
              aria-label="Send message"
              className="w-8 h-8 shrink-0 inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 text-black transition-colors"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
