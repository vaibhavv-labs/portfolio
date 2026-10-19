"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
//  "THE DEEP LEARNING GENESIS"
//  A cinematic 3D neural network intro for an AI & ML portfolio.
//
//  Phase 0 — THE VOID:        Camera floats through dark 3D space
//            with drifting math symbols and binary streams.
//  Phase 1 — NETWORK ASSEMBLY: A perspective 3D deep neural network
//            materializes layer by layer, connections fire signals.
//  Phase 2 — THE AWAKENING:   Data floods the network, forward
//            propagation cascades, energy shockwave erupts.
//  Phase 3 — NAME REVEAL:     Particles converge + glitch-decode
//            the name, subtitle types in, camera settles.
//
//  Pure Canvas 2D + perspective projection math. No dependencies.
// ═══════════════════════════════════════════════════════════════

const NAME_TEXT = "VAIBHAV BHOYATE";
const SUBTITLE_TEXT = "AI  &  ML  ENGINEER";
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789∑∇σ∂λΔΘ@#$%&*";

// Math / AI symbols that float in the void
const MATH_SYMBOLS = [
  "∑", "∇", "σ(x)", "∂/∂w", "Δ", "λ", "Θ", "η",
  "W·x+b", "ReLU", "softmax", "argmax", "P(y|x)",
  "∫", "log", "∂L/∂θ", "E[x]", "μ", "∏", "⊗",
  "1/√n", "tanh", "x̂", "β", "α", "ε",
  "01101", "10010", "11001", "00110", "10101",
];

// ─── Color palette ───────────────────────────────────────────
const C = {
  emerald:    [16, 185, 129],
  cyan:       [6, 182, 212],
  purple:     [139, 92, 246],
  pink:       [236, 72, 153],
  white:      [255, 255, 255],
  dimWhite:   [180, 200, 210],
  bg:         [3, 0, 20],
};

function rgba(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }
function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutElastic(t) {
  if (t === 0 || t === 1) return t;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
}
function easeOutBack(t) {
  const c1 = 1.70158;
  return 1 + (c1 + 1) * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

// ═══════════════════════════════════════════════════════════════
//  3D PERSPECTIVE ENGINE (pure math, no WebGL)
// ═══════════════════════════════════════════════════════════════

class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = -600;
    this.rotY = 0;    // yaw
    this.fov = 800;
  }

  // Project a 3D point to 2D screen coords
  project(px, py, pz, screenW, screenH) {
    // Translate relative to camera
    let dx = px - this.x;
    let dy = py - this.y;
    let dz = pz - this.z;

    // Rotate around Y axis (yaw)
    const cosR = Math.cos(this.rotY);
    const sinR = Math.sin(this.rotY);
    const rx = dx * cosR - dz * sinR;
    const rz = dx * sinR + dz * cosR;
    const ry = dy;

    // Perspective divide
    if (rz <= 10) return null; // behind camera
    const scale = this.fov / rz;
    const sx = screenW / 2 + rx * scale;
    const sy = screenH / 2 + ry * scale;

    return { x: sx, y: sy, scale, depth: rz };
  }
}

// ═══════════════════════════════════════════════════════════════
//  3D NEURAL NETWORK STRUCTURE
// ═══════════════════════════════════════════════════════════════

class Neuron3D {
  constructor(x, y, z, layer, index) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.layer = layer;
    this.index = index;
    this.radius = 5;
    this.alpha = 0;
    this.targetAlpha = 0;
    this.activation = 0;   // 0–1, lights up during forward pass
    this.pulsePhase = Math.random() * Math.PI * 2;

    // Color based on layer
    const layerColors = [C.cyan, C.emerald, C.purple, C.emerald, C.pink];
    this.color = layerColors[layer % layerColors.length];
  }

  update(t) {
    this.alpha += (this.targetAlpha - this.alpha) * 0.08;
    // Gentle pulse
    const pulse = Math.sin(t * 0.003 + this.pulsePhase) * 0.15;
    this.displayAlpha = clamp(this.alpha + pulse, 0, 1);
  }

  draw(ctx, cam, W, H) {
    if (this.displayAlpha < 0.01) return;
    const p = cam.project(this.x, this.y, this.z, W, H);
    if (!p || p.x < -50 || p.x > W + 50 || p.y < -50 || p.y > H + 50) return;

    const r = this.radius * p.scale;
    const a = this.displayAlpha * clamp(p.scale * 1.5, 0, 1);
    if (r < 0.3) return;

    // Activation glow (larger, brighter when activated)
    const actGlow = this.activation;
    if (actGlow > 0.01) {
      const glowR = r * (4 + actGlow * 6);
      ctx.beginPath();
      ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
      ctx.fillStyle = rgba(this.color, a * actGlow * 0.12);
      ctx.fill();
    }

    // Outer glow
    ctx.beginPath();
    ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = rgba(this.color, a * 0.1);
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    const coreAlpha = a * (0.6 + actGlow * 0.4);
    ctx.fillStyle = rgba(this.color, coreAlpha);
    ctx.fill();

    // Bright center dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, r * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = rgba(C.white, a * (0.5 + actGlow * 0.5));
    ctx.fill();
  }
}

class Connection3D {
  constructor(from, to) {
    this.from = from;
    this.to = to;
    this.alpha = 0;
    this.targetAlpha = 0;
    this.signalProgress = -1; // -1 = no signal, 0–1 = traveling
    this.signalSpeed = 0.015 + Math.random() * 0.01;
    this.color = C.emerald;
  }

  update() {
    this.alpha += (this.targetAlpha - this.alpha) * 0.06;

    // Signal travel
    if (this.signalProgress >= 0) {
      this.signalProgress += this.signalSpeed;
      if (this.signalProgress > 1) {
        this.signalProgress = -1;
        // Activate destination neuron
        this.to.activation = Math.min(1, this.to.activation + 0.3);
      }
    }
  }

  draw(ctx, cam, W, H) {
    if (this.alpha < 0.01) return;
    const p1 = cam.project(this.from.x, this.from.y, this.from.z, W, H);
    const p2 = cam.project(this.to.x, this.to.y, this.to.z, W, H);
    if (!p1 || !p2) return;

    const avgScale = (p1.scale + p2.scale) / 2;
    const a = this.alpha * clamp(avgScale * 2, 0, 1);
    if (a < 0.01) return;

    // Connection line
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = rgba(this.color, a * 0.15);
    ctx.lineWidth = Math.max(0.5, avgScale * 0.8);
    ctx.stroke();

    // Signal pulse traveling along the connection
    if (this.signalProgress >= 0 && this.signalProgress <= 1) {
      const sp = this.signalProgress;
      const sx = lerp(p1.x, p2.x, sp);
      const sy = lerp(p1.y, p2.y, sp);
      const sr = Math.max(1.5, avgScale * 3);

      // Signal glow
      ctx.beginPath();
      ctx.arc(sx, sy, sr * 3, 0, Math.PI * 2);
      ctx.fillStyle = rgba(C.cyan, a * 0.2);
      ctx.fill();
      // Signal core
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = rgba(C.white, a * 0.8);
      ctx.fill();
    }
  }
}

// Build the neural network architecture in 3D space
function buildNetwork() {
  const layers = [4, 8, 12, 8, 4]; // layer sizes
  const layerSpacing = 200;
  const neurons = [];
  const connections = [];
  const neuronsByLayer = [];

  const totalDepth = (layers.length - 1) * layerSpacing;
  const startZ = -totalDepth / 2;

  for (let l = 0; l < layers.length; l++) {
    const count = layers[l];
    const z = startZ + l * layerSpacing;
    const layerNeurons = [];

    for (let i = 0; i < count; i++) {
      // Arrange neurons in a circle for each layer
      const angle = (i / count) * Math.PI * 2;
      const layerRadius = 60 + count * 8;
      const x = Math.cos(angle) * layerRadius;
      const y = Math.sin(angle) * layerRadius;
      const neuron = new Neuron3D(x, y, z, l, i);
      neurons.push(neuron);
      layerNeurons.push(neuron);
    }
    neuronsByLayer.push(layerNeurons);
  }

  // Create connections between adjacent layers (not all-to-all to avoid clutter)
  for (let l = 0; l < neuronsByLayer.length - 1; l++) {
    const currentLayer = neuronsByLayer[l];
    const nextLayer = neuronsByLayer[l + 1];
    for (const from of currentLayer) {
      // Connect to ~60% of next layer for visual clarity
      const targets = nextLayer.filter(() => Math.random() < 0.6);
      for (const to of targets) {
        const conn = new Connection3D(from, to);
        // Color gradient across layers
        const layerColors = [C.emerald, C.cyan, C.purple, C.pink];
        conn.color = layerColors[l % layerColors.length];
        connections.push(conn);
      }
    }
  }

  return { neurons, connections, neuronsByLayer };
}

// ═══════════════════════════════════════════════════════════════
//  FLOATING MATH SYMBOLS (3D depth particles)
// ═══════════════════════════════════════════════════════════════

class FloatingSymbol {
  constructor(W, H, spread) {
    this.text = MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)];
    this.x = (Math.random() - 0.5) * spread;
    this.y = (Math.random() - 0.5) * spread * 0.6;
    this.z = Math.random() * 1200;
    this.vz = -(0.3 + Math.random() * 0.8);
    this.alpha = 0.15 + Math.random() * 0.25;
    this.size = 10 + Math.random() * 14;
    this.color = [C.emerald, C.cyan, C.purple, C.dimWhite][Math.floor(Math.random() * 4)];
    this.spread = spread;
  }

  update() {
    this.z += this.vz;
    if (this.z < -100) {
      this.z = 1200;
      this.x = (Math.random() - 0.5) * this.spread;
      this.y = (Math.random() - 0.5) * this.spread * 0.6;
    }
  }

  draw(ctx, cam, W, H) {
    const p = cam.project(this.x, this.y, this.z, W, H);
    if (!p) return;
    const a = this.alpha * clamp(p.scale * 2, 0, 1) * clamp(1 - p.depth / 1400, 0, 1);
    if (a < 0.01) return;
    const size = this.size * p.scale;
    if (size < 3) return;
    ctx.font = `${Math.round(size)}px "SF Mono", "Fira Code", monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = rgba(this.color, a);
    ctx.fillText(this.text, p.x, p.y);
  }
}

// ═══════════════════════════════════════════════════════════════
//  DATA STREAM PARTICLES (flow through network)
// ═══════════════════════════════════════════════════════════════

class DataParticle {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.vz = 2 + Math.random() * 4;
    this.life = 1;
    this.decay = 0.005 + Math.random() * 0.01;
    this.radius = 1 + Math.random() * 2;
    this.color = [C.emerald, C.cyan, C.white][Math.floor(Math.random() * 3)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;
    this.life -= this.decay;
  }

  draw(ctx, cam, W, H) {
    if (this.life <= 0) return;
    const p = cam.project(this.x, this.y, this.z, W, H);
    if (!p) return;
    const r = this.radius * p.scale;
    if (r < 0.3) return;
    const a = this.life * clamp(p.scale * 2, 0, 1);
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(this.color, a * 0.7);
    ctx.fill();
  }
}

// ═══════════════════════════════════════════════════════════════
//  SHOCKWAVE RING (3D expanding ring)
// ═══════════════════════════════════════════════════════════════

class ShockwaveRing {
  constructor(z, color) {
    this.z = z;
    this.radius = 0;
    this.maxRadius = 500;
    this.speed = 6;
    this.life = 1;
    this.color = color || C.emerald;
  }
  update() {
    this.radius += this.speed;
    this.life = Math.max(0, 1 - this.radius / this.maxRadius);
  }
  draw(ctx, cam, W, H) {
    if (this.life <= 0) return;
    // Draw ring as a circle of points projected in 3D
    const segments = 48;
    ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const px = Math.cos(angle) * this.radius;
      const py = Math.sin(angle) * this.radius;
      const p = cam.project(px, py, this.z, W, H);
      if (!p) continue;
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = rgba(this.color, this.life * 0.4);
    ctx.lineWidth = 1.5 * this.life;
    ctx.stroke();
  }
}

// ═══════════════════════════════════════════════════════════════
//  STAR FIELD (background depth)
// ═══════════════════════════════════════════════════════════════

class Star {
  constructor(W, H) {
    this.x = (Math.random() - 0.5) * 2000;
    this.y = (Math.random() - 0.5) * 1200;
    this.z = Math.random() * 2000;
    this.alpha = 0.1 + Math.random() * 0.4;
    this.twinkleSpeed = 0.002 + Math.random() * 0.004;
    this.twinkleOffset = Math.random() * Math.PI * 2;
  }

  draw(ctx, cam, W, H, t) {
    const p = cam.project(this.x, this.y, this.z, W, H);
    if (!p) return;
    const twinkle = 0.5 + Math.sin(t * this.twinkleSpeed + this.twinkleOffset) * 0.5;
    const a = this.alpha * twinkle * clamp(p.scale * 3, 0, 1);
    if (a < 0.02) return;
    const r = Math.max(0.5, 1.2 * p.scale);
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(C.dimWhite, a);
    ctx.fill();
  }
}

// ═══════════════════════════════════════════════════════════════
//  HELPER: Draw glitch-decode text
// ═══════════════════════════════════════════════════════════════

function drawGlitchName(ctx, letters, cx, cy, font, charPositions, elapsed, frameCount) {
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const drawX = charPositions[i];

    if (letter.decoded) {
      const timeSinceDecode = elapsed - letter.decodeTime;
      const bounceT = clamp(timeSinceDecode / 500, 0, 1);
      const scale = easeOutElastic(bounceT);
      const rotation = (1 - bounceT) * ((i % 2 === 0 ? 1 : -1) * 0.1);

      ctx.save();
      ctx.translate(drawX, cy);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      ctx.fillStyle = "#fff";
      ctx.fillText(letter.char, 0, 0);
      ctx.restore();

      // Decode flash
      if (timeSinceDecode < 250) {
        const flashA = (1 - timeSinceDecode / 250) * 0.2;
        ctx.beginPath();
        ctx.arc(drawX, cy, 10 + timeSinceDecode * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = rgba(C.emerald, flashA);
        ctx.fill();
      }
    } else if (letter.char !== " ") {
      const charIdx = (Math.floor(frameCount / 3) + i * 7) % GLITCH_CHARS.length;
      const jx = Math.sin(frameCount * 0.4 + i * 2.1) * 1.5;
      const jy = Math.cos(frameCount * 0.6 + i * 1.5) * 1.5;

      const ci = (frameCount + i * 5) % 3;
      if (ci === 0) ctx.fillStyle = rgba(C.emerald, 0.85);
      else if (ci === 1) ctx.fillStyle = rgba(C.cyan, 0.85);
      else ctx.fillStyle = rgba(C.purple, 0.75);

      ctx.fillText(GLITCH_CHARS[charIdx], drawX + jx, cy + jy);
    }
  }
}

function fitFontSize(ctx, text, maxWidth) {
  let size = 140;
  ctx.font = `900 ${size}px "Inter", "SF Pro Display", Arial, sans-serif`;
  while (ctx.measureText(text).width > maxWidth && size > 16) {
    size -= 2;
    ctx.font = `900 ${size}px "Inter", "SF Pro Display", Arial, sans-serif`;
  }
  return size;
}

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export function IntroScreen({ onFinish }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const phaseRef = useRef(0);
  const startRef = useRef(null);
  const finishedRef = useRef(false);
  const [isFading, setIsFading] = useState(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setIsFading(true);
    document.body.style.overflow = "";
    setTimeout(() => onFinish(), 800);
  }, [onFinish]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = () => finish();
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [finish]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    const ctx = canvas.getContext("2d", { alpha: false });
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;

    // ─── Init scene ──────────────────────────────────────
    const camera = new Camera();
    camera.z = -800;

    // Build 3D neural network
    const { neurons, connections, neuronsByLayer } = buildNetwork();

    // Floating math symbols
    const symbols = [];
    for (let i = 0; i < 40; i++) {
      symbols.push(new FloatingSymbol(W, H, 800));
    }

    // Star field
    const stars = [];
    for (let i = 0; i < 120; i++) {
      stars.push(new Star(W, H));
    }

    // Data particles
    const dataParticles = [];

    // Shockwave rings
    const shockwaves = [];

    // ─── Text setup ──────────────────────────────────────
    const fontSize = fitFontSize(ctx, NAME_TEXT, W * 0.82);
    const mainFont = `900 ${fontSize}px "Inter", "SF Pro Display", Arial, sans-serif`;
    const subFontSize = Math.max(12, fontSize * 0.16);
    const subFont = `600 ${subFontSize}px "Inter", "SF Pro Display", Arial, sans-serif`;

    ctx.font = mainFont;
    const totalTextWidth = ctx.measureText(NAME_TEXT).width;
    const charPositions = [];
    let cursorX = W / 2 - totalTextWidth / 2;
    for (let i = 0; i < NAME_TEXT.length; i++) {
      const cw = ctx.measureText(NAME_TEXT[i]).width;
      charPositions.push(cursorX + cw / 2);
      cursorX += cw;
    }

    // Cipher decode state
    const cipherLetters = NAME_TEXT.split("").map((ch) => ({
      char: ch,
      decoded: ch === " ",
      decodeTime: 0,
    }));
    const nonSpaceIndices = [];
    for (let i = 0; i < NAME_TEXT.length; i++) {
      if (NAME_TEXT[i] !== " ") nonSpaceIndices.push(i);
    }
    const decodeOrder = [...nonSpaceIndices].sort(() => Math.random() - 0.5);

    // ─── Phase durations (ms) ────────────────────────────
    const VOID_PHASE = 1800;
    const ASSEMBLY_PHASE = 3200;
    const AWAKENING_PHASE = 2200;
    const REVEAL_PHASE = 2400;

    startRef.current = performance.now();
    phaseRef.current = 0;
    let frameCount = 0;

    // Assembly tracking
    let currentAssemblyLayer = -1;
    let assemblyLayerTime = 0;
    const LAYER_STAGGER = 500; // ms between each layer appearing

    // Awakening tracking
    let signalWaveIndex = 0;
    let lastSignalTime = 0;
    let awakeningShockwaveFired = false;

    // Reveal tracking
    const DECODE_DURATION = REVEAL_PHASE * 0.65;
    const decodeInterval = DECODE_DURATION / decodeOrder.length;
    let subtitleRevealed = 0;

    // ─── ANIMATION LOOP ─────────────────────────────────
    const animate = (now) => {
      if (finishedRef.current && phaseRef.current >= 4) return;

      const elapsed = now - startRef.current;
      const globalTime = now;
      frameCount++;

      // Full clear
      ctx.fillStyle = "#030014";
      ctx.fillRect(0, 0, W, H);

      // ────────────────────────────────────────────────────
      //  Phase 0: THE VOID (~1.8s)
      //  Camera drifts forward, math symbols float, stars twinkle
      // ────────────────────────────────────────────────────
      if (phaseRef.current === 0) {
        const progress = clamp(elapsed / VOID_PHASE, 0, 1);

        // Camera slowly drifts forward
        camera.z = lerp(-800, -600, easeInOutCubic(progress));
        camera.rotY = Math.sin(globalTime * 0.0003) * 0.03;

        // Fade in
        const fadeIn = clamp(elapsed / 600, 0, 1);

        // Stars
        for (const star of stars) {
          star.draw(ctx, camera, W, H, globalTime);
        }

        // Floating symbols
        for (const sym of symbols) {
          sym.update();
          sym.draw(ctx, camera, W, H);
        }

        // Subtle vignette
        const vigGrad = ctx.createRadialGradient(W / 2, H / 2, W * 0.2, W / 2, H / 2, W * 0.7);
        vigGrad.addColorStop(0, "rgba(3,0,20,0)");
        vigGrad.addColorStop(1, "rgba(3,0,20,0.6)");
        ctx.fillStyle = vigGrad;
        ctx.fillRect(0, 0, W, H);

        // Overlay fade-in from black
        if (fadeIn < 1) {
          ctx.fillStyle = rgba(C.bg, 1 - fadeIn);
          ctx.fillRect(0, 0, W, H);
        }

        // "Initializing neural network..." text
        if (progress > 0.3) {
          const textAlpha = clamp((progress - 0.3) / 0.3, 0, 1) * (progress < 0.85 ? 1 : clamp((1 - progress) / 0.15, 0, 1));
          ctx.font = `300 ${Math.max(11, W * 0.012)}px "SF Mono", "Fira Code", monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = rgba(C.emerald, textAlpha * 0.5);
          const dotCount = Math.floor((elapsed * 0.003) % 4);
          ctx.fillText("INITIALIZING NEURAL NETWORK" + ".".repeat(dotCount), W / 2, H * 0.85);
        }

        if (progress >= 1) {
          phaseRef.current = 1;
          startRef.current = now;
          currentAssemblyLayer = 0;
          assemblyLayerTime = 0;
        }
      }

      // ────────────────────────────────────────────────────
      //  Phase 1: NETWORK ASSEMBLY (~3.2s)
      //  Layers materialize one by one, connections draw in,
      //  camera slowly orbits, signals begin firing
      // ────────────────────────────────────────────────────
      else if (phaseRef.current === 1) {
        const progress = clamp(elapsed / ASSEMBLY_PHASE, 0, 1);

        // Camera orbit
        camera.z = lerp(-600, -450, easeOutExpo(progress));
        camera.rotY = lerp(0, Math.PI * 0.35, easeInOutCubic(progress));
        camera.y = lerp(0, -20, progress);

        // Stars (dimmer)
        for (const star of stars) {
          star.draw(ctx, camera, W, H, globalTime);
        }

        // Symbols (fading out)
        const symAlpha = Math.max(0, 1 - progress * 2);
        if (symAlpha > 0.01) {
          ctx.globalAlpha = symAlpha;
          for (const sym of symbols) {
            sym.update();
            sym.draw(ctx, camera, W, H);
          }
          ctx.globalAlpha = 1;
        }

        // Layer-by-layer reveal
        const layerRevealTime = elapsed;
        for (let l = 0; l < neuronsByLayer.length; l++) {
          const layerStart = l * LAYER_STAGGER;
          if (layerRevealTime > layerStart) {
            const layerProgress = clamp((layerRevealTime - layerStart) / 600, 0, 1);
            const ease = easeOutBack(layerProgress);
            for (const neuron of neuronsByLayer[l]) {
              neuron.targetAlpha = ease;
            }
          }
        }

        // Connections: show after both endpoints visible
        for (const conn of connections) {
          if (conn.from.alpha > 0.3 && conn.to.alpha > 0.3) {
            conn.targetAlpha = 1;
          }
        }

        // Fire random signals once connections are established
        if (progress > 0.4 && frameCount % 8 === 0) {
          const visibleConns = connections.filter(c => c.alpha > 0.5 && c.signalProgress < 0);
          if (visibleConns.length > 0) {
            const chosen = visibleConns[Math.floor(Math.random() * visibleConns.length)];
            chosen.signalProgress = 0;
          }
        }

        // Update & draw network
        for (const conn of connections) {
          conn.update();
          conn.draw(ctx, camera, W, H);
        }
        for (const neuron of neurons) {
          neuron.update(globalTime);
          neuron.activation *= 0.97; // decay
          neuron.draw(ctx, camera, W, H);
        }

        // Layer labels
        const labels = ["INPUT", "HIDDEN", "DEEP", "HIDDEN", "OUTPUT"];
        ctx.font = `600 ${Math.max(9, W * 0.008)}px "SF Mono", "Fira Code", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let l = 0; l < neuronsByLayer.length; l++) {
          const layerStart = l * LAYER_STAGGER;
          if (layerRevealTime > layerStart + 400) {
            const labelAlpha = clamp((layerRevealTime - layerStart - 400) / 400, 0, 0.4);
            const n0 = neuronsByLayer[l][0];
            const p = camera.project(0, n0.y > 0 ? 110 : -110, n0.z, W, H);
            if (p) {
              ctx.fillStyle = rgba(C.emerald, labelAlpha);
              ctx.fillText(labels[l], p.x, p.y);
            }
          }
        }

        // Vignette
        const vigGrad = ctx.createRadialGradient(W / 2, H / 2, W * 0.25, W / 2, H / 2, W * 0.65);
        vigGrad.addColorStop(0, "rgba(3,0,20,0)");
        vigGrad.addColorStop(1, "rgba(3,0,20,0.5)");
        ctx.fillStyle = vigGrad;
        ctx.fillRect(0, 0, W, H);

        if (progress >= 1) {
          phaseRef.current = 2;
          startRef.current = now;
        }
      }

      // ────────────────────────────────────────────────────
      //  Phase 2: THE AWAKENING (~2.2s)
      //  Data floods the input, forward prop cascades through all
      //  layers, massive shockwave, network disperses
      // ────────────────────────────────────────────────────
      else if (phaseRef.current === 2) {
        const progress = clamp(elapsed / AWAKENING_PHASE, 0, 1);

        // Camera: pull back slightly, then zoom in fast
        if (progress < 0.6) {
          camera.z = lerp(-450, -400, progress / 0.6);
          camera.rotY = lerp(Math.PI * 0.35, Math.PI * 0.5, easeInOutCubic(progress / 0.6));
        } else {
          const zoomP = (progress - 0.6) / 0.4;
          camera.z = lerp(-400, -250, easeOutExpo(zoomP));
          camera.rotY = lerp(Math.PI * 0.5, Math.PI * 0.6, zoomP);
        }

        // Stars
        for (const star of stars) {
          star.draw(ctx, camera, W, H, globalTime);
        }

        // Spawn data particles flowing into input layer
        if (progress < 0.5 && frameCount % 2 === 0) {
          const inputZ = neuronsByLayer[0][0].z;
          for (let i = 0; i < 3; i++) {
            const dp = new DataParticle(
              (Math.random() - 0.5) * 200,
              (Math.random() - 0.5) * 200,
              inputZ - 200 - Math.random() * 100
            );
            dp.vz = 4 + Math.random() * 3;
            dataParticles.push(dp);
          }
        }

        // Forward propagation wave
        if (progress > 0.1 && progress < 0.7) {
          const waveFront = Math.floor(((progress - 0.1) / 0.6) * neuronsByLayer.length);
          if (waveFront > signalWaveIndex) {
            signalWaveIndex = waveFront;
            // Fire all connections from this layer
            for (const conn of connections) {
              if (conn.from.layer === Math.min(waveFront, neuronsByLayer.length - 2)) {
                conn.signalProgress = 0;
                conn.signalSpeed = 0.04 + Math.random() * 0.02;
              }
            }
            // Activate layer neurons
            if (waveFront < neuronsByLayer.length) {
              for (const n of neuronsByLayer[Math.min(waveFront, neuronsByLayer.length - 1)]) {
                n.activation = 1;
              }
            }
          }
        }

        // Shockwave from output layer
        if (progress > 0.65 && !awakeningShockwaveFired) {
          awakeningShockwaveFired = true;
          const outputZ = neuronsByLayer[neuronsByLayer.length - 1][0].z;
          shockwaves.push(new ShockwaveRing(outputZ, C.emerald));
          shockwaves.push(new ShockwaveRing(outputZ, C.cyan));
          shockwaves.push(new ShockwaveRing(outputZ, C.purple));

          // Burst of particles from output
          for (let i = 0; i < 40; i++) {
            const dp = new DataParticle(
              (Math.random() - 0.5) * 60,
              (Math.random() - 0.5) * 60,
              outputZ
            );
            dp.vx = (Math.random() - 0.5) * 8;
            dp.vy = (Math.random() - 0.5) * 8;
            dp.vz = (Math.random() - 0.5) * 8;
            dp.color = [C.emerald, C.cyan, C.purple][Math.floor(Math.random() * 3)];
            dataParticles.push(dp);
          }
        }

        // Network dispersal in final phase
        const disperseProgress = progress > 0.75 ? (progress - 0.75) / 0.25 : 0;
        if (disperseProgress > 0) {
          const dp = easeOutExpo(disperseProgress);
          for (const neuron of neurons) {
            neuron.x += (neuron.x > 0 ? 1 : -1) * dp * 3;
            neuron.y += (neuron.y > 0 ? 1 : -1) * dp * 3;
            neuron.targetAlpha = Math.max(0, 1 - dp);
          }
          for (const conn of connections) {
            conn.targetAlpha = Math.max(0, 1 - dp * 1.5);
          }
        }

        // White flash at shockwave moment
        if (progress > 0.65 && progress < 0.72) {
          const flashA = (1 - (progress - 0.65) / 0.07) * 0.35;
          ctx.fillStyle = rgba(C.white, flashA);
          ctx.fillRect(0, 0, W, H);
        }

        // Update & draw everything
        for (const conn of connections) {
          conn.update();
          conn.draw(ctx, camera, W, H);
        }
        for (const neuron of neurons) {
          neuron.update(globalTime);
          neuron.activation *= 0.96;
          neuron.draw(ctx, camera, W, H);
        }
        for (let i = dataParticles.length - 1; i >= 0; i--) {
          dataParticles[i].update();
          dataParticles[i].draw(ctx, camera, W, H);
          if (dataParticles[i].life <= 0) dataParticles.splice(i, 1);
        }
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          shockwaves[i].update();
          shockwaves[i].draw(ctx, camera, W, H);
          if (shockwaves[i].life <= 0) shockwaves.splice(i, 1);
        }

        // Vignette
        const vigGrad = ctx.createRadialGradient(W / 2, H / 2, W * 0.15, W / 2, H / 2, W * 0.6);
        vigGrad.addColorStop(0, "rgba(3,0,20,0)");
        vigGrad.addColorStop(1, "rgba(3,0,20,0.6)");
        ctx.fillStyle = vigGrad;
        ctx.fillRect(0, 0, W, H);

        if (progress >= 1) {
          phaseRef.current = 3;
          startRef.current = now;
        }
      }

      // ────────────────────────────────────────────────────
      //  Phase 3: NAME REVEAL (~2.4s)
      //  Glitch-decode name, subtitle typewriter, ambient particles
      // ────────────────────────────────────────────────────
      else if (phaseRef.current === 3) {
        const progress = clamp(elapsed / REVEAL_PHASE, 0, 1);

        // Stars (background life)
        camera.rotY = 0;
        camera.z = -600;
        for (const star of stars) {
          star.draw(ctx, camera, W, H, globalTime);
        }

        // Ambient floating particles
        if (frameCount % 3 === 0 && dataParticles.length < 30) {
          const dp = new DataParticle(
            (Math.random() - 0.5) * W * 1.5,
            (Math.random() - 0.5) * H * 1.5,
            200 + Math.random() * 600
          );
          dp.vz = -0.5;
          dp.vx = (Math.random() - 0.5) * 0.5;
          dp.vy = (Math.random() - 0.5) * 0.5;
          dp.decay = 0.003;
          dataParticles.push(dp);
        }

        for (let i = dataParticles.length - 1; i >= 0; i--) {
          dataParticles[i].update();
          dataParticles[i].draw(ctx, camera, W, H);
          if (dataParticles[i].life <= 0) dataParticles.splice(i, 1);
        }

        // Shockwave cleanup
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          shockwaves[i].update();
          shockwaves[i].draw(ctx, camera, W, H);
          if (shockwaves[i].life <= 0) shockwaves.splice(i, 1);
        }

        // Decode letters
        for (let i = 0; i < decodeOrder.length; i++) {
          const letterIdx = decodeOrder[i];
          const decodeAt = i * decodeInterval;
          if (elapsed >= decodeAt && !cipherLetters[letterIdx].decoded) {
            cipherLetters[letterIdx].decoded = true;
            cipherLetters[letterIdx].decodeTime = elapsed;
          }
        }

        // Chromatic aberration on name
        const allDecoded = cipherLetters.every(l => l.decoded);
        const aberration = allDecoded
          ? Math.max(0, 5 * (1 - (elapsed - decodeOrder.length * decodeInterval) / 400))
          : 2.5 + Math.sin(elapsed * 0.008) * 1.5;

        // Draw the glitch name
        drawGlitchName(ctx, cipherLetters, W / 2, H / 2, mainFont, charPositions, elapsed, frameCount);

        // Chromatic aberration overlay
        if (aberration > 0.5) {
          const decodedText = cipherLetters.map(l => l.decoded ? l.char : " ").join("");
          ctx.font = mainFont;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.globalCompositeOperation = "lighter";
          ctx.fillStyle = rgba([255, 30, 30], 0.06);
          ctx.fillText(decodedText, W / 2 - aberration, H / 2);
          ctx.fillStyle = rgba([30, 80, 255], 0.06);
          ctx.fillText(decodedText, W / 2 + aberration, H / 2 + aberration * 0.3);
          ctx.globalCompositeOperation = "source-over";
        }

        // Glow behind name (once all decoded)
        if (allDecoded) {
          ctx.save();
          ctx.shadowColor = rgba(C.emerald, 0.6);
          ctx.shadowBlur = 30;
          ctx.font = mainFont;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "rgba(255,255,255,0)"; // invisible fill, just for shadow
          ctx.fillText(NAME_TEXT, W / 2, H / 2);
          ctx.restore();
        }

        // Underline
        const lineProgress = clamp((progress - 0.5) / 0.2, 0, 1);
        if (lineProgress > 0) {
          const lineEase = easeOutExpo(lineProgress);
          const lineY = H / 2 + fontSize * 0.45;
          const lineHalfW = (totalTextWidth * 0.5) * lineEase;
          const lineGrad = ctx.createLinearGradient(W / 2 - lineHalfW, lineY, W / 2 + lineHalfW, lineY);
          lineGrad.addColorStop(0, "rgba(16,185,129,0)");
          lineGrad.addColorStop(0.2, "rgba(16,185,129,0.5)");
          lineGrad.addColorStop(0.5, "rgba(6,182,212,0.7)");
          lineGrad.addColorStop(0.8, "rgba(16,185,129,0.5)");
          lineGrad.addColorStop(1, "rgba(16,185,129,0)");
          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(W / 2 - lineHalfW, lineY);
          ctx.lineTo(W / 2 + lineHalfW, lineY);
          ctx.stroke();
        }

        // Typewriter subtitle
        const typeStart = 0.55;
        if (progress > typeStart) {
          const typeProgress = clamp((progress - typeStart) / 0.35, 0, 1);
          subtitleRevealed = Math.floor(typeProgress * SUBTITLE_TEXT.length);
          const visibleSub = SUBTITLE_TEXT.substring(0, subtitleRevealed);
          const showCursor = subtitleRevealed < SUBTITLE_TEXT.length || Math.sin(elapsed * 0.008) > 0;
          const subY = H / 2 + fontSize * 0.65;

          ctx.font = subFont;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.letterSpacing = "0.35em";
          ctx.fillStyle = rgba(C.emerald, 0.9);
          ctx.fillText(visibleSub, W / 2, subY);

          if (showCursor) {
            const subWidth = ctx.measureText(visibleSub).width;
            ctx.fillRect(W / 2 + subWidth / 2 + 4, subY - subFontSize * 0.4, 2, subFontSize * 0.8);
          }
        }

        // Vignette
        const vigGrad = ctx.createRadialGradient(W / 2, H / 2, W * 0.2, W / 2, H / 2, W * 0.65);
        vigGrad.addColorStop(0, "rgba(3,0,20,0)");
        vigGrad.addColorStop(1, "rgba(3,0,20,0.5)");
        ctx.fillStyle = vigGrad;
        ctx.fillRect(0, 0, W, H);

        if (progress >= 1) {
          phaseRef.current = 4;
          finish();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    // Resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const r = container.getBoundingClientRect();
        const d = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(r.width * d);
        canvas.height = Math.floor(r.height * d);
        canvas.style.width = r.width + "px";
        canvas.style.height = r.height + "px";
        ctx.setTransform(d, 0, 0, d, 0, 0);
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#030014] transition-opacity duration-800 ease-out cursor-pointer ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onClick={finish}
      role="button"
      tabIndex={0}
      aria-label="Skip intro"
    >
      <div ref={containerRef} className="relative w-full h-full">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      {/* Skip hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500/60">
          Click anywhere to skip
        </span>
      </div>
    </div>
  );
}
