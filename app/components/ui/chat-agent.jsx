"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot } from 'lucide-react';



const QUICK_REPLIES = ['What are your skills?', 'Tell me about your projects', 'What is your experience?', 'How can I contact you?'];

const INSTANT_ANSWERS = {
  'What are your skills?': "Vaibhav specializes in Machine Learning, NLP, and Data Engineering. His core stack includes Python, PyTorch, Scikit-Learn, TensorFlow, SQL, MongoDB, and Next.js.",
  'Tell me about your projects': "Vaibhav's featured projects include CodeSentinel AI (vulnerability detection), a Heart Disease Prediction System, SentimentIQ, and a FaceID Attendance System. Scroll up to the Projects section to see them live!",
  'What is your experience?': "Vaibhav worked as a Software Intern focusing on Python & ML at ATS, and as a Python Developer Intern at Let's Grow More. He holds a B.E. in Artificial Intelligence & Data Science from SPPU.",
  'How can I contact you?': "You can email Vaibhav directly at vaibhavbhoyate976@gmail.com, or reach out via WhatsApp at +91 8830269849. You can also use the links in the Contact section at the bottom of the page!"
};

export default function ChatAgent({ isDarkMode, themeClasses, onNavigate, accentColor = '#10b981' }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi, I'm Vaibhav's AI assistant. Ask me anything about his skills, projects, experience, or how to contact him!" },
  ]);
  const scrollRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, isLoading]);

  const respond = async (text) => {
    // Add user message
    const newMessages = [...messages, { role: 'user', text }];
    setMessages(newMessages);

    // Check for instant cached answers to avoid hitting the API
    if (INSTANT_ANSWERS[text]) {
      setMessages((prev) => [...prev, { role: 'bot', text: INSTANT_ANSWERS[text] }]);
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
      
      setMessages((prev) => [...prev, { role: 'bot', text: data.text }]);
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
      <div className={`fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 ${open ? '' : 'animate-gentle-float'}`}>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
          style={{ '--orb-color': accentColor }}
          className="ai-orb relative inline-flex items-center justify-center w-16 h-16 rounded-full text-white transition-transform hover:scale-105"
        >
          <span className="ai-orb-shine" aria-hidden="true" />
          {open ? <X size={22} className="relative z-10" /> : <Bot size={22} className="relative z-10" />}
        </button>
      </div>

      {open && (
        <div className={`fixed bottom-24 right-6 z-[60] w-[22rem] max-w-[calc(100vw-3rem)] h-[28rem] rounded-[1.75rem] shadow-2xl flex flex-col overflow-hidden ${themeClasses.card}`}>
          <div className={`px-5 py-4 flex items-center gap-3 border-b ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
            <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Bot size={18} />
            </div>
            <div>
              <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Ask about Vaibhav</p>
              <p className="text-[11px] text-emerald-400 uppercase tracking-widest font-bold">AI Assistant</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-emerald-500 text-white'
                      : `${themeClasses.subCard} ${isDarkMode ? 'text-gray-200' : 'text-neutral-700'}`
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${themeClasses.subCard} ${isDarkMode ? 'text-gray-400' : 'text-neutral-500'}`}>
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => respond(q)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-colors ${
                  isDarkMode ? 'border-white/10 text-gray-300 hover:border-emerald-500/50 hover:text-emerald-300' : 'border-neutral-200 text-neutral-600 hover:border-emerald-500/50 hover:text-emerald-600'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className={`px-4 py-3 flex items-center gap-2 border-t ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              disabled={isLoading}
              className={`flex-1 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/40 disabled:opacity-50 ${themeClasses.subCard} ${isDarkMode ? 'text-white placeholder:text-gray-500' : 'text-neutral-900 placeholder:text-neutral-400'}`}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send"
              className="w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
