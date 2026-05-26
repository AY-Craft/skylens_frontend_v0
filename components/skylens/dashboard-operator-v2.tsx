"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  MapPin,
  Zap,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle2,
  Drone,
  Cloud,
  Wind,
  Eye,
} from "lucide-react"

interface Notification {
  id: string
  type: "info" | "warning" | "success"
  title: string
  description: string
  timestamp: string
  read: boolean
}

export function DashboardOperator() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Mission Completed",
      description: 'Wedding at "The Venue" - All footage uploaded successfully',
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "info",
      title: "New Mission Available",
      description: "Corporate Event - $450 | Next Sunday",
      timestamp: "4 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "warning",
      title: "Drone Battery Low",
      description: "Please check battery status before next mission",
      timestamp: "1 day ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Welcome back, Alex Operator
            </p>
          </div>

          {/* Notification Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <Bell className="h-6 w-6 text-slate-600 dark:text-slate-400" />
              {unreadCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-96 rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950">
                <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-slate-600 dark:text-slate-400">
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={`border-b border-slate-100 px-4 py-3 transition-colors dark:border-slate-800 ${
                          notif.read
                            ? "bg-white dark:bg-slate-950"
                            : "bg-blue-50 dark:bg-blue-950/30"
                        } cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900`}
                      >
                        <div className="flex gap-3">
                          <div>
                            {notif.type === "success" && (
                              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                            )}
                            {notif.type === "warning" && (
                              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            )}
                            {notif.type === "info" && (
                              <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {notif.title}
                            </p>
                            <p className="truncate text-sm text-slate-600 dark:text-slate-400">
                              {notif.description}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                              {notif.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 pb-32 md:pb-8">
        {/* Top KPIs */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Flights This Week
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  4
                </p>
              </div>
              <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  On-Time Rate
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  98%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Avg. Flight Time
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  45m
                </p>
              </div>
              <Clock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Earnings
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  $2,450
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Venue & Drone Panels */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Current Venue */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Current Venue
              </h2>
              <MapPin className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                  Venue Name
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  The Elegant Mansion
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Location
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    123 Park Ave, NYC
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Takeoff Point
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Main Lawn
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Coordinates
                  </p>
                  <p className="text-xs font-mono text-slate-700 dark:text-slate-300">
                    40.7580°N, 73.9855°W
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Max Altitude
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    120 ft AGL
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
                <p className="text-xs text-blue-900 dark:text-blue-200">
                  ✓ Venue QR verified | Ready for mission
                </p>
              </div>
            </div>
          </div>

          {/* Drone Details */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Active Drone
              </h2>
              <Drone className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                  Model
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  DJI Air 3S
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Battery
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-2 w-8 rounded-full bg-green-500"></div>
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                      92%
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Camera
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                    48MP
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Signal
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                    Excellent
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2">
                  Flight Time
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Total: 45h 23m | This Session: 12m
                </p>
              </div>

              <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950/30">
                <p className="text-xs text-green-900 dark:text-green-200">
                  ✓ All systems operational
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Alerts & Today's Missions */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Weather */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Weather
              </h2>
              <Cloud className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Temperature</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  72°F
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Wind Speed</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  8 mph
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  <Wind className="inline h-4 w-4 mr-1" /> Wind Gusts
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  12 mph
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Visibility</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  10 miles
                </span>
              </div>
              <div className="mt-3 rounded-lg bg-green-50 p-3 dark:bg-green-950/30">
                <p className="text-xs text-green-900 dark:text-green-200">
                  ✓ Optimal flying conditions
                </p>
              </div>
            </div>
          </div>

          {/* Today's Missions */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Today's Missions
              </h2>
              <Zap className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>

            <div className="space-y-3">
              <Link
                href="/operator/mission/1"
                className="block rounded-lg border border-slate-200 p-3 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Wedding Ceremony
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      3:00 PM - The Garden Venue
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Scheduled
                  </span>
                </div>
              </Link>

              <Link
                href="/operator/mission/2"
                className="block rounded-lg border border-slate-200 p-3 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Corporate Event
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      6:00 PM - Downtown Plaza
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    Pending
                  </span>
                </div>
              </Link>

              <Link
                href="/operator/missions"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Eye className="h-4 w-4" />
                View All Missions
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
