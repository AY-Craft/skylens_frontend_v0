"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Navigation,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Camera,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MissionDetailPageProps {
  params: {
    id: string
  }
}

export default function MissionDetailPage({ params }: MissionDetailPageProps) {
  const router = useRouter()

  // Mock mission data - in real app, fetch from API
  const mission = {
    id: params.id,
    venue: "Grand Ballroom",
    location: "Downtown Plaza, City Center",
    coords: { lat: 40.7128, lng: -74.006 },
    package: "Premium Aerial Tour",
    startTime: "10:30 AM",
    endTime: "11:15 AM",
    duration: "45 min",
    revenue: "$450",
    status: "in-progress",
    contact: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@example.com",
    },
    deliverables: [
      { id: 1, name: "Raw Footage", status: "pending" },
      { id: 2, name: "Color-Graded Video", status: "pending" },
      { id: 3, name: "Aerial Photos", status: "pending" },
      { id: 4, name: "Highlight Reel", status: "pending" },
    ],
    timeline: [
      { time: "10:30 AM", action: "Mission Started", status: "completed" },
      { time: "10:35 AM", action: "Arrived at Venue", status: "completed" },
      { time: "11:15 AM", action: "Mission Ends", status: "pending" },
      { time: "11:45 AM", action: "Upload Footage", status: "pending" },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-32 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-4xl items-center gap-4 px-4 md:px-8">
          <button
            onClick={() => router.back()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4 text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900">{mission.venue}</h1>
            <p className="text-xs text-slate-500">Mission #{mission.id}</p>
          </div>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
              mission.status === "in-progress"
                ? "bg-blue-100 text-blue-700"
                : "bg-emerald-100 text-emerald-700"
            )}
          >
            {mission.status === "in-progress" ? "In Progress" : "Completed"}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl p-4 md:p-8">
        {/* Mission Status */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-blue-900">Mission in Progress</p>
              <p className="text-sm text-blue-800 mt-1">
                You are currently on this mission. Upload footage when complete.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Overview Grid */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-medium text-slate-600">Location</p>
            <p className="text-sm font-bold text-slate-900 mt-2 flex items-start gap-1">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{mission.location}</span>
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-medium text-slate-600">Time</p>
            <p className="text-sm font-bold text-slate-900 mt-2 flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {mission.startTime} - {mission.endTime}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-medium text-slate-600">Duration</p>
            <p className="text-sm font-bold text-slate-900 mt-2 flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {mission.duration}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-medium text-slate-600">Revenue</p>
            <p className="text-sm font-bold text-emerald-600 mt-2 flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              {mission.revenue}
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Details */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Package Details</h2>
              <p className="text-slate-600 mb-4">{mission.package}</p>
              <p className="text-sm text-slate-500">
                This includes aerial photography and cinematic footage of the venue from multiple angles and altitudes.
              </p>
            </div>

            {/* Deliverables */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Deliverables</h2>
              <div className="space-y-3">
                {mission.deliverables.map((deliverable) => (
                  <div
                    key={deliverable.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50"
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0",
                        deliverable.status === "completed"
                          ? "bg-emerald-100"
                          : "bg-slate-200"
                      )}
                    >
                      {deliverable.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Camera className="h-4 w-4 text-slate-600" />
                      )}
                    </div>
                    <span className="font-medium text-slate-900">{deliverable.name}</span>
                    <span
                      className={cn(
                        "ml-auto text-xs font-semibold px-2 py-1 rounded",
                        deliverable.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      )}
                    >
                      {deliverable.status === "completed" ? "Done" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission Timeline */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Timeline</h2>
              <div className="space-y-3">
                {mission.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0",
                          event.status === "completed"
                            ? "bg-emerald-100"
                            : "bg-slate-200"
                        )}
                      >
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full",
                            event.status === "completed"
                              ? "bg-emerald-600"
                              : "bg-slate-400"
                          )}
                        />
                      </div>
                      {index < mission.timeline.length - 1 && (
                        <div className="h-8 w-0.5 bg-slate-200 my-1" />
                      )}
                    </div>
                    <div className="py-1">
                      <p className="font-semibold text-slate-900">{event.action}</p>
                      <p className="text-xs text-slate-500">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900 mb-4">Client Contact</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-slate-600">Name</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {mission.contact.name}
                  </p>
                </div>
                <a
                  href={`tel:${mission.contact.phone}`}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
                >
                  <Phone className="h-4 w-4 text-slate-600" />
                  <span className="text-sm text-slate-700">{mission.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${mission.contact.email}`}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
                >
                  <Mail className="h-4 w-4 text-slate-600" />
                  <span className="text-sm text-slate-700 truncate">{mission.contact.email}</span>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900 mb-4">Navigation</h3>
              <a
                href={`https://maps.google.com/?q=${mission.coords.lat},${mission.coords.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold transition"
              >
                <Navigation className="h-4 w-4" />
                Open in Maps
              </a>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900 mb-4">Actions</h3>
              <Link
                href="/operator/upload-footage"
                className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition"
              >
                <Camera className="h-4 w-4" />
                Upload Footage
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
