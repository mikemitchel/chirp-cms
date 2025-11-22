# SQLite to PostgreSQL Migration Guide

This guide explains how to migrate your CHIRP CMS data from the SQLite backup (`data-backups/payload.db`) to your Docker PostgreSQL instance.

## Prerequisites

1. **Docker PostgreSQL Running**: Ensure your Docker Postgres container is running

   ```bash
   docker-compose up -d db
   ```

2. **Verify Database Connection**: Check that Postgres is accessible

   ```bash
   docker-compose ps
   ```

3. **Backup Your Current Data**: If you have any data in Postgres you want to keep, back it up first
   ```bash
   npm run export
   ```

## Migration Steps

### Step 1: Start PostgreSQL (if not already running)

```bash
docker-compose up -d db
```

Wait a few seconds for the database to be ready.

### Step 2: Set Environment Variables

Make sure your `.env` file has the PostgreSQL connection string:

```env
DATABASE_URI=postgresql://chirp:chirp_dev_password@localhost:5432/chirp_cms
```

If running inside Docker, use:

```env
DATABASE_URI=postgresql://chirp:chirp_dev_password@db:5432/chirp_cms
```

### Step 3: Run the Migration Script

```bash
npm run migrate:sqlite-to-postgres
```

The script will:

1. Export all data from `data-backups/payload.db` (SQLite)
2. Wait 5 seconds (giving you time to cancel if needed)
3. Clear existing data in PostgreSQL
4. Import all collections and globals
5. Display a summary of what was migrated

### Step 4: Copy Media Files

The migration script does **not** automatically copy media files. You need to manually copy them:

```bash
# If you have a media backup directory
cp -r media-backup/* media/

# Or from your old SQLite setup
cp -r old-media-directory/* media/
```

### Step 5: Verify the Migration

1. Start your application:

   ```bash
   npm run dev
   ```

2. Visit the admin panel: `http://localhost:3000/admin`

3. Check a few collections to verify data was migrated correctly

4. Verify relationships between collections are intact

## What Gets Migrated

### Collections

- Users
- Categories
- Venues
- Announcements
- Advertisements
- Articles
- Events
- Podcasts
- Members (listeners)
- Shop Items
- Weekly Charts
- Volunteer Calendar
- Mobile Page Content
- Show Schedules
- Pages
- Age Gate
- Donations
- Purchases
- Onboarding
- Media (metadata only)
- Player Fallback Images
- Redirects

### Globals

- Site Settings
- Mobile App Settings
- Volunteer Form Settings

## Important Notes

⚠️ **Media Files**: The script migrates media metadata but NOT the actual files. You must manually copy the `media/` directory.

⚠️ **IDs May Change**: Some document IDs might change during migration. The script attempts to preserve them but this depends on the database adapter.

⚠️ **Relationships**: The script preserves relationship data, but verify them after migration.

⚠️ **Data Loss Warning**: The script CLEARS all existing data in PostgreSQL before importing. Make sure you back up any important data first.

## Troubleshooting

### Connection Refused

If you get a "connection refused" error:

- Make sure Docker Postgres is running: `docker-compose ps`
- Check the connection string in `.env` matches your Docker setup
- Try connecting with `psql`: `psql postgresql://chirp:chirp_dev_password@localhost:5432/chirp_cms`

### Import Errors

If some documents fail to import:

- Check the console for specific error messages
- Verify the collection schemas haven't changed
- Some validation errors might occur if data doesn't match current schema

### Missing Collections

If a collection doesn't exist in the SQLite backup:

- The script will skip it and log a warning
- You can seed default data using other scripts (see `package.json`)

## Alternative: Manual Export/Import

If the automated script doesn't work, you can do a manual export/import:

1. **Export from SQLite**:

   ```bash
   # Temporarily change DATABASE_URI to point to SQLite
   DATABASE_URI=file:./data-backups/payload.db npm run export
   ```

2. **Import to PostgreSQL**:
   ```bash
   # Change DATABASE_URI back to PostgreSQL
   DATABASE_URI=postgresql://chirp:chirp_dev_password@localhost:5432/chirp_cms npm run restore
   ```

## Docker-Specific Notes

If you're running the migration from inside a Docker container, make sure:

- Use `db` as the hostname instead of `localhost` in DATABASE_URI
- The `data-backups/` directory is mounted as a volume
- You have network connectivity between containers

## Rollback

If something goes wrong and you need to rollback:

1. Stop the application
2. Drop and recreate the Postgres database:
   ```bash
   docker-compose down -v
   docker-compose up -d db
   ```
3. Re-run the migration or restore from a backup

## Post-Migration Checklist

- [ ] Verify all collections have data
- [ ] Check that relationships work (e.g., articles linked to categories)
- [ ] Test media file uploads work
- [ ] Verify user authentication works
- [ ] Check admin panel functionality
- [ ] Test frontend API calls
- [ ] Update `.env` permanently to use Postgres DATABASE_URI
- [ ] Remove or archive the SQLite database file

## Support

If you encounter issues:

1. Check the console output for detailed error messages
2. Verify your Docker Postgres is healthy: `docker-compose logs db`
3. Try the manual export/import method as a fallback
4. Check the scripts/migrate-sqlite-to-postgres.ts file for the migration logic
