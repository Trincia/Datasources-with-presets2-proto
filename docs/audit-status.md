# DuBois → Starter Kit Audit Status

Tracks per-component verification against `/Users/joy/universe/design-system/src`.

**Legend:**
- ✅ Verified — all properties checked against source, matches production
- ⚠️ Partial — some properties checked, gaps remain
- ❌ Pending — not yet audited
- 🔧 Fixed this session — was wrong, now corrected

Each row covers: size · radius · color/tokens · typography · hover · focus · disabled · dark mode

---

## Primitive Components

| Component | Status | Notes |
|---|---|---|
| Button | ✅ | 🔧 `font-normal` (was semibold). Outline border: `border-input`. Hover: blue text+border. Focus: `ring-ring ring-[2px]` solid. Heights: 32px sm, 24px xs. |
| Input | ✅ | 🔧 Focus ring solid 2px. Hover border turns blue. Height `h-8` (32px). |
| Select / SelectTrigger | ✅ | 🔧 Same focus + hover fixes as Input. Height `h-8`. No size variants. |
| Textarea | ⚠️ | Focus ring likely needs same solid 2px fix — not yet verified against source. |
| Checkbox | ⚠️ | Size, color, focus ring not verified against DuBois source. |
| Switch | ⚠️ | Track/thumb colors, sizes not verified against source. |
| Label | ❌ | Font size, weight not verified. |
| Badge / Tag | ✅ | 🔧 `font-normal` (was semibold). All 11 tag variants use exact RGBA CSS vars (`--tag-bg-*`, `--tag-text-*`). Added `charcoal`, `default_tag`. |
| Alert | ✅ | 🔧 Dark mode borders solid, backgrounds 16% opacity. Four variants match source. |
| Skeleton | ❌ | Animation timing, color not verified. |
| Avatar | ❌ | Size, fallback typography not verified. |
| Separator | ❌ | Color token not verified. |

---

## Composite Components

| Component | Status | Notes |
|---|---|---|
| Tabs | ✅ | 🔧 Height `h-8`. Line variant: `gap-4`, `p-0`, triggers `px-0`. All triggers `font-semibold` (not just active). Radius `rounded` not `rounded-md`. |
| Table | ✅ | 🔧 Cell padding: `px-2 py-[6px]`. Header: `px-2`. Row states via CSS vars. |
| Dialog / Modal | ⚠️ | Title font-size/weight checked. Body padding 40px. DialogBody slot. Overlay color/opacity not verified against source. |
| Tooltip | ✅ | 🔧 `bg-neutral-800` (#161616, not grey-800). Font size `text-sm` (13px). Arrow matches. |
| Card | ⚠️ | Radius `rounded-md` (8px) ✅. Shadow token used. Padding not verified against source. |
| Breadcrumb | ⚠️ | Link color `text-primary`, current `text-muted-foreground`, separator ChevronRight. Not verified against source. |
| Dropdown Menu | ❌ | Item height, hover color, font size not verified. |
| Popover | ❌ | Not verified. |
| Sheet | ❌ | Not verified. |
| Command / Combobox | ❌ | Not verified. |
| Progress | ❌ | Track/fill colors, height not verified. |
| Slider | ❌ | Not verified. |
| Calendar / Date Picker | ❌ | Not verified. |

---

## DuBois-Specific Components

| Component | Status | Notes |
|---|---|---|
| Spinner | ✅ | Matches production: animated SVG arc, 3 sizes (16/24/32px), `muted-foreground` default, `inheritColor` prop. |
| Empty | ✅ | Centered column, 64px icon slot (InboxIcon default), title/description/action slots. |
| SegmentedControl | ✅ | Active: `bg-primary/5 border-primary text-primary font-semibold`. Controlled value+onValueChange. |
| ListItem | ✅ | 32px row, icon slot, actions hidden until hover/selected, active `bg-primary/10 text-primary`. |
| DbIcon | ⚠️ | AI gradient color verified. Size prop behavior not fully verified. |
| FilterBar | ❌ | Added to page but not audited against source. |
| Pagination | ❌ | Not audited against source. |
| NotebookCell | ⚠️ | Added to workspace page. Token usage not verified against source. |

---

## Shell Components

| Component | Status | Notes |
|---|---|---|
| TopBar | ⚠️ | Height `h-12` (48px) ✅. Logo ✅. Search input styling. Icon colors `text-muted-foreground`. AppIcon. AI sparkle button. Right section layout — not fully verified against product shell code. |
| Sidebar | ⚠️ | Width 220px ✅. Active item colors ✅. Section labels ✅. Chevron behavior ✅. NewButton ✅. Not verified: scroll behavior, section collapse animation, exact item heights. |
| PageHeader | ⚠️ | Breadcrumb + title + actions layout ✅. Avatar slot. Badge slot. Not verified: exact spacing against source. |
| AppShell | ⚠️ | Open/closed state ✅. Main content card styling ✅. `ml-2` when closed ✅. Not verified: responsive breakpoints, z-index layering. |

---

## Design Tokens (globals.css)

| Area | Status | Notes |
|---|---|---|
| Blue primitive scale | ✅ | blue-100 through blue-800 |
| Grey primitive scale | ✅ | 🔧 Added grey-350, grey-650 |
| Neutral primitive scale | ✅ | neutral-100 through neutral-800 |
| Red / Green / Yellow primitives | ✅ | 🔧 Added 100–400+ steps |
| Semantic light mode | ✅ | All mapped to CSS vars |
| Semantic dark mode | ✅ | 🔧 Alert borders, alert backgrounds, shadows fixed |
| Tag/Badge tokens | ✅ | 🔧 All 11 variants × light+dark, exact RGBA from source |
| Shadow tokens | ✅ | 🔧 Dark mode overrides added (0.45–0.87 opacity) |
| Code background | ✅ | 🔧 Added `--code-bg` light + dark |
| Focus ring | ✅ | 🔧 Solid 2px (`ring-ring ring-[2px]`) everywhere |
| Table row states | ✅ | 🔧 Via CSS vars, not hardcoded rgba |
| Action hover token | ✅ | `--action-default-bg-hover` added |
| Typography scale | ✅ | h1–h6 + body 13px + `text-hint` 12px in @theme |
| Code element global style | ✅ | 🔧 Added `code {}` rule: 13px, monospace, `var(--code-bg)` |
| AI gradient | ✅ | `bg-ai-gradient`, `text-ai-gradient`, `border-ai` |
| Radius scale | ✅ | 🔧 `--radius-2xl` corrected to 24px |

---

## Figma Code Connect

| Component | Mapped | Notes |
|---|---|---|
| Button | ✅ | |
| Input | ✅ | |
| Badge | ✅ | Secondary badge colors (coral/brown/indigo/lemon/lime/pink/purple/teal/turquoise) need 18 Figma variables created + bound |
| Tabs | ✅ | |
| Table | ✅ | |
| Alert | ✅ | |
| Avatar | ✅ | |
| Breadcrumb | ✅ | |
| Card | ✅ | |
| Checkbox | ✅ | |
| Dialog | ✅ | |
| DropdownMenu | ✅ | |
| Label | ✅ | |
| RadioGroup | ✅ | |
| Select | ✅ | |
| Sheet | ✅ | |
| Switch | ✅ | |
| Tooltip | ✅ | |
| Icons (445) | ✅ | |
| FilterBar | ✅ | |
| Pagination | ✅ | |
| SegmentedControl | ✅ | node 802-14 |
| ListItem | ✅ | node 803-10 |
| AppSwitcher | ✅ | node 761-8 |
| Progress | ✅ | node 390-11 |
| AppShell | ✅ | node 798-124 |
| NewButton | ✅ | node 798-121 |
| TopBar | ✅ | node 209-36 |
| Sidebar | ✅ | node 214-89 |
| PageHeader | ✅ | node 446-6 — now includes `starred` boolean prop mapping |
| Spinner | ✅ | node 1200-171 — added 2026-04-03 |
| Empty | ✅ | node 1201-25 — added 2026-04-03 |
| NotebookCell | ✅ | node 1203-43 — added 2026-04-03 |
| Tree | ✅ | node 1204-33 — added 2026-04-03 |
| SidePanel | ✅ | node 1205-11 — added 2026-04-03 |
| EditorTabBar | ✅ | node 1211-25 — added 2026-04-03 |

### Still needs publish
Run `FIGMA_ACCESS_TOKEN=<token> npm run figma:publish` to push all mappings live.

---

## Figma File Gaps (not yet resolved)

| Item | Priority | Detail |
|---|---|---|
| 9 secondary Badge color variables | 🔴 High | coral/brown/indigo/lemon/lime/pink/purple/teal/turquoise — 18 vars (bg+text) need creating in Figma variable collection and binding to badge fills |
| Alert info variant variables | 🟡 Med | `--border-info` (blue-200) and `--background-info` (blue-100) missing from Figma variable collection |
| Button `icon-xs` variant | 🟡 Med | 24×24 ghost icon-only button exists in code (used throughout shell), no Figma component variant |
| TopBar search text style | 🟡 Med | body/md (16px) — should be body/base (13px) |
| PageHeader title text style | 🟡 Med | Hardcoded 22px — should bind to heading/h3 or heading/h4 text style |

---

## Shell Components

| Component | Status | Notes |
|---|---|---|
| Sidebar | ⚠️ | Width 200px ✅. Active item ✅. Now uses Tree component internally. Not verified: scroll, collapse animation. |
| TopBar | ⚠️ | Height 48px ✅. Logo ✅. Search font size wrong in Figma (see gaps above). |
| PageHeader | ⚠️ | Layout ✅. Starred prop now in Figma + Code Connect ✅. Exact spacing not verified. |
| AppShell | ⚠️ | Open/closed ✅. Main card ✅. Responsive breakpoints not verified. |
| Tree | ✅ | variant=nav/default ✅. Chevron alignment ✅. Figma + Code Connect ✅. |
| SidePanel | ✅ | 280px, header/search/tree structure ✅. Figma + Code Connect ✅. |
| EditorTabBar | ✅ | Top indicator (DuBois) ✅. Button nesting fixed ✅. Figma + Code Connect ✅. |

---

## Next Priority Queue

1. **Create 18 Figma badge color variables** — bind to the 9 secondary badge variants (highest impact for design accuracy)
2. **Textarea / Checkbox / Switch** — finish primitive audit
3. **Dropdown Menu** — heavily used, not yet verified
4. **Button `icon-xs` Figma variant** — add to Button component set
5. **Alert info variables** — add `--border-info` + `--background-info` to globals.css and Figma
6. **Run figma:publish** — push all new Code Connect mappings live
