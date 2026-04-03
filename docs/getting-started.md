# Getting Started with the Databricks UI Starter Kit

---

## For maintainers of this kit

### Repository setup
Make this repo a **GitHub Template Repository**:
- Settings → check **"Template repository"**

This lets teams click "Use this template" and get a clean repo with no git history and no fork relationship — the correct UX for "start a new app from this."

---

## For teams starting a new project

### Step 1 — Create your repo
Click **"Use this template"** on GitHub (not "Fork"). This gives you a clean slate.

### Step 2 — Delete the demo content
The demo pages live in a [route group](https://nextjs.org/docs/app/building-your-application/routing/route-groups) so they don't pollute your URL structure:

```bash
rm -rf src/app/\(demo\)   # removes /shell, /jobs, /dashboards, /compute, /workspace, /design-system
rm src/app/page.tsx       # removes the starter kit home page
```

Then create your own `src/app/page.tsx` as your app's entry point.

### Step 3 — What you keep
Everything under `src/components/` is yours to use:

```
src/components/
├── ui/        ← DuBois-overridden shadcn components (Button, Input, Table, etc.)
├── shell/     ← AppShell, TopBar, Sidebar, PageHeader, FilterBar, NewButton
└── icons/     ← 445 DuBois SVG icons
```

`src/app/globals.css` — all DuBois design tokens (keep this).
`src/app/layout.tsx` — ThemeProvider + TooltipProvider (keep this).

### Step 4 — Build your first page

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

## Pulling in design updates from the upstream kit

Once your project diverges from the template, you can't do a simple `git pull`. There are two strategies depending on how much you've customized:

### Strategy A — Sync individual component files (recommended)

The design system lives in `src/components/` and `src/app/globals.css`. These files change independently of your app pages. When the kit ships a fix (e.g. a focus ring correction, a new icon), you can cherry-pick just the files you want:

```bash
# Add the upstream kit as a remote (one-time setup)
git remote add upstream https://github.com/gioa/db-starter-kit.git
git fetch upstream

# Preview what changed in the component files
git diff HEAD upstream/main -- src/components/ src/app/globals.css

# Merge only the component changes you want
git checkout upstream/main -- src/components/ui/button.tsx
git checkout upstream/main -- src/app/globals.css
git checkout upstream/main -- src/components/icons/
```

**What to sync regularly:**
- `src/app/globals.css` — token updates, new CSS variables
- `src/components/ui/*.tsx` — component style fixes
- `src/components/shell/*.tsx` — shell component fixes
- `src/components/icons/` — new DuBois icons

**What NOT to sync (it's yours now):**
- `src/app/` — your pages
- `src/app/page.tsx` — your home page

### Strategy B — Rebase on upstream (for early-stage projects)

If your project is new and you haven't diverged much, you can rebase:

```bash
git fetch upstream
git rebase upstream/main
# Resolve conflicts in your page files; keep upstream changes in src/components/
```

This keeps your git history clean and brings in all upstream fixes automatically.

---

## Keeping the design system in sync

| What changed | How to apply |
|---|---|
| Token value (e.g. a color shifted) | Copy `src/app/globals.css` from upstream |
| Component style fix (e.g. focus ring) | Copy the specific `src/components/ui/*.tsx` file |
| New icon added | Run `node scripts/sync-icons.mjs` (syncs from DuBois source) |
| New shell component | Copy `src/components/shell/<Component>.tsx` |
| Figma Code Connect update | Copy `src/figma-code-connect.figma.tsx`, re-publish |

### Icon sync from DuBois source (internal Databricks use)
```bash
# Syncs all 445 icons from the design system monorepo
node scripts/sync-icons.mjs
# Source: /Users/joy/universe/design-system/src/design-system/Icon/__generated/icons
```

---

## What the `(demo)` folder is for

`src/app/(demo)/` contains reference implementations of common Databricks page patterns:

| Route | Pattern demonstrated |
|---|---|
| `/shell` | Full shell with sidebar tree nav and notebook editor |
| `/jobs` | List page: tabs + filter bar + table + pagination |
| `/dashboards` | Card grid + detail panel |
| `/compute` | Tabs + filter selects + table + pagination |
| `/workspace` | Editor layout: SidePanel + EditorTabBar + NotebookCell |
| `/design-system` | All components, tokens, and icons in one place |

**Keep these in your repo as a reference** — or delete them once your team is comfortable building with the kit. They don't appear in your app's nav unless you link to them.

---

## AI usage

The `CLAUDE.md` at the repo root contains all DuBois design rules baked in. When using Claude Code or any AI assistant in this repo, those rules are automatically applied.

For Figma-to-code work, the rules in `docs/design-system-rules.md` give the AI full context on the token system, component locations, import paths, and known gotchas.
