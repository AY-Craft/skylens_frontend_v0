"use client"

import { useEffect, useRef, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { CheckCircle2, X, QrCode } from "lucide-react"
import { cn } from "@/lib/utils"

interface QRScannerProps {
  onScan?: (decodedText: string) => void
  onError?: (error: string) => void
}

export function QRScanner({ onScan, onError }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scannedResult, setScannedResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: true,
    }

    const html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", config, false)

    scannerRef.current = html5QrcodeScanner

    const onScanSuccess = (decodedText: string) => {
      setScannedResult(decodedText)
      setError(null)
      onScan?.(decodedText)

      // Stop scanning after successful scan
      html5QrcodeScanner.pause()
      setIsScanning(false)
    }

    const onScanError = (errorMessage: string) => {
      // Silently ignore scanning errors to avoid spam
    }

    html5QrcodeScanner.render(onScanSuccess, onScanError)
    setIsScanning(true)

    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.clear()
        } catch (err) {
          console.error("[v0] Error cleaning up QR scanner:", err)
        }
      }
    }
  }, [onScan])

  const handleResume = () => {
    if (scannerRef.current) {
      scannerRef.current.resume()
      setIsScanning(true)
      setScannedResult(null)
      setError(null)
    }
  }

  const handleStop = () => {
    if (scannerRef.current) {
      scannerRef.current.pause()
      setIsScanning(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* QR Scanner Container */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50">
        <div id="qr-reader" className="w-full" />

        {/* Focus Area Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            viewBox="0 0 250 250"
            className="absolute inset-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 text-slate-300 opacity-30"
          >
            {/* Corner brackets */}
            <g strokeWidth="2" fill="none" stroke="currentColor">
              {/* Top-left */}
              <path d="M 20 20 L 20 60 M 20 20 L 60 20" />
              {/* Top-right */}
              <path d="M 230 20 L 230 60 M 230 20 L 190 20" />
              {/* Bottom-left */}
              <path d="M 20 230 L 20 190 M 20 230 L 60 230" />
              {/* Bottom-right */}
              <path d="M 230 230 L 230 190 M 230 230 L 190 230" />
            </g>

            {/* Center circle */}
            <circle cx="125" cy="125" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="125" cy="125" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* Scanning line animation */}
          {isScanning && (
            <div className="absolute inset-1/2 h-0.5 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-slate-700">Position QR code in the frame</p>
        <p className="text-xs text-slate-500 mt-1">Make sure the code is fully visible and well-lit</p>
      </div>

      {/* Scanned Result */}
      {scannedResult && (
        <div className="mt-6 w-full max-w-sm rounded-xl bg-emerald-50 border border-emerald-200 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-emerald-900">QR Code Scanned</p>
              <p className="text-xs text-emerald-700 mt-1 break-all font-mono">{scannedResult}</p>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="mt-6 flex gap-3 w-full max-w-sm">
        {isScanning ? (
          <button
            onClick={handleStop}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 transition"
          >
            <X className="h-4 w-4" />
            Stop Scanning
          </button>
        ) : (
          <button
            onClick={handleResume}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 transition"
          >
            <QrCode className="h-4 w-4" />
            Resume Scan
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 w-full max-w-sm rounded-lg bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-700 font-medium">Error: {error}</p>
        </div>
      )}
    </div>
  )
}
