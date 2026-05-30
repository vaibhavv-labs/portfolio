"use client";
import { useEffect, useState, useRef } from "react";
import { stats } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const AnimatedCounter = ({ target, suffix, isVisible }: { target: number, suffix: string, isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += target / steps;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [target, isVisible]);

  return <span className="stat-number">{count}{suffix}</span>;
};

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-badge"><span className="section-badge-dot" /><span>Quick Overview</span></div>
          <h2 className="section-title">Numbers that <span className="gradient-text">speak.</span></h2>
        </ScrollReveal>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="stat-card glass-card">
                <div className="stat-glow" />
                <div className="stat-icon">{stat.icon}</div>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                <span className="stat-label">{stat.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
