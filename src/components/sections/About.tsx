import React from "react";
import { PERSONAL_INFO } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Award, BookOpen, GraduationCap, MapPin, Sparkles } from "lucide-react";

export function About() {
  const iconMap: Record<string, React.ReactNode> = {
    Name: <Sparkles className="w-4 h-4 text-[#69E5DC]" />,
    Degree: <BookOpen className="w-4 h-4 text-[#8B9CFF]" />,
    Institute: <GraduationCap className="w-4 h-4 text-[#69E5DC]" />,
    "Academic Duration": <MapPin className="w-4 h-4 text-[#8B9CFF]" />,
    CGPA: <Award className="w-4 h-4 text-[#69E5DC]" />,
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#07090D] overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#8B9CFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="ABOUT ME"
          title={PERSONAL_INFO.aboutTitle}
          description="Combining core computer science fundamentals with modern systems engineering."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative Editorial Bio */}
          <div className="lg:col-span-7 space-y-6 text-[#A0AAB8] text-base sm:text-lg leading-relaxed font-sans">
            {PERSONAL_INFO.bioParagraphs.map((paragraph, index) => (
              <p key={index} className="text-[#F5F7FA]/90">
                {paragraph}
              </p>
            ))}

            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0D1118] border border-white/[0.08]">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#69E5DC]">
                  8.31
                </div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#A0AAB8] mt-1">
                  Cumulative CGPA
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#0D1118] border border-white/[0.08]">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#8B9CFF]">
                  2024–2028
                </div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#A0AAB8] mt-1">
                  Class of 2028
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Factual Specification Matrix */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/[0.09] bg-[#0D1118]/80 backdrop-blur-sm p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#69E5DC]/5 rounded-full blur-2xl" />

              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <span className="font-mono text-xs uppercase tracking-widest text-[#69E5DC]">
                  ENGINEERING CREDENTIALS
                </span>
                <span className="font-mono text-[11px] text-[#A0AAB8]/60">
                  VERIFIED RECORD
                </span>
              </div>

              <div className="divide-y divide-white/[0.06] mt-2">
                {PERSONAL_INFO.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="py-4 flex items-start justify-between gap-4"
                  >
                    <div className="flex items-center gap-2 text-xs uppercase font-mono text-[#A0AAB8] shrink-0">
                      {iconMap[fact.label]}
                      <span>{fact.label}</span>
                    </div>
                    <div className="text-sm font-medium text-[#F5F7FA] text-right">
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
