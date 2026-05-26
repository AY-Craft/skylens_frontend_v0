"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"

interface CalendarMission {
  id: string
  title: string
  date: string
  time: string
  duration: string
  status: "scheduled" | "completed" | "cancelled"
  client: string
}

const mockMissions: CalendarMission[] = [
  {
    id: "1",
    title: "Wedding Ceremony",
    date: "2024-05-20",
    time: "15:00",
    duration: "2h",
    status: "scheduled",
    client: "Sarah & John",
  },
  {
    id: "2",
    title: "Corporate Event",
    date: "2024-05-20",
    time: "18:00",
    duration: "1.5h",
    status: "scheduled",
    client: "Tech Corp",
  },
  {
    id: "3",
    title: "Real Estate Tour",
    date: "2024-05-21",
    time: "10:00",
    duration: "1h",
    status: "scheduled",
    client: "Prime Realty",
  },
]

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 1)) // May 2024

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" })

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const getMissionsForDate = (day: number | null) => {
    if (!day) return []
    const dateStr = `2024-05-${String(day).padStart(2, "0")}`
    return mockMissions.filter((m) => m.date === dateStr)
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pb-32 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Schedule</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            View your missions and upcoming bookings
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 md:py-8 md:px-8">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          {/* Calendar */}
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950 md:p-6 lg:col-span-2">
            {/* Calendar Header */}
            <div className="mb-4 md:mb-6 flex items-center justify-between">
              <h2 className="text-base md:text-xl font-bold text-slate-900 dark:text-white">
                {monthName}
              </h2>
              <div className="flex gap-1 md:gap-2">
                <button
                  onClick={prevMonth}
                  className="rounded-lg p-1.5 md:p-2 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                </button>
                <button
                  onClick={nextMonth}
                  className="rounded-lg p-1.5 md:p-2 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="mb-2 md:mb-4 grid grid-cols-7 gap-0.5 md:gap-2 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-xs md:text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase py-1 md:py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-0.5 md:gap-2">
              {days.map((day, idx) => {
                const missions = day ? getMissionsForDate(day) : []
                const isToday =
                  day === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth()

                return (
                  <div
                    key={idx}
                    className={`min-h-16 md:min-h-24 rounded-lg border p-1 md:p-2 text-xs md:text-sm transition ${
                      day
                        ? "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                        : "border-slate-100 bg-slate-50 dark:border-slate-900 dark:bg-slate-900"
                    } ${isToday ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : ""}`}
                  >
                    {day && (
                      <>
                        <p
                          className={`mb-0.5 md:mb-1 font-semibold text-xs md:text-sm ${
                            isToday
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {day}
                        </p>
                        <div className="space-y-0.25 md:space-y-0.5">
                          {missions.slice(0, 2).map((mission) => (
                            <div
                              key={mission.id}
                              className="rounded bg-blue-100 p-0.5 text-xs text-blue-900 dark:bg-blue-900 dark:text-blue-100 truncate"
                              title={mission.title}
                            >
                              <p className="truncate font-medium text-xs">{mission.title}</p>
                            </div>
                          ))}
                          {missions.length > 2 && (
                            <p className="text-xs text-slate-600 dark:text-slate-400 px-0.5">
                              +{missions.length - 2}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sidebar - Upcoming Missions & Stats */}
          <div className="space-y-4 md:space-y-6">
            {/* Upcoming Missions */}
            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 md:p-6">
              <h3 className="mb-3 md:mb-4 text-sm md:text-lg font-bold text-slate-900 dark:text-white">
                Upcoming
              </h3>
              <div className="space-y-2 md:space-y-3 max-h-64 md:max-h-96 overflow-y-auto">
                {mockMissions
                  .filter((m) => m.status === "scheduled")
                  .map((mission) => (
                    <div
                      key={mission.id}
                      className="rounded-lg border border-slate-200 p-2 md:p-3 dark:border-slate-800"
                    >
                      <p className="font-semibold text-xs md:text-sm text-slate-900 dark:text-white">
                        {mission.title}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {new Date(mission.date).toLocaleDateString()} at {mission.time}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {mission.duration} • {mission.client}
                      </p>
                      <div className="mt-2 flex gap-1 md:gap-2">
                        <button className="flex-1 rounded bg-blue-600 py-1.5 md:py-2 text-xs font-medium text-white hover:bg-blue-700 transition">
                          Start
                        </button>
                        <button className="flex-1 rounded border border-slate-200 py-1.5 md:py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 transition">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 md:p-6">
              <h3 className="mb-3 md:mb-4 text-sm md:text-lg font-bold text-slate-900 dark:text-white">
                This Month
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                    Total
                  </span>
                  <span className="font-bold text-sm md:text-base text-slate-900 dark:text-white">
                    {mockMissions.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                    Scheduled
                  </span>
                  <span className="font-bold text-sm md:text-base text-blue-600 dark:text-blue-400">
                    {mockMissions.filter((m) => m.status === "scheduled").length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
