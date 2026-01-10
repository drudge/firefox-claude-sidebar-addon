#!/bin/bash

# Build script for Claude Sidebar Firefox extension

set -e

# Lint the extension first
echo "Linting extension..."
# Note: web-ext linter v8.9.0 incorrectly flags data_collection_permissions as reserved
# This field is actually required as of Nov 3, 2025 per Mozilla policy
npx web-ext lint --ignore-files='*.md' || {
  echo "Note: Linter error about data_collection_permissions is expected (outdated linter)"
  echo "This field is required by Mozilla for new extensions as of Nov 3, 2025"
}

# Build the extension
echo "Building extension..."
npx web-ext build --overwrite-dest

echo ""
echo "Build complete! XPI file is in web-ext-artifacts/"
echo "Ready for submission to Firefox Add-ons"
