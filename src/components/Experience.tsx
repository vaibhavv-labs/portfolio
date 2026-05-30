"use client";
import { experience } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const Experience = () => {
  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="section-container">
        <ScrollReveal>
          <div className="section-badge"><span className="section-badge-dot" /><span>Career &amp; Education</span></div>
          <h2 className="section-title">My <span className="gradient-text">Journey.</span></h2>
        </ScrollReveal>

        <div className="experience-timeline">
          {experience.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="timeline-item">
                <div className={`timeline-dot ${i === 0 ? 'timeline-dot-active' : ''}`} />
                <div className="timeline-date">{exp.date}</div>
                <h3 className="timeline-role">{exp.role}</h3>
                <div className="timeline-company">{exp.company}</div>
                <p className="timeline-desc">{exp.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
