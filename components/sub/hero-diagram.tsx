"use client";

import { motion } from "framer-motion";
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiHuggingface,
  SiScikitlearn,
  SiOpencv,
} from "react-icons/si";

export const HeroDiagram = () => {
  return (
    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center scale-75 md:scale-100">
      {/* Center Node */}
      <div className="w-24 h-24 rounded-full bg-[#0d0d2b]/80 border border-purple-500/50 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.4)] z-20 backdrop-blur-md">
        <span className="text-4xl animate-pulse">🧠</span>
      </div>

      {/* Orbit Rings */}
      <div className="absolute w-[260px] h-[260px] rounded-full border border-[#7042f840] border-dashed" />
      <div className="absolute w-[400px] h-[400px] rounded-full border border-[#7042f830] border-dashed" />

      {/* Orbit 1 Container (Inner) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[260px] h-[260px] z-10"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-[#0d0d2b]/90 backdrop-blur-sm rounded-full border border-[#7042f860] shadow-[0_0_20px_rgba(112,66,248,0.2)]"
        >
          <SiPython className="text-[#3776AB] text-3xl" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-3 bg-[#0d0d2b]/90 backdrop-blur-sm rounded-full border border-[#7042f860] shadow-[0_0_20px_rgba(112,66,248,0.2)]"
        >
          <SiPytorch className="text-[#EE4C2C] text-3xl" />
        </motion.div>
      </motion.div>

      {/* Orbit 2 Container (Outer) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-[400px] h-[400px] z-0"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-[#0d0d2b]/90 backdrop-blur-sm rounded-full border border-[#7042f860] shadow-[0_0_20px_rgba(112,66,248,0.2)]"
        >
          <SiTensorflow className="text-[#FF6F00] text-3xl" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-3 bg-[#0d0d2b]/90 backdrop-blur-sm rounded-full border border-[#7042f860] shadow-[0_0_20px_rgba(112,66,248,0.2)]"
        >
          <SiHuggingface className="text-[#FFD21E] text-3xl" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 p-3 bg-[#0d0d2b]/90 backdrop-blur-sm rounded-full border border-[#7042f860] shadow-[0_0_20px_rgba(112,66,248,0.2)]"
        >
          <SiScikitlearn className="text-[#F7931E] text-3xl" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-3 bg-[#0d0d2b]/90 backdrop-blur-sm rounded-full border border-[#7042f860] shadow-[0_0_20px_rgba(112,66,248,0.2)]"
        >
          <SiOpencv className="text-[#5C3EE8] text-3xl" />
        </motion.div>
      </motion.div>
    </div>
  );
};
