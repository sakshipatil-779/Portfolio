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
            "inline-flex items-center gap-2 mb-3.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-[#B7B0CE] bg-[#151020] border border-[rgba(190,150,255,0.22)] shadow-sm backdrop-blur-sm",
            align === "center" && "mx-auto"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7650FF] animate-pulse" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#F7F5FF] font-sans">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#B7B0CE] leading-relaxed font-sans">
          {description}
        </p>
      )}
    </div>
  );
}
