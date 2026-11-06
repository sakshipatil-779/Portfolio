import React from "react";
import { CERTIFICATIONS_DATA } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2, Award, Calendar } from "lucide-react";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32 bg-[#07070D] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#7650FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="CREDENTIALS"
          title="Verified Certifications."
          description="Recognized mastery in object-oriented programming, algorithmic efficiency, and foundational computer science."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <div
              key={index}
              className="rounded-3xl border border-[rgba(190,150,255,0.18)] bg-[#151020]/90 backdrop-blur-md p-6 sm:p-8 shadow-xl hover:border-[#7650FF]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#7B8CFF] font-semibold">
                    {cert.issuer}
                  </span>
                  {cert.badge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#7650FF]/20 text-[#F7F5FF] border border-[#7650FF]/40 shadow-sm">
                      <Award className="w-3.5 h-3.5 text-[#F05BCB]" />
                      {cert.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#F7F5FF] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#7650FF] group-hover:to-[#F05BCB] transition-colors">
                  {cert.title}
                </h3>
              </div>

              <div className="mt-6 pt-5 border-t border-[rgba(190,150,255,0.12)] flex items-center justify-between text-xs text-[#B7B0CE]">
                <div className="flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#85809C]" />
                  <span>{cert.period}</span>
                </div>
                {cert.score && (
                  <div className="flex items-center gap-1 font-mono font-bold text-[#F7F5FF]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F05BCB]" />
                    <span>Score: {cert.score}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
