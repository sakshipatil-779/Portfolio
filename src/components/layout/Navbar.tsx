"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolio";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only after user starts scrolling down from the video landing page
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setMobileMenuOpen(false);
      }

      // Track active section
      const sections = PERSONAL_INFO.navigation.map((item) =>
        item.href.replace("#", "")
      );

      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        isScrolled
          ? "opacity-100 translate-y-0 pointer-events-auto bg-[#07090D]/85 backdrop-blur-md border-b border-white/[0.07] py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "opacity-0 -translate-y-full pointer-events-none py-3.5 border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram Brand */}
        <Link
          href="#hero"
          className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#69E5DC] rounded px-1"
          aria-label="Sakshi Patil Home"
        >
          <span className="font-mono text-xl sm:text-2xl font-black tracking-tight text-[#F5F7FA] transition-colors group-hover:text-[#69E5DC]">
            SP<span className="text-[#69E5DC]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-1 bg-[#121923]/60 px-4 py-1.5 rounded-full border border-white/[0.08] backdrop-blur-sm shadow-inner"
          aria-label="Main Navigation"
        >
          {PERSONAL_INFO.navigation.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 relative",
                  isActive
                    ? "text-[#07090D] font-semibold bg-[#69E5DC] shadow-[0_0_12px_rgba(105,229,220,0.4)]"
                    : "text-[#A0AAB8] hover:text-[#F5F7FA] hover:bg-white/5"
                )}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Desktop Right CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={PERSONAL_INFO.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile (sakshipatil-779)"
            className="flex items-center gap-2 text-xs font-mono font-medium px-3.5 py-2 rounded-lg border border-white/10 bg-[#121923]/80 text-[#F5F7FA] hover:border-[#69E5DC]/50 hover:text-[#69E5DC] hover:shadow-[0_0_15px_rgba(105,229,220,0.15)] transition-all duration-300 group"
          >
            <GithubIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={PERSONAL_INFO.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg border border-white/10 bg-[#121923]/80 text-[#F5F7FA] hover:text-[#69E5DC]"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-white/10 bg-[#121923] text-[#F5F7FA] hover:text-[#69E5DC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#69E5DC]"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#07090D]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 shadow-2xl transition-all">
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {PERSONAL_INFO.navigation.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between",
                    isActive
                      ? "bg-[#69E5DC]/15 text-[#69E5DC] font-semibold border-l-2 border-[#69E5DC]"
                      : "text-[#A0AAB8] hover:bg-white/5 hover:text-[#F5F7FA]"
                  )}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#69E5DC]" />}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
