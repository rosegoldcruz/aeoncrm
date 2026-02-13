"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Clock,
  Calendar,
  TrendingUp,
  Users,
  Play,
  Pause,
  Edit2,
  Download,
  Filter,
  X,
  Check,
  AlertCircle,
  MoreVertical,
} from "lucide-react"

export default function TimesheetsPage() {
  const [viewMode, setViewMode] = useState<"agent" | "admin">("agent")
  const [isClockedIn, setIsClockedIn] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showEmployeePanel, setShowEmployeePanel] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"timesheets" | "timeoff">("timesheets")

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isClockedIn) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isClockedIn])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleClockToggle = () => {
    setIsClockedIn(!isClockedIn)
    if (isClockedIn) {
      setElapsedTime(0)
    }
  }

  // Mock data
  const weeklyData = [
    { day: "Monday", date: "Oct 27", clockIn: "09:00 AM", clockOut: "05:30 PM", total: "8h 30m", status: "Approved" },
    { day: "Tuesday", date: "Oct 28", clockIn: "08:45 AM", clockOut: "05:15 PM", total: "8h 30m", status: "Approved" },
    { day: "Wednesday", date: "Oct 29", clockIn: "09:15 AM", clockOut: "06:00 PM", total: "8h 45m", status: "Pending" },
    { day: "Thursday", date: "Oct 30", clockIn: "09:00 AM", clockOut: "--", total: "--", status: "Active" },
  ]

  const timeEntries = [
    {
      id: 1,
      date: "Oct 30, 2025",
      project: "Sales Campaign",
      clockIn: "09:00 AM",
      clockOut: "12:30 PM",
      duration: "3h 30m",
      status: "Active",
    },
    {
      id: 2,
      date: "Oct 29, 2025",
      project: "Lead Follow-up",
      clockIn: "09:15 AM",
      clockOut: "06:00 PM",
      duration: "8h 45m",
      status: "Approved",
    },
    {
      id: 3,
      date: "Oct 28, 2025",
      project: "Training Session",
      clockIn: "08:45 AM",
      clockOut: "05:15 PM",
      duration: "8h 30m",
      status: "Approved",
    },
  ]

  const employeeData = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Agent",
      status: "Clocked In",
      todayHours: "6h 45m",
      weekHours: "32h 15m",
      overtime: "2h 15m",
      lastActivity: "2 min ago",
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Agent",
      status: "Clocked Out",
      todayHours: "8h 30m",
      weekHours: "40h 00m",
      overtime: "0h",
      lastActivity: "1 hour ago",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Team Lead",
      status: "Clocked In",
      todayHours: "7h 15m",
      weekHours: "35h 30m",
      overtime: "3h 30m",
      lastActivity: "Just now",
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Agent",
      status: "On Break",
      todayHours: "4h 20m",
      weekHours: "28h 45m",
      overtime: "0h",
      lastActivity: "15 min ago",
    },
  ]

  const timeOffRequests = [
    {
      id: 1,
      employee: "Sarah Johnson",
      type: "Vacation",
      dates: "Nov 5-9, 2025",
      days: 5,
      status: "Pending",
      submitted: "2 days ago",
    },
    {
      id: 2,
      employee: "Mike Chen",
      type: "Sick Leave",
      dates: "Oct 28, 2025",
      days: 1,
      status: "Approved",
      submitted: "3 days ago",
    },
    {
      id: 3,
      employee: "Emily Rodriguez",
      type: "Personal",
      dates: "Nov 12, 2025",
      days: 1,
      status: "Pending",
      submitted: "1 day ago",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-orange-500">Timesheets</h1>
          <p className="text-neutral-400 text-sm mt-1">User time tracking and attendance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-neutral-900 rounded-lg p-1">
            <button
              onClick={() => setViewMode("agent")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "agent" ? "bg-orange-500 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Agent View
            </button>
            <button
              onClick={() => setViewMode("admin")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "admin" ? "bg-orange-500 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Admin View
            </button>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* AGENT VIEW */}
      {viewMode === "agent" && (
        <div className="space-y-6">
          {/* Clock In/Out Card */}
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-3 h-3 rounded-full ${isClockedIn ? "bg-green-500 animate-pulse" : "bg-neutral-600"}`}
                  />
                  <span className="text-lg font-semibold">{isClockedIn ? "Currently Clocked In" : "Clocked Out"}</span>
                </div>
                <div className="text-5xl font-bold text-orange-500 mb-4">{formatTime(elapsedTime)}</div>
                <Button
                  onClick={handleClockToggle}
                  className={`${
                    isClockedIn ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                  } text-white px-8 py-6 text-lg`}
                >
                  {isClockedIn ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Clock Out
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Clock In
                    </>
                  )}
                </Button>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">32.5</div>
                  <div className="text-sm text-neutral-400">Hours This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">8.5</div>
                  <div className="text-sm text-neutral-400">Hours Today</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">2.5</div>
                  <div className="text-sm text-neutral-400">Overtime</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Weekly Summary */}
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              Weekly Summary
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Day</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Clock In</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Clock Out</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Total Hours</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyData.map((day, idx) => (
                    <tr key={idx} className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-white">{day.day}</td>
                      <td className="py-3 px-4 text-white">{day.date}</td>
                      <td className="py-3 px-4 text-white">{day.clockIn}</td>
                      <td className="py-3 px-4 text-white">{day.clockOut}</td>
                      <td className="py-3 px-4 font-semibold text-white">{day.total}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            day.status === "Approved"
                              ? "bg-green-500/20 text-green-500"
                              : day.status === "Pending"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-blue-500/20 text-blue-500"
                          }`}
                        >
                          {day.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="grid grid-cols-3 gap-6">
            {/* Time Entries List */}
            <Card className="bg-neutral-900 border-neutral-800 p-6 col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  Recent Time Entries
                </h2>
                <div className="flex items-center gap-2">
                  <Input placeholder="Search entries..." className="bg-neutral-800 border-neutral-700 w-64" />
                  <Button variant="outline" size="icon" className="border-neutral-700 bg-transparent">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {timeEntries.map((entry) => (
                  <div key={entry.id} className="bg-neutral-800 rounded-lg p-4 hover:bg-neutral-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold">{entry.date}</span>
                          <span className="text-sm text-neutral-400">•</span>
                          <span className="text-sm text-orange-500">{entry.project}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-neutral-400">
                          <span>In: {entry.clockIn}</span>
                          <span>Out: {entry.clockOut}</span>
                          <span className="font-semibold text-white">{entry.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            entry.status === "Active"
                              ? "bg-blue-500/20 text-blue-500"
                              : "bg-green-500/20 text-green-500"
                          }`}
                        >
                          {entry.status}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowEditModal(true)}
                          className="hover:bg-neutral-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Request Time Off Card */}
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                Time Off
              </h2>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-neutral-400">Request Type</Label>
                  <select className="w-full mt-1 bg-neutral-800 border-neutral-700 rounded-md px-3 py-2">
                    <option>Vacation</option>
                    <option>Sick Leave</option>
                    <option>Personal</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm text-neutral-400">Start Date</Label>
                  <Input type="date" className="mt-1 bg-neutral-800 border-neutral-700" />
                </div>
                <div>
                  <Label className="text-sm text-neutral-400">End Date</Label>
                  <Input type="date" className="mt-1 bg-neutral-800 border-neutral-700" />
                </div>
                <div>
                  <Label className="text-sm text-neutral-400">Reason</Label>
                  <textarea
                    className="w-full mt-1 bg-neutral-800 border-neutral-700 rounded-md px-3 py-2 min-h-[80px]"
                    placeholder="Optional reason..."
                  />
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Submit Request</Button>
                <div className="pt-4 border-t border-neutral-800">
                  <div className="text-sm text-neutral-400 mb-2">Available Balance</div>
                  <div className="flex justify-between text-sm">
                    <span>Vacation:</span>
                    <span className="font-semibold">12 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sick Leave:</span>
                    <span className="font-semibold">5 days</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ADMIN VIEW */}
      {viewMode === "admin" && (
        <div className="space-y-6">
          {/* Metrics Dashboard */}
          <div className="grid grid-cols-4 gap-6">
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-orange-500" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-3xl font-bold">24</div>
              <div className="text-sm text-neutral-400">Employees Clocked In</div>
            </Card>
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-blue-500" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-3xl font-bold">847.5</div>
              <div className="text-sm text-neutral-400">Total Hours This Week</div>
            </Card>
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="text-3xl font-bold">3</div>
              <div className="text-sm text-neutral-400">Pending Approvals</div>
            </Card>
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
              <div className="text-3xl font-bold">5</div>
              <div className="text-sm text-neutral-400">Time Off Requests</div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-neutral-800">
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
          </div>

          {/* Filters Bar */}
          {activeTab === "timesheets" && (
            <Card className="bg-neutral-900 border-neutral-800 p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input placeholder="Search employees..." className="bg-neutral-800 border-neutral-700" />
                </div>
                <select className="bg-neutral-800 border-neutral-700 rounded-md px-3 py-2">
                  <option>All Departments</option>
                  <option>Sales</option>
                  <option>Support</option>
                </select>
                <select className="bg-neutral-800 border-neutral-700 rounded-md px-3 py-2">
                  <option>All Status</option>
                  <option>Clocked In</option>
                  <option>Clocked Out</option>
                  <option>On Break</option>
                </select>
                <select className="bg-neutral-800 border-neutral-700 rounded-md px-3 py-2">
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>This Month</option>
                </select>
              </div>
            </Card>
          )}

          {/* Employee Timesheet Table */}
          {activeTab === "timesheets" && (
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-800">
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Employee</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Today's Hours</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Week Hours</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Overtime</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Last Activity</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.map((employee) => (
                      <tr
                        key={employee.id}
                        className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedEmployee(employee)
                          setShowEmployeePanel(true)
                        }}
                      >
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded" />
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-neutral-400">{employee.role}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              employee.status === "Clocked In"
                                ? "bg-green-500/20 text-green-500"
                                : employee.status === "On Break"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-neutral-700 text-neutral-400"
                            }`}
                          >
                            {employee.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold">{employee.todayHours}</td>
                        <td className="py-3 px-4 font-semibold">{employee.weekHours}</td>
                        <td className="py-3 px-4">
                          <span className={employee.overtime !== "0h" ? "text-orange-500 font-semibold" : ""}>
                            {employee.overtime}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-neutral-400">{employee.lastActivity}</td>
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="hover:bg-neutral-700">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Time Off Requests Table */}
          {activeTab === "timeoff" && (
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-800">
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Employee</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Dates</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Days</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Submitted</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeOffRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors"
                      >
                        <td className="py-3 px-4 font-medium">{request.employee}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500">
                            {request.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">{request.dates}</td>
                        <td className="py-3 px-4">{request.days}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.status === "Approved"
                                ? "bg-green-500/20 text-green-500"
                                : "bg-yellow-500/20 text-yellow-500"
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-neutral-400">{request.submitted}</td>
                        <td className="py-3 px-4">
                          {request.status === "Pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Edit Time Entry Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-neutral-900 border-neutral-800 p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Edit Time Entry</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowEditModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-neutral-400">Date</Label>
                <Input type="date" className="mt-1 bg-neutral-800 border-neutral-700" />
              </div>
              <div>
                <Label className="text-sm text-neutral-400">Project</Label>
                <Input defaultValue="Sales Campaign" className="mt-1 bg-neutral-800 border-neutral-700" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-neutral-400">Clock In</Label>
                  <Input type="time" defaultValue="09:00" className="mt-1 bg-neutral-800 border-neutral-700" />
                </div>
                <div>
                  <Label className="text-sm text-neutral-400">Clock Out</Label>
                  <Input type="time" defaultValue="17:30" className="mt-1 bg-neutral-800 border-neutral-700" />
                </div>
              </div>
              <div>
                <Label className="text-sm text-neutral-400">Notes</Label>
                <textarea
                  className="w-full mt-1 bg-neutral-800 border-neutral-700 rounded-md px-3 py-2 min-h-[80px]"
                  placeholder="Add notes..."
                />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">Save Changes</Button>
                <Button
                  variant="outline"
                  className="flex-1 border-neutral-700 bg-transparent"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Employee Details Slide-out Panel */}
      {showEmployeePanel && selectedEmployee && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowEmployeePanel(false)} />
          <div className="fixed right-0 top-0 h-full w-96 bg-neutral-900 border-l border-neutral-800 z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Employee Details</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowEmployeePanel(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="text-2xl font-bold">{selectedEmployee.name}</div>
                  <div className="text-sm text-neutral-400">{selectedEmployee.role}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedEmployee.status === "Clocked In"
                        ? "bg-green-500/20 text-green-500"
                        : selectedEmployee.status === "On Break"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : "bg-neutral-700 text-neutral-400"
                    }`}
                  >
                    {selectedEmployee.status}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Today's Hours:</span>
                    <span className="font-semibold">{selectedEmployee.todayHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Week Hours:</span>
                    <span className="font-semibold">{selectedEmployee.weekHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Overtime:</span>
                    <span className="font-semibold text-orange-500">{selectedEmployee.overtime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Last Activity:</span>
                    <span className="font-semibold">{selectedEmployee.lastActivity}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-neutral-800">
                  <h4 className="font-semibold mb-3">Recent Activity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Clock In</span>
                      <span>09:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Break Start</span>
                      <span>12:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Break End</span>
                      <span>12:30 PM</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600">View Full History</Button>
                  <Button variant="outline" className="flex-1 border-neutral-700 bg-transparent">
                    Export Data
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
