"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, Phone, Video, MapPin, Search, Plus, MoreVertical, Users, RefreshCw } from "lucide-react"

// Mock data
const mockAppointments = [
  {
    id: 1,
    date: "2025-11-01",
    time: "2:30 PM - 3:00 PM",
    duration: "30 min",
    title: "Sales Call - Initial Consultation",
    contactName: "John Smith",
    phone: "(555) 123-4567",
    email: "john.smith@example.com",
    agent: "Sarah Johnson",
    type: "phone",
    status: "confirmed",
    notes: "Interested in enterprise package. Follow up on pricing details.",
  },
  {
    id: 2,
    date: "2025-11-01",
    time: "4:00 PM - 4:30 PM",
    duration: "30 min",
    title: "Product Demo",
    contactName: "Emily Davis",
    phone: "(555) 234-5678",
    email: "emily.davis@example.com",
    agent: "Mike Chen",
    type: "video",
    status: "pending",
    notes: "Requested demo of analytics dashboard features.",
  },
  {
    id: 3,
    date: "2025-11-02",
    time: "10:00 AM - 10:45 AM",
    duration: "45 min",
    title: "Follow-up Meeting",
    contactName: "Robert Wilson",
    phone: "(555) 345-6789",
    email: "robert.wilson@example.com",
    agent: "Sarah Johnson",
    type: "in-person",
    status: "confirmed",
    notes: "Discuss contract terms and implementation timeline.",
  },
  {
    id: 4,
    date: "2025-11-02",
    time: "2:00 PM - 2:30 PM",
    duration: "30 min",
    title: "Consultation Call",
    contactName: "Lisa Anderson",
    phone: "(555) 456-7890",
    email: "lisa.anderson@example.com",
    agent: "Mike Chen",
    type: "phone",
    status: "completed",
    notes: "Successfully closed deal. Moving to onboarding phase.",
  },
  {
    id: 5,
    date: "2025-10-31",
    time: "3:00 PM - 3:30 PM",
    duration: "30 min",
    title: "Sales Call",
    contactName: "David Brown",
    phone: "(555) 567-8901",
    email: "david.brown@example.com",
    agent: "Sarah Johnson",
    type: "phone",
    status: "no-show",
    notes: "Did not answer call. Need to reschedule.",
  },
]

export default function AppointmentsPage() {
  const [selectedAppointment, setSelectedAppointment] = useState<(typeof mockAppointments)[0] | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "calendar" | "timeline">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "no-show":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "phone":
        return <Phone className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "in-person":
        return <MapPin className="h-4 w-4" />
      default:
        return <Phone className="h-4 w-4" />
    }
  }

  const filteredAppointments = mockAppointments.filter((apt) => {
    const matchesSearch =
      apt.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.includes(searchQuery) ||
      apt.notes.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter
    const matchesType = typeFilter === "all" || apt.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: mockAppointments.length,
    upcoming: mockAppointments.filter((a) => a.status === "confirmed" || a.status === "pending").length,
    completed: mockAppointments.filter((a) => a.status === "completed").length,
    noShows: mockAppointments.filter((a) => a.status === "no-show").length,
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-4xl font-bold text-orange-500 mb-2">Appointments</h1>
            <p className="text-gray-400">View and manage all scheduled appointments</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800 bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Calendar
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="text-gray-400 text-sm mb-1">Total Appointments</div>
          <div className="text-3xl font-bold text-orange-500">{stats.total}</div>
        </Card>
        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="text-gray-400 text-sm mb-1">Upcoming</div>
          <div className="text-3xl font-bold text-green-400">{stats.upcoming}</div>
        </Card>
        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="text-gray-400 text-sm mb-1">Completed Today</div>
          <div className="text-3xl font-bold text-blue-400">{stats.completed}</div>
        </Card>
        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="text-gray-400 text-sm mb-1">No-Shows</div>
          <div className="text-3xl font-bold text-red-400">
            {stats.noShows}{" "}
            <span className="text-sm text-gray-400">({((stats.noShows / stats.total) * 100).toFixed(0)}%)</span>
          </div>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="bg-[#1a1a1a] border-gray-800 p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by contact name, phone, or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0a0a0a] border-gray-700 focus:border-orange-500"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-[#0a0a0a] border-gray-700">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-gray-700">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="no-show">No-Show</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px] bg-[#0a0a0a] border-gray-700">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-gray-700">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="phone">Phone Call</SelectItem>
              <SelectItem value="video">Video Call</SelectItem>
              <SelectItem value="in-person">In-Person</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2 border-l border-gray-700 pl-4">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-orange-500 hover:bg-orange-600" : "border-gray-700"}
            >
              List
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className={viewMode === "calendar" ? "bg-orange-500 hover:bg-orange-600" : "border-gray-700"}
            >
              Calendar
            </Button>
            <Button
              variant={viewMode === "timeline" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("timeline")}
              className={viewMode === "timeline" ? "bg-orange-500 hover:bg-orange-600" : "border-gray-700"}
            >
              Timeline
            </Button>
          </div>
        </div>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <Card className="bg-[#1a1a1a] border-gray-800 p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No appointments found</h3>
            <p className="text-gray-500 mb-4">Create your first appointment or adjust your filters</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </Card>
        ) : (
          filteredAppointments.map((appointment) => (
            <Card
              key={appointment.id}
              className="bg-[#1a1a1a] border-gray-800 hover:border-orange-500/50 transition-all cursor-pointer p-6"
              onClick={() => setSelectedAppointment(appointment)}
            >
              <div className="flex items-start gap-6">
                {/* Date Badge */}
                <div className="flex-shrink-0 text-center bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-lg p-4 min-w-[100px]">
                  <div className="text-orange-400 text-sm font-medium">
                    {new Date(appointment.date).toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div className="text-3xl font-bold text-white">{new Date(appointment.date).getDate()}</div>
                  <div className="text-orange-400 text-sm">
                    {new Date(appointment.date).toLocaleDateString("en-US", { month: "short" })}
                  </div>
                  <div className="mt-2 pt-2 border-t border-orange-500/30">
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      {appointment.duration}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{appointment.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="h-4 w-4" />
                        {appointment.time}
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(appointment.status)} border`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Contact</div>
                      <div className="text-white font-medium">{appointment.contactName}</div>
                      <div className="text-sm text-gray-400">{appointment.phone}</div>
                      <div className="text-sm text-gray-400">{appointment.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Assigned To</div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                          <Users className="h-4 w-4 text-orange-400" />
                        </div>
                        <span className="text-white font-medium">{appointment.agent}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                        {getTypeIcon(appointment.type)}
                        <span className="capitalize">{appointment.type.replace("-", " ")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0a] rounded-lg p-3 mb-3">
                    <div className="text-sm text-gray-400 mb-1">Notes</div>
                    <div className="text-sm text-gray-300">{appointment.notes}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {appointment.status === "confirmed" && (
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      Start Call
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-800 bg-transparent">
                    Reschedule
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-800 bg-transparent">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#1a1a1a] border-gray-700">
                      <DropdownMenuItem className="hover:bg-gray-800">Edit Details</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-800">Send Reminder</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-800">Mark Complete</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-800">Mark No-Show</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-800 text-red-400">Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Appointment Detail Modal */}
      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-orange-500">Appointment Details</DialogTitle>
            <DialogDescription className="text-gray-400">Full information for this appointment</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Title</div>
                  <div className="text-white font-medium">{selectedAppointment.title}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Status</div>
                  <Badge className={`${getStatusColor(selectedAppointment.status)} border`}>
                    {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Date & Time</div>
                  <div className="text-white">{selectedAppointment.date}</div>
                  <div className="text-gray-400 text-sm">{selectedAppointment.time}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Duration</div>
                  <div className="text-white">{selectedAppointment.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Contact Name</div>
                  <div className="text-white">{selectedAppointment.contactName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Phone</div>
                  <div className="text-white">{selectedAppointment.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Email</div>
                  <div className="text-white">{selectedAppointment.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Assigned Agent</div>
                  <div className="text-white">{selectedAppointment.agent}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Type</div>
                  <div className="flex items-center gap-2 text-white">
                    {getTypeIcon(selectedAppointment.type)}
                    <span className="capitalize">{selectedAppointment.type.replace("-", " ")}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Notes</div>
                <div className="bg-[#0a0a0a] rounded-lg p-4 text-gray-300">{selectedAppointment.notes}</div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Start Call
                </Button>
                <Button variant="outline" className="flex-1 border-gray-700 hover:bg-gray-800 bg-transparent">
                  Reschedule
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800 bg-transparent">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
