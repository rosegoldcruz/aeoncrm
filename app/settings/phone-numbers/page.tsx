"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Phone } from "lucide-react"
import Link from "next/link"

export default function PhoneNumbersPage() {
  const numbers = [
    {
      id: 1,
      number: "(623) 552-4307",
      type: "Toll-Free",
      provider: "VOIP.ms",
      status: "Active",
      assigned: "Inbound Queue",
      cost: "$1.50",
    },
    {
      id: 2,
      number: "(623) 462-2152",
      type: "Local",
      provider: "VOIP.ms",
      status: "Active",
      assigned: "Sales Campaign",
      cost: "$0.85",
    },
    {
      id: 3,
      number: "(555) 123-4567",
      type: "Local",
      provider: "Twilio",
      status: "Unused",
      assigned: "Not assigned",
      cost: "$1.00",
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
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">Phone Numbers</h1>
              <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">NEW</span>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Phone Number
            </Button>
          </div>
          <p className="text-sm text-neutral-400 mt-1">Manage your business phone numbers</p>
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
                  className="block px-3 py-2 rounded-lg text-sm bg-orange-500 text-white flex items-center justify-between"
                >
                  Phone Numbers
                  <span className="text-xs bg-white text-orange-500 px-2 py-0.5 rounded">NEW</span>
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
              <p className="text-sm text-neutral-400 mb-1">Total Numbers</p>
              <p className="text-3xl font-bold text-white">3</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">Active</p>
              <p className="text-3xl font-bold text-green-500">2</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-sm text-neutral-400 mb-1">Monthly Cost</p>
              <p className="text-3xl font-bold text-white">$3.35</p>
            </div>
          </div>

          {/* Phone Numbers Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-800 border-b border-neutral-700">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Number</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Type</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Provider</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">
                      Assigned To
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">
                      Monthly Cost
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {numbers.map((number) => (
                    <tr key={number.id} className="hover:bg-neutral-800">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-orange-500" />
                          <span className="text-white font-medium">{number.number}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-400">{number.type}</td>
                      <td className="px-6 py-4 text-white">{number.provider}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            number.status === "Active"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${number.status === "Active" ? "bg-green-500" : "bg-yellow-500"}`}
                          />
                          {number.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-400">{number.assigned}</td>
                      <td className="px-6 py-4 text-white">{number.cost}</td>
                      <td className="px-6 py-4 text-right">
                        <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                          Edit
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
