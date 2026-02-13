"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Phone,
  Users,
  TrendingUp,
  Clock,
  Bot,
  Maximize2,
  Play,
  Pause,
  Download,
  Bell,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneForwarded,
  Eye,
  MessageSquare,
  AlertTriangle,
  Server,
  Database,
  Wifi,
  Activity,
  X,
} from "lucide-react"

// Mock data generators
const generateActiveCalls = (count: number) => {
  const agents = [
    "Agent 1001",
    "Agent 1002",
    "Agent 1003",
    "AI Agent Alpha",
    "AI Agent Beta",
    "Agent 1004",
    "Agent 1005",
  ]
  const contacts = ["John Doe", "Jane Smith", "Bob Johnson", "Sarah Lee", "Mike Wilson", "Emma Davis", "Chris Brown"]
  const campaigns = ["Q4 Sales", "Lead Follow-up", "Customer Retention", "New Product Launch"]
  const statuses = ["Connected & Talking", "On Hold", "Ringing", "In Queue"]
  const types = ["Outbound", "Inbound", "Transfer"]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    duration: Math.floor(Math.random() * 600),
    agent: agents[Math.floor(Math.random() * agents.length)],
    contact: contacts[Math.floor(Math.random() * contacts.length)],
    phone: `(555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    type: types[Math.floor(Math.random() * types.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    campaign: campaigns[Math.floor(Math.random() * campaigns.length)],
    isAI: agents[Math.floor(Math.random() * agents.length)].includes("AI"),
  }))
}

const generateAgents = () => {
  const names = [
    "Sarah Johnson",
    "Mike Chen",
    "Emily Rodriguez",
    "David Kim",
    "Lisa Anderson",
    "Tom Wilson",
    "Anna Martinez",
    "James Lee",
  ]
  const statuses = ["Available", "On Call", "Break", "Offline"]

  return names.map((name, i) => ({
    id: 1001 + i,
    name,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    callDuration: Math.floor(Math.random() * 300),
    contact: "John Doe",
    campaign: "Q4 Sales",
    callsToday: Math.floor(Math.random() * 30),
    talkTime: Math.floor(Math.random() * 180),
  }))
}

export default function RealtimeDashboard() {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(0)
  const [showAlerts, setShowAlerts] = useState(true)

  // Live metrics
  const [activeCalls, setActiveCalls] = useState(47)
  const [agentsOnCall, setAgentsOnCall] = useState(23)
  const [callsThisHour, setCallsThisHour] = useState(234)
  const [avgWaitTime, setAvgWaitTime] = useState(45)
  const [aiAgentsActive, setAiAgentsActive] = useState(15)

  // Live data
  const [calls, setCalls] = useState(generateActiveCalls(12))
  const [agents, setAgents] = useState(generateAgents())
  const [queuedCalls, setQueuedCalls] = useState(5)
  const [recentActivity, setRecentActivity] = useState<string[]>([])

  // Filters
  const [timeRange, setTimeRange] = useState("1 hour")
  const [campaignFilter, setCampaignFilter] = useState("All")
  const [agentFilter, setAgentFilter] = useState("All")
  const [callTypeFilter, setCallTypeFilter] = useState("All")

  // Simulate live updates
  useEffect(() => {
    if (!autoRefresh || isPaused) return

    const interval = setInterval(() => {
      setLastUpdate((prev) => prev + 1)

      // Randomly update metrics
      setActiveCalls((prev) => Math.max(20, Math.min(80, prev + Math.floor(Math.random() * 7) - 3)))
      setAgentsOnCall((prev) => Math.max(15, Math.min(45, prev + Math.floor(Math.random() * 5) - 2)))
      setCallsThisHour((prev) => prev + Math.floor(Math.random() * 3))
      setAvgWaitTime((prev) => Math.max(20, Math.min(120, prev + Math.floor(Math.random() * 11) - 5)))
      setAiAgentsActive((prev) => Math.max(10, Math.min(25, prev + Math.floor(Math.random() * 3) - 1)))

      // Update call durations
      setCalls((prev) =>
        prev.map((call) => ({
          ...call,
          duration: call.duration + 2,
        })),
      )

      // Add random activity
      const activities = [
        "Call completed: John Doe (2m 34s) - Interested",
        "Call started: Jane Smith - Agent 1002",
        "AI qualified lead: Bob Johnson → Transfer to closer",
        "Voicemail left: Sarah Lee",
        "Agent 1005 clocked in",
        'Campaign "Q4 Sales" started',
      ]
      setRecentActivity((prev) => [activities[Math.floor(Math.random() * activities.length)], ...prev.slice(0, 19)])
    }, 2000)

    return () => clearInterval(interval)
  }, [autoRefresh, isPaused])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected & Talking":
        return "bg-green-500"
      case "On Hold":
        return "bg-yellow-500"
      case "Ringing":
        return "bg-red-500"
      case "In Queue":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCallTypeIcon = (type: string) => {
    switch (type) {
      case "Outbound":
        return <PhoneOutgoing className="w-4 h-4" />
      case "Inbound":
        return <PhoneIncoming className="w-4 h-4" />
      case "Transfer":
        return <PhoneForwarded className="w-4 h-4" />
      default:
        return <Phone className="w-4 h-4" />
    }
  }

  const getCallTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Outbound":
        return "bg-orange-500/20 text-orange-500"
      case "Inbound":
        return "bg-blue-500/20 text-blue-500"
      case "Transfer":
        return "bg-purple-500/20 text-purple-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-3 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-orange-500">Real-Time Dashboard</h1>
          </div>
          <p className="text-gray-300 mt-2">Live system activity and performance</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-500 font-medium">Live</span>
          </div>

          <div className="text-sm text-gray-400">
            {isPaused ? "Updates paused" : `Updating every 2 seconds... (${lastUpdate}s)`}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Auto-refresh</span>
            <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
          </div>

          <Button variant="outline" size="sm" onClick={() => setIsPaused(!isPaused)} className="border-gray-700">
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>

          <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-[#1a1a1a] border-gray-800 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Time:</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-[#0a0a0a] border border-gray-700 rounded px-3 py-1.5 text-sm text-gray-200"
            >
              <option>Last 5 min</option>
              <option>Last 15 min</option>
              <option>Last 30 min</option>
              <option>1 hour</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Campaign:</span>
            <select
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
              className="bg-[#0a0a0a] border border-gray-700 rounded px-3 py-1.5 text-sm text-gray-200"
            >
              <option>All</option>
              <option>Q4 Sales</option>
              <option>Lead Follow-up</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Agent:</span>
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="bg-[#0a0a0a] border border-gray-700 rounded px-3 py-1.5 text-sm text-gray-200"
            >
              <option>All</option>
              <option>Available</option>
              <option>On Call</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Type:</span>
            <select
              value={callTypeFilter}
              onChange={(e) => setCallTypeFilter(e.target.value)}
              className="bg-[#0a0a0a] border border-gray-700 rounded px-3 py-1.5 text-sm text-gray-200"
            >
              <option>All</option>
              <option>Inbound</option>
              <option>Outbound</option>
              <option>AI</option>
            </select>
          </div>

          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
          </div>
        </div>
      </Card>

      {/* Alerts Panel */}
      {showAlerts && (
        <Card className="bg-yellow-500/10 border-yellow-500/30 p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-yellow-500">Active Alerts (2)</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-300">⚠️ Queue exceeds threshold (5 calls waiting)</p>
                  <p className="text-sm text-gray-300">⚠️ Average wait time above 2 minutes</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAlerts(false)}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {/* Active Calls */}
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <div className="flex items-start justify-between mb-4">
            <Phone className="w-6 h-6 text-orange-500" />
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-4xl font-bold text-orange-500 mb-2 transition-all duration-300">{activeCalls}</div>
          <p className="text-sm text-gray-400">Active Calls Now</p>
          <p className="text-xs text-gray-500 mt-1">Currently in progress</p>
        </Card>

        {/* Agents On Call */}
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <div className="flex items-start justify-between mb-4">
            <Users className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-4xl font-bold text-green-500 mb-2 transition-all duration-300">{agentsOnCall}/50</div>
          <p className="text-sm text-gray-400">Agents On Call</p>
          <div className="mt-2">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(agentsOnCall / 50) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{Math.round((agentsOnCall / 50) * 100)}% utilization</p>
          </div>
        </Card>

        {/* Calls This Hour */}
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <div className="flex items-start justify-between mb-4">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            <span className="text-xs text-green-500">↑ 12%</span>
          </div>
          <div className="text-4xl font-bold text-blue-500 mb-2 transition-all duration-300">{callsThisHour}</div>
          <p className="text-sm text-gray-400">Calls This Hour</p>
          <p className="text-xs text-gray-500 mt-1">vs last hour</p>
        </Card>

        {/* Average Wait Time */}
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <div className="flex items-start justify-between mb-4">
            <Clock className="w-6 h-6 text-teal-500" />
            <Badge className="bg-green-500/20 text-green-500 text-xs">Good</Badge>
          </div>
          <div className="text-4xl font-bold text-teal-500 mb-2 transition-all duration-300">
            {Math.floor(avgWaitTime / 60)}m {avgWaitTime % 60}s
          </div>
          <p className="text-sm text-gray-400">Avg Wait Time</p>
          <p className="text-xs text-gray-500 mt-1">↓ 15s vs average</p>
        </Card>

        {/* AI Agents Active */}
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <div className="flex items-start justify-between mb-4">
            <Bot className="w-6 h-6 text-purple-500" />
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          </div>
          <div className="text-4xl font-bold text-purple-500 mb-2 transition-all duration-300">{aiAgentsActive}</div>
          <p className="text-sm text-gray-400">AI Agents Active</p>
          <p className="text-xs text-gray-500 mt-1">Handling 32% of calls</p>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (60% - 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Call Board */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-200">Live Call Board</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Sort by:</span>
                  <select className="bg-[#0a0a0a] border border-gray-700 rounded px-2 py-1 text-sm text-gray-200">
                    <option>Duration</option>
                    <option>Agent</option>
                    <option>Status</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto">
              {calls.map((call) => (
                <div
                  key={call.id}
                  className={`p-4 border-b border-gray-800 hover:bg-[#0a0a0a] transition-colors ${
                    call.status === "Connected & Talking" ? "border-l-4 border-l-green-500" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-mono font-bold text-orange-500">
                          {formatDuration(call.duration)}
                        </span>
                        <Badge className={getCallTypeBadgeColor(call.type)}>
                          <span className="flex items-center gap-1">
                            {getCallTypeIcon(call.type)}
                            {call.type}
                          </span>
                        </Badge>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(call.status)}`} />
                        <span className="text-sm text-gray-400">{call.status}</span>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-gray-200">
                          {call.isAI && "🤖 "}
                          {call.agent}
                        </p>
                        <p className="text-sm text-gray-400">
                          {call.contact} - {call.phone}
                        </p>
                        <p className="text-xs text-gray-500">Campaign: {call.campaign}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* System Health */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">System Health</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Server className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-400">Server</p>
                  <p className="text-sm font-medium text-green-500">● Online</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-400">Database</p>
                  <p className="text-sm font-medium text-green-500">● Healthy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-400">WebSocket</p>
                  <p className="text-sm font-medium text-green-500">● Connected</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-400">AI Engine</p>
                  <p className="text-sm font-medium text-green-500">● Running</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-400">Latency</p>
                  <p className="text-sm font-medium text-green-500">45ms</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column (40% - 1 col) */}
        <div className="space-y-6">
          {/* Agent Status Board */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-gray-200">Agent Status</h2>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {agents.slice(0, 6).map((agent) => (
                <div key={agent.id} className="p-4 border-b border-gray-800 hover:bg-[#0a0a0a]">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-200">{agent.name}</p>
                      <p className="text-xs text-gray-500">ID: {agent.id}</p>
                    </div>
                    <Badge
                      className={
                        agent.status === "Available"
                          ? "bg-green-500/20 text-green-500"
                          : agent.status === "On Call"
                            ? "bg-red-500/20 text-red-500"
                            : agent.status === "Break"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-gray-500/20 text-gray-500"
                      }
                    >
                      {agent.status}
                    </Badge>
                  </div>
                  {agent.status === "On Call" && (
                    <div className="text-xs text-gray-400 mb-2">
                      <p>
                        {agent.contact} - {formatDuration(agent.callDuration)}
                      </p>
                      <p>{agent.campaign}</p>
                    </div>
                  )}
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>Calls: {agent.callsToday}</span>
                    <span>
                      Talk: {Math.floor(agent.talkTime / 60)}h {agent.talkTime % 60}m
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Queue Status */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Queue Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Calls waiting:</span>
                <span className="text-sm font-semibold text-orange-500">{queuedCalls}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Avg wait time:</span>
                <span className="text-sm font-semibold text-gray-200">1m 23s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Longest wait:</span>
                <span className="text-sm font-semibold text-red-500">3m 45s</span>
              </div>
            </div>
          </Card>

          {/* Recent Activity Feed */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-gray-200">Recent Activity</h2>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {recentActivity.slice(0, 10).map((activity, i) => (
                <div key={i} className="p-3 border-b border-gray-800 text-sm text-gray-300 hover:bg-[#0a0a0a]">
                  <p>{activity}</p>
                  <p className="text-xs text-gray-500 mt-1">{i * 2}s ago</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Performance */}
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Hourly Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-2 text-gray-400 font-medium">Hour</th>
                  <th className="text-right py-2 text-gray-400 font-medium">Calls</th>
                  <th className="text-right py-2 text-gray-400 font-medium">Answered</th>
                  <th className="text-right py-2 text-gray-400 font-medium">Connect %</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { hour: "8-9 AM", calls: 45, answered: 32, rate: 71 },
                  { hour: "9-10 AM", calls: 67, answered: 48, rate: 72 },
                  { hour: "10-11 AM", calls: 89, answered: 65, rate: 73 },
                  { hour: "Current", calls: 23, answered: 18, rate: 78 },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-800 ${row.hour === "Current" ? "bg-orange-500/10" : ""}`}
                  >
                    <td className="py-2 text-gray-200">{row.hour}</td>
                    <td className="text-right py-2 text-gray-200">{row.calls}</td>
                    <td className="text-right py-2 text-gray-200">{row.answered}</td>
                    <td className="text-right py-2">
                      <span
                        className={
                          row.rate >= 75 ? "text-green-500" : row.rate >= 70 ? "text-yellow-500" : "text-red-500"
                        }
                      >
                        {row.rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Call Outcome Distribution */}
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Call Outcomes</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Connected</span>
                <span className="text-sm font-semibold text-green-500">68%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "68%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Voicemail</span>
                <span className="text-sm font-semibold text-yellow-500">15%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "15%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">No Answer</span>
                <span className="text-sm font-semibold text-gray-400">12%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-full" style={{ width: "12%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Busy</span>
                <span className="text-sm font-semibold text-red-500">5%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "5%" }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
