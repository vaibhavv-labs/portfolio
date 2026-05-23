"use client";
import { experience } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const Experience = () => {
  return (
    <section id="experience" className="section-white">
      <div className="container">
        <ScrollReveal>
          <div className="badge mb-4">
            <span className="pulse-dot"></span>
            Career & Education
          </div>
          <h2 className="section-title">
            My <span className="font-serif-italic">Journey.</span>
          </h2>
        </ScrollReveal>
        
        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {experience.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }} className="md-grid-cols-4">
                <div style={{ width: '200px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{exp.date}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-black)' }}>{exp.role}</h3>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-black-muted)', marginBottom: '1rem' }}>{exp.company}</p>
                  <p style={{ fontSize: '1rem', color: 'var(--text-black-muted)', maxWidth: '800px' }}>{exp.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
