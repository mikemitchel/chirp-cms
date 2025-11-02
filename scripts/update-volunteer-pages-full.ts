import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'

dotenv.config()

const updateVolunteerPages = async () => {
  const payload = await getPayload({ config })

  console.log('📄 Updating volunteer pages with full content...\n')

  // Helper to create link HTML
  const createLinkHTML = (text: string, url: string, description?: string) => {
    if (description) {
      return `<p><strong><a href="${url}">${text}</a></strong> - ${description}</p>`
    }
    return `<p><a href="${url}">${text}</a></p>`
  }

  // Helper to create empty Lexical content
  const emptyLexicalContent = {
    root: {
      type: 'root',
      children: [],
    },
  }

  // Websites to Remember Content
  const websitesContent = {
    title: 'Websites to Remember',
    slug: 'websites-to-remember',
    excerpt: 'Essential links and resources for CHIRP volunteers',
    layout: [
      {
        blockType: 'contentCard',
        title: 'Websites to Remember',
        titleTag: 'h1' as const,
        content: {
          root: {
            type: 'root',
            children: [{
              type: 'paragraph',
              children: [{ type: 'text', text: 'Welcome to your volunteer resource hub! This page contains essential links and tools you will need as a CHIRP volunteer. From logging your hours to booking the production studio, accessing DJ resources, and joining mailing lists — everything you need is organized here for easy reference. Bookmark this page and check back regularly for updates.' }],
            }],
          },
        },
        imagePosition: 'none',
      },
      {
        blockType: 'contentCard',
        title: 'General Links',
        titleTag: 'h2' as const,
        content: emptyLexicalContent,
        htmlContent: `<p>Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
${createLinkHTML('CHIRP Passport', '#', 'New to CHIRP? Check out this guide to the many ways you can get involved, and earn a free t-shirt!')}
${createLinkHTML('Log your hours', '#', 'Log in to Volunteer Impact to log your hours.')}
${createLinkHTML('Past Hell Yeah Award Winners', '#', 'Each month, we recognize a volunteer who has gone above and beyond expectations in support of CHIRP. Here is a list of past winners!')}
${createLinkHTML('Production Studio calendar', '#', 'Use this calendar to book the production studio for a DJ audition, for Production work, or for Features work. Book multiple consecutive events for time over 60 minutes.')}
${createLinkHTML('Review Tracker App', '#', 'Sign up for albums to review here.')}
${createLinkHTML('Setting Up the CHIRP Tent', '#', "Here's a short video to show you the basic setup for the CHIRP tent. You can just reverse engineer it to take it down. This video will show you about attaching the back wall, but it's pretty self explanatory with the velcro connectors that attach to the frame. Please be gentle when setting up or taking down the tent -- never force anything!")}
${createLinkHTML('Social Media Post Request Form', '#', "When you'd like something posted on one (or more) of CHIRP's social media assets (Facebook, Twitter, Instagram) or in the newsletter, use this form to submit the details. Be sure to give plenty of notice.")}
${createLinkHTML('Staff Ticket Sign-up', '#', 'Sign up here for available CHIRP staff tickets to upcoming shows. Remember to limit sign-ups to one per 30 days!')}`,
        imagePosition: 'none',
      },
      {
        blockType: 'contentCard',
        title: 'Mailing Lists',
        titleTag: 'h2' as const,
        content: emptyLexicalContent,
        htmlContent: `<p>Here are links to all of the CHIRP Radio Mailing Lists</p>
${createLinkHTML('CHIRP DJ list', '#', 'This is the list for all active CHIRP DJs, weekly and sub')}
${createLinkHTML('CHIRP Features list', '#', 'This is the list for volunteers interested in conducting and producing artist interviews')}
${createLinkHTML('CHIRP Marketing and Outreach list', '#', 'This is the list for volunteers interested in working on marketing, design, and outreach projects')}
${createLinkHTML('CHIRP Production list', '#', 'This is a group for volunteers interested in producing, mixing, voicing, or recording projects, including station promos, podcasts, and special features')}
${createLinkHTML('CHIRP Record Fair list', '#', 'This is the list for volunteers interested in working on the CHIRP Record Fairs')}
${createLinkHTML('Main Volunteer Mailing List', '#', 'The mailing list for all general CHIRP news and station business.')}`,
        imagePosition: 'none',
      },
      {
        blockType: 'contentCard',
        title: 'DJ Items',
        titleTag: 'h2' as const,
        content: emptyLexicalContent,
        htmlContent: `<p>These links relate to DJ training sessions, helpful resources, and collaborative Spotify playlists</p>
${createLinkHTML('CHIRP DJ 202 - engineering, on-air presentation, and programming your show', '#', 'This is the general discussion portion of the DJ202 session, covering topics relating to engineering, on-air presentation, and programming your show')}
${createLinkHTML('CHIRP DJ202 - Advanced Techniques with Spotify, Traktor, and the DJDB', '#', 'This is a run-through of advanced techniques for playing single tracks, building collaborative playlists, searching and identifying label information in Spotify, setting cue points and searching in Traktor, and using filters in the DJDB.')}
${createLinkHTML('How to cue in Traktor when something is playing on the other deck', '#', "Here's a video from Mike Nikolich made to show how to cue something in Traktor when you've already got a track playing on the other deck. Thanks, Mike!")}
${createLinkHTML('Show resources', '#', 'Upcoming show listings, local news, events, and music reviews, weather, and general info to help enhance your show')}`,
        imagePosition: 'none',
      },
    ],
  }

  // Volunteer Downloads Content
  const downloadsContent = {
    title: 'Volunteer Downloads',
    slug: 'volunteer-downloads',
    excerpt: 'Access essential documents, forms, guides, and resources for CHIRP volunteers',
    layout: [
      {
        blockType: 'contentCard',
        title: 'Volunteer Downloads',
        titleTag: 'h1' as const,
        content: {
          root: {
            type: 'root',
            children: [{
              type: 'paragraph',
              children: [{ type: 'text', text: 'Access essential documents, forms, guides, and resources for CHIRP volunteers. From production guides to marketing materials, DJ forms to legal documents — everything you need to support your volunteer work is here.' }],
            }],
          },
        },
        imagePosition: 'none',
      },
      {
        blockType: 'contentCard',
        title: 'Production processes, instructions, and tips',
        titleTag: 'h2' as const,
        content: emptyLexicalContent,
        htmlContent: `<p>Instructions, tips, and guides relating to production-related tasks</p>
<ul>
<li><a href="#">Field Recorder checkout process</a></li>
<li><a href="#">Field recorder use with built-in mics</a></li>
<li><a href="#">Field recorder use with shotgun mic</a></li>
<li><a href="#">Field recorder use with standard mic</a></li>
<li><a href="#">First Time event-recording procedures</a></li>
<li><a href="#">Why You're Doing Audio Levels Wrong, and Why It Really Does Matter (Current.org)</a></li>
</ul>`,
        imagePosition: 'none',
      },
      {
        blockType: 'contentCard',
        title: 'Marketing, Partnerships, and Sponsorships',
        titleTag: 'h2' as const,
        content: emptyLexicalContent,
        htmlContent: `<p>Media kit, partnership and DJ services info, sponsorship packages, etc.</p>
<ul>
<li><a href="#">Street Team Tips</a></li>
<li><a href="#">Tabling for CHIRP: Everything You Need To Know</a></li>
</ul>`,
        imagePosition: 'none',
      },
      {
        blockType: 'contentCard',
        title: 'Skills and Tips',
        titleTag: 'h2' as const,
        content: emptyLexicalContent,
        htmlContent: `<p>Articles on improving your skills and other interesting topics.</p>
<ul>
<li><a href="#">Getting Over the Fear of Asking for Donations (from grassrootsfundraising.org)</a></li>
<li><a href="#">Great DJ Tips</a></li>
<li><a href="#">Interview Questions to Avoid - wisdom from Brendan Kelly of the Lawrence Arms</a></li>
<li><a href="#">Tabling for CHIRP: Everything You Need To Know</a></li>
<li><a href="#">Ways to Promote via Social Media (from airmedia.org)</a></li>
</ul>`,
        imagePosition: 'none',
      },
      {
        blockType: 'contentCard',
        title: 'HR Documents',
        titleTag: 'h2' as const,
        content: emptyLexicalContent,
        htmlContent: `<p>Policy manuals and other documents</p>
<ul>
<li><a href="#">CHIRP Policy Manual</a></li>
</ul>`,
        imagePosition: 'none',
      },
      {
        blockType: 'contentCard',
        title: 'Volunteer Files',
        titleTag: 'h2' as const,
        content: emptyLexicalContent,
        htmlContent: `<p>Files for new volunteers to learn about how CHIRP works.</p>
<ul>
<li><a href="#">CHIRP Guidelines for Photography</a></li>
<li><a href="#">CHIRP Script Standards</a></li>
<li><a href="#">CHIRP Talking Points</a></li>
</ul>`,
        imagePosition: 'none',
      },
      {
        blockType: 'contentCard',
        title: 'Fundraising Information and Donation Forms',
        titleTag: 'h2' as const,
        content: emptyLexicalContent,
        htmlContent: `<p>Here, you will find forms for people who want to donate items to CHIRP, or who would like to make monetary donations offline.</p>
<ul>
<li><a href="#">Getting Over the Fear of Asking for Donations (from grassrootsfundraising.org)</a></li>
<li><a href="#">In-Kind Donation Form & Instructions</a></li>
</ul>`,
        imagePosition: 'none',
      },
      {
        blockType: 'contentCard',
        title: 'Legal Documents',
        titleTag: 'h2' as const,
        content: emptyLexicalContent,
        htmlContent: '<p>Aenean lacinia bibendum nulla sed consectetur.</p>',
        imagePosition: 'none',
      },
      {
        blockType: 'contentCard',
        title: 'Flyers/Postcards',
        titleTag: 'h2' as const,
        content: emptyLexicalContent,
        htmlContent: "<p>We'll keep an updated list of files you can download and print out to help promote CHIRP events.</p>",
        imagePosition: 'none',
      },
      {
        blockType: 'contentCard',
        title: 'DJ Forms',
        titleTag: 'h2' as const,
        content: emptyLexicalContent,
        htmlContent: `<p>Shift applications and more...</p>
<ul>
<li><a href="#">CHIRP New DJ Application</a></li>
<li><a href="#">DJ Rig Operating Instructions</a></li>
</ul>`,
        imagePosition: 'none',
      },
      {
        blockType: 'contentCard',
        title: 'Logos',
        titleTag: 'h2' as const,
        content: emptyLexicalContent,
        htmlContent: `<p>These are various logos for CHIRP Radio and the Chicago Independent Radio Project.</p>
<ul>
<li><a href="#">CHIRP horizontal broadcast logo PDF</a></li>
<li><a href="#">CHIRP Record Album Logo PDF</a></li>
</ul>`,
        imagePosition: 'none',
      },
    ],
  }

  // Update Websites to Remember
  const { docs: websitesPages } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'websites-to-remember' } },
    limit: 1,
  })

  if (websitesPages.length > 0) {
    await payload.update({
      collection: 'pages',
      id: websitesPages[0].id,
      data: websitesContent as any,
    })
    console.log('✓ Updated Websites to Remember page with full content')
  }

  // Update Volunteer Downloads
  const { docs: downloadsPages } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'volunteer-downloads' } },
    limit: 1,
  })

  if (downloadsPages.length > 0) {
    await payload.update({
      collection: 'pages',
      id: downloadsPages[0].id,
      data: downloadsContent as any,
    })
    console.log('✓ Updated Volunteer Downloads page with full content')
  }

  console.log('\n✨ Volunteer pages updated successfully!')
  process.exit(0)
}

updateVolunteerPages()
