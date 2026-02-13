"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Settings,
  Search,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash2,
  MoreVertical,
  Filter,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

const users = [
  { id: 1, name: "John Smith", color: "bg-blue-500" },
  { id: 2, name: "Sarah Johnson", color: "bg-green-500" },
  { id: 3, name: "Mike Davis", color: "bg-purple-500" },
  { id: 4, name: "Emily Brown", color: "bg-pink-500" },
]

const appointmentTypes = [
  { id: 1, name: "Office", color: "bg-red-500" },
  { id: 2, name: "IDR MOVING CALL", color: "bg-blue-500" },
  { id: 3, name: "Sales Meeting", color: "bg-pink-500" },
  { id: 4, name: "Demo", color: "bg-blue-400" },
  { id: 5, name: "Chamber Meeting", color: "bg-indigo-500" },
]

const appointments = [
  {
    id: 1,
    title: "Office",
    type: "Office",
    contact: "All Day Event",
    date: "2025-10-15",
    startTime: "00:00",
    endTime: "23:59",
    allDay: true,
    color: "bg-red-500",
    assignedTo: "John Smith",
  },
  {
    id: 2,
    title: "IDR MOVING CALL",
    type: "IDR MOVING CALL",
    contact: "Mike Johnson",
    date: "2025-10-20",
    startTime: "10:00",
    endTime: "11:00",
    color: "bg-blue-500",
    assignedTo: "Sarah Johnson",
  },
  {
    id: 3,
    title: "Sales Meeting",
    type: "Sales Meeting",
    contact: "ABC Corp",
    date: "2025-10-22",
    startTime: "14:00",
    endTime: "15:30",
    color: "bg-pink-500",
    assignedTo: "Mike Davis",
  },
  {
    id: 4,
    title: "Refacekit Demo",
    type: "Demo",
    contact: "Jane Doe",
    date: "2025-10-25",
    startTime: "11:00",
    endTime: "12:00",
    color: "bg-blue-400",
    assignedTo: "Emily Brown",
  },
  {
    id: 5,
    title: "Chamber meeting",
    type: "Chamber Meeting",
    contact: "Local Chamber",
    date: "2025-10-28",
    startTime: "09:00",
    endTime: "10:30",
    color: "bg-indigo-500",
    assignedTo: "John Smith",
  },
]

export default function CalendarsPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)) // October 2025
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [activeTab, setActiveTab] = useState("calendar")
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [visibleUsers, setVisibleUsers] = useState<number[]>(users.map((u) => u.id))

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const getAppointmentsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return appointments.filter((apt) => apt.date === dateStr)
  }

  const toggleUserVisibility = (userId: number) => {
    setVisibleUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const days = getDaysInMonth(currentDate)
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <div className="h-full bg-black text-white">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-900">
        <div className="flex items-center gap-6 px-6 py-3">
          <button
            onClick={() => setActiveTab("calendar")}
            className={`text-sm font-medium pb-3 border-b-2 transition-colors ${
              activeTab === "calendar"
                ? "text-orange-500 border-orange-500"
                : "text-neutral-400 border-transparent hover:text-white"
            }`}
          >
            Calendars
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`text-sm font-medium pb-3 border-b-2 transition-colors ${
              activeTab === "list"
                ? "text-orange-500 border-orange-500"
                : "text-neutral-400 border-transparent hover:text-white"
            }`}
          >
            Appointment List View
          </button>
          <button className="text-sm font-medium pb-3 text-neutral-400 hover:text-white">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-8rem)]">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-neutral-800 bg-neutral-900 p-4 overflow-y-auto">
          {/* Mini Calendar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <button onClick={previousMonth} className="p-1 hover:bg-neutral-800 rounded">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium">{monthName}</span>
              <button onClick={nextMonth} className="p-1 hover:bg-neutral-800 rounded">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                <div key={day} className="text-center text-neutral-500 font-medium">
                  {day}
                </div>
              ))}
              {days.map((day, idx) => (
                <div
                  key={idx}
                  className={`text-center py-1 rounded ${day ? "hover:bg-neutral-800 cursor-pointer" : ""} ${
                    day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()
                      ? "bg-orange-500 text-white"
                      : "text-neutral-400"
                  }`}
                >
                  {day || ""}
                </div>
              ))}
            </div>
          </div>

          {/* Users Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Users</h3>
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={visibleUsers.includes(user.id)}
                    onCheckedChange={() => toggleUserVisibility(user.id)}
                  />
                  <div className={`w-3 h-3 rounded-full ${user.color}`}></div>
                  <span className="text-sm text-neutral-300">{user.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendars Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3">Calendars</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox defaultChecked />
                <span className="text-sm text-neutral-300">Team Calendar</span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox defaultChecked />
                <span className="text-sm text-neutral-300">Personal</span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm text-neutral-300">External</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "calendar" ? (
            <div className="h-full flex flex-col">
              {/* Calendar Controls */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button onClick={previousMonth} className="p-2 hover:bg-neutral-800 rounded">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-neutral-800 rounded">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <h2 className="text-xl font-semibold">{monthName}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToToday}
                    className="border-neutral-700 hover:bg-neutral-800 bg-transparent"
                  >
                    Today
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-neutral-800 rounded-lg p-1">
                    <button
                      onClick={() => setView("month")}
                      className={`px-3 py-1 text-sm rounded ${
                        view === "month" ? "bg-orange-500 text-white" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      Month
                    </button>
                    <button
                      onClick={() => setView("week")}
                      className={`px-3 py-1 text-sm rounded ${
                        view === "week" ? "bg-orange-500 text-white" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      Week
                    </button>
                    <button
                      onClick={() => setView("day")}
                      className={`px-3 py-1 text-sm rounded ${
                        view === "day" ? "bg-orange-500 text-white" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      Day
                    </button>
                  </div>
                  <Button onClick={() => setShowCreateModal(true)} className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    New
                  </Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="flex-1 overflow-auto p-6">
                <div className="grid grid-cols-7 gap-px bg-neutral-800 border border-neutral-800 rounded-lg overflow-hidden">
                  {/* Day headers */}
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                    <div key={day} className="bg-neutral-900 p-3 text-center">
                      <span className="text-sm font-medium text-neutral-400">{day}</span>
                    </div>
                  ))}

                  {/* Calendar days */}
                  {days.map((day, idx) => {
                    const dayAppointments = day ? getAppointmentsForDay(day) : []
                    const isToday =
                      day === new Date().getDate() &&
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear()

                    return (
                      <div
                        key={idx}
                        className={`bg-black min-h-[120px] p-2 ${day ? "hover:bg-neutral-900" : "bg-neutral-950"}`}
                      >
                        {day && (
                          <>
                            <div
                              className={`text-sm font-medium mb-2 ${
                                isToday
                                  ? "w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                                  : "text-neutral-400"
                              }`}
                            >
                              {day}
                            </div>
                            <div className="space-y-1">
                              {dayAppointments.map((apt) => (
                                <button
                                  key={apt.id}
                                  onClick={() => setSelectedAppointment(apt)}
                                  className={`w-full text-left px-2 py-1 rounded text-xs ${apt.color} text-white hover:opacity-80 transition-opacity`}
                                >
                                  <div className="font-medium truncate">{apt.startTime}</div>
                                  <div className="truncate">{apt.title}</div>
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            // List View
            <div className="h-full flex flex-col">
              {/* List Controls */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
                <h2 className="text-xl font-semibold">Appointments</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <Input placeholder="Search appointments..." className="pl-9 bg-neutral-900 border-neutral-800" />
                  </div>
                  <Button variant="outline" size="sm" className="border-neutral-700 bg-transparent">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button onClick={() => setShowCreateModal(true)} className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    New
                  </Button>
                </div>
              </div>

              {/* Appointments Table */}
              <div className="flex-1 overflow-auto">
                <table className="w-full">
                  <thead className="bg-neutral-900 sticky top-0">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-neutral-400">Date & Time</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-400">Contact Name</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-400">Type</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-400">Assigned To</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-400">Duration</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-400">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr
                        key={apt.id}
                        className="border-b border-neutral-800 hover:bg-neutral-900 cursor-pointer"
                        onClick={() => setSelectedAppointment(apt)}
                      >
                        <td className="p-4">
                          <div className="text-sm">{apt.date}</div>
                          <div className="text-xs text-neutral-500">
                            {apt.startTime} - {apt.endTime}
                          </div>
                        </td>
                        <td className="p-4 text-sm">{apt.contact}</td>
                        <td className="p-4">
                          <Badge className={`${apt.color} border-0`}>{apt.type}</Badge>
                        </td>
                        <td className="p-4 text-sm">{apt.assignedTo}</td>
                        <td className="p-4 text-sm">{apt.allDay ? "All Day" : "1h"}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="border-green-500 text-green-500">
                            Scheduled
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Detail Modal */}
      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedAppointment?.title}</DialogTitle>
            <DialogDescription className="text-neutral-400">Appointment Details</DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-neutral-500" />
                <span>
                  {selectedAppointment.date} • {selectedAppointment.startTime} - {selectedAppointment.endTime}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Users className="w-4 h-4 text-neutral-500" />
                <span>{selectedAppointment.contact}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-neutral-500" />
                <span>Virtual Meeting</span>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <h4 className="text-sm font-medium mb-2">Assigned To</h4>
                <p className="text-sm text-neutral-400">{selectedAppointment.assignedTo}</p>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <h4 className="text-sm font-medium mb-2">Type</h4>
                <Badge className={`${selectedAppointment.color} border-0`}>{selectedAppointment.type}</Badge>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" className="flex-1 border-neutral-700 bg-transparent">
                  Reschedule
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Appointment Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Appointment</DialogTitle>
            <DialogDescription className="text-neutral-400">Schedule a new appointment</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Contact</label>
              <Input placeholder="Search or select contact..." className="bg-black border-neutral-800" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Input type="date" className="bg-black border-neutral-800" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Time</label>
                <Input type="time" className="bg-black border-neutral-800" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Duration</label>
                <Select>
                  <SelectTrigger className="bg-black border-neutral-800">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <Select>
                  <SelectTrigger className="bg-black border-neutral-800">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Assigned To</label>
              <Select>
                <SelectTrigger className="bg-black border-neutral-800">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-800">
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.name}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Location / Meeting Link</label>
              <Input placeholder="Enter location or meeting URL..." className="bg-black border-neutral-800" />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Notes</label>
              <Textarea
                placeholder="Add notes about this appointment..."
                className="bg-black border-neutral-800 min-h-[100px]"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={() => setShowCreateModal(false)} variant="outline" className="flex-1 border-neutral-700">
                Cancel
              </Button>
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Appointment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
