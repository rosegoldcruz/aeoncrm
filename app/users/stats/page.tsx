"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, UserCheck, Clock, Phone, Download, Search, ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const mockUsers = [
  {
    id: 1,
    name: "John Smith",
    status: "online",
    callsToday: 47,
    talkTime: "4:32:15",
    demosScheduled: 8,
    conversionRate: 17.0,
    lastActivity: "2 min ago",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    status: "online",
    callsToday: 52,
    talkTime: "5:18:42",
    demosScheduled: 12,
    conversionRate: 23.1,
    lastActivity: "5 min ago",
  },
  {
    id: 3,
    name: "Mike Davis",
    status: "away",
    callsToday: 38,
    talkTime: "3:45:20",
    demosScheduled: 6,
    conversionRate: 15.8,
    lastActivity: "15 min ago",
  },
  {
    id: 4,
    name: "Emily Chen",
    status: "online",
    callsToday: 61,
    talkTime: "6:12:33",
    demosScheduled: 15,
    conversionRate: 24.6,
    lastActivity: "1 min ago",
  },
  {
    id: 5,
    name: "David Wilson",
    status: "offline",
    callsToday: 29,
    talkTime: "2:54:18",
    demosScheduled: 4,
    conversionRate: 13.8,
    lastActivity: "2 hours ago",
  },
]

const activityData = [
  { date: "Mon", john: 42, sarah: 48, mike: 35, emily: 58, david: 31 },
  { date: "Tue", john: 45, sarah: 51, mike: 38, emily: 62, david: 28 },
  { date: "Wed", john: 48, sarah: 49, mike: 41, emily: 59, david: 33 },
  { date: "Thu", john: 44, sarah: 53, mike: 36, emily: 64, david: 27 },
  { date: "Fri", john: 47, sarah: 52, mike: 38, emily: 61, david: 29 },
]

const performanceData = [
  { name: "Emily", rate: 24.6 },
  { name: "Sarah", rate: 23.1 },
  { name: "John", rate: 17.0 },
  { name: "Mike", rate: 15.8 },
  { name: "David", rate: 13.8 },
]

export default function UserStatsPage() {
  const [dateRange, setDateRange] = useState("7")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const totalUsers = mockUsers.length
  const activeUsers = mockUsers.filter((u) => u.status === "online").length
  const avgTalkTime = "4:32:45"
  const totalCalls = mockUsers.reduce((sum, u) => sum + u.callsToday, 0)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-neutral-500"
      default:
        return "bg-neutral-500"
    }
  }

  return (
    <div className="min-h-screen bg-black p-3 sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-orange-500">User Statistics</h1>
          <p className="text-neutral-400 text-sm mt-1">User performance and activity metrics</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full sm:w-[180px] bg-neutral-900 border-neutral-800 text-neutral-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900 border-neutral-800">
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-orange-500 hover:bg-orange-600 text-black">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-900 border border-neutral-800 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-orange-500" />
            <span className="text-green-500 text-xs flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12%
            </span>
          </div>
          <div className="text-3xl font-bold text-white">{totalUsers}</div>
          <div className="text-neutral-400 text-sm">Total Users</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-900 border border-neutral-800 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <UserCheck className="w-5 h-5 text-green-500" />
            <span className="text-green-500 text-xs flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8%
            </span>
          </div>
          <div className="text-3xl font-bold text-white">{activeUsers}</div>
          <div className="text-neutral-400 text-sm">Active Users</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-neutral-900 border border-neutral-800 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-red-500 text-xs flex items-center">
              <TrendingDown className="w-3 h-3 mr-1" />
              -3%
            </span>
          </div>
          <div className="text-3xl font-bold text-white">{avgTalkTime}</div>
          <div className="text-neutral-400 text-sm">Avg Talk Time</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-neutral-900 border border-neutral-800 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Phone className="w-5 h-5 text-purple-500" />
            <span className="text-green-500 text-xs flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15%
            </span>
          </div>
          <div className="text-3xl font-bold text-white">{totalCalls}</div>
          <div className="text-neutral-400 text-sm">Total Calls Made</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="text-neutral-400 text-sm mb-2 block">Role</label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="bg-neutral-800 border-neutral-700 text-neutral-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-neutral-400 text-sm mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-neutral-800 border-neutral-700 text-neutral-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="away">Away</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-neutral-400 text-sm mb-2 block">Team</label>
                <Select>
                  <SelectTrigger className="bg-neutral-800 border-neutral-700 text-neutral-200">
                    <SelectValue placeholder="All Teams" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
                    <SelectItem value="all">All Teams</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {/* User Performance Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">User Performance</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-neutral-800 border-neutral-700 text-neutral-200 w-full sm:w-64"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium text-sm">
                      <button
                        onClick={() => handleSort("name")}
                        className="flex items-center gap-1 hover:text-orange-500"
                      >
                        User Name
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium text-sm">Status</th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium text-sm">
                      <button
                        onClick={() => handleSort("calls")}
                        className="flex items-center gap-1 hover:text-orange-500"
                      >
                        Calls Today
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium text-sm">Talk Time</th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium text-sm">Demos</th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium text-sm">
                      <button
                        onClick={() => handleSort("conversion")}
                        className="flex items-center gap-1 hover:text-orange-500"
                      >
                        Conversion
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium text-sm">Last Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-neutral-800 hover:bg-neutral-800/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 text-white">{user.name}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`} />
                          <span className="text-neutral-300 capitalize">{user.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-white">{user.callsToday}</td>
                      <td className="py-3 px-4 text-neutral-300">{user.talkTime}</td>
                      <td className="py-3 px-4 text-white">{user.demosScheduled}</td>
                      <td className="py-3 px-4">
                        <span className="text-green-500 font-medium">{user.conversionRate}%</span>
                      </td>
                      <td className="py-3 px-4 text-neutral-400 text-sm">{user.lastActivity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-800">
              <div className="text-neutral-400 text-sm">Showing 1-5 of 5 users</div>
              <div className="flex items-center gap-2">
                <Select defaultValue="25">
                  <SelectTrigger className="w-full sm:w-[100px] bg-neutral-800 border-neutral-700 text-neutral-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
                    <SelectItem value="25">25 / page</SelectItem>
                    <SelectItem value="50">50 / page</SelectItem>
                    <SelectItem value="100">100 / page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Activity Over Time */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">User Activity Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                  <XAxis dataKey="date" stroke="#a3a3a3" />
                  <YAxis stroke="#a3a3a3" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#171717",
                      border: "1px solid #404040",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="emily" stroke="#f97316" strokeWidth={2} name="Emily" />
                  <Line type="monotone" dataKey="sarah" stroke="#22c55e" strokeWidth={2} name="Sarah" />
                  <Line type="monotone" dataKey="john" stroke="#3b82f6" strokeWidth={2} name="John" />
                  <Line type="monotone" dataKey="mike" stroke="#a855f7" strokeWidth={2} name="Mike" />
                  <Line type="monotone" dataKey="david" stroke="#eab308" strokeWidth={2} name="David" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Distribution */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">Performance Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                  <XAxis dataKey="name" stroke="#a3a3a3" />
                  <YAxis stroke="#a3a3a3" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#171717",
                      border: "1px solid #404040",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="rate" fill="#f97316" name="Conversion Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
