"use client"

import * as React from "react"
import { LakewatchAppShell } from "@/components/lakewatch"
import { useLakewatchPrototypeVariant } from "@/components/lakewatch/lakewatch-prototype-variant"
import { IngestVariant1 } from "./IngestVariant1"
import { IngestVariant2 } from "./IngestVariant2"

export default function LakewatchIngestPage() {
  const { variant, hydrated } = useLakewatchPrototypeVariant()

  return (
    <LakewatchAppShell activeItem="datasources" workspace="Production" userInitial="J">
      {!hydrated ? <IngestVariant1 /> : variant === 1 ? <IngestVariant1 /> : <IngestVariant2 />}
    </LakewatchAppShell>
  )
}
