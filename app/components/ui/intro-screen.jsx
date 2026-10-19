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
    this.radius = Math.random() * 2.5 + 1.2;
    this.baseRadius = this.radius;
    this.pulseOffset = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.02 + Math.random() * 0.03;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.w = w;
    this.h = h;

    this.explosionVx = 0;
    this.explosionVy = 0;

    const colors = [EMERALD, CYAN, WHITE];
    const c = colors[Math.floor(Math.random() * colors.length)];
    this.r = c.r; this.g = c.g; this.b = c.b;
    this.alpha = Math.random() * 0.5 + 0.3;
    this.baseAlpha = this.alpha;
  }

  wander(t) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > this.w) this.vx *= -1;
    if (this.y < 0 || this.y > this.h) this.vy *= -1;
    this.x = clamp(this.x, 0, this.w);
    this.y = clamp(this.y, 0, this.h);
    this.radius = this.baseRadius + Math.sin(t * this.pulseSpeed + this.pulseOffset) * 1;
    this.alpha = this.baseAlpha + Math.sin(t * this.pulseSpeed * 0.7 + this.pulseOffset) * 0.15;
  }

  draw(ctx) {
    const a = clamp(this.alpha, 0, 1);
    if (a < 0.01) return;
    // Glow (no shadowBlur — cheap radial fill)
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

// ─── Spark Particle ─────────────────────────────────────────
class Spark {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 8;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1;
    this.decay = 0.012 + Math.random() * 0.025;
    this.radius = 0.5 + Math.random() * 2;
    const colors = [EMERALD, CYAN, { r: 139, g: 92, b: 246 }];
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
  const maxDistSq = maxDist * maxDist; // avoid sqrt
  for (let i = 0; i < nodes.length; i++) {
    let conns = 0;
    for (let j = i + 1; j < nodes.length && conns < 4; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distSq = dx * dx + dy * dy;
      if (distSq < maxDistSq) {
        const a = (1 - Math.sqrt(distSq) / maxDist) * 0.28 * globalAlpha;
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
  ctx.beginPath();
  for (let x = 0; x < w; x += spacing) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = 0; y < h; y += spacing) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();
  // Dots at intersections — single batch
  ctx.fillStyle = `rgba(16,185,129,${0.06 * alpha})`;
  for (let x = 0; x < w; x += spacing) {
    for (let y = 0; y < h; y += spacing) {
      ctx.fillRect(x, y, 1.5, 1.5); // rect faster than arc for tiny dots
    }
  }
}

// ─── Pulse Ring ──────────────────────────────────────────────
class PulseRing {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = 500;
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
    ctx.strokeStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.life * 0.4})`;
    ctx.lineWidth = 1.5 * this.life;
    ctx.stroke();
  }
}

// ─── Draw text with chromatic aberration (no shadow) ─────────
function drawChromaticText(ctx, text, x, y, font, aberration, alpha) {
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (aberration > 0.5) {
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = `rgba(255,30,30,${alpha * 0.35})`;
    ctx.fillText(text, x - aberration, y);
    ctx.fillStyle = `rgba(30,80,255,${alpha * 0.35})`;
    ctx.fillText(text, x + aberration, y + aberration * 0.3);
    ctx.fillStyle = `rgba(16,185,129,${alpha * 0.25})`;
    ctx.fillText(text, x, y - aberration * 0.5);
    ctx.globalCompositeOperation = "source-over";
  }

  // Main text — no shadowBlur for perf
  ctx.fillStyle = `rgba(255,255,255,${alpha})`;
  ctx.fillText(text, x, y);
}

// ─── Draw glitch letters (optimised: pre-cached widths, throttled cycling) ───
function drawGlitchLetters(ctx, letters, charPositions, y, font, elapsed, frameCount) {
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const drawX = charPositions[i];

    if (letter.decoded) {
      // Decoded letter — elastic bounce-in
      const timeSinceDecode = elapsed - letter.decodeTime;
      const bounceT = clamp(timeSinceDecode / 500, 0, 1);
      const scale = easeOutElastic(bounceT);
      const rotation = (1 - bounceT) * ((i % 2 === 0 ? 1 : -1) * 0.12);

      ctx.save();
      ctx.translate(drawX, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      ctx.fillStyle = "#fff";
      ctx.fillText(letter.char, 0, 0);
      ctx.restore();

      // Small glow burst on decode (fades quickly)
      if (timeSinceDecode < 300) {
        const sparkAlpha = (1 - timeSinceDecode / 300) * 0.2;
        const sparkRadius = 8 + timeSinceDecode * 0.1;
        ctx.beginPath();
        ctx.arc(drawX, y, sparkRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16,185,129,${sparkAlpha})`;
        ctx.fill();
      }
    } else if (letter.char !== " ") {
      // Undecoded — cycling glyphs (throttled: change every 3 frames)
      const charIdx = (Math.floor(frameCount / 3) + i * 7) % GLITCH_CHARS.length;
      const glitchChar = GLITCH_CHARS[charIdx];

      // Slight positional jitter (deterministic per frame to avoid flicker)
      const jx = Math.sin(frameCount * 0.5 + i * 2.3) * 1.5;
      const jy = Math.cos(frameCount * 0.7 + i * 1.7) * 1.5;

      // Color cycle
      const ci = (frameCount + i * 5) % 3;
      if (ci === 0) ctx.fillStyle = "rgba(16,185,129,0.85)";
      else if (ci === 1) ctx.fillStyle = "rgba(6,182,212,0.85)";
      else ctx.fillStyle = "rgba(139,92,246,0.75)";

      ctx.fillText(glitchChar, drawX + jx, y + jy);
    }
  }
}

// ─── Lightweight scanline overlay (sparse, no per-pixel) ─────
function drawScanlines(ctx, w, h, alpha) {
  if (alpha < 0.02) return;
  ctx.fillStyle = `rgba(0,0,0,${0.035 * alpha})`;
  // Draw every 4th line (much cheaper)
  for (let y = 0; y < h; y += 4) {
    ctx.fillRect(0, y, w, 1);
  }
}

// ─── Lightweight glitch effect (no getImageData!) ────────────
function drawGlitchEffect(ctx, w, h, intensity, frameCount) {
  if (intensity < 0.01 || frameCount % 4 !== 0) return;
  // Draw coloured offset rectangles to simulate glitch slices
  const sliceCount = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < sliceCount; i++) {
    const sy = Math.random() * h;
    const sh = 2 + Math.random() * 6 * intensity;
    const offset = (Math.random() - 0.5) * 20 * intensity;
    ctx.fillStyle = `rgba(16,185,129,${0.04 * intensity})`;
    ctx.fillRect(offset, sy, w, sh);
    ctx.fillStyle = `rgba(6,182,212,${0.03 * intensity})`;
    ctx.fillRect(-offset, sy + sh, w, sh * 0.5);
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
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    const ctx = canvas.getContext("2d", { alpha: false });
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;

    // Create initial network nodes
    const nodeCount = Math.min(160, Math.floor((W * H) / 10000));
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new NeuralNode(
        Math.random() * W,
        Math.random() * H,
        W, H
      ));
    }
    nodesRef.current = nodes;

    const fontSize = fitFontSize(ctx, NAME_TEXT, W * 0.82);
    const mainFont = `900 ${fontSize}px "Inter", "SF Pro Display", Arial, sans-serif`;
    const subFontSize = Math.max(12, fontSize * 0.16);
    const subFont = `600 ${subFontSize}px "Inter", "SF Pro Display", Arial, sans-serif`;

    // Pre-cache character positions for glitch letters (avoids measureText in hot loop)
    ctx.font = mainFont;
    const totalTextWidth = ctx.measureText(NAME_TEXT).width;
    const charPositions = [];
    let cursorX = W / 2 - totalTextWidth / 2;
    for (let i = 0; i < NAME_TEXT.length; i++) {
      const cw = ctx.measureText(NAME_TEXT[i]).width;
      charPositions.push(cursorX + cw / 2);
      cursorX += cw;
    }

    // Durations (ms)
    const NETWORK_PHASE = 2800;
    const SHOCKWAVE_PHASE = 700;
    const DECODE_PHASE = 2400;
    const SUBTITLE_PHASE = 1600;

    startRef.current = performance.now();
    phaseRef.current = 0;

    const connectionMaxDist = Math.min(W, H) * 0.18;
    const cx = W / 2;
    const cy = H / 2;

    // Shared state
    const sparks = [];
    const pulseRings = [];
    let shockwaveTriggered = false;
    let frameCount = 0;

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
    const decodeInterval = (DECODE_PHASE * 0.7) / decodeOrder.length;

    let subtitleRevealed = 0;

    // ─── Animation loop ─────────────────────────────────────
    const animate = (now) => {
      if (finishedRef.current && phaseRef.current >= 4) return;

      const elapsed = now - startRef.current;
      frameCount++;

      // Full opaque clear — no ghosting, clean every frame
      ctx.fillStyle = "#030014";
      ctx.fillRect(0, 0, W, H);

      // ── Phase 0: Neural network wandering ──
      if (phaseRef.current === 0) {
        const t = elapsed;
        const connAlpha = Math.min(1, elapsed / 800);

        drawGrid(ctx, W, H, connAlpha);
        drawConnections(ctx, nodes, connectionMaxDist, connAlpha);

        for (const node of nodes) {
          node.wander(t);
          node.draw(ctx);
        }

        // Traveling pulse glow
        const pulseX = (Math.sin(t * 0.001) * 0.5 + 0.5) * W;
        const pulseY = (Math.cos(t * 0.0013) * 0.5 + 0.5) * H;
        const gradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 200);
        gradient.addColorStop(0, "rgba(16,185,129,0.06)");
        gradient.addColorStop(1, "rgba(16,185,129,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, W, H);

        if (elapsed >= NETWORK_PHASE) {
          phaseRef.current = 1;
          startRef.current = now;

          for (const node of nodes) {
            const dx = node.x - cx;
            const dy = node.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const speed = 6 + Math.random() * 10;
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
        const ease = easeOutExpo(progress);

        if (!shockwaveTriggered) {
          shockwaveTriggered = true;
          pulseRings.push(new PulseRing(cx, cy, EMERALD));
          pulseRings.push(new PulseRing(cx, cy, CYAN));
          pulseRings.push(new PulseRing(cx, cy, { r: 139, g: 92, b: 246 }));
          for (let i = 0; i < 50; i++) {
            sparks.push(new Spark(cx, cy));
          }
        }

        // White flash (brief)
        if (progress < 0.12) {
          const flashAlpha = (1 - progress / 0.12) * 0.5;
          ctx.fillStyle = `rgba(255,255,255,${flashAlpha})`;
          ctx.fillRect(0, 0, W, H);
        }

        // Explode nodes outward
        for (const node of nodes) {
          node.x = node.originX + node.explosionVx * ease * 25;
          node.y = node.originY + node.explosionVy * ease * 25;
          node.alpha = node.baseAlpha * (1 - ease);
          node.draw(ctx);
        }

        // Pulse rings
        for (const ring of pulseRings) {
          ring.update();
          ring.draw(ctx);
        }

        // Sparks
        for (const spark of sparks) {
          spark.update();
          spark.draw(ctx);
        }

        // Lightweight glitch effect
        if (progress < 0.4) {
          drawGlitchEffect(ctx, W, H, 1 - progress * 2.5, frameCount);
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
            // Only spawn ring every other letter to reduce draw calls
            if (i % 2 === 0) {
              pulseRings.push(new PulseRing(charPositions[letterIdx], cy, EMERALD));
            }
          }
        }

        // Chromatic aberration — fades over time
        const allDecoded = cipherLetters.every(l => l.decoded);
        const aberration = allDecoded
          ? Math.max(0, 6 * (1 - (elapsed - decodeOrder.length * decodeInterval) / 400))
          : 3 + Math.sin(elapsed * 0.008) * 2;

        // Sparse scanlines
        drawScanlines(ctx, W, H, 0.5 * (1 - progress));

        // Glitch letters
        drawGlitchLetters(ctx, cipherLetters, charPositions, cy, mainFont, elapsed, frameCount);

        // Chromatic aberration on decoded text
        if (aberration > 0.5) {
          const decodedText = cipherLetters.map(l => l.decoded ? l.char : " ").join("");
          drawChromaticText(ctx, decodedText, cx, cy, mainFont, aberration, 0.12);
        }

        // Pulse rings
        for (let i = pulseRings.length - 1; i >= 0; i--) {
          pulseRings[i].update();
          pulseRings[i].draw(ctx);
          if (pulseRings[i].life <= 0) pulseRings.splice(i, 1);
        }
        // Sparks cleanup
        for (let i = sparks.length - 1; i >= 0; i--) {
          sparks[i].update();
          sparks[i].draw(ctx);
          if (sparks[i].life <= 0) sparks.splice(i, 1);
        }

        // Lightweight glitch during decode
        if (!allDecoded) {
          drawGlitchEffect(ctx, W, H, 0.3 * (1 - progress), frameCount);
        }

        // Occasional horizontal flash line
        if (frameCount % 7 === 0 && !allDecoded) {
          const ly = Math.random() * H;
          ctx.fillStyle = `rgba(16,185,129,0.06)`;
          ctx.fillRect(0, ly, W, 1);
        }

        if (progress >= 1) {
          phaseRef.current = 3;
          startRef.current = now;
        }
      }

      // ── Phase 3: SUBTITLE TYPE-IN + HOLD ──
      else if (phaseRef.current === 3) {
        const progress = clamp(elapsed / SUBTITLE_PHASE, 0, 1);

        // Main name — single glow pass (one shadow call only)
        ctx.save();
        ctx.shadowColor = "rgba(16,185,129,0.7)";
        ctx.shadowBlur = 25;
        ctx.font = mainFont;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#fff";
        ctx.fillText(NAME_TEXT, cx, cy);
        ctx.restore();

        // Subtle chromatic echo
        drawChromaticText(ctx, NAME_TEXT, cx, cy, mainFont, 1.2 + Math.sin(elapsed * 0.004) * 0.4, 0.05);

        // Underline that draws in
        const lineProgress = clamp(progress / 0.3, 0, 1);
        const lineEase = easeOutExpo(lineProgress);
        const lineY = cy + fontSize * 0.45;
        const lineHalfW = (totalTextWidth * 0.5) * lineEase;
        if (lineHalfW > 1) {
          const lineGrad = ctx.createLinearGradient(cx - lineHalfW, lineY, cx + lineHalfW, lineY);
          lineGrad.addColorStop(0, "rgba(16,185,129,0)");
          lineGrad.addColorStop(0.2, "rgba(16,185,129,0.5)");
          lineGrad.addColorStop(0.5, "rgba(6,182,212,0.7)");
          lineGrad.addColorStop(0.8, "rgba(16,185,129,0.5)");
          lineGrad.addColorStop(1, "rgba(16,185,129,0)");
          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx - lineHalfW, lineY);
          ctx.lineTo(cx + lineHalfW, lineY);
          ctx.stroke();
        }

        // Typewriter subtitle
        const typeStart = 0.15;
        if (progress > typeStart) {
          const typeProgress = clamp((progress - typeStart) / 0.6, 0, 1);
          subtitleRevealed = Math.floor(typeProgress * SUBTITLE_TEXT.length);
          const visibleSub = SUBTITLE_TEXT.substring(0, subtitleRevealed);
          const showCursor = subtitleRevealed < SUBTITLE_TEXT.length || Math.sin(elapsed * 0.008) > 0;
          const subY = cy + fontSize * 0.65;

          ctx.save();
          ctx.font = subFont;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.letterSpacing = "0.35em";
          ctx.fillStyle = "rgba(16,185,129,0.9)";
          ctx.fillText(visibleSub, cx, subY);

          if (showCursor) {
            const subWidth = ctx.measureText(visibleSub).width;
            ctx.fillRect(cx + subWidth / 2 + 4, subY - subFontSize * 0.4, 2, subFontSize * 0.8);
          }
          ctx.restore();
        }

        // Remaining pulse rings
        for (let i = pulseRings.length - 1; i >= 0; i--) {
          pulseRings[i].update();
          pulseRings[i].draw(ctx);
          if (pulseRings[i].life <= 0) pulseRings.splice(i, 1);
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
