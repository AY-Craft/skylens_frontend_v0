"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, QrCode, Zap } from "lucide-react"

const navItems = [
  {
    href: "/operator/dashboard",
    label: "Home",
    icon: Home,
  },
  {
    href: "/operator/verify-qr",
    label: "Scan QR",
    icon: QrCode,
    center: true,
  },
  {
    href: "/operator/missions",
    label: "Missions",
    icon: Zap,
  },
]

export function OperatorBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const isCenter = item.center

          if (isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center -top-3 w-20"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full border-4 border-white shadow-lg transition-colors ${
                    isActive
                      ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className="mt-1 text-xs font-semibold text-slate-700">
                  {item.label}
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center justify-center py-4 text-center transition-colors"
            >
              <Icon
                className={`h-6 w-6 mb-1 ${
                  isActive ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                }`}
              />
              <span
                className={`text-xs font-semibold ${
                  isActive ? "text-slate-900" : "text-slate-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
