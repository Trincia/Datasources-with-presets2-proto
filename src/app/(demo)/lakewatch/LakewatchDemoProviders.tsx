"use client"

import * as React from "react"
import {
  LakewatchPrototypeVariantProvider,
} from "@/components/lakewatch/lakewatch-prototype-variant"
import { LakewatchVariantToggle } from "@/components/lakewatch/LakewatchVariantToggle"

export default function LakewatchDemoProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LakewatchPrototypeVariantProvider>
      {children}
      <LakewatchVariantToggle />
    </LakewatchPrototypeVariantProvider>
  )
}
