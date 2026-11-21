"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Terminal,
  Command,
  CornerDownLeft,
  ArrowRight,
  Sun,
  Moon,
  Palette,
  Bot,
  FileText,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Folder,
  Rocket,
  Layers,
  Cpu,
  Award,
  Briefcase,
  ShieldCheck,
  Sparkles,
  Link2,
  X
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function CommandPalette({
  isOpen,
  onClose,
  isDarkMode,
  onToggleTheme,
  onCycleColors,
  onNavigate,
  onOpenChat,
  onOpenRequest,
  onOpenRecruiterMode,
  bgAccentColor = '#10b981',
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Define all available commands grouped by category
  const allCommands = useMemo(() => {
    return [
      // NAVIGATION
      {
        id: 'nav-home',
        category: 'Navigation',
        title: 'Home',
        subtitle: 'Overview & hero introduction',
        icon: Rocket,
        keywords: ['home', 'start', 'top', 'intro', 'overview'],
        action: () => onNavigate?.('Home'),
      },
      {
        id: 'nav-projects',
        category: 'Navigation',
        title: 'Projects',
        subtitle: 'Explore full-stack & AI projects',
        icon: Folder,
        keywords: ['projects', 'work', 'apps', 'portfolio', 'code', 'abp', 'sentinel'],
        action: () => onNavigate?.('Projects'),
      },
      {
        id: 'nav-ventures',
        category: 'Navigation',
        title: 'Ventures',
        subtitle: 'Startup initiatives & research projects',
        icon: Layers,
        keywords: ['ventures', 'startups', 'initiatives', 'ideas', 'business'],
        action: () => onNavigate?.('Ventures'),
      },
      {
        id: 'nav-skills',
        category: 'Navigation',
        title: 'Skills',
        subtitle: 'Python, ML, Frameworks & Core tech stack',
        icon: Cpu,
        keywords: ['skills', 'tech', 'stack', 'python', 'pytorch', 'nextjs', 'tools'],
        action: () => onNavigate?.('Skills'),
      },
      {
        id: 'nav-github-activity',
        category: 'Navigation',
        title: 'GitHub Streak & Contributions',
        subtitle: 'Live 1,254+ commits & streak heatmap (@vaibhavv-labs)',
        icon: Github,
        keywords: ['github', 'streak', 'contributions', 'commits', 'activity', 'code', 'open source'],
        action: () => onNavigate?.('activity'),
      },
      {
        id: 'nav-expertise',
        category: 'Navigation',
        title: 'Expertise',
        subtitle: 'Core competencies & domain expertise',
        icon: ShieldCheck,
        keywords: ['expertise', 'capabilities', 'specialization', 'domains'],
        action: () => onNavigate?.('Expertise'),
      },
      {
        id: 'nav-certificates',
        category: 'Navigation',
        title: 'Certificates',
        subtitle: 'ISRO, NASA, NPTEL & Industry credentials',
        icon: Award,
        keywords: ['certificates', 'isro', 'nasa', 'nptel', 'credentials', 'awards'],
        action: () => onNavigate?.('Certificates'),
      },
      {
        id: 'nav-experience',
        category: 'Navigation',
        title: 'Experience & Education',
        subtitle: 'Internship history & academic background',
        icon: Briefcase,
        keywords: ['experience', 'internship', 'education', 'college', 'sppu', 'r3'],
        action: () => onNavigate?.('Experience'),
      },
      {
        id: 'nav-contact',
        category: 'Navigation',
        title: 'Contact',
        subtitle: 'Get in touch & collaborate',
        icon: Mail,
        keywords: ['contact', 'email', 'touch', 'message', 'reach', 'collaborate'],
        action: () => onNavigate?.('Contact'),
      },

      // ACTIONS
      {
        id: 'action-recruiter-mode',
        category: 'Actions',
        title: 'Open Recruiter Mode',
        subtitle: '60-second executive summary & fast-track hire overview',
        icon: Briefcase,
        keywords: ['recruiter', 'hire', 'resume', 'summary', 'overview', 'hr', 'snapshot', 'fast', 'stats'],
        action: () => onOpenRecruiterMode?.(),
      },
      {
        id: 'action-theme',
        category: 'Actions',
        title: isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        subtitle: 'Toggle portfolio color theme',
        icon: isDarkMode ? Sun : Moon,
        keywords: ['theme', 'mode', 'dark', 'light', 'toggle', 'color'],
        action: () => onToggleTheme?.(),
      },
      {
        id: 'action-cycle-palette',
        category: 'Actions',
        title: 'Cycle 3D Cursor Theme',
        subtitle: 'Morph 3D neon tubes & light reflections',
        icon: Palette,
        keywords: ['palette', 'cursor', 'tubes', 'neon', 'morph', 'colors', 'randomize', '3d'],
        action: () => onCycleColors?.(),
      },
      {
        id: 'action-ai-chat',
        category: 'Actions',
        title: 'Ask AI Assistant',
        subtitle: 'Chat live with Vaibhav’s trained AI agent',
        icon: Bot,
        keywords: ['chat', 'ai', 'assistant', 'bot', 'ask', 'question', 'talk'],
        action: () => onOpenChat?.(),
      },
      {
        id: 'action-book-call',
        category: 'Actions',
        title: 'Book a Meeting / Service Request',
        subtitle: 'Send direct consultation or freelance request',
        icon: Sparkles,
        keywords: ['book', 'meeting', 'service', 'hire', 'call', 'schedule', 'freelance'],
        action: () => onOpenRequest?.({ type: 'booking', date: 'Upcoming week' }),
      },

      // PROJECTS QUICK LINKS
      {
        id: 'project-abp',
        category: 'Projects',
        title: 'Autonomous Business Platform (ABP)',
        subtitle: 'Autonomous AI SaaS • Live Demo',
        icon: ExternalLink,
        keywords: ['abp', 'autonomous', 'business', 'saas', 'marketing', 'otto'],
        action: () => window.open('https://autonomous-business-platform-dskp.vercel.app/', '_blank'),
      },
      {
        id: 'project-logiccoach',
        category: 'Projects',
        title: 'Logic Coach',
        subtitle: 'AI DSA & Code Complexity Learning Platform',
        icon: ExternalLink,
        keywords: ['logic', 'coach', 'dsa', 'education', 'gemini', 'code'],
        action: () => window.open('https://logic-coach.vercel.app/', '_blank'),
      },
      {
        id: 'project-codesentinel',
        category: 'Projects',
        title: 'CodeSentinel AI',
        subtitle: 'AI Code Security & Vulnerability Fixer',
        icon: ExternalLink,
        keywords: ['codesentinel', 'sentinel', 'security', 'codebert', 'vulnerability'],
        action: () => window.open('https://codesentinel-app.vercel.app/', '_blank'),
      },

      // SOCIAL & LINKS
      {
        id: 'link-resume-view',
        category: 'Links & Documents',
        title: 'Review Resume',
        subtitle: 'Open Vaibhav’s resume in a new tab',
        icon: ExternalLink,
        keywords: ['resume', 'cv', 'pdf', 'view', 'read'],
        action: () => window.open('/resume.pdf', '_blank'),
      },
      {
        id: 'link-resume-download',
        category: 'Links & Documents',
        title: 'Download Resume (PDF)',
        subtitle: 'Direct PDF download',
        icon: FileText,
        keywords: ['download', 'resume', 'cv', 'pdf'],
        action: () => {
          const a = document.createElement('a');
          a.href = '/resume.pdf';
          a.download = 'Vaibhav_Bhoyate_Resume.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        },
      },
      {
        id: 'link-github',
        category: 'Links & Documents',
        title: 'GitHub Profile',
        subtitle: 'github.com/vaibhavv-labs',
        icon: Github,
        keywords: ['github', 'git', 'repos', 'code', 'open source'],
        action: () => window.open('https://github.com/vaibhavv-labs', '_blank'),
      },
      {
        id: 'link-linkedin',
        category: 'Links & Documents',
        title: 'LinkedIn Profile',
        subtitle: 'Connect with Vaibhav on LinkedIn',
        icon: Linkedin,
        keywords: ['linkedin', 'social', 'network', 'connect'],
        action: () => window.open('https://www.linkedin.com/in/vaibhav-bhoyate-6328802a9/', '_blank'),
      },
      {
        id: 'link-linktree',
        category: 'Links & Documents',
        title: 'Linktree Profile',
        subtitle: 'linktr.ee/vaibhav_bhoyate_',
        icon: Link2,
        keywords: ['linktree', 'links', 'bio', 'social', 'tree', 'all links'],
        action: () => window.open('https://linktr.ee/vaibhav_bhoyate_', '_blank'),
      },
      {
        id: 'link-whatsapp',
        category: 'Links & Documents',
        title: 'Chat on WhatsApp',
        subtitle: '+91 8830269849',
        icon: FaWhatsapp,
        keywords: ['whatsapp', 'wa', 'chat', 'direct', 'phone', 'call'],
        action: () => window.open('https://wa.me/918830269849', '_blank'),
      },
      {
        id: 'link-email',
        category: 'Links & Documents',
        title: 'Send Direct Email',
        subtitle: 'vaibhavbhoyate976@gmail.com',
        icon: Mail,
        keywords: ['email', 'mail', 'gmail', 'write', 'letter'],
        action: () => window.location.href = 'mailto:vaibhavbhoyate976@gmail.com',
      },
    ];
  }, [isDarkMode, onNavigate, onToggleTheme, onCycleColors, onOpenChat, onOpenRequest, onOpenRecruiterMode]);

  // Filter commands based on search query
  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCommands;

    return allCommands.filter((cmd) => {
      const matchTitle = cmd.title.toLowerCase().includes(q);
      const matchSubtitle = cmd.subtitle?.toLowerCase().includes(q);
      const matchCategory = cmd.category.toLowerCase().includes(q);
      const matchKeywords = cmd.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchCategory || matchKeywords;
    });
  }, [allCommands, query]);

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard navigation inside command palette
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
        return;
      }

      if (filteredCommands.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected) {
          selected.action();
          onClose?.();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector('[data-selected="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-[90] flex items-start justify-center pt-10 sm:pt-24 px-3 sm:px-4"
    >
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* PALETTE MODAL */}
      <div
        className={`relative z-10 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border backdrop-blur-2xl transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#121212]/95 border-white/10 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]'
            : 'bg-white/95 border-neutral-200 text-neutral-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)]'
        }`}
      >
        {/* SEARCH BAR HEADER */}
        <div className={`flex items-center gap-3 px-4 py-3.5 border-b ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
          <Terminal size={18} className="shrink-0" style={{ color: bgAccentColor }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section... (Ctrl+K)"
            className={`w-full bg-transparent text-sm font-medium outline-none placeholder:text-neutral-500 ${
              isDarkMode ? 'text-white' : 'text-neutral-900'
            }`}
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className={`p-1 rounded-md text-neutral-400 hover:text-white transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-neutral-100'}`}
              aria-label="Clear query"
            >
              <X size={14} />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 shrink-0 select-none">
              <kbd className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${isDarkMode ? 'bg-white/5 border-white/10 text-neutral-400' : 'bg-neutral-100 border-neutral-300 text-neutral-500'}`}>
                ESC
              </kbd>
            </div>
          )}
        </div>

        {/* COMMANDS LIST */}
        <div
          ref={listRef}
          className="max-h-[380px] overflow-y-auto p-2 scroll-smooth divide-y-0"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-12 px-4 text-center">
              <Command size={32} className="mx-auto mb-3 text-neutral-500 opacity-50" />
              <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                No commands matching &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Try searching for &quot;Projects&quot;, &quot;Theme&quot;, &quot;Resume&quot;, or &quot;Contact&quot;.
              </p>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = cmd.icon;
              return (
                <div
                  key={cmd.id}
                  data-selected={isSelected}
                  onClick={() => {
                    cmd.action();
                    onClose?.();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'bg-neutral-900/10 text-neutral-900 shadow-sm'
                      : isDarkMode
                      ? 'text-neutral-300 hover:bg-white/5'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  style={isSelected ? { borderLeft: `3px solid ${bgAccentColor}` } : { borderLeft: '3px solid transparent' }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 transition-colors ${
                        isSelected
                          ? isDarkMode
                            ? 'bg-white/15'
                            : 'bg-neutral-900/10'
                          : isDarkMode
                          ? 'bg-white/5 text-neutral-400 group-hover:text-white'
                          : 'bg-neutral-100 text-neutral-500 group-hover:text-neutral-900'
                      }`}
                    >
                      <Icon size={16} style={isSelected ? { color: bgAccentColor } : undefined} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold truncate">
                          {cmd.title}
                        </span>
                        <span className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border shrink-0 ${
                          isDarkMode ? 'border-white/10 text-neutral-400 bg-white/5' : 'border-neutral-200 text-neutral-500 bg-neutral-100'
                        }`}>
                          {cmd.category}
                        </span>
                      </div>
                      {cmd.subtitle && (
                        <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                          {cmd.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono opacity-80" style={{ color: bgAccentColor }}>
                        <span>Jump</span>
                        <CornerDownLeft size={11} />
                      </span>
                    ) : (
                      <ArrowRight size={13} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* PALETTE FOOTER */}
        <div className={`px-4 py-2.5 border-t flex items-center justify-between text-[11px] text-neutral-500 select-none ${
          isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-neutral-200 bg-neutral-50/50'
        }`}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className={`px-1.5 py-0.5 rounded font-mono text-[9px] border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-neutral-200 border-neutral-300'}`}>↑</kbd>
              <kbd className={`px-1.5 py-0.5 rounded font-mono text-[9px] border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-neutral-200 border-neutral-300'}`}>↓</kbd>
              <span className="ml-0.5">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className={`px-1.5 py-0.5 rounded font-mono text-[9px] border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-neutral-200 border-neutral-300'}`}>↵</kbd>
              <span className="ml-0.5">Select</span>
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <kbd className={`px-1.5 py-0.5 rounded font-mono text-[9px] border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-neutral-200 border-neutral-300'}`}>ESC</kbd>
              <span className="ml-0.5">Close</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] opacity-75">
            <Command size={11} />
            <span>Developer Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
}
