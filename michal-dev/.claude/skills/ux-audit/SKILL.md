---
name: ux-audit
description: This skill should be used when the user wants to audit, review, or improve the UI/UX quality of their React components and design files. It performs a comprehensive analysis of visual hierarchy, spacing, typography, color contrast, interactive element usability, accessibility, and responsive design — catching subtle issues that human review often misses. After analysis, it suggests concrete fixes and implements them.
argument-hint: [component-path-or-page]
allowed-tools: Read, Grep, Glob, Bash(npx *), mcp__pencil__batch_get, mcp__pencil__get_screenshot, mcp__pencil__snapshot_layout, mcp__pencil__get_variables, mcp__pencil__search_all_unique_properties
---

# UX Audit

Perform a comprehensive UI/UX audit of React components and .pen design files, identifying visual hierarchy errors, usability issues, and accessibility problems that are easy to miss during manual review — then suggest and implement fixes.

## Audit Workflow

### Phase 1: Gather Context

1. Determine the audit scope:
   - If `$ARGUMENTS` specifies a component path or page name, audit that specific target
   - If no arguments, audit all page routes and their component trees

2. Read the target component(s) and their imports to build a full picture of the rendered UI

3. If a `.pen` design file exists in `pencil-design/`, use Pencil MCP tools to:
   - Run `batch_get` to read the corresponding design frame
   - Run `snapshot_layout` to get computed layout rectangles
   - Run `get_screenshot` to visually inspect the rendered design
   - Run `search_all_unique_properties` to catalog all colors, fonts, spacing values
   - Run `get_variables` to check the design token definitions

4. Read `app/globals.css` and `tailwind.config.*` (if present) to understand the design token system

5. Run the spacing consistency script to detect irregular spacing patterns:
   ```bash
   python3 .claude/skills/ux-audit/scripts/spacing_audit.py src/components/
   ```

6. Run the contrast checker script on extracted color pairs:
   ```bash
   python3 .claude/skills/ux-audit/scripts/contrast_checker.py
   ```

7. Run the interactive elements audit script:
   ```bash
   python3 .claude/skills/ux-audit/scripts/interactive_audit.py src/components/
   ```

### Phase 2: Analyze — The 9-Point UX Checklist

Work through each checklist category systematically. For each issue found, record:
- **Category** (which of the 9 points)
- **Severity**: `critical` | `major` | `minor` | `suggestion`
- **Location**: file path + line number or design node ID
- **Issue**: what is wrong
- **Fix**: concrete code or design change

Refer to [references/ux-checklist.md](references/ux-checklist.md) for the detailed heuristics and thresholds for each category.

#### The 9 Audit Categories

1. **Visual Hierarchy** — Heading levels, font size ratios, weight contrast, z-ordering
2. **Spacing & Rhythm** — Consistent padding/margin/gap, vertical rhythm, section breathing room
3. **Color & Contrast** — WCAG AA contrast ratios (4.5:1 text, 3:1 large text), color consistency, dark section legibility
4. **Typography** — Font pairing consistency, line-height, max line length (45-75ch), orphan/widow prevention
5. **Interactive Elements** — Click targets (min 44px), hover/focus states, cursor styles, disabled states, link distinguishability
6. **Responsive & Overflow** — Fixed widths that break on small screens, horizontal overflow, image aspect ratios, text truncation
7. **Accessibility** — Semantic HTML structure, ARIA labels, alt text, focus order, skip links, landmark regions
8. **Alignment & Consistency** — Grid alignment, inconsistent border-radius, mixed spacing units, rogue one-off values
9. **Content UX** — Placeholder text left in, truncated text, missing empty states, loading states, error states

### Phase 3: Report

Present findings as a structured report:

```
## UX Audit Report: [Target]

### Summary
- X critical, Y major, Z minor issues found
- Overall UX health score: [A/B/C/D/F]

### Critical Issues
[List with severity, location, description, and proposed fix]

### Major Issues
[...]

### Minor Issues & Suggestions
[...]
```

Scoring guide:
- **A** (0 critical, 0-2 major) — Production-ready
- **B** (0 critical, 3-5 major) — Ship with known issues
- **C** (1-2 critical OR 6+ major) — Needs fixes before shipping
- **D** (3+ critical) — Significant rework needed
- **F** (5+ critical) — Fundamental UX problems

### Phase 4: Implement Fixes

After presenting the report, implement all `critical` and `major` fixes automatically:

1. Group fixes by file to minimize edits
2. For each file, apply fixes in reverse line-number order (bottom-up) to preserve line numbers
3. After applying fixes, re-run the relevant audit scripts to verify improvements
4. Present a before/after diff summary

For `minor` and `suggestion` level issues, list the recommended changes and ask whether to implement them.

## Design-to-Code Consistency Check

When both a `.pen` design file and React components exist, perform a cross-check:

1. Compare design token values (colors, spacing, typography) against CSS/Tailwind values used in components
2. Flag any drift between design and code (e.g., design shows `gap: 24px` but code uses `gap-8` which is `32px`)
3. Check that interactive elements in the design are properly mapped to semantic HTML (buttons are `<button>`, links are `<a>`, etc.)
4. Verify image dimensions and aspect ratios match between design and implementation

## Resources

### scripts/
- `spacing_audit.py` — Extracts all spacing values from Tailwind classes, flags inconsistencies
- `contrast_checker.py` — Checks WCAG AA/AAA contrast ratios for text/background color pairs
- `interactive_audit.py` — Scans for interactive elements missing hover states, proper cursor, or min tap targets

### references/
- `ux-checklist.md` — Detailed heuristics, thresholds, and examples for each of the 9 audit categories
