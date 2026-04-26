"use client"

import React from "react"
import { motion } from "framer-motion"
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
  CreditCard,
  Camera,
  User,
  BarChart3,
  Zap
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function FunctionalitiesSection() {
  const { t } = useLanguage()

  const paymentRows = [
    { apt: "A-102", owner: "Karim Alaoui", amount: "1,200 MAD", status: "paid" as const, date: "01/04" },
    { apt: "B-205", owner: "Sarah Mansour", amount: "850 MAD", status: "overdue" as const, date: "15/03" },
    { apt: "C-003", owner: "Youssef Benali", amount: "2,400 MAD", status: "paid" as const, date: "28/03" },
    { apt: "A-304", owner: "Meriem Filali", amount: "1,200 MAD", status: "paid" as const, date: "02/04" },
  ]

  const apartmentBars = [
    { name: "A-102", pct: 100, amount: "1,200" },
    { name: "A-201", pct: 100, amount: "1,800" },
    { name: "A-304", pct: 75, amount: "900" },
    { name: "B-101", pct: 100, amount: "2,400" },
    { name: "B-205", pct: 0, amount: "0" },
    { name: "C-003", pct: 50, amount: "1,200" },
  ]

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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 mt-8">
          {/* Row 1, Card 1: Payment Tracking (9/12) */}
          <div className="md:col-span-9 group relative overflow-hidden rounded-sm bg-neutral-100 transition-all duration-300">
            <div className="p-4 md:p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div>
                  <h3 className="text-sm md:text-lg font-semibold tracking-tight text-black leading-tight group-hover:text-primary transition-colors">{t.functionalities.cards.payments.title}</h3>
                  <p className="text-neutral-400 text-[11px] md:text-sm">{t.functionalities.cards.payments.description}</p>
                </div>
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-sm bg-white flex items-center justify-center shadow-sm">
                  <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="bg-white rounded-sm p-2 md:p-3 border border-neutral-200">
                  <p className="text-[8px] md:text-[10px] uppercase font-bold text-neutral-400 mb-0.5">Total Due</p>
                  <p className="text-xs md:text-base font-bold text-neutral-900">5,650 <span className="text-[8px] md:text-[10px] font-medium text-neutral-400">MAD</span></p>
                </div>
                <div className="bg-white rounded-sm p-2 md:p-3 border border-emerald-100">
                  <p className="text-[8px] md:text-[10px] uppercase font-bold text-emerald-500 mb-0.5">Collected</p>
                  <p className="text-xs md:text-base font-bold text-emerald-700">4,800 <span className="text-[8px] md:text-[10px] font-medium text-neutral-400">MAD</span></p>
                </div>
                <div className="bg-white rounded-sm p-2 md:p-3 border border-red-100">
                  <p className="text-[8px] md:text-[10px] uppercase font-bold text-red-400 mb-0.5">Overdue</p>
                  <p className="text-xs md:text-base font-bold text-red-600">850 <span className="text-[8px] md:text-[10px] font-medium text-red-300">MAD</span></p>
                </div>
              </div>

              {/* Payment Table */}
              <div className="flex-1 rounded-sm border border-neutral-200 bg-white overflow-hidden shadow-sm">
                <table className="w-full text-left text-[10px] md:text-sm">
                  <thead className="bg-neutral-50 border-b border-neutral-100">
                    <tr>
                      <th className="px-2 md:px-4 py-2 md:py-3 font-medium text-neutral-500">{t.functionalities.cards.payments.table.apt}</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 font-medium text-neutral-500">{t.functionalities.cards.payments.table.owner}</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 font-medium text-neutral-500 hidden sm:table-cell">{t.functionalities.cards.payments.table.amount}</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 font-medium text-neutral-500 hidden md:table-cell">Date</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 font-medium text-neutral-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {paymentRows.map((row, i) => (
                      <tr key={i} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-2 md:px-4 py-2 md:py-3 font-medium text-neutral-900">{row.apt}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-neutral-600 truncate max-w-[80px] md:max-w-none">
                          <div className="flex items-center gap-1.5">
                            <div className="h-5 w-5 rounded-sm bg-neutral-200 hidden md:flex items-center justify-center shrink-0">
                              <User className="h-2.5 w-2.5 text-neutral-500" />
                            </div>
                            {row.owner}
                          </div>
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-neutral-600 font-medium hidden sm:table-cell">{row.amount}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-neutral-400 text-[9px] md:text-xs hidden md:table-cell">{row.date}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3">
                          {row.status === "paid" ? (
                            <span className="inline-flex items-center gap-1 px-1.5 md:px-2.5 py-0.5 rounded-sm text-[8px] md:text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                              <CheckCircle2 className="h-2 w-2 md:h-3 md:w-3" />
                              {t.functionalities.cards.payments.table.status.paid}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-1.5 md:px-2.5 py-0.5 rounded-sm text-[8px] md:text-xs font-medium bg-red-50 text-red-700 border border-red-100">
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
          </div>

          {/* Row 1, Card 2: 3-Role Access Control (3/12) */}
          <div className="md:col-span-3 group rounded-sm bg-neutral-100 p-4 md:p-6 transition-all duration-300 flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm md:text-lg font-semibold tracking-tight text-black leading-tight group-hover:text-primary transition-colors">{t.functionalities.cards.access.title}</h3>
              <p className="text-neutral-400 text-[11px] md:text-sm">{t.functionalities.cards.access.description}</p>
            </div>
            <div className="space-y-2 flex-1 flex flex-col justify-center">
              {/* Syndic – primary highlight */}
              <div className="flex items-center gap-3 p-2.5 rounded-sm bg-white border border-primary/20 shadow-sm">
                <div className="h-8 w-8 rounded-sm bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs md:text-sm font-semibold text-neutral-900 block">{t.functionalities.cards.access.roles.syndic}</span>
                  <span className="text-[9px] md:text-[10px] text-primary font-medium">Full access</span>
                </div>
                <div className="flex gap-0.5">
                  <div className="h-1.5 w-1.5 rounded-sm bg-primary" />
                  <div className="h-1.5 w-1.5 rounded-sm bg-primary" />
                  <div className="h-1.5 w-1.5 rounded-sm bg-primary" />
                </div>
              </div>
              {/* Co-owner */}
              <div className="flex items-center gap-3 p-2.5 rounded-sm bg-white border border-neutral-200 shadow-sm">
                <div className="h-8 w-8 rounded-sm bg-neutral-50 flex items-center justify-center">
                  <Key className="h-4 w-4 text-neutral-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs md:text-sm font-medium text-neutral-700 block">{t.functionalities.cards.access.roles.owner}</span>
                  <span className="text-[9px] md:text-[10px] text-neutral-400 font-medium">Finance & docs</span>
                </div>
                <div className="flex gap-0.5">
                  <div className="h-1.5 w-1.5 rounded-sm bg-neutral-400" />
                  <div className="h-1.5 w-1.5 rounded-sm bg-neutral-400" />
                  <div className="h-1.5 w-1.5 rounded-sm bg-neutral-200" />
                </div>
              </div>
              {/* Resident */}
              <div className="flex items-center gap-3 p-2.5 rounded-sm bg-white border border-neutral-200 shadow-sm">
                <div className="h-8 w-8 rounded-sm bg-neutral-50 flex items-center justify-center">
                  <Home className="h-4 w-4 text-neutral-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs md:text-sm font-medium text-neutral-700 block">{t.functionalities.cards.access.roles.resident}</span>
                  <span className="text-[9px] md:text-[10px] text-neutral-400 font-medium">View & report</span>
                </div>
                <div className="flex gap-0.5">
                  <div className="h-1.5 w-1.5 rounded-sm bg-neutral-400" />
                  <div className="h-1.5 w-1.5 rounded-sm bg-neutral-200" />
                  <div className="h-1.5 w-1.5 rounded-sm bg-neutral-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2, Card 1: Incident Reporting (3/12) */}
          <div className="md:col-span-3 group rounded-sm bg-neutral-100 p-4 md:p-6 transition-all duration-300 flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm md:text-lg font-semibold tracking-tight text-black leading-tight group-hover:text-primary transition-colors">{t.functionalities.cards.incidents.title}</h3>
              <p className="text-neutral-400 text-[11px] md:text-sm">{t.functionalities.cards.incidents.description}</p>
            </div>
            <div className="rounded-sm border border-neutral-200 bg-white p-3 shadow-sm flex-1 flex flex-col">
              {/* Photo area with gradient overlay */}
              <div className="aspect-[16/10] rounded-md bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center overflow-hidden relative mb-3">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-sm bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center">
                    <Camera className="h-5 w-5 md:h-6 md:w-6 text-amber-500" />
                  </div>
                </div>
                <div className="absolute bottom-1.5 right-1.5">
                  <span className="text-[7px] md:text-[8px] bg-black/60 text-white px-1.5 py-0.5 rounded font-medium backdrop-blur-sm">1 photo</span>
                </div>
              </div>
              {/* Ticket details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[8px] md:text-[9px] uppercase tracking-wider font-bold text-neutral-400 font-mono">#INC-402</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[8px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                      <Clock className="h-2 w-2" />
                      {t.functionalities.cards.incidents.status}
                    </span>
                  </div>
                  <p className="text-[11px] md:text-xs font-medium text-neutral-800 leading-snug mb-2">
                    {t.functionalities.cards.incidents.ticket}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                  <div className="flex items-center gap-1.5">
                    <div className="h-4 w-4 rounded-sm bg-neutral-200 flex items-center justify-center">
                      <User className="h-2 w-2 text-neutral-500" />
                    </div>
                    <span className="text-[8px] md:text-[9px] text-neutral-400 font-medium">Apt B-205</span>
                  </div>
                  <span className="text-[8px] md:text-[9px] text-neutral-400">2h ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2, Card 2: Document Library (3/12) */}
          <div className="md:col-span-3 group rounded-sm bg-neutral-100 p-4 md:p-6 transition-all duration-300 flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm md:text-lg font-semibold tracking-tight text-black leading-tight group-hover:text-primary transition-colors">{t.functionalities.cards.documents.title}</h3>
              <p className="text-neutral-400 text-[11px] md:text-sm">{t.functionalities.cards.documents.description}</p>
            </div>
            <div className="space-y-2 flex-1 flex flex-col justify-center">
              {[
                { name: t.functionalities.cards.documents.files.minutes, icon: FileText, size: "2.4 MB", color: "bg-red-50 text-red-500" },
                { name: t.functionalities.cards.documents.files.regulations, icon: FileText, size: "1.8 MB", color: "bg-red-50 text-red-500" },
                { name: t.functionalities.cards.documents.files.insurance, icon: ShieldCheck, size: "3.1 MB", color: "bg-blue-50 text-blue-500" },
              ].map((file, i) => (
                <div key={i} className="flex items-center justify-between p-2 md:p-2.5 rounded-sm bg-white border border-neutral-200 shadow-sm group/file hover:border-neutral-300 transition-colors">
                  <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
                    <div className={`h-7 w-7 md:h-8 md:w-8 shrink-0 rounded-sm ${file.color.split(' ')[0]} flex items-center justify-center`}>
                      <file.icon className={`h-3.5 w-3.5 md:h-4 md:w-4 ${file.color.split(' ')[1]}`} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] md:text-xs font-medium text-neutral-700 truncate block">{file.name}</span>
                      <span className="text-[8px] md:text-[9px] text-neutral-400">{file.size} · PDF</span>
                    </div>
                  </div>
                  <button className="h-7 w-7 shrink-0 rounded-sm border border-neutral-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white text-neutral-400 transition-all ml-2">
                    <Download className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2, Card 3: Auto Charge Generation (6/12) */}
          <div className="md:col-span-6 group rounded-sm bg-neutral-100 p-4 md:p-8 transition-all duration-300">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h3 className="text-sm md:text-lg font-semibold tracking-tight text-black leading-tight group-hover:text-primary transition-colors">{t.functionalities.cards.automation.title}</h3>
                <p className="text-neutral-400 text-[11px] md:text-sm">{t.functionalities.cards.automation.stats}</p>
              </div>
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-sm bg-white flex items-center justify-center shadow-sm">
                <Zap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
            </div>

            <div className="space-y-4">
              {/* Monthly summary card */}
              <div className="p-3 md:p-4 rounded-sm bg-white border border-neutral-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] md:text-xs font-semibold text-neutral-700">Monthly Collection</span>
                  <span className="text-[10px] md:text-xs font-bold text-primary">85%</span>
                </div>
                <div className="h-2 w-full bg-neutral-100 rounded-sm overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-primary rounded-sm"
                  />
                </div>
                <p className="mt-2 text-[10px] text-neutral-500 font-medium">
                  {t.functionalities.cards.automation.progress}
                </p>
              </div>

              {/* Per-apartment breakdown */}
              <div className="p-3 md:p-4 rounded-sm bg-white border border-neutral-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] md:text-xs font-semibold text-neutral-700">Per Apartment</span>
                  <BarChart3 className="h-3 w-3 text-neutral-400" />
                </div>
                <div className="space-y-2">
                  {apartmentBars.map((apt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[8px] md:text-[10px] font-mono font-medium text-neutral-500 w-8 md:w-10 shrink-0">{apt.name}</span>
                      <div className="flex-1 h-1.5 bg-neutral-100 rounded-sm overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${apt.pct}%` }}
                          transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                          className={`h-full rounded-sm ${apt.pct === 100 ? 'bg-emerald-400' : apt.pct === 0 ? 'bg-red-400' : 'bg-amber-400'}`}
                        />
                      </div>
                      <span className="text-[8px] md:text-[10px] font-medium text-neutral-400 w-10 md:w-12 text-right shrink-0">{apt.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <div className="p-2 md:p-3 rounded-sm bg-white border border-neutral-200 shadow-sm">
                  <span className="text-[8px] uppercase font-bold text-neutral-400">Collected</span>
                  <p className="text-xs md:text-sm font-bold text-emerald-600">20,400 MAD</p>
                </div>
                <div className="p-2 md:p-3 rounded-sm bg-white border border-neutral-200 shadow-sm">
                  <span className="text-[8px] uppercase font-bold text-neutral-400">Remaining</span>
                  <p className="text-xs md:text-sm font-bold text-red-500">3,600 MAD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
