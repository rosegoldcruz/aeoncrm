"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  PhoneIcon,
  ClockIcon,
  RefreshCwIcon,
  VoicemailIcon,
  CalendarIcon,
  SearchIcon,
  PlusIcon,
  FolderIcon,
  UploadIcon,
  LayoutGridIcon,
  ListIcon,
  MoreVerticalIcon,
  BellIcon,
  SettingsIcon,
  CheckCircle2Icon,
  TrendingUpIcon,
  ActivityIcon,
  TargetIcon,
  ZapIcon,
  ArrowRightIcon,
  DiamondIcon,
  SquareIcon,
} from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AutomationTriggersPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [builderModalOpen, setBuilderModalOpen] = useState(false)

  const triggers = [
    {
      id: 1,
      icon: PhoneIcon,
      iconColor: "text-green-500",
      iconBg: "bg-green-500/10",
      title: "Call Connected - Send SMS",
      description: "When call connects, send follow-up SMS",
      status: true,
      stats: "245 triggers fired today",
      nextRun: null,
      lastRun: null,
    },
    {
      id: 2,
      icon: ClockIcon,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10",
      title: "Daily Lead Assignment",
      description: "Assign new leads to agents every morning at 9 AM",
      status: true,
      stats: null,
      nextRun: "Tomorrow 9:00 AM",
      lastRun: null,
    },
    {
      id: 3,
      icon: RefreshCwIcon,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-500/10",
      title: "Lead Status Update - Notify Manager",
      description: "When lead marked as 'Hot', notify sales manager",
      status: true,
      stats: "12 triggers today",
      nextRun: null,
      lastRun: null,
    },
    {
      id: 4,
      icon: VoicemailIcon,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-500/10",
      title: "Voicemail Detected - Drop Message & Tag",
      description: "Auto-drop voicemail and tag lead",
      status: true,
      stats: "89 triggers today",
      nextRun: null,
      lastRun: null,
    },
    {
      id: 5,
      icon: CalendarIcon,
      iconColor: "text-cyan-500",
      iconBg: "bg-cyan-500/10",
      title: "Schedule Callback - Create Task",
      description: "When callback requested, create agent task",
      status: true,
      stats: "34 triggers today",
      nextRun: null,
      lastRun: null,
    },
    {
      id: 6,
      icon: TargetIcon,
      iconColor: "text-red-500",
      iconBg: "bg-red-500/10",
      title: "Campaign Complete - Move to Next",
      description: "Auto-move completed leads to nurture campaign",
      status: false,
      stats: null,
      nextRun: null,
      lastRun: "2 days ago",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-950">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-semibold">Automation</h1>
            <div className="flex gap-1">
              <Link href="/automation">
                <Button
                  variant="ghost"
                  className="rounded-none px-4 py-2 text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
                >
                  Workflows
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="border-b-2 border-orange-500 rounded-none px-4 py-2 text-orange-500 hover:bg-neutral-900"
              >
                Triggers
              </Button>
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

      {/* Stats Dashboard */}
      <div className="border-b border-neutral-800 bg-neutral-950 px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-400">Total Triggers</span>
              <ActivityIcon className="h-4 w-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-neutral-100">247</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-400">Active Triggers</span>
              <ZapIcon className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-neutral-100">12</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-400">Triggers Fired Today</span>
              <TrendingUpIcon className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-neutral-100">523</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-400">Success Rate</span>
              <CheckCircle2Icon className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-500">98.2%</div>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="border-b border-neutral-800 bg-neutral-950 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Trigger List</h2>
          <div className="flex gap-2">
            <Button variant="outline" className="border-neutral-700 hover:bg-neutral-900 bg-transparent">
              <FolderIcon className="h-4 w-4 mr-2" />
              Create Folder
            </Button>
            <Button variant="outline" className="border-neutral-700 hover:bg-neutral-900 bg-transparent">
              <UploadIcon className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Trigger
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100 max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Create New Trigger</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Trigger Name */}
                  <div className="space-y-2">
                    <Label htmlFor="trigger-name">Trigger Name</Label>
                    <Input
                      id="trigger-name"
                      placeholder="Enter trigger name"
                      className="bg-neutral-950 border-neutral-800"
                    />
                  </div>

                  {/* Trigger Type */}
                  <div className="space-y-2">
                    <Label htmlFor="trigger-type">Trigger Type</Label>
                    <Select>
                      <SelectTrigger className="bg-neutral-950 border-neutral-800">
                        <SelectValue placeholder="Select trigger type" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-900 border-neutral-800">
                        <SelectItem value="call-outcome">Call Outcome</SelectItem>
                        <SelectItem value="time-based">Time-Based</SelectItem>
                        <SelectItem value="status-change">Status Change</SelectItem>
                        <SelectItem value="campaign-event">Campaign Event</SelectItem>
                        <SelectItem value="lead-activity">Lead Activity</SelectItem>
                        <SelectItem value="agent-action">Agent Action</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Condition Builder */}
                  <div className="space-y-2">
                    <Label>Conditions</Label>
                    <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-orange-500">IF</span>
                        <Select>
                          <SelectTrigger className="bg-neutral-900 border-neutral-800 flex-1">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-900 border-neutral-800">
                            <SelectItem value="call-connected">Call Connected</SelectItem>
                            <SelectItem value="call-failed">Call Failed</SelectItem>
                            <SelectItem value="voicemail-detected">Voicemail Detected</SelectItem>
                            <SelectItem value="status-changed">Status Changed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="and">
                          <SelectTrigger className="bg-neutral-900 border-neutral-800 w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-900 border-neutral-800">
                            <SelectItem value="and">AND</SelectItem>
                            <SelectItem value="or">OR</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger className="bg-neutral-900 border-neutral-800 flex-1">
                            <SelectValue placeholder="Add another condition" />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-900 border-neutral-800">
                            <SelectItem value="lead-status">Lead Status</SelectItem>
                            <SelectItem value="campaign">Campaign</SelectItem>
                            <SelectItem value="time-of-day">Time of Day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-neutral-700 hover:bg-neutral-800 bg-transparent"
                      >
                        <PlusIcon className="h-3 w-3 mr-1" />
                        Add Condition
                      </Button>
                    </div>
                  </div>

                  {/* Action Builder */}
                  <div className="space-y-2">
                    <Label>Actions</Label>
                    <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-orange-500">THEN</span>
                        <Select>
                          <SelectTrigger className="bg-neutral-900 border-neutral-800 flex-1">
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-900 border-neutral-800">
                            <SelectItem value="send-sms">Send SMS</SelectItem>
                            <SelectItem value="send-email">Send Email</SelectItem>
                            <SelectItem value="update-status">Update Status</SelectItem>
                            <SelectItem value="assign-task">Assign Task</SelectItem>
                            <SelectItem value="move-campaign">Move Campaign</SelectItem>
                            <SelectItem value="tag-lead">Tag Lead</SelectItem>
                            <SelectItem value="notify-user">Notify User</SelectItem>
                            <SelectItem value="create-appointment">Create Appointment</SelectItem>
                            <SelectItem value="update-field">Update Custom Field</SelectItem>
                            <SelectItem value="webhook">Webhook</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-neutral-700 hover:bg-neutral-800 bg-transparent"
                      >
                        <PlusIcon className="h-3 w-3 mr-1" />
                        Add Action
                      </Button>
                    </div>
                  </div>

                  {/* Schedule Section */}
                  <div className="space-y-2">
                    <Label>Schedule (Optional)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="delay" className="text-sm text-neutral-400">
                          Delay Action
                        </Label>
                        <Input id="delay" placeholder="e.g., 5 minutes" className="bg-neutral-950 border-neutral-800" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="repeat" className="text-sm text-neutral-400">
                          Repeat Settings
                        </Label>
                        <Select>
                          <SelectTrigger className="bg-neutral-950 border-neutral-800">
                            <SelectValue placeholder="No repeat" />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-950 border-neutral-800">
                            <SelectItem value="none">No repeat</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Advanced Options */}
                  <div className="space-y-2">
                    <Label>Advanced Options</Label>
                    <Textarea
                      placeholder="Stop conditions (optional)"
                      className="bg-neutral-950 border-neutral-800 min-h-[80px]"
                    />
                  </div>

                  {/* Visual Builder Link */}
                  <div className="border-t border-neutral-800 pt-4">
                    <Button
                      variant="outline"
                      className="w-full border-orange-500/50 text-orange-500 hover:bg-orange-500/10 bg-transparent"
                      onClick={() => {
                        setCreateModalOpen(false)
                        setBuilderModalOpen(true)
                      }}
                    >
                      <DiamondIcon className="h-4 w-4 mr-2" />
                      Open Visual Trigger Builder
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 border-neutral-700 hover:bg-neutral-800 bg-transparent"
                      onClick={() => setCreateModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="outline" className="flex-1 border-neutral-700 hover:bg-neutral-800 bg-transparent">
                      Save
                    </Button>
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600">Save & Activate</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Visual Trigger Builder Modal */}
            <Dialog open={builderModalOpen} onOpenChange={setBuilderModalOpen}>
              <DialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100 max-w-6xl max-h-[90vh]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Visual Trigger Builder</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  {/* Builder Canvas */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-8 min-h-[500px] relative">
                    {/* Start Node */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2">
                      <div className="bg-green-500/10 border-2 border-green-500 rounded-full p-4 flex items-center justify-center">
                        <ZapIcon className="h-6 w-6 text-green-500" />
                      </div>
                      <div className="text-center mt-2 text-sm font-medium text-green-500">START</div>
                    </div>

                    {/* Arrow */}
                    <div className="absolute top-24 left-1/2 -translate-x-1/2">
                      <ArrowRightIcon className="h-6 w-6 text-neutral-600 rotate-90" />
                    </div>

                    {/* Condition Node (Diamond) */}
                    <div className="absolute top-36 left-1/2 -translate-x-1/2">
                      <div className="relative">
                        <div className="bg-orange-500/10 border-2 border-orange-500 w-32 h-32 rotate-45 flex items-center justify-center">
                          <DiamondIcon className="h-8 w-8 text-orange-500 -rotate-45" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                          <div className="text-xs font-medium text-orange-500 whitespace-nowrap">Call Connected?</div>
                        </div>
                      </div>
                    </div>

                    {/* Yes Branch */}
                    <div className="absolute top-52 left-1/4">
                      <div className="text-xs text-green-500 font-medium mb-2">YES</div>
                      <ArrowRightIcon className="h-6 w-6 text-neutral-600 rotate-90" />
                      <div className="mt-4 bg-blue-500/10 border-2 border-blue-500 rounded-lg p-4 w-40">
                        <SquareIcon className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                        <div className="text-xs text-center font-medium text-blue-500">Send SMS</div>
                      </div>
                    </div>

                    {/* No Branch */}
                    <div className="absolute top-52 right-1/4">
                      <div className="text-xs text-red-500 font-medium mb-2">NO</div>
                      <ArrowRightIcon className="h-6 w-6 text-neutral-600 rotate-90" />
                      <div className="mt-4 bg-purple-500/10 border-2 border-purple-500 rounded-lg p-4 w-40">
                        <SquareIcon className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                        <div className="text-xs text-center font-medium text-purple-500">Tag Lead</div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="absolute bottom-4 left-4 text-xs text-neutral-500">
                      Drag and drop nodes to build your trigger workflow
                    </div>
                  </div>

                  {/* Node Palette */}
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="border-orange-500/50 text-orange-500 bg-transparent">
                      <DiamondIcon className="h-4 w-4 mr-2" />
                      Add Condition
                    </Button>
                    <Button variant="outline" size="sm" className="border-blue-500/50 text-blue-500 bg-transparent">
                      <SquareIcon className="h-4 w-4 mr-2" />
                      Add Action
                    </Button>
                    <Button variant="outline" size="sm" className="border-neutral-700 bg-transparent">
                      <ArrowRightIcon className="h-4 w-4 mr-2" />
                      Add Branch
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-6">
                    <Button
                      variant="outline"
                      className="flex-1 border-neutral-700 hover:bg-neutral-800 bg-transparent"
                      onClick={() => setBuilderModalOpen(false)}
                    >
                      Close
                    </Button>
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600">Save Trigger</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
              All Triggers
              <Badge className="ml-2 bg-neutral-800 text-neutral-300">5</Badge>
            </Button>
            <Button
              variant="ghost"
              className="rounded-none text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
            >
              Active
              <Badge className="ml-2 bg-neutral-800 text-neutral-300">5</Badge>
            </Button>
            <Button
              variant="ghost"
              className="rounded-none text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
            >
              Inactive
              <Badge className="ml-2 bg-neutral-800 text-neutral-300">0</Badge>
            </Button>
            <Button
              variant="ghost"
              className="rounded-none text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
            >
              Scheduled
              <Badge className="ml-2 bg-neutral-800 text-neutral-300">1</Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Search and View Toggle */}
      <div className="border-b border-neutral-800 bg-neutral-950 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input
              placeholder="Search triggers"
              className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-300 placeholder:text-neutral-500 w-80"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-orange-500 hover:bg-neutral-900">
              <LayoutGridIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:bg-neutral-900">
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Triggers Grid */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {triggers.map((trigger) => (
            <div
              key={trigger.id}
              className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-orange-500/50 transition-colors"
            >
              {/* Icon and Status */}
              <div className="flex items-start justify-between mb-4">
                <div className={`${trigger.iconBg} p-3 rounded-lg`}>
                  <trigger.icon className={`h-6 w-6 ${trigger.iconColor}`} />
                </div>
                <Switch checked={trigger.status} className="data-[state=checked]:bg-orange-500" />
              </div>

              {/* Title and Description */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-neutral-100 mb-2">{trigger.title}</h3>
                <p className="text-sm text-neutral-400">{trigger.description}</p>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <Badge
                  className={
                    trigger.status
                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                      : "bg-neutral-700/50 text-neutral-400 border-neutral-700"
                  }
                >
                  <CheckCircle2Icon className="h-3 w-3 mr-1" />
                  {trigger.status ? "Active" : "Inactive"}
                </Badge>
              </div>

              {/* Stats or Next Run */}
              {trigger.stats && (
                <div className="text-sm text-neutral-400 mb-4">
                  <span className="font-medium text-orange-500">{trigger.stats.split(" ")[0]}</span>{" "}
                  {trigger.stats.split(" ").slice(1).join(" ")}
                </div>
              )}
              {trigger.nextRun && (
                <div className="text-sm text-neutral-400 mb-4">
                  <span className="text-neutral-500">Next run:</span>{" "}
                  <span className="font-medium text-orange-500">{trigger.nextRun}</span>
                </div>
              )}
              {trigger.lastRun && (
                <div className="text-sm text-neutral-400 mb-4">
                  <span className="text-neutral-500">Last run:</span>{" "}
                  <span className="font-medium text-neutral-500">{trigger.lastRun}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <Button variant="ghost" size="sm" className="text-orange-500 hover:bg-neutral-800">
                  Edit
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:bg-neutral-800">
                      <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-neutral-900 border-neutral-800">
                    <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-800">Duplicate</DropdownMenuItem>
                    <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-800">View Logs</DropdownMenuItem>
                    <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-800">Export</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 hover:bg-neutral-800">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
