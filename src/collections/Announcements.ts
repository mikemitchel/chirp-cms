import { CollectionConfig } from 'payload/types'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  labels: {
    singular: 'Announcement',
    plural: 'Announcements',
  },
  admin: {
    useAsTitle: 'headlineText',
    defaultColumns: ['headlineText', 'variant'],
    group: 'Content Assets',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'headlineText',
      type: 'text',
      required: true,
      admin: {
        description: 'Main headline for the announcement',
      },
    },
    {
      name: 'bodyText',
      type: 'richText',
      required: true,
      admin: {
        description: 'Body content (supports rich text)',
      },
    },
    {
      name: 'variant',
      type: 'select',
      required: true,
      defaultValue: 'motivation',
      options: [
        { label: 'Donation', value: 'donation' },
        { label: 'Motivation', value: 'motivation' },
      ],
      admin: {
        description: 'Display style of the announcement',
      },
    },
    {
      name: 'textureBackground',
      type: 'select',
      required: true,
      defaultValue: 'cr-bg-natural-a500',
      options: [
        { label: 'Natural A500 (Yellow)', value: 'cr-bg-natural-a500' },
        { label: 'Natural S100 (Light Blue)', value: 'cr-bg-natural-s100' },
        { label: 'Natural S900 (Dark Blue)', value: 'cr-bg-natural-s900' },
        { label: 'Natural D100 (Light Gray)', value: 'cr-bg-natural-d100' },
        { label: 'Natural D900 (Dark Gray)', value: 'cr-bg-natural-d900' },
      ],
      admin: {
        components: {
          Field: '@/components/TextureBackgroundField#TextureBackgroundField',
        },
      },
    },
    {
      name: 'showLink',
      type: 'checkbox',
      label: 'Show call-to-action link',
      defaultValue: false,
    },
    {
      name: 'linkText',
      type: 'text',
      admin: {
        description: 'Link text (e.g., "Donate Today!")',
        condition: (data) => data.showLink === true,
      },
    },
    {
      name: 'linkUrl',
      type: 'text',
      admin: {
        description: 'Link URL',
        condition: (data) => data.showLink === true,
      },
    },
    {
      name: 'buttonCount',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'One', value: 'one' },
        { label: 'Two', value: 'two' },
      ],
      admin: {
        description: 'Number of action buttons to display',
      },
    },
    {
      name: 'button1Text',
      type: 'text',
      admin: {
        description: 'First button text',
        condition: (data) => data.buttonCount === 'one' || data.buttonCount === 'two',
      },
    },
    {
      name: 'button1Icon',
      type: 'select',
      options: [
        // Navigation & Actions
        { label: 'Arrow Right', value: 'PiArrowRight' },
        { label: 'Arrow Square Up', value: 'PiArrowSquareUp' },
        { label: 'Caret Left', value: 'PiCaretLeft' },
        { label: 'Caret Right', value: 'PiCaretRight' },
        { label: 'Caret Up', value: 'PiCaretUp' },
        { label: 'Caret Down', value: 'PiCaretDown' },
        { label: 'Caret Up Down', value: 'PiCaretUpDown' },
        { label: 'X', value: 'PiX' },
        { label: 'X Bold', value: 'PiXBold' },
        { label: 'Magnifying Glass', value: 'PiMagnifyingGlass' },
        { label: 'Dots Three Vertical', value: 'PiDotsThreeOutlineVerticalFill' },
        { label: 'Plus', value: 'PiPlus' },
        { label: 'Minus', value: 'PiMinus' },

        // Calendar & Events
        { label: 'Calendar Blank', value: 'PiCalendarBlank' },
        { label: 'Calendar Dot', value: 'PiCalendarDot' },
        { label: 'Calendar Dots', value: 'PiCalendarDots' },
        { label: 'Calendar Plus', value: 'PiCalendarPlus' },
        { label: 'Ticket', value: 'PiTicket' },

        // Music & Media
        { label: 'Vinyl Record', value: 'PiVinylRecord' },
        { label: 'Music Note', value: 'PiMusicNote' },
        { label: 'Music Notes', value: 'PiMusicNotes' },
        { label: 'Playlist', value: 'PiPlaylist' },
        { label: 'Play Fill', value: 'PiPlayFill' },
        { label: 'Pause Fill', value: 'PiPauseFill' },
        { label: 'Headphones', value: 'PiHeadphones' },
        { label: 'Microphone', value: 'PiMicrophone' },

        // User & Social
        { label: 'Heart', value: 'PiHeart' },
        { label: 'Heart Fill', value: 'PiHeartFill' },
        { label: 'Hand Heart', value: 'PiHandHeart' },
        { label: 'Hand Heart Light', value: 'PiHandHeartLight' },
        { label: 'User', value: 'PiUser' },
        { label: 'User Circle', value: 'PiUserCircle' },
        { label: 'Chat Circle Text', value: 'PiChatCircleText' },
        { label: 'Chat Circle Text Light', value: 'PiChatCircleTextLight' },
        { label: 'Sign In', value: 'PiSignIn' },

        // Content & Documents
        { label: 'Read CV Logo', value: 'PiReadCvLogo' },
        { label: 'Notepad', value: 'PiNotepad' },
        { label: 'Paperclip', value: 'PiPaperclip' },
        { label: 'Newspaper', value: 'PiNewspaper' },
        { label: 'Map Trifold', value: 'PiMapTrifold' },

        // Communication
        { label: 'Paper Plane Right', value: 'PiPaperPlaneRight' },
        { label: 'Paper Plane Tilt', value: 'PiPaperPlaneTilt' },

        // Settings & Tools
        { label: 'Gear', value: 'PiGear' },
        { label: 'Floppy Disk', value: 'PiFloppyDisk' },
        { label: 'Pencil Simple', value: 'PiPencilSimple' },
        { label: 'Upload Simple', value: 'PiUploadSimple' },

        // Shopping & Commerce
        { label: 'Shopping Bag', value: 'PiShoppingBag' },

        // Visibility & Display
        { label: 'Eye', value: 'PiEye' },
        { label: 'Eye Slash', value: 'PiEyeSlash' },
        { label: 'Download', value: 'PiDownload' },
        { label: 'Download Simple', value: 'PiDownloadSimple' },
        { label: 'Export', value: 'PiExport' },

        // Collection & Add
        { label: 'Plus Circle', value: 'PiPlusCircle' },
        { label: 'Plus Square', value: 'PiPlusSquare' },

        // Legacy (for backwards compatibility)
        { label: 'Speaker (legacy)', value: 'speaker' },
        { label: 'Mobile (legacy)', value: 'mobile' },
      ],
      admin: {
        description: 'First button icon',
        condition: (data) => data.buttonCount === 'one' || data.buttonCount === 'two',
      },
    },
    {
      name: 'button2Text',
      type: 'text',
      admin: {
        description: 'Second button text',
        condition: (data) => data.buttonCount === 'two',
      },
    },
    {
      name: 'button2Icon',
      type: 'select',
      options: [
        // Navigation & Actions
        { label: 'Arrow Right', value: 'PiArrowRight' },
        { label: 'Arrow Square Up', value: 'PiArrowSquareUp' },
        { label: 'Caret Left', value: 'PiCaretLeft' },
        { label: 'Caret Right', value: 'PiCaretRight' },
        { label: 'Caret Up', value: 'PiCaretUp' },
        { label: 'Caret Down', value: 'PiCaretDown' },
        { label: 'Caret Up Down', value: 'PiCaretUpDown' },
        { label: 'X', value: 'PiX' },
        { label: 'X Bold', value: 'PiXBold' },
        { label: 'Magnifying Glass', value: 'PiMagnifyingGlass' },
        { label: 'Dots Three Vertical', value: 'PiDotsThreeOutlineVerticalFill' },
        { label: 'Plus', value: 'PiPlus' },
        { label: 'Minus', value: 'PiMinus' },

        // Calendar & Events
        { label: 'Calendar Blank', value: 'PiCalendarBlank' },
        { label: 'Calendar Dot', value: 'PiCalendarDot' },
        { label: 'Calendar Dots', value: 'PiCalendarDots' },
        { label: 'Calendar Plus', value: 'PiCalendarPlus' },
        { label: 'Ticket', value: 'PiTicket' },

        // Music & Media
        { label: 'Vinyl Record', value: 'PiVinylRecord' },
        { label: 'Music Note', value: 'PiMusicNote' },
        { label: 'Music Notes', value: 'PiMusicNotes' },
        { label: 'Playlist', value: 'PiPlaylist' },
        { label: 'Play Fill', value: 'PiPlayFill' },
        { label: 'Pause Fill', value: 'PiPauseFill' },
        { label: 'Headphones', value: 'PiHeadphones' },
        { label: 'Microphone', value: 'PiMicrophone' },

        // User & Social
        { label: 'Heart', value: 'PiHeart' },
        { label: 'Heart Fill', value: 'PiHeartFill' },
        { label: 'Hand Heart', value: 'PiHandHeart' },
        { label: 'Hand Heart Light', value: 'PiHandHeartLight' },
        { label: 'User', value: 'PiUser' },
        { label: 'User Circle', value: 'PiUserCircle' },
        { label: 'Chat Circle Text', value: 'PiChatCircleText' },
        { label: 'Chat Circle Text Light', value: 'PiChatCircleTextLight' },
        { label: 'Sign In', value: 'PiSignIn' },

        // Content & Documents
        { label: 'Read CV Logo', value: 'PiReadCvLogo' },
        { label: 'Notepad', value: 'PiNotepad' },
        { label: 'Paperclip', value: 'PiPaperclip' },
        { label: 'Newspaper', value: 'PiNewspaper' },
        { label: 'Map Trifold', value: 'PiMapTrifold' },

        // Communication
        { label: 'Paper Plane Right', value: 'PiPaperPlaneRight' },
        { label: 'Paper Plane Tilt', value: 'PiPaperPlaneTilt' },

        // Settings & Tools
        { label: 'Gear', value: 'PiGear' },
        { label: 'Floppy Disk', value: 'PiFloppyDisk' },
        { label: 'Pencil Simple', value: 'PiPencilSimple' },
        { label: 'Upload Simple', value: 'PiUploadSimple' },

        // Shopping & Commerce
        { label: 'Shopping Bag', value: 'PiShoppingBag' },

        // Visibility & Display
        { label: 'Eye', value: 'PiEye' },
        { label: 'Eye Slash', value: 'PiEyeSlash' },
        { label: 'Download', value: 'PiDownload' },
        { label: 'Download Simple', value: 'PiDownloadSimple' },
        { label: 'Export', value: 'PiExport' },

        // Collection & Add
        { label: 'Plus Circle', value: 'PiPlusCircle' },
        { label: 'Plus Square', value: 'PiPlusSquare' },

        // Legacy (for backwards compatibility)
        { label: 'Speaker (legacy)', value: 'speaker' },
        { label: 'Mobile (legacy)', value: 'mobile' },
      ],
      admin: {
        description: 'Second button icon',
        condition: (data) => data.buttonCount === 'two',
      },
    },
    {
      name: 'currentAmount',
      type: 'number',
      admin: {
        description: 'Current donation amount',
        condition: (data) => data.variant === 'donation',
      },
    },
    {
      name: 'targetAmount',
      type: 'number',
      admin: {
        description: 'Target donation goal',
        condition: (data) => data.variant === 'donation',
      },
    },
  ],
}
