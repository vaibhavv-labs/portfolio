import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              VAIBHAV
              <br />
              <span>BHOYATE</span>
            </h1>
          </div>
          <div className="landing-info">
            <h2 className="landing-info-h2" style={{ whiteSpace: 'nowrap', fontSize: '2vw', display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
              <div style={{color: '#c481ff', marginBottom: '8px', letterSpacing: '4px', fontSize: '1.2em', fontWeight: '700'}}>AI & DATA SCIENCE STUDENT</div>
              <div style={{color: '#ffffff', fontSize: '0.7em', letterSpacing: '3px', fontWeight: '400', opacity: '0.9', paddingLeft: '2px'}}>BUILDING & DEPLOYING ML PROJECTS</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
