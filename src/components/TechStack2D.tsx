import Marquee from "react-fast-marquee";
import { 
  SiPython, 
  SiNumpy, 
  SiPandas,
  SiScikitlearn, 
  SiMysql, 
  SiMongodb,
  SiStreamlit,
  SiGithub
} from "react-icons/si";

const techList = [
  { name: "Python", icon: <SiPython color="#3776AB" /> },
  { name: "NumPy", icon: <SiNumpy color="#013243" /> },
  { name: "Pandas", icon: <SiPandas color="#150458" /> },
  { name: "Scikit-Learn", icon: <SiScikitlearn color="#F7931E" /> },
  { name: "SQL", icon: <SiMysql color="#4479A1" /> },
  { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
  { name: "Streamlit", icon: <SiStreamlit color="#FF4B4B" /> },
  { name: "GitHub", icon: <SiGithub color="#ffffff" /> },
];

const TechStack2D = () => {
  return (
    <div style={{ padding: "4rem 0", background: "transparent", position: "relative", zIndex: 10 }}>
      <h2 
        style={{ 
          textAlign: "center", 
          color: "var(--accentColor)", 
          fontSize: "2rem", 
          marginBottom: "3rem", 
          letterSpacing: "4px", 
          textTransform: "uppercase",
          fontWeight: 400 
        }}
      >
        My Tech Stack
      </h2>
      <Marquee gradient={true} gradientColor="var(--backgroundColor)" speed={60} pauseOnHover={true}>
        {techList.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              padding: "1rem 2.5rem",
              margin: "0 1rem",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "1.5rem",
              fontFamily: "Geist, sans-serif",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)"
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default TechStack2D;
