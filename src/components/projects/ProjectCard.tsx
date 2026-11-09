"use client";

import React, { useRef, useEffect } from "react";
import { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/Icons";
import { ExternalLink, Trophy, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { registerGSAP } from "@/lib/gsap";
import { TiltCard } from "@/components/ui/TiltCard";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isEven = index % 2 === 0;
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGSAP();
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !cardWrapperRef.current) return;

    const el = cardWrapperRef.current;

    const tween = gsap.fromTo(
      el,
      { opacity: 0.25, y: 60, z: -60, rotateX: 4, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        z: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={cardWrapperRef} className="perspective-1400 will-change-transform">
      <TiltCard maxTilt={4} depth={16} scale={1.01}>
        <article className="copper-glow-card rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden preserve-3d">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#B87345]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Information Column */}
            <div className={cn("lg:col-span-7 space-y-6", !isEven && "lg:order-2")}>
              {/* Badges / Header - Strictly NO ordinal labels (No Project 01, etc.) */}
              <div className="flex flex-wrap items-center gap-2.5">
                {project.statusBadge && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-full bg-[#B87345]/20 text-[#E5A96E] border border-[#B87345]/40 font-semibold shadow-sm">
                    <Trophy className="w-3.5 h-3.5 text-[#D18A54]" />
                    {project.statusBadge}
                  </span>
                )}

                {project.achievement && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-full bg-[#8C532B]/20 text-[#E5A96E] border border-[#8C532B]/40 font-medium">
                    {project.achievement}
                  </span>
                )}
              </div>

              {/* Project Title & Tagline */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F5EDE4] tracking-tight">
                  {project.name}
                </h3>
                {project.subtitle && (
                  <p className="text-xs sm:text-sm font-mono text-[#D18A54] mt-1">
                    {project.subtitle}
                  </p>
                )}
                <p className="text-base sm:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#D18A54] to-[#E5A96E] mt-2 italic font-serif">
                  “{project.tagline}”
                </p>
              </div>

              {/* Overview */}
              <p className="text-sm sm:text-base text-[#C8B6A5] leading-relaxed">
                {project.overview}
              </p>

              {/* What I Built */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-widest text-[#F5EDE4] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D18A54]" />
                  Architectural Highlights & Implementations
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#C8B6A5]">
                  {project.whatIBuilt.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D18A54] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-widest text-[#9B8979] mb-2.5">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-[#282017] border border-[rgba(209,138,84,0.20)] text-[#C8B6A5] hover:text-[#F5EDE4] hover:border-[#D18A54] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Honest Technical Disclosure (if present) */}
              {project.disclosure && (
                <div className="p-3.5 rounded-2xl bg-[#1D1712] border border-[rgba(209,138,84,0.20)] flex items-start gap-3 text-xs text-[#C8B6A5]">
                  <AlertCircle className="w-4 h-4 text-[#D18A54] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#F5EDE4]">Technical Disclosure: </span>
                    {project.disclosure}
                  </div>
                </div>
              )}

              {/* CTA Buttons (Only show real verified URLs) */}
              {(project.liveDemoUrl || project.githubUrl) && (
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  {project.liveDemoUrl && (
                    <Button
                      href={project.liveDemoUrl}
                      external
                      variant="primary"
                      size="md"
                      icon={ExternalLink}
                      iconPosition="right"
                    >
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      href={project.githubUrl}
                      external
                      variant="secondary"
                      size="md"
                      icon={GithubIcon}
                      iconPosition="left"
                    >
                      View Source Code
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Right column: Bespoke Functional Visualization with 3D Depth Layering */}
            <div
              className={cn("lg:col-span-5 h-full", !isEven && "lg:order-1")}
              style={{ transform: "translateZ(20px)" }}
            >
              <ProjectVisual type={project.visualType} />
            </div>
          </div>
        </article>
      </TiltCard>
    </div>
  );
}
