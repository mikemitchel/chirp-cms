import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'

dotenv.config()

const updateVolunteerPages = async () => {
  const payload = await getPayload({ config })

  console.log('📄 Updating volunteer pages with actual content...\n')

  // Find and update Websites to Remember page
  const { docs: websitesPages } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'websites-to-remember' } },
    limit: 1,
  })

  if (websitesPages.length > 0) {
    const page = websitesPages[0]

    const websitesContent = {
      title: 'Websites to Remember',
      slug: 'websites-to-remember',
      excerpt: 'Essential links and resources for CHIRP volunteers, including general information, mailing lists, and DJ-specific tools.',
      layout: [
        {
          blockType: 'contentCard',
          title: 'Websites to Remember',
          titleTag: 'h1' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Welcome to your volunteer resource hub! This page contains essential links and tools you will need as a CHIRP volunteer.',
                    },
                  ],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
        {
          blockType: 'contentCard',
          title: 'General Links',
          titleTag: 'h2' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Nullam id dolor id nibh ultricies vehicula ut id elit.' }],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
        {
          blockType: 'contentCard',
          title: 'Mailing Lists',
          titleTag: 'h2' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Here are links to all of the CHIRP Radio Mailing Lists' }],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
        {
          blockType: 'contentCard',
          title: 'DJ Items',
          titleTag: 'h2' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'These links relate to DJ training sessions, helpful resources, and collaborative Spotify playlists' }],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
      ],
    }

    await payload.update({
      collection: 'pages',
      id: page.id,
      data: websitesContent as any,
    })

    console.log('✓ Updated Websites to Remember page')
  }

  // Find and update Volunteer Downloads page
  const { docs: downloadsPages } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'volunteer-downloads' } },
    limit: 1,
  })

  if (downloadsPages.length > 0) {
    const page = downloadsPages[0]

    const downloadsContent = {
      title: 'Volunteer Downloads',
      slug: 'volunteer-downloads',
      excerpt: 'Access essential documents, forms, guides, and resources for CHIRP volunteers.',
      layout: [
        {
          blockType: 'contentCard',
          title: 'Volunteer Downloads',
          titleTag: 'h1' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Access essential documents, forms, guides, and resources for CHIRP volunteers. From production guides to marketing materials, DJ forms to legal documents — everything you need to support your volunteer work is here.',
                    },
                  ],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
        {
          blockType: 'contentCard',
          title: 'Production processes, instructions, and tips',
          titleTag: 'h2' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Instructions, tips, and guides relating to production-related tasks' }],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
        {
          blockType: 'contentCard',
          title: 'Marketing, Partnerships, and Sponsorships',
          titleTag: 'h2' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Media kit, partnership and DJ services info, sponsorship packages, etc.' }],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
        {
          blockType: 'contentCard',
          title: 'Skills and Tips',
          titleTag: 'h2' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Articles on improving your skills and other interesting topics.' }],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
        {
          blockType: 'contentCard',
          title: 'HR Documents',
          titleTag: 'h2' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Policy manuals and other documents' }],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
        {
          blockType: 'contentCard',
          title: 'Volunteer Files',
          titleTag: 'h2' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Files for new volunteers to learn about how CHIRP works.' }],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
        {
          blockType: 'contentCard',
          title: 'Fundraising Information and Donation Forms',
          titleTag: 'h2' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: "Here, you'll find forms for people who want to donate items to CHIRP, or who would like to make monetary donations offline." }],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
        {
          blockType: 'contentCard',
          title: 'Legal Documents',
          titleTag: 'h2' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Aenean lacinia bibendum nulla sed consectetur.' }],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
        {
          blockType: 'contentCard',
          title: 'Flyers/Postcards',
          titleTag: 'h2' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: "We'll keep an updated list of files you can download and print out to help promote CHIRP events." }],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
        {
          blockType: 'contentCard',
          title: 'DJ Forms',
          titleTag: 'h2' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Shift applications and more...' }],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
        {
          blockType: 'contentCard',
          title: 'Logos',
          titleTag: 'h2' as const,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'These are various logos for CHIRP Radio and the Chicago Independent Radio Project.' }],
                },
              ],
            },
          },
          imagePosition: 'none',
        },
      ],
    }

    await payload.update({
      collection: 'pages',
      id: page.id,
      data: downloadsContent as any,
    })

    console.log('✓ Updated Volunteer Downloads page')
  }

  console.log('\n✨ Volunteer pages updated successfully!')
  process.exit(0)
}

updateVolunteerPages()
