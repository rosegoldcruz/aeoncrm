"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Users, UserPlus, Upload, Search, Filter, MoreVertical, Download, Edit } from "lucide-react"

export default function TeamManagementPage() {
  const [activeTab, setActiveTab] = useState("members")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  // Mock data
  const teamMembers = [
    {
      id: "1",
      name: "John Admin",
      email: "john@company.com",
      role: "Admin",
      status: "active",
      lastActive: "2 mins ago",
      teams: ["Sales", "Ops"],
      avatar: "JA",
    },
    {
      id: "2",
      name: "Jane Manager",
      email: "jane@company.com",
      role: "Manager",
      status: "active",
      lastActive: "1 hour ago",
      teams: ["Sales"],
      avatar: "JM",
    },
    {
      id: "3",
      name: "Bob Agent",
      email: "bob@company.com",
      role: "Agent",
      status: "active",
      lastActive: "5 mins ago",
      teams: ["Sales"],
      avatar: "BA",
    },
    {
      id: "4",
      name: "Alice Viewer",
      email: "alice@company.com",
      role: "Viewer",
      status: "inactive",
      lastActive: "3 days ago",
      teams: ["Support"],
      avatar: "AV",
    },
    {
      id: "5",
      name: "Mike Pending",
      email: "mike@company.com",
      role: "Agent",
      status: "pending",
      lastActive: "N/A",
      teams: ["Sales"],
      avatar: "MP",
    },
  ]

  const roles = [
    {
      name: "Admin",
      badge: "Full Access",
      users: 3,
      description: "Complete system access and configuration",
      color: "orange",
    },
    {
      name: "Manager",
      badge: "Management Access",
      users: 8,
      description: "Team and campaign management",
      color: "orange",
    },
    {
      name: "Agent",
      badge: "Agent Access",
      users: 32,
      description: "Call handling and basic CRM access",
      color: "orange",
    },
    { name: "Viewer", badge: "Read-Only", users: 4, description: "Read-only dashboard access", color: "orange" },
  ]

  const teams = [
    {
      name: "Sales Team",
      members: 23,
      manager: "Jane Manager",
      campaigns: 8,
      calls: 234,
      conversions: 45,
      conversionRate: 19,
    },
    {
      name: "Support Team",
      members: 15,
      manager: "Bob Agent",
      campaigns: 5,
      calls: 156,
      conversions: 28,
      conversionRate: 18,
    },
    {
      name: "Outreach Team",
      members: 12,
      manager: "Alice Viewer",
      campaigns: 6,
      calls: 189,
      conversions: 34,
      conversionRate: 18,
    },
  ]

  const activityLog = [
    {
      timestamp: "Nov 1, 3:45 PM",
      user: "John Admin",
      action: "Changed role",
      details: "Bob Agent: Agent → Manager",
      ip: "192.168.1.1",
    },
    {
      timestamp: "Nov 1, 2:30 PM",
      user: "Jane Manager",
      action: "Added team member",
      details: "Invited: mike@company.com",
      ip: "192.168.1.5",
    },
    {
      timestamp: "Nov 1, 10:15 AM",
      user: "John Admin",
      action: "Modified permissions",
      details: "Manager role: Added export access",
      ip: "192.168.1.1",
    },
    {
      timestamp: "Oct 31, 5:45 PM",
      user: "Bob Agent",
      action: "Login",
      details: "Successful login",
      ip: "192.168.1.10",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500"
      case "inactive":
        return "text-gray-500"
      case "pending":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return "🟢"
      case "inactive":
        return "⚫"
      case "pending":
        return "🟡"
      default:
        return "⚫"
    }
  }

  return (
    <div className="min-h-screen bg-black p-3 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-orange-500 flex items-center gap-3">
              <Users className="w-8 h-8" />
              Team Management
            </h1>
            <p className="text-gray-400 mt-1">Manage users, roles, and permissions</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-700 bg-transparent">
              <Upload className="w-4 h-4 mr-2" />
              Import from CSV
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Team Member
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-neutral-800">
        {["members", "roles", "teams", "activity"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium capitalize transition-colors ${
              activeTab === tab ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab === "members" && "Team Members"}
            {tab === "roles" && "Roles & Permissions"}
            {tab === "teams" && "Teams & Departments"}
            {tab === "activity" && "Activity Log"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "members" && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <div className="text-sm text-gray-400 mb-2">Total Team Members</div>
              <div className="text-3xl font-bold text-white mb-2">47</div>
              <div className="text-sm text-gray-400">Active: 42 (89%) • Pending: 5</div>
            </Card>
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <div className="text-sm text-gray-400 mb-2">By Role</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Admins:</span> <span className="text-white">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Managers:</span> <span className="text-white">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Agents:</span> <span className="text-white">32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Viewers:</span> <span className="text-white">4</span>
                </div>
              </div>
            </Card>
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <div className="text-sm text-gray-400 mb-2">Activity</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Online now:</span> <span className="text-green-500">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Active today:</span> <span className="text-white">38</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Inactive &gt;7 days:</span> <span className="text-orange-500">4</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Search & Filter */}
          <Card className="bg-neutral-900 border-neutral-800 p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black border-neutral-700"
                />
              </div>
              <Button variant="outline" className="border-neutral-700 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </Card>

          {/* Team Members Table */}
          <Card className="bg-neutral-900 border-neutral-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-neutral-800">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">
                      <input type="checkbox" className="rounded border-neutral-700" />
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">User</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Role</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Last Active</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Teams</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                      <td className="p-4">
                        <input type="checkbox" className="rounded border-neutral-700" />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-medium">
                            {member.avatar}
                          </div>
                          <div>
                            <div className="font-medium text-white">{member.name}</div>
                            <div className="text-sm text-gray-400">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400">
                          {member.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`flex items-center gap-2 ${getStatusColor(member.status)}`}>
                          {getStatusIcon(member.status)} {member.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">{member.lastActive}</td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          {member.teams.map((team) => (
                            <span key={team} className="px-2 py-1 rounded text-xs bg-neutral-800 text-gray-300">
                              {team}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "roles" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <Card key={role.name} className="bg-neutral-900 border-neutral-800 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{role.name}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400">
                      {role.badge}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-gray-400 text-sm mb-4">{role.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{role.users} users</span>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    Edit Permissions
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <UserPlus className="w-4 h-4 mr-2" />
            Create Custom Role
          </Button>
        </div>
      )}

      {activeTab === "teams" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <Card key={team.name} className="bg-neutral-900 border-neutral-800 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{team.name}</h3>
                    <p className="text-sm text-gray-400">{team.members} members</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Manager:</span>
                    <span className="text-white">{team.manager}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Campaigns:</span>
                    <span className="text-white">{team.campaigns} active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Calls today:</span>
                    <span className="text-white">{team.calls}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Conversions:</span>
                    <span className="text-green-500">
                      {team.conversions} ({team.conversionRate}%)
                    </span>
                  </div>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">View Team</Button>
              </Card>
            ))}
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <UserPlus className="w-4 h-4 mr-2" />
            Create New Team
          </Button>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-800 p-4">
            <div className="flex gap-4 mb-4">
              <Input placeholder="Search activity..." className="flex-1 bg-black border-neutral-700" />
              <Button variant="outline" className="border-neutral-700 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="border-neutral-700 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-neutral-800">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Timestamp</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">User</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Action</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Details</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">IP Address</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activityLog.map((log, index) => (
                    <tr key={index} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                      <td className="p-4 text-gray-400">{log.timestamp}</td>
                      <td className="p-4 text-white">{log.user}</td>
                      <td className="p-4 text-white">{log.action}</td>
                      <td className="p-4 text-gray-400">{log.details}</td>
                      <td className="p-4 text-gray-400 font-mono text-sm">{log.ip}</td>
                      <td className="p-4">
                        <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
