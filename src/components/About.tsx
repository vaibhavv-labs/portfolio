"use client";
import { personalInfo, philosophyCards } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="aurora-blob" style={{ width: 600, height: 600, background: 'var(--aurora-1)', top: '-20%', left: '-10%' }} />

      <div className="section-container">
        <ScrollReveal>
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>About Me</span>
          </div>
          <h2 className="section-title">
            Architecting <span className="gradient-text">intelligent systems</span><br />that feel designed.
          </h2>
        </ScrollReveal>

        <div className="about-grid">
          <div className="about-text">
            <ScrollReveal delay={0.1}>
              <p className="about-bio">
                I&apos;m <span className="about-bio-highlight">{personalInfo.name}</span>.{" "}
                {personalInfo.bio}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h3 style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: '12px' }}>// Core Philosophy</h3>
              <div className="philosophy-grid">
                {philosophyCards.map((card) => (
                  <div key={card.number} className="philosophy-card glass-card">
                    <div className="philosophy-card-header">
                      <div className="philosophy-card-number">{card.number}</div>
                      <span className="philosophy-card-title">{card.title}</span>
                    </div>
                    <p className="philosophy-card-desc">{card.description}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="about-cards">
            <ScrollReveal delay={0.2}>
              <div className="profile-card glass-card glass-card-hover">
                <div className="profile-card-header">
                  <span className="profile-card-dot" />
                  <span className="profile-card-label">Profile</span>
                </div>
                <div className="profile-grid">
                  <div>
                    <p className="profile-item-label">Base</p>
                    <p className="profile-item-value">India</p>
                  </div>
                  <div>
                    <p className="profile-item-label">Edu</p>
                    <p className="profile-item-value">AI &amp; DS</p>
                  </div>
                  <div>
                    <p className="profile-item-label">Status</p>
                    <p className="profile-item-value">{personalInfo.status}</p>
                  </div>
                  <div>
                    <p className="profile-item-label">Stack</p>
                    <p className="profile-item-value">{personalInfo.stack}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="role-card glass-card glass-card-hover">
                <div className="role-card-glow" style={{ background: 'var(--aurora-2)' }} />
                <div className="role-card-content">
                  <h3 className="role-card-title">AI/ML <br /><span className="role-card-title-muted">Engineer</span></h3>
                  <p className="role-card-subtitle">Python / PyTorch / LLMs</p>
                  <div className="role-card-tags">
                    <span className="tag">Python</span>
                    <span className="tag">PyTorch</span>
                    <span className="tag">LLMs</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="role-card glass-card glass-card-hover">
                <div className="role-card-glow" style={{ background: 'var(--aurora-1)' }} />
                <div className="role-card-content">
                  <h3 className="role-card-title">Data <br /><span className="role-card-title-muted">Scientist</span></h3>
                  <p className="role-card-subtitle">Analytics &amp; Visualization</p>
                  <div className="role-card-tags">
                    <span className="tag">Pandas</span>
                    <span className="tag">Scikit-learn</span>
                    <span className="tag">Plotly</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
