"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, X, Mic, MicOff, PhoneOff, Volume2, VolumeX, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function FloatingDialer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isInCall, setIsInCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")

  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedPosition = localStorage.getItem("dialerPosition")
    if (savedPosition) {
      const parsed = JSON.parse(savedPosition)
      setPosition(parsed)
    } else {
      // Default position: bottom-right with 20px margin
      const defaultX = window.innerWidth - 384 - 20 // 384px is panel width (w-96)
      const defaultY = 20
      setPosition({ x: defaultX, y: defaultY })
    }
  }, [])

  useEffect(() => {
    if (position.x !== 0 || position.y !== 0) {
      localStorage.setItem("dialerPosition", JSON.stringify(position))
    }
  }, [position])

  // Timer for call duration
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isInCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isInCall])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartCall = () => {
    if (phoneNumber) {
      setIsInCall(true)
      setCallDuration(0)
    }
  }

  const handleEndCall = () => {
    setIsInCall(false)
    setCallDuration(0)
    setPhoneNumber("")
    setIsMuted(false)
    setIsSpeakerOn(false)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!panelRef.current) return

    setIsDragging(true)
    const startX = e.clientX - position.x
    const startY = e.clientY - position.y

    const handleMouseMove = (e: MouseEvent) => {
      if (!panelRef.current) return

      const panelWidth = panelRef.current.offsetWidth
      const panelHeight = panelRef.current.offsetHeight

      let newX = e.clientX - startX
      let newY = e.clientY - startY

      // Boundary checking - keep at least 50px visible
      const minVisible = 50
      const maxX = window.innerWidth - minVisible
      const maxY = window.innerHeight - minVisible
      const minX = -(panelWidth - minVisible)
      const minY = 0

      newX = Math.max(minX, Math.min(newX, maxX))
      newY = Math.max(minY, Math.min(newY, maxY))

      // Snap to edges when within 10px
      if (newX < 10 && newX > -10) newX = 0
      if (newX > window.innerWidth - panelWidth - 10) newX = window.innerWidth - panelWidth
      if (newY < 10) newY = 0
      if (newY > window.innerHeight - panelHeight - 10) newY = window.innerHeight - panelHeight

      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <>
      {/* FAB Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/50 hover:shadow-orange-500/70 transition-all"
            >
              <Phone className="w-6 h-6 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: position.x,
                y: position.y,
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "fixed",
                left: 0,
                top: 0,
              }}
              className={`h-auto max-h-[90vh] w-96 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl z-50 flex flex-col ${
                isDragging ? "shadow-orange-500/50 shadow-2xl" : ""
              }`}
            >
              <div
                onMouseDown={handleMouseDown}
                className={`flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-sm rounded-t-lg ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                } select-none group`}
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-neutral-600 group-hover:text-orange-500 transition-colors" />
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">AI Dialer</h3>
                    <p className="text-xs text-neutral-500">LiveKit Powered</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="text-neutral-400 hover:text-white hover:bg-neutral-800"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {!isInCall ? (
                  // Dialer Interface
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs text-neutral-400 mb-2 block">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((digit) => (
                        <Button
                          key={digit}
                          variant="outline"
                          onClick={() => setPhoneNumber((prev) => prev + digit)}
                          className="h-14 text-lg font-semibold bg-neutral-800 border-neutral-700 hover:bg-neutral-700 hover:border-orange-500 text-white"
                        >
                          {digit}
                        </Button>
                      ))}
                    </div>

                    <Button
                      onClick={handleStartCall}
                      disabled={!phoneNumber}
                      className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Start AI Call
                    </Button>

                    <div className="space-y-2">
                      <p className="text-xs text-neutral-500">Recent Calls</p>
                      <div className="space-y-2">
                        {[
                          { number: "+1 (555) 123-4567", time: "2 mins ago", duration: "3:45" },
                          { number: "+1 (555) 987-6543", time: "15 mins ago", duration: "5:12" },
                          { number: "+1 (555) 456-7890", time: "1 hour ago", duration: "2:30" },
                        ].map((call, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-lg bg-neutral-800 hover:bg-neutral-750 cursor-pointer transition-colors"
                            onClick={() => setPhoneNumber(call.number)}
                          >
                            <div>
                              <p className="text-sm text-white">{call.number}</p>
                              <p className="text-xs text-neutral-500">{call.time}</p>
                            </div>
                            <span className="text-xs text-neutral-400">{call.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Active Call Interface
                  <div className="flex flex-col items-center justify-center h-full space-y-8">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto animate-pulse">
                        <Phone className="w-12 h-12 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-white">{phoneNumber}</p>
                        <p className="text-sm text-neutral-400">AI Call in Progress</p>
                      </div>
                      <div className="text-3xl font-mono text-orange-500">{formatDuration(callDuration)}</div>
                    </div>

                    {/* Call Controls */}
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsMuted(!isMuted)}
                        className={`h-14 w-14 rounded-full ${
                          isMuted
                            ? "bg-red-500/20 border-red-500 text-red-500"
                            : "bg-neutral-800 border-neutral-700 text-white"
                        }`}
                      >
                        {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                      </Button>

                      <Button
                        onClick={handleEndCall}
                        className="h-16 w-16 rounded-full bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50"
                      >
                        <PhoneOff className="w-7 h-7 text-white" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                        className={`h-14 w-14 rounded-full ${
                          isSpeakerOn
                            ? "bg-orange-500/20 border-orange-500 text-orange-500"
                            : "bg-neutral-800 border-neutral-700 text-white"
                        }`}
                      >
                        {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                      </Button>
                    </div>

                    {/* AI Status */}
                    <div className="w-full p-4 rounded-lg bg-neutral-800 border border-neutral-700">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-neutral-400">AI Agent Active</span>
                      </div>
                      <p className="text-sm text-white">Analyzing conversation...</p>
                      <div className="mt-2 flex gap-1">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-orange-500/30 rounded-full"
                            style={{
                              height: `${Math.random() * 20 + 10}px`,
                              animation: `pulse ${Math.random() * 0.5 + 0.5}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-neutral-800 bg-neutral-900/95 backdrop-blur-sm rounded-b-lg">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>Powered by LiveKit</span>
                  <span className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Connected
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
