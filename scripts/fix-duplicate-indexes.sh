#!/bin/bash
# Fix duplicate database indexes that cause migration errors
# This script drops problematic indexes that already exist in the database
# so that Drizzle can recreate them properly during migration

set -e

DB_PATH="./payload.db"

echo "Fixing duplicate database indexes..."

# Drop the duplicate site_settings_top_announcement_idx if it exists
sqlite3 "$DB_PATH" "DROP INDEX IF EXISTS site_settings_top_announcement_idx;" 2>/dev/null || true

echo "✓ Fixed duplicate indexes"
echo "You can now restart the CMS server"
