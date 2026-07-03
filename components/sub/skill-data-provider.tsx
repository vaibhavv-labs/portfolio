"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { IconType } from "react-icons";

type SkillDataProviderProps = {
  Icon: IconType;
  name: string;
  width?: number;
  height?: number;
  index: number;
  color?: string;
};

export const SkillDataProvider = ({
  Icon,
  name,
  index,
  color = "#ffffff",
}: SkillDataProviderProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const animationDelay = 0.1;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      custom={index}
      transition={{ delay: index * animationDelay }}
    >
      <div className="flex flex-col items-center justify-center gap-2 group cursor-pointer hover:scale-110 transition-transform">
        <Icon className="h-16 w-16 transition-colors duration-300" style={{ color }} />
        <span className="text-gray-400 text-xs font-semibold mt-1">{name}</span>
      </div>
    </motion.div>
  );
};
