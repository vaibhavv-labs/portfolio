"use client";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const AnimatedCounter = ({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);
  return <span className="stat-number">{count}{suffix}</span>;
};

const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section" ref={ref}>
      <div className="section-container">
        <ScrollReveal>
          <div className="section-badge"><span className="section-badge-dot" /><span>Quick Overview</span></div>
          <h2 className="section-title">Numbers that <span className="gradient-text">speak.</span></h2>
        </ScrollReveal>
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="stat-card glass-card">
                <div className="stat-icon">{stat.icon}</div>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                <span className="stat-label">{stat.label}</span>
                <div className="stat-glow" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
