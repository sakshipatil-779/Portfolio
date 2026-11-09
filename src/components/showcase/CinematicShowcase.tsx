"use client";

import React, { useRef, useEffect } from "react";
import { registerGSAP } from "@/lib/gsap";
import { TiltCard } from "@/components/ui/TiltCard";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/Icons";
import { ExternalLink, ArrowUpRight, Trophy, Sparkles, CheckCircle2 } from "lucide-react";
import {
  CoreCsVisual,
  AchievementVisual,
  VoteChainVisual,
  FedCreditVisual,
  PayScopeVisual,
  SkillsVisual,
} from "./ShowcaseVisuals";

export function CinematicShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleTopRef = useRef<HTMLDivElement>(null);
  const titleBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGSAP();
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 1024;

    if (prefersReduced || isMobile) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal scroll distance
      const getScrollDistance = () => track.scrollWidth - window.innerWidth + 120;

      // Pinned Horizontal Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth * 1.15}`,
          invalidateOnRefresh: true,
        },
      });

      // Horizontal track movement
      tl.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
      });

      // Subtle parallax & letter-spacing on framing titles
      if (titleTopRef.current && titleBottomRef.current) {
        tl.to(
          titleTopRef.current,
          {
            letterSpacing: "0.28em",
            opacity: 0.85,
            x: -80,
            ease: "none",
          },
          0
        );

        tl.to(
          titleBottomRef.current,
          {
            letterSpacing: "0.28em",
            opacity: 0.85,
            x: 80,
            ease: "none",
          },
          0
        );
      }

      // Handle anchor jumps into horizontal panels
      const handlePanelNavigation = (e: Event) => {
        const customEvent = e as CustomEvent<{ panelId: string }>;
        const panelId = customEvent.detail?.panelId;
        if (!panelId) return;

        const targetCard = document.getElementById(panelId);
        const st = tl.scrollTrigger;
        if (st && targetCard && track) {
          const maxScrollTrack = track.scrollWidth - window.innerWidth + 120;
          if (maxScrollTrack <= 0) return;
          const ratio = Math.max(0, Math.min(1, targetCard.offsetLeft / maxScrollTrack));
          const targetY = st.start + ratio * (st.end - st.start);
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      };

      window.addEventListener("scroll-to-showcase-panel", handlePanelNavigation);

      return () => {
        window.removeEventListener("scroll-to-showcase-panel", handlePanelNavigation);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cinematic-showcase"
      className="relative w-full min-h-screen bg-transparent overflow-hidden flex flex-col justify-center select-none py-16 lg:py-0"
    >
      {/* Top Large Cinematic Framing Typography */}
      <div
        ref={titleTopRef}
        className="w-full text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-widest text-[#F5EDE4]/90 pointer-events-none z-10 transition-all font-sans uppercase mb-4 lg:mb-8"
        style={{ letterSpacing: "0.18em" }}
      >
        ENGINEERING
      </div>

      {/* Center Horizontal 3D Scrolling Cards Track */}
      <div className="relative w-full overflow-x-auto lg:overflow-x-visible no-scrollbar z-20">
        <div
          ref={trackRef}
          className="flex items-center gap-8 sm:gap-12 px-6 sm:px-16 lg:px-24 w-max py-6 preserve-3d"
        >
          {/* Panel 1: Computer Engineering & Core CS Intelligence */}
          <div
            id="about"
            className="w-[88vw] sm:w-[620px] lg:w-[680px] shrink-0 will-change-transform"
            style={{ transform: "translateZ(0px)" }}
          >
            <TiltCard maxTilt={4} depth={16}>
              <div className="copper-glow-card rounded-3xl p-6 sm:p-8 lg:p-9 shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center min-h-[440px]">
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/15 text-[#F7D38A] border border-[#D9A441]/30 text-xs font-mono font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#F0B85A]" />
                    <span>SYSTEMS ARCHITECTURE & THEORY</span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#F5EDE4] tracking-tight">
                      Computer Engineering
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#F0B85A] mt-0.5">
                      MET&apos;s IOE Nashik • SPPU
                    </p>
                    <p className="text-sm font-medium text-[#F7D38A] mt-2 italic font-serif">
                      “Building meaningful technology through computer science fundamentals.”
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-[#C8B6A5]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>Data Structures & Algorithms mastery in Java with 8.31 CGPA.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>Object-Oriented Design, complexity proofs & modular systems.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>Privacy-preserving ML & decentralized web applications.</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <Button href="#achievements" variant="secondary" size="sm">
                      <span>Explore Benchmarks</span>
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-5 h-full">
                  <CoreCsVisual />
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Panel 2: Competitive Honors & Achievements */}
          <div
            id="achievements"
            className="w-[88vw] sm:w-[620px] lg:w-[680px] shrink-0 will-change-transform"
            style={{ transform: "translateZ(20px) translateY(12px)" }}
          >
            <TiltCard maxTilt={4} depth={16}>
              <div className="copper-glow-card rounded-3xl p-6 sm:p-8 lg:p-9 shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center min-h-[440px]">
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/20 text-[#F7D38A] border border-[#D9A441]/40 text-xs font-mono font-bold shadow-sm">
                    <Trophy className="w-3.5 h-3.5 text-[#F7D38A]" />
                    <span>STATE & NATIONAL HONORS</span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#F5EDE4] tracking-tight">
                      Competitive Benchmarks
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#F0B85A] mt-0.5">
                      Proven under high-stakes competitive pressure
                    </p>
                    <p className="text-sm font-medium text-[#F7D38A] mt-2 italic font-serif">
                      “Recognized excellence across state hackathons & national examinations.”
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-[#C8B6A5]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span><strong>1st Place Winner</strong> — upXgen State Level Hackathon (96+ engineering teams).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span><strong>NPTEL Java Elite</strong> — 92% National Score (IIT Kharagpur).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>Ranked in the top percentile among 19,306+ candidates nationwide.</span>
                    </li>
                  </ul>

                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href="/certificates/upxgen-hackathon-2026-first-position.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#F7D38A] hover:text-[#F5EDE4] transition-colors"
                    >
                      <span>View 1st Place Certificate</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="md:col-span-5 h-full">
                  <AchievementVisual />
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Panel 3: VoteChainX (Winning Project) */}
          <div
            id="showcase-projects"
            className="w-[88vw] sm:w-[620px] lg:w-[680px] shrink-0 will-change-transform"
            style={{ transform: "translateZ(-10px) translateY(-8px)" }}
          >
            <TiltCard maxTilt={4} depth={16}>
              <div className="copper-glow-card rounded-3xl p-6 sm:p-8 lg:p-9 shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center min-h-[440px]">
                <div className="md:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-full bg-[#D9A441]/25 text-[#F7D38A] border border-[#D9A441]/45 font-bold shadow-sm">
                      <Trophy className="w-3.5 h-3.5 text-[#F7D38A]" />
                      Winning Project
                    </span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#B87345]/20 text-[#F0B85A] border border-[#B87345]/30">
                      1st Place Hackathon
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#F5EDE4] tracking-tight">
                      VoteChainX
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#F0B85A] mt-0.5">
                      Decentralized E-Voting System
                    </p>
                    <p className="text-sm font-medium text-[#F7D38A] mt-2 italic font-serif">
                      “Transparent blockchain consensus with complete voter anonymity.”
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-[#C8B6A5]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>Gasless meta-transaction relayer via EIP-2771 protocol.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>ReentrancyGuard smart contract security & Keccak-256 integrity.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>Solidity, Next.js 14, Ethers.js & offline-first sync engine.</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <Button href="#projects-detail" variant="primary" size="sm">
                      <span>Inspect Project Details</span>
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-5 h-full">
                  <VoteChainVisual />
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Panel 4: FedCreditX (Federated ML) */}
          <div
            className="w-[88vw] sm:w-[620px] lg:w-[680px] shrink-0 will-change-transform"
            style={{ transform: "translateZ(15px) translateY(10px)" }}
          >
            <TiltCard maxTilt={4} depth={16}>
              <div className="copper-glow-card rounded-3xl p-6 sm:p-8 lg:p-9 shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center min-h-[440px]">
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/15 text-[#F7D38A] border border-[#D9A441]/30 text-xs font-mono font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#F0B85A]" />
                    <span>FEDERATED MACHINE LEARNING</span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#F5EDE4] tracking-tight">
                      FedCreditX
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#F0B85A] mt-0.5">
                      Collaborative Credit Intelligence
                    </p>
                    <p className="text-sm font-medium text-[#F7D38A] mt-2 italic font-serif">
                      “Training shared credit models without sharing a single customer record.”
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-[#C8B6A5]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>3 simulated lenders using Flower FedAvg multi-round training.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>Opacus DP-SGD differential privacy guarantee (ε ≈ 2.21).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>FastAPI, PyTorch, Next.js, and SQLite human audit trail.</span>
                    </li>
                  </ul>

                  <div className="pt-2 flex items-center gap-3">
                    <Button
                      href="https://fedcreditx.onrender.com/"
                      external
                      variant="primary"
                      size="sm"
                      icon={ExternalLink}
                      iconPosition="right"
                    >
                      Live Demo
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-5 h-full">
                  <FedCreditVisual />
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Panel 5: PayScope (Financial Commitment Detection) */}
          <div
            className="w-[88vw] sm:w-[620px] lg:w-[680px] shrink-0 will-change-transform"
            style={{ transform: "translateZ(-15px) translateY(-10px)" }}
          >
            <TiltCard maxTilt={4} depth={16}>
              <div className="copper-glow-card rounded-3xl p-6 sm:p-8 lg:p-9 shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center min-h-[440px]">
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/15 text-[#F7D38A] border border-[#D9A441]/30 text-xs font-mono font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#F0B85A]" />
                    <span>GRAPH AUDITING & DETECTION</span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#F5EDE4] tracking-tight">
                      PayScope
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#F0B85A] mt-0.5">
                      Find the money leaving quietly
                    </p>
                    <p className="text-sm font-medium text-[#F7D38A] mt-2 italic font-serif">
                      “Zero-credential statement analysis detecting silent price creep.”
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-[#C8B6A5]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>Neo4j AuraDB knowledge graph analyzing recurring commitments.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>Silent price creep detection (₹699 → ₹799) & savings simulator.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>Mechanism-aware playbooks for UPI Autopay, E-mandates & Cards.</span>
                    </li>
                  </ul>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Button
                      href="https://pay-scope-lake.vercel.app/"
                      external
                      variant="primary"
                      size="sm"
                      icon={ExternalLink}
                      iconPosition="right"
                    >
                      Live Demo
                    </Button>
                    <Button
                      href="https://github.com/sakshipatil-779/PayScope"
                      external
                      variant="secondary"
                      size="sm"
                      icon={GithubIcon}
                      iconPosition="left"
                    >
                      Source Code
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-5 h-full">
                  <PayScopeVisual />
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Panel 6: Technical Arsenal & Skills Stack */}
          <div
            id="skills"
            className="w-[88vw] sm:w-[620px] lg:w-[680px] shrink-0 will-change-transform"
            style={{ transform: "translateZ(10px) translateY(6px)" }}
          >
            <TiltCard maxTilt={4} depth={16}>
              <div className="copper-glow-card rounded-3xl p-6 sm:p-8 lg:p-9 shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center min-h-[440px]">
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/15 text-[#F7D38A] border border-[#D9A441]/30 text-xs font-mono font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#F0B85A]" />
                    <span>TECHNICAL ARSENAL</span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#F5EDE4] tracking-tight">
                      Engineering Competencies
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#F0B85A] mt-0.5">
                      Full-Stack, Blockchain & Distributed ML
                    </p>
                    <p className="text-sm font-medium text-[#F7D38A] mt-2 italic font-serif">
                      “Grounded in CS theory and modern production architectures.”
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-[#C8B6A5]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>Java, Python, TypeScript, Solidity, JavaScript.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>Next.js 16, React 19, Tailwind CSS, FastAPI, PostgreSQL.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0B85A] shrink-0 mt-0.5" />
                      <span>PyTorch, Flower Federated Learning, Neo4j, Git, Vercel.</span>
                    </li>
                  </ul>

                  <div className="pt-2 flex items-center gap-3">
                    <Button href="#education" variant="secondary" size="sm">
                      <span>View Education & Degrees</span>
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-5 h-full">
                  <SkillsVisual />
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* Bottom Large Cinematic Framing Typography */}
      <div
        ref={titleBottomRef}
        className="w-full text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-widest text-[#F5EDE4]/90 pointer-events-none z-10 transition-all font-sans uppercase mt-4 lg:mt-8"
        style={{ letterSpacing: "0.18em" }}
      >
        EXCELLENCE
      </div>
    </section>
  );
}
