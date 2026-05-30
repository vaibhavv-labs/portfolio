"use client";
import { useState } from "react";
import { personalInfo } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import { motion } from "framer-motion";

const Hero = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="home" className="hero">
      {/* Aurora Blobs */}
      <div className="aurora-blob" style={{ width: 600, height: 600, background: "var(--aurora-2)", top: "-15%", right: "5%" }} />
      <div className="aurora-blob" style={{ width: 450, height: 450, background: "var(--aurora-1)", bottom: "5%", left: "-8%", animationDelay: "5s" }} />
      <div className="aurora-blob" style={{ width: 350, height: 350, background: "var(--aurora-3)", top: "35%", right: "-12%", animationDelay: "10s" }} />

      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }} // Wait for loading screen
        >
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span className="hero-badge-text">Available for opportunities</span>
          </div>

          <div>
            <h1 className="hero-name">{personalInfo.firstName}</h1>
            <h1 className="hero-name hero-name-muted">{personalInfo.lastName}</h1>
          </div>

          <div className="hero-accent-line" />

          <p className="hero-tagline">
            Architecting{" "}
            <span className="hero-tagline-highlight">Intelligent Systems</span>{" "}
            with{" "}
            <span className="hero-tagline-highlight">Data-Driven Precision</span>
          </p>

          <div className="hero-cta">
            <MagneticButton 
              href="#projects" 
              className="btn-primary"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Work →
            </MagneticButton>
            <MagneticButton href="/resume.pdf" target="_blank" className="btn-outline">
              Download CV ↓
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 3.2 }}
        >
          <div className="hero-image-glow" />
          {!imageError ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="/images/profile.jpg"
              alt={personalInfo.name}
              className="hero-image"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="hero-image-fallback">
              <span className="hero-initials">VB</span>
              <span className="hero-initials-role">AI Engineer</span>
            </div>
          )}
        </motion.div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
