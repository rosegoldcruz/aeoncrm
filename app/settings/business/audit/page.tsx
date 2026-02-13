"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Search, Eye } from "lucide-react"
import Link from "next/link"

export default function AuditLogsPage() {
  const logs = [
    {
      id: 1,
      timestamp: "Nov 2, 3:45 PM",
      user: "John Admin",
      action: "Updated",
      resource: "Campaign",
      details: "Changed status: Active → Paused",
      ip: "192.168.1.1",
    },
    {
      id: 2,
      timestamp: "Nov 2, 2:30 PM",
      user: "Jane Manager",
      action: "Created",
      resource: "Contact",
      details: "Added: Mike Johnson",
      ip: "192.168.1.5",
    },
    {
      id: 3,
      timestamp: "Nov 2, 10:15 AM",
      user: "Bob Agent",
      action: "Deleted",
      resource: "Lead",
      details: "Removed: Spam lead",
      ip: "192.168.1.10",
    },
    {
      id: 4,
      timestamp: "Nov 2, 9:00 AM",
      user: "John Admin",
      action: "Login",
      resource: "System",
      details: "Successful login",
      ip: "192.168.1.1",
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
              <h1 className="text-2xl font-bold text-white">Audit Logs</h1>
              <p className="text-sm text-neutral-400 mt-1">Track all changes and activities in your account</p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
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
                  className="block px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800"
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
                  className="block px-3 py-2 rounded-lg text-sm bg-orange-500 text-white"
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">Total Events</p>
              <p className="text-3xl font-bold text-white">12,456</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">Unique Users</p>
              <p className="text-3xl font-bold text-white">42</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">Most Active</p>
              <p className="text-lg font-semibold text-white">John Admin</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">Most Common</p>
              <p className="text-lg font-semibold text-white">Updated (45%)</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input placeholder="Search logs" className="pl-10 bg-neutral-800 border-neutral-700 text-white" />
              </div>
              <Select defaultValue="7days">
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-users">
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-users">All Users</SelectItem>
                  <SelectItem value="admins">Admins</SelectItem>
                  <SelectItem value="agents">Agents</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-actions">
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-actions">All Actions</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="updated">Updated</SelectItem>
                  <SelectItem value="deleted">Deleted</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-resources">
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-resources">All Resources</SelectItem>
                  <SelectItem value="contacts">Contacts</SelectItem>
                  <SelectItem value="campaigns">Campaigns</SelectItem>
                  <SelectItem value="settings">Settings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-800 border-b border-neutral-700">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Timestamp</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">User</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Action</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Resource</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Details</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">IP Address</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-neutral-800">
                      <td className="px-6 py-4 text-neutral-400 font-mono text-sm">{log.timestamp}</td>
                      <td className="px-6 py-4 text-white">{log.user}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            log.action === "Created"
                              ? "bg-green-500/10 text-green-500"
                              : log.action === "Updated"
                                ? "bg-blue-500/10 text-blue-500"
                                : log.action === "Deleted"
                                  ? "bg-red-500/10 text-red-500"
                                  : "bg-neutral-700 text-neutral-400"
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white">{log.resource}</td>
                      <td className="px-6 py-4 text-neutral-400">{log.details}</td>
                      <td className="px-6 py-4 text-neutral-400 font-mono text-sm">{log.ip}</td>
                      <td className="px-6 py-4 text-right">
                        <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                          <Eye className="w-4 h-4" />
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
