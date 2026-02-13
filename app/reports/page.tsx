"use client"

import { useState } from "react"
import { BarChart3, Check, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("reporting")

  const tabs = [
    { id: "reporting", label: "Reporting" },
    { id: "custom", label: "Custom Reports" },
    { id: "google", label: "Google Ads Report" },
    { id: "facebook", label: "Facebook Ads Report" },
    { id: "attribution", label: "Attribution Report" },
    { id: "call", label: "Call Report" },
    { id: "agent", label: "Agent Report" },
    { id: "appointment", label: "Appointment Report" },
    { id: "audit", label: "Audit Report" },
  ]

  const checklistItems = [
    "Create Multi-Page Reports",
    "Schedule the Report to your Team Members and Stakeholders",
    "Add Reports Insights",
  ]

  const sampleWidgets = [
    "Opportunity status",
    "Lead report",
    "Pipeline breakdown",
    "Conversion rate",
    "Stages distribution",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  const widgetVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header Tabs */}
      <div className="border-b border-neutral-800 bg-neutral-950">
        <div className="flex gap-1 px-3 sm:px-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col xl:flex-row gap-4 xl:gap-8 p-3 sm:p-6 xl:p-8">
        {/* Left Section */}
        <motion.div className="flex-1 space-y-6" variants={containerVariants} initial="hidden" animate="visible">
          {/* Title */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(249, 115, 22, 0.3)",
                  "0 0 30px rgba(249, 115, 22, 0.5)",
                  "0 0 20px rgba(249, 115, 22, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="rounded-lg p-1"
            >
              <BarChart3 className="w-8 h-8 text-orange-500" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Reports Overview</h1>
          </motion.div>

          {/* Checklist */}
          <div className="space-y-4">
            {checklistItems.map((item, i) => (
              <motion.div key={i} className="flex items-start gap-3" variants={itemVariants}>
                <motion.div
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center mt-0.5"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(249, 115, 22, 0.6)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="w-4 h-4 text-black" />
                </motion.div>
                <p className="text-lg text-neutral-300">{item}</p>
              </motion.div>
            ))}
          </div>

          {/* New Report Button */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(249, 115, 22, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-6 text-base">
                + New Report
              </Button>
            </motion.div>
          </motion.div>

          {/* Bottom Link */}
          <motion.div className="pt-8 border-t border-neutral-800" variants={itemVariants}>
            <p className="text-neutral-400">
              Looking to Track Key Client Metrics at a glance?{" "}
              <Link href="/dashboard" className="text-orange-500 hover:underline font-medium">
                Try Dashboards
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Right Preview Panel */}
        <motion.div
          className="w-full xl:w-[400px] flex-shrink-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
        >
          <motion.div
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 40px rgba(249, 115, 22, 0.2)",
            }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-300" />
            <Card className="relative border-neutral-800 bg-neutral-950 shadow-lg overflow-hidden">
              {/* Report Header */}
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 border-b border-neutral-800">
                <h3 className="text-xl font-bold text-white mb-3">Sales report 2023</h3>
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <Calendar className="w-4 h-4" />
                  <span>Jan 1 2022 - Jan 30 2022</span>
                </div>
              </div>

              {/* Sample Charts */}
              <motion.div className="p-6 space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">Suggested Widgets</p>
                {sampleWidgets.map((widget, i) => (
                  <motion.div key={i} variants={widgetVariants}>
                    <motion.div
                      className="border border-neutral-800 rounded-lg p-4 bg-neutral-900 relative group/widget"
                      whileHover={{
                        scale: 1.03,
                        borderColor: "rgba(249, 115, 22, 0.5)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg opacity-0 group-hover/widget:opacity-100 blur-sm transition duration-300" />
                      <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-neutral-300">{widget}</p>
                          <BarChart3 className="w-4 h-4 text-neutral-600" />
                        </div>
                        {/* Placeholder chart visualization */}
                        <div className="h-24 bg-gradient-to-r from-neutral-900 to-black rounded flex items-end justify-around p-2 gap-1">
                          {[40, 65, 45, 80, 55, 70, 50].map((height, j) => (
                            <motion.div
                              key={j}
                              className="bg-orange-500 rounded-t w-full"
                              style={{ height: `${height}%` }}
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ delay: 0.8 + i * 0.1 + j * 0.05, duration: 0.4 }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
