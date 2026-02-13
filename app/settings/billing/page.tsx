"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, CreditCard, MapPin, Mail, Upload, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function BillingPage() {
  const [taxExempt, setTaxExempt] = useState(false)

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
          <h1 className="text-2xl font-bold text-white">Billing</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage billing information and payment methods</p>
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
                  className="block px-3 py-2 rounded-lg text-sm bg-orange-500 text-white"
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
          {/* Payment Methods */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold text-white">Payment Methods</h2>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">+ Add Payment Method</Button>
            </div>

            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">VISA</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium">•••• •••• •••• 4567</p>
                    <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded">Primary</span>
                  </div>
                  <p className="text-sm text-neutral-400">Expires 12/2026</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-neutral-600 bg-transparent">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="border-neutral-600 text-red-500 bg-transparent">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-white">Billing Address</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="companyName" className="text-sm text-neutral-400 mb-2 block">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  defaultValue="AEON DIALER LLC"
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>

              <div className="lg:col-span-2">
                <Label htmlFor="address1" className="text-sm text-neutral-400 mb-2 block">
                  Address Line 1
                </Label>
                <Input
                  id="address1"
                  defaultValue="123 Main Street"
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>

              <div className="lg:col-span-2">
                <Label htmlFor="address2" className="text-sm text-neutral-400 mb-2 block">
                  Address Line 2
                </Label>
                <Input
                  id="address2"
                  placeholder="Suite, Unit, etc."
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>

              <div>
                <Label htmlFor="city" className="text-sm text-neutral-400 mb-2 block">
                  City
                </Label>
                <Input id="city" defaultValue="Phoenix" className="bg-neutral-800 border-neutral-700 text-white" />
              </div>

              <div>
                <Label htmlFor="state" className="text-sm text-neutral-400 mb-2 block">
                  State/Province
                </Label>
                <Input id="state" defaultValue="Arizona" className="bg-neutral-800 border-neutral-700 text-white" />
              </div>

              <div>
                <Label htmlFor="zip" className="text-sm text-neutral-400 mb-2 block">
                  ZIP/Postal Code
                </Label>
                <Input id="zip" defaultValue="85001" className="bg-neutral-800 border-neutral-700 text-white" />
              </div>

              <div>
                <Label className="text-sm text-neutral-400 mb-2 block">Country</Label>
                <Select defaultValue="us">
                  <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Update Address</Button>
            </div>
          </div>

          {/* Billing Contact */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-white">Billing Contact</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billingEmail" className="text-sm text-neutral-400 mb-2 block">
                  Billing Email
                </Label>
                <Input
                  id="billingEmail"
                  type="email"
                  defaultValue="billing@company.com"
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm text-neutral-400 mb-2 block">
                  Phone
                </Label>
                <Input
                  id="phone"
                  defaultValue="+1 480-400-0095"
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>

              <div className="lg:col-span-2">
                <Label htmlFor="additionalRecipients" className="text-sm text-neutral-400 mb-2 block">
                  Additional Recipients
                </Label>
                <Input
                  id="additionalRecipients"
                  placeholder="Enter email addresses separated by commas"
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  These contacts will receive copies of all billing emails
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save Contact</Button>
            </div>
          </div>

          {/* Tax Information */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Tax Information</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="taxId" className="text-sm text-neutral-400 mb-2 block">
                  Tax ID / VAT Number
                </Label>
                <Input
                  id="taxId"
                  placeholder="Enter your tax ID or VAT number"
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>

              <div className="flex items-center justify-between py-3 border-t border-neutral-800">
                <div>
                  <Label htmlFor="taxExempt" className="text-sm text-white font-medium">
                    Tax Exempt
                  </Label>
                  <p className="text-xs text-neutral-500 mt-1">Enable if your organization is tax exempt</p>
                </div>
                <Switch id="taxExempt" checked={taxExempt} onCheckedChange={setTaxExempt} />
              </div>

              {taxExempt && (
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                  <Label className="text-sm text-neutral-400 mb-2 block">Upload Tax Exempt Certificate</Label>
                  <div className="border-2 border-dashed border-neutral-600 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
                    <p className="text-sm text-neutral-400 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-neutral-500">PDF, PNG, or JPG (max 5MB)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
