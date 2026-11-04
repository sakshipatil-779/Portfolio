"use client";

import React from "react";
import { BootSequence } from "./BootSequence";

interface LaptopCssFallbackProps {
  progress: number;
}

export function LaptopCssFallback({ progress }: LaptopCssFallbackProps) {
  // Screen opens between progress 0.0 and 0.50
  // Angle from 0deg (closed) to -108deg (open)
  const openProgress = Math.min(1, Math.max(0, progress / 0.5));
  const lidAngle = openProgress * -108;

  return (
    <div className="w-full h-full flex items-center justify-center p-4 select-none">
      <div
        className="relative w-full max-w-[500px] aspect-[16/11]"
        style={{ perspective: "1200px" }}
      >
        {/* Ground ambient shadow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-black/60 blur-xl rounded-full pointer-events-none" />

        {/* Base Chassis */}
        <div
          className="absolute inset-x-0 bottom-0 h-4/5 rounded-2xl bg-[#1e2229] border border-white/10 p-4 shadow-2xl flex flex-col justify-between"
          style={{
            transform: "rotateX(55deg) translateZ(-40px)",
            transformOrigin: "bottom center",
          }}
        >
          {/* Keyboard Recessed Well */}
          <div className="rounded-xl bg-[#111317] border border-white/5 p-3 h-3/5 flex flex-col justify-between">
            {/* Grid of keys simulation */}
            <div className="grid grid-cols-12 gap-1 h-3/4">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded bg-[#0c0e12] border border-white/5 shadow-inner"
                />
              ))}
            </div>
            <div className="h-4 w-1/2 mx-auto rounded bg-[#0c0e12] border border-white/5" />
          </div>

          {/* Trackpad */}
          <div className="w-1/3 h-1/4 mx-auto rounded-lg bg-[#14171d] border border-white/10" />
        </div>

        {/* Rotating Lid */}
        <div
          className="absolute inset-x-2 top-0 h-[85%] rounded-2xl bg-[#1a1d24] border-2 border-[#2b303b] p-3 shadow-2xl transition-transform ease-out"
          style={{
            transformOrigin: "bottom center",
            transform: `rotateX(${lidAngle}deg)`,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            boxShadow:
              openProgress > 0.2
                ? "0 0 50px rgba(105, 229, 220, 0.15), 0 25px 50px -12px rgba(0, 0, 0, 0.8)"
                : "none",
          }}
        >
          {/* Webcam */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black border border-white/20 flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-[#69E5DC]" />
          </div>

          {/* Inner Screen */}
          <div className="w-full h-full rounded-xl overflow-hidden bg-[#05070a] border border-white/10 mt-1">
            <BootSequence progress={progress} />
          </div>
        </div>
      </div>
    </div>
  );
}

