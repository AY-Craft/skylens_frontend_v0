"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Drone,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Camera,
  Play,
  Square,
  UploadCloud,
  X,
} from "lucide-react"

interface MissionDetailPageProps {
  params: {
    id: string
  }
}

export default function MissionDetailPage({ params }: MissionDetailPageProps) {
  const router = useRouter()
  const [missionStatus, setMissionStatus] = useState("scheduled")
  const [showDronePreview, setShowDronePreview] = useState(false)
  const [deliverableStatus, setDeliverableStatus] = useState<Record<number, string>>({
    1: "pending",
    2: "pending",
    3: "pending",
    4: "pending",
  })

  // Mock mission data
  const mission = {
    id: params.id,
    name: "Wedding Ceremony",
    venue: "The Elegant Mansion",
    location: "123 Park Ave, NYC",
    coords: { lat: 40.7580, lng: -73.9855 },
    package: "Premium Aerial Tour",
    date: "2024-05-20",
    time: "15:00",
    endTime: "17:00",
    duration: "2h",
    revenue: "$450",
    contact: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@example.com",
    },
  }

  const deliverables = [
    {
      id: 1,
      title: "Footage Uploaded",
      description: "Raw drone footage captured",
      icon: "📹",
      stage: 1,
    },
    {
      id: 2,
      title: "Analysing",
      description: "Analyzing footage quality and metadata",
      icon: "🔍",
      stage: 2,
    },
    {
      id: 3,
      title: "Editing Video",
      description: "Professional editing and color grading",
      icon: "✂️",
      stage: 3,
    },
    {
      id: 4,
      title: "QC Checking",
      description: "Quality control and final review",
      icon: "✓",
      stage: 4,
    },
    {
      id: 5,
      title: "Delivery to Customer",
      description: "Final video delivered to client",
      icon: "🎬",
      stage: 5,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "pending":
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pb-32 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-8">
          <button
            onClick={() => router.back()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 transition"
          >
            <ArrowLeft className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              {mission.name}
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Mission #{mission.id} • {mission.venue}
            </p>
          </div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(
              missionStatus
            )}`}
          >
            {missionStatus === "in-progress" ? "In Progress" : missionStatus}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mission Status Alert */}
            {missionStatus !== "completed" && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900 dark:text-blue-200">
                      {missionStatus === "scheduled"
                        ? "Upcoming Mission"
                        : "Mission in Progress"}
                    </p>
                    <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">
                      {missionStatus === "scheduled"
                        ? "Review details and prepare your drone."
                        : "Capture high-quality footage. Upload when complete."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Mission Details Card */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Mission Details
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Date & Time
                  </p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white mt-1">
                    {new Date(mission.date).toLocaleDateString()} at {mission.time}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Duration: {mission.duration}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Location
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      {mission.location}
                    </p>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {mission.coords.lat}, {mission.coords.lng}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Package
                  </p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white mt-1">
                    {mission.package}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Revenue
                  </p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400 mt-1">
                    {mission.revenue}
                  </p>
                </div>
              </div>
            </div>

            {/* Drone Mission Preview */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Drone Mission Preview
              </h2>
              <div className="rounded-lg border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-900 p-12 text-center">
                <Drone className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-600 mb-4" />
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Flight path visualization and waypoint preview
                </p>
                <button
                  onClick={() => setShowDronePreview(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition"
                >
                  <Drone className="h-4 w-4" />
                  View Mission Preview
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Mission Actions
              </h2>
              <div className="flex flex-wrap gap-3">
                {missionStatus === "scheduled" && (
                  <button
                    onClick={() => setMissionStatus("in-progress")}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700 dark:hover:bg-green-500 transition"
                  >
                    <Play className="h-4 w-4" />
                    Start Mission
                  </button>
                )}

                {missionStatus === "in-progress" && (
                  <>
                    <button
                      onClick={() => setMissionStatus("completed")}
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Complete Mission
                    </button>
                    <button
                      onClick={() => setMissionStatus("cancelled")}
                      className="flex items-center gap-2 rounded-lg border border-red-600 px-6 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition"
                    >
                      <Square className="h-4 w-4" />
                      Abort Mission
                    </button>
                  </>
                )}

                {missionStatus === "completed" && (
                  <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition">
                    <UploadCloud className="h-4 w-4" />
                    Upload Footage
                  </button>
                )}
              </div>
            </div>

            {/* Deliverables Timeline */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Deliverables Timeline
              </h2>

              <div className="space-y-4">
                {deliverables.map((item, idx) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                        {item.icon}
                      </div>
                      {idx < deliverables.length - 1 && (
                        <div className="h-8 w-0.5 bg-slate-200 dark:bg-slate-800"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2 pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {item.title}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {item.description}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(
                            deliverableStatus[item.id] || "pending"
                          )}`}
                        >
                          {deliverableStatus[item.id] || "pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Client Contact
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Name
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                    {mission.contact.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Phone
                  </p>
                  <a
                    href={`tel:${mission.contact.phone}`}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mt-1 flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    {mission.contact.phone}
                  </a>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Email
                  </p>
                  <a
                    href={`mailto:${mission.contact.email}`}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mt-1 flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    {mission.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Quick Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Status</span>
                  <span className="font-semibold text-slate-900 dark:text-white capitalize">
                    {missionStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Weather
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Fair ✓
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Airspace
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Clear ✓
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Drone Preview Modal */}
      {showDronePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white dark:bg-slate-950 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Drone Mission Preview
              </h3>
              <button
                onClick={() => setShowDronePreview(false)}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="rounded-lg border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-900 p-16 text-center">
                <Drone className="mx-auto h-24 w-24 text-slate-400 dark:text-slate-600 mb-4" />
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Flight path visualization with waypoints and mission parameters
                </p>
                <div className="space-y-2 text-left bg-white dark:bg-slate-950 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Waypoints:</strong> 8
                  </p>
                  <p className="text-sm">
                    <strong>Flight Time:</strong> 15 minutes
                  </p>
                  <p className="text-sm">
                    <strong>Max Altitude:</strong> 120 ft AGL
                  </p>
                  <p className="text-sm">
                    <strong>Coverage Area:</strong> 2.5 acres
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 border-t border-slate-200 dark:border-slate-800 p-6">
              <button
                onClick={() => setShowDronePreview(false)}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 transition"
              >
                Close
              </button>
              <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition">
                Download Waypoints
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
