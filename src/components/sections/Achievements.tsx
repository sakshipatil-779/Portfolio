import React from "react";
import { ACHIEVEMENTS_DATA } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Trophy, Award, CheckCircle2 } from "lucide-react";

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 sm:py-32 bg-[#07090D] overflow-hidden">
      {/* Subtle top spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-48 bg-[#69E5DC]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="RECOGNITION"
          title="Competitive Honors & Benchmarks."
          description="Proven performance under state-level competitive pressure and national academic standards."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {ACHIEVEMENTS_DATA.map((item, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={index}
                className="rounded-2xl border border-white/[0.09] bg-[#0D1118]/85 backdrop-blur-sm p-6 sm:p-8 lg:p-9 shadow-2xl relative overflow-hidden group hover:border-[#69E5DC]/40 transition-all duration-300"
              >
                {/* Accent rim glow */}
                <div
                  className={`absolute top-0 right-0 w-36 h-36 ${
                    isFirst ? "bg-[#69E5DC]/10" : "bg-[#8B9CFF]/10"
                  } rounded-full blur-2xl pointer-events-none`}
                />

                <div className="flex items-center justify-between gap-4 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                      isFirst
                        ? "bg-[#69E5DC]/15 text-[#69E5DC] border border-[#69E5DC]/30"
                        : "bg-[#8B9CFF]/15 text-[#8B9CFF] border border-[#8B9CFF]/30"
                    }`}
                  >
                    {isFirst ? <Trophy className="w-3.5 h-3.5" /> : <Award className="w-3.5 h-3.5" />}
                    {item.rank}
                  </span>
                  {item.track && (
                    <span className="text-xs font-mono text-[#A0AAB8]">
                      {item.track}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-[#F5F7FA] tracking-tight">
                  {item.event}
                </h3>

                <p className="mt-2 text-sm text-[#69E5DC] font-medium">
                  {item.highlight}
                </p>

                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#A0AAB8]">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#69E5DC] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
