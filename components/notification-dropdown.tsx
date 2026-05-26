"use client"

import { useState } from "react"
import { Bell, X, CheckCircle2, AlertCircle, Info, Clock } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "success" | "error" | "info" | "warning"
  timestamp: Date
  read: boolean
  actionUrl?: string
}

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Mission Completed",
      message: "Wedding Ceremony at The Elegant Mansion has been completed successfully",
      type: "success",
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      actionUrl: "/operator/mission/1",
    },
    {
      id: "2",
      title: "New Booking",
      message: "You have a new booking for Corporate Event on May 25th",
      type: "info",
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
      actionUrl: "/operator/missions",
    },
    {
      id: "3",
      title: "Weather Alert",
      message: "Wind speed exceeding 20 mph at your scheduled mission location",
      type: "warning",
      timestamp: new Date(Date.now() - 45 * 60000),
      read: false,
    },
    {
      id: "4",
      title: "Payment Received",
      message: "$450 from Sarah & John for Wedding Ceremony has been received",
      type: "success",
      timestamp: new Date(Date.now() - 120 * 60000),
      read: true,
    },
    {
      id: "5",
      title: "System Update",
      message: "New features have been added to the operator dashboard",
      type: "info",
      timestamp: new Date(Date.now() - 240 * 60000),
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      case "info":
        return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      default:
        return <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900"
      case "error":
        return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
      case "warning":
        return "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900"
      case "info":
        return "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900"
      default:
        return "bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800"
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

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="relative">
      {/* Mobile Backdrop - closes dropdown when clicked */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center justify-center h-10 w-10 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 transition"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="fixed md:absolute bottom-20 md:bottom-auto right-4 md:right-0 mt-2 w-80 max-w-[calc(100vw-32px)] md:max-w-[320px] rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 py-3">
            <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="mx-auto h-10 w-10 text-slate-400 dark:text-slate-600 mb-3" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  No notifications yet
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => {
                      if (!notification.read) markAsRead(notification.id)
                      if (notification.actionUrl) {
                        window.location.href = notification.actionUrl
                      }
                    }}
                    className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer transition ${
                      !notification.read
                        ? "bg-blue-50 dark:bg-blue-950/20"
                        : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm font-semibold ${
                            !notification.read
                              ? "text-slate-900 dark:text-white"
                              : "text-slate-700 dark:text-slate-300"
                          }`}>
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                            )}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                          {notification.message}
                        </p>

                        <div className="flex items-center gap-1 mt-2 text-xs text-slate-500 dark:text-slate-500">
                          <Clock className="h-3 w-3" />
                          {formatTime(notification.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 px-4 py-3 text-center">
              <a
                href="/operator/notifications"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                View all notifications
              </a>
            </div>
          )}
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  )
}
