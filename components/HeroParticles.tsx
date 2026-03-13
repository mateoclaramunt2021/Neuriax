"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  shape: "circle" | "hexagon" | "triangle" | "ring";
  delay: number;
  duration: number;
  opacity: number;
  rotateSpeed: number;
  driftX: number;
}

function generateParticles(count: number): Particle[] {
  const shapes: Particle["shape"][] = ["circle", "hexagon", "triangle", "ring"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 6 + Math.random() * 18,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    delay: Math.random() * 12,
    duration: 18 + Math.random() * 22,
    opacity: 0.06 + Math.random() * 0.1,
    rotateSpeed: 20 + Math.random() * 40,
    driftX: -30 + Math.random() * 60,
  }));
}

function ShapeElement({ shape, size }: { shape: Particle["shape"]; size: number }) {
  switch (shape) {
    case "hexagon":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}>
          <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" className="stroke-violet-400" />
        </svg>
      );
    case "triangle":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}>
          <polygon points="12,3 22,21 2,21" className="stroke-indigo-400" />
        </svg>
      );
    case "ring":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
          <circle cx="12" cy="12" r="10" className="stroke-violet-300" />
        </svg>
      );
    default:
      return (
        <div
          className="rounded-full bg-violet-400"
          style={{ width: size * 0.4, height: size * 0.4 }}
        />
      );
  }
}

export default function HeroParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setParticles(generateParticles(isMobile ? 8 : 18));
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: "800px" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute hero-particle-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--drift-x" as string]: `${p.driftX}px`,
            ["--rotate-speed" as string]: `${p.rotateSpeed}s`,
          }}
        >
          <div
            className="hero-particle-3d"
            style={{
              animationDuration: `${p.rotateSpeed}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            <ShapeElement shape={p.shape} size={p.size} />
          </div>
        </div>
      ))}
    </div>
  );
}
