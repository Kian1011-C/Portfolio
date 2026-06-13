"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Mail, Send, CheckCircle } from "lucide-react";
import { EASE_OUT } from "@/app/components/ui/motionHelpers";

// GitHub SVG mark (Simple Icons source)
function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="fill-current"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// LinkedIn SVG mark (Simple Icons source)
function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="fill-current"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const contactLinks = [
  {
    id: "contact-github",
    IconComponent: GitHubIcon,
    label: "GitHub",
    handle: "Kian1011-C",
    href: "https://github.com/Kian1011-C",
    color: "#f1f5f9",
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.1)",
    hoverBorder: "rgba(255,255,255,0.25)",
  },
  {
    id: "contact-linkedin",
    IconComponent: LinkedInIcon,
    label: "LinkedIn",
    handle: "nguyen-phuong-khai-697876311",
    href: "https://www.linkedin.com/in/nguyen-phuong-khai-697876311/",
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.07)",
    border: "rgba(59,130,246,0.2)",
    hoverBorder: "rgba(59,130,246,0.5)",
  },
  {
    id: "contact-email",
    IconComponent: ({ size }: { size?: number }) => <Mail size={size ?? 18} />,
    label: "Email",
    handle: "khainpse183590@fpt.edu.vn",
    href: "mailto:khainpse183590@fpt.edu.vn",
    color: "#818cf8",
    bg: "rgba(99,102,241,0.07)",
    border: "rgba(99,102,241,0.2)",
    hoverBorder: "rgba(99,102,241,0.5)",
  },
];

export default function ContactSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32"
      style={{ background: "rgba(14,14,26,0.5)" }}
      aria-labelledby="contact-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, #6366f1, transparent)",
            bottom: "-5%",
            right: "10%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          ref={headingRef}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-16"
        >
          <h2 id="contact-heading" className="section-heading mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          <p className="mt-4 text-sm text-slate-400 max-w-[50ch]">
            Open to internships, graduate roles, and collaborative projects. Let's connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">

          {/* Contact links */}
          <div className="space-y-3">
            {contactLinks.map((link, i) => {
              const Icon = link.IconComponent;
              return (
                <motion.a
                  key={link.id}
                  id={link.id}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: EASE_OUT }}
                  className="flex items-center gap-4 rounded-xl border p-4 transition-all duration-200 active:scale-[0.98] group"
                  style={{ background: link.bg, borderColor: link.border }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = link.hoverBorder;
                    if (!reduce) (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = link.border;
                    (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                  }}
                  aria-label={`${link.label}: ${link.handle}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: link.bg, border: `1px solid ${link.border}`, color: link.color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-500">{link.label}</p>
                    <p className="text-sm font-semibold" style={{ color: link.color }}>
                      {link.handle}
                    </p>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 ml-auto text-slate-600 group-hover:text-slate-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
              );
            })}
          </div>

          {/* Message form */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE_OUT }}
          >
            {!sent ? (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-6 lg:p-8 space-y-5"
                aria-label="Quick contact form"
                noValidate
              >
                <h3 className="text-base font-semibold text-slate-200">Send a Message</h3>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email-field"
                    className="block text-xs font-mono text-slate-400"
                  >
                    Your email
                  </label>
                  <input
                    id="contact-email-field"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/40 transition-colors"
                    aria-required="true"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message-field"
                    className="block text-xs font-mono text-slate-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message-field"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi Khai, I'd like to discuss..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/40 transition-colors resize-none"
                    aria-required="true"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-send-btn"
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
                >
                  <Send size={14} />
                  Send Message
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-8 flex flex-col items-center gap-4 text-center"
              >
                <CheckCircle size={40} className="text-emerald-400" />
                <h3 className="text-base font-semibold text-slate-100">Message sent!</h3>
                <p className="text-sm text-slate-400">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
