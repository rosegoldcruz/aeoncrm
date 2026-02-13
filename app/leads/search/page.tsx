"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Building2,
  MapPin,
  Globe,
  FileText,
  ChevronDown,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LeadsSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")

  // Mock lead data
  const leads = [
    {
      id: 1,
      name: "John Smith",
      company: "Tech Solutions Inc",
      phone: "(555) 123-4567",
      email: "john.smith@techsolutions.com",
      address: "123 Main St, San Francisco, CA 94102",
      website: "https://techsolutions.com",
      status: "qualified",
      source: "Website",
      notes: "Interested in enterprise plan. Follow up next week about pricing and implementation timeline.",
      lastContact: "Nov 1, 2025",
      value: "$45,000",
      tags: ["Enterprise", "Hot Lead"],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "Marketing Pro Agency",
      phone: "(555) 234-5678",
      email: "sarah.j@marketingpro.com",
      address: "456 Oak Ave, Los Angeles, CA 90001",
      website: "https://marketingpro.com",
      status: "contacted",
      source: "Referral",
      notes: "Needs demo of AI features. Prefers afternoon meetings. Budget approved for Q1.",
      lastContact: "Oct 30, 2025",
      value: "$28,000",
      tags: ["Demo Scheduled", "Mid-Market"],
    },
    {
      id: 3,
      name: "Mike Davis",
      company: "Startup Ventures LLC",
      phone: "(555) 345-6789",
      email: "mike@startupventures.io",
      address: "789 Pine St, Austin, TX 78701",
      website: "https://startupventures.io",
      status: "new",
      source: "Cold Call",
      notes: "Early stage startup. Interested but needs to see ROI data before committing.",
      lastContact: "Oct 28, 2025",
      value: "$12,000",
      tags: ["Startup", "Warm Lead"],
    },
    {
      id: 4,
      name: "Emily Wilson",
      company: "Global Enterprises Corp",
      phone: "(555) 456-7890",
      email: "e.wilson@globalenterprises.com",
      address: "321 Elm St, New York, NY 10001",
      website: "https://globalenterprises.com",
      status: "qualified",
      source: "LinkedIn",
      notes:
        "Decision maker for North America region. Very interested in AI automation features. Needs proposal by end of month.",
      lastContact: "Nov 1, 2025",
      value: "$125,000",
      tags: ["Enterprise", "Decision Maker", "Hot Lead"],
    },
    {
      id: 5,
      name: "David Brown",
      company: "Small Business Solutions",
      phone: "(555) 567-8901",
      email: "david@smallbizsolutions.com",
      address: "654 Maple Dr, Chicago, IL 60601",
      website: "https://smallbizsolutions.com",
      status: "contacted",
      source: "Trade Show",
      notes: "Met at conference. Looking for affordable solution for small team. Price sensitive.",
      lastContact: "Oct 29, 2025",
      value: "$8,500",
      tags: ["Small Business", "Price Sensitive"],
    },
    {
      id: 6,
      name: "Lisa Anderson",
      company: "Healthcare Innovations",
      phone: "(555) 678-9012",
      email: "l.anderson@healthcareinnovations.com",
      address: "987 Cedar Ln, Boston, MA 02101",
      website: "https://healthcareinnovations.com",
      status: "qualified",
      source: "Webinar",
      notes: "Compliance requirements are critical. Needs HIPAA-compliant solution. Budget available immediately.",
      lastContact: "Oct 31, 2025",
      value: "$67,000",
      tags: ["Healthcare", "Compliance", "Hot Lead"],
    },
  ]

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery)

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter

    return matchesSearch && matchesStatus && matchesSource
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "qualified":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "contacted":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "new":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-zinc-700/20 text-zinc-400 border-zinc-700/30"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-orange-500 mb-2">Lead Search</h1>
        <p className="text-zinc-400">Search and manage all leads in your database</p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-zinc-950 border-zinc-800 p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <Input
              placeholder="Search by name, company, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-900 border-zinc-800 text-white h-12 text-base"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`border-zinc-700 h-12 ${showFilters ? "bg-orange-500 text-white border-orange-500" : "bg-transparent"}`}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="border-zinc-700 bg-transparent h-12">
            <Download className="h-5 w-5 mr-2" />
            Export
          </Button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">Status:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  className={statusFilter === "all" ? "bg-orange-500 hover:bg-orange-600" : "border-zinc-700"}
                >
                  All
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === "new" ? "default" : "outline"}
                  onClick={() => setStatusFilter("new")}
                  className={statusFilter === "new" ? "bg-orange-500 hover:bg-orange-600" : "border-zinc-700"}
                >
                  New
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === "contacted" ? "default" : "outline"}
                  onClick={() => setStatusFilter("contacted")}
                  className={statusFilter === "contacted" ? "bg-orange-500 hover:bg-orange-600" : "border-zinc-700"}
                >
                  Contacted
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === "qualified" ? "default" : "outline"}
                  onClick={() => setStatusFilter("qualified")}
                  className={statusFilter === "qualified" ? "bg-orange-500 hover:bg-orange-600" : "border-zinc-700"}
                >
                  Qualified
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">Source:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={sourceFilter === "all" ? "default" : "outline"}
                  onClick={() => setSourceFilter("all")}
                  className={sourceFilter === "all" ? "bg-orange-500 hover:bg-orange-600" : "border-zinc-700"}
                >
                  All
                </Button>
                <Button
                  size="sm"
                  variant={sourceFilter === "Website" ? "default" : "outline"}
                  onClick={() => setSourceFilter("Website")}
                  className={sourceFilter === "Website" ? "bg-orange-500 hover:bg-orange-600" : "border-zinc-700"}
                >
                  Website
                </Button>
                <Button
                  size="sm"
                  variant={sourceFilter === "Referral" ? "default" : "outline"}
                  onClick={() => setSourceFilter("Referral")}
                  className={sourceFilter === "Referral" ? "bg-orange-500 hover:bg-orange-600" : "border-zinc-700"}
                >
                  Referral
                </Button>
                <Button
                  size="sm"
                  variant={sourceFilter === "Cold Call" ? "default" : "outline"}
                  onClick={() => setSourceFilter("Cold Call")}
                  className={sourceFilter === "Cold Call" ? "bg-orange-500 hover:bg-orange-600" : "border-zinc-700"}
                >
                  Cold Call
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-zinc-400">
          Showing <span className="text-white font-medium">{filteredLeads.length}</span> of{" "}
          <span className="text-white font-medium">{leads.length}</span> leads
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-400">Sort by:</span>
          <Button variant="outline" size="sm" className="border-zinc-700 bg-transparent">
            Most Recent
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredLeads.map((lead) => (
          <Card
            key={lead.id}
            className="bg-zinc-950 border-zinc-800 p-5 hover:border-orange-500/50 transition-colors cursor-pointer"
            onClick={() => setSelectedLead(lead)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{lead.name}</h3>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Building2 className="h-4 w-4" />
                  <span>{lead.company}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
                  <DropdownMenuItem className="text-white">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Lead
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Lead
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-400">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Lead
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <Phone className="h-4 w-4 text-zinc-500" />
                <span>{lead.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <Mail className="h-4 w-4 text-zinc-500" />
                <span className="truncate">{lead.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <MapPin className="h-4 w-4 text-zinc-500" />
                <span className="truncate">{lead.address}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
              <span className="text-sm font-semibold text-orange-500">{lead.value}</span>
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {lead.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedLead && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl font-bold text-white mb-2">{selectedLead.name}</DialogTitle>
                    <DialogDescription className="text-zinc-400 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {selectedLead.company}
                    </DialogDescription>
                  </div>
                  <Badge className={getStatusColor(selectedLead.status)}>{selectedLead.status}</Badge>
                </div>
              </DialogHeader>

              <Tabs defaultValue="details" className="mt-6">
                <TabsList className="bg-zinc-900 border border-zinc-800">
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                  >
                    Notes
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                  >
                    Activity
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6 mt-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-orange-500" />
                      Contact Information
                    </h3>
                    <Card className="bg-zinc-950 border-zinc-800 p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-zinc-500 mb-1 block">Phone Number</label>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-zinc-500" />
                            <span className="text-sm text-white">{selectedLead.phone}</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-zinc-500 mb-1 block">Email Address</label>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-zinc-500" />
                            <span className="text-sm text-white truncate">{selectedLead.email}</span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <label className="text-xs text-zinc-500 mb-1 block">Address</label>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-zinc-500" />
                            <span className="text-sm text-white">{selectedLead.address}</span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <label className="text-xs text-zinc-500 mb-1 block">Website</label>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-zinc-500" />
                            <a
                              href={selectedLead.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-orange-500 hover:underline"
                            >
                              {selectedLead.website}
                            </a>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Lead Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-orange-500" />
                      Lead Information
                    </h3>
                    <Card className="bg-zinc-950 border-zinc-800 p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-zinc-500 mb-1 block">Status</label>
                          <Badge className={getStatusColor(selectedLead.status)}>{selectedLead.status}</Badge>
                        </div>
                        <div>
                          <label className="text-xs text-zinc-500 mb-1 block">Source</label>
                          <span className="text-sm text-white">{selectedLead.source}</span>
                        </div>
                        <div>
                          <label className="text-xs text-zinc-500 mb-1 block">Last Contact</label>
                          <span className="text-sm text-white">{selectedLead.lastContact}</span>
                        </div>
                        <div>
                          <label className="text-xs text-zinc-500 mb-1 block">Estimated Value</label>
                          <span className="text-sm font-semibold text-orange-500">{selectedLead.value}</span>
                        </div>
                        <div className="col-span-2">
                          <label className="text-xs text-zinc-500 mb-1 block">Tags</label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedLead.tags.map((tag: string, index: number) => (
                              <Badge key={index} variant="outline" className="border-zinc-700 text-zinc-400">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="mt-6">
                  <Card className="bg-zinc-950 border-zinc-800 p-4">
                    <div className="mb-4">
                      <label className="text-xs text-zinc-500 mb-2 block">Notes</label>
                      <p className="text-sm text-white leading-relaxed">{selectedLead.notes}</p>
                    </div>
                    <Button variant="outline" className="border-zinc-700 bg-transparent w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Notes
                    </Button>
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="mt-6">
                  <Card className="bg-zinc-950 border-zinc-800 p-4">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                        <div className="flex-1">
                          <div className="text-sm text-white mb-1">Lead qualified</div>
                          <div className="text-xs text-zinc-500">{selectedLead.lastContact}</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                        <div className="flex-1">
                          <div className="text-sm text-white mb-1">Email sent</div>
                          <div className="text-xs text-zinc-500">Oct 29, 2025</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                        <div className="flex-1">
                          <div className="text-sm text-white mb-1">Lead created from {selectedLead.source}</div>
                          <div className="text-xs text-zinc-500">Oct 28, 2025</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Lead
                </Button>
                <Button variant="outline" className="flex-1 border-zinc-700 bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="border-zinc-700 bg-transparent">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
