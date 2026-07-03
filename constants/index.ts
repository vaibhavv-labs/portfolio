import { FaYoutube, FaFacebook, FaWhatsapp } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

import {
  SiPython,
  SiPytorch,
  SiScikitlearn,
  SiHuggingface,
  SiOpencv,
  SiPandas,
  SiNumpy,
  SiStreamlit,
  SiMongodb,
  SiGit,
  SiGithub,
  SiMysql,
} from "react-icons/si";
import { FaChartBar, FaChartLine } from "react-icons/fa";

export const SKILL_DATA = [
  { skill_name: "Python", Icon: SiPython, color: "#3776AB" },
  { skill_name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
  { skill_name: "Scikit-Learn", Icon: SiScikitlearn, color: "#F7931E" },
  { skill_name: "HuggingFace", Icon: SiHuggingface, color: "#FFD21E" },
  { skill_name: "OpenCV", Icon: SiOpencv, color: "#5C3EE8" },
] as const;

export const FRONTEND_SKILL = [
  { skill_name: "Pandas", Icon: SiPandas, color: "#150458" },
  { skill_name: "NumPy", Icon: SiNumpy, color: "#013243" },
  { skill_name: "Matplotlib", Icon: FaChartBar, color: "#ffffff" },
  { skill_name: "Seaborn", Icon: FaChartLine, color: "#4C72B0" },
] as const;

export const BACKEND_SKILL = [
  { skill_name: "SQL", Icon: SiMysql, color: "#4479A1" },
  { skill_name: "Streamlit", Icon: SiStreamlit, color: "#FF4B4B" },
  { skill_name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { skill_name: "Git", Icon: SiGit, color: "#F05032" },
  { skill_name: "GitHub", Icon: SiGithub, color: "#ffffff" },
] as const;

export const FULLSTACK_SKILL = [] as const;
export const OTHER_SKILL = [] as const;

export const SOCIALS = [
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/vaibhavv-labs",
  },
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/vaibhav-bhoyate-6328802a9/",
  },
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://www.instagram.com/va1bhav__09?igsh=MWpjNHBkNWl0bHhoZw==",
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    link: "https://wa.me/918830269849",
  }
] as const;

export const PROJECTS = [
  {
    title: "CodeSentinel AI",
    description: "AI-driven code analysis tool detecting software vulnerabilities. Fine-tuned CodeBERT model, 89% accuracy across 8 vulnerability classes, real-time interface for uploaded code.",
    image: "/projects/codesentinel.png",
    link: "https://codesentinel-app.vercel.app/",
    github: "https://github.com/vaibhavv-labs/CodeSentinel-AI",
    stack: ["Next.js", "Flask", "CodeBERT", "Gemini AI"]
  },
  {
    title: "Heart Disease Prediction System",
    description: "Predictive healthcare app estimating heart disease risk from patient vitals using Logistic Regression + preprocessing pipeline, Streamlit UI.",
    image: "/projects/heart_disease.png",
    link: "https://heart-disease-prediction-vaibhav.streamlit.app/",
    github: "https://github.com/vaibhavv-labs/Heart-Disease-Prediction",
    stack: ["Python", "Scikit-learn", "Streamlit", "Pandas"]
  },
  {
    title: "SentimentIQ",
    description: "NLP dashboard for sentiment analysis on live social media data, YouTube Data API integration, HuggingFace Transformers + Plotly.",
    image: "/projects/sentimentiq.png",
    link: "https://sentimentiq-dashboard-njiprgwlcchwkuemvrqwn4.streamlit.app/",
    github: "https://github.com/vaibhavv-labs/sentimentiq-dashboard",
    stack: ["PyTorch", "HuggingFace", "Streamlit"]
  },
  {
    title: "FaceID Attendance System",
    description: "Automates attendance via facial recognition using OpenCV real-time webcam pipeline, logs + exports CSV.",
    image: "/projects/faceid.png",
    link: "https://github.com/vaibhavv-labs/face-attendance-system",
    github: "https://github.com/vaibhavv-labs/face-attendance-system",
    stack: ["Python", "OpenCV", "Streamlit", "NumPy"]
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/vaibhavv-labs",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://www.instagram.com/va1bhav__09?igsh=MWpjNHBkNWl0bHhoZw==",
      },
      {
        name: "Twitter",
        icon: RxTwitterLogo,
        link: "https://x.com/VaibhavBho98362",
      },
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/vaibhav-bhoyate-6328802a9/",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "WhatsApp: +91 8830269849",
        icon: null,
        link: "https://wa.me/918830269849",
      },
      {
        name: "vaibhavbhoyate976@gmail.com",
        icon: null,
        link: "mailto:vaibhavbhoyate976@gmail.com",
      },
      {
        name: "Chandwad, Maharashtra, India",
        icon: null,
        link: "#",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Contact",
    link: "#contact",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/sanidhyy/space-portfolio",
};
