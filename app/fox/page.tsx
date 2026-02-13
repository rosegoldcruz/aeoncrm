import { Bot, Sparkles, TrendingUp, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function FoxIntelligencePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-orange-500">Fox Intelligence</h1>
        <p className="text-neutral-400 text-sm">AI-powered autonomous agent system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">AI Agents</CardTitle>
            <Bot className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24</div>
            <p className="text-xs text-neutral-500">18 active</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Demos Scheduled</CardTitle>
            <Sparkles className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">147</div>
            <p className="text-xs text-neutral-500">+23 today</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Qualification Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">73%</div>
            <p className="text-xs text-green-500">+8% this week</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Workflows</CardTitle>
            <Zap className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-neutral-500">8 running</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "AI Agents", href: "/fox/agents", desc: "Manage AI voice agents" },
          { title: "Studio", href: "/fox/studio", desc: "AI Agent creation studio" },
          { title: "Demos", href: "/fox/demos", desc: "Automated demo system" },
          { title: "Workflows", href: "/fox/workflows", desc: "Autonomous workflows" },
          { title: "Analytics", href: "/fox/analytics", desc: "AI performance metrics" },
        ].map((item, i) => (
          <Link key={i} href={item.href}>
            <Card className="bg-neutral-900 border-neutral-800 hover:border-orange-500 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-400">{item.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
