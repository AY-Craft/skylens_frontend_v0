"use client"

import { useState } from "react"
import { Bell, CheckCircle2, AlertCircle, Info, Trash2, Archive } from "lucide-react"

interface NotificationItem {
  id: string
  title: string
  message: string
  type: "success" | "error" | "info" | "warning"
  timestamp: Date
  read: boolean
  actionUrl?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "Mission Completed",
      message: "Wedding Ceremony at The Elegant Mansion has been completed successfully. All footage has been uploaded to the server.",
      type: "success",
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      actionUrl: "/operator/mission/1",
    },
    {
      id: "2",
      title: "New Booking Request",
      message: "You have a new booking for Corporate Event on May 25th at Downtown Plaza. Client: Tech Corp Inc.",
      type: "info",
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
      actionUrl: "/operator/missions",
    },
    {
      id: "3",
      title: "Weather Alert",
      message: "Wind speed exceeding 20 mph at your scheduled mission location. Please check conditions before flying.",
      type: "warning",
      timestamp: new Date(Date.now() - 45 * 60000),
      read: false,
    },
    {
      id: "4",
      title: "Payment Received",
      message: "$450 from Sarah & John for Wedding Ceremony has been received. Your account balance is now $3,450.",
      type: "success",
      timestamp: new Date(Date.now() - 120 * 60000),
      read: true,
    },
    {
      id: "5",
      title: "System Update",
      message: "New features have been added to the operator dashboard including real-time notifications and mission analytics.",
      type: "info",
      timestamp: new Date(Date.now() - 240 * 60000),
      read: true,
    },
    {
      id: "6",
      title: "Drone Battery Low",
      message: "Battery level is at 25%. Recommend landing immediately to preserve battery health.",
      type: "warning",
      timestamp: new Date(Date.now() - 360 * 60000),
      read: true,
    },
  ])

  const [filterType, setFilterType] = useState<"all" | "unread" | "success" | "warning" | "info">("all")

  const filteredNotifications = notifications.filter((n) => {
    if (filterType === "all") return true
    if (filterType === "unread") return !n.read
    return n.type === filterType
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
      case "warning":
        return <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
      case "info":
        return <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      default:
        return <Bell className="h-6 w-6 text-slate-600 dark:text-slate-400" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pb-32 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Notifications
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {(["all", "unread", "success", "warning", "info"] as const).map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setFilterType(filter)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  filterType === filter
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-900"
                }`}
              >
                {filter === "all"
                  ? "All Notifications"
                  : filter === "unread"
                  ? "Unread"
                  : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-950">
              <Bell className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600 mb-4" />
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                No notifications
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                You&apos;re all caught up!
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex gap-4 rounded-lg border p-4 transition ${
                  !notification.read
                    ? "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20"
                    : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                } hover:shadow-md`}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-semibold ${
                      !notification.read
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-800 dark:text-slate-200"
                    }`}>
                      {notification.title}
                      {!notification.read && (
                        <span className="ml-2 inline-block h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                      )}
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-500 flex-shrink-0">
                      {formatTime(notification.timestamp)}
                    </span>
                  </div>

                  <p className={`text-sm ${
                    !notification.read
                      ? "text-slate-700 dark:text-slate-300"
                      : "text-slate-600 dark:text-slate-400"
                  }`}>
                    {notification.message}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-3">
                    {notification.actionUrl && (
                      <a
                        href={notification.actionUrl}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        View details
                      </a>
                    )}
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
