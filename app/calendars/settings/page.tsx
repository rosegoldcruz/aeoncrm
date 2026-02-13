"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Clock,
  Bell,
  Link2,
  Globe,
  Shield,
  Calendar,
  Video,
  Mail,
  MessageSquare,
  Upload,
  Download,
  Copy,
  QrCode,
  Check,
  X,
  RefreshCw,
  Save,
  RotateCcw,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CalendarSettingsPage() {
  const { toast } = useToast()
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  // General Settings State
  const [timezone, setTimezone] = useState("(GMT-7:00) Phoenix, Arizona")
  const [workingDays, setWorkingDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  })
  const [startTime, setStartTime] = useState("9:00 AM")
  const [endTime, setEndTime] = useState("5:00 PM")
  const [defaultDuration, setDefaultDuration] = useState("30 min")
  const [bufferTime, setBufferTime] = useState("10 min")
  const [defaultType, setDefaultType] = useState("Phone Call")
  const [autoConfirm, setAutoConfirm] = useState(true)
  const [allowDoubleBooking, setAllowDoubleBooking] = useState(false)
  const [minAdvanceNotice, setMinAdvanceNotice] = useState("2")
  const [maxAdvanceBooking, setMaxAdvanceBooking] = useState("60")
  const [cancellationDeadline, setCancellationDeadline] = useState("24")
  const [defaultView, setDefaultView] = useState("calendar")
  const [weekStartsOn, setWeekStartsOn] = useState("Monday")
  const [timeFormat, setTimeFormat] = useState("12-hour")
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY")

  // Notifications State
  const [notifications, setNotifications] = useState({
    newAppointment: { enabled: true, methods: ["email", "inapp"] },
    rescheduled: { enabled: true, methods: ["email", "inapp"] },
    cancelled: { enabled: true, methods: ["email", "inapp"] },
    startingSoon: { enabled: true, methods: ["inapp", "browser"] },
    noShow: { enabled: true, methods: ["email", "inapp"] },
    dailySummary: { enabled: true, methods: ["email"], time: "8:00 AM" },
  })

  const [customerReminders, setCustomerReminders] = useState({
    confirmation: true,
    reminder24h: true,
    reminder1h: true,
    noShowFollowup: true,
    thankYou: true,
  })

  // Integrations State
  const [googleCalendar, setGoogleCalendar] = useState({ connected: true, email: "user@example.com", sync: "two-way" })
  const [outlookCalendar, setOutlookCalendar] = useState({ connected: false })
  const [zoomIntegration, setZoomIntegration] = useState({ connected: true, email: "user@zoom.us", autoCreate: true })
  const [webhookUrl, setWebhookUrl] = useState("")
  const [webhookEvents, setWebhookEvents] = useState({
    created: true,
    updated: true,
    cancelled: true,
    completed: true,
    noShow: true,
  })

  // Booking Page State
  const [publicBookingEnabled, setPublicBookingEnabled] = useState(true)
  const [bookingPageTitle, setBookingPageTitle] = useState("Schedule a Call with Your Name")
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome! Please select a time that works best for you.")
  const [requiredFields, setRequiredFields] = useState({
    name: true,
    email: true,
    phone: true,
    company: false,
    jobTitle: false,
  })

  // Advanced Settings State
  const [roundRobin, setRoundRobin] = useState(false)
  const [agentSelection, setAgentSelection] = useState("Random")
  const [noShowTimeout, setNoShowTimeout] = useState("15")
  const [autoReschedule, setAutoReschedule] = useState(false)
  const [maxReschedules, setMaxReschedules] = useState("3")
  const [gdprMode, setGdprMode] = useState(true)
  const [dataRetention, setDataRetention] = useState("2")
  const [apiAccess, setApiAccess] = useState(true)

  const handleSave = () => {
    toast({
      title: "Settings saved successfully",
      description: "Your calendar settings have been updated.",
    })
    setHasUnsavedChanges(false)
  }

  const handleReset = () => {
    toast({
      title: "Settings reset",
      description: "All settings have been reset to defaults.",
      variant: "destructive",
    })
    setHasUnsavedChanges(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a0a0a] border-b border-white/10 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-orange-500" />
              <h1 className="text-3xl font-bold text-orange-500">Calendar Settings</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleReset}
                className="border-white/20 hover:bg-white/5 bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
          <p className="text-base text-gray-300">Configure appointment scheduling and calendar integrations</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#1a1a1a] border border-white/10">
            <TabsTrigger value="general" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Clock className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <Link2 className="h-4 w-4 mr-2" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="booking" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Globe className="h-4 w-4 mr-2" />
              Booking Page
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Shield className="h-4 w-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: GENERAL SETTINGS */}
          <TabsContent value="general" className="space-y-6">
            {/* Business Hours */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Business Hours</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Set your working schedule and timezone
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger className="bg-[#0a0a0a] border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="(GMT-7:00) Phoenix, Arizona">(GMT-7:00) Phoenix, Arizona</SelectItem>
                      <SelectItem value="(GMT-8:00) Pacific Time">(GMT-8:00) Pacific Time</SelectItem>
                      <SelectItem value="(GMT-5:00) Eastern Time">(GMT-5:00) Eastern Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm text-gray-200">Working Days</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(workingDays).map(([day, checked]) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={day}
                          checked={checked}
                          onCheckedChange={(value) => setWorkingDays({ ...workingDays, [day]: value as boolean })}
                        />
                        <Label htmlFor={day} className="capitalize cursor-pointer text-sm text-gray-200">
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-200">Start Time</Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger className="bg-[#0a0a0a] border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                        <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-200">End Time</Label>
                    <Select value={endTime} onValueChange={setEndTime}>
                      <SelectTrigger className="bg-[#0a0a0a] border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                        <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                        <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointment Defaults */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Appointment Defaults</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Configure default appointment settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-200">Default Duration</Label>
                    <Select value={defaultDuration} onValueChange={setDefaultDuration}>
                      <SelectTrigger className="bg-[#0a0a0a] border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15 min">15 minutes</SelectItem>
                        <SelectItem value="30 min">30 minutes</SelectItem>
                        <SelectItem value="45 min">45 minutes</SelectItem>
                        <SelectItem value="1 hour">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-200">Buffer Time</Label>
                    <Select value={bufferTime} onValueChange={setBufferTime}>
                      <SelectTrigger className="bg-[#0a0a0a] border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="5 min">5 minutes</SelectItem>
                        <SelectItem value="10 min">10 minutes</SelectItem>
                        <SelectItem value="15 min">15 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Default Appointment Type</Label>
                  <Select value={defaultType} onValueChange={setDefaultType}>
                    <SelectTrigger className="bg-[#0a0a0a] border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Phone Call">Phone Call</SelectItem>
                      <SelectItem value="Video Call">Video Call</SelectItem>
                      <SelectItem value="In-Person">In-Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                  <div className="space-y-1">
                    <Label className="text-sm text-gray-200">Auto-confirm Appointments</Label>
                    <p className="text-sm text-gray-300">Automatically confirm appointments when created</p>
                  </div>
                  <Switch checked={autoConfirm} onCheckedChange={setAutoConfirm} />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                  <div className="space-y-1">
                    <Label className="text-sm text-gray-200">Allow Double-booking</Label>
                    <p className="text-sm text-orange-400">⚠️ Not recommended for agent calendars</p>
                  </div>
                  <Switch checked={allowDoubleBooking} onCheckedChange={setAllowDoubleBooking} />
                </div>
              </CardContent>
            </Card>

            {/* Scheduling Rules */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Scheduling Rules</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Set booking constraints and policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Minimum Advance Notice</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={minAdvanceNotice}
                      onChange={(e) => setMinAdvanceNotice(e.target.value)}
                      className="bg-[#0a0a0a] border-white/20 w-24"
                    />
                    <Select defaultValue="hours">
                      <SelectTrigger className="bg-[#0a0a0a] border-white/20 w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">hours</SelectItem>
                        <SelectItem value="days">days</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-300">notice required</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Maximum Advance Booking</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">Allow bookings up to</span>
                    <Input
                      type="number"
                      value={maxAdvanceBooking}
                      onChange={(e) => setMaxAdvanceBooking(e.target.value)}
                      className="bg-[#0a0a0a] border-white/20 w-24"
                    />
                    <Select defaultValue="days">
                      <SelectTrigger className="bg-[#0a0a0a] border-white/20 w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">days</SelectItem>
                        <SelectItem value="weeks">weeks</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-300">in advance</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Cancellation Deadline</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">Allow cancellations up to</span>
                    <Input
                      type="number"
                      value={cancellationDeadline}
                      onChange={(e) => setCancellationDeadline(e.target.value)}
                      className="bg-[#0a0a0a] border-white/20 w-24"
                    />
                    <Select defaultValue="hours">
                      <SelectTrigger className="bg-[#0a0a0a] border-white/20 w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">hours</SelectItem>
                        <SelectItem value="days">days</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-300">before appointment</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendar View Preferences */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Calendar View Preferences</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Customize how you view your calendar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Default View</Label>
                  <div className="flex gap-4">
                    {["list", "calendar", "timeline"].map((view) => (
                      <Button
                        key={view}
                        variant={defaultView === view ? "default" : "outline"}
                        onClick={() => setDefaultView(view)}
                        className={
                          defaultView === view
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "border-white/20 hover:bg-white/5"
                        }
                      >
                        {view.charAt(0).toUpperCase() + view.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-200">Week Starts On</Label>
                    <Select value={weekStartsOn} onValueChange={setWeekStartsOn}>
                      <SelectTrigger className="bg-[#0a0a0a] border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sunday">Sunday</SelectItem>
                        <SelectItem value="Monday">Monday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-200">Time Format</Label>
                    <Select value={timeFormat} onValueChange={setTimeFormat}>
                      <SelectTrigger className="bg-[#0a0a0a] border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12-hour">12-hour (2:30 PM)</SelectItem>
                        <SelectItem value="24-hour">24-hour (14:30)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-200">Date Format</Label>
                    <Select value={dateFormat} onValueChange={setDateFormat}>
                      <SelectTrigger className="bg-[#0a0a0a] border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: NOTIFICATIONS & REMINDERS */}
          <TabsContent value="notifications" className="space-y-6">
            {/* Agent Notifications */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Agent Notifications</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Configure when and how agents receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "newAppointment", label: "New appointment created", sendTo: "Agent + Manager" },
                  { key: "rescheduled", label: "Appointment rescheduled", sendTo: "Agent + Contact" },
                  { key: "cancelled", label: "Appointment cancelled", sendTo: "Agent + Manager" },
                  { key: "startingSoon", label: "Appointment starting soon (15 min before)", sendTo: "Agent" },
                  { key: "noShow", label: "Contact no-show", sendTo: "Agent + Manager" },
                  { key: "dailySummary", label: "Daily schedule summary", sendTo: "Agent", time: true },
                ].map((notification) => (
                  <div key={notification.key} className="p-4 bg-[#0a0a0a] rounded-lg border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={notifications[notification.key as keyof typeof notifications].enabled}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              [notification.key]: {
                                ...notifications[notification.key as keyof typeof notifications],
                                enabled: checked as boolean,
                              },
                            })
                          }
                        />
                        <div>
                          <Label className="cursor-pointer text-sm text-gray-200">{notification.label}</Label>
                          <p className="text-sm text-gray-300">Send to: {notification.sendTo}</p>
                        </div>
                      </div>
                      {notification.time && (
                        <Input type="time" defaultValue="08:00" className="bg-[#1a1a1a] border-white/20 w-32" />
                      )}
                    </div>
                    <div className="flex gap-2 ml-7">
                      <Badge variant="outline" className="border-white/20">
                        <Mail className="h-3 w-3 mr-1" /> Email
                      </Badge>
                      <Badge variant="outline" className="border-white/20">
                        <MessageSquare className="h-3 w-3 mr-1" /> SMS
                      </Badge>
                      <Badge variant="outline" className="border-white/20">
                        <Bell className="h-3 w-3 mr-1" /> In-app
                      </Badge>
                      <Badge variant="outline" className="border-white/20">
                        <Globe className="h-3 w-3 mr-1" /> Browser
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Customer Reminders */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Contact/Customer Reminders</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Automated reminders sent to contacts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-[#0a0a0a] rounded-lg border border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={customerReminders.confirmation}
                      onCheckedChange={(checked) =>
                        setCustomerReminders({ ...customerReminders, confirmation: checked as boolean })
                      }
                    />
                    <div>
                      <Label className="cursor-pointer text-sm text-gray-200">Send appointment confirmation</Label>
                      <p className="text-sm text-gray-300">When: Immediately after booking</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#0a0a0a] rounded-lg border border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={customerReminders.reminder24h}
                      onCheckedChange={(checked) =>
                        setCustomerReminders({ ...customerReminders, reminder24h: checked as boolean })
                      }
                    />
                    <div className="flex-1">
                      <Label className="cursor-pointer text-sm text-gray-200">Reminder before appointment</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-300">Send:</span>
                        <Input type="number" defaultValue="24" className="bg-[#1a1a1a] border-white/20 w-20" />
                        <Select defaultValue="hours">
                          <SelectTrigger className="bg-[#1a1a1a] border-white/20 w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hours">hours</SelectItem>
                            <SelectItem value="days">days</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-gray-300">before</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#0a0a0a] rounded-lg border border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={customerReminders.noShowFollowup}
                      onCheckedChange={(checked) =>
                        setCustomerReminders({ ...customerReminders, noShowFollowup: checked as boolean })
                      }
                    />
                    <div>
                      <Label className="cursor-pointer text-sm text-gray-200">Follow-up after no-show</Label>
                      <p className="text-sm text-gray-300">Send: 2 hours after missed appointment</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#0a0a0a] rounded-lg border border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={customerReminders.thankYou}
                      onCheckedChange={(checked) =>
                        setCustomerReminders({ ...customerReminders, thankYou: checked as boolean })
                      }
                    />
                    <div>
                      <Label className="cursor-pointer text-sm text-gray-200">Thank you after completion</Label>
                      <p className="text-sm text-gray-300">Send: 1 hour after appointment</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="border-white/20 hover:bg-white/5 bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Manage Email Templates
                  </Button>
                  <Button variant="outline" className="border-white/20 hover:bg-white/5 bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Manage SMS Templates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: INTEGRATIONS */}
          <TabsContent value="integrations" className="space-y-6">
            {/* Calendar Sync */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Calendar Sync</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Connect external calendars for two-way sync
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Google Calendar */}
                <div className="p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-8 w-8 text-orange-500" />
                      <div>
                        <h3 className="font-semibold text-white text-base">Google Calendar</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <Check className="h-3 w-3 mr-1" /> Connected
                          </Badge>
                          <span className="text-sm text-gray-300">{googleCalendar.email}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/5 bg-transparent">
                      Disconnect
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-200">Sync Direction</Label>
                      <Select
                        value={googleCalendar.sync}
                        onValueChange={(value) => setGoogleCalendar({ ...googleCalendar, sync: value })}
                      >
                        <SelectTrigger className="bg-[#1a1a1a] border-white/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="two-way">Two-way sync</SelectItem>
                          <SelectItem value="aeon-to-google">AEON → Google</SelectItem>
                          <SelectItem value="google-to-aeon">Google → AEON</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Last sync: 5 minutes ago</span>
                      <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/5 bg-transparent">
                        <RefreshCw className="h-3 w-3 mr-2" />
                        Sync Now
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Microsoft Outlook */}
                <div className="p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="font-semibold text-white text-base">Microsoft Outlook</h3>
                        <Badge variant="outline" className="border-white/20 mt-1">
                          <X className="h-3 w-3 mr-1" /> Not Connected
                        </Badge>
                      </div>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600">Connect Outlook</Button>
                  </div>
                </div>

                {/* Apple iCloud */}
                <div className="p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-8 w-8 text-gray-400" />
                      <div>
                        <h3 className="font-semibold text-white text-base">Apple iCloud Calendar</h3>
                        <Badge variant="outline" className="border-white/20 mt-1">
                          <X className="h-3 w-3 mr-1" /> Not Connected
                        </Badge>
                      </div>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600">Connect iCloud</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Conferencing */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Video Conferencing</CardTitle>
                <CardDescription className="text-base text-gray-300">Integrate video meeting platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Zoom */}
                <div className="p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Video className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="font-semibold text-white text-base">Zoom</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <Check className="h-3 w-3 mr-1" /> Connected
                          </Badge>
                          <span className="text-sm text-gray-300">{zoomIntegration.email}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/5 bg-transparent">
                      Disconnect
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded border border-white/10">
                    <div>
                      <Label className="text-sm text-gray-200">Auto-create Zoom links</Label>
                      <p className="text-sm text-gray-300">Automatically create Zoom links for video appointments</p>
                    </div>
                    <Switch
                      checked={zoomIntegration.autoCreate}
                      onCheckedChange={(checked) => setZoomIntegration({ ...zoomIntegration, autoCreate: checked })}
                    />
                  </div>
                </div>

                {/* Google Meet */}
                <div className="p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Video className="h-8 w-8 text-green-500" />
                      <div>
                        <h3 className="font-semibold text-white text-base">Google Meet</h3>
                        <Badge variant="outline" className="border-white/20 mt-1">
                          <X className="h-3 w-3 mr-1" /> Not Connected
                        </Badge>
                      </div>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600">Connect Google Meet</Button>
                  </div>
                </div>

                {/* Microsoft Teams */}
                <div className="p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Video className="h-8 w-8 text-purple-500" />
                      <div>
                        <h3 className="font-semibold text-white text-base">Microsoft Teams</h3>
                        <Badge variant="outline" className="border-white/20 mt-1">
                          <X className="h-3 w-3 mr-1" /> Not Connected
                        </Badge>
                      </div>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600">Connect Teams</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Webhook Notifications */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Webhook Notifications</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Send real-time notifications to external systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://your-domain.com/webhook"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="bg-[#0a0a0a] border-white/20"
                    />
                    <Button variant="outline" className="border-white/20 hover:bg-white/5 bg-transparent">
                      Test
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm text-gray-200">Events to Send</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(webhookEvents).map(([event, checked]) => (
                      <div key={event} className="flex items-center space-x-2">
                        <Checkbox
                          id={`webhook-${event}`}
                          checked={checked}
                          onCheckedChange={(value) => setWebhookEvents({ ...webhookEvents, [event]: value as boolean })}
                        />
                        <Label htmlFor={`webhook-${event}`} className="capitalize cursor-pointer text-sm text-gray-200">
                          {event.replace(/([A-Z])/g, " $1").trim()}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Authentication</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Secret key" type="password" className="bg-[#0a0a0a] border-white/20" />
                    <Button variant="outline" className="border-white/20 hover:bg-white/5 bg-transparent">
                      Generate
                    </Button>
                  </div>
                </div>

                <Button variant="link" className="text-orange-500 p-0">
                  View Recent Deliveries →
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: BOOKING PAGE SETTINGS */}
          <TabsContent value="booking" className="space-y-6">
            {/* Public Booking Link */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Public Booking Link</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Share your booking page with customers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                  <div>
                    <Label className="text-sm text-gray-200">Enable Public Booking</Label>
                    <p className="text-sm text-gray-300">Allow customers to book appointments online</p>
                  </div>
                  <Switch checked={publicBookingEnabled} onCheckedChange={setPublicBookingEnabled} />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Your Booking Page URL</Label>
                  <div className="flex gap-2">
                    <Input value="https://aeon.dial/book/yourname" readOnly className="bg-[#0a0a0a] border-white/20" />
                    <Button variant="outline" className="border-white/20 hover:bg-white/5 bg-transparent">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="border-white/20 hover:bg-white/5 bg-transparent">
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Booking Page Title</Label>
                  <Input
                    value={bookingPageTitle}
                    onChange={(e) => setBookingPageTitle(e.target.value)}
                    className="bg-[#0a0a0a] border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Welcome Message</Label>
                  <Textarea
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    className="bg-[#0a0a0a] border-white/20 min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Booking Form Fields */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Booking Form Fields</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Customize information collected from customers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-sm text-gray-200">Required Fields</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(requiredFields).map(([field, checked]) => (
                      <div key={field} className="flex items-center space-x-2">
                        <Checkbox
                          id={`field-${field}`}
                          checked={checked}
                          onCheckedChange={(value) =>
                            setRequiredFields({ ...requiredFields, [field]: value as boolean })
                          }
                        />
                        <Label htmlFor={`field-${field}`} className="capitalize cursor-pointer text-sm text-gray-200">
                          {field.replace(/([A-Z])/g, " $1").trim()}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="border-white/20 hover:bg-white/5 bg-transparent">
                  + Add Custom Field
                </Button>
              </CardContent>
            </Card>

            {/* Booking Page Appearance */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Booking Page Appearance</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Customize the look of your booking page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Logo</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-white/20 hover:bg-white/5 bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-200">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input type="color" defaultValue="#FF6B35" className="bg-[#0a0a0a] border-white/20 h-10 w-20" />
                      <Input value="#FF6B35" readOnly className="bg-[#0a0a0a] border-white/20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-200">Background Color</Label>
                    <div className="flex gap-2">
                      <Input type="color" defaultValue="#0a0a0a" className="bg-[#0a0a0a] border-white/20 h-10 w-20" />
                      <Input value="#0a0a0a" readOnly className="bg-[#0a0a0a] border-white/20" />
                    </div>
                  </div>
                </div>

                <Button className="bg-orange-500 hover:bg-orange-600">Preview Booking Page</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 5: ADVANCED SETTINGS */}
          <TabsContent value="advanced" className="space-y-6">
            {/* Availability Management */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Availability Management</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Configure how appointments are assigned to agents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                  <div>
                    <Label className="text-sm text-gray-200">Round-robin Assignment</Label>
                    <p className="text-sm text-gray-300">Distribute appointments evenly among agents</p>
                  </div>
                  <Switch checked={roundRobin} onCheckedChange={setRoundRobin} />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Agent Selection Method</Label>
                  <Select value={agentSelection} onValueChange={setAgentSelection}>
                    <SelectTrigger className="bg-[#0a0a0a] border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Random">Random</SelectItem>
                      <SelectItem value="Least busy">Least busy</SelectItem>
                      <SelectItem value="Most available">Most available</SelectItem>
                      <SelectItem value="By skill">By skill</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* No-Show Management */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">No-Show Management</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Handle missed appointments automatically
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Auto-mark as No-show After</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={noShowTimeout}
                      onChange={(e) => setNoShowTimeout(e.target.value)}
                      className="bg-[#0a0a0a] border-white/20 w-24"
                    />
                    <span className="text-sm text-gray-300">minutes past appointment time</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                  <div>
                    <Label className="text-sm text-gray-200">Automatically Reschedule No-shows</Label>
                    <p className="text-sm text-gray-300">Attempt to reschedule missed appointments</p>
                  </div>
                  <Switch checked={autoReschedule} onCheckedChange={setAutoReschedule} />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Maximum Reschedule Attempts</Label>
                  <Input
                    type="number"
                    value={maxReschedules}
                    onChange={(e) => setMaxReschedules(e.target.value)}
                    className="bg-[#0a0a0a] border-white/20 w-24"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Compliance & Privacy */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Compliance & Privacy</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Data protection and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                  <div>
                    <Label className="text-sm text-gray-200">GDPR Compliance Mode</Label>
                    <p className="text-sm text-gray-300">Require consent for data collection</p>
                  </div>
                  <Switch checked={gdprMode} onCheckedChange={setGdprMode} />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Data Retention Period</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">Keep appointment records for</span>
                    <Input
                      type="number"
                      value={dataRetention}
                      onChange={(e) => setDataRetention(e.target.value)}
                      className="bg-[#0a0a0a] border-white/20 w-24"
                    />
                    <Select defaultValue="years">
                      <SelectTrigger className="bg-[#0a0a0a] border-white/20 w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="years">years</SelectItem>
                        <SelectItem value="months">months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Consent Text for Booking Page</Label>
                  <Textarea
                    placeholder="Enter GDPR consent message..."
                    className="bg-[#0a0a0a] border-white/20 min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* API & Developer Settings */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">API & Developer Settings</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  Configure API access and integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                  <div>
                    <Label className="text-sm text-gray-200">API Access</Label>
                    <p className="text-sm text-gray-300">Enable programmatic access to calendar data</p>
                  </div>
                  <Switch checked={apiAccess} onCheckedChange={setApiAccess} />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">API Key</Label>
                  <div className="flex gap-2">
                    <Input value="aeon_sk_••••••••••••••••" readOnly className="bg-[#0a0a0a] border-white/20" />
                    <Button variant="outline" className="border-white/20 hover:bg-white/5 bg-transparent">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="border-white/20 hover:bg-white/5 bg-transparent">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Rate limit: 1000 requests/hour</span>
                  <Button variant="link" className="text-orange-500 p-0">
                    View API Docs →
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Import/Export */}
            <Card className="bg-[#1a1a1a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Import/Export</CardTitle>
                <CardDescription className="text-base text-gray-300">Manage appointment data in bulk</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Import Appointments</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-white/20 hover:bg-white/5 bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File (.csv, .ics)
                    </Button>
                    <Button variant="link" className="text-orange-500">
                      Download Template
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-200">Export All Appointments</Label>
                  <div className="flex gap-2">
                    <Select defaultValue="csv">
                      <SelectTrigger className="bg-[#0a0a0a] border-white/20 w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="ics">ICS</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Label className="text-red-400 text-sm">Bulk Operations</Label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      Delete All Past Appointments
                    </Button>
                    <Button variant="outline" className="border-white/20 hover:bg-white/5 bg-transparent">
                      Archive Completed Appointments
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
