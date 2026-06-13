"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const skillGroups = [
  {
    category: "Languages",
    accent: "#3b82f6",
    skills: ["Java", "C#", "SQL", "JavaScript"],
  },
  {
    category: "Backend",
    accent: "#6366f1",
    skills: ["Servlet / JSP", "JDBC", "ASP.NET Core", "REST API"],
  },
  {
    category: "Architecture",
    accent: "#8b5cf6",
    skills: [
      "Clean Architecture",
      "3-Layer Architecture",
      "MVC",
      "Event-Driven",
      "Microservices",
    ],
  },
  {
    category: "Databases",
    accent: "#0ea5e9",
    skills: ["SQL Server", "PostgreSQL", "MySQL"],
  },
  {
    category: "Dev Tools",
    accent: "#22d3ee",
    skills: ["Git", "GitHub", "Docker", "Visual Studio", "NetBeans", "VS Code"],
  },
  {
    category: "Observability",
    accent: "#a78bfa",
    skills: ["OpenTelemetry", "Jaeger", "Distributed Tracing"],
  },
  {
    category: "IoT",
    accent: "#34d399",
    skills: ["ESP8266", "LoRa", "RFID"],
  },
];

function SkillGroup({
  group,
  delay,
}: {
  group: (typeof skillGroups)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-xl p-5"
    >
      {/* Category label */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-1 h-4 rounded-full"
          style={{ background: group.accent }}
          aria-hidden="true"
        />
        <span
          className="text-xs font-mono font-semibold tracking-wider uppercase"
          style={{ color: group.accent }}
        >
          {group.category}
        </span>
      </div>

      {/* Skill pills — horizontal scroll-snap for >5 items avoids bullet list */}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium text-slate-300 border border-white/8 bg-white/[0.04] hover:bg-white/[0.08] transition-colors duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative py-24 lg:py-32 dot-bg"
      aria-labelledby="skills-heading"
    >
      {/* Subtle overlay to blend dot-bg with surface */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(9,9,15,0.4) 0%, rgba(9,9,15,0.9) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          ref={headingRef}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 id="skills-heading" className="section-heading mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          <p className="mt-4 text-sm text-slate-500 max-w-[50ch]">
            A focused stack built through coursework, research, and hands-on projects.
          </p>
        </motion.div>

        {/* Masonry-style grid: 1-col mobile, 2-col md, 3-col lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.category} group={group} delay={0.05 * i} />
          ))}
        </div>
      </div>
    </section>
  );
}
