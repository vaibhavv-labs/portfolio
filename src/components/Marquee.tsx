import { funFacts } from "@/data/portfolio-data";

const Marquee = () => {
  // Duplicate items for seamless loop
  const items = [...funFacts, ...funFacts];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {items.map((fact, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-emoji">{fact.emoji}</span>
            <span className="marquee-text">{fact.text}</span>
            <span className="marquee-dot">•</span>
          </div>
        ))}
      </div>
      <div className="marquee-track marquee-track-reverse" style={{ marginTop: '8px' }}>
        {items.map((fact, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-emoji">{fact.emoji}</span>
            <span className="marquee-text">{fact.text}</span>
            <span className="marquee-dot">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
