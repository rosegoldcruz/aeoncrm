"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Bell, Mail, MessageSquare, SlackIcon, Filter } from "lucide-react"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("preferences")

  const notificationTypes = [
    {
      category: "Calls & Campaigns",
      items: [
        { name: "Call assigned to me", email: true, inApp: true, sms: false },
        { name: "Incoming call", email: true, inApp: true, sms: false },
        { name: "Missed call", email: true, inApp: true, sms: false },
        { name: "Campaign completed", email: true, inApp: false, sms: false },
      ],
    },
    {
      category: "Contacts & Leads",
      items: [
        { name: "New lead assigned", email: true, inApp: true, sms: false },
        { name: "Hot lead identified", email: true, inApp: false, sms: false },
        { name: "Callback reminder", email: false, inApp: true, sms: false },
      ],
    },
    {
      category: "System & Account",
      items: [
        { name: "System maintenance", email: true, inApp: true, sms: false },
        { name: "Critical system alert", email: true, inApp: true, sms: true },
        { name: "Security alert", email: true, inApp: true, sms: true },
      ],
    },
  ]

  const recentNotifications = [
    { time: "3:45 PM", type: "call", title: "Call assigned: John Doe", details: "(555) 123-4567", status: "unread" },
    {
      time: "2:30 PM",
      type: "campaign",
      title: "Campaign requires attention",
      details: "Low connect rate detected",
      status: "unread",
    },
    {
      time: "10:15 AM",
      type: "lead",
      title: "New lead assigned: Jane Smith",
      details: "From campaign: Lead Follow-up",
      status: "read",
    },
  ]

  return (
    <div className="min-h-screen bg-black p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-orange-500 flex items-center gap-3">
              <Bell className="w-8 h-8" />
              Notification Settings
            </h1>
            <p className="text-gray-400 mt-1">Manage how and when you receive notifications</p>
          </div>
          <Button variant="outline" className="border-gray-700 bg-transparent">
            <Bell className="w-4 h-4 mr-2" />
            Send Test
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-neutral-800">
        {["preferences", "quiet-hours", "history", "advanced"].map((tab) => (
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
      {activeTab === "preferences" && (
        <div className="space-y-6">
          {/* Notification Channels */}
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Notification Channels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <div className="flex-1">
                    <div className="font-medium text-white">Email Notifications</div>
                    <div className="text-sm text-gray-400">user@company.com</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
                </div>
                <div className="ml-8">
                  <select className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-2 text-white text-sm"></select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-orange-500" />
                  <div className="flex-1">
                    <div className="font-medium text-white">In-App Notifications</div>
                    <div className="text-sm text-gray-400">Show in dashboard</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
                </div>
                <div className="ml-8 space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
                    <span className="text-sm text-gray-400">Play sound</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
                    <span className="text-sm text-gray-400">Desktop notifications</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                  <div className="flex-1">
                    <div className="font-medium text-white">SMS Notifications</div>
                    <div className="text-sm text-gray-400">+1 (555) 123-4567</div>
                  </div>
                  <input type="checkbox" className="rounded border-neutral-700" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <SlackIcon className="w-5 h-5 text-orange-500" />
                  <div className="flex-1">
                    <div className="font-medium text-white">Slack Notifications</div>
                    <div className="text-sm text-gray-400">Not connected</div>
                  </div>
                  <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Notification Types */}
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Notification Types</h2>
            <div className="space-y-6">
              {notificationTypes.map((category) => (
                <div key={category.category}>
                  <h3 className="text-lg font-bold text-white mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex items-center justify-between py-2">
                        <span className="text-gray-400">{item.name}</span>
                        <div className="flex gap-6">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked={item.email} className="rounded border-neutral-700" />
                            <span className="text-sm text-gray-400">Email</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked={item.inApp} className="rounded border-neutral-700" />
                            <span className="text-sm text-gray-400">In-App</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked={item.sms} className="rounded border-neutral-700" />
                            <span className="text-sm text-gray-400">SMS</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="border-neutral-700 bg-transparent">
                Enable All
              </Button>
              <Button variant="outline" className="border-neutral-700 bg-transparent">
                Disable All
              </Button>
              <Button variant="outline" className="border-neutral-700 bg-transparent">
                Reset to Defaults
              </Button>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "quiet-hours" && (
        <div className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Do Not Disturb Schedule</h2>
              <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-white mb-4">Weekdays</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Start Time</label>
                    <select className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-2 text-white"></select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">End Time</label>
                    <select className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-2 text-white"></select>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                    <div key={day} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
                      <span className="text-sm text-gray-400">{day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-4">Weekends</h3>
                <div className="flex items-center gap-3 mb-3">
                  <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
                  <span className="text-gray-400">All day quiet</span>
                </div>
                <div className="flex gap-2">
                  {["Sat", "Sun"].map((day) => (
                    <div key={day} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
                      <span className="text-sm text-gray-400">{day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-4">Exceptions</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
                    <span className="text-gray-400">Always allow security alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded border-neutral-700" />
                    <span className="text-gray-400">Always allow system down alerts</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-800 p-4">
            <div className="flex gap-4">
              <Input placeholder="Search notifications..." className="flex-1 bg-black border-neutral-700" />
              <Button variant="outline" className="border-neutral-700 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <div className="p-4 border-b border-neutral-800">
              <h3 className="font-bold text-white">TODAY</h3>
            </div>
            <div className="divide-y divide-neutral-800">
              {recentNotifications.map((notification, index) => (
                <div
                  key={index}
                  className={`p-4 hover:bg-neutral-800/50 ${notification.status === "unread" ? "bg-neutral-800/30" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm text-gray-400">{notification.time}</span>
                        {notification.status === "unread" && <span className="w-2 h-2 bg-orange-500 rounded-full" />}
                      </div>
                      <div className="font-medium text-white mb-1">{notification.title}</div>
                      <div className="text-sm text-gray-400">{notification.details}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                        Mark Read
                      </Button>
                      <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                        Archive
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "advanced" && (
        <div className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Usage Alerts</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Alert when reaching</label>
                <div className="flex items-center gap-3">
                  <Input type="number" defaultValue="80" className="w-24 bg-black border-neutral-700" />
                  <span className="text-gray-400">% of limit</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Send alert to</label>
                <Input defaultValue="billing@company.com" className="bg-black border-neutral-700" />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Save Button */}
      <div className="sticky bottom-6 flex justify-end">
        <Button className="bg-orange-500 hover:bg-orange-600 shadow-lg">Save Changes</Button>
      </div>
    </div>
  )
}
