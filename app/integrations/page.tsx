"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Search, Star, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [expandedFilters, setExpandedFilters] = useState<string[]>(["categories"])
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100])

  const toggleFilter = (filter: string) => {
    setExpandedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const filters = ["Collections", "Categories", "App Contains", "Business Niche", "Built By", "Pricing"]

  const apps = [
    {
      name: "CloseBot",
      developer: "CloseBot Inc",
      description: "Most used lead qualification and booking bot",
      rating: 4.7,
      reviews: 714,
      price: "Free",
      installed: false,
      icon: "🤖",
    },
    {
      name: "ServiceM8",
      developer: "ServiceM8",
      description: "All the actions you could wish for in your workflow for ServiceM8",
      rating: 0,
      reviews: 0,
      price: "Free",
      installed: false,
      icon: "🔧",
    },
    {
      name: "Kixie PowerCall & SMS",
      developer: "Kixie",
      description: "Better Sales Made Simple",
      rating: 3.7,
      reviews: 4,
      price: "Free",
      installed: true,
      icon: "📞",
    },
    {
      name: "Twilio",
      developer: "Twilio Inc",
      description: "Voice, SMS, and More Built for Developers",
      rating: 0,
      reviews: 0,
      price: "Free",
      installed: false,
      icon: "💬",
    },
    {
      name: "Vapi for Workflows",
      developer: "Vapi",
      description: "All the actions you could wish for in your workflow for Vapi",
      rating: 4.5,
      reviews: 52,
      price: "Free",
      installed: false,
      icon: "🎙️",
    },
    {
      name: "Account Booster",
      developer: "Booster Labs",
      description: "1 click install every app. Just like installing Zapier, pabbly, NBN or make",
      rating: 4.6,
      reviews: 37,
      price: "Free",
      installed: false,
      icon: "⚡",
    },
    {
      name: "Chat GPT For Workflows",
      developer: "OpenAI Partners",
      description: "All the actions you could wish for in your workflow for Chat GPT",
      rating: 4.9,
      reviews: 10,
      price: "Free",
      installed: false,
      icon: "🧠",
    },
    {
      name: "Zoom For Workflows",
      developer: "Zoom Video",
      description: "All the actions you could wish for in your workflow for Zoom",
      rating: 1.0,
      reviews: 2,
      price: "Free",
      installed: false,
      icon: "📹",
    },
    {
      name: "Spintax For Workflow",
      developer: "Spintax Pro",
      description: "Spin Your Text into Infinite Variations.",
      rating: 5.0,
      reviews: 1,
      price: "Free",
      installed: false,
      icon: "🔄",
    },
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]" />
      </motion.div>

      {/* Header with parallax */}
      <motion.div
        style={{ y: headerY, opacity: headerOpacity }}
        className="relative border-b border-neutral-800 backdrop-blur-xl bg-black/80 p-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-bold text-white mb-2"
        >
          Marketplace Apps
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-neutral-400"
        >
          Get more out of your CRM. Explore apps & integrate them with your account seamlessly.
        </motion.p>

        {/* Tabs */}
        <div className="flex gap-6 mt-6 border-b border-neutral-800">
          {["all", "installed"].map((tab, i) => (
            <motion.button
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === tab ? "text-orange-500" : "text-neutral-400 hover:text-white"
              }`}
            >
              {tab === "all" ? "All Apps" : "Installed Apps"}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-64 border-r border-neutral-800/50 p-6 space-y-2 backdrop-blur-xl bg-black/40 relative"
        >
          {/* Glowing edge effect */}
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-orange-500/50 to-transparent" />

          {filters.map((filter, i) => (
            <motion.div
              key={filter}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
              className="border-b border-neutral-800/50 pb-2"
            >
              <motion.button
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => toggleFilter(filter)}
                className="flex items-center justify-between w-full py-2 text-sm font-medium text-neutral-300 hover:text-white"
              >
                {filter}
                <motion.div
                  animate={{ rotate: expandedFilters.includes(filter) ? 0 : -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>
              {expandedFilters.includes(filter) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-4 py-2 space-y-1 overflow-hidden"
                >
                  <p className="text-xs text-neutral-500">Filter options...</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 relative">
          {/* Search and Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-between mb-6"
          >
            <p className="text-sm font-medium text-neutral-400">1105 Apps</p>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input
                placeholder="Search Apps"
                className="pl-10 bg-neutral-900/50 backdrop-blur-xl border-neutral-800 text-white placeholder:text-neutral-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
          >
            {apps.map((app, i) => (
              <AppCard key={i} app={app} index={i} />
            ))}
          </motion.div>

          {/* Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-between border-t border-neutral-800/50 pt-4"
          >
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="border-neutral-800 bg-neutral-900/50 text-neutral-600 backdrop-blur-xl"
              >
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:bg-neutral-800 backdrop-blur-xl"
              >
                Next
              </Button>
            </div>
            <div className="text-sm text-neutral-400">10 / page</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function AppCard({ app, index }: { app: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-5, 5]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
        },
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      {/* Glowing border effect on hover */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.5 }}
      />

      <Card className="relative bg-neutral-900/80 backdrop-blur-xl border-neutral-800 hover:border-orange-500/50 transition-all overflow-hidden">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="relative p-5 space-y-3" style={{ transform: "translateZ(20px)" }}>
          {/* App Icon and Name */}
          <div className="flex items-start gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg"
            >
              {app.icon}
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate group-hover:text-orange-400 transition-colors">
                {app.name}
              </h3>
              <p className="text-xs text-neutral-500">by {app.developer}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-400 line-clamp-2 min-h-[40px]">{app.description}</p>

          {/* Rating and Price */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {app.reviews > 0 ? (
                <>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-neutral-300">{app.rating}</span>
                  </div>
                  <span className="text-xs text-neutral-500">({app.reviews})</span>
                </>
              ) : (
                <span className="text-xs text-neutral-600">No reviews yet</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-900/30 text-green-400 border-green-800">
                {app.price}
              </Badge>
              {app.installed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <Badge className="bg-orange-900/30 text-orange-400 border-orange-800">✓ Installed</Badge>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
