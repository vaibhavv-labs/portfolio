"use client";
import { useState, useEffect } from "react";
import { personalInfo } from "@/data/portfolio-data";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");

  // Intersection observer to track active section
  useEffect(() => {
    const sections = document.querySelectorAll("section[id], footer[id]");
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
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <div className="nav-pill">
        <a
          href="#home"
          style={{ padding: '0.5rem 1rem', fontWeight: 800, fontSize: '0.9rem', color: 'black' }}
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#home");
          }}
        >
          {personalInfo.firstName}
        </a>
        
        <div style={{ display: 'flex', borderLeft: '1px solid rgba(0,0,0,0.1)', paddingLeft: '0.5rem', marginLeft: '0.2rem' }}>
          {navItems.slice(1).map((item) => (
            <button
              key={item.href}
              className={`nav-link ${activeSection === item.href.slice(1) ? "nav-link-active" : ""}`}
              onClick={() => scrollTo(item.href)}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <a href="/resume.pdf" target="_blank" className="nav-btn" style={{ marginLeft: '0.5rem' }}>
          Resume
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
