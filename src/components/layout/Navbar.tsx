"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolio";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface NavbarProps {
  forceVisible?: boolean;
}

export function Navbar({ forceVisible = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (forceVisible) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 30) {
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
  }, [forceVisible]);

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
    <header className="fixed top-0 left-0 right-0 z-40 py-3 sm:py-4 px-4 sm:px-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between rounded-full bg-white/95 text-slate-800 px-5 sm:px-6 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/60 backdrop-blur-md">
        {/* Brand Wordmark on Left */}
        <Link
          href="#hero"
          className="group flex items-center gap-2 focus-visible:outline-none rounded"
          aria-label="Sakshi Patil Home"
        >
          <span className="font-sans text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-[#B87345] transition-colors">
            Sakshi Patil
            <span className="text-[#D18A54] font-black ml-0.5">.</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1"
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
                  "px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200",
                  isActive
                    ? "bg-slate-900 text-white font-semibold shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Professional Rounded CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-gradient-to-r hover:from-[#B87345] hover:to-[#E5A96E] hover:text-[#15110E] transition-all duration-200 shadow-sm hover:shadow"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={PERSONAL_INFO.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-1.5 rounded-full bg-slate-100 text-slate-700 hover:text-[#D18A54]"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 focus-visible:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 bg-white/98 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-2xl p-5 transition-all">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {PERSONAL_INFO.navigation.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between",
                    isActive
                      ? "bg-slate-900 text-white font-semibold"
                      : "text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D18A54]" />}
                </a>
              );
            })}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl bg-slate-900 text-white hover:bg-gradient-to-r hover:from-[#B87345] hover:to-[#E5A96E] hover:text-[#15110E] transition-colors"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
