"use client";

import { useState, useEffect } from "react";

const PROOFS = [
  { name: "Carlos M.", city: "Madrid", action: "ha agendado una llamada", time: "hace 3 min" },
  { name: "Laura R.", city: "Barcelona", action: "ha solicitado un agente de voz", time: "hace 12 min" },
  { name: "Diego P.", city: "Valencia", action: "ha agendado una llamada", time: "hace 27 min" },
  { name: "Ana G.", city: "Sevilla", action: "ha activado sus automatizaciones", time: "hace 1h" },
  { name: "Miguel S.", city: "Bilbao", action: "ha agendado una llamada", time: "hace 2h" },
];

export default function SocialProofToast() {
  const [current, setCurrent] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first proof after 15 seconds
    const initialDelay = setTimeout(() => {
      setCurrent(0);
      setVisible(true);
    }, 15000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (current === null) return;

    // Hide after 4 seconds
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    // Show next after 6 seconds (2s hidden gap)
    const nextTimer = setTimeout(() => {
      const next = (current + 1) % PROOFS.length;
      setCurrent(next);
      setVisible(true);
    }, 25000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [current]);

  if (current === null) return null;

  const proof = PROOFS[current];

  return (
    <div
      className={`fixed bottom-24 sm:bottom-6 left-4 sm:left-6 z-30 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white/[0.07] backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 shadow-2xl max-w-xs">
        {/* Avatar */}
        <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
          {proof.name[0]}
        </div>
        <div className="min-w-0">
          <p className="text-sm text-white font-medium truncate">
            <span className="text-cyan-400">{proof.name}</span> de {proof.city}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {proof.action} · {proof.time}
          </p>
        </div>
      </div>
    </div>
  );
}
