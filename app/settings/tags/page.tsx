"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Tag, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function TagsPage() {
  const tags = [
    { id: 1, name: "Hot Lead", color: "red", usage: 234, type: "Contact" },
    { id: 2, name: "VIP", color: "yellow", usage: 45, type: "Contact" },
    { id: 3, name: "Follow-up", color: "blue", usage: 567, type: "Contact" },
    { id: 4, name: "Q4 Promo", color: "green", usage: 123, type: "Campaign" },
    { id: 5, name: "High Value", color: "purple", usage: 89, type: "Deal" },
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
              <h1 className="text-2xl font-bold text-white">Tags</h1>
              <p className="text-sm text-neutral-400 mt-1">Organize contacts, deals, and campaigns with tags</p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Tag
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
                  className="block px-3 py-2 rounded-lg text-sm bg-orange-500 text-white"
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
              <p className="text-sm text-neutral-400 mb-1">Total Tags</p>
              <p className="text-3xl font-bold text-white">45</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">Most Used</p>
              <p className="text-lg font-semibold text-white">Follow-up (567)</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">Unused Tags</p>
              <p className="text-3xl font-bold text-yellow-500">5</p>
            </div>
          </div>

          {/* Tags Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-800 border-b border-neutral-700">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Tag Name</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Color</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">
                      Usage Count
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Type</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {tags.map((tag) => (
                    <tr key={tag.id} className="hover:bg-neutral-800">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-orange-500" />
                          <span className="text-white font-medium">{tag.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full bg-${tag.color}-500`} />
                          <span className="text-neutral-400 capitalize">{tag.color}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white">{tag.usage}</td>
                      <td className="px-6 py-4 text-neutral-400">{tag.type}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-neutral-700 text-red-500 bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
