#!/usr/bin/env bash
set -euo pipefail

# Enable corepack to ensure pnpm is available
corepack enable > /dev/null

# Install project dependencies
pnpm install
