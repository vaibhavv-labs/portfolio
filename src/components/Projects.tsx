"use client";
import { projects } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="aurora-blob" style={{ width: 700, height: 700, background: 'var(--aurora-3)', top: '10%', right: '-15%' }} />
      <div className="section-container">
        <ScrollReveal>
          <div className="section-badge"><span className="section-badge-dot" /><span>Featured Work</span></div>
          <h2 className="section-title">Projects that <span className="gradient-text">matter.</span></h2>
          <p className="section-subtitle">Real-world applications of AI and Data Science solving complex problems.</p>
        </ScrollReveal>

        <div className="projects-grid">
          {projects.map((project, index) => {
            const glowColor = index % 3 === 0 ? "var(--aurora-1)" : index % 3 === 1 ? "var(--aurora-2)" : "var(--aurora-3)";
            return (
              <ScrollReveal key={project.name} delay={index * 0.1}>
                <div className="project-card glass-card">
                  <div className="project-card-glow" style={{ background: glowColor }} />
                  <div className="project-number">0{index + 1}</div>
                  <div className="project-content">
                    <div className="project-header">
                      <div>
                        <span className="project-category" style={{ color: glowColor }}>{project.category}</span>
                        <h3 className="project-name">{project.name}</h3>
                      </div>
                    </div>
                    <ul className="project-desc" style={{ paddingLeft: '1.2rem', listStyleType: 'disc' }}>
                      {project.description.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                    <div className="project-tech">
                      {project.tech.map(tech => <span key={tech} className="tag">{tech}</span>)}
                    </div>
                    <div className="project-links">
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer" className="project-link project-link-live">
                          {project.liveLabel || "Live Demo ↗"}
                        </a>
                      )}
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="project-link project-link-github">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
