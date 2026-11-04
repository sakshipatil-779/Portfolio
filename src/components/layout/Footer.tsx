import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#07090D] py-12 sm:py-16 overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-px bg-gradient-to-r from-transparent via-[#69E5DC]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & Moniker */}
          <div className="text-center sm:text-left">
            <Link
              href="#hero"
              className="inline-flex items-center gap-1.5 font-mono text-lg font-bold tracking-tight text-[#F5F7FA] hover:text-[#69E5DC] transition-colors"
            >
              <span>{PERSONAL_INFO.name}</span>
              <span className="text-[#69E5DC]">.</span>
            </Link>
            <p className="mt-1 text-xs sm:text-sm text-[#A0AAB8]">
              Designed and developed with curiosity and code.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg border border-white/10 bg-[#121923]/60 text-[#A0AAB8] hover:text-[#69E5DC] hover:border-[#69E5DC]/40 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg border border-white/10 bg-[#121923]/60 text-[#A0AAB8] hover:text-[#69E5DC] hover:border-[#69E5DC]/40 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.contact.email}`}
              aria-label="Send Email"
              className="p-2 rounded-lg border border-white/10 bg-[#121923]/60 text-[#A0AAB8] hover:text-[#69E5DC] hover:border-[#69E5DC]/40 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A0AAB8]/60 gap-4">
          <p>© {currentYear} Sakshi Patil. All rights reserved.</p>
          <p className="font-mono text-[11px]">MET’s IOE, Nashik — Computer Engineering</p>
        </div>
      </div>
    </footer>
  );
}
