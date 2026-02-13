"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Plug } from "lucide-react"
import Link from "next/link"

export default function IntegrationsPage() {
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
          <h1 className="text-2xl font-bold text-white">Integrations</h1>
          <p className="text-sm text-neutral-400 mt-1">Connect your business tools</p>
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
                  className="block px-3 py-2 rounded-lg text-sm bg-orange-500 text-white"
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
          {/* Connected Integrations */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Connected Integrations</h2>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center">
                    <Plug className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Google Workspace</h3>
                    <p className="text-sm text-neutral-400">Gmail, Calendar, Drive</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                    Configure
                  </Button>
                  <Button size="sm" variant="outline" className="border-neutral-700 text-red-500 bg-transparent">
                    Disconnect
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Available Integrations */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Available Integrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["Salesforce", "HubSpot", "Twilio", "Zapier", "Slack", "Microsoft 365"].map((integration) => (
                <div key={integration} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                  <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                    <Plug className="w-6 h-6 text-neutral-500" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{integration}</h3>
                  <p className="text-sm text-neutral-400 mb-4">Connect your {integration} account</p>
                  <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
