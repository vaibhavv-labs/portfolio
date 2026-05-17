import Marquee from "react-fast-marquee";
import "./styles/FunFacts.css";

const facts = [
  { emoji: "🔬", text: "AI Enthusiast" },
  { emoji: "🎯", text: "Problem Solver" },
  { emoji: "🐍", text: "Python Lover" },
  { emoji: "📊", text: "Data Nerd" },
  { emoji: "🤖", text: "ML Engineer" },
  { emoji: "🚀", text: "Always Learning" },
  { emoji: "🧠", text: "Deep Learning Explorer" },
  { emoji: "⚡", text: "Fast Learner" },
  { emoji: "🔥", text: "Open Source Contributor" },
  { emoji: "🌐", text: "Tech Explorer" },
];

const FunFacts = () => {
  return (
    <div className="funfacts-section">
      <Marquee
        speed={40}
        gradient={true}
        gradientColor="#0b080c"
        gradientWidth={80}
        className="funfacts-marquee"
      >
        {facts.map((fact, index) => (
          <div className="funfact-item" key={index}>
            <span className="funfact-emoji">{fact.emoji}</span>
            <span className="funfact-text">{fact.text}</span>
            <span className="funfact-dot">•</span>
          </div>
        ))}
      </Marquee>
      <Marquee
        speed={30}
        gradient={true}
        gradientColor="#0b080c"
        gradientWidth={80}
        direction="right"
        className="funfacts-marquee funfacts-marquee-reverse"
      >
        {facts.map((fact, index) => (
          <div className="funfact-item funfact-item-alt" key={index}>
            <span className="funfact-emoji">{fact.emoji}</span>
            <span className="funfact-text">{fact.text}</span>
            <span className="funfact-dot">•</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default FunFacts;
