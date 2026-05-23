"use client";
import { personalInfo, philosophyCards } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const About = () => {
  return (
    <section id="about" className="section-white">
      <div className="container">
        <ScrollReveal>
          <div className="badge mb-4">
            <span className="pulse-dot"></span>
            About Me
          </div>
          <h2 className="section-title">
            Architecting <span className="font-serif-italic">intelligent systems</span><br />that feel designed.
          </h2>
        </ScrollReveal>

        <div className="bento-grid mt-10">
          <div className="col-span-12 lg:col-span-8">
            <ScrollReveal delay={0.1}>
              <div className="bento-card h-full">
                <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--text-black)' }}>
                  I&apos;m <strong style={{ fontWeight: 800 }}>{personalInfo.name}</strong>.{" "}
                  {personalInfo.bio}
                </p>
                
                <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-gray)', marginTop: '3rem', marginBottom: '1.5rem' }}>Core Philosophy</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {philosophyCards.map((card) => (
                    <div key={card.number} style={{ padding: '1rem', border: '1px solid var(--border-light)', borderRadius: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{card.title}</span>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'rgba(0,0,0,0.1)' }}>{card.number}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-black-muted)' }}>{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="col-span-12 lg:col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <ScrollReveal delay={0.2}>
              <div className="bento-card h-full bento-card-dark" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-white-muted)', marginBottom: '1.5rem' }}>Profile</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-white-muted)' }}>Base</p>
                    <p style={{ fontWeight: 600 }}>India</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-white-muted)' }}>Edu</p>
                    <p style={{ fontWeight: 600 }}>AI & DS</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-white-muted)' }}>Status</p>
                    <p style={{ fontWeight: 600 }}>{personalInfo.status}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-white-muted)' }}>Stack</p>
                    <p style={{ fontWeight: 600 }}>Python/Next</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bento-card h-full" style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>AI/ML Engineer</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-black-muted)', marginBottom: '1rem' }}>Python / PyTorch / LLMs</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="pill-tag">Python</span>
                  <span className="pill-tag">PyTorch</span>
                  <span className="pill-tag">LLMs</span>
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
