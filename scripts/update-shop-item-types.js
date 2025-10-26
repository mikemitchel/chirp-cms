#!/usr/bin/env node
/**
 * Update shop items with correct itemType field based on the product
 *
 * Usage: node scripts/update-shop-item-types.js
 */

const CMS_API_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

const itemTypeUpdates = [
  { id: '1', itemType: 'Apparel' }, // Baby Onesie
  { id: '2', itemType: 'Poster' }, // 2013 Poster
  { id: '3', itemType: 'Poster' }, // Record Fair 2015
  { id: '4', itemType: 'Poster' }, // Record Fair 2019
  { id: '5', itemType: 'Poster' }, // Record Fair 2018
  { id: '6', itemType: 'Poster' }, // Record Fair 2017
  { id: '7', itemType: 'Apparel' }, // Toddler T-Shirt
  { id: '8', itemType: 'Apparel' }, // Record Logo Shirt
  { id: '9', itemType: 'Apparel' }, // 107.1FM Shirt
];

console.log('CHIRP Shop Item Type Updater');
console.log('============================');
console.log(`Target: ${CMS_API_URL}`);
console.log(`Items to update: ${itemTypeUpdates.length}\n`);

async function updateItemTypes() {
  let successCount = 0;
  let errorCount = 0;

  for (const update of itemTypeUpdates) {
    try {
      // Get the existing item
      const getResponse = await fetch(`${CMS_API_URL}/api/shopItems/${update.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!getResponse.ok) {
        throw new Error(`Failed to fetch item ${update.id}: HTTP ${getResponse.status}`);
      }

      const existingItem = await getResponse.json();

      // Update with itemType
      const updatedData = {
        ...existingItem,
        itemType: update.itemType,
      };

      // Update the item
      const patchResponse = await fetch(`${CMS_API_URL}/api/shopItems/${update.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!patchResponse.ok) {
        const error = await patchResponse.text();
        throw new Error(`HTTP ${patchResponse.status}: ${error}`);
      }

      console.log(`✓ Updated item ${update.id} to ${update.itemType}`);
      successCount++;
    } catch (error) {
      console.error(`✗ Failed to update item ${update.id}:`, error.message);
      errorCount++;
    }

    // Rate limit
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('\n============================');
  console.log(`Update Complete!`);
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${errorCount}`);
}

updateItemTypes().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
