"use client";
import { useEffect, useState } from "react";
import { personalInfo } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const Hero = () => {
  const [introVisible, setIntroVisible] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntroVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Intro Screen */}
      <div className={`intro-screen ${!introVisible ? "hidden" : ""}`}>
        <h1 className="intro-text">
          Let&apos;s Build{" "}
          <span className="intro-text-muted">Intelligent Systems.</span>
        </h1>
      </div>

      <section id="home" className="hero">
        {/* Aurora Blobs */}
        <div className="aurora-blob" style={{ width: 600, height: 600, background: "var(--aurora-2)", top: "-15%", right: "5%" }} />
        <div className="aurora-blob" style={{ width: 450, height: 450, background: "var(--aurora-1)", bottom: "5%", left: "-8%", animationDelay: "5s" }} />
        <div className="aurora-blob" style={{ width: 350, height: 350, background: "var(--aurora-3)", top: "35%", right: "-12%", animationDelay: "10s" }} />

        <div className="hero-container">
          <div className="hero-content">
            <ScrollReveal>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                <span className="hero-badge-text">Available for opportunities</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="hero-name">{personalInfo.firstName}</h1>
              <h1 className="hero-name hero-name-muted">{personalInfo.lastName}</h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="hero-accent-line" />
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="hero-tagline">
                Architecting{" "}
                <span className="hero-tagline-highlight">Intelligent Systems</span>{" "}
                with{" "}
                <span className="hero-tagline-highlight">Data-Driven Precision</span>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="hero-cta">
                <a
                  href="#projects"
                  className="btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explore Work →
                </a>
                <a href="/resume.pdf" target="_blank" className="btn-outline">
                  Download CV ↓
                </a>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2} className="hero-image-wrapper">
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
          </ScrollReveal>
        </div>

        <div className="hero-scroll-indicator">
          <div className="hero-scroll-line" />
        </div>
      </section>
    </>
  );
};

export default Hero;
