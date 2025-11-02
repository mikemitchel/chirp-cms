import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'

dotenv.config()

const importDemoUsers = async () => {
  const payload = await getPayload({ config })

  console.log('👥 Importing demo users...\n')

  const demoUsers = [
    {
      email: 'listener@chirpradio.org',
      username: 'listeneruser',
      firstName: 'Demo',
      lastName: 'Listener',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
      bio: 'Demo listener account for testing basic listener functionality.',
      location: 'Chicago, IL',
      memberSince: '2024-01-01',
      roles: ['Listener'],
      collection: [],
      favoriteDJs: [],
      preferences: {
        emailNotifications: true,
        showNotifications: true,
        darkMode: 'light',
        autoPlay: true
      }
    },
    {
      email: 'volunteer@chirpradio.org',
      username: 'volunteeruser',
      firstName: 'Demo',
      lastName: 'Volunteer',
      profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=faces',
      location: 'Chicago, Illinois',
      roles: ['Listener', 'Volunteer'],
      memberSince: '2021-01-20',
      primaryPhoneType: 'mobile',
      primaryPhone: '(773) 555-2891',
      age: '35–44',
      education: 'University of Illinois at Chicago',
      employer: 'Starbucks',
      collection: [],
      favoriteDJs: []
    },
    {
      email: 'regular-dj@chirpradio.org',
      username: 'regulardj',
      firstName: 'Demo',
      lastName: 'DJ',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
      location: 'Chicago, Illinois',
      roles: ['Listener', 'Volunteer', 'Regular DJ'],
      memberSince: '2017-09-15',
      djName: 'Demo DJ',
      showName: 'Demo Show',
      showTime: 'Fri 11pm - 1am',
      djExcerpt: 'Demo DJ profile for testing the regular DJ role and functionality.',
      djBio: 'This is a demo DJ profile used for development and testing purposes.',
      collection: [],
      favoriteDJs: []
    },
    {
      email: 'substitute-dj@chirpradio.org',
      username: 'subdj',
      firstName: 'Demo',
      lastName: 'SubDJ',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
      location: 'Chicago, Illinois',
      roles: ['Listener', 'Volunteer', 'Substitute DJ'],
      memberSince: '2019-06-15',
      djName: 'Demo Sub DJ',
      showName: 'Fill-In Show',
      djExcerpt: 'Demo substitute DJ profile for testing substitute DJ role.',
      collection: [],
      favoriteDJs: []
    },
    {
      email: 'board-member@chirpradio.org',
      username: 'boardmember',
      firstName: 'Demo',
      lastName: 'BoardMember',
      profileImage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=faces',
      location: 'Chicago, Illinois',
      roles: ['Listener', 'Volunteer', 'Regular DJ', 'Board Member'],
      memberSince: '2015-03-10',
      djName: 'Demo Board DJ',
      showName: 'Leadership Show',
      showTime: 'Wed 3pm - 5pm',
      boardPosition: 'Secretary',
      boardSince: '2020-01-15',
      boardTermEnd: '2026-01-15',
      collection: [],
      favoriteDJs: []
    }
  ]

  let imported = 0
  let skipped = 0

  for (const user of demoUsers) {
    try {
      const created = await payload.create({
        collection: 'listeners',
        data: user,
      })

      console.log(`  ✓ ${user.firstName} ${user.lastName} (${user.email}) - ID: ${created.id}`)
      imported++
    } catch (error) {
      console.error(`  ⚠️  Failed to import ${user.email}:`, (error as Error).message)
      console.error(`     Details:`, JSON.stringify((error as any).data, null, 2))
      skipped++
    }
  }

  console.log(`\n✨ Import complete!`)
  console.log(`   Imported: ${imported}`)
  console.log(`   Skipped: ${skipped}`)

  process.exit(0)
}

importDemoUsers()
