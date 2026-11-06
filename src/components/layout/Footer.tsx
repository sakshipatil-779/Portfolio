import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[rgba(190,150,255,0.16)] bg-[#07070D] py-12 sm:py-16 overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-px bg-gradient-to-r from-transparent via-[#7650FF]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & Moniker */}
          <div className="text-center sm:text-left">
            <Link
              href="#hero"
              className="inline-flex items-center gap-1.5 font-sans text-lg font-bold tracking-tight text-[#F7F5FF] hover:text-[#7650FF] transition-colors"
            >
              <span>{PERSONAL_INFO.name}</span>
              <span className="text-[#F05BCB] font-black">.</span>
            </Link>
            <p className="mt-1 text-xs sm:text-sm text-[#B7B0CE]">
              Designed and developed with curiosity and code.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-full border border-[rgba(190,150,255,0.18)] bg-[#151020]/90 text-[#B7B0CE] hover:text-[#F7F5FF] hover:border-[#7650FF] transition-all hover:scale-105"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-full border border-[rgba(190,150,255,0.18)] bg-[#151020]/90 text-[#B7B0CE] hover:text-[#F7F5FF] hover:border-[#7650FF] transition-all hover:scale-105"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.contact.email}`}
              aria-label="Send Email"
              className="p-2.5 rounded-full border border-[rgba(190,150,255,0.18)] bg-[#151020]/90 text-[#B7B0CE] hover:text-[#F7F5FF] hover:border-[#7650FF] transition-all hover:scale-105"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-[rgba(190,150,255,0.1)] flex flex-col sm:flex-row items-center justify-between text-xs text-[#85809C] gap-4">
          <p>© {currentYear} Sakshi Patil. All rights reserved.</p>
          <p className="font-mono text-[11px]">MET’s IOE, Nashik — Computer Engineering</p>
        </div>
      </div>
    </footer>
  );
}
