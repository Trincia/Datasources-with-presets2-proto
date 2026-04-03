# Figma → Code 1:1 Mapping Rules

Common pitfalls when translating Figma designs to code. Each section names the root cause, the symptom, and the correct fix.

---

## 1. TabsList line variant — must be `w-full`

**Symptom:** The bottom border underline on a `variant="line"` Tabs bar only spans the tab labels, not the full container width.

**Root cause:** `TabsList` defaults to `w-fit` (intrinsic width — only as wide as its children). For the `line` variant, Figma shows the border extending full-width because the list frame fills the container. `w-fit` breaks this.

**Fix:** Always add `className="w-full"` to `TabsList` when using `variant="line"`. The base style also has `justify-center` which gets overridden to `justify-start` for the line variant in the component — so tab labels stay left-aligned while the border fills the full width.

```tsx
// ❌ Wrong — border stops at the last tab, tabs centered
<TabsList variant="line">

// ✅ Correct — border spans full container, tabs left-aligned
<TabsList variant="line" className="w-full">
```

---

## 2. SelectTrigger in filter bars — must hug content, not fill

**Symptom:** Filter dropdowns (Status, Creator, Tags) each expand to fill their flex row instead of sizing to their label.

**Root cause:** `SelectTrigger` has no default width, so in a `flex` container it acts like a block element and stretches. When the flex container wraps (`flex-wrap`), each select becomes the only item on its row and takes 100% width.

**Fix:** Add `className="w-auto min-w-[80px]"` to `SelectTrigger` for any filter/toolbar select that should hug content.

```tsx
// ❌ Wrong — stretches to fill flex row
<SelectTrigger>

// ✅ Correct — hugs label width
<SelectTrigger className="w-auto min-w-[80px]">
```

---

## 3. Table cell text — all data cells use `text-foreground`

**Symptom:** Secondary columns (Description, metadata) render in grey/muted text, looking visually de-emphasized compared to the Figma design.

**Root cause:** Defaulting to `text-muted-foreground` for anything that "looks secondary". In DuBois tables, `text-muted-foreground` is reserved for genuine supplementary text (timestamps, IDs shown beneath primary content). All data cell values should be `text-foreground`.

**Fix:** Never add `text-muted-foreground` to a `TableCell` unless the Figma design explicitly shows that column in grey.

```tsx
// ❌ Wrong — dims data that should be readable
<TableCell className="text-muted-foreground">{cluster.description}</TableCell>

// ✅ Correct — foreground is the default for table data
<TableCell>{cluster.description}</TableCell>
```

**Rule of thumb:**
- `text-foreground` → all data values
- `text-muted-foreground` → helper text, secondary badges, subtext *beneath* a primary value

---

## 4. Pagination — default is centered, override to right-align

**Symptom:** Pagination renders centered in the page even when the Figma design places it flush-right.

**Root cause:** The `Pagination` component renders `<nav className="mx-auto flex w-full justify-center">` — `w-full` + `justify-center` make it always centered regardless of its parent container.

**Fix:** Pass `className="justify-end"` to `Pagination` to override `justify-center`.

```tsx
// ❌ Wrong — always centered
<Pagination>

// ✅ Correct — right-aligned
<Pagination className="justify-end">
```

---

## 5. Always embed real component instances — no placeholder frames

See `figma-component-creation.md` §2. When a React component slot (e.g. `action`) maps to a Figma Button, the Figma design must also embed a real Button instance — not a `[Action]` text node or a plain frame.

---

## 6. Variant overlap — pre-position before `combineAsVariants`

See `figma-component-creation.md` §3. All variants land at `(0,0)` after `combineAsVariants`. Set `child.x` before calling it.

---

## Quick reference

| Figma pattern | Common mistake | Correct code |
|---|---|---|
| Full-width tab underline | `<TabsList variant="line">` | `<TabsList variant="line" className="w-full">` |
| Filter dropdown hugging label | `<SelectTrigger>` (no width) | `<SelectTrigger className="w-auto min-w-[80px]">` |
| Table data cell | `className="text-muted-foreground"` | No class (inherits `text-foreground`) |
| Right-aligned pagination | `<Pagination>` | `<Pagination className="justify-end">` |
| Action slot in component | `[Action]` text/frame | Real `buttonComponent.createInstance()` |
| Figma variant set | `combineAsVariants` then position | Position `x` offsets first, then `combineAsVariants` |
