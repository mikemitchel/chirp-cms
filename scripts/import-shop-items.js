#!/usr/bin/env node
/**
 * Import shop items from scraped data into Payload CMS
 *
 * Usage: node scripts/import-shop-items.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CMS_API_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';
const API_ENDPOINT = `${CMS_API_URL}/api/shopItems`;

// Read the scraped shop items
const scrapedDataPath = path.join(__dirname, '../../chirp-radio/src/data/scraped-shop-items.json');
const scrapedData = JSON.parse(fs.readFileSync(scrapedDataPath, 'utf8'));

console.log('CHIRP Shop Items Importer');
console.log('=========================');
console.log(`Source: ${scrapedDataPath}`);
console.log(`Target: ${API_ENDPOINT}`);
console.log(`Items to import: ${scrapedData.shopItems.length}\n`);

async function importShopItems() {
  let successCount = 0;
  let errorCount = 0;

  for (const item of scrapedData.shopItems) {
    // Transform to CMS format
    const cmsItem = {
      name: item.name,
      slug: item.id, // Use ID as slug for now
      description: item.description,
      category: item.category === 'posters' ? 'merchandise' :
                item.category === 'shirts' ? 'apparel' :
                item.category === 'baby-onesies-kid-stuff' ? 'apparel' : 'merchandise',
      price: item.price,
      imageUrl: item.image, // Using external URL for now
      images: [], // Would need to upload images to media collection
      inStock: item.inStock,
      soldOut: false,
      featured: false,
      limitedEdition: false,
      sizes: item.sizes.map(size => ({ size })),
      variants: [],
      externalUrl: '',
    };

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cmsItem),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP ${response.status}: ${error}`);
      }

      const result = await response.json();
      console.log(`✓ Imported: ${item.name} (ID: ${result.doc.id})`);
      successCount++;
    } catch (error) {
      console.error(`✗ Failed to import ${item.name}:`, error.message);
      errorCount++;
    }

    // Rate limit
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n=========================');
  console.log(`Import Complete!`);
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${errorCount}`);
}

importShopItems().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
