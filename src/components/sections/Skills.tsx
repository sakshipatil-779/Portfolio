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
    "core-cs": <Binary className="w-5 h-5 text-[#D18A54]" />,
    languages: <Code2 className="w-5 h-5 text-[#E5A96E]" />,
    "web-backend": <Server className="w-5 h-5 text-[#D18A54]" />,
    "ai-security": <ShieldAlert className="w-5 h-5 text-[#E5A96E]" />,
    tools: <Wrench className="w-5 h-5 text-[#D18A54]" />,
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-[#15110E] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B87345]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#E5A96E]/8 rounded-full blur-3xl pointer-events-none" />

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
              className="copper-glow-card rounded-3xl p-6 sm:p-7 shadow-xl group relative flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-[rgba(209,138,84,0.15)]">
                  <div className="p-2.5 rounded-xl bg-[#33271D] border border-[rgba(209,138,84,0.20)] group-hover:border-[#D18A54] group-hover:bg-[#B87345]/15 transition-colors">
                    {categoryIcons[cat.categoryKey]}
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#F5EDE4] font-bold">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills List */}
                <ul className="mt-5 space-y-2.5">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-sm text-[#C8B6A5] group-hover:text-[#F5EDE4] transition-colors"
                    >
                      <Check className="w-3.5 h-3.5 text-[#D18A54] shrink-0" />
                      <span className="font-sans font-medium">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer detail */}
              <div className="mt-6 pt-4 border-t border-[rgba(209,138,84,0.12)] flex items-center justify-between text-[11px] font-mono text-[#9B8979]">
                <span>{cat.skills.length} competencies</span>
                <span className="text-[#E5A96E] uppercase text-[10px] font-semibold">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
