# CMS Database Seeding

This directory contains scripts for backing up and restoring CMS data.

## Files

- `export.cjs` - Script to export all CMS data to `seed-data.json`
- `seed.cjs` - Script to import data from `seed-data.json` into the CMS
- `../seed-data.json` - Current backup of all CMS collections

## Current Seed Data

- **listeners** (59 members) - All members including DJs, volunteers, board members
- **shopItems** (9 items) - All shop/store items with images
- **announcements** (8 items) - Site announcements
- **articles** (8 items) - Blog articles
- **events** (11 items) - Event listings
- **podcasts** (12 items) - Podcast episodes
- **media** (3 items) - Uploaded media files

## Usage

### Export Database to Seed File

```bash
cd /Users/ryanwilson/Documents/Clients/CHIRP/chirp-cms
node scripts/export.cjs
```

### Restore Database from Seed

```bash
node scripts/seed.cjs
```

### Clear and Restore (⚠️ WARNING: Deletes all data first)

```bash
node scripts/seed.cjs --clear
```

## Notes

- The seed script automatically removes internal fields before importing
- Use `--clear` flag with caution - it will delete ALL existing data
- Make sure the CMS is running on http://localhost:3000 before running seed scripts
- Last updated: $(date +%Y-%m-%d)
