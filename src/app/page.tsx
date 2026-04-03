import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DatabricksLogo } from "@/components/shell/DatabricksLogo";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NotebookIcon, WorkflowsIcon, BarChartIcon, LayerIcon,
} from "@/components/icons";
import { LayoutGrid } from "lucide-react";

const DEMOS = [
  {
    href: "/shell",
    icon: NotebookIcon,
    label: "Workspace",
    desc: "Full shell with sidebar, nav, and notebook editor",
  },
  {
    href: "/jobs",
    icon: WorkflowsIcon,
    label: "Jobs & Pipelines",
    desc: "Tabular list page with filter bar and split button",
  },
  {
    href: "/dashboards",
    icon: BarChartIcon,
    label: "Dashboards",
    desc: "Card grid with detail panel and chart preview",
  },
  {
    href: "/design-system",
    icon: LayerIcon,
    label: "Design System",
    desc: "All DuBois components, tokens, and icons",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">

      {/* Top bar */}
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
            <a
              href="https://github.com/gioa/db-starter-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16">

        <div className="flex flex-col items-center gap-3 text-center max-w-lg">
          <h1 className="text-xl font-semibold text-foreground">
            Vibe coding Databricks UIs
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            DuBois-themed shadcn/ui components, tokens, and page templates for PMs and designers.
            Start building without rebuilding.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-1">
            <Button asChild>
              <Link href="/shell">Open shell demo</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/design-system">
                <LayoutGrid className="h-4 w-4" />
                Design system
              </Link>
            </Button>
          </div>
        </div>

        {/* Demo cards */}
        <div className="grid w-full max-w-2xl grid-cols-2 gap-3">
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

        <p className="text-hint text-muted-foreground">
          Built with Next.js · shadcn/ui · Tailwind v4 · DuBois tokens
        </p>

      </main>
    </div>
  );
}
