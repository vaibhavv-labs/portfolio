import { personalInfo, socialLinks } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const Contact = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <ScrollReveal>
          <h2 className="footer-title">Let&apos;s Connect</h2>
        </ScrollReveal>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'left', marginTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid var(--border-dark)' }}>
          <ScrollReveal delay={0.1}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Location</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 500 }}>{personalInfo.location}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Contact</p>
              <a href={`mailto:${personalInfo.email}`} style={{ fontSize: '1.25rem', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '4px' }}>{personalInfo.email}</a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Social</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href={socialLinks.github} target="_blank" rel="noreferrer" style={{ fontSize: '1.25rem', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#a3a3a3'} onMouseOut={(e) => e.currentTarget.style.color = '#fff'}>GitHub ↗</a>
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: '1.25rem', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#a3a3a3'} onMouseOut={(e) => e.currentTarget.style.color = '#fff'}>LinkedIn ↗</a>
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>Designed and Developed by <strong style={{ color: 'white' }}>{personalInfo.name}</strong></p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>© 2026 All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
