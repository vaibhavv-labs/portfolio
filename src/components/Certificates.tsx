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
          <p className="section-subtitle">Verified credentials demonstrating expertise across various domains of AI and Data Science.</p>
        </ScrollReveal>

        <div className="certificates-grid">
          {certificates.map((cert, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="cert-card glass-card glass-card-hover">
                <div className="cert-card-top">
                  <span className="cert-icon">{cert.icon}</span>
                  <span className="cert-verified">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified
                  </span>
                </div>
                <span className="cert-category">{cert.category}</span>
                <h3 className="cert-name">{cert.name}</h3>
                <div className="cert-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-date">{cert.date}</span>
                </div>
                <hr className="cert-divider" />
                <a href={cert.link} target="_blank" rel="noreferrer" className="cert-link">
                  View Certificate 
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
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
