"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  UserCheck,
  Clock,
  Phone,
  TrendingUp,
  TrendingDown,
  Download,
  Search,
  Filter,
  Calendar,
  ArrowUpDown,
} from "lucide-react"
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

const activityData = [
  { date: "Mon", calls: 45, demos: 12, conversions: 8 },
  { date: "Tue", calls: 52, demos: 15, conversions: 10 },
  { date: "Wed", calls: 48, demos: 13, conversions: 9 },
  { date: "Thu", calls: 61, demos: 18, conversions: 12 },
  { date: "Fri", calls: 55, demos: 16, conversions: 11 },
  { date: "Sat", calls: 38, demos: 10, conversions: 7 },
  { date: "Sun", calls: 42, demos: 11, conversions: 8 },
]

const performanceData = [
  { name: "Sarah Johnson", calls: 156, demos: 42, conversions: 28 },
  { name: "Mike Chen", calls: 142, demos: 38, conversions: 25 },
  { name: "Emily Davis", calls: 128, demos: 35, conversions: 22 },
  { name: "James Wilson", calls: 118, demos: 32, conversions: 20 },
  { name: "Lisa Anderson", calls: 105, demos: 28, conversions: 18 },
]

const userData = [
  {
    id: 1,
    name: "Sarah Johnson",
    status: "active",
    callsToday: 23,
    talkTime: "4h 32m",
    demos: 6,
    conversion: "26.1%",
    lastActivity: "2 min ago",
  },
  {
    id: 2,
    name: "Mike Chen",
    status: "active",
    callsToday: 19,
    talkTime: "3h 48m",
    demos: 5,
    conversion: "26.3%",
    lastActivity: "5 min ago",
  },
  {
    id: 3,
    name: "Emily Davis",
    status: "break",
    callsToday: 17,
    talkTime: "3h 15m",
    demos: 4,
    conversion: "23.5%",
    lastActivity: "15 min ago",
  },
  {
    id: 4,
    name: "James Wilson",
    status: "active",
    callsToday: 21,
    talkTime: "4h 05m",
    demos: 5,
    conversion: "23.8%",
    lastActivity: "1 min ago",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    status: "offline",
    callsToday: 15,
    talkTime: "2h 52m",
    demos: 3,
    conversion: "20.0%",
    lastActivity: "1h ago",
  },
]

export default function UserStatisticsPage() {
  const [sortBy, setSortBy] = useState("name")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-black p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-orange-500">User Statistics</h1>
          <p className="text-sm text-neutral-400">Monitor user performance and activity metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2">
            <Calendar className="h-4 w-4 text-neutral-400" />
            <span className="text-sm text-neutral-300">Last 7 Days</span>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-neutral-800 bg-neutral-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Total Users</p>
              <p className="mt-2 text-3xl font-bold text-white">247</p>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-500">
                <TrendingUp className="h-4 w-4" />
                <span>+12.5%</span>
              </div>
            </div>
            <div className="rounded-full bg-orange-500/10 p-3">
              <Users className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </Card>

        <Card className="border-neutral-800 bg-neutral-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Active Users</p>
              <p className="mt-2 text-3xl font-bold text-white">189</p>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-500">
                <TrendingUp className="h-4 w-4" />
                <span>+8.3%</span>
              </div>
            </div>
            <div className="rounded-full bg-green-500/10 p-3">
              <UserCheck className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="border-neutral-800 bg-neutral-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Avg Talk Time</p>
              <p className="mt-2 text-3xl font-bold text-white">3h 42m</p>
              <div className="mt-2 flex items-center gap-1 text-sm text-red-500">
                <TrendingDown className="h-4 w-4" />
                <span>-2.1%</span>
              </div>
            </div>
            <div className="rounded-full bg-blue-500/10 p-3">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="border-neutral-800 bg-neutral-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Total Calls Made</p>
              <p className="mt-2 text-3xl font-bold text-white">4,892</p>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-500">
                <TrendingUp className="h-4 w-4" />
                <span>+15.7%</span>
              </div>
            </div>
            <div className="rounded-full bg-purple-500/10 p-3">
              <Phone className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <Card className="border-neutral-800 bg-neutral-900 p-6 lg:col-span-1">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Filter className="h-5 w-5 text-orange-500" />
            Filters
          </h3>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-neutral-400">Role</label>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="border-neutral-700 bg-neutral-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-neutral-400">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="border-neutral-700 bg-neutral-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="break">On Break</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-neutral-400">Team/Department</label>
              <Select>
                <SelectTrigger className="border-neutral-700 bg-neutral-800">
                  <SelectValue placeholder="All Teams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="outbound">Outbound</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-orange-600 hover:bg-orange-700">Apply Filters</Button>
          </div>
        </Card>

        {/* Main Content */}
        <div className="space-y-6 lg:col-span-3">
          {/* User Performance Table */}
          <Card className="border-neutral-800 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">User Performance</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-neutral-700 bg-neutral-800 pl-9"
                  />
                </div>
                <Button variant="outline" size="sm" className="border-neutral-700 bg-transparent">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800 text-left text-sm text-neutral-400">
                    <th className="pb-3 font-medium">User Name</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Calls Today</th>
                    <th className="pb-3 font-medium">Talk Time</th>
                    <th className="pb-3 font-medium">Demos</th>
                    <th className="pb-3 font-medium">Conversion</th>
                    <th className="pb-3 font-medium">Last Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user) => (
                    <tr key={user.id} className="border-b border-neutral-800 text-sm">
                      <td className="py-3 text-white">{user.name}</td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                            user.status === "active"
                              ? "bg-green-500/10 text-green-500"
                              : user.status === "break"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-neutral-700 text-neutral-400"
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 text-neutral-300">{user.callsToday}</td>
                      <td className="py-3 text-neutral-300">{user.talkTime}</td>
                      <td className="py-3 text-neutral-300">{user.demos}</td>
                      <td className="py-3 text-neutral-300">{user.conversion}</td>
                      <td className="py-3 text-neutral-400">{user.lastActivity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-neutral-800 bg-neutral-900 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">User Activity Over Time</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                  <XAxis dataKey="date" stroke="#737373" />
                  <YAxis stroke="#737373" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#171717",
                      border: "1px solid #404040",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="calls" stroke="#f97316" strokeWidth={2} />
                  <Line type="monotone" dataKey="demos" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="conversions" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="border-neutral-800 bg-neutral-900 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">Performance Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                  <XAxis dataKey="name" stroke="#737373" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#737373" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#171717",
                      border: "1px solid #404040",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="calls" fill="#f97316" />
                  <Bar dataKey="demos" fill="#3b82f6" />
                  <Bar dataKey="conversions" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
