"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  X,
  ChevronDown,
  Calendar,
  Search,
  RefreshCw,
  Filter,
  ArrowRight,
  Check,
  Info,
  FileText,
  ArrowUpDown,
} from "lucide-react"

export default function PaymentsPage() {
  const [showSetupPanel, setShowSetupPanel] = useState(true)
  const [setupSteps, setSetupSteps] = useState([
    {
      id: 1,
      title: "Connect your payment provider",
      subtitle: "Stripe, NMI, Authorize.net, Paypal, Square & Custom Providers",
      completed: false,
    },
    { id: 2, title: "Connect your accounting", subtitle: "Connect Quickbooks", completed: false },
    {
      id: 3,
      title: "Control who can see your payments",
      subtitle: "Set permissions for your team members",
      completed: false,
    },
  ])

  const toggleStep = (id: number) => {
    setSetupSteps((steps) => steps.map((step) => (step.id === id ? { ...step, completed: !step.completed } : step)))
  }

  const metrics = [
    { label: "Invoice(s) in Draft", count: 0, amount: "$0.00" },
    { label: "Invoice(s) in Due", count: 0, amount: "$0.00" },
    { label: "Invoice(s) received", count: 0, amount: "$0.00" },
    { label: "Invoice(s) Overdue", count: 0, amount: "$0.00" },
  ]

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      {/* Header Tabs */}
      <div className="border-b border-neutral-800 bg-neutral-950">
        <div className="flex items-center gap-6 px-6 overflow-x-auto">
          <button className="py-4 text-sm font-medium text-orange-500 border-b-2 border-orange-500 whitespace-nowrap">
            Payments
          </button>
          <button className="py-4 text-sm text-neutral-400 hover:text-neutral-100 whitespace-nowrap flex items-center gap-2">
            Invoices & Estimates
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-orange-500 text-black rounded">NEW</span>
          </button>
          <button className="py-4 text-sm text-neutral-400 hover:text-neutral-100 whitespace-nowrap flex items-center gap-1">
            Documents & Contracts
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="py-4 text-sm text-neutral-400 hover:text-neutral-100 whitespace-nowrap flex items-center gap-1">
            Orders
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="py-4 text-sm text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            Subscriptions
          </button>
          <button className="py-4 text-sm text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            Payment Links
          </button>
          <button className="py-4 text-sm text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            Transactions
          </button>
          <button className="py-4 text-sm text-neutral-400 hover:text-neutral-100 whitespace-nowrap flex items-center gap-2">
            Products
            <ChevronDown className="w-3 h-3" />
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-orange-500 text-black rounded">NEW</span>
          </button>
          <button className="py-4 text-sm text-neutral-400 hover:text-neutral-100 whitespace-nowrap">Coupons</button>
          <button className="py-4 text-sm text-neutral-400 hover:text-neutral-100 whitespace-nowrap">Settings</button>
          <button className="py-4 text-sm text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            Integrations
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 p-6 transition-all ${showSetupPanel ? "mr-80" : ""}`}>
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-neutral-100 mb-1">Invoices</h1>
            <p className="text-sm text-neutral-400">Create and manage all invoices generated for your business</p>
          </div>

          {/* Alert Banner */}
          <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-neutral-200">
                Connect at least one payment gateway to start receiving payments
              </p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-black">Integrate Payment Gateway</Button>
          </div>

          {/* Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <Card key={index} className="p-4 bg-neutral-900 border-neutral-800">
                <div className="text-sm text-neutral-400 mb-2">
                  {metric.count} {metric.label}
                </div>
                <div className="text-2xl font-bold text-neutral-100">{metric.amount}</div>
              </Card>
            ))}
          </div>

          {/* Filters Section */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Input placeholder="Start Date" className="bg-neutral-900 border-neutral-800 text-neutral-100 pr-10" />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              </div>
              <span className="text-neutral-400">→</span>
              <div className="relative">
                <Input placeholder="End Date" className="bg-neutral-900 border-neutral-800 text-neutral-100 pr-10" />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input
                  placeholder="Search invoices..."
                  className="bg-neutral-900 border-neutral-800 text-neutral-100 pl-10"
                />
              </div>
              <Button
                variant="outline"
                className="border-neutral-800 text-neutral-100 hover:bg-neutral-900 bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-neutral-800 text-neutral-100 hover:bg-neutral-900 bg-transparent"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Table */}
          <Card className="bg-neutral-900 border-neutral-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Invoice Name</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Invoice Number</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Customer</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">
                      <button className="flex items-center gap-1 hover:text-neutral-100">
                        Issue Date
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Amount</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="p-12">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mb-4">
                          <FileText className="w-8 h-8 text-neutral-600" />
                        </div>
                        <p className="text-neutral-400 text-sm">No invoices to show yet</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Setup Panel (Right Sidebar) */}
        {showSetupPanel && (
          <div className="fixed right-0 top-0 h-full w-80 bg-neutral-950 border-l border-neutral-800 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-100">Get started with payments</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSetupPanel(false)}
                className="text-neutral-400 hover:text-neutral-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {setupSteps.map((step, index) => (
                <div key={step.id}>
                  <Card className="p-4 bg-neutral-900 border-neutral-800 hover:border-orange-500/50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleStep(step.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                          step.completed
                            ? "bg-orange-500 border-orange-500"
                            : "border-neutral-600 hover:border-orange-500"
                        }`}
                      >
                        {step.completed && <Check className="w-3 h-3 text-black" />}
                      </button>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-neutral-100 mb-1">{step.title}</h3>
                        <p className="text-xs text-neutral-400">{step.subtitle}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-orange-500 flex-shrink-0"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                  {index < setupSteps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div className="w-0.5 h-4 bg-neutral-800" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
