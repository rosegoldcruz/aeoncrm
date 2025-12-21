import { Upload, Plus, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ListsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orange-500">Lead Lists</h1>
          <p className="text-neutral-400 text-sm">Manage contact lists and leads</p>
        </div>
        <div className="flex gap-2">
          <Link href="/lists/upload">
            <Button variant="outline" className="border-neutral-800 bg-transparent">
              <Upload className="w-4 h-4 mr-2" />
              Upload CSV
            </Button>
          </Link>
          <Link href="/lists/new">
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              New List
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: "Summer Leads 2025", count: 15420, status: "Active" },
          { name: "Q1 Follow-ups", count: 8932, status: "Active" },
          { name: "Customer Survey List", count: 5234, status: "Inactive" },
        ].map((list, i) => (
          <div key={i} className="p-6 bg-neutral-900 border border-neutral-800 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-medium mb-1">{list.name}</h3>
                <p className="text-sm text-neutral-400">{list.count.toLocaleString()} leads</p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  list.status === "Active" ? "bg-green-500/20 text-green-500" : "bg-neutral-700 text-neutral-400"
                }`}
              >
                {list.status}
              </span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 border-neutral-700 text-xs bg-transparent">
                View
              </Button>
              <Button size="sm" variant="outline" className="border-neutral-700 bg-transparent">
                <Download className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
