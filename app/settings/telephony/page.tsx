"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Phone, Plus, TestTube, MoreVertical } from "lucide-react"

export default function TelephonySettingsPage() {
  const [activeTab, setActiveTab] = useState("numbers")

  const phoneNumbers = [
    {
      number: "(623) 552-4307",
      type: "Toll-Free",
      provider: "VOIP.ms",
      status: "active",
      assignedTo: "Inbound Queue",
      cost: "$1.50",
    },
    {
      number: "(623) 462-2152",
      type: "Local",
      provider: "VOIP.ms",
      status: "active",
      assignedTo: "Sales Campaign",
      cost: "$0.85",
    },
    {
      number: "(555) 123-4567",
      type: "Local",
      provider: "Twilio",
      status: "unused",
      assignedTo: "Not assigned",
      cost: "$1.00",
    },
  ]

  const sipTrunks = [
    {
      provider: "VOIP.ms",
      status: "connected",
      server: "sanjose2.voip.ms:5060",
      numbers: 2,
      cost: "$2.35",
      calls: 234,
      minutes: 487,
      uptime: "99.8%",
    },
    {
      provider: "Twilio",
      status: "connected",
      server: "sip.twilio.com:5060",
      numbers: 1,
      cost: "$1.00",
      calls: 89,
      minutes: 156,
      uptime: "99.9%",
    },
  ]

  return (
    <div className="min-h-screen bg-black p-3 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-orange-500 flex items-center gap-3">
              <Phone className="w-8 h-8" />
              Telephony Settings
            </h1>
            <p className="text-gray-400 mt-1">Configure phone system and trunks</p>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-500 font-medium">System Online</span>
            </div>
            <Button variant="outline" className="border-gray-700 bg-transparent">
              <TestTube className="w-4 h-4 mr-2" />
              Test System
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-neutral-800">
        {["numbers", "routing", "settings", "advanced"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium capitalize transition-colors ${
              activeTab === tab ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab === "numbers" && "Phone Numbers & Trunks"}
            {tab === "routing" && "Call Routing"}
            {tab === "settings" && "Call Settings"}
            {tab === "advanced" && "Advanced Settings"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "numbers" && (
        <div className="space-y-6">
          {/* Phone Numbers Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Your Phone Numbers</h2>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Phone Number
              </Button>
            </div>
            <Card className="bg-neutral-900 border-neutral-800">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-neutral-800">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Number</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Type</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Provider</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Assigned To</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Monthly Cost</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phoneNumbers.map((number, index) => (
                      <tr key={index} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                        <td className="p-4 text-white font-medium">{number.number}</td>
                        <td className="p-4 text-gray-400">{number.type}</td>
                        <td className="p-4 text-gray-400">{number.provider}</td>
                        <td className="p-4">
                          <span
                            className={`flex items-center gap-2 ${number.status === "active" ? "text-green-500" : "text-yellow-500"}`}
                          >
                            {number.status === "active" ? "🟢" : "🟡"} {number.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400">{number.assignedTo}</td>
                        <td className="p-4 text-white">{number.cost}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                              Edit
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

          {/* SIP Trunks Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">SIP Trunks</h2>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Add SIP Trunk
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sipTrunks.map((trunk, index) => (
                <Card key={index} className="bg-neutral-900 border-neutral-800 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{trunk.provider}</h3>
                      <div className="flex items-center gap-2 text-green-500">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm">Connected</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Server:</span>
                      <span className="text-white font-mono text-xs">{trunk.server}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Numbers:</span>
                      <span className="text-white">{trunk.numbers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Monthly cost:</span>
                      <span className="text-white">{trunk.cost}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Calls today:</span>
                      <span className="text-white">{trunk.calls}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Minutes used:</span>
                      <span className="text-white">{trunk.minutes} min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Uptime:</span>
                      <span className="text-green-500">{trunk.uptime}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                      Test
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "routing" && (
        <div className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Inbound Routing Rules</h2>
            <p className="text-gray-400 mb-6">Configure how incoming calls are routed</p>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Routing Rule
            </Button>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Outbound Caller ID</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Default Outgoing Number</label>
                <select
                  defaultValue="(623) 552-4307"
                  className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-2 text-white"
                >
                  <option>(623) 552-4307</option>
                  <option>(623) 462-2152</option>
                  <option>(555) 123-4567</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                <Input defaultValue="AEON Dialer" className="bg-black border-neutral-700" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="rounded border-neutral-700" />
                <label className="text-sm text-gray-400">Enable local presence matching</label>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Call Recording</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Record all calls</div>
                  <div className="text-sm text-gray-400">Automatically record all inbound and outbound calls</div>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Retention Period</label>
                <select
                  defaultValue="90 days"
                  className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-2 text-white"
                >
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>1 year</option>
                  <option>Forever</option>
                </select>
              </div>
            </div>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Call Quality Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Echo Cancellation</span>
                <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Noise Suppression</span>
                <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Automatic Gain Control</span>
                <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "advanced" && (
        <div className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Asterisk Server Info</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Server IP:</span>
                <span className="text-white font-mono">23.92.78.122</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Version:</span>
                <span className="text-white">Asterisk 18.x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-500 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Running
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Uptime:</span>
                <span className="text-white">45 days, 3 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Active channels:</span>
                <span className="text-white">23</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 border-neutral-700 bg-transparent">
              Restart Asterisk
            </Button>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Diagnostics</h2>
            <p className="text-gray-400 mb-4">Run system diagnostics to test connectivity and performance</p>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <TestTube className="w-4 h-4 mr-2" />
              Run Full Diagnostic
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}
