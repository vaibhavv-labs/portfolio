"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-5 sm:px-10 md:px-20 mt-24 md:mt-40 w-full z-[20] gap-6 md:gap-0"
    >
      {/* Left: Text content */}
      <div className="h-full w-full flex flex-col gap-4 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[11px] sm:text-[13px]">
            AI &amp; Machine Learning Portfolio
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-full md:max-w-[600px]"
        >
          <span>
            AI &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Data Science
            </span>{" "}
            Engineer
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-sm sm:text-base text-gray-400 my-2 md:my-5 max-w-full md:max-w-[600px]"
        >
          I&apos;m an AI &amp; Data Science Engineering student building intelligent systems with Machine Learning and NLP.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <motion.a
            variants={slideInFromLeft(1)}
            href="#projects"
            className="py-2 button-primary text-center text-white cursor-pointer rounded-lg px-6 w-full sm:w-auto"
          >
            View Projects
          </motion.a>
          <motion.a
            variants={slideInFromLeft(1.2)}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-6 text-center text-white cursor-pointer rounded-lg border border-[#7042f8] hover:bg-[#7042f820] transition w-full sm:w-auto"
          >
            View Resume
          </motion.a>
        </div>
      </div>

      {/* Right: Decorative SVG — hidden on mobile */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="hidden md:flex w-full h-full justify-center items-center"
      >
        <Image
          src="/hero-bg.svg"
          alt="AI work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none"
        />
      </motion.div>
    </motion.div>
  );
};
