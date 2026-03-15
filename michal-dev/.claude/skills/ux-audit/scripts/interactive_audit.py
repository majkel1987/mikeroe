#!/usr/bin/env python3
"""
Interactive Elements Audit — Scans React/TSX components for interactive element issues.

Checks for:
- Clickable divs/spans (onClick on non-interactive elements)
- Missing hover states on interactive elements
- Missing cursor:pointer on clickable elements
- Minimum tap target sizes
- Missing focus styles
- Nested interactive elements
- href="#" links without handlers
- Buttons without type attribute

Usage:
    python3 interactive_audit.py <components-directory>
    python3 interactive_audit.py src/components/
    python3 interactive_audit.py src/components/Header.tsx
"""

import sys
import re
from pathlib import Path
from collections import defaultdict


class Issue:
    def __init__(self, severity, category, message, file, line, context=""):
        self.severity = severity
        self.category = category
        self.message = message
        self.file = file
        self.line = line
        self.context = context

    def __str__(self):
        loc = f"{self.file}:{self.line}"
        return f"[{self.severity.upper()}] {self.category}: {self.message}\n  Location: {loc}\n  Context: {self.context}"


def audit_file(filepath):
    """Audit a single file for interactive element issues."""
    issues = []
    content = Path(filepath).read_text(encoding="utf-8", errors="ignore")
    lines = content.split("\n")

    for line_num, line in enumerate(lines, 1):
        stripped = line.strip()

        # 1. Clickable divs/spans — div or span with onClick but no role
        if re.search(r'<(?:div|span)[^>]*onClick', stripped) and 'role=' not in stripped:
            issues.append(Issue(
                "critical", "Non-semantic interactive",
                "onClick on <div> or <span> without role attribute. Use <button> or <a> instead, or add role='button' + tabIndex={0} + onKeyDown",
                str(filepath), line_num, stripped[:120]
            ))

        # 2. href="#" without onClick or proper handler
        if re.search(r'href=["\']#["\']', stripped) and 'onClick' not in stripped:
            issues.append(Issue(
                "major", "Dead link",
                'href="#" without onClick handler — clicking scrolls to top unexpectedly',
                str(filepath), line_num, stripped[:120]
            ))

        # 3. Button without type attribute
        if re.search(r'<button(?:\s|>)', stripped) and 'type=' not in stripped:
            issues.append(Issue(
                "minor", "Missing button type",
                '<button> without type attribute — defaults to "submit" which may cause unintended form submission',
                str(filepath), line_num, stripped[:120]
            ))

        # 4. Image without alt attribute
        if re.search(r'<img\s', stripped) and 'alt=' not in stripped:
            issues.append(Issue(
                "critical", "Missing alt text",
                "<img> without alt attribute — screen readers cannot describe this image",
                str(filepath), line_num, stripped[:120]
            ))

        # 5. Nested interactive elements
        if re.search(r'<a[^>]*>.*<(?:button|a)\s', stripped):
            issues.append(Issue(
                "critical", "Nested interactive",
                "Interactive element nested inside <a> — causes unpredictable behavior for assistive tech",
                str(filepath), line_num, stripped[:120]
            ))
        if re.search(r'<button[^>]*>.*<(?:button|a)\s', stripped):
            issues.append(Issue(
                "critical", "Nested interactive",
                "Interactive element nested inside <button> — invalid HTML nesting",
                str(filepath), line_num, stripped[:120]
            ))

        # 6. outline-none or outline-0 without ring replacement
        if re.search(r'outline-none|outline-0|outline:\s*none|outline:\s*0', stripped):
            # Check if there's a ring or focus-visible replacement nearby
            surrounding = "\n".join(lines[max(0, line_num-3):min(len(lines), line_num+2)])
            if not re.search(r'ring|focus-visible|focus:', surrounding):
                issues.append(Issue(
                    "major", "Removed focus indicator",
                    "outline:none without visible focus replacement — keyboard users lose navigation visibility",
                    str(filepath), line_num, stripped[:120]
                ))

        # 7. tabIndex > 0
        if re.search(r'tabIndex=\{?\s*[1-9]', stripped):
            issues.append(Issue(
                "major", "Positive tabIndex",
                "tabIndex > 0 disrupts natural tab order. Use 0 for focusable, -1 for programmatic focus only",
                str(filepath), line_num, stripped[:120]
            ))

        # 8. Fixed small dimensions on interactive elements
        if re.search(r'<(?:button|a)\s', stripped):
            small_size = re.search(r'(?:w|h)-(?:4|5|6|7|8)\b', stripped)
            if small_size:
                size_class = small_size.group()
                size_map = {"4": 16, "5": 20, "6": 24, "7": 28, "8": 32}
                val = size_class.split("-")[1]
                if val in size_map and size_map[val] < 44:
                    issues.append(Issue(
                        "major", "Small tap target",
                        f"Interactive element with {size_class} ({size_map[val]}px) is below 44px minimum tap target (WCAG 2.5.5)",
                        str(filepath), line_num, stripped[:120]
                    ))

    # Multi-line checks
    # Check for interactive elements without hover states
    interactive_blocks = re.finditer(
        r'<(button|a)\s[^>]*className=["\']([^"\']*)["\'][^>]*>',
        content
    )
    for match in interactive_blocks:
        tag = match.group(1)
        classes = match.group(2)
        line_num = content[:match.start()].count("\n") + 1

        if "hover:" not in classes and "group-hover" not in classes:
            issues.append(Issue(
                "major", "Missing hover state",
                f"<{tag}> has className but no hover: variant — interactive elements should have visual hover feedback",
                str(filepath), line_num, classes[:80]
            ))

        if tag == "a" and "cursor-pointer" not in classes and "cursor" not in classes:
            # <a> elements default to pointer, so this is only an issue for styled ones
            pass

        if tag == "button" and "cursor-pointer" not in classes:
            issues.append(Issue(
                "suggestion", "Missing cursor-pointer",
                "<button> without explicit cursor-pointer — some browsers may show default cursor on styled buttons",
                str(filepath), line_num, classes[:80]
            ))

    return issues


def scan_directory(target):
    """Scan a file or directory."""
    target = Path(target)
    files = []

    if target.is_file():
        files = [target]
    elif target.is_dir():
        files = sorted(target.rglob("*.tsx")) + sorted(target.rglob("*.jsx"))
    else:
        print(f"Error: {target} not found")
        sys.exit(1)

    all_issues = []
    for f in files:
        issues = audit_file(f)
        all_issues.extend(issues)

    return all_issues


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 interactive_audit.py <path>")
        sys.exit(1)

    target = sys.argv[1]
    print(f"Scanning interactive elements: {target}\n")

    issues = scan_directory(target)

    if not issues:
        print("No interactive element issues found.")
        return

    # Group by severity
    by_severity = defaultdict(list)
    for issue in issues:
        by_severity[issue.severity].append(issue)

    print("=" * 60)
    print(f"INTERACTIVE ELEMENTS AUDIT — {len(issues)} issues found")
    print("=" * 60)

    for severity in ["critical", "major", "minor", "suggestion"]:
        group = by_severity.get(severity, [])
        if group:
            print(f"\n{'─' * 60}")
            print(f"{severity.upper()} ({len(group)})")
            print(f"{'─' * 60}")
            for issue in group:
                print(f"\n  {issue.category}")
                print(f"  {issue.message}")
                print(f"  File: {issue.file}:{issue.line}")
                if issue.context:
                    print(f"  Code: {issue.context}")

    # Summary
    print(f"\n{'=' * 60}")
    print("SUMMARY")
    print(f"{'=' * 60}")
    print(f"  Critical: {len(by_severity.get('critical', []))}")
    print(f"  Major:    {len(by_severity.get('major', []))}")
    print(f"  Minor:    {len(by_severity.get('minor', []))}")
    print(f"  Suggest:  {len(by_severity.get('suggestion', []))}")

    if by_severity.get("critical"):
        sys.exit(2)
    elif by_severity.get("major"):
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()
