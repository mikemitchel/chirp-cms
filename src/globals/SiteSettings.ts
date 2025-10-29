import { GlobalConfig } from 'payload/types'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Website Settings',
  admin: {
    group: 'Website',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Landing Page',
      fields: [
        {
          name: 'showTopAnnouncement',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show announcement banner at top of landing page',
          },
        },
        {
          name: 'topAnnouncement',
          type: 'relationship',
          relationTo: 'announcements',
          admin: {
            description: 'Select which announcement to display at top of landing page',
          },
        },
        {
          name: 'sidebarAnnouncement',
          type: 'relationship',
          relationTo: 'announcements',
          admin: {
            description: 'Select which announcement to display in sidebar',
          },
        },
        {
          name: 'sidebarAdvertisement',
          type: 'relationship',
          relationTo: 'advertisements',
          admin: {
            description: 'Select which advertisement to display in sidebar',
          },
        },
      ],
        },
        {
          label: 'Listen Page',
      fields: [
        {
          name: 'showUserCollection',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show 3 random songs from logged-in user\'s saved collection (if they have any)',
          },
        },
        {
          name: 'listenPageTitle',
          type: 'text',
          defaultValue: 'Listen',
          admin: {
            description: 'Main page title for Listen page',
          },
        },
        {
          name: 'listenCurrentPlaylistTitle',
          type: 'text',
          defaultValue: 'Current Playlist',
          admin: {
            description: 'Title for current playlist section',
          },
        },
        {
          name: 'listenPreviousPlaysButtonText',
          type: 'text',
          defaultValue: 'Previous Plays',
          admin: {
            description: 'Button text to navigate to full playlist page',
          },
        },
        {
          name: 'listenUserCollectionTitle',
          type: 'text',
          defaultValue: 'A Few from Your Collection',
          admin: {
            description: 'Title for user collection sidebar section',
          },
        },
        {
          name: 'listenYourCollectionButtonText',
          type: 'text',
          defaultValue: 'Your Collection',
          admin: {
            description: 'Button text to navigate to full collection page',
          },
        },
        {
          name: 'listenSidebarWeeklyChart',
          type: 'relationship',
          relationTo: 'weeklyCharts',
          admin: {
            description: 'Select which Weekly Chart list to display in sidebar',
          },
        },
        {
          name: 'listenSidebarAdvertisement',
          type: 'relationship',
          relationTo: 'advertisements',
          admin: {
            description: 'Select which advertisement to display in sidebar',
          },
        },
        {
          name: 'fullWidthAnnouncement',
          type: 'relationship',
          relationTo: 'announcements',
          admin: {
            description: 'Select announcement for full-width section (e.g., "DJ Applications Now Open")',
          },
        },
        {
          name: 'leftWeeklyChart',
          type: 'relationship',
          relationTo: 'weeklyCharts',
          admin: {
            description: 'Select which Weekly Chart list to display on the left',
          },
        },
        {
          name: 'rightWeeklyChart',
          type: 'relationship',
          relationTo: 'weeklyCharts',
          admin: {
            description: 'Select which Weekly Chart list to display on the right',
          },
        },
      ],
        },
        {
          label: 'Events Page',
      fields: [
        {
          name: 'eventsSidebarAnnouncement',
          type: 'relationship',
          relationTo: 'announcements',
          admin: {
            description: 'Select which announcement to display in sidebar',
          },
        },
        {
          name: 'eventsSidebarContentType',
          type: 'select',
          options: [
            { label: 'Articles', value: 'articles' },
            { label: 'Podcasts', value: 'podcasts' },
            { label: 'Events', value: 'events' },
            { label: 'None', value: 'none' },
          ],
          defaultValue: 'articles',
          admin: {
            description: 'Select which content type to display in sidebar',
          },
        },
        {
          name: 'eventsSidebarAdvertisement',
          type: 'relationship',
          relationTo: 'advertisements',
          admin: {
            description: 'Select which advertisement to display in sidebar',
          },
        },
        {
          name: 'eventsFullWidthAnnouncement',
          type: 'relationship',
          relationTo: 'announcements',
          admin: {
            description: 'Select announcement for full-width section (e.g., "Stream Quality Upgrade")',
          },
        },
      ],
        },
        {
          label: 'Articles Page',
      fields: [
        {
          name: 'articlesSidebarAnnouncement',
          type: 'relationship',
          relationTo: 'announcements',
          admin: {
            description: 'Select which announcement to display in sidebar',
          },
        },
        {
          name: 'articlesSidebarContentType',
          type: 'select',
          options: [
            { label: 'Articles', value: 'articles' },
            { label: 'Podcasts', value: 'podcasts' },
            { label: 'Events', value: 'events' },
            { label: 'None', value: 'none' },
          ],
          defaultValue: 'events',
          admin: {
            description: 'Select which content type to display in sidebar',
          },
        },
        {
          name: 'articlesSidebarAdvertisement',
          type: 'relationship',
          relationTo: 'advertisements',
          admin: {
            description: 'Select which advertisement to display in sidebar',
          },
        },
        {
          name: 'articlesFullWidthAnnouncement',
          type: 'relationship',
          relationTo: 'announcements',
          admin: {
            description: 'Select announcement for full-width section',
          },
        },
      ],
        },
        {
          label: 'Podcasts Page',
      fields: [
        {
          name: 'podcastsPageTitle',
          type: 'text',
          defaultValue: 'Podcasts',
          admin: {
            description: 'Main page title for Podcasts page',
          },
        },
        {
          name: 'podcastsSidebarAnnouncement',
          type: 'relationship',
          relationTo: 'announcements',
          admin: {
            description: 'Select which announcement to display in sidebar',
          },
        },
        {
          name: 'podcastsSidebarAdvertisement',
          type: 'relationship',
          relationTo: 'advertisements',
          admin: {
            description: 'Select which advertisement to display in sidebar',
          },
        },
        {
          name: 'podcastsFullWidthAnnouncement',
          type: 'relationship',
          relationTo: 'announcements',
          admin: {
            description: 'Select announcement for full-width section',
          },
        },
      ],
        },
        {
          label: 'Footer Support',
      fields: [
        {
          name: 'supportContent',
          type: 'richText',
          admin: {
            description: 'Content for the support section above the footer',
          },
        },
        {
          name: 'showDCaseLogo',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show DCase logo in support section',
          },
        },
        {
          name: 'dCaseLogo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'DCase logo image',
          },
        },
        {
          name: 'dCaseLogoUrl',
          type: 'text',
          label: 'DCase Logo Redirect',
          admin: {
            description: 'URL when DCase logo is clicked',
          },
        },
        {
          name: 'showIlArtsCouncilLogo',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show Illinois Arts Council logo in support section',
          },
        },
        {
          name: 'ilArtsCouncilLogo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Illinois Arts Council logo image',
          },
        },
        {
          name: 'ilArtsCouncilLogoUrl',
          type: 'text',
          label: 'Illinois Arts Council Logo Redirect',
          admin: {
            description: 'URL when Illinois Arts Council logo is clicked',
          },
        },
        {
          name: 'additionalLogos',
          type: 'array',
          maxRows: 3,
          admin: {
            description: 'Additional support logos (up to 3)',
          },
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Logo image',
              },
            },
            {
              name: 'logoUrl',
              type: 'text',
              label: 'Logo Redirect',
              admin: {
                description: 'URL when logo is clicked (optional)',
              },
            },
            {
              name: 'alt',
              type: 'text',
              admin: {
                description: 'Alt text for logo',
              },
            },
          ],
        },
        {
          name: 'supportAdvertisement',
          type: 'relationship',
          relationTo: 'advertisements',
          admin: {
            description: 'Advertisement to show in support section',
          },
        },
      ],
        },
        {
          label: 'Footer',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          defaultValue: '© {year} CHIRP Radio. All rights reserved.',
          admin: {
            description: 'Copyright text. Use {year} as placeholder for current year.',
          },
        },
        {
          name: 'socialLinks',
          type: 'array',
          admin: {
            description: 'Social media links for footer',
          },
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Twitter/X', value: 'twitter' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Bluesky', value: 'bluesky' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Spotify', value: 'spotify' },
                { label: 'Apple Music', value: 'apple-music' },
                { label: 'Other', value: 'other' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              admin: {
                description: 'Optional custom label (defaults to platform name)',
              },
            },
          ],
        },
        {
          name: 'showChirpFilmFestLogo',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show CHIRP Radio Film Fest logo in footer',
          },
        },
        {
          name: 'chirpFilmFestLogo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'CHIRP Radio Film Fest logo image',
          },
        },
        {
          name: 'chirpFilmFestLogoUrl',
          type: 'text',
          label: 'Film Fest Logo Redirect',
          admin: {
            description: 'URL when Film Fest logo is clicked',
          },
        },
        {
          name: 'showFirstTimeLogo',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show First Time logo in footer',
          },
        },
        {
          name: 'firstTimeLogo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'First Time logo image',
          },
        },
        {
          name: 'firstTimeLogoUrl',
          type: 'text',
          label: 'First Time Logo Redirect',
          admin: {
            description: 'URL when First Time logo is clicked',
          },
        },
      ],
        },
      ],
    },
  ],
}
