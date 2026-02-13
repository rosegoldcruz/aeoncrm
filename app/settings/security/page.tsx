"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Shield, Check, X, Download, Filter } from "lucide-react"

export default function SecuritySettingsPage() {
  const [activeTab, setActiveTab] = useState("authentication")

  const auditLog = [
    {
      timestamp: "Nov 1, 3:45 PM",
      user: "John Admin",
      event: "Changed user permissions",
      details: "Bob: Added export access",
      ip: "192.168.1.1",
      status: "success",
    },
    {
      timestamp: "Nov 1, 2:30 PM",
      user: "Unknown",
      event: "Failed login attempt",
      details: "user: admin, 3 attempts",
      ip: "45.76.23.10",
      status: "blocked",
    },
    {
      timestamp: "Nov 1, 10:15 AM",
      user: "Jane Manager",
      event: "Exported contacts",
      details: "1,234 contacts",
      ip: "192.168.1.5",
      status: "success",
    },
  ]

  return (
    <div className="min-h-screen bg-black p-3 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-orange-500 flex items-center gap-3">
              <Shield className="w-8 h-8" />
              Security Settings
            </h1>
            <p className="text-gray-400 mt-1">Protect your account and data</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm text-gray-400">Security Score</div>
              <div className="text-2xl font-bold text-green-500">85/100</div>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
              <span className="text-green-500 font-bold">Good</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-neutral-800">
        {["authentication", "access-control", "data-protection"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium capitalize transition-colors ${
              activeTab === tab ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "authentication" && (
        <div className="space-y-6">
          {/* Password Policy */}
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Password Policy</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Minimum 8 characters</div>
                  <div className="text-sm text-gray-400">Enforce minimum password length</div>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Require uppercase letter</div>
                  <div className="text-sm text-gray-400">At least one uppercase character</div>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Require number</div>
                  <div className="text-sm text-gray-400">At least one numeric character</div>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Require special character</div>
                  <div className="text-sm text-gray-400">At least one special character (!@#$%)</div>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Password expiry</div>
                  <div className="text-sm text-gray-400">Force password change every 90 days</div>
                </div>
                <input type="checkbox" className="rounded border-neutral-700" />
              </div>
            </div>
          </Card>

          {/* Two-Factor Authentication */}
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Two-Factor Authentication</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Require 2FA for all users</div>
                  <div className="text-sm text-gray-400">Enforce 2FA across the organization</div>
                </div>
                <input type="checkbox" className="rounded border-neutral-700" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Require 2FA for admins</div>
                  <div className="text-sm text-gray-400">Mandatory for admin accounts</div>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
              </div>
            </div>

            <div className="border-t border-neutral-800 mt-6 pt-6">
              <h3 className="font-bold text-white mb-4">2FA Status by User</h3>
              <div className="space-y-2">
                {[
                  { name: "John Admin", role: "Admin", status: "enabled", method: "Authenticator" },
                  { name: "Jane Manager", role: "Manager", status: "enabled", method: "SMS" },
                  { name: "Bob Agent", role: "Agent", status: "disabled", method: "N/A" },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex items-center gap-2 ${user.status === "enabled" ? "text-green-500" : "text-gray-500"}`}
                      >
                        {user.status === "enabled" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        {user.status}
                      </span>
                      <span className="text-sm text-gray-400">{user.method}</span>
                      {user.status === "disabled" && (
                        <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                          Force Enable
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Session Management */}
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Session Management</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Session timeout (minutes)</label>
                <Input type="number" defaultValue="30" className="bg-black border-neutral-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Absolute timeout (hours)</label>
                <Input type="number" defaultValue="12" className="bg-black border-neutral-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Remember me duration (days)</label>
                <Input type="number" defaultValue="30" className="bg-black border-neutral-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Max concurrent sessions</label>
                <Input type="number" defaultValue="3" className="bg-black border-neutral-700" />
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "access-control" && (
        <div className="space-y-6">
          {/* Audit Log */}
          <Card className="bg-neutral-900 border-neutral-800 p-4">
            <div className="flex gap-4 mb-4">
              <Input placeholder="Search events..." className="flex-1 bg-black border-neutral-700" />
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
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Event</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Details</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">IP Address</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLog.map((log, index) => (
                    <tr key={index} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                      <td className="p-4 text-gray-400">{log.timestamp}</td>
                      <td className="p-4 text-white">{log.user}</td>
                      <td className="p-4 text-white">{log.event}</td>
                      <td className="p-4 text-gray-400">{log.details}</td>
                      <td className="p-4 text-gray-400 font-mono text-sm">{log.ip}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            log.status === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "data-protection" && (
        <div className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Data Encryption</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Encrypt data at rest</div>
                  <div className="text-sm text-gray-400">AES-256 encryption for stored data</div>
                </div>
                <span className="flex items-center gap-2 text-green-500">
                  <Check className="w-4 h-4" />
                  Enabled
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Encrypt data in transit</div>
                  <div className="text-sm text-gray-400">TLS 1.3 for all connections</div>
                </div>
                <span className="flex items-center gap-2 text-green-500">
                  <Check className="w-4 h-4" />
                  Enabled
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Encrypt call recordings</div>
                  <div className="text-sm text-gray-400">End-to-end encryption for recordings</div>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
              </div>
            </div>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Data Retention</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Call recordings retention (days)</label>
                <Input type="number" defaultValue="90" className="bg-black border-neutral-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Audit logs retention (days)</label>
                <Input type="number" defaultValue="365" className="bg-black border-neutral-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Deleted data retention (days)</label>
                <Input type="number" defaultValue="30" className="bg-black border-neutral-700" />
                <p className="text-xs text-gray-400 mt-1">Grace period before permanent deletion</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Save Button */}
      <div className="sticky bottom-6 flex justify-end">
        <Button className="bg-orange-500 hover:bg-orange-600 shadow-lg">Save Security Settings</Button>
      </div>
    </div>
  )
}
