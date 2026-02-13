"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
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
  TrendingUp,
  TrendingDown,
  Users,
  Phone,
  DollarSign,
  Target,
  Trophy,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  MoreVertical,
  ChevronDown,
  Play,
  Pause,
  CheckCircle2,
  FileText,
} from "lucide-react"

// Mock data
const mockCampaigns = [
  {
    id: 1,
    name: "Q4 Enterprise Sales",
    status: "active",
    contacts: 5000,
    calls: 3456,
    connected: 2401,
    connectRate: 69,
    conversions: 845,
    conversionRate: 35,
    revenue: 169000,
    roi: 920,
    cost: 18400,
    startDate: "Oct 1",
    endDate: "Nov 30",
  },
  {
    id: 2,
    name: "Lead Follow-up",
    status: "active",
    contacts: 2300,
    calls: 1892,
    connected: 1234,
    connectRate: 65,
    conversions: 423,
    conversionRate: 34,
    revenue: 84600,
    roi: 780,
    cost: 10800,
    startDate: "Oct 15",
    endDate: "Dec 15",
  },
  {
    id: 3,
    name: "Summer Promo",
    status: "completed",
    contacts: 8000,
    calls: 6234,
    connected: 4123,
    connectRate: 66,
    conversions: 987,
    conversionRate: 24,
    revenue: 98700,
    roi: 650,
    cost: 15200,
    startDate: "Jun 1",
    endDate: "Aug 31",
  },
  {
    id: 4,
    name: "Product Launch",
    status: "active",
    contacts: 3500,
    calls: 2789,
    connected: 1923,
    connectRate: 69,
    conversions: 567,
    conversionRate: 29,
    revenue: 76200,
    roi: 710,
    cost: 10700,
    startDate: "Oct 20",
    endDate: "Dec 20",
  },
]

const campaignProgressData = [
  { date: "Oct 1", calls: 120, connected: 85, conversions: 28 },
  { date: "Oct 8", calls: 450, connected: 315, conversions: 98 },
  { date: "Oct 15", calls: 890, connected: 625, conversions: 215 },
  { date: "Oct 22", calls: 1450, connected: 1015, conversions: 398 },
  { date: "Oct 29", calls: 2100, connected: 1470, conversions: 587 },
  { date: "Nov 5", calls: 2650, connected: 1855, conversions: 712 },
  { date: "Nov 12", calls: 3100, connected: 2170, conversions: 798 },
  { date: "Nov 19", calls: 3456, connected: 2401, conversions: 845 },
]

const hourlyHeatmapData = [
  { day: "Mon", "9AM": 45, "10AM": 78, "11AM": 82, "12PM": 65, "1PM": 58, "2PM": 72, "3PM": 68, "4PM": 55 },
  { day: "Tue", "9AM": 52, "10AM": 85, "11AM": 88, "12PM": 70, "1PM": 62, "2PM": 75, "3PM": 71, "4PM": 58 },
  { day: "Wed", "9AM": 48, "10AM": 80, "11AM": 85, "12PM": 68, "1PM": 60, "2PM": 73, "3PM": 69, "4PM": 56 },
  { day: "Thu", "9AM": 50, "10AM": 82, "11AM": 86, "12PM": 69, "1PM": 61, "2PM": 74, "3PM": 70, "4PM": 57 },
  { day: "Fri", "9AM": 42, "10AM": 72, "11AM": 76, "12PM": 62, "1PM": 55, "2PM": 68, "3PM": 64, "4PM": 52 },
]

const dispositionData = [
  { name: "Connected & Spoke", value: 2401, color: "#10b981" },
  { name: "Voicemail", value: 623, color: "#3b82f6" },
  { name: "No Answer", value: 289, color: "#f59e0b" },
  { name: "Busy", value: 98, color: "#ef4444" },
  { name: "Failed", value: 45, color: "#6b7280" },
]

const radarData = [
  { metric: "Connect Rate", "Campaign A": 69, "Campaign B": 65, "Campaign C": 66 },
  { metric: "Conv Rate", "Campaign A": 35, "Campaign B": 34, "Campaign C": 24 },
  { metric: "ROI", "Campaign A": 92, "Campaign B": 78, "Campaign C": 65 },
  { metric: "Volume", "Campaign A": 69, "Campaign B": 38, "Campaign C": 100 },
  { metric: "Efficiency", "Campaign A": 85, "Campaign B": 80, "Campaign C": 70 },
]

const revenueData = [
  { month: "Jun", revenue: 98700, cost: 15200 },
  { month: "Jul", revenue: 0, cost: 0 },
  { month: "Aug", revenue: 0, cost: 0 },
  { month: "Sep", revenue: 0, cost: 0 },
  { month: "Oct", revenue: 253200, cost: 29100 },
  { month: "Nov", revenue: 76600, cost: 10900 },
]

export default function CampaignReportPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCampaign, setSelectedCampaign] = useState("1")
  const [compareMode, setCompareMode] = useState(false)
  const [selectedCompareCampaigns, setSelectedCompareCampaigns] = useState<string[]>(["1", "2", "3"])

  const totalCalls = mockCampaigns.reduce((sum, c) => sum + c.calls, 0)
  const totalConnected = mockCampaigns.reduce((sum, c) => sum + c.connected, 0)
  const totalRevenue = mockCampaigns.reduce((sum, c) => sum + c.revenue, 0)
  const totalCost = mockCampaigns.reduce((sum, c) => sum + c.cost, 0)
  const totalProfit = totalRevenue - totalCost
  const overallROI = ((totalProfit / totalCost) * 100).toFixed(0)
  const avgConnectRate = ((totalConnected / totalCalls) * 100).toFixed(1)
  const totalConversions = mockCampaigns.reduce((sum, c) => sum + c.conversions, 0)
  const avgConversionRate = ((totalConversions / totalConnected) * 100).toFixed(1)

  const activeCampaigns = mockCampaigns.filter((c) => c.status === "active").length
  const completedCampaigns = mockCampaigns.filter((c) => c.status === "completed").length
  const totalContacts = mockCampaigns.reduce((sum, c) => sum + c.contacts, 0)

  const bestCampaign = mockCampaigns.reduce((best, current) =>
    current.conversionRate > best.conversionRate ? current : best,
  )

  const selectedCampaignData = mockCampaigns.find((c) => c.id === Number.parseInt(selectedCampaign))

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-orange-500 mb-1">Campaign Performance Reports</h1>
            <p className="text-gray-400 text-sm">Analyze campaign metrics and ROI</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="7days">
              <SelectTrigger className="w-full sm:w-[180px] bg-[#1a1a1a] border-gray-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-[#1a1a1a] border-gray-800">
              <Download className="w-4 h-4 mr-2" />
              Export Report
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant={compareMode ? "default" : "outline"}
              className={compareMode ? "bg-orange-500 hover:bg-orange-600" : "bg-[#1a1a1a] border-gray-800"}
              onClick={() => setCompareMode(!compareMode)}
            >
              Compare Campaigns
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input placeholder="Search campaigns..." className="pl-10 bg-[#1a1a1a] border-gray-800" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[150px] bg-[#1a1a1a] border-gray-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="bg-[#1a1a1a] border-gray-800">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Total Campaigns</p>
            <p className="text-2xl font-bold text-white">{mockCampaigns.length}</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-green-500">Active: {activeCampaigns}</span>
              <span className="text-gray-500">Done: {completedCampaigns}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">{totalContacts.toLocaleString()} contacts</p>
          </div>
        </Card>

        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <Phone className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Aggregate Calls</p>
            <p className="text-2xl font-bold text-white">{totalCalls.toLocaleString()}</p>
            <p className="text-xs text-gray-400">
              Connected: {totalConnected.toLocaleString()} ({avgConnectRate}%)
            </p>
            <div className="flex items-center gap-1 text-xs text-green-500 mt-2">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 12% vs previous</span>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Overall ROI</p>
            <p className="text-2xl font-bold text-green-500">{overallROI}%</p>
            <p className="text-xs text-gray-400">Revenue: ${(totalRevenue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-gray-400">Cost: ${(totalCost / 1000).toFixed(0)}K</p>
            <p className="text-xs text-green-500 mt-2">Profit: ${(totalProfit / 1000).toFixed(0)}K</p>
          </div>
        </Card>

        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <Target className="w-5 h-5 text-teal-500" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Avg Performance</p>
            <p className="text-2xl font-bold text-white">{avgConnectRate}%</p>
            <p className="text-xs text-gray-400">Connect rate</p>
            <p className="text-xs text-gray-400">Conv rate: {avgConversionRate}%</p>
            <p className="text-xs text-gray-500 mt-2">Avg duration: 18 days</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <Trophy className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Best Performer</p>
            <p className="text-lg font-bold text-white">{bestCampaign.name}</p>
            <p className="text-xs text-orange-500">Conv: {bestCampaign.conversionRate}%</p>
            <Button variant="link" className="text-orange-500 p-0 h-auto text-xs mt-2">
              View Details →
            </Button>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-800">
        {[
          { id: "overview", label: "Campaign Overview" },
          { id: "detailed", label: "Detailed Analysis" },
          { id: "comparison", label: "Campaign Comparison" },
          { id: "roi", label: "ROI & Financial" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? "text-orange-500" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Campaign Performance Table */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Campaign Performance Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Campaign</th>
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Status</th>
                    <th className="text-right text-sm font-medium text-gray-400 pb-3">Contacts</th>
                    <th className="text-right text-sm font-medium text-gray-400 pb-3">Calls</th>
                    <th className="text-right text-sm font-medium text-gray-400 pb-3">Connected</th>
                    <th className="text-right text-sm font-medium text-gray-400 pb-3">Conv</th>
                    <th className="text-right text-sm font-medium text-gray-400 pb-3">Conv%</th>
                    <th className="text-right text-sm font-medium text-gray-400 pb-3">Revenue</th>
                    <th className="text-right text-sm font-medium text-gray-400 pb-3">ROI</th>
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Dates</th>
                    <th className="text-center text-sm font-medium text-gray-400 pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-gray-800/50 hover:bg-gray-900/50">
                      <td className="py-4">
                        <button className="text-sm font-medium text-white hover:text-orange-500">
                          {campaign.name}
                        </button>
                      </td>
                      <td className="py-4">
                        <Badge
                          variant="outline"
                          className={
                            campaign.status === "active"
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                          }
                        >
                          {campaign.status === "active" ? "🟢 Active" : "⚫ Done"}
                        </Badge>
                      </td>
                      <td className="py-4 text-right text-sm text-gray-300">{campaign.contacts.toLocaleString()}</td>
                      <td className="py-4 text-right text-sm text-gray-300">{campaign.calls.toLocaleString()}</td>
                      <td className="py-4 text-right text-sm text-gray-300">
                        {campaign.connected.toLocaleString()} ({campaign.connectRate}%)
                      </td>
                      <td className="py-4 text-right text-sm text-gray-300">{campaign.conversions}</td>
                      <td className="py-4 text-right text-sm font-medium text-green-500">{campaign.conversionRate}%</td>
                      <td className="py-4 text-right text-sm font-medium text-white">
                        ${(campaign.revenue / 1000).toFixed(0)}K
                      </td>
                      <td className="py-4 text-right text-sm font-medium text-green-500">{campaign.roi}%</td>
                      <td className="py-4 text-sm text-gray-400">
                        {campaign.startDate} - {campaign.endDate}
                      </td>
                      <td className="py-4 text-center">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campaign Comparison Bar Chart */}
            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Campaign Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockCampaigns}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis
                    dataKey="name"
                    stroke="#666"
                    tick={{ fontSize: 12 }}
                    angle={-15}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend />
                  <Bar dataKey="conversions" fill="#10b981" name="Conversions" />
                  <Bar dataKey="conversionRate" fill="#f97316" name="Conv Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Connect Rate Comparison */}
            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Connect Rate Comparison</h3>
              <div className="space-y-4">
                {mockCampaigns.map((campaign) => (
                  <div key={campaign.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">{campaign.name}</span>
                      <span className="text-sm font-medium text-white">{campaign.connectRate}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          campaign.connectRate >= 68
                            ? "bg-green-500"
                            : campaign.connectRate >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${campaign.connectRate}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Company Average</span>
                    <span className="text-orange-500 font-medium">{avgConnectRate}%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Status Distribution and Top/Bottom Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Status Distribution */}
            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Campaign Status</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Active", value: activeCampaigns, color: "#10b981" },
                      { name: "Completed", value: completedCampaigns, color: "#6b7280" },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[
                      { name: "Active", value: activeCampaigns, color: "#10b981" },
                      { name: "Completed", value: completedCampaigns, color: "#6b7280" },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-gray-300">Active</span>
                  </div>
                  <span className="text-white font-medium">{activeCampaigns}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500" />
                    <span className="text-gray-300">Completed</span>
                  </div>
                  <span className="text-white font-medium">{completedCampaigns}</span>
                </div>
              </div>
            </Card>

            {/* Top Performers */}
            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Top Performers
              </h3>
              <div className="space-y-4">
                {mockCampaigns
                  .sort((a, b) => b.conversionRate - a.conversionRate)
                  .slice(0, 3)
                  .map((campaign, index) => (
                    <div key={campaign.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">
                          #{index + 1} {campaign.name}
                        </span>
                        <span className="text-sm font-bold text-green-500">{campaign.conversionRate}%</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {campaign.conversions} conversions • ${(campaign.revenue / 1000).toFixed(0)}K revenue
                      </p>
                    </div>
                  ))}
              </div>
            </Card>

            {/* Bottom Performers */}
            <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                Needs Attention
              </h3>
              <div className="space-y-4">
                {mockCampaigns
                  .sort((a, b) => a.conversionRate - b.conversionRate)
                  .slice(0, 3)
                  .map((campaign) => (
                    <div key={campaign.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">{campaign.name}</span>
                        <span className="text-sm font-bold text-red-500">{campaign.conversionRate}%</span>
                      </div>
                      <p className="text-xs text-gray-400">Low conversion rate • Review script</p>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "detailed" && selectedCampaignData && (
        <div className="space-y-6">
          {/* Campaign Selector */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Select Campaign</label>
                <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                  <SelectTrigger className="w-full sm:w-[300px] bg-[#0a0a0a] border-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCampaigns.map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.id.toString()}>
                        {campaign.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant="outline"
                  className={
                    selectedCampaignData.status === "active"
                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                      : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                  }
                >
                  {selectedCampaignData.status === "active" ? (
                    <Play className="w-3 h-3 mr-1" />
                  ) : (
                    <Pause className="w-3 h-3 mr-1" />
                  )}
                  {selectedCampaignData.status}
                </Badge>
                <span className="text-sm text-gray-400">
                  {selectedCampaignData.startDate} - {selectedCampaignData.endDate}
                </span>
              </div>
            </div>
          </Card>

          {/* Comprehensive Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-[#1a1a1a] border-gray-800 p-4">
              <p className="text-sm text-gray-400 mb-1">Total Contacts</p>
              <p className="text-2xl font-bold text-white">{selectedCampaignData.contacts.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">In campaign list</p>
            </Card>
            <Card className="bg-[#1a1a1a] border-gray-800 p-4">
              <p className="text-sm text-gray-400 mb-1">Calls Made</p>
              <p className="text-2xl font-bold text-white">{selectedCampaignData.calls.toLocaleString()}</p>
              <p className="text-xs text-green-500 mt-1">{selectedCampaignData.connectRate}% attempted</p>
            </Card>
            <Card className="bg-[#1a1a1a] border-gray-800 p-4">
              <p className="text-sm text-gray-400 mb-1">Connected</p>
              <p className="text-2xl font-bold text-white">{selectedCampaignData.connected.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">{selectedCampaignData.connectRate}% connect rate</p>
            </Card>
            <Card className="bg-[#1a1a1a] border-gray-800 p-4">
              <p className="text-sm text-gray-400 mb-1">Conversions</p>
              <p className="text-2xl font-bold text-green-500">{selectedCampaignData.conversions}</p>
              <p className="text-xs text-gray-500 mt-1">{selectedCampaignData.conversionRate}% conv rate</p>
            </Card>
            <Card className="bg-[#1a1a1a] border-gray-800 p-4">
              <p className="text-sm text-gray-400 mb-1">Revenue</p>
              <p className="text-2xl font-bold text-white">${(selectedCampaignData.revenue / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-500 mt-1">Total generated</p>
            </Card>
            <Card className="bg-[#1a1a1a] border-gray-800 p-4">
              <p className="text-sm text-gray-400 mb-1">Cost</p>
              <p className="text-2xl font-bold text-white">${(selectedCampaignData.cost / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-500 mt-1">Total spent</p>
            </Card>
            <Card className="bg-[#1a1a1a] border-gray-800 p-4">
              <p className="text-sm text-gray-400 mb-1">ROI</p>
              <p className="text-2xl font-bold text-green-500">{selectedCampaignData.roi}%</p>
              <p className="text-xs text-gray-500 mt-1">Return on investment</p>
            </Card>
            <Card className="bg-[#1a1a1a] border-gray-800 p-4">
              <p className="text-sm text-gray-400 mb-1">Avg Call Duration</p>
              <p className="text-2xl font-bold text-white">4m 41s</p>
              <p className="text-xs text-gray-500 mt-1">Talk time</p>
            </Card>
          </div>

          {/* Detailed Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campaign Progress Over Time */}
            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Campaign Progress Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={campaignProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="calls"
                    stackId="1"
                    stroke="#f97316"
                    fill="#f97316"
                    fillOpacity={0.6}
                    name="Calls"
                  />
                  <Area
                    type="monotone"
                    dataKey="connected"
                    stackId="2"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Connected"
                  />
                  <Area
                    type="monotone"
                    dataKey="conversions"
                    stackId="3"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                    name="Conversions"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Call Disposition Distribution */}
            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Call Disposition Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dispositionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: any) => {
                      const { name, value } = props
                      const total = dispositionData.reduce((sum, entry) => sum + entry.value, 0)
                      const percent = ((value / total) * 100).toFixed(0)
                      return `${name} ${percent}%`
                    }}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dispositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* AI-Generated Insights */}
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              AI-Generated Insights
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                <p className="text-sm text-gray-300">
                  Connect rate increased 12% after adjusting calling hours to 10 AM - 12 PM window
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                <p className="text-sm text-gray-300">
                  Tuesday mornings showed highest connect rates (78%) - consider scheduling more calls during this time
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                <p className="text-sm text-gray-300">
                  Recommended: Retarget 'No Answer' contacts (289 remaining) with different time slots
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "comparison" && (
        <div className="space-y-6">
          {/* Multi-Campaign Selector */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Select Campaigns to Compare (2-6)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedCompareCampaigns.includes(campaign.id.toString())
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-gray-800 bg-[#0a0a0a] hover:border-gray-700"
                  }`}
                  onClick={() => {
                    const id = campaign.id.toString()
                    setSelectedCompareCampaigns((prev) =>
                      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 6 ? [...prev, id] : prev,
                    )
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white text-sm">{campaign.name}</h4>
                    <CheckCircle2
                      className={`w-5 h-5 ${
                        selectedCompareCampaigns.includes(campaign.id.toString()) ? "text-orange-500" : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div className="space-y-1 text-xs text-gray-400">
                    <p>Conv Rate: {campaign.conversionRate}%</p>
                    <p>ROI: {campaign.roi}%</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Side-by-Side Metrics Table */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Side-by-Side Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Metric</th>
                    {selectedCompareCampaigns.map((id) => {
                      const campaign = mockCampaigns.find((c) => c.id === Number.parseInt(id))
                      return (
                        <th key={id} className="text-right text-sm font-medium text-gray-400 pb-3">
                          {campaign?.name}
                        </th>
                      )
                    })}
                    <th className="text-right text-sm font-medium text-orange-500 pb-3">Best</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Total Contacts", key: "contacts" },
                    { label: "Calls Made", key: "calls" },
                    { label: "Connect Rate", key: "connectRate", suffix: "%" },
                    { label: "Conversions", key: "conversions" },
                    { label: "Conversion Rate", key: "conversionRate", suffix: "%" },
                    {
                      label: "Revenue",
                      key: "revenue",
                      prefix: "$",
                      format: (v: number) => (v / 1000).toFixed(0) + "K",
                    },
                    { label: "ROI", key: "roi", suffix: "%" },
                  ].map((metric) => {
                    const values = selectedCompareCampaigns.map((id) => {
                      const campaign = mockCampaigns.find((c) => c.id === Number.parseInt(id))
                      return campaign ? campaign[metric.key as keyof typeof campaign] : 0
                    })
                    const bestValue = Math.max(...(values as number[]))
                    const bestCampaign = mockCampaigns.find(
                      (c) =>
                        selectedCompareCampaigns.includes(c.id.toString()) &&
                        c[metric.key as keyof typeof c] === bestValue,
                    )

                    return (
                      <tr key={metric.key} className="border-b border-gray-800/50">
                        <td className="py-3 text-sm text-gray-300">{metric.label}</td>
                        {selectedCompareCampaigns.map((id) => {
                          const campaign = mockCampaigns.find((c) => c.id === Number.parseInt(id))
                          const value = campaign ? campaign[metric.key as keyof typeof campaign] : 0
                          const displayValue = metric.format
                            ? metric.format(value as number)
                            : (value as number).toLocaleString()
                          const isBest = value === bestValue

                          return (
                            <td
                              key={id}
                              className={`py-3 text-right text-sm font-medium ${
                                isBest ? "text-green-500" : "text-white"
                              }`}
                            >
                              {metric.prefix}
                              {displayValue}
                              {metric.suffix}
                            </td>
                          )
                        })}
                        <td className="py-3 text-right text-sm text-orange-500">{bestCampaign?.name}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Visual Comparisons */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Multi-Campaign Radar Chart */}
            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Performance Radar</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="metric" stroke="#666" />
                  <PolarRadiusAxis stroke="#666" />
                  <Radar name="Campaign A" dataKey="Campaign A" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
                  <Radar name="Campaign B" dataKey="Campaign B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Campaign C" dataKey="Campaign C" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Legend />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            {/* ROI Comparison */}
            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">ROI Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={mockCampaigns.filter((c) => selectedCompareCampaigns.includes(c.id.toString()))}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" stroke="#666" />
                  <YAxis dataKey="name" type="category" stroke="#666" width={150} />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                  <Bar dataKey="roi" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Key Differences */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Key Differences Identified</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <ArrowUpRight className="w-4 h-4 text-green-500 mt-1" />
                <p className="text-sm text-gray-300">{bestCampaign.name} has 8% higher connect rate than average</p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowDownRight className="w-4 h-4 text-orange-500 mt-1" />
                <p className="text-sm text-gray-300">Summer Promo has 50% more volume but lower conversion rate</p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowUpRight className="w-4 h-4 text-blue-500 mt-1" />
                <p className="text-sm text-gray-300">
                  Lead Follow-up has longest average call duration (better engagement)
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "roi" && (
        <div className="space-y-6">
          {/* Revenue Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 p-6">
              <p className="text-sm text-gray-400 mb-2">Total Revenue</p>
              <p className="text-3xl font-bold text-green-500">${(totalRevenue / 1000).toFixed(0)}K</p>
              <div className="flex items-center gap-1 text-sm text-green-500 mt-2">
                <TrendingUp className="w-4 h-4" />
                <span>+18% vs last period</span>
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20 p-6">
              <p className="text-sm text-gray-400 mb-2">Total Costs</p>
              <p className="text-3xl font-bold text-white">${(totalCost / 1000).toFixed(0)}K</p>
              <div className="space-y-1 mt-2 text-xs text-gray-400">
                <p>Labor: ${((totalCost * 0.72) / 1000).toFixed(1)}K (72%)</p>
                <p>Telephony: ${((totalCost * 0.18) / 1000).toFixed(1)}K (18%)</p>
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20 p-6">
              <p className="text-sm text-gray-400 mb-2">Net Profit</p>
              <p className="text-3xl font-bold text-orange-500">${(totalProfit / 1000).toFixed(0)}K</p>
              <p className="text-sm text-gray-400 mt-2">ROI: {overallROI}%</p>
            </Card>
          </div>

          {/* Campaign-Level Financial Table */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Campaign Financial Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-sm font-medium text-gray-400 pb-3">Campaign</th>
                    <th className="text-right text-sm font-medium text-gray-400 pb-3">Revenue</th>
                    <th className="text-right text-sm font-medium text-gray-400 pb-3">Cost</th>
                    <th className="text-right text-sm font-medium text-gray-400 pb-3">Profit</th>
                    <th className="text-right text-sm font-medium text-gray-400 pb-3">ROI</th>
                    <th className="text-right text-sm font-medium text-gray-400 pb-3">Cost/Lead</th>
                    <th className="text-right text-sm font-medium text-gray-400 pb-3">Revenue/Lead</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCampaigns.map((campaign) => {
                    const profit = campaign.revenue - campaign.cost
                    const costPerLead = campaign.cost / campaign.contacts
                    const revenuePerLead = campaign.revenue / campaign.contacts

                    return (
                      <tr key={campaign.id} className="border-b border-gray-800/50">
                        <td className="py-4 text-sm font-medium text-white">{campaign.name}</td>
                        <td className="py-4 text-right text-sm font-medium text-green-500">
                          ${(campaign.revenue / 1000).toFixed(0)}K
                        </td>
                        <td className="py-4 text-right text-sm text-gray-300">${(campaign.cost / 1000).toFixed(1)}K</td>
                        <td className="py-4 text-right text-sm font-medium text-white">
                          ${(profit / 1000).toFixed(0)}K
                        </td>
                        <td className="py-4 text-right text-sm font-bold text-green-500">{campaign.roi}%</td>
                        <td className="py-4 text-right text-sm text-gray-300">${costPerLead.toFixed(2)}</td>
                        <td className="py-4 text-right text-sm text-gray-300">${revenuePerLead.toFixed(2)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Financial Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue vs Cost */}
            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Revenue vs Cost</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockCampaigns}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" angle={-15} textAnchor="end" height={80} />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                  <Bar dataKey="cost" fill="#ef4444" name="Cost" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Revenue Trend */}
            <Card className="bg-[#1a1a1a] border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
                  <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} name="Cost" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Profitability Analysis */}
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Profitability Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Contribution Margin</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Revenue per call</span>
                    <span className="text-white font-medium">$11.24</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Cost per call</span>
                    <span className="text-white font-medium">$2.45</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-800">
                    <span className="text-gray-300">Contribution</span>
                    <span className="text-green-500 font-bold">$8.79 (78%)</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Break-Even Analysis</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Break-even calls</span>
                    <span className="text-white font-medium">279</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Time to break-even</span>
                    <span className="text-white font-medium">8 days</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-800">
                    <span className="text-gray-300">Safety margin</span>
                    <span className="text-green-500 font-bold">847%</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Forecasting</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Next month</span>
                    <span className="text-white font-medium">$156K</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Next quarter</span>
                    <span className="text-white font-medium">$468K</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-800">
                    <span className="text-gray-300">Confidence</span>
                    <span className="text-orange-500 font-bold">±15%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Recommended Actions */}
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recommended Actions</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <p className="text-sm text-gray-300">
                  Scale {bestCampaign.name} for maximum ROI - currently performing at {bestCampaign.roi}%
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <p className="text-sm text-gray-300">
                  Increase AI agent participation to reduce labor costs by estimated 15-20%
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <p className="text-sm text-gray-300">
                  Consider pausing campaigns with ROI below 500% threshold for optimization
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
