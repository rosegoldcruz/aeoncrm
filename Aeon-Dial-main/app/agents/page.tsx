import { Activity, Clock, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgentsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-orange-500">Agent Management</h1>
        <p className="text-neutral-400 text-sm">Monitor and manage call center agents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Total Agents</CardTitle>
            <Activity className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">127</div>
            <p className="text-xs text-neutral-500">89 currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">On Calls</CardTitle>
            <Phone className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">73</div>
            <p className="text-xs text-neutral-500">82% utilization</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Avg Handle Time</CardTitle>
            <Clock className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4:32</div>
            <p className="text-xs text-neutral-500">-12s from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Agent Status Board</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="p-4 bg-neutral-800 rounded border border-neutral-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">Agent {1001 + i}</span>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
              <div className="text-xs text-neutral-400">On Call - 00:03:42</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
