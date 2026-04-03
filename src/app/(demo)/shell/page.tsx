"use client"

import * as React from "react"
import { AppShell, PageHeader } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  HomeIcon,
  FolderFillIcon,
  FolderBranchFillIcon,
  NotebookIcon,
  StarIcon,
  StarFillIcon,
  TrashIcon,
  UserGroupIcon,
  OverflowIcon,
} from "@/components/icons"
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Tree, type TreeNode } from "@/components/ui/tree"
import { ArrowUpDown } from "lucide-react"
import { SearchIcon, ChevronDownIcon, GridIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type FileType = "Folder" | "Git folder" | "Notebook"

type FileItem = {
  id: string
  name: string
  type: FileType
  owner: string
  createdAt: string
  updatedAt: string
}

type PathItem = { id: string; label: string }

// ─── Nav tree ─────────────────────────────────────────────────────────────────

const BLUE = "text-blue-400 dark:text-blue-500"

const TREE: TreeNode[] = [
  {
    id: "home",
    label: "Home",
    icon: HomeIcon,
    defaultExpanded: true,
    children: [
      {
        id: "home-drafts",
        label: "Drafts",
        icon: FolderFillIcon,
        iconClassName: BLUE,
        defaultExpanded: true,
        children: [
          {
            id: "home-assistant",
            label: ".assistant",
            icon: FolderFillIcon,
            iconClassName: BLUE,
            children: [{ id: "home-assistant-x", label: "assistant_config", icon: FolderFillIcon }],
          },
          {
            id: "avocado-flow",
            label: "Avocado_Flow",
            icon: FolderFillIcon,
            iconClassName: BLUE,
            children: [{ id: "avocado-flow-x", label: "flow.py", icon: FolderFillIcon }],
          },
        ],
      },
      { id: "home-apps",     label: "Apps",     icon: FolderFillIcon, iconClassName: BLUE },
      { id: "home-projects", label: "Projects", icon: FolderFillIcon, iconClassName: BLUE },
    ],
  },
  { id: "shared", label: "Shared with me", icon: UserGroupIcon },
  {
    id: "workspace-root",
    label: "Workspace",
    icon: FolderFillIcon,
    iconClassName: BLUE,
    defaultExpanded: true,
    children: [
      {
        id: "ws-projects",
        label: "Projects",
        icon: FolderFillIcon,
        iconClassName: BLUE,
        defaultExpanded: true,
        children: [
          {
            id: "analytics-pipeline",
            label: "analytics-pipeline",
            icon: FolderBranchFillIcon,
            iconClassName: BLUE,
            children: [{ id: "analytics-pipeline-x", label: "pipeline.py", icon: FolderFillIcon }],
          },
          {
            id: "ml-experiments",
            label: "ml-experiments",
            icon: FolderFillIcon,
            iconClassName: BLUE,
            children: [{ id: "ml-experiments-x", label: "run_001", icon: FolderFillIcon }],
          },
          {
            id: "etl-jobs",
            label: "etl-jobs",
            icon: FolderFillIcon,
            iconClassName: BLUE,
            children: [{ id: "etl-jobs-x", label: "daily_etl.py", icon: FolderFillIcon }],
          },
        ],
      },
      {
        id: "ws-repos",
        label: "Repos",
        icon: FolderBranchFillIcon,
        iconClassName: BLUE,
        children: [{ id: "ws-repos-x", label: "ml-platform-v2", icon: FolderFillIcon }],
      },
      {
        id: "ws-shared",
        label: "Shared",
        icon: FolderFillIcon,
        iconClassName: BLUE,
        children: [{ id: "ws-shared-x", label: "Onboarding", icon: FolderFillIcon }],
      },
      {
        id: "ws-users",
        label: "Users",
        icon: UserGroupIcon,
        children: [{ id: "ws-users-x", label: "joy@databricks.com", icon: UserGroupIcon }],
      },
    ],
  },
  { id: "favorites", label: "Favorites", icon: StarIcon },
  { id: "trash",     label: "Trash",     icon: TrashIcon },
]

// ─── Nav helpers ──────────────────────────────────────────────────────────────

function findNode(id: string, nodes: TreeNode[] = TREE): TreeNode | undefined {
  for (const n of nodes) {
    if (n.id === id) return n
    const found = findNode(id, n.children ?? [])
    if (found) return found
  }
}

function buildParentMap(
  nodes: TreeNode[],
  parent: TreeNode | null = null,
  map: Map<string, TreeNode | null> = new Map()
): Map<string, TreeNode | null> {
  for (const n of nodes) {
    map.set(n.id, parent)
    buildParentMap(n.children ?? [], n, map)
  }
  return map
}

const NAV_PARENT_MAP = buildParentMap(TREE)

// ─── File data ─────────────────────────────────────────────────────────────────

const FILES: Record<string, FileItem[]> = {
  home: [
    { id: "home-drafts",   name: "Drafts",                  type: "Folder",     owner: "Joy Xie", createdAt: "May 19, 2025, 01:37 PM", updatedAt: "May 19, 2025, 01:37 PM" },
    { id: "home-apps",     name: "Apps",                    type: "Folder",     owner: "Joy Xie", createdAt: "Feb 13, 2025, 02:30 PM", updatedAt: "Feb 13, 2025, 02:30 PM" },
    { id: "home-projects", name: "Projects",                type: "Folder",     owner: "Joy Xie", createdAt: "Jan 10, 2025, 09:00 AM", updatedAt: "Mar 01, 2026, 11:00 AM" },
    { id: "h4",            name: "(Clone) draft",           type: "Folder",     owner: "Joy Xie", createdAt: "Mar 04, 2025, 02:13 PM", updatedAt: "Mar 04, 2025, 02:13 PM" },
    { id: "h5",            name: "(Clone) Qualtrics fee...", type: "Folder",     owner: "Joy Xie", createdAt: "Nov 28, 2023, 10:33 AM", updatedAt: "Nov 28, 2023, 10:33 AM" },
    { id: "h8",            name: ".assistant",              type: "Folder",     owner: "Joy Xie", createdAt: "Jan 30, 2026, 04:27 PM", updatedAt: "Jan 30, 2026, 04:27 PM" },
    { id: "h13",           name: "customer_churn_model",    type: "Notebook",   owner: "Joy Xie", createdAt: "Jan 15, 2025, 09:00 AM", updatedAt: "Mar 04, 2025, 10:30 AM" },
    { id: "h14",           name: "etl_pipeline_v2",         type: "Notebook",   owner: "Joy Xie", createdAt: "Feb 01, 2025, 11:00 AM", updatedAt: "Feb 28, 2025, 03:15 PM" },
  ],
  "home-drafts": [
    { id: "d1", name: "scratch_analysis",        type: "Notebook", owner: "Joy Xie", createdAt: "May 10, 2025, 11:00 AM", updatedAt: "May 19, 2025, 01:37 PM" },
    { id: "d2", name: "wip_feature_exploration", type: "Notebook", owner: "Joy Xie", createdAt: "Apr 22, 2025, 03:00 PM", updatedAt: "May 01, 2025, 09:15 AM" },
    { id: "d3", name: "temp_sql_queries",        type: "Notebook", owner: "Joy Xie", createdAt: "Mar 30, 2025, 02:00 PM", updatedAt: "Apr 05, 2025, 04:45 PM" },
  ],
  "home-assistant": [
    { id: "a-cfg", name: "assistant_config",     type: "Folder",   owner: "Joy Xie", createdAt: "Jan 30, 2026, 04:27 PM", updatedAt: "Jan 30, 2026, 04:27 PM" },
  ],
  "avocado-flow": [
    { id: "av-1", name: "flow.py",               type: "Notebook", owner: "Joy Xie", createdAt: "Feb 05, 2026, 10:00 AM", updatedAt: "Mar 01, 2026, 02:00 PM" },
  ],
  "home-apps": [
    { id: "a1", name: "data-quality-dashboard",  type: "Folder",   owner: "Joy Xie", createdAt: "Feb 13, 2025, 02:30 PM", updatedAt: "Mar 01, 2026, 10:00 AM" },
    { id: "a2", name: "pipeline-monitor",        type: "Folder",   owner: "Joy Xie", createdAt: "Jan 05, 2025, 09:00 AM", updatedAt: "Feb 20, 2026, 03:49 PM" },
    { id: "a3", name: "cost-explorer-app",       type: "Git folder", owner: "Joy Xie", createdAt: "Aug 07, 2025, 01:31 PM", updatedAt: "-" },
  ],
  "home-projects": [
    { id: "p1", name: "ml-platform-v2",          type: "Git folder", owner: "Joy Xie", createdAt: "Jan 10, 2025, 09:00 AM", updatedAt: "-" },
    { id: "p2", name: "unified-analytics",       type: "Folder",   owner: "Joy Xie", createdAt: "Nov 20, 2024, 10:00 AM", updatedAt: "Mar 01, 2026, 11:00 AM" },
    { id: "p3", name: "realtime-ingestion",      type: "Git folder", owner: "Joy Xie", createdAt: "Sep 05, 2024, 02:00 PM", updatedAt: "-" },
  ],
  shared: [
    { id: "s1", name: "Team dashboards",         type: "Folder",     owner: "Alex Rivera",  createdAt: "Jan 10, 2025, 09:00 AM", updatedAt: "Mar 01, 2025, 02:00 PM" },
    { id: "s2", name: "prod_feature_store",      type: "Notebook",   owner: "Jordan Kim",   createdAt: "Nov 05, 2024, 10:30 AM", updatedAt: "Feb 20, 2025, 04:45 PM" },
    { id: "s3", name: "data-quality-checks",     type: "Git folder", owner: "Sam Nakamura", createdAt: "Oct 22, 2024, 01:00 PM", updatedAt: "-" },
  ],
  "workspace-root": [
    { id: "ws-projects", name: "Projects", type: "Folder", owner: "System", createdAt: "Jan 01, 2023, 12:00 AM", updatedAt: "Mar 04, 2026, 10:00 AM" },
    { id: "ws-repos",    name: "Repos",    type: "Folder", owner: "System", createdAt: "Jan 01, 2023, 12:00 AM", updatedAt: "Mar 04, 2026, 10:00 AM" },
    { id: "ws-shared",   name: "Shared",   type: "Folder", owner: "System", createdAt: "Jan 01, 2023, 12:00 AM", updatedAt: "Jan 01, 2023, 12:00 AM" },
    { id: "ws-users",    name: "Users",    type: "Folder", owner: "System", createdAt: "Jan 01, 2023, 12:00 AM", updatedAt: "Mar 04, 2026, 10:00 AM" },
  ],
  "ws-projects": [
    { id: "analytics-pipeline", name: "analytics-pipeline", type: "Git folder", owner: "Joy Xie",       createdAt: "Sep 11, 2025, 10:22 AM", updatedAt: "-" },
    { id: "ml-experiments",     name: "ml-experiments",     type: "Folder",     owner: "Joy Xie",       createdAt: "Nov 06, 2025, 01:36 PM", updatedAt: "Feb 20, 2026, 03:49 PM" },
    { id: "etl-jobs",           name: "etl-jobs",           type: "Folder",     owner: "Joy Xie",       createdAt: "Aug 07, 2025, 01:31 PM", updatedAt: "Mar 01, 2026, 11:00 AM" },
  ],
  "analytics-pipeline": [
    { id: "ap-1", name: "pipeline.py",           type: "Notebook",   owner: "Joy Xie",       createdAt: "Sep 11, 2025, 10:22 AM", updatedAt: "Mar 04, 2026, 10:00 AM" },
    { id: "ap-2", name: "config.yaml",           type: "Folder",     owner: "Joy Xie",       createdAt: "Oct 01, 2025, 09:00 AM", updatedAt: "Oct 01, 2025, 09:00 AM" },
  ],
  "ml-experiments": [
    { id: "ml-1", name: "run_001",               type: "Folder",     owner: "Joy Xie",       createdAt: "Nov 06, 2025, 01:36 PM", updatedAt: "Feb 20, 2026, 03:49 PM" },
    { id: "ml-2", name: "baseline_model",        type: "Notebook",   owner: "Joy Xie",       createdAt: "Dec 01, 2025, 10:00 AM", updatedAt: "Jan 15, 2026, 02:00 PM" },
  ],
  "etl-jobs": [
    { id: "etl-1", name: "daily_etl.py",         type: "Notebook",   owner: "Joy Xie",       createdAt: "Aug 07, 2025, 01:31 PM", updatedAt: "Mar 01, 2026, 11:00 AM" },
  ],
  "ws-users": [
    { id: "u1", name: "joy@databricks.com",      type: "Folder", owner: "System", createdAt: "Mar 15, 2023, 09:00 AM", updatedAt: "Mar 04, 2026, 10:00 AM" },
    { id: "u2", name: "alex.rivera@example.com", type: "Folder", owner: "System", createdAt: "Apr 01, 2023, 10:00 AM", updatedAt: "Jan 15, 2026, 03:00 PM" },
  ],
  "ws-repos": [
    { id: "r1", name: "ml-platform-v2",          type: "Git folder", owner: "Joy Xie",       createdAt: "Jan 10, 2025, 09:00 AM", updatedAt: "-" },
    { id: "r2", name: "data-quality-checks",     type: "Git folder", owner: "Sam Nakamura",  createdAt: "Oct 22, 2024, 01:00 PM", updatedAt: "-" },
  ],
  "ws-shared": [
    { id: "ws1", name: "Onboarding",             type: "Folder",   owner: "System",          createdAt: "Jan 01, 2023, 12:00 AM", updatedAt: "Sep 10, 2024, 03:00 PM" },
    { id: "ws2", name: "Templates",              type: "Folder",   owner: "System",          createdAt: "Jan 01, 2023, 12:00 AM", updatedAt: "Feb 01, 2025, 10:00 AM" },
  ],
  favorites: [
    { id: "h5",        name: "(Clone) Qualtrics fee...", type: "Folder",   owner: "Joy Xie", createdAt: "Nov 28, 2023, 10:33 AM", updatedAt: "Nov 28, 2023, 10:33 AM" },
    { id: "home-apps", name: "Apps",                     type: "Folder",   owner: "Joy Xie", createdAt: "Feb 13, 2025, 02:30 PM", updatedAt: "Feb 13, 2025, 02:30 PM" },
  ],
  trash: [],
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

const TITLES: Record<string, string> = {
  home: "joy@databricks.com",
}

function FileIcon({ type }: { type: FileType }) {
  if (type === "Git folder") return <FolderBranchFillIcon size={16} className="text-blue-400 dark:text-blue-500 shrink-0" />
  if (type === "Notebook")   return <NotebookIcon         size={16} className="text-blue-400 dark:text-blue-500 shrink-0" />
  return <FolderFillIcon size={16} className="text-blue-400 dark:text-blue-500 shrink-0" />
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function WorkspacePage() {
  const [activeNav, setActiveNav] = React.useState("workspace")
  const [navPath, setNavPath]     = React.useState<PathItem[]>([{ id: "home", label: "Home" }])
  const [search, setSearch]       = React.useState("")
  const [starred, setStarred]     = React.useState<Record<string, boolean>>({
    "h5": true, "home-apps": true,
  })

  const currentId = navPath[navPath.length - 1].id
  const files     = FILES[currentId] ?? []
  const filtered  = search
    ? files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    : files

  function handleNavSelect(id: string) {
    const node = findNode(id)
    if (!node) return
    const parent = NAV_PARENT_MAP.get(id)
    if (parent) {
      setNavPath([{ id: parent.id, label: parent.label }, { id: node.id, label: node.label }])
    } else {
      setNavPath([{ id: node.id, label: node.label }])
    }
    setSearch("")
  }

  function navigateIntoFolder(file: FileItem) {
    if (file.type === "Folder" || file.type === "Git folder") {
      setNavPath((prev) => [...prev, { id: file.id, label: file.name }])
      setSearch("")
    }
  }

  function navigateBreadcrumb(index: number) {
    setNavPath((prev) => prev.slice(0, index + 1))
    setSearch("")
  }

  function toggleStar(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    setStarred((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const pageTitle = TITLES[currentId] ?? navPath[navPath.length - 1].label

  return (
    <AppShell activeItem={activeNav} onNavigate={setActiveNav} workspace="Production" mainClassName="overflow-hidden">
      <div className="flex h-full">

        {/* ── Left tree panel ──────────────────────────────────────────── */}
        <aside className="flex w-[200px] shrink-0 flex-col border-r border-border overflow-y-auto">
          <div className="px-3 py-2 text-xs font-semibold text-foreground">Workspace</div>
          <Tree
            nodes={TREE}
            selectedId={currentId}
            onSelect={handleNavSelect}
            variant="nav"
            className="px-1 pb-2"
          />
        </aside>

        {/* ── Right content panel ──────────────────────────────────────── */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">

            {/* Page header */}
            <PageHeader
              breadcrumbs={
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="#"
                        onClick={(e) => { e.preventDefault(); handleNavSelect("workspace-root") }}
                      >
                        Workspace
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {navPath.map((item, i) => (
                      <React.Fragment key={item.id}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          {i === navPath.length - 1 ? (
                            <BreadcrumbPage>{TITLES[item.id] ?? item.label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              href="#"
                              onClick={(e) => { e.preventDefault(); navigateBreadcrumb(i) }}
                            >
                              {TITLES[item.id] ?? item.label}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              }
              title={pageTitle}
              titleIcons={
                currentId === "home" ? (
                  <Button variant="ghost" size="icon-xs" className="text-star" aria-label="Favorite">
                    <StarIcon size={14} />
                  </Button>
                ) : undefined
              }
              actions={
                <>
                  <Button variant="outline" size="sm">Share</Button>
                  <Button size="sm" className="gap-1">
                    Create <ChevronDownIcon size={12} />
                  </Button>
                </>
              }
            />

            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <SearchIcon size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="w-56 pl-8"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                Type <ChevronDownIcon size={12} className="text-muted-foreground" />
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                Owner <ChevronDownIcon size={12} className="text-muted-foreground" />
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                Last modified <ChevronDownIcon size={12} className="text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon-sm" className="ml-auto" aria-label="Toggle columns">
                <GridIcon size={16} className="text-muted-foreground" />
              </Button>
            </div>

            {/* File table */}
            {filtered.length === 0 ? (
              <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
                {currentId === "trash"
                  ? "Trash is empty."
                  : search
                    ? `No results for "${search}".`
                    : "This folder is empty."}
              </div>
            ) : (
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8" />
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Name <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Created at</TableHead>
                      <TableHead>Last updated at</TableHead>
                      <TableHead className="w-8" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((file) => {
                      const isFolder = file.type === "Folder" || file.type === "Git folder"
                      return (
                        <TableRow
                          key={file.id}
                          className={cn("group", isFolder && "cursor-pointer")}
                          onClick={() => navigateIntoFolder(file)}
                        >
                          {/* Star */}
                          <TableCell className="w-8 pr-0">
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              onClick={(e) => { e.stopPropagation(); toggleStar(file.id, e) }}
                              className={cn(
                                "transition-colors",
                                starred[file.id]
                                  ? "text-star"
                                  : "text-transparent group-hover:text-muted-foreground/40 hover:!text-star"
                              )}
                              aria-label="Favorite"
                            >
                              <StarFillIcon size={14} />
                            </Button>
                          </TableCell>

                          {/* Name */}
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FileIcon type={file.type} />
                              <span className={cn(isFolder ? "text-primary hover:underline" : "text-foreground")}>
                                {file.name}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell className="text-muted-foreground">{file.type}</TableCell>
                          <TableCell className="text-muted-foreground">{file.owner}</TableCell>
                          <TableCell className="text-muted-foreground">{file.createdAt}</TableCell>
                          <TableCell className="text-muted-foreground">{file.updatedAt}</TableCell>

                          {/* Row actions */}
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label="More options"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <OverflowIcon size={14} className="text-muted-foreground" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}

          </div>
        </div>
      </div>
    </AppShell>
  )
}
