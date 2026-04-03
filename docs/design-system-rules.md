# Design System Rules — Databricks UI Starter Kit

This document is the canonical reference for AI tools (Claude Code, Figma MCP, Copilot) implementing Figma designs in this repo. Read this before generating any component or page.

---

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 App Router (React 19) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 utility classes + CSS custom properties |
| Component base | shadcn/ui (Radix primitives) — DuBois-overridden |
| Icons | DuBois icon set (445 SVG components) + lucide-react fallback |
| Theme | `next-themes` — light/dark via `.dark` class |
| Figma file | `KHFOMM4oUyT9XgeeXpbzns` ("Databricks UI starter kit") |

---

## 2. Design tokens

**Single source of truth:** `src/app/globals.css`

All tokens are defined in a `@theme {}` block (Tailwind v4 syntax) which exposes them as both CSS custom properties and Tailwind utilities.

```
Primitive scales → @theme { --color-blue-600: #2272b4; ... }
Semantic aliases → :root { --primary: var(--color-blue-600); ... }
Dark overrides   → .dark { --primary: ...; --background: ...; }
```

**Two layers — always use semantic, never primitive:**

```tsx
// ❌ Never use primitive directly in components
className="text-blue-600 bg-grey-050"

// ✅ Use semantic alias
className="text-primary bg-secondary"
```

**Semantic token map (most common):**

| Token | Light value | Usage |
|---|---|---|
| `--primary` / `text-primary` / `bg-primary` | blue-600 #2272B4 | Primary actions, active states |
| `--foreground` / `text-foreground` | grey-800 #11171C | All body text, table data |
| `--muted-foreground` / `text-muted-foreground` | grey-500 #5F7281 | Hints, placeholders, secondary labels |
| `--background` / `bg-background` | white | Page/card background |
| `--secondary` / `bg-secondary` | grey-050 #F6F7F9 | Shell bg, subtle fills |
| `--muted` / `bg-muted` | grey-050 | Input backgrounds |
| `--border` / `border-border` | grey-100 #E8ECF0 | All borders |
| `--destructive` / `text-destructive` | red-600 #C82D4C | Danger |
| `--success` | green-600 #277C43 | Success states |
| `--warning` | yellow-600 #BE501E | Warnings |

---

## 3. Typography

- **Font:** System font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, …`). In Figma: always SF Pro bound to text styles — never Inter, never hardcoded sizes.
- **Base size:** 13px on `body` (set in globals.css). Never set `font-size` on `html`.
- **Bold weight:** `font-semibold` (600). Never `font-bold` (700).
- **Hint/helper text:** `text-hint` class (12px/16px). Use `text-muted-foreground` alongside.
- **Heading scale:** `h1`–`h6` in globals.css @theme.

```tsx
// ❌ Wrong
<p className="text-[13px] font-bold text-[#5F7281]">hint</p>

// ✅ Correct
<p className="text-hint text-muted-foreground">hint</p>
```

---

## 4. Component library

### Location
```
src/components/
├── ui/          ← shadcn primitives (DuBois-overridden)
├── shell/       ← app chrome: AppShell, TopBar, Sidebar, PageHeader, FilterBar, NewButton
└── icons/       ← 445 DuBois SVG components + index.ts barrel
```

### Import paths

```tsx
import { Button } from "@/components/ui/button"
import { AppShell, PageHeader } from "@/components/shell"
import { FilterBar } from "@/components/shell/FilterBar"
import { CloudIcon, WorkflowsIcon } from "@/components/icons"
import { DbIcon } from "@/components/ui/db-icon"
```

### Never use raw HTML equivalents

```tsx
// ❌ Never
<button onClick={…}>Click</button>
<a href="…">Link</a>
<div onClick={…}>…</div>

// ✅ Always
<Button onClick={…}>Click</Button>
<Button variant="link" asChild><Link href="…">Link</Link></Button>
```

---

## 5. Sizing & spacing

| Element | Size | Tailwind |
|---|---|---|
| Button (default/sm) | 32px | `h-8` |
| Button xs | 24px | `h-6` |
| Icon-only button sm | 32×32 | `size="icon-sm"` |
| Icon-only button xs | 24×24 | `size="icon-xs"` |
| Input / Select | 32px | `h-8` |
| TopBar | 48px | `h-12` |
| Sidebar (open) | 200px | `w-[200px]` |
| Page content padding | 24px | `p-6` |
| Base spacing grid | 8px | `gap-2` = 8px, `gap-4` = 16px |

---

## 6. Border radius

| Element type | Radius | Tailwind |
|---|---|---|
| Buttons, inputs, badges, dropdowns | 4px | `rounded` |
| Cards, modals, panels | 8px | `rounded-md` |
| Never | `rounded-lg` / `rounded-xl` | — |

---

## 7. Icon system

### DuBois icons (Databricks-specific concepts)
```tsx
import { CloudIcon, NotebookIcon, AssistantIcon } from "@/components/icons"
// Always: className="h-4 w-4" (16px)
<CloudIcon className="h-4 w-4 text-muted-foreground" />
```

### Lucide icons (generic UI icons only)
```tsx
import { MoreVertical } from "lucide-react"
// Use only when no DuBois equivalent exists
<MoreVertical className="h-4 w-4" />
```

### AI gradient icon
```tsx
import { DbIcon } from "@/components/ui/db-icon"
import { SparkleIcon } from "@/components/icons"
<DbIcon icon={SparkleIcon} color="ai" size={16} />
```

**Rule:** Use DuBois icons for all Databricks product concepts. Lucide only for generic glyphs (MoreVertical, ArrowUpDown, etc.) with no DuBois equivalent.

**Icon color in chrome:** Always `text-muted-foreground` unless active/primary state.

---

## 8. Shell architecture

Every page wraps in `<AppShell>`:

```tsx
import { AppShell, PageHeader } from "@/components/shell"

export default function MyPage() {
  return (
    <AppShell activeItem="compute" workspace="Production" userInitial="N">
      <div className="flex flex-col gap-4 p-6">
        <PageHeader title="My Page" />
        {/* page content */}
      </div>
    </AppShell>
  )
}
```

**Zone backgrounds:**

| Zone | Class | Notes |
|---|---|---|
| Shell outer | `bg-secondary` | TopBar + Sidebar blend in |
| Main content card | `bg-background border border-border rounded-md` | White card, `mb-2 mr-2` |
| Inside card | `p-6` | 24px padding |

---

## 9. Component patterns and known fixes

These patterns must be applied exactly — deviating causes visual regressions:

### Tabs (line variant) — always `w-full` + left-aligned

```tsx
// The line variant must span the full container width
<TabsList variant="line" className="w-full">
  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
</TabsList>
// TabsList base style has w-fit; w-full overrides it for the border line.
// justify-start is baked into the component for variant=line.
```

### Select in filter toolbars — hug content

```tsx
// Never let a filter Select stretch full-width
<SelectTrigger className="w-auto min-w-[80px]">
  <SelectValue placeholder="Status" />
</SelectTrigger>
```

### Table cells — foreground for all data

```tsx
// ❌ Wrong: dims readable data
<TableCell className="text-muted-foreground">{row.description}</TableCell>

// ✅ Correct: all data cells inherit text-foreground
<TableCell>{row.description}</TableCell>
// text-muted-foreground only for supplementary sub-text within a cell
```

### Pagination — right-align explicitly

```tsx
// Pagination defaults to justify-center w-full — override for right alignment
<Pagination className="justify-end">
```

### Focus ring — solid 2px, no offset

```tsx
// Already applied in globals.css; never add ring-offset-* to inputs/buttons
focus:ring-ring focus:ring-[2px]   // ✅
focus:ring-2 focus:ring-offset-2   // ❌
```

### Alert variants

```tsx
<Alert variant="info">      // blue
<Alert variant="warning">   // yellow
<Alert variant="success">   // green
<Alert variant="destructive"> // red
// Never use raw colored divs for alerts
```

---

## 10. Dark mode

All semantic tokens are defined for both `:root` (light) and `.dark` (dark) in `globals.css`. Every component automatically supports dark mode — no conditional logic needed.

```tsx
// ✅ Automatic dark support
<div className="bg-background text-foreground border-border" />

// ❌ Never hardcode for one mode
<div className="bg-white text-black" />
```

---

## 11. Figma → Code mapping rules

See `docs/figma-1to1-mapping.md` for the full list. Quick reference:

| Figma pattern | Common mistake | Correct |
|---|---|---|
| Tab bar with underline | `<TabsList variant="line">` | `<TabsList variant="line" className="w-full">` |
| Filter dropdown | `<SelectTrigger>` (expands) | `<SelectTrigger className="w-auto min-w-[80px]">` |
| Table data cell | `text-muted-foreground` | No class (inherits foreground) |
| Right-aligned pagination | `<Pagination>` | `<Pagination className="justify-end">` |
| Action slot | `[Action]` text/frame | Real Button instance |
| Figma component variants | All at (0,0) after combineAsVariants | Pre-position x offsets first |

---

## 12. Figma Code Connect

All components have Code Connect mappings in `src/figma-code-connect.figma.tsx`.

- Figma file: `KHFOMM4oUyT9XgeeXpbzns`
- Publish: `FIGMA_ACCESS_TOKEN=<token> npm run figma:publish`
- Node IDs for all components: `memory/figma_node_map.md`

When adding a new component:
1. Create the React component in `src/components/ui/` or `src/components/shell/`
2. Create the Figma component with real token bindings (see `docs/figma-component-creation.md`)
3. Add a `figma.connect()` entry in `src/figma-code-connect.figma.tsx`
4. Run `figma:publish`
5. Update `docs/audit-status.md`
