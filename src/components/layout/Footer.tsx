import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[rgba(209,138,84,0.18)] bg-[#15110E] py-12 sm:py-16 overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-px bg-gradient-to-r from-transparent via-[#D18A54]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & Moniker */}
          <div className="text-center sm:text-left">
            <Link
              href="#hero"
              className="inline-flex items-center gap-1.5 font-sans text-lg font-bold tracking-tight text-[#F5EDE4] hover:text-[#E5A96E] transition-colors"
            >
              <span>{PERSONAL_INFO.name}</span>
              <span className="text-[#D18A54] font-black">.</span>
            </Link>
            <p className="mt-1 text-xs sm:text-sm text-[#C8B6A5]">
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
              className="p-2.5 rounded-full border border-[rgba(209,138,84,0.20)] bg-[#282017]/90 text-[#C8B6A5] hover:text-[#F5EDE4] hover:border-[#D18A54] transition-all hover:scale-105"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-full border border-[rgba(209,138,84,0.20)] bg-[#282017]/90 text-[#C8B6A5] hover:text-[#F5EDE4] hover:border-[#D18A54] transition-all hover:scale-105"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.contact.email}`}
              aria-label="Send Email"
              className="p-2.5 rounded-full border border-[rgba(209,138,84,0.20)] bg-[#282017]/90 text-[#C8B6A5] hover:text-[#F5EDE4] hover:border-[#D18A54] transition-all hover:scale-105"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-[rgba(209,138,84,0.12)] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9B8979] gap-4">
          <p>© {currentYear} Sakshi Patil. All rights reserved.</p>
          <p className="font-mono text-[11px]">MET’s IOE, Nashik — Savitribai Phule Pune University</p>
        </div>
      </div>
    </footer>
  );
}
