"use client"

import { Download, Map, Eye } from "lucide-react"

interface WaypointTemplate {
  id: string
  name: string
  venue: string
  points: number
  flightTime: string
  altitude: string
  description: string
  dateCreated: string
}

const mockTemplates: WaypointTemplate[] = [
  {
    id: "1",
    name: "Wedding Standard Tour",
    venue: "The Elegant Mansion",
    points: 8,
    flightTime: "15 min",
    altitude: "120 ft AGL",
    description: "Standard wedding coverage with approach, main venue, and departure sequences",
    dateCreated: "2024-05-01",
  },
  {
    id: "2",
    name: "Real Estate 360",
    venue: "Luxury Penthouse",
    points: 12,
    flightTime: "18 min",
    altitude: "250 ft AGL",
    description: "Complete 360-degree tour of property with interior and exterior passes",
    dateCreated: "2024-04-28",
  },
  {
    id: "3",
    name: "Corporate Event Flyover",
    venue: "Downtown Plaza",
    points: 6,
    flightTime: "10 min",
    altitude: "100 ft AGL",
    description: "Quick corporate event coverage with key areas highlighted",
    dateCreated: "2024-04-25",
  },
  {
    id: "4",
    name: "Garden Tour Extended",
    venue: "Central Park",
    points: 15,
    flightTime: "22 min",
    altitude: "180 ft AGL",
    description: "Extended garden and landscape coverage with detailed waypoints",
    dateCreated: "2024-04-20",
  },
]

export default function WaypointTemplatesPage() {
  const downloadKMZ = (templateId: string, templateName: string) => {
    // Create a mock KMZ file download
    const kmzContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>${templateName}</name>
    <Folder>
      <name>Waypoints</name>
      <!-- Waypoint data would be populated here -->
    </Folder>
  </Document>
</kml>`

    const blob = new Blob([kmzContent], { type: "application/vnd.google-earth.kmz" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${templateName.replace(/\s+/g, "_")}.kmz`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pb-32 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Waypoint Templates
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Download .kmz files to import into your DJI drone
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Info Box */}
        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>How to use:</strong> Download the .kmz file and import it into your DJI drone's
            mission planning software. Each template contains optimized waypoints for specific
            venue types.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {mockTemplates.map((template) => (
            <div
              key={template.id}
              className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {template.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {template.venue}
                  </p>
                </div>
                <Map className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                {template.description}
              </p>

              <div className="mb-4 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Waypoints
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {template.points}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Flight Time
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {template.flightTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    Altitude
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {template.altitude}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">
                Created: {new Date(template.dateCreated).toLocaleDateString()}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => downloadKMZ(template.id, template.name)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 transition"
                >
                  <Download className="h-4 w-4" />
                  Download .kmz
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 transition">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            About Waypoint Templates
          </h3>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              Waypoint templates are pre-planned drone flight paths optimized for specific venue
              types. Each template includes:
            </p>
            <ul className="list-inside list-disc space-y-1 ml-2">
              <li>Pre-calculated GPS waypoints</li>
              <li>Optimal altitude settings</li>
              <li>Estimated flight time and battery consumption</li>
              <li>Safety margins and no-fly zone considerations</li>
              <li>Cinematic camera movements and speeds</li>
            </ul>
            <p className="pt-2">
              Simply download the .kmz file and import it into your DJI controller app before
              starting your mission.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
