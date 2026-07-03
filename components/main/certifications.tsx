"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  SiGooglecloud,
  SiMongodb,
  SiPython,
} from "react-icons/si";
import { FaAward, FaSatellite, FaBuilding } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { IconType } from "react-icons";

type Cert = {
  title: string;
  issuer: string;
  date: string;
  link: string;
  Icon: IconType;
  color: string;
  bgColor: string;
};

const certifications: Cert[] = [
  {
    title: "Fundamentals of Remote Sensing",
    issuer: "NASA (ARSET)",
    date: "April 2026",
    link: "/certifications/Fundamentals%20of%20Remote%20Sensing.pdf",
    Icon: FaSatellite,
    color: "#0b3d91",
    bgColor: "#0b3d9120",
  },
  {
    title: "GenAI Powered Data Analytics",
    issuer: "Forage × TATA",
    date: "April 2026",
    link: "/certifications/completion_certificate.pdf",
    Icon: FaAward,
    color: "#00a0e3",
    bgColor: "#00a0e320",
  },
  {
    title: "Intro to Generative AI Studio",
    issuer: "Google Cloud",
    date: "March 2026",
    link: "/certifications/Generative%20AI%20certificate.pdf",
    Icon: SiGooglecloud,
    color: "#4285F4",
    bgColor: "#4285F420",
  },
  {
    title: "Intro to Large Language Models",
    issuer: "Google Cloud",
    date: "March 2026",
    link: "https://www.skills.google/public_profiles/bab33e78-8495-41fb-9ef7-b2c1b54b0e39/badges/23306522?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
    Icon: SiGooglecloud,
    color: "#34A853",
    bgColor: "#34A85320",
  },
  {
    title: "MongoDB & the Document Model",
    issuer: "MongoDB",
    date: "March 2026",
    link: "/certifications/vaibhav-bhoyate-5866a860-f464-456c-ae99-a54318155005-certificate.pdf",
    Icon: SiMongodb,
    color: "#47A248",
    bgColor: "#47A24820",
  },
  {
    title: "Python Programming",
    issuer: "Reliance Foundation",
    date: "May 2026",
    link: "/certifications/python.pdf",
    Icon: SiPython,
    color: "#FFD43B",
    bgColor: "#FFD43B20",
  },
  {
    title: "Software Intern Certificate",
    issuer: "R3 Systems India Pvt. Ltd.",
    date: "February 2026",
    link: "/certifications/Vaibhav%20Baban%20Bhoyate.pdf",
    Icon: FaBuilding,
    color: "#a855f7",
    bgColor: "#a855f720",
  },
];

export const Certifications = () => {
  return (
    <section
      id="certifications"
      className="relative flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-purple-700/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center mb-16"
      >
        <span className="text-sm font-semibold text-[#b49bff] uppercase tracking-widest mb-3">
          Credentials
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-center">
          Certifications
        </h1>
        <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
        <p className="mt-4 text-gray-400 text-sm max-w-lg text-center">
          Verified credentials from globally recognized organizations in AI, Cloud, and Data Science.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <Link
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col h-full p-6 rounded-2xl border border-[#7042f830] bg-gradient-to-br from-[#0d0925]/80 to-[#030014] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgba(112,66,248,0.2)] hover:border-[#7042f860] transition-all duration-400 relative overflow-hidden"
            >
              {/* Top glow line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to right, transparent, ${cert.color}, transparent)`,
                }}
              />

              {/* Subtle glow bg on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at top left, ${cert.color}15 0%, transparent 70%)`,
                }}
              />

              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg shrink-0"
                style={{
                  backgroundColor: cert.bgColor,
                  border: `1px solid ${cert.color}50`,
                }}
              >
                <cert.Icon className="w-6 h-6" style={{ color: cert.color }} />
              </div>

              {/* Title */}
              <h2 className="text-base font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-cyan-300 transition-all duration-300 leading-snug mb-2 flex-grow">
                {cert.title}
              </h2>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#7042f840] to-transparent my-3" />

              {/* Footer row */}
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: cert.color }}
                  >
                    {cert.issuer}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{cert.date}</p>
                </div>
                <div
                  className="flex items-center gap-1 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: cert.color }}
                >
                  <HiExternalLink className="w-4 h-4" />
                  <span>View</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
