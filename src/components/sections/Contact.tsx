import React from "react";
import { PERSONAL_INFO } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-36 bg-[#07070D] overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-t from-[#7650FF]/15 via-[#F05BCB]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            eyebrow="GET IN TOUCH"
            title={PERSONAL_INFO.contact.heading}
            description={PERSONAL_INFO.contact.subheading}
            align="center"
          />

          {/* Action CTAs */}
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
              href={`tel:${PERSONAL_INFO.contact.phone}`}
              variant="secondary"
              size="lg"
              icon={Phone}
              iconPosition="left"
            >
              Call {PERSONAL_INFO.contact.phoneDisplay}
            </Button>
          </div>

          {/* Direct Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14 text-left">
            {/* Email Card */}
            <a
              href={`mailto:${PERSONAL_INFO.contact.email}`}
              className="p-5 rounded-3xl border border-[rgba(190,150,255,0.18)] bg-[#151020]/90 backdrop-blur-md hover:border-[#7650FF]/50 hover:bg-[#1A1428] transition-all group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-[#1A1428] border border-[rgba(190,150,255,0.2)] w-fit text-[#7650FF] group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#85809C] mt-3">
                  Email
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#F7F5FF] mt-1 break-all">
                  {PERSONAL_INFO.contact.email}
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-[#F05BCB] font-medium gap-1">
                <span>Compose email</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* Phone Card */}
            <a
              href={`tel:${PERSONAL_INFO.contact.phone}`}
              className="p-5 rounded-3xl border border-[rgba(190,150,255,0.18)] bg-[#151020]/90 backdrop-blur-md hover:border-[#7650FF]/50 hover:bg-[#1A1428] transition-all group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-[#1A1428] border border-[rgba(190,150,255,0.2)] w-fit text-[#7B8CFF] group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#85809C] mt-3">
                  Phone
                </div>
                <div className="text-sm font-semibold text-[#F7F5FF] mt-1">
                  {PERSONAL_INFO.contact.phoneDisplay}
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-[#7B8CFF] font-medium gap-1">
                <span>Direct call</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl border border-[rgba(190,150,255,0.18)] bg-[#151020]/90 backdrop-blur-md hover:border-[#7650FF]/50 hover:bg-[#1A1428] transition-all group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-[#1A1428] border border-[rgba(190,150,255,0.2)] w-fit text-[#7650FF] group-hover:scale-110 transition-transform">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#85809C] mt-3">
                  LinkedIn
                </div>
                <div className="text-sm font-semibold text-[#F7F5FF] mt-1">
                  sakshipatil779
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-[#F05BCB] font-medium gap-1">
                <span>View profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl border border-[rgba(190,150,255,0.18)] bg-[#151020]/90 backdrop-blur-md hover:border-[#7650FF]/50 hover:bg-[#1A1428] transition-all group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-[#1A1428] border border-[rgba(190,150,255,0.2)] w-fit text-[#F7F5FF] group-hover:scale-110 transition-transform">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#85809C] mt-3">
                  GitHub
                </div>
                <div className="text-sm font-semibold text-[#F7F5FF] mt-1">
                  sakshipatil-779
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-[#7650FF] font-medium gap-1">
                <span>Repositories</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
