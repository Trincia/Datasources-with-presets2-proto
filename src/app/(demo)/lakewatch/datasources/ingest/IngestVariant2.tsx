"use client"

import * as React from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DbIcon } from "@/components/ui/db-icon"
import { CatalogCloudIcon, GenieCodeIcon, TableIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const cardClass =
  "flex min-h-[160px] w-full max-w-[240px] flex-col items-center gap-3 rounded-[5px] border border-border bg-background p-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]"

const presetCardClass =
  "flex min-h-[96px] w-full max-w-[240px] flex-col items-center gap-2 rounded-[5px] border border-border bg-background p-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]"

const lakeflowCardClass =
  "flex min-h-[133px] w-full max-w-[240px] flex-col items-center justify-center gap-2 rounded-[5px] border border-border bg-background p-2.5 text-center shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]"

export function IngestVariant2() {
  const [warehouse, setWarehouse] = React.useState("dedemos-serverless")

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-col gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/lakewatch/datasources">Current datasources</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-[24px] font-semibold leading-none tracking-tight text-foreground">
              Ingest
            </h1>
          </div>

          <div className="shrink-0 sm:pt-1">
            <Select value={warehouse} onValueChange={setWarehouse}>
              <SelectTrigger className="h-8 min-w-[240px] rounded border-border font-normal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dedemos-serverless">dedemos-serverless</SelectItem>
                <SelectItem value="main-warehouse">main-warehouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Universal ingest and parsing — Figma 109:80731 */}
        <section className="flex flex-col gap-4">
          <div className="flex max-w-[1012px] flex-col gap-2">
            <div className="flex items-center gap-2">
              <DbIcon icon={GenieCodeIcon} color="ai" size={16} className="shrink-0" />
              <h2 className="text-lg font-semibold leading-6 text-foreground">
                Universal ingest and parsing
              </h2>
            </div>
            <p className="text-sm leading-5 text-foreground">
              Ingest and parse any datasource with support from Genie
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <Button type="button" variant="ghost" asChild className={cn(cardClass, "h-auto")}>
              <Link href="/lakewatch/datasources/ingest/cloud" className="flex flex-col items-center gap-3">
                <CatalogCloudIcon size={35} className="shrink-0 text-muted-foreground" />
                <div className="flex flex-col gap-1.5 px-3 text-center">
                  <span className="text-sm font-semibold text-foreground">Cloud storage</span>
                  <span className="text-hint text-foreground">
                    <span className="block">Unity Catalog external locations and</span>
                    <span className="block">volumes</span>
                  </span>
                </div>
              </Link>
            </Button>
            <div className={cn(cardClass, "cursor-default")}>
              <TableIcon size={35} className="shrink-0 text-muted-foreground" />
              <div className="flex flex-col gap-1.5 px-3 text-center">
                <span className="text-sm font-semibold text-foreground">Existing table</span>
                <span className="text-hint text-foreground">
                  An existing table in your workspace
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Lakewatch managed presets — Figma 110:111312 */}
        <section className="flex flex-col gap-4">
          <div className="flex max-w-[1012px] flex-col gap-2">
            <h2 className="text-lg font-semibold leading-6 text-foreground">
              Lakewatch managed presets
            </h2>
            <p className="text-sm leading-5 text-foreground">
              Automatic ingest and normalization for external or internal tables with full parsing
              to silver and gold tables
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className={presetCardClass}>
              <div className="relative h-[42px] w-[60px] shrink-0 overflow-hidden rounded-[5px] bg-rose-600">
                <img
                  src="/lakewatch/preset-logos/cloudtrail.png"
                  alt=""
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
              <span className="px-3 text-center text-sm font-semibold text-foreground">
                Amazon CloudTrail IAM
              </span>
            </div>
            <div className={presetCardClass}>
              <div className="relative h-[42px] w-[60px] shrink-0 overflow-hidden rounded-lg bg-violet-600">
                <img
                  src="/lakewatch/preset-logos/route53.png"
                  alt=""
                  className="pointer-events-none absolute h-[254.47%] left-[-82.86%] top-[-74.85%] w-[424.11%] max-w-none"
                  draggable={false}
                />
              </div>
              <span className="px-3 text-center text-sm font-semibold text-foreground">
                AWS Route 53
              </span>
            </div>
            <div className={presetCardClass}>
              <div className="flex h-[42px] w-[60px] shrink-0 items-center justify-center rounded-[5px] bg-orange-500 text-xs font-semibold text-white">
                CF
              </div>
              <span className="px-3 text-center text-sm font-semibold text-foreground">
                Cloudflare
              </span>
            </div>
            <div className={presetCardClass}>
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-background">
                1P
              </div>
              <span className="px-3 text-center text-sm font-semibold text-foreground">
                One Password
              </span>
            </div>
          </div>
        </section>

        {/* Lakeflow connect — Figma 110:111368 */}
        <section className="flex flex-col gap-4">
          <div className="flex max-w-[1012px] flex-col gap-2">
            <h2 className="text-lg font-semibold leading-6 text-foreground">Lakeflow connect</h2>
            <p className="text-sm leading-5 text-foreground">Managed, multi-source ingestion</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className={lakeflowCardClass}>
              <img
                src="/lakewatch/preset-logos/slack.png"
                alt=""
                className="h-9 w-auto max-w-[120px] object-contain"
                draggable={false}
              />
              <p className="text-hint text-foreground">
                Import messages and data from
                <br />
                Slack workspaces.
              </p>
            </div>
            <div className={lakeflowCardClass}>
              <div className="flex h-8 w-16 items-center justify-center rounded border border-border bg-blue-50 text-xs font-semibold text-blue-800">
                Okta
              </div>
              <p className="text-hint text-foreground">
                Sync identity and access
                <br />
                management data.
              </p>
            </div>
            <div className={lakeflowCardClass}>
              <div className="flex h-8 w-24 items-center justify-center rounded border border-border bg-red-50 text-xs font-semibold text-red-800">
                CrowdStrike
              </div>
              <p className="text-hint text-foreground">
                Real-time security event ingestion from Crowdstrike.
              </p>
            </div>
            <div className={lakeflowCardClass}>
              <div className="flex h-8 w-20 items-center justify-center rounded border border-border bg-sky-50 text-xs font-semibold text-sky-900">
                Workday
              </div>
              <p className="text-hint text-foreground">
                Import HR and workforce management data.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
