"use client";
import { certificates } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const Certificates = () => {
  return (
    <section id="certificates" className="section-light">
      <div className="container">
        <ScrollReveal>
          <div className="badge mb-4">
            <span className="pulse-dot"></span>
            Continuous Learning
          </div>
          <h2 className="section-title">
            Certifications & <span className="font-serif-italic">Awards.</span>
          </h2>
        </ScrollReveal>
        
        <div className="bento-grid mt-10">
          {certificates.map((cert, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="col-span-12 lg:col-span-4">
              <a href={cert.link} target="_blank" rel="noreferrer" className="bento-card h-full block" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '2rem' }}>{cert.icon}</div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cert.date}</span>
                </div>
                
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-black)' }}>{cert.name}</h3>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-black-muted)', marginBottom: '1rem' }}>{cert.issuer}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-black-muted)' }}>{cert.description}</p>
                
                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="pill-tag">{cert.category}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-black)' }}>View ↗</span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
