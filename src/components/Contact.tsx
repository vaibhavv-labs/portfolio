import { personalInfo, socialLinks } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const Contact = () => {
  return (
    <section id="contact" className="section contact">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-badge"><span className="section-badge-dot" /><span>Get in Touch</span></div>
          <h2 className="section-title">Let&apos;s <span className="gradient-text">Connect.</span></h2>
        </ScrollReveal>
        <div className="contact-grid">
          <ScrollReveal delay={0.1}>
            <div>
              <h4 className="contact-label">Email</h4>
              <a href={`mailto:${personalInfo.email}`} className="contact-link">{personalInfo.email}</a>
              <h4 className="contact-label" style={{ marginTop: '24px' }}>Location</h4>
              <p className="contact-location">{personalInfo.location}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div>
              <h4 className="contact-label">Social</h4>
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="social-link">
                Github <span className="social-arrow">↗</span>
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="social-link">
                LinkedIn <span className="social-arrow">↗</span>
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div>
              <h4 className="contact-label">Status</h4>
              <p className="contact-location" style={{ color: 'var(--accent-glow)' }}>{personalInfo.status}</p>
            </div>
          </ScrollReveal>
        </div>
        <div className="contact-footer">
          <h2>Designed and Developed <br />by <span>{personalInfo.name}</span></h2>
          <h5>© 2026</h5>
        </div>
      </div>
    </section>
  );
};

export default Contact;
