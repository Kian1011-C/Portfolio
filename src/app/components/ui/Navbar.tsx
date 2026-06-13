"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#education", label: "Education" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduce = useReducedMotion();

  // Scroll detection — using native scroll event intentionally here as it's
  // only updating a boolean state, NOT tracking continuous values
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/6" : "bg-transparent"
      }`}
      style={{ height: "64px" }}
      role="banner"
    >
      <nav
        className="max-w-[1400px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo / Name mark */}
        <a
          href="#hero"
          id="nav-logo"
          className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:rounded group"
          aria-label="Khai Nguyen Phuong — back to top"
        >
          {/* Custom tech logo symbol */}
          <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-slate-950/60 border border-blue-500/20 group-hover:border-blue-500/40 transition-colors duration-300 shadow-[0_0_12px_rgba(59,130,246,0.05)] group-hover:shadow-[0_0_16px_rgba(59,130,246,0.15)]">
            <span className="font-mono text-sm font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent select-none">
              KP
            </span>
            {/* Blinking online indicator */}
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
          </div>

          {/* Terminal styled name brand */}
          <span className="font-mono text-xs font-semibold tracking-tight text-slate-300 hidden sm:flex items-center gap-1 select-none">
            <span className="text-blue-500 font-bold">~</span>
            <span>khai</span>
            <span className="text-indigo-400 font-bold">$</span>
            <span className="w-1.5 h-3 bg-blue-500 inline-block animate-pulse ml-0.5" />
          </span>
        </a>

        {/* Desktop links — single line at lg+ */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                className="px-3 py-1.5 rounded-md text-sm text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            id="nav-cta"
            className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
            style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-blue-400"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden glass border-b border-white/6 px-6 py-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block px-3 py-2.5 rounded-md text-sm text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
