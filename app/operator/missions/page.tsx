"use client"

import Link from "next/link"
import { MapPin, Clock, DollarSign, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const activeMissions = [
  {
    id: 1,
    venue: "Grand Ballroom",
    location: "Downtown Plaza",
    startTime: "10:30 AM",
    duration: "45 min",
    revenue: "$450",
    status: "in-progress",
    package: "Premium Aerial Tour",
  },
  {
    id: 2,
    venue: "Ocean Terrace",
    location: "Coastal Drive",
    startTime: "2:00 PM",
    duration: "30 min",
    revenue: "$350",
    status: "confirmed",
    package: "30-min Cinematic",
  },
  {
    id: 3,
    venue: "Garden Suite",
    location: "North Park",
    startTime: "4:30 PM",
    duration: "25 min",
    revenue: "$180",
    status: "pending",
    package: "15-min Standard",
  },
]

const completedMissions = [
  {
    id: 101,
    venue: "Riverside Events",
    location: "Waterfront Ave",
    date: "Today at 8:00 AM",
    duration: "50 min",
    revenue: "$500",
    rating: 5,
  },
  {
    id: 102,
    venue: "Mountain Lodge",
    location: "Highland Peak",
    date: "Yesterday at 3:00 PM",
    duration: "40 min",
    revenue: "$400",
    rating: 4.8,
  },
]

export default function MissionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-32 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-8">
          <h1 className="text-lg font-bold text-slate-900">My Missions</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl p-4 md:p-8">
        {/* Active Missions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Active & Upcoming</h2>
          <div className="space-y-3">
            {activeMissions.map((mission) => (
              <Link
                key={mission.id}
                href={`/operator/mission/${mission.id}`}
                className="group block rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md hover:border-slate-300 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 group-hover:text-slate-700 transition">
                      {mission.venue}
                    </h3>
                    <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {mission.location}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                      mission.status === "in-progress"
                        ? "bg-blue-100 text-blue-700"
                        : mission.status === "confirmed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    )}
                  >
                    {mission.status === "in-progress"
                      ? "In Progress"
                      : mission.status === "confirmed"
                      ? "Confirmed"
                      : "Pending"}
                  </span>
                </div>

                <p className="text-sm text-slate-600 mb-3">{mission.package}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Clock className="h-3.5 w-3.5" />
                      {mission.startTime}
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <Clock className="h-3.5 w-3.5" />
                      {mission.duration}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-emerald-600">{mission.revenue}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Completed Missions */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Completed</h2>
          <div className="space-y-3">
            {completedMissions.map((mission) => (
              <div
                key={mission.id}
                className="rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{mission.venue}</h3>
                    <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {mission.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "text-lg",
                          i < Math.floor(mission.rating) ? "text-amber-400" : "text-slate-300"
                        )}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-500 mb-3">{mission.date}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-sm">
                    <div className="text-slate-600">{mission.duration}</div>
                  </div>
                  <div className="text-sm font-bold text-slate-400">{mission.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
