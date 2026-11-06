"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  icon: Icon,
  iconPosition = "left",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7650FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070D] disabled:opacity-50 disabled:pointer-events-none group select-none cursor-pointer";

  const sizeStyles = {
    sm: "text-xs px-4 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#7650FF] via-[#9055FF] to-[#F05BCB] text-[#F7F5FF] font-semibold shadow-[0_4px_25px_rgba(118,80,255,0.35)] hover:shadow-[0_6px_30px_rgba(240,91,203,0.45)] hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "bg-[#151020] text-[#B7B0CE] border border-[rgba(190,150,255,0.2)] hover:border-[#7650FF] hover:bg-[#1A1428] hover:text-[#F7F5FF] active:scale-[0.98]",
    outline:
      "bg-transparent text-[#F7F5FF] border border-[rgba(190,150,255,0.25)] hover:border-[#F05BCB] hover:text-[#F05BCB] active:scale-[0.98]",
    ghost:
      "bg-transparent text-[#B7B0CE] hover:text-[#F7F5FF] hover:bg-white/[0.06] active:scale-[0.98]",
  };

  const content = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === "right" && (
        <Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {content}
    </button>
  );
}
