import React from "react";
import { EDUCATION_DATA } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraduationCap, Calendar, Award } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32 bg-[#07090D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="EDUCATION"
          title="Academic Foundation."
          description="A consistent trajectory of academic diligence and formal computer engineering training."
        />

        <div className="max-w-3xl mx-auto relative mt-12 sm:mt-16">
          {/* Vertical Timeline Guide Line */}
          <div className="absolute top-4 bottom-4 left-4 sm:left-8 w-px bg-gradient-to-b from-[#69E5DC] via-white/10 to-transparent" />

          <div className="space-y-8 sm:space-y-12">
            {EDUCATION_DATA.map((edu, index) => (
              <div key={index} className="relative pl-12 sm:pl-20 group">
                {/* Timeline node marker */}
                <div className="absolute left-2.5 sm:left-6.5 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-[#07090D] border-2 border-[#69E5DC] flex items-center justify-center group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#69E5DC]" />
                </div>

                {/* Card Container */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#0D1118]/80 backdrop-blur-sm p-6 sm:p-7 shadow-lg group-hover:border-white/20 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-[#69E5DC] flex items-center gap-1.5 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    {edu.status && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#8B9CFF]/15 text-[#8B9CFF] border border-[#8B9CFF]/25 font-medium">
                        {edu.status}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#F5F7FA]">
                    {edu.degree}
                  </h3>
                  <p className="text-sm sm:text-base text-[#A0AAB8] mt-1 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#A0AAB8]/60 shrink-0" />
                    <span>{edu.institution}</span>
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#69E5DC]" />
                    <span className="text-xs font-mono uppercase text-[#A0AAB8]">
                      {edu.gradeLabel}:
                    </span>
                    <span className="text-sm font-mono font-bold text-[#F5F7FA]">
                      {edu.grade}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
