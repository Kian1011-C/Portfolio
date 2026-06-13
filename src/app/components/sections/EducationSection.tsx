"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react";

export default function EducationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  const courses = [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Software Architecture",
    "Computer Networks",
    "Object-Oriented Programming",
    "Operating Systems",
  ];

  return (
    <section
      id="education"
      className="relative py-24 lg:py-32"
      aria-labelledby="education-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 id="education-heading" className="section-heading mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
        </motion.div>

        {/* Single-entry centered layout — different layout from other sections */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="glass-accent rounded-2xl p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}>
                <GraduationCap size={26} className="text-indigo-400" />
              </div>

              <div className="flex-1">
                {/* Degree */}
                <h3 className="text-xl font-bold text-slate-100 mb-1">
                  Bachelor of Software Engineering
                </h3>
                <p className="text-base font-semibold text-indigo-400 mb-4">
                  FPT University
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-mono mb-6">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} />
                    Vietnam
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    In Progress
                  </span>
                </div>

                {/* Horizontal divider */}
                <div className="w-full h-px bg-white/6 mb-6" />

                {/* Relevant coursework — 3-col grid, not a list */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={13} className="text-slate-500" />
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      Relevant Coursework
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {courses.map((course) => (
                      <span
                        key={course}
                        className="text-xs text-slate-300 bg-white/[0.04] border border-white/8 rounded-md px-3 py-2"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
