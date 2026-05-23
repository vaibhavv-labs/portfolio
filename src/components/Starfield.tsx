"use client";
import { useEffect, useRef } from "react";

const Starfield = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const createStars = (count: number, className: string) => {
      const layer = document.createElement("div");
      layer.className = `starfield-layer ${className}`;
      for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 200}%`;
        if (className === "stars-small") {
          star.style.width = "1px";
          star.style.height = "1px";
          star.style.opacity = `${0.3 + Math.random() * 0.3}`;
        } else if (className === "stars-medium") {
          star.style.width = "1.5px";
          star.style.height = "1.5px";
          star.style.opacity = `${0.4 + Math.random() * 0.3}`;
        } else {
          star.style.width = "2px";
          star.style.height = "2px";
          star.style.opacity = `${0.5 + Math.random() * 0.4}`;
        }
        layer.appendChild(star);
      }
      container.appendChild(layer);
    };

    createStars(60, "stars-small");
    createStars(30, "stars-medium");
    createStars(15, "stars-large");

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div className="starfield" ref={containerRef} aria-hidden="true" />;
};

export default Starfield;
