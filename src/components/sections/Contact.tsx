"use client";

import React, { useRef, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Mail, ArrowUpRight } from "lucide-react";
import { registerGSAP } from "@/lib/gsap";
import { TiltCard } from "@/components/ui/TiltCard";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGSAP();
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Background ambient lighting becomes warmer on scroll approach
      if (ambientGlowRef.current) {
        gsap.fromTo(
          ambientGlowRef.current,
          { opacity: 0.3, scale: 0.85 },
          {
            opacity: 0.85,
            scale: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }

      // Heading lift
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 35, z: -20 },
          {
            opacity: 1,
            y: 0,
            z: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // Action CTAs lift
      if (ctaButtonsRef.current) {
        gsap.fromTo(
          ctaButtonsRef.current,
          { opacity: 0, y: 25, z: -15 },
          {
            opacity: 1,
            y: 0,
            z: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaButtonsRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // Contact cards staggered 3D rise
      if (cardsGridRef.current) {
        const cards = cardsGridRef.current.querySelectorAll(".contact-card-wrapper");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45, z: -40, rotateX: 5 },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 82%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-36 bg-[#15110E] overflow-hidden perspective-1200"
    >
      {/* Background ambient radial gradients that intensify warmly on approach */}
      <div
        ref={ambientGlowRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-t from-[#B87345]/25 via-[#8C532B]/15 to-transparent rounded-full blur-3xl pointer-events-none will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={headingRef}>
            <SectionHeading
              eyebrow="GET IN TOUCH"
              title={PERSONAL_INFO.contact.heading}
              description={PERSONAL_INFO.contact.subheading}
              align="center"
            />
          </div>

          {/* Action CTAs - Email and LinkedIn Only (No Phone) */}
          <div
            ref={ctaButtonsRef}
            className="flex flex-wrap items-center justify-center gap-4 mt-8 will-change-transform"
          >
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

          {/* Direct Contact Cards - Email, LinkedIn, GitHub with 3D Depth & Tilt */}
          <div
            ref={cardsGridRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 text-left max-w-4xl mx-auto"
          >
            {/* Email Card */}
            <div className="contact-card-wrapper will-change-transform">
              <TiltCard maxTilt={5.5} depth={12} scale={1.02}>
                <a
                  href={`mailto:${PERSONAL_INFO.contact.email}`}
                  className="copper-glow-card p-6 rounded-3xl group flex flex-col justify-between shadow-xl h-full block"
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
              </TiltCard>
            </div>

            {/* LinkedIn Card */}
            <div className="contact-card-wrapper will-change-transform">
              <TiltCard maxTilt={5.5} depth={12} scale={1.02}>
                <a
                  href={PERSONAL_INFO.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="copper-glow-card p-6 rounded-3xl group flex flex-col justify-between shadow-xl h-full block"
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
              </TiltCard>
            </div>

            {/* GitHub Card */}
            <div className="contact-card-wrapper will-change-transform">
              <TiltCard maxTilt={5.5} depth={12} scale={1.02}>
                <a
                  href={PERSONAL_INFO.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="copper-glow-card p-6 rounded-3xl group flex flex-col justify-between shadow-xl h-full block"
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
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
