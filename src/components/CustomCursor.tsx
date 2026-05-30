'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      positionRef.current.x = lerp(positionRef.current.x, targetRef.current.x, 0.08);
      positionRef.current.y = lerp(positionRef.current.y, targetRef.current.y, 0.08);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${positionRef.current.x - 200}px, ${positionRef.current.y - 200}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(6, 182, 212, 0.08) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9998,
        opacity: 0.08,
        filter: 'blur(2px)',
        willChange: 'transform',
      }}
      className="hidden md:block"
      aria-hidden="true"
    />
  );
}
