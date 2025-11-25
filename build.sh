#!/bin/bash

# Build script for Claude Sidebar Firefox extension

set -e

# Lint the extension first
echo "Linting extension..."
npx web-ext lint

# Build the extension
echo "Building extension..."
npx web-ext build --overwrite-dest

echo ""
echo "Build complete! XPI file is in web-ext-artifacts/"
echo "Ready for submission to Firefox Add-ons"
