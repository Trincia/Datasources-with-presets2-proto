# Getting Started with the Databricks UI Starter Kit

Three ways to use this kit — pick the one that matches where you are:

1. **[Starting a new project](#1-starting-a-new-project)** — clone and build your app
2. **[Updating an existing app](#2-updating-an-existing-app)** — pull the latest DuBois styles into a project you already own
3. **[Writing designs back to Figma](#3-writing-designs-back-to-figma)** — sync your code changes back into a Figma file using real component instances

---

## 1. Starting a new project

### Step 1 — Create your repo
Click **"Use this template"** on GitHub (not "Fork"). This gives you a clean repo with no git history and no fork relationship.

### Step 2 — Clone and run

```bash
git clone https://github.com/YOUR_ORG/YOUR_REPO.git
cd YOUR_REPO
npm install
npm run dev
```

You'll see the starter kit landing page at `http://localhost:3000`. Browse the demo pages to get a feel for what's available.

### Step 3 — Build your app with Claude Code

Open Claude Code inside the project:

```bash
claude
```

The `CLAUDE.md` file loads automatically — Claude already knows the DuBois design rules, component names, and shell architecture.

**Tell Claude what your app is and let it scaffold:**

```
"I'm building a data quality monitoring tool. Replace the demo landing page
with a home page that shows dataset health scores and recent alerts.
Remove the demo pages I don't need."
```

Claude will:
- Create your `src/app/page.tsx`
- Remove the `(demo)/` pages you don't use
- Wire up the sidebar nav to your pages
- Apply DuBois tokens and shell components throughout

**Or do it manually** — skip ahead to step 4.

### Step 4 — Decide what to keep from the demo

The demo pages live in `src/app/(demo)/` and don't affect your URL structure. You have two options:

**Keep them as reference** — they show working examples of common page patterns (list pages, card grids, editor layouts, tabs + tables). Delete them whenever you're done referencing them.

**Delete them now:**

```bash
rm -rf "src/app/(demo)"   # removes all demo pages
rm src/app/page.tsx       # removes the starter kit home page
```

Then create your own `src/app/page.tsx`.

### Step 5 — What you keep (always)

```
src/components/
├── ui/        ← DuBois-overridden shadcn components (Button, Input, Table, etc.)
├── shell/     ← AppShell, TopBar, Sidebar, PageHeader, GenieCodePanel, NewButton
└── icons/     ← 445 DuBois SVG icons

src/app/globals.css    ← All DuBois design tokens (Tailwind v4 @theme)
src/app/layout.tsx     ← ThemeProvider + TooltipProvider
```

### Step 6 — Build your first page

```tsx
// src/app/page.tsx
import { AppShell, PageHeader } from "@/components/shell"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <AppShell activeItem="workspace" workspace="My Product" userInitial="A">
      <div className="flex flex-col gap-4 p-6">
        <PageHeader title="Home" actions={<Button size="sm">Create</Button>} />
        {/* your content */}
      </div>
    </AppShell>
  )
}
```

---

## 2. Updating an existing app

If you already have a project that was cloned from this kit, you can pull in the latest DuBois component fixes and token updates without touching your pages.

### One-time setup

```bash
# Add the upstream kit as a remote
git remote add upstream https://github.com/gioa/db-starter-kit.git
git fetch upstream
```

### Syncing (recommended: cherry-pick specific files)

Preview what changed in the design system files:

```bash
git diff HEAD upstream/main -- src/components/ src/app/globals.css
```

Pull in only what you want:

```bash
# Design tokens
git checkout upstream/main -- src/app/globals.css

# A specific component fix
git checkout upstream/main -- src/components/ui/button.tsx

# All shell components
git checkout upstream/main -- src/components/shell/

# All icons
git checkout upstream/main -- src/components/icons/

# Claude Code skills + reference docs (Plugin API gotchas, Figma node map, CLAUDE.md rules)
git checkout upstream/main -- .claude-plugin/
git checkout upstream/main -- docs/
git checkout upstream/main -- CLAUDE.md
```

### What to sync regularly

| File / folder | What it contains | How often |
|---|---|---|
| `src/app/globals.css` | Token values, CSS variables | Every update |
| `src/components/ui/*.tsx` | Component style fixes | When a bug is fixed |
| `src/components/shell/*.tsx` | Shell component changes | When new shell features ship |
| `src/components/icons/` | New DuBois icons | When you need new icons |
| `CLAUDE.md` | DuBois rules baked into Claude | When design rules change |
| `.claude-plugin/` | figma-match-code skill + Plugin API gotchas | When Figma tooling improves |
| `docs/` | Getting-started guide, figma-node-map | When new components or workflows are added |

### What NOT to sync

- `src/app/` — your pages live here
- `src/app/page.tsx` — your home page
- Anything you've customized in `src/components/` beyond the originals

### Alternative: rebase (for early-stage projects)

If your project is new and you haven't diverged much:

```bash
git fetch upstream
git rebase upstream/main
# Resolve conflicts in your page files; keep upstream changes in src/components/
```

### Syncing icons from the DuBois source (internal Databricks)

If you have access to the design system monorepo:

```bash
node scripts/sync-icons.mjs
# Syncs from: /Users/joy/universe/design-system/src/design-system/Icon/__generated/icons
```

---

## 3. Writing designs back to Figma

This kit includes a `figma-match-code` skill that rebuilds Figma frames from your code using real component instances and design tokens — not placeholder shapes or hardcoded values.

### Prerequisites

**In Figma:**
1. Open your Figma file
2. Go to **Assets → Libraries** and enable the **"Databricks UI starter kit"** library (file key `KHFOMM4oUyT9XgeeXpbzns`)
   - This gives you access to all component instances (Button, Badge, Table, Shell components), design token variables, and text styles
3. Make sure the Figma MCP server is connected in your Claude Code session

**In the repo:**
- Make sure you're on the latest code for the page you want to sync

### Workflow

In Claude Code, describe the frame you want to create or update:

```
"Create a Figma component for the GenieCodePanel in the Shell page"
"Update the Figma frame for /catalog to match the current code"
"The Jobs page Figma frame is out of date — sync it to the code"
```

The `figma-match-code` skill will:
1. Read your React page/component code
2. Audit which Figma components already exist vs need to be created
3. Import real component instances (Button, Badge, icons, etc.) — never placeholder frames
4. Bind all fills and text to design token variables (no hardcoded hex)
5. Verify the result via Plugin API readback (not screenshots, which are cached)

### Example prompts

```
"Build a Figma component for the SuggestionPill — default state with grey bg,
hover state with AI gradient tint, sharp top-left corner"

"Rebuild the /jobs page Figma frame using real component instances — PageHeader,
FilterBar, Table rows, Pagination"

"Add the GenieCodePanel to the Shell screen frame in Figma"
```

### Advanced reference

The skill's reference docs are in `.claude-plugin/skills/figma-match-code/references/`:

| File | What it covers |
|---|---|
| `plugin-api-gotchas.md` | Critical API behaviours: sizing modes, font names, stale canvas render, `setBoundVariableForPaint` mutation trap, icon swapping |
| `figma-component-creation.md` | Token binding, real component instances, `createComponent()` vs `createFrame()`, variant naming |
| `figma-icon-system.md` | How to import DuBois SVG icons into Figma |
| `design-tokens-guide.md` | Full token inventory, variable keys, text style keys |

All component node IDs and variable keys for this file are in `docs/figma-node-map.md`.

---

## Demo pages reference

| Route | Pattern demonstrated |
|---|---|
| `/workspace` | Full shell with sidebar tree nav and notebook editor |
| `/jobs` | List page: tabs + filter bar + table + pagination |
| `/dashboards` | Card grid + detail panel |
| `/compute` | Tabs + filter selects + table + pagination |
| `/catalog` | Table detail page: columns, lineage, metadata sidebar |
| `/sql` | Multi-tab SQL editor with query tree, toolbar, and output panel |
| `/design-system` | All components, tokens, and icons in one place |

---

## Contributing back to the kit

If you build something in this repo that would be useful to other teams — a new shell page pattern, a component, or an improvement to the Figma tooling — here's how to contribute it.

### Adding a new demo page to the shell

1. **Build the page** in `src/app/(demo)/your-page/page.tsx` following existing patterns (use `AppShell`, `PageHeader`, DuBois components throughout)
2. **Wire the sidebar** — add an `href` to the relevant nav item in `src/components/shell/Sidebar.tsx`
3. **Add it to the landing page** — add a row to the `DEMOS` array in `src/app/page.tsx`
4. **Update the route table** in `README.md` and `docs/getting-started.md`
5. Open a PR against `gioa/db-starter-kit`

Good candidates: any Databricks page pattern that doesn't exist yet in `(demo)/` — monitoring dashboards, onboarding flows, settings pages, feature stores, etc.

### Updating the `figma-match-code` skill

The skill lives in `.claude-plugin/skills/figma-match-code/`. It has four reference docs that capture hard-won API behaviour:

| File | When to update |
|---|---|
| `references/plugin-api-gotchas.md` | You hit a new Plugin API bug or unexpected behaviour |
| `references/figma-component-creation.md` | You discover a new pattern for building components correctly |
| `references/figma-icon-system.md` | Icon import failures or new icon structures found |
| `references/design-tokens-guide.md` | New token variables or text styles added to the Figma file |

**Format for new gotchas:**
- Lead with the failure mode (what goes wrong)
- Show ❌ wrong code and ✅ correct code
- Explain *why* (the underlying Figma API behaviour)
- One gotcha per section with a clear heading

**When to update `docs/figma-node-map.md`:**
Any time you create a new Figma component in the starter kit file — add its node ID, key, and variant keys so future scripts can import it without re-running the discovery query.

---

## For maintainers of this kit

### Making this a GitHub Template Repository
- Settings → check **"Template repository"**

This lets teams click "Use this template" instead of forking, giving them a clean repo with no git history and no upstream relationship.

### Keeping the Figma file in sync

| What changed in code | How to apply in Figma |
|---|---|
| Token value (e.g. a color shifted) | Re-run token sync script or manually update variable values |
| New component added | Use `figma-match-code` skill to create a matching Figma component |
| New icon added | Import from DuBois library or run `figma-icon-system` script |
| Code Connect mapping | Copy `src/figma-code-connect.figma.tsx`, re-publish via `npm run figma:publish` |
