"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  Grid3x3,
  List,
  Play,
  Pause,
  Edit,
  Copy,
  Trash2,
  MoreVertical,
  Phone,
  TrendingUp,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock campaign data
const campaigns = [
  {
    id: 1,
    name: "Summer Promo 2025",
    status: "active",
    type: "Outbound Sales",
    totalContacts: 5000,
    contacted: 3250,
    connected: 1820,
    conversions: 456,
    conversionRate: 25.1,
    callsToday: 247,
    avgCallDuration: "4:32",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
  },
  {
    id: 2,
    name: "Lead Follow-Up Q4",
    status: "active",
    type: "Lead Nurturing",
    totalContacts: 3200,
    contacted: 2890,
    connected: 1645,
    conversions: 823,
    conversionRate: 50.0,
    callsToday: 156,
    avgCallDuration: "6:15",
    startDate: "2025-10-15",
    endDate: "2025-11-30",
  },
  {
    id: 3,
    name: "Customer Satisfaction Survey",
    status: "paused",
    type: "Survey",
    totalContacts: 8500,
    contacted: 4250,
    connected: 3825,
    conversions: 3210,
    conversionRate: 83.9,
    callsToday: 0,
    avgCallDuration: "3:45",
    startDate: "2025-09-01",
    endDate: "2025-11-15",
  },
  {
    id: 4,
    name: "Appointment Reminders",
    status: "active",
    type: "Reminders",
    totalContacts: 1200,
    contacted: 980,
    connected: 856,
    conversions: 798,
    conversionRate: 93.2,
    callsToday: 89,
    avgCallDuration: "2:18",
    startDate: "2025-10-20",
    endDate: "2025-12-31",
  },
  {
    id: 5,
    name: "Product Launch Outreach",
    status: "scheduled",
    type: "Outbound Sales",
    totalContacts: 10000,
    contacted: 0,
    connected: 0,
    conversions: 0,
    conversionRate: 0,
    callsToday: 0,
    avgCallDuration: "0:00",
    startDate: "2025-11-01",
    endDate: "2025-12-31",
  },
  {
    id: 6,
    name: "Renewal Campaign",
    status: "completed",
    type: "Retention",
    totalContacts: 2500,
    contacted: 2500,
    connected: 2125,
    conversions: 1912,
    conversionRate: 90.0,
    callsToday: 0,
    avgCallDuration: "5:42",
    startDate: "2025-08-01",
    endDate: "2025-09-30",
  },
]

export default function CampaignsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Calculate aggregate stats
  const stats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter((c) => c.status === "active").length,
    totalCalls: campaigns.reduce((sum, c) => sum + c.callsToday, 0),
    avgConversionRate: (campaigns.reduce((sum, c) => sum + c.conversionRate, 0) / campaigns.length).toFixed(1),
  }

  // Filter campaigns
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      case "paused":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "scheduled":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
      case "completed":
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30"
      default:
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orange-500">Campaign Management</h1>
          <p className="text-neutral-400 text-sm">Create and manage dialing campaigns</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-black font-medium">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Quick Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400">Total Campaigns</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalCampaigns}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400">Active Campaigns</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.activeCampaigns}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Play className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400">Calls Today</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalCalls}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400">Avg Conversion</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.avgConversionRate}%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Bar */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[160px] bg-neutral-800 border-neutral-700 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[160px] bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="calls">Most Calls</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-neutral-800 p-1 rounded-lg">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-neutral-700 text-white" : "text-neutral-400 hover:text-white"}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-neutral-700 text-white" : "text-neutral-400 hover:text-white"}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-neutral-600" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No campaigns found</h3>
            <p className="text-neutral-400 text-sm mb-6">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your filters to see more results"
                : "Get started by creating your first campaign"}
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-black font-medium">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Grid View */}
      {viewMode === "grid" && filteredCampaigns.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCampaigns.map((campaign) => {
            const progress = (campaign.contacted / campaign.totalContacts) * 100

            return (
              <Card
                key={campaign.id}
                className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <CardContent className="p-5 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-white truncate">{campaign.name}</h3>
                      <p className="text-xs text-neutral-400 mt-1">{campaign.type}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-neutral-400 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-neutral-800 border-neutral-700">
                        <DropdownMenuItem className="text-white hover:bg-neutral-700">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-white hover:bg-neutral-700">
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 hover:bg-neutral-700">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded border font-medium capitalize ${getStatusColor(campaign.status)}`}
                    >
                      {campaign.status}
                    </span>
                    {campaign.callsToday > 0 && (
                      <span className="text-xs text-neutral-400">{campaign.callsToday} calls today</span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-neutral-400">Progress</span>
                      <span className="text-white font-medium">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-neutral-500">{campaign.contacted.toLocaleString()} contacted</span>
                      <span className="text-neutral-500">{campaign.totalContacts.toLocaleString()} total</span>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-neutral-800 rounded-lg p-3">
                      <p className="text-xs text-neutral-400">Connected</p>
                      <p className="text-lg font-bold text-white mt-1">{campaign.connected.toLocaleString()}</p>
                    </div>
                    <div className="bg-neutral-800 rounded-lg p-3">
                      <p className="text-xs text-neutral-400">Conversions</p>
                      <p className="text-lg font-bold text-white mt-1">{campaign.conversions.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Conversion Rate */}
                  <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                    <span className="text-xs text-neutral-400">Conversion Rate</span>
                    <span className="text-sm font-bold text-green-500">{campaign.conversionRate}%</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className={`flex-1 ${campaign.status === "active" ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30" : "bg-green-500/20 text-green-500 hover:bg-green-500/30"}`}
                    >
                      {campaign.status === "active" ? (
                        <>
                          <Pause className="w-3 h-3 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-neutral-700 text-white hover:bg-neutral-800 bg-transparent"
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Stats
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && filteredCampaigns.length > 0 && (
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-neutral-800">
                  <tr className="text-left">
                    <th className="p-4 text-xs font-medium text-neutral-400">Campaign</th>
                    <th className="p-4 text-xs font-medium text-neutral-400">Status</th>
                    <th className="p-4 text-xs font-medium text-neutral-400">Type</th>
                    <th className="p-4 text-xs font-medium text-neutral-400">Progress</th>
                    <th className="p-4 text-xs font-medium text-neutral-400">Connected</th>
                    <th className="p-4 text-xs font-medium text-neutral-400">Conversions</th>
                    <th className="p-4 text-xs font-medium text-neutral-400">Conv. Rate</th>
                    <th className="p-4 text-xs font-medium text-neutral-400">Calls Today</th>
                    <th className="p-4 text-xs font-medium text-neutral-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign) => {
                    const progress = (campaign.contacted / campaign.totalContacts) * 100

                    return (
                      <tr
                        key={campaign.id}
                        className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors"
                      >
                        <td className="p-4">
                          <div>
                            <p className="text-sm font-medium text-white">{campaign.name}</p>
                            <p className="text-xs text-neutral-400 mt-0.5">
                              {campaign.contacted.toLocaleString()} / {campaign.totalContacts.toLocaleString()}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 text-xs rounded border font-medium capitalize ${getStatusColor(campaign.status)}`}
                          >
                            {campaign.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-neutral-300">{campaign.type}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden">
                              <div className="h-full bg-orange-500 rounded-full" style={{ width: `${progress}%` }} />
                            </div>
                            <span className="text-xs text-white font-medium">{progress.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-white font-medium">{campaign.connected.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-white font-medium">
                            {campaign.conversions.toLocaleString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-green-500 font-bold">{campaign.conversionRate}%</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-neutral-300">{campaign.callsToday}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`h-8 px-3 ${campaign.status === "active" ? "text-yellow-500 hover:bg-yellow-500/20" : "text-green-500 hover:bg-green-500/20"}`}
                            >
                              {campaign.status === "active" ? (
                                <Pause className="w-3 h-3" />
                              ) : (
                                <Play className="w-3 h-3" />
                              )}
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-neutral-400 hover:text-white"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-neutral-800 border-neutral-700">
                                <DropdownMenuItem className="text-white hover:bg-neutral-700">
                                  <TrendingUp className="w-4 h-4 mr-2" />
                                  View Stats
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-neutral-700">
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-neutral-700">
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500 hover:bg-neutral-700">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
