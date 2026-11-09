"use client";

import React, { useEffect, useRef } from "react";
import { registerGSAP } from "@/lib/gsap";

export function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Handle high DPI
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Track scroll
    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Floating golden particles
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * (width || 1920),
      y: Math.random() * (height || 1080),
      radius: Math.random() * 1.8 + 0.6,
      baseAlpha: Math.random() * 0.45 + 0.2,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.35 - 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    let startTime = performance.now();

    const render = (currentTime: number) => {
      const elapsed = (currentTime - startTime) * 0.001;
      scrollY += (targetScrollY - scrollY) * 0.08;
      const scrollFactor = scrollY * 0.0008;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Flowing Golden Light Ribbons
      // We draw 3 layered ribbons with luminous composite mode
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      // Ribbon 1: Primary sweeping main ribbon (lower arc across the screen)
      const r1YStart = height * 0.52 + Math.sin(elapsed * 0.6 + scrollFactor) * 40;
      const r1Cp1X = width * 0.25;
      const r1Cp1Y = height * 0.88 + Math.cos(elapsed * 0.5 + scrollFactor * 1.5) * 60;
      const r1Cp2X = width * 0.65;
      const r1Cp2Y = height * 0.72 + Math.sin(elapsed * 0.7 + scrollFactor * 2) * 50;
      const r1YEnd = height * 0.58 + Math.cos(elapsed * 0.4 + scrollFactor) * 45;

      const grad1 = ctx.createLinearGradient(0, height * 0.5, width, height * 0.8);
      grad1.addColorStop(0, "rgba(184, 115, 69, 0.0)");
      grad1.addColorStop(0.18, "rgba(184, 115, 69, 0.35)");
      grad1.addColorStop(0.48, "rgba(240, 184, 90, 0.75)");
      grad1.addColorStop(0.55, "rgba(247, 211, 138, 0.95)");
      grad1.addColorStop(0.72, "rgba(217, 164, 65, 0.55)");
      grad1.addColorStop(1, "rgba(184, 115, 69, 0.0)");

      // Glow envelope of Ribbon 1
      ctx.beginPath();
      ctx.moveTo(-100, r1YStart);
      ctx.bezierCurveTo(r1Cp1X, r1Cp1Y + 30, r1Cp2X, r1Cp2Y + 40, width + 100, r1YEnd + 20);
      ctx.lineTo(width + 100, r1YEnd - 20);
      ctx.bezierCurveTo(r1Cp2X, r1Cp2Y - 40, r1Cp1X, r1Cp1Y - 30, -100, r1YStart - 15);
      ctx.closePath();
      ctx.fillStyle = grad1;
      ctx.filter = "blur(18px)";
      ctx.fill();

      // Sharp luminous core strand of Ribbon 1
      ctx.filter = "blur(3px)";
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "rgba(247, 211, 138, 0.95)";
      ctx.beginPath();
      ctx.moveTo(-100, r1YStart);
      ctx.bezierCurveTo(r1Cp1X, r1Cp1Y, r1Cp2X, r1Cp2Y, width + 100, r1YEnd);
      ctx.stroke();

      // Ribbon 2: Secondary intersecting braided strand
      const r2YStart = height * 0.65 + Math.cos(elapsed * 0.55 - scrollFactor * 1.2) * 35;
      const r2Cp1X = width * 0.35;
      const r2Cp1Y = height * 0.68 + Math.sin(elapsed * 0.45 + scrollFactor) * 55;
      const r2Cp2X = width * 0.75;
      const r2Cp2Y = height * 0.92 + Math.cos(elapsed * 0.65 - scrollFactor * 1.8) * 60;
      const r2YEnd = height * 0.76 + Math.sin(elapsed * 0.35) * 35;

      const grad2 = ctx.createLinearGradient(0, height * 0.6, width, height * 0.9);
      grad2.addColorStop(0, "rgba(217, 164, 65, 0.0)");
      grad2.addColorStop(0.25, "rgba(217, 164, 65, 0.45)");
      grad2.addColorStop(0.5, "rgba(247, 211, 138, 0.85)");
      grad2.addColorStop(0.8, "rgba(240, 184, 90, 0.5)");
      grad2.addColorStop(1, "rgba(184, 115, 69, 0.0)");

      ctx.filter = "blur(14px)";
      ctx.beginPath();
      ctx.moveTo(-80, r2YStart);
      ctx.bezierCurveTo(r2Cp1X, r2Cp1Y + 25, r2Cp2X, r2Cp2Y + 30, width + 80, r2YEnd + 15);
      ctx.lineTo(width + 80, r2YEnd - 15);
      ctx.bezierCurveTo(r2Cp2X, r2Cp2Y - 30, r2Cp1X, r2Cp1Y - 25, -80, r2YStart - 12);
      ctx.closePath();
      ctx.fillStyle = grad2;
      ctx.fill();

      // Sharp core of Ribbon 2
      ctx.filter = "blur(2.5px)";
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "rgba(240, 184, 90, 0.9)";
      ctx.beginPath();
      ctx.moveTo(-80, r2YStart);
      ctx.bezierCurveTo(r2Cp1X, r2Cp1Y, r2Cp2X, r2Cp2Y, width + 80, r2YEnd);
      ctx.stroke();

      // Ribbon 3: High delicate ambient curve in the background
      const r3YStart = height * 0.28 + Math.sin(elapsed * 0.4 + scrollFactor * 0.8) * 30;
      const r3Cp1X = width * 0.4;
      const r3Cp1Y = height * 0.22 + Math.cos(elapsed * 0.5 + scrollFactor) * 45;
      const r3Cp2X = width * 0.7;
      const r3Cp2Y = height * 0.38 + Math.sin(elapsed * 0.45 - scrollFactor) * 40;
      const r3YEnd = height * 0.32 + Math.cos(elapsed * 0.3) * 25;

      ctx.filter = "blur(24px)";
      ctx.lineWidth = 60;
      ctx.strokeStyle = "rgba(217, 164, 65, 0.15)";
      ctx.beginPath();
      ctx.moveTo(-100, r3YStart);
      ctx.bezierCurveTo(r3Cp1X, r3Cp1Y, r3Cp2X, r3Cp2Y, width + 100, r3YEnd);
      ctx.stroke();

      // 2. Glowing Golden Particles
      ctx.filter = "none";
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const pulse = Math.sin(elapsed * 2 + p.phase) * 0.35 + 0.65;
        const alpha = p.baseAlpha * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(247, 211, 138, ${alpha})`;
        ctx.shadowColor = "rgba(240, 184, 90, 0.8)";
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      ctx.restore();

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Initial render
    animationFrameId = requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion) {
        startTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Deep Obsidian Background with Rich Espresso Undertone */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, #15100C 0%, #0B0907 65%, #050403 100%)",
        }}
      />

      {/* Canvas for Golden Ribbons & Ambient Embers */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ pointerEvents: "none" }}
      />

      {/* Subtle Warm Amber Vignette Rim */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(11, 9, 7, 0.8) 100%)",
        }}
      />
    </div>
  );
}
