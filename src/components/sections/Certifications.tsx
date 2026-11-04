import React from "react";
import { CERTIFICATIONS_DATA } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2, Award, Calendar } from "lucide-react";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32 bg-[#07090D] overflow-hidden">
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
              className="rounded-2xl border border-white/[0.08] bg-[#0D1118]/80 backdrop-blur-sm p-6 sm:p-8 shadow-xl hover:border-[#69E5DC]/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#69E5DC] font-semibold">
                    {cert.issuer}
                  </span>
                  {cert.badge && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#69E5DC]/15 text-[#69E5DC] border border-[#69E5DC]/30">
                      <Award className="w-3.5 h-3.5" />
                      {cert.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#F5F7FA] group-hover:text-[#69E5DC] transition-colors">
                  {cert.title}
                </h3>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#A0AAB8]">
                <div className="flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{cert.period}</span>
                </div>
                {cert.score && (
                  <div className="flex items-center gap-1 font-mono font-bold text-[#F5F7FA]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#69E5DC]" />
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
