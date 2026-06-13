"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  Server,
  Database,
  Cpu,
  GitBranch,
  Cloud,
  Wifi,
} from "lucide-react";

const interests = [
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Building robust server-side systems with Java, C#, and modern frameworks.",
    color: "text-blue-400",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
  },
  {
    icon: Database,
    title: "Database Systems",
    description:
      "Designing efficient schemas and queries across SQL Server, PostgreSQL, and MySQL.",
    color: "text-indigo-400",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
  },
  {
    icon: GitBranch,
    title: "Distributed Systems",
    description:
      "Studying consistency, fault tolerance, and distributed tracing with OpenTelemetry.",
    color: "text-violet-400",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
  },
  {
    icon: Cloud,
    title: "Microservices",
    description:
      "Architecting event-driven microservices with clean architecture principles.",
    color: "text-sky-400",
    bg: "rgba(14,165,233,0.08)",
    border: "rgba(14,165,233,0.2)",
  },
  {
    icon: Cpu,
    title: "Cloud-native Architecture",
    description:
      "Containerizing services with Docker and exploring cloud-native patterns.",
    color: "text-cyan-400",
    bg: "rgba(34,211,238,0.08)",
    border: "rgba(34,211,238,0.2)",
  },
  {
    icon: Wifi,
    title: "IoT Solutions",
    description:
      "Building embedded systems with ESP8266, LoRa, and RFID for real-world deployments.",
    color: "text-emerald-400",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
  },
];

function InterestCard({
  item,
  delay,
}: {
  item: (typeof interests)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-xl p-5 border transition-all duration-300"
      style={{
        background: item.bg,
        borderColor: item.border,
      }}
      onMouseEnter={(e) => {
        if (reduce) return;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${item.color}`}
        style={{ background: item.bg, border: `1px solid ${item.border}` }}
      >
        <Icon size={18} />
      </div>
      <h3 className="text-sm font-semibold text-slate-200 mb-1.5">
        {item.title}
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export default function AboutSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative py-24 lg:py-32" aria-labelledby="about-heading">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Vertical layout: heading stack, then 2-col split */}
        <motion.div
          ref={headingRef}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2
            id="about-heading"
            className="section-heading mb-4"
          >
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">

          {/* Left: Bio */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <div className="glass rounded-2xl p-6 space-y-4">
              <p className="text-slate-300 leading-relaxed text-sm">
                I'm a{" "}
                <span className="text-blue-400 font-semibold">
                  Software Engineering student at FPT University
                </span>{" "}
                with a deep focus on backend systems and distributed computing.
                I thrive on solving complex infrastructure problems and building
                systems that are reliable, observable, and scalable.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                My work spans from academic research on microservice observability
                using OpenTelemetry and Jaeger, to hands-on IoT deployments with
                ESP8266 and LoRa networks. I apply clean architecture principles
                to everything I build.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                I'm actively seeking internship and graduate positions where I can
                contribute to backend infrastructure, distributed systems, or
                cloud-native engineering teams.
              </p>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "University", value: "FPT University" },
                { label: "Major", value: "Software Engineering" },
                { label: "Focus", value: "Backend / Distributed" },
                { label: "Status", value: "Open to Roles" },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="glass rounded-xl p-3.5"
                >
                  <p className="text-xs font-mono text-slate-500 mb-0.5">{fact.label}</p>
                  <p className="text-sm font-semibold text-slate-200">{fact.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Interest grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {interests.map((item, i) => (
              <InterestCard key={item.title} item={item} delay={0.1 + i * 0.06} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
