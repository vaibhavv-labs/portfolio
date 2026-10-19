"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
// Neural-network intro animation for an AI & ML portfolio.
// Phase 0 — Neural network nodes pulse and connect (≈3 s)
// Phase 1 — SHOCKWAVE: nodes explode outward + screen flash
// Phase 2 — CIPHER DECODE: glitch text decodes letter by letter
//           with chromatic aberration, pulse rings, particles
// Phase 3 — SUBTITLE types in with cursor blink, then fade out
// ─────────────────────────────────────────────────────────────

const EMERALD = { r: 16, g: 185, b: 129 };
const CYAN    = { r: 6,  g: 182, b: 212 };
const WHITE   = { r: 255, g: 255, b: 255 };

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>{}[]|/\\+=~^";
const NAME_TEXT = "VAIBHAV BHOYATE";
const SUBTITLE_TEXT = "AI  &  ML  ENGINEER";

function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
function easeOutElastic(t) {
  if (t === 0 || t === 1) return t;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
}

// ─── Node ────────────────────────────────────────────────────
class NeuralNode {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.targetX = x;
    this.targetY = y;
    this.radius = Math.random() * 2.5 + 1.2;
    this.baseRadius = this.radius;
    this.pulseOffset = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.02 + Math.random() * 0.03;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.w = w;
    this.h = h;

    // Explosion velocity (set during shockwave)
    this.explosionVx = 0;
    this.explosionVy = 0;

    // Pick a random color from the palette
    const colors = [EMERALD, CYAN, WHITE];
    const c = colors[Math.floor(Math.random() * colors.length)];
    this.r = c.r; this.g = c.g; this.b = c.b;
    this.alpha = Math.random() * 0.5 + 0.3;
    this.baseAlpha = this.alpha;
  }

  // Phase 0: wander
  wander(t) {
    this.x += this.vx;
    this.y += this.vy;

    // Soft bounce
    if (this.x < 0 || this.x > this.w) this.vx *= -1;
    if (this.y < 0 || this.y > this.h) this.vy *= -1;
    this.x = clamp(this.x, 0, this.w);
    this.y = clamp(this.y, 0, this.h);

    // Pulse
    this.radius = this.baseRadius + Math.sin(t * this.pulseSpeed + this.pulseOffset) * 1;
    this.alpha = this.baseAlpha + Math.sin(t * this.pulseSpeed * 0.7 + this.pulseOffset) * 0.15;
  }

  draw(ctx) {
    const a = clamp(this.alpha, 0, 1);
    if (a < 0.01) return;
    // Glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${a * 0.08})`;
    ctx.fill();
    // Core
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${a})`;
    ctx.fill();
  }
}

// ─── Spark Particle (for shockwave) ─────────────────────────
class Spark {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 8;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1;
    this.decay = 0.01 + Math.random() * 0.03;
    this.radius = 0.5 + Math.random() * 2;
    const colors = [EMERALD, CYAN, { r: 139, g: 92, b: 246 }]; // add purple
    const c = colors[Math.floor(Math.random() * colors.length)];
    this.r = c.r; this.g = c.g; this.b = c.b;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.97;
    this.vy *= 0.97;
    this.life -= this.decay;
  }
  draw(ctx) {
    if (this.life <= 0) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.life * 0.8})`;
    ctx.fill();
  }
}

// ─── Connections ─────────────────────────────────────────────
function drawConnections(ctx, nodes, maxDist, globalAlpha) {
  for (let i = 0; i < nodes.length; i++) {
    let conns = 0;
    for (let j = i + 1; j < nodes.length && conns < 5; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const a = (1 - dist / maxDist) * 0.28 * globalAlpha;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(16,185,129,${a})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        conns++;
      }
    }
  }
}

// ─── Subtle grid background ─────────────────────────────────
function drawGrid(ctx, w, h, alpha) {
  const spacing = 60;
  ctx.strokeStyle = `rgba(16,185,129,${0.03 * alpha})`;
  ctx.lineWidth = 0.5;
  for (let x = 0; x < w; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.fillStyle = `rgba(16,185,129,${0.06 * alpha})`;
  for (let x = 0; x < w; x += spacing) {
    for (let y = 0; y < h; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// ─── Pulse Ring ──────────────────────────────────────────────
class PulseRing {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = 600;
    this.speed = 4 + Math.random() * 3;
    this.life = 1;
    this.color = color || EMERALD;
  }
  update() {
    this.radius += this.speed;
    this.life = Math.max(0, 1 - this.radius / this.maxRadius);
  }
  draw(ctx) {
    if (this.life <= 0) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.life * 0.5})`;
    ctx.lineWidth = 2 * this.life;
    ctx.stroke();
  }
}

// ─── Draw text with chromatic aberration ─────────────────────
function drawChromaticText(ctx, text, x, y, fontSize, aberration, alpha) {
  const font = `900 ${fontSize}px "Inter", "SF Pro Display", Arial, sans-serif`;
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (aberration > 0.5) {
    // Red channel offset
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = `rgba(255,30,30,${alpha * 0.4})`;
    ctx.fillText(text, x - aberration, y);
    // Blue channel offset
    ctx.fillStyle = `rgba(30,80,255,${alpha * 0.4})`;
    ctx.fillText(text, x + aberration, y + aberration * 0.3);
    // Green channel offset
    ctx.fillStyle = `rgba(16,185,129,${alpha * 0.3})`;
    ctx.fillText(text, x, y - aberration * 0.5);
    ctx.restore();
  }

  // Main white text
  ctx.save();
  ctx.shadowColor = `rgba(16,185,129,${0.8 * alpha})`;
  ctx.shadowBlur = 20 + aberration * 2;
  ctx.fillStyle = `rgba(255,255,255,${alpha})`;
  ctx.fillText(text, x, y);
  ctx.restore();
}

// ─── Draw individual glitch letters ──────────────────────────
function drawGlitchLetters(ctx, letters, x, y, fontSize, elapsed) {
  const font = `900 ${fontSize}px "Inter", "SF Pro Display", Arial, sans-serif`;
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Measure total width to position letters from left
  const totalWidth = ctx.measureText(NAME_TEXT).width;
  let currentX = x - totalWidth / 2;

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const charWidth = ctx.measureText(NAME_TEXT[i]).width;
    const drawX = currentX + charWidth / 2;

    if (letter.decoded) {
      // Decoded letter — draw with bounce-in effect
      const timeSinceDecode = elapsed - letter.decodeTime;
      const bounceT = clamp(timeSinceDecode / 400, 0, 1);
      const scale = easeOutElastic(bounceT);
      const rotation = (1 - bounceT) * ((i % 2 === 0 ? 1 : -1) * 0.15);

      ctx.save();
      ctx.translate(drawX, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);

      // Glow behind decoded letter
      ctx.shadowColor = `rgba(16,185,129,${0.9})`;
      ctx.shadowBlur = 25;
      ctx.fillStyle = `rgba(255,255,255,1)`;
      ctx.fillText(letter.char, 0, 0);
      ctx.restore();

      // Small spark burst on decode
      if (timeSinceDecode < 200) {
        const sparkAlpha = 1 - timeSinceDecode / 200;
        const sparkRadius = 10 + timeSinceDecode * 0.15;
        ctx.beginPath();
        ctx.arc(drawX, y, sparkRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16,185,129,${sparkAlpha * 0.15})`;
        ctx.fill();
      }
    } else if (letter.char !== " ") {
      // Undecoded — rapidly cycling random glyph
      const glitchChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

      ctx.save();
      ctx.translate(drawX, y);

      // Jitter
      const jitterX = (Math.random() - 0.5) * 3;
      const jitterY = (Math.random() - 0.5) * 3;
      ctx.translate(jitterX, jitterY);

      // Flicker between emerald and cyan
      const flicker = Math.random();
      if (flicker > 0.7) {
        ctx.fillStyle = `rgba(6,182,212,0.85)`;
      } else if (flicker > 0.4) {
        ctx.fillStyle = `rgba(16,185,129,0.85)`;
      } else {
        ctx.fillStyle = `rgba(139,92,246,0.75)`;
      }
      ctx.shadowColor = `rgba(16,185,129,0.5)`;
      ctx.shadowBlur = 10;
      ctx.fillText(glitchChar, 0, 0);
      ctx.restore();
    }

    currentX += charWidth;
  }
}

// ─── Scanline / static noise overlay ─────────────────────────
function drawScanlines(ctx, w, h, alpha) {
  if (alpha < 0.01) return;
  for (let y = 0; y < h; y += 3) {
    ctx.fillStyle = `rgba(0,0,0,${0.04 * alpha})`;
    ctx.fillRect(0, y, w, 1);
  }
  // Random noise blocks
  const blockCount = Math.floor(5 * alpha);
  for (let i = 0; i < blockCount; i++) {
    const bx = Math.random() * w;
    const by = Math.random() * h;
    const bw = 20 + Math.random() * 100;
    const bh = 1 + Math.random() * 3;
    ctx.fillStyle = `rgba(16,185,129,${0.03 * alpha})`;
    ctx.fillRect(bx, by, bw, bh);
  }
}

// ─── Horizontal glitch slice ─────────────────────────────────
function drawGlitchSlice(ctx, w, h, intensity) {
  if (intensity < 0.01 || Math.random() > 0.3) return;
  const sliceCount = Math.floor(1 + Math.random() * 3 * intensity);
  for (let i = 0; i < sliceCount; i++) {
    const sy = Math.random() * h;
    const sh = 2 + Math.random() * 8 * intensity;
    const offset = (Math.random() - 0.5) * 30 * intensity;
    const imgData = ctx.getImageData(0, Math.floor(sy), w, Math.floor(sh));
    ctx.putImageData(imgData, Math.floor(offset), Math.floor(sy));
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

// ─── Main component ─────────────────────────────────────────
export function IntroScreen({ onFinish }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const phaseRef = useRef(0);
  // 0 = network wander
  // 1 = shockwave explosion
  // 2 = cipher decode + chromatic aberration
  // 3 = subtitle type-in + hold
  // 4 = done
  const startRef = useRef(null);
  const nodesRef = useRef([]);
  const finishedRef = useRef(false);
  const [isFading, setIsFading] = useState(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setIsFading(true);
    document.body.style.overflow = "";
    setTimeout(() => onFinish(), 700);
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
    canvas.width = Math.floor(rect.width);
    canvas.height = Math.floor(rect.height);
    const ctx = canvas.getContext("2d");

    // Create initial network nodes
    const nodeCount = Math.min(200, Math.floor((canvas.width * canvas.height) / 8000));
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new NeuralNode(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        canvas.width,
        canvas.height
      ));
    }
    nodesRef.current = nodes;

    const tmpCtx = canvas.getContext("2d");
    const fontSize = fitFontSize(tmpCtx, NAME_TEXT, canvas.width * 0.82);

    // ── Durations (ms) ──
    const NETWORK_PHASE = 2800;
    const SHOCKWAVE_PHASE = 800;
    const DECODE_PHASE = 2600;
    const SUBTITLE_PHASE = 1800;

    startRef.current = performance.now();
    phaseRef.current = 0;

    const connectionMaxDist = Math.min(canvas.width, canvas.height) * 0.18;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Shared state across phases
    const sparks = [];
    const pulseRings = [];
    let shockwaveTriggered = false;

    // Cipher decode state — one entry per character in NAME_TEXT
    const cipherLetters = NAME_TEXT.split("").map((ch) => ({
      char: ch,
      decoded: ch === " ", // spaces are already "decoded"
      decodeTime: 0,
    }));

    // Pre-calculate stagger decode times
    const nonSpaceIndices = [];
    for (let i = 0; i < NAME_TEXT.length; i++) {
      if (NAME_TEXT[i] !== " ") nonSpaceIndices.push(i);
    }
    // Shuffle decode order for randomness
    const decodeOrder = [...nonSpaceIndices].sort(() => Math.random() - 0.5);
    const decodeInterval = (DECODE_PHASE * 0.75) / decodeOrder.length;

    // Subtitle type state
    let subtitleRevealed = 0;

    // ─── Animation loop ─────────────────────────────────────
    const animate = (now) => {
      if (finishedRef.current && phaseRef.current >= 4) return;

      const elapsed = now - startRef.current;

      // Background clear (slight trail for motion blur feel)
      ctx.fillStyle = "rgba(3, 0, 20, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ── Phase 0: Neural network wandering (identical to before) ──
      if (phaseRef.current === 0) {
        const t = elapsed;
        const connAlpha = Math.min(1, elapsed / 800);

        drawGrid(ctx, canvas.width, canvas.height, connAlpha);
        drawConnections(ctx, nodes, connectionMaxDist, connAlpha);

        for (const node of nodes) {
          node.wander(t);
          node.draw(ctx);
        }

        // Traveling pulse waves
        const pulseX = (Math.sin(t * 0.001) * 0.5 + 0.5) * canvas.width;
        const pulseY = (Math.cos(t * 0.0013) * 0.5 + 0.5) * canvas.height;
        const gradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 200);
        gradient.addColorStop(0, "rgba(16,185,129,0.06)");
        gradient.addColorStop(1, "rgba(16,185,129,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (elapsed >= NETWORK_PHASE) {
          phaseRef.current = 1;
          startRef.current = now;

          // Prepare explosion vectors for each node
          for (const node of nodes) {
            const dx = node.x - cx;
            const dy = node.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const speed = 8 + Math.random() * 12;
            node.explosionVx = (dx / dist) * speed;
            node.explosionVy = (dy / dist) * speed;
            node.originX = node.x;
            node.originY = node.y;
          }
        }
      }

      // ── Phase 1: SHOCKWAVE EXPLOSION ──
      else if (phaseRef.current === 1) {
        const progress = clamp(elapsed / SHOCKWAVE_PHASE, 0, 1);

        // Screen flash at the start
        if (!shockwaveTriggered) {
          shockwaveTriggered = true;
          // Spawn pulse rings
          pulseRings.push(new PulseRing(cx, cy, EMERALD));
          pulseRings.push(new PulseRing(cx, cy, CYAN));
          pulseRings.push(new PulseRing(cx, cy, { r: 139, g: 92, b: 246 }));
          // Spawn sparks
          for (let i = 0; i < 80; i++) {
            sparks.push(new Spark(cx, cy));
          }
        }

        // White flash
        const flashAlpha = progress < 0.15 ? (1 - progress / 0.15) * 0.6 : 0;
        if (flashAlpha > 0) {
          ctx.fillStyle = `rgba(255,255,255,${flashAlpha})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Explode nodes outward
        for (const node of nodes) {
          node.x = node.originX + node.explosionVx * progress * 30 * easeOutExpo(progress);
          node.y = node.originY + node.explosionVy * progress * 30 * easeOutExpo(progress);
          node.alpha = node.baseAlpha * (1 - easeOutExpo(progress));
          node.draw(ctx);
        }

        // Update & draw pulse rings
        for (const ring of pulseRings) {
          ring.update();
          ring.draw(ctx);
        }

        // Update & draw sparks
        for (const spark of sparks) {
          spark.update();
          spark.draw(ctx);
        }

        // Screen shake via slight offset (applied to glitch slices)
        if (progress < 0.5) {
          drawGlitchSlice(ctx, canvas.width, canvas.height, (1 - progress * 2));
        }

        if (progress >= 1) {
          phaseRef.current = 2;
          startRef.current = now;
        }
      }

      // ── Phase 2: CIPHER DECODE ──
      else if (phaseRef.current === 2) {
        const progress = clamp(elapsed / DECODE_PHASE, 0, 1);

        // Decode letters one by one
        for (let i = 0; i < decodeOrder.length; i++) {
          const letterIdx = decodeOrder[i];
          const decodeAt = i * decodeInterval;
          if (elapsed >= decodeAt && !cipherLetters[letterIdx].decoded) {
            cipherLetters[letterIdx].decoded = true;
            cipherLetters[letterIdx].decodeTime = elapsed;

            // Spawn a small pulse ring at the letter position
            // (approximate letter x position)
            ctx.font = `900 ${fontSize}px "Inter", "SF Pro Display", Arial, sans-serif`;
            const totalW = ctx.measureText(NAME_TEXT).width;
            const partW = ctx.measureText(NAME_TEXT.substring(0, letterIdx + 1)).width;
            const letterX = cx - totalW / 2 + partW - ctx.measureText(NAME_TEXT[letterIdx]).width / 2;
            pulseRings.push(new PulseRing(letterX, cy, EMERALD));
          }
        }

        // Chromatic aberration — strong at start, fades as letters decode
        const allDecoded = cipherLetters.every(l => l.decoded);
        const aberration = allDecoded
          ? Math.max(0, 8 * (1 - (elapsed - decodeOrder.length * decodeInterval) / 500))
          : 4 + Math.sin(elapsed * 0.01) * 3;

        // Scanlines during decode
        drawScanlines(ctx, canvas.width, canvas.height, 1 - progress);

        // Draw the glitch letters
        drawGlitchLetters(ctx, cipherLetters, cx, cy, fontSize, elapsed);

        // Draw chromatic aberration on already-decoded portion
        const decodedText = cipherLetters.map(l => l.decoded ? l.char : " ").join("");
        if (aberration > 0.5) {
          drawChromaticText(ctx, decodedText, cx, cy, fontSize, aberration, 0.15);
        }

        // Continue drawing pulse rings & sparks from previous phase
        for (let i = pulseRings.length - 1; i >= 0; i--) {
          pulseRings[i].update();
          pulseRings[i].draw(ctx);
          if (pulseRings[i].life <= 0) pulseRings.splice(i, 1);
        }
        for (let i = sparks.length - 1; i >= 0; i--) {
          sparks[i].update();
          sparks[i].draw(ctx);
          if (sparks[i].life <= 0) sparks.splice(i, 1);
        }

        // Random glitch slice during decode
        if (!allDecoded) {
          drawGlitchSlice(ctx, canvas.width, canvas.height, 0.4 * (1 - progress));
        }

        // Occasional screen-wide horizontal line flash
        if (Math.random() > 0.92 && !allDecoded) {
          const lineY = Math.random() * canvas.height;
          ctx.fillStyle = `rgba(16,185,129,${0.08 + Math.random() * 0.07})`;
          ctx.fillRect(0, lineY, canvas.width, 1 + Math.random() * 2);
        }

        if (progress >= 1) {
          phaseRef.current = 3;
          startRef.current = now;
        }
      }

      // ── Phase 3: SUBTITLE TYPE-IN + HOLD ──
      else if (phaseRef.current === 3) {
        const progress = clamp(elapsed / SUBTITLE_PHASE, 0, 1);

        // Draw the main name — fully revealed, gentle glow pulse
        const glowPulse = 0.8 + Math.sin(elapsed * 0.003) * 0.2;
        ctx.save();
        ctx.shadowColor = `rgba(16,185,129,${glowPulse})`;
        ctx.shadowBlur = 30;
        ctx.font = `900 ${fontSize}px "Inter", "SF Pro Display", Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(255,255,255,1)`;
        ctx.fillText(NAME_TEXT, cx, cy);
        ctx.restore();

        // Faint chromatic echo
        drawChromaticText(ctx, NAME_TEXT, cx, cy, fontSize, 1.5 + Math.sin(elapsed * 0.005) * 0.5, 0.06);

        // Underline that draws in
        const lineProgress = clamp(progress / 0.3, 0, 1);
        const lineEase = easeOutExpo(lineProgress);
        ctx.font = `900 ${fontSize}px "Inter", "SF Pro Display", Arial, sans-serif`;
        const nameWidth = ctx.measureText(NAME_TEXT).width;
        const lineY = cy + fontSize * 0.45;
        const lineHalfW = (nameWidth * 0.5) * lineEase;
        if (lineHalfW > 1) {
          const lineGrad = ctx.createLinearGradient(cx - lineHalfW, lineY, cx + lineHalfW, lineY);
          lineGrad.addColorStop(0, "rgba(16,185,129,0)");
          lineGrad.addColorStop(0.2, "rgba(16,185,129,0.6)");
          lineGrad.addColorStop(0.5, "rgba(6,182,212,0.8)");
          lineGrad.addColorStop(0.8, "rgba(16,185,129,0.6)");
          lineGrad.addColorStop(1, "rgba(16,185,129,0)");
          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx - lineHalfW, lineY);
          ctx.lineTo(cx + lineHalfW, lineY);
          ctx.stroke();
        }

        // Typewriter subtitle
        const typeStart = 0.2;
        if (progress > typeStart) {
          const typeProgress = clamp((progress - typeStart) / 0.6, 0, 1);
          subtitleRevealed = Math.floor(typeProgress * SUBTITLE_TEXT.length);
          const visibleSub = SUBTITLE_TEXT.substring(0, subtitleRevealed);

          // Cursor blink
          const showCursor = subtitleRevealed < SUBTITLE_TEXT.length || Math.sin(elapsed * 0.01) > 0;

          ctx.save();
          ctx.font = `600 ${Math.max(12, fontSize * 0.16)}px "Inter", "SF Pro Display", Arial, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.letterSpacing = "0.35em";

          const subY = cy + fontSize * 0.65;

          // Subtitle text
          ctx.fillStyle = `rgba(16,185,129,0.9)`;
          ctx.shadowColor = `rgba(16,185,129,0.5)`;
          ctx.shadowBlur = 10;
          ctx.fillText(visibleSub, cx, subY);

          // Blinking cursor
          if (showCursor) {
            const subWidth = ctx.measureText(visibleSub).width;
            ctx.fillStyle = `rgba(16,185,129,0.9)`;
            ctx.fillRect(cx + subWidth / 2 + 4, subY - fontSize * 0.07, 2, fontSize * 0.15);
          }
          ctx.restore();
        }

        // Remaining pulse rings
        for (let i = pulseRings.length - 1; i >= 0; i--) {
          pulseRings[i].update();
          pulseRings[i].draw(ctx);
          if (pulseRings[i].life <= 0) pulseRings.splice(i, 1);
        }

        // Ambient floating particles in background
        if (Math.random() > 0.85) {
          const px = Math.random() * canvas.width;
          const py = Math.random() * canvas.height;
          ctx.beginPath();
          ctx.arc(px, py, 0.5 + Math.random(), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16,185,129,${0.05 + Math.random() * 0.1})`;
          ctx.fill();
        }

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
        canvas.width = Math.floor(r.width);
        canvas.height = Math.floor(r.height);
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
      className={`fixed inset-0 z-[100] bg-[#030014] transition-opacity duration-700 ease-out cursor-pointer ${
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
