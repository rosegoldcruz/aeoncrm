"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Pause,
  Play,
  UserPlus,
  StickyNote,
  Clock,
  ChevronDown,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Building2,
  Mail,
  MapPin,
  DollarSign,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Users,
  Coffee,
  HelpCircle,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Calendar,
  FileText,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AgentWorkspacePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [shiftDuration, setShiftDuration] = useState(14523) // seconds
  const [callDuration, setCallDuration] = useState(0)
  const [agentStatus, setAgentStatus] = useState<"Available" | "On Call" | "Break" | "Offline">("On Call")
  const [isMuted, setIsMuted] = useState(false)
  const [isOnHold, setIsOnHold] = useState(false)
  const [isOnCall, setIsOnCall] = useState(true)
  const [sentiment, setSentiment] = useState<"positive" | "neutral" | "negative">("positive")
  const [noteText, setNoteText] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  // Update timers
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setShiftDuration((prev) => prev + 1)
      if (isOnCall && !isOnHold) {
        setCallDuration((prev) => prev + 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [isOnCall, isOnHold])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500"
      case "On Call":
        return "bg-orange-500"
      case "Break":
        return "bg-yellow-500"
      case "Offline":
        return "bg-neutral-500"
      default:
        return "bg-neutral-500"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-500"
      case "neutral":
        return "text-yellow-500"
      case "negative":
        return "text-red-500"
      default:
        return "text-neutral-500"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return TrendingUp
      case "neutral":
        return Minus
      case "negative":
        return TrendingDown
      default:
        return Minus
    }
  }

  const transcript = [
    { speaker: "Agent", text: "Hi Sarah, this is Alex from AEON Solutions. How are you today?", time: "00:15" },
    { speaker: "Contact", text: "I'm doing well, thanks. What can I help you with?", time: "00:22" },
    {
      speaker: "Agent",
      text: "I wanted to follow up on the proposal we sent last week regarding our enterprise solution.",
      time: "00:28",
    },
    {
      speaker: "Contact",
      text: "Yes, I've been reviewing it. The pricing seems a bit high for our budget.",
      time: "00:35",
    },
    {
      speaker: "Agent",
      text: "I understand your concern. Let me show you our flexible payment options that might work better.",
      time: "00:42",
    },
  ]

  const aiSuggestions = [
    {
      type: "reminder",
      text: "Mention the ROI calculator sent on Oct 15",
      icon: FileText,
    },
    {
      type: "objection",
      text: "Price objection detected - suggest payment plan",
      icon: AlertCircle,
    },
    {
      type: "action",
      text: "Schedule demo for next week",
      icon: Calendar,
    },
  ]

  const recentCalls = [
    {
      time: "2:45 PM",
      contact: "John Smith",
      company: "Tech Corp",
      duration: "8:32",
      outcome: "Scheduled Demo",
      type: "outbound",
    },
    {
      time: "2:15 PM",
      contact: "Emily Davis",
      company: "StartupXYZ",
      duration: "12:15",
      outcome: "Follow-up Needed",
      type: "inbound",
    },
    {
      time: "1:50 PM",
      contact: "Michael Brown",
      company: "Enterprise Inc",
      duration: "6:20",
      outcome: "Not Interested",
      type: "outbound",
    },
    {
      time: "1:20 PM",
      contact: "Lisa Anderson",
      company: "Global Solutions",
      duration: "15:45",
      outcome: "Deal Closed",
      type: "outbound",
    },
  ]

  const pendingTasks = [
    { text: "Follow up with John Smith", due: "3:00 PM", priority: "high" },
    { text: "Send proposal to Emily Davis", due: "EOD", priority: "medium" },
    { text: "Schedule callback with Michael Brown", due: "Tomorrow", priority: "low" },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-xl font-bold text-white">Agent Alex Martinez</h1>
              <p className="text-sm text-neutral-400">ID: AGT-2847</p>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(agentStatus)} animate-pulse`}></div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                  >
                    {agentStatus}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-800 border-neutral-700">
                  <DropdownMenuItem
                    onClick={() => setAgentStatus("Available")}
                    className="text-white hover:bg-neutral-700"
                  >
                    Available
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setAgentStatus("On Call")}
                    className="text-white hover:bg-neutral-700"
                  >
                    On Call
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAgentStatus("Break")} className="text-white hover:bg-neutral-700">
                    Break
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setAgentStatus("Offline")}
                    className="text-white hover:bg-neutral-700"
                  >
                    Offline
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2 text-neutral-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Shift: {formatTime(shiftDuration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">24</div>
              <div className="text-xs text-neutral-400">Calls Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">2h 15m</div>
              <div className="text-xs text-neutral-400">Talk Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">3</div>
              <div className="text-xs text-neutral-400">Conversions</div>
            </div>
            <div className="text-lg font-mono text-orange-500">
              {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL - 60% */}
        <div className="w-[60%] border-r border-neutral-800 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Active Call Card */}
            {isOnCall && (
              <Card className="bg-neutral-900 border-orange-500/50 border-2 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <PhoneCall className="w-8 h-8 text-orange-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Sarah Johnson</h2>
                      <p className="text-neutral-400">Tech Innovations Inc</p>
                      <p className="text-sm text-neutral-500">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-mono font-bold text-orange-500">{formatTime(callDuration)}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <PhoneOutgoing className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-neutral-400">Outbound</span>
                    </div>
                  </div>
                </div>

                {/* CRM Data Panel */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-orange-500" />
                      <span className="text-xs text-neutral-400">Email</span>
                    </div>
                    <p className="text-sm text-white">sarah.j@techinnovations.com</p>
                  </div>
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-orange-500" />
                      <span className="text-xs text-neutral-400">Company Size</span>
                    </div>
                    <p className="text-sm text-white">50-200 employees</p>
                  </div>
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-orange-500" />
                      <span className="text-xs text-neutral-400">Deal Stage</span>
                    </div>
                    <p className="text-sm text-white">Negotiation</p>
                  </div>
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span className="text-xs text-neutral-400">Location</span>
                    </div>
                    <p className="text-sm text-white">San Francisco, CA</p>
                  </div>
                </div>

                {/* Previous Interactions */}
                <div className="bg-neutral-800 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-semibold text-white mb-3">Previous Interactions</h3>
                  <div className="space-y-2">
                    <div className="text-xs text-neutral-400">
                      <span className="text-orange-500">Oct 15:</span> Sent proposal via email
                    </div>
                    <div className="text-xs text-neutral-400">
                      <span className="text-orange-500">Oct 10:</span> Demo call - 45 minutes
                    </div>
                    <div className="text-xs text-neutral-400">
                      <span className="text-orange-500">Oct 5:</span> Initial discovery call
                    </div>
                  </div>
                </div>

                {/* Fox AI Co-Pilot Section */}
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                    <h3 className="text-lg font-semibold text-white">Fox AI Co-Pilot</h3>
                    <div className="ml-auto flex items-center gap-2">
                      {(() => {
                        const SentimentIcon = getSentimentIcon(sentiment)
                        return <SentimentIcon className={`w-5 h-5 ${getSentimentColor(sentiment)}`} />
                      })()}
                      <span className={`text-sm font-semibold ${getSentimentColor(sentiment)} capitalize`}>
                        {sentiment}
                      </span>
                    </div>
                  </div>

                  {/* Live Transcript */}
                  <div className="bg-black/50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
                    <div className="space-y-3">
                      {transcript.map((entry, index) => (
                        <div key={index} className="flex gap-3">
                          <span className="text-xs text-neutral-500 w-12 flex-shrink-0">{entry.time}</span>
                          <div className="flex-1">
                            <span
                              className={`text-xs font-semibold ${entry.speaker === "Agent" ? "text-orange-500" : "text-blue-400"}`}
                            >
                              {entry.speaker}:
                            </span>
                            <span className="text-sm text-white ml-2">{entry.text}</span>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 text-orange-500 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span className="text-xs">Listening...</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Suggestions */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-neutral-400 mb-2">AI Suggestions</h4>
                    {aiSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 flex items-start gap-3 hover:bg-orange-500/20 transition-colors cursor-pointer"
                      >
                        <suggestion.icon className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-white">{suggestion.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Next Best Action */}
                  <div className="mt-4 bg-orange-500/20 border border-orange-500/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-semibold text-orange-500">Next Best Action</span>
                    </div>
                    <p className="text-sm text-white">Offer 3-month payment plan to address budget concerns</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Call Controls - Fixed at bottom */}
          {isOnCall && (
            <div className="bg-neutral-900 border-t border-neutral-800 p-6">
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  variant={isMuted ? "default" : "outline"}
                  className={
                    isMuted
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "border-neutral-700 text-white hover:bg-neutral-800"
                  }
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>

                <Button
                  size="lg"
                  variant={isOnHold ? "default" : "outline"}
                  className={
                    isOnHold
                      ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                      : "border-neutral-700 text-white hover:bg-neutral-800"
                  }
                  onClick={() => setIsOnHold(!isOnHold)}
                >
                  {isOnHold ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-neutral-700 text-white hover:bg-neutral-800 bg-transparent"
                >
                  <UserPlus className="w-5 h-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-neutral-700 text-white hover:bg-neutral-800 bg-transparent"
                >
                  <StickyNote className="w-5 h-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-neutral-700 text-white hover:bg-neutral-800 bg-transparent"
                >
                  <Volume2 className="w-5 h-5" />
                </Button>

                <Button
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 text-white px-8"
                  onClick={() => setIsOnCall(false)}
                >
                  <PhoneOff className="w-5 h-5 mr-2" />
                  End Call
                </Button>

                <Select>
                  <SelectTrigger className="w-48 bg-neutral-800 border-neutral-700 text-white">
                    <SelectValue placeholder="Disposition" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-700">
                    <SelectItem value="interested" className="text-white">
                      Interested
                    </SelectItem>
                    <SelectItem value="callback" className="text-white">
                      Callback
                    </SelectItem>
                    <SelectItem value="not-interested" className="text-white">
                      Not Interested
                    </SelectItem>
                    <SelectItem value="voicemail" className="text-white">
                      Voicemail
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL - 40% */}
        <div className="w-[40%] flex flex-col bg-neutral-950">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Queue Status */}
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                Queue Status
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-neutral-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-orange-500">8</div>
                  <div className="text-xs text-neutral-400 mt-1">Waiting Calls</div>
                </div>
                <div className="bg-neutral-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-orange-500">2:45</div>
                  <div className="text-xs text-neutral-400 mt-1">Avg Wait Time</div>
                </div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <div className="text-xs text-neutral-400 mb-1">Next Call Preview</div>
                <div className="text-sm font-semibold text-white">Michael Chen</div>
                <div className="text-xs text-neutral-400">Global Tech Solutions</div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Start Outbound Campaign
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-neutral-700 text-white hover:bg-neutral-800 bg-transparent"
                  onClick={() => setAgentStatus("Break")}
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Take Break
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-neutral-700 text-white hover:bg-neutral-800 bg-transparent"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Request Supervisor
                </Button>
              </div>
            </Card>

            {/* Today's Activity Feed */}
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Today's Activity</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {recentCalls.map((call, index) => (
                  <div
                    key={index}
                    className="bg-neutral-800 rounded-lg p-3 hover:bg-neutral-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {call.type === "inbound" ? (
                          <PhoneIncoming className="w-4 h-4 text-green-500" />
                        ) : (
                          <PhoneOutgoing className="w-4 h-4 text-blue-500" />
                        )}
                        <span className="text-sm font-semibold text-white">{call.contact}</span>
                      </div>
                      <span className="text-xs text-neutral-400">{call.time}</span>
                    </div>
                    <div className="text-xs text-neutral-400 mb-1">{call.company}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-500">Duration: {call.duration}</span>
                      <span className="text-xs text-orange-500 font-semibold">{call.outcome}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Notes & Tasks */}
            <Card className="bg-neutral-900 border-neutral-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Notes & Tasks</h3>
              <Textarea
                placeholder="Quick note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="bg-neutral-800 border-neutral-700 text-white mb-4 min-h-24"
              />
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mb-4">
                <StickyNote className="w-4 h-4 mr-2" />
                Save Note
              </Button>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-neutral-400">Pending Follow-ups</h4>
                {pendingTasks.map((task, index) => (
                  <div key={index} className="bg-neutral-800 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-white">{task.text}</p>
                      <span
                        className={`text-xs font-semibold ${
                          task.priority === "high"
                            ? "text-red-500"
                            : task.priority === "medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      >
                        {task.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">Due: {task.due}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 border-t border-neutral-800 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="text-sm text-white">Fox Intelligence</span>
            <span className="text-xs text-green-500 font-semibold">Active</span>
          </div>
          <div className="h-4 w-px bg-neutral-700"></div>
          <span className="text-xs text-neutral-400">Real-time AI assistance enabled</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
            <MessageSquare className="w-4 h-4 mr-2" />
            System Notifications
          </Button>
          <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help & Support
          </Button>
        </div>
      </div>
    </div>
  )
}
