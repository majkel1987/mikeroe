#!/usr/bin/env python3
"""
WCAG Contrast Checker — Analyzes color pairs from CSS/Tailwind for accessibility compliance.

Checks:
- WCAG AA: 4.5:1 for normal text, 3:1 for large text (18px+ or 14px bold)
- WCAG AAA: 7:1 for normal text, 4.5:1 for large text

Usage:
    python3 contrast_checker.py                         # Scan project defaults
    python3 contrast_checker.py --css app/globals.css    # Scan specific CSS file
    python3 contrast_checker.py --pairs "#333:#FFF" "#666:#FAF8F5" "#CCC:#0A0A0A"
"""

import sys
import re
import math


# Named colors commonly used in web
NAMED_COLORS = {
    "white": "#FFFFFF", "black": "#000000", "red": "#FF0000",
    "transparent": None,
}


def hex_to_rgb(hex_color):
    """Convert hex color to (R, G, B) tuple."""
    hex_color = hex_color.strip().lstrip("#")
    if len(hex_color) == 3:
        hex_color = "".join(c * 2 for c in hex_color)
    if len(hex_color) != 6:
        return None
    try:
        return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    except ValueError:
        return None


def relative_luminance(rgb):
    """Calculate relative luminance per WCAG 2.0."""
    def linearize(c):
        c = c / 255.0
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = rgb
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)


def contrast_ratio(color1_rgb, color2_rgb):
    """Calculate contrast ratio between two colors."""
    l1 = relative_luminance(color1_rgb)
    l2 = relative_luminance(color2_rgb)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)


def evaluate_contrast(ratio):
    """Evaluate contrast ratio against WCAG levels."""
    results = {
        "ratio": round(ratio, 2),
        "aa_normal": ratio >= 4.5,
        "aa_large": ratio >= 3.0,
        "aaa_normal": ratio >= 7.0,
        "aaa_large": ratio >= 4.5,
    }
    if ratio >= 7.0:
        results["grade"] = "AAA"
    elif ratio >= 4.5:
        results["grade"] = "AA"
    elif ratio >= 3.0:
        results["grade"] = "AA-large-only"
    else:
        results["grade"] = "FAIL"
    return results


def extract_colors_from_css(filepath):
    """Extract color definitions from a CSS file."""
    colors = {}
    try:
        content = open(filepath).read()
    except FileNotFoundError:
        print(f"Warning: File not found: {filepath}")
        return colors

    # CSS custom properties: --color-name: #HEX
    for match in re.finditer(r'--([\w-]+):\s*(#[0-9A-Fa-f]{3,8})', content):
        colors[f"--{match.group(1)}"] = match.group(2)

    # Direct hex values
    for match in re.finditer(r'(?:color|background|background-color|border-color):\s*(#[0-9A-Fa-f]{3,8})', content):
        colors[match.group(1)] = match.group(1)

    return colors


def get_default_pairs():
    """Return common text/background pairs from the Atlier design system."""
    return [
        # Light theme pairs
        ("#000000", "#FAF8F5", "Primary text on page background"),
        ("#666666", "#FAF8F5", "Muted text on page background"),
        ("#888888", "#FAF8F5", "Secondary text on page background"),
        ("#CCCCCC", "#FAF8F5", "Light gray on page background"),
        ("#000000", "#FFFFFF", "Primary text on white"),
        ("#666666", "#FFFFFF", "Muted text on white"),
        ("#888888", "#FFFFFF", "Secondary text on white"),
        # Dark theme pairs
        ("#FFFFFF", "#0A0A0A", "White text on dark background"),
        ("#CCCCCC", "#0A0A0A", "Light gray on dark background"),
        ("#888888", "#0A0A0A", "Secondary text on dark background"),
        ("#666666", "#0A0A0A", "Muted text on dark background"),
        ("#FFFFFF", "#111111", "White text on dark-alt background"),
        ("#888888", "#111111", "Secondary text on dark-alt background"),
        ("#666666", "#111111", "Muted text on dark-alt background"),
        # Border contrast
        ("#E0E0E0", "#FAF8F5", "Border on page background"),
        ("#E0E0E0", "#FFFFFF", "Border on white"),
        ("#333333", "#0A0A0A", "Dark border on dark background"),
    ]


def check_pair(fg_hex, bg_hex, label=""):
    """Check contrast for a single color pair."""
    fg_rgb = hex_to_rgb(fg_hex)
    bg_rgb = hex_to_rgb(bg_hex)

    if fg_rgb is None or bg_rgb is None:
        return None

    ratio = contrast_ratio(fg_rgb, bg_rgb)
    result = evaluate_contrast(ratio)
    result["fg"] = fg_hex
    result["bg"] = bg_hex
    result["label"] = label
    return result


def main():
    pairs = []
    css_file = None

    # Parse arguments
    args = sys.argv[1:]
    i = 0
    while i < len(args):
        if args[i] == "--css" and i + 1 < len(args):
            css_file = args[i + 1]
            i += 2
        elif args[i] == "--pairs":
            i += 1
            while i < len(args) and not args[i].startswith("--"):
                parts = args[i].split(":")
                if len(parts) == 2:
                    pairs.append((parts[0], parts[1], f"Custom: {parts[0]} on {parts[1]}"))
                i += 1
        else:
            i += 1

    # Use default pairs if none specified
    if not pairs:
        pairs = get_default_pairs()

    print("=" * 70)
    print("WCAG CONTRAST AUDIT")
    print("=" * 70)

    if css_file:
        colors = extract_colors_from_css(css_file)
        if colors:
            print(f"\nColors extracted from {css_file}:")
            for name, value in colors.items():
                print(f"  {name}: {value}")
            print()

    # Check all pairs
    results = []
    for fg, bg, label in pairs:
        result = check_pair(fg, bg, label)
        if result:
            results.append(result)

    # Sort by ratio (worst first)
    results.sort(key=lambda r: r["ratio"])

    # Report
    failures = [r for r in results if r["grade"] == "FAIL"]
    warnings = [r for r in results if r["grade"] == "AA-large-only"]
    passes_aa = [r for r in results if r["grade"] == "AA"]
    passes_aaa = [r for r in results if r["grade"] == "AAA"]

    if failures:
        print(f"\nFAILING ({len(failures)}):")
        print("-" * 70)
        for r in failures:
            print(f"  FAIL  {r['ratio']:>5.2f}:1  {r['fg']} on {r['bg']}")
            print(f"         {r['label']}")
            print(f"         Needs 4.5:1 for normal text, 3:1 for large text")
            print()

    if warnings:
        print(f"\nLARGE TEXT ONLY ({len(warnings)}):")
        print("-" * 70)
        for r in warnings:
            print(f"  WARN  {r['ratio']:>5.2f}:1  {r['fg']} on {r['bg']}")
            print(f"         {r['label']}")
            print(f"         Passes for large text (18px+) only, fails for body text")
            print()

    if passes_aa:
        print(f"\nPASSES AA ({len(passes_aa)}):")
        print("-" * 70)
        for r in passes_aa:
            print(f"  AA    {r['ratio']:>5.2f}:1  {r['fg']} on {r['bg']}  — {r['label']}")

    if passes_aaa:
        print(f"\nPASSES AAA ({len(passes_aaa)}):")
        print("-" * 70)
        for r in passes_aaa:
            print(f"  AAA   {r['ratio']:>5.2f}:1  {r['fg']} on {r['bg']}  — {r['label']}")

    # Summary
    print(f"\n{'=' * 70}")
    print("SUMMARY")
    print(f"{'=' * 70}")
    print(f"  Total pairs checked: {len(results)}")
    print(f"  Failing (< 3:1):     {len(failures)}")
    print(f"  Large text only:     {len(warnings)}")
    print(f"  Passes AA:           {len(passes_aa)}")
    print(f"  Passes AAA:          {len(passes_aaa)}")

    if failures:
        print(f"\n  Result: FAIL — {len(failures)} color pair(s) do not meet WCAG AA")
        sys.exit(1)
    elif warnings:
        print(f"\n  Result: CONDITIONAL PASS — all pairs pass for large text, {len(warnings)} fail for body text")
        sys.exit(0)
    else:
        print(f"\n  Result: PASS — all color pairs meet WCAG AA or better")
        sys.exit(0)


if __name__ == "__main__":
    main()
