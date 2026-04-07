# Figma Plugin API Gotchas

Critical behaviours discovered when rebuilding Figma frames to match code. Read before writing any `use_figma` script.

---

## Sizing Modes

**`"AUTO"` not `"HUG"`** — the Plugin API uses `"AUTO"` for hug-contents, not `"HUG"`.
```js
frame.primaryAxisSizingMode = "AUTO";   // ✅ hugs height
frame.primaryAxisSizingMode = "HUG";    // ❌ throws validation error
```

**`resize()` resets both sizing modes to `"FIXED"`** — always re-set the modes you want after calling `resize()`.
```js
frame.resize(512, 10);
frame.primaryAxisSizingMode = "AUTO"; // re-enable height hugging after resize
```

**`layoutSizingHorizontal = "FILL"` must be set AFTER appending to parent** — the node must already be a child of an auto-layout frame or it throws.
```js
parent.appendChild(child);          // append first
child.layoutSizingHorizontal = "FILL"; // then set fill sizing
```

---

## Text Nodes

**Text wrapping** — to get a fixed-width text node that wraps height:
```js
textNode.resize(desiredWidth, 80);   // set width; use generous height (not 1)
textNode.textAutoResize = "HEIGHT";  // set AFTER resize — resize() resets this to "NONE"
```
The height reads as the value you passed until Figma's layout engine recalculates after the plugin exits. That's expected.

**Font must be loaded before setting `characters`** — and you must load the *exact* fontName the text node uses. Component text nodes often use `Semibold`, not `Regular`.
```js
const textNode = instance.findOne(n => n.type === "TEXT");
await figma.loadFontAsync(textNode.fontName); // use the node's actual fontName
textNode.characters = "New label";
```

**Use `"SF Pro Text"`, not `"SF Pro"`** — in the Plugin API, `{ family: "SF Pro", style: "Regular" }` loads correctly but renders all glyphs with zero advance width (text is invisible/zero-width). Always use `"SF Pro Text"` instead:
```js
// ❌ Renders as zero-width text (invisible)
await figma.loadFontAsync({ family: "SF Pro", style: "Regular" });

// ✅ Correct
await figma.loadFontAsync({ family: "SF Pro Text", style: "Regular" });
textNode.fontName = { family: "SF Pro Text", style: "Regular" };
```
This applies to all styles: Regular, Medium, Semibold, Bold. When reading `fontName` from an existing text node, it will already say `"SF Pro Text"` — use that value directly via `loadFontAsync(textNode.fontName)` to avoid the issue.

**`setProperties()` on component instances is unreliable** — it often silently fails without an error. Use `detachInstance()` + direct `characters` edit instead.
```js
// ❌ Often fails silently
instance.setProperties({ "Label#39:0": "GitHub" });

// ✅ Reliable
const detached = instance.detachInstance(); // replaces instance in parent
const t = detached.findOne(n => n.type === "TEXT");
await figma.loadFontAsync(t.fontName);
t.characters = "GitHub";
```

---

## Stale Canvas Render

After detaching instances and editing text, Figma's canvas sometimes doesn't repaint until the user clicks. Fix by nudging the node's position:
```js
node.x += 0.5;
node.x -= 0.5;
figma.currentPage.selection = [node]; // selecting also triggers repaint
figma.currentPage.selection = [];
```
If nudging doesn't help for a specific node (e.g. badge), replace it entirely with a fresh plain frame — avoids the stale instance state altogether.

---

## Cloning Nodes Across Pages / Before Clearing

**Clone nodes you need BEFORE you clear the parent frame** — removed nodes are gone permanently.
```js
// ✅ Clone logo before clearing cover frame
const logoClone = logoNode.clone();
figma.currentPage.appendChild(logoClone); // park at page level
// ... now safe to clear the frame
for (const c of [...frame.children]) c.remove();
// ... later use logoClone
headerLeft.appendChild(logoClone);
```

**Cloning from another page** — `clone()` puts the copy in the same parent. Immediately append it to the target page/frame to move it across.
```js
const logoCopy = shellPage.topBar.logo.clone(); // clone is in Shell page
myFrame.appendChild(logoCopy);                   // moves it to Cover page
```

---

## Screenshots & Verification

**`get_screenshot` returns cached images** — the screenshot tool may return the same image even after changes. Always verify by reading values back through the plugin:
```js
// Verify text updated
const t = node.findOne(n => n.type === "TEXT");
return t.characters; // authoritative — not the screenshot
```

**Screenshot a specific small node** to bypass full-frame cache: use the card or button's node ID rather than the whole page frame.

---

## Token & Style Binding

Always use tokens, never raw values:
```js
// ✅ Bind to semantic variable
node.fills = [figma.variables.setBoundVariableForPaint(
  { type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color", bgVar
)];

// ✅ Apply text style
textNode.textStyleId = bodyBaseStyle.id;

// ❌ Never hardcode
node.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
textNode.fontSize = 13;
```

Strokes with bottom-only border (like a header border-b):
```js
node.strokeAlign = "INSIDE";
node.strokeBottomWeight = 1;
node.strokeTopWeight = 0;
node.strokeLeftWeight = 0;
node.strokeRightWeight = 0;
```
