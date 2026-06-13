"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/app/components/ui/motionHelpers";

const GITHUB_USER = "Kian1011-C";

export default function GitHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();

  const motionProps = (delay: number) =>
    reduce
      ? {}
      : ({
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.6, delay, ease: EASE_OUT },
        } as const);

  return (
    <section
      id="github"
      className="relative py-24 lg:py-32 dot-bg"
      aria-labelledby="github-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(9,9,15,0.5) 0%, rgba(9,9,15,0.92) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-16"
        >
          <h2 id="github-heading" className="section-heading mb-4">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          <p className="mt-4 text-sm text-slate-500 max-w-[48ch]">
            Consistent commits across backend systems, observability research, and IoT projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <motion.div
            {...motionProps(0.05)}
            className="glass rounded-xl overflow-hidden p-4"
          >
            <p className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-wider">Contribution Streak</p>
            <img
              src={`https://streak-stats.demolab.com?user=${GITHUB_USER}&theme=transparent&hide_border=true&stroke=1e293b&ring=6366f1&fire=3b82f6&currStreakLabel=94a3b8&background=00000000&dates=64748b&sideLabels=94a3b8&currStreakNum=f1f5f9&sideNums=f1f5f9`}
              alt={`GitHub contribution streak for ${GITHUB_USER}`}
              className="w-full"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            {...motionProps(0.1)}
            className="glass rounded-xl overflow-hidden p-4"
          >
            <p className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-wider">Repository Stats</p>
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&theme=transparent&hide_border=true&title_color=818cf8&icon_color=60a5fa&text_color=94a3b8&bg_color=00000000&ring_color=6366f1`}
              alt={`GitHub stats for ${GITHUB_USER}`}
              className="w-full"
              loading="lazy"
            />
          </motion.div>
        </div>

        <motion.div
          {...motionProps(0.15)}
          className="glass rounded-xl overflow-hidden p-4"
        >
          <p className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-wider">Most Used Languages</p>
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USER}&layout=compact&theme=transparent&hide_border=true&title_color=818cf8&text_color=94a3b8&bg_color=00000000&langs_count=8`}
            alt={`Most used programming languages for ${GITHUB_USER}`}
            className="max-w-md"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          {...motionProps(0.2)}
          className="mt-8 flex justify-center"
        >
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            id="github-profile-cta"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg glass border border-blue-500/20 hover:border-blue-500/50 text-sm font-semibold text-slate-300 transition-all duration-200 active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View Full GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
