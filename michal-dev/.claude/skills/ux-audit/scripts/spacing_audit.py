#!/usr/bin/env python3
"""
Spacing Audit — Extracts all Tailwind spacing classes from React components
and flags inconsistencies, irregular values, and violations of spacing rhythm.

Usage:
    python3 spacing_audit.py <components-directory>
    python3 spacing_audit.py src/components/
    python3 spacing_audit.py src/components/HeroSection.tsx
"""

import sys
import re
import os
from pathlib import Path
from collections import defaultdict

# Tailwind spacing scale (default, in px equivalent)
TAILWIND_SCALE = {
    "0": 0, "px": 1, "0.5": 2, "1": 4, "1.5": 6, "2": 8, "2.5": 10,
    "3": 12, "3.5": 14, "4": 16, "5": 20, "6": 24, "7": 28, "8": 32,
    "9": 36, "10": 40, "11": 44, "12": 48, "14": 56, "16": 64,
    "20": 80, "24": 96, "28": 112, "32": 128, "36": 144, "40": 160,
    "44": 176, "48": 192, "52": 208, "56": 224, "60": 240, "64": 256,
    "72": 288, "80": 320, "96": 384,
}

# Common 4px-based spacing scale
STANDARD_SCALE = {0, 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 80, 96, 112, 128}

# Patterns that extract spacing values
SPACING_PATTERNS = [
    # Tailwind classes: p-4, px-8, my-12, gap-6, space-x-4, etc.
    r'(?:^|\s)(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y)-(\[?[\d.]+(?:px|rem)?\]?)',
    # Arbitrary values: p-[24px], gap-[32px], m-[1.5rem]
    r'(?:^|\s)(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y)-\[(\d+(?:\.\d+)?(?:px|rem)?)\]',
]

# Patterns for inline styles
INLINE_SPACING = [
    r'(?:padding|margin|gap):\s*["\']?(\d+(?:\.\d+)?(?:px|rem)?)',
    r'(?:paddingTop|paddingRight|paddingBottom|paddingLeft|marginTop|marginRight|marginBottom|marginLeft):\s*["\']?(\d+(?:\.\d+)?)',
]


def parse_px_value(val):
    """Convert a spacing value string to px number."""
    val = val.strip("[]")
    if val in TAILWIND_SCALE:
        return TAILWIND_SCALE[val]
    if val.endswith("px"):
        return float(val.replace("px", ""))
    if val.endswith("rem"):
        return float(val.replace("rem", "")) * 16
    try:
        if val in TAILWIND_SCALE:
            return TAILWIND_SCALE[val]
        return float(val) * 4  # Tailwind default: value * 4px
    except ValueError:
        return None


def extract_spacing(content, filepath):
    """Extract all spacing values from file content."""
    findings = []
    lines = content.split("\n")

    for line_num, line in enumerate(lines, 1):
        # Tailwind classes
        tw_matches = re.findall(
            r'(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y)-(\[?\d+(?:\.\d+)?(?:px|rem)?\]?)',
            line
        )
        for match in tw_matches:
            px = parse_px_value(match)
            if px is not None:
                findings.append({
                    "file": filepath,
                    "line": line_num,
                    "raw": match,
                    "px": px,
                    "context": line.strip()[:120],
                })

        # Inline styles
        for pattern in INLINE_SPACING:
            for match in re.finditer(pattern, line):
                val = match.group(1)
                px = parse_px_value(val)
                if px is not None:
                    findings.append({
                        "file": filepath,
                        "line": line_num,
                        "raw": val,
                        "px": px,
                        "context": line.strip()[:120],
                    })

    return findings


def analyze_spacing(findings):
    """Analyze extracted spacing values for issues."""
    issues = []
    px_values = sorted(set(f["px"] for f in findings))
    value_counts = defaultdict(int)
    for f in findings:
        value_counts[f["px"]] += 1

    # Check for off-scale values
    for f in findings:
        if f["px"] > 0 and f["px"] not in STANDARD_SCALE and f["px"] % 4 != 0:
            issues.append({
                "severity": "minor",
                "category": "Off-scale spacing",
                "message": f"Value {f['px']}px is not on the 4px spacing scale",
                "file": f["file"],
                "line": f["line"],
                "context": f["context"],
            })

    # Check for too many unique values (inconsistency)
    if len(px_values) > 12:
        issues.append({
            "severity": "major",
            "category": "Spacing inconsistency",
            "message": f"Found {len(px_values)} unique spacing values: {px_values}. Consider consolidating to a tighter scale.",
            "file": "project-wide",
            "line": 0,
            "context": "",
        })

    # Check for rarely-used values (likely mistakes)
    for px, count in value_counts.items():
        if count == 1 and px > 0 and px not in {1, 2}:
            matching = [f for f in findings if f["px"] == px]
            for f in matching:
                issues.append({
                    "severity": "suggestion",
                    "category": "One-off spacing value",
                    "message": f"Value {px}px is used only once — may be unintentional. Nearby scale values: {find_nearby(px)}",
                    "file": f["file"],
                    "line": f["line"],
                    "context": f["context"],
                })

    return issues, px_values, value_counts


def find_nearby(px):
    """Find nearby values on the standard scale."""
    nearby = sorted(STANDARD_SCALE, key=lambda x: abs(x - px))[:3]
    return ", ".join(f"{v}px" for v in nearby)


def scan_files(target):
    """Scan target file or directory for spacing values."""
    target = Path(target)
    files = []

    if target.is_file():
        files = [target]
    elif target.is_dir():
        files = sorted(target.rglob("*.tsx")) + sorted(target.rglob("*.ts")) + sorted(target.rglob("*.css"))
    else:
        print(f"Error: {target} is not a valid file or directory")
        sys.exit(1)

    all_findings = []
    for filepath in files:
        content = filepath.read_text(encoding="utf-8", errors="ignore")
        findings = extract_spacing(content, str(filepath))
        all_findings.extend(findings)

    return all_findings


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 spacing_audit.py <path>")
        print("  path: file or directory to audit")
        sys.exit(1)

    target = sys.argv[1]
    print(f"Scanning: {target}\n")

    findings = scan_files(target)

    if not findings:
        print("No spacing values found.")
        return

    issues, px_values, value_counts = analyze_spacing(findings)

    # Summary
    print("=" * 60)
    print("SPACING AUDIT SUMMARY")
    print("=" * 60)
    print(f"\nTotal spacing declarations found: {len(findings)}")
    print(f"Unique spacing values (px): {len(px_values)}")
    print(f"\nSpacing scale in use:")
    for px in sorted(value_counts.keys()):
        bar = "#" * min(value_counts[px], 40)
        print(f"  {px:>6.0f}px  ({value_counts[px]:>3}x)  {bar}")

    if issues:
        print(f"\n{'=' * 60}")
        print(f"ISSUES FOUND: {len(issues)}")
        print(f"{'=' * 60}")

        for severity in ["major", "minor", "suggestion"]:
            sev_issues = [i for i in issues if i["severity"] == severity]
            if sev_issues:
                print(f"\n--- {severity.upper()} ({len(sev_issues)}) ---")
                for i in sev_issues:
                    loc = f"{i['file']}:{i['line']}" if i['line'] > 0 else i['file']
                    print(f"  [{i['category']}] {i['message']}")
                    print(f"    Location: {loc}")
                    if i["context"]:
                        print(f"    Context: {i['context']}")
                    print()
    else:
        print("\nNo spacing issues found.")


if __name__ == "__main__":
    main()
