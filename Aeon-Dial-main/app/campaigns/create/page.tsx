"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Phone, Users, Settings, Calendar, Bot, FileText, Save, Play } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CreateCampaignPage() {
  const [activeTab, setActiveTab] = useState("basic")
  const [aiEnabled, setAiEnabled] = useState(false)
  const [scheduleEnabled, setScheduleEnabled] = useState(false)

  return (
    <div className="min-h-screen bg-black p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/campaigns">
            <Button variant="ghost" size="icon" className="hover:bg-neutral-800">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-orange-500">Create New Campaign</h1>
            <p className="text-neutral-400 text-sm mt-1">Set up a new dialing campaign with AI-powered automation</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-neutral-700 bg-neutral-900 hover:bg-neutral-800">
            <Save className="w-4 h-4 mr-2" />
            Save as Draft
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Play className="w-4 h-4 mr-2" />
            Create & Launch
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-neutral-800">
        {[
          { id: "basic", label: "Basic Info", icon: FileText },
          { id: "contacts", label: "Contacts", icon: Users },
          { id: "dialing", label: "Dialing Settings", icon: Phone },
          { id: "ai", label: "AI Agent", icon: Bot },
          { id: "schedule", label: "Schedule", icon: Calendar },
          { id: "advanced", label: "Advanced", icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="max-w-4xl">
        {/* Basic Info Tab */}
        {activeTab === "basic" && (
          <Card className="bg-neutral-900 border-neutral-800 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Campaign Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-neutral-300">
                    Campaign Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., Summer Promo 2025"
                    className="mt-2 bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-neutral-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of campaign goals and target audience..."
                    className="mt-2 bg-neutral-800 border-neutral-700 text-white min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type" className="text-neutral-300">
                      Campaign Type *
                    </Label>
                    <select
                      id="type"
                      className="mt-2 w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white"
                    >
                      <option>Outbound Sales</option>
                      <option>Lead Follow-up</option>
                      <option>Customer Survey</option>
                      <option>Appointment Setting</option>
                      <option>Event Promotion</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="priority" className="text-neutral-300">
                      Priority
                    </Label>
                    <select
                      id="priority"
                      className="mt-2 w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white"
                    >
                      <option>Normal</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <Card className="bg-neutral-900 border-neutral-800 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Contact List Selection</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="list" className="text-neutral-300">
                    Select Contact List *
                  </Label>
                  <select
                    id="list"
                    className="mt-2 w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white"
                  >
                    <option>Select a list...</option>
                    <option>Summer Leads 2025 (5,234 contacts)</option>
                    <option>Q1 Follow-ups (1,847 contacts)</option>
                    <option>Warm Prospects (892 contacts)</option>
                    <option>Event Attendees (3,456 contacts)</option>
                  </select>
                  <p className="text-xs text-neutral-500 mt-2">
                    Or{" "}
                    <Link href="/leads" className="text-orange-500 hover:underline">
                      create a new list
                    </Link>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="filter" className="text-neutral-300">
                      Filter Contacts
                    </Label>
                    <select
                      id="filter"
                      className="mt-2 w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white"
                    >
                      <option>All Contacts</option>
                      <option>Never Called</option>
                      <option>Previously Contacted</option>
                      <option>High Priority Only</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="limit" className="text-neutral-300">
                      Contact Limit
                    </Label>
                    <Input
                      id="limit"
                      type="number"
                      placeholder="Leave empty for all"
                      className="mt-2 bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                </div>
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Duplicate Detection</p>
                      <p className="text-xs text-neutral-400 mt-1">Skip contacts called in the last 30 days</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Dialing Settings Tab */}
        {activeTab === "dialing" && (
          <Card className="bg-neutral-900 border-neutral-800 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Dialing Configuration</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="method" className="text-neutral-300">
                      Dial Method *
                    </Label>
                    <select
                      id="method"
                      className="mt-2 w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white"
                    >
                      <option>Predictive Dialer</option>
                      <option>Progressive Dialer</option>
                      <option>Preview Dialer</option>
                      <option>Manual Dial</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="concurrent" className="text-neutral-300">
                      Concurrent Calls *
                    </Label>
                    <Input
                      id="concurrent"
                      type="number"
                      defaultValue="10"
                      className="mt-2 bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ratio" className="text-neutral-300">
                      Dial Ratio
                    </Label>
                    <Input
                      id="ratio"
                      type="number"
                      step="0.1"
                      defaultValue="1.5"
                      className="mt-2 bg-neutral-800 border-neutral-700 text-white"
                    />
                    <p className="text-xs text-neutral-500 mt-1">Calls per available agent</p>
                  </div>
                  <div>
                    <Label htmlFor="timeout" className="text-neutral-300">
                      Ring Timeout (seconds)
                    </Label>
                    <Input
                      id="timeout"
                      type="number"
                      defaultValue="30"
                      className="mt-2 bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-neutral-300 mb-3 block">Retry Logic</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="maxRetries" className="text-xs text-neutral-400">
                        Max Attempts
                      </Label>
                      <Input
                        id="maxRetries"
                        type="number"
                        defaultValue="3"
                        className="mt-1 bg-neutral-800 border-neutral-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="retryDelay" className="text-xs text-neutral-400">
                        Retry Delay (min)
                      </Label>
                      <Input
                        id="retryDelay"
                        type="number"
                        defaultValue="60"
                        className="mt-1 bg-neutral-800 border-neutral-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="busyRetry" className="text-xs text-neutral-400">
                        Busy Retry (min)
                      </Label>
                      <Input
                        id="busyRetry"
                        type="number"
                        defaultValue="15"
                        className="mt-1 bg-neutral-800 border-neutral-700 text-white"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">Answering Machine Detection</p>
                        <p className="text-xs text-neutral-400 mt-1">Automatically detect and skip voicemails</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">Call Recording</p>
                        <p className="text-xs text-neutral-400 mt-1">Record all calls for quality assurance</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* AI Agent Tab */}
        {activeTab === "ai" && (
          <Card className="bg-neutral-900 border-neutral-800 p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">AI Agent Configuration</h2>
                  <p className="text-sm text-neutral-400 mt-1">Enable AI-powered conversation handling</p>
                </div>
                <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              </div>
              {aiEnabled && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="aiAgent" className="text-neutral-300">
                      Select AI Agent
                    </Label>
                    <select
                      id="aiAgent"
                      className="mt-2 w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white"
                    >
                      <option>Default Sales Agent</option>
                      <option>Customer Support Agent</option>
                      <option>Survey Agent</option>
                      <option>Appointment Setter</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="script" className="text-neutral-300">
                      Call Script / Prompt
                    </Label>
                    <Textarea
                      id="script"
                      placeholder="Enter the conversation script or AI prompt..."
                      className="mt-2 bg-neutral-800 border-neutral-700 text-white min-h-[150px]"
                      defaultValue="Hello, this is calling from AEON DIAL. I'm reaching out regarding..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="voice" className="text-neutral-300">
                        Voice
                      </Label>
                      <select
                        id="voice"
                        className="mt-2 w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white"
                      >
                        <option>Professional Male</option>
                        <option>Professional Female</option>
                        <option>Friendly Male</option>
                        <option>Friendly Female</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="language" className="text-neutral-300">
                        Language
                      </Label>
                      <select
                        id="language"
                        className="mt-2 w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white"
                      >
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                  </div>
                  <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">Transfer to Human Agent</p>
                        <p className="text-xs text-neutral-400 mt-1">Allow AI to transfer complex calls to agents</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              )}
              {!aiEnabled && (
                <div className="text-center py-8 text-neutral-500">
                  <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Enable AI Agent to configure automated calling</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <Card className="bg-neutral-900 border-neutral-800 p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">Campaign Schedule</h2>
                  <p className="text-sm text-neutral-400 mt-1">Set when this campaign should run</p>
                </div>
                <Switch checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
              </div>
              {scheduleEnabled && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate" className="text-neutral-300">
                        Start Date
                      </Label>
                      <Input id="startDate" type="date" className="mt-2 bg-neutral-800 border-neutral-700 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="endDate" className="text-neutral-300">
                        End Date (Optional)
                      </Label>
                      <Input id="endDate" type="date" className="mt-2 bg-neutral-800 border-neutral-700 text-white" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-neutral-300 mb-3 block">Calling Hours</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startTime" className="text-xs text-neutral-400">
                          Start Time
                        </Label>
                        <Input
                          id="startTime"
                          type="time"
                          defaultValue="09:00"
                          className="mt-1 bg-neutral-800 border-neutral-700 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="endTime" className="text-xs text-neutral-400">
                          End Time
                        </Label>
                        <Input
                          id="endTime"
                          type="time"
                          defaultValue="17:00"
                          className="mt-1 bg-neutral-800 border-neutral-700 text-white"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-neutral-300 mb-3 block">Active Days</Label>
                    <div className="flex gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <button
                          key={day}
                          className="flex-1 py-2 bg-neutral-800 border border-neutral-700 rounded hover:bg-orange-500 hover:border-orange-500 transition-colors text-sm"
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="timezone" className="text-neutral-300">
                      Timezone
                    </Label>
                    <select
                      id="timezone"
                      className="mt-2 w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white"
                    >
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                    </select>
                  </div>
                </div>
              )}
              {!scheduleEnabled && (
                <div className="text-center py-8 text-neutral-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Campaign will start immediately when launched</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Advanced Tab */}
        {activeTab === "advanced" && (
          <Card className="bg-neutral-900 border-neutral-800 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Advanced Settings</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="callerId" className="text-neutral-300">
                    Caller ID
                  </Label>
                  <Input
                    id="callerId"
                    placeholder="+1 (555) 123-4567"
                    className="mt-2 bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="webhook" className="text-neutral-300">
                    Webhook URL
                  </Label>
                  <Input
                    id="webhook"
                    placeholder="https://your-domain.com/webhook"
                    className="mt-2 bg-neutral-800 border-neutral-700 text-white"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Receive real-time campaign events</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxCost" className="text-neutral-300">
                      Max Daily Cost ($)
                    </Label>
                    <Input
                      id="maxCost"
                      type="number"
                      placeholder="1000"
                      className="mt-2 bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxCalls" className="text-neutral-300">
                      Max Daily Calls
                    </Label>
                    <Input
                      id="maxCalls"
                      type="number"
                      placeholder="5000"
                      className="mt-2 bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">DNC List Scrubbing</p>
                        <p className="text-xs text-neutral-400 mt-1">Automatically skip Do Not Call numbers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">Auto-pause on Low Connect Rate</p>
                        <p className="text-xs text-neutral-400 mt-1">Pause if connect rate drops below 10%</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">Email Notifications</p>
                        <p className="text-xs text-neutral-400 mt-1">Get alerts for campaign milestones</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
