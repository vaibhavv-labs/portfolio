"use client";
import { projects } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const Projects = () => {
  const glowColors = ['var(--aurora-2)', 'var(--aurora-1)', 'var(--aurora-3)', 'var(--accent-primary)'];

  return (
    <section id="projects" className="section">
      <div className="aurora-blob" style={{ width: 400, height: 400, background: 'var(--aurora-3)', top: '20%', left: '-5%' }} />
      <div className="section-container">
        <ScrollReveal>
          <div className="section-badge"><span className="section-badge-dot" /><span>Featured Work</span></div>
          <h2 className="section-title">Projects that <span className="gradient-text">matter.</span></h2>
          <p className="section-subtitle">Real-world applications solving actual problems with AI, ML, and modern web technologies.</p>
        </ScrollReveal>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="project-card glass-card glass-card-hover">
                <div className="project-card-glow" style={{ background: glowColors[i % glowColors.length] }} />
                <div className="project-number">0{i + 1}</div>
                <div className="project-content">
                  <div className="project-header">
                    <div>
                      <h3 className="project-name">{project.name}</h3>
                      <p className="project-category">{project.category}</p>
                    </div>
                  </div>
                  <div className="project-desc">
                    <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', listStyleType: 'disc' }}>
                      {Array.isArray(project.description) 
                        ? project.description.map((point, idx) => <li key={idx}>{point}</li>)
                        : <li>{project.description}</li>}
                    </ul>
                  </div>
                  <div className="project-tech">
                    {project.tech.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className="project-links">
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="project-link project-link-live">{project.liveLabel} ↗</a>
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="project-link project-link-github">GitHub ↗</a>
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
