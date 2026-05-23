"use client";
import { skills } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const Skills = () => {
  return (
    <section id="skills" className="section-white">
      <div className="container">
        <ScrollReveal>
          <div className="badge mb-4">
            <span className="pulse-dot"></span>
            Technical Arsenal
          </div>
          <h2 className="section-title">
            Engineering <br />
            <span className="text-gradient">Versatility.</span>
          </h2>
        </ScrollReveal>
        
        <div className="bento-grid mt-10">
          {skills.map((skill, i) => {
            // Make the first card span 8 columns, others span 4, to create a true bento feel
            const colClass = i === 0 || i === 3 ? "col-span-12 lg:col-span-8" : "col-span-12 lg:col-span-4";
            return (
              <ScrollReveal key={i} delay={i * 0.1} className={colClass}>
                <div className="bento-card h-full">
                  <div className="bento-glow" />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                      <div className="flex items-center" style={{ gap: '10px' }}>
                        <div style={{ fontSize: '2rem' }}>{skill.icon}</div>
                        <div>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{skill.category}</h3>
                          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{skill.level}</p>
                        </div>
                      </div>
                      <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(0,0,0,0.05)' }}>0{i + 1}</span>
                    </div>
                    <p style={{ color: 'var(--text-black-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{skill.description}</p>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {skill.tools.map((tool) => (
                      <span key={tool} className="pill-tag">{tool}</span>
                    ))}
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

export default Skills;
