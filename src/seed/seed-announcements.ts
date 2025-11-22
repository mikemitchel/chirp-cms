import type { Payload } from 'payload'

export async function seedAnnouncements(payload: Payload) {
  console.log('📣 Importing announcements...')

  const announcements = [
    {
      headlineText: 'Winter Membership Drive',
      bodyText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Help us reach our goal of 500 new members this December! Your support keeps independent radio alive.',
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
      variant: 'donation',
      textureBackground: 'cr-bg-natural-a500',
      showLink: true,
      linkText: 'Become a Sustaining Member',
      linkUrl: '/other-ways-to-give',
      buttonCount: 'none',
      currentAmount: 12500,
      targetAmount: 50000,
    },
    {
      headlineText: 'Record Store Day This Saturday',
      bodyText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'CHIRP DJs will be spinning at record stores across Chicago. Check the events page for locations and times.',
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
      variant: 'motivation',
      textureBackground: 'cr-bg-natural-s100',
      showLink: true,
      linkText: 'View Events',
      linkUrl: '/events',
      buttonCount: 'none',
    },
    {
      headlineText: 'The CHIRP Record Club',
      bodyText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Join us each month as we deep dive into classic albums. First episode featuring OK Computer out now!',
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
      variant: 'motivation',
      textureBackground: 'cr-bg-natural-d100',
      showLink: true,
      linkText: 'Listen Now',
      linkUrl: '/podcasts/chirp-record-club',
      buttonCount: 'none',
    },
    {
      headlineText: 'Stream Quality Upgrade',
      bodyText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "We've upgraded our streaming infrastructure! Enjoy higher quality audio with fewer interruptions.",
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
      variant: 'motivation',
      textureBackground: 'cr-bg-natural-d900',
      showLink: false,
      buttonCount: 'none',
    },
    {
      headlineText: 'Emergency Broadcast Test',
      bodyText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "We'll be conducting an emergency broadcast system test on December 10th at 2pm CST. Expect a brief interruption.",
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
      variant: 'motivation',
      textureBackground: 'cr-bg-natural-s100',
      showLink: false,
      buttonCount: 'none',
    },
    {
      headlineText: 'DJ Applications Now Open',
      bodyText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "Think you've got what it takes to be a CHIRP DJ? Applications for our Spring 2025 class are now open.",
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
      variant: 'motivation',
      textureBackground: 'cr-bg-natural-s900',
      showLink: true,
      linkText: 'Apply Now',
      linkUrl: '/volunteer',
      buttonCount: 'none',
    },
    {
      headlineText: 'Holiday Schedule Changes',
      bodyText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Special holiday programming begins December 24th. Check the schedule page for updated show times.',
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
      variant: 'motivation',
      textureBackground: 'cr-bg-natural-d100',
      showLink: true,
      linkText: 'View Schedule',
      linkUrl: '/schedule',
      buttonCount: 'none',
    },
    {
      headlineText: 'Mobile App Beta',
      bodyText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Be among the first to try our new mobile app! Sign up for the beta test program.',
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
      variant: 'motivation',
      textureBackground: 'cr-bg-natural-d900',
      showLink: true,
      linkText: 'Join Beta',
      linkUrl: '#beta-signup',
      buttonCount: 'none',
    },
  ]

  for (const announcement of announcements) {
    await payload.create({
      collection: 'announcements',
      data: announcement,
    })
    console.log(`  ✓ ${announcement.headlineText}`)
  }
}
