import React from "react";
import { PERSONAL_INFO } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Mail, ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-36 bg-[#15110E] overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-t from-[#B87345]/15 via-[#8C532B]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            eyebrow="GET IN TOUCH"
            title={PERSONAL_INFO.contact.heading}
            description={PERSONAL_INFO.contact.subheading}
            align="center"
          />

          {/* Action CTAs - Email and LinkedIn Only (No Phone) */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Button
              href={`mailto:${PERSONAL_INFO.contact.email}`}
              variant="primary"
              size="lg"
              icon={Mail}
              iconPosition="left"
            >
              Email Me Directly
            </Button>
            <Button
              href={PERSONAL_INFO.contact.linkedin}
              external
              variant="secondary"
              size="lg"
              icon={LinkedinIcon}
              iconPosition="left"
            >
              Connect on LinkedIn
            </Button>
          </div>

          {/* Direct Contact Cards - Email, LinkedIn, GitHub (Strictly Zero Phone Numbers) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 text-left max-w-4xl mx-auto">
            {/* Email Card */}
            <a
              href={`mailto:${PERSONAL_INFO.contact.email}`}
              className="copper-glow-card p-6 rounded-3xl group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-[#33271D] border border-[rgba(209,138,84,0.25)] w-fit text-[#D18A54] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#9B8979] mt-4">
                  Email
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#F5EDE4] mt-1 break-all">
                  {PERSONAL_INFO.contact.email}
                </div>
              </div>
              <div className="mt-5 flex items-center text-xs text-[#E5A96E] font-medium gap-1">
                <span>Compose email</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="copper-glow-card p-6 rounded-3xl group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-[#33271D] border border-[rgba(209,138,84,0.25)] w-fit text-[#D18A54] group-hover:scale-110 transition-transform">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#9B8979] mt-4">
                  LinkedIn
                </div>
                <div className="text-sm font-semibold text-[#F5EDE4] mt-1">
                  sakshipatil779
                </div>
              </div>
              <div className="mt-5 flex items-center text-xs text-[#E5A96E] font-medium gap-1">
                <span>View network</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="copper-glow-card p-6 rounded-3xl group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-[#33271D] border border-[rgba(209,138,84,0.25)] w-fit text-[#D18A54] group-hover:scale-110 transition-transform">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#9B8979] mt-4">
                  GitHub
                </div>
                <div className="text-sm font-semibold text-[#F5EDE4] mt-1">
                  sakshipatil-779
                </div>
              </div>
              <div className="mt-5 flex items-center text-xs text-[#E5A96E] font-medium gap-1">
                <span>Browse repositories</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
