"use client";

import Image from "next/image";
import Link from "next/link";
import { RxGithubLogo } from "react-icons/rx";
import { FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
  github: string;
  stack: readonly string[];
  index: number;
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
  github,
  stack,
  index,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="relative flex flex-col rounded-2xl overflow-hidden border border-[#7042f830] bg-gradient-to-b from-[#0d0d2b] to-[#030014] shadow-[0_0_30px_rgba(112,66,248,0.08)] hover:shadow-[0_0_40px_rgba(112,66,248,0.25)] transition-all duration-500 group"
    >
      {/* Glow top border on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <Image
          src={src}
          alt={title}
          width={800}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 gap-3">
        {/* Title */}
        <h2 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
          {description}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-[3px] text-[11px] font-medium rounded-full bg-[#7042f815] text-[#b49bff] border border-[#7042f840]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#7042f840] to-transparent my-1" />

        {/* Links */}
        <div className="flex gap-3">
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 rounded-full hover:opacity-85 transition-opacity shadow-[0_0_12px_rgba(112,66,248,0.4)]"
          >
            <FaExternalLinkAlt className="w-3 h-3" />
            Live Demo
          </Link>
          <Link
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-gray-200 border border-[#7042f860] px-4 py-2 rounded-full hover:bg-[#7042f820] hover:text-white transition-all"
          >
            <RxGithubLogo className="w-4 h-4" />
            GitHub
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
