"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Search,
  Users,
  Phone,
  Clock,
  Target,
  Star,
  TrendingUp,
  TrendingDown,
  Play,
  MessageSquare,
  FileText,
  ChevronDown,
} from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data
const agentData = [
  {
    rank: 1,
    id: "1001",
    name: "Sarah Johnson",
    status: "online",
    calls: 156,
    connected: 112,
    connectRate: 72,
    voicemail: 28,
    talkTime: "9h 45m",
    avgDuration: "5m 12s",
    conversions: 34,
    convRate: 30,
    csat: 4.8,
  },
  {
    rank: 2,
    id: "1002",
    name: "Michael Chen",
    status: "offline",
    calls: 142,
    connected: 98,
    connectRate: 69,
    voicemail: 32,
    talkTime: "8h 23m",
    avgDuration: "5m 02s",
    conversions: 28,
    convRate: 28,
    csat: 4.6,
  },
  {
    rank: 3,
    id: "1003",
    name: "Emily Rodriguez",
    status: "online",
    calls: 134,
    connected: 89,
    connectRate: 66,
    voicemail: 31,
    talkTime: "7h 56m",
    avgDuration: "4m 48s",
    conversions: 25,
    convRate: 28,
    csat: 4.5,
  },
  {
    rank: 4,
    id: "1004",
    name: "David Kim",
    status: "busy",
    calls: 128,
    connected: 85,
    connectRate: 66,
    voicemail: 29,
    talkTime: "7h 34m",
    avgDuration: "4m 55s",
    conversions: 23,
    convRate: 27,
    csat: 4.4,
  },
  {
    rank: 5,
    id: "1005",
    name: "Jessica Martinez",
    status: "online",
    calls: 125,
    connected: 82,
    connectRate: 66,
    voicemail: 28,
    talkTime: "7h 18m",
    avgDuration: "4m 42s",
    conversions: 22,
    convRate: 26,
    csat: 4.3,
  },
]

const performanceData = [
  { metric: "Call Volume", teamAvg: 80, topPerformer: 95, target: 85 },
  { metric: "Connect Rate", teamAvg: 70, topPerformer: 85, target: 75 },
  { metric: "Conversion", teamAvg: 65, topPerformer: 90, target: 70 },
  { metric: "Handle Time", teamAvg: 75, topPerformer: 80, target: 80 },
  { metric: "CSAT", teamAvg: 85, topPerformer: 95, target: 90 },
  { metric: "Response Time", teamAvg: 70, topPerformer: 88, target: 75 },
]

const callVolumeData = agentData.map((a) => ({ name: a.name, calls: a.calls }))
const conversionData = agentData.map((a) => ({ name: a.name, rate: a.convRate, target: 25 }))

const timeAllocationData = [
  { name: "Talk Time", value: 60, color: "#10b981" },
  { name: "Wrap-up", value: 15, color: "#f59e0b" },
  { name: "Available", value: 15, color: "#3b82f6" },
  { name: "Break", value: 8, color: "#FF6B35" },
  { name: "Other", value: 2, color: "#6b7280" },
]

const hourlyData = Array.from({ length: 9 }, (_, i) => ({
  hour: `${i + 9}:00`,
  calls: Math.floor(Math.random() * 30) + 10,
  conversions: Math.floor(Math.random() * 10) + 2,
}))

const callHistory = [
  {
    date: "Nov 1, 2:34p",
    contact: "John Doe",
    phone: "(555)123-4567",
    type: "Out",
    duration: "5m 23s",
    outcome: "Interested",
    notes: "Follow up next week",
  },
  {
    date: "Nov 1, 2:15p",
    contact: "Jane Smith",
    phone: "(555)234-5678",
    type: "In",
    duration: "3m 45s",
    outcome: "Callback",
    notes: "Requested callback tomorrow",
  },
  {
    date: "Nov 1, 1:58p",
    contact: "Bob Wilson",
    phone: "(555)345-6789",
    type: "Out",
    duration: "7m 12s",
    outcome: "Converted",
    notes: "Signed up for premium",
  },
  {
    date: "Nov 1, 1:42p",
    contact: "Alice Brown",
    phone: "(555)456-7890",
    type: "Out",
    duration: "2m 34s",
    outcome: "Not Interested",
    notes: "Do not call again",
  },
]

export default function AgentReportPage() {
  const [dateRange, setDateRange] = useState("last7")
  const [compareMode, setCompareMode] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState(agentData[0])
  const [selectedAgents, setSelectedAgents] = useState<typeof agentData>([])

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-orange-500 mb-1">Agent Performance Reports</h1>
            <p className="text-gray-300 text-base">Detailed agent statistics and analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-gray-700 text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-gray-700">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7">Last 7 Days</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-[#1a1a1a] border-gray-700 text-gray-200 hover:bg-[#2a2a2a]">
              <Download className="w-4 h-4 mr-2" />
              Export
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant={compareMode ? "default" : "outline"}
              className={
                compareMode
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-[#1a1a1a] border-gray-700 text-gray-200 hover:bg-[#2a2a2a]"
              }
              onClick={() => setCompareMode(!compareMode)}
            >
              Compare Agents
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="bg-[#1a1a1a] border-gray-800 p-4 mb-6">
        <div className="grid grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search agents..." className="pl-10 bg-[#0a0a0a] border-gray-700 text-gray-200" />
          </div>
          <Select defaultValue="all-teams">
            <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-gray-700">
              <SelectItem value="all-teams">All Teams</SelectItem>
              <SelectItem value="sales">Sales Team</SelectItem>
              <SelectItem value="support">Support Team</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-campaigns">
            <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-gray-700">
              <SelectItem value="all-campaigns">All Campaigns</SelectItem>
              <SelectItem value="campaign1">Campaign 1</SelectItem>
              <SelectItem value="campaign2">Campaign 2</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="individual">
            <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-gray-700">
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="team">Team</SelectItem>
              <SelectItem value="department">Department</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="calls">
            <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-gray-700">
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="calls">Sort by Calls</SelectItem>
              <SelectItem value="duration">Sort by Duration</SelectItem>
              <SelectItem value="conversions">Sort by Conversions</SelectItem>
              <SelectItem value="rating">Sort by Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-sm text-gray-400">Total Agents</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">50</div>
          <div className="text-sm text-gray-400">
            Active today: <span className="text-green-500">42 (84%)</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Avg per agent: 47 calls</div>
        </Card>

        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Phone className="w-5 h-5 text-orange-500" />
            </div>
            <span className="text-sm text-gray-400">Total Calls</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">2,347</div>
          <div className="flex items-center gap-1 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            15% vs previous
          </div>
          <div className="text-xs text-gray-500 mt-1">68% connected</div>
        </Card>

        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-teal-500/10 rounded-lg">
              <Clock className="w-5 h-5 text-teal-500" />
            </div>
            <span className="text-sm text-gray-400">Avg Handle Time</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">4m 32s</div>
          <div className="flex items-center gap-1 text-sm text-green-500">
            <TrendingDown className="w-4 h-4" />
            12s vs average
          </div>
          <div className="text-xs text-gray-500 mt-1">Range: 2m - 8m</div>
        </Card>

        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Target className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-sm text-gray-400">Conversion Rate</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">24.5%</div>
          <div className="flex items-center gap-1 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            3.2% vs target
          </div>
          <div className="text-xs text-gray-500 mt-1">Total: 575 conversions</div>
        </Card>

        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <span className="text-sm text-gray-400">Customer Satisfaction</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">4.3/5.0</div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            ))}
            <Star className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="text-xs text-gray-500 mt-1">423 ratings</div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-[#1a1a1a] border-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500">
            Overview
          </TabsTrigger>
          <TabsTrigger value="individual" className="data-[state=active]:bg-orange-500">
            Individual Deep Dive
          </TabsTrigger>
          <TabsTrigger value="comparison" className="data-[state=active]:bg-orange-500">
            Team Comparison
          </TabsTrigger>
          <TabsTrigger value="time" className="data-[state=active]:bg-orange-500">
            Time Analysis
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent value="overview" className="space-y-6">
          {/* Agent Leaderboard */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Agent Leaderboard</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Rank</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Agent</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Calls</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Connected</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">VM</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Talk Time</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Avg Duration</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Conversions</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Conv %</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">CSAT</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agentData.map((agent) => (
                    <tr key={agent.id} className="border-b border-gray-800 hover:bg-[#2a2a2a] transition-colors">
                      <td className="py-3 px-4">
                        <span className="text-2xl">
                          {agent.rank === 1 ? "🥇" : agent.rank === 2 ? "🥈" : agent.rank === 3 ? "🥉" : agent.rank}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-white">{agent.name}</div>
                        <div className="text-xs text-gray-500">ID: {agent.id}</div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={
                            agent.status === "online"
                              ? "border-green-500 text-green-500"
                              : agent.status === "busy"
                                ? "border-yellow-500 text-yellow-500"
                                : "border-gray-500 text-gray-500"
                          }
                        >
                          {agent.status === "online" ? "🟢" : agent.status === "busy" ? "🟡" : "🔴"} {agent.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-white font-medium">{agent.calls}</td>
                      <td className="py-3 px-4">
                        <div className="text-white">{agent.connected}</div>
                        <div className="text-xs text-gray-500">({agent.connectRate}%)</div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{agent.voicemail}</td>
                      <td className="py-3 px-4 text-gray-300">{agent.talkTime}</td>
                      <td className="py-3 px-4 text-gray-300">{agent.avgDuration}</td>
                      <td className="py-3 px-4 text-white font-medium">{agent.conversions}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            agent.convRate >= 28 ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                          }
                        >
                          {agent.convRate}%
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-white">{agent.csat}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Performance Distribution Charts */}
          <div className="grid grid-cols-3 gap-6">
            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Calls per Agent</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={callVolumeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" stroke="#666" />
                  <YAxis dataKey="name" type="category" stroke="#666" width={100} />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                  <Bar dataKey="calls" fill="#FF6B35" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Talk Time Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={agentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                  <Bar dataKey="calls" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Conversion Rate Comparison</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                  <Bar dataKey="rate" fill="#3b82f6" />
                  <Bar dataKey="target" fill="#666" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Team Performance Radar */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Team Performance Radar</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={performanceData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="metric" stroke="#666" />
                <PolarRadiusAxis stroke="#666" />
                <Radar name="Team Average" dataKey="teamAvg" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.3} />
                <Radar name="Top Performer" dataKey="topPerformer" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Radar
                  name="Target"
                  dataKey="target"
                  stroke="#666"
                  fill="#666"
                  fillOpacity={0.1}
                  strokeDasharray="5 5"
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Tab 2: Individual Agent Deep Dive */}
        <TabsContent value="individual" className="space-y-6">
          {/* Agent Selector */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-4">
            <Select
              value={selectedAgent.id}
              onValueChange={(id) => setSelectedAgent(agentData.find((a) => a.id === id) || agentData[0])}
            >
              <SelectTrigger className="w-[300px] bg-[#0a0a0a] border-gray-700 text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-gray-700">
                {agentData.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name} (ID: {agent.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Agent Summary Card */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-2xl font-bold text-orange-500">
                  {selectedAgent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedAgent.name}</h2>
                  <p className="text-gray-400">
                    ID: {selectedAgent.id} • Extension: 2{selectedAgent.id}
                  </p>
                  <Badge
                    variant="outline"
                    className={
                      selectedAgent.status === "online"
                        ? "border-green-500 text-green-500 mt-2"
                        : selectedAgent.status === "busy"
                          ? "border-yellow-500 text-yellow-500 mt-2"
                          : "border-gray-500 text-gray-500 mt-2"
                    }
                  >
                    {selectedAgent.status === "online" ? "🟢" : selectedAgent.status === "busy" ? "🟡" : "🔴"}{" "}
                    {selectedAgent.status}
                  </Badge>
                </div>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">View Live Activity</Button>
            </div>
          </Card>

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-[#1a1a1a] border-gray-800 p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Call Activity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total calls:</span>
                  <span className="text-white font-medium">{selectedAgent.calls}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Inbound:</span>
                  <span className="text-white">67 (43%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Outbound:</span>
                  <span className="text-white">89 (57%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg per day:</span>
                  <span className="text-white">31</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Peak hour:</span>
                  <span className="text-white">10-11 AM</span>
                </div>
              </div>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Call Outcomes</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Connected:</span>
                  <span className="text-green-500 font-medium">
                    {selectedAgent.connected} ({selectedAgent.connectRate}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Voicemail:</span>
                  <span className="text-white">{selectedAgent.voicemail} (18%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">No Answer:</span>
                  <span className="text-white">12 (8%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Busy/Failed:</span>
                  <span className="text-white">4 (2%)</span>
                </div>
              </div>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Time Metrics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total talk time:</span>
                  <span className="text-white font-medium">{selectedAgent.talkTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg duration:</span>
                  <span className="text-white">{selectedAgent.avgDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Longest call:</span>
                  <span className="text-white">18m 34s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shortest call:</span>
                  <span className="text-white">45s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Break time:</span>
                  <span className="text-white">1h 15m</span>
                </div>
              </div>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Quality Metrics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">CSAT:</span>
                  <span className="text-yellow-500 font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-500" />
                    {selectedAgent.csat}/5.0
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">First call resolution:</span>
                  <span className="text-white">78%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Compliance score:</span>
                  <span className="text-green-500">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Quality score:</span>
                  <span className="text-white">89/100</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Hourly Activity</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="hour" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                  <Line type="monotone" dataKey="calls" stroke="#FF6B35" strokeWidth={2} />
                  <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Call Duration Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={[
                    { range: "0-2m", count: 12 },
                    { range: "2-4m", count: 34 },
                    { range: "4-6m", count: 56 },
                    { range: "6-8m", count: 32 },
                    { range: "8m+", count: 22 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="range" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Call History Table */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Call History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Date/Time</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Contact</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Phone</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Duration</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Outcome</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Recording</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {callHistory.map((call, i) => (
                    <tr key={i} className="border-b border-gray-800 hover:bg-[#2a2a2a]">
                      <td className="py-3 px-4 text-gray-300">{call.date}</td>
                      <td className="py-3 px-4 text-white">{call.contact}</td>
                      <td className="py-3 px-4 text-gray-300">{call.phone}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={
                            call.type === "Out" ? "border-blue-500 text-blue-500" : "border-green-500 text-green-500"
                          }
                        >
                          {call.type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{call.duration}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            call.outcome === "Converted"
                              ? "bg-green-500/20 text-green-500"
                              : call.outcome === "Interested"
                                ? "bg-blue-500/20 text-blue-500"
                                : call.outcome === "Callback"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-gray-500/20 text-gray-500"
                          }
                        >
                          {call.outcome}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="ghost" className="text-orange-500 hover:text-orange-400">
                          <Play className="w-4 h-4" />
                        </Button>
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-sm">{call.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 3: Team Comparison */}
        <TabsContent value="comparison" className="space-y-6">
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Select Agents to Compare (2-6)</h3>
            <div className="grid grid-cols-5 gap-4 mb-6">
              {agentData.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => {
                    if (selectedAgents.find((a) => a.id === agent.id)) {
                      setSelectedAgents(selectedAgents.filter((a) => a.id !== agent.id))
                    } else if (selectedAgents.length < 6) {
                      setSelectedAgents([...selectedAgents, agent])
                    }
                  }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAgents.find((a) => a.id === agent.id)
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-lg font-bold text-orange-500 mx-auto mb-2">
                      {agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="text-white font-medium text-sm">{agent.name}</div>
                    <div className="text-gray-500 text-xs">ID: {agent.id}</div>
                  </div>
                </div>
              ))}
            </div>

            {selectedAgents.length >= 2 && (
              <>
                <h3 className="text-lg font-semibold text-white mb-4 mt-8">Side-by-Side Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Metric</th>
                        {selectedAgents.map((agent) => (
                          <th key={agent.id} className="text-center py-3 px-4 text-sm font-semibold text-gray-300">
                            {agent.name}
                          </th>
                        ))}
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-300">Best</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 text-gray-400">Total Calls</td>
                        {selectedAgents.map((agent) => (
                          <td key={agent.id} className="py-3 px-4 text-center text-white">
                            {agent.calls}
                          </td>
                        ))}
                        <td className="py-3 px-4 text-center text-green-500">{selectedAgents[0].name}</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 text-gray-400">Connect Rate</td>
                        {selectedAgents.map((agent) => (
                          <td key={agent.id} className="py-3 px-4 text-center text-white">
                            {agent.connectRate}%
                          </td>
                        ))}
                        <td className="py-3 px-4 text-center text-green-500">{selectedAgents[0].name}</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 text-gray-400">Avg Duration</td>
                        {selectedAgents.map((agent) => (
                          <td key={agent.id} className="py-3 px-4 text-center text-white">
                            {agent.avgDuration}
                          </td>
                        ))}
                        <td className="py-3 px-4 text-center text-green-500">{selectedAgents[0].name}</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 text-gray-400">Conversions</td>
                        {selectedAgents.map((agent) => (
                          <td key={agent.id} className="py-3 px-4 text-center text-white">
                            {agent.conversions}
                          </td>
                        ))}
                        <td className="py-3 px-4 text-center text-green-500">{selectedAgents[0].name}</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 text-gray-400">Conversion Rate</td>
                        {selectedAgents.map((agent) => (
                          <td key={agent.id} className="py-3 px-4 text-center text-white">
                            {agent.convRate}%
                          </td>
                        ))}
                        <td className="py-3 px-4 text-center text-green-500">{selectedAgents[0].name}</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 text-gray-400">CSAT Score</td>
                        {selectedAgents.map((agent) => (
                          <td key={agent.id} className="py-3 px-4 text-center text-white">
                            {agent.csat}
                          </td>
                        ))}
                        <td className="py-3 px-4 text-center text-green-500">{selectedAgents[0].name}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Visual Comparison</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart
                      data={[
                        { metric: "Calls", ...Object.fromEntries(selectedAgents.map((a) => [a.name, a.calls / 2])) },
                        {
                          metric: "Connect %",
                          ...Object.fromEntries(selectedAgents.map((a) => [a.name, a.connectRate])),
                        },
                        {
                          metric: "Conv %",
                          ...Object.fromEntries(selectedAgents.map((a) => [a.name, a.convRate * 3])),
                        },
                        { metric: "CSAT", ...Object.fromEntries(selectedAgents.map((a) => [a.name, a.csat * 20])) },
                      ]}
                    >
                      <PolarGrid stroke="#333" />
                      <PolarAngleAxis dataKey="metric" stroke="#666" />
                      <PolarRadiusAxis stroke="#666" />
                      {selectedAgents.map((agent, i) => (
                        <Radar
                          key={agent.id}
                          name={agent.name}
                          dataKey={agent.name}
                          stroke={["#FF6B35", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"][i]}
                          fill={["#FF6B35", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"][i]}
                          fillOpacity={0.3}
                        />
                      ))}
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </Card>
        </TabsContent>

        {/* Tab 4: Time Analysis */}
        <TabsContent value="time" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Time Allocation Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={timeAllocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {timeAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Peak Performance Hours</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="hour" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                  <Bar dataKey="calls" fill="#FF6B35" />
                  <Bar dataKey="conversions" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Schedule Adherence */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Schedule Adherence</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Agent</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Scheduled</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Actual</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Adherence</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Punctuality</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Overtime</th>
                  </tr>
                </thead>
                <tbody>
                  {agentData.map((agent) => (
                    <tr key={agent.id} className="border-b border-gray-800">
                      <td className="py-3 px-4 text-white">{agent.name}</td>
                      <td className="py-3 px-4 text-gray-300">8h</td>
                      <td className="py-3 px-4 text-gray-300">8h 15m</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-500/20 text-green-500">102%</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-500/20 text-green-500">98%</Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-300">15m</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">AI-Generated Insights</h3>
            <div className="space-y-3">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400">
                  Agent 1005 showing 30% improvement this week - consider for team lead role
                </p>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-400">
                  Agent 1008 needs coaching on objection handling - conversion rate below target
                </p>
              </div>
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <p className="text-orange-400">Team average talk time increasing - investigate potential issues</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
