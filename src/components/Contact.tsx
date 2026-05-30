"use client";
import { personalInfo, socialLinks } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

const Contact = () => {
  return (
    <section id="contact" className="section contact">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>Get in Touch</span>
          </div>
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">Connect.</span>
          </h2>
        </ScrollReveal>

        <div className="contact-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <ScrollReveal delay={0.1}>
              <div>
                <h3 className="contact-label">Email</h3>
                <a href={`mailto:${personalInfo.email}`} className="contact-link" style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {personalInfo.email}
                </a>
                <div className="contact-location" style={{ marginTop: '24px' }}>
                  <h3 className="contact-label">Location</h3>
                  <p>Based in {personalInfo.location}</p>
                  <p>Available for remote opportunities worldwide.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <h3 className="contact-label">Socials</h3>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <a href={socialLinks.github} target="_blank" rel="noreferrer" className="social-link">
                    GitHub <span className="social-arrow">↗</span>
                  </a>
                  <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="social-link">
                    LinkedIn <span className="social-arrow">↗</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div>
                <h3 className="contact-label">Current Status</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{personalInfo.status}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.4}>
            <div className="glass-card" style={{ padding: '32px' }}>
              <h3 className="contact-label" style={{ marginBottom: '8px', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Send a Message</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                Fill out the form below and it will be sent directly to my email.
              </p>
              
              {/* Web3Forms Integration */}
              <form action="https://api.web3forms.com/submit" method="POST" className="contact-form" style={{ marginTop: 0 }}>
                {/* Replace with your Web3Forms Access Key */}
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                
                <div className="form-group">
                  <label htmlFor="name" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Name</label>
                  <input type="text" name="name" id="name" required className="form-input" placeholder="John Doe" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Email Address</label>
                  <input type="email" name="email" id="email" required className="form-input" placeholder="john@example.com" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Message</label>
                  <textarea name="message" id="message" required className="form-input form-textarea" placeholder="Hello Vaibhav, I'd like to discuss..."></textarea>
                </div>
                
                {/* Spam protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                
                <button type="submit" className="btn-primary" style={{ marginTop: '8px', width: '100%' }}>
                  Send Message →
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>

        <div className="contact-footer">
          <h2>Designed &amp; Developed by <span>{personalInfo.name}</span></h2>
          <h5>
            &copy; {new Date().getFullYear()} All Rights Reserved. Built with Next.js &amp; Custom CSS.
          </h5>
        </div>
      </div>
    </section>
  );
};

export default Contact;
