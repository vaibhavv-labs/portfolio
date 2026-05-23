"use client";
import { certificates } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const Certificates = () => {
  return (
    <section id="certificates" className="section">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-badge"><span className="section-badge-dot" /><span>Achievements</span></div>
          <h2 className="section-title">My <span className="gradient-text">Certificates.</span></h2>
          <p className="section-subtitle">Verified achievements &amp; learning milestones from top platforms.</p>
        </ScrollReveal>
        <div className="certificates-grid">
          {certificates.map((cert, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="cert-card glass-card glass-card-hover">
                <div className="cert-card-top">
                  <span className="cert-icon">{cert.icon}</span>
                  <span className="cert-verified">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5 2 6" stroke="#7bda8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Verified
                  </span>
                </div>
                <span className="cert-category">{cert.category}</span>
                <p className="cert-name">{cert.name}</p>
                <div className="cert-meta">
                  <p className="cert-issuer">{cert.issuer}</p>
                  <p className="cert-date">{cert.date}</p>
                </div>
                <hr className="cert-divider" />
                <a href={cert.link} target="_blank" rel="noreferrer" className="cert-link">
                  View Certificate
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 11L11 2M11 2H5M11 2V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
