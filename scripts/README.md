# CMS Utility Scripts

## fix-duplicate-indexes.sh

**Problem:** When database schema changes occur, Drizzle may try to create indexes that already exist in the database, causing errors like:

```
SQLITE_ERROR: index site_settings_top_announcement_idx already exists
```

**Solution:** This script drops duplicate indexes so Drizzle can recreate them properly.

**Usage:**
```bash
./scripts/fix-duplicate-indexes.sh
```

Then restart the CMS server:
```bash
npm run dev
```

**When to use:**
- After pulling schema changes from main
- When you see "index already exists" errors in the CMS logs
- After merging branches with database schema modifications
