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
    <article className="rounded-2xl border border-white/[0.09] bg-[#0D1118]/90 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-white/20">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#69E5DC]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left column (or reordered on desktop): Information */}
        <div className={cn("lg:col-span-7 space-y-6", !isEven && "lg:order-2")}>
          {/* Badges / Header */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[#69E5DC]/10 text-[#69E5DC] border border-[#69E5DC]/25 font-semibold">
              PROJECT 0{index + 1}
            </span>

            {project.statusBadge && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/25 font-medium">
                <Trophy className="w-3.5 h-3.5" />
                {project.statusBadge}
              </span>
            )}

            {project.achievement && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-md bg-[#8B9CFF]/15 text-[#8B9CFF] border border-[#8B9CFF]/30 font-medium">
                {project.achievement}
              </span>
            )}
          </div>

          {/* Project Title & Tagline */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] tracking-tight">
              {project.name}
            </h3>
            {project.subtitle && (
              <p className="text-xs sm:text-sm font-mono text-[#8B9CFF] mt-1">
                {project.subtitle}
              </p>
            )}
            <p className="text-base sm:text-lg font-medium text-[#69E5DC] mt-2 italic font-serif">
              “{project.tagline}”
            </p>
          </div>

          {/* Overview */}
          <p className="text-sm sm:text-base text-[#A0AAB8] leading-relaxed">
            {project.overview}
          </p>

          {/* What I Built */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#F5F7FA] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#69E5DC]" />
              Architectural Highlights & Implementations
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A0AAB8]">
              {project.whatIBuilt.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#69E5DC] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#A0AAB8] mb-2.5">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#121923] border border-white/10 text-[#F5F7FA] hover:border-[#69E5DC]/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Honest Technical Disclosure (if present) */}
          {project.disclosure && (
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3 text-xs text-[#A0AAB8]">
              <AlertCircle className="w-4 h-4 text-[#8B9CFF] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white/90">Technical Disclosure: </span>
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
