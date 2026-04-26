"use client"

import React from "react"
import { motion, Variants } from "framer-motion"
import { 
  Building2, 
  Key, 
  Home, 
  FileText, 
  Download, 
  AlertCircle, 
  TrendingUp, 
  CheckCircle2, 
  Clock,
  ShieldCheck,
  CreditCard
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function FunctionalitiesSection() {
  const { t } = useLanguage()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="functionalities" className="w-full py-10 px-3 md:px-16 bg-background">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="text-center space-y-1 mb-6">
          <h2 className="text-xl font-medium md:text-4xl text-balance tracking-tighter">
            {t.functionalities.title.part1} {t.functionalities.title.part2}
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm md:text-base font-normal">
            {t.functionalities.subtitle}
          </p>
        </div>

        {/* Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 mt-8"
        >
          {/* Row 1, Card 1: Payment Tracking (9/12) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-9 group relative overflow-hidden rounded-sm md:rounded-xl bg-neutral-100 transition-all duration-300"
          >
            <div className="p-4 md:p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4 md:mb-8">
                <div>
                  <h3 className="text-sm md:text-lg font-semibold tracking-tight text-black leading-tight group-hover:text-primary transition-colors">{t.functionalities.cards.payments.title}</h3>
                  <p className="text-neutral-400 text-[11px] md:text-sm">{t.functionalities.cards.payments.description}</p>
                </div>
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
              </div>

              {/* Mini UI Mockup: Payment Table */}
              <div className="flex-1 rounded-sm md:rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-sm">
                <table className="w-full text-left text-[10px] md:text-sm">
                  <thead className="bg-neutral-50 border-b border-neutral-100">
                    <tr>
                      <th className="px-2 md:px-4 py-2 md:py-3 font-medium text-neutral-500">{t.functionalities.cards.payments.table.apt}</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 font-medium text-neutral-500">{t.functionalities.cards.payments.table.owner}</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 font-medium text-neutral-500 hidden sm:table-cell">{t.functionalities.cards.payments.table.amount}</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 font-medium text-neutral-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {[
                      { apt: "A-102", owner: "Karim Alaoui", amount: "1,200 MAD", status: "paid" },
                      { apt: "B-205", owner: "Sarah Mansour", amount: "850 MAD", status: "overdue" },
                      { apt: "C-003", owner: "Youssef Benali", amount: "2,400 MAD", status: "paid" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-2 md:px-4 py-2 md:py-4 font-medium text-neutral-900">{row.apt}</td>
                        <td className="px-2 md:px-4 py-2 md:py-4 text-neutral-600 truncate max-w-[80px] md:max-w-none">{row.owner}</td>
                        <td className="px-2 md:px-4 py-2 md:py-4 text-neutral-600 hidden sm:table-cell">{row.amount}</td>
                        <td className="px-2 md:px-4 py-2 md:py-4">
                          {row.status === "paid" ? (
                            <span className="inline-flex items-center gap-1 px-1.5 md:px-2.5 py-0.5 rounded-full text-[8px] md:text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                              <CheckCircle2 className="h-2 w-2 md:h-3 md:w-3" />
                              {t.functionalities.cards.payments.table.status.paid}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-1.5 md:px-2.5 py-0.5 rounded-full text-[8px] md:text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                              <AlertCircle className="h-2 w-2 md:h-3 md:w-3" />
                              {t.functionalities.cards.payments.table.status.overdue}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Row 1, Card 2: 3-Role Access Control (3/12) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-3 group rounded-sm md:rounded-xl bg-neutral-100 p-4 md:p-6 transition-all duration-300 flex flex-col"
          >
            <div className="mb-4">
              <h3 className="text-sm md:text-lg font-semibold tracking-tight text-black leading-tight group-hover:text-primary transition-colors">{t.functionalities.cards.access.title}</h3>
              <p className="text-neutral-400 text-[11px] md:text-sm">{t.functionalities.cards.access.description}</p>
            </div>
            <div className="space-y-2 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-neutral-200 shadow-sm">
                <div className="h-8 w-8 rounded-md bg-primary/5 flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs md:text-sm font-medium text-neutral-800">{t.functionalities.cards.access.roles.syndic}</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-neutral-200 shadow-sm">
                <div className="h-8 w-8 rounded-md bg-neutral-50 flex items-center justify-center">
                  <Key className="h-4 w-4 text-neutral-500" />
                </div>
                <span className="text-xs md:text-sm font-medium text-neutral-700">{t.functionalities.cards.access.roles.owner}</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-neutral-200 shadow-sm">
                <div className="h-8 w-8 rounded-md bg-neutral-50 flex items-center justify-center">
                  <Home className="h-4 w-4 text-neutral-500" />
                </div>
                <span className="text-xs md:text-sm font-medium text-neutral-700">{t.functionalities.cards.access.roles.resident}</span>
              </div>
            </div>
          </motion.div>

          {/* Row 2, Card 1: Incident Reporting (3/12) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-3 group rounded-sm md:rounded-xl bg-neutral-100 p-4 md:p-6 transition-all duration-300 flex flex-col"
          >
            <div className="mb-4">
              <h3 className="text-sm md:text-lg font-semibold tracking-tight text-black leading-tight group-hover:text-primary transition-colors">{t.functionalities.cards.incidents.title}</h3>
              <p className="text-neutral-400 text-[11px] md:text-sm">{t.functionalities.cards.incidents.description}</p>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-3 space-y-3 shadow-sm flex-1 flex flex-col justify-between">
              <div className="aspect-video rounded-md bg-neutral-100 flex items-center justify-center overflow-hidden">
                <AlertCircle className="h-6 w-6 text-neutral-300" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[8px] uppercase tracking-wider font-bold text-neutral-400">#INC-402</span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                    <Clock className="h-2 w-2" />
                    {t.functionalities.cards.incidents.status}
                  </span>
                </div>
                <p className="text-[11px] md:text-xs font-medium text-neutral-700 leading-tight">
                  {t.functionalities.cards.incidents.ticket}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Row 2, Card 2: Document Library (3/12) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-3 group rounded-sm md:rounded-xl bg-neutral-100 p-4 md:p-6 transition-all duration-300 flex flex-col"
          >
            <div className="mb-4">
              <h3 className="text-sm md:text-lg font-semibold tracking-tight text-black leading-tight group-hover:text-primary transition-colors">{t.functionalities.cards.documents.title}</h3>
              <p className="text-neutral-400 text-[11px] md:text-sm">{t.functionalities.cards.documents.description}</p>
            </div>
            <div className="space-y-1.5 flex-1 flex flex-col justify-center">
              {[
                { name: t.functionalities.cards.documents.files.minutes, icon: FileText },
                { name: t.functionalities.cards.documents.files.regulations, icon: FileText },
                { name: t.functionalities.cards.documents.files.insurance, icon: ShieldCheck },
              ].map((file, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white border border-neutral-200 shadow-sm group/file">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="h-6 w-6 shrink-0 rounded bg-red-50 flex items-center justify-center">
                      <file.icon className="h-3 w-3 text-red-500" />
                    </div>
                    <span className="text-[10px] md:text-xs font-medium text-neutral-600 truncate">{file.name}</span>
                  </div>
                  <button className="h-6 w-6 shrink-0 rounded border border-neutral-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <Download className="h-2.5 w-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Row 2, Card 3: Auto Charge Generation (6/12) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-6 group rounded-sm md:rounded-xl bg-neutral-100 p-4 md:p-8 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h3 className="text-sm md:text-lg font-semibold tracking-tight text-black leading-tight group-hover:text-primary transition-colors">{t.functionalities.cards.automation.title}</h3>
                <p className="text-neutral-400 text-[11px] md:text-sm">{t.functionalities.cards.automation.stats}</p>
              </div>
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-emerald-500" />
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="p-3 md:p-4 rounded-lg bg-white border border-neutral-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] md:text-xs font-semibold text-neutral-700">Monthly Target</span>
                  <span className="text-[10px] md:text-xs font-bold text-primary">85%</span>
                </div>
                <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
                <p className="mt-2 text-[10px] text-neutral-500 font-medium">
                  {t.functionalities.cards.automation.progress}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 rounded-lg bg-white border border-neutral-200 shadow-sm">
                  <span className="text-[8px] uppercase font-bold text-neutral-400">Collected</span>
                  <p className="text-xs md:text-sm font-bold text-neutral-900">20,400 MAD</p>
                </div>
                <div className="p-3 rounded-lg bg-white border border-neutral-200 shadow-sm">
                  <span className="text-[8px] uppercase font-bold text-neutral-400">Remaining</span>
                  <p className="text-xs md:text-sm font-bold text-neutral-900">3,600 MAD</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
