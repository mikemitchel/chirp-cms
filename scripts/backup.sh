#!/bin/bash

# CHIRP CMS Backup Script
# Backs up database and media files with timestamp

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  CHIRP CMS Backup Script${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Configuration
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="backups/${TIMESTAMP}"
DB_FILE="payload.db"
MEDIA_DIR="media"

# Create backup directory
echo -e "\n${BLUE}→${NC} Creating backup directory..."
mkdir -p "${BACKUP_DIR}"

# Backup database
if [ -f "${DB_FILE}" ]; then
    echo -e "${BLUE}→${NC} Backing up database..."
    cp "${DB_FILE}" "${BACKUP_DIR}/"
    echo -e "${GREEN}✓${NC} Database backed up: ${BACKUP_DIR}/${DB_FILE}"
else
    echo -e "${RED}✗${NC} Database file not found: ${DB_FILE}"
    exit 1
fi

# Backup media files
if [ -d "${MEDIA_DIR}" ]; then
    echo -e "${BLUE}→${NC} Backing up media files..."
    cp -r "${MEDIA_DIR}" "${BACKUP_DIR}/"
    MEDIA_COUNT=$(find "${MEDIA_DIR}" -type f | wc -l | tr -d ' ')
    echo -e "${GREEN}✓${NC} Media files backed up: ${MEDIA_COUNT} files"
else
    echo -e "${RED}✗${NC} Media directory not found: ${MEDIA_DIR}"
fi

# Create compressed archive
echo -e "${BLUE}→${NC} Creating compressed archive..."
tar -czf "backups/chirp-cms-backup-${TIMESTAMP}.tar.gz" -C "${BACKUP_DIR}" .

# Get archive size
ARCHIVE_SIZE=$(du -h "backups/chirp-cms-backup-${TIMESTAMP}.tar.gz" | cut -f1)

# Remove uncompressed backup directory
rm -rf "${BACKUP_DIR}"

echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Backup completed successfully!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "  Archive: ${GREEN}backups/chirp-cms-backup-${TIMESTAMP}.tar.gz${NC}"
echo -e "  Size: ${GREEN}${ARCHIVE_SIZE}${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

# Clean up old backups (keep last 10)
echo -e "${BLUE}→${NC} Cleaning up old backups (keeping last 10)..."
cd backups
ls -t chirp-cms-backup-*.tar.gz | tail -n +11 | xargs -r rm --
REMAINING=$(ls -1 chirp-cms-backup-*.tar.gz 2>/dev/null | wc -l)
echo -e "${GREEN}✓${NC} ${REMAINING} backup(s) remaining\n"
