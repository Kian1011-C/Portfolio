"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Download, Mail } from "lucide-react";

const roles = [
  "Backend Developer",
  "Distributed Systems Enthusiast",
  "IoT Solutions Builder",
  "Software Engineering Student",
];

function TypedRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setDisplayed(roles[0]);
      return;
    }
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx, reduce]);

  return (
    <span className="text-blue-400">
      {displayed}
      <span className="inline-block w-0.5 h-[1em] ml-0.5 bg-blue-400 align-middle animate-[blink_1s_step-end_infinite]" />
    </span>
  );
}

// Animated background orbs — motivated: atmospheric depth so the hero feels alive
function BackgroundOrbs() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          top: "-10%",
          right: "-5%",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          bottom: "10%",
          left: "-8%",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}

export default function HeroSection() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 as number },
          animate: { opacity: 1, y: 0 as number },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden grid-bg"
      aria-label="Hero introduction"
    >
      <BackgroundOrbs />

      {/* Main hero — asymmetric split: left content / right visual accent */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left column: content ── */}
          <div className="flex flex-col gap-6">
            {/* Status badge */}
            <motion.div {...fadeUp(0)}>
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono tracking-wide text-blue-400 border border-blue-500/20"
                aria-label="Currently open to opportunities"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to Internships &amp; Graduate Roles
              </span>
            </motion.div>

            {/* Name */}
            <motion.div {...fadeUp(0.1)}>
              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-none text-slate-100">
                Khai
                <br />
                <span className="gradient-text glow-text">Nguyen Phuong</span>
              </h1>
            </motion.div>

            {/* Typed role */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-xl md:text-2xl font-mono font-medium min-h-[1.75rem]"
              aria-live="polite"
            >
              <TypedRole />
            </motion.p>

            {/* Sub-description — max 20 words */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-base text-slate-400 leading-relaxed max-w-[52ch]"
            >
              Passionate about backend development, microservice architecture,
              distributed tracing, database systems, and IoT solutions.
            </motion.p>

            {/* CTAs — 3 distinct intents: portfolio, download, contact */}
            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-wrap gap-3 mt-2"
            >
              <a
                href="#projects"
                id="hero-cta-projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
              >
                View Projects
              </a>
              <a
                href="/cv.pdf"
                id="hero-cta-cv"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg glass border border-white/10 hover:border-blue-500/40 text-slate-200 font-semibold text-sm transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
              >
                <Download size={15} />
                Download CV
              </a>
              <a
                href="#contact"
                id="hero-cta-contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg glass border border-white/10 hover:border-indigo-500/40 text-slate-200 font-semibold text-sm transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
              >
                <Mail size={15} />
                Contact Me
              </a>
            </motion.div>

            {/* Quick social links */}
            <motion.div {...fadeUp(0.5)} className="flex items-center gap-4 mt-1">
              <a
                href="https://github.com/Kian1011-C"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-github-link"
                className="text-slate-500 hover:text-slate-300 transition-colors focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:rounded"
                aria-label="GitHub profile"
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <span className="text-slate-700 text-xs font-mono">
                github.com/Kian1011-C
              </span>
            </motion.div>
          </div>

          {/* ── Right column: visual accent ── */}
          <motion.div
            {...(reduce ? {} : {
              initial: { opacity: 0, scale: 0.92 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            })}
            className="flex justify-center lg:justify-end"
          >
            {/* Profile card with glass treatment */}
            <div className="relative">
              {/* Glow ring behind */}
              <div
                className="absolute inset-0 rounded-2xl scale-105 blur-2xl opacity-30"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                }}
                aria-hidden="true"
              />
              <div className="relative glass-accent rounded-2xl p-1 glow-blue">
                <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[420px] rounded-xl overflow-hidden bg-slate-900">
                  {/* Profile photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/profile.jpg"
                    alt="Khai Nguyen Phuong — Software Engineering Student"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    fetchPriority="high"
                    onError={(e) => {
                      // Fallback if photo not present
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  {/* Name badge overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="glass rounded-lg px-3 py-2">
                      <p className="text-xs font-mono text-blue-400 tracking-wider">FPT University</p>
                      <p className="text-sm font-semibold text-slate-100 mt-0.5">Software Engineering</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat chips */}
              <motion.div
                {...(reduce ? {} : {
                  animate: { y: [0, -6, 0] },
                  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                })}
                className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 border border-blue-500/20"
              >
                <p className="text-xs font-mono text-slate-400">Stack</p>
                <p className="text-sm font-bold text-blue-400">Java / C# / SQL</p>
              </motion.div>

              <motion.div
                {...(reduce ? {} : {
                  animate: { y: [0, 5, 0] },
                  transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
                })}
                className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 border border-indigo-500/20"
              >
                <p className="text-xs font-mono text-slate-400">Focus</p>
                <p className="text-sm font-bold text-indigo-400">Microservices</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — motivated: guides first-time visitors to continue */}
      {!reduce && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 6, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ArrowDown size={18} className="text-slate-600" />
        </motion.div>
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
