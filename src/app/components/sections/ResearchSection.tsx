"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { BookOpen, FlaskConical, Network, BrainCircuit } from "lucide-react";

const researchItems = [
  {
    icon: FlaskConical,
    title: "Microservice Observability Research",
    tags: ["OpenTelemetry", "Jaeger", "Distributed Tracing"],
    description:
      "Investigated strategies for instrumenting microservices with OpenTelemetry, exporting telemetry data to Jaeger, and analyzing trace propagation across service boundaries.",
    color: "#a78bfa",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
  },
  {
    icon: BrainCircuit,
    title: "AI-Assisted Software Engineering",
    tags: ["AI", "Code Generation", "Research"],
    description:
      "Explored the impact of large language models on software development workflows, code quality, and developer productivity through structured evaluation.",
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
  },
];

const academicWork = [
  {
    icon: Network,
    title: "Data Structures and Algorithms",
    subtopics: [
      "Binary Search Trees — insertion, deletion, traversal",
      "Linked Lists — singly, doubly, circular variants",
      "Graph Optimization — Dijkstra, BFS, DFS",
    ],
    color: "#34d399",
    bg: "rgba(52,211,153,0.07)",
    border: "rgba(52,211,153,0.15)",
  },
  {
    icon: BookOpen,
    title: "Algorithm Analysis",
    subtopics: [
      "Time and space complexity analysis",
      "Dynamic programming problem sets",
      "Sorting and searching algorithms",
    ],
    color: "#38bdf8",
    bg: "rgba(14,165,233,0.07)",
    border: "rgba(14,165,233,0.15)",
  },
];

export default function ResearchSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  return (
    <section
      id="research"
      className="relative py-24 lg:py-32"
      style={{ background: "rgba(14,14,26,0.6)" }}
      aria-labelledby="research-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          ref={headingRef}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 id="research-heading" className="section-heading mb-4">
            Research &amp; <span className="gradient-text">Academic Work</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
        </motion.div>

        {/* Research papers — full width each */}
        <div className="space-y-4 mb-12">
          {researchItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={reduce ? false : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-5 rounded-xl border p-6"
                style={{ background: item.bg, borderColor: item.border }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: item.bg, border: `1px solid ${item.border}` }}
                >
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-100 mb-2">{item.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono border"
                        style={{
                          color: item.color,
                          borderColor: `${item.color}30`,
                          background: `${item.color}08`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Academic work — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {academicWork.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl border p-5"
                style={{ background: item.bg, borderColor: item.border }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <Icon size={18} style={{ color: item.color }} />
                  <h3 className="text-sm font-semibold text-slate-200">{item.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {item.subtopics.map((sub) => (
                    <li key={sub} className="flex items-start gap-2 text-xs text-slate-400">
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: item.color }}
                        aria-hidden="true"
                      />
                      {sub}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
