import { Plus, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FoxAgentsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orange-500">AI Agents</h1>
          <p className="text-neutral-400 text-sm">Manage Fox Intelligence AI agents</p>
        </div>
        <Link href="/fox/agents/new">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="w-4 h-4 mr-2" />
            New AI Agent
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: "Sales Qualifier", status: "Active", calls: 247 },
          { name: "Demo Scheduler", status: "Active", calls: 189 },
          { name: "Follow-up Agent", status: "Paused", calls: 92 },
        ].map((agent, i) => (
          <div key={i} className="p-6 bg-neutral-900 border border-neutral-800 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{agent.name}</h3>
                  <p className="text-xs text-neutral-400">{agent.calls} calls today</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  agent.status === "Active" ? "bg-green-500/20 text-green-500" : "bg-neutral-700 text-neutral-400"
                }`}
              >
                {agent.status}
              </span>
            </div>
            <Button size="sm" variant="outline" className="w-full border-neutral-700 bg-transparent">
              Configure
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
