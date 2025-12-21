"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Phone,
  Settings,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Shield,
  Clock,
  Mic,
  Users,
  BarChart3,
  FileText,
  Zap,
  CheckCircle2,
} from "lucide-react"

export default function OutboundPage() {
  const [dialingMode, setDialingMode] = useState("power")
  const [callsPerAgent, setCallsPerAgent] = useState([1.0])
  const [ringTimeout, setRingTimeout] = useState("20s")
  const [interCallDelay, setInterCallDelay] = useState([3])
  const [amdEnabled, setAmdEnabled] = useState(true)
  const [leaveVoicemail, setLeaveVoicemail] = useState(true)
  const [voicemailType, setVoicemailType] = useState("prerecorded")
  const [callerIdStrategy, setCallerIdStrategy] = useState("local")
  const [cnamName, setCnamName] = useState("AEON Sales")
  const [honorInternalDnc, setHonorInternalDnc] = useState(true)
  const [honorFtcDnc, setHonorFtcDnc] = useState(true)
  const [stateDnc, setStateDnc] = useState(false)
  const [litigatorScrub, setLitigatorScrub] = useState(false)
  const [respectTimezone, setRespectTimezone] = useState(true)
  const [mondayStart, setMondayStart] = useState("8:00 AM")
  const [mondayEnd, setMondayEnd] = useState("8:00 PM")
  const [saturdayStart, setSaturdayStart] = useState("10:00 AM")
  const [saturdayEnd, setSaturdayEnd] = useState("6:00 PM")
  const [noCallSunday, setNoCallSunday] = useState(true)
  const [noCallHolidays, setNoCallHolidays] = useState(true)
  const [requireConsent, setRequireConsent] = useState(true)
  const [autoDisclosure, setAutoDisclosure] = useState(true)
  const [abandonedCallLimit, setAbandonedCallLimit] = useState("3")
  const [maxAttempts, setMaxAttempts] = useState("3")
  const [minHoursBetween, setMinHoursBetween] = useState("4")
  const [maxHoursBetween, setMaxHoursBetween] = useState("48")
  const [resetAfterDays, setResetAfterDays] = useState("30")
  const [noAnswerAttempts, setNoAnswerAttempts] = useState("3")
  const [busyAttempts, setBusyAttempts] = useState("2")
  const [voicemailAttempts, setVoicemailAttempts] = useState("1")

  // Advanced settings
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [recordCalls, setRecordCalls] = useState(true)
  const [storage, setStorage] = useState("aeon-cloud")
  const [retention, setRetention] = useState("90")
  const [enableScripts, setEnableScripts] = useState(true)
  const [enableAiAssist, setEnableAiAssist] = useState(true)
  const [callHighPriority, setCallHighPriority] = useState(true)
  const [roundRobin, setRoundRobin] = useState(true)
  const [stickyAgent, setStickyAgent] = useState(false)
  const [showLiveStats, setShowLiveStats] = useState(true)
  const [requireDisposition, setRequireDisposition] = useState(true)

  const handleSave = () => {
    // Validation
    if (callsPerAgent[0] > 1.5) {
      alert("⚠️ Warning: Dial ratio >1.5 may result in abandoned calls exceeding 3% limit")
    }
    alert("✅ Settings saved successfully!")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Phone className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-orange-500">Outbound Dialing</h1>
        </div>
        <p className="text-gray-300 text-base mb-6">Configure automated and manual outbound calling</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[#1a1a1a] border-gray-800 p-4">
            <div className="text-sm text-gray-400 mb-1">Campaigns Running</div>
            <div className="text-2xl font-bold text-white">3</div>
          </Card>
          <Card className="bg-[#1a1a1a] border-gray-800 p-4">
            <div className="text-sm text-gray-400 mb-1">Calls Today</div>
            <div className="text-2xl font-bold text-white">1,247</div>
          </Card>
          <Card className="bg-[#1a1a1a] border-gray-800 p-4">
            <div className="text-sm text-gray-400 mb-1">Connect Rate</div>
            <div className="text-2xl font-bold text-green-500">68.5%</div>
          </Card>
        </div>
      </div>

      {/* Sticky Save Button */}
      <div className="sticky top-0 z-10 bg-[#0a0a0a] pb-4 mb-6 flex gap-3">
        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
          Reset to Defaults
        </Button>
      </div>

      <div className="space-y-6">
        {/* Dialing Mode Section */}
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-white">Dialing Mode</h2>
          </div>

          <Label className="text-base text-gray-200 mb-4 block">Select Dialing Mode:</Label>
          <RadioGroup value={dialingMode} onValueChange={setDialingMode} className="space-y-4">
            <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-colors">
              <RadioGroupItem value="power" id="power" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="power" className="text-base font-semibold text-white cursor-pointer">
                  Power Dialer (1:1 ratio)
                </Label>
                <p className="text-sm text-gray-400 mt-1">Dials one lead per available agent</p>
                <p className="text-sm text-gray-500 mt-1">Best for: Small teams, high-touch sales</p>
                <p className="text-sm text-gray-500">Ratio: 1 call per agent</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-colors">
              <RadioGroupItem value="preview" id="preview" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="preview" className="text-base font-semibold text-white cursor-pointer">
                  Preview Dialer
                </Label>
                <p className="text-sm text-gray-400 mt-1">Agent sees lead info before call, manually clicks to dial</p>
                <p className="text-sm text-gray-500 mt-1">Best for: Complex sales, account-based selling</p>
                <p className="text-sm text-gray-500">Agent control: Full</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-colors">
              <RadioGroupItem value="progressive" id="progressive" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="progressive" className="text-base font-semibold text-white cursor-pointer">
                  Progressive Dialer
                </Label>
                <p className="text-sm text-gray-400 mt-1">Auto-dials next lead when agent becomes available</p>
                <p className="text-sm text-gray-500 mt-1">Best for: Medium teams, consistent pacing</p>
                <p className="text-sm text-gray-500">Ratio: 1:1, automatic</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-700 bg-gray-900/50 opacity-60">
              <RadioGroupItem value="predictive" id="predictive" disabled className="mt-1" />
              <div className="flex-1">
                <Label
                  htmlFor="predictive"
                  className="text-base font-semibold text-white cursor-not-allowed flex items-center gap-2"
                >
                  Predictive Dialer
                  <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">Coming Soon</span>
                </Label>
                <p className="text-sm text-gray-400 mt-1">Dials multiple numbers per agent using AI prediction</p>
                <p className="text-sm text-gray-500 mt-1">Best for: Large teams, high volume</p>
                <p className="text-sm text-gray-500">Ratio: Dynamic (1.2:1 to 3:1)</p>
                <p className="text-sm text-gray-500">Requires: 10+ agents for statistical accuracy</p>
              </div>
            </div>
          </RadioGroup>

          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-300">
              Current mode: <span className="font-semibold">Power Dialer</span>
            </p>
          </div>
        </Card>

        {/* Call Pacing Section */}
        {dialingMode !== "preview" && (
          <Card className="bg-[#1a1a1a] border-gray-800 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-bold text-white">Call Pacing</h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base text-gray-200">Calls per agent</Label>
                  <span className="text-sm font-semibold text-white">{callsPerAgent[0].toFixed(1)}</span>
                </div>
                <Slider
                  value={callsPerAgent}
                  onValueChange={setCallsPerAgent}
                  min={1}
                  max={3}
                  step={0.1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1.0 (conservative)</span>
                  <span>3.0 (aggressive)</span>
                </div>
                {callsPerAgent[0] > 1.5 && (
                  <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-yellow-300">Ratio &gt;1.5 may create abandoned calls</p>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-base text-gray-200 mb-3 block">Ring timeout</Label>
                <Select value={ringTimeout} onValueChange={setRingTimeout}>
                  <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15s">15 seconds</SelectItem>
                    <SelectItem value="20s">20 seconds</SelectItem>
                    <SelectItem value="30s">30 seconds</SelectItem>
                    <SelectItem value="45s">45 seconds</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">How long to let phone ring before abandoning</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base text-gray-200">Inter-call delay</Label>
                  <span className="text-sm font-semibold text-white">{interCallDelay[0]}s</span>
                </div>
                <Slider value={interCallDelay} onValueChange={setInterCallDelay} min={0} max={10} step={1} />
                <p className="text-sm text-gray-500 mt-1">Pause between calls for agent wrap-up</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base text-gray-200">Answering machine detection (AMD)</Label>
                    <p className="text-sm text-gray-500">Skip to next call if voicemail detected</p>
                  </div>
                  <Switch checked={amdEnabled} onCheckedChange={setAmdEnabled} />
                </div>

                {amdEnabled && (
                  <div className="ml-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base text-gray-200">Leave voicemail</Label>
                      <Switch checked={leaveVoicemail} onCheckedChange={setLeaveVoicemail} />
                    </div>

                    {leaveVoicemail && (
                      <div className="ml-6">
                        <Label className="text-base text-gray-200 mb-3 block">Voicemail drop</Label>
                        <Select value={voicemailType} onValueChange={setVoicemailType}>
                          <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No message</SelectItem>
                            <SelectItem value="prerecorded">Prerecorded</SelectItem>
                            <SelectItem value="ai">AI-generated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Caller ID Settings */}
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Phone className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-white">Caller ID Settings</h2>
          </div>

          <Label className="text-base text-gray-200 mb-4 block">Caller ID Strategy:</Label>
          <RadioGroup value={callerIdStrategy} onValueChange={setCallerIdStrategy} className="space-y-3 mb-6">
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="fixed" id="fixed" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="fixed" className="text-base text-white cursor-pointer">
                  Fixed caller ID
                </Label>
                <p className="text-sm text-gray-500">Select number: (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <RadioGroupItem value="local" id="local" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="local" className="text-base text-white cursor-pointer">
                  Local presence matching
                </Label>
                <p className="text-sm text-gray-400 mt-1">
                  Automatically match caller ID area code to lead's area code
                </p>
                <p className="text-sm text-gray-500">Requires: Multiple DIDs across area codes</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <RadioGroupItem value="campaign" id="campaign" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="campaign" className="text-base text-white cursor-pointer">
                  Campaign-specific
                </Label>
                <p className="text-sm text-gray-500">Set in campaign settings</p>
              </div>
            </div>
          </RadioGroup>

          <div className="pt-4 border-t border-gray-800">
            <Label className="text-base text-gray-200 mb-3 block">CNAM (Caller Name)</Label>
            <div className="space-y-3">
              <div>
                <Label className="text-sm text-gray-400 mb-2 block">Display name</Label>
                <Input
                  value={cnamName}
                  onChange={(e) => setCnamName(e.target.value)}
                  className="bg-[#0a0a0a] border-gray-700 text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-300">Registered: Yes</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                Update CNAM
              </Button>
            </div>
          </div>
        </Card>

        {/* Compliance Settings */}
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-white">Compliance Settings</h2>
          </div>

          <div className="space-y-6">
            {/* DNC Lists */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Do Not Call (DNC) Lists</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base text-gray-200">Honor internal DNC</Label>
                    <p className="text-sm text-gray-500">Automatically skip contacts marked DNC</p>
                  </div>
                  <Switch checked={honorInternalDnc} onCheckedChange={setHonorInternalDnc} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base text-gray-200">Honor FTC DNC list</Label>
                    <p className="text-sm text-gray-500">Scrub against national registry (U.S.)</p>
                    <p className="text-xs text-gray-600 mt-1">Last sync: November 1, 2025</p>
                  </div>
                  <Switch checked={honorFtcDnc} onCheckedChange={setHonorFtcDnc} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base text-gray-200">State-specific DNC</Label>
                    <p className="text-sm text-gray-500">Check state registries (additional cost)</p>
                  </div>
                  <Switch checked={stateDnc} onCheckedChange={setStateDnc} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base text-gray-200">Litigator scrub</Label>
                    <p className="text-sm text-gray-500">Avoid known litigious contacts (subscription required)</p>
                  </div>
                  <Switch checked={litigatorScrub} onCheckedChange={setLitigatorScrub} />
                </div>

                <div className="pt-3 border-t border-gray-800">
                  <p className="text-sm text-gray-300 mb-2">
                    Internal DNC list: <span className="font-semibold">1,234 contacts</span>
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      View DNC List
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      Export DNC
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Call Time Restrictions */}
            <div className="pt-6 border-t border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Call Time Restrictions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base text-gray-200">Respect timezone-based calling hours</Label>
                  <Switch checked={respectTimezone} onCheckedChange={setRespectTimezone} />
                </div>

                {respectTimezone && (
                  <div className="ml-6 space-y-4">
                    <div>
                      <Label className="text-base text-gray-200 mb-3 block">
                        Allowed calling hours (recipient's local time)
                      </Label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-300 w-32">Monday-Friday:</span>
                          <Select value={mondayStart} onValueChange={setMondayStart}>
                            <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-white w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                              <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-gray-500">to</span>
                          <Select value={mondayEnd} onValueChange={setMondayEnd}>
                            <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-white w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="8:00 PM">8:00 PM</SelectItem>
                              <SelectItem value="9:00 PM">9:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-300 w-32">Saturday:</span>
                          <Select value={saturdayStart} onValueChange={setSaturdayStart}>
                            <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-white w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                              <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-gray-500">to</span>
                          <Select value={saturdayEnd} onValueChange={setSaturdayEnd}>
                            <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-white w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                              <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center gap-4">
                          <Checkbox id="no-sunday" checked={noCallSunday} onCheckedChange={setNoCallSunday} />
                          <Label htmlFor="no-sunday" className="text-sm text-gray-300 cursor-pointer">
                            Do not call on Sunday
                          </Label>
                        </div>

                        <div className="flex items-center gap-4">
                          <Checkbox id="no-holidays" checked={noCallHolidays} onCheckedChange={setNoCallHolidays} />
                          <Label htmlFor="no-holidays" className="text-sm text-gray-300 cursor-pointer">
                            Do not call on Holidays
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* TCPA Compliance */}
            <div className="pt-6 border-t border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">TCPA Compliance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base text-gray-200">Require prior express consent</Label>
                    <p className="text-sm text-gray-500">Only call contacts with documented consent</p>
                  </div>
                  <Switch checked={requireConsent} onCheckedChange={setRequireConsent} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base text-gray-200">Auto-include disclosure</Label>
                    <p className="text-sm text-gray-500">"This call may be recorded for quality purposes"</p>
                  </div>
                  <Switch checked={autoDisclosure} onCheckedChange={setAutoDisclosure} />
                </div>

                <div>
                  <Label className="text-base text-gray-200 mb-2 block">Abandoned call rate limit</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      value={abandonedCallLimit}
                      onChange={(e) => setAbandonedCallLimit(e.target.value)}
                      className="bg-[#0a0a0a] border-gray-700 text-white w-24"
                    />
                    <span className="text-gray-300">%</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">FCC requirement: &lt;3% abandoned calls</p>
                  <div className="mt-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-400">Current rate: 1.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Max Attempts */}
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-white">Call Attempt Limits</h2>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-base text-gray-200 mb-3 block">Maximum attempts per lead</Label>
              <Select value={maxAttempts} onValueChange={setMaxAttempts}>
                <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 attempt</SelectItem>
                  <SelectItem value="2">2 attempts</SelectItem>
                  <SelectItem value="3">3 attempts</SelectItem>
                  <SelectItem value="5">5 attempts</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base text-gray-200 mb-3 block">Time between attempts</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-300 w-24">Minimum:</span>
                  <Input
                    type="number"
                    value={minHoursBetween}
                    onChange={(e) => setMinHoursBetween(e.target.value)}
                    className="bg-[#0a0a0a] border-gray-700 text-white w-24"
                  />
                  <span className="text-gray-300">hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-300 w-24">Maximum:</span>
                  <Input
                    type="number"
                    value={maxHoursBetween}
                    onChange={(e) => setMaxHoursBetween(e.target.value)}
                    className="bg-[#0a0a0a] border-gray-700 text-white w-24"
                  />
                  <span className="text-gray-300">hours (mark as unreachable after)</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base text-gray-200 mb-3 block">Reset attempt count after</Label>
              <Select value={resetAfterDays} onValueChange={setResetAfterDays}>
                <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">For leads who never answered</p>
            </div>

            <div>
              <Label className="text-base text-gray-200 mb-3 block">Attempt on different outcomes</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-300 w-32">No answer:</span>
                  <Select value={noAnswerAttempts} onValueChange={setNoAnswerAttempts}>
                    <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-white w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 attempt</SelectItem>
                      <SelectItem value="2">2 attempts</SelectItem>
                      <SelectItem value="3">3 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-300 w-32">Busy:</span>
                  <Select value={busyAttempts} onValueChange={setBusyAttempts}>
                    <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-white w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 attempt</SelectItem>
                      <SelectItem value="2">2 attempts</SelectItem>
                      <SelectItem value="3">3 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-300 w-32">Voicemail:</span>
                  <Select value={voicemailAttempts} onValueChange={setVoicemailAttempts}>
                    <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-white w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 attempt</SelectItem>
                      <SelectItem value="2">2 attempts</SelectItem>
                      <SelectItem value="3">3 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-500">(don't keep leaving VMs)</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Advanced Settings */}
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-bold text-white">Advanced Settings</h2>
            </div>
            {showAdvanced ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {showAdvanced && (
            <div className="space-y-6 pt-4 border-t border-gray-800">
              {/* Call Recording */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  Call Recording
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base text-gray-200">Record all outbound calls</Label>
                    <Switch checked={recordCalls} onCheckedChange={setRecordCalls} />
                  </div>
                  {recordCalls && (
                    <div className="ml-6 space-y-3">
                      <div>
                        <Label className="text-sm text-gray-400 mb-2 block">Storage</Label>
                        <Select value={storage} onValueChange={setStorage}>
                          <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aeon-cloud">AEON Cloud</SelectItem>
                            <SelectItem value="s3">Amazon S3</SelectItem>
                            <SelectItem value="gcs">Google Cloud</SelectItem>
                            <SelectItem value="local">Local</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-400 mb-2 block">Retention</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={retention}
                            onChange={(e) => setRetention(e.target.value)}
                            className="bg-[#0a0a0a] border-gray-700 text-white w-24"
                          />
                          <span className="text-gray-300">days</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Call Scripting */}
              <div className="pt-6 border-t border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Call Scripting
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base text-gray-200">Enable call scripts</Label>
                      <p className="text-sm text-gray-500">Display script to agent during call</p>
                    </div>
                    <Switch checked={enableScripts} onCheckedChange={setEnableScripts} />
                  </div>
                  {enableScripts && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      Manage Scripts
                    </Button>
                  )}
                </div>
              </div>

              {/* AI Assist */}
              <div className="pt-6 border-t border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  AI Co-Pilot
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base text-gray-200">Enable AI Co-Pilot</Label>
                      <p className="text-sm text-gray-500">
                        Real-time suggestions, objection handling, sentiment analysis
                      </p>
                    </div>
                    <Switch checked={enableAiAssist} onCheckedChange={setEnableAiAssist} />
                  </div>
                  {enableAiAssist && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      Configure AI Settings
                    </Button>
                  )}
                </div>
              </div>

              {/* Priority & Routing */}
              <div className="pt-6 border-t border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Priority & Routing
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base text-gray-200">Call high-priority leads first</Label>
                    <Switch checked={callHighPriority} onCheckedChange={setCallHighPriority} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-base text-gray-200">Round-robin distribution</Label>
                    <Switch checked={roundRobin} onCheckedChange={setRoundRobin} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base text-gray-200">Sticky agent</Label>
                      <p className="text-sm text-gray-500">Same agent calls same lead on subsequent attempts</p>
                    </div>
                    <Switch checked={stickyAgent} onCheckedChange={setStickyAgent} />
                  </div>
                </div>
              </div>

              {/* Reporting */}
              <div className="pt-6 border-t border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Reporting
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base text-gray-200">Show live stats to managers</Label>
                    <Switch checked={showLiveStats} onCheckedChange={setShowLiveStats} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base text-gray-200">Require disposition</Label>
                      <p className="text-sm text-gray-500">Agent must select outcome before next call</p>
                    </div>
                    <Switch checked={requireDisposition} onCheckedChange={setRequireDisposition} />
                  </div>
                  {requireDisposition && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      Manage Dispositions
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Bottom Save Button */}
      <div className="mt-8 flex gap-3">
        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
          Reset to Defaults
        </Button>
      </div>
    </div>
  )
}
