"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, QrCode, Zap, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/operator/dashboard",
    label: "Home",
    icon: Home,
  },
  {
    href: "/operator/missions",
    label: "Missions",
    icon: Zap,
  },
  {
    href: "/operator/verify-qr",
    label: "Verify QR",
    icon: QrCode,
  },
]

const bottomItems = [
  {
    href: "/operator/settings",
    label: "Settings",
    icon: Settings,
  },
  {
    href: "/",
    label: "Logout",
    icon: LogOut,
  },
]

export function OperatorSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-slate-200 bg-gradient-to-b from-slate-50 to-white z-30">
      {/* Logo/Branding */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-800">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-slate-900">SkyLens</h1>
          <p className="text-xs text-slate-500">Operator Portal</p>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100 active:bg-slate-200"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto h-2 w-2 rounded-full bg-white/80" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Items */}
      <div className="space-y-1 border-t border-slate-200 px-4 py-4">
        {bottomItems.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 active:bg-slate-200"
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Profile Card */}
      <div className="border-t border-slate-200 px-4 py-4">
        <div className="rounded-lg bg-gradient-to-r from-slate-100 to-slate-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600">
              <span className="text-sm font-bold text-white">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">John Doe</p>
              <p className="text-xs text-slate-600 truncate">Drone Operator</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
