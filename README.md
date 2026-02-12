# Claude Sidebar

A Firefox extension that opens [Claude](https://claude.ai/) in your browser's sidebar for quick access while browsing.

## Features

- Access Claude AI directly in a sidebar panel
- Toggle sidebar with a single click on the toolbar button
- Lightweight and minimal permissions

## Installation

### From Firefox Add-ons (Recommended)

~Install directly from the [Firefox Add-ons Store](https://addons.mozilla.org/firefox/addon/claude-sidebar/).~

**NOTE**: Mozilla has removed the plugin from the Add-ons Store due to a DMCA/copyright/trademark notice:
> Your Extension Claude Sidebar was manually reviewed by the Mozilla Add-ons team in an assessment performed on our own initiative of content that was submitted to Mozilla Add-ons.
> 
> Our review found that your content violates the following Mozilla policy or policies:
> 
> - Copyright and trademark, specifically Trademark takedown: This content has been disabled for violating our policy on intellectual policy infringement, specifically trademark infringement. An email with more details will be sent to the developer email address on file, from dmcanotice@mozilla.com..
> 
> 
> 
> Based on that finding, your Extension has been permanently disabled on https://addons.mozilla.org/developers/addon/2942660/versions and is no longer available for download from Mozilla Add-ons, anywhere in the world. Users who have previously installed your add-on will be able to continue using it.

### Manual Installation (Development)

1. Clone this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on"
5. Select any file from the extension directory (e.g., `manifest.json`)

## Building

### Prerequisites

- Node.js (for npx)

### Build Locally

```bash
./build.sh
```

This will lint the extension and create an XPI file in `web-ext-artifacts/`.

### Manual Build

```bash
npx web-ext lint
npx web-ext build
```

## Releasing

Releases are automated via GitHub Actions. To create a new release:

1. Update the version in `manifest.json`
2. Commit the change: `git commit -am "Bump version to X.Y"`
3. Create and push a tag: `git tag vX.Y && git push origin vX.Y`
4. GitHub Actions will automatically build and create a release with the XPI attached

Then submit the XPI to the [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/).

## Project Structure

```
claude-sidebar/
├── manifest.json           # Extension manifest (MV2)
├── background.js           # Background script for sidebar toggle
├── claude.html             # Fallback sidebar panel
├── icon.svg                # Extension icon
├── LICENSE                 # MPL-2.0 license
├── README.md               # This file
├── build.sh                # Build script
└── .github/workflows/
    ├── ci.yml              # Lint on push/PR
    └── release.yml         # Build and release on tag
```

## Requirements

- Firefox 109.0 or later

## Privacy

No user data is collected by this extension. All requests are sent via HTTPS directly from your browser to Claude's servers. No third-party servers are involved.

## License

This project is licensed under the Mozilla Public License 2.0 - see the [LICENSE](LICENSE) file for details.

## Author

Nick Penree ([@drudge](https://github.com/drudge))

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
