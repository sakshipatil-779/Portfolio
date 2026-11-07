"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  download?: string | boolean;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  download,
  icon: Icon,
  iconPosition = "left",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D18A54] focus-visible:ring-offset-2 focus-visible:ring-offset-[#15110E] disabled:opacity-50 disabled:pointer-events-none group select-none cursor-pointer";

  const sizeStyles = {
    sm: "text-xs px-4 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#B87345] via-[#D18A54] to-[#E5A96E] text-[#15110E] font-bold shadow-[0_4px_25px_rgba(209,138,84,0.35)] hover:shadow-[0_6px_30px_rgba(209,138,84,0.5)] hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "bg-[#282017] text-[#C8B6A5] border border-[rgba(209,138,84,0.25)] hover:border-[#D18A54] hover:bg-[#33271D] hover:text-[#F5EDE4] active:scale-[0.98]",
    outline:
      "bg-transparent text-[#F5EDE4] border border-[rgba(209,138,84,0.3)] hover:border-[#D18A54] hover:text-[#E5A96E] active:scale-[0.98]",
    ghost:
      "bg-transparent text-[#C8B6A5] hover:text-[#F5EDE4] hover:bg-white/[0.06] active:scale-[0.98]",
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
    if (external || download) {
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          download={typeof download === "string" ? download : undefined}
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
