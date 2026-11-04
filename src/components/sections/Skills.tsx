import React from "react";
import { SKILL_CATEGORIES } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Binary,
  Code2,
  Server,
  ShieldAlert,
  Wrench,
  Check,
} from "lucide-react";

export function Skills() {
  const categoryIcons: Record<string, React.ReactNode> = {
    "core-cs": <Binary className="w-5 h-5 text-[#69E5DC]" />,
    languages: <Code2 className="w-5 h-5 text-[#8B9CFF]" />,
    "web-backend": <Server className="w-5 h-5 text-[#69E5DC]" />,
    "ai-security": <ShieldAlert className="w-5 h-5 text-[#8B9CFF]" />,
    tools: <Wrench className="w-5 h-5 text-[#69E5DC]" />,
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-[#07090D] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#69E5DC]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="TECHNICAL ARSENAL"
          title="Skills & Engineering Competencies."
          description="Grounded in computer science theory, algorithms in Java, and modern production web and decentralized architectures."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.categoryKey}
              className="rounded-2xl border border-white/[0.08] bg-[#0D1118]/80 backdrop-blur-sm p-6 sm:p-7 shadow-xl hover:border-[#69E5DC]/30 hover:bg-[#121923]/90 transition-all duration-300 group relative flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-white/[0.08]">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#69E5DC]/30 group-hover:bg-[#69E5DC]/10 transition-colors">
                    {categoryIcons[cat.categoryKey]}
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#F5F7FA] font-bold">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills List */}
                <ul className="mt-5 space-y-2.5">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-sm text-[#A0AAB8] group-hover:text-[#F5F7FA] transition-colors"
                    >
                      <Check className="w-3.5 h-3.5 text-[#69E5DC] shrink-0" />
                      <span className="font-sans font-medium">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer detail */}
              <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-[#A0AAB8]/50">
                <span>{cat.skills.length} competencies</span>
                <span className="text-[#69E5DC]/60 uppercase text-[10px]">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
