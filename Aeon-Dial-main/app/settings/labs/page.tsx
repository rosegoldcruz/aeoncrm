"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Sparkles, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function LabsPage() {
  const features = [
    {
      id: 1,
      name: "AI Call Summarization",
      description: "Automatically generate call summaries using AI",
      status: "beta",
      enabled: true,
      availability: "Beta - Limited to 100 calls/day",
    },
    {
      id: 2,
      name: "Voice Cloning",
      description: "Clone agent voices for AI-powered outbound calls",
      status: "coming-soon",
      enabled: false,
      availability: "Coming Q1 2026",
    },
    {
      id: 3,
      name: "Advanced Analytics",
      description: "Predictive analytics and forecasting",
      status: "alpha",
      enabled: true,
      availability: "Alpha - May have bugs",
    },
    {
      id: 4,
      name: "Workflow Automation v2",
      description: "Next-gen workflow builder with AI suggestions",
      status: "beta",
      enabled: false,
      availability: "Apply for beta access",
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
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">Labs</h1>
            <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">NEW</span>
          </div>
          <p className="text-sm text-neutral-400">Experimental features and beta testing</p>

          {/* Warning Banner */}
          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-500">Features here are experimental and may change</p>
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
                  className="block px-3 py-2 rounded-lg text-sm bg-orange-500 text-white flex items-center justify-between"
                >
                  Labs
                  <span className="text-xs bg-white text-orange-500 px-2 py-0.5 rounded">NEW</span>
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
          {/* Beta Status Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-white">Your Beta Status</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-neutral-400">Features Unlocked</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Feedback Submitted</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Status</p>
                <p className="text-lg font-semibold text-green-500">Beta Tester ✓</p>
              </div>
            </div>
          </div>

          {/* Experimental Features */}
          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          feature.status === "beta"
                            ? "bg-blue-500/10 text-blue-500"
                            : feature.status === "alpha"
                              ? "bg-purple-500/10 text-purple-500"
                              : "bg-neutral-700 text-neutral-400"
                        }`}
                      >
                        {feature.status === "beta" ? "BETA" : feature.status === "alpha" ? "ALPHA" : "COMING SOON"}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-400 mb-2">{feature.description}</p>
                    <p className="text-xs text-neutral-500">{feature.availability}</p>
                  </div>
                  {feature.status !== "coming-soon" && <Switch checked={feature.enabled} />}
                </div>
                <div className="flex gap-2">
                  {feature.status === "coming-soon" ? (
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      Join Waitlist
                    </Button>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                        Submit Feedback
                      </Button>
                      {feature.status === "alpha" && (
                        <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                          Report Issue
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
