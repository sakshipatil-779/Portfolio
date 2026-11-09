"use client";

import React, { useRef, useEffect } from "react";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/Icons";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { registerGSAP } from "@/lib/gsap";
import { TiltCard } from "@/components/ui/TiltCard";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const githubCardRef = useRef<HTMLDivElement>(null);

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

      if (githubCardRef.current) {
        gsap.fromTo(
          githubCardRef.current,
          { opacity: 0.25, y: 55, z: -50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            z: 0,
            scale: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: githubCardRef.current,
              start: "top 85%",
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
      id="projects"
      className="relative py-24 sm:py-32 bg-transparent overflow-hidden perspective-1200"
    >
      {/* Background illumination */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D9A441]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#F0B85A]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="FEATURED PROJECTS"
            title="Engineering Proof of Capability."
            description="High-stakes distributed machine learning, financial commitment detection, and decentralized cryptographic consensus."
          />
        </div>

        <div className="space-y-12 sm:space-y-16">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}

          {/* 4th Card: Explore More Projects on GitHub with 3D Depth */}
          <div ref={githubCardRef} className="perspective-1400 will-change-transform">
            <TiltCard maxTilt={4} depth={14} scale={1.01}>
              <div className="copper-glow-card rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 preserve-3d">
                <div className="space-y-3 text-center md:text-left max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B87345]/15 text-[#E5A96E] border border-[#B87345]/30 text-xs font-mono font-semibold">
                    <FolderGit2 className="w-3.5 h-3.5 text-[#D18A54]" />
                    <span>OPEN SOURCE & EXPERIMENTS</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#F5EDE4] tracking-tight">
                    Explore More Projects on GitHub
                  </h3>
                  <p className="text-sm sm:text-base text-[#C8B6A5] leading-relaxed">
                    Discover additional repositories, algorithmic implementations in Java, academic course projects, and open-source explorations on GitHub.
                  </p>
                </div>

                <div className="shrink-0" style={{ transform: "translateZ(15px)" }}>
                  <Button
                    href="https://github.com/sakshipatil-779"
                    external
                    variant="primary"
                    size="lg"
                    icon={GithubIcon}
                    iconPosition="left"
                  >
                    <span>Visit GitHub Profile</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
