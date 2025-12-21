import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  FolderIcon,
  ExternalLinkIcon,
  ChevronDownIcon,
  ClockIcon,
  ListIcon,
  SearchIcon,
  ChevronRightIcon,
  MoreVerticalIcon,
  InfoIcon,
  BellIcon,
  SettingsIcon,
  PlusIcon,
  LayoutGridIcon,
} from "lucide-react"
import Link from "next/link"

export default function AutomationPage() {
  const workflows = [
    {
      id: 1,
      name: "Vici-Dial Webhooks",
      type: "folder",
      status: null,
      totalEnrolled: null,
      activeEnrolled: null,
      lastUpdated: "Sep 20 2025, 12:16 AM",
      createdOn: "Sep 20 2025, 12:16 AM",
    },
    {
      id: 2,
      name: "Airtable Record Creation Sync",
      type: "workflow",
      status: "Draft",
      totalEnrolled: 0,
      activeEnrolled: 0,
      lastUpdated: "Jan 16 2025, 1:31 PM",
      createdOn: "Jan 16 2025, 1:30 PM",
    },
    {
      id: 3,
      name: "Lead Set-up",
      type: "workflow",
      status: "Published",
      totalEnrolled: 4376,
      activeEnrolled: 0,
      lastUpdated: "Sep 19 2025, 1:29 PM",
      createdOn: "Sep 19 2025, 1:29 PM",
    },
    {
      id: 4,
      name: "Opportunity",
      type: "workflow",
      status: "Published",
      totalEnrolled: 26,
      activeEnrolled: 0,
      lastUpdated: "Sep 19 2025, 1:34 PM",
      createdOn: "Sep 19 2025, 1:33 PM",
    },
    {
      id: 5,
      name: "Reface Kit Follow Up Sequence - Human",
      type: "workflow",
      status: "Draft",
      totalEnrolled: 0,
      activeEnrolled: 0,
      lastUpdated: "Oct 28 2025, 6:15 AM",
      createdOn: "Oct 28 2025, 5:44 AM",
    },
    {
      id: 6,
      name: "Reface Kit Sequence - AI",
      type: "workflow",
      status: "Draft",
      totalEnrolled: 0,
      activeEnrolled: 0,
      lastUpdated: "Oct 28 2025, 6:05 AM",
      createdOn: "Oct 28 2025, 5:34 AM",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-950">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            {/* Changed Automation heading to orange */}
            <h1 className="text-xl font-semibold text-orange-500">Automation</h1>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                className="border-b-2 border-orange-500 rounded-none px-4 py-2 text-orange-500 hover:bg-neutral-900"
              >
                Workflows
              </Button>
              <Link href="/automation/triggers">
                <Button
                  variant="ghost"
                  className="rounded-none px-4 py-2 text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
                >
                  Triggers
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="rounded-none px-4 py-2 text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
              >
                <SettingsIcon className="h-4 w-4 mr-2" />
                Global Workflow Settings
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20">
              <BellIcon className="h-3 w-3 mr-1" />
              What's New
            </Badge>
            <span className="text-sm text-neutral-400">Automation Updates</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="border-b border-neutral-800 bg-neutral-950 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Workflow List</h2>
          <div className="flex gap-2">
            <Button variant="outline" className="border-neutral-700 hover:bg-neutral-900 bg-transparent">
              Create Folder
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-neutral-800 bg-neutral-950 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="border-b-2 border-orange-500 rounded-none text-orange-500 hover:bg-neutral-900"
            >
              All Workflows
              <Badge className="ml-2 bg-neutral-800 text-neutral-300">6</Badge>
            </Button>
            <Button
              variant="ghost"
              className="rounded-none text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
            >
              Needs Review
              <Badge className="ml-2 bg-neutral-800 text-neutral-300">0</Badge>
            </Button>
            <Button
              variant="ghost"
              className="rounded-none text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
            >
              Deleted
            </Button>
            <Button variant="ghost" className="rounded-none text-orange-500 hover:bg-neutral-900">
              <PlusIcon className="h-4 w-4 mr-1" />
              New Smart List
            </Button>
          </div>
          <Button variant="ghost" className="text-neutral-400 hover:bg-neutral-900">
            <LayoutGridIcon className="h-4 w-4 mr-2" />
            Customize List
          </Button>
        </div>
      </div>

      {/* Sub-filters and View Toggles */}
      <div className="border-b border-neutral-800 bg-neutral-950 px-6 py-3">
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-neutral-400 hover:bg-neutral-900">
                <ChevronDownIcon className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neutral-900 border-neutral-800">
              <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-800">Filter by Status</DropdownMenuItem>
              <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-800">Filter by Date</DropdownMenuItem>
              <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-800">
                Filter by Enrollment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:bg-neutral-900">
              <ClockIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:bg-neutral-900">
              <ListIcon className="h-4 w-4" />
            </Button>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <Input
                placeholder="Search"
                className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-300 placeholder:text-neutral-500 w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="px-6 py-3 bg-neutral-950">
        <div className="text-sm text-neutral-400">Home</div>
      </div>

      {/* Table */}
      <div className="px-6 py-4">
        <div className="rounded-lg border border-neutral-800 bg-neutral-950">
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-800 hover:bg-neutral-900">
                <TableHead className="text-neutral-400">
                  Name
                  <ChevronDownIcon className="inline h-4 w-4 ml-1" />
                </TableHead>
                <TableHead className="text-neutral-400">Status</TableHead>
                <TableHead className="text-neutral-400">Total Enrolled</TableHead>
                <TableHead className="text-neutral-400">Active Enrolled</TableHead>
                <TableHead className="text-neutral-400">
                  Last Updated
                  <ChevronDownIcon className="inline h-4 w-4 ml-1" />
                </TableHead>
                <TableHead className="text-neutral-400">
                  Created On
                  <ChevronDownIcon className="inline h-4 w-4 ml-1" />
                </TableHead>
                <TableHead className="text-neutral-400">
                  Stats
                  <InfoIcon className="inline h-4 w-4 ml-1" />
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workflows.map((workflow) => (
                <TableRow key={workflow.id} className="border-neutral-800 hover:bg-neutral-900">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {workflow.type === "folder" ? (
                        <FolderIcon className="h-4 w-4 text-orange-500" />
                      ) : (
                        <ExternalLinkIcon className="h-4 w-4 text-neutral-500" />
                      )}
                      <span className="text-neutral-100">{workflow.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {workflow.status && (
                      <Badge
                        className={
                          workflow.status === "Published"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-neutral-700/50 text-neutral-400 border-neutral-700"
                        }
                      >
                        {workflow.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-neutral-300">
                    {workflow.totalEnrolled !== null ? workflow.totalEnrolled : "-"}
                  </TableCell>
                  <TableCell className="text-neutral-300">
                    {workflow.activeEnrolled !== null ? workflow.activeEnrolled : "-"}
                  </TableCell>
                  <TableCell className="text-neutral-400 text-sm">{workflow.lastUpdated}</TableCell>
                  <TableCell className="text-neutral-400 text-sm">{workflow.createdOn}</TableCell>
                  <TableCell>
                    {workflow.type === "workflow" && (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:bg-neutral-800">
                        <ChevronRightIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:bg-neutral-800">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-neutral-900 border-neutral-800">
                        <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-800">Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-800">Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-800">Export</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 hover:bg-neutral-800">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-neutral-700 text-neutral-400 hover:bg-neutral-900 bg-transparent"
              disabled
            >
              Previous
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">1</Button>
            <Button
              variant="outline"
              className="border-neutral-700 text-neutral-400 hover:bg-neutral-900 bg-transparent"
            >
              Next
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-neutral-700 text-neutral-400 hover:bg-neutral-900 bg-transparent"
              >
                10 / page
                <ChevronDownIcon className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neutral-900 border-neutral-800">
              <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-800">10 / page</DropdownMenuItem>
              <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-800">25 / page</DropdownMenuItem>
              <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-800">50 / page</DropdownMenuItem>
              <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-800">100 / page</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
