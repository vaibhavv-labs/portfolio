"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  X, ChevronLeft, ArrowUpRight, Sun, Moon, Briefcase, Award,
  Github, Linkedin, Mail, FileText, Download, ExternalLink,
  MapPin, Cpu, Brain, Quote, Send, Bot
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { PROJECTS } from './projects-gallery';
import SkillsIcons, { SKILL_GROUPS } from './skills-icons';
import ServicesGrid, { SERVICES } from './services-grid';

const EMAIL = 'vaibhavbhoyate976@gmail.com';
const RESUME = '/resume.pdf';
const SOCIALS = [
  { href: 'https://github.com/vaibhavv-labs', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/vaibhav-bhoyate-6328802a9/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://wa.me/918830269849', label: 'WhatsApp', Icon: FaWhatsapp },
];

const ALL_SKILLS = SKILL_GROUPS.flatMap((g) => g.items);
const TILE_SKILLS = ['Python', 'Scikit-Learn', 'Pandas', 'NumPy']
  .map((name) => ALL_SKILLS.find((s) => s.name === name))
  .filter(Boolean);

const SHEET_TITLES = {
  about: 'About',
  projects: 'Projects',
  experience: 'Experience & Education',
  skills: 'Technical Skills',
  services: 'Areas of Expertise',
  certificates: 'Certifications',
  contact: 'Contact',
};

// Mirror sheets into browser history for swipe-back and native back-button dismissal
export function useMobileSheet() {
  const [sheet, setSheet] = useState(null);

  useEffect(() => {
    const onPop = () => setSheet(window.history.state?.mobileSheet ?? null);
    const desktop = window.matchMedia('(min-width: 768px)');
    const onViewport = () => desktop.matches && setSheet(null);
    window.addEventListener('popstate', onPop);
    desktop.addEventListener('change', onViewport);
    return () => {
      window.removeEventListener('popstate', onPop);
      desktop.removeEventListener('change', onViewport);
    };
  }, []);

  const open = useCallback((id) => {
    const depth = (window.history.state?.mobileSheet ? window.history.state.depth : 0) + 1;
    window.history.pushState({ mobileSheet: id, depth }, '');
    setSheet(id);
  }, []);

  const back = useCallback(() => window.history.back(), []);

  const close = useCallback(() => {
    const depth = window.history.state?.depth;
    if (depth) window.history.go(-depth);
    else setSheet(null);
  }, []);

  return { sheet, open, back, close };
}

function SheetFrame({ open, title, contentKey, onClose, onBack, isDarkMode, children }) {
  const [rendered, setRendered] = useState(false);
  const [shown, setShown] = useState(false);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (open) {
      setDrag(0);
      setRendered(true);
      let inner;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    setShown(false);
    const timer = setTimeout(() => setRendered(false), 380);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      const dialogs = document.querySelectorAll('[role="dialog"][aria-modal="true"]');
      if (dialogs[dialogs.length - 1] === rootRef.current) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!rendered) return null;

  const onPointerDown = (e) => {
    if (e.target.closest('button')) return;
    startY.current = e.clientY;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (startY.current === null) return;
    setDrag(Math.max(0, e.clientY - startY.current));
  };
  const onPointerUp = () => {
    if (startY.current === null) return;
    startY.current = null;
    setDragging(false);
    if (drag > 110) onClose();
    else setDrag(0);
  };

  const hairline = isDarkMode ? 'border-white/10' : 'border-neutral-200';

  return (
    <div ref={rootRef} className="fixed inset-0 z-[75]" role="dialog" aria-modal="true" aria-label={title}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/75 touch-none transition-opacity duration-300 ${shown ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        style={{
          transform: shown ? `translate3d(0, ${drag}px, 0)` : 'translate3d(0, 100%, 0)',
          transition: dragging ? 'none' : 'transform 0.42s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        className={`absolute inset-x-0 bottom-0 top-[max(0.75rem,env(safe-area-inset-top))] flex flex-col rounded-t-[2rem] border-t overflow-hidden shadow-[0_-24px_60px_rgba(0,0,0,0.55)] ${hairline} ${isDarkMode ? 'bg-[#0c0c0c] text-white' : 'bg-neutral-50 text-neutral-900'}`}
      >
        <header
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`shrink-0 px-3 pt-2 pb-2 touch-none select-none border-b ${hairline}`}
        >
          <div className={`mx-auto mb-1.5 h-1.5 w-11 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-neutral-300'}`} />
          <div className="flex items-center justify-between gap-2">
            {onBack ? (
              <button
                onClick={onBack}
                aria-label="Back"
                className={`w-11 h-11 inline-flex items-center justify-center rounded-full ${isDarkMode ? 'bg-white/5 active:bg-white/15' : 'bg-neutral-900/5 active:bg-neutral-900/10'}`}
              >
                <ChevronLeft size={20} />
              </button>
            ) : (
              <span className="w-11" />
            )}
            <h2 className="flex-1 text-center text-[11px] font-black uppercase tracking-[0.25em] truncate">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className={`w-11 h-11 inline-flex items-center justify-center rounded-full ${isDarkMode ? 'bg-white/5 active:bg-white/15' : 'bg-neutral-900/5 active:bg-neutral-900/10'}`}
            >
              <X size={18} />
            </button>
          </div>
        </header>
        <div key={contentKey} className="flex-1 overflow-y-auto overscroll-contain px-4 pt-5 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
          {children}
        </div>
      </div>
    </div>
  );
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Tile({ index, ready, span, className = '', onClick, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{ '--i': index }}
      className={`group relative overflow-hidden rounded-[1.75rem] text-left transition-transform duration-200 active:scale-[0.97] ${span ? 'col-span-2' : ''} ${ready ? 'tile-in' : 'opacity-0'} ${className}`}
    >
      {children}
    </button>
  );
}

function Eyebrow({ children, className = '' }) {
  return <p className={`text-[9px] font-black uppercase tracking-[0.28em] ${className}`}>{children}</p>;
}

function Corner({ tone = 'light' }) {
  return (
    <span className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur ${tone === 'light' ? 'bg-black/35 text-white' : 'bg-emerald-500/10 text-emerald-400'}`}>
      <ArrowUpRight size={15} />
    </span>
  );
}

const MobileProjectMedia = React.memo(function MobileProjectMedia({ project }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [project?.id]);

  if (!project?.video) {
    return (
      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/40 mb-4 border border-white/10 shadow-lg">
        <img src={project?.image} alt={project?.title} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black relative mb-4 border border-white/10 shadow-xl">
      <video
        ref={(el) => {
          videoRef.current = el;
          if (el) {
            el.muted = true;
            el.defaultMuted = true;
          }
        }}
        key={project.id}
        src={project.video}
        poster={project.image}
        autoPlay
        loop
        muted
        defaultMuted
        controls
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        preload="auto"
        className="w-full h-full object-contain"
      />
    </div>
  );
}, (prev, next) => prev.project?.id === next.project?.id);

export default function MobileApp({
  className = '',
  ready = true,
  isDarkMode,
  onToggleTheme,
  themeClasses,
  photo,
  photoKey,
  experiences,
  certificateFiles,
  accentColor = '#10b981',
  sheetNav,
  onRequest,
  onOpenChat,
}) {
  const internalSheet = useMobileSheet();
  const { sheet, open, back, close } = sheetNav ?? internalSheet;
  const strong = isDarkMode ? 'text-white' : 'text-neutral-900';
  const soft = isDarkMode ? 'text-gray-400' : 'text-neutral-600';

  const lastSheet = useRef(null);
  const lastDepth = useRef(0);
  if (sheet) {
    lastSheet.current = sheet;
    lastDepth.current = (typeof window !== 'undefined' ? window.history.state?.depth : 1) ?? 1;
  }
  const shownSheet = sheet ?? lastSheet.current;

  // Projects tile auto-cycles
  const [projectIndex, setProjectIndex] = useState(0);
  const cycled = useRef(false);
  useEffect(() => {
    if (!ready || sheet || prefersReducedMotion()) return undefined;
    const timer = window.setInterval(() => {
      cycled.current = true;
      setProjectIndex((i) => (i + 1) % PROJECTS.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [ready, sheet]);

  const count = PROJECTS.length;
  const projectLayers = PROJECTS.map((p, i) => ({
    project: p,
    current: i === projectIndex,
    previous: cycled.current && i === (projectIndex - 1 + count) % count,
    next: i === (projectIndex + 1) % count,
  })).filter((layer) => layer.current || layer.previous || layer.next);

  const project = shownSheet?.startsWith('project:') ? PROJECTS.find((p) => `project:${p.id}` === shownSheet) : null;
  const currentExp = experiences?.[0];

  const renderSheet = () => {
    if (project) {
      return (
        <article className="space-y-4">
          <MobileProjectMedia project={project} />
          <Eyebrow className="text-emerald-400">{project.category}</Eyebrow>
          <h3 className={`text-2xl font-black leading-tight ${strong}`}>{project.title}</h3>
          <p className={`${soft} text-sm leading-relaxed`}>{project.description}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span key={tag} className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${themeClasses.subCard} ${soft}`}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2.5 pt-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-emerald-500 text-black font-black text-sm active:scale-[0.98] transition-transform"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border text-sm font-bold ${themeClasses.subCard} ${strong} active:scale-[0.98] transition-transform`}
              >
                <Github size={16} /> Source Code
              </a>
            )}
          </div>
        </article>
      );
    }

    switch (shownSheet) {
      case 'about':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <img src={photo || '/profile.png'} alt="Vaibhav Bhoyate" className="w-16 h-16 rounded-2xl object-cover object-top" />
              <div>
                <p className={`text-xl font-black uppercase tracking-tight leading-none ${strong}`}>Vaibhav Bhoyate</p>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400 mt-2">AI & ML Engineer</p>
              </div>
            </div>

            <section className={`rounded-[1.75rem] p-5 ${themeClasses.card}`}>
              <h3 className={`text-base font-black uppercase tracking-tight mb-3 flex items-center gap-2.5 ${strong}`}>
                <Cpu size={18} className="text-emerald-400" /> Craft
              </h3>
              <p className={`${soft} text-sm leading-relaxed mb-4`}>
                Demonstrated expertise in <span className={`${strong} font-medium`}>artificial intelligence, machine learning, deep learning, and data science</span>, focused on building <span className={`${strong} font-medium`}>intelligent predictive systems</span>.
              </p>
              <div className="flex flex-wrap gap-2">
                {['AI', 'Machine Learning', 'Python', 'OpenCV'].map((t) => (
                  <span key={t} className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase ${themeClasses.subCard} ${soft}`}>{t}</span>
                ))}
              </div>
            </section>

            <section className={`rounded-[1.75rem] p-5 ${themeClasses.card}`}>
              <h3 className={`text-base font-black uppercase tracking-tight mb-3 flex items-center gap-2.5 ${strong}`}>
                <Brain size={18} className="text-emerald-400" /> Philosophy
              </h3>
              <p className={`${soft} text-sm leading-relaxed mb-4`}>
                Excellence is built through consistency. <span className={`${strong} font-medium italic`}>Engineering</span> has given me the discipline and logical foundation that I rely on to tackle complex AI problems.
              </p>
              <img src="/philosophy.jpg" alt="Engineering Philosophy" loading="lazy" className="w-full h-48 object-cover rounded-2xl" />
            </section>

            <section className={`rounded-[1.75rem] p-5 ${themeClasses.card}`}>
              <Quote size={22} className="text-emerald-400 mb-3" />
              <p className={`text-xl font-black leading-tight ${strong}`}>“Ship it. Learn from it. Build it better.”</p>
            </section>

            <section className={`relative overflow-hidden rounded-[1.75rem] p-5 ${themeClasses.card}`}>
              <img src="/manama.png" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-15" />
              <div className="relative">
                <p className={`flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] mb-2 ${soft}`}>
                  <MapPin size={14} className="text-emerald-400" /> Location
                </p>
                <p className={`text-2xl font-black uppercase tracking-tight ${strong}`}>Nashik, India</p>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] mt-1.5 ${soft}`}>20.00°N, 73.78°E</p>
              </div>
            </section>
          </div>
        );

      case 'projects':
        return (
          <div className="grid grid-cols-2 gap-3">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                onClick={() => open(`project:${p.id}`)}
                className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden text-left active:scale-[0.97] transition-transform bg-black"
              >
                <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                <span className="absolute inset-x-0 bottom-0 p-3.5">
                  <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-1">
                    {p.category.replace(/^\d+\s*—\s*/, '')}
                  </span>
                  <span className="block text-xs font-black text-white leading-tight">{p.title}</span>
                </span>
              </button>
            ))}
          </div>
        );

      case 'experience':
        return (
          <ol className={`relative ml-2 border-l ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
            {experiences?.map((exp, i) => (
              <li key={exp.title} className="relative pl-6 pb-8 last:pb-0">
                <span className={`absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-2 ${i === 0 ? 'bg-emerald-400 border-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.7)]' : isDarkMode ? 'bg-[#0c0c0c] border-white/30' : 'bg-neutral-50 border-neutral-300'}`} />
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${i === 0 ? 'text-emerald-400' : soft}`}>{exp.period}</p>
                <h3 className={`text-base font-black leading-tight ${strong}`}>{exp.title}</h3>
                <p className={`text-xs font-semibold mb-3 ${soft}`}>{exp.company}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.highlights.map((h, hidx) => (
                    <span key={hidx} className={`px-2.5 py-1 rounded-lg text-[11px] ${themeClasses.subCard} ${soft}`}>{h}</span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        );

      case 'skills':
        return <SkillsIcons isDarkMode={isDarkMode} themeClasses={themeClasses} />;

      case 'services':
        return (
          <div className="space-y-4">
            <p className={`${soft} text-sm leading-relaxed mb-2`}>Core areas of engineering and AI solutions.</p>
            <ServicesGrid
              isDarkMode={isDarkMode}
              themeClasses={themeClasses}
              onRequestService={(serviceName) => onRequest?.({ type: 'service', serviceName })}
            />
          </div>
        );

      case 'certificates':
        return (
          <div className="grid grid-cols-2 gap-3">
            {certificateFiles?.map((c) => {
              const Icon = c.icon || Award;
              return (
                <a
                  key={c.file}
                  href={c.type === 'link' ? c.file : `/certificates/${encodeURIComponent(c.file)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-[1.25rem] overflow-hidden active:scale-[0.97] transition-transform ${themeClasses.card}`}
                >
                  <span className="flex h-24 items-center justify-center bg-gradient-to-br from-neutral-900 via-[#06070d] to-neutral-800 p-3">
                    <Icon size={36} style={{ color: c.color || '#10b981' }} />
                  </span>
                  <span className="block p-3">
                    <span className={`block text-xs font-bold leading-snug mb-1 truncate ${strong}`}>{c.title}</span>
                    <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.18em] text-emerald-400">View <ArrowUpRight size={10} /></span>
                  </span>
                </a>
              );
            })}
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-3xl font-black uppercase tracking-tight leading-[0.95] mb-2 ${strong}`}>Let&apos;s work<br />together</h3>
              <p className={`${soft} text-sm leading-relaxed`}>Open to exciting opportunities in AI, computer vision, machine learning, and data science collaborations.</p>
            </div>

            <a href={`mailto:${EMAIL}`} className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-emerald-500 text-black font-black active:scale-[0.98] transition-transform">
              <span className="flex items-center gap-3"><Mail size={20} /> Email me</span>
              <ArrowUpRight size={18} />
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a href={RESUME} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl text-xs font-bold ${themeClasses.card} ${strong} active:scale-[0.98] transition-transform`}>
                <FileText size={16} /> View resume
              </a>
              <a href={RESUME} download className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl text-xs font-bold ${themeClasses.card} ${strong} active:scale-[0.98] transition-transform`}>
                <Download size={16} /> Download
              </a>
            </div>

            <div className={`rounded-[1.75rem] overflow-hidden ${themeClasses.card}`}>
              {SOCIALS.map(({ href, label, Icon }, idx) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between px-5 py-4 active:bg-white/5 ${idx ? `border-t ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}` : ''}`}
                >
                  <span className={`flex items-center gap-3 font-bold text-sm ${strong}`}>
                    <Icon size={18} className="text-emerald-400" /> {label}
                  </span>
                  <ArrowUpRight size={16} className={soft} />
                </a>
              ))}
            </div>

            <p className={`text-center text-xs ${soft}`}>{EMAIL}</p>
          </div>
        );

      default:
        return null;
    }
  };

  const tileGlass = themeClasses.card;
  let i = 0;

  return (
    <div className={`relative z-10 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-10 ${className}`}>
      {/* Mobile Top Header */}
      <header className={`flex items-center justify-between h-16 mb-2 ${ready ? 'tile-in' : 'opacity-0'}`} style={{ '--i': 0 }}>
        <span role="img" aria-label="Vaibhav Bhoyate" className={`sig-mark h-11 w-36 ${strong}`} />
        <button
          onClick={onToggleTheme}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className={`w-11 h-11 rounded-full inline-flex items-center justify-center transition-colors ${themeClasses.accentButton}`}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      {/* Bento Tiles Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Identity Tile */}
        <Tile index={++i} ready={ready} span label="About Vaibhav" onClick={() => open('about')} className="h-[35svh] min-h-[270px] max-h-[350px]">
          <img
            key={photoKey}
            src={photo || '/profile.png'}
            alt="Vaibhav Bhoyate"
            className="absolute inset-0 w-full h-full object-cover object-top animate-photo-settle"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <Corner />
          <span className="absolute inset-x-0 bottom-0 p-5">
            <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.28em] text-emerald-400 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> AI & ML Engineer
            </span>
            <span className="block text-[2.6rem] font-black uppercase tracking-tighter leading-[0.85] text-white">
              Vaibhav<br /><span className="text-gray-400">Bhoyate</span>
            </span>
            <span className="block mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-300">
              AI · ML · Deep Learning
            </span>
          </span>
        </Tile>

        {/* Projects Widget Tile — auto cycles like iOS photo widget */}
        <Tile index={++i} ready={ready} label="Projects" onClick={() => open('projects')} className="aspect-square bg-black">
          <span className="absolute inset-0 isolate">
            {projectLayers.map(({ project: p, current, previous }) => (
              <img
                key={p.id}
                src={p.image}
                alt={p.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${current ? 'opacity-100 z-[2]' : previous ? 'opacity-100 z-[1]' : 'opacity-0 z-0'}`}
              />
            ))}
          </span>
          <span className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <Corner />
          <span className="absolute inset-x-0 bottom-0 p-4">
            <span className="block text-5xl font-black leading-none text-white">{PROJECTS.length}</span>
            <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-white/80 mt-1.5">Projects</span>
            <span key={projectIndex} className="block text-[11px] font-semibold text-white/70 mt-1 truncate animate-photo-settle">
              {PROJECTS[projectIndex].title}
            </span>
          </span>
        </Tile>

        {/* Experience Tile */}
        <Tile index={++i} ready={ready} label="Experience" onClick={() => open('experience')} className={`aspect-square p-4 flex flex-col ${tileGlass}`}>
          <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-auto">
            <Briefcase size={17} />
          </span>
          <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-emerald-400 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Now
          </span>
          <span className={`block text-[15px] font-black leading-tight ${strong}`}>{currentExp?.title || 'Software Intern'}</span>
          <span className={`block text-[11px] font-semibold mt-1 truncate ${soft}`}>{currentExp?.company || 'R3 Systems'}</span>
        </Tile>

        {/* Skills Tile */}
        <Tile index={++i} ready={ready} label="Skills" onClick={() => open('skills')} className={`h-[146px] p-4 flex flex-col ${tileGlass}`}>
          <span className="flex -space-x-2 mb-auto">
            {TILE_SKILLS.map(({ name, Icon }) => (
              <span key={name} className={`w-9 h-9 rounded-full border flex items-center justify-center ${isDarkMode ? 'bg-[#1a1a1a] border-white/15 text-gray-200' : 'bg-white border-neutral-200 text-neutral-700'}`}>
                <Icon size={15} />
              </span>
            ))}
          </span>
          <span className={`block text-3xl font-black leading-none ${strong}`}>{ALL_SKILLS.length}</span>
          <span className={`block text-[10px] font-black uppercase tracking-[0.22em] mt-1.5 ${soft}`}>Skills</span>
        </Tile>

        {/* Services Tile */}
        <Tile index={++i} ready={ready} label="Expertise" onClick={() => open('services')} className={`h-[146px] p-4 flex flex-col ${tileGlass}`}>
          <span className="grid grid-cols-3 gap-1.5 w-fit mb-auto">
            {SERVICES.slice(0, 5).map(({ name, icon: Icon }) => (
              <span key={name} className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Icon size={13} />
              </span>
            ))}
          </span>
          <span className={`block text-3xl font-black leading-none ${strong}`}>{SERVICES.length}</span>
          <span className={`block text-[10px] font-black uppercase tracking-[0.22em] mt-1.5 ${soft}`}>Expertise</span>
        </Tile>

        {/* Certificates Tile */}
        <Tile index={++i} ready={ready} label="Certificates" onClick={() => open('certificates')} className={`h-[146px] p-4 flex flex-col ${tileGlass}`}>
          <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-auto">
            <Award size={17} />
          </span>
          <span className={`block text-3xl font-black leading-none ${strong}`}>{certificateFiles?.length || 8}</span>
          <span className={`block text-[10px] font-black uppercase tracking-[0.22em] mt-1.5 ${soft}`}>Certificates</span>
        </Tile>

        {/* Ask my AI Tile */}
        <Tile index={++i} ready={ready} label="Ask my AI assistant" onClick={onOpenChat} className={`h-[146px] p-4 flex flex-col ${tileGlass}`}>
          <span style={{ '--orb-color': accentColor }} className="ai-orb relative w-11 h-11 rounded-full mb-auto flex items-center justify-center">
            <span className="ai-orb-shine" aria-hidden="true" />
            <Bot size={18} className="relative z-10 text-white" />
          </span>
          <span className={`block text-base font-black leading-tight ${strong}`}>Ask VISION</span>
          <span className={`block text-[10px] font-black uppercase tracking-[0.22em] mt-1.5 ${soft}`}>Instant AI answers</span>
        </Tile>

        {/* Contact Tile */}
        <div style={{ '--i': ++i }} className={`col-span-2 rounded-[1.75rem] p-4 ${tileGlass} ${ready ? 'tile-in' : 'opacity-0'}`}>
          <button onClick={() => open('contact')} className="flex w-full items-center justify-between mb-3 text-left">
            <span>
              <Eyebrow className="text-emerald-400 mb-1">Contact</Eyebrow>
              <span className={`block text-lg font-black leading-tight ${strong}`}>Let&apos;s work together</span>
            </span>
            <span className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ArrowUpRight size={18} />
            </span>
          </button>
          <div className="grid grid-cols-3 gap-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`h-12 rounded-2xl flex items-center justify-center active:scale-95 transition-transform ${isDarkMode ? 'bg-white/5 text-gray-200' : 'bg-neutral-900/5 text-neutral-700'}`}
              >
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className={`text-center text-[10px] font-black uppercase tracking-[0.25em] mt-8 ${soft}`}>© 2026 Vaibhav Bhoyate</p>

      {/* Sliding Bottom Sheet */}
      <SheetFrame
        open={!!sheet}
        title={project ? project.category.replace(/^\d+\s*—\s*/, '') : SHEET_TITLES[shownSheet] ?? ''}
        contentKey={shownSheet ?? 'none'}
        onClose={close}
        onBack={project && lastDepth.current > 1 ? back : undefined}
        isDarkMode={isDarkMode}
      >
        {renderSheet()}
      </SheetFrame>
    </div>
  );
}
