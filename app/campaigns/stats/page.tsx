"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Play,
  Pause,
  Edit,
  Download,
  MoreVertical,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Phone,
  Clock,
  Target,
  Zap,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function CampaignStatsPage() {
  const [dateRange, setDateRange] = useState("last7days")
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data
  const campaignData = {
    name: "Summer Promo 2025",
    id: "CMP-2025-001",
    status: "active",
    totalCalls: 1247,
    totalContacts: 5000,
    connectRate: 68.5,
    avgDuration: "4m 32s",
    conversions: 214,
    conversionRate: 25,
    revenue: 42800,
  }

  const callVolumeData = [
    { time: "Mon", total: 180, connected: 125, voicemail: 30, noAnswer: 25 },
    { time: "Tue", total: 195, connected: 135, voicemail: 35, noAnswer: 25 },
    { time: "Wed", total: 210, connected: 145, voicemail: 40, noAnswer: 25 },
    { time: "Thu", total: 185, connected: 130, voicemail: 32, noAnswer: 23 },
    { time: "Fri", total: 220, connected: 155, voicemail: 38, noAnswer: 27 },
    { time: "Sat", total: 135, connected: 90, voicemail: 25, noAnswer: 20 },
    { time: "Sun", total: 122, connected: 76, voicemail: 28, noAnswer: 18 },
  ]

  const outcomeData = [
    { name: "Connected & Spoke", value: 68, count: 856, color: "#10b981" },
    { name: "Voicemail Left", value: 15, count: 189, color: "#f59e0b" },
    { name: "No Answer", value: 12, count: 150, color: "#6b7280" },
    { name: "Busy/Failed", value: 5, count: 52, color: "#ef4444" },
  ]

  const dispositionData = [
    { disposition: "Interested", count: 214, percent: 17, avgDuration: "6m 45s" },
    { disposition: "Not Interested", count: 342, percent: 27, avgDuration: "2m 10s" },
    { disposition: "Callback", count: 156, percent: 13, avgDuration: "3m 30s" },
    { disposition: "Voicemail", count: 189, percent: 15, avgDuration: "0m 45s" },
    { disposition: "No Answer", count: 346, percent: 28, avgDuration: "0m 00s" },
  ]

  const agentLeaderboard = [
    {
      rank: 1,
      name: "Agent Alpha",
      calls: 234,
      connectRate: 72,
      conversions: 45,
      conversionRate: 19,
      avgDuration: "5m 23s",
    },
    {
      rank: 2,
      name: "Agent Beta",
      calls: 198,
      connectRate: 68,
      conversions: 38,
      conversionRate: 19,
      avgDuration: "4m 56s",
    },
    {
      rank: 3,
      name: "Agent Gamma",
      calls: 176,
      connectRate: 65,
      conversions: 32,
      conversionRate: 18,
      avgDuration: "4m 45s",
    },
    {
      rank: 4,
      name: "Agent Delta",
      calls: 165,
      connectRate: 63,
      conversions: 28,
      conversionRate: 17,
      avgDuration: "4m 32s",
    },
  ]

  const contactHistory = [
    {
      id: 1,
      name: "John Smith",
      phone: "(555) 123-4567",
      date: "Nov 1, 2025 2:30 PM",
      status: "Connected",
      duration: "5m 23s",
      disposition: "Interested",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      phone: "(555) 234-5678",
      date: "Nov 1, 2025 2:15 PM",
      status: "Voicemail",
      duration: "0m 45s",
      disposition: "Voicemail",
    },
    {
      id: 3,
      name: "Mike Davis",
      phone: "(555) 345-6789",
      date: "Nov 1, 2025 2:00 PM",
      status: "Connected",
      duration: "3m 12s",
      disposition: "Callback",
    },
    {
      id: 4,
      name: "Emily Wilson",
      phone: "(555) 456-7890",
      date: "Nov 1, 2025 1:45 PM",
      status: "No Answer",
      duration: "0m 00s",
      disposition: "No Answer",
    },
    {
      id: 5,
      name: "David Brown",
      phone: "(555) 567-8901",
      date: "Nov 1, 2025 1:30 PM",
      status: "Connected",
      duration: "6m 45s",
      disposition: "Interested",
    },
  ]

  const activityFeed = [
    { time: "2:45 PM", event: "Call connected: John Smith", type: "success" },
    { time: "2:43 PM", event: "AI qualified lead: Sarah Johnson", type: "info" },
    { time: "2:40 PM", event: "Voicemail left: Mike Davis", type: "warning" },
    { time: "2:38 PM", event: "Call connected: Emily Wilson", type: "success" },
    { time: "2:35 PM", event: "AI qualified lead: David Brown", type: "info" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Button variant="ghost" size="icon" className="mt-1">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-orange-500">{campaignData.name}</h1>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{campaignData.status}</Badge>
              </div>
              <p className="text-sm text-zinc-400 mt-1">Campaign ID: {campaignData.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-zinc-700 bg-transparent">
              <Pause className="h-4 w-4 mr-2" />
              Pause Campaign
            </Button>
            <Button variant="outline" className="border-zinc-700 bg-transparent">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-zinc-700 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
                <DropdownMenuItem className="text-white">Export as PDF</DropdownMenuItem>
                <DropdownMenuItem className="text-white">Export as CSV</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
                <DropdownMenuItem className="text-white">Archive Campaign</DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">Delete Campaign</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center gap-3 mt-6">
          <div className="flex items-center gap-2">
            <Button
              variant={dateRange === "today" ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange("today")}
              className={dateRange === "today" ? "bg-orange-500 hover:bg-orange-600" : "border-zinc-700"}
            >
              Today
            </Button>
            <Button
              variant={dateRange === "yesterday" ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange("yesterday")}
              className={dateRange === "yesterday" ? "bg-orange-500 hover:bg-orange-600" : "border-zinc-700"}
            >
              Yesterday
            </Button>
            <Button
              variant={dateRange === "last7days" ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange("last7days")}
              className={dateRange === "last7days" ? "bg-orange-500 hover:bg-orange-600" : "border-zinc-700"}
            >
              Last 7 Days
            </Button>
            <Button
              variant={dateRange === "last30days" ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange("last30days")}
              className={dateRange === "last30days" ? "bg-orange-500 hover:bg-orange-600" : "border-zinc-700"}
            >
              Last 30 Days
            </Button>
            <Button
              variant={dateRange === "custom" ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange("custom")}
              className={dateRange === "custom" ? "bg-orange-500 hover:bg-orange-600" : "border-zinc-700"}
            >
              Custom
            </Button>
          </div>
          <Button variant="outline" size="sm" className="border-zinc-700 ml-auto bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <span className="text-xs text-zinc-500">Last updated: 2:45 PM</span>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-zinc-950 border-zinc-800 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Phone className="h-5 w-5 text-orange-500" />
                </div>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>23%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{campaignData.totalCalls.toLocaleString()}</div>
              <div className="text-sm text-zinc-400 mb-3">Total Calls Made</div>
              <div className="text-xs text-zinc-500">
                of {campaignData.totalContacts.toLocaleString()} total contacts
              </div>
              <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500"
                  style={{ width: `${(campaignData.totalCalls / campaignData.totalContacts) * 100}%` }}
                />
              </div>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Target className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>5.2%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{campaignData.connectRate}%</div>
              <div className="text-sm text-zinc-400 mb-3">Connect Rate</div>
              <div className="text-xs text-zinc-500">856 contacts reached</div>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex items-center gap-1 text-red-400 text-sm">
                  <TrendingDown className="h-4 w-4" />
                  <span>12s</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{campaignData.avgDuration}</div>
              <div className="text-sm text-zinc-400 mb-3">Average Duration</div>
              <div className="text-xs text-zinc-500">Total talk time: 93h 45m</div>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-500" />
                </div>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>8%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{campaignData.conversions}</div>
              <div className="text-sm text-zinc-400 mb-3">Conversions ({campaignData.conversionRate}%)</div>
              <div className="text-xs text-zinc-500">Revenue: ${campaignData.revenue.toLocaleString()}</div>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-zinc-950 border border-zinc-800">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                AI Performance
              </TabsTrigger>
              <TabsTrigger
                value="contacts"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Contact Details
              </TabsTrigger>
              <TabsTrigger value="agents" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Agents Performance
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Call Volume Chart */}
              <Card className="bg-zinc-950 border-zinc-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Call Volume Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={callVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="time" stroke="#71717a" />
                    <YAxis stroke="#71717a" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px" }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stackId="1"
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.6}
                      name="Total Calls"
                    />
                    <Area
                      type="monotone"
                      dataKey="connected"
                      stackId="2"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                      name="Connected"
                    />
                    <Area
                      type="monotone"
                      dataKey="voicemail"
                      stackId="2"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.6}
                      name="Voicemail"
                    />
                    <Area
                      type="monotone"
                      dataKey="noAnswer"
                      stackId="2"
                      stroke="#6b7280"
                      fill="#6b7280"
                      fillOpacity={0.6}
                      name="No Answer"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Call Outcomes */}
                <Card className="bg-zinc-950 border-zinc-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Call Outcomes Breakdown</h3>
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
                      <Tooltip
                        contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {outcomeData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-zinc-300">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-400">{item.count}</span>
                          <span className="text-white font-medium">{item.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Dispositions Table */}
                <Card className="bg-zinc-950 border-zinc-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Call Dispositions</h3>
                  <div className="space-y-3">
                    {dispositionData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
                      >
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{item.disposition}</div>
                          <div className="text-xs text-zinc-500">{item.avgDuration}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-zinc-400">{item.count}</span>
                          <span className="text-sm font-medium text-orange-500 w-12 text-right">{item.percent}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* AI Performance Tab */}
            <TabsContent value="ai" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-zinc-950 border-zinc-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">AI vs Human Comparison</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-zinc-900 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">1,061</div>
                        <div className="text-xs text-zinc-400 mt-1">AI Calls</div>
                      </div>
                      <div className="text-center p-4 bg-zinc-900 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">186</div>
                        <div className="text-xs text-zinc-400 mt-1">Human Calls</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-400">Avg Duration</span>
                        <div className="flex gap-4">
                          <span className="text-sm text-purple-400">2m 15s</span>
                          <span className="text-sm text-blue-400">8m 30s</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-400">Qualification Rate</span>
                        <div className="flex gap-4">
                          <span className="text-sm text-purple-400">87%</span>
                          <span className="text-sm text-blue-400">92%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-400">Cost per Call</span>
                        <div className="flex gap-4">
                          <span className="text-sm text-purple-400">$0.12</span>
                          <span className="text-sm text-blue-400">$4.50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-zinc-950 border-zinc-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">AI Qualification Funnel</h3>
                  <div className="space-y-3">
                    <div className="relative">
                      <div className="flex items-center justify-between p-3 bg-orange-500/20 rounded-lg">
                        <span className="text-sm text-white">Calls Initiated</span>
                        <span className="text-sm font-bold text-white">1,247 (100%)</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="flex items-center justify-between p-3 bg-green-500/20 rounded-lg">
                        <span className="text-sm text-white">Answered</span>
                        <span className="text-sm font-bold text-white">856 (69%)</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg">
                        <span className="text-sm text-white">Qualified by AI</span>
                        <span className="text-sm font-bold text-white">745 (87%)</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="flex items-center justify-between p-3 bg-purple-500/20 rounded-lg">
                        <span className="text-sm text-white">Transferred to Human</span>
                        <span className="text-sm font-bold text-white">186 (25%)</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="flex items-center justify-between p-3 bg-yellow-500/20 rounded-lg">
                        <span className="text-sm text-white">Converted</span>
                        <span className="text-sm font-bold text-white">142 (76%)</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Contact Details Tab */}
            <TabsContent value="contacts" className="space-y-6">
              <Card className="bg-zinc-950 border-zinc-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Contact Call History</h3>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <Input
                        placeholder="Search contacts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-zinc-900 border-zinc-800 text-white w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="border-zinc-700 bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Contact Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Phone Number</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Date/Time</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Duration</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Disposition</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactHistory.map((contact) => (
                        <tr key={contact.id} className="border-b border-zinc-800 hover:bg-zinc-900/50">
                          <td className="py-3 px-4 text-sm text-white">{contact.name}</td>
                          <td className="py-3 px-4 text-sm text-zinc-400">{contact.phone}</td>
                          <td className="py-3 px-4 text-sm text-zinc-400">{contact.date}</td>
                          <td className="py-3 px-4">
                            <Badge
                              className={
                                contact.status === "Connected"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : contact.status === "Voicemail"
                                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                    : "bg-zinc-700/20 text-zinc-400 border-zinc-700/30"
                              }
                            >
                              {contact.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-zinc-400">{contact.duration}</td>
                          <td className="py-3 px-4 text-sm text-zinc-400">{contact.disposition}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Play className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Phone className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* Agents Performance Tab */}
            <TabsContent value="agents" className="space-y-6">
              <Card className="bg-zinc-950 border-zinc-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Agent Leaderboard</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Rank</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Agent</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Calls</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Connect %</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Conversions</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Avg Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agentLeaderboard.map((agent) => (
                        <tr key={agent.rank} className="border-b border-zinc-800 hover:bg-zinc-900/50">
                          <td className="py-3 px-4">
                            <span className="text-2xl">
                              {agent.rank === 1 ? "🥇" : agent.rank === 2 ? "🥈" : agent.rank === 3 ? "🥉" : agent.rank}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-white">{agent.name}</td>
                          <td className="py-3 px-4 text-sm text-zinc-400">{agent.calls}</td>
                          <td className="py-3 px-4 text-sm text-zinc-400">{agent.connectRate}%</td>
                          <td className="py-3 px-4 text-sm text-zinc-400">
                            {agent.conversions} ({agent.conversionRate}%)
                          </td>
                          <td className="py-3 px-4 text-sm text-zinc-400">{agent.avgDuration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-zinc-800 bg-zinc-950 p-6 space-y-6">
          {/* Campaign Details */}
          <Card className="bg-zinc-900 border-zinc-800 p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Campaign Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Created:</span>
                <span className="text-white">Oct 15, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Start Date:</span>
                <span className="text-white">Oct 20, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">List Used:</span>
                <span className="text-orange-500">Summer Leads</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Contacts:</span>
                <span className="text-white">5,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Campaign Type:</span>
                <span className="text-white">Outbound</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">AI Agent:</span>
                <span className="text-green-400">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Concurrent Calls:</span>
                <span className="text-white">10</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-zinc-900 border-zinc-800 p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start border-zinc-700 text-white bg-transparent">
                Add More Contacts
              </Button>
              <Button variant="outline" className="w-full justify-start border-zinc-700 text-white bg-transparent">
                Adjust Settings
              </Button>
              <Button variant="outline" className="w-full justify-start border-zinc-700 text-white bg-transparent">
                Clone Campaign
              </Button>
              <Button variant="outline" className="w-full justify-start border-zinc-700 text-white bg-transparent">
                Schedule Report
              </Button>
            </div>
          </Card>

          {/* Activity Feed */}
          <Card className="bg-zinc-900 border-zinc-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Real-time Activity</h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-zinc-500">Live</span>
              </div>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {activityFeed.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="text-xs text-zinc-500 w-16 flex-shrink-0">{activity.time}</div>
                  <div className="flex-1">
                    <div
                      className={`text-xs ${
                        activity.type === "success"
                          ? "text-green-400"
                          : activity.type === "warning"
                            ? "text-yellow-400"
                            : "text-blue-400"
                      }`}
                    >
                      {activity.event}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
