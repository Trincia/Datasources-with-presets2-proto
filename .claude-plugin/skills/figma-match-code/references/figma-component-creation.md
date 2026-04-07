# Figma Component Creation Guide

Patterns and rules for creating components in the Databricks UI starter kit Figma file (`KHFOMM4oUyT9XgeeXpbzns`).

---

## 1. Always use tokens, styles, and real components — never hardcode

| What you need | Correct approach | Wrong approach |
|---|---|---|
| A color | `figma.variables.importVariableByKeyAsync(key)` + `setBoundVariable` | `fills = [{ type: "SOLID", color: { r: 0.13, g: 0.44, b: 0.71 } }]` |
| A text style | `figma.importStyleByKeyAsync(key)` + `setTextStyleIdAsync` | `fontSize = 13` or `fontName = { family: "SF Pro" }` |
| An icon | `figma.importComponentByKeyAsync(key)` → create instance | Drawing a 14×14 frame placeholder |
| A primitive (Button, Input…) | `importComponentSetByKeyAsync` → find variant → `createInstance()` | Recreating the shape from scratch |

Token variable keys and component keys can be discovered via the Figma MCP `get_variable_defs` and `search_design_system` tools against file key `KHFOMM4oUyT9XgeeXpbzns`.

---

## 2. Always embed real component instances for interactive slots

**The problem:** When building composite components (Empty, Card, etc.) that contain an action slot, it's tempting to drop a text placeholder like `[Action]`. This is wrong — Code Connect maps the codebase's `<Button>` to Figma's Button component, so the Figma design must also embed a real Button instance.

**The rule:** Any slot in a Figma component that maps to a React component (`Button`, `Input`, `Badge`, etc.) must be a real imported instance, not a frame/text placeholder.

### Correct pattern

```js
// Import the component variant you need
const buttonComponent = await figma.importComponentByKeyAsync(
  "b56a945f378b71524d2caf03e6689fe702fa3f5f" // Variant=default, Size=sm
);

// Create an instance and customize the label
const btn = buttonComponent.createInstance();
const label = btn.findOne(n => n.type === "TEXT");
if (label) {
  await figma.loadFontAsync(label.fontName);
  label.characters = "Create new";
}

// Insert into parent's auto-layout at the right index
parent.insertChild(index, btn);
```

### Finding the right variant key

All Button variant keys are in `memory/figma_node_map.md`. Quick reference:

| Variant | Key |
|---|---|
| default / sm | `b56a945f378b71524d2caf03e6689fe702fa3f5f` |
| outline / sm | `82a0b4ee3b38fd1ceb3422a39e52d2b4f30c0612` |
| ghost / sm | `17e45dbbe09e72396230761d490300d408c53aac` |
| default / xs | `3eae3fca5ba45e108f16cd872ca9d3f204b9d0de` |
| ghost / icon-sm | `a5a1dd3b1a20014c772a4b5a8a390605dca03c90` |

### Replacing an existing placeholder

If a placeholder text node already exists, swap it in place to preserve auto-layout order:

```js
const placeholders = parent.findAll(n => n.type === "TEXT" && n.name === "[Action]");
for (const node of placeholders) {
  const idx = node.parent.children.indexOf(node);
  const btn = buttonComponent.createInstance();
  node.parent.insertChild(idx, btn);
  node.remove();
}
```

---

## 3. Variant overlap fix — always pre-position before `combineAsVariants`

**The problem:** `figma.combineAsVariants(variants, page)` places every variant at `(0, 0)` inside the new COMPONENT_SET, causing all variants to stack on top of each other.

**The fix:** Set each variant's `x` position before calling `combineAsVariants`, then resize the set to fit.

### Correct pattern

```js
// 1. Create all variant frames
const variantA = figma.createFrame(); // ...configure...
const variantB = figma.createFrame(); // ...configure...
const variantC = figma.createFrame(); // ...configure...

const variants = [variantA, variantB, variantC];

// 2. Pre-position with 24px horizontal gaps
const GAP = 24;
let x = 0;
for (const v of variants) {
  v.x = x;
  v.y = 0;
  x += v.width + GAP;
}

// 3. Combine — variants keep their x positions inside the set
const set = figma.combineAsVariants(variants, figma.currentPage);

// 4. Resize the set to the exact bounding box
const totalWidth = x - GAP;
const maxHeight = Math.max(...variants.map(v => v.height));
set.resize(totalWidth, maxHeight);
```

### Wrong pattern (causes overlap)

```js
// DON'T DO THIS — all variants land at (0,0)
const set = figma.combineAsVariants([variantA, variantB, variantC], figma.currentPage);
// Now all variants overlap
```

### Post-hoc fix (if combineAsVariants was already called)

If the set already exists and variants are stacked, reposition the children after the fact:

```js
const set = figma.currentPage.findOne(n => n.name === "MyComponent" && n.type === "COMPONENT_SET");
const GAP = 24;
let x = 0;
for (const child of set.children) {
  child.x = x;
  child.y = 0;
  x += child.width + GAP;
}
set.resize(x - GAP, Math.max(...set.children.map(c => c.height)));
```

---

## 4. Variant naming convention

Figma reads variant property/value from the component's `name` field using `Property=Value` syntax, comma-separated for multiple properties:

```js
variantSmall.name  = "Size=small";
variantMedium.name = "Size=default";
variantLarge.name  = "Size=large";
```

Multiple properties:
```js
frame.name = "Size=small, State=default";
frame.name = "Size=small, State=disabled";
```

The set's name becomes the component name shown in Figma's asset panel.

---

## 5. Applying variable bindings to a component

After creating an instance or frame, bind fill/stroke/text to Figma variables — never hardcode values:

```js
// Color fill via variable
const variable = await figma.variables.importVariableByKeyAsync("e3cf81e7...");
frame.fills = [figma.variables.setBoundVariableFillAsync
  ? ...
  : { type: "SOLID", color: { r: 0, g: 0, b: 0 } }]; // fallback only

// Recommended pattern: setBoundVariable
const paint = { type: "SOLID", color: { r: 0, g: 0, b: 0 } };
frame.fills = [paint];
figma.variables.setBoundVariable(frame, "fills", variable);
```

Variable keys for all semantic tokens are in `memory/figma_node_map.md`.

---

## 6. Components created in this file

All components and their node IDs are tracked in `memory/figma_node_map.md`. Before creating any component, check there first to avoid duplicates.

| Component | Node | Variants | Positioned width |
|---|---|---|---|
| Spinner | 1200-171 | small / default / large | 120px |
| Empty | 1201-25 | HasTitle × HasAction (4 variants) | 1672px |
| NotebookCell | 1203-43 | Python / SQL / Markdown / Scala / R | 3096px |
| Tree | 1204-33 | default / nav | 504px |
| SidePanel | 1205-11 | (single) | 280px |
| EditorTabBar | 1211-25 | default / active | 1224px |

---

## 7. Checklist before publishing a new component

- [ ] All fills bound to Figma variables (no raw hex)
- [ ] All text nodes bound to text styles (no manual font size/weight)
- [ ] All icon slots use real icon instances (no placeholder frames)
- [ ] Variants pre-positioned with 24px gaps (no overlap)
- [ ] Component set resized to bounding box after positioning
- [ ] Node ID recorded in `memory/figma_node_map.md`
- [ ] Code Connect entry added to `src/figma-code-connect.figma.tsx`
- [ ] Audit status updated in `docs/audit-status.md`
