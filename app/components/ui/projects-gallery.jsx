"use client";
import React, { useState } from 'react';
import { X, ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    id: 'codesentinel',
    category: '01 — AI Security',
    title: 'CodeSentinel AI',
    image: '/codesentinel.png',
    description: 'AI-driven code analysis tool. Fine-tuned CodeBERT model on CyberNative DPO dataset achieving 89.16% training accuracy. Detects 8 vulnerability classes with up to 99.92% confidence and auto-fixes using Qwen 2.5 Coder LLM.',
    github: 'https://github.com/vaibhavv-labs/CodeSentinel-AI',
    live: 'https://codesentinel-app.vercel.app/',
    tags: ['Next.js', 'Flask', 'CodeBERT', 'Gemini AI'],
  },
  {
    id: 'heartdisease',
    category: '02 — Healthcare AI',
    title: 'Heart Disease Predictor',
    image: '/heart_disease.png',
    description: 'Predictive healthcare app estimating heart disease risk from patient vitals. Engineered a Logistic Regression pipeline achieving 85%+ validation accuracy. Built a real-time Streamlit UI for clinical predictive use.',
    github: 'https://github.com/vaibhavv-labs/Heart-Disease-Prediction',
    live: 'https://heart-disease-prediction-vaibhav.streamlit.app/',
    tags: ['Python', 'Scikit-learn', 'Streamlit', 'Pandas'],
  },
  {
    id: 'sentimentiq',
    category: '03 — AI SaaS Platform',
    title: 'SentimentIQ SaaS',
    image: '/sentimentiq.png',
    description: 'Scalable AI SaaS platform processing thousands of social media data points. Leverages PyTorch and HuggingFace Transformers to deliver real-time actionable brand insights with a 92%+ sentiment classification F1-score.',
    github: 'https://github.com/vaibhavv-labs/sentimentiq-dashboard',
    live: 'https://sentimentiq-dashboard.onrender.com',
    tags: ['PyTorch', 'HuggingFace', 'Streamlit', 'SaaS'],
  },
  {
    id: 'faceid',
    category: '04 — Computer Vision',
    title: 'FaceID Attendance System',
    image: '/faceid.png',
    description: 'Automated attendance system utilizing a real-time OpenCV webcam pipeline. Achieved 98% facial recognition accuracy under varying lighting conditions with automated CSV logging and exports.',
    github: 'https://github.com/vaibhavv-labs/face-attendance-system',
    live: 'https://github.com/vaibhavv-labs/face-attendance-system',
    tags: ['Python', 'OpenCV', 'Streamlit', 'NumPy'],
  }
];

export default function ProjectsGallery({ isDarkMode, themeClasses }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            onClick={() => setActive(project)}
            className="group relative overflow-hidden rounded-[2rem] text-left aspect-[4/5]"
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">{project.category}</p>
              <h3 className="text-xl md:text-2xl font-black text-white leading-tight">{project.title}</h3>
            </div>
            <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={16} />
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActive(null)} />
          <div className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl ${themeClasses.card}`}>
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            >
              <X size={18} />
            </button>
            <div className="aspect-[21/9] sm:aspect-[16/9] max-h-[250px] w-full overflow-hidden relative">
              <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 md:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">{active.category}</p>
              <h3 className={`text-2xl md:text-3xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{active.title}</h3>
              <p className={`${themeClasses.mutedText} text-sm leading-relaxed mb-5`}>{active.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {active.tags.map((tag) => (
                  <span key={tag} className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${themeClasses.subCard} ${themeClasses.mutedText}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                {active.github && (
                  <a href={active.github} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-black uppercase tracking-wider transition ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-neutral-900 text-white hover:bg-neutral-800'}`}>
                    <Github size={14} /> Source Code
                  </a>
                )}
                {active.live && (
                  <a href={active.live} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-black uppercase tracking-wider transition border ${isDarkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-neutral-300 text-neutral-900 hover:bg-neutral-100'}`}>
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
