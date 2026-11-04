import React from "react";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-[#07090D] overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#69E5DC]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="FEATURED PROJECTS"
          title="Engineering Proof of Capability."
          description="High-stakes distributed machine learning, financial commitment detection, and decentralized cryptographic consensus."
        />

        <div className="space-y-12 sm:space-y-16">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
