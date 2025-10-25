import { getPayload } from 'payload'
import config from '../../payload.config'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { seedAdvertisements } from './seed-advertisements'
import { seedAnnouncements } from './seed-announcements'
import { seedPages } from './seed-pages'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const importData = async () => {
  const payload = await getPayload({ config })

  console.log('🔍 Available collections:', Object.keys(payload.collections).join(', '))
  console.log('🌱 Starting data import...')

  try {
    // Create default admin user
    console.log('👤 Creating default admin user...')
    const { docs: existingUsers } = await payload.find({ collection: 'users', limit: 1 })
    if (existingUsers.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@chirpradio.org',
          password: 'admin123',
        },
      })
      console.log('✓ Default admin user created (email: admin@chirpradio.org, password: admin123)\n')
    } else {
      console.log('✓ Admin user already exists, skipping creation\n')
    }

    // Create Categories
    console.log('📂 Creating categories...')
    const categoryNames = [
      'Music Scene',
      'Interview',
      'Album Reviews',
      'Vinyl Culture',
      'Venue Guide',
      'Community Guide',
      'Behind the Scenes',
      'CHIRP History',
      'News',
      'Feature',
      'Events',
      'Music',
    ]

    const categoryMap: Record<string, string> = {}

    for (const categoryName of categoryNames) {
      const { docs: existing } = await payload.find({
        collection: 'categories',
        where: { name: { equals: categoryName } },
        limit: 1,
      })

      if (existing.length > 0) {
        categoryMap[categoryName] = existing[0].id
      } else {
        const category = await payload.create({
          collection: 'categories',
          data: { name: categoryName },
        })
        categoryMap[categoryName] = category.id
      }
    }
    console.log(`✓ ${categoryNames.length} categories created\n`)

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    const { docs: existingArticles } = await payload.find({ collection: 'articles', limit: 1000 })
    for (const article of existingArticles) {
      await payload.delete({ collection: 'articles', id: article.id })
    }
    const { docs: existingEvents } = await payload.find({ collection: 'events', limit: 1000 })
    for (const event of existingEvents) {
      await payload.delete({ collection: 'events', id: event.id })
    }
    const { docs: existingDJs } = await payload.find({ collection: 'djs', limit: 1000 })
    for (const dj of existingDJs) {
      await payload.delete({ collection: 'djs', id: dj.id })
    }
    const { docs: existingVenues } = await payload.find({ collection: 'venues', limit: 1000 })
    for (const venue of existingVenues) {
      await payload.delete({ collection: 'venues', id: venue.id })
    }
    const { docs: existingPages } = await payload.find({ collection: 'pages', limit: 1000 })
    for (const page of existingPages) {
      await payload.delete({ collection: 'pages', id: page.id })
    }
    const { docs: existingPodcasts } = await payload.find({ collection: 'podcasts', limit: 1000 })
    for (const podcast of existingPodcasts) {
      await payload.delete({ collection: 'podcasts', id: podcast.id })
    }
    const { docs: existingAnnouncements } = await payload.find({ collection: 'announcements', limit: 1000 })
    for (const announcement of existingAnnouncements) {
      await payload.delete({ collection: 'announcements', id: announcement.id })
    }
    console.log('✓ Existing data cleared\n')

    // Read JSON files
    const dataDir = path.resolve(__dirname, '../../../chirp-radio/src/data')

    console.log(`Looking for data in: ${dataDir}`)

    const articlesData = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'articles.json'), 'utf-8')
    )
    const eventsData = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'events.json'), 'utf-8')
    )
    const usersData = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'users.json'), 'utf-8')
    )
    const podcastsData = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'podcasts.json'), 'utf-8')
    )

    // Import Articles
    console.log(`📰 Importing ${articlesData.articles.length} articles...`)
    for (const article of articlesData.articles) {
      await payload.create({
        collection: 'articles',
        data: {
          ...article,
          // Convert category string to category ID
          category: categoryMap[article.category] || categoryMap['News'],
          // Convert author.name to just author
          author: article.author?.name || article.author,
          // Handle image URLs - if it's an external URL, use featuredImageUrl
          featuredImageUrl: article.featuredImageUrl || article.featuredImage,
          featuredImage: undefined, // Will be null unless we upload actual files
          // Transform tags array from strings to objects
          tags: article.tags?.map((tag: string) => ({ tag })) || [],
          // Convert content to Lexical editor format - split paragraphs by double newline
          content: {
            root: {
              type: 'root',
              children: article.content
                ? article.content.split('\n\n').map((para: string) => ({
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: para.trim(),
                      },
                    ],
                  }))
                : [],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
        },
      })
      console.log(`  ✓ ${article.title}`)
    }

    // Import AgeGate (extract unique age restrictions from events)
    console.log('🔞 Importing age restrictions...')
    const ageGateMap = new Map()
    for (const event of eventsData.events) {
      if (event.ageRestriction && !ageGateMap.has(event.ageRestriction)) {
        const ageGateDoc = await payload.create({
          collection: 'ageGate',
          data: {
            age: event.ageRestriction,
          },
        })
        ageGateMap.set(event.ageRestriction, ageGateDoc.id)
        console.log(`  ✓ ${event.ageRestriction}`)
      }
    }

    // Import Venues (extract unique venues from events)
    console.log('🏛️  Importing venues...')
    const venueMap = new Map()
    for (const event of eventsData.events) {
      if (event.venue?.name && !venueMap.has(event.venue.name)) {
        const venueDoc = await payload.create({
          collection: 'venues',
          data: {
            name: event.venue.name,
            address: event.venue.address,
            city: event.venue.city,
            state: event.venue.state,
            zip: event.venue.zip,
            phone: event.venue.phone,
            mapUrl: event.venue.mapUrl,
          },
        })
        venueMap.set(event.venue.name, venueDoc.id)
        console.log(`  ✓ ${event.venue.name}`)
      }
    }

    // Import Events
    console.log(`\n🎉 Importing ${eventsData.events.length} events...`)

    // Map event category strings to category IDs
    const eventCategoryMapping: Record<string, string> = {
      'Fundraiser': 'Events',
      'Community Event': 'Events',
      'Concert': 'Music',
      'Workshop': 'Events',
      'Festival': 'Events',
      'Live Session': 'Music',
    }

    for (const event of eventsData.events) {
      const venueId = venueMap.get(event.venue?.name)
      const ageRestrictionId = ageGateMap.get(event.ageRestriction)

      // Map event category string to category ID
      const categoryName = eventCategoryMapping[event.category] || 'Events'
      const categoryId = categoryMap[categoryName]

      await payload.create({
        collection: 'events',
        data: {
          ...event,
          // Convert category string to category ID
          category: categoryId,
          // Link to venue by ID
          venue: venueId,
          // Link to age restriction by ID
          ageRestriction: ageRestrictionId,
          // Handle image URLs
          featuredImageUrl: event.featuredImageUrl || event.featuredImage,
          featuredImage: undefined,
          // Transform performers array from strings to objects
          performers: event.performers?.map((performer: string) => ({ performer })) || [],
        },
      })
      console.log(`  ✓ ${event.title}`)
    }

    // Import DJs
    console.log(`🎧 Importing ${usersData.users.length} DJs...`)
    const importedEmails = new Set()
    for (const user of usersData.users) {
      // Only import users who are DJs (have djName)
      if (user.djName) {
        // Skip if email already imported (handle duplicates in source data)
        if (importedEmails.has(user.email)) {
          console.log(`  ⚠️  Skipping duplicate email: ${user.email} (${user.djName})`)
          continue
        }

        await payload.create({
          collection: 'djs',
          data: {
            ...user,
            // Handle image URLs
            profileImageUrl: user.profileImage,
            profileImage: undefined,
            // Fix empty phone type values (set to undefined instead of empty string)
            secondaryPhoneType: user.secondaryPhoneType || undefined,
            primaryPhoneType: user.primaryPhoneType || undefined,
            // Transform age values from em-dash to regular hyphen
            age: user.age?.replace('–', '-').replace('+', 'plus') || undefined,
            // Transform arrays to match schema
            tags: user.tags?.map((tag: string) => ({ tag })) || [],
            specialSkills: user.specialSkills?.map((skill: string) => ({ skill })) || [],
            interests: user.interests?.map((interest: string) => ({ interest })) || [],
            volunteerOrgs: user.volunteerOrgs?.map((org: string) => ({ org })) || [],
            djAvailability: user.djAvailability?.map((time: string) => ({ time })) || [],
          },
        })
        importedEmails.add(user.email)
        console.log(`  ✓ ${user.djName}`)
      }
    }

    // Import Pages
    await seedPages(payload)

    // Import Podcasts
    console.log(`\n🎙️  Importing ${podcastsData.podcasts.length} podcasts...`)

    // Map podcast category strings to category IDs
    const podcastCategoryMapping: Record<string, string> = {
      'Music Interview': 'Music',
      'Local Music': 'Music',
      'Record Talk': 'Music',
      'Album Discussion': 'Music',
      'Tour Stories': 'Music',
      'Experimental': 'Music',
      'Hip-Hop': 'Music',
      'Production': 'Music',
      'Live Performance': 'Music',
      'Genre Exploration': 'Music',
      'Music Business': 'Music',
      'Performance': 'Music',
    }

    for (const podcast of podcastsData.podcasts) {
      // Map podcast category string to category ID
      const categoryName = podcastCategoryMapping[podcast.category] || 'Music'
      const categoryId = categoryMap[categoryName]

      await payload.create({
        collection: 'podcasts',
        data: {
          ...podcast,
          // Convert category string to category ID
          category: categoryId,
          // Handle image URLs
          coverArtUrl: podcast.coverArtUrl || podcast.coverArt,
          coverArt: undefined,
          // Transform tags array from strings to objects
          tags: podcast.tags?.map((tag: string) => ({ tag })) || [],
          // Convert content to Lexical editor format
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: typeof podcast.content === 'string' ? podcast.content : JSON.stringify(podcast.content),
                    },
                  ],
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
        },
      })
      console.log(`  ✓ ${podcast.title}`)
    }

    // Import Announcements
    await seedAnnouncements(payload)

    // Import Advertisements
    await seedAdvertisements(payload)

    console.log('✨ Data import completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error importing data:', error)
    process.exit(1)
  }
}

importData()
