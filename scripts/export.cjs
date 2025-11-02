const http = require('http');
const fs = require('fs');
const path = require('path');

const SEED_FILE = path.join(__dirname, '../seed-data.json');
const API_URL = 'http://localhost:3000/api';

const COLLECTIONS = ['listeners', 'shopItems', 'announcements', 'articles', 'events', 'podcasts', 'media'];

async function fetchCollection(collectionName) {
  return new Promise((resolve, reject) => {
    http.get(`${API_URL}/${collectionName}?limit=1000`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log(`✓ ${collectionName}: ${parsed.totalDocs} items`);
          resolve(parsed.docs || []);
        } catch (e) {
          console.error(`✗ ${collectionName}: Failed to parse`);
          resolve([]);
        }
      });
    }).on('error', (err) => {
      console.error(`✗ ${collectionName}: ${err.message}`);
      resolve([]);
    });
  });
}

async function exportData() {
  console.log('╔═══════════════════════════════════════╗');
  console.log('║   CHIRP CMS Database Export Script   ║');
  console.log('╚═══════════════════════════════════════╝\n');

  const seedData = {};

  for (const collection of COLLECTIONS) {
    const data = await fetchCollection(collection);
    seedData[collection] = data;
  }

  fs.writeFileSync(SEED_FILE, JSON.stringify(seedData, null, 2), 'utf8');

  console.log(`\n✓ Export complete! Saved to ${SEED_FILE}\n`);
  console.log('Summary:');
  for (const [name, items] of Object.entries(seedData)) {
    console.log(`  - ${name}: ${items.length} items`);
  }
}

exportData().catch(console.error);
