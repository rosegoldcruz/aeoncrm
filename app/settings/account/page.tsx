"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { User, AlertTriangle, Download, Trash2, Camera, Check } from "lucide-react"

export default function AccountSettingsPage() {
  return (
    <div className="min-h-screen bg-black p-3 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-orange-500 flex items-center gap-3">
          <User className="w-8 h-8" />
          Account Settings
        </h1>
        <p className="text-gray-400 mt-1">Manage your personal account information</p>
      </div>

      <div className="space-y-6">
        {/* Profile Information */}
        <Card className="bg-neutral-900 border-neutral-800 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 text-3xl font-bold">
                JD
              </div>
              <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                <Camera className="w-3 h-3 mr-2" />
                Change Photo
              </Button>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                <Input defaultValue="John" className="bg-black border-neutral-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                <Input defaultValue="Doe" className="bg-black border-neutral-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <div className="flex items-center gap-2">
                  <Input defaultValue="john@company.com" className="bg-black border-neutral-700" />
                  <Check className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                <Input defaultValue="+1 (555) 123-4567" className="bg-black border-neutral-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Job Title</label>
                <Input defaultValue="Sales Manager" className="bg-black border-neutral-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Department</label>
                <select className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-2 text-white">
                  <option>Sales</option>
                  <option>Support</option>
                  <option>Management</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
            <Button variant="outline" className="border-neutral-700 bg-transparent">
              Cancel
            </Button>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="bg-neutral-900 border-neutral-800 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Preferences</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
              <select className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-2 text-white">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Timezone</label>
              <select className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-2 text-white">
                <option>(GMT-7:00) Phoenix, Arizona</option>
                <option>(GMT-8:00) Pacific Time</option>
                <option>(GMT-5:00) Eastern Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Date Format</label>
              <select className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-2 text-white">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Theme</label>
              <select className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-2 text-white">
                <option>Dark (default)</option>
                <option>Light</option>
                <option>Auto (system)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Password & Security */}
        <Card className="bg-neutral-900 border-neutral-800 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Password & Security</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
              <Input type="password" className="bg-black border-neutral-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
              <Input type="password" className="bg-black border-neutral-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
              <Input type="password" className="bg-black border-neutral-700" />
            </div>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">Update Password</Button>

          <div className="border-t border-neutral-800 mt-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white mb-1">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline" className="border-neutral-700 bg-transparent">
                Enable 2FA
              </Button>
            </div>
          </div>
        </Card>

        {/* Active Sessions */}
        <Card className="bg-neutral-900 border-neutral-800 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Active Sessions</h2>
          <div className="space-y-4">
            {[
              { device: "Chrome (Current)", location: "Phoenix, AZ", ip: "192.168.1.1", time: "Now" },
              { device: "Safari on iPhone", location: "Phoenix, AZ", ip: "192.168.1.10", time: "2 hours ago" },
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
                <div>
                  <div className="font-medium text-white">{session.device}</div>
                  <div className="text-sm text-gray-400">
                    {session.location} • {session.ip}
                  </div>
                  <div className="text-sm text-gray-400">Last active: {session.time}</div>
                </div>
                {index !== 0 && (
                  <Button size="sm" variant="outline" className="border-neutral-700 text-red-500 bg-transparent">
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 border-neutral-700 bg-transparent">
            Sign Out All Other Sessions
          </Button>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-red-900/20 border-red-900/50 p-6">
          <h2 className="text-xl font-bold text-red-500 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white mb-1">Export My Data</h3>
                <p className="text-sm text-gray-400">Download all your personal data (GDPR compliance)</p>
              </div>
              <Button variant="outline" className="border-neutral-700 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Request Export
              </Button>
            </div>
            <div className="border-t border-red-900/50 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-red-500 mb-1">Delete Account</h3>
                  <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                </div>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10 bg-transparent">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
