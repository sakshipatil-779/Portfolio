import React from "react";
import { PERSONAL_INFO } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Award, BookOpen, GraduationCap, MapPin, Sparkles } from "lucide-react";

export function About() {
  const iconMap: Record<string, React.ReactNode> = {
    Name: <Sparkles className="w-4 h-4 text-[#7650FF]" />,
    Degree: <BookOpen className="w-4 h-4 text-[#7B8CFF]" />,
    Institute: <GraduationCap className="w-4 h-4 text-[#7650FF]" />,
    "Academic Duration": <MapPin className="w-4 h-4 text-[#7B8CFF]" />,
    CGPA: <Award className="w-4 h-4 text-[#F05BCB]" />,
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#07070D] overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#7650FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F05BCB]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="ABOUT ME"
          title={PERSONAL_INFO.aboutTitle}
          description="Combining core computer science fundamentals with modern systems engineering."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative Editorial Bio */}
          <div className="lg:col-span-7 space-y-6 text-[#B7B0CE] text-base sm:text-lg leading-relaxed font-sans">
            {PERSONAL_INFO.bioParagraphs.map((paragraph, index) => (
              <p key={index} className="text-[#F7F5FF]/90">
                {paragraph}
              </p>
            ))}

            <div className="pt-6 border-t border-[rgba(190,150,255,0.16)] grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#151020]/90 border border-[rgba(190,150,255,0.16)] shadow-lg">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7650FF] to-[#F05BCB]">
                  8.31
                </div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#B7B0CE] mt-1">
                  Cumulative CGPA
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#151020]/90 border border-[rgba(190,150,255,0.16)] shadow-lg">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7B8CFF] to-[#7650FF]">
                  2024–2028
                </div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#B7B0CE] mt-1">
                  Class of 2028
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Factual Specification Matrix */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-[rgba(190,150,255,0.18)] bg-[#151020]/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7650FF]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-6 border-b border-[rgba(190,150,255,0.16)]">
                <span className="font-mono text-xs uppercase tracking-widest text-[#7B8CFF] font-semibold">
                  ENGINEERING CREDENTIALS
                </span>
                <span className="font-mono text-[11px] text-[#85809C]">
                  VERIFIED RECORD
                </span>
              </div>

              <div className="divide-y divide-[rgba(190,150,255,0.12)] mt-2">
                {PERSONAL_INFO.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="py-4 flex items-start justify-between gap-4"
                  >
                    <div className="flex items-center gap-2 text-xs uppercase font-mono text-[#B7B0CE] shrink-0">
                      {iconMap[fact.label]}
                      <span>{fact.label}</span>
                    </div>
                    <div className="text-sm font-medium text-[#F7F5FF] text-right">
                      {fact.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
