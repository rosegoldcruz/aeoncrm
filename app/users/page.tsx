import { Search, Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UsersPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orange-500">User Management</h1>
          <p className="text-neutral-400 text-sm">Manage system users and permissions</p>
        </div>
        <Link href="/users/new">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="w-4 h-4 mr-2" />
            New User
          </Button>
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded text-white"
          />
        </div>
        <Button variant="outline" className="border-neutral-800 bg-transparent">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">Last Active</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            <tr>
              <td className="px-6 py-4 text-sm text-white">John Doe</td>
              <td className="px-6 py-4 text-sm text-neutral-400">Admin</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs bg-green-500/20 text-green-500 rounded">Active</span>
              </td>
              <td className="px-6 py-4 text-sm text-neutral-400">2 mins ago</td>
              <td className="px-6 py-4 text-right">
                <Button variant="ghost" size="sm" className="text-orange-500">
                  Edit
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
