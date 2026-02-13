"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, MoreVertical, Plus } from "lucide-react"
import Link from "next/link"

export default function StaffPage() {
  const [showAddModal, setShowAddModal] = useState(false)

  const staff = [
    { id: 1, name: "John Doe", email: "john@company.com", role: "Manager", department: "Sales", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@company.com", role: "Agent", department: "Sales", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@company.com", role: "Agent", department: "Support", status: "Inactive" },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@company.com",
      role: "Admin",
      department: "Operations",
      status: "Active",
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-900">
        <div className="px-3 sm:px-8 py-4 sm:py-6">
          <Link
            href="/settings/business"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-orange-500 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">My Staff</h1>
              <p className="text-sm text-neutral-400 mt-1">Manage team members and their roles</p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar Navigation */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-neutral-800 bg-neutral-900 min-h-0 lg:min-h-screen">
          <nav className="p-4 space-y-1">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-2">My Business</h3>
              <div className="space-y-1">
                <Link
                  href="/settings/business"
                  className="block px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800"
                >
                  Business Profile
                </Link>
                <Link
                  href="/settings/business/billing"
                  className="block px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800"
                >
                  Billing
                </Link>
                <Link
                  href="/settings/business/staff"
                  className="block px-3 py-2 rounded-lg text-sm bg-orange-500 text-white"
                >
                  My Staff
                </Link>
                <Link
                  href="/settings/business/opportunities"
                  className="block px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800"
                >
                  Opportunities & Pipelines
                </Link>
                <Link
                  href="/settings/business/automation"
                  className="block px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800"
                >
                  Automation
                </Link>
                <Link
                  href="/settings/business/calendars"
                  className="block px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800"
                >
                  Calendars
                </Link>
                <Link
                  href="/settings/business/phone-numbers"
                  className="block px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 flex items-center justify-between"
                >
                  Phone Numbers
                  <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded">NEW</span>
                </Link>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-2">Other Settings</h3>
              <div className="space-y-1">
                <Link
                  href="/settings/business/integrations"
                  className="block px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800"
                >
                  Integrations
                </Link>
                <Link
                  href="/settings/business/tags"
                  className="block px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800"
                >
                  Tags
                </Link>
                <Link
                  href="/settings/business/labs"
                  className="block px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 flex items-center justify-between"
                >
                  Labs
                  <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded">NEW</span>
                </Link>
                <Link
                  href="/settings/business/audit"
                  className="block px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800"
                >
                  Audit Logs
                </Link>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">Total Staff</p>
              <p className="text-3xl font-bold text-white">47</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">Active Today</p>
              <p className="text-3xl font-bold text-green-500">42</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">By Role</p>
              <p className="text-sm text-white">Managers (8) • Agents (35) • Admins (4)</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input
                  placeholder="Search by name or email"
                  className="pl-10 bg-neutral-800 border-neutral-700 text-white"
                />
              </div>
              <Select defaultValue="all-roles">
                <SelectTrigger className="w-full md:w-40 bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-roles">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-departments">
                <SelectTrigger className="w-full md:w-40 bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-departments">All Departments</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-status">
                <SelectTrigger className="w-full md:w-40 bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Staff Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-800 border-b border-neutral-700">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Name</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Email</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Role</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Department</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Status</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {staff.map((member) => (
                    <tr key={member.id} className="hover:bg-neutral-800 cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="text-white font-medium">{member.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-400">{member.email}</td>
                      <td className="px-6 py-4 text-white">{member.role}</td>
                      <td className="px-6 py-4 text-neutral-400">{member.department}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            member.status === "Active"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-neutral-700 text-neutral-400"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${member.status === "Active" ? "bg-green-500" : "bg-neutral-400"}`}
                          />
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button size="icon" variant="ghost" className="text-neutral-400 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
