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
    "core-cs": <Binary className="w-5 h-5 text-[#7650FF]" />,
    languages: <Code2 className="w-5 h-5 text-[#7B8CFF]" />,
    "web-backend": <Server className="w-5 h-5 text-[#F05BCB]" />,
    "ai-security": <ShieldAlert className="w-5 h-5 text-[#7650FF]" />,
    tools: <Wrench className="w-5 h-5 text-[#7B8CFF]" />,
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-[#07070D] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7650FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#F05BCB]/8 rounded-full blur-3xl pointer-events-none" />

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
              className="rounded-3xl border border-[rgba(190,150,255,0.18)] bg-[#151020]/90 backdrop-blur-md p-6 sm:p-7 shadow-xl hover:border-[#7650FF]/50 hover:bg-[#1A1428] transition-all duration-300 group relative flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-[rgba(190,150,255,0.14)]">
                  <div className="p-2.5 rounded-xl bg-[#1A1428] border border-[rgba(190,150,255,0.2)] group-hover:border-[#7650FF]/50 group-hover:bg-[#7650FF]/15 transition-colors">
                    {categoryIcons[cat.categoryKey]}
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#F7F5FF] font-bold">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills List */}
                <ul className="mt-5 space-y-2.5">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-sm text-[#B7B0CE] group-hover:text-[#F7F5FF] transition-colors"
                    >
                      <Check className="w-3.5 h-3.5 text-[#F05BCB] shrink-0" />
                      <span className="font-sans font-medium">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer detail */}
              <div className="mt-6 pt-4 border-t border-[rgba(190,150,255,0.1)] flex items-center justify-between text-[11px] font-mono text-[#85809C]">
                <span>{cat.skills.length} competencies</span>
                <span className="text-[#7650FF] uppercase text-[10px] font-semibold">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
