const http = require('http');
const fs = require('fs');
const path = require('path');

const SEED_FILE = path.join(__dirname, '../seed-data.json');
const API_URL = 'http://localhost:3000/api';

async function importCollection(collectionName, items) {
  console.log(`\nImporting ${collectionName}...`);
  let successCount = 0;
  let errorCount = 0;

  for (const item of items) {
    // Remove internal fields that shouldn't be imported
    const { id, createdAt, updatedAt, ...itemData } = item;

    const data = JSON.stringify(itemData);

    await new Promise((resolve) => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: `/api/${collectionName}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      };

      const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          if (res.statusCode === 201) {
            successCount++;
            process.stdout.write('.');
          } else {
            errorCount++;
            process.stdout.write('x');
          }
          resolve();
        });
      });

      req.on('error', (e) => {
        errorCount++;
        process.stdout.write('x');
        resolve();
      });

      req.write(data);
      req.end();
    });

    // Small delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log(`\n✓ ${collectionName}: ${successCount} imported, ${errorCount} errors`);
}

async function clearCollection(collectionName) {
  return new Promise((resolve) => {
    http.get(`${API_URL}/${collectionName}?limit=1000`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', async () => {
        try {
          const parsed = JSON.parse(data);
          console.log(`Clearing ${collectionName} (${parsed.totalDocs} items)...`);

          for (const item of parsed.docs) {
            await new Promise((res) => {
              http.request({
                hostname: 'localhost',
                port: 3000,
                path: `/api/${collectionName}/${item.id}`,
                method: 'DELETE'
              }, () => res()).end();
            });
          }

          resolve();
        } catch (e) {
          resolve();
        }
      });
    }).on('error', () => resolve());
  });
}

async function seed() {
  console.log('╔═══════════════════════════════════════╗');
  console.log('║    CHIRP CMS Database Seed Script    ║');
  console.log('╚═══════════════════════════════════════╝\n');

  // Check if seed file exists
  if (!fs.existsSync(SEED_FILE)) {
    console.error(`✗ Seed file not found: ${SEED_FILE}`);
    console.log('\nRun the export script first to create the seed file.');
    process.exit(1);
  }

  // Load seed data
  const seedData = JSON.parse(fs.readFileSync(SEED_FILE, 'utf8'));

  // Check if --clear flag was passed
  const shouldClear = process.argv.includes('--clear');

  if (shouldClear) {
    console.log('⚠️  CLEARING ALL DATA FIRST...\n');
    for (const collectionName of Object.keys(seedData)) {
      await clearCollection(collectionName);
    }
    console.log('\n');
  }

  // Import data
  for (const [collectionName, items] of Object.entries(seedData)) {
    if (items && items.length > 0) {
      await importCollection(collectionName, items);
    }
  }

  console.log('\n✓ Seed complete!\n');
}

seed().catch(console.error);
