import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FolderPlus, Plus, Clock, List, Search, ChevronDown, MoreVertical } from "lucide-react"

export default function FunnelsPage() {
  const funnels = [
    { name: "Business Services", updated: "Sep 14, 2025 02:43 PM", steps: 3 },
    { name: "House Flippers", updated: "Sep 24, 2025 01:53 PM", steps: 3 },
    { name: "Partner Program", updated: "Sep 14, 2025 02:44 PM", steps: 3 },
    { name: "Real Estate Professionals", updated: "Sep 24, 2025 01:53 PM", steps: 3 },
    { name: "Referral Program", updated: "Sep 14, 2025 02:44 PM", steps: 3 },
  ]

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      {/* Header Tabs */}
      <div className="border-b border-neutral-800">
        <div className="flex items-center gap-6 px-6 overflow-x-auto">
          <button className="py-4 text-sm font-medium text-orange-500 border-b-2 border-orange-500 whitespace-nowrap">
            Sites
          </button>
          <button className="py-4 text-sm font-medium text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            Websites
          </button>
          <button className="py-4 text-sm font-medium text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            Stores
          </button>
          <button className="py-4 text-sm font-medium text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            Webinars
          </button>
          <button className="py-4 text-sm font-medium text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            Analytics
          </button>
          <button className="py-4 text-sm font-medium text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            Blogs
          </button>
          <button className="py-4 text-sm font-medium text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            WordPress
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 py-4 text-sm font-medium text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
              Client Portal <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neutral-900 border-neutral-800">
              <DropdownMenuItem className="text-neutral-100">Portal Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-neutral-100">Access Control</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 py-4 text-sm font-medium text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
              Forms <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neutral-900 border-neutral-800">
              <DropdownMenuItem className="text-neutral-100">Contact Forms</DropdownMenuItem>
              <DropdownMenuItem className="text-neutral-100">Lead Forms</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 py-4 text-sm font-medium text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
              Surveys <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neutral-900 border-neutral-800">
              <DropdownMenuItem className="text-neutral-100">Customer Surveys</DropdownMenuItem>
              <DropdownMenuItem className="text-neutral-100">Feedback Forms</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 py-4 text-sm font-medium text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
              Quizzes <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neutral-900 border-neutral-800">
              <DropdownMenuItem className="text-neutral-100">Assessment Quizzes</DropdownMenuItem>
              <DropdownMenuItem className="text-neutral-100">Lead Quizzes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="py-4 text-sm font-medium text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            Chat Widget
          </button>
          <button className="py-4 text-sm font-medium text-neutral-400 hover:text-neutral-100 whitespace-nowrap">
            QR Codes
          </button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="border-b border-neutral-800 bg-neutral-950">
        <div className="flex items-center gap-6 px-6">
          <button className="py-3 text-sm font-medium text-orange-500 border-b-2 border-orange-500">Funnels</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" className="bg-neutral-900 border-neutral-800 text-neutral-100 hover:bg-neutral-800">
            <FolderPlus className="h-4 w-4 mr-2" />
            Create Folder
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Funnel
          </Button>
        </div>

        {/* View Toggles and Search */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900"
            >
              <Clock className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input
              placeholder="Search for Funnels"
              className="pl-10 bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500"
            />
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <button className="text-orange-500 hover:text-orange-400">Home</button>
        </div>

        {/* Table */}
        <div className="border border-neutral-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-900 border-b border-neutral-800">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Last Updated</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {funnels.map((funnel, index) => (
                <tr key={index} className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-neutral-100">{funnel.name}</div>
                      <div className="text-xs text-neutral-500">{funnel.steps} Steps</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-neutral-400">{funnel.updated}</td>
                  <td className="py-4 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-neutral-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-800">
                        <DropdownMenuItem className="text-neutral-100">Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-neutral-100">Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-neutral-100">View Analytics</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button variant="outline" size="sm" disabled className="bg-neutral-900 border-neutral-800 text-neutral-400">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-orange-600 border-orange-600 text-white">
            1
          </Button>
          <Button variant="outline" size="sm" disabled className="bg-neutral-900 border-neutral-800 text-neutral-400">
            Next
          </Button>
        </div>
        <div className="text-center text-sm text-neutral-500 mt-2">Page 1 of 1</div>
      </div>
    </div>
  )
}
