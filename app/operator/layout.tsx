"use client"

import { ReactNode } from "react"
import { OperatorBottomNav } from "@/components/operator/bottom-nav"
import { OperatorSidebar } from "@/components/operator/sidebar"

export default function OperatorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <OperatorSidebar />
      <div className="md:ml-64">
        {children}
      </div>
      <OperatorBottomNav />
    </>
  )
}
