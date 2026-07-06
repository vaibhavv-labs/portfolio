"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIGURATION CONSTANTS ---
const WARP_START_S = 0.5;
const WARP_FULL_S = 3.0;
const FADE_START_S = 5.5;
const FADE_DURATION_S = 0.8;
const THEME_BG = "#030014";
const COLORS = ["#a855f7", "#6366f1", "#38bdf8", "#ec4899", "#ffffff"];

export function IntroAnimation() {
  const [show, setShow] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsMounted(true);
    // const played = sessionStorage.getItem("introPlayed");
    // if (played) {
    //   setShow(false);
    //   return;
    // }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const tReduced = setTimeout(() => {
        setShow(false);
        // sessionStorage.setItem("introPlayed", "true");
      }, 300);
      return () => clearTimeout(tReduced);
    }

    const tUnmount = setTimeout(() => {
      setShow(false);
      // sessionStorage.setItem("introPlayed", "true");
    }, FADE_START_S * 1000);

    return () => clearTimeout(tUnmount);
  }, []);

  const handleSkip = () => {
    setShow(false);
    // sessionStorage.setItem("introPlayed", "true");
  };

  // Canvas Warp Effect
  useEffect(() => {
    if (!show || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const PARTICLE_COUNT = width < 768 ? 80 : 200;
    const FOV = 250;

    class Particle {
      x: number;
      y: number;
      z: number;
      prevZ: number;
      color: string;

      constructor() {
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;
        this.z = Math.random() * 2000;
        this.prevZ = this.z;
        const isPink = Math.random() > 0.8;
        this.color = isPink ? "#ec4899" : COLORS[Math.floor(Math.random() * (COLORS.length - 1))];
      }

      update(speed: number) {
        this.prevZ = this.z;
        this.z -= speed;
        if (this.z < 1) {
          this.z = 2000;
          this.prevZ = 2000;
          this.x = (Math.random() - 0.5) * 2000;
          this.y = (Math.random() - 0.5) * 2000;
        }
      }

      draw(ctx: CanvasRenderingContext2D, opacity: number) {
        const x = (this.x / this.z) * FOV + width / 2;
        const y = (this.y / this.z) * FOV + height / 2;
        const prevX = (this.x / this.prevZ) * FOV + width / 2;
        const prevY = (this.y / this.prevZ) * FOV + height / 2;

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = this.color;
        
        const zOpacity = Math.max(0, 1 - this.z / 2000) * opacity;
        ctx.globalAlpha = zOpacity;
        ctx.lineWidth = Math.max(1, 4 - (this.z / 500));
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    const startTime = performance.now();

    const render = (time: number) => {
      const elapsedS = (time - startTime) / 1000;
      
      ctx.globalAlpha = 0.3; 
      ctx.fillStyle = THEME_BG;
      ctx.fillRect(0, 0, width, height);

      let speed = 2; 
      let globalOpacity = 1;

      if (elapsedS > WARP_START_S && elapsedS <= WARP_FULL_S) {
        const warpProgress = Math.min(1, (elapsedS - WARP_START_S) / (WARP_FULL_S - WARP_START_S));
        speed = 2 + warpProgress * 45;
      } else if (elapsedS > WARP_FULL_S && elapsedS <= FADE_START_S) {
        speed = 47;
      } else if (elapsedS > FADE_START_S) {
        const endProgress = Math.min(1, (elapsedS - FADE_START_S) / FADE_DURATION_S);
        speed = Math.max(0, 47 - endProgress * 45); 
        globalOpacity = 1 - endProgress;
      }

      particles.forEach(p => {
        p.update(speed);
        p.draw(ctx, globalOpacity);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [show]);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="space-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION_S, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: THEME_BG }}
        >
          {/* Canvas Starfield Warp */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* THE ECLIPSE VISUAL (from the image) replacing the accretion ring */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: [0, 1, 0] }}
            transition={{ 
              times: [0, 0.2, 1], // hits full opacity quickly, slowly fades by the end
              duration: 3.0, 
              delay: 2.5, 
              ease: "easeInOut" 
            }}
            className="absolute z-10 flex justify-center items-center w-[300px] h-[300px] md:w-[600px] md:h-[600px] mt-10 md:mt-20"
          >
            {/* The Gradient Glow (Magenta Center, Deep Blue Edges) */}
            <div
              className="absolute w-full h-full rounded-full"
              style={{
                background: "radial-gradient(circle at 50% 5%, rgba(236,72,153,1) 0%, rgba(99,102,241,0.8) 30%, transparent 60%)",
                filter: "blur(15px)"
              }}
            />
            {/* The Pure Dark Planet */}
            <div
              className="absolute w-full h-full rounded-full"
              style={{ 
                backgroundColor: THEME_BG,
                transform: "translateY(12px)" // shift down to reveal just the top glowing crescent
              }}
            />
          </motion.div>

          {/* Main Text Reveal */}
          <div className="z-20 flex flex-col items-center mt-32 md:mt-48">
            <motion.h1
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 3.2, ease: "easeOut" }}
              className="text-white text-2xl md:text-5xl lg:text-6xl font-light tracking-[0.5em] md:tracking-[0.8em] uppercase text-center ml-[0.5em]"
            >
              Vaibhav
            </motion.h1>
            
            <motion.h1
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 3.5, ease: "easeOut" }}
              className="text-white/60 text-xl md:text-3xl lg:text-4xl font-light tracking-[0.5em] md:tracking-[0.8em] uppercase text-center mt-4 ml-[0.5em]"
            >
              Bhoyate
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 4.0, ease: "easeOut" }}
              className="mt-6 md:mt-10 text-xs md:text-base font-medium tracking-[0.3em] uppercase text-center bg-clip-text text-transparent bg-gradient-to-r from-[#a855f7] via-[#6366f1] to-[#38bdf8]"
            >
              AI & Data Science Engineer
            </motion.h2>
          </div>

          {/* SKIP BUTTON */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={handleSkip}
            className="absolute bottom-8 right-8 text-white/40 hover:text-white text-xs md:text-sm tracking-widest uppercase z-50 transition-colors"
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
