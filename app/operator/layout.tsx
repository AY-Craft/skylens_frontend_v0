"use client"

import { ReactNode } from "react"
import { OperatorBottomNav } from "@/components/operator/bottom-nav"

export default function OperatorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <OperatorBottomNav />
    </>
  )
}
