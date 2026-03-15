# UX Audit Checklist — Detailed Heuristics & Thresholds

## 1. Visual Hierarchy

**What to check:**
- Heading sizes follow a consistent typographic scale (e.g., 1.25x or 1.333x ratio between levels)
- Only one `<h1>` per page
- Heading levels never skip (no `<h1>` → `<h3>` without `<h2>`)
- Primary CTA buttons are visually dominant (larger, higher contrast, bolder than secondary actions)
- Visual weight guides the eye: largest/boldest elements convey the most important information
- Z-index stacking is intentional — no accidental overlaps or hidden content

**Thresholds:**
- Font size ratio between heading levels: between 1.2x and 1.5x (flag if < 1.15x or > 2x)
- H1 should be >= 36px on desktop, >= 28px on mobile
- Body text should be >= 16px
- CTA buttons should be visually distinguishable from surrounding text (min 2x weight or size contrast)

**Common issues:**
- Multiple elements competing for attention at the same visual weight
- Section headings that are barely larger than body text
- Decorative labels styled more prominently than actual headings
- Inconsistent heading sizes across different pages/sections

## 2. Spacing & Rhythm

**What to check:**
- Consistent spacing scale is used (e.g., 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96)
- Related elements are closer together than unrelated elements (Law of Proximity)
- Section spacing is larger than intra-section spacing
- Vertical rhythm is maintained (consistent line-height multiples)
- Card grids have consistent gaps
- No spacing values that fall outside the defined scale

**Thresholds:**
- Section top/bottom padding: >= 64px on desktop, >= 40px on mobile
- Card grid gap: >= 16px
- Paragraph spacing: ~1.5x body line-height
- Max unique spacing values before flagging: 8 (more suggests inconsistency)
- Padding inside containers should be >= 16px

**Common issues:**
- Adjacent sections with different padding creating visual imbalance
- Card grids where gap varies between rows
- First/last child elements with extra margins causing asymmetry
- Spacing values like 13px, 17px, 22px that don't follow any scale

## 3. Color & Contrast

**What to check:**
- All text/background combinations meet WCAG AA contrast:
  - Normal text (< 18px or < 14px bold): **4.5:1** minimum
  - Large text (>= 18px or >= 14px bold): **3:1** minimum
  - UI components and graphical objects: **3:1** minimum
- Colors used consistently (same color doesn't mean different things in different contexts)
- Dark sections maintain readability — muted text on dark backgrounds >= 4.5:1
- No pure #000 on pure #FFF (harsh; prefer #111 or #1A1A1A on #FAFAFA)
- Focus indicators have >= 3:1 contrast against surrounding area
- Links distinguishable from body text without relying solely on color

**WCAG AA Contrast Ratios:**
| Element | Min Ratio |
|---------|-----------|
| Body text | 4.5:1 |
| Large text (18px+) | 3:1 |
| Bold large text (14px+) | 3:1 |
| UI components | 3:1 |
| Non-text elements | 3:1 |

**Common issues:**
- Light gray text (#999, #AAA, #BBB) on white backgrounds — usually fails AA
- White text on light-colored image backgrounds without overlay
- Placeholder text with insufficient contrast
- Muted text colors that work on light backgrounds but fail on dark sections

## 4. Typography

**What to check:**
- Line length (measure) is between 45-75 characters for body text (ideal: 66ch)
- Line-height is appropriate: 1.4-1.6 for body, 1.1-1.3 for headings
- Font pairing is consistent (max 2-3 font families across the site)
- Font weights are from the loaded variants (not browser-synthesized bold/italic)
- Letter-spacing adjustments are intentional (uppercase text needs positive tracking)
- No font-size below 12px anywhere
- Italic text is used sparingly and intentionally

**Thresholds:**
- Body line-height: 1.4 - 1.6 (flag if < 1.3 or > 1.8)
- Heading line-height: 1.1 - 1.3 (flag if < 1.0 or > 1.5)
- Max line width: 75ch / ~680px (flag if > 80ch / 720px)
- Min line width: 45ch / ~400px (flag if text container is too narrow on desktop)
- Uppercase text letter-spacing: >= 0.05em

**Common issues:**
- Body text in containers wider than 900px with no max-width creating 100+ character lines
- Headings with body-text line-height (too much space between lines)
- Mixing serif/sans-serif inconsistently within the same context
- Font-weight 600 used but only 400 and 700 loaded (browser synthesizes, looks bad)

## 5. Interactive Elements

**What to check:**
- All clickable elements have `cursor: pointer`
- Touch/click targets are >= 44x44px (WCAG 2.5.5 AAA) or >= 24x24px (WCAG 2.5.8 AA)
- All interactive elements have visible hover states
- All interactive elements have visible focus states (for keyboard navigation)
- Buttons are `<button>` or `<a>`, not `<div>` or `<span>` with onClick
- Links that navigate look different from buttons that perform actions
- Disabled states are visually distinct and have `aria-disabled` or `disabled`
- No interactive elements nested inside other interactive elements (`<a>` inside `<button>`)

**Thresholds:**
- Min touch target: 44x44px (AAA), 24x24px (AA minimum)
- Hover state should change >= 1 visual property (opacity, color, background, transform, underline)
- Focus ring: 2px+ solid outline with >= 3:1 contrast
- Transition duration for hover: 150ms-300ms (flag if > 500ms or 0ms)

**Common issues:**
- Cards that look clickable but have no hover state or cursor change
- CTA text like "Learn More →" rendered as `<span>` not `<a>` or `<button>`
- Tiny icon buttons with no padding (< 44px tap target)
- Text links with no underline or color differentiation from body text
- Focus states removed (`outline: none`) without replacement

## 6. Responsive & Overflow

**What to check:**
- No fixed pixel widths on containers that could cause horizontal scroll
- Images have `max-width: 100%` or equivalent
- Text doesn't overflow its container
- Flex/grid layouts wrap properly on narrow viewports
- Font sizes scale down on mobile (h1 shouldn't be 72px on a 375px screen)
- No horizontal scrollbar at any standard viewport width (375, 768, 1024, 1440)
- Touch targets don't overlap on mobile
- Navigation collapses to mobile menu pattern on small screens

**Thresholds:**
- Max fixed width on any non-max-width container: flag if > 600px without responsive override
- Image containers should have overflow: hidden or proper aspect-ratio
- Font size at mobile breakpoint: headings max 48px, body 16px
- Min viewport width that should work: 320px

**Common issues:**
- `w-[700px]` or `width: 700px` without corresponding responsive class
- Side-by-side layouts that don't stack on mobile (`flex` without `flex-wrap`)
- Images with fixed height that squash on narrow viewports
- Absolute-positioned elements that escape their container on mobile
- Tables that overflow horizontally without `overflow-x: auto` wrapper

## 7. Accessibility

**What to check:**
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<aside>`
- All images have `alt` attributes (decorative images: `alt=""`, meaningful images: descriptive alt)
- Form inputs have associated `<label>` elements
- ARIA landmarks are used correctly (not duplicated, not misused)
- Heading hierarchy is logical (h1 → h2 → h3, no skips)
- Color is not the only indicator of state (errors need text/icon too, not just red border)
- Skip navigation link exists for keyboard users
- Language attribute set on `<html>`
- No `tabindex` > 0 (disrupts natural tab order)
- Decorative elements hidden from screen readers (`aria-hidden="true"`)

**Required landmarks:**
| Landmark | Element | Required |
|----------|---------|----------|
| Banner | `<header>` | 1 per page |
| Navigation | `<nav>` | 1+ per page |
| Main | `<main>` | Exactly 1 |
| Contentinfo | `<footer>` | 1 per page |

**Common issues:**
- `<div onClick={...}>` instead of `<button>` — not keyboard-accessible
- Images with `alt="image"` or `alt="photo"` instead of descriptive text
- Form inputs with placeholder text but no label
- Multiple `<nav>` elements without `aria-label` to distinguish them
- Section headings rendered as styled `<p>` or `<div>` instead of `<h2>`/`<h3>`

## 8. Alignment & Consistency

**What to check:**
- All elements align to a consistent grid
- Border-radius values are consistent (don't mix 4px, 6px, 8px, 10px, 12px randomly)
- Shadow values are from a consistent scale
- Padding inside similar components (cards, buttons) is consistent
- Icon sizes are consistent within the same context
- Divider/separator styles are consistent
- Same component doesn't look different in different sections

**Thresholds:**
- Max unique border-radius values before flagging: 4
- Max unique shadow definitions before flagging: 3
- Padding variance within same component type: 0 (should be identical)
- Icon size variance within same context: 0

**Common issues:**
- Cards in a grid where one has `rounded-lg` and another has `rounded-xl`
- Buttons with 3 different padding values across the site
- Section dividers that are `border-t` in some places and `<hr>` in others
- Inconsistent icon sizes (20px, 24px, 16px mixed in the same navigation)

## 9. Content UX

**What to check:**
- No "Lorem ipsum" or placeholder text left in production code
- No empty `href="#"` links without proper handler
- Truncated text has ellipsis and title/tooltip for full text
- Empty states exist for lists/grids that could have zero items
- Loading states exist for async content
- Error states exist for forms and data fetching
- Success feedback exists for form submissions
- 404 page exists and is helpful
- Long content has proper pagination or "load more"

**Common issues:**
- "Coming soon" text left from development
- `href="#"` links that scroll to top when clicked
- Image placeholders (gray boxes) still visible
- Form submit button with no loading or success state
- List component that renders blank when data is empty
