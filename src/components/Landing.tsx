import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = () => {
  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-intro">
          <h2 className="hero-greeting">Hello! I'm</h2>
          <h1 className="hero-name">
            VAIBHAV
            <br />
            <span>BHOYATE</span>
          </h1>
        </div>
        <div className="landing-info">
          <div className="hero-subtitle">
            <div className="hero-role">AI & DATA SCIENCE STUDENT</div>
            <div className="hero-desc">BUILDING & DEPLOYING ML PROJECTS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
