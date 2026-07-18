"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

const timelineData = [
  {
    type: "experience",
    title: "Software Intern – Python & ML",
    organization: "R3 Systems India Pvt. Ltd.",
    period: "Jan 2026 – Feb 2026",
    detail: "Worked on real-world Python & ML application development workflows. Gained hands-on experience with production-level code and data pipelines.",
    badge: "Internship",
    color: "#7042f8",
  },
  {
    type: "education",
    title: "B.E. – AI & Data Science",
    organization: "SNJB College of Engineering (NAAC A+), SPPU",
    period: "2023 – Expected 2027",
    detail: "Current CGPA: 8.6 / 10. Specializing in Machine Learning, NLP, Computer Vision, and Data Engineering.",
    badge: "Current",
    color: "#00d8ff",
  },
  {
    type: "education",
    title: "HSC – Science (PCM)",
    organization: "SPD Surana College, Chandwad",
    period: "2022",
    detail: "Percentage: 76%. Completed Higher Secondary with a focus on Physics, Chemistry, and Mathematics.",
    badge: "Education",
    color: "#a855f7",
  },
  {
    type: "education",
    title: "SSC – Secondary School",
    organization: "Swami Vivekanand Vidyalay, Dighvad",
    period: "2020",
    detail: "Percentage: 88%. Strong academic foundation with distinction in Mathematics and Science.",
    badge: "Education",
    color: "#06b6d4",
  },
];

export const Experience = () => {
  return (
    <section
      id="experience"
      className="relative flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
    >
      {/* Background glow blobs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-700/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center mb-20"
      >
        <span className="text-sm font-semibold text-[#b49bff] uppercase tracking-widest mb-3">
          My Journey
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-center">
          Experience & Education
        </h1>
        <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
        <p className="mt-4 text-gray-400 text-sm max-w-lg text-center">
          My academic background and professional experience that shaped my journey in AI & Data Science.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative w-full max-w-4xl">
        {/* Center vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-purple-600 via-cyan-500 to-purple-600 opacity-30 hidden md:block" />

        <div className="flex flex-col gap-12">
          {timelineData.map((item, i) => {
            const isLeft = i % 2 === 0;
            const Icon = item.type === "experience" ? FaBriefcase : FaGraduationCap;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: i * 0.12, type: "spring", stiffness: 60 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center gap-4 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Card */}
                <div className="w-full md:w-[calc(50%-2.5rem)]">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.25 }}
                    className="relative p-6 rounded-2xl border border-[#7042f835] bg-gradient-to-br from-[#0d0925]/90 to-[#030014]/95 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgba(112,66,248,0.2)] hover:border-[#7042f870] transition-all duration-400 group overflow-hidden"
                  >
                    {/* Animated glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at ${isLeft ? "top right" : "top left"}, ${item.color}18 0%, transparent 70%)`,
                      }}
                    />

                    {/* Top glow border */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to right, transparent, ${item.color}, transparent)`,
                      }}
                    />

                    {/* Badge + Icon Row */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                        style={{
                          color: item.color,
                          borderColor: `${item.color}60`,
                          backgroundColor: `${item.color}15`,
                        }}
                      >
                        {item.badge}
                      </span>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}50` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                    </div>

                    {/* Period */}
                    <p className="text-xs text-gray-500 font-medium mb-1">{item.period}</p>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-white mb-1 leading-snug">{item.title}</h2>

                    {/* Organization */}
                    <h3
                      className="text-sm font-semibold mb-3"
                      style={{ color: item.color }}
                    >
                      {item.organization}
                    </h3>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#7042f840] to-transparent mb-3" />

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex flex-col items-center justify-center w-10 shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                    viewport={{ once: true }}
                    className="w-5 h-5 rounded-full border-2 border-white z-10 shadow-lg"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 16px ${item.color}`,
                    }}
                  />
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block w-[calc(50%-2.5rem)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
