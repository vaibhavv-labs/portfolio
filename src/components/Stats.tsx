import { useEffect, useRef, useState } from "react";
import "./styles/Stats.css";

interface StatItem {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

const statsData: StatItem[] = [
  { icon: "🚀", value: 3, suffix: "+", label: "Projects Built" },
  { icon: "📜", value: 6, suffix: "+", label: "Certifications" },
  { icon: "⚙️", value: 12, suffix: "+", label: "Technologies" },
  { icon: "💻", value: 50, suffix: "+", label: "GitHub Contributions" },
];

const AnimatedCounter = ({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span className="stat-number">
      {count}{suffix}
    </span>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats-section" ref={sectionRef}>
      <div className="stats-container">
        <h2 className="stats-title">
          Quick <span className="gradient-text">Overview</span>
        </h2>
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div
              className="stat-card glass-card"
              key={index}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                isVisible={isVisible}
              />
              <span className="stat-label">{stat.label}</span>
              <div className="stat-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
