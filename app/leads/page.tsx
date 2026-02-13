"use client"

import { useState } from "react"
import { Search, Filter, Download, Upload, Phone, Mail, MoreVertical, X, MessageSquare, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockLeads = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    phone: "(555) 123-4567",
    email: "john.smith@email.com",
    status: "connected",
    lastCalled: "2025-10-29 14:32",
    attempts: 3,
    campaign: "Summer Campaign",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Johnson",
    phone: "(555) 234-5678",
    email: "sarah.j@email.com",
    status: "pending",
    lastCalled: "Never",
    attempts: 0,
    campaign: "Q4 Outreach",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Williams",
    phone: "(555) 345-6789",
    email: "m.williams@email.com",
    status: "no_answer",
    lastCalled: "2025-10-28 09:15",
    attempts: 2,
    campaign: "Summer Campaign",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Brown",
    phone: "(555) 456-7890",
    email: "emily.brown@email.com",
    status: "voicemail",
    lastCalled: "2025-10-27 16:45",
    attempts: 4,
    campaign: "Follow-up List",
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Martinez",
    phone: "(555) 567-8901",
    email: "d.martinez@email.com",
    status: "dnc",
    lastCalled: "2025-10-26 11:20",
    attempts: 1,
    campaign: "Q4 Outreach",
  },
]

const statusColors = {
  connected: "bg-green-500/20 text-green-500 border-green-500/30",
  pending: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  calling: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  no_answer: "bg-orange-500/20 text-orange-500 border-orange-500/30",
  voicemail: "bg-purple-500/20 text-purple-500 border-purple-500/30",
  dnc: "bg-red-500/20 text-red-500 border-red-500/30",
}

export default function LeadsPage() {
  const [selectedLeads, setSelectedLeads] = useState<number[]>([])
  const [selectedLead, setSelectedLead] = useState<(typeof mockLeads)[0] | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const toggleLeadSelection = (id: number) => {
    setSelectedLeads((prev) => (prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (selectedLeads.length === mockLeads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(mockLeads.map((lead) => lead.id))
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orange-500">Lead Lists</h1>
          <p className="text-neutral-400 text-sm">Manage contacts and lead lists</p>
        </div>
        <div className="text-sm text-neutral-400">Thu, Oct 30, 2025</div>
      </div>

      {/* Main Content Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-6">
        {/* List Info */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">Summer Leads</h2>
            <p className="text-2xl font-bold text-orange-500">15,420 leads</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-neutral-700 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export List
            </Button>
            <Button variant="outline" className="border-neutral-700 bg-transparent">
              <Upload className="w-4 h-4 mr-2" />
              Upload More
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600">View All Leads</Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-400">Campaign Progress</span>
            <span className="text-white">68% Complete</span>
          </div>
          <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: "68%" }} />
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-0 md:min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input
                placeholder="Search by name, phone, or email..."
                className="pl-10 bg-neutral-800 border-neutral-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-neutral-800 border-neutral-700">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="calling">Calling</SelectItem>
              <SelectItem value="connected">Connected</SelectItem>
              <SelectItem value="no_answer">No Answer</SelectItem>
              <SelectItem value="voicemail">Voicemail</SelectItem>
              <SelectItem value="dnc">DNC</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-neutral-700 bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Bulk Actions */}
        {selectedLeads.length > 0 && (
          <div className="flex items-center gap-3 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <span className="text-sm text-orange-500 font-medium">
              {selectedLeads.length} lead{selectedLeads.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-2 ml-auto">
              <Button size="sm" variant="outline" className="border-orange-500/30 bg-transparent text-orange-500">
                Assign to Campaign
              </Button>
              <Button size="sm" variant="outline" className="border-orange-500/30 bg-transparent text-orange-500">
                Update Status
              </Button>
              <Button size="sm" variant="outline" className="border-orange-500/30 bg-transparent text-orange-500">
                Export Selected
              </Button>
              <Button size="sm" variant="outline" className="border-red-500/30 bg-transparent text-red-500">
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="border border-neutral-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-800">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <Checkbox checked={selectedLeads.length === mockLeads.length} onCheckedChange={toggleSelectAll} />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Last Called
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Attempts
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {mockLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-neutral-800/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={() => toggleLeadSelection(lead.id)}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-white">
                      {lead.firstName} {lead.lastName}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-400">{lead.phone}</td>
                    <td className="px-4 py-3 text-sm text-neutral-400">{lead.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                          statusColors[lead.status as keyof typeof statusColors]
                        }`}
                      >
                        {lead.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-400">{lead.lastCalled}</td>
                    <td className="px-4 py-3 text-sm text-neutral-400">{lead.attempts}</td>
                    <td className="px-4 py-3 text-sm text-neutral-400">{lead.campaign}</td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-800">
                          <DropdownMenuItem className="text-neutral-300 hover:text-white">
                            <Phone className="w-4 h-4 mr-2" />
                            Call Now
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-neutral-300 hover:text-white">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send SMS
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-neutral-300 hover:text-white">
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-neutral-300 hover:text-white">Edit Lead</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500 hover:text-red-400">Delete Lead</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Lead Details Panel (Slide-in from right) */}
      {selectedLead && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelectedLead(null)} />
          <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-neutral-900 border-l border-neutral-800 z-50 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedLead.firstName} {selectedLead.lastName}
                  </h2>
                  <p className="text-sm text-neutral-400 mt-1">{selectedLead.campaign}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedLead(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-orange-500 uppercase">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-neutral-500" />
                    <span className="text-white">{selectedLead.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-neutral-500" />
                    <span className="text-white">{selectedLead.email}</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-orange-500 uppercase">Status</h3>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                    statusColors[selectedLead.status as keyof typeof statusColors]
                  }`}
                >
                  {selectedLead.status.replace("_", " ")}
                </span>
              </div>

              {/* Call History */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-orange-500 uppercase">Call History</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-400">Last Called:</span>
                    <span className="text-white">{selectedLead.lastCalled}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-400">Total Attempts:</span>
                    <span className="text-white">{selectedLead.attempts}</span>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-orange-500 uppercase">Notes</h3>
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                  <p className="text-sm text-neutral-400 italic">No notes yet</p>
                </div>
                <Button variant="outline" className="w-full border-neutral-700 bg-transparent">
                  Add Note
                </Button>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-orange-500 uppercase">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs text-neutral-400">
                    <Tag className="w-3 h-3 inline mr-1" />
                    High Priority
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-orange-500 uppercase">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="border-neutral-700 bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send SMS
                  </Button>
                  <Button variant="outline" className="border-neutral-700 bg-transparent">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="border-neutral-700 bg-transparent">
                    Update Status
                  </Button>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-orange-500 uppercase">Activity Timeline</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <div className="w-px h-full bg-neutral-800" />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm text-white">Lead created</p>
                      <p className="text-xs text-neutral-500 mt-1">Oct 15, 2025 at 10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-neutral-600 rounded-full" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">Added to campaign</p>
                      <p className="text-xs text-neutral-500 mt-1">Oct 16, 2025 at 2:15 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
