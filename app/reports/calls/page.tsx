"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Download,
  Filter,
  Play,
  Pause,
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  Bot,
  User,
  ChevronDown,
  ChevronUp,
  Search,
  MoreVertical,
  TrendingUp,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  Volume2,
  ThumbsUp,
  ThumbsDown,
  Minus,
  FileText,
} from "lucide-react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data
const mockCalls = [
  {
    id: 1,
    date: "Nov 1, 3:45 PM",
    type: "outbound",
    contact: "John Doe",
    phone: "(555)123-4567",
    agent: "Agent 1001",
    campaign: "Q4 Sales",
    duration: "5m 23s",
    status: "connected",
    disposition: "Interested",
    recording: true,
    sentiment: "positive",
    quality: 92,
  },
  {
    id: 2,
    date: "Nov 1, 3:32 PM",
    type: "inbound",
    contact: "Jane Smith",
    phone: "(555)234-5678",
    agent: "AI Agent",
    campaign: "Support",
    duration: "2m 15s",
    status: "connected",
    disposition: "Resolved",
    recording: true,
    sentiment: "positive",
    quality: 88,
  },
  {
    id: 3,
    date: "Nov 1, 3:18 PM",
    type: "outbound",
    contact: "Bob Johnson",
    phone: "(555)345-6789",
    agent: "Agent 1002",
    campaign: "Follow-up",
    duration: "0m 00s",
    status: "voicemail",
    disposition: "VM Left",
    recording: true,
    sentiment: "neutral",
    quality: 75,
  },
  {
    id: 4,
    date: "Nov 1, 3:05 PM",
    type: "outbound",
    contact: "Alice Williams",
    phone: "(555)456-7890",
    agent: "AI Agent",
    campaign: "Q4 Sales",
    duration: "8m 42s",
    status: "connected",
    disposition: "Converted",
    recording: true,
    sentiment: "positive",
    quality: 95,
  },
  {
    id: 5,
    date: "Nov 1, 2:51 PM",
    type: "inbound",
    contact: "Charlie Brown",
    phone: "(555)567-8901",
    agent: "Agent 1003",
    campaign: "Support",
    duration: "0m 00s",
    status: "no-answer",
    disposition: "No Answer",
    recording: false,
    sentiment: "neutral",
    quality: 0,
  },
  {
    id: 6,
    date: "Nov 1, 2:38 PM",
    type: "outbound",
    contact: "Diana Prince",
    phone: "(555)678-9012",
    agent: "Agent 1001",
    campaign: "Q4 Sales",
    duration: "3m 17s",
    status: "connected",
    disposition: "Not Interested",
    recording: true,
    sentiment: "negative",
    quality: 68,
  },
]

const volumeData = [
  { time: "9 AM", total: 45, inbound: 15, outbound: 30, ai: 12 },
  { time: "10 AM", total: 78, inbound: 28, outbound: 50, ai: 22 },
  { time: "11 AM", total: 92, inbound: 35, outbound: 57, ai: 28 },
  { time: "12 PM", total: 65, inbound: 25, outbound: 40, ai: 18 },
  { time: "1 PM", total: 58, inbound: 20, outbound: 38, ai: 15 },
  { time: "2 PM", total: 88, inbound: 32, outbound: 56, ai: 25 },
  { time: "3 PM", total: 95, inbound: 38, outbound: 57, ai: 30 },
]

const outcomeData = [
  { name: "Connected", value: 68.7, color: "#10b981" },
  { name: "Voicemail", value: 18.2, color: "#f59e0b" },
  { name: "No Answer", value: 9.5, color: "#6b7280" },
  { name: "Busy", value: 2.8, color: "#f97316" },
  { name: "Failed", value: 0.8, color: "#ef4444" },
]

const dispositionData = [
  { name: "Interested", count: 3024, type: "positive" },
  { name: "Converted", count: 1856, type: "positive" },
  { name: "Callback", count: 1456, type: "neutral" },
  { name: "Not Interested", count: 4234, type: "negative" },
  { name: "DNC", count: 892, type: "negative" },
  { name: "Voicemail", count: 2772, type: "neutral" },
]

const durationData = [
  { range: "0-1m", count: 2340 },
  { range: "1-2m", count: 3120 },
  { range: "2-5m", count: 5680 },
  { range: "5-10m", count: 2890 },
  { range: "10-20m", count: 980 },
  { range: "20m+", count: 224 },
]

const heatmapData = [
  { day: "Mon", "9AM": 45, "10AM": 78, "11AM": 92, "12PM": 65, "1PM": 58, "2PM": 88, "3PM": 95, "4PM": 82, "5PM": 67 },
  { day: "Tue", "9AM": 52, "10AM": 85, "11AM": 98, "12PM": 72, "1PM": 63, "2PM": 92, "3PM": 102, "4PM": 88, "5PM": 71 },
  { day: "Wed", "9AM": 48, "10AM": 82, "11AM": 95, "12PM": 68, "1PM": 61, "2PM": 90, "3PM": 98, "4PM": 85, "5PM": 69 },
  {
    day: "Thu",
    "9AM": 55,
    "10AM": 88,
    "11AM": 105,
    "12PM": 75,
    "1PM": 67,
    "2PM": 95,
    "3PM": 108,
    "4PM": 92,
    "5PM": 74,
  },
  { day: "Fri", "9AM": 42, "10AM": 75, "11AM": 88, "12PM": 62, "1PM": 55, "2PM": 82, "3PM": 90, "4PM": 78, "5PM": 63 },
]

export default function CallsReportPage() {
  const [dateRange, setDateRange] = useState("last-7-days")
  const [callFilter, setCallFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCall, setSelectedCall] = useState<(typeof mockCalls)[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedCalls, setSelectedCalls] = useState<number[]>([])

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-orange-500 mb-1">Call Reports & Analytics</h1>
            <p className="text-gray-300 text-base">Detailed call history and analysis</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-gray-800 text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-gray-800">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-[#1a1a1a] border-gray-800 text-gray-200 hover:bg-[#2a2a2a]">
              <Download className="w-4 h-4 mr-2" />
              Export
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="bg-[#1a1a1a] border-gray-800 text-gray-200 hover:bg-[#2a2a2a]"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
              {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 mt-4">
          {["all", "inbound", "outbound", "ai", "human"].map((filter) => (
            <Button
              key={filter}
              variant={callFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setCallFilter(filter)}
              className={
                callFilter === filter
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-[#1a1a1a] border-gray-800 text-gray-200 hover:bg-[#2a2a2a]"
              }
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)} Calls
            </Button>
          ))}
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <Card className="mt-4 p-4 bg-[#1a1a1a] border-gray-800">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Call Type</label>
                <Select>
                  <SelectTrigger className="bg-[#0a0a0a] border-gray-800 text-gray-200">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-800">
                    <SelectItem value="inbound">Inbound</SelectItem>
                    <SelectItem value="outbound">Outbound</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Call Handler</label>
                <Select>
                  <SelectTrigger className="bg-[#0a0a0a] border-gray-800 text-gray-200">
                    <SelectValue placeholder="All handlers" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-800">
                    <SelectItem value="human">Human Agent</SelectItem>
                    <SelectItem value="ai">AI Agent</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Campaign</label>
                <Select>
                  <SelectTrigger className="bg-[#0a0a0a] border-gray-800 text-gray-200">
                    <SelectValue placeholder="All campaigns" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-800">
                    <SelectItem value="q4-sales">Q4 Sales</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Status</label>
                <Select>
                  <SelectTrigger className="bg-[#0a0a0a] border-gray-800 text-gray-200">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-800">
                    <SelectItem value="connected">Connected</SelectItem>
                    <SelectItem value="voicemail">Voicemail</SelectItem>
                    <SelectItem value="no-answer">No Answer</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-300 mb-2 block">Duration Range</label>
                <Slider defaultValue={[0, 60]} max={60} step={1} className="mt-2" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0s</span>
                  <span>60m</span>
                </div>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-300 mb-2 block">Quality Score</label>
                <Slider defaultValue={[0, 100]} max={100} step={1} className="mt-2" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-[#0a0a0a] border-gray-800 text-gray-200 hover:bg-[#2a2a2a]"
              >
                Clear All
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                Apply Filters
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <Card className="p-4 bg-[#1a1a1a] border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Total Calls</span>
            <Phone className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">15,234</div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              12%
            </span>
            <span className="text-gray-400">vs previous</span>
          </div>
          <div className="mt-2 text-xs text-gray-400">In: 35% / Out: 65%</div>
        </Card>

        <Card className="p-4 bg-[#1a1a1a] border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Connected Calls</span>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">10,459</div>
          <div className="text-sm text-gray-400 mb-1">Connect rate: 68.7%</div>
          <div className="text-xs text-gray-400">Avg duration: 4m 32s</div>
        </Card>

        <Card className="p-4 bg-[#1a1a1a] border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Total Talk Time</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">789h 23m</div>
          <div className="text-sm text-gray-400 mb-1">Avg: 4m 32s</div>
          <div className="text-xs text-gray-400">Longest: 1h 23m</div>
        </Card>

        <Card className="p-4 bg-[#1a1a1a] border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Call Outcomes</span>
            <Target className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">3,024</div>
          <div className="text-sm text-gray-400 mb-1">Conversions: 19.8%</div>
          <div className="text-xs text-gray-400">Callbacks: 1,456 (9.6%)</div>
        </Card>

        <Card className="p-4 bg-[#1a1a1a] border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Call Quality</span>
            <AlertCircle className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">4.3/5.0</div>
          <div className="text-sm text-gray-400 mb-1">Compliance: 96%</div>
          <div className="text-xs text-gray-400">Issues flagged: 23</div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="bg-[#1a1a1a] border-gray-800">
          <TabsTrigger value="list" className="data-[state=active]:bg-orange-500">
            Call List
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-500">
            Call Analytics
          </TabsTrigger>
          <TabsTrigger value="details" className="data-[state=active]:bg-orange-500">
            Call Details & Transcripts
          </TabsTrigger>
          <TabsTrigger value="quality" className="data-[state=active]:bg-orange-500">
            Quality & Compliance
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Call List */}
        <TabsContent value="list" className="space-y-4">
          {/* Quick Stats Bar */}
          <Card className="p-4 bg-[#1a1a1a] border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-sm text-gray-400">Total calls:</span>
                  <span className="ml-2 text-lg font-semibold text-white">1,234</span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Avg duration:</span>
                  <span className="ml-2 text-lg font-semibold text-white">4m 23s</span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Connect rate:</span>
                  <span className="ml-2 text-lg font-semibold text-white">67%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="Search calls..." className="w-64 bg-[#0a0a0a] border-gray-800 text-gray-200" />
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-[#0a0a0a] border-gray-800 text-gray-200 hover:bg-[#2a2a2a]"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Call Table */}
          <Card className="bg-[#1a1a1a] border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0a0a0a] border-b border-gray-800">
                  <tr>
                    <th className="p-3 text-left">
                      <Checkbox />
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-300">Date/Time</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-300">Type</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-300">Contact</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-300">Phone</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-300">Agent/AI</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-300">Campaign</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-300">Duration</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-300">Disposition</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-300">Recording</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCalls.map((call) => (
                    <tr key={call.id} className="border-b border-gray-800 hover:bg-[#2a2a2a] transition-colors">
                      <td className="p-3">
                        <Checkbox />
                      </td>
                      <td className="p-3 text-sm text-gray-200">{call.date}</td>
                      <td className="p-3">
                        {call.type === "outbound" ? (
                          <PhoneOutgoing className="w-4 h-4 text-orange-500" />
                        ) : (
                          <PhoneIncoming className="w-4 h-4 text-blue-500" />
                        )}
                      </td>
                      <td className="p-3 text-sm text-gray-200">{call.contact}</td>
                      <td className="p-3 text-sm text-gray-400">{call.phone}</td>
                      <td className="p-3 text-sm text-gray-200 flex items-center gap-1">
                        {call.agent.includes("AI") ? (
                          <Bot className="w-3 h-3 text-purple-500" />
                        ) : (
                          <User className="w-3 h-3 text-gray-400" />
                        )}
                        {call.agent}
                      </td>
                      <td className="p-3 text-sm text-gray-200">{call.campaign}</td>
                      <td className="p-3 text-sm text-gray-200">{call.duration}</td>
                      <td className="p-3">
                        <Badge
                          className={
                            call.status === "connected"
                              ? "bg-green-500/20 text-green-500 border-green-500/30"
                              : call.status === "voicemail"
                                ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                                : call.status === "no-answer"
                                  ? "bg-gray-500/20 text-gray-500 border-gray-500/30"
                                  : "bg-red-500/20 text-red-500 border-red-500/30"
                          }
                          variant="outline"
                        >
                          {call.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm text-gray-200">{call.disposition}</td>
                      <td className="p-3">
                        {call.recording && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-orange-500 hover:text-orange-400 hover:bg-orange-500/10"
                            onClick={() => setSelectedCall(call)}
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                      </td>
                      <td className="p-3">
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-200">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 2: Call Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Call Volume Analysis */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Call Volume Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <h4 className="text-base font-semibold text-gray-200 mb-4">Calls Over Time</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.3}
                      name="Total"
                    />
                    <Area
                      type="monotone"
                      dataKey="inbound"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      name="Inbound"
                    />
                    <Area
                      type="monotone"
                      dataKey="outbound"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                      name="Outbound"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <h4 className="text-base font-semibold text-gray-200 mb-4">Call Distribution</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                    <Legend />
                    <Bar dataKey="inbound" stackId="a" fill="#3b82f6" name="Inbound" />
                    <Bar dataKey="outbound" stackId="a" fill="#10b981" name="Outbound" />
                    <Bar dataKey="ai" stackId="a" fill="#a855f7" name="AI Handled" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>

          {/* Call Outcomes */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Call Outcomes</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <h4 className="text-base font-semibold text-gray-200 mb-4">Outcome Distribution</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={outcomeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {outcomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <h4 className="text-base font-semibold text-gray-200 mb-4">Disposition Breakdown</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dispositionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis type="number" stroke="#666" />
                    <YAxis dataKey="name" type="category" stroke="#666" width={100} />
                    <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                    <Bar dataKey="count" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>

          {/* Duration Analysis */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Call Duration Analysis</h3>
            <Card className="p-4 bg-[#1a1a1a] border-gray-800">
              <h4 className="text-base font-semibold text-gray-200 mb-4">Duration Distribution</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={durationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="range" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                  <Bar dataKey="count" fill="#14b8a6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Agent vs AI Performance */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Agent vs AI Performance</h3>
            <Card className="p-6 bg-[#1a1a1a] border-gray-800">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Calls Handled</div>
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <div className="text-2xl font-bold text-purple-500">7,234</div>
                      <div className="text-xs text-gray-400">AI</div>
                    </div>
                    <div className="text-gray-600">vs</div>
                    <div>
                      <div className="text-2xl font-bold text-blue-500">8,000</div>
                      <div className="text-xs text-gray-400">Human</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Average Duration</div>
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <div className="text-2xl font-bold text-purple-500">2m 34s</div>
                      <div className="text-xs text-gray-400">AI</div>
                    </div>
                    <div className="text-gray-600">vs</div>
                    <div>
                      <div className="text-2xl font-bold text-blue-500">5m 18s</div>
                      <div className="text-xs text-gray-400">Human</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Conversion Rate</div>
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <div className="text-2xl font-bold text-purple-500">18%</div>
                      <div className="text-xs text-gray-400">AI</div>
                    </div>
                    <div className="text-gray-600">vs</div>
                    <div>
                      <div className="text-2xl font-bold text-blue-500">21%</div>
                      <div className="text-xs text-gray-400">Human</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 3: Call Details & Transcripts */}
        <TabsContent value="details" className="space-y-4">
          <Card className="p-4 bg-[#1a1a1a] border-gray-800">
            <div className="flex items-center gap-4 mb-4">
              <Input
                placeholder="Search by contact, phone, or keywords..."
                className="flex-1 bg-[#0a0a0a] border-gray-800 text-gray-200"
              />
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </Card>

          {selectedCall ? (
            <div className="grid grid-cols-3 gap-4">
              {/* Left Panel: Call Information */}
              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Call Information</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-400">Date & Time</div>
                    <div className="text-sm text-gray-200">{selectedCall.date}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Duration</div>
                    <div className="text-sm text-gray-200">{selectedCall.duration}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Contact</div>
                    <div className="text-sm text-gray-200">{selectedCall.contact}</div>
                    <div className="text-xs text-gray-400">{selectedCall.phone}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Agent</div>
                    <div className="text-sm text-gray-200 flex items-center gap-1">
                      {selectedCall.agent.includes("AI") ? (
                        <Bot className="w-3 h-3 text-purple-500" />
                      ) : (
                        <User className="w-3 h-3 text-gray-400" />
                      )}
                      {selectedCall.agent}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Campaign</div>
                    <div className="text-sm text-gray-200">{selectedCall.campaign}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Status</div>
                    <Badge
                      className={
                        selectedCall.status === "connected"
                          ? "bg-green-500/20 text-green-500 border-green-500/30"
                          : selectedCall.status === "voicemail"
                            ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                            : "bg-gray-500/20 text-gray-500 border-gray-500/30"
                      }
                      variant="outline"
                    >
                      {selectedCall.status}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Disposition</div>
                    <div className="text-sm text-gray-200">{selectedCall.disposition}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Quality Score</div>
                    <div className="text-sm text-gray-200">{selectedCall.quality}/100</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Sentiment</div>
                    <div className="flex items-center gap-1 text-sm">
                      {selectedCall.sentiment === "positive" && <ThumbsUp className="w-3 h-3 text-green-500" />}
                      {selectedCall.sentiment === "neutral" && <Minus className="w-3 h-3 text-gray-500" />}
                      {selectedCall.sentiment === "negative" && <ThumbsDown className="w-3 h-3 text-red-500" />}
                      <span
                        className={
                          selectedCall.sentiment === "positive"
                            ? "text-green-500"
                            : selectedCall.sentiment === "neutral"
                              ? "text-gray-500"
                              : "text-red-500"
                        }
                      >
                        {selectedCall.sentiment}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Right Panel: Recording & Transcript */}
              <Card className="col-span-2 p-4 bg-[#1a1a1a] border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Recording & Transcript</h3>

                {/* Audio Player */}
                <div className="bg-[#0a0a0a] rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-orange-500 hover:text-orange-400"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 w-1/3"></div>
                    </div>
                    <span className="text-sm text-gray-400">1:45 / 5:23</span>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-200">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-200">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Transcript */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  <div className="flex gap-3">
                    <div className="text-xs text-gray-500 w-16">0:05</div>
                    <div className="flex-1">
                      <div className="text-xs text-blue-400 mb-1">Agent</div>
                      <div className="text-sm text-gray-200">
                        Hello, this is {selectedCall.agent} calling from AEON. How are you today?
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <ThumbsUp className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-500">Positive</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-xs text-gray-500 w-16">0:12</div>
                    <div className="flex-1">
                      <div className="text-xs text-purple-400 mb-1">Contact</div>
                      <div className="text-sm text-gray-200">I'm doing well, thank you. What can I help you with?</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Minus className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">Neutral</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-xs text-gray-500 w-16">0:18</div>
                    <div className="flex-1">
                      <div className="text-xs text-blue-400 mb-1">Agent</div>
                      <div className="text-sm text-gray-200">
                        I wanted to follow up on our Q4 Sales campaign and see if you had any questions about our new
                        product offerings.
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <ThumbsUp className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-500">Positive</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="mt-4 p-4 bg-[#0a0a0a] rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-200 mb-2">AI Analysis</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div>
                      <span className="text-gray-400">Sentiment:</span> Overall positive tone
                    </div>
                    <div>
                      <span className="text-gray-400">Key Topics:</span> Product features, Pricing, Timeline
                    </div>
                    <div>
                      <span className="text-gray-400">Objections:</span> None detected
                    </div>
                    <div>
                      <span className="text-gray-400">Commitments:</span> Follow-up call scheduled
                    </div>
                    <div>
                      <span className="text-gray-400">Compliance:</span> <span className="text-green-500">Pass</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <Card className="p-12 bg-[#1a1a1a] border-gray-800 text-center">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Select a call from the Call List tab to view details and transcript</p>
            </Card>
          )}
        </TabsContent>

        {/* Tab 4: Quality & Compliance */}
        <TabsContent value="quality" className="space-y-6">
          {/* Quality Metrics */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quality Metrics</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Avg Quality Score</div>
                <div className="text-3xl font-bold text-white">87/100</div>
                <div className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +3 vs last month
                </div>
              </Card>
              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Script Adherence</div>
                <div className="text-3xl font-bold text-white">92%</div>
              </Card>
              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Professionalism</div>
                <div className="text-3xl font-bold text-white">89%</div>
              </Card>
              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Customer Satisfaction</div>
                <div className="text-3xl font-bold text-white">4.3/5</div>
              </Card>
            </div>
          </div>

          {/* Compliance Monitoring */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Compliance Monitoring</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Overall Compliance</div>
                <div className="text-3xl font-bold text-green-500">96%</div>
              </Card>
              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Total Flags</div>
                <div className="text-3xl font-bold text-white">23</div>
              </Card>
              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Critical</div>
                <div className="text-3xl font-bold text-red-500">3</div>
              </Card>
              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Warnings</div>
                <div className="text-3xl font-bold text-yellow-500">20</div>
              </Card>
            </div>

            <Card className="bg-[#1a1a1a] border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0a0a0a] border-b border-gray-800">
                    <tr>
                      <th className="p-3 text-left text-sm font-semibold text-gray-300">Requirement</th>
                      <th className="p-3 text-left text-sm font-semibold text-gray-300">Compliance Rate</th>
                      <th className="p-3 text-left text-sm font-semibold text-gray-300">Violations</th>
                      <th className="p-3 text-left text-sm font-semibold text-gray-300">Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="p-3 text-sm text-gray-200">Agent identification</td>
                      <td className="p-3 text-sm text-green-500">99.8%</td>
                      <td className="p-3 text-sm text-gray-200">2</td>
                      <td className="p-3">
                        <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30">
                          Low
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="p-3 text-sm text-gray-200">Permission to record</td>
                      <td className="p-3 text-sm text-yellow-500">98.5%</td>
                      <td className="p-3 text-sm text-gray-200">18</td>
                      <td className="p-3">
                        <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                          Medium
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="p-3 text-sm text-gray-200">DNC honor</td>
                      <td className="p-3 text-sm text-green-500">100%</td>
                      <td className="p-3 text-sm text-gray-200">0</td>
                      <td className="p-3">
                        <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/30">
                          Critical
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="p-3 text-sm text-gray-200">Accurate information</td>
                      <td className="p-3 text-sm text-yellow-500">97.2%</td>
                      <td className="p-3 text-sm text-gray-200">35</td>
                      <td className="p-3">
                        <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                          Medium
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Sentiment Analysis */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Sentiment Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <h4 className="text-base font-semibold text-gray-200 mb-4">Overall Sentiment Distribution</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-200">Positive</span>
                    </div>
                    <span className="text-lg font-semibold text-green-500">67%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-2/3"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Minus className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-200">Neutral</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-500">25%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-500 w-1/4"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ThumbsDown className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-200">Negative</span>
                    </div>
                    <span className="text-lg font-semibold text-red-500">8%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[8%]"></div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <h4 className="text-base font-semibold text-gray-200 mb-4">Common Objections</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-[#0a0a0a] rounded">
                    <span className="text-sm text-gray-200">Price</span>
                    <span className="text-sm text-gray-400">234 calls (15%)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#0a0a0a] rounded">
                    <span className="text-sm text-gray-200">Timing</span>
                    <span className="text-sm text-gray-400">189 calls (12%)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#0a0a0a] rounded">
                    <span className="text-sm text-gray-200">Need</span>
                    <span className="text-sm text-gray-400">156 calls (10%)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#0a0a0a] rounded">
                    <span className="text-sm text-gray-200">Authority</span>
                    <span className="text-sm text-gray-400">98 calls (6%)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#0a0a0a] rounded">
                    <span className="text-sm text-gray-200">Competition</span>
                    <span className="text-sm text-gray-400">87 calls (6%)</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
