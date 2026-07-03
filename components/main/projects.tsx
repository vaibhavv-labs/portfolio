"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-20 px-6"
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center mb-16"
      >
        <span className="text-sm font-semibold text-[#b49bff] uppercase tracking-widest mb-3">
          My Work
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Featured Projects
        </h1>
        <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
        <p className="mt-4 text-gray-400 text-sm max-w-xl text-center">
          A selection of AI & ML projects I've built — from NLP dashboards to computer vision systems.
        </p>
      </motion.div>

      {/* Project grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.title}
            src={project.image}
            title={project.title}
            description={project.description}
            link={project.link}
            github={project.github}
            stack={project.stack}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};
