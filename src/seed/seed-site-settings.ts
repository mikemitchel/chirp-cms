import type { Payload } from 'payload'

export async function seedSiteSettings(payload: Payload) {
  console.log('Seeding Site Settings...')

  try {
    // Get announcement and advertisement IDs from the database
    const announcements = await payload.find({
      collection: 'announcements',
      limit: 100,
    })

    const advertisements = await payload.find({
      collection: 'advertisements',
      limit: 100,
    })

    const weeklyCharts = await payload.find({
      collection: 'weeklyCharts',
      limit: 100,
    })

    await payload.updateGlobal({
      slug: 'siteSettings',
      data: {
        // Landing Page Settings
        showTopAnnouncement: true,
        topAnnouncement: announcements.docs[0]?.id || null,
        sidebarAnnouncement: announcements.docs[1]?.id || null,
        sidebarAdvertisement: advertisements.docs[5]?.id || null,

        // Listen Page Settings
        showUserCollection: true,
        listenSidebarWeeklyChart: weeklyCharts.docs[0]?.id || null,
        listenSidebarAdvertisement: advertisements.docs[6]?.id || null,
        fullWidthAnnouncement: announcements.docs[3]?.id || null,
        leftWeeklyChart: weeklyCharts.docs[0]?.id || null,
        rightWeeklyChart: weeklyCharts.docs[0]?.id || null,

        // Events Page Settings
        eventsSidebarAnnouncement: announcements.docs[3]?.id || null,
        eventsSidebarContentType: 'podcasts',
        eventsSidebarAdvertisement: advertisements.docs[3]?.id || null,
        eventsFullWidthAnnouncement: announcements.docs[1]?.id || null,

        // Articles Page Settings
        articlesSidebarAnnouncement: announcements.docs[7]?.id || null,
        articlesSidebarContentType: 'podcasts',
        articlesSidebarAdvertisement: advertisements.docs[1]?.id || null,
        articlesFullWidthAnnouncement: null,

        // Footer Support Section
        supportContent: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'CHIRP is partially supported by a CityArts Grant from the City of Chicago Department of Cultural Affairs & Special Events, as well as through funding from the Illinois Arts Council.',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: null,
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
                textFormat: 0,
                textStyle: '',
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        showDCaseLogo: true,
        dCaseLogo: null,
        dCaseLogoUrl: null,
        showIlArtsCouncilLogo: true,
        ilArtsCouncilLogo: null,
        ilArtsCouncilLogoUrl: null,
        supportAdvertisement: advertisements.docs[2]?.id || null,

        // Footer Settings
        copyrightText:
          '©2008–{year} Chicago Independent Radio Project. CHIRP, CHIRP Radio, and Chicago Independent Radio Project are registered trademarks.',
        socialLinks: [
          {
            platform: 'facebook',
            url: 'https://www.facebook.com/chirpradio',
            label: 'Facebook',
          },
          {
            platform: 'instagram',
            url: 'https://www.instagram.com/chirpradio',
            label: 'Instagram',
          },
          {
            platform: 'twitter',
            url: 'https://twitter.com/chirpradio',
            label: 'Twitter',
          },
          {
            platform: 'bluesky',
            url: 'https://bsky.app/profile/chirpradio.bsky.social',
            label: 'Bluesky',
          },
          {
            platform: 'linkedin',
            url: 'https://www.linkedin.com/company/chirp-radio',
            label: 'LinkedIn',
          },
        ],
        showChirpFilmFestLogo: true,
        chirpFilmFestLogo: null,
        chirpFilmFestLogoUrl: 'https://musicboxtheatre.com/series-and-festivals/chirp-music-film-festival',
        showFirstTimeLogo: true,
        firstTimeLogo: null,
        firstTimeLogoUrl: 'https://firsttime.chirpradio.org/',
      },
    })

    console.log('✓ Site Settings seeded successfully')
  } catch (error) {
    console.error('Error seeding Site Settings:', error)
  }
}
