# Claude Code Guide

This document provides context for AI assistants working on this Firefox extension.

## Overview

Claude Sidebar is a Firefox extension that opens Claude AI (https://claude.ai/) in the browser's sidebar panel. It's intentionally minimal.

## Architecture

### Why MV2?

This extension uses Manifest Version 2. While MV3 is newer, Firefox still fully supports MV2 and this extension's simplicity doesn't benefit from MV3 features.

### Why both claude.html and setPanel()?

The `sidebar_action.default_panel` in manifest.json requires a local file path - it cannot be a URL. However, we want to load Claude directly from https://claude.ai/ rather than embedding it in an iframe (which can have issues with auth, cookies, etc.).

The solution:
1. `claude.html` - Required by the manifest as a fallback, contains an iframe to Claude
2. `background.js` - Calls `browser.sidebarAction.setPanel()` at runtime to override the panel with the direct URL

This approach loads Claude natively in the sidebar without iframe restrictions.

## Key Files

| File | Purpose |
|------|---------|
| `manifest.json` | Extension manifest (MV2) |
| `background.js` | Sets sidebar panel to Claude URL, handles toolbar button toggle |
| `claude.html` | Fallback panel (overridden by background.js) |
| `icon.svg` | Claude logo used for extension icon |
| `web-ext-config.mjs` | Centralized web-ext configuration (ignore patterns) |

## Build System

Uses Mozilla's `web-ext` tool via npx (no install required).

```bash
./build.sh          # Lint and build
npx web-ext lint    # Lint only
npx web-ext build   # Build only
npx web-ext run     # Test in Firefox
```

The `web-ext-config.mjs` file contains ignore patterns so non-extension files (README, build.sh, .github, etc.) are excluded from the XPI.

Output goes to `web-ext-artifacts/`.

## CI/CD

- **CI** (`.github/workflows/ci.yml`): Lints on push/PR to main
- **Release** (`.github/workflows/release.yml`): Builds and creates GitHub release on version tags

To release:
```bash
# Update version in manifest.json, then:
git commit -am "Bump version to X.Y"
git tag vX.Y
git push origin main --tags
```

## Extension ID

The extension has a stable ID for Firefox Add-ons: `{d1399635-a397-4ee7-bc61-d917bd5e1010}`

Do not change this - it's tied to the published add-on listing.

## Testing Locally

```bash
npx web-ext run
```

This opens Firefox with the extension temporarily installed.
