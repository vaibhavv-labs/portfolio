"use client";
import { useEffect, useState } from "react";
import { personalInfo } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const Hero = () => {
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIntroVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="noise-overlay"></div>
      <section id="home" className="hero">
        <div className="hero-glow-orb" />
        
        <div className="hero-content">
          <ScrollReveal delay={0.1}>
            <div className="badge badge-dark mb-4">
              <span className="pulse-dot"></span>
              Building Experiences
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col">
              <h1 className="hero-title">{personalInfo.firstName}</h1>
              <h1 className="hero-title hero-title-muted">{personalInfo.lastName}</h1>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="hero-tagline mt-6">
              Architecting <span className="text-white font-serif-italic">intelligent systems</span> with <strong className="border-b border-white pb-1">Precision Design</strong>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="hero-cta-container">
              <a
                href="#projects"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Work
              </a>
              <a href="/resume.pdf" target="_blank" className="btn-outline">
                Download CV
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Hero;
