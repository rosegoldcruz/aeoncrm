"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Download,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Phone,
  Clock,
  Target,
  Star,
  Trophy,
  Medal,
  Award,
} from "lucide-react"

export default function AgentPerformancePage() {
  const [dateRange, setDateRange] = useState("week")
  const [selectedAgent, setSelectedAgent] = useState("all")
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for metrics
  const topMetrics = [
    {
      title: "Total Calls Made",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Phone,
    },
    {
      title: "Average Handle Time",
      value: "04:32",
      change: "-8.2%",
      trend: "down",
      icon: Clock,
    },
    {
      title: "Conversion Rate",
      value: "34.8%",
      change: "+5.3%",
      trend: "up",
      icon: Target,
    },
    {
      title: "Customer Satisfaction",
      value: "4.6",
      change: "+0.3",
      trend: "up",
      icon: Star,
      rating: 4.6,
    },
  ]

  // Mock data for call volume chart
  const callVolumeData = [
    { date: "Mon", answered: 120, voicemail: 45, busy: 20, noAnswer: 35 },
    { date: "Tue", answered: 145, voicemail: 38, busy: 25, noAnswer: 42 },
    { date: "Wed", answered: 165, voicemail: 42, busy: 18, noAnswer: 38 },
    { date: "Thu", answered: 158, voicemail: 50, busy: 22, noAnswer: 40 },
    { date: "Fri", answered: 180, voicemail: 35, busy: 15, noAnswer: 30 },
    { date: "Sat", answered: 95, voicemail: 28, busy: 12, noAnswer: 25 },
    { date: "Sun", answered: 75, voicemail: 20, busy: 10, noAnswer: 18 },
  ]

  // Mock data for performance distribution
  const performanceData = [
    { agent: "Sarah Chen", calls: 245, talkTime: 1820, conversions: 89 },
    { agent: "Mike Johnson", calls: 238, talkTime: 1650, conversions: 82 },
    { agent: "Emily Davis", calls: 225, talkTime: 1580, conversions: 78 },
    { agent: "James Wilson", calls: 218, talkTime: 1720, conversions: 75 },
    { agent: "Lisa Anderson", calls: 205, talkTime: 1450, conversions: 71 },
  ]

  // Mock data for top performers
  const topPerformers = [
    {
      rank: 1,
      name: "Sarah Chen",
      calls: 245,
      conversionRate: "36.3%",
      avgHandleTime: "04:28",
      rating: 4.8,
    },
    {
      rank: 2,
      name: "Mike Johnson",
      calls: 238,
      conversionRate: "34.5%",
      avgHandleTime: "04:15",
      rating: 4.7,
    },
    {
      rank: 3,
      name: "Emily Davis",
      calls: 225,
      conversionRate: "34.7%",
      avgHandleTime: "04:35",
      rating: 4.6,
    },
  ]

  // Mock data for individual agent pie chart
  const callDistributionData = [
    { name: "Answered", value: 180, color: "#10b981" },
    { name: "Voicemail", value: 45, color: "#f59e0b" },
    { name: "Busy", value: 20, color: "#ef4444" },
    { name: "No Answer", value: 35, color: "#6b7280" },
  ]

  // Mock data for radar chart
  const radarData = [
    { metric: "Call Volume", agent1: 90, agent2: 75, agent3: 85 },
    { metric: "Conversion", agent1: 85, agent2: 90, agent3: 80 },
    { metric: "Handle Time", agent1: 70, agent2: 85, agent3: 75 },
    { metric: "Satisfaction", agent1: 95, agent2: 88, agent3: 92 },
    { metric: "Follow-up", agent1: 80, agent2: 70, agent3: 85 },
  ]

  // Mock data for AI impact
  const aiImpactData = [
    { metric: "Conversion Rate", withAI: 38.5, withoutAI: 28.2 },
    { metric: "Handle Time", withAI: 4.2, withoutAI: 5.8 },
    { metric: "Satisfaction", withAI: 4.7, withoutAI: 4.1 },
  ]

  const handleRefresh = () => {
    setLastUpdated(new Date())
  }

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`)
  }

  return (
    <div className="min-h-screen bg-black text-white p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-orange-500 mb-2">Agent Performance</h1>
          <p className="text-neutral-400 text-sm">Analytics dashboard and KPIs</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full sm:w-[140px] bg-neutral-900 border-neutral-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="border-neutral-800 hover:bg-neutral-900 bg-transparent"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("csv")}
            className="border-neutral-800 hover:bg-neutral-900"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <span className="text-xs text-neutral-500">Updated: {lastUpdated.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {topMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card
              key={index}
              className="bg-neutral-900 border-neutral-800 p-6 hover:border-orange-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Icon className="w-5 h-5 text-orange-500" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    metric.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {metric.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {metric.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-neutral-400">{metric.title}</div>
              {metric.rating && (
                <div className="flex items-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= metric.rating ? "fill-orange-500 text-orange-500" : "text-neutral-600"
                      }`}
                    />
                  ))}
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-neutral-900 border border-neutral-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="individual">Individual Agent</TabsTrigger>
          <TabsTrigger value="comparison">Team Comparison</TabsTrigger>
          <TabsTrigger value="ai-impact">AI Co-Pilot Impact</TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent value="overview" className="space-y-6">
          {/* Call Volume Chart */}
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Call Volume Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={callVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="answered" stroke="#10b981" strokeWidth={2} name="Answered" />
                <Line type="monotone" dataKey="voicemail" stroke="#f59e0b" strokeWidth={2} name="Voicemail" />
                <Line type="monotone" dataKey="busy" stroke="#ef4444" strokeWidth={2} name="Busy" />
                <Line type="monotone" dataKey="noAnswer" stroke="#6b7280" strokeWidth={2} name="No Answer" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Performance Distribution */}
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="agent" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="calls" fill="#FF6B35" name="Calls" />
                <Bar dataKey="conversions" fill="#10b981" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Performers Table */}
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Top Performers</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Rank</th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Agent</th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Calls</th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Conversion Rate</th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Avg Handle Time</th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {topPerformers.map((performer) => (
                    <tr
                      key={performer.rank}
                      className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {performer.rank === 1 && <Trophy className="w-5 h-5 text-yellow-500" />}
                          {performer.rank === 2 && <Medal className="w-5 h-5 text-gray-400" />}
                          {performer.rank === 3 && <Award className="w-5 h-5 text-orange-600" />}
                          <span className="text-white font-semibold">#{performer.rank}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-white font-medium">{performer.name}</td>
                      <td className="py-3 px-4 text-white">{performer.calls}</td>
                      <td className="py-3 px-4 text-green-500 font-semibold">{performer.conversionRate}</td>
                      <td className="py-3 px-4 text-white">{performer.avgHandleTime}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                          <span className="text-white">{performer.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 2: Individual Agent Deep Dive */}
        <TabsContent value="individual" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <label className="text-neutral-400">Select Agent:</label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-full sm:w-[200px] bg-neutral-900 border-neutral-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="sarah">Sarah Chen</SelectItem>
                <SelectItem value="mike">Mike Johnson</SelectItem>
                <SelectItem value="emily">Emily Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Call Distribution Pie Chart */}
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Call Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={callDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: any) => {
                      const { name, value } = props
                      const total = callDistributionData.reduce((sum, entry) => sum + entry.value, 0)
                      const percent = ((value / total) * 100).toFixed(0)
                      return `${name} ${percent}%`
                    }}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {callDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Individual Metrics */}
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Total Calls</span>
                  <span className="text-white font-semibold text-xl">280</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Conversion Rate</span>
                  <span className="text-green-500 font-semibold text-xl">36.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Avg Handle Time</span>
                  <span className="text-white font-semibold text-xl">04:28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Customer Rating</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-xl">4.8</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= 4.8 ? "fill-orange-500 text-orange-500" : "text-neutral-600"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Call History Table */}
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Call History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Date/Time</th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Contact</th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Duration</th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Outcome</th>
                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      time: "10:45 AM",
                      contact: "John Smith",
                      duration: "05:23",
                      outcome: "Converted",
                      notes: "Interested in premium plan",
                    },
                    {
                      time: "11:20 AM",
                      contact: "Jane Doe",
                      duration: "03:45",
                      outcome: "Follow-up",
                      notes: "Call back next week",
                    },
                    {
                      time: "02:15 PM",
                      contact: "Bob Wilson",
                      duration: "04:12",
                      outcome: "Converted",
                      notes: "Signed up for trial",
                    },
                  ].map((call, index) => (
                    <tr key={index} className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                      <td className="py-3 px-4 text-white">{call.time}</td>
                      <td className="py-3 px-4 text-white">{call.contact}</td>
                      <td className="py-3 px-4 text-white">{call.duration}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            call.outcome === "Converted"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-orange-500/20 text-orange-500"
                          }`}
                        >
                          {call.outcome}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-neutral-400 text-sm">{call.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 3: Team Comparison */}
        <TabsContent value="comparison" className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Multi-Agent Comparison</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="metric" stroke="#9ca3af" />
                <PolarRadiusAxis stroke="#9ca3af" />
                <Radar name="Sarah Chen" dataKey="agent1" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.3} />
                <Radar name="Mike Johnson" dataKey="agent2" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Radar name="Emily Davis" dataKey="agent3" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Legend />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Leaderboard */}
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Leaderboard Rankings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topPerformers.map((performer) => (
                <div
                  key={performer.rank}
                  className="bg-neutral-800 rounded-lg p-4 border border-neutral-700 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-orange-500">#{performer.rank}</span>
                    {performer.rank === 1 && <Trophy className="w-6 h-6 text-yellow-500" />}
                    {performer.rank === 2 && <Medal className="w-6 h-6 text-gray-400" />}
                    {performer.rank === 3 && <Award className="w-6 h-6 text-orange-600" />}
                  </div>
                  <div className="text-white font-semibold mb-2">{performer.name}</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Calls:</span>
                      <span className="text-white">{performer.calls}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Conv Rate:</span>
                      <span className="text-green-500">{performer.conversionRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Rating:</span>
                      <span className="text-white">{performer.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Tab 4: AI Co-Pilot Impact */}
        <TabsContent value="ai-impact" className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">AI Assistance Impact Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aiImpactData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="metric" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="withAI" fill="#10b981" name="With AI" />
                <Bar dataKey="withoutAI" fill="#6b7280" name="Without AI" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <div className="text-neutral-400 text-sm mb-2">Conversion Rate Lift</div>
              <div className="text-3xl font-bold text-green-500 mb-1">+36.5%</div>
              <div className="text-xs text-neutral-500">With AI assistance vs without</div>
            </Card>

            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <div className="text-neutral-400 text-sm mb-2">AI Suggestion Acceptance</div>
              <div className="text-3xl font-bold text-orange-500 mb-1">78.3%</div>
              <div className="text-xs text-neutral-500">Agents follow AI recommendations</div>
            </Card>

            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <div className="text-neutral-400 text-sm mb-2">Handle Time Reduction</div>
              <div className="text-3xl font-bold text-blue-500 mb-1">-27.6%</div>
              <div className="text-xs text-neutral-500">Average time saved per call</div>
            </Card>
          </div>

          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Most Helpful AI Suggestions</h3>
            <div className="space-y-3">
              {[
                { suggestion: "Objection handling scripts", usage: 245 },
                { suggestion: "Product recommendations", usage: 198 },
                { suggestion: "Pricing negotiation tips", usage: 176 },
                { suggestion: "Follow-up scheduling", usage: 152 },
                { suggestion: "Competitor comparisons", usage: 134 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                  <span className="text-white">{item.suggestion}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-neutral-700 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${(item.usage / 245) * 100}%` }}
                      />
                    </div>
                    <span className="text-neutral-400 text-sm w-12 text-right">{item.usage}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
