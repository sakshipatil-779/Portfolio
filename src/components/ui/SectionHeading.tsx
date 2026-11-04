import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#69E5DC] bg-[#69E5DC]/10 border border-[#69E5DC]/20",
            align === "center" && "mx-auto"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#69E5DC] animate-pulse" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA] font-sans">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#A0AAB8] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

