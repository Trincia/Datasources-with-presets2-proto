// ─── Your app starts here ─────────────────────────────────────────────────────
// Delete this file and replace with your own home page.
// Demo pages live in src/app/(demo)/ — delete that folder too when you're ready.

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DatabricksLogo } from "@/components/shell/DatabricksLogo"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  NotebookIcon, WorkflowsIcon, BarChartIcon, LayerIcon, CloudIcon,
} from "@/components/icons"

const DEMOS = [
  { href: "/shell",         icon: NotebookIcon,  label: "Workspace",     desc: "Full shell with sidebar, nav, and notebook editor" },
  { href: "/jobs",          icon: WorkflowsIcon, label: "Jobs",          desc: "Tabular list page with filter bar and split button" },
  { href: "/dashboards",    icon: BarChartIcon,  label: "Dashboards",    desc: "Card grid with detail panel and chart preview" },
  { href: "/compute",       icon: CloudIcon,     label: "Compute",       desc: "Tabs + table + pagination list page" },
  { href: "/design-system", icon: LayerIcon,     label: "Design system", desc: "All DuBois components, tokens, and icons" },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-12 items-center justify-between border-b border-border px-6">
        <div className="flex items-center gap-2">
          <DatabricksLogo height={16} />
          <span className="text-muted-foreground/40 select-none">|</span>
          <span className="text-sm text-muted-foreground">UI Starter Kit</span>
          <Badge variant="indigo" className="ml-1">DuBois</Badge>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com/gioa/db-starter-kit" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16">
        <div className="flex flex-col items-center gap-3 text-center max-w-lg">
          <h1 className="text-xl font-semibold text-foreground">Databricks UI Starter Kit</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            DuBois design system components, tokens, and page templates. Use this repo as a template,
            delete the <code>(demo)</code> folder, and start building your app.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-1">
            <Button asChild><Link href="/shell">Open shell demo</Link></Button>
            <Button variant="outline" asChild><Link href="/design-system">Design system</Link></Button>
          </div>
        </div>

        <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
          {DEMOS.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="group flex flex-col gap-2 rounded-md border border-border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-secondary"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-secondary group-hover:bg-background transition-colors">
                  <demo.icon size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-semibold text-foreground">{demo.label}</span>
              </div>
              <p className="text-hint text-muted-foreground leading-relaxed">{demo.desc}</p>
            </Link>
          ))}
        </div>

        <p className="text-hint text-muted-foreground">Next.js · shadcn/ui · Tailwind v4 · DuBois tokens</p>
      </main>
    </div>
  )
}
