"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "motion/react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Tilt } from "@/app/components/ui/InteractiveWrappers";

type Project = {
  title: string;
  stack: string[];
  description: string;
  highlights: string[];
  category: string;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Coffee Franchise Management System",
    stack: [".NET", "PostgreSQL", "Clean Architecture", "Microservices"],
    description:
      "Multi-tenant franchise management platform built with microservice architecture, clean separation of domain boundaries, and PostgreSQL for data persistence.",
    highlights: [
      "Microservice architecture with bounded contexts",
      "Clean Architecture layering",
      "PostgreSQL with schema-per-tenant design",
      "Event-driven inter-service communication",
    ],
    category: "Microservices",
    accentColor: "#818cf8",
    bgColor: "rgba(99,102,241,0.07)",
    borderColor: "rgba(99,102,241,0.2)",
    featured: true,
  },
  {
    title: "Microservice Observability Research",
    stack: ["OpenTelemetry", "Jaeger", "Docker", "Distributed Tracing"],
    description:
      "Academic research project instrumenting microservices with OpenTelemetry SDK, exporting traces to Jaeger, and analyzing latency bottlenecks across service boundaries.",
    highlights: [
      "OpenTelemetry auto-instrumentation",
      "Jaeger trace visualization",
      "Latency root-cause analysis",
      "Containerized research environment",
    ],
    category: "Observability",
    accentColor: "#a78bfa",
    bgColor: "rgba(139,92,246,0.07)",
    borderColor: "rgba(139,92,246,0.2)",
    featured: true,
  },
  {
    title: "Restaurant Management System",
    stack: ["C#", "WPF", "SQL Server", "Entity Framework Core"],
    description:
      "Desktop application for restaurant operations including order management, inventory tracking, and reporting built with WPF and EF Core.",
    highlights: [
      "WPF MVVM pattern",
      "EF Core code-first migrations",
      "SQL Server stored procedures",
      "Real-time order status updates",
    ],
    category: "Desktop App",
    accentColor: "#60a5fa",
    bgColor: "rgba(59,130,246,0.07)",
    borderColor: "rgba(59,130,246,0.2)",
  },
  {
    title: "Cafe Management System",
    stack: ["Java", "Servlet/JSP", "JDBC", "SQL Server"],
    description:
      "Web-based cafe management system with order processing, staff management, and sales reporting using Java Servlet/JSP stack.",
    highlights: [
      "MVC with Servlet/JSP",
      "JDBC connection pooling",
      "Session-based authentication",
      "Sales analytics dashboard",
    ],
    category: "Web App",
    accentColor: "#38bdf8",
    bgColor: "rgba(14,165,233,0.07)",
    borderColor: "rgba(14,165,233,0.2)",
  },
  {
    title: "Smart Parking Management System",
    stack: ["ESP8266", "LoRa", "RFID"],
    description:
      "IoT system using ESP8266 microcontrollers communicating over LoRa radio for a low-power smart parking solution with RFID vehicle identification.",
    highlights: [
      "ESP8266 firmware development",
      "LoRa long-range communication",
      "RFID tag scanning",
      "Real-time slot availability",
    ],
    category: "IoT",
    accentColor: "#34d399",
    bgColor: "rgba(52,211,153,0.07)",
    borderColor: "rgba(52,211,153,0.2)",
  },
];

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Tilt
        className="relative flex flex-col h-full rounded-xl border transition-all duration-300 overflow-hidden group"
        maxRotation={6}
        style={{
          background: project.bgColor,
          borderColor: project.borderColor,
        }}
      >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
        aria-hidden="true"
      />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span
              className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider mb-2"
              style={{ color: project.accentColor, background: project.bgColor }}
            >
              {project.category}
            </span>
            <h3 className="text-base font-bold text-slate-100 leading-snug">
              {project.title}
            </h3>
          </div>
          <a
            href="https://github.com/Kian1011-C"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-300 transition-colors flex-shrink-0 mt-1"
            aria-label={`View ${project.title} on GitHub`}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed">{project.description}</p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[11px] font-mono border"
              style={{
                color: project.accentColor,
                borderColor: `${project.accentColor}30`,
                background: `${project.accentColor}08`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expandable highlights */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors w-fit mt-auto"
          aria-expanded={expanded}
          aria-controls={`project-highlights-${project.title.replace(/\s/g, "-")}`}
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {expanded ? "Hide" : "Show"} highlights
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.ul
              id={`project-highlights-${project.title.replace(/\s/g, "-")}`}
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-1.5 overflow-hidden"
            >
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-xs text-slate-400">
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: project.accentColor }}
                    aria-hidden="true"
                  />
                  {h}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </Tilt>
  </motion.div>
  );
}

export default function ProjectsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative py-24 lg:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          ref={headingRef}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 id="projects-heading" className="section-heading mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          <p className="mt-4 text-sm text-slate-500 max-w-[52ch]">
            A selection of projects spanning microservices, desktop apps, and IoT systems.
          </p>
        </motion.div>

        {/* Featured row — 2 columns, larger */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {featured.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={0.08 * i} />
          ))}
        </div>

        {/* Rest — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={0.06 * i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://github.com/Kian1011-C"
            target="_blank"
            rel="noopener noreferrer"
            id="projects-github-cta"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg glass border border-white/10 hover:border-blue-500/40 text-sm font-semibold text-slate-300 transition-all duration-200 active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            View all on GitHub
            <ExternalLink size={13} className="text-slate-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
