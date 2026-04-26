"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import {
  Building2,
  Layers,
  DoorOpen,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Bell,
  ArrowUpRight,
  BarChart3,
  Ticket,
  Send,
} from "lucide-react"

/* ─────────────── Step 1 : Building hierarchy card ─────────────── */
function BuildingHierarchyCard() {
  const [visibleItems, setVisibleItems] = useState(0)
  const totalItems = 7

  useEffect(() => {
    setVisibleItems(0)
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleItems(i)
      if (i >= totalItems) clearInterval(interval)
    }, 320)
    return () => clearInterval(interval)
  }, [])

  const items = [
    { depth: 0, icon: <Building2 size={15} />, label: "Résidence Al Firdaws", type: "building" },
    { depth: 1, icon: <Layers size={14} />, label: "Floor 1", type: "floor" },
    { depth: 2, icon: <DoorOpen size={14} />, label: "Apt 101 — M. El Amrani", type: "apt" },
    { depth: 2, icon: <DoorOpen size={14} />, label: "Apt 102 — Mme. Bennis", type: "apt" },
    { depth: 1, icon: <Layers size={14} />, label: "Floor 2", type: "floor" },
    { depth: 2, icon: <DoorOpen size={14} />, label: "Apt 201 — M. Tazi", type: "apt" },
    { depth: 2, icon: <DoorOpen size={14} />, label: "Apt 202 — Mme. Fassi", type: "apt" },
  ]

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold tracking-wide uppercase text-neutral-400">
          Building structure
        </span>
        <span className="text-[11px] text-neutral-400 tabular-nums">{Math.min(visibleItems, totalItems)}/{totalItems} added</span>
      </div>
      <div className="space-y-[2px]">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -12 }}
            animate={idx < visibleItems ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ paddingLeft: item.depth * 20 }}
          >
            <div
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                item.type === "building"
                  ? "bg-red-50 border border-red-100"
                  : item.type === "floor"
                  ? "bg-neutral-50 border border-neutral-100"
                  : "bg-white border border-neutral-100"
              }`}
            >
              <span className={`shrink-0 ${item.type === "building" ? "text-red-500" : "text-neutral-400"}`}>
                {item.icon}
              </span>
              <span className={`text-sm ${item.type === "building" ? "font-semibold text-neutral-900" : item.type === "floor" ? "font-medium text-neutral-700" : "text-neutral-600"}`}>
                {item.label}
              </span>
              {item.type === "building" && (
                <ChevronRight size={13} className="ml-auto text-neutral-300" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────── Step 2 : Payment tracking card ─────────────── */
function PaymentTrackingCard() {
  const rows = [
    { apt: "Apt 101", owner: "M. El Amrani", amount: "2,000 MAD", status: "paid" },
    { apt: "Apt 102", owner: "Mme. Bennis", amount: "2,000 MAD", status: "paid" },
    { apt: "Apt 201", owner: "M. Tazi", amount: "2,000 MAD", status: "overdue" },
    { apt: "Apt 202", owner: "Mme. Fassi", amount: "2,000 MAD", status: "paid" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide uppercase text-neutral-400">
          Monthly Charges — April 2026
        </span>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#FF0000] px-3 py-1.5 rounded-md shadow-sm cursor-default"
        >
          Generate Charges
        </motion.button>
      </div>

      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 gap-2 bg-neutral-50 px-4 py-2.5 border-b border-neutral-200">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Apt</span>
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Owner</span>
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider text-right">Amount</span>
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider text-right">Status</span>
        </div>
        {/* Rows */}
        {rows.map((row, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12, duration: 0.3 }}
            className={`grid grid-cols-4 gap-2 px-4 py-3 ${idx !== rows.length - 1 ? "border-b border-neutral-100" : ""}`}
          >
            <span className="text-sm font-medium text-neutral-800">{row.apt}</span>
            <span className="text-sm text-neutral-600 truncate">{row.owner}</span>
            <span className="text-sm text-neutral-700 font-medium text-right tabular-nums">{row.amount}</span>
            <div className="flex justify-end">
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  row.status === "paid"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {row.status === "paid" ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                {row.status === "paid" ? "Paid" : "Overdue"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────── Step 3 : Dashboard / Stay-in-the-loop card ─── */
function DashboardCard() {
  const [ticketStatus, setTicketStatus] = useState<"open" | "resolved">("open")

  useEffect(() => {
    const timer = setTimeout(() => setTicketStatus("resolved"), 2200)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    { label: "Collected", value: "6,000 MAD", icon: <BarChart3 size={14} />, color: "text-emerald-600" },
    { label: "Overdue", value: "2,000 MAD", icon: <AlertCircle size={14} />, color: "text-red-500" },
    { label: "Occupancy", value: "100%", icon: <ArrowUpRight size={14} />, color: "text-blue-600" },
  ]

  return (
    <div className="space-y-4">
      <span className="text-xs font-semibold tracking-wide uppercase text-neutral-400">
        Dashboard Overview
      </span>

      {/* Mini stat cards */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.15, duration: 0.35 }}
            className="bg-white border border-neutral-200 rounded-lg p-3 flex flex-col gap-1"
          >
            <div className="flex items-center gap-1.5">
              <span className={`${s.color}`}>{s.icon}</span>
              <span className="text-[11px] text-neutral-400 font-medium">{s.label}</span>
            </div>
            <span className="text-base font-bold text-neutral-800 tabular-nums">{s.value}</span>
          </motion.div>
        ))}
      </div>

      {/* Notification row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.35 }}
        className="flex items-center gap-3 bg-white border border-neutral-200 rounded-lg px-4 py-3"
      >
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <Send size={14} className="text-blue-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-800 truncate">Payment Reminder Sent</p>
          <p className="text-xs text-neutral-400">Apt 201 — M. Tazi · 2 min ago</p>
        </div>
        <Bell size={14} className="text-neutral-300 shrink-0" />
      </motion.div>

      {/* Ticket card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.35 }}
        className="bg-white border border-neutral-200 rounded-lg px-4 py-3"
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <Ticket size={14} className="text-neutral-400" />
            <span className="text-sm font-medium text-neutral-800">Ticket #1042</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={ticketStatus}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                ticketStatus === "open"
                  ? "bg-amber-50 text-amber-600"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {ticketStatus === "open" ? <Clock size={11} /> : <CheckCircle2 size={11} />}
              {ticketStatus === "open" ? "Open" : "Resolved"}
            </motion.span>
          </AnimatePresence>
        </div>
        <p className="text-xs text-neutral-500">Elevator maintenance required — Floor 2</p>
      </motion.div>
    </div>
  )
}

/* ─────────────── Main Section ─────────────── */
export default function HowItWorksSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: "01",
      title: t.howItWorks.steps.step1.title,
    },
    {
      number: "02",
      title: t.howItWorks.steps.step2.title,
    },
    {
      number: "03",
      title: t.howItWorks.steps.step3.title,
    },
  ]

  /* ── Scroll progress → active step ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const stepCount = steps.length
      const idx = Math.min(Math.floor(v * stepCount), stepCount - 1)
      setActiveStep(idx)
    })
    return unsubscribe
  }, [scrollYProgress, steps.length])

  const cardComponents = [
    <BuildingHierarchyCard key="building" />,
    <PaymentTrackingCard key="payments" />,
    <DashboardCard key="dashboard" />,
  ]

  return (
    <section id="process" className="w-full bg-background">
      {/* ═══════════════ MOBILE: normal flow, tap-based ═══════════════ */}
      <div className="md:hidden px-3 py-12">
        {/* Header */}
        <div className="text-center space-y-1 mb-8">
          <h2 className="text-xl font-medium text-balance tracking-tighter">
            {t.howItWorks.title}
          </h2>
          <p className="text-neutral-500 text-sm font-normal max-w-md mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* Step tabs */}
        <div className="flex gap-2 mb-6">
          {steps.map((step, idx) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`flex-1 text-left px-3 py-2.5 rounded-sm transition-all duration-300 cursor-pointer ${
                activeStep === idx
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-400"
              }`}
            >
              <span className={`text-[10px] font-bold tracking-widest uppercase block ${
                activeStep === idx ? "text-red-400" : "text-neutral-400"
              }`}>
                {step.number}
              </span>
              <span className="text-xs font-semibold mt-0.5 block leading-tight">
                {step.title}
              </span>
            </button>
          ))}
        </div>

        {/* Card */}
        <motion.div
          className="bg-neutral-100 rounded-sm p-4 min-h-[320px] w-full"
          layout
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {cardComponents[activeStep]}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ═══════════════ DESKTOP: scroll-pinned ═══════════════ */}
      <div ref={sectionRef} className="relative h-[180vh] hidden md:block">
        {/* Pinned content — stays in view while scrolling through the container */}
        <div className="sticky top-0 h-screen flex flex-col justify-center">
          <div className="max-w-full mx-auto w-full px-16">
            {/* Header */}
            <div className="text-center space-y-1 mb-10">
              <h2 className="text-xl font-medium md:text-4xl text-balance tracking-tighter">
                {t.howItWorks.title}
              </h2>
              <p className="text-neutral-500 max-w-xl mx-auto text-sm md:text-base font-normal">
                {t.howItWorks.subtitle}
              </p>
            </div>

            {/* Two-column layout */}
            <div className="flex flex-row gap-8 items-start">
              {/* ── Left: All 3 steps shown compactly ── */}
              <div className="w-[40%] space-y-4">
                {steps.map((step, idx) => (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left transition-all duration-400 ease-out py-3 cursor-pointer ${
                      activeStep === idx
                        ? "opacity-100"
                        : "opacity-30 hover:opacity-50"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                        activeStep === idx ? "text-[#FF0000]" : "text-neutral-400"
                      }`}
                    >
                      Step {step.number}
                    </span>
                    <h3
                      className={`text-2xl font-semibold mt-1 tracking-tight transition-colors duration-300 ${
                        activeStep === idx ? "text-neutral-900" : "text-neutral-400"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </button>
                ))}
              </div>

              {/* ── Right: Card ── */}
              <div className="w-[60%]">
                <motion.div
                  className="bg-neutral-100 rounded-sm p-6 min-h-[380px] w-full"
                  layout
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {cardComponents[activeStep]}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
