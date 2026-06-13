"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Search, Hash, Download, Copy, ExternalLink, Sparkles, Terminal, Check, User } from "lucide-react";
import { EASE_OUT } from "@/app/components/ui/motionHelpers";

type CommandItem = {
  id: string;
  category: "Navigation" | "Quick Actions" | "Links";
  label: string;
  subLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const reduce = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Command items definition
  const commands: CommandItem[] = [
    // ── Navigation ──
    {
      id: "nav-hero",
      category: "Navigation",
      label: "Go to Home / Hero",
      subLabel: "Top of the page",
      icon: Hash,
      action: () => scrollToSection("hero"),
    },
    {
      id: "nav-about",
      category: "Navigation",
      label: "Go to About Me",
      subLabel: "Bio and background",
      icon: User,
      action: () => scrollToSection("about"),
    },
    {
      id: "nav-telemetry",
      category: "Navigation",
      label: "Go to System Telemetry Demo",
      subLabel: "Interactive microservice logs console",
      icon: Terminal,
      action: () => scrollToSection("telemetry"),
    },
    {
      id: "nav-skills",
      category: "Navigation",
      label: "Go to Skills",
      subLabel: "Core technologies and stacks",
      icon: Hash,
      action: () => scrollToSection("skills"),
    },
    {
      id: "nav-projects",
      category: "Navigation",
      label: "Go to Projects",
      subLabel: "Featured engineering projects",
      icon: Hash,
      action: () => scrollToSection("projects"),
    },
    {
      id: "nav-education",
      category: "Navigation",
      label: "Go to Education",
      subLabel: "FPT University & coursework",
      icon: Hash,
      action: () => scrollToSection("education"),
    },
    {
      id: "nav-github",
      category: "Navigation",
      label: "Go to GitHub Activity",
      subLabel: "Stats and contribution streaks",
      icon: Hash,
      action: () => scrollToSection("github"),
    },
    {
      id: "nav-contact",
      category: "Navigation",
      label: "Go to Contact",
      subLabel: "Get in touch with Khai",
      icon: Hash,
      action: () => scrollToSection("contact"),
    },
    // ── Quick Actions ──
    {
      id: "action-email",
      category: "Quick Actions",
      label: "Copy Email Address",
      subLabel: "khainpse183590@fpt.edu.vn",
      icon: copySuccess ? Check : Copy,
      action: () => {
        navigator.clipboard.writeText("khainpse183590@fpt.edu.vn");
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
    },
    {
      id: "action-cv",
      category: "Quick Actions",
      label: "Download Curriculum Vitae (CV)",
      subLabel: "PDF document",
      icon: Download,
      action: () => {
        const link = document.createElement("a");
        link.href = "/cv.pdf";
        link.download = "Khai_Nguyen_Phuong_CV.pdf";
        link.click();
      },
    },
    // ── External Links ──
    {
      id: "link-github",
      category: "Links",
      label: "Open GitHub Profile",
      subLabel: "github.com/Kian1011-C",
      icon: ExternalLink,
      action: () => window.open("https://github.com/Kian1011-C", "_blank", "noopener,noreferrer"),
    },
    {
      id: "link-linkedin",
      category: "Links",
      label: "Open LinkedIn Profile",
      subLabel: "linkedin.com/in/nguyen-phuong-khai-697876311",
      icon: ExternalLink,
      action: () => window.open("https://www.linkedin.com/in/nguyen-phuong-khai-697876311/", "_blank", "noopener,noreferrer"),
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  // Filter commands by search string
  const filteredCommands = commands.filter((cmd) => {
    const term = search.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(term) ||
      cmd.category.toLowerCase().includes(term) ||
      (cmd.subLabel && cmd.subLabel.toLowerCase().includes(term))
    );
  });

  // Track key shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      // Close with Escape
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      // Brief delay to allow animation to start
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Keyboard navigation inside open palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  // Group commands by category for display
  const grouped: Record<string, CommandItem[]> = {};
  filteredCommands.forEach((cmd) => {
    if (!grouped[cmd.category]) grouped[cmd.category] = [];
    grouped[cmd.category].push(cmd);
  });

  // Flat array representing order of elements to resolve actual index
  let flatIndex = 0;

  return (
    <>
      {/* Floating Badge to open Command Palette */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full glass border border-blue-500/20 hover:border-blue-500/50 hover:bg-slate-900/60 shadow-lg text-[10px] font-mono tracking-wider text-blue-400 font-semibold cursor-pointer active:scale-[0.97] transition-all"
        >
          <Sparkles size={11} className="text-blue-400 animate-pulse" />
          CMD PALETTE
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] text-slate-400 border border-white/5 font-sans">Ctrl K</kbd>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              ref={containerRef}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              onKeyDown={handleKeyDown}
              className="relative w-full max-w-xl bg-slate-950/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[480px]"
            >
              {/* Search input header */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-slate-950">
                <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search section..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600"
                />
              </div>

              {/* Commands List container */}
              <div className="flex-1 overflow-y-auto p-2 bg-slate-900/20 custom-scrollbar space-y-3.5">
                {filteredCommands.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs font-mono">
                    No results found for &quot;{search}&quot;
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="space-y-1">
                      {/* Category Label */}
                      <p className="px-3 pt-2 pb-1 text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase">
                        {category}
                      </p>
                      
                      {/* Items */}
                      {items.map((item) => {
                        const currentIdx = flatIndex;
                        flatIndex += 1;
                        const isSelected = currentIdx === selectedIndex;
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              item.action();
                              setIsOpen(false);
                            }}
                            className={`flex items-center gap-3.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-blue-600/10 border border-blue-500/20 text-blue-400"
                                : "border border-transparent hover:bg-white/[0.02] text-slate-300"
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded flex items-center justify-center border ${
                                isSelected
                                  ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                                  : "bg-white/5 border-white/5 text-slate-500"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold">{item.label}</p>
                              {item.subLabel && (
                                <p className="text-[10px] text-slate-500 truncate mt-0.5">{item.subLabel}</p>
                              )}
                            </div>
                            {isSelected && (
                              <span className="text-[9px] font-mono text-blue-500 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded select-none">
                                Enter
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Window Footer keys info */}
              <div className="px-4 py-2.5 border-t border-white/5 bg-slate-950 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-white/5 border border-white/5">↑↓</kbd> Navigate</span>
                  <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-white/5 border border-white/5">Enter</kbd> Select</span>
                </div>
                <div>
                  <kbd className="px-1 rounded bg-white/5 border border-white/5">ESC</kbd> Close
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
