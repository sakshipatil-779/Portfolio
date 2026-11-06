import React from "react";
import { EDUCATION_DATA } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraduationCap, Calendar, Award } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32 bg-[#07070D] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#7650FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#F05BCB]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="EDUCATION"
          title="Academic Foundation."
          description="A consistent trajectory of academic diligence and formal computer engineering training."
        />

        <div className="max-w-3xl mx-auto relative mt-12 sm:mt-16">
          {/* Vertical Timeline Guide Line */}
          <div className="absolute top-4 bottom-4 left-4 sm:left-8 w-px bg-gradient-to-b from-[#7650FF] via-[#F05BCB]/30 to-transparent" />

          <div className="space-y-8 sm:space-y-12">
            {EDUCATION_DATA.map((edu, index) => (
              <div key={index} className="relative pl-12 sm:pl-20 group">
                {/* Timeline node marker */}
                <div className="absolute left-2.5 sm:left-6.5 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-[#07070D] border-2 border-[#7650FF] flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(118,80,255,0.4)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F05BCB]" />
                </div>

                {/* Card Container */}
                <div className="rounded-3xl border border-[rgba(190,150,255,0.18)] bg-[#151020]/90 backdrop-blur-md p-6 sm:p-7 shadow-xl group-hover:border-[#7650FF]/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-[#7B8CFF] flex items-center gap-1.5 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    {edu.status && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#7650FF]/15 text-[#F7F5FF] border border-[#7650FF]/30 font-medium">
                        {edu.status}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#F7F5FF]">
                    {edu.degree}
                  </h3>
                  <p className="text-sm sm:text-base text-[#B7B0CE] mt-1 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#85809C] shrink-0" />
                    <span>{edu.institution}</span>
                  </p>

                  <div className="mt-4 pt-4 border-t border-[rgba(190,150,255,0.12)] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#F05BCB]" />
                    <span className="text-xs font-mono uppercase text-[#B7B0CE]">
                      {edu.gradeLabel}:
                    </span>
                    <span className="text-sm font-mono font-bold text-[#F7F5FF]">
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
