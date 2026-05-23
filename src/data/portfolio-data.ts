export const personalInfo = {
  name: "Vaibhav Bhoyate",
  firstName: "VAIBHAV",
  lastName: "BHOYATE",
  role: "AI & Data Science Engineer",
  tagline: "Architecting Scalable AI Solutions and Predictive Models",
  bio: "AI & Data Science Engineering student specializing in machine learning, NLP, and model deployment. Passionate about translating complex data into actionable insights and building intelligent systems using Python, Scikit-Learn, and PyTorch.",
  location: "Chandwad, Maharashtra, India",
  education: "B.E. in AI & Data Science",
  educationFull: "Bachelor of Engineering in Artificial Intelligence & Data Science",
  college: "SNJB College of Engineering",
  status: "Open to Work",
  stack: "Python / ML / Data Science",
  email: "vaibhavbhoyate976@gmail.com",
};

export const socialLinks = {
  github: "https://github.com/vaibhavv-labs",
  linkedin: "https://www.linkedin.com/in/vaibhav-bhoyate-6328802a9/",
};

export const skills = [
  {
    category: "Programming Languages",
    icon: "💻",
    description: "Core programming languages for data manipulation, algorithmic development, and database querying.",
    level: "Advanced",
    tools: ["Python", "SQL"]
  },
  {
    category: "AI & Machine Learning",
    icon: "🧠",
    description: "Developing and deploying intelligent models, natural language processing, and feature engineering.",
    level: "Advanced",
    tools: ["Machine Learning", "NLP", "Generative AI", "LLMs", "Scikit-Learn", "Feature Engineering", "Model Deployment"]
  },
  {
    category: "Data Science & Analytics",
    icon: "📊",
    description: "Extracting insights through rigorous statistical analysis, data processing, and visual storytelling.",
    level: "Advanced",
    tools: ["Data Analysis", "Data Visualization", "Statistics", "NumPy", "Pandas", "Matplotlib", "Seaborn"]
  },
  {
    category: "Frameworks & Tools",
    icon: "🛠️",
    description: "Utilizing modern frameworks and version control systems for scalable application development.",
    level: "Intermediate",
    tools: ["Streamlit", "MongoDB", "Git", "GitHub"]
  },
  {
    category: "Currently Exploring",
    icon: "🚀",
    description: "Continuously expanding technical horizons by researching advanced architectures and geospatial data.",
    level: "Learning",
    tools: ["Transformers", "BERT", "Hyperparameter Tuning", "Remote Sensing", "Earth Observation"]
  }
];

export const projects = [
  {
    name: "CodeSentinel AI",
    category: "AI/ML · Cybersecurity",
    description: [
      "AI-driven code analysis tool for detecting software vulnerabilities.",
      "Fine-tuned CodeBERT model achieving 89% accuracy across 8 vulnerability classes.",
      "Features an interactive real-time interface for analyzing uploaded code."
    ],
    tools: "Next.js, Flask, Python, CodeBERT, Gemini AI, PostgreSQL, Vercel, HuggingFace",
    tech: ["Next.js", "Flask", "CodeBERT", "Gemini AI"],
    liveLink: "https://codesentinel-app.vercel.app",
    liveLabel: "Live Demo",
    githubLink: "https://github.com/vaibhavv-labs/CodeSentinel-AI"
  },
  {
    name: "Heart Disease Prediction System",
    category: "Machine Learning Web App",
    description: [
      "Predictive healthcare application estimating heart disease risk from patient vitals.",
      "Implemented Logistic Regression and comprehensive data preprocessing pipelines.",
      "Deployed a responsive, real-time user interface utilizing Streamlit."
    ],
    tools: "Python, Pandas, NumPy, Scikit-learn, Streamlit",
    tech: ["Python", "Scikit-learn", "Streamlit", "Pandas"],
    liveLink: "https://heart-disease-prediction-vaibhav.streamlit.app/",
    liveLabel: "Live App",
    githubLink: "https://github.com/vaibhavv-labs/Heart-Disease-Prediction.git"
  },
  {
    name: "SentimentIQ",
    category: "AI / NLP Web App",
    description: [
      "NLP-powered dashboard for performing sentiment analysis on live social media data.",
      "Integrated YouTube Data API to fetch and analyze real-time comments.",
      "Utilized HuggingFace Transformers for classification and Plotly for visualization."
    ],
    tools: "Python, PyTorch, HuggingFace Transformers, Streamlit, Plotly, YouTube Data API v3, Pandas",
    tech: ["PyTorch", "HuggingFace", "Streamlit"],
    liveLink: "https://sentimentiq-dashboard-njiprgwlcchwkuemvrqwn4.streamlit.app/",
    liveLabel: "Live Demo",
    githubLink: "https://github.com/vaibhavv-labs/sentimentiq-dashboard"
  },
  {
    name: "FaceID Attendance System",
    category: "Computer Vision Web App",
    description: [
      "Computer vision application automating attendance tracking via facial recognition.",
      "Engineered an OpenCV pipeline to detect and verify faces in real-time via webcam.",
      "Instantly logs attendance records and exports formatted data to CSV."
    ],
    tools: "Python, OpenCV, Streamlit, NumPy, Pandas",
    tech: ["Python", "OpenCV", "Streamlit", "NumPy"],
    liveLink: "https://drive.google.com/file/d/1g-efKzypo2mCdXtwn3UwqALjecAiyyw-/view?usp=drive_link",
    liveLabel: "Demo Video",
    githubLink: "https://github.com/vaibhavv-labs/face-attendance-system"
  }
];

export const experience = [
  {
    role: "Machine Learning Intern",
    company: "R3 Systems India Private Limited",
    date: "Jan 2026 - Present",
    description: "Engineered and evaluated predictive machine learning models using real-world datasets. Developed an end-to-end Heart Disease Prediction System utilizing Logistic Regression. Conducted data preprocessing, robust feature selection, and deployed the interactive model interface using Streamlit.",
    current: true
  },
  {
    role: "B.E. in Artificial Intelligence & Data Science",
    company: "SNJB College of Engineering",
    date: "Expected 2027",
    description: "Junior year student with a rigorous focus on AI algorithms, data structures, and statistical modeling. Building a comprehensive foundation in deep learning, regression analysis, natural language processing, and scalable data visualization techniques.",
    current: true
  }
];

export const certificates = [
  {
    name: "Fundamentals of Remote Sensing",
    issuer: "NASA (ARSET)",
    date: "Apr 2026",
    category: "Remote Sensing",
    icon: "🛰️",
    link: "https://drive.google.com/file/d/1p4lfLOlTB47v1pL_CcOUxV0OuI0HPkdu/view",
    description: "Completed NASA ARSET training covering satellite data analysis and Earth observation."
  },
  {
    name: "GenAI Powered Data Analytics",
    issuer: "Forage × TATA",
    date: "Apr 2026",
    category: "Data Analytics",
    icon: "📊",
    link: "https://drive.google.com/file/d/15mqiTovVILsjkTksu6IEuFCzsbSOwqcQ/view?usp=drive_link",
    description: "Job simulation covering generative AI-powered data analytics workflows."
  },
  {
    name: "Intro to Generative AI Studio",
    issuer: "Google Cloud",
    date: "Mar 2026",
    category: "Generative AI",
    icon: "☁️",
    link: "https://drive.google.com/file/d/1babeGC0_dmpf-Kdz2zdCkJsQ4Flx7XwE/view?usp=drive_link",
    description: "Google Cloud training on Generative AI Studio and prompt engineering."
  },
  {
    name: "Intro to Large Language Models",
    issuer: "Google Cloud",
    date: "Mar 2026",
    category: "AI / LLMs",
    icon: "🤖",
    link: "https://www.skills.google/public_profiles/bab33e78-8495-41fb-9ef7-b2c1b54b0e39/badges/23306522",
    description: "Fundamentals of large language models, their architecture, and applications."
  },
  {
    name: "MongoDB and the Document Model",
    issuer: "MongoDB",
    date: "Mar 2026",
    category: "Database",
    icon: "🍃",
    link: "https://drive.google.com/file/d/1gmYKL-ng2RNcSTdWzl2FtFt7_OgYbKNm/view?usp=drive_link",
    description: "MongoDB document model, CRUD operations, and schema design patterns."
  },
  {
    name: "Software Intern Certificate",
    issuer: "R3 Systems India",
    date: "Feb 2026",
    category: "Industry",
    icon: "🏢",
    link: "https://drive.google.com/file/d/14-CKfrW1qnD63tyqCaIe2fIsepF15KDe/view?usp=drive_link",
    description: "Internship completion certificate for Python & ML development."
  }
];

export const stats = [
  { icon: "🚀", value: 4, suffix: "+", label: "Projects Built" },
  { icon: "📜", value: 6, suffix: "+", label: "Certifications" },
  { icon: "⚙️", value: 15, suffix: "+", label: "Technologies" },
  { icon: "💻", value: 50, suffix: "+", label: "GitHub Contributions" }
];

export const funFacts = [
  { emoji: "🔬", text: "AI Enthusiast" },
  { emoji: "🎯", text: "Problem Solver" },
  { emoji: "🐍", text: "Python Lover" },
  { emoji: "📊", text: "Data Nerd" },
  { emoji: "🤖", text: "ML Engineer" },
  { emoji: "🚀", text: "Always Learning" },
  { emoji: "🧠", text: "Deep Learning Explorer" },
  { emoji: "⚡", text: "Fast Learner" },
  { emoji: "🔥", text: "Open Source Contributor" },
  { emoji: "🌐", text: "Tech Explorer" }
];

export const philosophyCards = [
  { number: "01", title: "Data-Driven", description: "Models before assumptions." },
  { number: "02", title: "Clean Code", description: "Readable, maintainable, scalable." },
  { number: "03", title: "AI-First", description: "Leverage ML to solve real problems." },
  { number: "04", title: "Ship Fast", description: "Iterate quickly, learn faster." }
];
