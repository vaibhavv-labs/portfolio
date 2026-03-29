import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Intern (Python & ML)</h4>
                <h5>R3 SYSTEMS INDIA PRIVATE LIMITED</h5>
              </div>
              <h3>Jan 2026</h3>
            </div>
            <p>
              Worked on real-world datasets to build and evaluate machine learning models. Developed a Heart Disease Prediction System using Logistic Regression. Performed data preprocessing, feature selection, and model evaluation, and deployed the model using Streamlit.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.E. in AI & Data Science</h4>
                <h5>SNJB College of Engineering</h5>
              </div>
              <h3>Present</h3>
            </div>
            <p>
              Currently in 3rd Year. Focused on solving real-world problems using data-driven approaches. Building a strong foundation in Machine Learning, Regression, Classification, and Data Visualization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
