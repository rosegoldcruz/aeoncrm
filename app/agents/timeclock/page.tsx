"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Clock,
  Fingerprint,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  Search,
  MoreVertical,
  Edit,
  Trash,
  FileText,
  X,
  Grid,
  List,
  Download,
  Send,
  Check,
  XCircle,
  Coffee,
  MapPin,
  Bell,
  PieChart,
} from "lucide-react"

export default function TimeclockPage() {
  console.log("[v0] TimeclockPage component is rendering")

  const [userRole, setUserRole] = useState<"agent" | "admin">("agent")
  const [isClockedIn, setIsClockedIn] = useState(false)
  const [isOnBreak, setIsOnBreak] = useState(false)
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null)
  const [clockInTime, setClockInTime] = useState<Date | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list" | "calendar">("list")
  const [activeTab, setActiveTab] = useState<"timesheets" | "timeoff" | "reports">("timesheets")
  const [breakType, setBreakType] = useState<"lunch" | "short" | "personal">("short")

  useEffect(() => {
    console.log("[v0] TimeclockPage mounted, userRole:", userRole)
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getElapsedTime = () => {
    if (!clockInTime) return "0h 0m"
    const diff = currentTime.getTime() - clockInTime.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const getBreakElapsedTime = () => {
    if (!breakStartTime) return "0m"
    const diff = currentTime.getTime() - breakStartTime.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    return `${minutes}m`
  }

  const weeklyData = [
    {
      day: "Monday",
      date: "Oct 27",
      clockIn: "9:00 AM",
      clockOut: "5:30 PM",
      total: "8h 30m",
      break: "30m",
      net: "8h",
      status: "Approved",
    },
    {
      day: "Tuesday",
      date: "Oct 28",
      clockIn: "9:15 AM",
      clockOut: "5:45 PM",
      total: "8h 30m",
      break: "30m",
      net: "8h",
      status: "Approved",
    },
    {
      day: "Wednesday",
      date: "Oct 29",
      clockIn: "9:00 AM",
      clockOut: "5:30 PM",
      total: "8h 30m",
      break: "30m",
      net: "8h",
      status: "Pending",
    },
    {
      day: "Thursday",
      date: "Oct 30",
      clockIn: "9:00 AM",
      clockOut: "--",
      total: "5h 30m",
      break: "45m",
      net: "4h 45m",
      status: "Pending",
    },
    {
      day: "Friday",
      date: "Oct 31",
      clockIn: "--",
      clockOut: "--",
      total: "--",
      break: "--",
      net: "--",
      status: "Pending",
    },
  ]

  const employees = [
    {
      id: "1",
      name: "John Smith",
      avatar: "JS",
      status: "Clocked In",
      statusTime: "9:00 AM",
      todayHours: "5h 30m",
      weekTotal: "37h 45m",
      overtime: "2h",
      attendance: 98,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "SJ",
      status: "Clocked Out",
      statusTime: "5:30 PM",
      todayHours: "8h",
      weekTotal: "40h",
      overtime: "0h",
      attendance: 100,
    },
    {
      id: "3",
      name: "Mike Davis",
      avatar: "MD",
      status: "Off Today",
      statusTime: "--",
      todayHours: "--",
      weekTotal: "32h",
      overtime: "0h",
      attendance: 95,
    },
    {
      id: "4",
      name: "Emily Chen",
      avatar: "EC",
      status: "Clocked In",
      statusTime: "8:45 AM",
      todayHours: "6h 15m",
      weekTotal: "38h 30m",
      overtime: "1h",
      attendance: 97,
    },
    {
      id: "5",
      name: "David Wilson",
      avatar: "DW",
      status: "On Break",
      statusTime: "12:30 PM",
      todayHours: "3h 30m",
      weekTotal: "35h",
      overtime: "0h",
      attendance: 92,
    },
  ]

  const timeOffRequests = [
    {
      id: "1",
      employee: "John Smith",
      type: "Vacation",
      dateRange: "Nov 10-12, 2025",
      days: 3,
      reason: "Family trip",
      submitted: "Oct 25, 2025",
    },
    {
      id: "2",
      employee: "Sarah Johnson",
      type: "Sick Leave",
      dateRange: "Nov 5, 2025",
      days: 1,
      reason: "Medical appointment",
      submitted: "Oct 28, 2025",
    },
  ]

  const handleClockToggle = () => {
    if (isClockedIn) {
      setIsClockedIn(false)
      setClockInTime(null)
      setIsOnBreak(false)
      setBreakStartTime(null)
    } else {
      setIsClockedIn(true)
      setClockInTime(new Date())
    }
  }

  const handleBreakToggle = () => {
    if (isOnBreak) {
      setIsOnBreak(false)
      setBreakStartTime(null)
    } else {
      setIsOnBreak(true)
      setBreakStartTime(new Date())
    }
  }

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      Approved: "bg-green-500/20 text-green-400 border-green-500/30",
      Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
      "Clocked In": "bg-green-500/20 text-green-400 border-green-500/30",
      "Clocked Out": "bg-red-500/20 text-red-400 border-red-500/30",
      "On Break": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      "Off Today": "bg-gray-500/20 text-gray-400 border-gray-500/30",
    }
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[status as keyof typeof colors] || colors["Pending"]}`}
      >
        {status}
      </span>
    )
  }

  const AgentView = () => (
    <div className="space-y-6">
      {/* Clock In/Out Card */}
      <Card className="bg-neutral-900 border-white/10 p-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-white mb-2">
              {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
            <div className="text-neutral-400">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full ${isClockedIn ? (isOnBreak ? "bg-yellow-500" : "bg-green-500") : "bg-red-500"} animate-pulse`}
            />
            <span className="text-xl font-semibold text-white">
              {isClockedIn
                ? isOnBreak
                  ? `On ${breakType.charAt(0).toUpperCase() + breakType.slice(1)} Break - ${getBreakElapsedTime()}`
                  : `Currently Clocked In - Started at ${clockInTime?.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`
                : "Currently Clocked Out"}
            </span>
          </div>

          {isClockedIn && (
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <MapPin className="w-4 h-4" />
              <span>Clocked in from Office - Main Location</span>
            </div>
          )}

          {/* Live Timer */}
          {isClockedIn && !isOnBreak && <div className="text-4xl font-bold text-orange-500">{getElapsedTime()}</div>}

          {/* Clock In/Out Button */}
          <Button
            onClick={handleClockToggle}
            className={`w-full sm:w-[200px] h-14 text-lg font-semibold rounded-xl transition-all hover:scale-105 ${
              isClockedIn ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            <Fingerprint className="w-6 h-6 mr-2" />
            {isClockedIn ? "Clock Out" : "Clock In"}
          </Button>

          {isClockedIn && (
            <div className="w-full max-w-md space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <Label className="text-white">Break Type</Label>
                <Select value={breakType} onValueChange={(value: any) => setBreakType(value)} disabled={isOnBreak}>
                  <SelectTrigger className="w-full sm:w-[150px] bg-neutral-800 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-white/10">
                    <SelectItem value="lunch">Lunch Break</SelectItem>
                    <SelectItem value="short">Short Break</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleBreakToggle}
                className={`w-full ${
                  isOnBreak ? "bg-orange-500 hover:bg-orange-600" : "bg-yellow-500 hover:bg-yellow-600"
                } text-white`}
              >
                <Coffee className="w-5 h-5 mr-2" />
                {isOnBreak ? `End Break (${getBreakElapsedTime()})` : "Start Break"}
              </Button>
            </div>
          )}

          {/* Stats Row */}
          <div className="flex gap-8 pt-4 border-t border-white/10 w-full justify-center">
            <div className="text-center">
              <div className="text-sm text-neutral-400">Today's Total</div>
              <div className="text-xl font-bold text-white">5h 30m</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-neutral-400">Break Time</div>
              <div className="text-xl font-bold text-white">45m</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-neutral-400">Net Work Time</div>
              <div className="text-xl font-bold text-white">4h 45m</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-neutral-400">Calls Handled</div>
              <div className="text-xl font-bold text-white">47</div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-neutral-900 border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Today's Summary</h2>
          <PieChart className="w-5 h-5 text-orange-500" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-neutral-400">Work Time</div>
            <div className="text-2xl font-bold text-green-400">4h 45m</div>
            <div className="text-xs text-neutral-500">65% of day</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-neutral-400">Break Time</div>
            <div className="text-2xl font-bold text-yellow-400">45m</div>
            <div className="text-xs text-neutral-500">10% of day</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-neutral-400">Idle Time</div>
            <div className="text-2xl font-bold text-neutral-400">1h 30m</div>
            <div className="text-xs text-neutral-500">20% of day</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-neutral-400">Remaining</div>
            <div className="text-2xl font-bold text-neutral-400">30m</div>
            <div className="text-xs text-neutral-500">5% of day</div>
          </div>
        </div>
      </Card>

      {/* Weekly Summary Table */}
      <Card className="bg-neutral-900 border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Weekly Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Day</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Clock In</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Clock Out</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Total Hours</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Break</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Net Hours</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {weeklyData.map((day, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{day.day}</td>
                  <td className="py-3 px-4 text-neutral-400">{day.date}</td>
                  <td className="py-3 px-4 text-white">{day.clockIn}</td>
                  <td className="py-3 px-4 text-white">{day.clockOut}</td>
                  <td className="py-3 px-4 text-white font-medium">{day.total}</td>
                  <td className="py-3 px-4 text-neutral-400">{day.break}</td>
                  <td className="py-3 px-4 text-white font-medium">{day.net}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={day.status} />
                  </td>
                </tr>
              ))}
              <tr className="bg-white/5 font-bold">
                <td colSpan={4} className="py-3 px-4 text-white">
                  Totals
                </td>
                <td className="py-3 px-4 text-orange-500">40h</td>
                <td className="py-3 px-4 text-orange-500">2h 30m</td>
                <td className="py-3 px-4 text-orange-500">37h 30m</td>
                <td className="py-3 px-4 text-orange-500">0h OT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Time Entries List */}
      <Card className="bg-neutral-900 border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Time Entries</h2>
          <div className="flex gap-3">
            <Select defaultValue="week">
              <SelectTrigger className="w-full sm:w-[150px] bg-neutral-800 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 border-white/10">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="lastweek">Last Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search entries..."
                className="pl-10 bg-neutral-800 border-white/10 text-white w-full sm:w-[250px]"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Clock In</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Clock Out</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Break</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Total</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {weeklyData.slice(0, 3).map((entry, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white">
                    {entry.day}, {entry.date}
                  </td>
                  <td className="py-3 px-4 text-white flex items-center gap-2">
                    {entry.clockIn}
                    <Edit className="w-3 h-3 text-neutral-400 cursor-pointer hover:text-orange-500" />
                  </td>
                  <td className="py-3 px-4 text-white">{entry.clockOut}</td>
                  <td className="py-3 px-4 text-neutral-400">{entry.break}</td>
                  <td className="py-3 px-4 text-white font-medium">{entry.total}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={entry.status} />
                  </td>
                  <td className="py-3 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-neutral-800 border-white/10">
                        <DropdownMenuItem
                          onClick={() => setEditModalOpen(true)}
                          className="text-white hover:bg-white/10"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-white hover:bg-white/10">
                          <FileText className="w-4 h-4 mr-2" />
                          Add Note
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 hover:bg-white/10">
                          <Trash className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Request Time Off Card */}
      <Card className="bg-neutral-900 border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Time Off Requests</h2>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">+ Request Time Off</Button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <div className="text-white font-medium">Nov 10-12, 2025</div>
              <div className="text-sm text-neutral-400">Vacation • 3 days</div>
            </div>
            <StatusBadge status="Pending" />
          </div>
        </div>
      </Card>
    </div>
  )

  const AdminView = () => (
    <div className="space-y-6">
      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-white/10 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-neutral-400 text-sm mb-1">Total Employees</div>
              <div className="text-3xl font-bold text-white">24</div>
              <div className="text-sm text-neutral-500 mt-1">Currently Active</div>
            </div>
            <Users className="w-8 h-8 text-orange-500" />
          </div>
        </Card>

        <Card className="bg-neutral-900 border-white/10 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-neutral-400 text-sm mb-1">Clocked In Now</div>
              <div className="text-3xl font-bold text-green-500">18</div>
              <div className="text-sm text-neutral-500 mt-1">75% of team</div>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
          <div className="flex -space-x-2 mt-3">
            {["JS", "SJ", "MD", "EC"].map((initials, idx) => (
              <div
                key={idx}
                className="w-8 h-8 rounded-full bg-orange-500 border-2 border-neutral-900 flex items-center justify-center text-xs font-bold text-white"
              >
                {initials}
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-neutral-900 border-white/10 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-neutral-400 text-sm mb-1">This Week's Hours</div>
              <div className="text-3xl font-bold text-white">876h</div>
              <div className="text-sm text-green-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />↑ 5% vs last week
              </div>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </Card>

        <Card className="bg-neutral-900 border-white/10 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-neutral-400 text-sm mb-1">Overtime This Week</div>
              <div className="text-3xl font-bold text-white">34h</div>
              <div className="text-sm text-green-400 mt-1 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />↓ 2% vs last week
              </div>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-white/10">
        <button
          onClick={() => setActiveTab("timesheets")}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeTab === "timesheets"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Employee Timesheets
        </button>
        <button
          onClick={() => setActiveTab("timeoff")}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeTab === "timeoff"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Time Off Requests
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`pb-3 px-4 font-medium transition-colors ${
            activeTab === "reports"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Reports & Export
        </button>
      </div>

      {activeTab === "timesheets" ? (
        <>
          {/* Filters Bar */}
          <Card className="bg-neutral-900 border-white/10 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-0 md:min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input placeholder="Search employees..." className="pl-10 bg-neutral-800 border-white/10 text-white" />
              </div>
              <Select defaultValue="all-dept">
                <SelectTrigger className="w-full sm:w-[180px] bg-neutral-800 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-white/10">
                  <SelectItem value="all-dept">All Departments</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-status">
                <SelectTrigger className="w-full sm:w-[150px] bg-neutral-800 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-white/10">
                  <SelectItem value="all-status">All Statuses</SelectItem>
                  <SelectItem value="in">Clocked In</SelectItem>
                  <SelectItem value="out">Clocked Out</SelectItem>
                  <SelectItem value="break">On Break</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`${viewMode === "grid" ? "bg-orange-500 text-white" : "bg-neutral-800 text-neutral-400"} border-white/10`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`${viewMode === "list" ? "bg-orange-500 text-white" : "bg-neutral-800 text-neutral-400"} border-white/10`}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode("calendar")}
                  className={`${viewMode === "calendar" ? "bg-orange-500 text-white" : "bg-neutral-800 text-neutral-400"} border-white/10`}
                >
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Bulk Actions Bar */}
          {selectedEmployees.length > 0 && (
            <Card className="bg-orange-500/20 border-orange-500/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-white font-medium">{selectedEmployees.length} employees selected</span>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                      <Check className="w-4 h-4 mr-2" />
                      Approve Timesheets
                    </Button>
                    <Button size="sm" className="bg-neutral-700 hover:bg-neutral-600 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Export Selected
                    </Button>
                    <Button size="sm" className="bg-neutral-700 hover:bg-neutral-600 text-white">
                      <Send className="w-4 h-4 mr-2" />
                      Send Reminder
                    </Button>
                  </div>
                </div>
                <button onClick={() => setSelectedEmployees([])} className="text-white hover:text-orange-300 underline">
                  Clear Selection
                </button>
              </div>
            </Card>
          )}

          {/* Employee Timesheet Table */}
          <Card className="bg-neutral-900 border-white/10 p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4">
                      <input
                        type="checkbox"
                        className="rounded border-white/20 bg-neutral-800"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEmployees(employees.map((emp) => emp.id))
                          } else {
                            setSelectedEmployees([])
                          }
                        }}
                      />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Employee</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Today's Hours</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Week Total</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Overtime</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Attendance %</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedEmployee(employee)
                        setDetailsPanelOpen(true)
                      }}
                    >
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          className="rounded border-white/20 bg-neutral-800"
                          checked={selectedEmployees.includes(employee.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedEmployees([...selectedEmployees, employee.id])
                            } else {
                              setSelectedEmployees(selectedEmployees.filter((id) => id !== employee.id))
                            }
                          }}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold text-white">
                            {employee.avatar}
                          </div>
                          <span className="text-white font-medium">{employee.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              employee.status === "Clocked In"
                                ? "bg-green-500"
                                : employee.status === "Clocked Out"
                                  ? "bg-red-500"
                                  : employee.status === "On Break"
                                    ? "bg-yellow-500"
                                    : "bg-gray-500"
                            }`}
                          />
                          <div>
                            <div className="text-white text-sm">{employee.status}</div>
                            <div className="text-neutral-400 text-xs">{employee.statusTime}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-white font-medium">{employee.todayHours}</td>
                      <td className="py-3 px-4 text-white font-medium">{employee.weekTotal}</td>
                      <td className="py-3 px-4 text-white">{employee.overtime}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-medium ${
                            employee.attendance >= 95
                              ? "text-green-400"
                              : employee.attendance >= 90
                                ? "text-yellow-400"
                                : "text-red-400"
                          }`}
                        >
                          {employee.attendance}%
                        </span>
                      </td>
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => {
                            setSelectedEmployee(employee)
                            setDetailsPanelOpen(true)
                          }}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {viewMode === "calendar" && (
            <Card className="bg-neutral-900 border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Attendance Calendar - October 2025</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-neutral-400 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const status = day < 28 ? (day % 5 === 0 ? "absent" : day % 7 === 0 ? "partial" : "full") : "future"
                  const colors = {
                    full: "bg-green-500/20 border-green-500/50 text-green-400",
                    partial: "bg-yellow-500/20 border-yellow-500/50 text-yellow-400",
                    absent: "bg-red-500/20 border-red-500/50 text-red-400",
                    future: "bg-neutral-800 border-white/10 text-neutral-500",
                  }
                  return (
                    <div
                      key={day}
                      className={`aspect-square flex items-center justify-center rounded-lg border-2 cursor-pointer hover:scale-105 transition-transform ${colors[status]}`}
                    >
                      <span className="font-semibold">{day}</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex gap-6 mt-6 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500/20 border-2 border-green-500/50" />
                  <span className="text-sm text-neutral-400">Full Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-500/20 border-2 border-yellow-500/50" />
                  <span className="text-sm text-neutral-400">Partial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500/20 border-2 border-red-500/50" />
                  <span className="text-sm text-neutral-400">Absent</span>
                </div>
              </div>
            </Card>
          )}
        </>
      ) : activeTab === "timeoff" ? (
        <Card className="bg-neutral-900 border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Pending Time Off Requests</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Employee</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Date Range</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Days</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Reason</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Submitted</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {timeOffRequests.map((request) => (
                  <tr key={request.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{request.employee}</td>
                    <td className="py-3 px-4 text-white">{request.type}</td>
                    <td className="py-3 px-4 text-white">{request.dateRange}</td>
                    <td className="py-3 px-4 text-white">{request.days}</td>
                    <td className="py-3 px-4 text-neutral-400">{request.reason}</td>
                    <td className="py-3 px-4 text-neutral-400">{request.submitted}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                          <XCircle className="w-4 h-4 mr-1" />
                          Deny
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="bg-neutral-900 border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Payroll Export</h2>
            <p className="text-neutral-400 mb-4">Generate payroll reports for accounting and HR systems</p>
            <div className="flex gap-3">
              <Select defaultValue="week">
                <SelectTrigger className="w-full sm:w-[200px] bg-neutral-800 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-white/10">
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="lastweek">Last Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </Card>

          <Card className="bg-neutral-900 border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Attendance Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-neutral-800 p-4 rounded-lg">
                <div className="text-neutral-400 text-sm">Average Attendance</div>
                <div className="text-3xl font-bold text-white mt-2">96.5%</div>
                <div className="text-sm text-green-400 mt-1">↑ 2% vs last month</div>
              </div>
              <div className="bg-neutral-800 p-4 rounded-lg">
                <div className="text-neutral-400 text-sm">Total Overtime</div>
                <div className="text-3xl font-bold text-white mt-2">142h</div>
                <div className="text-sm text-yellow-400 mt-1">This month</div>
              </div>
              <div className="bg-neutral-800 p-4 rounded-lg">
                <div className="text-neutral-400 text-sm">Late Clock-ins</div>
                <div className="text-3xl font-bold text-white mt-2">8</div>
                <div className="text-sm text-red-400 mt-1">↓ 3 vs last month</div>
              </div>
            </div>
          </Card>

          <Card className="bg-neutral-900 border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Overtime Alerts</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="text-white font-medium">John Smith - Approaching Overtime Limit</div>
                    <div className="text-sm text-neutral-400">38.5h this week (limit: 40h)</div>
                  </div>
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )

  return (
    <div className="p-3 sm:p-6 max-w-[1600px] mx-auto">
      {console.log("[v0] Main container rendering")}
      {/* Header with Role Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-orange-500">Agent Timeclock</h1>
          <p className="text-neutral-400 text-sm mt-1">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            • {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-neutral-800 border-white/10 text-white hover:bg-neutral-700">
            <Download className="w-4 h-4 mr-2" />
            Export Timesheet
          </Button>
          <span className="text-neutral-400 text-sm">View as:</span>
          <div className="flex gap-2 bg-neutral-900 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setUserRole("agent")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                userRole === "agent" ? "bg-orange-500 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Agent
            </button>
            <button
              onClick={() => setUserRole("admin")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                userRole === "admin" ? "bg-orange-500 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Render appropriate view based on role */}
      {userRole === "agent" ? <AgentView /> : <AdminView />}

      {/* Edit Time Entry Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-neutral-900 border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Edit Time Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-neutral-400">Date</Label>
              <Input type="date" className="bg-neutral-800 border-white/10 text-white mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-neutral-400">Clock In</Label>
                <Input type="time" className="bg-neutral-800 border-white/10 text-white mt-1" />
              </div>
              <div>
                <Label className="text-neutral-400">Clock Out</Label>
                <Input type="time" className="bg-neutral-800 border-white/10 text-white mt-1" />
              </div>
            </div>
            <div>
              <Label className="text-neutral-400">Break Duration (minutes)</Label>
              <Input type="number" placeholder="30" className="bg-neutral-800 border-white/10 text-white mt-1" />
            </div>
            <div>
              <Label className="text-neutral-400">Reason for Edit</Label>
              <Select>
                <SelectTrigger className="bg-neutral-800 border-white/10 text-white mt-1">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-white/10">
                  <SelectItem value="forgot">Forgot to clock out</SelectItem>
                  <SelectItem value="error">System error</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-neutral-400">Notes</Label>
              <Textarea
                placeholder="Add any additional notes..."
                className="bg-neutral-800 border-white/10 text-white mt-1 min-h-[80px]"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setEditModalOpen(false)}
                className="flex-1 bg-neutral-800 border-white/10 text-white hover:bg-neutral-700"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setEditModalOpen(false)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Employee Details Slide-out Panel */}
      {detailsPanelOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDetailsPanelOpen(false)} />
          <div className="relative w-full max-w-lg bg-neutral-900 border-l border-white/10 overflow-y-auto animate-in slide-in-from-right">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-xl font-bold text-white">
                    {selectedEmployee.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedEmployee.name}</h2>
                    <p className="text-neutral-400 text-sm">Sales Agent • ID: EMP-{selectedEmployee.id}</p>
                  </div>
                </div>
                <button onClick={() => setDetailsPanelOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Current Status */}
              <Card className="bg-neutral-800 border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      selectedEmployee.status === "Clocked In"
                        ? "bg-green-500 animate-pulse"
                        : selectedEmployee.status === "Clocked Out"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }`}
                  />
                  <div>
                    <div className="text-white font-medium">{selectedEmployee.status}</div>
                    <div className="text-neutral-400 text-sm">{selectedEmployee.statusTime}</div>
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-neutral-800 border-white/10 p-4">
                  <div className="text-neutral-400 text-sm">Today</div>
                  <div className="text-2xl font-bold text-white mt-1">{selectedEmployee.todayHours}</div>
                </Card>
                <Card className="bg-neutral-800 border-white/10 p-4">
                  <div className="text-neutral-400 text-sm">This Week</div>
                  <div className="text-2xl font-bold text-white mt-1">{selectedEmployee.weekTotal}</div>
                </Card>
                <Card className="bg-neutral-800 border-white/10 p-4">
                  <div className="text-neutral-400 text-sm">This Month</div>
                  <div className="text-2xl font-bold text-white mt-1">162h</div>
                </Card>
                <Card className="bg-neutral-800 border-white/10 p-4">
                  <div className="text-neutral-400 text-sm">Year to Date</div>
                  <div className="text-2xl font-bold text-white mt-1">1,847h</div>
                </Card>
              </div>

              {/* Daily Breakdown */}
              <Card className="bg-neutral-800 border-white/10 p-4">
                <h3 className="text-white font-semibold mb-4">This Week</h3>
                <div className="space-y-3">
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, idx) => (
                    <div key={day} className="flex items-center gap-3">
                      <div className="text-neutral-400 text-sm w-8">{day}</div>
                      <div className="flex-1 h-8 bg-neutral-700 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: `${Math.random() * 100}%` }} />
                      </div>
                      <div className="text-white text-sm font-medium w-12">8h</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">Edit Timesheet</Button>
                <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">Approve Week</Button>
              </div>
              <Button
                variant="outline"
                className="w-full bg-neutral-800 border-white/10 text-white hover:bg-neutral-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
