"use client";
import React, { useEffect, useState } from 'react';
import { 
  Github, Linkedin, Mail, MapPin, 
  Cpu, Brain, Trophy, MessageSquare, Menu,
  ArrowUpRight, BookOpen, Sparkles, Dribbble, X, ExternalLink, 
  GraduationCap,  Briefcase, Folder, Award, ChevronRight, FileText, Quote, Sun, Moon, MessageCircle,
  Rocket, Layers, Bot, ShieldCheck
} from 'lucide-react';
import { IntroScreen } from './components/ui/intro-screen';
import TubesCursorBackground from './components/ui/tubes-cursor-background';
import LightBackground from './components/ui/light-background';
import ChatAgent from './components/ui/chat-agent';
import ServicesGrid from './components/ui/services-grid';
import RequestModal from './components/ui/request-modal';
import ProjectsGallery from './components/ui/projects-gallery';
import SkillsIcons from './components/ui/skills-icons';
import MobileApp, { useMobileSheet } from './components/ui/mobile-app';
import { SiAnthropic, SiPython } from "react-icons/si";
import { FaAward, FaSatellite, FaBuilding, FaWhatsapp } from "react-icons/fa";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [mindsetIndex, setMindsetIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const mobileSheet = useMobileSheet();
  const [projectModalActive, setProjectModalActive] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [request, setRequest] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [bgAccentColor, setBgAccentColor] = useState('#10b981');

  const photoSources = ['/profile.png', '/p1.jpeg', '/p2.jpeg'];
  const mindsetQuotes = [
    "\"Data is the new oil, but AI is the combustion engine.\"",
    "\"Building intelligent systems that solve real-world problems.\"",
    "\"Continuous learning is the minimum requirement for success in tech.\"",
    "\"Simplicity is the ultimate sophistication in software engineering.\""
  ];
  const sectionIds = {
    Home: 'home',
    Projects: 'projects',
    Ventures: 'ventures',
    Skills: 'skills',
    Expertise: 'expertise',
    Certificates: 'certificates',
    Experience: 'experience',
    Contact: 'contact',
  };

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (mobileSheet.sheet || projectModalActive) return undefined;
    const intervalId = window.setInterval(() => {
      setPhotoIndex((current) => (current + 1) % photoSources.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [mobileSheet.sheet, projectModalActive, photoSources.length]);

  useEffect(() => {
    if (mobileSheet.sheet || projectModalActive) return undefined;
    const mindsetInterval = window.setInterval(() => {
      setMindsetIndex((current) => (current + 1) % mindsetQuotes.length);
    }, 4000);
    return () => window.clearInterval(mindsetInterval);
  }, [mindsetQuotes.length, mobileSheet.sheet, projectModalActive]);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const sections = Object.entries(sectionIds);
    const handleScroll = () => {
      const entries = sections
        .map(([tab, id]) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return { tab, top: el.getBoundingClientRect().top };
        })
        .filter(Boolean);
      if (entries.length === 0) return;
      const nearest = entries.reduce((closest, entry) => {
        return Math.abs(entry.top - 120) < Math.abs(closest.top - 120) ? entry : closest;
      }, entries[0]);
      setActiveTab(nearest.tab);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileNavOpen(false);
    const target = document.getElementById(sectionIds[tab]);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Request form history entry for mobile so back button closes the form
  const openRequest = (payload) => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      const state = window.history.state || {};
      window.history.pushState({ ...state, requestModal: true, depth: (state.depth || 0) + 1 }, '');
    }
    setRequest(payload);
  };
  const closeRequest = () => {
    if (window.history.state?.requestModal) window.history.back();
    else setRequest(null);
  };
  useEffect(() => {
    const onPop = () => {
      if (!window.history.state?.requestModal) setRequest(null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Chat actions scroll on desktop, open mobile sheet on phone
  const handleChatNavigate = (sectionId) => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      setChatOpen(false);
      mobileSheet.open(sectionId === 'expertise' ? 'services' : sectionId);
      return;
    }
    scrollToSection(sectionId);
  };


  const experiences = [
    {
      title: 'AIML Intern',
      company: '3Skill Training',
      period: 'Sep 2026 – Nov 2026',
      badge: 'Internship',
      highlights: [
        'Completed intensive 2-month internship focusing on practical AI and Machine Learning engineering.',
        'Developed project-based deep learning, computer vision, and NLP pipelines aligned with industry expectations.',
        'Applied production ML practices, data workflows, and robust model evaluation methodologies.'
      ],
    },
    {
      title: 'Software Intern – Python & ML',
      company: 'R3 Systems India Pvt. Ltd.',
      period: 'Jan 2026 – Feb 2026',
      badge: 'Internship',
      highlights: [
        'Worked on real-world Python & ML application development workflows.',
        'Gained hands-on experience with production-level code and data pipelines.'
      ],
    },
    {
      title: 'B.E. – AI & Data Science',
      company: 'SNJB College of Engineering (NAAC A+), SPPU',
      period: '2023 – Expected 2027',
      badge: 'Current',
      highlights: [
        'Current CGPA: 8.6 / 10',
        'Academic focus in Machine Learning, NLP, and Data Engineering.'
      ],
    },
    {
      title: 'HSC – Science (PCM)',
      company: 'SPD Surana College, Chandwad',
      period: '2022',
      badge: 'Education',
      highlights: [
        'Percentage: 76%',
        'Completed Higher Secondary with a focus on Physics, Chemistry, and Mathematics.'
      ],
    },
    {
      title: 'SSC – Secondary School',
      company: 'Swami Vivekanand Vidyalay, Dighvad',
      period: '2020',
      badge: 'Education',
      highlights: [
        'Percentage: 88%',
        'Strong academic foundation with distinction in Mathematics and Science.'
      ],
    }
  ];

  const certificateFiles = [
    { title: 'AIML Internship – 3Skill Training', file: 'Certificate_INTERN264087_Vaibhav Bhoyate.pdf', type: 'pdf', icon: FaBuilding, color: '#10b981' },
    { title: 'AI Fluency: Framework and foundations', file: 'https://academy.claude.com/verify/338a596bfd9143e1a01999bf94144d10', type: 'link', icon: SiAnthropic, color: '#cc785c' },
    { title: 'Machine Learning – NPTEL', file: 'NPTEL certificate.pdf', type: 'pdf', icon: FaAward, color: '#f59e0b' },
    { title: 'AI/ML for Geodata Analytics – ISRO', file: 'ISRO_ML_Certificate.pdf', type: 'pdf', icon: FaSatellite, color: '#0284c7' },
    { title: 'Bharatiya Antariksh Hackathon 2026 – ISRO', file: 'ISRO_HAckthon.pdf', type: 'pdf', icon: FaSatellite, color: '#f97316' },
    { title: 'Fundamentals of Remote Sensing – NASA ARSET', file: 'Fundamentals of Remote Sensing.pdf', type: 'pdf', icon: FaSatellite, color: '#0b3d91' },
    { title: 'Python Programming', file: 'python.pdf', type: 'pdf', icon: SiPython, color: '#FFD43B' },
    { title: 'Software Intern – R3 Systems', file: 'Vaibhav Baban Bhoyate.pdf', type: 'pdf', icon: FaBuilding, color: '#a855f7' },
  ];

  const getCertificateBadgePath = (certificate) => {
    const badgeName = `${certificate.title}.png`;
    return `/certificates/${encodeURIComponent(badgeName)}`;
  };

  const themeClasses = {
    root: isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-neutral-50 text-neutral-900',
    nav: isDarkMode ? 'bg-[#121212]/70 backdrop-blur-xl border border-white/5 text-white' : 'bg-white/70 backdrop-blur-xl border border-neutral-200/70 text-neutral-900',
    card: isDarkMode ? 'bg-[#111111]/60 backdrop-blur-xl border border-white/10 text-white' : 'bg-white/70 backdrop-blur-xl border border-neutral-200/70 text-neutral-900',
    panel: isDarkMode ? 'bg-[#161616]/60 backdrop-blur-xl border border-white/5 text-white' : 'bg-white/50 backdrop-blur-xl border border-neutral-200/70 text-neutral-900',
    accentText: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
    mutedText: isDarkMode ? 'text-gray-400' : 'text-neutral-600',
    subCard: isDarkMode ? 'bg-[#1c1c1c]/60 backdrop-blur-md border border-white/10' : 'bg-neutral-100/70 backdrop-blur-md border border-neutral-300/70',
    navButtonText: isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-neutral-500 hover:text-neutral-700',
    accentButton: isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-neutral-900/10 hover:bg-neutral-800/10 text-neutral-900',
  };


  return (
    <>
      {showIntro && <IntroScreen onFinish={() => setShowIntro(false)} />}
      <div className={`min-h-screen ${themeClasses.root} font-sans selection:bg-emerald-500/30 overflow-x-hidden`}>
      {/* BACKGROUND — 3D cursor tubes strictly for desktop mouse; lightweight static background for mobile */}
      <div className={`hidden md:block transition-opacity duration-300 ${projectModalActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {isDarkMode ? <TubesCursorBackground onColorChange={setBgAccentColor} /> : <LightBackground />}
      </div>
      <div className="md:hidden">
        <div className={`fixed inset-0 z-0 pointer-events-none ${isDarkMode ? 'bg-[#080808]' : 'bg-neutral-50'}`} />
      </div>

      {/* PHONE — iOS-style home screen of bento tiles with sliding bottom sheets */}
      <MobileApp
        className="md:hidden"
        ready={!showIntro}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((current) => !current)}
        themeClasses={themeClasses}
        photo={photoSources[photoIndex]}
        photoKey={photoIndex}
        experiences={experiences}
        certificateFiles={certificateFiles}
        accentColor={isDarkMode ? bgAccentColor : '#10b981'}
        sheetNav={mobileSheet}
        onRequest={openRequest}
        onOpenChat={() => setChatOpen(true)}
      />

      {/* DESKTOP & TABLET */}
      <div className="hidden md:block">
      {/* FLOATING NAV — desktop */}
      <nav className={`hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-50 items-center gap-1.5 p-1.5 backdrop-blur-2xl rounded-full shadow-2xl ${themeClasses.nav}`}>
        {['Home', 'Projects', 'Ventures', 'Skills', 'Expertise', 'Certificates', 'Experience', 'Contact'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleNavClick(tab)}
            className={`px-4 lg:px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all whitespace-nowrap ${
              activeTab === tab
                ? isDarkMode
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'bg-neutral-900/10 text-neutral-900 shadow-inner'
                : themeClasses.navButtonText
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={() => setIsDarkMode((current) => !current)}
          className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition ${themeClasses.accentButton}`}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      {/* LEFT FLOATING SOCIAL DOCK — desktop only */}
      <aside
        aria-label="Social links"
        className={`hidden md:flex fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 p-2 sm:p-2.5 rounded-full shadow-2xl backdrop-blur-2xl transition-all ${themeClasses.nav}`}
      >
        <a
          href="https://github.com/vaibhavv-labs"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2.5 rounded-full transition-all ${
            isDarkMode 
              ? 'text-gray-400 hover:text-white hover:bg-white/10' 
              : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-900/10'
          }`}
          title="GitHub"
          aria-label="GitHub Profile"
        >
          <Github size={18} />
        </a>

        <a
          href="https://www.linkedin.com/in/vaibhav-bhoyate-6328802a9/"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2.5 rounded-full transition-all ${
            isDarkMode 
              ? 'text-gray-400 hover:text-[#0077b5] hover:bg-blue-500/10' 
              : 'text-neutral-500 hover:text-[#0077b5] hover:bg-blue-50'
          }`}
          title="LinkedIn"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={18} />
        </a>

        <a
          href="https://wa.me/918830269849"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2.5 rounded-full transition-all ${
            isDarkMode 
              ? 'text-gray-400 hover:text-[#25D366] hover:bg-[#25D366]/10' 
              : 'text-neutral-500 hover:text-[#25D366] hover:bg-[#25D366]/10'
          }`}
          title="WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={18} />
        </a>

        <a
          href="mailto:vaibhavbhoyate976@gmail.com"
          className={`p-2.5 rounded-full transition-all ${
            isDarkMode 
              ? 'text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10' 
              : 'text-neutral-500 hover:text-emerald-600 hover:bg-emerald-50'
          }`}
          title="Email"
          aria-label="Send Email"
        >
          <Mail size={18} />
        </a>
      </aside>

      <main id="home" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-20">
        
        {/* HERO GRID */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-24 items-start">
          
          {/* NAME CARD */}
          <div className={`md:col-span-4 md:col-start-1 md:row-span-1 min-h-[170px] rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_10px_45px_rgba(0,_0,_0,_0.35)] ${themeClasses.card}`}>
            <span aria-hidden="true" className={`pointer-events-none select-none absolute -right-4 -bottom-12 text-[9rem] font-black leading-none ${isDarkMode ? 'text-white/[0.04]' : 'text-neutral-900/[0.04]'}`}>
              VB
            </span>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-black mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AI & ML Engineer
              </span>
              <h1 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95] ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                VAIBHAV<br />
                <span className="text-gray-400">BHOYATE</span>
              </h1>
            </div>
            
            <div className={`relative z-10 mt-8 mb-6 h-px w-full bg-gradient-to-r from-emerald-500/70 ${isDarkMode ? 'via-white/10' : 'via-neutral-900/10'} to-transparent`} />
            
            <div className="relative z-10 flex flex-wrap gap-3">
              <a 
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all ${isDarkMode ? 'bg-emerald-400 text-black hover:bg-emerald-300' : 'bg-emerald-600 text-white hover:bg-emerald-700'} shadow-lg ${isDarkMode ? 'shadow-emerald-400/20' : 'shadow-emerald-600/20'}`}
              >
                <FileText size={12} /> Resume
              </a>
              <a 
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('Contact'); }}
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${isDarkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-neutral-900/20 text-neutral-900 hover:bg-neutral-900/5'}`}
              >
                Contact
              </a>
            </div>
          </div>

          {/* MAIN PHOTO */}
          <div className={`md:col-span-4 md:col-start-5 md:row-span-1 h-[320px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-[0_10px_50px_rgba(0,_0,_0,_0.3)] relative ${themeClasses.panel}`}>
            <img
              src={photoSources[photoIndex]}
              className="w-full h-full object-cover"
              alt={`Profile image ${photoIndex + 1}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          {/* CRAFT */}
          <div className={`md:col-span-4 md:col-start-9 md:row-span-1 md:min-h-[550px] rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,_0,_0,_0.3)] ${themeClasses.card}`}>
            <div>
              <h3 className={`text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                <Cpu size={22} className="text-emerald-400" /> CRAFT
              </h3>
              <p className={`${themeClasses.mutedText} text-sm leading-relaxed mb-8`}>
                Demonstrated expertise in <span className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} font-medium`}>artificial intelligence, machine learning, deep learning, and data science</span>, focused on building <span className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} font-medium`}>intelligent predictive systems</span>.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['AI', 'Machine Learning', 'Python', 'OpenCV'].map((t) => (
                <span key={t} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-300' : 'bg-neutral-100 border border-neutral-200 text-neutral-700'}`}>{t}</span>
              ))}
            </div>
          </div>

          {/* MINDSET */}
          <div className={`md:col-span-4 md:row-start-2 md:row-span-1 md:-mt-[260px] rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-between gap-6 shadow-[0_0_35px_rgba(255,_255,_255,_0.06)] ${themeClasses.card}`}>
            <div>
              <h3 className={`text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                <Brain size={22} className="text-emerald-400" /> PHILOSOPHY
              </h3>
              <p className={`${themeClasses.mutedText} text-sm leading-relaxed`}>
                Excellence is built through consistency. <span className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} font-medium italic`}>Engineering</span> has given me the discipline and logical foundation that I rely on to tackle complex AI problems.
              </p>
            </div>
            <div className={`rounded-[2rem] overflow-hidden shadow-inner ${themeClasses.subCard}`}>
              <img
                src="/philosophy.jpg"
                alt="Engineering Philosophy"
                className="w-full h-[220px] sm:h-[300px] object-cover"
              />
            </div>
          </div>

          {/* QUOTE */}
          <div className={`md:col-span-4 md:col-start-5 md:row-span-1 min-h-[170px] rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-center shadow-[0_0_35px_rgba(255,_255,_255,_0.06)] ${themeClasses.card}`}>
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400">
              <Quote size={28} />
            </div>
            <p className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-xl md:text-2xl font-black leading-tight`}>
              “Build with purpose. Lead with vision.”
            </p>
          </div>

          {/* LOCATION */}
          <div className={`md:col-span-4 md:col-start-9 md:row-start-2 min-h-[170px] rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_0_35px_rgba(255,_255,_255,_0.05)] ${themeClasses.card}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-10 -mt-10"></div>
            <img src="/manama.png" alt="Manama" className="absolute inset-0 w-full h-full object-cover opacity-15" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-emerald-400" size={22} />
                <span className={`text-[10px] uppercase tracking-[0.35em] ${themeClasses.mutedText}`}>Location</span>
              </div>
              <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight leading-[0.95] mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                Nashik<br />
                <span className="text-gray-400">India</span>
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-neutral-600'} text-[12px] md:text-[13px] uppercase font-semibold tracking-[0.25em]`}>
                20°16'38.2"N 74°14'52.5"E
              </p>
            </div>
          </div>
        </section>
        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-32 scroll-mt-28">
          <div className="text-center mb-16">
            <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${themeClasses.mutedText}`}>PORTFOLIO</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4">Featured <span className="text-emerald-500">projects</span></h2>
          </div>

          <ProjectsGallery isDarkMode={isDarkMode} themeClasses={themeClasses} onActiveChange={setProjectModalActive} />
        </section>

        {/* VENTURES & STARTUPS SECTION */}
        <section id="ventures" className="mb-32 scroll-mt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${themeClasses.mutedText}`}>
                FOUNDER &amp; CONSULTANCY
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4">
                Ventures &amp; <span className="text-emerald-500">Startups</span>
              </h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-neutral-600'} mt-4 max-w-2xl mx-auto text-sm sm:text-base`}>
                Commercial software platforms, AI consultancies, and digital agencies founded and engineered from the ground up.
              </p>
            </div>

            <div className={`relative overflow-hidden rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border ${themeClasses.card} shadow-[0_20px_70px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-emerald-500/30 group`}>
              {/* Ambient background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -mr-20 -mt-20 group-hover:bg-emerald-500/15 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 blur-[90px] rounded-full pointer-events-none -ml-10 -mb-10" />

              <div className="relative z-10">
                {/* Header row: Status badges & Category */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Founder &amp; Active Venture
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${themeClasses.subCard} ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                      <Rocket size={13} className="text-emerald-400" /> Live Platform
                    </span>
                  </div>

                  <span className={`text-[11px] font-bold uppercase tracking-widest ${themeClasses.mutedText}`}>
                    Full-Stack AI Studio
                  </span>
                </div>

                {/* Title & Role */}
                <div className="mb-4">
                  <h3 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'} leading-none`}>
                    Kryva Technologies
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-emerald-400 mt-3">
                    Founder &amp; Full-Stack / AI Engineer • AI Automation &amp; Custom Software Consultancy
                  </p>
                </div>

                {/* Brief Description */}
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-700'} text-sm sm:text-base leading-relaxed max-w-3xl font-medium mb-8`}>
                  An end-to-end software studio and AI consultancy delivering production-grade intelligent workflows, custom WhatsApp booking agents, background automation, and operational intelligence dashboards for modern digital-first businesses.
                </p>

                {/* Key Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  {/* Highlight 1 */}
                  <div className={`p-5 rounded-2xl ${themeClasses.subCard} border border-white/5 hover:border-emerald-500/20 transition-colors`}>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Layers size={16} />
                      </span>
                      <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>End-to-End Software Studio</h4>
                    </div>
                    <p className={`${themeClasses.mutedText} text-xs leading-relaxed`}>
                      Founded and engineered a modern digital consultancy platform delivering WhatsApp chatbots, background AI workflow automation, document processing (OCR), and operational forecasting dashboards.
                    </p>
                  </div>

                  {/* Highlight 2 */}
                  <div className={`p-5 rounded-2xl ${themeClasses.subCard} border border-white/5 hover:border-emerald-500/20 transition-colors`}>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Bot size={16} />
                      </span>
                      <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>In-Browser Bot Simulator</h4>
                    </div>
                    <p className={`${themeClasses.mutedText} text-xs leading-relaxed`}>
                      Built a real-time interactive WhatsApp booking simulator with natural intent parsing, simulated latency, and mobile touch-passthrough.
                    </p>
                  </div>

                  {/* Highlight 3 */}
                  <div className={`p-5 rounded-2xl ${themeClasses.subCard} border border-white/5 hover:border-emerald-500/20 transition-colors`}>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Cpu size={16} />
                      </span>
                      <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Hardware-Accelerated UI &amp; Micro-interactions</h4>
                    </div>
                    <p className={`${themeClasses.mutedText} text-xs leading-relaxed`}>
                      Implemented custom frosted-glass optical blur page transitions, 9:16 mobile chassis video player, and 100% responsive zero-layout-shift architecture.
                    </p>
                  </div>

                  {/* Highlight 4 */}
                  <div className={`p-5 rounded-2xl ${themeClasses.subCard} border border-white/5 hover:border-emerald-500/20 transition-colors`}>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <ShieldCheck size={16} />
                      </span>
                      <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Production Ready</h4>
                    </div>
                    <p className={`${themeClasses.mutedText} text-xs leading-relaxed`}>
                      Built with Next.js 14 App Router, dynamic JSON-LD SEO schemas, and enterprise honeypot lead protection.
                    </p>
                  </div>
                </div>

                {/* Footer row: Tech stack pills & CTA buttons */}
                <div className="pt-6 border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-[0.25em] ${themeClasses.mutedText} mb-3`}>
                      Technologies &amp; Architecture
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'PostgreSQL', 'Framer Motion'].map((tech) => (
                        <span key={tech} className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${themeClasses.subCard} ${isDarkMode ? 'text-gray-200' : 'text-neutral-700'} border border-white/5`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <a
                      href="https://kryva-technologies.netlify.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] active:scale-95"
                    >
                      Visit Live Site
                      <ArrowUpRight size={14} />
                    </a>
                    <a
                      href="https://github.com/vaibhavv-labs/kryva-technologies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-wider border transition-all active:scale-95 ${
                        isDarkMode 
                          ? 'bg-white/5 hover:bg-white/10 text-white border-white/15' 
                          : 'bg-neutral-900/5 hover:bg-neutral-900/10 text-neutral-900 border-neutral-300'
                      }`}
                    >
                      <Github size={14} />
                      View GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Skills Section */}
      <section id="skills" className="py-14 sm:py-20 px-4 sm:px-6 scroll-mt-28">
        <div className={`max-w-7xl mx-auto rounded-[2.5rem] p-6 sm:p-10 ${themeClasses.panel}`}>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-8 md:mb-12 uppercase tracking-wide ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Technical Skills</h2>
          <SkillsIcons isDarkMode={isDarkMode} themeClasses={themeClasses} />
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-14 sm:py-20 px-4 sm:px-6 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${themeClasses.mutedText}`}>AREAS OF EXPERTISE</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4">Technical <span className="text-emerald-500">Expertise</span></h2>
          </div>
          <ServicesGrid
            isDarkMode={isDarkMode}
            themeClasses={themeClasses}
            onRequestService={(serviceName) => openRequest({ type: 'service', serviceName })}
          />
        </div>
      </section>



      {/* Certificates Section */}
      <section id="certificates" className="py-14 sm:py-20 px-4 sm:px-6 scroll-mt-28">
        <div className={`max-w-7xl mx-auto rounded-[2.5rem] p-6 sm:p-10 ${themeClasses.panel}`}>
          <div className="text-center mb-12">
            <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${themeClasses.mutedText}`}>CREDENTIALS</p>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mt-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}><span className="text-emerald-500">Certifications</span></h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-700'} mt-4 max-w-2xl mx-auto`}>
              These certifications showcase my continuous learning progress in Artificial Intelligence, Machine Learning, Data Science, and Python development.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificateFiles.map((certificate) => (
              <div key={certificate.file} className={`overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.25)] ${themeClasses.card}`}>
                {certificate.type === 'image' ? (
                  <img src={`/certificates/${certificate.file}`} alt={certificate.title} className="h-64 w-full object-cover" />
                ) : (
                  <div className="flex h-64 w-full items-center justify-center bg-gradient-to-br from-neutral-900 via-[#06070d] to-neutral-800 p-6 group">
                    {certificate.icon ? (
                      <certificate.icon size={64} style={{ color: certificate.color }} className="group-hover:scale-110 transition-transform duration-300 drop-shadow-xl" />
                    ) : (
                      <Award size={64} className="text-emerald-500/30 group-hover:text-emerald-400 transition-colors" />
                    )}
                  </div>
                )}
                <div className="p-5">
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{certificate.title}</p>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-neutral-600'} text-xs mt-2`}>
                    {certificate.type === 'link' 
                      ? 'Click to view the verified credential online.'
                      : 'Click to open or download the certificate.'}
                  </p>
                  <a
                    href={certificate.type === 'link' ? certificate.file : `/certificates/${encodeURIComponent(certificate.file)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 hover:text-emerald-300"
                  >
                    View Certificate
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-14 sm:py-20 px-4 sm:px-6 scroll-mt-28">
        <div className={`max-w-7xl mx-auto rounded-[2.5rem] p-6 sm:p-10 ${themeClasses.panel}`}>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-8 md:mb-12 uppercase tracking-wide ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Experience & Education</h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className={`rounded-[2rem] p-6 ${themeClasses.card}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{exp.title}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'} w-fit`}>
                    {exp.badge}
                  </span>
                </div>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-neutral-600'} mb-4 text-sm uppercase tracking-wider`}>{exp.company} • {exp.period}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, hidx) => (
                    <li key={hidx} className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-700'} text-sm flex items-start gap-2`}>
                      <ChevronRight size={14} className="mt-1 text-emerald-500 min-w-[14px]" /> {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Contact Section */}
      <section id="contact" className="py-14 sm:py-20 px-4 sm:px-6 scroll-mt-28">
        <div className={`max-w-7xl mx-auto rounded-[2.5rem] p-6 sm:p-12 text-center ${themeClasses.panel}`}>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>LET'S WORK TOGETHER</h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-700'} mb-8 text-sm md:text-base max-w-2xl mx-auto leading-relaxed`}>
            Open to exciting opportunities in AI, computer vision, machine learning, and data science collaborations. Let's build the future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:vaibhavbhoyate976@gmail.com" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 sm:px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Mail size={18} /> Get In Touch
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 sm:px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2 border transition-colors ${
                isDarkMode 
                  ? 'bg-white/5 hover:bg-white/10 text-white border-white/10' 
                  : 'bg-neutral-900/5 hover:bg-neutral-900/10 text-neutral-900 border-neutral-300'
              }`}
            >
              <ExternalLink size={18} /> Review Resume
            </a>
            <a
              href="/resume.pdf"
              download
              className={`px-8 sm:px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2 border transition-colors ${
                isDarkMode 
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-white border-white/10' 
                  : 'bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-800'
              }`}
            >
              <FileText size={18} /> Download Resume
            </a>
          </div>

          <div className={`mt-14 pt-8 border-t ${isDarkMode ? 'border-white/5 text-gray-400' : 'border-neutral-200 text-neutral-600'} text-xs tracking-widest uppercase`}>
            <p className="tracking-normal text-sm lowercase mb-2 font-medium">vaibhavbhoyate976@gmail.com</p>
            <p className="text-[11px] font-semibold tracking-wider">© 2026 VAIBHAV BHOYATE.</p>
          </div>
        </div>
      </section>
    </main>
      </div>




      <ChatAgent
        isDarkMode={isDarkMode}
        themeClasses={themeClasses}
        onNavigate={handleChatNavigate}
        accentColor={isDarkMode ? bgAccentColor : '#10b981'}
        isOpen={chatOpen}
        onOpenChange={setChatOpen}
      />
      <RequestModal
        request={request}
        onClose={closeRequest}
        isDarkMode={isDarkMode}
        themeClasses={themeClasses}
      />
      </div>
    </>
  );
};

export default Portfolio;
