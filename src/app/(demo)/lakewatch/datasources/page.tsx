import Link from "next/link"
import { LakewatchAppShell } from "@/components/lakewatch"
import { Button } from "@/components/ui/button"

export default function LakewatchDatasourcesPage() {
  return (
    <LakewatchAppShell activeItem="datasources" workspace="Production" userInitial="J">
      <div className="flex flex-1 flex-col gap-4 p-8">
        <h1 className="text-lg font-semibold text-foreground">Datasources</h1>
        <p className="text-sm text-muted-foreground">
          Prototype list view — use the ingest flow to add a datasource.
        </p>
        <Button variant="primary" size="sm" className="w-fit" asChild>
          <Link href="/lakewatch/datasources/ingest">Add datasource</Link>
        </Button>
      </div>
    </LakewatchAppShell>
  )
}
