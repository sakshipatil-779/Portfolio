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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");

    if (["about", "achievements", "skills"].includes(targetId)) {
      window.dispatchEvent(
        new CustomEvent("scroll-to-showcase-panel", {
          detail: { panelId: targetId },
        })
      );
      setMobileMenuOpen(false);
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-3 sm:py-4 px-4 sm:px-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between rounded-full bg-[#15100C]/85 text-[#F5EDE4] px-5 sm:px-6 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-[rgba(217,164,65,0.25)] backdrop-blur-xl">
        {/* Brand Wordmark on Left */}
        <Link
          href="#hero"
          className="group flex items-center gap-2 focus-visible:outline-none rounded"
          aria-label="Sakshi Patil Home"
        >
          <span className="font-sans text-base sm:text-lg font-bold tracking-tight text-[#F5EDE4] group-hover:text-[#F7D38A] transition-colors">
            Sakshi Patil
            <span className="text-[#F0B85A] font-black ml-0.5">.</span>
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
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-[#D9A441]/25 to-[#F0B85A]/15 text-[#F7D38A] font-semibold border border-[#D9A441]/40 shadow-sm"
                    : "text-[#C8B6A5] hover:text-[#F5EDE4] hover:bg-[#211810]/70"
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
            onClick={(e) => handleNavClick(e, "#contact")}
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full bg-gradient-to-r from-[#D9A441] to-[#F0B85A] text-[#0B0907] hover:shadow-[0_0_20px_rgba(240,184,90,0.45)] transition-all duration-200 shadow-sm"
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
            className="p-1.5 rounded-full bg-[#211810] text-[#C8B6A5] hover:text-[#F7D38A] border border-[rgba(217,164,65,0.2)]"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full bg-[#211810] text-[#F5EDE4] hover:bg-[#2A1F15] border border-[rgba(217,164,65,0.2)] focus-visible:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#F0B85A]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 bg-[#15100C]/98 backdrop-blur-2xl rounded-2xl border border-[rgba(217,164,65,0.25)] shadow-2xl p-5 transition-all">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {PERSONAL_INFO.navigation.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between",
                    isActive
                      ? "bg-gradient-to-r from-[#D9A441]/25 to-[#F0B85A]/15 text-[#F7D38A] font-semibold border border-[#D9A441]/30"
                      : "text-[#C8B6A5] hover:bg-[#211810] hover:text-[#F5EDE4]"
                  )}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#F0B85A]" />}
                </a>
              );
            })}
            <div className="mt-3 pt-3 border-t border-[rgba(217,164,65,0.15)]">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl bg-gradient-to-r from-[#D9A441] to-[#F0B85A] text-[#0B0907] hover:shadow-[0_0_20px_rgba(240,184,90,0.45)] transition-colors"
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
