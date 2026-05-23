"use client";
import { funFacts } from "@/data/portfolio-data";

const Marquee = () => {
  // Duplicate items for seamless loop
  const items = [...funFacts, ...funFacts, ...funFacts];

  return (
    <div style={{ background: 'var(--bg-black)', padding: '2rem 0', overflow: 'hidden', borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)' }}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          padding: 0 2rem;
          color: var(--text-white);
          font-weight: 800;
          font-size: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          white-space: nowrap;
        }
        .marquee-dot {
          color: var(--text-gray);
          margin-left: 2rem;
        }
      `}</style>
      <div className="marquee-track">
        {items.map((fact, i) => (
          <div key={i} className="marquee-item">
            <span>{fact.emoji}</span>
            <span style={{ marginLeft: '1rem' }}>{fact.text}</span>
            <span className="marquee-dot">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
