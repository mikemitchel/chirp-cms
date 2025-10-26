#!/usr/bin/env node
/**
 * Update shop items with additional details, images, and notes
 *
 * Usage: node scripts/update-shop-items.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CMS_API_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

const updates = [
  {
    id: '1',
    name: 'CHIRP Baby Onesie',
    description: 'This Gildan Softstyle light blue onesie is perfect for the youngest CHIRP fans! Available in size 12-18 months only.',
    additionalImageUrls: [
      { url: 'https://chirpradio.org/_/files/store/Baby_onesie_2021-2.jpeg', alt: 'CHIRP Baby Onesie - Side View' },
      { url: 'https://chirpradio.org/_/files/store/Baby_onesie_2021.jpg', alt: 'CHIRP Baby Onesie - Back View' }
    ]
  },
  {
    id: '7',
    name: 'CHIRP Sandcastle Toddler T-Shirt',
    description: 'An adorable sandcastle CHIRP t-shirt designed by our own Carolyn Kassnoff. Perfect for the toddler in your life. Comes in sizes 2T-4T.',
    additionalImageUrls: [
      { url: 'https://chirpradio.org/_/files/store/chirp_sandcastles01(3).jpg', alt: 'CHIRP Sandcastle Toddler T-Shirt - Detail' }
    ]
  },
  {
    id: '8',
    name: 'chirpradio.org Record Logo Shirt (standard and fitted styles available)',
    description: 'Get this great t-shirt promoting worldwide listening at chirpradio.org. Soft, heathered shirt, cool record logo.'
  },
  {
    id: '9',
    name: '107.1FM CHIRP logo shirt (standard and fitted styles available)',
    description: 'Support CHIRP\'s broadcast at 107.1FM with this frequency logo t-shirt. Soft navy heather in standard and fitted styles. Note: fitted style runs small.'
  },
  {
    id: '6',
    name: 'CHIRP Record Fair 2017 Poster',
    description: 'This 24"x18" screen-printed poster designed by Ian Sienicki features the 15th Annual CHIRP Record Fair & Other Delights design with a ferris wheel theme.'
  },
  {
    id: '5',
    name: 'CHIRP Record Fair 2018 poster',
    description: 'CHIRP\'s 18"x24" screen-printed 2018 Record Fair poster designed by Ian Sienicki has a Sweet 16 theme in honor of the Fair\'s 16th birthday!'
  },
  {
    id: '4',
    name: 'CHIRP Record Fair 2019 Poster',
    description: 'This 11"x17" screen-printed CHIRP Record Fair poster for 2019 designed by Annabelle Goldin-Mertdogan celebrates our date of "May the Fourth" with an outer space theme!'
  },
  {
    id: '3',
    name: 'CHIRP Record Fair 2015 poster',
    description: 'This 18"x24" screen printed 2015 Record Fair poster was designed by Matt Silva and features a trolley theme in Chicago flag colors!'
  },
  {
    id: '2',
    name: 'CHIRP 2013 Poster',
    description: 'We have very limited numbers of this 18"x24" screen-printed poster designed for us in 2013 by TortoiseBelly. They are amazing and would make a great addition to any CHIRP fan\'s home or office!'
  }
];

console.log('CHIRP Shop Items Updater');
console.log('========================');
console.log(`Target: ${CMS_API_URL}`);
console.log(`Items to update: ${updates.length}\n`);

async function updateShopItems() {
  let successCount = 0;
  let errorCount = 0;

  for (const update of updates) {
    try {
      // First, get the existing item
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

      // Prepare updated data
      const updatedData = {
        ...existingItem,
        description: update.description,
      };

      // Add additional image URLs if provided
      if (update.additionalImageUrls && update.additionalImageUrls.length > 0) {
        updatedData.additionalImageUrls = update.additionalImageUrls;
      }

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

      const result = await patchResponse.json();
      console.log(`✓ Updated: ${update.name} (ID: ${update.id})`);
      if (update.additionalImageUrls) {
        console.log(`  Added ${update.additionalImageUrls.length} additional image URL(s)`);
      }
      successCount++;
    } catch (error) {
      console.error(`✗ Failed to update ${update.name}:`, error.message);
      errorCount++;
    }

    // Rate limit
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log('\n========================');
  console.log(`Update Complete!`);
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${errorCount}`);
}

updateShopItems().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
