import React from "react";
import { EXTRA_CURRICULAR_DATA } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Users, Code, Award, ExternalLink, ArrowUpRight } from "lucide-react";

export function ExtraCurricular() {
  return (
    <section id="extra-curricular" className="relative py-24 sm:py-32 bg-[#15110E] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#B87345]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#E5A96E]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="COMMUNITY & ENGAGEMENT"
          title="Extra-Curricular Activities."
          description="Active involvement in professional engineering organizations, research discussions, and competitive technical hackathons."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {EXTRA_CURRICULAR_DATA.map((item, index) => {
            const isACM = index === 0;
            return (
              <div
                key={index}
                className="copper-glow-card rounded-3xl p-6 sm:p-8 lg:p-9 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle corner aura */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D18A54]/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#B87345]/15 text-[#E5A96E] border border-[#B87345]/30">
                      {isACM ? <Users className="w-3.5 h-3.5 text-[#D18A54]" /> : <Code className="w-3.5 h-3.5 text-[#D18A54]" />}
                      {item.role}
                    </span>
                    <span className="text-xs font-mono text-[#9B8979]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#F5EDE4] tracking-tight">
                    {item.title}
                  </h3>

                  {item.organizer && (
                    <p className="mt-1 text-xs font-mono text-[#D18A54]">
                      {item.organizer}
                    </p>
                  )}

                  <p className="mt-3 text-sm text-[#C8B6A5] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[rgba(209,138,84,0.15)] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#C8B6A5]">
                    <Award className="w-4 h-4 text-[#D18A54]" />
                    <span>Verified Engagement</span>
                  </div>

                  {item.certificateUrl && (
                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#E5A96E] hover:text-[#F5EDE4] transition-colors group/link"
                    >
                      <span>View Certificate</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
