"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  depth?: number;
  scale?: number;
  perspective?: number;
  disabled?: boolean;
}

export function TiltCard({
  children,
  className,
  maxTilt = 6,
  depth = 14,
  scale = 1.012,
  perspective = 1000,
  disabled = false,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || disabled) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || prefersReducedMotion) return;

    gsap.set(card, {
      transformPerspective: perspective,
      transformStyle: "preserve-3d",
    });

    let rect: DOMRect | null = null;

    const onMouseEnter = () => {
      rect = card.getBoundingClientRect();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!rect) {
        rect = card.getBoundingClientRect();
      }

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const normX = mouseX / rect.width - 0.5;
      const normY = mouseY / rect.height - 0.5;

      const rotateX = -normY * maxTilt * 2;
      const rotateY = normX * maxTilt * 2;

      gsap.to(card, {
        rotateX,
        rotateY,
        z: depth,
        scale,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMouseLeave = () => {
      rect = null;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    card.addEventListener("mouseenter", onMouseEnter);
    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", onMouseEnter);
      card.removeEventListener("mousemove", onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
      gsap.killTweensOf(card);
    };
  }, [maxTilt, depth, scale, perspective, disabled]);

  return (
    <div
      ref={cardRef}
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </div>
  );
}

