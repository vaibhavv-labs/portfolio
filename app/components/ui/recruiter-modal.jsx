"use client";
import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Award,
  FileText,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  X,
  Sparkles,
  GraduationCap,
  MapPin,
  CheckCircle2,
  Rocket,
  Layers,
  Bot
} from 'lucide-react';
import { FaWhatsapp, FaAward, FaSatellite, FaBuilding } from 'react-icons/fa';
import { SiAnthropic, SiPython } from 'react-icons/si';
import { PROJECTS } from './projects-gallery';
import { SKILL_GROUPS } from './skills-icons';
import { SERVICES } from './services-grid';

const EXACT_EXPERIENCES = [
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
    badge: 'Education',
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

const EXACT_CERTIFICATES = [
  { title: 'AIML Internship – 3Skill Training', file: 'Certificate_INTERN264087_Vaibhav Bhoyate.pdf', type: 'pdf', icon: FaBuilding, color: '#10b981' },
  { title: 'AI Fluency: Framework and foundations', file: 'https://academy.claude.com/verify/338a596bfd9143e1a01999bf94144d10', type: 'link', icon: SiAnthropic, color: '#cc785c' },
  { title: 'Machine Learning – NPTEL', file: 'NPTEL certificate.pdf', type: 'pdf', icon: FaAward, color: '#f59e0b' },
  { title: 'AI/ML for Geodata Analytics – ISRO', file: 'ISRO_ML_Certificate.pdf', type: 'pdf', icon: FaSatellite, color: '#0284c7' },
  { title: 'Bharatiya Antariksh Hackathon 2026 – ISRO', file: 'ISRO_HAckthon.pdf', type: 'pdf', icon: FaSatellite, color: '#f97316' },
  { title: 'Fundamentals of Remote Sensing – NASA ARSET', file: 'Fundamentals of Remote Sensing.pdf', type: 'pdf', icon: FaSatellite, color: '#0b3d91' },
  { title: 'Python Programming', file: 'python.pdf', type: 'pdf', icon: SiPython, color: '#FFD43B' },
  { title: 'Software Intern – R3 Systems', file: 'Vaibhav Baban Bhoyate.pdf', type: 'pdf', icon: FaBuilding, color: '#a855f7' },
];

export default function RecruiterModal({
  isOpen,
  onClose,
  isDarkMode,
  bgAccentColor = '#10b981',
}) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'projects' | 'experience'

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('vaibhavbhoyate976@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadResume = () => {
    const a = document.createElement('a');
    a.href = '/resume.pdf';
    a.download = 'Vaibhav_Bhoyate_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Recruiter Executive Snapshot"
      className="fixed inset-0 z-[85] flex items-center justify-center p-2.5 sm:p-4 md:p-6"
    >
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* MODAL CARD */}
      <div
        className={`relative z-10 w-full max-w-3xl max-h-[94vh] sm:max-h-[92vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border backdrop-blur-2xl transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#121212]/95 border-white/10 text-white shadow-[0_25px_70px_rgba(0,0,0,0.85)]'
            : 'bg-white/95 border-neutral-200 text-neutral-900 shadow-[0_25px_70px_rgba(0,0,0,0.2)]'
        }`}
      >
        {/* HEADER BAR */}
        <div
          className={`flex items-start justify-between px-4 py-3.5 sm:px-6 sm:py-5 border-b shrink-0 ${
            isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-neutral-200 bg-neutral-50/70'
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div
              className="p-2.5 rounded-2xl shrink-0 mt-0.5 border"
              style={{
                backgroundColor: `${bgAccentColor}15`,
                borderColor: `${bgAccentColor}40`,
                color: bgAccentColor,
              }}
            >
              <Briefcase size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black tracking-tight">
                  Recruiter Fast Snapshot
                </h2>
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `${bgAccentColor}15`,
                    borderColor: `${bgAccentColor}35`,
                    color: bgAccentColor,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: bgAccentColor }} />
                  Seeking Roles &amp; Internships
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 flex items-center gap-2.5 flex-wrap">
                <span className="font-bold text-white">Vaibhav Bhoyate</span>
                <span>•</span>
                <span>AI &amp; ML Engineer</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">Founder @ Kryva Technologies</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin size={11} /> Nashik, Maharashtra, India (IST UTC+5:30)
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* STATS BENTO ROW — 100% REAL PORTFOLIO DATA */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 p-3 sm:p-5 border-b shrink-0 border-white/5 bg-white/[0.01]">
          <div className={`p-2.5 sm:p-3 rounded-2xl border ${isDarkMode ? 'bg-[#181818]/70 border-white/5' : 'bg-neutral-50 border-neutral-200'}`}>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">Academics</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg sm:text-xl font-black text-emerald-400">8.6</span>
              <span className="text-[10px] text-neutral-500">/ 10 CGPA</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-neutral-400 block truncate mt-0.5">B.E. AI &amp; DS @ SPPU</span>
          </div>

          <div className={`p-2.5 sm:p-3 rounded-2xl border ${isDarkMode ? 'bg-[#181818]/70 border-white/5' : 'bg-neutral-50 border-neutral-200'}`}>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">Internships</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg sm:text-xl font-black text-cyan-400">2</span>
              <span className="text-[10px] text-neutral-500">Technical</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-neutral-400 block truncate mt-0.5">3Skill &amp; R3 Systems</span>
          </div>

          <div className={`p-2.5 sm:p-3 rounded-2xl border ${isDarkMode ? 'bg-[#181818]/70 border-white/5' : 'bg-neutral-50 border-neutral-200'}`}>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">Venture</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg sm:text-xl font-black text-purple-400">Kryva</span>
              <span className="text-[10px] text-neutral-500">Tech</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-neutral-400 block truncate mt-0.5">Founder &amp; Lead AI Eng.</span>
          </div>

          <div className={`p-2.5 sm:p-3 rounded-2xl border ${isDarkMode ? 'bg-[#181818]/70 border-white/5' : 'bg-neutral-50 border-neutral-200'}`}>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">Credentials</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg sm:text-xl font-black text-amber-400">ISRO</span>
              <span className="text-[10px] text-neutral-500">&amp; NASA</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-neutral-400 block truncate mt-0.5">Hackathon &amp; NPTEL</span>
          </div>
        </div>

        {/* TABS */}
        <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 pt-2.5 shrink-0 border-b overflow-x-auto scrollbar-none ${isDarkMode ? 'border-white/5' : 'border-neutral-200'}`}>
          {[
            { id: 'summary', label: 'Overview & Skills' },
            { id: 'projects', label: `Projects (${PROJECTS.length})` },
            { id: 'experience', label: 'Experience & Certifications' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 px-2 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? isDarkMode
                    ? 'border-emerald-400 text-white'
                    : 'border-emerald-600 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5">
          {activeTab === 'summary' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* FOUNDER & VENTURE SPOTLIGHT */}
              <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#161616]/70 border-white/5' : 'bg-neutral-50 border-neutral-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Rocket size={14} />
                    Founder &amp; Lead AI Engineer @ Kryva Technologies
                  </h3>
                  <a
                    href="https://kryvatechnologies.is-a.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Visit Studio</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Founded Kryva Technologies as a modern software studio and AI consultancy. Architecting custom WhatsApp conversational agents, background workflow automation, document intelligence (OCR), and bespoke high-throughput operational software for businesses.
                </p>
              </div>

              {/* SKILLS - DIRECT FROM SKILLS_ICONS */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                  <Layers size={14} style={{ color: bgAccentColor }} />
                  Core Technical Skills (From Portfolio)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SKILL_GROUPS.map((group) => (
                    <div
                      key={group.category}
                      className={`p-3.5 rounded-xl border ${isDarkMode ? 'bg-[#181818]/60 border-white/5' : 'bg-neutral-50 border-neutral-200'}`}
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-400 block mb-2">
                        {group.category}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => {
                          const Icon = item.Icon;
                          return (
                            <span
                              key={item.name}
                              className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-200"
                            >
                              <Icon size={12} className="text-neutral-400" />
                              <span>{item.name}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* EXPERTISE SERVICES - DIRECT FROM SERVICES_GRID */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-1.5">
                  <Bot size={14} style={{ color: bgAccentColor }} />
                  Core Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((srv) => {
                    const Icon = srv.icon;
                    return (
                      <span
                        key={srv.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-neutral-200"
                      >
                        <Icon size={13} className="text-emerald-400" />
                        <span>{srv.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* AVAILABILITY BANNER */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Open for <strong>AI/ML &amp; Software Engineering Internships / Roles</strong> (Graduation: 2027)</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="font-mono text-[11px] text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'vaibhavbhoyate976@gmail.com'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#161616]/70 border-white/5' : 'bg-neutral-50 border-neutral-200'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider font-bold block">
                        {proj.category}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{proj.title}</h4>
                      <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {proj.tags?.map((t) => (
                          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 transition"
                        >
                          <ExternalLink size={12} /> Live
                        </a>
                      )}
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white transition"
                          title="View on GitHub"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* EXPERIENCES & INTERNSHIPS (ALL 5 EXACT ITEMS FROM PAGE) */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                  <Briefcase size={14} style={{ color: bgAccentColor }} />
                  Experience &amp; Education History
                </h3>
                <div className="space-y-3">
                  {EXACT_EXPERIENCES.map((exp) => (
                    <div
                      key={exp.title + exp.period}
                      className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#161616]/70 border-white/5' : 'bg-neutral-50 border-neutral-200'}`}
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{exp.title}</h4>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            exp.badge === 'Internship'
                              ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                              : 'border-white/10 text-neutral-400 bg-white/5'
                          }`}>
                            {exp.badge}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-neutral-500">{exp.period}</span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5 font-medium">{exp.company}</p>
                      <ul className="mt-2 space-y-1">
                        {exp.highlights?.map((h, i) => (
                          <li key={i} className="text-xs text-neutral-300 flex items-start gap-2">
                            <span className="text-emerald-400 mt-1">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* CERTIFICATIONS (EXACT 8 FROM PORTFOLIO) */}
              <div className="pt-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                  <Award size={14} className="text-amber-400" />
                  Verified Certifications ({EXACT_CERTIFICATES.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {EXACT_CERTIFICATES.map((cert) => {
                    const Icon = cert.icon;
                    const isLink = cert.type === 'link';
                    const targetUrl = isLink ? cert.file : `/certificates/${encodeURIComponent(cert.title + '.png')}`;
                    return (
                      <a
                        key={cert.title}
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center justify-between p-3 rounded-xl border transition-all ${
                          isDarkMode
                            ? 'bg-[#181818]/60 border-white/5 hover:border-white/20 hover:bg-white/10'
                            : 'bg-neutral-50 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${cert.color}20`, color: cert.color }}
                          >
                            <Icon size={14} />
                          </div>
                          <span className="text-xs font-medium text-neutral-300 group-hover:text-white truncate">
                            {cert.title}
                          </span>
                        </div>
                        <ExternalLink size={12} className="text-neutral-500 group-hover:text-white shrink-0 ml-2" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* STICKY FOOTER ACTIONS */}
        <div
          className={`flex items-center justify-between gap-3 px-5 py-4 border-t shrink-0 flex-wrap ${
            isDarkMode ? 'border-white/10 bg-[#0d0d0d]' : 'border-neutral-200 bg-neutral-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-black hover:bg-neutral-200 transition shadow"
            >
              <Download size={14} />
              <span>Download Resume</span>
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-white/10 hover:bg-white/10 text-white transition"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Review PDF</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono border border-white/10 hover:bg-white/10 text-neutral-300 hover:text-white transition"
              title="Copy Email Address"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Email'}</span>
            </button>

            <a
              href="https://wa.me/918830269849"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-white/10 hover:bg-[#25D366]/20 text-neutral-300 hover:text-[#25D366] transition"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp size={16} />
            </a>

            <a
              href="https://www.linkedin.com/in/vaibhav-bhoyate-6328802a9/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-white/10 hover:bg-[#0077b5]/20 text-neutral-300 hover:text-[#0077b5] transition"
              title="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
