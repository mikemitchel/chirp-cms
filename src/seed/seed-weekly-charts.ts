import type { Payload } from 'payload'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function seedWeeklyCharts(payload: Payload) {
  console.log('📊 Seeding Weekly Charts...')

  try {
    // Path to the seed data
    const seedDataPath = path.resolve(__dirname, 'weeklyCharts.json')

    if (!fs.existsSync(seedDataPath)) {
      console.log('✓ No weekly charts to seed (file not found)')
      return
    }

    const weeklyChartsData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'))

    for (const chart of weeklyChartsData['weeklyCharts'] || []) {
      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...chartData } = chart
      await payload.create({
        collection: 'weeklyCharts',
        data: chartData,
      })
      console.log(`  ✓ ${chart.title || chart.slug}`)
    }

    console.log(
      `✓ ${weeklyChartsData['weeklyCharts']?.length || 0} Weekly Charts seeded successfully`
    )
  } catch (error) {
    console.error('Error seeding Weekly Charts:', error)
  }
}
