'use client';

import { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function TextReveal({ text, delay = 0, className = '' }: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  const words = text.split(' ');

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            marginRight: '0.3em',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
              transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay + i * 0.04}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay + i * 0.04}s`,
              willChange: 'opacity, transform',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
