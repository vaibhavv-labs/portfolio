import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    
    // Fix: If there are too few projects, animation ends up negative and crashes the site.
    if (translateX < 0) {
      translateX = 0;
    }
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              name: "Heart Disease Prediction System",
              category: "Machine Learning Web App",
              tools: "Python, Pandas, NumPy, Scikit-learn, Streamlit",
              link: "https://heart-disease-prediction-vaibhav.streamlit.app/",
              github: "https://github.com/vaibhavv-labs/Heart-Disease-Prediction.git",
              images: ["/images/project1.png", "/images/project2.png"],
              imageAlts: ["Heart Disease Prediction Part 1", "Heart Disease Prediction Part 2"],
              liveLabel: "Live App"
            },
            {
              name: "SentimentIQ – NLP-Based Social Media Sentiment Analysis Dashboard",
              category: "AI / NLP Web App",
              tools: "Python, PyTorch, HuggingFace Transformers, Streamlit, Plotly, YouTube Data API v3, Pandas",
              link: "https://sentimentiq-dashboard-njiprgwlcchwkuemvrqwn4.streamlit.app/",
              github: "https://github.com/vaibhavv-labs/sentimentiq-dashboard",
              images: ["/images/sentimentiq1.png"],
              imageAlts: ["SentimentIQ Dashboard Preview"],
              liveLabel: "Live Demo"
            }
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', zIndex: 10, position: 'relative' }}>
                  <a href={project.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#fff', border: '1px solid #fff', padding: '0.6rem 1.2rem', borderRadius: '4px', fontSize: '1rem' }} data-cursor="disable">{project.liveLabel}</a>
                  <a href={project.github} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#fff', border: '1px solid #fff', padding: '0.6rem 1.2rem', borderRadius: '4px', fontSize: '1rem' }} data-cursor="disable">GitHub</a>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, padding: '1rem' }}>
                {project.images.map((img, i) => (
                  <WorkImage key={i} image={img} alt={project.imageAlts[i]} link={i === 0 ? project.link : project.github} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
