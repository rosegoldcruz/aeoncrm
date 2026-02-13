"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  BarChart3,
  Eye,
  Headphones,
  Mic,
  Radio,
  PhoneOff,
  Coffee,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AgentStatusPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const agents = [
    {
      id: "AGT-2847",
      name: "Alex Martinez",
      avatar: "AM",
      status: "on-call",
      callDuration: 342,
      contact: "Sarah Johnson",
      callType: "outbound",
      callsToday: 24,
      talkTime: "2h 15m",
      lastCall: "Active",
    },
    {
      id: "AGT-1923",
      name: "Emily Chen",
      avatar: "EC",
      status: "available",
      callDuration: 0,
      contact: null,
      callType: null,
      callsToday: 18,
      talkTime: "1h 45m",
      lastCall: "5 min ago",
    },
    {
      id: "AGT-3456",
      name: "Marcus Johnson",
      avatar: "MJ",
      status: "on-call",
      callDuration: 128,
      contact: "Michael Brown",
      callType: "inbound",
      callsToday: 31,
      talkTime: "3h 22m",
      lastCall: "Active",
    },
    {
      id: "AGT-4521",
      name: "Sarah Williams",
      avatar: "SW",
      status: "break",
      callDuration: 0,
      contact: null,
      callType: null,
      callsToday: 22,
      talkTime: "2h 05m",
      breakDuration: 285,
    },
    {
      id: "AGT-5678",
      name: "David Kim",
      avatar: "DK",
      status: "available",
      callDuration: 0,
      contact: null,
      callType: null,
      callsToday: 15,
      talkTime: "1h 30m",
      lastCall: "2 min ago",
    },
    {
      id: "AGT-6789",
      name: "Lisa Anderson",
      avatar: "LA",
      status: "on-call",
      callDuration: 567,
      contact: "Jennifer Davis",
      callType: "outbound",
      callsToday: 28,
      talkTime: "2h 48m",
      lastCall: "Active",
    },
    {
      id: "AGT-7890",
      name: "James Wilson",
      avatar: "JW",
      status: "offline",
      callDuration: 0,
      contact: null,
      callType: null,
      callsToday: 0,
      talkTime: "0h 00m",
      lastCall: "1h 15m ago",
    },
    {
      id: "AGT-8901",
      name: "Maria Garcia",
      avatar: "MG",
      status: "available",
      callDuration: 0,
      contact: null,
      callType: null,
      callsToday: 20,
      talkTime: "1h 55m",
      lastCall: "8 min ago",
    },
  ]

  const [agentTimers, setAgentTimers] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const initialTimers: { [key: string]: number } = {}
    agents.forEach((agent) => {
      if (agent.status === "on-call") {
        initialTimers[agent.id] = agent.callDuration
      } else if (agent.status === "break" && agent.breakDuration) {
        initialTimers[agent.id] = agent.breakDuration
      }
    })
    setAgentTimers(initialTimers)

    const timer = setInterval(() => {
      setAgentTimers((prev) => {
        const updated = { ...prev }
        agents.forEach((agent) => {
          if (agent.status === "on-call" || agent.status === "break") {
            updated[agent.id] = (updated[agent.id] || 0) + 1
          }
        })
        return updated
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "on-call":
        return "bg-red-500"
      case "break":
        return "bg-yellow-500"
      case "offline":
        return "bg-neutral-500"
      default:
        return "bg-neutral-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Available"
      case "on-call":
        return "On Call"
      case "break":
        return "Break"
      case "offline":
        return "Offline"
      default:
        return status
    }
  }

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || agent.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "status":
        return a.status.localeCompare(b.status)
      case "calls":
        return b.callsToday - a.callsToday
      case "duration":
        return (agentTimers[b.id] || 0) - (agentTimers[a.id] || 0)
      default:
        return 0
    }
  })

  const totalAgents = agents.length
  const activeAgents = agents.filter((a) => a.status !== "offline").length
  const onCallCount = agents.filter((a) => a.status === "on-call").length
  const availableCount = agents.filter((a) => a.status === "available").length
  const avgHandleTime = 456

  const activeCalls = agents.filter((a) => a.status === "on-call")

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-orange-500 mb-2">Agent Status Board</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-green-500 font-semibold">System Online</span>
              </div>
              <div className="h-4 w-px bg-neutral-700"></div>
              <span className="text-sm text-neutral-400">
                {totalAgents} Total Agents • {activeAgents} Active
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 rounded-lg p-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              placeholder="Search by agent name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-neutral-800 border-neutral-700 text-white"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 bg-neutral-800 border-neutral-700 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700">
              <SelectItem value="all" className="text-white">
                All Status
              </SelectItem>
              <SelectItem value="available" className="text-white">
                Available
              </SelectItem>
              <SelectItem value="on-call" className="text-white">
                On Call
              </SelectItem>
              <SelectItem value="break" className="text-white">
                Break
              </SelectItem>
              <SelectItem value="offline" className="text-white">
                Offline
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-neutral-800 border-neutral-700 text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700">
              <SelectItem value="name" className="text-white">
                Name
              </SelectItem>
              <SelectItem value="status" className="text-white">
                Status
              </SelectItem>
              <SelectItem value="calls" className="text-white">
                Calls Today
              </SelectItem>
              <SelectItem value="duration" className="text-white">
                Duration
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-neutral-900 border-neutral-800 p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-orange-500" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{totalAgents}</div>
          <div className="text-sm text-neutral-400">Total Agents</div>
          <div className="text-xs text-green-500 mt-2">{activeAgents} currently active</div>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800 p-6">
          <div className="flex items-center justify-between mb-2">
            <PhoneCall className="w-8 h-8 text-red-500" />
            <div className="text-sm text-neutral-400">{Math.round((onCallCount / totalAgents) * 100)}%</div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{onCallCount}</div>
          <div className="text-sm text-neutral-400">On Calls</div>
          <div className="text-xs text-orange-500 mt-2">Utilization rate</div>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800 p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-blue-500" />
            <TrendingDown className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{formatTime(avgHandleTime)}</div>
          <div className="text-sm text-neutral-400">Avg Handle Time</div>
          <div className="text-xs text-green-500 mt-2">-12% from yesterday</div>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800 p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
            <div className="text-sm text-neutral-400">{Math.round((availableCount / totalAgents) * 100)}%</div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{availableCount}</div>
          <div className="text-sm text-neutral-400">Available Now</div>
          <div className="text-xs text-green-500 mt-2">Ready to take calls</div>
        </Card>
      </div>

      <div className="flex gap-6">
        {/* Agent Status Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAgents.map((agent) => (
              <Card
                key={agent.id}
                className={`bg-neutral-900 border-neutral-800 p-6 hover:border-orange-500/50 transition-all cursor-pointer ${
                  agent.status === "on-call" ? "ring-2 ring-red-500/20 animate-pulse" : ""
                }`}
                onClick={() => setSelectedAgent(agent.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">
                      {agent.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                      <p className="text-xs text-neutral-400">{agent.id}</p>
                    </div>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)} ${agent.status === "on-call" ? "animate-pulse" : ""}`}
                  ></div>
                </div>

                <div className="mb-4">
                  <Badge
                    className={`${
                      agent.status === "available"
                        ? "bg-green-500/20 text-green-500 border-green-500/50"
                        : agent.status === "on-call"
                          ? "bg-red-500/20 text-red-500 border-red-500/50"
                          : agent.status === "break"
                            ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
                            : "bg-neutral-500/20 text-neutral-500 border-neutral-500/50"
                    } border`}
                  >
                    {getStatusLabel(agent.status)}
                  </Badge>
                </div>

                {agent.status === "on-call" && agent.contact && (
                  <div className="bg-neutral-800 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {agent.callType === "inbound" ? (
                          <PhoneIncoming className="w-4 h-4 text-green-500" />
                        ) : (
                          <PhoneOutgoing className="w-4 h-4 text-blue-500" />
                        )}
                        <span className="text-sm font-semibold text-white">{agent.contact}</span>
                      </div>
                    </div>
                    <div className="text-2xl font-mono font-bold text-orange-500">
                      {formatTime(agentTimers[agent.id] || 0)}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">Call in progress</div>
                  </div>
                )}

                {agent.status === "break" && (
                  <div className="bg-neutral-800 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Coffee className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-semibold text-white">On Break</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-yellow-500">
                      {formatTime(agentTimers[agent.id] || 0)}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">Break duration</div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-neutral-800 rounded-lg p-3">
                    <div className="text-xs text-neutral-400 mb-1">Calls Today</div>
                    <div className="text-xl font-bold text-white">{agent.callsToday}</div>
                  </div>
                  <div className="bg-neutral-800 rounded-lg p-3">
                    <div className="text-xs text-neutral-400 mb-1">Talk Time</div>
                    <div className="text-xl font-bold text-white">{agent.talkTime}</div>
                  </div>
                </div>

                <div className="text-xs text-neutral-400 mb-4">
                  Last call: <span className="text-white">{agent.lastCall}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-neutral-700 text-white hover:bg-neutral-800 bg-transparent"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Message
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-neutral-700 text-white hover:bg-neutral-800 bg-transparent"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar - Active Calls Detail */}
        <div className="w-80">
          <Card className="bg-neutral-900 border-neutral-800 p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-6">
              <Radio className="w-5 h-5 text-orange-500 animate-pulse" />
              <h3 className="text-lg font-semibold text-white">Active Calls</h3>
              <Badge className="bg-red-500/20 text-red-500 border-red-500/50 border ml-auto">
                {activeCalls.length} Live
              </Badge>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {activeCalls.map((agent) => (
                <div key={agent.id} className="bg-neutral-800 rounded-lg p-4 border border-red-500/30">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm font-semibold text-white mb-1">{agent.name}</div>
                      <div className="text-xs text-neutral-400">{agent.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-mono font-bold text-orange-500">
                        {formatTime(agentTimers[agent.id] || 0)}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {agent.callType === "inbound" ? (
                          <PhoneIncoming className="w-3 h-3 text-green-500" />
                        ) : (
                          <PhoneOutgoing className="w-3 h-3 text-blue-500" />
                        )}
                        <span className="text-xs text-neutral-400 capitalize">{agent.callType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-900 rounded p-2 mb-3">
                    <div className="text-xs text-neutral-400 mb-1">Contact</div>
                    <div className="text-sm text-white font-semibold">{agent.contact}</div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-neutral-700 text-white hover:bg-neutral-800 bg-transparent text-xs"
                    >
                      <Headphones className="w-3 h-3 mr-1" />
                      Listen
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-neutral-700 text-white hover:bg-neutral-800 bg-transparent text-xs"
                    >
                      <Mic className="w-3 h-3 mr-1" />
                      Whisper
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-neutral-700 text-white hover:bg-neutral-800 bg-transparent text-xs"
                    >
                      <PhoneCall className="w-3 h-3 mr-1" />
                      Barge
                    </Button>
                  </div>
                </div>
              ))}

              {activeCalls.length === 0 && (
                <div className="text-center py-12">
                  <PhoneOff className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                  <p className="text-sm text-neutral-400">No active calls</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
