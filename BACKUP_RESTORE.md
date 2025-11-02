# CMS Backup and Restore Guide

This guide covers the complete backup and restore process for the CHIRP Radio CMS.

## Overview

The CMS includes comprehensive backup/restore scripts that handle **all** collections and globals:

### Collections Backed Up
- ✅ Users
- ✅ Categories
- ✅ Venues
- ✅ Age Gate
- ✅ Articles
- ✅ Events
- ✅ Podcasts
- ✅ DJs
- ✅ Listeners
- ✅ Shop Items
- ✅ Weekly Charts
- ✅ Announcements
- ✅ Advertisements
- ✅ Pages
- ✅ Volunteer Calendar
- ✅ Mobile Page Content
- ✅ Media (metadata only)
- ✅ Player Fallback Images (metadata only)

### Globals Backed Up
- ✅ Site Settings
- ✅ Mobile App Settings

---

## Creating a Backup

### Quick Export

```bash
cd chirp-cms
npm run export
```

This will:
1. Connect to your CMS database
2. Export all collections and globals to JSON
3. Create a timestamped backup directory in `export/backup-YYYY-MM-DDTHH-MM-SS/`
4. Save metadata about the backup

### What Gets Exported

- **All collection data**: Complete JSON dumps with all fields
- **All global data**: Site Settings and Mobile App Settings
- **Metadata file**: Information about the backup date and contents
- **⚠️ Media files**: Only metadata is exported (see Media Files section below)

### Backup Location

```
chirp-cms/
  export/
    backup-2025-01-31T14-30-00/
      articles.json
      events.json
      djs.json
      podcasts.json
      venues.json
      categories.json
      announcements.json
      advertisements.json
      pages.json
      volunteer-calendar.json
      weekly-charts.json
      shop-items.json
      listeners.json
      mobile-page-content.json
      age-gate.json
      media.json
      player-fallback-images.json
      site-settings.json
      mobile-app-settings.json
      _metadata.json
```

---

## Restoring from Backup

### Quick Restore (Latest Backup)

```bash
cd chirp-cms
npm run restore
```

This automatically finds and restores from the most recent backup.

### Restore Specific Backup

```bash
npm run restore export/backup-2025-01-31T14-30-00
```

### What Gets Restored

The restore process follows this order:

1. **Admin User** - Creates default admin if none exists
2. **Foundational Data** - Categories, Venues, Age Gate
3. **Content Collections** - Articles, Events, Podcasts, DJs
4. **Media Collections** - Player Fallback Images, Media (metadata only)
5. **Supporting Collections** - Listeners, Shop Items, Weekly Charts
6. **Announcements & Ads**
7. **Pages**
8. **Calendars** - Volunteer Calendar, Mobile Page Content
9. **Globals** - Site Settings, Mobile App Settings

### Restore Behavior

- **Clears existing data** before restoring each collection
- **Preserves relationships** by restoring in dependency order
- **Skips missing data** gracefully if backup doesn't include certain collections
- **Creates defaults** for essential data if backup is incomplete

---

## Media Files

### Important Notes

⚠️ **Media files (images, uploads) are NOT automatically backed up or restored.**

The export/restore scripts only handle metadata (filenames, alt text, sizes, etc.).

### Manual Media Backup

To backup actual media files:

```bash
# Create media backup
cd chirp-cms
cp -r media media-backup-$(date +%Y-%m-%d)
```

### Manual Media Restore

To restore media files:

```bash
# Copy media directory from backup
cd chirp-cms
cp -r /path/to/backup/media ./media
```

Or use a complete directory backup:

```bash
# Full media restore
rsync -av /path/to/backup/media/ ./media/
```

---

## Complete Backup Strategy

### Recommended Approach

1. **Export CMS data** (automated):
   ```bash
   npm run export
   ```

2. **Backup media files** (manual):
   ```bash
   tar -czf media-backup-$(date +%Y-%m-%d).tar.gz media/
   ```

3. **Backup database file** (optional, for SQLite):
   ```bash
   cp payload.db payload-backup-$(date +%Y-%m-%d).db
   ```

4. **Store backups safely**:
   - Keep multiple dated backups
   - Store off-server (cloud storage, external drive)
   - Test restore process periodically

### Automated Backup Script

Create `backup.sh`:

```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d)
BACKUP_DIR="backups/$DATE"

mkdir -p "$BACKUP_DIR"

# Export CMS data
npm run export

# Copy latest export
cp -r export/backup-* "$BACKUP_DIR/cms-data"

# Backup media
tar -czf "$BACKUP_DIR/media.tar.gz" media/

# Backup database
cp payload.db "$BACKUP_DIR/payload.db"

echo "✅ Backup complete: $BACKUP_DIR"
```

---

## Troubleshooting

### Export Fails

**Issue**: Export script fails with "Collection not found"

**Solution**: Some collections may not exist yet. The script will skip missing collections with a warning. This is normal.

### Restore Fails

**Issue**: Restore fails with relationship errors

**Solution**: The restore script handles dependencies automatically. If issues persist:
1. Clear database completely
2. Run restore again
3. Check for circular relationship issues

### Missing Data After Restore

**Issue**: Some content missing after restore

**Solution**:
- Check that the backup directory contains all expected JSON files
- Verify the backup wasn't created from an empty database
- Check console output for skipped collections

### Media Files Not Appearing

**Issue**: Images/uploads not showing after restore

**Solution**: Remember to manually restore the `media/` directory (see Media Files section)

---

## Emergency Recovery

### Complete Fresh Start

If you need to completely wipe and restore:

```bash
# 1. Stop the CMS
# Ctrl+C if running

# 2. Delete database
rm payload.db

# 3. Delete all media
rm -rf media/*

# 4. Restore from backup
npm run restore export/backup-YYYY-MM-DDTHH-MM-SS

# 5. Restore media files
cp -r /path/to/media-backup/* media/

# 6. Restart CMS
npm run dev
```

### Partial Restore

To restore only specific collections, modify `scripts/restore-data.ts` and comment out collections you want to skip.

---

## Testing Your Backups

**Always test your backups!**

```bash
# 1. Create a test backup
npm run export

# 2. Note the backup directory name

# 3. Make a small test change in CMS (add/edit content)

# 4. Restore the backup
npm run restore export/backup-YYYY-MM-DDTHH-MM-SS

# 5. Verify the test change is gone and backup data is present
```

---

## Production Backup Schedule

### Recommended Schedule

- **Daily**: Automated export + media backup
- **Weekly**: Full backup verification and test restore
- **Before deployment**: Manual backup
- **Before major changes**: Manual backup

### Cloud Backup

Consider using:
- AWS S3
- Google Cloud Storage
- Dropbox/Drive for small deployments
- Git LFS for version-controlled backups (data only, not media)

---

## Additional Notes

- Default admin credentials after restore: `admin@chirpradio.org` / `admin123`
- Change default password immediately after restore
- Backups include all published and draft content
- Relationships are preserved using IDs
- Timestamps (createdAt/updatedAt) are regenerated during restore

---

## Support

If you encounter issues:
1. Check console output for specific error messages
2. Verify backup directory structure and JSON files
3. Ensure sufficient disk space
4. Check file permissions on export/ directory
