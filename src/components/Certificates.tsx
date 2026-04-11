import "./styles/Certificates.css";

const certificates = [
  {
    name: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Forage × TATA",
    date: "Apr 2026",
    category: "Data Analytics",
    icon: "📊",
    link: "https://drive.google.com/file/d/15mqiTovVILsjkTksu6IEuFCzsbSOwqcQ/view?usp=drive_link",
  },
  {
    name: "Introduction to Generative AI Studio",
    issuer: "Google Cloud",
    date: "Mar 2026",
    category: "Generative AI",
    icon: "☁️",
    link: "https://drive.google.com/file/d/1babeGC0_dmpf-Kdz2zdCkJsQ4Flx7XwE/view?usp=drive_link",
  },
  {
    name: "Introduction to Large Language Models",
    issuer: "Google Cloud",
    date: "Mar 2026",
    category: "AI / LLMs",
    icon: "🤖",
    link: "https://www.skills.google/public_profiles/bab33e78-8495-41fb-9ef7-b2c1b54b0e39/badges/23306522",
  },
  {
    name: "MongoDB and the Document Model",
    issuer: "MongoDB",
    date: "Mar 2026",
    category: "Database",
    icon: "🍃",
    link: "https://drive.google.com/file/d/1gmYKL-ng2RNcSTdWzl2FtFt7_OgYbKNm/view?usp=drive_link",
  },
  {
    name: "Software Intern Certificate",
    issuer: "R3 Systems India",
    date: "Feb 2026",
    category: "Industry",
    icon: "🏢",
    link: "https://drive.google.com/file/d/14-CKfrW1qnD63tyqCaIe2fIsepF15KDe/view?usp=drive_link",
  },
];

const Certificates = () => {
  return (
    <div className="certificates-section" id="certificates">
      <div className="section-container">
        <div className="certificates-header">
          <h2>
            My <span>Certificates</span>
          </h2>
          <p className="certificates-subtitle">
            Verified achievements &amp; learning milestones
          </p>
        </div>

        <div className="certificates-grid">
          {certificates.map((cert, index) => (
            <div className="cert-card" key={index}>
              {/* Top row: icon + verified badge */}
              <div className="cert-card-top">
                <div className="cert-icon">{cert.icon}</div>
                <span className="cert-verified-badge">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 3L4.5 8.5 2 6"
                      stroke="#7bda8a"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Verified
                </span>
              </div>

              {/* Category badge */}
              <span className="cert-category">{cert.category}</span>

              {/* Certificate name */}
              <p className="cert-name">{cert.name}</p>

              {/* Issuer & date */}
              <div className="cert-meta">
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-date">{cert.date}</p>
              </div>

              <hr className="cert-divider" />

              {/* View button */}
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="cert-btn"
                data-cursor="disable"
              >
                View Certificate
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 11L11 2M11 2H5M11 2V8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
