"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Zap, MoreVertical } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

export default function AutomationPage() {
  const workflows = [
    {
      id: 1,
      name: "New Lead Auto-Assignment",
      trigger: "Contact created",
      actions: 3,
      runs: 234,
      successRate: 98,
      active: true,
    },
    {
      id: 2,
      name: "Follow-up Reminder",
      trigger: "Call disposition = Callback",
      actions: 3,
      runs: 156,
      successRate: 95,
      active: true,
    },
    {
      id: 3,
      name: "Hot Lead Alert",
      trigger: "Lead score > 80",
      actions: 3,
      runs: 89,
      successRate: 100,
      active: false,
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-900">
        <div className="px-8 py-6">
          <Link
            href="/settings/business"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-orange-500 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Automation</h1>
              <p className="text-sm text-neutral-400 mt-1">Create workflows and automated actions</p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Workflow
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 border-r border-neutral-800 bg-neutral-900 min-h-screen">
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
                  className="block px-3 py-2 rounded-lg text-sm bg-orange-500 text-white"
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">Total Workflows</p>
              <p className="text-3xl font-bold text-white">12</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">Active</p>
              <p className="text-3xl font-bold text-green-500">8</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">Runs This Month</p>
              <p className="text-3xl font-bold text-white">1,234</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">Success Rate</p>
              <p className="text-3xl font-bold text-green-500">96%</p>
            </div>
          </div>

          {/* Workflows */}
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{workflow.name}</h3>
                      <p className="text-sm text-neutral-400">Trigger: {workflow.trigger}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={workflow.active} />
                    <Button size="icon" variant="ghost" className="text-neutral-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-neutral-400">Actions</p>
                    <p className="text-lg font-semibold text-white">{workflow.actions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400">Total Runs</p>
                    <p className="text-lg font-semibold text-white">{workflow.runs}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400">Success Rate</p>
                    <p className="text-lg font-semibold text-green-500">{workflow.successRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
