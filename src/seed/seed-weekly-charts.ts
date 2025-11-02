import type { Payload } from 'payload'
import path from 'path'
import fs from 'fs'

export async function seedWeeklyCharts(payload: Payload, dataDir?: string) {
  console.log('📊 Seeding Weekly Charts...')

  try {
    // Check if we have exported data
    if (dataDir && fs.existsSync(path.join(dataDir, 'weekly-charts.json'))) {
      const weeklyChartsData = JSON.parse(
        fs.readFileSync(path.join(dataDir, 'weekly-charts.json'), 'utf-8')
      )

      for (const chart of weeklyChartsData['weekly-charts'] || []) {
        const { id, createdAt, updatedAt, ...chartData } = chart
        await payload.create({
          collection: 'weekly-charts',
          data: chartData,
        })
        console.log(`  ✓ ${chart.title || chart.weekOf}`)
      }

      console.log(`✓ ${weeklyChartsData['weekly-charts']?.length || 0} Weekly Charts seeded successfully`)
    } else {
      // Create sample weekly chart
      const sampleChart = await payload.create({
        collection: 'weekly-charts',
        data: {
          title: 'CHIRP Top 20 - Current Week',
          weekOf: new Date().toISOString().split('T')[0],
          chartItems: [
            { rank: 1, track: 'Sample Track 1', artist: 'Sample Artist 1', album: 'Sample Album 1' },
            { rank: 2, track: 'Sample Track 2', artist: 'Sample Artist 2', album: 'Sample Album 2' },
          ],
        },
      })
      console.log('✓ Sample Weekly Chart created')
      return sampleChart.id
    }
  } catch (error) {
    console.error('Error seeding Weekly Charts:', error)
  }
}
