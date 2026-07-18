"use client";
import React, { useEffect, useState } from 'react';
import { 
  Github, Linkedin, Mail, MapPin, 
  Cpu, Brain, Trophy, MessageSquare, Menu,
  ArrowUpRight, BookOpen, Sparkles, Dribbble, X, ExternalLink, 
  GraduationCap,  Briefcase, Folder, Award, ChevronRight, FileText, Quote, Sun, Moon, Instagram, MessageCircle
} from 'lucide-react';
import { IntroScreen } from './components/ui/intro-screen';
import TubesCursorBackground from './components/ui/tubes-cursor-background';
import LightBackground from './components/ui/light-background';
import ChatAgent from './components/ui/chat-agent';
import ServicesGrid from './components/ui/services-grid';
import RequestModal from './components/ui/request-modal';
import ProjectsGallery from './components/ui/projects-gallery';
import SkillsIcons from './components/ui/skills-icons';
import { SiGooglecloud, SiMongodb, SiPython } from "react-icons/si";
import { FaAward, FaSatellite, FaBuilding, FaWhatsapp } from "react-icons/fa";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [mindsetIndex, setMindsetIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
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
    const intervalId = window.setInterval(() => {
      setPhotoIndex((current) => (current + 1) % photoSources.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const mindsetInterval = window.setInterval(() => {
      setMindsetIndex((current) => (current + 1) % mindsetQuotes.length);
    }, 4000);
    return () => window.clearInterval(mindsetInterval);
  }, [mindsetQuotes.length]);

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


  const experiences = [
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
    { title: 'Fundamentals of Remote Sensing', file: 'Fundamentals of Remote Sensing.pdf', type: 'pdf', icon: FaSatellite, color: '#0b3d91' },
    { title: 'GenAI Powered Data Analytics', file: 'completion_certificate.pdf', type: 'pdf', icon: FaAward, color: '#00a0e3' },
    { title: 'Intro to Generative AI Studio', file: 'Generative AI certificate.pdf', type: 'pdf', icon: SiGooglecloud, color: '#4285F4' },
    { title: 'Intro to Large Language Models', file: 'https://www.skills.google/public_profiles/bab33e78-8495-41fb-9ef7-b2c1b54b0e39/badges/23306522?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share', type: 'link', icon: SiGooglecloud, color: '#34A853' },
    { title: 'MongoDB & the Document Model', file: 'vaibhav-bhoyate-5866a860-f464-456c-ae99-a54318155005-certificate.pdf', type: 'pdf', icon: SiMongodb, color: '#47A248' },
    { title: 'Python Programming', file: 'python.pdf', type: 'pdf', icon: SiPython, color: '#FFD43B' },
    { title: 'Software Intern Certificate', file: 'Vaibhav Baban Bhoyate.pdf', type: 'pdf', icon: FaBuilding, color: '#a855f7' },
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
      {/* BACKGROUND */}
      {isDarkMode ? <TubesCursorBackground onColorChange={setBgAccentColor} /> : <LightBackground />}

      {/* FLOATING NAV — desktop */}
      <nav className={`hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-50 items-center gap-2 p-1.5 backdrop-blur-2xl rounded-full shadow-2xl ${themeClasses.nav}`}>
        {['Home', 'Projects', 'Skills', 'Expertise', 'Certificates', 'Experience', 'Contact'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleNavClick(tab)}
            className={`px-5 lg:px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all whitespace-nowrap ${
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

      {/* MOBILE NAV */}
      <nav className={`md:hidden fixed top-4 left-4 right-4 z-50 rounded-2xl shadow-2xl ${themeClasses.nav}`}>
        <div className="flex items-center justify-between px-4 py-3">
          <span className={`text-xs font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>VB</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode((current) => !current)}
              className={`inline-flex items-center justify-center rounded-full w-9 h-9 transition ${themeClasses.accentButton}`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              className={`inline-flex items-center justify-center rounded-full w-9 h-9 transition ${themeClasses.accentButton}`}
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileNavOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div className={`px-3 pb-3 flex flex-col gap-1 border-t ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
            {['Home', 'Projects', 'Skills', 'Expertise', 'Certificates', 'Experience', 'Contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleNavClick(tab)}
                className={`text-left px-4 py-2.5 mt-1 text-xs font-black uppercase tracking-[0.15em] rounded-xl transition-all ${
                  activeTab === tab ? 'bg-emerald-500/15 text-emerald-400' : themeClasses.navButtonText
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </nav>

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
                19.9975° N, 73.7898° E
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

          <ProjectsGallery isDarkMode={isDarkMode} themeClasses={themeClasses} />
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
            onRequestService={(serviceName) => setRequest({ type: 'service', serviceName })}
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
                    href={certificate.type === 'link' ? certificate.file : `/certificates/${certificate.file}`}
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
        <div className={`max-w-7xl mx-auto rounded-[2.5rem] p-6 sm:p-10 text-center ${themeClasses.panel}`}>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Let's Connect</h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-700'} mb-8 text-lg max-w-2xl mx-auto`}>I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:vaibhavbhoyate976@gmail.com" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Mail size={20} /> Get In Touch
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2 border border-white/10 shadow-lg shadow-white/10"
            >
              <ExternalLink size={20} /> Review Resume
            </a>
            <a
              href="/resume.pdf"
              download
              className="bg-neutral-800 hover:bg-neutral-700 text-white px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2 border border-emerald-500/20 shadow-lg shadow-emerald-500/20"
            >
              <FileText size={20} /> Download Resume
            </a>
          </div>
          
          {/* Social Links Block */}
          <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="mailto:vaibhavbhoyate976@gmail.com" className={`p-4 rounded-full transition-all border ${isDarkMode ? 'border-white/10 text-gray-400 hover:bg-white/5 hover:text-white' : 'border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'} shadow-sm`} title="Email">
              <Mail size={24} />
            </a>
            <a href="https://wa.me/918830269849" target="_blank" rel="noopener noreferrer" className={`p-4 rounded-full transition-all border ${isDarkMode ? 'border-white/10 text-gray-400 hover:bg-[#25D366]/20 hover:text-[#25D366] hover:border-[#25D366]/30' : 'border-neutral-200 text-neutral-500 hover:bg-[#25D366]/10 hover:text-[#25D366] hover:border-[#25D366]/20'} shadow-sm`} title="WhatsApp">
              <FaWhatsapp size={24} />
            </a>
            <a href="https://www.linkedin.com/in/vaibhav-bhoyate-6328802a9/" target="_blank" rel="noopener noreferrer" className={`p-4 rounded-full transition-all border ${isDarkMode ? 'border-white/10 text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30' : 'border-neutral-200 text-neutral-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'} shadow-sm`} title="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/vaibhavv-labs" target="_blank" rel="noopener noreferrer" className={`p-4 rounded-full transition-all border ${isDarkMode ? 'border-white/10 text-gray-400 hover:bg-white/10 hover:text-white' : 'border-neutral-200 text-neutral-500 hover:bg-neutral-200 hover:text-black'} shadow-sm`} title="GitHub">
              <Github size={24} />
            </a>
            <a href="https://www.instagram.com/va1bhav__09?igsh=MWpjNHBkNWl0bHhoZw==" target="_blank" rel="noopener noreferrer" className={`p-4 rounded-full transition-all border ${isDarkMode ? 'border-white/10 text-gray-400 hover:bg-pink-500/20 hover:text-pink-400 hover:border-pink-500/30' : 'border-neutral-200 text-neutral-500 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200'} shadow-sm`} title="Instagram">
              <Instagram size={24} />
            </a>
          </div>

          <div className={`mt-12 pt-8 border-t ${isDarkMode ? 'border-white/5 text-gray-500' : 'border-neutral-200 text-neutral-500'} text-xs tracking-widest uppercase`}>
            <div className="flex flex-col items-center gap-1 mb-4">
              <p className="tracking-normal text-sm font-semibold">Chandwad, Maharashtra, India</p>
              <p className="tracking-normal text-sm lowercase">vaibhavbhoyate976@gmail.com</p>
            </div>
            <p>© 2026 Vaibhav Bhoyate.</p>
          </div>
        </div>
      </section>
    </main>



      <ChatAgent
        isDarkMode={isDarkMode}
        themeClasses={themeClasses}
        onNavigate={scrollToSection}
        accentColor={isDarkMode ? bgAccentColor : '#10b981'}
      />
      <RequestModal
        request={request}
        onClose={() => setRequest(null)}
        isDarkMode={isDarkMode}
        themeClasses={themeClasses}
      />
      </div>
    </>
  );
};

export default Portfolio;
