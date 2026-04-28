#!/bin/sh
set -e

echo "▶ Running Payload database migrations..."
node_modules/.bin/payload migrate

echo "▶ Starting Next.js server on port 3000..."
exec node_modules/.bin/next start
