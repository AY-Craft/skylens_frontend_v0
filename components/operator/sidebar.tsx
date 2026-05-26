"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Zap, QrCode, Settings, LogOut } from "lucide-react"
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
    href: "/operator/schedule",
    label: "Schedule",
    icon: QrCode,
  },
  {
    href: "/operator/waypoint-templates",
    label: "Waypoints",
    icon: QrCode,
  },
]

export function OperatorSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:flex z-30">
      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-blue-100 text-slate-900 dark:from-blue-950 dark:to-blue-900 dark:text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="space-y-1 border-t border-slate-200 px-4 py-4 dark:border-slate-800">
        {/* Profile Card */}
        <div className="mb-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0">
              <span className="text-sm font-bold text-white">AO</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                Alex Operator
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 truncate">OP-2024-001</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <Link
          href="/operator/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
            pathname === "/operator/settings"
              ? "bg-gradient-to-r from-blue-50 to-blue-100 text-slate-900 dark:from-blue-950 dark:to-blue-900 dark:text-white"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
          )}
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          <span>Settings</span>
        </Link>

        {/* Logout */}
        <button
          onClick={() => router.push("/operator/login")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
