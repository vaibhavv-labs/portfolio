"use client";
import { projects } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const Projects = () => {
  return (
    <section id="projects" className="section-light">
      <div className="container">
        <ScrollReveal>
          <div className="badge mb-4">
            <span className="pulse-dot"></span>
            Featured Work
          </div>
          <h2 className="section-title">
            Projects that <span className="font-serif-italic">matter.</span>
          </h2>
        </ScrollReveal>
        
        <div className="bento-grid mt-10">
          {projects.map((project, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="col-span-12 lg:col-span-6">
              <div className="bento-card h-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="project-title">{project.name}</h3>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{project.category}</p>
                  </div>
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: 'rgba(0,0,0,0.05)' }}>0{i + 1}</span>
                </div>
                
                <p className="project-desc">{project.description}</p>
                
                <div className="mt-auto">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {project.tech.map((t) => <span key={t} className="pill-tag">{t}</span>)}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={project.liveLink} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid black', paddingBottom: '0.2rem' }}>
                      {project.liveLabel} ↗
                    </a>
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="hover-link" style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-gray)', transition: 'color 0.2s' }}>
                      GitHub ↗
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
