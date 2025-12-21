import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewUserPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/users">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-orange-500">Create New User</h1>
          <p className="text-neutral-400 text-sm">Add a new user to the system</p>
        </div>
      </div>

      <div className="max-w-2xl bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Role</label>
            <select className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white">
              <option>Admin</option>
              <option>Manager</option>
              <option>Agent</option>
              <option>Supervisor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Create User
            </Button>
            <Link href="/users">
              <Button variant="outline" className="border-neutral-800 bg-transparent">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
