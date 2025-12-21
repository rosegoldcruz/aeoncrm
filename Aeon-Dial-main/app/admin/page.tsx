import { Server, Phone, Settings, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-orange-500">Admin Panel</h1>
        <p className="text-neutral-400 text-sm">System administration and configuration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "Servers", icon: Server, href: "/admin/servers", desc: "Manage telephony servers" },
          { title: "Carriers", icon: Phone, href: "/admin/carriers", desc: "SIP carrier configuration" },
          { title: "DIDs", icon: Phone, href: "/admin/dids", desc: "Phone number management" },
          { title: "Scripts", icon: Settings, href: "/admin/scripts", desc: "Call scripts" },
          { title: "System", icon: Shield, href: "/admin/system", desc: "System settings" },
        ].map((item, i) => (
          <Link key={i} href={item.href}>
            <Card className="bg-neutral-900 border-neutral-800 hover:border-orange-500 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white text-base">
                  <item.icon className="w-5 h-5 text-orange-500" />
                  {item.title}
                </CardTitle>
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
