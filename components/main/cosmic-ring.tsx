"use client";

import { useRef, useEffect } from "react";

interface RingParticle {
  angle: number;
  speed: number;
  radius: number;
  size: number;
  trail: { x: number; y: number; alpha: number }[];
  hue: number;
  wobblePhase: number;
}

export const CosmicRing = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let animId: number;
    const particles: RingParticle[] = [];
    const PARTICLE_COUNT = 100;
    const BASE_RADIUS = 160;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      resize();
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
        particles.push({
          angle,
          speed: 0.002 + Math.random() * 0.003,
          radius: BASE_RADIUS + (Math.random() - 0.5) * 50,
          size: Math.random() * 2 + 0.5,
          trail: [],
          hue: 260 + (i / PARTICLE_COUNT) * 50,
          wobblePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    let time = 0;
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h * 0.22;

      // Central glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, BASE_RADIUS * 1.8);
      grd.addColorStop(0, "rgba(112, 66, 248, 0.07)");
      grd.addColorStop(0.4, "rgba(0, 216, 255, 0.03)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // Inner bright ring outline
      ctx.beginPath();
      ctx.ellipse(cx, cy, BASE_RADIUS * 0.6, BASE_RADIUS * 0.6 * 0.35, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(112, 66, 248, 0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, BASE_RADIUS, BASE_RADIUS * 0.35, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 216, 255, 0.04)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Particles
      for (const p of particles) {
        p.angle += p.speed;
        p.wobblePhase += 0.008;

        const wobble = Math.sin(p.wobblePhase) * 12;
        const r = p.radius + wobble;
        const x = cx + Math.cos(p.angle) * r;
        const y = cy + Math.sin(p.angle) * r * 0.35;

        // Trail
        p.trail.push({ x, y, alpha: 1 });
        if (p.trail.length > 16) p.trail.shift();

        for (const t of p.trail) {
          t.alpha *= 0.9;
          ctx.beginPath();
          ctx.arc(t.x, t.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 75%, 62%, ${t.alpha * 0.2})`;
          ctx.fill();
        }

        // Main particle
        const brightness = 0.5 + 0.5 * Math.sin(time * 0.015 + p.angle * 2);
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${brightness * 0.6})`;
        ctx.fill();

        // Particle glow
        ctx.beginPath();
        ctx.arc(x, y, p.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${brightness * 0.06})`;
        ctx.fill();
      }

      // Occasional shooting particles (1 in ~300 frames)
      if (Math.random() < 0.003) {
        const sa = Math.random() * Math.PI * 2;
        const sx = cx + Math.cos(sa) * BASE_RADIUS;
        const sy = cy + Math.sin(sa) * BASE_RADIUS * 0.35;
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(sx, sy, 12, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 216, 255, 0.15)";
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    init();
    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
};
