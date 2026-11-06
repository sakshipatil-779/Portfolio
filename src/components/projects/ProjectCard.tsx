"use client";

import React from "react";
import { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/Icons";
import { ExternalLink, Trophy, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isEven = index % 2 === 0;

  return (
    <article className="rounded-3xl border border-[rgba(190,150,255,0.18)] bg-[#151020]/90 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-[rgba(190,150,255,0.35)]">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#7650FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Information Column */}
        <div className={cn("lg:col-span-7 space-y-6", !isEven && "lg:order-2")}>
          {/* Badges / Header */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#7650FF]/15 text-[#B7B0CE] border border-[#7650FF]/30 font-semibold">
              PROJECT 0{index + 1}
            </span>

            {project.statusBadge && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/25 font-medium">
                <Trophy className="w-3.5 h-3.5" />
                {project.statusBadge}
              </span>
            )}

            {project.achievement && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-full bg-[#F05BCB]/15 text-[#F05BCB] border border-[#F05BCB]/30 font-medium">
                {project.achievement}
              </span>
            )}
          </div>

          {/* Project Title & Tagline */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F7F5FF] tracking-tight">
              {project.name}
            </h3>
            {project.subtitle && (
              <p className="text-xs sm:text-sm font-mono text-[#7B8CFF] mt-1">
                {project.subtitle}
              </p>
            )}
            <p className="text-base sm:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#7B8CFF] to-[#F05BCB] mt-2 italic font-serif">
              “{project.tagline}”
            </p>
          </div>

          {/* Overview */}
          <p className="text-sm sm:text-base text-[#B7B0CE] leading-relaxed">
            {project.overview}
          </p>

          {/* What I Built */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#F7F5FF] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7650FF]" />
              Architectural Highlights & Implementations
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#B7B0CE]">
              {project.whatIBuilt.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7650FF] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#85809C] mb-2.5">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-[#1A1428] border border-[rgba(190,150,255,0.16)] text-[#B7B0CE] hover:text-[#F7F5FF] hover:border-[#7650FF] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Honest Technical Disclosure (if present) */}
          {project.disclosure && (
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-[rgba(190,150,255,0.16)] flex items-start gap-3 text-xs text-[#B7B0CE]">
              <AlertCircle className="w-4 h-4 text-[#7B8CFF] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#F7F5FF]">Technical Disclosure: </span>
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

        {/* Right column: Bespoke Functional Visualization */}
        <div className={cn("lg:col-span-5 h-full", !isEven && "lg:order-1")}>
          <ProjectVisual type={project.visualType} />
        </div>
      </div>
    </article>
  );
}
