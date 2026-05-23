"use client"

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, MapPin, QrCode } from "lucide-react"
import { QRScanner } from "@/components/operator/qr-scanner"

export default function VerifyQRPage() {
  const router = useRouter()
  const [scannedData, setScannedData] = useState<string | null>(null)
  const [verificationSuccess, setVerificationSuccess] = useState(false)

  const handleQRScan = (decodedText: string) => {
    // Parse QR data - expecting venue ID
    console.log("[v0] QR Scanned:", decodedText)

    // Simulate venue lookup
    const venueId = decodedText.split(":")[-1] || decodedText

    // Simulate successful verification
    setScannedData(decodedText)
    setVerificationSuccess(true)

    // Auto redirect after 3 seconds
    setTimeout(() => {
      router.push("/operator/dashboard")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col pb-32 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition h-9 w-9"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4 text-slate-600" />
            </button>
            <h1 className="text-lg font-bold text-slate-900">Verify Arrival</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-md w-full p-4 md:max-w-2xl md:p-8 flex flex-col justify-center">
        {!verificationSuccess ? (
          <div>
            {/* Instructions */}
            <div className="mb-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Scan Venue QR Code</h2>
              <p className="text-slate-600 mt-2">
                Position your camera to scan the QR code at the venue entrance
              </p>
            </div>

            {/* QR Scanner */}
            <QRScanner
              onScan={handleQRScan}
              onError={(error) => console.error("[v0] QR Error:", error)}
            />

            {/* Additional Info */}
            <div className="mt-8 rounded-xl bg-blue-50 border border-blue-200 p-4">
              <h3 className="font-semibold text-blue-900 text-sm">Tips for better scanning:</h3>
              <ul className="text-sm text-blue-800 mt-2 space-y-1">
                <li>• Ensure adequate lighting at the venue</li>
                <li>• Hold your device steady</li>
                <li>• Keep the QR code fully within the frame</li>
                <li>• Avoid reflections on the screen</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Arrival Verified!</h2>
            <p className="text-slate-600 mb-6">
              Your location has been confirmed. Redirecting to dashboard...
            </p>

            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-left mb-6">
              <p className="text-sm text-emerald-900">
                <span className="font-semibold">Scanned QR:</span> {scannedData}
              </p>
            </div>

            <Link
              href="/operator/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-8 transition"
            >
              Return to Dashboard
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
