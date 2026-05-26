"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { MapPin, Clock, DollarSign, Search, SortAsc, CheckCircle2, AlertCircle, Eye } from "lucide-react"

interface Mission {
  id: string
  name: string
  venue: string
  date: string
  time: string
  duration: string
  price: number
  status: "upcoming" | "in-progress" | "completed"
  client: string
  location: {
    lat: number
    lng: number
  }
}

const mockMissions: Mission[] = [
  {
    id: "1",
    name: "Wedding Ceremony",
    venue: "The Elegant Mansion",
    date: "2024-05-20",
    time: "15:00",
    duration: "2h",
    price: 450,
    status: "upcoming",
    client: "Sarah & John",
    location: { lat: 40.758, lng: -73.9855 },
  },
  {
    id: "2",
    name: "Corporate Event",
    venue: "Downtown Plaza",
    date: "2024-05-20",
    time: "18:00",
    duration: "1.5h",
    price: 350,
    status: "upcoming",
    client: "Tech Corp Inc",
    location: { lat: 40.712, lng: -74.0055 },
  },
  {
    id: "3",
    name: "Engagement Party",
    venue: "Garden Restaurant",
    date: "2024-05-19",
    time: "17:00",
    duration: "2.5h",
    price: 500,
    status: "completed",
    client: "Emma & Mike",
    location: { lat: 40.714, lng: -73.995 },
  },
  {
    id: "4",
    name: "Real Estate Tour",
    venue: "Luxury Penthouse",
    date: "2024-05-21",
    time: "10:00",
    duration: "1h",
    price: 300,
    status: "upcoming",
    client: "Prime Realty",
    location: { lat: 40.756, lng: -73.988 },
  },
  {
    id: "5",
    name: "Family Reunion",
    venue: "Central Park",
    date: "2024-05-22",
    time: "12:00",
    duration: "3h",
    price: 600,
    status: "upcoming",
    client: "The Johnson Family",
    location: { lat: 40.785, lng: -73.968 },
  },
]

type SortField = "date" | "price" | "duration" | "status"
type SortOrder = "asc" | "desc"

export default function MissionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | Mission["status"]>("all")
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")

  const filteredAndSortedMissions = useMemo(() => {
    let result = [...mockMissions]

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (mission) =>
          mission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mission.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mission.client.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((mission) => mission.status === statusFilter)
    }

    // Sort
    result.sort((a, b) => {
      let compareValue = 0

      switch (sortField) {
        case "date":
          compareValue = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case "price":
          compareValue = a.price - b.price
          break
        case "duration":
          const aDuration = parseInt(a.duration)
          const bDuration = parseInt(b.duration)
          compareValue = aDuration - bDuration
          break
        case "status":
          const statusOrder = { upcoming: 0, "in-progress": 1, completed: 2 }
          compareValue =
            statusOrder[a.status] - statusOrder[b.status]
          break
      }

      return sortOrder === "asc" ? compareValue : -compareValue
    })

    return result
  }, [searchQuery, statusFilter, sortField, sortOrder])

  const getStatusColor = (status: Mission["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "in-progress":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pb-32 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Missions</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Manage and track your drone missions
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Filters & Search */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search missions, venues, or clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-slate-900 placeholder-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder-slate-400"
            />
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setStatusFilter("all")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  statusFilter === "all"
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-900"
                }`}
              >
                All Missions
              </button>
              <button
                onClick={() => setStatusFilter("upcoming")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  statusFilter === "upcoming"
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-900"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setStatusFilter("completed")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  statusFilter === "completed"
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-900"
                }`}
              >
                Completed
              </button>
            </div>

            {/* Sort Controls */}
            <div className="flex gap-2">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
                <option value="duration">Sort by Duration</option>
                <option value="status">Sort by Status</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
                title={`Sort ${sortOrder === "asc" ? "ascending" : "descending"}`}
              >
                <SortAsc
                  className="h-5 w-5"
                  style={{
                    transform: sortOrder === "desc" ? "scaleY(-1)" : "none",
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Missions Grid */}
        {filteredAndSortedMissions.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-950">
            <AlertCircle className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600 mb-4" />
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              No missions found
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {filteredAndSortedMissions.map((mission) => (
              <Link
                key={mission.id}
                href={`/operator/mission/${mission.id}`}
                className="group block rounded-lg border border-slate-200 bg-white p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {mission.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="h-4 w-4" />
                      {mission.venue}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(
                      mission.status
                    )}`}
                  >
                    {mission.status === "in-progress" ? "In Progress" : mission.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                      Date & Time
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">
                      {new Date(mission.date).toLocaleDateString()} {mission.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                      Duration
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {mission.duration}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                      Price
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {mission.price}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                      Client
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">
                      {mission.client}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Coordinates: {mission.location.lat}, {mission.location.lng}
                  </div>
                  <Eye className="h-4 w-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
