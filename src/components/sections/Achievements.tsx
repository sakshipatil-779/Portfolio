import React from "react";
import { ACHIEVEMENTS_DATA } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Trophy, Award, CheckCircle2, ArrowUpRight } from "lucide-react";

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 sm:py-32 bg-[#15110E] overflow-hidden">
      {/* Subtle top spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-48 bg-[#B87345]/10 rounded-full blur-3xl pointer-events-none" />

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
                className="copper-glow-card rounded-3xl p-6 sm:p-8 lg:p-9 shadow-2xl relative overflow-hidden flex flex-col justify-between"
              >
                {/* Accent rim glow */}
                <div
                  className={`absolute top-0 right-0 w-36 h-36 ${
                    isFirst ? "bg-[#B87345]/15" : "bg-[#E5A96E]/12"
                  } rounded-full blur-2xl pointer-events-none`}
                />

                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        isFirst
                          ? "bg-[#B87345]/20 text-[#E5A96E] border border-[#B87345]/40 shadow-sm"
                          : "bg-[#8C532B]/20 text-[#E5A96E] border border-[#8C532B]/40 shadow-sm"
                      }`}
                    >
                      {isFirst ? <Trophy className="w-3.5 h-3.5 text-[#D18A54]" /> : <Award className="w-3.5 h-3.5 text-[#D18A54]" />}
                      {item.rank}
                    </span>
                    {item.track && (
                      <span className="text-xs font-mono text-[#9B8979]">
                        {item.track}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-[#F5EDE4] tracking-tight">
                    {item.event}
                  </h3>

                  {item.organization && (
                    <p className="mt-1 text-xs font-mono text-[#D18A54]">
                      {item.organization}
                    </p>
                  )}

                  <p className="mt-2 text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#D18A54] to-[#E5A96E] font-medium">
                    {item.highlight}
                  </p>

                  <div className="mt-6 pt-5 border-t border-[rgba(209,138,84,0.14)]">
                    <ul className="space-y-2.5 text-xs sm:text-sm text-[#C8B6A5]">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#D18A54] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* View Certificate Action */}
                {item.certificateUrl && (
                  <div className="mt-6 pt-4 border-t border-[rgba(209,138,84,0.12)] flex items-center justify-end">
                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#E5A96E] hover:text-[#F5EDE4] transition-colors group/link"
                    >
                      <span>View Certificate</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
