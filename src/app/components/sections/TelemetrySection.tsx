"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "motion/react";
import { Terminal, Activity, Play, RefreshCw, Server, Database, Rss, ShieldAlert, Cpu } from "lucide-react";
import { EASE_OUT } from "@/app/components/ui/motionHelpers";

type LogEntry = {
  id: string;
  time: string;
  level: "INFO" | "SUCCESS" | "WARN" | "TRACE" | "ERROR";
  message: string;
  latency?: number;
};

export default function TelemetrySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();

  const [activeTab, setActiveTab] = useState<"system" | "trace" | "iot">("system");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [metrics, setMetrics] = useState({
    cpu: 12,
    ram: 44,
    latency: 18,
    activeTraces: 4,
  });

  // Keep logs element scrolled to bottom
  const logsEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Simulate subtle CPU & RAM fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((m) => ({
        ...m,
        cpu: Math.max(5, Math.min(95, m.cpu + Math.floor(Math.random() * 9 - 4))),
        ram: Math.max(40, Math.min(85, m.ram + (Math.random() > 0.7 ? Math.floor(Math.random() * 3 - 1) : 0))),
        latency: Math.max(12, Math.min(50, m.latency + Math.floor(Math.random() * 5 - 2))),
      }));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const addLog = (level: LogEntry["level"], message: string, latency?: number) => {
    const time = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setLogs((prev) => [
      ...prev.slice(-30), // Limit history to last 30 logs
      { id: Math.random().toString(36).substring(7), time, level, message, latency },
    ]);
  };

  const runSystemCheck = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setActiveTab("system");

    const steps = [
      { level: "INFO" as const, text: "Initializing Distributed System Health Check..." },
      { level: "TRACE" as const, text: "Resolving gateway routes config..." },
      { level: "INFO" as const, text: "Pinging microservice nodes..." },
      { level: "SUCCESS" as const, text: "Node-01 (Auth Service): ONLINE", lat: 14 },
      { level: "SUCCESS" as const, text: "Node-02 (Order Service): ONLINE", lat: 21 },
      { level: "SUCCESS" as const, text: "Node-03 (Inventory Service): ONLINE", lat: 18 },
      { level: "INFO" as const, text: "Checking PostgreSQL replica sync status..." },
      { level: "SUCCESS" as const, text: "DB Replica lag: 0.02ms (HEALTHY)" },
      { level: "TRACE" as const, text: "Testing Redis caching cluster throughput..." },
      { level: "SUCCESS" as const, text: "Cache hit rate: 94.2% | Max load: 1.2%" },
      { level: "SUCCESS" as const, text: "System Status: ALL SERVICES FUNCTIONAL", lat: 18 },
    ];

    for (const step of steps) {
      addLog(step.level, step.text, step.lat);
      await new Promise((resolve) => setTimeout(resolve, reduce ? 100 : 450));
    }
    setIsRunning(false);
  };

  const traceDbQuery = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setActiveTab("trace");

    const steps = [
      { level: "INFO" as const, text: "Tracing API endpoint: GET /api/v1/orders/183590" },
      { level: "TRACE" as const, text: "Ingress Gateway received HTTP request" },
      { level: "INFO" as const, text: "Forwarding request context to Auth Node-01..." },
      { level: "SUCCESS" as const, text: "JWT Context verified successfully", lat: 4 },
      { level: "INFO" as const, text: "Querying Order database for primary key [183590]..." },
      { level: "TRACE" as const, text: "PostgreSQL: SELECT * FROM orders WHERE id = 183590 LIMIT 1;" },
      { level: "SUCCESS" as const, text: "PostgreSQL response fetched (1 row)", lat: 15 },
      { level: "INFO" as const, text: "Dispatching order.fulfilled event to Kafka queue..." },
      { level: "SUCCESS" as const, text: "Kafka broker ACK received", lat: 8 },
      { level: "SUCCESS" as const, text: "API Response dispatched. Code 200 OK", lat: 31 },
    ];

    for (const step of steps) {
      addLog(step.level, step.text, step.lat);
      await new Promise((resolve) => setTimeout(resolve, reduce ? 100 : 500));
    }
    setIsRunning(false);
  };

  const readIotSensor = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setActiveTab("iot");

    const steps = [
      { level: "INFO" as const, text: "Listening on LoRa gateway channel 4 (868.1 MHz)..." },
      { level: "TRACE" as const, text: "Searching for active ESP8266 transmitter nodes..." },
      { level: "SUCCESS" as const, text: "Node ESP8266_GATE_A connected." },
      { level: "INFO" as const, text: "Reading RFID scanning payload..." },
      { level: "TRACE" as const, text: "Raw buffer: [0x02, 0x4B, 0x49, 0x41, 0x4E, 0x03]" },
      { level: "SUCCESS" as const, text: "Parsed RFID Tag: 'Kian1011' (Access Granted)", lat: 12 },
      { level: "INFO" as const, text: "Syncing gate access logs to cloud..." },
      { level: "TRACE" as const, text: "Publishing payload to telemetry/gate/logs..." },
      { level: "SUCCESS" as const, text: "MQTT publish ACK from AWS IoT Core", lat: 45 },
    ];

    for (const step of steps) {
      addLog(step.level, step.text, step.lat);
      await new Promise((resolve) => setTimeout(resolve, reduce ? 100 : 450));
    }
    setIsRunning(false);
  };

  return (
    <section
      ref={containerRef}
      id="telemetry"
      className="relative py-24 lg:py-32 overflow-hidden dot-bg"
      aria-labelledby="telemetry-heading"
    >
      {/* Visual background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-96 h-96 rounded-full blur-[120px] opacity-15"
          style={{
            background: "radial-gradient(circle, #3b82f6, transparent)",
            top: "10%",
            left: "15%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-10"
          style={{
            background: "radial-gradient(circle, #6366f1, transparent)",
            bottom: "10%",
            right: "10%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-[10px] font-mono tracking-wider text-blue-400 border border-blue-500/10 uppercase mb-3">
            <Activity size={10} className="animate-pulse" /> Live Observability Demo
          </span>
          <h2 id="telemetry-heading" className="section-heading mb-4">
            System <span className="gradient-text">Telemetry</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          <p className="mt-4 text-sm text-slate-500 max-w-[54ch]">
            Interact with simulated microservices, database traces, and IoT sensor payloads to see observability and distributed logging in action.
          </p>
        </motion.div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-stretch">
          {/* 1. Terminal Console Container */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
            className="flex flex-col glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Terminal size={15} className="text-blue-400" />
                <span className="font-mono text-xs font-semibold text-slate-300">observability_terminal.sh</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
            </div>

            {/* Terminal View */}
            <div className="flex-1 p-5 min-h-[340px] max-h-[380px] overflow-y-auto font-mono text-xs text-slate-300 space-y-2.5 bg-slate-950/40 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {logs.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="text-slate-500 italic mt-4 text-center"
                  >
                    Console idle. Select a simulation below to stream telemetry logs...
                  </motion.p>
                ) : (
                  logs.map((log) => {
                    let levelColor = "text-slate-400";
                    if (log.level === "SUCCESS") levelColor = "text-emerald-400 font-semibold";
                    if (log.level === "WARN") levelColor = "text-yellow-400 font-semibold";
                    if (log.level === "TRACE") levelColor = "text-cyan-400";
                    if (log.level === "ERROR") levelColor = "text-red-400 font-semibold";

                    return (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-wrap items-start gap-x-2 py-0.5 border-b border-white/0 hover:bg-white/[0.01]"
                      >
                        <span className="text-slate-600 select-none">[{log.time}]</span>
                        <span className={`min-w-[56px] select-none text-right pr-1 ${levelColor}`}>
                          [{log.level}]
                        </span>
                        <span className="flex-1 text-slate-200">{log.message}</span>
                        {log.latency && (
                          <span className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-blue-400 font-mono">
                            {log.latency}ms
                          </span>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
              <div ref={logsEndRef} />
            </div>

            {/* Sim Control Panel Buttons */}
            <div className="p-4 bg-slate-950/60 border-t border-white/5 flex flex-wrap gap-2 justify-center sm:justify-start">
              <button
                onClick={runSystemCheck}
                disabled={isRunning}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-200 ${
                  activeTab === "system"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "glass border border-white/10 text-slate-300 hover:border-blue-500/30"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Server size={13} className={isRunning && activeTab === "system" ? "animate-spin" : ""} />
                System Health Check
              </button>
              <button
                onClick={traceDbQuery}
                disabled={isRunning}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-200 ${
                  activeTab === "trace"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "glass border border-white/10 text-slate-300 hover:border-indigo-500/30"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Database size={13} className={isRunning && activeTab === "trace" ? "animate-spin" : ""} />
                Trace SQL Query
              </button>
              <button
                onClick={readIotSensor}
                disabled={isRunning}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-200 ${
                  activeTab === "iot"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                    : "glass border border-white/10 text-slate-300 hover:border-emerald-500/30"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Rss size={13} className={isRunning && activeTab === "iot" ? "animate-spin" : ""} />
                Ping LoRa Sensor
              </button>
            </div>
          </motion.div>

          {/* 2. Metrics & Observability Dashboard */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
            className="flex flex-col gap-4 justify-between"
          >
            {/* Cluster Health Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              {/* CPU Load Metric */}
              <div className="glass border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs font-mono font-medium">CPU Load</span>
                  <Cpu size={15} className="text-blue-400" />
                </div>
                <div className="my-4">
                  <p className="text-3xl font-bold font-mono tracking-tight text-slate-100">
                    {metrics.cpu}<span className="text-sm font-semibold text-slate-500">%</span>
                  </p>
                  <div className="w-full bg-white/5 rounded-full h-1.5 mt-2.5 overflow-hidden">
                    <motion.div
                      className="bg-blue-500 h-1.5 rounded-full"
                      animate={{ width: `${metrics.cpu}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <p className="text-[10px] font-mono text-slate-500">Virtual gateway metrics</p>
              </div>

              {/* Memory Metric */}
              <div className="glass border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs font-mono font-medium">RAM Allocation</span>
                  <Activity size={15} className="text-indigo-400" />
                </div>
                <div className="my-4">
                  <p className="text-3xl font-bold font-mono tracking-tight text-slate-100">
                    {metrics.ram}<span className="text-sm font-semibold text-slate-500">%</span>
                  </p>
                  <div className="w-full bg-white/5 rounded-full h-1.5 mt-2.5 overflow-hidden">
                    <motion.div
                      className="bg-indigo-500 h-1.5 rounded-full"
                      animate={{ width: `${metrics.ram}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <p className="text-[10px] font-mono text-slate-500">Node cluster pool alloc</p>
              </div>

              {/* Latency Metric */}
              <div className="glass border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs font-mono font-medium">Network Ping</span>
                  <Server size={15} className="text-violet-400" />
                </div>
                <div className="my-4">
                  <p className="text-3xl font-bold font-mono tracking-tight text-slate-100">
                    {metrics.latency}<span className="text-xs font-semibold text-slate-500">ms</span>
                  </p>
                  <div className="w-full bg-white/5 rounded-full h-1.5 mt-2.5 overflow-hidden">
                    <motion.div
                      className="bg-violet-500 h-1.5 rounded-full"
                      animate={{ width: `${Math.min(100, metrics.latency * 2)}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <p className="text-[10px] font-mono text-slate-500">Edge endpoint lookup latency</p>
              </div>

              {/* Cluster Nodes */}
              <div className="glass border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs font-mono font-medium">Telemetry Nodes</span>
                  <Rss size={15} className="text-emerald-400" />
                </div>
                <div className="my-4">
                  <p className="text-3xl font-bold font-mono tracking-tight text-slate-100">
                    03<span className="text-xs font-semibold text-slate-500">/03</span>
                  </p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
                <p className="text-[10px] font-mono text-slate-500">Active services healthy</p>
              </div>
            </div>

            {/* Bottom alert widget for distributed systems theme */}
            <div className="glass border border-blue-500/10 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                <Activity size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-mono font-semibold text-slate-300">Distributed Node Observability</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug truncate">
                  Instrumented via OpenTelemetry with real-time trace exporting.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
