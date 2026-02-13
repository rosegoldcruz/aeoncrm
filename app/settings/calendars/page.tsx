"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default function CalendarsPage() {
  const calendars = [
    { id: 1, name: "John's Calendar", type: "Personal", color: "orange", events: 23, shared: "Private" },
    { id: 2, name: "Sales Team", type: "Team", color: "blue", events: 45, shared: "12 members" },
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
              <h1 className="text-2xl font-bold text-white">Calendars</h1>
              <p className="text-sm text-neutral-400 mt-1">Manage team calendars and availability</p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Calendar
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
                  className="block px-3 py-2 rounded-lg text-sm bg-orange-500 text-white"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {calendars.map((calendar) => (
              <div key={calendar.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-${calendar.color}-500/10 flex items-center justify-center`}
                    >
                      {calendar.type === "Personal" ? (
                        <Calendar className={`w-5 h-5 text-${calendar.color}-500`} />
                      ) : (
                        <Users className={`w-5 h-5 text-${calendar.color}-500`} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{calendar.name}</h3>
                      <p className="text-sm text-neutral-400">{calendar.type}</p>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full bg-${calendar.color}-500`} />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-neutral-400">Events This Week</p>
                    <p className="text-lg font-semibold text-white">{calendar.events}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400">Shared With</p>
                    <p className="text-lg font-semibold text-white">{calendar.shared}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 border-neutral-700 bg-transparent">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 border-neutral-700 bg-transparent">
                    Share
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 border-neutral-700 bg-transparent">
                    Settings
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
