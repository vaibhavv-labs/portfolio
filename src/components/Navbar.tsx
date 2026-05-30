"use client";
import { useState, useEffect } from "react";
import { personalInfo } from "@/data/portfolio-data";
import MagneticButton from "./MagneticButton";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          <a
            href="#home"
            className="navbar-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#home");
            }}
          >
            <span className="gradient-text">
              {personalInfo.firstName.charAt(0)}
            </span>
            {personalInfo.firstName.slice(1).toLowerCase()}
          </a>
          <div className="navbar-links">
            {navItems.map((item) => (
              <button
                key={item.href}
                className={`nav-link ${activeSection === item.href.slice(1) ? "active" : ""}`}
                onClick={() => scrollTo(item.href)}
              >
                {item.label}
              </button>
            ))}
            <div className="nav-divider" />
            <MagneticButton href="/resume.pdf" target="_blank" className="nav-resume">
              Resume
            </MagneticButton>
          </div>
          <button
            className="nav-mobile-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>
      <div className={`nav-mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button
          className="nav-mobile-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        {navItems.map((item) => (
          <button
            key={item.href}
            className="nav-mobile-link"
            onClick={() => scrollTo(item.href)}
          >
            {item.label}
          </button>
        ))}
        <a
          href="/resume.pdf"
          target="_blank"
          className="nav-resume"
          style={{ marginTop: '20px', padding: '12px 32px', fontSize: '1.1rem' }}
          onClick={() => setMobileOpen(false)}
        >
          Resume
        </a>
      </div>
    </>
  );
};

export default Navbar;
