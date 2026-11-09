"use client";

import React, { useRef, useEffect } from "react";
import { CERTIFICATIONS_DATA } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2, Award, Calendar, ExternalLink, Download } from "lucide-react";
import { registerGSAP } from "@/lib/gsap";
import { TiltCard } from "@/components/ui/TiltCard";

export function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGSAP();
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 35, z: -20 },
          {
            opacity: 1,
            y: 0,
            z: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".cert-card-wrapper");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, z: -40, rotateX: 5 },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-24 sm:py-32 bg-[#15110E] overflow-hidden perspective-1200"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#B87345]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="CREDENTIALS"
            title="Verified Certifications."
            description="Recognized mastery in object-oriented programming, algorithmic efficiency, and foundational computer science."
          />
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto"
        >
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <div key={index} className="cert-card-wrapper will-change-transform">
              <TiltCard maxTilt={4.5} depth={12} scale={1.015}>
                <div className="copper-glow-card rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between group h-full">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#D18A54] font-semibold">
                        {cert.issuer}
                      </span>
                      {cert.badge && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#B87345]/20 text-[#E5A96E] border border-[#B87345]/40 shadow-sm">
                          <Award className="w-3.5 h-3.5 text-[#D18A54]" />
                          {cert.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-[#F5EDE4] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#D18A54] group-hover:to-[#E5A96E] transition-colors">
                      {cert.title}
                    </h3>

                    {cert.subIssuer && (
                      <p className="mt-1 text-xs font-mono text-[#C8B6A5]/80">
                        {cert.subIssuer}
                      </p>
                    )}

                    {cert.description && (
                      <p className="mt-2.5 text-xs sm:text-sm text-[#C8B6A5] leading-relaxed">
                        {cert.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-5 border-t border-[rgba(209,138,84,0.15)] flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs text-[#C8B6A5]">
                      <div className="flex items-center gap-1.5 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-[#9B8979]" />
                        <span>{cert.period}</span>
                      </div>
                      {cert.score && (
                        <div className="flex items-center gap-1 font-mono font-bold text-[#F5EDE4]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D18A54]" />
                          <span>Score: {cert.score}</span>
                        </div>
                      )}
                    </div>

                    {/* Dual Actions: View PDF & Download PDF */}
                    <div className="flex items-center gap-3 pt-2">
                      <a
                        href={cert.viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#282017] text-[#C8B6A5] border border-[rgba(209,138,84,0.25)] hover:border-[#D18A54] hover:text-[#F5EDE4] hover:bg-[#33271D] transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#D18A54]" />
                        <span>View PDF</span>
                      </a>

                      <a
                        href={cert.viewUrl}
                        download={cert.downloadName}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#282017] text-[#C8B6A5] border border-[rgba(209,138,84,0.25)] hover:border-[#D18A54] hover:text-[#F5EDE4] hover:bg-[#33271D] transition-all"
                      >
                        <Download className="w-3.5 h-3.5 text-[#E5A96E]" />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
