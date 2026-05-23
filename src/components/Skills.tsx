"use client";
import { skills } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const Skills = () => {
  return (
    <section id="skills" className="section">
      <div className="aurora-blob" style={{ width: 500, height: 500, background: 'var(--aurora-2)', bottom: '-10%', right: '-10%' }} />
      <div className="section-container">
        <ScrollReveal>
          <div className="section-badge"><span className="section-badge-dot" /><span>Technical Arsenal</span></div>
          <h2 className="section-title">Engineering <span className="gradient-text">Versatility.</span></h2>
          <p className="section-subtitle">Building high-performance solutions across the stack, from intelligent ML models to full-stack web applications.</p>
        </ScrollReveal>
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="skill-category glass-card glass-card-hover">
                <div className="skill-category-corner" />
                <div className="skill-category-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="skill-category-icon">{skill.icon}</div>
                    <div>
                      <h3 className="skill-category-name">{skill.category}</h3>
                      <p className="skill-category-level">{skill.level}</p>
                    </div>
                  </div>
                  <span className="skill-category-number">0{i + 1}</span>
                </div>
                <div className="skill-tags">
                  {skill.tools.map((tool) => (
                    <span key={tool} className="skill-tag">{tool}</span>
                  ))}
                </div>
                <p className="skill-category-desc">{skill.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
