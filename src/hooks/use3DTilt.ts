"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TiltOptions {
  maxTilt?: number; // Maximum rotation in degrees (default 6)
  perspective?: number; // CSS perspective in px (default 1000)
  scale?: number; // Scale on hover (default 1.015)
  depth?: number; // translateZ depth in px (default 15)
  disabled?: boolean;
}

export function use3DTilt<T extends HTMLElement = HTMLDivElement>(
  options: TiltOptions = {}
) {
  const {
    maxTilt = 6,
    perspective = 1000,
    scale = 1.015,
    depth = 12,
    disabled = false,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled) return;

    // Skip on touch devices or if user prefers reduced motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || prefersReducedMotion) return;

    // Prepare element styles
    gsap.set(element, {
      transformPerspective: perspective,
      transformStyle: "preserve-3d",
    });

    let bounds: DOMRect | null = null;

    const onMouseEnter = () => {
      bounds = element.getBoundingClientRect();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!bounds) {
        bounds = element.getBoundingClientRect();
      }

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      // Normalized coordinates from -0.5 to 0.5
      const normX = mouseX / bounds.width - 0.5;
      const normY = mouseY / bounds.height - 0.5;

      // Calculate subtle rotations
      const rotateX = -normY * maxTilt * 2;
      const rotateY = normX * maxTilt * 2;

      gsap.to(element, {
        rotateX,
        rotateY,
        z: depth,
        scale,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMouseLeave = () => {
      bounds = null;
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseleave", onMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", onMouseEnter);
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("mouseleave", onMouseLeave);
      gsap.killTweensOf(element);
    };
  }, [maxTilt, perspective, scale, depth, disabled]);

  return ref;
}
