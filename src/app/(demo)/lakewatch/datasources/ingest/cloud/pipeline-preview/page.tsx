"use client"

import { LakewatchAppShell } from "@/components/lakewatch"
import { MedallionPipelineLoading } from "@/components/lakewatch/MedallionPipelineLoading"

export default function LakewatchPipelinePreviewLoadingPage() {
  return (
    <LakewatchAppShell activeItem="datasources" workspace="Production" userInitial="J">
      <MedallionPipelineLoading />
    </LakewatchAppShell>
  )
}
