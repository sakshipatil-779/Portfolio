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
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#69E5DC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090D] disabled:opacity-50 disabled:pointer-events-none group select-none";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#69E5DC] text-[#07090D] font-semibold hover:bg-[#7ff2e9] shadow-[0_0_20px_rgba(105,229,220,0.25)] hover:shadow-[0_0_28px_rgba(105,229,220,0.4)] active:scale-[0.98]",
    secondary:
      "bg-[#121923] text-[#F5F7FA] border border-white/10 hover:border-[#69E5DC]/40 hover:bg-[#16202c] hover:text-[#69E5DC] active:scale-[0.98]",
    outline:
      "bg-transparent text-[#F5F7FA] border border-white/15 hover:border-[#69E5DC] hover:text-[#69E5DC] active:scale-[0.98]",
    ghost:
      "bg-transparent text-[#A0AAB8] hover:text-[#F5F7FA] hover:bg-white/5 active:scale-[0.98]",
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
