"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useState, useEffect } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { NeuralBackground } from "./neural-bg";
import {
  slideInFromLeft,
  slideInFromTop,
} from "@/lib/motion";
import {
  FaGraduationCap,
  FaCertificate,
  FaProjectDiagram,
  FaBriefcase,
} from "react-icons/fa";

/* ─── Stats Data ─── */
const stats = [
  {
    value: 8.6,
    label: "CGPA",
    suffix: "",
    icon: FaGraduationCap,
    color: "#00d8ff",
    isFloat: true,
  },
  {
    value: 4,
    label: "ML Projects",
    suffix: "+",
    icon: FaProjectDiagram,
    color: "#7042f8",
    isFloat: false,
  },
  {
    value: 7,
    label: "Certifications",
    suffix: "+",
    icon: FaCertificate,
    color: "#a855f7",
    isFloat: false,
  },
  {
    value: 1,
    label: "Internship",
    suffix: "",
    icon: FaBriefcase,
    color: "#06b6d4",
    isFloat: false,
  },
];

/* ─── Animated Counter ─── */
function AnimatedCounter({
  value,
  suffix,
  isFloat = false,
  animate,
}: {
  value: number;
  suffix: string;
  isFloat?: boolean;
  animate: boolean;
}) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!animate) return;
    const duration = 2000;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = eased * value;

      setDisplay(isFloat ? current.toFixed(1) : Math.floor(current).toString());

      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [animate, value, isFloat]);

  return (
    <>
      {display}
      {suffix}
    </>
  );
}

/* ─── About Section ─── */
export const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about-me"
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Neural network canvas background */}
      <NeuralBackground />

      {/* Ambient glow blobs */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-purple-700/[0.07] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.05] rounded-full blur-[180px] pointer-events-none" />

      <div
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20"
      >
        {/* ───── LEFT: 3D Photo ───── */}
        <motion.div
          variants={slideInFromLeft(0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative flex-shrink-0 flex items-center justify-center"
        >
          <div
            className="relative w-72 h-72 md:w-80 md:h-80"
            style={{ perspective: "800px" }}
          >
            {/* 3D Orbiting Ring 1 */}
            <div
              className="absolute inset-[-16px] rounded-full ring-3d-1 pointer-events-none"
              style={{
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "rgba(168, 85, 247, 0.30)",
              }}
            />
            {/* 3D Orbiting Ring 2 */}
            <div
              className="absolute inset-[-28px] rounded-full ring-3d-2 pointer-events-none"
              style={{
                borderWidth: "1.5px",
                borderStyle: "solid",
                borderColor: "rgba(0, 216, 255, 0.22)",
              }}
            />
            {/* 3D Orbiting Ring 3 */}
            <div
              className="absolute inset-[-8px] rounded-full ring-3d-3 pointer-events-none"
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgba(168, 85, 247, 0.15)",
              }}
            />

            {/* Glow behind photo */}
            <div className="absolute inset-[-20px] rounded-full bg-gradient-to-tr from-purple-600/25 to-cyan-500/20 blur-[50px] pointer-events-none" />

            {/* Spinning gradient border */}
            <div className="absolute inset-0 rounded-full photo-gradient-spin" />

            {/* Photo container */}
            <div className="absolute inset-[3px] rounded-full overflow-hidden bg-[#030014] shadow-[0_0_80px_rgba(112,66,248,0.35)]">
              {!imgError ? (
                <Image
                  src="/profile.jpeg"
                  alt="Vaibhav Bhoyate"
                  fill
                  className="object-cover"
                  onError={() => setImgError(true)}
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0d0925] to-[#030014]">
                  <span className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 select-none">
                    VB
                  </span>
                </div>
              )}
              {/* Holographic shimmer overlay */}
              <div className="absolute inset-0 photo-shimmer pointer-events-none" />
            </div>

            {/* Floating particles around photo */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const dist = 48 + (i % 3) * 8;
              return (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    top: `${50 + Math.sin(angle) * dist}%`,
                    left: `${50 + Math.cos(angle) * dist}%`,
                    backgroundColor:
                      i % 2 === 0 ? "#7042f8" : "#00d8ff",
                    boxShadow: `0 0 8px ${
                      i % 2 === 0 ? "#7042f8" : "#00d8ff"
                    }`,
                  }}
                  animate={{
                    y: [0, -12, 0, 12, 0],
                    x: [0, 8, 0, -8, 0],
                    opacity: [0.2, 0.7, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 4 + i * 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.25,
                  }}
                />
              );
            })}
          </div>
        </motion.div>

        {/* ───── RIGHT: Content ───── */}
        <div className="flex flex-col gap-5 text-center lg:text-left max-w-xl">
          {/* Badge */}
          <motion.div
            variants={slideInFromTop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto lg:mx-0"
          >
            <div className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]">
              <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
              <h1 className="Welcome-text text-[13px]">Know About Me</h1>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={slideInFromLeft(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white leading-tight"
          >
            Crafting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Intelligent Systems
            </span>{" "}
            with Precision
          </motion.h2>

          {/* Story paragraphs */}
          <motion.div
            variants={slideInFromLeft(0.7)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gray-400 text-sm md:text-[15px] leading-relaxed space-y-4"
          >
            <p>
              I&apos;m <strong className="text-white">Vaibhav Bhoyate</strong>, a B.E. student in Artificial Intelligence &amp; Data Science at SNJB College of Engineering (SPPU, NAAC A+). I&apos;m passionate about <strong className="text-purple-300">Artificial Intelligence</strong>, <strong className="text-purple-300">Machine Learning</strong>, and <strong className="text-purple-300">Natural Language Processing</strong>, building real-world AI solutions using Python and modern ML frameworks.
            </p>
            <p>
              From fine-tuning <strong className="text-cyan-300">CodeBERT</strong> for vulnerability detection to developing real-time <strong className="text-cyan-300">facial recognition</strong> systems, I enjoy solving challenging problems through intelligent software. I&apos;m currently seeking opportunities to contribute to impactful AI research and engineering teams.
            </p>
          </motion.div>

          {/* Stat counters */}
          <motion.div
            variants={slideInFromLeft(0.9)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group flex flex-col items-center p-4 rounded-xl border border-[#7042f825] bg-gradient-to-b from-[#0d0925]/60 to-[#030014]/80 backdrop-blur-sm hover:border-[#7042f860] hover:shadow-[0_0_25px_rgba(112,66,248,0.12)] transition-all duration-300"
              >
                <stat.icon
                  className="text-base mb-2 group-hover:scale-110 transition-transform"
                  style={{ color: stat.color }}
                />
                <span className="text-2xl font-bold text-white">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isFloat={stat.isFloat}
                    animate={inView}
                  />
                </span>
                <span className="text-[11px] text-gray-500 mt-1 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={slideInFromLeft(1.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-3 mt-3 mx-auto lg:mx-0"
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative py-3 px-8 button-primary text-center text-white rounded-lg font-semibold overflow-hidden"
            >
              <span className="relative z-10">Download Resume</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-white/10 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>
            <a
              href="#contact"
              className="py-3 px-8 text-center text-white rounded-lg border border-[#7042f8] hover:bg-[#7042f820] transition-all duration-300 font-semibold hover:shadow-[0_0_20px_rgba(112,66,248,0.2)]"
            >
              Let&apos;s Talk
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
