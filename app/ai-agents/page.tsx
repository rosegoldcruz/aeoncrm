"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, ArrowUp, ArrowDown, Phone, Zap, Smile, Clock, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export default function AIAgentsPage() {
  const [activeTab, setActiveTab] = useState("voice-ai")
  const [activeSubTab, setActiveSubTab] = useState("dashboard")
  const [callType, setCallType] = useState("inbound")

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      {/* Header Tabs */}
      <div className="border-b border-neutral-800">
        <div className="flex items-center gap-6 px-6">
          {["Getting Started", "Voice AI", "Conversation AI", "Knowledge Base", "Content AI"].map((tab, idx) => {
            const tabId = tab.toLowerCase().replace(/ /g, "-")
            const isActive = tabId === activeTab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tabId)}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  isActive
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Page Header */}
        <motion.div
          className="flex items-start justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div>
            <h1 className="text-3xl font-bold text-neutral-100">AI Agents</h1>
            <p className="text-neutral-400 mt-1">Create and manage Voice Agents for your Business</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 bg-transparent"
            >
              Enable Outbound Calls
            </Button>
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(249, 115, 22, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">+ Create Agent</Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-4 border-b border-neutral-800">
          <button
            onClick={() => setActiveSubTab("dashboard")}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeSubTab === "dashboard"
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Dashboard & Logs
          </button>
          <button
            onClick={() => setActiveSubTab("agent-list")}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeSubTab === "agent-list"
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Agent List
          </button>
        </div>

        {/* Call Type Toggle & Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Call Type Toggle */}
            <div className="flex items-center bg-neutral-900 rounded-lg p-1">
              <button
                onClick={() => setCallType("inbound")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  callType === "inbound" ? "bg-orange-500 text-white" : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Inbound
              </button>
              <button
                onClick={() => setCallType("outbound")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  callType === "outbound" ? "bg-orange-500 text-white" : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Outbound
              </button>
            </div>

            {/* Agent Filter */}
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px] bg-neutral-900 border-neutral-700">
                <SelectValue placeholder="All Agents" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="agent1">Agent 1</SelectItem>
                <SelectItem value="agent2">Agent 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 text-neutral-400" />
              <span className="text-sm text-neutral-300">2025-10-01</span>
            </div>
            <span className="text-neutral-500">to</span>
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 text-neutral-400" />
              <span className="text-sm text-neutral-300">2025-10-29</span>
            </div>
          </div>
        </div>

        {/* Metrics Dashboard - Top Row */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" animate="visible">
          {/* Total Calls */}
          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(249, 115, 22, 0.3)",
              }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-300" />
              <Card className="relative bg-neutral-900 border-neutral-800 p-6 hover:border-orange-500/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="p-2 bg-orange-500/10 rounded-lg"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(249, 115, 22, 0.2)" }}
                  >
                    <Phone className="w-5 h-5 text-orange-500" />
                  </motion.div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-neutral-400">Total Calls</p>
                  <motion.p
                    className="text-3xl font-bold text-neutral-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    0
                  </motion.p>
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <ArrowUp className="w-4 h-4" />
                    <span>0% vs last month</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Actions Triggered */}
          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(249, 115, 22, 0.3)",
              }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-300" />
              <Card className="relative bg-neutral-900 border-neutral-800 p-6 hover:border-orange-500/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="p-2 bg-orange-500/10 rounded-lg"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(249, 115, 22, 0.2)" }}
                  >
                    <Zap className="w-5 h-5 text-orange-500" />
                  </motion.div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-neutral-400">Actions Triggered</p>
                  <motion.p
                    className="text-3xl font-bold text-neutral-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  >
                    0
                  </motion.p>
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <ArrowUp className="w-4 h-4" />
                    <span>0% vs last month</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Sentiment */}
          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(249, 115, 22, 0.3)",
              }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-300" />
              <Card className="relative bg-neutral-900 border-neutral-800 p-6 hover:border-orange-500/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="p-2 bg-orange-500/10 rounded-lg"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(249, 115, 22, 0.2)" }}
                  >
                    <Smile className="w-5 h-5 text-orange-500" />
                  </motion.div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-neutral-400">Sentiment</p>
                  <motion.p
                    className="text-3xl font-bold text-neutral-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                  >
                    0% Positive
                  </motion.p>
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <ArrowUp className="w-4 h-4" />
                    <span>0% vs last month</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Calls Completed Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            whileHover={{
              scale: 1.01,
              boxShadow: "0 0 30px rgba(249, 115, 22, 0.3)",
            }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-300" />
            <Card className="relative bg-neutral-900 border-neutral-800 p-6 hover:border-orange-500/50 transition-colors">
              <h3 className="text-lg font-semibold text-neutral-100 mb-4">Calls Completed</h3>
              <div className="h-64 flex items-center justify-center border border-dashed border-neutral-700 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-neutral-600 mx-auto mb-2" />
                  <p className="text-neutral-500">No Data Available</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Bottom Metrics */}
        <motion.div className="grid grid-cols-1 xl:grid-cols-2 gap-6" variants={containerVariants} initial="hidden" animate="visible">
          {/* Total Duration */}
          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(249, 115, 22, 0.3)",
              }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-300" />
              <Card className="relative bg-neutral-900 border-neutral-800 p-6 hover:border-orange-500/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="p-2 bg-orange-500/10 rounded-lg"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(249, 115, 22, 0.2)" }}
                  >
                    <Clock className="w-5 h-5 text-orange-500" />
                  </motion.div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-neutral-400">Total Duration</p>
                  <motion.p
                    className="text-3xl font-bold text-neutral-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                  >
                    0 Mins
                  </motion.p>
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <ArrowUp className="w-4 h-4" />
                    <span>0% vs last month</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Average Call Duration */}
          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(249, 115, 22, 0.3)",
              }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-300" />
              <Card className="relative bg-neutral-900 border-neutral-800 p-6 hover:border-orange-500/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="p-2 bg-orange-500/10 rounded-lg"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(249, 115, 22, 0.2)" }}
                  >
                    <Clock className="w-5 h-5 text-orange-500" />
                  </motion.div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-neutral-400">Average Call Duration</p>
                  <motion.p
                    className="text-3xl font-bold text-neutral-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
                  >
                    0.0 Mins
                  </motion.p>
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <ArrowUp className="w-4 h-4" />
                    <span>0% vs last month</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Call Log Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <motion.div
            whileHover={{
              scale: 1.005,
              boxShadow: "0 0 30px rgba(249, 115, 22, 0.2)",
            }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-300" />
            <Card className="relative bg-neutral-900 border-neutral-800 hover:border-orange-500/50 transition-colors">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-neutral-100">Call Logs</h3>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-orange-500 text-orange-500 hover:bg-orange-500/10 bg-transparent"
                    >
                      Live
                    </Button>
                    <Select defaultValue="all-contacts">
                      <SelectTrigger className="w-full sm:w-[160px] bg-neutral-800 border-neutral-700">
                        <SelectValue placeholder="Contact name" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-contacts">All Contacts</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all-actions">
                      <SelectTrigger className="w-full sm:w-[160px] bg-neutral-800 border-neutral-700">
                        <SelectValue placeholder="Action type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-actions">All Actions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow className="border-neutral-800 hover:bg-transparent">
                      <TableHead className="text-neutral-400">Agent Name</TableHead>
                      <TableHead className="text-neutral-400">Contact Name</TableHead>
                      <TableHead className="text-neutral-400">From Number</TableHead>
                      <TableHead className="text-neutral-400">
                        <div className="flex items-center gap-1">
                          Date and Time
                          <ArrowDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-neutral-400">
                        <div className="flex items-center gap-1">
                          Duration
                          <ArrowDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-neutral-400">Actions Triggered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center text-neutral-500">
                          <Phone className="w-12 h-12 mb-3 opacity-50" />
                          <p className="text-lg">No calls to display</p>
                          <p className="text-sm mt-1">
                            Call logs will appear here once agents start making or receiving calls
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
