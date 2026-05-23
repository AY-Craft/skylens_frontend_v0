"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  LogOut,
  MapPin,
  Settings,
  UserCircle,
  AlertCircle,
  TrendingUp,
  Clock,
  MapPinCheck,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const upcomingMissions = [
  {
    id: 1,
    venue: "Grand Ballroom",
    location: "Downtown Plaza",
    time: "10:30 AM",
    status: "confirmed",
    package: "Premium Aerial Tour",
    revenue: "$450",
  },
  {
    id: 2,
    venue: "Ocean Terrace",
    location: "Coastal Drive",
    time: "2:00 PM",
    status: "confirmed",
    package: "30-min Cinematic",
    revenue: "$350",
  },
  {
    id: 3,
    venue: "Garden Suite",
    location: "North Park",
    time: "4:30 PM",
    status: "pending",
    package: "15-min Standard",
    revenue: "$180",
  },
]

const performanceMetrics = [
  {
    label: "Flights This Week",
    value: "8",
    icon: TrendingUp,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    trend: "+2 from last week",
  },
  {
    label: "On-Time Completion",
    value: "98%",
    icon: CheckCircle2,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    trend: "Perfect record",
  },
  {
    label: "Avg. Flight Time",
    value: "42 min",
    icon: Clock,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    trend: "Within targets",
  },
]

export function DashboardOperator() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/operator/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-32 md:pb-8">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="/operator/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-800">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">SkyLens</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/operator/dashboard"
              className="text-sm font-medium text-slate-900 hover:text-slate-700 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/operator/missions"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              My Missions
            </Link>
            <Link
              href="/operator/earnings"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              Earnings
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
            </button>

            {/* Avatar dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2">
                  <Avatar className="h-9 w-9 bg-gradient-to-br from-slate-700 to-slate-900">
                    <AvatarFallback className="text-white text-sm font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left md:block">
                    <div className="text-sm font-semibold text-slate-900">John Doe</div>
                    <div className="text-xs text-slate-500">Drone Operator</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400 hidden md:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl p-4 md:p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, John!</h1>
          <p className="text-slate-600 mt-1">You have 3 missions scheduled for today</p>
        </div>

        {/* Alert Banner */}
        <div className="mb-6 rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-900">Weather Alert</p>
            <p className="text-sm text-amber-800 mt-1">
              Moderate winds expected at 2:00 PM. Your 4:30 PM mission may be affected. We&apos;ll notify you of changes.
            </p>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {performanceMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{metric.label}</p>
                  <p className="text-xs text-slate-500 mt-1">{metric.trend}</p>
                </div>
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    metric.iconBg
                  )}
                >
                  <metric.icon className={cn("h-5 w-5", metric.iconColor)} />
                </div>
              </div>
              <div className="mt-3 text-3xl font-bold text-slate-900">{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Upcoming Missions */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900">Today&apos;s Missions</h2>
          </div>

          <div className="divide-y divide-slate-100">
            {upcomingMissions.map((mission, index) => (
              <Link
                key={mission.id}
                href={`/operator/mission/${mission.id}`}
                className="group flex items-center gap-4 p-6 hover:bg-slate-50 transition"
              >
                {/* Status Indicator */}
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0",
                    mission.status === "confirmed"
                      ? "bg-emerald-100"
                      : "bg-amber-100"
                  )}
                >
                  {mission.status === "confirmed" ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  ) : (
                    <Clock className="h-6 w-6 text-amber-600" />
                  )}
                </div>

                {/* Mission Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-slate-900">{mission.venue}</p>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        mission.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      )}
                    >
                      {mission.status === "confirmed" ? "Confirmed" : "Pending"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {mission.location}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">{mission.package}</p>
                </div>

                {/* Time and Revenue */}
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-slate-900">{mission.time}</p>
                  <p className="text-sm font-semibold text-emerald-600 mt-1">{mission.revenue}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="border-t border-slate-200 p-6">
            <Link
              href="/operator/missions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700 transition"
            >
              View all missions
              <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/operator/verify-qr"
            className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md hover:border-slate-300 transition"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <MapPinCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Verify Arrival</h3>
                <p className="text-xs text-slate-600 mt-1">Scan QR code to confirm location</p>
              </div>
            </div>
          </Link>

          <Link
            href="/operator/settings"
            className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md hover:border-slate-300 transition"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                <Settings className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Settings</h3>
                <p className="text-xs text-slate-600 mt-1">Manage your profile & preferences</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
