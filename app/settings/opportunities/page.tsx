"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, TrendingUp, Edit, Copy, Archive } from "lucide-react"
import Link from "next/link"

export default function OpportunitiesPage() {
  const pipelines = [
    { id: 1, name: "Sales Pipeline", value: "$1.2M", deals: 45, stages: 6, winRate: 32 },
    { id: 2, name: "Enterprise Pipeline", value: "$3.5M", deals: 12, stages: 7, winRate: 45 },
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
              <h1 className="text-2xl font-bold text-white">Opportunities & Pipelines</h1>
              <p className="text-sm text-neutral-400 mt-1">Manage sales pipelines and deal stages</p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Pipeline
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
                  className="block px-3 py-2 rounded-lg text-sm bg-orange-500 text-white"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pipelines.map((pipeline) => (
              <div key={pipeline.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{pipeline.name}</h3>
                    <p className="text-2xl font-bold text-orange-500">{pipeline.value}</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-neutral-400">Open Deals</p>
                    <p className="text-lg font-semibold text-white">{pipeline.deals}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400">Stages</p>
                    <p className="text-lg font-semibold text-white">{pipeline.stages}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400">Win Rate</p>
                    <p className="text-lg font-semibold text-green-500">{pipeline.winRate}%</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 border-neutral-700 bg-transparent">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                    <Archive className="w-4 h-4" />
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
